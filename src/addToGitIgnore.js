const fs = require("fs");
const path = require("path");
const { projectDir, configFileName } = require("./constant");

// read existing .gitignore content
const readGitIgnore = () => {

    const gitIgnoreFile = path.join(projectDir, "./.gitignore");

    if (fs.existsSync(gitIgnoreFile)) { // .gitignore file is available
        const rawData = fs.readFileSync(gitIgnoreFile);
        const ignoreString = rawData.toString("utf8");
        return ignoreString;
    } else { // .gitignore file is not available
        return "";
    }

}

// add deploy.config.json in to .gitignore if deploy.config.json hasn't
const writeGitIgnore = () => {

    const existingContent = readGitIgnore();

    // if deploy.config.json has not in .gitignore
    // add deploy.config.json in to .gitignore
    if (!existingContent.includes(configFileName)) {
        const content = existingContent === "" ? configFileName : `${existingContent}\n${configFileName}`;
        fs.writeFile(".gitignore", content, err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`>>>>>> Successfully ${configFileName} file added to .gitignore`);
        });
    }

}

function addToGitIgnore() {
    writeGitIgnore();
}


module.exports = addToGitIgnore;