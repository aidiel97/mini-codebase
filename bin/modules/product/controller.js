const Models = require('./model');
const wrapper = require('../../helpers/utils/wrapper');

const getProduct = async (req, res) => {
  const productIdParams = req.params.productId;

  const result = await Models.findOne({ productId: productIdParams });

  return wrapper.success(res, result, "hooray, this is the product that you\'re asking for");
}

const listProduct = async (req, res) => {
  const result = await Models.find();
  return wrapper.success(res, result, "hooray, this is all products that you\'re asking for");
}

const createProduct = async (req, res) => {
  const payload = req.body;
  try{
    const models = new Models(payload); // apply schema
    const result = await models.save(); //save payload to db
    return wrapper.success(res, result, "yeaayy success post data");
  } catch(err) {
    //error
    return wrapper.error(res, String(err));
  }
}

const updateProduct = async (req,res) => {
  const { productId } = req.params;
  const payload = req.body;

  const product = await Models.findOne({ productId });
  if (!product) {
    return wrapper.error(res, "can not find product");
  }

  try {
    await Models.updateOne(
      { productId },
      { $set: payload }
    );
    
    const result = await Models.findOne({ productId });
    return wrapper.success(res, result, "success update product!");
  } catch (error) {
    //error
    return wrapper.error(res, String(err));
  }
}

const deleteProduct = async (req, res) => {
  const productIdParams = req.params.productId;

  const product = await Models.findOne({ productId: productIdParams});
  if(!product){
    return wrapper.error(res, "can not find product");
  }

  try {
    await Models.deleteOne({ productId: productIdParams });
    return wrapper.success(res, product, "success delete product!");
  } catch (err) {
    return wrapper.error(res, String(err));
  }
}

module.exports = {
  getProduct,
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct
}