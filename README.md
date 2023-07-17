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