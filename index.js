function calculerInterets() {
    var montantInitial = parseFloat(document.getElementById("montantInitial").value);
    var tauxInteret = parseFloat(document.getElementById("tauxInteret").value);
    var dureePlacement = parseFloat(document.getElementById("dureePlacement").value);

    // Calcul des intérêts simples
    var gainsTotaux = montantInitial * (tauxInteret / 100) * dureePlacement;
    var gainsMensuels = (gainsTotaux / 12) / dureePlacement;
    var gainsJournaliers = (gainsTotaux / 365) / dureePlacement;

    // Vérification et remplacement de "NaN" par 0
    gainsTotaux = isNaN(gainsTotaux) ? 0 : gainsTotaux;
    gainsMensuels = isNaN(gainsMensuels) ? 0 : gainsMensuels;
    gainsJournaliers = isNaN(gainsJournaliers) ? 0 : gainsJournaliers;

    // Affichage des résultats
    document.getElementById("totalGains").textContent = gainsTotaux.toFixed(2) + '€';
    document.getElementById("gainsMensuels").textContent = gainsMensuels.toFixed(2) + '€';
    document.getElementById("gainsJournaliers").textContent = gainsJournaliers.toFixed(2) + '€';


    // Rendre visible la div container2
    document.getElementById("container2").style.display = "block";
}


document.addEventListener("DOMContentLoaded", function () {
    const quantiteInput = document.getElementById("quantite");
    const coutTotalInput = document.getElementById("coutTotal");
    const aktioStakeInput = document.getElementById("aktioStake");
    const pourcentageSelect = document.getElementById("pourcentage");
    const resultatAktioStake = document.getElementById("resultatAktioStake");
    const resultatPourcentage = document.getElementById("resultatPourcentage");
    const resultatPRU = document.getElementById("resultatPRU");

    // Fonction pour formater les nombres avec des séparateurs de milliers
    function formatNumberWithCommas(number) {
        return number.toLocaleString("fr-FR");
    }

    // Fonction pour supprimer le "NaN" si le champ est vide
    function removeNaN(inputElement) {
        if (inputElement.value.trim() === "NaN") {
            inputElement.value = "";
        }
    }

    // Fonction pour mettre à jour le champ en temps réel avec formatage
    function updateFormattedInput(inputElement) {
        const inputValue = inputElement.value.trim().replace(/,/g, "").replace(/\s+/g, "");
        const formattedValue = formatNumberWithCommas(parseFloat(inputValue)) || "";
        inputElement.value = formattedValue;
    }

    // Ajoutez des gestionnaires d'événements input pour le formatage en temps réel
    quantiteInput.addEventListener("input", function () {
        updateFormattedInput(quantiteInput);
        removeNaN(quantiteInput);
    });

    coutTotalInput.addEventListener("input", function () {
        updateFormattedInput(coutTotalInput);
        removeNaN(coutTotalInput);
    });

    aktioStakeInput.addEventListener("input", function () {
        updateFormattedInput(aktioStakeInput);
        removeNaN(aktioStakeInput);
    });

    const calculerPRUButton = document.getElementById("calculerPRU");
    calculerPRUButton.addEventListener("click", function () {
        const quantiteValue = quantiteInput.value.trim().replace(/,/g, "").replace(/\s+/g, "");
        const quantite = quantiteValue === "" ? NaN : parseFloat(quantiteValue);

        const coutTotalValue = coutTotalInput.value.trim().replace(/,/g, "").replace(/\s+/g, "");
        const coutTotal = coutTotalValue === "" ? NaN : parseFloat(coutTotalValue);

        const aktioStakeValue = aktioStakeInput.value.trim().replace(/,/g, "").replace(/\s+/g, "");
        const aktioStake = aktioStakeValue === "" ? 0 : parseFloat(aktioStakeValue); // Traitement de la valeur Aktio Stake

        const pourcentage = parseFloat(pourcentageSelect.value);

        if (!isNaN(quantite) && !isNaN(coutTotal) && !isNaN(pourcentage)) {
            if (aktioStake > quantite) {
                alert("L'Aktio Stake ne peut pas dépasser la quantité d'AKTIO.");
                return;
            }

            const pru = coutTotal / ((aktioStake * (pourcentage / 100)) + quantite);

            resultatAktioStake.textContent = `Résultat Aktio Stake : ${(aktioStake * (pourcentage / 100)).toFixed(2)}`;
            resultatPourcentage.textContent = `Pourcentage Choisi : ${pourcentage}%`;
            resultatPRU.textContent = `Le PRU est de : ${pru.toFixed(2)}€`;
        } else {
            alert("Veuillez saisir des valeurs valides.");
        }
    });
});

function calculerInteretsFlex() {
    var montantInitialFlex = parseFloat(document.getElementById("montantInitialFlex").value);
    var tauxInteretFlex = parseFloat(document.getElementById("tauxInteretFlex").value) / 100;
    var dureePlacementFlex = parseInt(document.getElementById("dureePlacementFlex").value);

    var resultatsTableauFlex = document.getElementById("resultatsTableauFlex");
    resultatsTableauFlex.innerHTML = "";

    var montantInitialAnnuelFlex = montantInitialFlex;
    for (var annee = 1; annee <= dureePlacementFlex; annee++) {
        var gainsAnnuelsFlex = 0;
        for (var jour = 1; jour <= 365; jour++) {
            var interetJournalierFlex = montantInitialAnnuelFlex * tauxInteretFlex / 365;
            montantInitialAnnuelFlex += interetJournalierFlex;
            gainsAnnuelsFlex += interetJournalierFlex;
        }

        var newRow = resultatsTableauFlex.insertRow(-1);
        var cellAnneeFlex = newRow.insertCell(0);
        var cellGainsMensuelsFlex = newRow.insertCell(1);
        var cellGainsAnnuelsFlex = newRow.insertCell(2);
        var cellMontantInitialFlex = newRow.insertCell(3);

        cellAnneeFlex.innerHTML = annee;
        cellMontantInitialFlex.innerHTML = montantInitialAnnuelFlex.toFixed(2) + '€';
        cellGainsMensuelsFlex.innerHTML = (gainsAnnuelsFlex / 12).toFixed(2) + '€';
        cellGainsAnnuelsFlex.innerHTML = gainsAnnuelsFlex.toFixed(2) + '€';
    }
    // Rendre visible la div container2
    document.getElementById("container3").style.display = "block";
}


function afficherOutil(nomOutil) {
    var outils = document.getElementsByClassName("outil");
    for (var i = 0; i < outils.length; i++) {
        outils[i].style.display = "none";
    }

    document.getElementById(nomOutil).style.display = "block";
}