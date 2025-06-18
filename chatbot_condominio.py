import openai
import asyncio
import time
import json
import os
from typing import Optional
from dotenv import load_dotenv

class ChatBotCondominio:
    def __init__(self):
        # Carrega variáveis de ambiente
        load_dotenv('config.env')
        
        # Verifica se as variáveis de ambiente estão configuradas
        api_key = os.getenv('OPENAI_API_KEY')
        organization_id = os.getenv('OPENAI_ORGANIZATION_ID')
        assistant_id = os.getenv('OPENAI_ASSISTANT_ID')
        
        if not api_key or not organization_id or not assistant_id:
            raise ValueError(
                "❌ Erro: Variáveis de ambiente não configuradas!\n"
                "Por favor, configure o arquivo config.env com suas credenciais da OpenAI.\n"
                "Use config.env.example como modelo."
            )
        
        # Configuração da OpenAI
        self.client = openai.OpenAI(
            api_key=api_key,
            organization=organization_id
        )
        # Cliente assíncrono para chamadas non-blocking
        self.async_client = openai.AsyncOpenAI(
            api_key=api_key,
            organization=organization_id
        )
        
        # ID do assistente fornecido
        self.assistant_id = assistant_id
        
        # Thread atual (será criada quando necessário)
        self.thread_id: Optional[str] = None
    
    def criar_thread(self):
        """Cria uma nova thread de conversa"""
        try:
            thread = self.client.beta.threads.create()
            self.thread_id = thread.id
            print(f"Thread criada: {self.thread_id}")
            return thread
        except Exception as e:
            print(f"Erro ao criar thread: {e}")
            return None

    async def criar_thread_async(self):
        """Versão assíncrona para criar nova thread"""
        try:
            thread = await self.async_client.beta.threads.create()
            self.thread_id = thread.id
            print(f"Thread criada: {self.thread_id}")
            return thread
        except Exception as e:
            print(f"Erro ao criar thread: {e}")
            return None
    
    def enviar_mensagem(self, mensagem: str) -> str:
        """Envia uma mensagem de forma síncrona"""
        return asyncio.run(self.enviar_mensagem_async(mensagem))

    async def enviar_mensagem_async(self, mensagem: str) -> str:
        """Envia uma mensagem para o assistente e retorna a resposta"""
        try:
            # Cria thread se não existir
            if not self.thread_id:
                await self.criar_thread_async()
            
            # Adiciona mensagem à thread
            await self.async_client.beta.threads.messages.create(
                thread_id=self.thread_id,
                role="user",
                content=mensagem
            )
            
            # Executa o assistente
            run = await self.async_client.beta.threads.runs.create(
                thread_id=self.thread_id,
                assistant_id=self.assistant_id,
                instructions="""Você é um assistente de condomínio especializado. 
                Responda às perguntas usando sua base de conhecimento sobre regulamentos, 
                procedimentos e informações do condomínio. 
                
                Se você não souber a resposta ou não tiver informações suficientes, 
                responda educadamente: 'Não tenho essa informação específica em minha base de conhecimento. 
                Recomendo que entre em contato com o gerente de conta do condomínio para obter 
                uma resposta precisa e atualizada.'
                
                Seja sempre cordial, profissional e útil."""
            )
            
            # Aguarda a conclusão do run com intervalo menor
            while run.status in ['queued', 'in_progress', 'cancelling']:
                await asyncio.sleep(0.5)
                run = await self.async_client.beta.threads.runs.retrieve(
                    thread_id=self.thread_id,
                    run_id=run.id
                )
            
            if run.status == 'completed':
                # Recupera as mensagens
                messages = await self.async_client.beta.threads.messages.list(
                    thread_id=self.thread_id,
                    limit=1
                )
                
                # Pega a última mensagem do assistente
                for message in messages.data:
                    if message.role == "assistant":
                        return message.content[0].text.value
                        
            elif run.status == 'failed':
                return "Desculpe, ocorreu um erro interno. Por favor, tente novamente ou entre em contato com o gerente de conta."
            
            return "Não foi possível processar sua solicitação no momento."
            
        except Exception as e:
            print(f"Erro ao enviar mensagem: {e}")
            return "Desculpe, estou com dificuldades técnicas. Recomendo entrar em contato com o gerente de conta do condomínio."
    
    def chat_interativo(self):
        """Inicia um chat interativo simples"""
        print("=== ChatBot Assistente de Condomínio ===")
        print("Digite 'sair' para encerrar o chat")
        print("Digite 'nova' para iniciar nova conversa")
        print("-" * 40)
        
        while True:
            pergunta = input("\n🏢 Você: ").strip()
            
            if pergunta.lower() in ['sair', 'exit', 'quit']:
                print("👋 Obrigado por usar o assistente do condomínio!")
                break
            
            if pergunta.lower() == 'nova':
                self.thread_id = None
                print("🔄 Nova conversa iniciada!")
                continue
            
            if not pergunta:
                continue
            
            print("🤖 Assistente: Processando...")
            resposta = self.enviar_mensagem(pergunta)
            print(f"🤖 Assistente: {resposta}")

# Função para teste rápido
def teste_simples():
    """Teste simples do chatbot"""
    chatbot = ChatBotCondominio()
    
    print("=== Teste do ChatBot de Condomínio ===")
    
    # Testa algumas perguntas
    perguntas_teste = [
        "Olá, como você pode me ajudar?",
        "Quais são os horários da piscina?",
        "Como faço para reservar o salão de festas?"
    ]
    
    for pergunta in perguntas_teste:
        print(f"\n👤 Pergunta: {pergunta}")
        resposta = chatbot.enviar_mensagem(pergunta)
        print(f"🤖 Resposta: {resposta}")
        print("-" * 50)

if __name__ == "__main__":
    # Descomente a linha abaixo para teste rápido
    # teste_simples()
    
    # Ou execute o chat interativo
    chatbot = ChatBotCondominio()
    chatbot.chat_interativo() 