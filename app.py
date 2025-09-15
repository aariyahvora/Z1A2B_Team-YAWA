from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

MODEL_NAME = "llama2"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please type something!"})

    try:
        # Prepare the full prompt
        prompt = f"You are ChefBot, a friendly healthy recipe assistant. Suggest a healthy recipe using these ingredients: {user_message}."

        # Run Ollama2 and send prompt via stdin
        process = subprocess.Popen(
            ["ollama", "run", MODEL_NAME],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        stdout, stderr = process.communicate(input=prompt, timeout=30)

        reply = stdout.strip() or stderr.strip() or "⚠️ Could not generate a recipe."
        return jsonify({"reply": reply})

    except subprocess.TimeoutExpired:
        return jsonify({"reply": "⚠️ Ollama took too long to respond."}), 500
    except Exception as e:
        return jsonify({"reply": f"⚠️ Error running Ollama2: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
