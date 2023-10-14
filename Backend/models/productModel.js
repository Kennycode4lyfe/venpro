function Product(sequelize,DataTypes){

    const Product = sequelize.define('Product',{
    id:{
    type: DataTypes.CHAR(36),
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    brand_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    drug_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    drug_class:{
        type:DataTypes.CHAR(36),
        
        foreignKey: true,        
        references:{
            model: 'drug_class',
            key:'id'
        }   
    },

    drug_price:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:false
    },

    exp_date:{
        type:DataTypes.DATE,
        allowNull:false,
        unique:false
    },
    quantity:{
        type:DataTypes.INTEGER
    },
    reserved_quantity:{
        type:DataTypes.INTEGER
    },

    },
    {
        tableName:'Products'
    }
    )
return Product
}


function drugClass(sequelize,DataTypes){

const Drug_Class = sequelize.define('Drug_class',
{
id:{
    type: DataTypes.CHAR(36),
    defaultValue: DataTypes.UUIDV4,
    primaryKey:true
},
name:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
}
},{
    tableName: 'drug_class'
}
)
return Drug_Class
}

module.exports={
    Product,
    drugClass
}