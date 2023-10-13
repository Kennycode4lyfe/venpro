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



// User and Pharmacy: One-to-One
db.users.hasOne(db.pharmacy,{foreignKey:'user_id'});
db.pharmacy.belongsTo(db.users,{foreignKey:'user_id'});

// Product and Drug Class: One-to-Many
db.drugClass.hasMany(db.products);
db.products.belongsTo(db.drugClass);

// User and Cart: One-to-One
db.users.hasOne(db.Cart,{foreignKey:'user_id'});
db.Cart.belongsTo(db.users,{foreignKey:'user_id'});

// User and Wallet: One-to-One
db.users.hasOne(db.wallet,{foreignKey:'user_id'});
db.wallet.belongsTo(db.users,{foreignKey:'user_id'});

// User and Wallet Transaction: One-to-Many
db.users.hasMany(db.walletTransaction);
db.walletTransaction.belongsTo(db.users);

// Wallet and Wallet Transaction: One-to-Many
db.wallet.hasMany(db.walletTransaction);
db.walletTransaction.belongsTo(db.wallet);

// User and Order: One-to-Many
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// Order and Products: Many-to-Many
db.orders.belongsToMany(db.products, { through: 'OrderProducts' });
db.products.belongsToMany(db.orders, { through: 'OrderProducts' });

// Product and Pharmacy: Many-to-Many
db.products.belongsToMany(db.pharmacy, { through: 'Pharm_products' });
db.pharmacy.belongsToMany(db.products, { through: 'Pharm_products' });

// Cart and Product: Many-to-Many
db.Cart.belongsToMany(db.products, { through: 'Cart_product' });
db.products.belongsToMany(db.Cart, { through: 'Cart_product' });


// sync all models
// force: false will not drop the table if it already exists
db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables synced');
    }).catch(err => {
        console.error('Unable to sync database & tables:', err);
    })



module.exports = db;