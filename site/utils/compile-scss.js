var sass = require("node-sass");
var path = require("path");
var CleanCSS = require("clean-css");
require("css.escape");

// Create a visual error message to overlay the site
const CSSError = error => `/* Error compiling stylesheet */
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
} 
body::before { 
  content: ''; 
  background: white;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  position: fixed;
}
body::after { 
  content: '${CSS.escape(error)}'; 
  white-space: pre;
  display: block;
  top: 0; 
  padding: 30px;
  margin: 30px;
  width: calc(100% - 60px);
  background: #ffd1d1;
  border: solid 1px red;
  opacity: 0.9;
  position: fixed;
}`;

const compileScss = scss => {
  let result;
  try {
    result = sass.renderSync({
      file: path.join(__dirname, "../../", scss)
    });
  } catch (error) {
    result = error;
  }

  if (!result.css) {
    console.error("Error compiling stylesheet");
    console.log(result);
    return CSSError(result.message || "Error compiling stylesheet");
  }

  const minifiedCSS = new CleanCSS().minify(result.css.toString());

  if (!minifiedCSS.styles) {
    console.error("Error compiling stylesheet");
    console.log(minifiedCSS.error);
    return CSSError(minifiedCSS.error);
  }

  return minifiedCSS.styles;
};

module.exports = {
  compileSassTargets: targets =>
    Object.keys(targets).reduce((acc, key) => {
      acc[key] = compileScss(targets[key]);
      return acc;
    }, {})
};
