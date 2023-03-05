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

async function addProducts(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const productDetails = req.body;

    const userPharmacy = await pharmaModel.findOne({
      where: { user_id: userDetails.id },
    });

    const pharmproduct = await productModel.create(productDetails);
    await userPharmacy.addProduct(pharmproduct.id);
    res.status(200).json(pharmproduct);
  } catch (err) {
    console.log(err);
  }
}



async function getProducts(req, res, token) {
  const user = token.username;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const userPharmacyProducts = await pharmaModel.findOne({
      where: { user_id: userDetails.id },
      include: {
        model: productModel
      },
    });

    const products = userPharmacyProducts.Products;
    console.log(products);
  
    res.status(200).json({ Products:products});
  } catch (err) {
    console.log(err);
  }
}


async function deleteProducts(req, res, token) {
  const user = token.username;
  const deleteQuery = req.query;
  const userDetails = await userModel.findOne({ where: { username: user } });
  try {
    const userPharmacyProducts = await pharmaModel.findOne({
      where: { user_id: userDetails.id },
      include: {
        model: productModel,
        where: deleteQuery
      },
    });
    const productId = userPharmacyProducts.Products[0].id;
    console.log(productId);
    await productModel.destroy({ where: { id: productId } })
    await pharmProductModel.destroy({ where: { product_id: productId } });
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPharmacy,
  getAllPharmacies,
  updatePharmacy,
  deletePharmacy,
  addProducts,
  getProducts,
  deleteProducts,
};
