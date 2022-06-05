import Pokemon from "../../model/Pokemon";
import './PokemonListView.css';

type props = {
    pokemons: Array<Pokemon>
    cursor: number
}
const PokemonListView = ({ pokemons, cursor }: props) => <div className={'pokemon-list-view'}>
    {pokemons.slice(0,6).map((p, i) => <div
        key={`pokemon-list-${p.number}`}
        id={`pokemon-list-${p.number}`}>
        {`${p.number}.${p.name}`}
    </div>)}
</div>

export default PokemonListView;