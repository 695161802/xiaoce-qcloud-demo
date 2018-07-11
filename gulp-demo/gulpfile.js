const gulp = require('gulp')
const uploadQcloud = require('gulp-upload-qcloud')
const gulpLoadPlugins = require('gulp-load-plugins')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

const plugins = gulpLoadPlugins()

gulp.task('rev', function () {
  return gulp.src('./src/qcloud/*.{jpg,jpeg,png,gif}')
    .pipe(plugins.newer('.tmp'))
    .pipe(rev())
    .pipe(gulp.dest('.tmp'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('.tmp/rev'))
})

gulp.task('replace', ['rev'], function () {
  console.log('/qcloud/')
  return gulp.src(['.tmp/rev/**/*.json', './src/index.wxml'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        '/qcloud/': function (manifest_value) {
          return `http://mobike-1252758967.file.myqcloud.com/juejin/xiaoce/gulp/${manifest_value}`
        }
      }
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('upload', ['replace'], function () {
  return gulp.src('./.tmp/qcloud/**/*.{jpg,jpeg,png,gif}')
    .pipe(uploadQcloud({
      Region: 'ap-beijing',
      SecretId: '**',
      SecretKey: '**',
      Bucket: 'mobike-1252758967',
      Prefix: 'juejin/xiaoce/gulp',
      OverWrite: false
    }))
})

