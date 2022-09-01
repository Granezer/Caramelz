const productContainer = document.getElementById('productContainer')

async function getCarts (){
  const { data: response } = await axios.get('/api/v1/products/cart/all-cart')
  console.log(response)
  if (response.length === 0) {
    productContainer.innerHTML = '<div class="productWrapper">Pls add product to cart before checking out...</div>'
    return
  }
    
    const res = response.map(async (r) => {
        const { data: re } = await axios.get("/api/v1/products/cartValues/" + r)
      const txt = `<div class="productWrappe">
          <div class="product">${re.name}<span class="quantity">&times;&nbsp;${re.quantity}</span></div>
   <div class="price">     
            <div class="total"> 
            <div class="fa-solid fa-naira-sign icon"></div>
            <input type="text" name="" value="${re.price * re.quantity}" id="price" class="static_inp" readonly>
          </div></div>
        </div>`;
        productContainer.insertAdjacentHTML("beforeend", txt)
        console.log(re)
        addTotal();
        addSubtotal();
    })
}

getCarts()

let prices;
setTimeout(() => {
    prices = document.querySelectorAll("#price");
    addSubtotal()
        addTotal();

}, 2000)


//calculates subtotal products prices 
const subtotal = document.getElementById('subtotal')
const total = document.getElementById('total')

 function addSubtotal(){
  const priceArr = Array.from(prices)
  const price = priceArr.map((price)=> Number(price.value))
  const sumOfPrice = price.reduce((prev, current)=> prev+current, 0)

  subtotal.value = sumOfPrice
  return sumOfPrice
}


//calculates total product prices
const shippingPrices = document.querySelectorAll('#shippingPrice')

function addTotal() {
const subtotal = addSubtotal()
 total.value = Number(subtotal)
}


//loops through the shipping prices radio buttons and add the changed value to the subtotal value to get the total value
shippingPrices.forEach((price)=>{
  price.addEventListener('change', ()=>{
    const subtotal = addSubtotal()
    const totalPrice = Number(subtotal) + Number(price.value)
    total.value = totalPrice
  })
})