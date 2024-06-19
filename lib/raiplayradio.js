const axios = require('axios');

async function getRadioStream(id) {
    try {
        const response = await axios.get(`http://raiplayradio.it/stream/${id}`);
        return response.data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getRadioStream
};