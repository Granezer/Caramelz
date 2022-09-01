const { NodeDiskStorage } = require("node-disk-storage");
const nds = new NodeDiskStorage();
let arr = [];


const addToCart = async(req, res) => {
  let { quantity, id, name, price } = req.body;
  await nds.set(id, {name:name,quantity: quantity, id: id, price: price})
};

const getCart = async (req, res) => {
  const get = await nds.keys()
  // const so = get.map(async(g) =>await nds.get(g))
  // const data = await nds.get(get)

   res.send(get)
};

const getCartValues = async (req, res) => {
  const { id } = req.params
  const data = await nds.get(id)
  return res.send(data)
};

const getCartAndValue = async (req, res) => {
  const keys = await nds.keys();
  const data = keys.map(async (d) => {
    const dd = await nds.get(d);
    arr.push(dd);
    return dd;
  });
  res.send(arr);
  arr = []
  // return arr;
  // res.send(arr)
  // return keys
};;

module.exports = {
  addToCart,
  getCart,
  getCartValues,
  getCartAndValue
};

//clear cart
