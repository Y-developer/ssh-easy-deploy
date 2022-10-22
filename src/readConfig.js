const fs = require("fs");
const path = require("path");
const { configFileName, projectDir } = require("./constant");
const { hasConfigFile, hasRequiredKeys, hasRequiredValues } = require("./checkConfig");

// json file convert to js object
// if config file has json return empty js object
function jsonToObj(rawData) {
    let obj;
    try {
        obj = JSON.parse(rawData)
    } catch (e) {
        obj = {}
    }
    return obj
}

function readConfig() {

    // check project folder has deploy.config.js file
    if (hasConfigFile()) {

        // convert json to javascript object
        console.log(`>>>>>> Start to read ${configFileName}`);
        const rawData = fs.readFileSync(configFileName);
        const configData = jsonToObj(rawData);

        // check config data have required keys and all required keys has values
        // if every thing fine return config data object
        if (hasRequiredKeys(configData) && hasRequiredValues(configData)) {
            // realtive local_dir to absolute dir
            configData['local_dir'] = path.resolve(projectDir, configData['local_dir']);
            return configData;
        }
    }

    // if any chack has failed return null object
    return null;
}

module.exports = readConfig;