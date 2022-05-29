import Pokemon from '../../model/Pokemon';
import './MainScreen.css';
import PokemonView from './PokemonView';

type props = {
    selectedPokemon?: Pokemon,
    on: boolean
}
const MainScreen = ({selectedPokemon, on}:props) => <div className={`screen ${on?'on':'off'}`}>
    {selectedPokemon?.number && <PokemonView 
        pokemon={selectedPokemon}
    />}
</div>

export default MainScreen;