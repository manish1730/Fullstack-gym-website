🏋️ PowerFit Gym Website

A modern, fully responsive gym website built using HTML, CSS, JavaScript, and Firebase, designed to simulate a real-world fitness platform with user authentication, membership plan selection, admin approval workflow, and database integration.

🚀 Live Features
👤 User Features

User Signup & Login (Firebase Authentication)

Browse gym programs and trainers

Select a membership plan (Monthly / Quarterly / Annual)

Prevents duplicate plan selection

View active plan status after admin approval

Contact form with data stored in Firestore

BMI Calculator

Dark / Light mode toggle

Fully responsive UI (Mobile / Tablet / Desktop)

🛠 Admin Features

Secure admin-only dashboard

View all pending membership requests

Activate user membership plans manually

Real-time update of plan status

🧑‍💻 Tech Stack
Category	Technologies
Frontend	HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6+)
Backend / Services	Firebase
Authentication	Firebase Authentication
Database	Cloud Firestore
Version Control	Git & GitHub
📂 Project Structure
powerfit-gym/
│── index.html
│── login.html
│── admin.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js      # Main website logic
│   ├── auth.js        # Login & Signup logic
│   ├── admin.js       # Admin dashboard logic
│   └── firebase.js    # Firebase configuration
│
└── README.md

🔐 Authentication Flow

Users sign up or log in using email & password.

Authentication is handled via Firebase Auth.

Logged-in users can select a gym membership plan.

Plan data is saved with status Pending.

Admin manually activates the plan.

User sees updated plan status in real time.

🗄 Database Design (Firestore)
Collections Used
contacts
{
  "name": "User Name",
  "email": "user@email.com",
  "message": "User message",
  "createdAt": "timestamp"
}

subscription
{
  "userId": "Firebase UID",
  "email": "user@email.com",
  "plan": "Monthly | Quarterly | Annual",
  "price": 999,
  "status": "Pending | Active",
  "createdAt": "timestamp"
}

🔒 Security Rules (Concept Used)

Only authenticated users can create subscriptions

Users can read only their own plan

Only admin can update plan status

Contact form allows write-only access

📸 Screens & UI Highlights

Sticky navbar with scroll shadow

Animated sections using Intersection Observer

Card-based pricing layout

Smooth transitions and hover effects

Scroll progress bar

⚙️ How to Run Locally

Clone the repository:

git clone https://github.com/your-username/powerfit-gym.git


Open the project folder:

cd powerfit-gym


Open index.html using Live Server or browser.

⚠️ Firebase requires running the project using a local server (Live Server).

🎯 Learning Outcomes

Hands-on experience with Firebase Authentication & Firestore

Real-world user–admin workflow design

ES Modules and modular JavaScript

Role-based access control

Preventing duplicate database entries

Git & GitHub best practices

🧠 Future Enhancements

Payment gateway integration (Razorpay / Stripe)

User profile dashboard

Admin analytics panel

Email notifications on plan activation

Role-based Firestore rules using custom claims

👨‍🎓 Author

Manish Chaudhary
Computer Science Engineering Student
Aspiring Frontend / Software Developer