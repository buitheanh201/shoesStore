import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDlossH-L7HPZfbh0mGdnU8HC9YHtPV98M",
    authDomain: "assignment-f334e.firebaseapp.com",
    projectId: "assignment-f334e",
    storageBucket: "assignment-f334e.appspot.com",
    messagingSenderId: "434838192988",
    appId: "1:434838192988:web:7151930b0c53a52fcb7799"
  };

const firebaseInit = firebase.initializeApp(firebaseConfig);

const uploadFile = async(fileName,blob) => {
    const res = await firebaseInit.storage().ref(`pictures/${fileName}`).put(blob);
    const url = await firebaseInit.storage().ref(`pictures/${fileName}`).getDownloadURL();
    return url;
}


export { uploadFile }