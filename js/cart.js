"use strict";
function addCart(id, name, price, image, hang) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = [];
        cart.push({ id: id, name: name, price: price, image: image, hang: hang, quatity: 1 });
    }
    else {
        const item = cart.find((item) => item.id === id);
        if (item)
            item.quatity++;
        else
            cart.push({ id: id, name: name, price: price, image: image, hang: hang, quatity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Xuất ra giỏ hàng
const cart_index = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    const show_cart = document.querySelector('#item-cart');
    cart.forEach((e, index) => {
        {
            const sumPrice = e.price * e.quatity;
            const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
            const pricef = new Intl.NumberFormat('vi-VN', config).format(e.price);
            const sumPricef = new Intl.NumberFormat('vi-VN', config).format(sumPrice);
            // console.log(parseFloat(sumPricef));
            console.log(Number(sumPricef.replace(/[^0-9.-]+/g, '')));
            const item_cart = `
			<div class="row">
				<div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
					<!-- Image -->
					<div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
						<img src="${e['image']}" class="w-100" alt=""/>
					</div>
					<!-- Image -->
				</div>
				<div id="i" class="col-lg-5 col-md-6 mb-4 mb-lg-0">
					<!-- Data -->
					<a href="product-del.html?cat_id=${e['cat_id']}&id=${e['id']}">
						${e['name']}
					</a>
					<p>Hãng: ${e['hang']}</p>
					<p>Giá: ${pricef}</p>
					<button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Xoá sản phẩm"
					onclick="deleteitem(${e['id']})">
						<i class="fas fa-trash"></i>
					</button>
					<!-- Data -->
				</div>
				<div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
					<!-- Quantity -->
					<div class="d-flex mb-4" style="max-width: 300px">
						<div class="form-outline">
						Số lượng: 
							<input id="form1" min="1" name="quantity" value="${e['quatity']}" type="number" 
							class="form-control"
							onkeyup="countPrice(${e['price']}, this.value, ${index})"
							onclick="countPrice(${e['price']}, this.value, ${index})"/>
						</div>
					</div>
					<!-- Quantity -->
	
					<!-- Price -->
					<p class="text-start text-md-center">
						<strong style="display:none" class="sumPriceT">${sumPrice}</strong>
						<strong class="sumPriceTs">${sumPrice}</strong>
					</p>
					<!-- Price -->
				</div>
			</div>
			<hr class="my-4" />
			`;
            show_cart.innerHTML += item_cart;
        }
    });
};
cart_index();
// Cout Price Item
const countPrice = (gia, sl, i) => {
    let sumPrice = gia;
    sumPrice = gia * sl;
    let priceElement = document.getElementsByClassName('sumPriceT')[i];
    priceElement.innerHTML = `${sumPrice}`;
    let priceElementf = document.getElementsByClassName('sumPriceTs')[i];
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const pricef = new Intl.NumberFormat('vi-VN', config).format(sumPrice);
    priceElementf.innerHTML = `${pricef}`;
    priceALL();
};
const priceALL = () => {
    let priceElement = document.getElementsByClassName('sumPriceT');
    // console.log(`Test: ` + typeof priceElement);
    let allPrice = 0;
    for (let t of priceElement) {
        allPrice += parseInt(t.innerHTML);
    }
    let getSumPrice = document.querySelector('#sumpriceall');
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const pricef = new Intl.NumberFormat('vi-VN', config).format(allPrice);
    getSumPrice.innerHTML = `${pricef}`;
};
// Xoá sản phẩm
let deleteitem = (id) => {
    let cartdlt = JSON.parse(localStorage.getItem('cart'));
    const isDulicated = cartdlt.some((item) => item.id === id);
    if (isDulicated) {
        const data = cartdlt.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(data));
        window.location.reload();
    }
    else {
    }
};
