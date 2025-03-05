
const Joi = require("joi");
const Cart = require("../model/Cart");
const mongoose= require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const sotreCartValidationSchema = Joi.object({
    id: Joi.string(),
});


const createCart = async (req, res, next) => {
    
    try {
        await sotreCartValidationSchema.validateAsync(req.body, {
            allowUnknown: true,
            abortEarly: false,
        });
    } catch (err) {
        return res.status(400).send({
            msg: "validation error",
            errors: err.details.map((el) => {
                return {
                    field: el.context.key,
                    msg: el.message,
                };
            }),
        });
    }

    try {

        const id = new ObjectId(req.body.id)
        const user_id = new ObjectId(req.body.user._id)

        let cart = await Cart.create({
            product_id: id,
            createdBy: user_id
        });

        res.send(cart);

        


    } catch (err) {
        next(err);
    }
};

const getMycart = async (req, res, next) => {
   
const user_id=new ObjectId(req.user?._id)
    try {
        const myCarts = await Cart.find({ createdBy: user_id },).populate("createdBy").populate("product_id")
        res.status(200).send(myCarts)
    } catch (err) {
        next(err)
    }


}
module.exports = {
    createCart,
    getMycart
};
