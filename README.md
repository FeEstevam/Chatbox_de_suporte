<<<<<<< HEAD
# Chatbox_de_suporte
=======
# Chatbox de Suporte

> Assistente financeiro inteligente com motor local de 1.700+ respostas e suporte opcional à API Gemini.

---

## ✨ Funcionalidades

- 💬 **Chat de suporte em tempo real** com interface premium dark mode
- 🤖 **Motor de IA local** — responde sem internet, sem API key
- 🌐 **Integração opcional com Google Gemini** — ative com sua chave
- 🔒 **100% offline e privado** — dados armazenados apenas no seu navegador
- 📊 **Contexto financeiro dinâmico** — saldo, contas, metas e transações em tempo real
- 📱 **Design responsivo** — funciona em desktop e mobile

---

## 🏗️ Arquitetura (DDD)

O projeto é organizado em camadas de **Domain-Driven Design**:

```
src/
├── index.css                           ← Estilos globais + Tailwind
└── client/
    ├── main.tsx                        ← Entry point React
    ├── App.tsx                         ← Router principal
    │
    ├── domain/                         ← Entidades e regras de negócio
    │   ├── chat/entities/
    │   │   └── Message.ts
    │   └── finance/
    │       ├── entities/
    │       │   ├── Transaction.ts
    │       │   ├── Account.ts
    │       │   ├── Goal.ts
    │       │   └── BudgetRule.ts
    │       └── value-objects/
    │           └── CustomCategoryDef.ts
    │
    ├── application/                    ← Casos de uso e serviços
    │   └── chat/services/
    │       └── ChatService.ts
    │
    ├── infrastructure/                 ← Adaptadores externos
    │   ├── storage/
    │   │   └── LocalStorageFinanceRepo.ts
    │   └── ai/
    │       └── GeminiProvider.ts
    │
    ├── lib/                            ← Utilitários compartilhados
    │   ├── chat-bot-engine.ts          ← Motor local (1.758 linhas)
    │   ├── finance-data.ts             ← Barrel de tipos
    │   ├── auth/index.ts               ← Gerenciador de sessão
    │   └── utils.ts
    │
    ├── hooks/
    │   └── use-finance.ts              ← Hook reativo de dados financeiros
    │
    ├── components/ui/
    │   ├── button.tsx
    │   └── input.tsx
    │
    └── pages/
        └── ChatSupport.tsx             ← Interface do chat
```

### Fluxo de mensagem

```
Usuário → ChatSupport → ChatService
                              ├── [com API key] → GeminiProvider → Gemini API
                              │                       ↓ fallback em erro
                              └── [sem API key] → chat-bot-engine (local)
```

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd chatbox

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no browser.

### Build de produção

```bash
npm run build
npm run preview
```

---

## 🤖 Motor Local vs Google Gemini

### Motor Local (padrão)
O assistente funciona **100% offline** com mais de 50 tópicos cobertos:

| Categoria | Exemplos |
|---|---|
| 💳 Cartões & Milhas | Acumulação de pontos, cashback vs milhas, anuidade, salas VIP |
| 🏢 Finanças PJ | Separação PF/PJ, MEI, pró-labore, CLT vs PJ, holding |
| 🚨 Urgências | Cartão clonado, Pix errado, dinheiro sumiu, senha bancária |
| 📈 Investimentos | IR, Renda Fixa, Selic, FIIs, aposentadoria |
| 🧮 App CashFlow | Scanner OCR, metas, backup, relatórios, categorias |

### Google Gemini (opcional)

Para respostas mais ricas, configure sua API key no console do browser:

```javascript
// Abra o DevTools (F12) > Console e execute:
import("/src/client/application/chat/services/ChatService.ts")
  .then(m => m.setGeminiApiKey("SUA_API_KEY_AQUI"))
```

> Obtenha sua chave gratuita em [aistudio.google.com](https://aistudio.google.com/app/apikey).

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **React 18** | UI e gerenciamento de estado |
| **TypeScript** | Tipagem estática em toda a base |
| **Vite 5** | Build e dev server ultrarrápido |
| **Tailwind CSS 3** | Estilização com design system |
| **React Router 6** | Navegação SPA |
| **Radix UI / Shadcn** | Componentes acessíveis |
| **Lucide React** | Ícones |

---

## 📦 Scripts disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Verificação de código
npm run test       # Testes unitários (vitest)
npm run test:watch # Testes em modo watch
```

---

## 📂 Persistência de dados

Todos os dados são armazenados localmente no **localStorage** do navegador:

| Chave | Conteúdo |
|---|---|
| `cashflow:transactions` | Transações financeiras |
| `cashflow:accounts` | Contas bancárias e cartões |
| `cashflow:goals` | Metas financeiras |
| `cashflow:budget_rules` | Regras de orçamento (50/30/20) |
| `cashflow:custom_categories` | Categorias personalizadas |
| `cashflow:session` | Sessão do usuário |
| `cashflow:gemini_api_key` | API key do Gemini (opcional) |

> ⚠️ **Atenção:** Limpar o cache do navegador apaga os dados. Faça backups regularmente.

---

## 🔐 Privacidade

- Nenhum dado é enviado a servidores externos (exceto se você configurar a API Gemini)
- O código-fonte do motor local está totalmente disponível para auditoria em [`chat-bot-engine.ts`](src/client/lib/chat-bot-engine.ts)
- Nenhuma telemetria ou rastreamento está implementado

---
>>>>>>> 9ec66f7 (feat: initialize project structure with React, Vite, Tailwind CSS, and core financial domain entities and services)
