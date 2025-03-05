const express = require("express");
const fileUpload = require("express-fileupload");
const cors=require("cors")
const path =require("path")
const app = express();
// throw new Error("custom error")
const productRoutes = require("./route/product");
const authRoutes = require("./route/auth");
const orderRoutes = require("./route/order")
const cart=require("./route/cart")
const handleServerError = require("./middleware/handleServerError");
require('dotenv').config()
require("./config/database");
app.use(cors())
app.use(express.json()); // global middleware,  sets up req.body
app.use(fileUpload()); // handles form-data

app.use("/src/uploads", express.static(path.join(__dirname, "uploads")))
app.get("/",(req,res)=>{
  console.log("requested")
res.send("Hello world")
})
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", cart);

app.use(handleServerError);
// fs.writeFileSync(path.join(path.resolve(),"custom.txt"),"our text" );
// fs.unlinkSync(path.join(path.resolve(),"custom.txt"))

app.use("/api/test",() =>{
  res.send("test")
})

app.listen(8000, () => {
  console.log("server started on port 8000.");
});
