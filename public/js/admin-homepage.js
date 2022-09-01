const totalProducts = document.getElementById("Tproduct");
const totalOrders = document.getElementById("Torder");
const tableContainer = document.getElementById("Tbody");
const url = `/api/v1/products/`;
const checkURL = `/api/v1/products/checkout/all/get`;
const aCheckout = `/api/v1/products/checkout/`;

const getTotals = async () => {
  const data = await axios.all([
    await axios.get(url),
    await axios.get(checkURL),
  ]);
  const product = data[0].data;
  const checkout = data[1].data;
  const all_checkouts = checkout.data;
  totalProducts.innerHTML = product.total_Product;
  totalOrders.innerHTML = checkout.total_checkout;
  const arr_checkouts = all_checkouts.map((checkout) => {
    return `<tr>
               <td>${checkout.orderId}</td>
               <td>${checkout.billing_details.first_name} ${checkout.billing_details.last_name}</td>
               <td>${checkout.billing_details.email}</td>
               <td>${checkout.billing_details.phone_number}</td>
               <td>${checkout.billing_details.state}</td>
               <td>${checkout.createdAt}</td>
               <td>
                    <div class="d-flex align-items-center">
                        <button type="button" data-id="${checkout._id}" onclick="getACheckout(this)" class="btn btn-success btn-sm btn-icon-text mr-3">
                            View
                            <i class="fas fa-eye btn-icon-append"></i>
                        </button>  
                    </div>
                </td>
            </tr>`;
  });
  tableContainer.innerHTML = arr_checkouts.reverse();
};
getTotals();

// Get the modal
const modal = document.getElementById("myModal");
const Cname = document.getElementById("Cname");
const Cemail = document.getElementById("Cemail");
const Cnum = document.getElementById("Cnum");
const Cstr = document.getElementById("Cstr");
const Ctown = document.getElementById("Ctown");
const Cstate = document.getElementById("Cstate");
const Ccountry = document.getElementById("Ccountry");
const payment_method = document.getElementById("pMethod");
const total = document.getElementById("total");
const OrderId = document.getElementById("Oid");
const order_note = document.getElementById("Onote");
const productWrapper = document.getElementById("order");

// Get the button that opens the modal
// const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
async function getACheckout(e) {
  modal.style.display = "block";
  const id = e.dataset.id;
  try {
    const { data } = await axios.get(`${aCheckout}${id}`);
    const checkout = data.data;
    const arr_product = checkout.ordered_product;

    
    const products = arr_product.map((product) => {
      return `<tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
          <td>${product.price * product.quantity}</td>
              </tr>`;
    });

    productWrapper.innerHTML = products;

    Cname.innerHTML = `${checkout.billing_details.first_name} ${checkout.billing_details.last_name}`;
    Cemail.innerHTML = checkout.billing_details.email;
    Cnum.innerHTML = checkout.billing_details.phone_number;
    Cstr.innerHTML = checkout.billing_details.street_address;
    Ctown.innerHTML = checkout.billing_details.town_city;
    Cstate.innerHTML = checkout.billing_details.state;
    Ccountry.innerHTML = checkout.billing_details.country;
    payment_method.innerHTML = checkout.product_details.payment_method;
    total.innerHTML = checkout.product_details.total;
    OrderId.innerHTML = checkout.orderId;
    order_note.innerHTML = checkout.Order_Note;
    if (arr_product.length === 0) {
      productWrapper.innerHTML = "No ordered product...";
    }
  } catch (error) {
    console.log(error);
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
