// Variáveis globais
let sessionId = '';
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
const infoOverlay = document.getElementById('infoOverlay');
const infoPanel = document.getElementById('infoPanel');

// Estado da conversa
let isWaitingForResponse = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    generateSessionId();
    setupEventListeners();
    updateCharCounter();
    updateMessageCount();
    
    // Foca no input
    messageInput.focus();
});

// Configurar event listeners
function setupEventListeners() {
    // Input de mensagem
    messageInput.addEventListener('input', function() {
        updateCharCounter();
        updateSendButton();
        autoResize();
    });
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                sendMessage();
            }
        }
    });

    // Contador de caracteres
    messageInput.addEventListener('input', updateCharCounter);

    // Botão enviar
    sendButton.addEventListener('click', sendMessage);
}

// Gerar ID da sessão
function generateSessionId() {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    document.getElementById('sessionId').textContent = sessionId;
}

// Atualizar contador de caracteres
function updateCharCounter() {
    const currentLength = messageInput.value.length;
    charCount.textContent = currentLength;
    
    // Adicionar classe de aviso se próximo do limite
    if (currentLength > 900) {
        charCount.style.color = '#ef4444';
    } else if (currentLength > 800) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = '#a0aec0';
    }
}

// Atualizar botão de envio
function updateSendButton() {
    const hasContent = messageInput.value.trim().length > 0;
    sendButton.disabled = !hasContent || isWaitingForResponse;
}

// Auto-redimensionar textarea
function autoResize() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

// Enviar mensagem
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || isWaitingForResponse) return;

    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    
    // Limpar input
    messageInput.value = '';
    updateCharCounter();
    updateSendButton();
    autoResize();
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Definir estado de espera
    isWaitingForResponse = true;
    updateSendButton();

    try {
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Ocultar indicador de digitação
        hideTypingIndicator();
        
        // Adicionar resposta do bot
        if (data.response) {
            addMessage(data.response, 'bot');
        } else {
            addMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        }

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        hideTypingIndicator();
        addMessage('Desculpe, ocorreu um erro de conexão. Tente novamente.', 'bot');
    } finally {
        isWaitingForResponse = false;
        updateSendButton();
        messageInput.focus();
    }
}

// Adicionar mensagem ao chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatarImg = type === 'user' ? 
        '/static/assets/Usuário.png' : 
        '/static/assets/robo_bap.jpeg';
    
    messageDiv.innerHTML = `
        <div class="avatar">
            <img src="${avatarImg}" alt="${type === 'user' ? 'Usuário' : 'BapGPT'}">
        </div>
        <div class="message-content">
            ${content}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Incrementar contador de mensagens
    messageCount++;
    updateMessageCount();
}

// Mostrar indicador de digitação
function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    scrollToBottom();
}

// Ocultar indicador de digitação
function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

// Rolar para o final
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Atualizar contador de mensagens
function updateMessageCount() {
    const messageCountElement = document.getElementById('messageCount');
    if (messageCountElement) {
        messageCountElement.textContent = messageCount;
    }
}

// Nova conversa
function newConversation() {
    // Confirmar ação
    if (messageCount > 0) {
        if (!confirm('Tem certeza que deseja iniciar uma nova conversa? Todas as mensagens atuais serão perdidas.')) {
            return;
        }
    }
    
    // Limpar mensagens
    chatMessages.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-card">
                <div class="welcome-icon">
                    <img src="/static/assets/robo_bap.jpeg" alt="BapGPT Logo">
                </div>
                <h3>Olá! 👋 Sou o BapGPT, seu assistente especializado em administração condominial!</h3>
                <p>Baseado no Manual do Síndico da ABADI, posso ajudar com:</p>
                <ul>
                    <li>🏢 Gestão condominial - estrutura, convenções, regimentos</li>
                    <li>👥 Gestão de pessoas - contratação, direitos trabalhistas</li>
                    <li>💰 Finanças - orçamentos, cotas, prestação de contas</li>
                    <li>🔧 Manutenção - obras, autovistorias, reparos</li>
                    <li>🗳️ Assembleias - convocação, votação, conflitos</li>
                    <li>⚖️ Questões legais - legislação, seguros, compliance</li>
                </ul>
                <p><strong>Como posso ajudá-lo hoje com sua administração condominial?</strong></p>
            </div>
        </div>
    `;
    
    // Resetar contadores
    messageCount = 0;
    updateMessageCount();
    
    // Gerar nova sessão
    generateSessionId();
    
    // Focar no input
    messageInput.focus();
    
    // Fechar painel de informações se estiver aberto
    hideInfo();
    
    console.log('Nova conversa iniciada');
}

// Mostrar/ocultar painel de informações
function toggleInfo() {
    const isVisible = infoOverlay.classList.contains('show');
    
    if (isVisible) {
        hideInfo();
    } else {
        showInfo();
    }
}

// Mostrar painel de informações
function showInfo() {
    infoOverlay.classList.add('show');
    
    // Atualizar informações dinâmicas
    updateInfoPanel();
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

// Ocultar painel de informações
function hideInfo() {
    infoOverlay.classList.remove('show');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Atualizar informações do painel
function updateInfoPanel() {
    // Atualizar sessão
    document.getElementById('sessionId').textContent = sessionId;
    
    // Atualizar contador de mensagens
    updateMessageCount();
    
    // Atualizar status (sempre online neste contexto)
    const statusElement = document.querySelector('.status-indicator.online');
    if (statusElement) {
        statusElement.textContent = 'Conectado';
    }
}

// A funcionalidade de fechar clicando fora agora está implementada no HTML

// Utilitários de formatação
function formatText(text) {
    // Converter quebras de linha em <br>
    text = text.replace(/\n/g, '<br>');
    
    // Converter URLs em links (básico)
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    
    return text;
}

// Função para detectar erros de conexão
function handleConnectionError() {
    addMessage(
        'Parece que houve um problema de conexão. Verifique sua internet e tente novamente.',
        'bot'
    );
}

// Função para validar entrada
function validateInput(message) {
    if (message.length > 1000) {
        alert('Mensagem muito longa. O limite é de 1000 caracteres.');
        return false;
    }
    
    return true;
}

// Debug: log de eventos importantes
function logEvent(event, data = {}) {
    console.log(`[BapGPT] ${event}:`, data);
}

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