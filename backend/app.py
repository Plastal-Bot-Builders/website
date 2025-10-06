# backend/app.py
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from dotenv import load_dotenv
from ollama import Client

load_dotenv()

app = Flask(__name__)
CORS(app)

OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "https://ollama.com")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gpt-oss:120b")  # Your custom model name

client = Client(
    host=OLLAMA_HOST,
    headers={'Authorization': f'Bearer {OLLAMA_API_KEY}'}
)

SYSTEM_PROMPT = """You are PlastalBot, an AI assistant for a robotics education organization in Zambia.
Your goal is to help users learn about robotics workshops, STEM education,
and sustainability projects. Be friendly, informative, and concise.
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ]

        # Get response from Ollama custom model
        response_text = ""
        for part in client.chat(OLLAMA_MODEL, messages=messages, stream=False):
            response_text += part['message']['content']

        return jsonify({"response": response_text})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)