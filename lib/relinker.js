const axios = require('axios');

async function relink(url) {
    try {
        const response = await axios.get(url);
        return response.data.relinked_url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    relink
};