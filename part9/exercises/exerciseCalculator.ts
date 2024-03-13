interface ExerciseInfo {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExerciseInfo => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hours: number[] = [];
  if (!isNaN(Number(args[2]))) {
    for (let i = 3; i < args.length; i++) {
      if (!isNaN(Number(args[i]))) {
        hours.push(Number(args[i]));
      }
    }
    return {
      target: Number(args[2]),
      hours: hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (target: number, hours: number[]) => {
  const periodLength = hours.length;
  const totalHours = hours.reduce((total, current) => total + current, 0);
  const trainingDays = hours.filter((h) => h !== 0).length;
  const avergeHour = totalHours / hours.length;
  const success = avergeHour >= target;
  const ratio = avergeHour / target;

  let rating, ratingDescription;
  if (ratio < 0.6) {
    rating = 1;
    ratingDescription = "not too good";
  } else if (ratio >= 0.6 && ratio < 0.9) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "amazing workout";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avergeHour,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
