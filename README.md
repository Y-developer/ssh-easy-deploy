# ssh-easy-deploy

## Intro
Static site deployment to the host is very easy. There has three step process
1. Connect with the server using an ssh connection.
2. Clean the remote directory.
3. Transfer distribution files from the local directory to the remote directory.

## Install
```
npm i @y-developer/ssh-easy-deploy
```

## How to use
```
deploy
```
after follow the instructions.

## Configuration file
By default, ssh-easy-deploy will look `deploy.config.json` file in the working directory.\
If there has no configuration file ssh-easy-deploy will generate an empty `deploy.config.json` file for you.\
Also `deploy.config.json` **should add the .gitignore** because it has confidential details. Don't worry ssh-easy-deploy add the `deploy.config.json` file to .gitignore.

```json
{
    "username": "",
    "host": "",
    "port": 0, 
    "password": "", 
    "remote_dir": "",
    "local_dir": ""
}
```

|key|description|
|-|-|
|`username`|username for ssh connection|
|`host`|hostname for ssh connection|
|`port`|port for ssh connction|
|`password`|password for ssh connection|
|`remote_dir`|the absolute path of the remote directory your site to be host (example: /home/username/public_html)|
|`local_dir`|the relative path of your final distribution files (example: /dist)|


## Todo
- create ssh connection with privateKeyPath
