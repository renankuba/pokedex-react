import Pokemon from '../../model/Pokemon';
import AirExit from '../airExit/AirExit';
import Dpad from '../button/dpad/Dpad';
import PokeBar from '../button/PokeBar';
import PokeButton from '../button/PokeButton';
import DexDisplay from '../display/DexDisplay';
import Hole from '../hole/Hole';
import Light from '../light/Light';
import ScreenBorder from '../screen/border/ScreenBorder';
import MainScreen from '../screen/MainScreen';
import './MainPanel.css';

type props = {
    selectedPokemon?: Pokemon | Array<Pokemon>;
    goToNext: () => void;
    goToPrevious: () => void;
    on: boolean;
    onPowerPressed: () => void;
}

const MainPanel = ({on, selectedPokemon, goToNext, goToPrevious, onPowerPressed}: props) => {
    return <div>
        <div className='screen-container'>
            <ScreenBorder>
                <MainScreen
                    on={on}
                    selectedPokemon={selectedPokemon} />
            </ScreenBorder>
        </div>
        <div className='bottom-buttons'>
            <div className='main-buttons'>
                <div className='other-buttons-wrapper'>
                    <div className='top-other-buttons'>
                        <PokeButton 
                            shape='rounded'
                            onClickPokebutton={onPowerPressed}/>
                        <PokeBar color='red' />
                        <PokeBar color='blue' />
                    </div>
                    <div className='bottom-other-buttons'>
                        <Hole size='small' color='black' />
                        <Hole size='small' color='black' />
                        <DexDisplay
                            color='green'
                            size='medium' />
                    </div>
                </div>
                <Dpad
                    onPressRight={goToNext}
                    onPressLeft={goToPrevious}
                />
            </div>
            <div className='footer'>
                <Light size='xsmall' color='red' />
                <AirExit />
            </div>
        </div>
    </div>
}

export default MainPanel;