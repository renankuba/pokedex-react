import { BorderedLight } from '../light/Light';
import TrafficLight from '../light/trafficLight/TrafficLight';
import PanelDivision from './panelDivision/PanelDivision';
import Hinge from '../hinge/Hinge';
import './LeftPanel.css';

type props = {
    children: React.ReactNode;
}

const LeftPanel = ({ children }: props) => <div className='left-panel'>
    <div className="left-panel-wrapper"> 
        <div className='nav-lights'>
            <BorderedLight size={'xlarge'} color={'blue'} />
            <TrafficLight />
        </div>
        {children}
        <Hinge />
    </div>
    <PanelDivision />
</div>;

export default LeftPanel;