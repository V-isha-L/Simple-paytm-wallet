import mongoose from "mongoose";
import dotenv from 'dotenv';



dotenv.config();


const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});


const accountSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);


const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected"); 
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};


export {
    dbConnect,
    User,
    Account
};
