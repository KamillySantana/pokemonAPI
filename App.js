import React, { useState } from "react";

function App() {
    // pokemonValores exibe, e o set modifica
    // quando usamos useState({}) - pokemonValores com um objeto vazio.
    // pokemonValores é um objeto que armazenará nome, imagem, número na Pokédex, tipo, peso, altura e imagem shiny.
    // A função setPokemonValores será usada para atualizar esse objeto quando necessário.
    const [pokemonValores, setPokemonValores] = useState({});

    // aqui nessa cont é apenas para localizarmos o pokemon a partir do nome dele
    const [pokemonName, setPokemonName] = useState("");

    const [erro, setErro] = useState("")

    async function pesquisaPokemon() {

        // Constrói a URL da PokeAPI com base no nome do Pokémon
        // o nome do Pokémon fornecido pelo usuário é inserido na URL, e toLowerCase() é usado para garantir que o nome do Pokémon esteja em letras minúsculas
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`

        // try é uma ferramenta para fazer erros especificos do JS
        try {
            //o fetch acessa a url, acessando do metodo GET, todas as informações da url esta salvando dentro de resposta
            // await fala pro js q ele tem q esperar, enquanto nao porcessar essa linha do fetch nao vai pra linha de baixo
            let resposta = await fetch(url)

            //transforma a resposta em jason, conseguimos manipular agr os dados
            // JSON para estruturar as informações trafegadas
            resposta = await resposta.json()

            //=====================================================================================

            // comparação gif e img
            // é criado uma variavel let em string vazia e faz uma comparação de img de pokemon animada ou nao
            let pokeNormal = ""
            if (resposta.sprites.versions["generation-v"]["black-white"].animated.front_default) {
                pokeNormal = resposta.sprites.versions["generation-v"]["black-white"].animated.front_default
            } else {
                pokeNormal = resposta.sprites.front_default
            }

            let pokeShiny = ""
            if (resposta.sprites.versions["generation-v"]["black-white"].animated.front_shiny) {
                pokeShiny = resposta.sprites.versions["generation-v"]["black-white"].animated.front_shiny
            } else {
                pokeShiny = resposta.sprites.front_shiny
            }

            //==================================================================================

            // aqui é um objeto que contêm informações sobre o Pokémon.
            // Essas informações são extraídas de resposta, entao colocamos os valores de acordo com a API.
            // cada uma dela é armazenada na propriedade, ex nome: resposta.name - Armazena o nome do Pokémon na propriedade nome.
            setPokemonValores({
                nome: resposta.name,
                imagem: pokeNormal,
                imagemShiny: pokeShiny,
                num: resposta.id,
                tipo: resposta.types[0].type.name,
                peso: resposta.weight,
                altura: resposta.height,
                habi: resposta.abilities[0].ability.name
            })

            // aqui estou definindo setErro como vazio pq ele vai limpar o erro para exibir o pokemon
            setErro("")

        } catch {
            setErro("Não foi possível encontrar o Pokémon. Verifique o nome e tente novamente.");
        }
    }

    function pegar(pegar){
        // setPokemonName é para sempre atualizar o pokemonName com dos dados do input digitados pelo usuario
        // value obtém o valor atual desse elemento, que é o conteúdo do input. No contexto do seu código, isso seria o nome do Pokémon inserido pelo usuário.
        setPokemonName(pegar.target.value)
    }

    return (
        <div className="App">
            <h1>Pokédex</h1>
            <div>
                {/*Sempre que o usuário digita algo no input, a função pegar é chamada com o onchange que é importante para atualizar sempre em tempo real, atualizando o estado pokemonName com o conteúdo atual do input.*/}
                <input type="text" placeholder="Um pokemon" onChange={pegar} />
                <button onClick={pesquisaPokemon}>Pesquisar Pokemon</button>
            </div>

            {/*Aqui estamos terminanado a varificação do try e catch*/}
            {/*se erro for diferente de vazio, significa que o pokemon foi encontrado na API*/}
            {/*a gente o ? como if que vai exibir o erro e : para ser o else que vai exibir o pokemon*/}
            {erro !== "" ? (
                <div>
                    <h1>{erro}</h1>
                    <img src="/img/picachutriste.png" />
                </div>
            ) : (
                <div>
                    {/* O texto exibido é obtido do pokemonValores e é renderizado automaticamente.*/}
                    <h2>{pokemonValores.nome}</h2>
                    <img src={pokemonValores.imagem} />
                    <p>Shiny</p>
                    <img src={pokemonValores.imagemShiny} />
                    <p>número da Pokedex: {pokemonValores.num}</p>
                    <p>Tipo: {pokemonValores.tipo}</p>
                    <p>Peso: {pokemonValores.peso}kg</p>
                    <p>Altura: {pokemonValores.altura}m</p>
                    <p>Habilidades: {pokemonValores.habi}</p>
                </div>
            )}
        </div>
    );
}

export default App;
