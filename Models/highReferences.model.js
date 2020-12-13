module.exports = (sequelize, Sequelize) =>{

    const HighReferences = sequelize.define("highRefences", {
        operario:{
           type:Sequelize.STRING
        },
        codigo: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        ubicacion: {
            type: Sequelize.STRING
        },
        unidades: {
            type: Sequelize.BIGINT
        },
        ean: {
            type: Sequelize.BIGINT
        },

    })

    return HighReferences;

}