import AirExit from '../airExit/AirExit';
import PokeBar from '../button/PokeBar';
import PokeButton from '../button/PokeButton';
import DexDisplay from '../display/DexDisplay';
import Hole from '../hole/Hole';
import Light, { BorderedLight } from '../light/Light';
import TrafficLight from '../light/trafficLight/TrafficLight';
import './LeftPanel.css';
import PanelDivision from './panelDivision/PanelDivision';

type props = {
    children: React.ReactNode;
}

const LeftPanel = ({ children }: props) => <div className='left-panel'>
    <div className='nav-lights'>
        <BorderedLight size={'xlarge'} color={'blue'} />
        <TrafficLight />
    </div>
    <PanelDivision />
    <div className='screen-container'>
        {children}
    </div>
    <div className='bottom-buttons'>
        <div className='main-buttons'>
            <div className='other-buttons-wrapper'>
                <div className='top-other-buttons'>
                    <PokeButton shape='rounded'/>
                    <PokeBar color='red' />
                    <PokeBar color='blue' />
                </div>
                <div className='bottom-other-buttons'>
                    <Hole size='small' color='black' />
                    <Hole size='small' color='black' />
                    <DexDisplay color='green'/>
                </div>
            </div>
            <div className='directions'>
                <div className='Dpad'></div>
            </div>
        </div>
        <div className='footer'>
            <Light size='xsmall' color='red'/>
            <AirExit/>
        </div>
    </div>
</div>;

export default LeftPanel;