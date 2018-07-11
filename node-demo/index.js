const path = require('path');
const upload = require('qcloud-upload');

upload({
  Region: 'ap-beijing',
  SecretId: '**',
  SecretKey: '**',
  Bucket: 'mobike-1252758967',
  prefix: 'juejin/xiaoce/node',
  dirPath: path.resolve(__dirname, './dist'),
  distDirName: 'images',
  overWrite: 1
});