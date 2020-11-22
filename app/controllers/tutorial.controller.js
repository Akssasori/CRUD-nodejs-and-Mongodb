const db = require("../models");
const Tutorial = db.tutorials;

//criar e salvar um novo
exports.create = (req,res) => {
    if (!req.body.title){
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    // create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //Salva no banco
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some erro occurred while creating the tutorial"
            });
        });

};

//achar todos
exports.findAll = (req,res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials"
        });
    });

};

//achar um por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found tutorial with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id = " + id});
        });

};

//atualizar por id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to Update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe tutorial was not found `
                });
            } else res.send({ message: "Tutoria was update successfully"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id= " + id
            });
        });
    };
 

//deletar um com id
exports.delete = (req, res) =>{
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
     .then(data => {
         if (!data) {
             res.status(404).send({
                 message: `Cannot delete Tutorial with id=${id}. Maybe tutorial was not found!`
             });
         } else {
             res.send({
                 message: "Tutorial was deleted successfully!"
             });
         }
     })
     .catch(err => {
         res.status(500).send({
             message: "Could not delete Tutorial with id= " + id
         });
     });

};

//deletar todos
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all tutorials"
            });
        });
    
};

//encontrar todos
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving tutorials"
            });
        });

};