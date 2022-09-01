const express = require("express");
const routes = express.Router();
const multerInstance = require("../multer");

const {
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
} = require("../controller/product-controller");

const {
  createCheckout,
  getACheckout,
  getAllCheckout
} = require("../controller/checkout-controller");

const {
  addToCart,
  getCart,
  getCartValues,
  getCartAndValue
} = require("../controller/cart-controller");

const {
  getCartKeys,
}  = require('../carts')

routes.route("/work").get(getCartKeys);
routes.post("/create", multerInstance.single("image"), createProduct);
routes.patch("/update/:id", updateProduct);

routes.route("/supplement").get(getSupplementProducts);
routes.route("/daily-consummable").get(getDailyConsummables);
routes.route("/hardware").get(getHardwareProducts);
routes.route("/makeup").get(getMakeupProducts);
routes.route("/hair").get(getHairProducts);
routes.route("/:id").delete(deleteSingleProduct);
routes.route("/:id").get(getAProducts);
routes.route("/").get(getAllProducts);
routes.route("/product/:category").get(searchRandomProductCat);


routes.route("/checkout").post(createCheckout);
routes.route("/checkout/all/get").get(getAllCheckout);
routes.route("/checkout/:id").get(getACheckout);


routes.route("/cart").post(addToCart)
routes.route('/cart/all-cart/').get(getCart)
routes.route('/cartValues/:id').get(getCartValues)



module.exports = routes;
