import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },

  IS_Seller: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}
  , {
    timestamps: true
  }
);

const Registeruser = mongoose.model("Register", postSchema);
export default Registeruser;
