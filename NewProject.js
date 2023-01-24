const readline = require("readline")
const fs = require("fs")
const os = require(`os`)
const execSync = require('child_process').execSync
const spawn = require('child_process').spawn
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const path = require('path');
global.appRoot = path.resolve(__dirname)

function CopyRecursiveSync (src, dest) {
    var exists = fs.existsSync(src)
    var stats = exists && fs.statSync(src)
    var isDirectory = exists && stats.isDirectory()
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        CopyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName))
      })
    } else {
        fs.copyFileSync(src, dest)
    }
}

function OpenExplorer(path) {
    let explorer
    switch (os.platform()) {
        case "win32": explorer = "explorer"; break
        case "linux": explorer = "xdg-open"; break
        case "darwin": explorer = "open"; break
    }
    spawn(explorer, [path], { detached: true }).unref()
}

function FromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath)
        return
    }

    var files = fs.readdirSync(startPath)
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i])
        var stat = fs.lstatSync(filename)
        if (stat.isDirectory()) {
            FromDir(filename, filter, callback) //recurse
        } else if (filter.test(filename)) callback(filename)
    }
}

function CreateTheProject(projectName, directoryPath) {
    if(IsPathProject(directoryPath)) {
        console.log(`\n\n`)
        console.log(`A project is already initalised in this directory ${directoryPath}`)
        console.log(`Unable to continue.`)
        Quit()
        return
    }
    console.log(`\n\n`)
    console.log(`Creating project "${projectName}" under directory ${directoryPath}`)

    console.log("Copying files")
    CopyRecursiveSync(`${global.appRoot}\\template`, directoryPath)

    if (!fs.existsSync(`${directoryPath}\\.config\\`)) fs.mkdirSync(`${directoryPath}\\.config\\`)
    fs.writeFileSync(`${directoryPath}\\.config\\projectName.txt`, projectName)   

    console.log(`Setting up the template with your project name`)
    FromDir(`${directoryPath}\\campaign`, /\.ts$/, (filename) => {
        fs.readFileSync(filename)
        const text = fs.readFileSync(filename).toString()
        const newText = text.replace(/ProjectName/g, projectName)
        fs.writeFileSync(filename, newText, "UTF-8")
        const newPath = filename.replace("MyProject", projectName)
        fs.renameSync(filename, newPath)
    })

    fs.renameSync(`${directoryPath}\\.vscode\\MyProject.code-workspace`, `${directoryPath}\\.vscode\\${projectName}.code-workspace`)

    console.log(`Configuring the project in ${directoryPath}`)

    execSync(`${directoryPath}\\first_time.bat`, {
        cwd: directoryPath
    })

    console.log("+----------------------------------------------------------------------+")
    console.log(` Project "${projectName}" Created`)
    console.log(` In this directory: ${directoryPath}`)
    console.log("+----------------------------------------------------------------------+")
    OpenExplorer(directoryPath)
    Quit()
}

function ConfigureTheProject(projectName) {
    console.log(`\n\n`)
    console.log(`Configuring "${projectName}"`)
    console.log(`Please input your project directory.`)
        
    const projectPath = `${global.appRoot}\\project\\${projectName}`
    console.log(`The default path will be ${projectPath}`)
    rl.question(
        "Please type your path, otherwise we will use default path => ", 
        (path) => {
            if(path == "") {
                if (!fs.existsSync(`${global.appRoot}\\project\\`)) fs.mkdirSync(`${global.appRoot}\\project\\`)
                CreateTheProject(projectName, projectPath)
                return
            }
            try {
                const isPathValid = fs.lstatSync(path).isDirectory()
                if(isPathValid) CreateTheProject(projectName, `${path}\\${projectName}`)
                else {
                    console.log(`Invalid path was entered. That is a file. Please try again.`)
                    ConfigureTheProject(projectName)
                    return
                }
            } catch (error) {
                console.log(error)
                console.log(`Invalid path was entered. Please try again.`)
                ConfigureTheProject(projectName)
                return
            }            
        }
    )
}

function Quit() {
    rl.close()
}

function IsPathProject(path) {
    if (fs.existsSync(`${path}/.config/projectName.txt`)) {
        return true
    }
    return false
}

function Wizard() {
    rl.question(
        "What will be the name of the project? ", 
        (projectName) => {
            if(projectName.toLowerCase() == "projectname") {
                console.log(`Sorry, ProjectName is not allowed as a project name`)
                Wizard()
                return                
            }
            if(!projectName.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
                console.log(`Sorry, your project name contains invalid characters such as:`)
                console.log(`- spaces`)
                console.log(`- starts with number`)
                console.log(`- non ascii character`)
                Wizard()
                return
            }            
            function Confirm() {
                rl.question(
                    "Confirm? type Yes/y or No/n => ", 
                    (confirm) => {
                        const conf = confirm.toLowerCase()
                        if(conf == "yes" || conf == "y") ConfigureTheProject(projectName)
                        else if(conf == "no" || conf == "n") Quit()
                        else Confirm()
                    }
                )
            }

            console.log(`This will be your project name: ${projectName}`)
            Confirm()
        }
    )
}

console.clear()
console.log("+----------------------------------------------------------------------+")
console.log("|Configuring Warhammer Typescript Project - version alpha 1            |")
console.log("|Write cool features, spend less time debugging common lua mistakes™   |")
console.log("|                               ---o0o---                              |")
console.log("|Please bear in mind this project is still work in progress            |")
console.log("|Some of game APIs may be not available                                |")
console.log("+----------------------------------------------------------------------+")
console.log(`\n\n\n`)
Wizard()


rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0)
})