'use strict';
// Product Deltai
// Import function kết nối DB
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
// Import BD
import database from './db.js';

// Lấy URL
const params = new URL(document.location).searchParams;
// Get ID
let prod_id = params.get('id');

const getDetailProduct = () => {
  const show_product_del = document.querySelector('.product__main');
  const dataDetail = ref(database, `products/${prod_id}`);
  onValue(dataDetail, (dataDetail) => {
    const childKey = dataDetail.key;
    const data = dataDetail.val();
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const price = new Intl.NumberFormat('vi-VN', config).format(data.price);
    const product_del = `
    <div class="col-12 col-md-4 text-center">
     <img class="product__main-thumnail" src="${data.images}" alt="" />
    </div>
    <div class="product__main-info col-12 col-md-8">
        <div class="item-name">
            <h3>${data.name}</h3>
            <div class="item-price">Giá:&nbsp;<span>${price}</span>&nbsp;</div>
                <div class="item-deital">
                    <span class="text-black">
                        ${data.detail}
                    </span>
                </div>
            </div>
            <div class="card-body text-center">
                <a class="btn btn-danger" href="cart.html"
                onclick="addCart('${childKey}', '${data.name}', ${data.price}, '${data.images}', '${data.hang}')">
                Mua Ngay
                </a>
          </div>
        </div>
    `;
    show_product_del.innerHTML += product_del;
  });
};
getDetailProduct();
