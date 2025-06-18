# ChatBot Assistente de Condomínio

Este projeto implementa um chatbot simples usando a API de Assistentes da OpenAI, especializado para atendimento de condomínios.

## 🚀 Como usar

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Configurar credenciais (IMPORTANTE!)
```bash
# Copie o arquivo de exemplo
copy config.env.example config.env

# Edite o arquivo config.env e insira suas credenciais da OpenAI
# OPENAI_API_KEY=sua_api_key_aqui
# OPENAI_ORGANIZATION_ID=sua_organization_id_aqui
# OPENAI_ASSISTANT_ID=seu_assistant_id_aqui
```

### 3. Executar teste rápido
```bash
python exemplo_uso.py
```

### 4. Interface Web (Recomendado)
```bash
python app.py
```
Acesse: http://localhost:5000

### 5. Chat no terminal
```bash
python chatbot_condominio.py
```

## 📋 Funcionalidades

- ✅ **Interface Web moderna** com estilo WhatsApp
- ✅ **Histórico de conversas** mantido por sessão
- ✅ **Cores distintas** para usuário e chatbot
- ✅ **Bolhas de mensagem** como WhatsApp
- ✅ **Indicador de digitação** em tempo real
- ✅ Integração com OpenAI Assistants API
- ✅ Respostas baseadas na base de conhecimento configurada
- ✅ Redirecionamento para gerente quando não souber a resposta
- ✅ Interface de chat no terminal
- ✅ Tratamento de erros robusto

## 🏢 Características do Assistente

O chatbot foi configurado para:
- Responder questões sobre regulamentos do condomínio
- Informar sobre procedimentos e horários
- Auxiliar com dúvidas gerais dos moradores
- Sugerir contato com o gerente quando necessário

## 🔧 Configuração

### 🔒 Segurança das Credenciais
Por segurança, as credenciais são armazenadas no arquivo `config.env` (não versionado):
- `OPENAI_API_KEY`: Sua chave da API OpenAI
- `OPENAI_ORGANIZATION_ID`: ID da sua organização
- `OPENAI_ASSISTANT_ID`: ID do seu assistente

### ⚠️ IMPORTANTE
- **NUNCA** commite o arquivo `config.env` para repositórios públicos
- Use o arquivo `config.env.example` como modelo
- O arquivo `config.env` está protegido pelo `.gitignore`
- **Leia o guia completo de segurança:** [`SEGURANCA.md`](SEGURANCA.md)

## 💡 Como usar a Interface Web

### 🖥️ Interface Principal
- **Campo de mensagem**: Digite sua pergunta
- **Botão ➤**: Enviar mensagem (ou Enter)
- **Botão ➕**: Nova conversa
- **Botão ℹ️**: Informações da sessão

### 🎨 Características Visuais
- **Verde** - Suas mensagens (lado direito)
- **Branco** - Respostas do assistente (lado esquerdo)
- **Indicador de digitação** - Quando o assistente está processando
- **Timestamps** - Horário de cada mensagem
- **Scroll automático** - Para a mensagem mais recente

### 💻 Chat no Terminal
- Digite qualquer pergunta para interagir
- `sair` - Encerra o chat
- `nova` - Inicia nova conversa (limpa histórico)

## 🛠️ Estrutura dos Arquivos

### 🌐 Interface Web
- `app.py` - **Servidor Flask da aplicação web**
- `templates/index.html` - **Interface HTML estilo WhatsApp**
- `static/style.css` - **Estilos CSS modernos**
- `static/script.js` - **JavaScript para funcionalidades**

### 🤖 Chatbot Core
- `chatbot_condominio.py` - Classe principal do chatbot
- `exemplo_uso.py` - Exemplos de uso e testes

### ⚙️ Configuração
- `requirements.txt` - Dependências do projeto
- `config.env` - **Credenciais da OpenAI (não versionado)**
- `config.env.example` - Modelo para configuração
- `.gitignore` - Arquivos ignorados pelo Git
- `SEGURANCA.md` - **Guia completo de segurança**
- `INTERFACE_WEB.md` - **Documentação da interface web**
- `README.md` - Este arquivo de instruções 