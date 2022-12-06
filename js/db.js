'use strict';
// Import firebaseApp
import firebaseApp from './init-firebase.js';
// Import function kết nối DB
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';

// Khởi tạo CSDL
const database = getDatabase(firebaseApp);

export default database;
