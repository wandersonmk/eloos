# Roteiro Sequencial de Desenvolvimento: Aplicativo de Gestão Escolar

Este documento organiza o desenvolvimento do aplicativo em etapas lógicas e sequenciais. A estrutura foi pensada para que você construa primeiro a base do sistema (autenticação e cadastros essenciais) e, em seguida, adicione as camadas de complexidade (financeiro, acadêmico e comunicação).

---

## Etapa 1: Base do Sistema e Autenticação

**Objetivo:** Criar a estrutura inicial do aplicativo, garantindo que os usuários possam acessar o sistema de forma segura e que a navegação principal esteja configurada.

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 1.1 | **Tela Inicial (Splash Screen)** | Logo do aplicativo, carregamento inicial e verificação de sessão ativa. |
| 1.2 | **Tela de Login** | Campos de e-mail e senha, botão "Acessar", link para "Esqueci minha senha". Validação de credenciais e direcionamento por perfil (Admin, Professor, Aluno). |
| 1.3 | **Tela de Recuperação de Senha** | Campo para inserir e-mail, botão de envio de link/token, tela para redefinição da nova senha. |
| 1.4 | **Layout Base (Shell/Menu)** | Menu lateral ou inferior (Sidebar/Bottom Navigation) com os links para os módulos que serão desenvolvidos nas próximas etapas. |
| 1.5 | **Tela de Dashboard (Visão Geral)** | Painel inicial após o login. Para o MVP (Produto Mínimo Viável), inclua apenas cards vazios ou com dados estáticos (ex: total de alunos, resumo financeiro) que serão preenchidos nas etapas seguintes. |

---

## Etapa 2: Configurações e Cadastros Estruturais

**Objetivo:** Preparar o sistema com os dados básicos necessários para que a escola funcione (unidades, usuários e turmas).

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 2.1 | **Tela de Gestão de Unidades** | Cadastro de informações da escola (nome, CNPJ, endereço, logo). |
| 2.2 | **Tela de Gestão de Usuários** | Listagem, criação e edição de usuários administrativos e professores. Definição de permissões de acesso. |
| 2.3 | **Tela de Cadastro de Turmas** | Criação de turmas (ex: 1º Ano A, 2º Ano B), definição de turnos e associação de tabelas de preços. |

---

## Etapa 3: Gestão de Alunos e Matrículas

**Objetivo:** Implementar o coração da gestão escolar, permitindo o registro e acompanhamento dos alunos.

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 3.1 | **Tela de Listagem de Alunos** | Tabela com busca, filtros (ativos/inativos, por turma) e paginação. |
| 3.2 | **Tela de Cadastro/Edição de Aluno** | Formulário com dados pessoais, foto, endereço e dados médicos básicos. |
| 3.3 | **Tela de Vínculo de Responsáveis** | Cadastro dos pais/responsáveis financeiros e pedagógicos vinculados ao aluno. |
| 3.4 | **Tela de Matrícula** | Fluxo para matricular um aluno em uma turma específica, gerando o contrato e o vínculo financeiro inicial. |
| 3.5 | **Tela de Perfil do Aluno (Diário)** | Visão detalhada do aluno, com abas para ocorrências, atestados e histórico. |

---

## Etapa 4: Módulo Financeiro

**Objetivo:** Controlar as receitas (mensalidades) e despesas da instituição.

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 4.1 | **Tela de Contas a Receber** | Listagem de mensalidades e taxas. Filtros por status (pago, pendente, atrasado). |
| 4.2 | **Tela de Detalhes da Cobrança** | Visualização de uma fatura específica, opções para gerar boleto, enviar recibo ou dar baixa manual. |
| 4.3 | **Tela de Contas a Pagar** | Registro de despesas da escola (água, luz, fornecedores) e controle de vencimentos. |
| 4.4 | **Tela de Caixa e Bancos** | Visão do saldo atual, registro de movimentações manuais e transferências. |
| 4.5 | **Atualização do Dashboard (Financeiro)** | Conectar os gráficos da Tela de Dashboard (criada na Etapa 1.5) com os dados reais de receitas e despesas. |

---

## Etapa 5: Módulo Acadêmico e Pedagógico

**Objetivo:** Fornecer ferramentas para os professores e coordenadores gerenciarem o ensino.

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 5.1 | **Tela de Diário de Classe (Professor)** | Seleção de turma e disciplina para registro do conteúdo lecionado no dia. |
| 5.2 | **Tela de Chamada (Frequência)** | Lista de alunos da turma com opções para marcar presença/falta na data selecionada. |
| 5.3 | **Tela de Lançamento de Notas** | Planilha (grid) para o professor inserir as notas das avaliações por bimestre/trimestre. |
| 5.4 | **Tela de Boletim Acadêmico** | Visualização consolidada das notas e faltas do aluno (visão da coordenação). |

---

## Etapa 6: Portais e Comunicação (Visão do Cliente)

**Objetivo:** Criar a interface para que alunos e pais interajam com a escola.

| Ordem | Tela / Página | Funcionalidades a Desenvolver |
|-------|---------------|-------------------------------|
| 6.1 | **Dashboard do Aluno/Responsável** | Tela inicial específica para este perfil, com resumo de notas, próximas faturas e avisos recentes. |
| 6.2 | **Tela de Extrato Financeiro (Portal)** | Visualização das mensalidades pelo responsável, com opção de copiar código de barras ou PIX. |
| 6.3 | **Tela de Boletim e Frequência (Portal)** | Consulta detalhada das notas e faltas pelo aluno/responsável. |
| 6.4 | **Tela de Agenda e Comunicados** | Mural de recados da escola, calendário de provas e eventos. |

---

## Resumo do Fluxo de Trabalho

Para otimizar seu desenvolvimento, siga este ciclo para cada tela:

1. **Modelagem de Dados (Backend):** Crie as tabelas no banco de dados necessárias para a tela.
2. **API/Rotas (Backend):** Desenvolva os endpoints (GET, POST, PUT, DELETE) para fornecer e salvar os dados.
3. **Interface (Frontend):** Construa o layout da tela (HTML/CSS ou componentes do framework).
4. **Integração:** Conecte a interface do Frontend com a API do Backend.
5. **Testes:** Verifique se os fluxos (ex: cadastrar, editar, excluir) estão funcionando corretamente.
