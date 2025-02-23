const mongoose = require("mongoose");

const url =process.env.MONGODB_URL_DEV;

    
mongoose.connect(url).then(() => console.log("DB Connected!"));
