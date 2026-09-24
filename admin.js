import { app, auth, database } from "../firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { ref, push, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const loginForm=document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit",async e=>{
    e.preventDefault();
    const error=document.getElementById("errorMessage");
    error.textContent="";
    try{
      await signInWithEmailAndPassword(auth,document.getElementById("email").value,document.getElementById("password").value);
      location.href="dashboard.html";
    }catch(err){console.error(err);error.textContent="Login failed. Check your email and password."}
  });
}

const isDashboard=location.pathname.endsWith("dashboard.html");
if(isDashboard){
  onAuthStateChanged(auth,user=>{
    if(!user) location.href="index.html";
  });
  const logout=document.getElementById("logoutButton");
  if(logout) logout.addEventListener("click",async()=>{await signOut(auth);location.href="index.html"});

  const projectForm=document.getElementById("projectForm");
  if(projectForm){
    projectForm.addEventListener("submit",async e=>{
      e.preventDefault();
      const status=document.getElementById("projectStatus");
      status.textContent="Saving...";
      try{
        await push(ref(database,"projects"),{
          name:document.getElementById("projectName").value.trim(),
          category:document.getElementById("projectCategory").value.trim(),
          url:document.getElementById("projectUrl").value.trim(),
          image:document.getElementById("projectImage").value.trim(),
          description:document.getElementById("projectDescription").value.trim(),
          createdAt:serverTimestamp()
        });
        projectForm.reset();
        status.textContent="Project saved.";
      }catch(err){console.error(err);status.textContent="Could not save project. Check database rules."}
    });
  }

  const messages=document.getElementById("messages");
  if(messages){
    onValue(ref(database,"messages"),snap=>{
      messages.innerHTML="";
      if(!snap.exists()){messages.innerHTML="<p>No messages yet.</p>";return}
      Object.values(snap.val()).reverse().forEach(m=>{
        const div=document.createElement("div");div.className="message";
        div.innerHTML=`<strong>${escapeHtml(m.name||"")}</strong> · ${escapeHtml(m.email||"")}<br>${escapeHtml(m.message||"")}`;
        messages.appendChild(div);
      });
    });
  }
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#039;"}[c]))}
