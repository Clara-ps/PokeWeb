export default function PokemonDetails({ pokemon, onClose }) {
    if (!pokemon) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>

                <button className="fechar-modal" onClick={onClose}>X</button>

                <h2>{pokemon.name}</h2>
                <p>#{pokemon.id}</p>

                <div className="sprites">
                    <div>
                        <p>Frente</p>
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} de frente`}
                        />
                    </div>

                    <div>
                        <p>Verso</p>
                        <img
                            src={pokemon.sprites.back_default}
                            alt={`${pokemon.name} de costas`}
                        />
                    </div>
                </div>

                <p>Altura: {pokemon.height / 10} m</p>
                <p>Peso: {pokemon.weight / 10} kg</p>

                <h3>Habilidades</h3>

                <ul>
                    {pokemon.abilities.map((habilidade) => (
                        <li key={habilidade.ability.name}>
                            {habilidade.ability.name}
                        </li>
                    ))}
                </ul>

                <h3>Estatísticas</h3>

                <ul>
                    {pokemon.stats.map((estatistica) => (
                        <li key={estatistica.stat.name}>
                            {estatistica.stat.name}: {estatistica.base_stat}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
