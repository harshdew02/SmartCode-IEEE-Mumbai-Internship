

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
const firebaseConfig = {
  apiKey: 'AIzaSyAz3d_xBg_2S4hBOxEd7gRT13cYrPVKbDs',
  authDomain: 'fire9db-e1c0c.firebaseapp.com',
  projectId: 'fire9db-e1c0c',
  storageBucket: 'fire9db-e1c0c.appspot.com',
  messagingSenderId: '170442699980',
  appId: '1:170442699980:web:5dee1fbe5516b6d828fe69',
}
const app = initializeApp(firebaseConfig)
import {
  getDatabase,
  get,
  ref,
  set,
  child,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const db = getDatabase()
// Firebase importation Ends

// Importing the elements START
var fname = document.getElementById('Filename')
// var edt = document.getElementById('editor')
var edtcontainer = document.getElementById('code')
let lan = document.getElementById("language");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");

var insBtn = document.getElementById('Insbtn')
var selBtn = document.getElementById('Selbtn')
var updBtn = document.getElementById('Updbtn')
var delBtn = document.getElementById('Delbtn')
// Importing the elements END


let k;

function write() {
  k = lan.value;
  editor.session.setMode("ace/mode/" + k);
  let m = editor.getValue();
  // editor.setValue(m);
  // console.log(m);
}
write();
let j = 0;

function InsertData() {

  let data = editor.getValue();

  if(fname.value == ""){
    alert("enter file name")
    return;
  }
  
  const para = document.createElement("div");
  para.className = "file";
  para.setAttribute('id' , j);
  j++;
  para.innerHTML = fname.value;
  document.getElementById("home-container05").appendChild(para);

  set(ref(db, 'CODE/' + fname.value), {
    code: data,
  })
    .then(() => {
      alert('data stored successfully')
    })
    .catch((error) => {
      alert('unsuccessful, error' + error)
    })

}

// let filedom = document.getElementsByClassName("file");
// const buttonGroup = document.getElementById("home-container05");
// const result = document.getElementById("result");
// const buttonGroupPressed = e => { 
  
//   const isButton = e.target.nodeName === 'BUTTON';
  
//   if(!isButton) {
//     return
//   }
  
//    fname.value = `ID of <em>${e.target.innerHTML}</em>`;
  
// }
// buttonGroup.addEventListener("click", buttonGroupPressed);



// firebase_node.once('value', function(snapshot) { alert('Count: ' + snapshot.numChildren()); });

function SelectData() {
  const dbref = ref(db)
  get(child(dbref, 'CODE/' + fname.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        editor.setValue(snapshot.val().code)
        alert('hi')
      } else {
        alert('No data found')
      }
    })
    .catch((error) => {
      alert('unsuccessful, error' + error)
    })
}

function UpdateData() {
  let data = editor.getValue();
  update(ref(db, 'CODE/' + fname.value), {
    code: data,
  })
    .then(() => {
      alert('data Updated successfully')
    })
    .catch((error) => {
      alert('unsuccessful, error' + error)
    })
}

function DeleteData() {
  remove(ref(db, 'CODE/' + fname.value))
    .then(() => {
      alert("data is removed successfully");
    })
    .catch((error) => {
      alert("unsuccesful , error" + error);
    });
}

// e.addEventListener('click' , setfileName(e))

lan.addEventListener('click', write);
insBtn.addEventListener('click', InsertData);
// insBtn.addEventListener('click', make);
selBtn.addEventListener('click', SelectData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeleteData);