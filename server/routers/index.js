const apiRouter = require("./api/apiRouter");
const passport = require("passport");


function route(app) {
  app.use("/api", apiRouter);
  
}

module.exports = route;
