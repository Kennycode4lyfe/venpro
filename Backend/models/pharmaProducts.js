const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
const pharmProducts = sequelize.define('Pharm_products', {
  });
return pharmProducts;
}