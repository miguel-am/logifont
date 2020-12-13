const db = require("../Models");
const Latiguillos = db.latiguillos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

  // Create a Tutorial
  const tutorial = {
    Codigo: req.body.Codigo,
    Nombre: req.body.Nombre,
    Ubicacion: req.body.Ubicacion,
    EAN:req.body.EAN,
    Embalaje:req.body.Embalaje,
    Minimo:req.body.Minimo,
    Ideal:Ideal,
  };

    // Save Tutorial in the database
    Latiguillos.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

//Retrieve all Tutorials/ find by title from the database:
exports.findAll = (req, res) => {
 /* const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;*/

  Latiguillos.findAll(/*{ where: condition }*/)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Latiguillos.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Latiguillos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
 