const { addonBuilder } = require("stremio-addon-sdk");
const raiplay = require('./lib/raiplay');
const search = require('./lib/search');

const manifest = {
    "id": "org.stremio.rai",
    "version": "1.0.0",
    "name": "Rai TV",
    "description": "Stremio add-on for Rai TV",
    "resources": ["catalog", "meta", "stream"],
    "types": ["tv", "channel"],
    "catalogs": [
        {
            "type": "channel",
            "id": "rai",
            "name": "Rai TV"
        }
    ],
    "idPrefixes": ["rai_"]
};

const builder = new addonBuilder(manifest);

// Catalog handler
builder.defineCatalogHandler(async ({ type, id }) => {
    console.log("Catalog request: " + type + " " + id);
    let results;
    try {
        results = await search.getCatalog();
    } catch (error) {
        console.error('Error in Catalog Handler:', error);
        return { metas: [] };
    }
    console.log('Catalog response:', results);
    return { metas: results || [] };
});

// Meta handler
builder.defineMetaHandler(async ({ type, id }) => {
    console.log("Meta request: " + type + " " + id);
    const raiId = id.replace('rai_', '');
    let meta;
    try {
        meta = await raiplay.getMeta(raiId);
    } catch (error) {
        console.error('Error in Meta Handler:', error);
        return { meta: {} };
    }
    console.log('Meta response:', meta);
    return { meta: meta || {} };
});

// Stream handler
builder.defineStreamHandler(async ({ type, id }) => {
    console.log("Stream request: " + type + " " + id);
    const raiId = id.replace('rai_', '');
    let stream;
    try {
        stream = await raiplay.getStream(raiId);
    } catch (error) {
        console.error('Error in Stream Handler:', error);
        return { streams: [] };
    }
    console.log('Stream response:', stream);
    return { streams: stream ? [{ url: stream }] : [] };
});

module.exports = builder.getInterface();