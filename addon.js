const { addonBuilder } = require("stremio-addon-sdk");

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
    "idPrefixes": ["rai_", "custom_"]
};

const builder = new addonBuilder(manifest);

// Custom channels metadata
const customChannelsMeta = [
    {
        id: "custom_channel_rai1",
        type: "channel",
        name: "Rai 1",
        poster: "./resources/fanart.jpg",
        description: "Rai 1 live tv channel",
    },
    {
        id: "custom_channel_rai2",
        type: "channel",
        name: "Rai 2",
        poster: "./resources/fanart.jpg",
        description: "Rai 2 live tv channel",
    }
    // Add more channels here
];

// Stream URLs for the custom channels
const customChannelsStreams = {
    "custom_channel_rai1": [
        { url: "http://stream-7b694ce7e.nmbs.top/m3u/Italy/cae2d46cf6.m3u8" },
        { url: "http://ott-cdn.ucom.am:80/s29/04.m3u8" }
    ],
    "custom_channel_rai2": [
        { url: "http://stream-7b694ce7e.nmbs.top/m3u/Italy/3207341b6b.m3u8" },
        { url: "http://stream-7b694ce7e.nmbs.top/m3u/Italy/3207341b6b.m3u8" }
    ]
    // Add more streams here
};

// Catalog handler
builder.defineCatalogHandler(async ({ type, id }) => {
    console.log("Catalog request: " + type + " " + id);

    // Include all custom channels in the catalog
    const metas = customChannelsMeta;

    return { metas };
});

// Meta handler
builder.defineMetaHandler(async ({ type, id }) => {
    console.log("Meta request: " + type + " " + id);

    const meta = customChannelsMeta.find(channel => channel.id === id);
    return { meta: meta || {} };
});

// Stream handler
builder.defineStreamHandler(async ({ type, id }) => {
    console.log("Stream request: " + type + " " + id);

    const streams = customChannelsStreams[id];
    console.log("Streams found:", streams); // Debugging line to verify streams

    return { streams: streams || [] };
});

module.exports = builder.getInterface();