import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import jsonTransform from "gulp-json-transform";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
};

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { images, imagesWebp } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { killTask } from "./gulp/tasks/kill-task.js";

function translations() {
  return gulp.src('./src/json/*.json') 
    .pipe(jsonTransform(function(data) {
        return data; 
    }))
    .pipe(gulp.dest('./build/translations'));  
}

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.scripts, scripts);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copy, html, scss, scripts, images);

const dev = gulp.series(reset, mainTasks, translations , gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, translations , imagesWebp, killTask);

export { dev };
export { build };

gulp.task("dev", dev);
gulp.task("build", build);
gulp.task("fontsGenerator", fonts);
gulp.task("spriteGenerator", svgSprite);
gulp.task("translations", translations);