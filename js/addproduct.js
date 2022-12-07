"use strict";
// Thêm sản phẩm
const addProduct = document.querySelector('#addProduct');
addProduct.onclick = () => {
    const url = `http://localhost:3001/product`;
    const product = {
        name: document.querySelector('#nameProduct').value.trim(),
        price: document.querySelector('#priceProduct').value.trim(),
        image: document.querySelector('#imageProduct').value.trim(),
        hang: document.querySelector('#imageProduct').value.trim(),
        score: document.querySelector('#scoreProduct').value.trim(),
        detail: document.querySelector('#detailProduct').value.trim(),
    };
    const options = {
        method: "post",
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, options).then(res => res.json())
        .then(data => {
        document.location = "./tables/product.html";
    });
};
