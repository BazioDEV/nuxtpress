require("dotenv").config();
var helpers = require("../_helpers");

var container = process.env.NUXTPRESS_WP_CONTAINER || "wp.nuxtpress";

helpers.checkContainers([container], function(containerRunning) {
  if (!containerRunning) {
    console.log(
      "ERROR: " +
        container +
        ' container is not running. Try "docker-compose up -d"'
    );
    return;
  }

  helpers.checkWPCli(container, function(wpCliRunning) {
    if (!wpCliRunning) {
      console.log("WARNING: wp cli not installed, trying auto install ...");

      helpers.installWPCli(container, function(wpCliRunning) {
        console.log("SUCCESS: wp cli installed!");
        helpers.generateWPTax(container, function() {
          console.log("done!");
        });
      });
    } else {
      helpers.generateWPTax(container, function() {
        console.log("done!");
      });
    }
  });
});
