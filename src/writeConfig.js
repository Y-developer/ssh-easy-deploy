function writeConfig(dataObj) {
    const content = JSON.stringify(dataObj, null, 1);
    console.log(`>>>>>> Create new ${fileName} file`);
    fs.writeFile(fileName, content, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`>>>>>> Please fill it`);
    });
}

module.exports = writeConfig;