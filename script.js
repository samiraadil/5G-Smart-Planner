/* =========================================
   5G SMART PLANNER
   JavaScript principal
========================================= */


/* =========================================
   INITIALISATION DE LA CARTE
========================================= */

// Position initiale : Casablanca
const map = L.map("map").setView(
    [33.5731, -7.5898],
    12
);


// Fond de carte OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);



/* =========================================
   VARIABLES
========================================= */

let stationMarkers = [];

let coverageCircles = [];



/* =========================================
   MARQUEUR PERSONNALISÉ
========================================= */

const stationIcon = L.divIcon({

    className: "custom-station-icon",

    html: `
        <div style="
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #2563eb;
            border: 4px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
    `,

    iconSize: [25, 25],

    iconAnchor: [12, 12]

});



/* =========================================
   GÉNÉRER DES STATIONS
========================================= */

function generateStations(number, radius) {

    clearMap();


    // Centre de Casablanca
    const centerLat = 33.5731;

    const centerLng = -7.5898;


    for (let i = 0; i < number; i++) {

        /*
         * Petite variation aléatoire autour
         * du centre de la ville.
         */

        const lat =
            centerLat +
            (Math.random() - 0.5) * 0.12;

        const lng =
            centerLng +
            (Math.random() - 0.5) * 0.15;


        // Création du marqueur
        const marker = L.marker(
            [lat, lng],
            {
                icon: stationIcon
            }
        ).addTo(map);


        marker.bindPopup(`
            <strong>Station 5G #${i + 1}</strong>
            <br>
            Technologie : 5G
            <br>
            Statut : Active
            <br>
            Puissance : ${document.getElementById("power").value} W
        `);


        stationMarkers.push(marker);


        // Cercle de couverture
        const circle = L.circle(
            [lat, lng],
            {
                radius: radius,

                color: "#2563eb",

                fillColor: "#2563eb",

                fillOpacity: 0.10,

                weight: 1
            }
        ).addTo(map);


        coverageCircles.push(circle);

    }

}



/* =========================================
   NETTOYER LA CARTE
========================================= */

function clearMap() {

    stationMarkers.forEach(
        marker => map.removeLayer(marker)
    );


    coverageCircles.forEach(
        circle => map.removeLayer(circle)
    );


    stationMarkers = [];

    coverageCircles = [];

}



/* =========================================
   LANCER UNE SIMULATION
========================================= */

function runSimulation() {

    const stations =
        parseInt(
            document.getElementById("stations").value
        );


    const radius =
        parseInt(
            document.getElementById("radius").value
        );


    generateStations(
        stations,
        radius
    );


    /*
     * Calcul simplifié de couverture.
     *
     * Dans une version avancée,
     * ce calcul sera remplacé par
     * un véritable modèle radio.
     */

    let coverage =
        45 +
        stations * 1.8 +
        radius / 100;


    if (coverage > 98) {

        coverage = 98;

    }


    coverage =
        Math.round(coverage);


    updateResults(coverage);


    document.getElementById(
        "stationCount"
    ).textContent = stations;


    /*
     * Message utilisateur
     */

    showNotification(
        "Simulation terminée avec succès."
    );

}



/* =========================================
   METTRE À JOUR LES RÉSULTATS
========================================= */

function updateResults(coverage) {

    document.getElementById(
        "coverageValue"
    ).textContent =
        coverage + "%";


    document.getElementById(
        "resultCoverage"
    ).textContent =
        coverage + "%";


    document.getElementById(
        "coverageProgress"
    ).style.width =
        coverage + "%";


    /*
     * Calcul simplifié de l'efficacité
     */

    const efficiency =
        Math.round(
            coverage * 0.9
        );


    document.getElementById(
        "efficiencyProgress"
    ).style.width =
        efficiency + "%";

}



/* =========================================
   SLIDER STATIONS
========================================= */

const stationsSlider =
    document.getElementById("stations");


stationsSlider.addEventListener(
    "input",
    function () {

        document.getElementById(
            "stationsDisplay"
        ).textContent =
            this.value;

    }
);



/* =========================================
   SLIDER PUISSANCE
========================================= */

const powerSlider =
    document.getElementById("power");


powerSlider.addEventListener(
    "input",
    function () {

        document.getElementById(
            "powerDisplay"
        ).textContent =
            this.value + " W";

    }
);



/* =========================================
   SLIDER RAYON
========================================= */

const radiusSlider =
    document.getElementById("radius");


radiusSlider.addEventListener(
    "input",
    function () {

        document.getElementById(
            "radiusDisplay"
        ).textContent =
            this.value + " m";

    }
);



/* =========================================
   NAVIGATION VERS SIMULATION
========================================= */

function scrollToSimulation() {

    document.getElementById(
        "simulation"
    ).scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================
   INFORMATIONS DU PROJET
========================================= */

function showProjectInfo() {

    alert(
        "5G Smart Planner\n\n" +

        "Plateforme de simulation et " +
        "d'optimisation des réseaux 5G.\n\n" +

        "Objectif : améliorer la couverture " +
        "tout en réduisant les coûts de déploiement."
    );

}



/* =========================================
   RECOMMANDATION
========================================= */

function generateRecommendation() {

    const recommendations = [

        "Zone Ain Diab : couverture insuffisante.",

        "Zone Maarif : forte densité d'utilisateurs.",

        "Zone Sidi Maarouf : ajout d'une Small Cell recommandé."

    ];


    let message =
        "Analyse terminée !\n\n";


    recommendations.forEach(
        (recommendation, index) => {

            message +=
                `${index + 1}. ${recommendation}\n`;

        }
    );


    alert(message);

}



/* =========================================
   NOTIFICATION
========================================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent =
        message;


    notification.style.position =
        "fixed";


    notification.style.bottom =
        "25px";


    notification.style.right =
        "25px";


    notification.style.padding =
        "15px 20px";


    notification.style.background =
        "#0f172a";


    notification.style.color =
        "white";


    notification.style.borderRadius =
        "10px";


    notification.style.zIndex =
        "9999";


    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.2)";


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.remove();

        },
        3000
    );

}



/* =========================================
   SIMULATION INITIALE
========================================= */

generateStations(
    10,
    500
);
