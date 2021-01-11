const Models = require('./model');

const getProduct = async (req, res) => {
  const productIdParams = req.params.productId;

  const result = await Models.findOne({ productId: productIdParams });

  res.send({
    status: "success",
    data: result,
    message: "hooray, this is the product that you\'re asking for"
  })
}

const listProduct = async (req, res) => {
  const result = await Models.find();
  
  res.send({
    status: "success",
    data: result,
    message: "hooray, this is all products that you\'re asking for"
  })
}

const createProduct = async (req, res) => {
  const payload = req.body;
  try{
    const models = new Models(payload); // apply schema
    const result = await models.save(); //save payload to db

    //success
    res.send({
      status: "success",
      data: result,
      message: "yeaayy success post data"
    }); 
  } catch(err) {
    //error
    res.send({
      status: "error",
      message: String(err)
    })
  }
}

const updateProduct = async (req,res) => {
  const { productId } = req.params;
  const payload = req.body;

  const product = await Models.findOne({ productId });
  if (!product) {
    res.send("can not find product");
  }

  try {
    await Models.updateOne(
      { productId },
      { $set: payload }
    );
    
    const result = await Models.findOne({ productId });
    res.send({
      status: "success",
      data: result,
      message: "success update product!"
    })
  } catch (error) {
    //error
    res.send({
      status: "error",
      message: String(err)
    })
  }
}

const deleteProduct = async (req, res) => {
  const productIdParams = req.params.productId;

  const product = await Models.findOne({ productId: productIdParams});
  if(!product){
    res.send("can not find product");
  }

  try {
    await Models.deleteOne({ productId: productIdParams });
    res.send({
      status:"success",
      data: product,
      message: "success delete product!"
    })
  } catch (err) {
    //error
    res.send({
      status: "error",
      message: String(err)
    })
  }
}

module.exports = {
  getProduct,
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct
}