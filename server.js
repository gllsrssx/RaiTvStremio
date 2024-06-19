#!/usr/bin/env node

const { serveHTTP } = require("stremio-addon-sdk");
const addonInterface = require("./addon");

const port = process.env.PORT || 3000;

serveHTTP(addonInterface, { port }).then(() => {
    console.log(`Add-on running on http://localhost:${port}`);
});

// addonInterface.manifest.resources.forEach(resource => {
//     console.log(`Resource available: ${resource}`);
// });

console.log(`Manifest URL: http://localhost:${port}/manifest.json`);