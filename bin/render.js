const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

/**
 * 递归获取文件的相对路径
 * @param {string} dir 文件目录
 * @param {Array<string>} paths 相对路径
 */
function readFileList(dir, paths) {
  const files = fs.readdirSync(dir);
  // console.log(files);
  for (const name of files) {
    const fullPath = path.join(dir, name)
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {      
      readFileList(path.join(dir, name), paths);  //递归读取文件
    } else {                
      paths.push(fullPath);                     
    }   
  }
}

/**
 * 递归删除整个文件夹的内容
 * @param {string} dir 文件目录
 */
function deleteDir(dir) {
  let files = [];
  if(fs.existsSync(dir)){
    files = fs.readdirSync(dir);
    files.forEach(file => {
        let curPath = dir + "/" + file;
        if(fs.statSync(curPath).isDirectory()){
          deleteDir(curPath); //递归删除文件夹
        } else {
          fs.unlinkSync(curPath); //删除文件
        }
    });
    fs.rmdirSync(dir);
  }

}
/**
 * 写文件
 * @param {string} cmdUrl 创建的项目文件夹目录
 * @param {string} pathUrl  相对路径
 * @param {string} data 写入的内容
 */
function writeFile(cmdUrl, pathUrl, data) {
  const names = pathUrl.split('\\').slice(1, -1);
  // console.log(pathUrl);
  if (names.length === 0) {
    fs.writeFileSync(cmdUrl + pathUrl, data);
  } else {
    let dir = cmdUrl;
    for(let i = 0; i < names.length; i++) {
      dir = dir + '\\' + names[i];
      // console.log(dir);
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
    }
    fs.writeFileSync(cmdUrl + pathUrl, data);
  }
  
}

function render(templatePath, cmdUrl) {
  const paths = [];
  // 递归获取文件的相对路径
  readFileList(templatePath, paths);
  deleteDir(cmdUrl);
  fs.mkdirSync(cmdUrl);
  for (const p of paths) {
    // 使用 ejs 渲染对应的模板文件
    ejs.renderFile(p, {}).then(data => {
      writeFile(cmdUrl, p.split('templates')[1], data);
    })
  }
}


module.exports = {
  render
}