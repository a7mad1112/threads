import mongoose from 'mongoose';
const communtitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread"
  },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Community = mongoose.models.Community || mongoose.model('Community', communtitySchema);
export default Community;