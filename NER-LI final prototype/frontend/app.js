const API_URL = "http://127.0.0.1:5000";



function showSection(sectionId) {

    // Hide all sections

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    // Show selected section

    const selected =
        document.getElementById(sectionId);

    if (selected) {

        selected.classList.remove("hidden");

    }


    // Update navigation

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    // Find clicked navigation button

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            const onclick =
                button.getAttribute("onclick");


            if (
                onclick &&
                onclick.includes(
                    `'${sectionId}'`
                )
            ) {

                button.classList.add("active");

            }

        });


    // Load map when selected

    if (sectionId === "map") {

        loadMap();

    }

}


async function analyzeRoute() {

    const rainfall =
        document.getElementById("rainfall").value;

    const road =
        document.getElementById("road").value;

    const landslide =
        document.getElementById("landslide").value;

    const traffic =
        document.getElementById("traffic").value;


    const response = await fetch(
         `${API_URL}/api/analyze`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                rainfall: rainfall,
                road_condition: road,
                landslide_history: landslide,
                traffic: traffic

            })
        }
    );


    const result = await response.json();


    let color = "#22c55e";

    if (result.risk >= 75) {
        color = "#ef4444";
    }
    else if (result.risk >= 50) {
        color = "#f59e0b";
    }


    document.getElementById("riskResult").innerHTML = `

        <h2 style="color:${color}">
            ${result.risk}% Risk
        </h2>

        <h3>
            ${result.level}
        </h3>

        <p style="margin-top:15px">
            Route disruption probability calculated
            from rainfall, road condition,
            landslide history and traffic.
        </p>

        ${
            result.risk >= 50
            ?
            `<button onclick="showAlternative()"
                     style="margin-top:20px">
                🛣️ Find Alternative Route
             </button>`
            :
            `<p style="color:#22c55e;margin-top:20px">
                ✓ Route currently appears safe.
             </p>`
        }

    `;
}


function showAlternative() {

    document.getElementById("riskResult")
        .innerHTML += `

        <div style="
            margin-top:25px;
            padding:20px;
            background:#052e16;
            border-radius:10px;
        ">

            <h3>🟢 Recommended Alternative</h3>

            <p style="margin-top:10px">
                Route B — Lower disruption risk
            </p>

            <p>
                Estimated travel time:
                <strong>6h 10m</strong>
            </p>

            <p>
                Risk:
                <strong style="color:#22c55e">
                    24%
                </strong>
            </p>

            <p style="margin-top:10px">
                Potential delay avoided:
                <strong>2h 20m</strong>
            </p>

        </div>

    `;
}


function submitReport() {

    const type =
        document.getElementById("incidentType").value;

    const severity =
        document.getElementById("severity").value;

    const description =
        document.getElementById("description").value;


    // ---------------------------------
    // SHOW INCIDENT
    // ---------------------------------

    document.getElementById("reportResult")
        .innerHTML = `

        <div class="alert-box"
             style="margin-top:20px">

            <h3>🚨 Incident Reported</h3>

            <p>
                <strong>Type:</strong>
                ${type}
            </p>

            <p>
                <strong>Severity:</strong>
                ${severity}
            </p>

            <p>
                <strong>Description:</strong>
                ${description}
            </p>

            <p>
                📍 Location captured
            </p>

            <p>
                🤖 AI is analyzing route impact...
            </p>

        </div>

    `;


    // ---------------------------------
    // AUTOMATIC RISK ANALYSIS
    // ---------------------------------

    let rainfall = 70;
    let road = 70;
    let landslide = 80;
    let traffic = 40;


    // Increase risk depending
    // on incident

    if (type === "Landslide") {

        landslide = 100;
        road = 90;

    }


    if (type === "Flood") {

        rainfall = 100;
        road = 85;

    }


    if (type === "Road Damage") {

        road = 100;

    }


    if (severity === "Critical") {

        landslide = Math.min(
            landslide + 10,
            100
        );

        road = Math.min(
            road + 10,
            100
        );

    }


    // ---------------------------------
    // SEND TO AI BACKEND
    // ---------------------------------

    fetch(
         `${API_URL}/api/analyze`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                rainfall: rainfall,

                road_condition: road,

                landslide_history:
                    landslide,

                traffic: traffic

            })
        }
    )
    .then(response => response.json())
    .then(result => {

        showIncidentRisk(result);

    })
    .catch(error => {

        console.error(
            "Risk analysis failed:",
            error
        );

    });

}


function showIncidentRisk(result) {

    const risk = result.risk;

    const level = result.level;


    let riskIcon = "🟢";

    if (risk >= 75) {

        riskIcon = "🔴";

    }
    else if (risk >= 50) {

        riskIcon = "🟠";

    }


    document.getElementById("reportResult")
        .innerHTML += `

        <div class="alert-box"
             style="margin-top:20px">

            <h3>
                ${riskIcon}
                AI Route Analysis
            </h3>

            <h2 style="margin-top:15px">
                Risk Score: ${risk}%
            </h2>

            <p style="margin-top:10px">
                Risk Level:
                <strong>${level}</strong>
            </p>


            ${
                risk >= 50
                ?
                `

                <div style="
                    margin-top:20px;
                    padding:20px;
                    background:#052e16;
                    border-radius:10px;
                ">

                    <h3>
                        🛣️ Alternative Route Recommended
                    </h3>

                    <p style="margin-top:10px">
                        Current route has a
                        high disruption probability.
                    </p>

                    <p>
                        Recommended Route:
                        <strong>
                            Route B
                        </strong>
                    </p>

                    <p>
                        New Risk:
                        <strong style="color:#22c55e">
                            24%
                        </strong>
                    </p>

                    <p>
                        Estimated delay avoided:
                        <strong>
                            2h 20m
                        </strong>
                    </p>

                    <button
                        onclick="rerouteVehicle()"
                        style="margin-top:15px">

                        🚚 Reroute Shipment

                    </button>

                </div>

                `
                :
                `

                <p style="
                    margin-top:20px;
                    color:#22c55e">

                    ✓ Current route remains
                    operational.

                </p>

                `
            }

        </div>

    `;

}


function rerouteVehicle() {

    document.getElementById("reportResult")
        .innerHTML += `

        <div
            style="
                margin-top:20px;
                padding:20px;
                background:#064e3b;
                border-radius:10px;
            "
        >

            <h3>
                ✅ Shipment Rerouted
            </h3>

            <p style="margin-top:10px">
                Vehicle:
                <strong>NER-102</strong>
            </p>

            <p>
                New Route:
                <strong>Route B</strong>
            </p>

            <p>
                Route Risk:
                <strong style="color:#22c55e">
                    24%
                </strong>
            </p>

            <p>
                Status:
                <strong>
                    🟢 SAFE
                </strong>
            </p>

        </div>

    `;

}


let mapLoaded = false;

let map;

let vehicleMarkers = [];


// ---------------------------------------
// LOAD MAP
// ---------------------------------------

async function loadMap() {

    if (mapLoaded) {
        return;
    }

    mapLoaded = true;


    // Create map

    map = L.map("mapContainer")
        .setView([26.8, 92.5], 6);


    // OpenStreetMap

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // Load routes

    loadRoutes();


    // Load vehicles

    await loadVehicles();

}


// ---------------------------------------
// LOAD ROUTES
// ---------------------------------------

async function loadRoutes() {

    try {

        const response = await fetch(
            `${API_URL}/api/routes`
        );

        const routes = await response.json();


        // Route 1

        L.polyline(
            [
                [26.1445, 91.7362],
                [27.5, 93.5]
            ],
            {
                color: "red",
                weight: 6
            }
        )
        .addTo(map)
        .bindPopup(
            "🔴 CRITICAL ROUTE<br>" +
            "Tezpur → Tawang<br>" +
            "Risk: 82%"
        );


        // Route 2

        L.polyline(
            [
                [26.1445, 91.7362],
                [25.5788, 91.8933]
            ],
            {
                color: "green",
                weight: 6
            }
        )
        .addTo(map)
        .bindPopup(
            "🟢 SAFE ROUTE<br>" +
            "Guwahati → Shillong<br>" +
            "Risk: 35%"
        );


        // Route 3

        L.polyline(
            [
                [26.1445, 91.7362],
                [27.2, 92.4],
                [27.5, 93.5]
            ],
            {
                color: "orange",
                weight: 5
            }
        )
        .addTo(map)
        .bindPopup(
            "🟡 ALTERNATIVE ROUTE<br>" +
            "Risk: 24%"
        );


    } catch (error) {

        console.error(
            "Could not load routes:",
            error
        );

    }

}


// ---------------------------------------
// LOAD VEHICLES
// ---------------------------------------

async function loadVehicles() {

    try {

        const response = await fetch(
            `${API_URL}/api/vehicles`
        );

        const vehicles = await response.json();


        vehicles.forEach(vehicle => {

            addVehicleMarker(vehicle);

        });

        startVehicleSimulation();


    } catch (error) {

        console.error(
            "Could not load vehicles:",
            error
        );

    }

}


// ---------------------------------------
// ADD VEHICLE
// ---------------------------------------

function addVehicleMarker(vehicle) {

    const marker = L.marker(
        [
            vehicle.latitude,
            vehicle.longitude
        ]
    )
    .addTo(map);


    marker.bindPopup(`

        <div>

            <h3>🚚 ${vehicle.id}</h3>

            <p>
                <strong>
                    ${vehicle.shipment}
                </strong>
            </p>

            <p>
                ${vehicle.source}
                →
                ${vehicle.destination}
            </p>

            <p>
                Speed:
                ${vehicle.speed} km/h
            </p>

            <p>
                Risk:
                ${vehicle.risk}%
            </p>

            <p>
                Status:
                ${vehicle.status}
            </p>

        </div>

    `);


    marker.on(
        "click",
        function() {

            showVehicleInfo(vehicle);

        }
    );


    vehicleMarkers.push(marker);

}


// ---------------------------------------
// VEHICLE INFORMATION
// ---------------------------------------

function showVehicleInfo(vehicle) {

    const statusClass =
        vehicle.risk >= 50
        ? "status-danger"
        : "status-safe";


    document.getElementById(
        "vehicleInfo"
    ).innerHTML = `

        <h3>
            🚚 ${vehicle.id}
        </h3>

        <p>
            Live shipment information
        </p>


        <div class="vehicle-details">


            <div class="vehicle-detail">

                <span>
                    Shipment
                </span>

                <strong>
                    ${vehicle.shipment}
                </strong>

            </div>


            <div class="vehicle-detail">

                <span>
                    Driver
                </span>

                <strong>
                    ${vehicle.driver}
                </strong>

            </div>


            <div class="vehicle-detail">

                <span>
                    Origin
                </span>

                <strong>
                    ${vehicle.source}
                </strong>

            </div>


            <div class="vehicle-detail">

                <span>
                    Destination
                </span>

                <strong>
                    ${vehicle.destination}
                </strong>

            </div>


            <div class="vehicle-detail">

                <span>
                    Speed
                </span>

                <strong>
                    ${vehicle.speed} km/h
                </strong>

            </div>


            <div class="vehicle-detail">

                <span>
                    Route Risk
                </span>

                <strong class="${statusClass}">
                    ${vehicle.risk}%
                </strong>

            </div>


        </div>

    `;

}

function startVehicleSimulation() {

    if (vehicleMarkers.length === 0) {
        return;
    }


    // ---------------------------------
    // VEHICLE 1 - NER-102
    // ---------------------------------

    let lat1 = 26.1445;
    let lng1 = 91.7362;


    // ---------------------------------
    // VEHICLE 2 - NER-205
    // ---------------------------------

    let lat2 = 25.5788;
    let lng2 = 91.8933;


    // ---------------------------------
    // MOVE VEHICLE 1
    // ---------------------------------

    setInterval(() => {

        lat1 += 0.002;
        lng1 += 0.003;

        vehicleMarkers[0].setLatLng([
            lat1,
            lng1
        ]);

    }, 2000);


    // ---------------------------------
    // MOVE VEHICLE 2
    // ---------------------------------

    setInterval(() => {

        lat2 += 0.002;
        lng2 += 0.002;

        vehicleMarkers[1].setLatLng([
            lat2,
            lng2
        ]);

    }, 2000);

}