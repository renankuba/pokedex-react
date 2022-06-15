import { useState } from 'react';
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
    goUp: ()=> void;
    goDown: ()=>void;
    on: boolean;
    onPowerPressed: () => void;
    cursor: number;
}

const MainPanel = ({on, selectedPokemon, goToNext, goToPrevious, onPowerPressed, goUp, goDown, cursor}: props) => {
    
    return <div>
        <div className='screen-container'>
            <ScreenBorder>
                <MainScreen
                    cursor={cursor}
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
                    onPressDown={goDown}
                    onPressUp={goUp}
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