var options = {
  Region: 'ap-beijing',
  SecretId: '**',
  SecretKey: '**',
  Bucket: 'mobike-1252758967'
};

fis.match('juejin/**/*.{png,gif,jpg,jpeg,svg}', {
  deploy: fis.plugin('qcloud-latest', options)
})