import Light, { BorderedLight } from '../light/Light';
import TrafficLight from '../light/trafficLight/TrafficLight';
import './LeftPanel.css';
import PanelDivision from './panelDivision/PanelDivision';

type props = {
    children: React.ReactNode;
}

const LeftPanel = ({ children }: props) => <div className='left-panel'>
    <div className='nav-lights'>
        <BorderedLight size={'xlarge'} color={'blue'} reflective={true} />
        <TrafficLight />
    </div>
    <PanelDivision />
    <div className='screen-container'>
        {children}
    </div>
    <div className='bottom-buttons'>

    </div>
</div>;

export default LeftPanel;