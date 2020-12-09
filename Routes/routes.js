module.exports = (app) => {
  const logifont = require("../Controllers/latiguillos.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", logifont.create);

  // Retrieve all logifont
  router.get("/", logifont.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", logifont.findOne);

  // Update a Tutorial with id
  router.put("/:id", logifont.update);

  // Retrieve all published logifont
  /*  router.get("/published", logifont.findAllPublished);
  

  
    // Delete a Tutorial with id
    router.delete("/:id", logifont.delete);
  
    // Delete all logifont
    router.delete("/", logifont.deleteAll);*/

  app.use("/api/logifont", router);
};
