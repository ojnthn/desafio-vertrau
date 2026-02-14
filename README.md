# Projeto Angular com Storybook

Este projeto é um template Angular com suporte a **PrimeNG**, usando **Storybook** para documentação e testes de componentes.

---

## 🔹 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) (versão >= 18)
* [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
* [Angular CLI](https://angular.io/cli) globalmente:

```bash
npm install -g @angular/cli
```

* [VS Code](https://code.visualstudio.com/) (recomendado para debug)

---

## 🔹 Instalação de dependências

No terminal, dentro da pasta do projeto:

```bash
# Instala todas as dependências do projeto
npm install
```

Isso vai instalar:

* Angular
* PrimeNG e suas dependências
* Storybook e dependências relacionadas
* Outras bibliotecas usadas pelo projeto

---

## 🔹 Scripts úteis

O `package.json` deve conter scripts como:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

* `npm start` → inicia o servidor Angular em `http://localhost:4200`.
* `npm run storybook` → inicia o Storybook em `http://localhost:6006`.

---

## 🔹 Debug com VS Code

O projeto já possui um `launch.json` configurado. Ele permite iniciar e debugar o Angular ou Storybook diretamente do VS Code.

### ⚡ Chrome Debug (Angular)

* Abre o projeto no Chrome e conecta o debugger.
* Pré-requisito: servidor Angular rodando (`npm start`).
* Configuração:

```json
{
  "name": "Chrome Debug",
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:4200",
  "preLaunchTask": "npm: start",
  "webRoot": "${workspaceFolder}",
  "sourceMaps": true
}
```

Para usar:

1. Abra o painel de **Run and Debug** no VS Code.
2. Selecione `Chrome Debug`.
3. Clique em **Start Debugging (F5)**.

---

### ⚡ Storybook Debug

* Roda o Storybook em Node.js com debug no VS Code.
* Configuração:

```json
{
  "name": "Storybook",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "storybook"],
  "cwd": "${workspaceFolder}",
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"],
  "env": {
    "NODE_ENV": "development"
  }
}
```

Para usar:

1. Abra o painel de **Run and Debug** no VS Code.
2. Selecione `Storybook`.
3. Clique em **Start Debugging (F5)**.
4. O Storybook será aberto em `http://localhost:6006`.

---

## 🔹 Estrutura básica do projeto

```
/src
  /app
    /components
      /shared-components
        - component-name/
          - component-name.component.ts
          - component-name.component.html
          - component-name.component.scss
    /pages
      - page-name/
        - page-name.component.ts
        - page-name.component.html
  /storybook
    - main.js
    - preview.js
```

---

## 🔹 Observações

* Sempre inicialize `items` ou listas com `[]` para evitar erros em tabelas.
* Ao usar `@for` no Angular 21, alguns templates do PrimeNG podem não funcionar. Para mensagens de vazio, renderize manualmente fora do `<p-table>`.