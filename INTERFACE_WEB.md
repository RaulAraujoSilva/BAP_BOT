# 🌐 Interface Web - BapGPT Condomínios

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
- **Header com gradiente** - Estilo moderno com logo BapGPT
- **Área de mensagens** - Scroll automático com fundo sutil
- **Campo de entrada** - Auto-resize com contador de caracteres
- **Botões personalizados** - Ícones customizados para ações

### 💬 Sistema de Mensagens

#### 👤 Mensagens do Usuário
- **Cor:** Verde claro (como WhatsApp)
- **Posição:** Lado direito
- **Avatar:** Imagem personalizada do usuário

#### 🤖 Mensagens do Assistente
- **Cor:** Branco com sombra
- **Posição:** Lado esquerdo  
- **Avatar:** Logo BapGPT

#### ⏰ Funcionalidades Especiais
- **Timestamps** em cada mensagem
- **Indicador de digitação** animado
- **Formatação** de texto (negrito, itálico)
- **Quebras de linha** automáticas
- **Avatares personalizados** com imagens específicas

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
- **Font Awesome** - Ícones (complementar)
- **Google Fonts** - Tipografia Roboto
- **Imagens Customizadas** - Assets organizados

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
Verificação de saúde da aplicação

## 🎨 Assets e Recursos Visuais

### 📁 Organização em `static/assets/`
- **bapgpt-logo.png** - Logo principal (40x40px no header)
- **Usuário.png** - Avatar do usuário (24x24px nas mensagens)
- **SetaSubmeter.png** - Ícone do botão enviar (24x24px)
- **Icone_superior1.jpg** - Botão nova conversa (24x24px)
- **Icone_superior2.jpg** - Botão informações (24x24px)

### 🖼️ Aplicação das Imagens
- **Header:** Logo BapGPT com bordas arredondadas
- **Mensagens:** Avatares específicos por tipo de remetente
- **Botões:** Ícones customizados com hover effects
- **Welcome Card:** Logo BapGPT na apresentação inicial

## 🎯 Experiência do Usuário

### 🔄 Fluxo de Interação
1. **Carregamento** - Logo e boas-vindas aparecem
2. **Digitação** - Campo responsivo com contador
3. **Envio** - Animação de loading com avatar
4. **Resposta** - Mensagem do bot com avatar BapGPT
5. **Histórico** - Scroll automático e timestamps

### 📱 Responsividade
- **Desktop** - Layout 900px com sidebar de informações
- **Tablet** - Adaptação para 768px
- **Mobile** - Interface full-screen otimizada

## 🔧 Personalização

### Alterar Cores
Modifique `static/style.css` para alterar:
- Gradientes do header
- Cores das mensagens
- Efeitos de hover

### Trocar Imagens
Substitua arquivos em `static/assets/`:
- Mantenha proporções recomendadas
- Use formatos PNG/JPG
- Considere performance (tamanho dos arquivos)

### Personalizar Layout
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
- [ ] Animações mais fluidas
- [ ] Suporte a emojis nativos

---

🎉 **Interface Web BapGPT pronta para uso!** 

Acesse http://localhost:5000 e comece a interagir com o assistente do condomínio. 