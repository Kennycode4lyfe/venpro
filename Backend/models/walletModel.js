     function Wallet(sequelize, DataTypes){

    const Wallet = sequelize.define('Wallet',
        {
            id:{
                type: DataTypes.CHAR(36),
                unique:true,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            balance:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0
            },
           
            user_id:{
                type:DataTypes.CHAR(36),
                foreignKey:true,
                references:{
                    model:'users',
                    key:'id'
                }
            }
    
    
        },
        {tableName: 'Wallets'}
    )
    return Wallet
    }
    
    
    
    function walletTransaction(sequelize,DataTypes){
    
        const Wallet_transaction = sequelize.define('Wallet_transaction',
            {
                id:{
                    type: DataTypes.CHAR(36),
                    defaultValue:DataTypes.UUIDV4,
                  primaryKey:true
                },
                amount:{
                    type:DataTypes.INTEGER,
                    allowNull:false
                },
                type:{
                    type:DataTypes.ENUM,
                    values:['bank_transfer','debit_card','wallet']
                },
                order_id:{
                    type:DataTypes.CHAR(36),
                    references:{
                        model:'Orders',
                        key:'id'
                    }
                },
                wallet_id:{
                    type:DataTypes.CHAR(36),
                    references:{
                        model:'Wallets',
                        key:'id'
                    }
                },
                user_id:{
                    type:DataTypes.CHAR(36),
                    references:{
                        model:'Users',
                        key:'id'
                    }
                }
        
        
            },
            {tableName:'wallet_transactions'}
        )
        return Wallet_transaction
        }


        module.exports={
            Wallet,
            walletTransaction
        }