// Variáveis globais
let sessionId = null;
let messageCount = 0;
let isTyping = false;

// Elementos DOM
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const charCount = document.getElementById('charCount');
const sessionIdDisplay = document.getElementById('sessionId');
const messageCountDisplay = document.getElementById('messageCount');
const infoPanel = document.getElementById('infoPanel');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
});

// Configura os event listeners
function setupEventListeners() {
    // Input de mensagem
    messageInput.addEventListener('input', function() {
        updateCharCounter();
        updateSendButton();
        autoResize(this);
    });

    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Botão enviar
    sendButton.addEventListener('click', sendMessage);

    // Auto-resize do textarea
    messageInput.addEventListener('input', function() {
        autoResize(this);
    });
}

// Inicializa o chat
function initializeChat() {
    generateSessionId();
    updateSessionDisplay();
    updateMessageCount();
    updateSendButton();
    messageInput.focus();
}

// Gera um novo session ID
function generateSessionId() {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Atualiza o display da sessão
function updateSessionDisplay() {
    if (sessionIdDisplay) {
        sessionIdDisplay.textContent = sessionId ? sessionId.substring(0, 20) + '...' : 'Carregando...';
    }
}

// Atualiza contador de mensagens
function updateMessageCount() {
    if (messageCountDisplay) {
        messageCountDisplay.textContent = messageCount;
    }
}

// Atualiza contador de caracteres
function updateCharCounter() {
    const length = messageInput.value.length;
    charCount.textContent = length;
    charCount.style.color = length > 900 ? '#f44336' : '#999';
}

// Atualiza estado do botão enviar
function updateSendButton() {
    const message = messageInput.value.trim();
    sendButton.disabled = !message || isTyping;
}

// Auto-resize do textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

// Envia mensagem
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message || isTyping) return;

    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    
    // Limpa input
    messageInput.value = '';
    updateCharCounter();
    updateSendButton();
    autoResize(messageInput);

    // Mostra indicador de digitação
    showTypingIndicator();

    try {
        // Faz requisição para a API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                session_id: sessionId
            })
        });

        const data = await response.json();

        // Remove indicador de digitação
        hideTypingIndicator();

        if (response.ok) {
            // Adiciona resposta do bot
            addMessage(data.response, 'bot', data.timestamp);
            sessionId = data.session_id;
            updateSessionDisplay();
        } else {
            // Mostra erro
            addMessage(
                data.error || 'Desculpe, ocorreu um erro. Tente novamente.',
                'bot',
                getCurrentTime(),
                true
            );
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        hideTypingIndicator();
        addMessage(
            'Erro de conexão. Verifique sua internet e tente novamente.',
            'bot',
            getCurrentTime(),
            true
        );
    }

    // Foca no input novamente
    messageInput.focus();
}

// Adiciona mensagem ao chat
function addMessage(text, type, timestamp = null, isError = false) {
    // Remove mensagem de boas-vindas se for a primeira mensagem
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage && type === 'user') {
        welcomeMessage.style.display = 'none';
    }

    // Cria elemento da mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    // Avatar
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    // Conteúdo da mensagem
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    if (isError) {
        messageContent.style.background = '#ffebee';
        messageContent.style.borderLeft = '3px solid #f44336';
    }

    // Texto da mensagem
    const messageText = document.createElement('div');
    messageText.innerHTML = formatMessage(text);

    // Timestamp
    const messageTimestamp = document.createElement('div');
    messageTimestamp.className = 'message-timestamp';
    messageTimestamp.textContent = timestamp || getCurrentTime();

    // Monta a estrutura
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTimestamp);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);

    // Adiciona ao chat
    chatMessages.appendChild(messageDiv);

    // Scroll para baixo
    scrollToBottom();

    // Atualiza contador
    messageCount++;
    updateMessageCount();
}

// Formata mensagem (quebras de linha, etc.)
function formatMessage(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Obtém hora atual
function getCurrentTime() {
    return new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Mostra indicador de digitação
function showTypingIndicator() {
    isTyping = true;
    typingIndicator.style.display = 'block';
    updateSendButton();
    scrollToBottom();
}

// Esconde indicador de digitação
function hideTypingIndicator() {
    isTyping = false;
    typingIndicator.style.display = 'none';
    updateSendButton();
}

// Scroll para baixo suave
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Nova conversa
function newConversation() {
    if (confirm('Deseja iniciar uma nova conversa? O histórico atual será perdido.')) {
        // Limpa mensagens
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-card">
                    <div class="welcome-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Bem-vindo ao BAP Bot Condomínios! 🏢</h3>
                    <p>Estou aqui para ajudar com suas dúvidas sobre:</p>
                    <ul>
                        <li>📋 Regulamentos e normas</li>
                        <li>🏊 Horários das áreas comuns</li>
                        <li>🎉 Reserva de espaços</li>
                        <li>🐕 Políticas sobre pets</li>
                        <li>📞 Contatos importantes</li>
                    </ul>
                    <p>Digite sua pergunta abaixo para começar!</p>
                </div>
            </div>
        `;

        // Reset variáveis
        generateSessionId();
        messageCount = 0;
        updateSessionDisplay();
        updateMessageCount();
        messageInput.focus();

        // Feedback visual
        showNotification('Nova conversa iniciada! 🔄');
    }
}

// Toggle painel de informações
function toggleInfo() {
    const isVisible = infoPanel.style.display === 'block';
    infoPanel.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        updateSessionDisplay();
        updateMessageCount();
    }
}

// Mostra notificação
function showNotification(message) {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;

    // Adiciona ao DOM
    document.body.appendChild(notification);

    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adiciona estilos para as animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Verificação de conexão
async function checkConnection() {
    try {
        const response = await fetch('/health');
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Verifica conexão periodicamente
setInterval(async () => {
    const isConnected = await checkConnection();
    const statusElement = document.querySelector('.status-indicator');
    
    if (statusElement) {
        if (isConnected) {
            statusElement.className = 'status-indicator online';
            statusElement.textContent = 'Conectado';
        } else {
            statusElement.className = 'status-indicator offline';
            statusElement.textContent = 'Desconectado';
            statusElement.style.background = '#ffebee';
            statusElement.style.color = '#c62828';
        }
    }
}, 30000); // Verifica a cada 30 segundos 