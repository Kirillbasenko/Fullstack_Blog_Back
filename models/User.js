import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   name: {type: String, default: ""},
   experience: {type: String, default: ""},
   aboutMe: {type: String, default: ""},
   location: {type: String, default: ""},
   age: {type: Number},
   userImage: {type: String, default: ""},
   avatarImage: {type: String, default: ""},
   backgroundImage: {type: String, default: ""},
   viewsCount: {type: Number, default: 0},
}, {
   timestamps: true
})

export default mongoose.model("User", UserSchema )