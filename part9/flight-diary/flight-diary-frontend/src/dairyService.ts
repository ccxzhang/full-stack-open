import axios from 'axios';
import { Diary, NewDiary } from './types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
    return axios
        .get<Diary[]>(baseUrl)
        .then(response => response.data)
}

export const createDairy = (object: NewDiary) => {
    return axios
        .post<Diary>(baseUrl, object)
        .then(response => response.data)
}