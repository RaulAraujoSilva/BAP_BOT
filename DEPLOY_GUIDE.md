# 🚀 Guia de Deploy - BAP Bot Condomínios

Este guia mostra como fazer deploy da aplicação para ser acessível na web por qualquer pessoa.

## 🌟 **Opções Recomendadas (Gratuitas)**

### 1. 🔥 **Render** (Melhor opção gratuita)

#### ✅ **Vantagens:**
- 🆓 Plano gratuito generoso
- 🔒 HTTPS automático
- 🌐 Subdomínio personalizado
- ⚡ Deploy automático via GitHub
- 💾 Banco de dados PostgreSQL gratuito

#### 📋 **Passos:**
1. **Acesse:** https://render.com
2. **Conecte seu GitHub:** Autorize acesso ao repositório
3. **Novo Web Service:** Selecione o repositório BAP_BOT
4. **Configurações:**
   - **Name:** `bap-bot-condominios`
   - **Environment:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`

5. **Variáveis de Ambiente:**
   ```
   OPENAI_API_KEY=sua_api_key_aqui
   OPENAI_ORGANIZATION_ID=sua_org_id_aqui
   OPENAI_ASSISTANT_ID=seu_assistant_id_aqui
   FLASK_ENV=production
   ```

6. **Deploy:** Clique em "Create Web Service"

#### 🌐 **URL Final:** `https://bap-bot-condominios.onrender.com`

---

### 2. 🚂 **Railway** (Simples e rápido)

#### ✅ **Vantagens:**
- 🆓 $5 créditos mensais gratuitos
- ⚡ Deploy em segundos
- 🔄 Auto-deploy do GitHub
- 📊 Métricas em tempo real

#### 📋 **Passos:**
1. **Acesse:** https://railway.app
2. **Login com GitHub**
3. **New Project → Deploy from GitHub**
4. **Selecione:** repositório BAP_BOT
5. **Adicione variáveis de ambiente:**
   ```
   OPENAI_API_KEY=sua_api_key_aqui
   OPENAI_ORGANIZATION_ID=sua_org_id_aqui
   OPENAI_ASSISTANT_ID=seu_assistant_id_aqui
   ```

#### 🌐 **URL Final:** `https://bap-bot-condominios.up.railway.app`

---

### 3. 🟣 **Heroku** (Clássico)

#### ⚠️ **Nota:** Heroku removeu o plano gratuito, mas é uma opção popular paga

#### 📋 **Passos:**
1. **Instale Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Login:**
   ```bash
   heroku login
   ```
3. **Crie app:**
   ```bash
   heroku create bap-bot-condominios
   ```
4. **Configure variáveis:**
   ```bash
   heroku config:set OPENAI_API_KEY=sua_api_key_aqui
   heroku config:set OPENAI_ORGANIZATION_ID=sua_org_id_aqui
   heroku config:set OPENAI_ASSISTANT_ID=seu_assistant_id_aqui
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

---

### 4. ⚡ **Vercel** (Para aplicações estáticas + serverless)

#### 📋 **Configuração especial necessária** (Python serverless)

---

## 🔧 **Configurações de Produção**

### 📁 **Arquivos Criados:**
- ✅ `render.yaml` - Configuração Render
- ✅ `railway.json` - Configuração Railway  
- ✅ `Procfile` - Configuração Heroku
- ✅ `app.py` modificado para produção

### 🔒 **Segurança:**
- ✅ Variáveis de ambiente para credenciais
- ✅ Debug desabilitado em produção
- ✅ HTTPS automático nas plataformas
- ✅ Arquivo .gitignore protegendo credenciais

### ⚙️ **Variáveis de Ambiente Necessárias:**
```env
OPENAI_API_KEY=sk-proj-...
OPENAI_ORGANIZATION_ID=org-...
OPENAI_ASSISTANT_ID=asst_...
FLASK_ENV=production  # Desabilita debug
PORT=5000  # Porta automática (opcional)
```

---

## 🌐 **Pós Deploy**

### ✅ **Verificações:**
1. **Acesse a URL** fornecida pela plataforma
2. **Teste o chat** com algumas perguntas
3. **Verifique logs** se houver problemas
4. **Monitore uso** da API OpenAI

### 🔄 **Atualizações:**
- **Git push** para `main` → Deploy automático
- **Logs** disponíveis nas plataformas
- **Métricas** de uso e performance

### 📊 **Monitoramento:**
- **Uptime** das plataformas
- **Uso da API** OpenAI
- **Logs de erro** da aplicação

---

## 💰 **Custos Estimados**

### 🆓 **Gratuito:**
- **Render:** 750 horas/mês gratuitas
- **Railway:** $5 créditos/mês
- **Vercel:** 100GB bandwidth

### 💳 **Pago:**
- **Heroku:** ~$7/mês (Eco Dyno)
- **DigitalOcean:** ~$5/mês (App Platform)
- **AWS/GCP:** Variável conforme uso

---

## 🎯 **Recomendação Final**

### 🥇 **Para começar:** Render
- Mais estável e generoso no plano gratuito
- HTTPS automático
- Fácil configuração

### 🥈 **Alternativa:** Railway  
- Interface moderna
- Deploy ultra-rápido
- Boa para desenvolvedores

### 🥉 **Profissional:** Heroku
- Mais maduro e confiável
- Melhor suporte
- Ideal para produção séria

---

## 🆘 **Suporte**

Se tiver problemas com o deploy:

1. **Verificar logs** da plataforma
2. **Conferir variáveis** de ambiente
3. **Testar localmente** primeiro
4. **Consultar documentação** da plataforma

---

🚀 **Seu BAP Bot estará acessível globalmente em poucos minutos!** 