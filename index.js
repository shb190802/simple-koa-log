const fs = require('fs')
const os = require('os')
const path = require('path')

require('./lib/lib_shb_date')

let rootPath = path.join(process.cwd(),'logs')
let subPath = ''
let fileName = '-YYYY-MM-DD.log'


function log2file(text,file){
    var date = (new Date()).format() ;
    var log = `${date}-->${text}${os.EOL}` ;
    mkDir(file);
    if(!fs.existsSync(file)){
        fs.writeFileSync(file,log,'utf-8');
        return ;
    }
    fs.appendFile(file,log,'utf-8',(err)=>{})
}
function mkDir(file){
    var list = file.split(path.sep);
    for(var i = 0 ; i < list.length ; i ++){
        var curPath = path.join.apply(path,list.slice(0,i+1));
        if(!fs.existsSync(curPath)){
            if(i != list.length-1){
                fs.mkdirSync(curPath);
            }else{
                fs.writeFileSync(curPath,'','utf-8');
            }
        }
    }
}
function config(options){
    if(options.path !== undefined){
        rootPath = options.path ;
    }
    if(options.subPath !== undefined){
        subPath = options.subPath ;
    }
    if(options.fileName !== undefined){
        fileName = options.fileName ;
    }
    console.log(`logs file in rootPath: ${rootPath}`)
}

function getFileName(type){
    var date = new Date();
    var list = [rootPath];
    if(subPath){
        let tempSubPath = date.format(subPath);
        list.push(tempSubPath);
    }
    if(fileName){
        let tempFileName = date.format(fileName);
        list.push(type + tempFileName);
    }
    return path.join.apply(path,list);
}
function access(info){
    info = JSON.stringify(info);
    log2file(info,getFileName('access'));
}
function error(info){
    info = JSON.stringify(info);
    log2file(info,getFileName('error'));
}
function info(info){
    console.log(info)
    info = JSON.stringify(info);
    log2file(info,getFileName('info'));
}
module.exports = {
    access,
    error,
    info,
    config
}