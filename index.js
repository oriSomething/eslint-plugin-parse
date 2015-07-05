module.exports = {
  rules: {
    "does-not-exist": require("./lib/rules/does-not-exist"),
    "global-master": require("./lib/rules/global-master"),
    "save-with-master": require("./lib/rules/save-with-master")
  },
  rulesConfig: {
    "does-not-exist": 2,
    "global-master": 1,
    "save-with-master": 2
  }
};
