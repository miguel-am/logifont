const db = require("../Models");
const user = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const { roles } = require('../access-roles/roles');

const schemaRegister = Joi.object({
    Operario: Joi.string().min(6).max(100).required(),
    user: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(255).required(),
    role:Joi.string().min(4).max(255).required(),
  
  });
  
  const schemaLogin = Joi.object({
    user: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(255).required(),
    role:Joi.string().min(4).max(255).required(),
  });

exports.create = async (req, res) => {

    const { error } = schemaRegister.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    var usu = req.body.user;
    var pass = req.body.password;

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, saltos);
  // Create a references
  const users = {
    Operario:req.body.Operario,  
    user: usu,
    password: password,
    role:req.body.role,

  };

    // Save references in the database
    user.create(users)
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

    const { error } = schemaLogin.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
   const userW = req.body.user;
   const password = req.body.password;



    var condition =  userW  ? { user: { [Op.like]: userW } } : null;
    //var condition2 =  password ? {password: { [Op.like]: password }}: null;
   
    user.findAll({ where: condition })
      .then(data => {
        bcrypt.compare(password, data[0].password, function(err, resp) {
            if(!resp){
             return res.status(400).json({
                error:true,
                message:'Contrasena incorrecta'
              })
            }

      const token = jwt.sign({
        name:data[0].user,
        id:data[0].id
      },"" + process.env.TOKEN_SECRET);
      
      res.header('auth-token', token).json({
        error:null,
        role:data[0].role,
        operario:data[0].Operario,
        data:token
      })

      })
  
    }).catch(err => {
        res.status(500).send({
          message:
             "No se encontro al usuario."
        });
      });


   };
   exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
     
      const permission = roles.can(req.body.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }
    
   exports.allowIfLoggedin = async (req, res, next) => {
    try {
      const userW = req.body.user;
   const password = req.body.password;



    var condition =  userW  ? { user: { [Op.like]: userW } } : null;
    //var condition2 =  password ? {password: { [Op.like]: password }}: null;
   
    user.findAll({ where: condition })
      .then(data => {
        bcrypt.compare(password, data[0].password, function(err, resp) {
            if(!resp){
             return res.status(400).json({
                error:true,
                message:'Contrasena incorrecta'
              })
            }
            const user =data;
            if (!user)
            return res.status(401).json({
             error: "You need to be logged in to access this route"
            });
            req.user = user;
            next();
      })
  
    }).catch(err => {
        res.status(500).send({
          message:
             "No se encontro al usuario."
        });
      });
     
    
     } catch (error) {
      next(error);
     }
   }

   exports.delete = (req, res) => {
    const operario = req.body.operario;
  
    user.destroy({
      where: { operario: operario }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with operario=${operario}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with operario=" + operario
        });
      });
  };
