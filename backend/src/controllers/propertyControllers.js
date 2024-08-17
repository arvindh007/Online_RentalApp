import Property from "../model/PropertyModal.js";

// GET ALL PROPERTIES :
 
 const getproperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// GET SINGLE PROPERTY :

const getSingleproperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).send("Property not found");
    res.status(200).json(property);
  } catch(err){
    if (err.kind === 'ObjectId' && err.name === 'CastError') {
        return res.status(400).json({message:"invalid Property ID"});
    }
    console.log(err?.message);
    res.status(500).json({message:err?.message});
}
}

// CREATE PROPERTY :

const createproperty = async (req, res) => {
  const {
    porperty_name,
    porperty_description,
    porperty_price,
    porperty_Type,
    porperty_image,
    Address,
    city,
    nearby_landmark,
    State,
    country,
    pincode,
    user_data,
  } = req.body;

  try {
    const property = new Property({
      porperty_name,
      porperty_description,
      porperty_price,
      porperty_Type,
      porperty_image,
      Address,
      city,
      nearby_landmark,
      State,
      country,
      pincode,
      user_data,
    });
    await property.save();
    res.status(201).json({
      success: true,
      message: "Property created successfully",
      record: property,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}


// UPDATE PROPERTY :

const updateproperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).send("Property not found");
    property.porperty_name = req.body.porperty_name || property.porperty_name;
    property.porperty_description = req.body.porperty_description || property.porperty_description;
    property.porperty_price = req.body.porperty_price || property.porperty_price;
    property.porperty_Type = req.body.porperty_Type || property.porperty_Type;
    property.porperty_image = req.body.porperty_image || property.porperty_image;
    property.Address = req.body.Address || property.Address;
    property.city = req.body.city || property.city;
    property.nearby_landmark = req.body.nearby_landmark || property.nearby_landmark;
    property.State = req.body.State || property.State;
    property.country = req.body.country || property.country;    
    property.pincode = req.body.pincode || property.pincode;
    property.user_data = req.body.user_data || property.user_data;
    await property.save();
    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      record: property,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
// DELETE PROPERTY :

const deleteproperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).send("Property not found");
    res.status(200).json({ message: "Property deleted successfully" });
    console.log('====================================');
    console.log(`Property Deleted: ${property}`);
    console.log('====================================');
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
export { getproperties,getSingleproperty,createproperty,deleteproperty,updateproperty};