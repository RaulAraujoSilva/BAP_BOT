from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_condominio import ChatBotCondominio
import json
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# Dicionário para armazenar sessões de chat
chat_sessions = {}

@app.route('/')
def index():
    """Página principal com a interface do chatbot"""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Endpoint para processar mensagens do chat"""
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        if not message:
            return jsonify({
                'error': 'Mensagem não pode estar vazia',
                'session_id': session_id
            }), 400
        
        # Cria ou recupera a sessão do chatbot
        if session_id not in chat_sessions:
            chat_sessions[session_id] = {
                'chatbot': ChatBotCondominio(),
                'history': []
            }
        
        session = chat_sessions[session_id]
        chatbot = session['chatbot']
        
        # Processa a mensagem
        response = chatbot.enviar_mensagem(message)
        
        # Adiciona ao histórico
        timestamp = datetime.now().strftime('%H:%M')
        session['history'].append({
            'type': 'user',
            'message': message,
            'timestamp': timestamp
        })
        session['history'].append({
            'type': 'bot',
            'message': response,
            'timestamp': timestamp
        })
        
        return jsonify({
            'response': response,
            'session_id': session_id,
            'timestamp': timestamp,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Erro no chat: {e}")
        return jsonify({
            'error': 'Erro interno do servidor. Tente novamente.',
            'session_id': session_id if 'session_id' in locals() else str(uuid.uuid4())
        }), 500

@app.route('/api/history/<session_id>')
def get_history(session_id):
    """Recupera o histórico de uma sessão"""
    if session_id in chat_sessions:
        return jsonify({
            'history': chat_sessions[session_id]['history'],
            'status': 'success'
        })
    else:
        return jsonify({
            'history': [],
            'status': 'session_not_found'
        })

@app.route('/api/new_session', methods=['POST'])
def new_session():
    """Cria uma nova sessão de chat"""
    session_id = str(uuid.uuid4())
    return jsonify({
        'session_id': session_id,
        'message': 'Nova sessão criada com sucesso!',
        'status': 'success'
    })

@app.route('/health')
def health():
    """Endpoint de verificação de saúde da aplicação"""
    return jsonify({
        'status': 'healthy',
        'message': 'ChatBot Condomínio está funcionando!',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Iniciando servidor do ChatBot Condomínio...")
    print("📱 Interface disponível em: http://localhost:5000")
    print("🔗 API disponível em: http://localhost:5000/api/")
    app.run(debug=True, host='0.0.0.0', port=5000) 