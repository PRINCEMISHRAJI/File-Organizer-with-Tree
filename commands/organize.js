let fs = require("fs");
let path = require("path");

let types ={
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "sz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt"],
    app: ["exe", "apk", "deb", "pkg"],
    dev: ["js", "json", "md"]
}

function organizeFn(dirPath) {
    console.log("Organize command implemented for", dirPath);
    // input -> take directory path from user
    let destPath;
    if(dirPath == undefined){
        destPath = process.cwd();
    } else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // create -> organized files -> directory
            destPath = path.join(dirPath, "organised_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
        } else {
            console.log("Kindly Enter the Correct Path");
            return;
        }
    organzieHelper(dirPath, destPath);
    }
}
function organzieHelper(src, dest){
    let childNames = fs.readdirSync(src);
    console.log(childNames);
    for(let i=0; i< childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // cut/copy -> the organized files to that directory
            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belongs to this ", category);
            sendfiles(childAddress, dest, category);
        }
    }
}

// identify -> categories of all the files present in that input directory
function getCategory(name){
    
    let ext = path.extname(name);
    ext = ext.slice(1);
    for( let type in types) {
        let cTypeArray = types[type];
        for(let i=0; i<cTypeArray.length; i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

function sendfiles(srcFilePath, dest, category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    // To move fs.unlinkSync(srcFilePath);
    console.log(fileName, " copied to ", category);
}

module.exports = {
    organizeKey: organizeFn
}