const {src, dest, watch, parallel, series} = require("gulp")

const ts = require("gulp-typescript")
const sass = require("gulp-sass")(require("sass"))
const autoprefixer = require("gulp-autoprefixer")
const cleancss = require("gulp-clean-css")
const terser = require("gulp-terser")

const files = {
    scssPath: "app/scss/**/*.scss",
    tsPath: "app/main.ts"
}

function tsTask(){
    return src(files.tsPath)
    .pipe(ts({
        noImplicitAny: true,
        target: "ES2015",
        out: "main.js"
    }))
    .pipe(terser())
    .pipe(dest("dist"))
};

function scssTask(){
    return src(files.scssPath)
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cleancss())
    .pipe(dest("dist/css"))
}

function watchTasks(){
    watch([files.tsPath, files.scssPath], parallel(tsTask, scssTask))
}

exports.default = series(
    parallel(tsTask, scssTask),
    watchTasks
)