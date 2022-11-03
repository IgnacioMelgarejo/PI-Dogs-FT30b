const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperament', {

        name: {
            type: DataTypes.STRING,
        },
    },
        { timestamps: true, createdAt: "creado", updatedAt: false }
    );
};
// https://github.com/juan-alvarz/PI-dogs