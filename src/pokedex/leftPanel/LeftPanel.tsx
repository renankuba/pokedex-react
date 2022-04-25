import AirExit from '../airExit/AirExit';
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
        <div className='main-buttons'></div>
        <div className='footer'>
            <Light size='xsmall' color='red'/>
            <AirExit/>
        </div>
    </div>
</div>;

export default LeftPanel;