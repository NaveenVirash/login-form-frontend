// Import Firebase modules
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

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign up handler
const signup = document.getElementById('submitSignUp');
signup.addEventListener('click', (event) => {
  event.preventDefault();
  
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  if (!email || !password || !firstName || !lastName) {
    showMessage('Please fill in all fields.', 'signUpMessage');
    return;
  }

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      showMessage('Account created successfully!', 'signUpMessage');
      
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          showMessage('Error saving user data', 'signUpMessage');
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email address already in use!', 'signUpMessage');
      } else {
        showMessage('Unable to create user. Please try again.', 'signUpMessage');
      }
    });
});

// Sign in handler
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('Please enter both email and password.', 'signInMessage');
    return;
  }

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login successful!', 'signInMessage');
      
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'home.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect email or password.', 'signInMessage');
      } else {
        showMessage('Account does not exist.', 'signInMessage');
      }
    });
});
