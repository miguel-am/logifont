const db = require("../Models");
const Warehouse = db.Warehouse;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {


  // Create a Tutorial
  const warehouse = {
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion,
    unidades:req.body.unidades,
    ean:req.body.ean,
    

  };

    // Save warehouse in the database
    Warehouse.create(warehouse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the warehouse."
      });
    });
};

//Retrieve all warehouses/ find by title from the database:
exports.findAll = (req, res) => {
 /* const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;*/

  Warehouse.findAll(/*{ where: condition }*/)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving warehouses."
      });
    });
};

exports.findOne = (req, res) => {
  const ean = req.body.ean;
  var condition = ean ? {ean:{[Op.like]: ean}} : null;
  
    Warehouse.findOne({where: condition})
      .then(data => {
        if(!data){
          return  res.json({message:"Referencia no encontrada."})
          }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving warehouse with ean=" + ean
        });
      });
  };

  exports.update = (req, res) => {
    const ean = req.body.ean;
  
    Warehouse.update(req.body, {
      where: { ean: ean }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "warehouse references was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update warehouse references with ean=${ean}. Maybe warehouse references was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating warehouse with ean=" + ean
        });
      });
  };