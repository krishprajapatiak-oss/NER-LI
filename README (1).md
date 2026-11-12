# NERLI – AI-Powered Smart Logistics Accessibility Intelligence Platform

> **Smart India Hackathon (SIH) Prototype**  
> An intelligent logistics and route-accessibility platform designed to support transportation planning across the North Eastern Region (NER) of India.

## Overview

The North Eastern Region of India faces logistics challenges caused by difficult terrain, extreme weather, limited transport connectivity, and road disruptions such as landslides and floods. These conditions can delay the movement of essential supplies, increase transportation costs, and affect communities in remote locations.

**NERLI** aims to improve logistics visibility and decision-making by bringing shipment information, vehicle movement, route conditions, and risk indicators into a unified web-based platform. It is designed to help logistics teams identify potential disruptions earlier and make better-informed transportation decisions.

## Key Objectives

- Improve visibility into vehicle and shipment movement.
- Present route and accessibility information in an easy-to-understand dashboard.
- Highlight potentially high-risk journeys for closer attention.
- Support logistics planning for essential goods such as medicines and food supplies.
- Provide a foundation for integrating weather information, field reports, GIS data, and predictive analytics.

## Features

The prototype is organized around the following capabilities:

- **Logistics dashboard:** A central interface for viewing available shipment and vehicle information.
- **Vehicle and shipment monitoring:** Display key journey details such as vehicle/shipment ID, driver, origin, destination, shipment type, location, speed, and status where available.
- **Risk visibility:** Show risk indicators to help users identify journeys that may need attention.
- **Route analysis interface:** Provide a place to review route-related conditions and risk inputs.
- **Responsive web interface:** HTML, CSS, and JavaScript frontend.
- **Backend API foundation:** Flask-based Python backend with CORS support.

> **Prototype note:** The project is a hackathon prototype. The availability and accuracy of live vehicle tracking, external weather feeds, GIS services, automated alerts, and predictive models depend on the integrations and data sources configured in the running deployment. Do not interpret sample dashboard values as verified live data.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Cross-origin API support | Flask-CORS |
| Deployment server dependency | Gunicorn |
| Data / analytics foundation | Python modules prepared in the backend |

## Project Structure

```text
SIH Final Prototype/
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── risk_engine.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── index.txt
├── assets/
├── screenshots/
└── README.md
```

*Some folders or files may be optional or may be expanded as development continues.*

## Getting Started

### 1. Prerequisites

Install the following before running the project:

- Python 3.9 or later
- pip (Python package installer)
- A modern web browser
- Visual Studio Code (recommended)

### 2. Download the project

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Or download the project ZIP and extract it.

Open the project folder in Visual Studio Code.

### 3. Set up the backend

Open a terminal and move into the backend directory:

```bash
cd backend
```

Create and activate a virtual environment.

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 4. Start the backend

From inside the `backend` directory, run:

```bash
python app.py
```

The Flask server should start if the application is configured to run directly. Check the terminal for the local address and port.

### 5. Open the frontend

Open `frontend/index.html` in your browser.

If the frontend uses API requests to the Flask backend, make sure the backend is running and that the API base URL configured in `frontend/app.js` matches the backend address.

> If the project is deployed, configure the frontend API URL to point to the deployed backend rather than `localhost`.

## Example Logistics Data

The prototype has been developed around logistics records containing information such as:

| Field | Description |
|---|---|
| Vehicle / shipment ID | Unique identifier for a journey or shipment |
| Driver | Assigned driver |
| Source | Shipment origin |
| Destination | Shipment destination |
| Shipment type | For example, medical or food supplies |
| Latitude / longitude | Vehicle or reported location |
| Risk score | Risk indicator used by the interface |
| Status | Journey state, such as moving or at risk |
| Speed | Reported vehicle speed, where available |

Use verified operational data when evaluating the platform. Example or manually entered records are suitable for demonstrations but should not be presented as live fleet data.

## How It Works – High-Level Flow

```text
Vehicle / Shipment / Route Information
                  |
                  v
          Backend (Flask API)
                  |
                  v
       Data Processing & Risk Logic
                  |
                  v
       Frontend Dashboard (HTML/CSS/JS)
                  |
                  v
       Logistics Visibility & Decisions
```

The architecture can be extended to receive data from external weather services, GIS and mapping platforms, road-condition reports, and field-level updates. Risk analysis can then use those inputs to help identify potentially disrupted routes.

## Potential Future Enhancements

- Integrate a verified weather API for rainfall and severe-weather information.
- Add GIS-based route visualization and road-condition layers.
- Incorporate verified landslide, flood, and road-closure reports.
- Develop and validate a predictive risk model using historical and real-time data.
- Add role-based access for administrators, operators, and field users.
- Introduce automated notifications for high-risk routes and shipment delays.
- Connect GPS or vehicle telematics devices for live fleet tracking.
- Add database persistence, audit logs, and analytics reports.

These are proposed enhancements unless the relevant integration is already configured in the deployed version.

## Social and Operational Impact

NERLI is intended to contribute to:

- **Essential-supply accessibility:** Better-informed movement of medicines, food, and other critical goods.
- **Operational efficiency:** Earlier visibility of possible disruptions can support route and fleet decisions.
- **Remote-area connectivity:** A platform concept focused on the logistics challenges of geographically difficult regions.
- **Preparedness:** Combining weather, route, and field information can help logistics teams prepare for disruptions.

## Limitations

- Dashboard accuracy depends on the quality, freshness, and availability of its input data.
- Sample or manually entered data does not represent confirmed live tracking.
- Risk indicators should be validated against real-world incidents before operational use.
- External APIs may require credentials, network access, usage limits, and configuration.
- The prototype should not be used as the sole basis for emergency or safety-critical routing decisions.

## Team and Contributors

**Project:** NERLI – AI-Powered Smart Logistics Accessibility Intelligence Platform  
**Event:** Smart India Hackathon (SIH)

Add your team name, member names, institution, and mentor details here.

## Acknowledgements

This project is developed as a prototype to explore how technology, data integration, and intelligent logistics planning can help address transportation and accessibility challenges in the North Eastern Region of India.

## License

No license has been specified yet. If you plan to make this repository public for reuse, add an appropriate open-source license (for example, MIT) after confirming that all project assets and dependencies can be distributed under it.
