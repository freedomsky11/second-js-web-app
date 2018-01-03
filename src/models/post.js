import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId, //添加作者 ID。
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;