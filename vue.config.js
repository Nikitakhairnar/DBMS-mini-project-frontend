const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../server/public"),
    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
};