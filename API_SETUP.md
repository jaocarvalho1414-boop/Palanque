# Avaliador IA de políticas públicas

O projeto usa um servidor Express separado para chamar a OpenAI Responses API. A chave fica somente no ambiente do servidor, nunca no React/Vite.

## Configuração

1. Instale as dependências da interface na pasta do projeto: `npm install`.
2. Instale as dependências do servidor: `npm --prefix server install`.
3. Copie `server/.env.example` para `server/.env` e substitua `OPENAI_API_KEY` pela sua chave válida. Não compartilhe nem faça commit desse arquivo.
4. Em um terminal, inicie a API com `npm run server`.
5. Em outro terminal, inicie a interface com `npm run dev` e abra o endereço mostrado pelo Vite.

O endpoint `GET /api/health` confirma se o servidor está ativo e se detectou uma chave, sem revelar o valor. A tela de mandato chama `POST /api/evaluate-policy` para obter avaliação estruturada de legalidade, ambiente, impactos sociais, custos e viabilidade fiscal, benefícios, riscos, alternativas, ressalvas e possíveis efeitos em indicadores. Só depois da resposta do avaliador o jogo gera separadamente o resultado aleatório da votação simulada.

Sem chave válida a API responde com erro explícito e a votação não é gerada. A avaliação é uma triagem automatizada e não substitui análise jurídica, orçamento técnico ou decisão de órgão público.
