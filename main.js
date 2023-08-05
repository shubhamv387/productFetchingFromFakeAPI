function shorten(str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const productList = document.getElementById("productList");

    const res = await axios.get("https://dummyjson.com/products");

    const allProducts = res.data.products;

    allProducts.forEach((product) => {
      const discountedPrice = (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2);

      const productDes = shorten(product.description, 60);
      const divEl = document.createElement("div");
      divEl.className = "col-md-6 col-lg-4 col-xl-3";
      divEl.innerHTML = `<div class="p-3 border bg-white rounded-2">
      <!-- Item Start -->
      <div class="overflow-hidden d-flex border" style="height: 250px; background-image: url(${product.thumbnail});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 5px;">
        
      </div>
      <h5 class="mt-2 fw-bolder text-capitalize">${product.title}</h5>
      <p>
        ${productDes}...
      </p>
      <p>
        <span
          class="bg-warning px-2 py-1 fw-bold me-2 rounded-2 text-white"
          >${product.rating} ★</span
        ><span>(${product.stock})</span>
      </p>
      <p class="mt-0">
        <span class="fs-5 fw-bold">$${discountedPrice}</span>
        <span
          class="fs-5 text-secondary text-decoration-line-through"
          style="font-size: 16px !important"
          >$${product.price}</span
        >
        <span
          class="fs-5 text-success"
          style="font-size: 16px !important"
          >${product.discountPercentage} off</span
        >
      </p>
      <div class="d-flex flex-row g-2 mb-2">
        <button class="btn btn-primary me-2">Add to Card</button>
        <button class="btn btn-success">Buy Now</button>
      </div>
      <!-- Item End -->
    </div>`;

      productList.appendChild(divEl);
    });
  } catch (err) {
    console.log(err.message);
  }
});
