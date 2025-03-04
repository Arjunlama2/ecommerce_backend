const { signup, login, getMe } = require("../controller/auth");

const express = require("express");
const { checkAuthentication } = require("../middleware/auth");
const Joi = require("joi");
const checkValidationSchmea = require("../middleware/checkValidationSchmea");
const router = express.Router();
const jwt=require('jsonwebtoken')

const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  role: Joi.string().valid("buyer", "seller").required(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

router.post("/signup", checkValidationSchmea(signupValidationSchema), signup);
router.post("/login", checkValidationSchmea(loginValidationSchema), login);
router.get("/me", (req, res, next) => {
 
  let user = null;
  try {
    let token = req.headers?.authorization.split(" ")[1];
    user = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = user;
    
    next();
  } catch (err) {gg
    console.log("this is error",err)
    res.status(403).send({msg:"unauthorised"})
  }
},getMe
);


module.exports = router;


