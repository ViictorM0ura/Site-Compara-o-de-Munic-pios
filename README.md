🌐 Comparação de Municípios
📝 Descrição
Este projeto é uma plataforma interativa para comparar dados de municípios ao longo de diferentes anos (2000, 2010 e 2022). O sistema permite que os usuários selecionem dois municípios e visualizem uma comparação das áreas de cada município nos três anos, exibida em tabelas e gráficos interativos.

Funcionalidades Principais:
Comparação de Dados: Permite comparar dois municípios, exibindo informações sobre a área de cada município em três anos diferentes.

Gráficos Interativos: Utiliza a biblioteca Chart.js para mostrar gráficos de barras, facilitando a comparação visual.

Troca de Tema: Oferece a opção de alternar entre o tema claro e escuro para melhorar a experiência do usuário.

Dashboard Interativo: A interface oferece um dashboard onde os usuários podem selecionar o ano desejado e visualizar as comparações de dados por município.

Como Funciona:
O usuário escolhe dois municípios na página de Comparação de Municípios.

A plataforma busca os dados correspondentes aos anos de 2000, 2010 e 2022 do banco de dados e exibe a comparação das áreas de cada município.

Além da tabela de dados, um gráfico de barras é gerado para uma visualização mais clara da comparação entre os municípios.

Também existe a opção de comparar os dados de diferentes anos diretamente no Dashboard de Dados.

🛠️ Tecnologias Utilizadas:
HTML/CSS: Para estruturação e estilo da página.

JavaScript: Para interação com o usuário, manipulação de dados e exibição dinâmica dos gráficos.

Chart.js: Biblioteca para criação de gráficos interativos.

SQLite: Banco de dados utilizado para armazenar e fornecer os dados dos municípios.

Node.js: Servidor para gerenciar as requisições de dados do front-end.

⚙️ Estrutura de Arquivos:
```
/public
  ├── index.html          # Página inicial (Dashboard de Dados)
  ├── comparacao.html     # Página para comparação de dados entre anos
  ├── municipios.html     # Página para comparar municípios
  ├── CSS/
      └── style.css       # Arquivo de estilos
  ├── javaScript/
      ├── script.js       # Lógica para manipulação de dados no Dashboard
      ├── municipios.js   # Lógica para comparação de municípios
  ├── images/
      └── imagem.jpg      # Imagem de fundo
  ├── db.js               # Configuração do banco de dados SQLite
````
