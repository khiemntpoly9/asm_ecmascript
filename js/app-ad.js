"use strict";
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
                    <tr>
											<th class="col-1" scope="row">${e['id']}</th>
											<td class="col-2">${e['name']}</td>
											<td class="col-2"><img class="card-img-top mt-1" src="${e['image']}"></td>
											<td class="col-4">
                        <span>${e['detail']}</span>
                      </td>
											<td class="col-1">${price}</td>
											<td class="col-1">${e['hang']}</td>
											<td class="col-1">
                        <div class="row m-0">
                          <div>
                            <a href="../editproduct.html?id=${e['id']}">Sửa</a>
                          </div>
                          <div>
                            <a href="#" onclick="deleteProduct(${e['id']})">Xoá</a>
                          </div>
                        </div> 
                      </td>
										</tr>
        `;
            show_product.innerHTML += product_card;
        }
    });
});
// Xoá sản phẩm
const deleteProduct = (id) => {
    const ques = confirm('Bạn có chắc chắn xóa sản phẩm');
    if (ques == false)
        return;
    const url = `http://localhost:3001/product/${id}`;
    fetch(url, { method: 'delete' })
        .then((res) => res.json())
        .then((data) => {
        // console.log(data);
        alert('Đã xóa');
        document.location = 'product.html';
    });
    // alert(id);
};
// Lấy URL
const params = window.location.href;
// Chuyển url về gì đó
let url = new URL(params);
// Dùng searchParams
let search_params = url.searchParams;
// Get ID
let id = search_params.get('id');
let cat_id = search_params.get('cat_id');
// Lưu chỉnh sửa
const luuProduct = document.querySelector('#luuProduct');
luuProduct.onclick = () => {
    const url = `http://localhost:3001/product/${id}`;
    const product = {
        name: document.querySelector('#nameProduct').value.trim(),
        price: document.querySelector('#priceProduct').value.trim(),
        image: document.querySelector('#imageProduct').value.trim(),
        hang: document.querySelector('#hangProduct').value.trim(),
        score: document.querySelector('#scoreProduct').value.trim(),
        detail: document.querySelector('#detailProduct').value.trim(),
    };
    // console.log(`sp = ${product.name}`)
    const options = {
        method: "put",
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, options).then(res => res.json())
        .then(data => {
        document.location = "./tables/product.html";
    });
};
// Lấy sản phẩm nhập vào from
const productad_edit = async () => {
    let response = await fetch(`http://localhost:3001/product/?id=${id}`);
    let data = await response.json();
    return data;
};
productad_edit().then((data) => {
    data.forEach((e) => {
        const nameProduct = document.querySelector('#nameProduct');
        nameProduct.value = `${e['name']}`;
        const priceProduct = document.querySelector('#priceProduct');
        priceProduct.value = `${e['price']}`;
        const showImgProduct = document.querySelector('#showImgProduct');
        showImgProduct.innerHTML = `<img src="${e['image']}" />`;
        const imageProduct = document.querySelector('#imageProduct');
        imageProduct.value = `${e['image']}`;
        const hangProduct = document.querySelector('#hangProduct');
        hangProduct.value = `${e['hang']}`;
        const scoreProduct = document.querySelector('#scoreProduct');
        scoreProduct.value = `${e['score']}`;
        const delProduct = document.querySelector('#detailProduct');
        delProduct.value = `${e['detail']}`;
    });
});
