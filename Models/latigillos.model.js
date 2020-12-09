module.exports = (sequelize, Sequelize) =>{

    const Latiguillos = sequelize.define("latiguillos", {
        Codigo: {
            type: Sequelize.STRING
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Ubicacion: {
            type: Sequelize.STRING
        },
        EAN: {
            type: Sequelize.BIGINT
        },
        Embalaje: {
            type: Sequelize.STRING
        },
        Minimo: {
            type: Sequelize.STRING
        },
        Ideal: {
            type: Sequelize.STRING
        },
    })

    return Latiguillos;

}