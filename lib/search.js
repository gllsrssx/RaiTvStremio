const axios = require('axios');

async function getCatalog() {
    try {
        const response = await axios.get('https://www.raiplay.it/catalog'); // Correct the endpoint URL
        return response.data.results.map(item => ({
            id: `rai_${item.id}`,
            type: 'tv',
            name: item.name,
            poster: item.poster,
            description: item.description
        }));
    } catch (error) {
        console.error('Error fetching catalog:', error);
        return [];
    }
}

module.exports = {
    getCatalog
};