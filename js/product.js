'use strict';
// Import function kết nối DB
import {
  ref,
  query,
  orderByChild,
  onValue,
  equalTo,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
// Import BD
import database from './db.js';

// Lấy URL
const params = new URL(document.location).searchParams;
// Get ID
let cat_id = params.get('cat_id');

// Lấy data
const show_product = document.querySelector('.product');
const getDataCate = async () => {
  const products = query(ref(database, 'products'), orderByChild('hang'), equalTo(cat_id));
  onValue(
    products,
    (item) => {
      item.forEach((childitem) => {
        const childKey = childitem.key;
        const childData = childitem.val();
        const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        const price = new Intl.NumberFormat('vi-VN', config).format(childData.price);
        const list = `
            <div class="col-6 col-sm-6 col-md-6 col-lg-3 p-2">
            <div class="content_item-main border border-1 rounded-2">
            <div class="card w-100">
                <a href="product-del.html?id="${childKey}">
                <img class="card-img-top mt-1" src="${childData.images}">
                </a>
                <div class="content__item-info card-body">
                <a class="card-title fs-5 text-decoration-none" href="product-del.html?id=${childKey}}">
                    ${childData.name}
                </a>
                <p class="card-price">
                    Giá: <span>${price}</span>
                </p>
                <div class="card-body text-center">
                  <a class="btn btn-danger" href="cart.html"
                    onclick="addCart('${childKey}', '${childData.name}', ${childData.price}, '${childData.images}', '${childData.hang}')">
                    Mua Ngay
                  </a>
              </div>
                </div>
            </div>
            </div>
        </div>
        `;
        show_product.innerHTML += list;
      });
    },
    {
      onlyOnce: true,
    }
  );
};
getDataCate();
