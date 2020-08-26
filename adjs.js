var firebaseConfig = {
apiKey:"AIzaSyAQPD6_He01xtVIdZRM4eILYF50Y-g3EN8",
authDomain:"savrex-db.firebaseapp.com",
databaseURL:"https://savrex-db.firebaseio.com",
projectId:"savrex-db",
storageBucket:"savrex-db.appspot.com",
messagingSenderId: "397611083612",
appId: "1:397611083612:web:80751564bac4154e7f0399",
measurementId:"G-DYKMRYSDWQ" };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


db.settings({ timestampsInSnapshots: true })





var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var logoIcon = document.getElementById("logo-icon");



const signupModal = document.getElementById("signup-modal");
const signupForm = document.getElementById("signup-form");

const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");

const logout = document.getElementById("logout");

const accountDetails = document.getElementById("account-details");




const createModal = document.getElementById("create-modal");
const createForm = document.getElementById("create-form");
const createFormBtn = document.getElementById("create-form-btn");

const updateModal = document.getElementById("update-modal");
const updateForm = document.getElementById("update-form");
const updateFormBtn = document.getElementById("update-form-btn");

const guideList = document.getElementById("guides");

const loggedOutLinks = document.querySelectorAll('.logged-out');

const loggedInLinks = document.querySelectorAll('.logged-in');


auth.onAuthStateChanged(user => {
 if (user) {
db.collection('guides').orderBy('title').onSnapshot(snapshot => {
 setupGuides(snapshot.docs);
 setupUI(user)}, err => console.log(err.message))
 } else { setupUI(); setupGuides([]) }
})



signupForm.addEventListener('submit', (e) => {
 e.preventDefault();
 const email = signupForm['signup-email'].value;
 const password = signupForm['signup-password'].value;

auth.createUserWithEmailAndPassword(email, password).then(cred => {
return db.collection('users').doc(cred.user.uid).set({ bio: signupForm['signup-bio'].value });

}).then(() => {
 signupModal.style.display = "none";
 signupForm.reset()  
})


})



loginForm.addEventListener('submit', (e) => {
 e.preventDefault();
 const email = loginForm['login-email'].value;
 const password = loginForm['login-password'].value;

auth.signInWithEmailAndPassword(email, password).then((cred) => {
 loginModal.style.display = "none";
 loginForm.reset()  })
})



logout.addEventListener('click', (e) => {
 e.preventDefault();  auth.signOut()  })





createForm.addEventListener('submit', (e) => {
 e.preventDefault();
createFormBtn.innerText = "Creating Item ...";
 db.collection('guides').add({
 title: createForm.title.value,
 content: createForm.content.value
 }).then(() => { createForm.reset();
 createFormBtn.innerText = "Create Item";
 }).catch(err => { console.log(err.message) })
})





var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()

var monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

var itemFolder = year + monthNames[month];

fileButton.addEventListener("change", function(e) {

var file = e.target.files[0];

var storageRef = storage.ref(itemFolder + '/' + file.name);

var task = storageRef.put(file);

storageRef.getDownloadURL().then( function(url){
logoIcon.src = url
}).catch( function(err){  })

task.on('state_changed',

function progress(snapshot) {

var percentage = (snapshot. bytesTransferred / snapshot.totalBytes) * 100;
uploader.value = percentage;

},

function error(err){  },

);



});









const setupUI = (user) => {
  if (user) {

db.collection('users').doc(user.uid).get().then(doc => { 
accountDetails.innerHTML = ` Logged in as ${user.email} <br> ${doc.data().bio} `; });

loggedInLinks.forEach(item => item.style.display = 'block');
loggedOutLinks.forEach(item => item.style.display = 'none');
createModal.style.display = "block";

  } else {
 accountDetails.innerHTML = "";
loggedInLinks.forEach(item => item.style.display = 'none');
loggedOutLinks.forEach(item => item.style.display = 'block');
createModal.style.display = "none";
  }
}





const setupGuides = (data) => {
 if (data.length) {
 let html = '';
 data.forEach(doc => { const guide = doc.data();

 const li = ` <div class="guideEl" data-id="${doc.id}">
 <h2>${guide.title}</h2>
 <h4>${doc.id}</h4>
 <p>${guide.content}</p>
 <button onclick="deleteGuide('${doc.id}')" class=" btn">Delete Guide</button>
<button onclick="event.stopPropagation();  updateGuide('${doc.id}' , '${guide.title}' , '${guide.content}')" class="btn">Update Guide</button>
 </div> `;
 html += li;

 });


 guideList.innerHTML = html;


 } else {
guideList.innerHTML = '<h2 class="t-center">Login to view guides</h2>'; }
}







function updateGuide(id, title, content) {



updateModal.style.display = "block";
createModal.style.display = "none";



updateForm.title.focus();
updateForm.id.value = id;
updateForm.title.value = title;
updateForm.content.value = content;


updateFormBtn.addEventListener('click', (e) => {

e.preventDefault();
 updateId = updateForm.id.value;
 
 updateFormBtn.innerText = "Updating Item...";
 db.collection('guides').doc(updateId).update({
 title: updateForm.title.value,
 content: updateForm.content.value
 }).then(() => {
 updateFormBtn.innerText = "Updating Item";
 updateModal.style.display = "none";
 createModal.style.display = "block";
 updateForm.reset();
 }).catch(err => { console.log(err.message) })

});

}



function deleteGuide(id) {

var confirmDelete = confirm("Are you sure you want to delete this permanently ?");

if (confirmDelete === true) {
 db.collection('guides').doc(id).delete();}

}














document.querySelectorAll(".nav-link").forEach((close)=>{
close.addEventListener("click",()=>{
document.getElementById("nav-btn").click()})
});









