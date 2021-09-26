const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../DBMS-mini-project-backend/public"),
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
};