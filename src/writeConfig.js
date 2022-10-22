const fs = require("fs");
const { configFileName } = require("./constant");

function writeConfig(dataObj) {
    const content = JSON.stringify(dataObj, null, 1);
    console.log(`>>>>>> Create new ${configFileName} file`);
    fs.writeFile(configFileName, content, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`>>>>>> Please fill it`);
    });
}

module.exports = writeConfig;