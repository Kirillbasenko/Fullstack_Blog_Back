import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
   title: {type: String, require: true},
   likes: {type: Number, default: 0},
   likesUsers: {type: Array, default: []},
   img: {type: String, default: ""},
   video: {type: String, default: ""},
   tags: {type: Array, default: []},
   viewsCount: {type: Number, default: 0},
   type: {type: String, require: true}
}, {
   timestamps: true
})

export default mongoose.model("Post", PostSchema )