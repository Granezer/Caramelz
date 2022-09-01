const { NodeDiskStorage } = require("node-disk-storage");
const nds = new NodeDiskStorage()

const getCartKeys = async () => {
    const keys = await nds.keys();

    let resultingArr = [];
    for (let i of keys) {
     const data= await nds.get(i)
      resultingArr.push(data);
    }
    res.send(resultingArr)
    return resultingArr
};

module.exports = { getCartKeys };
