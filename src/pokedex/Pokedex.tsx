import ScreenBorder from './screen/border/ScreenBorder';
import LeftPanel from './leftPanel/LeftPanel';
import MainScreen from './screen/MainScreen';

const Pokedex = () => <div>
    <LeftPanel>
        <ScreenBorder>
            <MainScreen
                isOn={false} />
        </ScreenBorder>
    </LeftPanel>
</div>

export default Pokedex;