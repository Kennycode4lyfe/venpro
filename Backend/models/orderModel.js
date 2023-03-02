const { DATE } = require("sequelize")

module.exports = (sequelize,DataTypes)=>{

    const Order = sequelize.define('Order',{
    id:{
    type: DataTypes.CHAR(36),
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    order_date:{
    type:DataTypes.DATE,
    allowNull:false,
    defaultValue:DATE.now
    },
    delivery_date:{
        type:DataTypes.DATE,
        allowNull:false
        },

  
    tracking_number:{
        type:DataTypes.CHAR(36),
        unique:true
    },
    delivery_fee:{
        type:DataTypes.INTEGER
},
cart_id:{
    type:DataTypes.CHAR(36),
    references:{
        model:'Carts',
        key:'id'
    }
},
status:{
    type:DataTypes.ENUM,
    values:['processing','shipped','cancelled']
},
user_id:{
    type:DataTypes.CHAR(36),
    references:{
        model:'Users',
        key:'id'
    }
}
    },
    {
        tableName:'Orders'
    }
    )
return Order
}


