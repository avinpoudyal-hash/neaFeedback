from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import upload_to_db

print("started")
app = Flask(__name__)
CORS(app)

@app.route("/save", methods=["GET"])

def save():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    print("Username:", username)
    print("Password:", password)
    with open("mid.json", "w") as f:
        json.dump(data, f)
    upload_to_db.upload()
    return jsonify({"status": "ok"})

app.run(port=5000)
print("Everything success")
