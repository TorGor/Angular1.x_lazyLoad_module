var args = require('yargs').argv,
    path = require('path'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    del = require('del'),
    express = require('express'),
    moduleSetting = require('./commonModuleManage'),
    needRepalce = {};

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;


// Angular template cache
// Example:
//    gulp --usecache
var useCache = args.usecache;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: 'dist/',
    markup: 'pug/',
    styles: 'less/',
    scripts: 'js/',
    superAdmin: 'superAdmin/',
    admin: 'admin/',
    login: 'login/',
    changePassword: 'changePassword/',
    static: ['static/i18n/', 'static/admin/', 'static/img/', 'static/fonts/']
};


// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require('./vendor.base.json'),
        js: 'base.js',
        css: 'base.css'
    },
    // vendor scripts to make the app work. Usually via lazy loading
    app: {
        source: require('./vendor.json'),
        dest: './dist/vendor'
    }
};


// SOURCES CONFIG
var source = {
    superAdmin: [
        // custom modules
        paths.superAdmin + '**/*.module.js',
        paths.superAdmin + '**/*.js'
    ],
    admin: [
        // custom modules
        paths.admin + '**/*.module.js',
        paths.admin + '**/*.js'
    ],
    static: paths.static.map(function (staticItem) {
        return staticItem + '**/**.*';
    }),
    login: [
        // custom modules
        paths.login + '**/*.module.js',
        paths.login + '**/*.js'
    ],
    changePassword: [
        // custom modules
        paths.changePassword + '**/*.module.js',
        paths.changePassword + '**/*.js'
    ],
    routes: [paths.scripts + 'modules/routes/*.routes.config.js'],
    scripts: [
        paths.scripts + 'app.module.js',
        // template modules
        paths.scripts + 'modules/**/*.module.js',
        paths.scripts + 'modules/**/*.js',
        '!' + paths.scripts + 'modules/routes/*.routes.config.js',
    ],
    templates: {
        index: [paths.markup + '*.html'],
        views: [paths.markup + '**/*.html', paths.superAdmin + '**/**.html', paths.admin + '**/**.html', '!' + paths.markup + '*.html']
    },
    styles: {
        app: [paths.styles + '*.*'],
        themes: [paths.styles + 'themes/*'],
        watch: [paths.styles + '**/*', '!' + paths.styles + 'themes/*']
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.app + 'js',
    styles: paths.app + 'css',
    templates: {
        index: './dist',
        views: paths.app,
        cache: paths.app + 'js/templates.js',
    }
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 3,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

var vendorUglifyOpts = {
    mangle: {
        except: ['$super', '$event'] // rickshaw requires this
    }
};

var tplCacheOptions = {
    root: 'app',
    filename: 'templates.js',
    // standalone: true,
    module: 'app.core',
    base: function (file) {
        return file.path.split('pug')[1];
    }
};

var injectOptions = {
    name: 'templates',
    transform: function (filepath) {
        return 'script(src=\'' +
            filepath.substr(filepath.indexOf('app')) +
            '\')';
    }
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false, // no change on @keyframes names
    zindex: false // no change z-index
};

// ---------------
// TASKS
// ---------------

// copy Static
gulp.task('scripts:static', function () {
    log('copy static file..');
    return gulp.src(source.static, {base: 'static/'})
        .on('error', handleError)
        .pipe(gulp.dest(paths.app))
        .pipe(reload({
            stream: true
        }));
});

// JS login
gulp.task('scripts:login', function () {
    log('Building scripts login..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.login)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('login.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// JS changePassword
gulp.task('scripts:changePassword', function () {
    log('Building scripts changePassword..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.changePassword)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('changePassword.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// JS APP
gulp.task('scripts:superAdmin', function () {
    log('Building scripts superAdmin..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.superAdmin)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('superAdmin.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// JS APP
gulp.task('scripts:admin', function () {
    log('Building scripts admin..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.admin)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('admin.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// JS routes
gulp.task('scripts:routes', function () {
    log('Building scripts routes..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.routes, {
        base: 'js/modules/routes'
    })
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// JS APP
gulp.task('scripts:app', function () {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.stripDebug()))
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});

// copy file from bower folder into the app vendor folder
gulp.task('vendor:app', function () {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.app.source, {
        base: 'bower_components'
    })
        .pipe($.expectFile(vendor.app.source))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(vendor.app.dest));

});

// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function () {
    log('Copying base vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.base.source)
        .pipe($.expectFile(vendor.base.source))
        .pipe(jsFilter)
        .pipe($.concat(vendor.base.js))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest(build.scripts))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.concat(vendor.base.css))
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(gulp.dest(build.styles))
        .pipe(cssFilter.restore);
});

// VENDOR BUILD
gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']));

// APP LESS
gulp.task('styles:app', function () {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.less())
        .on('error', handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// APP RTL
gulp.task('styles:app:rtl', function () {
    log('Building application RTL styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.less())
        .on('error', handleError)
        .pipe($.rtlcss()) /* RTL Magic ! */
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe($.rename(function (path) {
            path.basename += '-rtl';
            return path;
        }))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// LESS THEMES
gulp.task('styles:themes', function () {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe($.less())
        .on('error', handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// PUG (ex JADE)
gulp.task('templates:index', ['templates:views'], function () {
    log('Building index..');

    var tplscript = gulp.src(build.templates.cache, {
        read: false
    });
    return gulp.src(source.templates.index)
        .pipe($.if(useCache, $.inject(tplscript, injectOptions))) // inject the templates.js into index
        .on('error', handleError)
        .pipe($.htmlPrettify(prettifyOpts))
        .pipe(gulp.dest(build.templates.index))
        .pipe(reload({
            stream: true
        }));
});

// PUG (ex JADE)
gulp.task('templates:views', function () {
    log('Building views.. ' + (useCache ? 'using cache' : ''));

    if (useCache) {

        return gulp.src(source.templates.views)
            .on('error', handleError)
            .pipe($.angularTemplatecache(tplCacheOptions))
            .pipe($.if(isProduction, $.uglify({
                preserveComments: 'some',
                output: {
                    max_line_len: 120000 // cached html can reach default limit easily
                }
            })))
            .pipe(gulp.dest(build.scripts))
            .pipe(reload({
                stream: true
            }));
    } else {

        return gulp.src(source.templates.views)
            .pipe($.if(!isProduction, $.changed(build.templates.views, {
                extension: '.html'
            })))
            .on('error', handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.views))
            .pipe(reload({
                stream: true
            }));
    }
});

// ---------------
// WATCH
// ---------------

// Rerun the task when a file changes
gulp.task('watch', function () {
    log('Watching source files..');

    gulp.watch(source.scripts, ['scripts:app']);
    gulp.watch(source.superAdmin, ['scripts:superAdmin']);
    gulp.watch(source.superAdmin, ['scripts:admin']);
    gulp.watch(source.login, ['scripts:login']);
    gulp.watch(source.static, ['scripts:static']);
    gulp.watch(source.changePassword, ['scripts:changePassword']);
    gulp.watch(source.routes, ['scripts:routes']);
    gulp.watch(source.styles.watch, ['styles:app', 'styles:app:rtl']);
    gulp.watch(source.styles.themes, ['styles:themes']);
    gulp.watch(source.templates.views, ['templates:views']);
    gulp.watch(source.templates.index, ['templates:index']);

});

// Serve files with auto reaload
gulp.task('browsersync', function () {
    log('Starting BrowserSync..');

    browserSync({
        notify: false,
        port: 3010,
        server: {
            baseDir: './dist',
            directory: true
        },
        middleware: [require('connect-history-api-fallback')()]
    });

});

// lint javascript
gulp.task('lint', function () {
    return gulp
        .src(source.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

// Remove all files from the build paths
gulp.task('clean', function (done) {
    var delconfig = [].concat(
        build.styles,
        build.scripts,
        build.templates.index + 'index.html',
        build.templates.views + 'views',
        build.templates.views + 'pages',
        vendor.app.dest
    );

    log('Cleaning: ' + $.util.colors.blue(delconfig));
    // force: clean files outside current directory
    del(delconfig, {
        force: true
    }).then(function () {
        done();
    });
});


gulp.task('addNewModuleInitial', function () {
    for (i in moduleSetting) {
        moduleSetting[i] = moduleSetting[i].toLowerCase();
    }
    needRepalce = {
        commonModule: moduleSetting.common + ucfirst(moduleSetting.module),
        CommonModule: ucfirst(moduleSetting.common) + ucfirst(moduleSetting.module),
        'common-module': moduleSetting.common + '-' + moduleSetting.module,
        '/common/module/': '/' + moduleSetting.common + '/' + moduleSetting.module + '/',
        COMMONMODULETITLE: moduleSetting.title
    };
    needRepalce.path = needRepalce.commonModule;
});

gulp.task('addNewModuleRenameMove', function () {
    var REG = {
        commonModule: '',
        CommonModule: '',
        'common-module': '',
        '/common/module/': '',
        COMMONMODULETITLE: ''
    };
    for (j in REG) {
        REG[j] = new RegExp(j, 'g');
    }
    return gulp.src(['./commonModuleManage/**/.*'], {base: './commonModuleManage'})
        .pipe($.replace(REG['commonModule'], needRepalce['commonModule']))
        .pipe($.replace(REG['CommonModule'], needRepalce['CommonModule']))
        .pipe($.replace(REG['common-module'], needRepalce['common-module']))
        .pipe($.replace(REG['/common/module/'], needRepalce['/common/module/']))
        .pipe($.replace(REG['COMMONMODULETITLE'], needRepalce['COMMONMODULETITLE']))
        .pipe($.rename({
            prefix: '/' + needRepalce['commonModule'] + '/' + needRepalce['commonModule'],
        }))
        .pipe(gulp.dest('./admin'));
});


gulp.task('addModuleNameToAppModule', function () {
    var str = '//new module name will be append here';
    return gulp.src(['./admin/admin.module.js'], {base: './admin'})
        .pipe($.replace(new RegExp(str, 'g'), '\'' + 'admin.' + needRepalce['commonModule'] + '\',' + '\n\t\t\t' + str))
        .pipe(gulp.dest('./admin'));
});

gulp.task('addModuleNameToAppRoute', function () {
    var str = '//new route name will be append here';
    return gulp.src(['./js/modules/routes/admin.routes.config.js'], {base: '.'})
        .pipe($.replace(new RegExp(str, 'g'),
            `.state('admin.${needRepalce['commonModule']}', {
                url: '/${needRepalce['commonModule']}/manage',
                title: '${needRepalce['commonModule']} Manage',
                controller: '${needRepalce['CommonModule']}Controller',
                templateUrl: RouteHelpersProvider.basepath('admin/${needRepalce['commonModule']}/${needRepalce['commonModule']}.html'),
                permission: '${needRepalce['commonModule']}'
            })
            
            //new route name will be append here
            `))
        .pipe(gulp.dest('.'));
});

gulp.task('addModuleNameToAppSidebar', function () {
    var str = '//new sidebar name will be append here';
    return gulp.src(['./js/modules/sidebar/sidebar.constant.js'], {base: '.'})
        .pipe($.replace(new RegExp(str, 'g'),
            `,
                {
                    "text": "${needRepalce['COMMONMODULETITLE']}",
                    "sref": "admin.${needRepalce['commonModule']}",
                    "icon": "glyphicon glyphicon-th-large",
                }//new sidebar name will be append here
            `))
        .pipe(gulp.dest('.'));
});

function ucfirst(str) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}

gulp.task('addNewModule', function () {
    runSequence(['addNewModuleInitial'], ['addNewModuleRenameMove'], ['addModuleNameToAppRoute', 'addModuleNameToAppModule', 'addModuleNameToAppSidebar']);
});

// ---------------
// MAIN TASKS
// ---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
    'prod',
    'vendor',
    'assets'
]));

gulp.task('prod', function () {
    log('Starting production build...');
    isProduction = true;
});

// Server for development
gulp.task('server', gulpsync.sync([
    'default',
    'browsersync'
]), done);

// Server for production
gulp.task('serve-prod', gulpsync.sync([
    'build',
    'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function () {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'scripts:app',
    'scripts:superAdmin',
    'scripts:admin',
    'scripts:login',
    'scripts:static',
    'scripts:changePassword',
    'scripts:routes',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:index',
    'templates:views'
]);


function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}