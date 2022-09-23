const sequelize = require("../sequelize/sequelize");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("order", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   width: { type: DataTypes.INTEGER },
   height: { type: DataTypes.INTEGER },
   count: { type: DataTypes.INTEGER },
   price: { type: DataTypes.INTEGER },
   priceOfUnit: { type: DataTypes.INTEGER },
   material: { type: DataTypes.STRING },
   typeOfOrder: { type: DataTypes.STRING },
   area: { type: DataTypes.INTEGER },
   prodId: { type: DataTypes.INTEGER },
});
const User = sequelize.define("user", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   alias: { type: DataTypes.STRING, unique: true },
   role: { type: DataTypes.STRING, defaultValue: "USER" },
});
const Basket = sequelize.define("basket", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const OrderList = sequelize.define("orderList", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true },
   createdDate: { type: DataTypes.STRING },
});
module.exports = {
   Order,
   User,
   Basket,
   OrderList,
};

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(Order);
Order.belongsTo(Basket);
//////////////////////////////////////
User.hasMany(OrderList);
OrderList.belongsTo(User);

OrderList.hasMany(Order);
Order.belongsTo(OrderList);
