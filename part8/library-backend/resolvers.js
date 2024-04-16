const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        query.author = author.id;
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] }; // Filter by genre if specified
      }

      return Book.find(query).populate("author");
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({});
      return authors.map(author => {
        if (!author.name) {
          throw new Error(`Found an author without a name: ${author.id}`);
        }
        return author;
      });
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      try {
        const queriedAuthor = await Author.findOne({ name: root.name });
        const length = await Book.countDocuments({ author: queriedAuthor.id });
        return length;
      } catch (error) {
        console.error("Error calculating book count:", error);
        throw new Error("Failed to calculate book count");
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const existAuthor = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      if (!existAuthor) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }

      const foundAuthor = await Author.findOne({ name: args.author });
      const book = new Book({
        ...args,
        author: foundAuthor.id,
      });

      let newBook;
      try {
        await book.save();
        newBook = await Book.findById(book.id).populate('author');
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const authorsToEdit = await Author.findOne({ name: args.name });
      authorsToEdit.born = args.setBornTo;
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      try {
        await authorsToEdit.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return authorsToEdit;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "whatever") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
