// Your web app's Firebase configuration
const firebaseConfig = {
    // Legg informasjon fra deres firebase her
    apiKey: "AIzaSyAQaQK6uG_l4CcNdPqhrF1QutrTWHlZRAg",
    authDomain: "test-e7d1b.firebaseapp.com",
    projectId: "test-e7d1b",
    storageBucket: "test-e7d1b.appspot.com",
    messagingSenderId: "294051066653",
    appId: "1:294051066653:web:de8c16e49fb78c4dc1a7f4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();

// Elementer fra DOM
let hovedEl = document.querySelector("#hoved")
let fornavnEl = document.querySelector("#fornavn")
let kommentarEl = document.querySelector("#kommentar")
let publiserBtn = document.querySelector("#publiser")

// Legger til lytter
publiserBtn.addEventListener("click", publiser)

let collectionName = "vurdering"

// Funksjon som legger til ny bruker i databasen
function publiser(){
    db.collection(collectionName).add({
        fornavn: fornavnEl.value,
        kommentar: kommentarEl.value,
        
    })

    // Tømmer input felt
    fornavnEl.value = ""
    kommentarEl.value = ""

    console.log("Omtalen er publisert")
    hentData()
}


function hentData(){
    // Henter data. Når dataene er ferdig hentet, starter "then"-biten
    db.collection(collectionName).get().then((snapshot) => {

        // Henter ut dokumentene
        let dokumenter = snapshot.docs;

        // Tømmer div som omtalene skal være i
        hovedEl.innerHTML = ""
    
        // Går gjennom dokumentene
        for (let i = 0; i < dokumenter.length; i++) {
            // Henter data for en enkelt bruker
            let bruker = dokumenter[i].data()
    
            hovedEl.innerHTML += `<h4>${bruker.fornavn}<h4>  <p>${bruker.kommentar}</p> <br>`
        }
    });
}


hentData()