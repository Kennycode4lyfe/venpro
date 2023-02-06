module.exports = (sequelize,DataTypes)=>{

    const Pharmacy = sequelize.define('Pharmacy',{
    id:{
    type: DataTypes.CHAR(36),
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    pharmacy_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    phone_no:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
    },
    licence_no:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    // user_id:{
    //     type:DataTypes.CHAR(36),
    //    references:{ model: 'Users',
    //     key: 'id'}
    // },
    subscription_status:{
        type:DataTypes.ENUM,
        values:['monthly','quarterly','yearly']

    }

    },{
        tableName:'Pharmacies'
    }
    )
    return Pharmacy
    }