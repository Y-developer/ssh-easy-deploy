const configFileName = "deploy.config.json";

const configTemplate = {
    username: "",
    host: "",
    port: 0,
    password: "",
    remote_dir: "",
    local_dir: "./dist",
}

const requiredConfigKeys = Object.keys(configTemplate);

const projectDir = process.cwd();

module.exports = {
    configFileName,
    configTemplate,
    requiredConfigKeys,
    projectDir,
}