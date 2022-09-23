const { User, Basket } = require("../dbModels/dbModels");
const jwt = require("jsonwebtoken");
const date = require("date-and-time");

const generateToken = function (id, email, alias, role) {
   return jwt.sign({ id, email, alias, role }, "1234", { expiresIn: "24h" });
};

class UserController {
   async registration(req, res) {
      try {
         let { email, password, alias, role } = req.body;
         const user = await User.create({ email, password, alias, role });
         //const basket = await Basket.create({userId: user.id})
         const token = generateToken(
            user.id,
            user.email,
            user.alias,
            user.role
         );
         return res.json({ token });
      } catch (err) {
         console.log(err);
      }
   }
   async login(req, res) {
      console.log(req.body);
      let { email } = req.body;
      let find = await User.findOne({ where: { email } });
      console.log(find);
      const jwt = generateToken(find.id, find.email, find.alias, find.role);
      console.log(jwt);
      const newDate = new Date();
      const userName = find.alias;
      console.log(
         newDate.toLocaleDateString() + "<br>" + newDate.toLocaleTimeString()
      );

      return res.json({ jwt, userName });
   }
}

module.exports = new UserController();
