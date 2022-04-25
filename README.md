## PokeCoin - BackEnd  
Um pesquisador descobriu uma correlação monetária inesperada com relação a estes
monstros virtuais. Com a alta do interesse por estes, após a criação do Pokémon Go, e o crescimento
do uso de criptomoedas, blockchain e NFTs, este fato ficou cada vez mais evidente. A teoria é que a
base de experiência (“base_experience”) de um Pokémon possui uma relação direta com sua cotação
em Bitcoin (BTC). De forma que um ponto de experiência equivale a um satoshi (0.00000001 BTC).  
**Esta teoria é uma construção lúdica para o contexto do exercício e sem aplicação direta esperada no mundo real.**  
Esse respositório contém o código fonte do backend do PokeCoin, que foi feito em **Node** e **MongoDB**.  
O PokeCoin permite que o usuário realize compras e vendas de pokemons, além de acompanhar a valorização de sua carteira e o histórico de transações.  
O frontend dessa aplicação pode ser encontrado [aqui](https://github.com/nicaloribeiro/pokecoin-frontend).  

- - - 
### Requisitos para rodar o sistema
- Gerenciador de pacotes 
~~~
yarn ou npm
~~~
- Arquivo de variáveis de ambiente  
É necessário um arquivo com as variaveis de ambiente. Nesse projeto foram utilizadas duas: 
~~~
MONGO_DB_URL  => Url de acesso ao banco de dados (default mongodb://localhost:27017)
COINBASE_API => Url da api que fornece a cotação de bitcoin em dólar (default https://api.coinbase.com/v2/prices/spot?currency=USD)
~~~
- - -

### Inicialização
- Realize a instalação dos pacotes  

~~~  
yarn install ou npm install  
~~~  

- Inicie o projeto  
~~~
yarn dev ou npm run dev  
~~~

- O projeto estará rodando no seguinte link, onde as requisições podem ser testadas:  
~~~
http://localhost:5000/api/
~~~

### Rotas
- GET /pokemon/all  
Retorna todos os pokemons que foram adquiridos  
- GET /transactions/all  
Retorna o histórico de transações  
- GET /api/pokemon/all/actives  
Retorna a lista dos pokemons que estão ativos na carteira  
- POST /pokemon/buy
Registra a aquisição de um pokemon  
~~~
body {
    "pokemonId": ID_DO_POKEMON ,
    "pokemonName": "NOME_DO_POKEMON",
    "pokemonExperience": EXPERIENCIA_DO_POKEMON,
    "pokemonSpriteUrl": "URL_DA_SPRITE_DO_POKEMON",
    "pokemonType": "TIPO_DO_POKEMON"
}
~~~  
- POST /api/pokemon/sell/:pokemonID  
Registra a venda de um pokemon.  
O pokemonID é o _id do documento onde o pokemon adquirido está salvo



### O projeto completo pode ser acessado aqui : https://salty-shore-31797.herokuapp.com/
