import { database } from "./firebase-config.js";
import { ref, push, serverTimestamp, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");
if(menuBtn) menuBtn.addEventListener("click",()=>navMenu.classList.toggle("active"));
if(navMenu) navMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("active")));

const form=document.getElementById("contactForm");
if(form){
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const status=document.getElementById("formStatus");
    status.textContent="Sending...";
    try{
      await push(ref(database,"messages"),{
        name:document.getElementById("name").value.trim(),
        email:document.getElementById("email").value.trim(),
        message:document.getElementById("message").value.trim(),
        createdAt:serverTimestamp(),
        status:"new"
      });
      form.reset();
      status.textContent="Message sent successfully.";
    }catch(err){
      console.error(err);
      status.textContent="Could not send the message. Check Firebase Realtime Database rules.";
    }
  });
}

// Load admin-created projects if they exist.
const projectsGrid=document.getElementById("projectsGrid");
onValue(ref(database,"projects"),snap=>{
  if(!snap.exists()) return;
  const data=snap.val();
  Object.entries(data).reverse().forEach(([id,p])=>{
    if(!p || !p.name) return;
    const article=document.createElement("article");
    article.className="project-card";
    const safeImage=p.image || "";
    article.innerHTML=`<div class="project-image">${safeImage ? `<img src="${safeImage}" alt="" style="width:100%;height:100%;object-fit:cover">` : "🚀"}</div>
      <div class="project-content"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||"")}</p>
      ${p.url?`<a class="project-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener">Open Project →</a>`:""}</div>`;
    projectsGrid.prepend(article);
  });
});

function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#039;"}[c]))}
function escapeAttr(v){return String(v).replace(/"/g,"%22").replace(/</g,"%3C").replace(/>/g,"%3E")}
