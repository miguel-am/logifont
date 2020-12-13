const db = require("../Models");
const HighReferences = db.highReferences;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

   
  // Create a references
  const references = {
    operario:req.body.operario,  
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion,
    unidades:req.body.unidades,
    ean:req.body.ean,
  };

    // Save references in the database
    HighReferences.create(references)
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

//Retrieve all references/ find by operario from the database:
exports.findAll = (req, res) => {
   
   const ean = req.query.ean;
   const operario = req.query.operario;
     var condition =  ean  ? { ean: { [Op.like]: ean } } : null;
     var condition2 =  operario ? {operario: { [Op.like]: operario }}: null;
     HighReferences.findAll({ where: condition || condition2  })
       .then(data => {
         res.json(data);
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving tutorials."
         });
       });
   };

   exports.update = (req, res) => {
    const ean = req.body.ean;
  
    HighReferences.update(req.body, {
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

  exports.findOne = (req, res) => {
    const ean = req.body.ean;
    var condition = ean ? {ean:{[Op.like]: ean}} : null;
    
      HighReferences.findOne({where: condition})
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