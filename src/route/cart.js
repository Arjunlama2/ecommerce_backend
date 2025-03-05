

const express=require("express")
const { createCart, getMycart } = require("../controller/cart");
const router = express.Router();

const jwt=require("jsonwebtoken")




router.post("/cart", (req, res, next) => {

    let user = null;
    try {
        let token = req.headers?.authorization.split(" ")[1];
        user = jwt.verify(token, process.env.JWT_SECRET);
     
        req.body.user = user;

        next();
    } catch (err) {
        console.log("this is error", err)
        res.status(403).send({ msg: "unauthorised" })
    }
} , createCart);

router.get("/cart", (req, res, next) => {

    let user = null;
    try {
        let token = req.headers?.authorization.split(" ")[1];
        user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (err) {
        console.log("this is error", err)
        res.status(403).send({ msg: "unauthorised" })
    }
}, getMycart
);


module.exports = router;


