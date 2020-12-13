module.exports = (sequelize, Sequelize) =>{

    const Warehouse = sequelize.define("warehouse", {
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

    return Warehouse;

}