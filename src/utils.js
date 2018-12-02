export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const API_URL = "https://od-api.oxforddictionaries.com/api/v1";
export const API_KEY = "b1b21e4ef3cd65ef9028efb6fb380e0f";