# 🔒 Guia de Segurança - Proteção de Credenciais

## ⚠️ IMPORTANTE: Nunca exponha suas credenciais!

### 🚫 O que NÃO fazer:
- ❌ Nunca coloque API keys diretamente no código
- ❌ Nunca commite arquivos com credenciais para repositórios públicos
- ❌ Nunca compartilhe suas chaves em chats, e-mails ou fóruns
- ❌ Nunca deixe credenciais em arquivos não protegidos

### ✅ O que fazer:
- ✅ Use arquivos `.env` ou `config.env` para credenciais
- ✅ Adicione arquivos de credenciais ao `.gitignore`
- ✅ Use variáveis de ambiente em produção
- ✅ Regenere chaves se suspeitar de compromisso
- ✅ Mantenha suas credenciais atualizadas

## 📁 Estrutura de Segurança Implementada

### Arquivo `config.env` (protegido)
```env
OPENAI_API_KEY=sua_chave_secreta_aqui
OPENAI_ORGANIZATION_ID=sua_org_id_aqui
OPENAI_ASSISTANT_ID=seu_assistant_id_aqui
```

### Arquivo `.gitignore` (inclui proteções)
```
config.env
.env
```

### Código Python (carrega de forma segura)
```python
from dotenv import load_dotenv
import os

load_dotenv('config.env')
api_key = os.getenv('OPENAI_API_KEY')
```

## 🔄 Como configurar pela primeira vez:

1. **Copie o arquivo exemplo:**
   ```bash
   copy config.env.example config.env
   ```

2. **Edite suas credenciais:**
   - Abra `config.env` em um editor de texto
   - Substitua os valores de exemplo pelas suas credenciais reais
   - Salve o arquivo

3. **Verifique o .gitignore:**
   - Confirme que `config.env` está listado no `.gitignore`
   - Isso impede que seja enviado para repositórios

## 🆘 Se você já expôs credenciais:

1. **Regenere imediatamente:**
   - Acesse https://platform.openai.com/api-keys
   - Delete a chave comprometida
   - Gere uma nova chave

2. **Atualize o config.env:**
   - Substitua a chave antiga pela nova
   - Teste se tudo continua funcionando

3. **Revise o histórico:**
   - Verifique se não há outras credenciais expostas
   - Considere refazer commits se necessário

## 📞 Monitoramento

- Monitore o uso da sua API regularmente
- Configure alertas de billing na OpenAI
- Revise logs de acesso periodicamente

## 🎯 Resumo das Boas Práticas

1. **Separação**: Credenciais separadas do código
2. **Proteção**: Arquivos sensíveis no `.gitignore`
3. **Validação**: Verificação antes de executar
4. **Rotação**: Troque credenciais periodicamente
5. **Monitoramento**: Acompanhe o uso das APIs

---

**Lembre-se**: A segurança é responsabilidade de todos! 🛡️ 