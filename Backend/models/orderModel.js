const { DATE } = require("sequelize")

 function orders (sequelize,DataTypes){

    const Order = sequelize.define('Order',{
    id:{
    type: DataTypes.CHAR(36),
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    // product_name:{
    //     type:DataTypes.STRING,
    //     allowNull:false,
    //     unique:true
    // },
    // quantity:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    order_date:{
    type:DataTypes.DATE,
    allowNull:false,
    defaultValue:Date.now
    },
    delivery_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: Date.now
        },

  
    tracking_number:{
        type:DataTypes.CHAR(36),
        defaultValue:DataTypes.UUIDV4,
        unique:true
    },
    delivery_fee:{
        type:DataTypes.INTEGER,
        Default: 2000
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
    values:['processing','shipped','cancelled'],
    defaultValue:'processing'
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


function orderProducts(sequelize, DataTypes){

    const Order_Products = sequelize.define('Order_product',
        {
            ProductId:{
                type: DataTypes.CHAR(36),
                references:{
                    model:'Products',
                    key:'id'
                }
            },
        
            quantity:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            OrderId:{
                type:DataTypes.CHAR(36),
                references:{
                    model:'Orders',
                    key:'id'
                }
            }
    
    
        },
        {tableName:'Order_products'}
    )
    return Order_Products
    }


    module.exports={
        orders,
        orderProducts
    }