import axios from "axios";

export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const random = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

const wordsApi = axios.create({
    baseURL: "https://wordsapiv1.p.rapidapi.com",
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-RapidAPI-Key": ""
    }
})

export const getDefinitions = word => wordsApi.get(`/words/${word}/definitions`);

export const STATES = Object.freeze(["ready", "error", "loading"]);