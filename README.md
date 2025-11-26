
# Mobile App Screens Design

Aplicação frontend construída com Vite + React (SWC), contendo protótipos de telas e um fluxo de chatbot para atendimento (CBMPE).

## Pré-requisitos

- Node.js 18+ recomendado
- npm (ou outro gerenciador compatível)

## Como rodar

1. Instale as dependências:
   - `npm install`
2. Inicie o servidor de desenvolvimento:
   - `npm run dev`
3. Acesse no navegador:
   - `http://localhost:3000`

Porta padrão: 3000 (configurável em `vite.config.ts` na chave `server.port`).

## Scripts

- `npm run dev`: roda o servidor de desenvolvimento (Vite).
- `npm run build`: gera build de produção em `build/`.

## Funcionalidades principais

- Chatbot com fluxos:
  - Emissão de certificado (coleta de dados).
  - Agendar vistoria.
  - Consultar protocolo:
    - Aceita protocolo no formato `CBMPE-XXXXXXXXXX` (10 dígitos) ou apenas os 10 dígitos.
  - Falar com atendente:
    - Aceita telefone com 10 ou 11 dígitos, com ou sem máscara. Ex.: `81997325563` ou `(81) 99732-5563`.

## Estrutura de pastas (parcial)

- `src/components/ChatScreen.tsx`: implementação do fluxo do chatbot.
- `src/*`: componentes e estilos.
- `vite.config.ts`: configurações do Vite (plugins, aliases, porta, build).

## Ambiente

Não há variáveis de ambiente obrigatórias neste projeto.

## Dicas e solução de problemas

- Se a porta 3000 estiver ocupada, altere `server.port` em `vite.config.ts` ou encerre o processo que estiver usando a porta.
- Após alterações no chatbot (ex.: validações), reinicie o servidor (`Ctrl+C` e `npm run dev`) se necessário. 