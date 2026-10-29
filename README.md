# Palanque — Simulador Presidencial

Protótipo novo, independente do projeto anterior, com identidade visual escura inspirada na referência enviada.

## Requisitos
- Node.js 18 ou superior
- npm

## Executar
```bash
npm install
npm run dev
```

Para gerar a versão de produção:
```bash
npm run build
```

## O que já está no protótipo
- Dashboard presidencial e agenda semanal
- Ações de campanha (caminhada, comício, palanque e debate)
- Equipe e convites com alertas de rivalidade
- Chapa eleitoral com vice e coordenação
- Mapa de estados clicável com influência simulada
- Pesquisas nacionais simuladas e visão por localidade
- Redes sociais com repercussão que considera o conteúdo do post
- Eventos narrativos com escolhas e efeitos
- Recursos de campanha: caixa, energia e segurança

**Importante:** pesquisas, percentuais, candidatos e acontecimentos são dados de demonstração do jogo, não informações eleitorais reais. Este é um primeiro protótipo e ainda não inclui persistência de save, mapa geográfico real, notícias reais ou integração com institutos de pesquisa.

## Avaliador IA de políticas

Para configurar a avaliação OpenAI com chave somente no servidor e iniciar interface/API, siga [API_SETUP.md](./API_SETUP.md). O avaliador faz uma triagem de legalidade, impactos ambientais e sociais, custos e viabilidade fiscal, benefícios, riscos, alternativas e indicadores. A votação narrativa do jogo continua separada do parecer.
