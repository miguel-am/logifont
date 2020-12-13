module.exports = (sequelize, Sequelize) =>{
 

    const user = sequelize.define("user", {
        Operario:{
           type:Sequelize.STRING
        },
        user: {
            type: Sequelize.STRING,

        },
        password: {
            type: Sequelize.STRING,
        
        },
        role:{
            type: Sequelize.STRING,
            default:'user',
            enum:['user','admin']
        }

    })

    
    return user;

}


