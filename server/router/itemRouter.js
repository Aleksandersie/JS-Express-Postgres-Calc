const Router = require("express");
const itemController = require("../apiController/itemController");
const router = new Router();

router.get("/", itemController.get);
router.post("/", itemController.post);
router.post("/test", itemController.test);
router.post("/find", itemController.find);
router.post("/newtest", itemController.testArray);
router.get("/newtest", itemController.testArrayGet);

module.exports = router;
