var sass = require("node-sass");
var path = require("path");

const compileScss = () => {
  const result = sass.renderSync({
    file: path.join(__dirname, "../../scss/main.scss")
  });

  if (!result.css) {
    console.log("Error compiling stylesheet");
    return "/* Error compiling stylesheet */";
  }

  return result.css.toString();
};
module.exports = compileScss();
