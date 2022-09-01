const Product = require("../models/product-model");

const getAProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ _id: id }).sort("createdAt");
    res.status(200).json({
      success: "true",
      message: `The product with id ${id} has been sucessfully gotten`,
      data: { product },
      total_Product: product.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: "null",
    });
  }
};

const getSupplementProducts = async (req, res) => {
  try {
    const supplement = await Product.find({ category: "supplement" }).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: "true",
      message: "Supplement products was sucessfully gotten",
      data: supplement,
      total_Product: supplement.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: null,
    });
  }
};

const getDailyConsummables = async (req, res) => {
  try {
    const daily_consumables = await Product.find({
      category: "daily consummable",
    }).sort("-createdAt");

    res.status(200).json({
      success: "true",
      message: "Daily Consummables products was sucessfully gotten",
      data: daily_consumables,
      total_Product: daily_consumables.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: "null",
    });
  }
};

const getHardwareProducts = async (req, res) => {
  try {
    const hardware = await Product.find({ category: "hardware" }).sort(
      "createdAt"
    );

    res.status(200).json({
      success: "true",
      message: "Hardware products was sucessfully gotten",
      data: hardware,
      total_Product: hardware.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: "null",
    });
  }
};

const getMakeupProducts = async (req, res) => {
  try {
    const makeup = await Product.find({ category: "makeup" }).sort("createdAt");

    res.status(200).json({
      success: "true",
      message: "Make up products was sucessfully gotten",
      data: makeup,
      total_Product: makeup.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: "null",
    });
  }
};

const getHairProducts = async (req, res) => {
  try {
    const hair = await Product.find({ category: "hair" }).sort("createdAt");

    res.status(200).json({
      success: "true",
      message: "Hair products was sucessfully gotten",
      data: hair,
      total_Product: hair.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Internal server error",
      data: "null",
    });
  }
};

const deleteSingleProduct = async (req, res) => {
  const { id } = req.params;
  // const product = await Product.findOneAndDelete({_id: id})
  // if(!product){
  //     return res.status(404).json({sucess: false, message: `The product with id ${id} was not found`, data: null})
  // }

  // return res.status(200).json({sucess: true, message: `The product with id ${id} was succesfully dropped`, data: undefined})
  const task = await Product.findOneAndDelete({ _id: id });
  if (!task)
    return res
      .status(404)
      .json({ msg: `no task with id "${id}" was found to be deleted` });
  res.status(200).json({ msg: `the task with id "${id}" has been removed` });
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const payload = {
      name: name,
      price: price,
      description: description,
      category: category,
      image: req.file.path
    };

    const product = await Product.create(payload);
    // res.status(201).json({
    //   sucess: true,
    //   message: "Product have been successfully created",
    //   data: product,
    // });

        const url = `/product-list.html`;
        res.status(201).redirect(url);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Oops something went wrong.",
      data: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category} = req.body;
    const { id } = req.params;
    const payload = {
      name: name,
      price: price,
      description: description,
      category: category,
    };
    const product = await Product.findOneAndUpdate({ _id: id }, payload, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      sucess: true,
      message: "Product have been successfully updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Oops something went wrong",
      data: null,
    });
  }
};

const searchRandomProductCat = async (req, res) => {
  try {
    const { category } = req.params;
    const product = await Product.find({ category: category })

   return res.json({sucess: true, message: `Products with category ${category} was sucessfuly gotten`,data:product, total_counts: product.length})
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: "null",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: "true",
      message: "All products was sucessfully gotten",
      data: products,
      total_Product: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Oops, something went wrong.",
      data: null,
    });
  }
}

module.exports = {
  getAProducts,
  getSupplementProducts,
  getDailyConsummables,
  getHardwareProducts,
  getMakeupProducts,
  getHairProducts,
  deleteSingleProduct,
  createProduct,
  updateProduct,
  searchRandomProductCat,
  getAllProducts
};
