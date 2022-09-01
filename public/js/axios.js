const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('key')
const body = document.querySelector('body')
const detailsWrapper = document.getElementById('detailsWrapper')
const Orderid = document.getElementById('Oid')
const date = document.getElementById('date')
const total_amount = document.getElementById('totalprice')
const Pmethod = document.getElementById('Pmethod')
const ordered_product = document.getElementById('ordered_product')
const payment_wrapper = document.getElementById('payWrapper')
const paymentForm = document.getElementById("paymentForm");



async  function getCheckoutDetails(){
    // try {
        const {data: response} =  await axios.get(`/api/v1/products/checkout/${id}`);
        const {first_name, last_name, email} = response.data.billing_details
        const {payment_method, subtotal, total} = response.data.product_details
        const orderId = response.data.orderId
        const createdAt = response.data.createdAt
        const arr_products = response.data.ordered_product
        console.log(response);
        const products = arr_products.map((product) => {
            return `<tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>₦${product.price}</td>
                        <td>₦${product.price * product.quantity}</td>
                    </tr>`;
        })
        ordered_product.innerHTML = products
        Orderid.innerHTML = orderId || 'Not available'
        date.innerHTML = createdAt || 'Not available'
        total_amount.innerHTML = `₦${total}` || "Not available";
        Pmethod.innerHTML = payment_method || 'Not available'
        if(payment_method === 'Bank Transfer'){
            payment_wrapper.innerHTML = `
               <table class="table table-white table-striped">
            <thead>
              <tr>
                <th>Bank:</th>
                <th>Acount Number:</th>
          
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Bank</td>
                <td>3122914303</td>
             
              </tr>
         
            </tbody>
          </table>`;
        }else{
            paymentForm.innerHTML = `
            <form id="paymentForm">
            <input type="hidden" id="email" value="${email}"/>
            <input type="hidden" id="amount" value="${total}"/>
            <input type="hidden" id="reference" value="${orderId}"/>
            <input type="submit" value="Pay Now" class="paystack_btn">
          </form>`
        }
        // details[4].innerHTML = c
        // details[5].innerHTML = payment_method
        // details[6].innerHTML = total
        // details[7].innerHTML = subtotal
    // } catch (error) {
    // // body.innerHTML = `<h1>Oops, Something went wrong.</h1>`
    // a
    // }
}

// const getData = async ()=>{
//     const fetchData = axios.get(``)
// }

window.addEventListener('load', getCheckoutDetails)


paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email");
    const amount = document.getElementById("amount");
    const reference = document.getElementById("reference");
      var handler = PaystackPop.setup({
        key: "pk_test_8456f4767d99a3bfe1ca049f17309778243eccf8", // Replace with your public key
        email: email.value,
        amount: amount.value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars
        ref: reference.value, // Replace with a reference you generated
        callback: function (response) {
          //this happens after the payment is completed successfully
          var reference = response.reference;
          alert("Payment complete! Reference: " + reference);
          // Make an AJAX call to your server with the reference to verify the transaction
        },
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
      });
      handler.openIframe();
});

// function payWithPaystack(email, amount, id) {
//   var handler = PaystackPop.setup({
//     key: "pk_test_db33803dc207a43b75a3eca4149aad80e1319005", // Replace with your public key
//     email: email,
//     amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
//     currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars
//     ref: id, // Replace with a reference you generated
//     callback: function (response) {
//       //this happens after the payment is completed successfully
//       var reference = response.reference;
//       alert("Payment complete! Reference: " + reference);
//       // Make an AJAX call to your server with the reference to verify the transaction
//     },
//     onClose: function () {
//       alert("Transaction was not completed, window closed.");
//     },
//   });
//   handler.openIframe();
// }