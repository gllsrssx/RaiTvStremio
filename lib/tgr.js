const axios = require('axios');

async function getTGRStream(id) {
    try {
        const response = await axios.get(`http://tgr.rai.it/stream/${id}`);
        return response.data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getTGRStream
};