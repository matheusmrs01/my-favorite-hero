## Descrição

Esse projeto foi criado em [Nestjs](https://github.com/nestjs/nest) e utilizando a api da [Marvel for developers](https://developer.marvel.com/) para buscar os heróis de sua escolha. A ideia principal é listar todos os hérois da Marvel que comecem com determinado nome, e, desses heróis, é possível marcar e desmarcar os favoritos, além de listá-los.

## Instalação
A instalação pode ser feita de 2 maneiras, utilizando o Docker ou rodando o projeto na máquina.

Lembrando que em ambas as instalações, é necessário que crie um arquivo `.env` na raiz do projeto, esse arquivo vai conter as seguintes variáveis:
```
APP_NAME='my-favorite-hero'

API_MARVEL_URL='https://gateway.marvel.com:443'

API_MARVEL_TS=1
API_MARVEL_PRIVATE_KEY='Chave privada que é pega no site na marvel'
API_MARVEL_PUBLIC_KEY='Chave publica que tambem é pega no site na marvel'
```

## Docker
```bash
# Basta rodar o seguinte comando na raiz do projeto.
$ docker build --pull --rm -f "Dockerfile" -t myfavoritehero:latest "."
```

Com isso você terá a imagem docker do projeto, e pode rodar do jeito que você preferir.


## Rodando o projeto diretamente na máquina

Para rodar o projeto na máquina primeiro você vai ter que ter instalado alguns itens, sendo eles:

- Node: Você pode instalar a versão `latest` do node. 
- Nestjs: Depois do node instalado, basta instalar o Nestjs globalmente com o comando --> npm i -g @nestjs/cli
- Após ter instalado o Nestjs globalmente, você vai precisar instalar as dependências do projeto, usando o comando --> npm install --force 


OBS: o --force é usado para poder instalar a dependência "@nestjs-addons/in-memory-db" que é utilizada para salvar os dados em memória, ela é uma lib mais antiga então não tem suporte para as versões mais novas do Nestjs, por isso deve ser forçada a ser instalada. Claro que isso acontece apenas porque esse ambiente é uma ambiente de testes, então, não tem problema a utilização dessa lib.

## Rodando o APP

```bash
# Lembrando que isso é apenas para quem fez a instalação na maquina.
$ npm run start:dev
```

## Testes

```bash
# Testes unitários
$ npm run test
```

## Rotas da API

Tanto quem fez a instalação na máquina quanto pelo Docker, vai ter acesso às rotas da aplicação, levando isso em consideração, vamos utilizar apenas os caminhos para explicar as rotas.

- GET -> ``/api/hero/${nome_do_herói}``: Essa rota é utilizada para retornar os dados da Marvel, onde na variável `nome_do_herói` vai ser utilizada para passar o nome do herói.
- GET -> `/api/hero`: Rota utilizada para retornar uma lista com os heróis favoritos.
- DELETE -> `/api/hero/${id_heroi}`: Rota utilizada para remover um herói da lista de favoritos, onde a variável `id_heroi` vai ser utilizada para passar o nome do herói.
- POST -> `/api/hero`: Rota utilizada para marcar um herói como favorito. Nessa rota deve ser passado um body com a seguinte estrutura:
```json
{
    "id": "123",
    "name": "Capitão américa",
    "description": "Descrição sobre o capitão américa"
}
```
