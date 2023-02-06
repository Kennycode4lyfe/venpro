const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
const pharmProducts = sequelize.define('Pharm_products', {
    PharmId: {
      type: DataTypes.CHAR(36),
      references: {
        model: 'Pharmacies', 
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.CHAR(36),
      references: {
        model: 
        'Products', 
        key: 'id'
      }
    }
  });

  pharmProducts.associate = function (models) {
    pharmProducts.belongsTo(models.Pharmacy, {
        foreignKey: 'PharmId',
        onDelete: 'CASCADE'
    })
    pharmProducts.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE'
    })
}

return pharmProducts;
}