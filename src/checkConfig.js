const fs = require('fs');
const { configFileName, configTemplate, requiredConfigKeys } = require("./constant");
const writeConfig = require("./writeConfig");
const grammer = require("./grammar");

// Is config file available ?
function hasConfigFile() {
    if (!fs.existsSync(configFileName)) {
        console.log(`>>>>>> ${configFileName} not found!`);
        writeConfig(configTemplate);
        return false;
    } else {
        return true;
    }
}

// Have required keys in config file ?
function hasRequiredKeys(configData) {
    const missingKeys = [];
    for (let i = 0; i < requiredConfigKeys.length; i++) {
        if (!configData.hasOwnProperty(requiredConfigKeys[i])) {
            missingKeys.push(requiredConfigKeys[i]);
        }
    }

    const misKeyLen = missingKeys.length
    if (misKeyLen !== 0) { // missing keys ඇති විට
        const strMissingKeys = missingKeys.join();
        console.log(`>>>>>> ${strMissingKeys} field${grammer(misKeyLen, "s")} ${grammer(misKeyLen, "is/are")} missing in ${configFileName}`);
        const newDataObj = Object.assign(configTemplate, configData);
        writeConfig(newDataObj);
        return false;
    }
    return true;
}

// Are required keys has vales ?
function hasRequiredValues(configData) {

    const emptyValues = [];
    for (let i = 0; i < requiredConfigKeys.length; i++) {
        if (configData[requiredConfigKeys[i]] === "" || configData[requiredConfigKeys[i]] === 0) {
            emptyValues.push(requiredConfigKeys[i]);
        }
    }

    const emptyValLen = emptyValues.length;
    if (emptyValLen !== 0) { // missing keys ඇති විට
        const strEmptyValues = emptyValues.join();
        console.log(`>>>>>> ${strEmptyValues} field${grammer(emptyValLen, "s")} ${grammer(emptyValLen, "is/are")} empty. Please fill ${grammer(emptyValLen, "it/them")}.`);
        return false;
    }
    return true;
}

module.exports = {
    hasConfigFile,
    hasRequiredKeys,
    hasRequiredValues
}
