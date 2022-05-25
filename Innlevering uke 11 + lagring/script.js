let tall1
let tall2

const feilLyd = document.querySelector("#feil");
const riktigLyd = document.querySelector("#riktig");

let inputEl = document.querySelector("#input"); //henter input-elemetet og gir det navnet inputEl

let matteEl = document.querySelector(".matte"); //henter div-elementet rundt regnestykket slik at jeg kan bruke det i funkjsonen under

let nyeTall = document.querySelector(".nye-tall"); //henter knapp og gjør slik at den gir nye tall (refresher hele siden) til et nytt regnestykke når man klikker på den

let poeng = document.querySelector("#poeng"); //henter h3 fra html så jeg senere kan skrive inn antall poeng spilleren har / personlig rekord
let rekord = document.querySelector("#rekord");


//setter opp knapp for å sjekke svar:
let knapp = document.querySelector(".sjekk");

// Setter scoren til 0
let score = 0

let resultat = document.querySelector("#resultat");

// Henter nytt regnestykke når man trykker på knappen "Nytt regnestykke"
nyeTall.addEventListener("click", nyttRegnestykke)


// Mindre kode ved å bruke en for-løkke og array
let sjekk = ["sjekk-add", "sjekk-sub", "sjekk-mul", "sjekk-div"]

for(let i=0; i<sjekk.length; i++){ //lagrer personlig rekord, dersom ingen rekord lagret fra før settes den til 0
    if(!localStorage[sjekk[i]]){
        localStorage[sjekk[i]] = 0
    }else {
        localStorage[sjekk[i]] = Number(localStorage[sjekk[i]])
    }
}

// Funksjon som henter nytt regnestykke
function nyttRegnestykke(){
    tall1 = Math.floor(Math.random()*10 + 1); //tilfeldige tall fra 1-10
    //console.log(tall1); //sjekker at det vises i konsollen
    document.querySelector(".tall1").innerHTML = tall1;

    tall2 = Math.floor(Math.random()*10 + 1);
    //console.log(tall2);
    document.querySelector(".tall2").innerHTML = tall2;

    inputEl.value = ""
    matteEl.style.backgroundImage = ""
    resultat.innerText = "";
}


// Henter det første regnestykket
nyttRegnestykke()



knapp.addEventListener("click", utregning); //når knappen klikkes på kjører funksjonen

function utregning(e){ //funksjon til alle utregningene, bestemt av hvilken id knappen har
    let svar = Number(inputEl.value);
    let fasit
    if (e.target.id == "sjekk-add"){
        fasit = Number(tall1) + Number(tall2); //angir fasiten etter hvilken regneoperasjon det er, slik at programmet kan sammenlikne brukerens svar og det svaret som er riktig
        //console.log(fasit);
    }else if(e.target.id == "sjekk-sub") {
        fasit = Number(tall1) - Number(tall2);
        //console.log(fasit);
    }
    else if(e.target.id == "sjekk-mul"){
        fasit = Number(tall1) * Number(tall2);
        //console.log(fasit);
    }
    else if(e.target.id == "sjekk-div"){
        fasit = Number(tall1) / Number(tall2);
        //console.log(fasit);
    }
    
    
    if (svar == fasit){ //om svarene er riktige skjer dette
        riktigLyd.play();// spill lyd som antyder at det er riktig
        console.log("riktig");
        score += 1 // legger til et poeng for hvert riktige svar
        console.log("Du har " + score + " poeng");
        matteEl.style.backgroundImage = "url(https://acegif.com/wp-content/gif/confetti-17.gif)"; //gratis gif hentet fra https://acegif.com/confetti/
        resultat.innerText = "Bra jobba!";
        
    }
    
    else {//om svarene er feil skjer dette
       feilLyd.play();//spill feil-lyd
       console.log("feil");
       resultat.innerText = "Prøv igjen!";
       matteEl.style.backgroundImage = "url(https://media1.giphy.com/media/MDaMURfqSp7H1mQ1Ga/giphy.gif)";//gif lånt fra https://dezoitowallpaper.blogspot.com/2021/03/rain-gif-transparent-see-more-ideas.html
       if (score > Number(localStorage[e.target.id])){
        localStorage[e.target.id] = score // ny highscore for dette spillet
       }
       score = 0 //hvis feil svar nulstilles poengene
       console.log("Rekorden er", localStorage[e.target.id])
    }

    poeng.innerText = "Poeng: " + score //antall poeng skrives inn i html
    rekord.innerText = "Personlig rekord: " + localStorage[e.target.id]//personlig rekord skrives inn i html

}