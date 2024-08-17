import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema(
  {
    porperty_name: {
      type: String,
      required: true,
    },
    porperty_description: {
      type: String,
      required: true,
    },
    porperty_price: {
      type: String,
      required: true,
    },
    porperty_Type: {
      type: String,
      required: true,
    },
    porperty_image: {
      type: Array,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    nearby_landmark: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {  
      type: String,
      required: true,
    },
    user_data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", ProjectSchema);
export default Property;
