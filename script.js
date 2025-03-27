import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAXxxNcXBOV4CbRD23tiX-QOXMIpawAbw",
    authDomain: "newlogin-c6d89.firebaseapp.com",
    projectId: "newlogin-c6d89",
    storageBucket: "newlogin-c6d89.firebasestorage.app",
    messagingSenderId: "44907883300",
    appId: "1:44907883300:web:b74461e9b8a39929dda1b1"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db= getFirestore();

onAuthStateChange(auth,(user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db,"users",loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
           if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
           }
        })
    }
})


const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

const logoutButton=document.getElementById('logout'); 

logoutButton.addEventListener('click', ()=>{ 
    localStorage.removeItem('loggedInUserId'); 
    signOut(auth) 
    .then(()=>{ 
        window.location.href='index.html'; 
    }) 
    .catch((error) => { 
        console.error('Error Signing out:', error); 
    }) 
})