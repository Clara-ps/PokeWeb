
export default function PokemonCard({ pokemon, onClick }) {
    return (
        <article className="pokemon-card">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />

            <h3>{pokemon.name}</h3>

            <p>Id: {pokemon.id}</p>

            <p>
                Tipos: {pokemon.types.map((tipo) => tipo.type.name).join(", ")}
            </p>

            <button onClick={onClick}>Ver detalhes</button>
        </article>
    );
}


//   const sprite =
//     pokemon.sprites.other['official-artwork'].front_default ||
//     pokemon.sprites.front_default;
