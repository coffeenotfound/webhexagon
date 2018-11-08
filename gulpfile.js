const gulp = require("gulp");
const browserify = require("browserify");
const tsify = require("tsify");
const source = require("vinyl-source-stream");

const config = {
	paths: {
		build: "./build"
	}
};

gulp.task("generate-website", function() {
	return gulp.src("./web/*")
	.pipe(gulp.dest("./build/"));
});

gulp.task("compile-ts", function() {
	return browserify({
		basedir: "./",
		paths: ["./src/"],
		entries: ["./src/Entrypoint.ts"]
	})
	.plugin(tsify)
	.bundle()
	.pipe(source("webhexagon.js"))
	.pipe(gulp.dest("./build/"));
});

gulp.task("build", ["generate-website", "compile-ts"], function() {});
