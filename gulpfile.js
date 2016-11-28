var gulp   = require('gulp');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var jsDest = 'dist/scripts';
var cssDest = 'dist/styles';

gulp.task('scripts', function() {  
    return gulp.src([
    					'node_modules/angular/angular.js',
    					'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-touch/angular-touch.js',
    					'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.js',
                        'node_modules/angular-cookies/angular-cookies.js',
                        'node_modules/angular-uuid/angular-uuid.js',
                        'node_modules/aws-sdk/dist/aws-sdk.js',

                        'bower_components/angular-image-compress/angular-image-compress.js',
                        'bower_components/angular-breadcrumb/dist/angular-breadcrumb.js',

    					'app/app.module.js',
    					'app/core/core.module.js',
                        'app/core/config.js',
                        'app/core/constants.js',
                        'app/core/data.service.js',
                        'app/blocks/util/util.module.js',
                        'app/blocks/util/randomStringGenerator.js',
                        'app/blocks/util/base64ImgURI2Blob.js',
                        'app/blocks/logger/logger.module.js',
                        'app/blocks/logger/logger.js',
                        'app/blocks/form/form.module.js',
                        'app/blocks/form/show-errors.directive.js',
    					'app/layout/layout.module.js',
                        'app/layout/loading-modal.directive.js',
    					'app/restaurant/restaurant.module.js',
                        'app/restaurant/restaurant-list.controller.js',
                        'app/restaurant/restaurant-menu-modal.controller.js',
                        'app/restaurant/restaurant-menu-modal.directive.js',
                        'app/restaurant/restaurant-menu-details-modal.controller.js',
                        'app/restaurant/restaurant-menu-details-modal.directive.js',
                        'app/restaurant/restaurant-details.controller.js',
                        'app/restaurant/restaurant-create.controller.js',
                        'app/user/user.module.js',
                        'app/user/login.controller.js'

    				])
        .pipe(concatJs('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('css', function () {
  return gulp.src([
    					'node_modules/bootstrap/dist/css/bootstrap.css',

    					'app.css',

    				])
    .pipe(concatCss('app.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(rename('app.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(cssDest));
});

gulp.task('default', ['scripts', 'css']);