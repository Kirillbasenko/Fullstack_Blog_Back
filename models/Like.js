import mongoose from "mongoose"

const LikeInfoSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
   postId: {type: String, required: true,},
}, {
   timestamps: true
})

export default mongoose.model("LikeInfo", LikeInfoSchema )