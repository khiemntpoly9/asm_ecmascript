'use strict';
const show_category = document.querySelector('.admin-show-category');
const urlBase = 'https://khiemdev-1412-default-rtdb.asia-southeast1.firebasedatabase.app';
const urlCate = `${urlBase}/categories`;

let btnpostcate = document.querySelector('#postCate');
// Lấy value
let getValueCate = document.getElementById('valueCateNew');
// Post catagory
const postCategory = () => {
   const postdata = { name: getValueCate.value };
   try {
      const post = axios.post(`${urlCate}.json`, postdata, {
         headers: { 'Content-Type': 'application/json' },
      });
      console.log(`Thành công! ${postdata}`);
   } catch (error) {
      console.log(error);
   }
   location.reload();
};
btnpostcate.onclick = postCategory;

// get data
const getCategory = async () => {
   try {
      const response = await axios.get(`${urlCate}.json`);
      let data = response.data;
      for (const key in data) {
         const element = data[key];
         const list = `
            <div class="mb-2">
               <span>${key}</span>
               <span>${element.name}</span>
               <button type="button" class="btn btn-danger" onclick="deleteCate('${key}')">Xoá</button>
               <button type="button" class="btn btn-primary" onclick="getDetailCate('${key}')" data-toggle="modal" data-target="#categorydetail">
                  Sửa
               </button>
            </div> 
        `;
         show_category.innerHTML += list;
      }
   } catch (error) {
      console.log(error);
      show_category.innerHTML = `
        <span> Không tìm thấy dữ liệu! </span>
    `;
   }
};
getCategory();

// Lấy chi tiết
const getDetailCate = async (cateId) => {
   let btnsave = document.querySelector('.modal-footer');
   let categoryedit = document.querySelector('#categoryedit');
   try {
      const response = await axios.get(`${urlCate}/${cateId}.json`);
      let data = response.data.name;
      categoryedit.value = data;
      const btn = `
         <button type="button" onclick="updateCate('${cateId}')" class="btn btn-primary" data-dismiss="modal">Lưu</button>
      `;
      btnsave.innerHTML = btn;
   } catch (err) {
      console.log(error);
   }
};

// Update
const updateCate = async (cateId) => {
   const categoryedit = document.querySelector('#categoryedit');
   let data = {
      name: categoryedit.value,
   };
   try {
      const put = await axios.put(`${urlCate}/${cateId}.json`, data, {
         headers: { 'Content-Type': 'application/json' },
      });
   } catch (err) {
      console.log(error);
   }
   location.reload();
};

// Xoá
const deleteCate = (cateId) => {
   const ques = confirm(`Bạn có muốn xóa danh mục ID: ${cateId}?`);
   if (ques == false) return;
   try {
      const dlt = axios.delete(`${urlCate}/${cateId}.json`);
      console.log('Đã xoá');
   } catch (error) {
      console.log(error);
   }
   location.reload();
};
