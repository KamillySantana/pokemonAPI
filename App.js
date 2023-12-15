import React, {useEffect, useState} from "react";
import css from ".//App.css"

function App() {
    // pokemonValores exibe, e o set modifica
    // quando usamos useState({}) - pokemonValores com um objeto vazio.
    // pokemonValores é um objeto que armazenará nome, imagem, número na Pokédex, tipo, peso, altura e imagem shiny.
    // A função setPokemonValores será usada para atualizar esse objeto quando necessário.
    const [pokemonValores, setPokemonValores] = useState({});

    // aqui nessa cont é apenas para localizarmos o pokemon a partir do nome dele
    const [pokemonName, setPokemonName] = useState("");

    //ERRO
    const [erro, setErro] = useState("")

//============================CARREGAR POKEMON QUANDO DIGITAR===================================================================
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

//============================CARREGAR A PAGINA===================================================================
    async function pokemonSorteado(){
        var pokeAle = Math.floor(Math.random() * 649)
        let url = `https://pokeapi.co/api/v2/pokemon/${pokeAle}`

        try {
            let resposta = await fetch(url);
            resposta = await resposta.json();

            setPokemonValores({
                nome: resposta.name,
                imagem: resposta.sprites.versions["generation-v"]["black-white"].animated.front_default,
                imagemShiny: resposta.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
                num: resposta.id,
                tipo: resposta.types[0].type.name,
                peso: resposta.weight,
                altura: resposta.height,
                habi: resposta.abilities[0].ability.name,
            });

            setErro("");
        } catch {
            setErro("Não foi possível carregar um Pokémon aleatório.");
        }
    }

    //carrega tudo que estiver dentro de pokemonSorteado quando o site for inicializado
    useEffect(() => {
        pokemonSorteado()
    }, []);

//===============================================================================================
    function pegar(pegar){
        // setPokemonName é para sempre atualizar o pokemonName com dos dados do input digitados pelo usuario
        // value obtém o valor atual desse elemento, que é o conteúdo do input. No contexto do seu código, isso seria o nome do Pokémon inserido pelo usuário.
        setPokemonName(pegar.target.value)
    }

//===============================================================================================
    return (
        <div className="App">
            <h1 className="agazinho">PESQUISAR POKEMON</h1>
            <div className="banana">
                {/*Sempre que o usuário digita algo no input, a função pegar é chamada com o onchange que é importante para atualizar sempre em tempo real, atualizando o estado pokemonName com o conteúdo atual do input.*/}
                <input className="input" type="text" placeholder="Um pokemon" onChange={pegar} />
                <button className="custom-btn btn-11" onClick={pesquisaPokemon}>Pesquisar</button>
            </div>

            {/*Aqui estamos terminanado a varificação do try e catch*/}
            {/*se erro for diferente de vazio, significa que o pokemon foi encontrado na API*/}
            {/*a gente o ? como if que vai exibir o erro e : para ser o else que vai exibir o pokemon*/}
            {erro !== "" ? (
                <div>
                    <h1 className="erro">{erro}</h1>
                    <img className="pikachu" src="/img/picachutriste.png" />
                </div>
            ) : (
                <div>
                    {/* O texto exibido é obtido do pokemonValores e é renderizado automaticamente.*/}
                    <div className="graal">
                        <h3 className="h2o">Pokemon: {pokemonValores.nome}</h3>
                        <div className="grid">
                            <div className="nar">
                                <p>Normal</p>
                                <img className="ima" src={pokemonValores.imagem} />
                            </div>
                            <div className="nar">
                                <p>Shiny</p>
                                <img className="ima" src={pokemonValores.imagemShiny} />
                            </div>
                            <div>
                                <p className="vra">Número da Pokedex: {pokemonValores.num}</p>
                                <p className="vra">Tipo: {pokemonValores.tipo}</p>
                                <p className="vra">Peso: {pokemonValores.peso}kg</p>
                                <p className="vra">Altura: {pokemonValores.altura}m</p>
                                <p className="vra">Habilidades: {pokemonValores.habi}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
