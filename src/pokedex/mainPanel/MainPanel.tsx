import AirExit from '../airExit/AirExit';
import Dpad from '../button/dpad/Dpad';
import PokeBar from '../button/PokeBar';
import PokeButton from '../button/PokeButton';
import DexDisplay from '../display/DexDisplay';
import Hole from '../hole/Hole';
import Light from '../light/Light';
import ScreenBorder from '../screen/border/ScreenBorder';
import MainScreen from '../screen/MainScreen';
import './MainPanel.css'

const MainPanel = () => <>
    <div className='screen-container'>
            <ScreenBorder>
                <MainScreen
                    isOn={false} />
            </ScreenBorder>
        </div>
        <div className='bottom-buttons'>
            <div className='main-buttons'>
                <div className='other-buttons-wrapper'>
                    <div className='top-other-buttons'>
                        <PokeButton shape='rounded' />
                        <PokeBar color='red' />
                        <PokeBar color='blue' />
                    </div>
                    <div className='bottom-other-buttons'>
                        <Hole size='small' color='black' />
                        <Hole size='small' color='black' />
                        <DexDisplay color='green' />
                    </div>
                </div>
                <Dpad />
            </div>
            <div className='footer'>
                <Light size='xsmall' color='red' />
                <AirExit />
            </div>
        </div>
</>

export default MainPanel;