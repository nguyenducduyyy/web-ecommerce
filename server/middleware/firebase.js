// const the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app')
const { getAnalytics } = require( "firebase/analytics") ;
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage") ;
const fs = require("fs");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT9ryNz6FW0uZ4gkRYDaDiNOtx9-zxgHM",
  authDomain: "node-react-70f5e.firebaseapp.com",
  projectId: "node-react-70f5e",
  storageBucket: "node-react-70f5e.appspot.com",
  messagingSenderId: "784111210562",
  appId: "1:784111210562:web:5478697ed7bfcf4f0e9ddb",
  measurementId: "G-R514TYB5P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

const uploadFilesAndGetUrls = async (files) => {
  if (!files) {
    return []; // Trả về một mảng rỗng nếu `files` không tồn tại hoặc không có giá trị
  }
  const promises = files.map(async (file) => {
    const storageRef = ref(storage, "images/" + file.originalname);
    const buffer = await fs.promises.readFile(file.path);
    const uploadTask = uploadBytesResumable(storageRef, buffer);
    await uploadTask;
    const url = await getDownloadURL(storageRef);
    return url;
  });
  
  const urls = await Promise.all(promises);
  return urls;
};


const deleteFilesByUrl = async (urls) => {
  const promises = urls.map(async (url) => {
    const storageRef = ref(storage, "images/" + url);
    await deleteObject(storageRef);
    return url;
  });

  const deletedUrls = await Promise.all(promises);
  return deletedUrls;
};
  
module.exports = { uploadFilesAndGetUrls, deleteFilesByUrl }
