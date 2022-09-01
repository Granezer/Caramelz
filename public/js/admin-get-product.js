const productWrapper = document.getElementById("productWrapper");
const total = document.getElementById("total");
const msg = document.getElementById("msg");
const deleteBtn = document.querySelector(".deleteBtn");

const url = `/api/v1/products/`;
const getAllProducts = async () => {
  const { data } = await axios.get(url);
  const products = data.data;
  const totalResponse = data.total_Product;
  total.innerHTML = totalResponse;
  if (products.length < 1) {
    return productWrapper.innerHTML = "No products found";
  }
  const allProducts = products.map((product) => {
    return `<div class="product">
            <img src="/${product.image}" alt="" class="pImg">
            <p>${product.name}</p>
            <p class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price.toLocaleString(
              "en-US"
            )}</p>
            <button class="btn-inverse-info btn-md btn-icon-append"><a href="admin-edit.html?id=${product._id}">Edit<i class="fa-solid fa-pen-to-square"></i></a></button>
            <button class="btn-inverse-danger btn-md btn-icon-append deleteBtn" data-id="${product._id}" onclick="deleteProduct(this)">Delete<i class="fa-solid fa-trash"></i></button>
        </div>`;
  });

  productWrapper.innerHTML = allProducts;
console.log(products);


//   loader.classList.add("hide");
//   loader.classList.remove("showLoader");
};

getAllProducts();

async function deleteProduct(e) {
   const id = e.dataset.id;
    try {
      await axios.delete(`${url}${id}`);
      getAllProducts()
      msg.innerHTML = 'Product deleted successfully...'
      setTimeout(() => {
        msg.innerHTML = ''
      }, 2000)
    } catch (error) {
      console.log(error);
    }
}