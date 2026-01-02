import { auth } from "./firebase.js";
  

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


document.getElementById("showSignup").addEventListener("click",()=>{
    document.getElementById("signupCard").style.display="block";
});

document.getElementById("loginBtn").addEventListener("click",async e=>{
     e.preventDefault();
    const email=document.getElementById("loginEmail").value.trim();
    const password=document.getElementById("loginPassword").value.trim();


    if(!email||!password)
    {
        alert("Please  enter all details ");
        return;
    }
    try{
        await signInWithEmailAndPassword(auth,email,password);
        alert("login Sucessfully");
        window.location.href="index.html";
    }
    catch(error)
    {
        alert(error.message);
    }
});

document.getElementById("signupBtn").addEventListener("click",async e=>{
    e.preventDefault();
    const email=document.getElementById("signupEmail").value.trim();
    const password=document.getElementById("signupPassword").value.trim();

    if(!email||!password)
    {
        alert("Please  enter all details ");
        return;
    }
     try{
        await createUserWithEmailAndPassword(auth,email,password);
        alert("Signup Sucessfully");
        window.location.href="index.html";
    }
    catch(error)
    {
        alert(error.message);
    }
});