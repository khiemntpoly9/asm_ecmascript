'use strict';
// Import function kết nối DB
import {
  ref,
  onValue,
  set,
  push,
  update,
  onChildRemoved,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
// Import BD
import database from './db.js';

// Thêm sản phẩm
let addProduct = document.querySelector('#addProduct');
const addproduct = async () => {
  const name = document.querySelector('#nameProduct');
  const price = document.querySelector('#priceProduct');
  const images = document.querySelector('#imageProduct');
  const hang = document.querySelector('#hangProduct');
  const detail = document.querySelector('#detailProduct');

  let item = {
    name: name.value,
    price: Number(price.value),
    images: images.value,
    hang: hang.value,
    detail: detail.value,
  };

  const products = ref(database, 'products/');
  const newProduct = push(products);
  set(newProduct, item);
};
addProduct.onclick = addproduct;

// Lấy data
const show_list_product = document.querySelector('.product-adm');
const getDataCate = async () => {
  const products = ref(database, 'products/');
  onValue(
    products,
    (item) => {
      item.forEach((childitem) => {
        const childKey = childitem.key;
        const childData = childitem.val();
        const list = `
            <tr>
                <td class="col-2">${childData.name}</td>
                <td class="col-2"><img src="${childData.images}"/></td>
                <td class="col-2"></td>
                <td class="col-2">${childData.price}</td>
                <td class="col-2">${childData.hang}</td>
                <td class="col-2">
                 <button class="btn btn-success">Sửa</button>
                 <button id="deleteBtn" class="btn btn-danger">Xoá</button>
                </td>
            </tr>
        `;
        show_list_product.innerHTML += list;
      });
    },
    {
      onlyOnce: true,
    }
  );
};
getDataCate();

// Xoá
const btnDelete = document.querySelector('#deleteBtn');
const test = () => {
  console.log('Xoá');
};
btnDelete.addEventListener('click', test);
