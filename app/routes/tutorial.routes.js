module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    // create a new tutorial
    router.post("/", tutorials.create);

    // retrieve all tutorials
    router.get("/", tutorials.findAll);

    // retrieve all tutorials
    router.get("/published", tutorials.findAllPublished);

    //retrieve a single tutorial with id
    router.get("/:id", tutorials.findOne);

    //update a tutorial with id
    router.put("/:id", tutorials.update);

    //Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    //delete a tutorial with id
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);


};