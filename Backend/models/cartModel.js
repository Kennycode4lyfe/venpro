function Cart(sequelize, DataTypes){

const Cart = sequelize.define('Cart',
    {
        id:{
            type: DataTypes.CHAR(36),
            unique:true,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        purchased:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        total:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        user_id:{
            type:DataTypes.CHAR(36),
            references:{
                model:'Users',
                key:'id'
            }
        }


    },
    {tableName:'Carts'}
)
return Cart
}



 function cartProducts(sequelize, DataTypes){

    const Cart_Products = sequelize.define('Cart_product',
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
            CartId:{
                type:DataTypes.CHAR(36),
                references:{
                    model:'Carts',
                    key:'id'
                }
            }
    
    
        },
        {tableName:'Cart_products'}
    )
    return Cart_Products
    }

    module.exports={
        cartProducts,
        Cart
    }