const path = require("path");

const configFileName = "deploy.config.js";

const configTemplate = {
    username: "",
    host: "",
    port: 0,
    password: "",
    remote_dir: "",
    local_dir: "./dist",
}

const requiredConfigKeys = Object.keys(configTemplate);

const projectDir = path.resolve(__dirname, "../../");

module.exports = {
    configFileName,
    configTemplate,
    requiredConfigKeys,
    projectDir,
}