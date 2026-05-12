# Eloos — Aplicativo de Gestão Escolar

## Contexto do Projeto

Sistema de gestão escolar desenvolvido em **Nuxt 4 + Tailwind CSS**.
Fase atual: **somente frontend** — sem conexão com banco de dados. Dados são estáticos ou mockados.

**Referência de sistema:** Galileu (base para mapeamento de funcionalidades).

**Perfis de usuário:**
- **Administrador** — acesso total ao sistema
- **Professor** — módulos acadêmicos e diário de classe
- **Aluno** — portal de consulta
- **Responsável** — portal financeiro e acompanhamento pedagógico

---

## Stack e Estrutura

- **Framework:** Nuxt 4
- **Estilização:** Tailwind CSS (`@nuxtjs/tailwindcss`)
- **Pasta do app:** `nuxt-app/app/`
- **Componentes base:** `nuxt-app/app/components/` — sempre reutilizar `BaseButton`, `BaseInput`, `BaseForm`
- **Páginas:** `nuxt-app/app/pages/`
- **Assets estáticos:** `nuxt-app/public/`
- **Skill de design:** `ui-ux-pro-max` — usar sempre ao criar ou melhorar telas

---

## Ordem de Desenvolvimento

### Etapa 1 — Autenticação e Base do Sistema
> Estrutura de acesso e navegação principal.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 1.1 | Splash Screen | Logo, carregamento inicial, verificação de sessão ativa |
| 1.2 | Login | E-mail + senha, "Esqueci minha senha", redirecionamento por perfil |
| 1.3 | Recuperação de Senha | Envio de link/token, tela de redefinição de senha |
| 1.4 | Layout Base (Shell) | Menu lateral ou inferior com links para todos os módulos |
| 1.5 | Dashboard Principal | Cards estáticos no MVP; Admin vê resumo financeiro + alertas; outros perfis veem atalhos |

### Etapa 2 — Configurações e Cadastros Estruturais
> Dados base para a escola funcionar.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 2.1 | Gestão de Unidades | Nome, CNPJ, endereço, logo; suporte a múltiplas unidades |
| 2.2 | Gestão de Usuários | Listagem, criação e edição; permissões por perfil (RBAC); logs de auditoria |
| 2.3 | Cadastro de Turmas | Nome da turma, turno, associação de tabela de preços |

### Etapa 3 — Gestão de Alunos e Matrículas
> Coração da gestão escolar.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 3.1 | Listagem de Alunos | Tabela com busca, filtros (ativo/inativo, turma), paginação |
| 3.2 | Cadastro/Edição de Aluno | Dados pessoais, documentação, foto, endereço, dados médicos |
| 3.3 | Vínculo de Responsáveis | Cadastro de responsáveis financeiros e pedagógicos |
| 3.4 | Matrícula | Fluxo de matrícula em turma, geração de contrato, vínculo financeiro; suporte a rematrícula |
| 3.5 | Diário do Aluno | Abas: ocorrências, atestados, dispensas, histórico de cursos |
| 3.6 | Central de Documentos | Geração de contratos, declarações e relatórios de matrícula |

### Etapa 4 — Módulo Financeiro
> Controle de receitas, despesas e cobrança.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 4.1 | Contas a Receber | Mensalidades e taxas; filtros por status (pago, pendente, atrasado) |
| 4.2 | Detalhes da Cobrança | Visualizar fatura, gerar boleto, enviar recibo, baixa manual |
| 4.3 | Contas a Pagar | Despesas operacionais, alertas de vencimento, gestão de fornecedores |
| 4.4 | Caixa e Bancos | Saldo atual, movimentações manuais, transferências, conciliação |
| 4.5 | Emissão de Notas Fiscais | NFS-e e NF-e |
| 4.6 | Régua de Cobrança | Lembretes automáticos de vencimento e inadimplência (SMS, WhatsApp, e-mail) |
| 4.7 | Dashboard Financeiro | Gráficos de receitas vs. despesas conectados ao Dashboard principal |

### Etapa 5 — Módulo Acadêmico e Pedagógico
> Ferramentas para professores e coordenadores.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 5.1 | Diário de Classe | Seleção de turma/disciplina, registro de conteúdo do dia |
| 5.2 | Chamada (Frequência) | Lista de alunos, presença/falta por data, histogramas de desempenho |
| 5.3 | Lançamento de Notas | Grid de notas por bimestre/trimestre |
| 5.4 | Boletim Acadêmico | Notas e faltas consolidadas (visão da coordenação) |
| 5.5 | Gestão de Turmas | Horários de aula, associação de tabelas de preço |
| 5.6 | Planejamento Pedagógico | Planejamento anual/mensal, calendário de provas e eventos |
| 5.7 | Portal do Professor | Registro de conteúdo, tarefas, acompanhamento individual |

### Etapa 6 — Portais e Comunicação (Aluno/Responsável)
> Interface do cliente com a escola.

| # | Tela | Funcionalidades |
|---|------|----------------|
| 6.1 | Dashboard Aluno/Responsável | Notas recentes, próximas faturas, avisos, atalhos por perfil |
| 6.2 | Extrato Financeiro (Portal) | Mensalidades, cópia de código de barras ou PIX |
| 6.3 | Boletim e Frequência (Portal) | Notas e faltas detalhadas; download de materiais |
| 6.4 | Agenda e Comunicados | Calendário interativo (eventos, feriados, reuniões, cardápio), comunicados com push/SMS/WhatsApp |

---

## Diretrizes de Desenvolvimento

- Sempre reutilizar os componentes base (`BaseButton`, `BaseInput`, `BaseForm`)
- Usar a skill `ui-ux-pro-max` ao criar ou revisar qualquer tela
- Dados mockados enquanto não houver backend — sem chamadas a APIs reais
- Respeitar os perfis de usuário: cada tela deve ser pensada para quem vai usá-la
- MVP primeiro: entregar telas funcionais com dados estáticos antes de adicionar complexidade
