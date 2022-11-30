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

// Thêm dữ liệu
let btnpostcate = document.querySelector('#postCate');
const postCategory = async () => {
  const idCateNew = document.querySelector('#valueIdCateNew');
  const getValueCate = document.getElementById('valueCateNew');

  const categoriespush = ref(database, 'categories/');
  const newCate = push(categoriespush);
  set(newCate, {
    id: Number(idCateNew.value),
    name: getValueCate.value,
  });
  location.reload();
};
btnpostcate.onclick = postCategory;

// Lấy data
const show_category = document.querySelector('.admin-show-category');
const getDataCate = () => {
  const categories = ref(database, 'categories/');
  onValue(
    categories,
    (item) => {
      item.forEach((childitem) => {
        const childKey = childitem.key;
        const childData = childitem.val();
        const list = `
          <div class="mb-2">
            <span>${childKey}</span>
            <span>${childData.id}</span>
            <span>${childData.name}</span>
            <button type="button" class="btn btn-primary" onclick="getDetailCate('${childKey}')" data-toggle="modal" data-target="#categorydetail">
              Sửa
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteCate('${childKey}')">Xoá</button>
          </div> 
        `;
        show_category.innerHTML += list;
      });
    },
    {
      onlyOnce: true,
    }
  );
};
getDataCate();

// Lấy thông tin chi tiết
window.getDetailCate = (childKey) => {
  let btnsave = document.querySelector('.modal-footer');
  let categoryedit = document.querySelector('#categoryedit');
  let idCate = document.querySelector('#categoryidedit');

  const dataDetail = ref(database, `categories/${childKey}`);
  onValue(dataDetail, (dataDetail) => {
    const data = dataDetail.val();
    idCate.value = data.id;
    categoryedit.value = data.name;
    const btn = `
        <button type="button" onclick="updateCate('${childKey}')" class="btn btn-primary" data-dismiss="modal">Lưu</button>
      `;
    btnsave.innerHTML = btn;
  });
};

// Update
window.updateCate = (childKey) => {
  let idCate = document.querySelector('#categoryidedit');
  let categoryedit = document.querySelector('#categoryedit');
  let data = {
    id: idCate.value,
    name: categoryedit.value,
  };
  const updates = {};
  updates[`categories/${childKey}`] = data;
  return update(ref(database), updates);
};

// Delete
window.deleteCate = (childKey) => {
  let data = {
    id: null,
    name: null,
  };
  const updates = {};
  updates[`categories/${childKey}`] = data;
  return update(ref(database), updates);
  // return remove(ref(database), `categories/${childKey}`);
};
// const commentsRef = ref(database, 'categories/-NI8lVbIm1EjJSZehple');
// onChildRemoved(commentsRef, (data) => {
//   deleteComment(postElement, data.key);
// });
