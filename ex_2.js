/*
* Autheur : Gatien Clerc
* DATE : 07.11.25
* Projet : ex.1 js
*/
"use strict;"
// test
console.log ("Hello world");

// ex. 2
let num_musique = 125;
console.log (num_musique);
console.log("");

num_musique -= 15;
num_musique += 10;
console.log ("Maintenant, j’ai " + num_musique + " morceaux au total dans ma playlist");
console.log (`Maintenant, j’ai ${num_musique} morceaux au total dans ma playlist`);

console.log("");

// ex. 2.2 liste
let songs = ["a", "b", "c"];
console.log (songs.length)

songs.push("d");
songs.push("e");
//songs[4]= "e";

function show_songs(songs) {
    for (let song of songs){
        console.log (song)
    }
}
console.log ()
show_songs(songs);

console.log ()

songs.pop();
console.log (songs)

songs.splice(1, 1);
console.log(songs)
songs.splice(6, 1);
console.log(songs) // il se pace rien car il y a pas de 7 ellement

// ex. 2.3 boucle
console.log()

for (let i = 1; i <= 9; i++) {
    console.log(String(i).repeat(i));
}

// ex. 2.4	Calculatrice
//1: Addition | 2: Soustraction | 3: Division | 4: Multiplication
console.log();

let a = 0;
let b = 7;

let cal = 4;

console.log ("le nombre a est " + a);
console.log ("le nombre b est " + b);
console.log("la valeur est de " + cal +"\nChoisissez l'opération :\n1: Addition\n2: Soustraction\n3: Division\n4: Multiplication");

// Déclarer les fonctions fléchées pour chaque opération
const addition = (x, y) => x + y;
const soustraction = (x, y) => x - y;
const multiplication = (x, y) => x * y;
const division = (x, y) => {
    if (x === 0) {
        throw new Error("Division par zéro interdite");
    }
    if (y === 0) {
        throw new Error("Division par zéro interdite");
    }
    return x / y;
};

// Fonction pour tester l'opération choisie
function testCalcul(a, b, cal) {
    let resultat;

    switch (cal) {
        case 1:
            resultat = addition(a, b);
            break;
        case 2:
            resultat = soustraction(a, b);
            break;
        case 3:
            try {
                resultat = division(a, b);
            } catch (e) {
                resultat = e.message;
            }
            break;
        case 4:
            resultat = multiplication(a, b);
            break;
        default:
            resultat = "Opération invalide";
    }

    console.log(`Résultat : ${resultat}`);
}

// Appeler la fonction avec les valeurs saisies
testCalcul(a, b, cal);
