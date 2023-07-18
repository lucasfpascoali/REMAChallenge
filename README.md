# REMA CHALLENGE
Esse repositório foi feito para o processo seletivo da REMA-UFSC. Peço que leia todo esse arquivo antes de usar o sistema.

# Como usar:
Primeiramente, rode o seguinte comando para instalar as dependências do projeto:
```npm install```

E para executar o servidor rode:
```npm start```

Ou se preferir rodar no modo dev (utiliza a dependência nodemon):
```npm run dev```

Os dois comandos para rodar, primeiramente executam o arquivo scripts/convertCSVToJSON.js,
que converte a tabela fornecida no desafio para um arquivo .json.
OBS: Como era permitido converter a tabela de .xlsx para .csv, eu fiz isso

# Linguagem e Framework escolhidos:

Eu escolhi realizar o desafio em javascript, pois além de permitir obter a maior nota máxima,
também é uma linguagem que eu já tinha um pouco de afinidade.

Utilizei o framework NodeJS para poder rodar javascript do lado do servidor.

# Dependências usadas:

## Express

O Express é um framework rápido e prático para lidar com requisições HTTP, ademais, eu já havia tido um pequeno contato com express.

## Multer

O multer é uma dependência que facilita tratar o upload de arquivos no site

## EJS

O EJS é uma view engine leve e rápida, além de ter uma sintaxe fácil para iniciantes

## SQLite e SQLite3

São dependências necessárias para usar o SQLite como banco de dados. Eu escolhi esse banco de dados para o projeto, pois na minha visão ele é uma das opções ideais. Ele é leve, rápido e prático para pequenos projetos como esse.

## CSVToJson

Utilizei essa dependência para converter o arquivo .csv para .json, ela facilita muito o trabalho

## PDFReader e PDF2Json

O PDFReader, que foi a dependência que escolhi, utiliza o PDF2Json como dependência, por isso que o projeto possui as duas. O PDFReader permitiu que eu conseguisse extrair dados de arquivos .pdf para concluir o desafio.

## Nodemon

É uma dependência de desenvolvimento que faz o auto reload do server a cada mudança, não é necessária para rodar o servidor, apenas se quiser rodar no modo dev. Instale-a usando: `npm install nodemon -D`

# Banco de Dados

## EmissionSource 

Obs: Os tipos suportados pelo SQLite são apenas integer, text, real e blob.

A única tabela do banco de dados é a EmissionSource que armazena os seguintes campos:
- id : integer PRIMARY KEY
- name : text NOT NULL
- consumptionAmount : real NOT NULL
- date : text NOT NULL
- state : text NOT NULL
- emission : real NOT NULL

O servidor cria a tabela automaticamente caso ela já não exista, então a database não possui nenhuma tabela até a primeira execução;

# Hipóteses:

## Primeira Hipótese: Cálculo da Emissão de Carbono

Eu não achei a fórmula para o cálculo de emissões de carbono, mas como a unidade de medida do fator de emissão de carbono é tCO2/MWh, assumi que a quantidade de emissão dividida pelo energia consumida resulta no fator de emissão de carbono, logo, se multiplicarmos o fator de emissão pela quantidade de enrgia consumida, temos a quantidade de carbono emitido!

Entretanto, o PDF com as instruções do desafio possuia uma ilustração na segunda página referente a opção 2 (fazer uma página web usando HTML, CSS e Javascript). Nessa ilustração, havia duas fontes de emissão: a primeira de Janeiro de 2020, no estado do Pará, possuía um consumo de 200 MWH e emissão de 67.08 tCO2 (suponho que sejam essas unidades de medidas). Se conferirmos na tabela fornecida pelo desafio, o fator de emissão de janeiro de 2020 é 0,0916 tCO2/MWh. Mas se dividirmos 67.08 por 200, temos 0,3354. O cálculo da segunda fonte da ilustração também não confere, então suponho que os dados da ilustração não são verídicos.

## Segunda Hipótese: Fatores de Emissão para Estados da Região Norte antes de 2011

O desafio fornecia dados para o Sistema Isolado do Amazonas (SIA) de 2011 até 2015 e dizia que após esse ano, o SIA foi integrado ao Sistema Interligado Nacional (SIN). Porém o SIN vai de 2006 até 2022, logo os estados do norte não tem fatores de emissão anteriores à 2011, certo? Por isso, fiz uma regra de negócio que impede o usuário de registrar fontes de emissão anteriores à 2011 dos estados da região norte.

## Terceira Hipótese: Fatores de Emissão após 2022

Essa parece meio óbvia, mas estou anotando ela assim mesmo, como não há dados de fatores de emissão após 2022 (ainda), o usuário não consegue inserir datas posteriores à 2022.

## Quarta Hipótese: Nome da Fonte de Emissão quando gerada por um PDF

Como o desafio não deixava explicíto como seria o nome de uma fonte de energia gerada pelo PDF, fiz um campo para usuário preencher o nome e selecionar o arquivo PDF depois.

## Quinta Hipótese: Conversão da Tabela para .json

Eu só extrai da tabela os dados necessários para o programa, ou seja, o arquivo .json não armazena as porcentages de etanol na gasolina ou de biodíesel, pois elas não são utilizadas no programa.

# Observações

## Pasta Scripts

Nessa pasta tem dois arquivos .js, o `convertCSVToJSON.js` é responsável por converter o arquivo `CSVData.csv` para .json toda vez que o server é iniciado, garantindo que caso excluam o arquivo .json, ele seja gerado novamente ou caso alterem a tabela CSV, o arquivo .json seja atualizado.

Já o arquivo `pdfParse.js` só é executado se chamado manualmente pelo comando `node scripts/pdfParse.js`.
Esse arquivo extrai a data de vencimento e o total consumido de uma conta de luz, em formato .pdf, e escreve esses dados em um arquivo .json que é criado dentro da pasta `data`.

## Pasta pdf

Dentro dessa pasta estão os dois arquivos .pdf fornecidos no desafio para testar o registro de uma fonte de emissão através de upload de um PDF

## Pasta data

Aqui fica o arquivo `CSVData.csv` que é a tabela .xlsx convertida manualmente em .csv, o arquivo `emissionFactorData.json` que é gerado toda vez que o servidor inicia e converte a tabela csv em json e também é usado posteriormente para pegar os fatores de emissão de carbono. Aqui também fica a `database.db`, que como o nove já diz, é nossa base de dados.