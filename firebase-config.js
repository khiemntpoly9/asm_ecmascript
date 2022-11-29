const firebaseConfig = {
	/* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */
	apiKey: 'AIzaSyBU7wm4gwKIoAnoCA21Ed_mov7D5SZot10',
	authDomain: 'khiemdev-1412.firebaseapp.com',
	databaseURL: 'https://khiemdev-1412-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'khiemdev-1412',
	storageBucket: 'khiemdev-1412.appspot.com',
	messagingSenderId: '1073283395532',
	appId: '1:1073283395532:web:5b67891961fada6b1eb769',
	measurementId: 'G-3V3VCBXNZB',
};

export function getFirebaseConfig() {
	if (!firebaseConfig || !firebaseConfig.apiKey) {
		throw new Error(
			'No Firebase configuration object provided.' +
				'\n' +
				"Add your web app's configuration object to firebase-config.js"
		);
	} else {
		return firebaseConfig;
	}
}
