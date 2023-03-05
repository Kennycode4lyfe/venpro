const dbConfig = require('../db/db');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialet,
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    })

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Add our tables
db.users = require('./userModel')(sequelize, DataTypes);
db.pharmacy = require('./pharmaModel')(sequelize, DataTypes)
db.drugClass = require('./productModel').drugClass(sequelize, DataTypes)
db.products = require('./productModel').Product(sequelize, DataTypes);
db.cartProducts = require('./cartModel').cartProducts(sequelize,DataTypes)
db.Cart = require('./cartModel').Cart(sequelize,DataTypes)
db.orders = require('./orderModel')(sequelize,DataTypes)
db.wallet = require('./walletModel').Wallet(sequelize,DataTypes)
db.walletTransaction = require('./walletModel').walletTransaction(sequelize,DataTypes)







db.pharmProducts = require('./pharmaProducts')(sequelize,DataTypes)
// sync all models
// force: false will not drop the table if it already exists
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables synced');
    }).catch(err => {
        console.error('Unable to sync database & tables:', err);
    })

//Add many-to-many relationship between authors and books using a through table called BookAuthors
db.users.hasOne(db.Cart)
db.Cart.belongsTo(db.users)

db.users.hasOne(db.wallet)
db.wallet.belongsTo(db.users)

db.wallet.hasMany(db.walletTransaction)
db.walletTransaction.belongsTo(db.wallet)

db.users.hasMany(db.walletTransaction)
db.walletTransaction.belongsTo(db.users)

db.walletTransaction.hasOne(db.orders)
db.orders.belongsTo(db.walletTransaction)

db.users.hasMany(db.orders)
db.orders.belongsTo(db.users)

db.Cart.hasMany(db.orders)
db.orders.belongsTo(db.Cart)

db.Cart.hasMany(db.cartProducts)
db.cartProducts.belongsTo(db.Cart)

db.products.hasMany(db.cartProducts)
db.cartProducts.belongsTo(db.products)

db.users.hasOne(db.pharmacy
    ,{foreignKey:{
    name:'user_id',
    allowNull:true,
    type:DataTypes.CHAR(36)
}}
)
db.pharmacy.belongsTo(db.users,{foreignKey:{
    name:'user_id',
    allowNull:true,
    type:DataTypes.CHAR(36)
}})
db.pharmacy.belongsToMany(db.products, { through: 'pharm_products',
foreignKey:"pharmacy_id" });

db.products.belongsToMany(db.pharmacy, { through: 'pharm_products' ,
foreignKey:"product_id"});



module.exports = db;