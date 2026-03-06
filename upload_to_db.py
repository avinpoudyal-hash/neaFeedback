import json
import sqlite3
from flask import jsonify

def upload():
    # Read JSON file
    with open("mid.json", "r") as f:
        data = json.load(f)

    username = data["username"]
    password = data["password"]

    # Connect to SQLite database
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # Create table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    """)

    # Insert data
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )
    conn.commit()
    conn.close()


def login():
    with open("mid.json", "r") as f:
        dataLog = json.load(f)

    username2 = dataLog["username"]
    password2 = dataLog["password"]

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT username FROM users WHERE username=? AND password=?",
        (username2, password2)
    )
    if not cursor.fetchone():
        temp = False
        dataTF = [{"TrueFalse": False}]
        with open("mid.json", "w") as f:
            json.dump(dataTF, f)
        return temp
    else:
        conn.close()
        temp = True
        dataTF = [{"TrueFalse": True}]
        with open("mid.json", "w") as f:
            json.dump(dataTF, f)
        return temp