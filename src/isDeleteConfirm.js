const reader = require("readline-sync");

function isDeleteConfirm(files) {

    console.log("");
    for (let i = 0; i < files.length; i++) {
        console.log(`Will delete ${files[i]} ?`)
    }
    
    let isDelete = reader.question(`Are you sure delete above files and folders in remote directory? 
    >> type "yes" and press enter for delete
    >> type any other and press enter for for exit
    `);
    console.log("")

    if (isDelete === "yes") {
        return true;
    } else {
        return false;
    }
}

module.exports = isDeleteConfirm;