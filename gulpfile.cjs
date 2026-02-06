const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

// Сервер
gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: "dist",
        },
        logLevel: "silent",
    });

    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Стили (не забудьте поднять @use в самих .scss файлах!)
gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// HTML
gulp.task("html", function () {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream()); // Добавил стрим, чтобы HTML тоже обновлялся
});

// Скрипты
gulp.task("scripts", function () {
    return gulp
        .src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Шрифты
gulp.task("fonts", function () {
    return gulp
        .src("src/fonts/**/*", { encoding: false })
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

// Иконки
gulp.task("icons", function () {
    return gulp
        .src("src/icons/**/*", { encoding: false })
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

// Изображения (БЕЗ сжатия, просто копирование)
gulp.task("images", function () {
    return gulp
        .src("src/img/**/*", { encoding: false })
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

// Наблюдение
gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
    gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
    gulp.watch("src/fonts/**/*", gulp.parallel("fonts"));
    gulp.watch("src/icons/**/*", gulp.parallel("icons"));
    gulp.watch("src/img/**/*", gulp.parallel("images"));
});

// Дефолтный таск
gulp.task(
    "default",
    gulp.parallel(
        "watch",
        "server",
        "styles",
        "scripts",
        "fonts",
        "icons",
        "html",
        "images"
    )
);