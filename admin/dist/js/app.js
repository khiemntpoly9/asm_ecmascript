'use strict';
const productad = async () => {
  let response = await fetch('http://localhost:3001/product');
  let data = await response.json();
  // console.log(data);
  return data;
};
productad().then((data) => {
  const show_product = document.querySelector('.product-adm');
  let arr = data;
  // console.log(arr.length); 12 sản phẩm
  arr.forEach((e) => {
    {
      // console.log(e);
      const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
      const price = new Intl.NumberFormat('vi-VN', config).format(e.price);
      const product_card = `
          <div class="col-6 col-sm-6 col-md-6 col-lg-3 p-2">
            <div class="content_item-main border border-1 rounded-2">
              <div class="card w-100">
                <a href="product-del.html?cat_id=${e['cat_id']}&id=${e['id']}">
                  <img class="card-img-top mt-1" src="${e['image']}">
                </a>
                <div class="content__item-info card-body">
                  <a class="card-title fs-5 text-decoration-none" href="product-del.html?cat_id=${e['cat_id']}&id=${e['id']}">
                    ${e['name']}
                  </a>
                  <p class="card-price">
                    Giá: <span>${price}</span>
                  </p>
                  <div class="danhgia">
                    <span>
                      ${e['score']} <i class="bi bi-star-fill"></i>
                    </span>
                  </div>
                  <div class="card-body text-center">
                    <a class="btn btn-danger" href="cart.html" 
                      onclick="addCart(${e['id']}, ${e['cat_id']}, '${e['name']}', ${e['price']}, '${e['image']}', '${e['hang']}')">
                      Mua Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      show_product.innerHTML += product_card;
    }
  });
});
