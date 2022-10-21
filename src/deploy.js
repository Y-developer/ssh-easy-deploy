const { NodeSSH } = require("node-ssh");
const readConfig = require("./readConfig");

function deploy() {

    const consfigData = readConfig();
    // if can't get config data object
    if (consfigData === null) {
        console.log(`>>>>>> Config file reading error`);
        return;
    }

    console.log(`>>>>>> Start connecting to server`);
    const {
        username,
        host,
        port,
        password,
        remote_dir,
        local_dir,
    } = consfigData;

    const ssh = new NodeSSH();

    sshData = {
        username: username,
        host: host,
        port: port,
        password: password
    }

    // =================================================================================== //
    // get files and folders array in side remote directory
    const ls = async () => {

        const rawFileString = await ssh.exec(
            "ls",
            [],
            {
                cwd: remote_dir,
                onStderr(chunk) {
                    console.log("error", chunk.toString('utf8'));
                },
            }
        )

        const strFiles = rawFileString.toString('utf8');
        const files = strFiles.split("\n");
        
        // if there haven't any files or folders
        if (files.length === 1 && files[0] === "") return []
        
        // if have files or folders
        return files;
    }

    // =================================================================================== //
    // remove files and folders accoding to files array
    const rmrf = async (files) => {

        console.log('>>>>>> Start delete files & folders');

        // one by one rm -rf commond for files
        for (let i = 0; i < files.length; i++) {

            await ssh.exec(
                "rm",
                ["-rf", files[i]],
                {
                    cwd: remote_dir,
                }
            )

            console.log(`Successfully Delete : ${remote_dir}/${files[i]}`);

        }

        return true;
    }

    // =================================================================================== //
    // async funciton tranfer files and folders
    const transferFilesAndFolders = async () => {

        console.log('>>>>>> Start files & folders tranfer');

        // const status = await 
        const status = await ssh.putDirectory(local_dir, remote_dir, {
            recursive: true,
            concurrency: 10,
            // ^ WARNING: Not all servers support high concurrency
            // try a bunch of values and see what works on your server
            validate: function (itemPath) {
                const baseName = path.basename(itemPath)
                return baseName.substr(0, 1) !== '.' && // do not allow dot files
                    baseName !== 'node_modules' // do not allow node_modules
            },
            tick: function (localPath, remotePath, error) {
                if (error) {
                    console.log(`Error Tranfer : ${localPath} ---> ${remotePath}`);
                } else {
                    console.log(`Successfully Tranfer : ${localPath} ---> ${remotePath}`);
                }
            }
        })

        console.log(`>>>>>> Files and folders transfer was ${status ? 'successful' : 'unsuccessful'} !`);
        return status;
    }

    // =================================================================================== //
    // Process of deployment
    ssh.connect(sshData)
        .then(async () => {
            if (ssh.isConnected) {

                // if connecting to the server
                console.log(`>>>>>> Successfully connected to server!`);

                // get files and folders as array in remote directory
                const currentFilesArray = await ls();

                // delete every files and folders in remote directory
                const isDeleteAll = await rmrf(currentFilesArray);

                if (isDeleteAll) {

                    // conform every files and folders delete in remote directory
                    const emptyFileArray = await ls();
                    if (emptyFileArray.length === 0) {
                        console.log(">>>>>> Successfully deleted all files and folders in remote directory!");

                        const isTranfer = await transferFilesAndFolders();
                        if (isTranfer) ssh.dispose();

                    } else {
                        console.log(`>>>>>> ${emptyFileArray.join()} ${gSingularPlural(emptyFileArray.length, "is/are")} not deleted`);
                        ssh.dispose();
                    }

                }

            } else {
                console.log(`>>>>>> Error occurred during connecting`);
            }
        })
}


module.exports = deploy;