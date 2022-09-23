const { Order, Basket, OrderList } = require("../dbModels/dbModels");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const jwt_decode = require("jwt-decode");

class itemConroller {
   async get(req, res) {
      try {
         let order = await Order.findAll();
         console.log(order);
         return res.json(order);
      } catch (err) {
         console.log(err);
      }
   }
   async post(req, res) {
      try {
         let {
            width,
            height,
            count,
            price,
            priceOfUnit,
            material,
            typeOfOrder,
            area,
            prodId,
         } = req.body;
         const order = await Order.create({
            width,
            height,
            count,
            price,
            priceOfUnit,
            material,
            typeOfOrder,
            area,
            prodId,
         });
         const find = req.headers.authorization.split(" ")[1];
         console.log(find);
         console.log(order);
         return res.json(order);
      } catch (err) {
         console.log(err);
      }
   }
   async test(req, res) {
      try {
         console.log(req.body);

         const find = req.headers.authorization.split(" ")[1];
         console.log(find);
         const decoded = jwt.verify(find, "1234");
         console.log(decoded.id);
         const basketFind = await Basket.findOne({
            where: { userId: decoded.id },
         });
         console.log(basketFind.id);
         let {
            width,
            height,
            count,
            price,
            priceOfUnit,
            material,
            typeOfOrder,
            area,
            prodId,
         } = req.body;
         const order = await Order.create({
            width,
            height,
            count,
            price,
            priceOfUnit,
            material,
            typeOfOrder,
            area,
            prodId,
            basketId: basketFind.id,
         });
         console.log(order);

         // const basketFind = await Basket.findOne({where:{userId:decoded.id}})
         // console.log(basketFind)

         // // let {width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId} = req.body
         // const order = await Order.create({width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId})
         // console.log(order)
         // const findOrder = order.prodId
         // console.log(findOrder)
         // const findOrderString = await Order.findOne({where:{prodId:findOrder}})
         // console.log(findOrderString)
         // const basket = await Basket.create({where:{userId:decoded.id,prodId:findOrder}})
         // console.log(basket)
      } catch (err) {
         console.log(err);
      }
   }
   async find(req, res) {
      try {
         const find = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(find, "1234");
         const basket = await Basket.findAndCountAll({
            include: {
               model: Order,
            },
            where: { userId: decoded.id },
         });
         return res.json(basket);
         // const basketFind = await Basket.findOne({where:{userId:decoded.id}})
         // return res.json(basketFind)

         // // let {width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId} = req.body
         // const order = await Order.create({width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId})
         // console.log(order)
         // const findOrder = order.prodId
         // console.log(findOrder)
         // const findOrderString = await Order.findOne({where:{prodId:findOrder}})
         // console.log(findOrderString)
         // const basket = await Basket.create({where:{userId:decoded.id,prodId:findOrder}})
         // console.log(basket)
      } catch (err) {
         console.log(err);
      }
   }

   async testArray(req, res) {
      try {
         const order = req.body;
         let random = Math.random() * 100000;
         random = random.toFixed();
         console.log(random);

         const newDate = new Date();
         const dateString =
            newDate.toLocaleDateString() +
            "<br>" +
            newDate.toLocaleTimeString();

         const find = req.headers.authorization.split(" ")[1];
         const decoded = jwt.verify(find, "1234");
         console.log(decoded);

         const newOrder = await OrderList.create({
            name: random,
            userId: decoded.id,
            createdDate: dateString,
         });
         console.log(newOrder);
         const newOrderFind = await OrderList.findOne({
            where: { name: random },
         });
         console.log(newOrderFind.id);

         order.forEach(async (el) => {
            let {
               width,
               height,
               count,
               price,
               priceOfUnit,
               material,
               typeOfOrder,
               area,
               prodId,
            } = el;
            const order = await Order.create({
               width,
               height,
               count,
               price,
               priceOfUnit,
               material,
               typeOfOrder,
               area,
               prodId,
               orderListId: newOrderFind.id,
            });
         });
         // const findAllOrder = await OrderList.findAll({
         //    // where: { userId: decoded.id },
         //    include: Order,
         // });
         // console.log(findAllOrder);
      } catch (e) {
         console.log(e);
      }
   }
   async testArrayGet(req, res) {
      const find = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(find, "1234");
      console.log(decoded);
      const findAllOrder = await OrderList.findAll({
         where: { userId: decoded.id },
         include: Order,
      });
      res.json(findAllOrder);
   }
}

module.exports = new itemConroller();
