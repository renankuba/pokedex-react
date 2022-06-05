import Pokemon from '../../model/Pokemon';
import './MainScreen.css';
import PokemonListView from './PokemonListView';
import PokemonView from './PokemonView';

type props = {
    selectedPokemon?: Pokemon | Array<Pokemon>,
    on: boolean
}
const MainScreen = ({selectedPokemon, on}:props) => {
    const shouldRenderPokemonView = selectedPokemon && !Array.isArray(selectedPokemon);
    const shouldRenderPokemonListView = selectedPokemon && Array.isArray(selectedPokemon);

    return <div className={`screen ${on?'on':'off'}`}>
    {shouldRenderPokemonView && <PokemonView 
        pokemon={selectedPokemon}
    />}
    {shouldRenderPokemonListView && <PokemonListView 
        pokemons={selectedPokemon}
        cursor={0}
    />}
    </div>
} 

export default MainScreen;