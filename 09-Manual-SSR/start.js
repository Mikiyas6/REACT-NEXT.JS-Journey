require("@babel/register")({
  extensions: [".js", ".jsx"],
  presets: ["@babel/preset-react"],
});
require("./server.js");
