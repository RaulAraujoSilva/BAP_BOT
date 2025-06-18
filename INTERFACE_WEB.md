# 🌐 Interface Web - ChatBot Condomínio

## 📱 Visão Geral

A interface web foi desenvolvida com **estilo WhatsApp moderno**, oferecendo uma experiência intuitiva e familiar para os usuários do condomínio.

## 🚀 Como Executar

1. **Configure as credenciais** (veja README.md)
2. **Instale dependências:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Execute o servidor:**
   ```bash
   python app.py
   ```
4. **Acesse no navegador:** http://localhost:5000

## 🎨 Características da Interface

### 📋 Layout Principal
- **Header verde** - Estilo WhatsApp com avatar e status
- **Área de mensagens** - Scroll automático com fundo sutil
- **Campo de entrada** - Auto-resize com contador de caracteres
- **Botões de ação** - Nova conversa e informações

### 💬 Sistema de Mensagens

#### 👤 Mensagens do Usuário
- **Cor:** Verde claro (como WhatsApp)
- **Posição:** Lado direito
- **Avatar:** Ícone de usuário azul

#### 🤖 Mensagens do Assistente
- **Cor:** Branco com sombra
- **Posição:** Lado esquerdo  
- **Avatar:** Ícone de robô verde

#### ⏰ Funcionalidades Especiais
- **Timestamps** em cada mensagem
- **Indicador de digitação** animado
- **Formatação** de texto (negrito, itálico)
- **Quebras de linha** automáticas

## 🔧 Tecnologias Utilizadas

### Backend (Flask)
- **Flask** - Servidor web
- **Flask-CORS** - Política de CORS
- **OpenAI Python** - Integração com assistente
- **UUID** - Geração de IDs únicos

### Frontend (HTML/CSS/JS)
- **HTML5** - Estrutura semântica
- **CSS3** - Gradientes e animações
- **JavaScript (ES6+)** - Funcionalidades interativas
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia Roboto

## 📡 API Endpoints

### `POST /api/chat`
Processa mensagens do chat
```json
{
  "message": "string",
  "session_id": "string"
}
```

### `GET /api/history/<session_id>`
Recupera histórico da sessão

### `POST /api/new_session`
Cria nova sessão de chat

### `GET /health`
Verifica status do servidor

## 🎯 Funcionalidades Implementadas

### ✅ Gerenciamento de Sessões
- ID único por conversa
- Histórico mantido por sessão
- Possibilidade de múltiplas sessões

### ✅ Interface Responsiva
- Adaptável a diferentes telas
- Mobile-friendly
- Animações suaves

### ✅ Experiência do Usuário
- **Enter** para enviar mensagem
- **Shift+Enter** para quebra de linha
- Contador de caracteres (limite: 1000)
- Botão enviar desabilitado quando vazio
- Auto-resize do campo de input

### ✅ Indicadores Visuais
- Status de conexão (online/offline)
- Indicador de digitação animado
- Notificações toast
- Scroll automático para mensagens

### ✅ Tratamento de Erros
- Mensagens de erro destacadas
- Recuperação automática de conexão
- Validação de entrada

## 🔄 Fluxo de Funcionamento

1. **Usuário acessa** a interface
2. **Sistema gera** session ID único  
3. **Usuário digita** mensagem
4. **Frontend envia** para API Flask
5. **Flask processa** via ChatBot OpenAI
6. **Resposta retorna** para interface
7. **Mensagem aparece** em tempo real
8. **Histórico é mantido** durante a sessão

## 🎨 Paleta de Cores

- **Verde Principal:** `#128C7E` (header, botões)
- **Verde Claro:** `#DCF8C6` (mensagens usuário)
- **Azul:** `#34B7F1` (avatar usuário)
- **Branco:** `#FFFFFF` (mensagens bot)
- **Cinza:** `#F5F5F5` (fundo)

## 📱 Compatibilidade

### ✅ Navegadores Suportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### ✅ Dispositivos
- Desktop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🛠️ Personalização

### Modificar Cores
Edite o arquivo `static/style.css`:
```css
/* Alterar cor principal */
.chat-header {
    background: linear-gradient(135deg, #SUA_COR 0%, #SUA_COR_ESCURA 100%);
}
```

### Ajustar Layout
Modifique `static/style.css` para alterar:
- Largura do chat container
- Altura das mensagens
- Espaçamento entre elementos

### Personalizar Mensagens
No arquivo `templates/index.html`, modifique:
- Mensagem de boas-vindas
- Título do chat
- Informações exibidas

## 🔍 Debug e Logs

### Console do Navegador
- Mensagens de erro JavaScript
- Requisições de rede
- Estados da aplicação

### Logs do Servidor
- Erros do Flask
- Requisições recebidas
- Status das respostas

## 📈 Próximas Melhorias

- [ ] Persistência em banco de dados
- [ ] Autenticação de usuários
- [ ] Histórico de múltiplas sessões
- [ ] Upload de arquivos
- [ ] Notificações push
- [ ] Tema escuro/claro
- [ ] Tradução de idiomas

---

🎉 **Interface Web pronta para uso!** 

Acesse http://localhost:5000 e comece a interagir com o assistente do condomínio. 