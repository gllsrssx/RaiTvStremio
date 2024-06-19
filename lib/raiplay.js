const axios = require('axios');

async function getStream(id) {
    try {
        const response = await axios.get(`https://www.raiplay.it/stream/${id}`); // Correct the endpoint URL
        return response.data.url;
    } catch (error) {
        console.error('Error fetching stream:', error);
        return null;
    }
}

async function getMeta(id) {
    try {
        const response = await axios.get(`https://www.raiplay.it/meta/${id}`); // Correct the endpoint URL
        return response.data;
    } catch (error) {
        console.error('Error fetching meta:', error);
        return null;
    }
}

module.exports = {
    getStream,
    getMeta
};