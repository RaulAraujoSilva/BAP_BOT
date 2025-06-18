"""
Exemplo simples de uso do ChatBot de Condomínio
Este arquivo demonstra como usar o chatbot de forma básica
"""

from chatbot_condominio import ChatBotCondominio

def teste_rapido():
    """Executa um teste rápido com perguntas pré-definidas"""
    print("🚀 Iniciando teste rápido do ChatBot de Condomínio...")
    
    # Cria instância do chatbot
    chatbot = ChatBotCondominio()
    
    # Lista de perguntas para teste
    perguntas = [
        "Olá! Você pode me ajudar com questões do condomínio?",
        "Qual é o horário de funcionamento da piscina?",
        "Como faço para agendar o salão de festas?",
        "Posso ter animais de estimação no condomínio?",
        "Onde posso reclamar sobre barulho dos vizinhos?",
    ]
    
    print("\n" + "="*60)
    print("           TESTE DO ASSISTENTE DE CONDOMÍNIO")
    print("="*60)
    
    for i, pergunta in enumerate(perguntas, 1):
        print(f"\n📝 Pergunta {i}: {pergunta}")
        print("⏳ Aguardando resposta...")
        
        try:
            resposta = chatbot.enviar_mensagem(pergunta)
            print(f"🤖 Resposta: {resposta}")
        except Exception as e:
            print(f"❌ Erro: {e}")
        
        print("-" * 60)
    
    print("\n✅ Teste concluído!")
    print("💡 Para usar o chat interativo, execute: python chatbot_condominio.py")

def exemplo_conversa_personalizada():
    """Exemplo de como usar o chatbot com perguntas personalizadas"""
    chatbot = ChatBotCondominio()
    
    print("\n🏢 Exemplo de Conversa Personalizada")
    print("=" * 40)
    
    # Simulando uma conversa
    conversa = [
        "Bom dia! Preciso de informações sobre o condomínio.",
        "Quais documentos preciso para alugar meu apartamento?",
        "Existe alguma taxa para mudança?"
    ]
    
    for pergunta in conversa:
        print(f"\n👤 Morador: {pergunta}")
        resposta = chatbot.enviar_mensagem(pergunta)
        print(f"🤖 Assistente: {resposta}")

if __name__ == "__main__":
    # Executa o teste rápido
    teste_rapido()
    
    # Opcionalmente, executa exemplo de conversa
    # exemplo_conversa_personalizada() 