"use strict";
// Product Deltai
const product_del = async () => {
    // Lấy URL
    const params = window.location.href;
    // Chuyển url về gì đó
    let url = new URL(params);
    // Dùng searchParams
    let search_params = url.searchParams;
    // Get ID
    let id = search_params.get('id');
    // console.log(id);
    // Get product
    let response = await fetch(`http://localhost:3001/product?id=${id}`);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    return data;
};
product_del().then((data) => {
    const show_product_del = document.querySelector('.product__main');
    let arr = data;
    // console.log(arr['data']);
    arr.forEach((e) => {
        document.title = `${e['name']}`;
        {
            // console.log(e);
            const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
            const price = new Intl.NumberFormat('vi-VN', config).format(e.price);
            // console.log(formated);
            const product_del = `
			<div class="col-12 col-md-4 text-center">
				<img
					class="product__main-thumnail"
					src="${e['image']}"
					alt=""
				/>
			</div>
			<div class="product__main-info col-12 col-md-8">
				<div class="item-name">
					<h3>${e['name']}</h3>
					<div class="item-price">Giá:&nbsp;<span>${price}</span>&nbsp;</div>
					<div class="item-deital">
						<span class="text-black">
							${e['detail']}
						</span>
					</div>
					<a class="btn btn-danger" href="cart.html" 
						onclick="addCart(${e['id']}, '${e['name']}', ${e['price']}, '${e['image']}', '${e['hang']}')">
								Mua Ngay
					</a>
				</div>
			</div>
	    `;
            show_product_del.innerHTML += product_del;
        }
    });
});
