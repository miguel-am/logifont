module.exports = (app) => {
  const logifont = require("../Controllers/latiguillos.controller");
  const references = require("../Controllers/highReferences.controller");
  const user = require("../Controllers/user.controller");
  const warehouse = require("../Controllers/warehouse.controller");
  const validateToken = require("./validate-token");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", logifont.create);

  // Retrieve all logifont
  router.get("/latiguillos", logifont.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", logifont.findOne);

  // Update a Tutorial with id
  // router.put("/:id", logifont.update);

  //create a new references
  router.post(
    "/create",
    validateToken,
    user.grantAccess("readAny", "profile"),
    references.create
  );

  //update a references
  router.put(
    "/put",
    validateToken,
    user.grantAccess("updateOwn", "profile"),
    references.update
  );

  //Retrieve one references ean
  router.get(
    "/find/one",
    validateToken,
    user.grantAccess("readAny", "profile"),
    references.findOne
  );
  // Delete a user 
  router.delete("/delete", user.delete);
  // Create a new warehouse
  router.post(
    "/create/warehouse",
    validateToken,
    user.grantAccess("createOwn", "profile"),
    warehouse.create
  );

  // Retrieve all warehouse
  router.get("/find/all/warehouse", validateToken, warehouse.findAll);

  // Retrieve a single warehouse with ean
  router.post(
    "/find/one/warehouse",
    validateToken,
    user.grantAccess("readAny", "profile"),
    warehouse.findOne
  );

  // Update a warehouse with ean
  router.put(
    "/put/warehouse",
    validateToken,
    user.grantAccess("updateOwn", "profile"),
    warehouse.update
  );

  //create a new user
  router.post("/create/user", user.create);

  //Retrieve one user
  router.post(
    "/find/one/user",
    user.grantAccess("readAny", "profile"),
    user.findAll
  );

  // Retrieve all published logifont
  /*  router.get("/published", logifont.findAllPublished);
  

  
    // Delete a Tutorial with id
    router.delete("/:id", logifont.delete);
  
    // Delete all logifont
    router.delete("/", logifont.deleteAll);*/

  app.use("/api/logifont", router);
};
