import mongoose from "mongoose"

const CommentInfoSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
   postId: {type: String, required: true,},
   like: {type: Number, default: 0},
   likesUsers: {type: Array, default: []},
   comment: {type: String, required: true,},
   img: {type: String},
}, {
   timestamps: true
})

export default mongoose.model("CommentInfoInfo", CommentInfoSchema )