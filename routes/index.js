/*
 * GET home page.
 */

exports.index = function(req, res){
  var fs = require("fs");
  function getAllFiles(root) {
    var result = [], files = fs.readdirSync(root)
    files.forEach(function(file) {
      var pathname = root+ "/" + file
        , stat = fs.lstatSync(pathname)
      if (stat === undefined) return
   
      // 不是文件夹就是文件
      if (!stat.isDirectory()) {
        var fileData = { type:"file", title:file.replace(/\.jade/g,""), path:pathname.replace(/^views\//g,"") }
        result.push(fileData)
      // 递归自身
      } else {
        var filesData = {
          type:"dir",
          title:file,
          files:getAllFiles(pathname)
        }
        result = result.concat(filesData);
      }
    });
    return result
  }
  var posts = getAllFiles("views/w3c");
  console.log(posts);
  res.render('index', { title: '目录索引', noBack: true, posts: posts });
};

exports.posts = function(req, res){
  res.render(req.params[0], { title: '目录索引' });
}