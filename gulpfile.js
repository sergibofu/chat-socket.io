const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

/*utilizando gulp + browserify, se compilan las dependencias de public/js/browserify/dependencies.js
y se almacenan en public/dist/bundle.js, en donde el servidor puede utilizarlas */
gulp.task('browserify', ()=>{
    return browserify('public/js/src/socket.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js/dist'))
})

gulp.task('watch', ()=>{
    gulp.watch('public/js/src', gulp.series('browserify'))
})