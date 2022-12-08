'use strict';
// Import function kết nối DB
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
// Import BD
import database from './db.js';

// Lấy data
const navbar = document.querySelector('.nav');
const getDataCate = async () => {
  const categories = await ref(database, 'categories/');
  onValue(
    categories,
    (item) => {
      item.forEach((childitem) => {
        const childKey = childitem.key;
        const childData = childitem.val();
        const list = `
            <li class="nav-item text-center">
			    <a class="nav-link" href="product.html?cat_id=${childData.name}">${childData.name}</a>
			</li>
        `;
        navbar.innerHTML += list;
      });
    },
    {
      onlyOnce: true,
    }
  );
};
getDataCate();
