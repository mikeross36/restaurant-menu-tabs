const {src, dest, watch, parallel, series} = require("gulp")

const sass = require("gulp-sass")(require("sass"))
const autoprefixer = require("gulp-autoprefixer")
const cleancss = require("gulp-clean-css")
const concat = require("gulp-concat")
const terser = require("gulp-terser")

const files = {
    scssPath: "app/scss/**/*.scss",
    jsPath: "app/js/**/*.js"
}

function scssTasks(){
    return src(files.scssPath)
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cleancss())
    .pipe(dest("dist/css"))
}

function jsTasks(){
    return src(files.jsPath)
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(dest("dist/js"))
}

function watchTasks(){
    watch([files.scssPath, files.jsPath], parallel(scssTasks, jsTasks))
}

exports.default = series(
    parallel(scssTasks, jsTasks),
    watchTasks
)