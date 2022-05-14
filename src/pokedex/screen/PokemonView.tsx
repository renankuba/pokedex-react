import Pokemon from "../../model/Pokemon";
import './PokemonView.css'

type props = {
    pokemon: Pokemon
}
const PokemonView = ({pokemon}:props) => <div className={'pokemon-view'}>
    <img src={pokemon.image} alt={pokemon.name} />
    {pokemon.name}
</div>

export default PokemonView;