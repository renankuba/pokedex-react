import Pokemon from '../../model/Pokemon';
import './MainScreen.css';
import PokemonView from './PokemonView';

type props = {
    selectedPokemon?: Pokemon
}
const MainScreen = ({selectedPokemon}:props) => <div className={`screen ${selectedPokemon?.number?'on':'off'}`}>
    {selectedPokemon?.number && <PokemonView 
        pokemon={selectedPokemon}
    />}
</div>

export default MainScreen;