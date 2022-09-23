
const fs = require('fs')
const {Order} = require('../dbModels/dbModels')

class ApiConroller{

    async get(req,res){
        try{
        let order = await Order.findAll()
        console.log(order)
       return res.json(order)
      
        }catch(err){
            console.log(err)
        }
        
      
    }
    async post(req,res){
        try{
        let {width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId} = req.body
        const order = await Order.create({width,height,count,price,priceOfUnit,material,typeOfOrder,area,prodId})
        console.log(order)
        return res.json(order)
        }catch(err){
            console.log(err)
        }
    }
   
}



module.exports = new ApiConroller