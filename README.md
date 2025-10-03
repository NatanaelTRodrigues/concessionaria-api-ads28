# API REST CONCESSIONÁRIA DE VEÍCULOS (ADS28 - BACKEND)

##  Status do Projeto
 **CONCLUÍDO**

##  Descrição
API RESTful desenvolvida em **Node.js** com framework **Express**, seguindo arquitetura baseada em recursos (Resource-Oriented Architecture). O projeto simula o sistema de gerenciamento de uma concessionária de veículos, implementando as cinco entidades principais com operações **CRUD** (Create, Read, Update, Delete) completas. Os dados são armazenados temporariamente em memória (Arrays).

---

##  Equipe de Desenvolvimento (Colaboradores)

Abaixo estão os nomes, matrículas e usuários GitHub dos membros da equipe que contribuíram para o projeto. O histórico de commits no Git reflete a distribuição de tarefas abaixo.

| Nome do Integrante | Matrícula | Usuário GitHub | Principais Contribuições |


| **Natanael R. Rodrigues** | 24114290098 | `NatanaelTRodrigues` | Setup Inicial da API (`index.js`), CRUDs de **Veículos** e **Vendas**, e Documentação Final do Projeto. |


| **Gabriel** | 24114290032 | `Gb-Rodrigues7` | Implementação dos CRUDs de **Clientes** e **Modelos/Marcas**, e criação da **Collection do Postman**. |


| **Freud** | 24214290052 | `freudfrederick` | Configuração dos **5 Módulos de Dados** (Models) em memória e implementação do CRUD da entidade **Vendedores**. |

---

##  Tecnologias Utilizadas
* **Node.js** (Ambiente de Execução)
* **Express.js** (Framework Web)
* **Nodemon** (Dev Dependency para *live-reload*)

##  Como Instalar e Executar

Siga os passos abaixo para colocar a API em funcionamento na sua máquina:

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/NatanaelTRodrigues/concessionaria-api-ads28
   cd concessionaria-api-ads28
Instale as Dependências:
O projeto requer apenas as dependências listadas no package.json.

Bash

npm install
Inicie o Servidor:
A API será executada com o Nodemon, que reinicia o servidor automaticamente em caso de mudanças no código.

Bash

npm start
A API estará acessível em http://localhost:3000.

 Endpoints da API (Detalhes do CRUD)
Todos os endpoints utilizam o prefixo http://localhost:3000/.

Recurso	Método HTTP	Rota Base	Exemplo de Rota	Funcionalidade	Validação de Dados
Veículos	GET / POST / PUT / DELETE	/veiculos	/veiculos/1	Gerencia os carros disponíveis para venda.	Campos obrigatórios: nome, ano, preco.
Clientes	GET / POST / PUT / DELETE	/clientes	/clientes/1	Cadastro de clientes.	Campos obrigatórios: nome, email.
Vendedores	GET / POST / PUT / DELETE	/vendedores	/vendedores/1	Cadastro de colaboradores (equipe de vendas).	Campos obrigatórios: nome, matricula, area.
Modelos/Marcas	GET / POST / PUT / DELETE	/modelos	/modelos/101	Cadastro de modelos de veículos (Ex: Ford, SUV).	Campos obrigatórios: marca, nome, tipo.
Vendas	GET / POST / PUT / DELETE	/vendas	/vendas/1	Registro de transações de venda.	Campos obrigatórios e validação de existência dos IDs de Veículo, Cliente e Vendedor.

Exportar para as Planilhas
 Testes e Documentação Adicional
Todos os endpoints podem ser testados utilizando o arquivo de coleção exportado:

Arquivo de Coleção: postman_collection.json

Como Usar: Importe este arquivo diretamente no Postman para acessar todas as 20 requisições (GET, POST, PUT, DELETE para cada recurso), já pré-configuradas com URLs e exemplos de Body (JSON) para POST e PUT.
