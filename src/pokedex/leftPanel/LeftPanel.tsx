import { BorderedLight } from '../light/Light';
import TrafficLight from '../light/trafficLight/TrafficLight';
import PanelDivision from './panelDivision/PanelDivision';
import './LeftPanel.css';

type props = {
    children: React.ReactNode;
}

const LeftPanel = ({ children }: props) => <div className='left-panel'>
    <div className='nav-lights'>
        <BorderedLight size={'xlarge'} color={'blue'} />
        <TrafficLight />
    </div>
    <PanelDivision />
    {children}
</div>;

export default LeftPanel;