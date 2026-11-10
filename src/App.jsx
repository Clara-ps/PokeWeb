
import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard.jsx";
import PokemonDetails from "./PokemonDetails.jsx";

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const [nome, setNome] = useState("");
    const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
    const [todosPokemons, setTodosPokemons] = useState([]);
    const [nomesCarregados, setNomesCarregados] = useState(false);
    const [tipos, setTipos] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState("");
    const [quantidadeTipo, setQuantidadeTipo] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [temProxima, setTemProxima] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [erroNomes, setErroNomes] = useState(false);
    const [erroTipos, setErroTipos] = useState(false);
    
    
    useEffect(() => {

        async function buscarPokemons() {

            if (nome.trim() !== "" && !nomesCarregados && tipoSelecionado === "") {
                return;
            }

            setCarregando(true);
            setErro("");

            try {
                let resultados;

                if (tipoSelecionado !== "") {

                    // Busca os Pokémon pertencentes ao tipo selecionado.
                    const resposta = await fetch(
                        `https://pokeapi.co/api/v2/type/${tipoSelecionado}`
                    );

                    if (!resposta.ok) {
                        throw new Error("Erro ao buscar tipo.");
                    }

                    const dados = await resposta.json();

                    setQuantidadeTipo(dados.pokemon.length);

                    resultados = dados.pokemon.map(
                        (item) => item.pokemon
                    );

                    // Permite pesquisar pelo nome dentro do tipo.
                    if (nome.trim() !== "") {
                        resultados = resultados.filter((pokemon) => {
                            const pesquisa = nome.toLowerCase().trim();
                            const id = pokemon.url.split("/").filter(Boolean).pop();

                             return pokemon.name.includes(pesquisa) || id === pesquisa;
                        });
                    }

                    setTemProxima(false);

                } else if (nome.trim() !== "") {

                    // Pesquisa entre todos os Pokémon.
                    resultados = todosPokemons.filter((pokemon) => {
                        const pesquisa = nome.toLowerCase().trim();
                        const id = pokemon.url.split("/").filter(Boolean).pop();

                        return pokemon.name.includes(pesquisa) || id === pesquisa;
                    });

                    resultados = resultados.slice(0, 20);

                    setTemProxima(false);

                } else {

                    // Listagem normal com paginação.
                    const resposta = await fetch(
                        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pagina * 20}`
                    );

                    if (!resposta.ok) {
                        throw new Error("Erro ao buscar Pokémon.");
                    }

                    const dados = await resposta.json();

                    resultados = dados.results;

                    setTemProxima(dados.next !== null);
                }

                // Busca os detalhes dos Pokémon encontrados.
                const detalhes = await Promise.all(
                    resultados.map(async (pokemon) => {
                        const resposta = await fetch(pokemon.url);

                        if (!resposta.ok) {
                            throw new Error("Erro ao buscar detalhes.");
                        }

                        return await resposta.json();
                    })
                );

                setPokemons(detalhes);

            } catch (erro) {
                setErro("Não foi possível carregar os Pokémon. Tente novamente.");
                setPokemons([]);
                console.error(erro);

            } finally {
                setCarregando(false);
            }
        }

        buscarPokemons();

    }, [pagina, nome, todosPokemons, nomesCarregados, tipoSelecionado]);

    useEffect(() => {
        async function buscarNomes() {
            try {
                const resposta = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=2000"
                );

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar nomes.");
                }

                const dados = await resposta.json();

                setTodosPokemons(dados.results);

            } catch (erro) {
                console.error(erro);
                setErroNomes(true);

            } finally {
                setNomesCarregados(true);
            }
        }

        buscarNomes();

    }, []);

    useEffect(() => {
        async function buscarTipos() {
            try {
                const resposta = await fetch(
                    "https://pokeapi.co/api/v2/type"
                );

                if (!resposta.ok) {
                throw new Error("Erro ao buscar tipos.");
                }

                const dados = await resposta.json();

                setTipos(dados.results);

            } catch (erro) {
                console.error(erro);
                setErroTipos(true);
            }
        }

        buscarTipos();

    }, []);

    return (
        <main>
            <h1>POKÉDEX</h1>

            <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                disabled={erroNomes}
            />

            {carregando && <p>Carregando...</p>}

            {erro && <p>{erro}</p>}

            {erroNomes && (
                <p>Não foi possível carregar a lista de Pokémon para pesquisa.</p>
            )}

            {erroTipos && (
                <p>Não foi possível carregar os tipos de Pokémon.</p>
            )}

        <select
            value={tipoSelecionado}
            onChange={(event) => {
                setTipoSelecionado(event.target.value);
                setNome("");
                setPagina(0);
            }}
        >
            <option value="">Todos os tipos</option>

            {tipos.map((tipo) => (
                <option key={tipo.name} value={tipo.name}>
                    {tipo.name}
                </option>
            ))}
        </select>

        {tipoSelecionado !== "" && (
            <p>
                Existem {quantidadeTipo} Pokémon do tipo {tipoSelecionado}.
            </p>
        )}

            {!carregando && !erro && (
                <>
                    {pokemons.length > 0 ? (
                        <section className="pokemon-list">
                                {pokemons.map((pokemon) => (
                                    <PokemonCard
                                        key={pokemon.id}
                                        pokemon={pokemon}
                                        onClick={() => setPokemonSelecionado(pokemon)}
                                    />
                                ))}
                        </section>
                    ) : (
                        <p>Nenhum Pokémon encontrado.</p>
                    )}
                </>  
            )}      

            {nome.trim() === "" && tipoSelecionado === "" && (
                <div className="paginacao">
                    <button
                        onClick={() => setPagina(pagina - 1)}
                        disabled={pagina === 0 || carregando}
                    >
                        Anterior
                    </button>

                    <span> Página {pagina + 1} </span>

                    <button
                        onClick={() => setPagina(pagina + 1)}
                        disabled={!temProxima || carregando}
                    >
                        Próxima
                    </button>
                </div>
            )}

            {pokemonSelecionado && (
                <PokemonDetails
                    pokemon={pokemonSelecionado}
                    onClose={() => setPokemonSelecionado(null)}
                />
            )}
        </main>
    );
}
