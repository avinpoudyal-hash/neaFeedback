from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import upload_to_db

print("started")
app = Flask(__name__)
CORS(app)

@app.route("/save", methods=["POST"])

def save():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    with open("mid.json", "w") as f:
        json.dump(data, f)
    upload_to_db.upload()
    return jsonify({"status": "ok"})

@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    with open("mid.json", "w") as f:
        json.dump(data, f)
    result = upload_to_db.login() 
    return jsonify(result)

app.run(port=5000)
print("Everything success")
