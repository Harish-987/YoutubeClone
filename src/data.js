export const API_KEY = 'AIzaSyCp3bW1pTSWk7DsgYdM_zFH8inrbxYsaUk';

export const valueConverter = (value) => {
    if(value >= 1000000)
    {
        return Math.floor(value/1000000) + "M";
    }
    if(value >= 1000)
    {
        return Math.floor(value/1000) + "K";
    }
    return value;
} 