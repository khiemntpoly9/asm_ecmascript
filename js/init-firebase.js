'use strict';
// Import function khởi tạo app FireBase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';

// Config FireBase
const firebaseConfig = {
  apiKey: 'AIzaSyBU7wm4gwKIoAnoCA21Ed_mov7D5SZot10',
  authDomain: 'khiemdev-1412.firebaseapp.com',
  databaseURL: 'https://khiemdev-1412-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'khiemdev-1412',
  storageBucket: 'khiemdev-1412.appspot.com',
  messagingSenderId: '1073283395532',
  appId: '1:1073283395532:web:5b67891961fada6b1eb769',
  measurementId: 'G-3V3VCBXNZB',
};

// Khởi tạo firebaseApp
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
