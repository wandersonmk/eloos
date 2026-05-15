# Implementação do Formulário de Cadastro de Aluno

## Contexto
Este documento descreve todos os campos, seções e opções do formulário de cadastro de aluno do sistema Galileu (appgalileu.com.br) que devem ser implementados no aplicativo.

O formulário é dividido em **abas/seções** e cada uma contém campos específicos.

---

## CAMPOS OBRIGATÓRIOS (marcados com *)
- Autoriza uso de imagem
- Unidade de Cadastro
- RM (Registro de Matrícula)
- Nome do Aluno
- Data de Nascimento
- Nacionalidade
- Falecido?
- CEP (endereço residencial)
- Logradouro (endereço residencial)
- Número (endereço residencial)
- Bairro (endereço residencial)
- Município (endereço residencial)

---

## ABA 1 — DADOS DO ALUNO

### Identificação
| Campo | Tipo | Opções / Observação |
|-------|------|---------------------|
| O aluno é o responsável financeiro | checkbox | - |
| Autoriza uso de imagem * | radio | Sim / Não |
| Unidade de Cadastro * | select | Lista de unidades cadastradas |
| RA (Registro do Aluno) | text | - |
| RM (Registro de Matrícula) * | text | Com opção "Gerar RM Automaticamente" |
| Nome do Aluno * | text | - |
| Possui Nome Social | radio | Não / Sim (se Sim, exibir campo Nome Social) |
| Dt. Nascimento * | date | - |
| Idade | text | Calculado automaticamente |
| Sexo | select | Feminino / Masculino |
| Sair Sozinho (quando menor de idade) | radio | Sim / Não |
| CPF | text | Máscara: 000.000.000-00 |
| RG | text | - |
| ID do Censo | text | - |
| Número do NIS | text | - |
| Dt. Cadastro | date | Preenchida automaticamente com data atual |
| SISTEC | text | - |
| Canhoto ou Destro? | select | Canhoto / Destro |
| Reside em zona | select | Rural / Urbana |
| Foto do Aluno | image upload | Câmera ou galeria |

### Certidão de Nascimento
| Campo | Tipo | Observação |
|-------|------|------------|
| Nº Livro Certidão de Nascimento | text | - |
| Número Folha | text | - |
| Certidão Cartório | text | - |
| Certidão UF | text | - |
| Número Certidão | text | - |
| Data Emissão Certidão de Nascimento | date | - |
| Nº Nova Certidão | text | - |
| Nome da Mãe na Certidão | text | - |

### Dados Complementares
| Campo | Tipo | Opções |
|-------|------|--------|
| Religião | text | - |
| Município Naturalidade | text | - |
| UF | text | - |
| País | text | - |
| Nacionalidade * | text | Padrão: BRASILEIRO(A) |
| Falecido? * | select | Não / Sim |
| Cor/Raça | select | Selecione / Branca / Preta / Parda / Amarela / Indígena / Não declarada |
| Necessidades Especiais | select | Nenhuma / Alta habilidade / Deficiência auditiva parcial / Deficiência auditiva total / Deficiência física / Deficiência intelectual / Deficiência múltipla / Deficiência visual parcial / Deficiência visual total / Outras necessidades / Transtorno específico / Transtorno global de desenvolvimento |
| Outra necessidade | checkbox + text | Exibir campo de texto se marcado |
| Telefone 01 | phone | - |
| Telefone 02 | phone | - |
| Observações Gerais | textarea | - |
| Score Enem | number | - |

### Endereço 1 — RESIDENCIAL (obrigatório)
| Campo | Tipo | Observação |
|-------|------|------------|
| Copiar endereço do Responsável Financeiro | checkbox | Preenche campos automaticamente |
| CEP * | text | Máscara: 00000-000 |
| Endereço no exterior | checkbox | Oculta busca de CEP se marcado |
| Logradouro * | text | - |
| Número * | text | - |
| Bairro * | text | - |
| Município * | text | - |
| UF | text | - |
| País | text | - |
| Complemento | text | - |
| Observação | textarea | - |

### Endereço 2 — COMERCIAL (opcional)
| Campo | Tipo | Observação |
|-------|------|------------|
| CEP | text | Máscara: 00000-000 |
| Endereço no exterior | checkbox | - |
| Logradouro | text | - |
| Número | text | - |
| Bairro | text | - |
| Município | text | - |
| UF | text | - |
| País | text | - |
| Complemento | text | - |
| Observação | textarea | - |

### Pessoas para Avisar em Caso de Emergência (lista dinâmica)
> Botão "Adicionar" para incluir entradas. Cada entrada contém:
- Nome
- Grau de Parentesco
- Telefone
- Em caso de emergência, encaminhar para (text)

### Pessoas Autorizadas a Retirar o(a) Aluno(a) (lista dinâmica)
> Botão "Adicionar" para incluir entradas. Cada entrada contém:
- Nome
- RG
- Grau de Parentesco
- Telefone
- Cód. Identificação

### Composição Familiar do(a) Aluno(a) (lista dinâmica)
> Botão "Adicionar" para incluir entradas. Cada entrada contém:
- Nome
- Data de Nascimento
- Parentesco/Vínculo
- Profissão
- Ocupação
- Renda
- Fator(es) de Risco Social

### Parentes do Aluno na Escola
| Campo | Tipo | Observação |
|-------|------|------------|
| O aluno tem irmãos ou parentes nesta Escola? Quem? Em que série? | textarea | - |

---

## ABA 2 — MÃE

| Campo | Tipo | Opções |
|-------|------|--------|
| Responsável Financeiro do Aluno | radio | Marcar se a mãe for o resp. financeiro |
| Responsável Pedagógico do Aluno | checkbox | - |
| Nome da Mãe | text | - |
| sem CPF | checkbox | Oculta campo CPF se marcado |
| CPF | text | Máscara: 000.000.000-00 |
| Dt. Nascimento | date | - |
| RG | text | - |
| Órgão Emissor | text | - |
| Data Exp. (RG) | date | - |
| Município Naturalidade | text | - |
| UF | text | - |
| País | text | - |
| Nacionalidade | text | - |
| Falecido? | select | Não / Sim |
| Escolaridade | select | Doutorado / Ensino Fundamental I Completo / Ensino Fundamental I Incompleto / Ensino Fundamental II Completo / Ensino Fundamental II Incompleto / Ensino Fundamental Incompleto / Ensino Médio Completo / Ensino Médio Incompleto / Ensino Superior Completo / Ensino Superior Incompleto / Ensino Técnico / Mestrado / Pós-Graduação |
| Estado Civil | select | Casado(a) / Divorciado(a) / Não informado / Separado(a) / Solteiro(a) / União Estável / Viúvo(a) |
| Cor/Raça | select | Selecione / Branca / Preta / Parda / Amarela / Indígena / Não declarada |
| Profissão | text | - |
| Religião | text | - |
| E-mail 1 | email | - |
| E-mail 2 | email | - |
| E-mail 3 | email | - |
| E-mail 4 | email | - |

**Telefones da Mãe (3 grupos, 3 telefones cada):**
- 1. TEL. RESIDENCIAL: Telefone + Observação (x3)
- 2. TEL. COMERCIAL: Telefone + Observação (x3)
- 3. TEL. CONTATO: Telefone + Observação (x3)

**Endereço da Mãe:**
- Copiar endereço do Responsável Financeiro (checkbox)
- CEP / Logradouro / Número / Bairro / Complemento / Município / UF / País

**Local de Trabalho da Mãe:**
| Campo | Tipo | Opções |
|-------|------|--------|
| Trabalha? | radio | Sim / Não |
| Local de Trabalho | text | - |
| Hora Início | time | - |
| Hora Fim | time | - |
| Cargo/Função | text | - |
| Telefone | phone | - |
| Observação | textarea | - |

---

## ABA 3 — PAI
> Mesmos campos da Aba Mãe, substituindo "Nome da Mãe" por "Nome do Pai"

---

## ABA 4 — OUTRO(A) RESPONSÁVEL

| Campo | Tipo | Opções |
|-------|------|--------|
| Responsável Financeiro do Aluno | radio | - |
| Responsável Pedagógico do Aluno | checkbox | - |
| Tipo | radio | Pessoa Física / Pessoa Jurídica |
| Nome | text | - |
| Responsável sem CPF | checkbox | - |
| CPF | text | Máscara: 000.000.000-00 |
| Dt. Nascimento | date | - |
| Sexo | select | Feminino / Masculino |
| Grau de Parentesco | select | A mesma pessoa / Avô(ó) / Irmão(ã) / Madrasta / Mãe / Outro / Padrasto / Pai / Primo(a) / Tio(a) |
| RG | text | - |
| Órgão Emissor | text | - |
| Data Exp. (RG) | date | - |
| Município Naturalidade | text | - |
| UF | text | - |
| País | text | - |
| Falecido? | select | Não / Sim |
| Escolaridade | select | (mesmas opções da Mãe) |
| Estado Civil | select | (mesmas opções da Mãe) |
| Cor/Raça | select | (mesmas opções da Mãe) |
| Profissão | text | - |
| Religião | text | - |
| E-mail 1 a 4 | email | - |

**Telefones:** (mesmos 3 grupos da Mãe)

**Endereço:** (mesmo da Mãe)

**Moradia:**
| Campo | Tipo | Opções |
|-------|------|--------|
| Moradia | select | Própria / Alugada / Cedida |
| Tipo de Construção | select | Alvenaria / Madeira / Mista |
| Nº de Cômodos | number | - |
| Valor (Aluguel ou Financiamento) | currency | R$ |

**Local de Trabalho:** (mesmo da Mãe)

---

## ABA 5 — RESPONSÁVEL PEDAGÓGICO
> Mesmos campos da Aba Outro(a), sem os campos de Moradia/Tipo de Construção/Nº de Cômodos/Valor

---

## ABA 6 — FICHA MÉDICA

### Dados Biométricos
| Campo | Tipo | Opções |
|-------|------|--------|
| Altura (cm) | number | - |
| Peso (kg) | number | - |
| Cor dos Olhos | select | Selecione / Âmbar / Azul / Avelã / Castanho / Cinza / Preto / Verde / Vermelho/Violeta / Outro |
| Cor do Cabelo | select | Selecione / Preto / Castanho / Louro / Ruivo / Outro |

### Autorizações
| Campo | Tipo | Observação |
|-------|------|------------|
| Autoriza aulas de Educação Física? | radio | Sim / Não + campo "Detalhar motivo" |
| Anexar Atestado Médico Atividade Física | file upload | - |
| Autorizado uso de Tylenol? | radio | Sim / Não |
| Em caso de febre alta, autoriza medicação? | radio | Sim / Não |

### Doenças e Histórico Clínico
| Campo | Tipo | Opções |
|-------|------|--------|
| Epilético? | radio | Sim / Não |
| Faz tratamento? (Epilepsia) | radio | Sim / Não |
| Observação sobre Epilepsia | textarea | - |
| Asmático? | radio | Sim / Não |
| Faz tratamento? (Asma) | radio | Sim / Não |
| Observação sobre Asma | textarea | - |
| Diabético? | radio | Sim / Não |
| Apresenta Convulsões? | radio | Sim / Não |
| Problemas Cardíacos? | radio | Sim / Não |
| Desmaios? | radio | Sim / Não |
| Doenças do Aluno | multiselect (checkboxes) | Asma / Bronquite / Diabetes / Epilepsia / Hipertensão / Reumatismo / Nenhuma |
| Doenças Contagiosas | multiselect (checkboxes) | Catapóra / Caxumba / Coqueluche / Escarlatina / Rubéola / Sarampo / Nenhuma |
| Já fez cirurgia? Qual? | textarea | - |
| Já teve acidente grave? | textarea | - |
| Outro problema de saúde? | textarea | - |
| Faz tratamento médico? | textarea | - |
| Possui Temores? | textarea | - |
| Toma medicamento regularmente? | textarea | - |
| Medicamentos Adicionais Autorizados | lista dinâmica | Botão adicionar |

### Alergias
| Campo | Tipo | Opções |
|-------|------|--------|
| Alergias do Aluno | multiselect (checkboxes) | Alergia a Alimentos / Alergia a Medicamentos / Alergia ao Látex / Dermatite de Contato / Eczema / Picadas de Insetos / Urticária / Nenhuma |
| Alérgico a algum medicamento? Detalhar | textarea | - |
| Outras Alergias | textarea | - |

### Vacinas
| Campo | Tipo | Opções |
|-------|------|--------|
| Anexar Carteirinha de Vacinação | file upload | - |
| Anexar Declaração Pediatra sobre Vacinação | file upload | - |
| Vacinas do Aluno | multiselect (checkboxes) | Anti-Tifoide / BCG Intra-dérmica / BCG Oral / Sabim / Sarampo / Tríplice / Varíola |
| Tipo Sanguíneo | select | O+ / A+ / B+ / AB+ / O- / A- / B- / AB- |

### Restrições Alimentares
| Campo | Tipo | Opções |
|-------|------|--------|
| Descrição das Restrições Alimentares | textarea | - |
| Come Sozinho? | radio | Sim / Não |

### Higiene
| Campo | Tipo | Opções |
|-------|------|--------|
| Usa Fraldas? | radio | Sim / Não / Só para dormir |
| Pede para ir ao Banheiro? | radio | Sim / Não |
| Necessita de Cuidado Extra? | textarea | - |

### Plano de Saúde e Hospital
| Campo | Tipo | Observação |
|-------|------|------------|
| Operadora Plano de Saúde | text | - |
| Tipo Plano | text | - |
| Nº Plano de Saúde | text | - |
| Hospital de referência (remoção) | text | - |

---

## NOTAS DE IMPLEMENTAÇÃO

1. **Campos obrigatórios** devem ser validados antes de salvar.
2. **Idade** deve ser calculada automaticamente a partir da Data de Nascimento.
3. **CEP** deve integrar com API dos Correios para preenchimento automático de Logradouro, Bairro, Município, UF e País.
4. **RM** pode ser gerado automaticamente com configuração de sequência.
5. **Listas dinâmicas** (Emergência, Autorizados a Retirar, Composição Familiar, Medicamentos) devem permitir adicionar, editar e remover entradas.
6. **Upload de arquivos** (foto, atestados, carteirinha de vacinação) devem suportar imagens e PDFs.
7. **Nome Social**: se "Sim" for selecionado, exibir campo adicional para o nome social.
8. **Endereço no exterior**: se marcado, ocultar consulta de CEP e ajustar campos de endereço.
9. **Copiar endereço do Responsável Financeiro**: preencher automaticamente os campos de endereço do campo correspondente.
10. As abas **Mãe**, **Pai**, **Outro(a)** e **Responsável Pedagógico** devem indicar quem é o Responsável Financeiro (apenas um pode ser marcado) e quem é o Responsável Pedagógico (pode ser mais de um).
