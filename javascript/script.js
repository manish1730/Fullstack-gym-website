// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Shared Firebase instances
import { auth, db } from "./firebase.js";

// Firestore actions
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Auth actions
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.onclick = () => {
  navLinks.classList.toggle("active");
};

// Navbar Shadow
window.addEventListener("scroll", () => {
  document.querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);

  // Progress Bar
  const scrolled = (window.scrollY / 
    (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

// Scroll Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".animate")
  .forEach(el => observer.observe(el));

// Dark / Light Mode
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  toggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

// Testimonial Slider
const testimonials = [
  `"Amazing trainers and environment!" – Sarah`,
  `"I transformed my body in 3 months!" – Rahul`,
  `"Best gym in the city." – Mike`
];

let index = 0;
setInterval(() => {
  document.getElementById("testimonial").innerHTML =
    `<p>${testimonials[index]}</p>`;
  index = (index + 1) % testimonials.length;
}, 3000);

// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const message=document.getElementById("message").value.trim();

  if(!name||!email||!message)
  {
    alert("please fill the full details");
    return;
  }
  try{
    await addDoc(collection(db,"contacts"),{
      name,
      email,
      message,
      createdAt:serverTimestamp()
    });
    alert("Message sent sucessfully");
    e.target.reset();
  }
  catch(error)
  {
    alert("message not sent");
    console.log(error);
  }
});

// BMI Calculator
function calculateBMI() {
  const h = document.getElementById("height").value / 100;
  const w = document.getElementById("weight").value;
  const bmi = (w / (h * h)).toFixed(2);
  document.getElementById("bmiResult").innerText =
    `Your BMI is ${bmi}`;
}
const loginlink=document.getElementById("loginlink");
const logoutbtn=document.getElementById("logoutBtn");


 onAuthStateChanged(auth, async user=>{
  if(user)
  {
    //user logged in
    loginlink.style.display="none";
    logoutbtn.style.display="inline-block";
    // calling of loadUserPlan
    await loadUserPlan(user)
  }
  else{
    loginlink.style.display="inline-block";
    logoutbtn.style.display="none";
  }
  

 logoutbtn.addEventListener("click",async()=>{
  try{
    await signOut(auth);
    alert("logged out sucessfully");
    window.location.href="index.html";
  }
  catch(error)
  {
    alert(error.message);
  }
 });
});
 //selecting plan
 const planbuttons=document.querySelectorAll(".select-plan");

 planbuttons.forEach(button=>{
  button.addEventListener("click",async()=>{
    handlePlanSelection(button);
  });
 });
 // plan saving to the firestore database

 async function handlePlanSelection(button) {
  const user=auth.currentUser;

  if(!user)
  {
    alert("Please login to select the plan");
    window.location.href="login.html";
    return;
  }
  const selectedPlan=button.dataset.plan;
  const price=Number(button.dataset.price);

  try{
     const q = query(
      collection(db, "subscription"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("You have already selected a plan.");
      return;
    }

    await addDoc(collection(db,"subscription"),{
      userId: user.uid,
      email: user.email,
      plan: selectedPlan,
      price: price,
      status:"Pending",
      createdAt:serverTimestamp(),
  });
    alert(`You selected the ${selectedPlan} plan sucessfully`);
  }catch(error)
  {
    alert("failed to select the plan");
    console.error(error);
  }
}
// Plan stauts indicator
async function loadUserPlan(user) {
   if(!user)return;
 const q=query(
    collection(db,"subscription"),
    where("userId","==",user.uid)
  );
  const snapshot=await getDocs(q);

  if(!snapshot.empty)
  {
    const planData=snapshot.docs[0].data();

    document.getElementById("userPlan").style.display="block";
    document.getElementById("userPlanName").textContent=planData.plan;
    document.getElementById("userPlanPrice").textContent=`₹${planData.price}`;
    document.getElementById("userPlanStatus").textContent=planData.status;

    document.querySelectorAll(".select-plan").forEach(button=>{
      button.disabled=true;
      button.textContent="Plan Selected";
      button.style.opacity="0.6";
    
 });
}
  
}