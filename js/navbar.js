"use strict";
// Navbar
const navbar = async () => {
    let response = await fetch('http://localhost:3001/categorites');
    let data = await response.json();
    // console.log(data);
    return data;
};
navbar().then((data) => {
    const navbar = document.querySelector('.nav');
    let arr = data;
    // console.log(data);
    arr.forEach((e) => {
        {
            const navbar_item = `
				<li class="nav-item text-center">
				<a class="nav-link" href="product.html?cat_id=${e['id']}">${e['title']}</a>
				</li>
      		`;
            navbar.innerHTML += navbar_item;
        }
    });
});
