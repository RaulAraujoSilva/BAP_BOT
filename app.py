from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_condominio import ChatBotCondominio
import json
from datetime import datetime
import uuid
import os

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

@app.route('/api/history/<session_id>', methods=['GET'])
def get_history(session_id):
    """Endpoint para recuperar histórico de uma sessão"""
    try:
        if session_id in chat_sessions:
            return jsonify({
                'history': chat_sessions[session_id]['history'],
                'session_id': session_id,
                'status': 'success'
            })
        else:
            return jsonify({
                'error': 'Sessão não encontrada',
                'session_id': session_id
            }), 404
            
    except Exception as e:
        print(f"Erro ao recuperar histórico: {e}")
        return jsonify({
            'error': 'Erro interno do servidor',
            'session_id': session_id
        }), 500

@app.route('/api/new_session', methods=['POST'])
def new_session():
    """Endpoint para criar nova sessão"""
    try:
        new_session_id = str(uuid.uuid4())
        return jsonify({
            'session_id': new_session_id,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Erro ao criar nova sessão: {e}")
        return jsonify({
            'error': 'Erro interno do servidor'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificação de saúde da aplicação"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'active_sessions': len(chat_sessions)
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    
    print("🚀 Iniciando servidor do BapGPT Condomínios...")
    print(f"📱 Interface disponível na porta: {port}")
    print("🔗 API disponível em: /api/")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug_mode
    ) 