const Models = require('./model');
const wrapper = require('../../helpers/utils/wrapper');

const getCustomer = async (req, res) => {
  const customerNameParams = req.params.customerName;

  const result = await Models.find({ customerName: customerNameParams });

  return wrapper.success(res, result, "hooray, this is the product that you\'re asking for");
}

const listCustomer = async (req, res) => {
  if(req.query.keyword){
    let split = req.query.keyword.split(' ');
    let queryRegex = '';
    await Promise.all(split.map(v => {
      queryRegex += `(?=.*?${v})`;
    }));
    const regexKey = `^${queryRegex}.*`;
    const keyword = new RegExp(regexKey, 'gmi');
    req.query['customerName'] = keyword;
    delete req.query.keyword;
  }
  const payload = req.query;
  const result = await Models.find(payload);
  return wrapper.success(res, result, "hooray, this is all products that you\'re asking for");
}

const createCustomer = async (req, res) => {
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

const deleteCustomer = async (req, res) => {
  const customerIdParams = req.params.customerId;

  const customer = await Models.findOne({ customerId: customerIdParams });
  if (!customer) {
    return wrapper.error(res, "can not find customer");
  }

  try {
    await Models.deleteOne({ customerId: customerIdParams });
    return wrapper.success(res, customer, "success delete product!");
  } catch (err) {
    return wrapper.error(res, String(err));
  }
}

const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const payload = req.body;

  const customer = await Models.findOne({ customerId });
  if (!customer) {
    return wrapper.error(res, "can not find customer");
  }

  try {
    await Models.updateOne(
      { customerId },
      { $set: payload }
    );

    const result = await Models.findOne({ customerId });
    return wrapper.success(res, result, "success update product!");
  } catch (error) {
    //error
    return wrapper.error(res, String(err));
  }
}


module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  listCustomer
}