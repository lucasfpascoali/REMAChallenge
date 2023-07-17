# REMA CHALLENGE
Esse repositório foi feito para o processo seletivo da REMA-UFSC

# Como usar:
Primeiramente, rode o seguinte comando para instalar as dependências do projeto:
```npm install```

E para executar o servidor rode:
```npm start```

Ou se preferir roder no modo dev:
```npm run dev```

Os dois comandos para rodar primeiramente executam o arquivo scripts/convertCSVToJSON.js,
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

# Hipóteses:

## Primeira Hipótese: Cálculo da Emissão de Carbono

Eu não achei a fórmula para o cálculo de emissões de carbono, mas como a unidade de medida do fator de emissão de carbono é tCO2/MWh, assumi que a quantidade de emissão dividida pelo energia consumida resulta no fator de emissão de carbono, logo, se multiplicarmos o fator de emissão pela quantidade de enrgia consumida, temos a quantidade de carbono emitido!

## Segunda Hipótese: Fatores de Emissão para Estados da Região Norte antes de 2011

O desafio fornecia dados para o Sistema Isolado do Amazonas (SIA) de 2011 até 2015 e dizia que após esse ano, o SIA foi integrado ao Sistema Interligado Nacional (SIN). Porém o SIN vai de 2006 até 2022, logo os estados do norte não tem fatores de emissão anteriores à 2011, certo? Por isso, fiz uma regra de negócio que impede o usuário de registrar fontes de emissão anteriores à 2011 dos estados da região norte.

## Terceira Hipótese: Fatores de Emissão após 2022

Essa parece meio óbvia, mas estou anotando ela assim mesmo, como não há dados de fatores de emissão após 2022 (ainda), o usuário não consegue inserir datas posteriores à 2022.


