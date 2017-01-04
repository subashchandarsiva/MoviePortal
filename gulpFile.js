const gulp = require('gulp');
const eslint = require('gulp-eslint');
 
gulp.task('lint', () => {
    
    return gulp.src(['**/*.js','**/*.jsx','!node_modules/**'])
        .pipe(eslint.format({
        	"rules":{
		        "camelcase": 1,
		        "comma-dangle": 2,
		        "quotes": 0
    				},

    			"envs":{
					 "node": true,
					 "es6": true
					 },
		    "parserOptions":
				{
					 "ecmaVersion": 6,
					 "sourceType": module,
					 "ecmaFeatures":
					 {
					   "jsx": true
					}
				}
        }))
        .pipe(eslint.failAfterError());
});
 
gulp.task('default', ['lint'], function () {
	console.log("success"); 
});