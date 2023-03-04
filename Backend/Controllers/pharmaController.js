const userModel = require("../models/index").users;
const pharmaModel = require("../models/index").pharmacy;
const productModel = require("../models/index").products;
const pharmProductModel = require("../models/index").pharmProducts;

async function createPharmacy(req, res, token) {
  const pharmaPayload = req.body;
  const user = token.username;
  try {
    const userDetails = await userModel.findOne({ where: { username: user } });
    const userId = userDetails.id;
    console.log(userId);
    const pharmacy = await pharmaModel.create({
      ...pharmaPayload,
      user_id: userId,
    });

    res.status(200).json(pharmacy);
  } catch (err) {
    res.send(err);
  }
}

async function getAllPharmacies(req, res) {
  try {
    const allPharmacies = await pharmaModel.findAll({ include: userModel });
    res.status(200).json(allPharmacies);
  } catch (err) {
    console.log(err);
  }
}

async function updatePharmacy(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const updatedDetails = req.body;
    const updatedPharmacy = await pharmaModel.update(updatedDetails, {
      where: { user_id: userDetails.id },
    });
    res.status(200).json(updatedPharmacy);
  } catch (err) {
    console.log(err);
  }
}

async function deletePharmacy(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const deletedPharmacy = await pharmaModel.destroy({
      where: { user_id: userDetails.id },
    });
    res.status(200).json({ message: "pharmacy removed from database" });
  } catch (err) {
    console.log(err);
  }
}


async function uploadProducts(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const productDetails = req.body;
    const uploadedProduct = await productModel.create(productDetails)
    const userPharmacy = await pharmaModel.findOne({
      where: { user_id: userDetails.id },
    });
    console.log(userPharmacy.id)
    console.log(uploadedProduct.id)
    const pharmproduct = await pharmProductModel.create({
      PharmId: userPharmacy.id,
      ProductId: uploadedProduct.id
    })
    
    res.status(200).json(pharmproduct);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProducts(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {

    const userPharmacy = await pharmaModel.findOne({
      where: { user_id: userDetails.id },
    });
    
    const pharmProduct = await pharmProductModel.findOne({where:{PharmId:userPharmacy.id}})
    console.log(pharmProduct)
    
    
    
    res.status(200).json(pharmProduct);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPharmacy,
  getAllPharmacies,
  updatePharmacy,
  deletePharmacy,
  uploadProducts,
  deleteProducts
};
