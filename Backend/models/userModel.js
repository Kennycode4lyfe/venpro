const bcrypt = require('bcrypt')


module.exports = (sequelize,DataTypes)=>{

const User = sequelize.define('User',{
id:{
type: DataTypes.CHAR(36),
defaultValue:DataTypes.UUIDV4,
primaryKey:true
},
first_name:{
    type:DataTypes.STRING,
    allowNull:false
},
last_name:{
    type:DataTypes.STRING,
    allowNull:false
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
},
password:{
type:DataTypes.STRING,
allowNull:false,
unique:true
}
},{
    tableName:'Users'
})

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password,10);
  user.password = hashedPassword;
});

return User
}