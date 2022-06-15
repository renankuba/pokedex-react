import Pokemon from "../../model/Pokemon";
import './PokemonListView.css';

type props = {
    pokemons: Array<Pokemon>
    cursor: number
}
const PokemonListView = ({ pokemons, cursor }: props) => {
    const pokemonsPerPage = 6;
    let page = Math.floor(cursor / pokemonsPerPage );
    return <div className={'pokemon-list-view'}>
        {pokemons.slice(page*pokemonsPerPage,pokemonsPerPage*(page+1)).map(p => <div
            className={`${(cursor+1)==p.number?'selected-pokemon-item':''}`}
            key={`pokemon-list-${p.number}`}
            id={`pokemon-list-${p.number}`}>
            {`${p.number}.${p.name}`}
        </div>)}
    </div>
}

export default PokemonListView;