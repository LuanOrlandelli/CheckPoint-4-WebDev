# CheckPoint 4 - Web Development

### Integrantes
- Luan Orlandelli Ramos (554747)
- Jorge Luiz Silva Santos (554418)
- Igor Nascimento Medeiros (555337)
- Arthur Bobadilla Franchi (555056)

## Descrição da Aplicação

**EcoTrend** é um e-commerce especializado em produtos sustentáveis e ecológicos, projetado para promover um estilo de vida mais consciente e sustentável. A aplicação implementa uma série de funcionalidades interativas e técnicas de desenvolvimento web, conforme detalhado a seguir:

### Funcionalidades Implementadas

1. **Manipulação do DOM**
   - **Carrinho de Compras Dinâmico**: Permite aos usuários adicionar produtos ao carrinho com atualizações instantâneas na página. O carrinho pode ser acessado através de um ícone na barra de navegação, que exibe a quantidade total de itens.
   - **Filtragem de Produtos**: Sistema de filtros dinâmicos para categorizar produtos (por categoria e preço), atualizando a exibição sem recarregar a página.

2. **Storage e JSON**
   - **Persistência do Carrinho de Compras**: Utiliza `localStorage` para salvar o estado do carrinho, permitindo que os itens adicionados sejam mantidos entre sessões.
   - **Carregamento de Produtos**: Carrega dados de produtos a partir de um arquivo `JSON` e exibe-os dinamicamente na página.

3. **Requisições Assíncronas com Ajax e Fetch**
   - **Integração com API Falsa**: Simula um backend com JSON Server para realizar operações de GET, POST, PUT e DELETE para gerenciar produtos e pedidos.
   - **Atualização Dinâmica de Produtos**: Permite ao administrador adicionar, editar ou remover produtos através de requisições assíncronas para a Fake API, com atualização automática da página.

4. **Promises e Assíncrono**
   - **Checkout Simulado**: Simula o processo de finalização de compra usando promises. Inclui validação de dados e exibição de mensagens de sucesso ou erro de forma assíncrona.
   - **Carregamento de Dados com Loading Spinner**: Adiciona um spinner de carregamento para melhorar a experiência do usuário enquanto os dados estão sendo buscados ou processados.

### Arquitetura da Aplicação

- **Estrutura de Arquivos**:
  - `index.html`: Estrutura principal da página, incluindo cabeçalho, seções de produtos e carrinho, e modal de adição/remoção de produtos.
  - `main.js`: Script JavaScript responsável por manipulação do DOM, gerenciamento do carrinho de compras, filtragem de produtos, requisições assíncronas e simulação de checkout.
  - `main.css`: Arquivo css utilizado para a estilização do projeto, deixando-o mais atrativo e agradável para o usuário.
  - `products.json`: Arquivo JSON contendo dados de produtos para exibição inicial.

**Nota:** A aplicação foi testada e todas as funcionalidades estão operacionais, atendendo aos requisitos do desafio proposto.
