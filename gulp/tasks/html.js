import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";
// import gulpHtmlImgWrapper from "gulp-html-img-wrapper";
import htmlBeautify from "gulp-html-beautify";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(fileinclude({
      basepath: "@root"
    }))
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     gulpHtmlImgWrapper({
    //       logger: false,
    //       extensions: [".jpg", ".jpeg"],
    //     })
    //   )
    // )
    .pipe(
      app.plugins.if(
        app.isBuild,
        htmlBeautify({
          indentSize: 4,
          preserve_newlines: false
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
