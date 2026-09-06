from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# ---------------------------------------
# HOME
# ---------------------------------------


@app.route("/")
def home():
    return jsonify({"message": "NER Logistics Intelligence API is running"})


# ---------------------------------------
# ROUTES
# ---------------------------------------


@app.route("/api/routes")
def routes():

    data = [
        {"id": 1, "name": "Guwahati - Tezpur", "risk": 25, "status": "SAFE"},
        {"id": 2, "name": "Tezpur - Tawang", "risk": 82, "status": "CRITICAL"},
        {"id": 3, "name": "Guwahati - Shillong", "risk": 40, "status": "MODERATE"},
    ]

    return jsonify(data)


# ---------------------------------------
# VEHICLES
# ---------------------------------------


@app.route("/api/vehicles")
def vehicles():

    data = [
        {
            "id": "NER-102",
            "driver": "Raj",
            "shipment": "Medical Supplies",
            "source": "Guwahati",
            "destination": "Tawang",
            "latitude": 26.1445,
            "longitude": 91.7362,
            "speed": 42,
            "risk": 82,
            "status": "AT RISK",
        },
        {
            "id": "NER-205",
            "driver": "Amit",
            "shipment": "Food Supplies",
            "source": "Shillong",
            "destination": "Tezpur",
            "latitude": 25.5788,
            "longitude": 91.8933,
            "speed": 55,
            "risk": 35,
            "status": "MOVING",
        },
    ]

    return jsonify(data)


# ---------------------------------------
# RISK ANALYSIS
# ---------------------------------------


@app.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.json

    rainfall = float(data.get("rainfall", 0))
    road = float(data.get("road_condition", 0))
    landslide = float(data.get("landslide_history", 0))
    traffic = float(data.get("traffic", 0))

    risk = rainfall * 0.35 + road * 0.25 + landslide * 0.25 + traffic * 0.15

    risk = round(risk, 2)

    if risk >= 75:
        level = "CRITICAL"

    elif risk >= 50:
        level = "HIGH"

    elif risk >= 30:
        level = "MODERATE"

    else:
        level = "LOW"

    return jsonify({"risk": risk, "level": level})


# ---------------------------------------
# INCIDENT REPORT
# ---------------------------------------


@app.route("/api/report", methods=["POST"])
def report():

    data = request.json

    return jsonify(
        {"success": True, "message": "Incident successfully reported", "incident": data}
    )


# ---------------------------------------
# START SERVER
# ---------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
