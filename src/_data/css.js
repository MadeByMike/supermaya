const { scss } = require("./site");
var sass = require("node-sass");
var path = require("path");
var CleanCSS = require("clean-css");
require("css.escape");

const CSSError = error => `/* Error compiling stylesheet */
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
} 
body::before { 
  content: '${CSS.escape(error)}'; 
  whitespace: pre;
  display: block;
  top: 0; 
  padding: 30px;
  margin: 30px;
  background: #ffd1d1;
  border: solid 1px red;
  opacity: 0.9;
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

module.exports = Object.keys(scss).reduce((acc, key) => {
  acc[key] = compileScss(scss[key]);
  return acc;
}, {});
