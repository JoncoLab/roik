'use strict';

var gulp = require("gulp"),
    autoPrefix = require("gulp-autoprefixer"),
    cssComb = require("gulp-csscomb"),
    image = require("gulp-image"),
    compileSass = require("gulp-sass"),
    rigger = require("gulp-rigger"),
    rimraf = require("rimraf");

var path = {
    
    src: {
        html: [
            'src/*.html',
            'src/*.php'
        ],
        css: 'src/styles/*.scss',
        php: 'src/scripts/php/*.php',
        img: 'src/images/*.png',
        svg: 'src/SVG/*.svg',
        font: 'src/fonts/*.ttf',
        js: 'src/scripts/js/*.js',
        ajax: 'src/ajax/*.html'
    },
    
    build: {
        html: 'build/',
        css: 'build/styles/',
        php: 'build/scripts/php/',
        img: 'build/images/',
        svg: 'build/SVG/',
        font: 'build/fonts/',
        js: 'build/scripts/js/',
        ajax: 'build/ajax'
    },
    
    watch: {
        pages: [
            'src/*.html',
            'src/modules/*.html',
            'src/*.php',
            'src/fonts/*.ttf'
        ],
        scripts: [
            'src/scripts/php/*.php',
            'src/scripts/js/*.js'
        ],
        styles: [
            'src/styles/*.scss',
            'src/styles/templates/*.scss'
        ],
        images: [
            'src/images/*.png',
            'src/SVG/*.svg'
        ],
        ajax: 'src/ajax/*.html'
    },
    
    clean: 'build*'
},
    toGitHubPages = [
        'build/*',
        'build/**/*',
        'build/**/**/*'
    ];

//Збірка html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

//Збірка AJAX
gulp.task('ajax:build', function () {
    gulp.src(path.src.ajax)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.ajax));
});

//Збірка php
gulp.task('php:build', function () {
    gulp.src(path.src.php)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.php));
});

//Збірка JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

//Збірка СSS
gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cssComb())
        .pipe(autoPrefix())
        .pipe(gulp.dest(path.build.css));
});

//Збірка картинок
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(image())
        .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
    gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg));
});

//Збірка шрифтів
gulp.task('fonts:build', function () {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font));
});

//Загальна збірка
gulp.task('project:build', [
    'html:build',
    'js:build',
    'css:build',
    'img:build',
    'svg:build',
    'php:build',
    'fonts:build',
    'ajax:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.pages, [
        'html:build',
        'fonts:build'
    ]);
    gulp.watch(path.watch.styles, ['css:build']);
    gulp.watch(path.watch.scripts, [
        'js:build',
        'php:build'
    ]);
    gulp.watch(path.watch.images, [
        'img:build',
        'svg:build'
    ]);
    gulp.watch(path.watch.ajax, ['ajax:build']);
});

//Очистка
gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});

//Запуск роботи з проектом
gulp.task('default', ['project:build', 'watch']);

gulp.task('github:build', function () {
    gulp.src(toGitHubPages)
        .pipe(gulp.dest('docs/'));
});