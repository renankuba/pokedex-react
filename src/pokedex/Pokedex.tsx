import ScreenBorder from './border/ScreenBorder';
import MainScreen from './screen/MainScreen';

const Pokedex = () => <div>
    <ScreenBorder>
        <MainScreen
            isOn={false}
        />
    </ScreenBorder>
</div>

export default Pokedex;