from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

BLYNK_AUTH = "YOUR_BLYNK_AUTH_TOKEN"  # Replace with your Blynk Auth Token
BLYNK_URL = f"https://blynk.cloud/external/api/get"

def get_blynk_data(pin):
    try:
        response = requests.get(f"{BLYNK_URL}/{pin}?token={BLYNK_AUTH}")
        return response.text.strip()
    except:
        return "N/A"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    return jsonify({
        "temperature": get_blynk_data("v1"),
        "humidity": get_blynk_data("v2"),
        "moisture": get_blynk_data("v3"),
        "airQuality": get_blynk_data("v4"),
        "battery": get_blynk_data("v5"),
        "isOnline": get_blynk_data("isHardwareConnected") == "true"
    })

if __name__ == "__main__":
    app.run(debug=True)
