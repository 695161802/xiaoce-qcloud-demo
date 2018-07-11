var COS = require('cos-nodejs-sdk-v5');
var ndir = require('ndir');

var fs = require('fs');
var path = require('path');


var dest = path.resolve(__dirname, './dist/images');

var options = {
    Region: 'ap-beijing',
    SecretId: '**',
    SecretKey: '**',
    Bucket: 'mobike-1252758967'
};

var cos = new COS(options)

function uploadBuf(file, fileRelativePath, fileWithPath, callback) {
    var objkey = require('path').basename(fileWithPath.replace(/^\//, ''))

    // console.log('objkey', objkey)
    // console.log('fileRelativePath', fileRelativePath)
    // console.log('fileWithPath', fileWithPath)

    // console.log('file.basename')
    // console.log(fs.createReadStream(fileWithPath))
    // console.log('fs.statSync(objkey).size', fs.statSync(fileWithPath).size)

    cos.putObject({
        Bucket: options.Bucket, /* 必须 */
        Region: options.Region,
        CacheControl: 'max-age=604800',
        Key:  'juejin/xiaoce/' + fileRelativePath, /* 必须 */
        Body: fs.createReadStream(fileWithPath), /* 必须 */
        ContentLength: fs.statSync(fileWithPath).size, /* 必须 */
        onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
        },
    }, function (err, data) {
        if (err) {
            console.log('err', err)
        } else {
            // console.log(data)
        }
    });
}

console.log('dest', dest)

ndir.walk(dest, function onDir(dirpath, files) {
  // console.log(' * %s', dirpath)
  for (var i = 0, l = files.length; i < l; i++) {
    var info = files[i];
    if (info[1].isFile()) {
      // console.log('isFile')
      // console.log(info[0])
      // console.log(info[1])
      var cutStart = info[0].indexOf('images')
      uploadBuf(info[1], info[0].substring(cutStart), info[0])
    }
  }
}, function end() {
  console.log('walk end.')
}, function error(err, errPath) {
  console.error('%s error: %s', errPath, err)
});
