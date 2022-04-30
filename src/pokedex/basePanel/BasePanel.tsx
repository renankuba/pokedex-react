import { BorderedLight } from '../light/Light';
import TrafficLight from '../light/trafficLight/TrafficLight';
import PanelDivision from './panelDivision/PanelDivision';
import Hinge from '../hinge/Hinge';
import './BasePanel.css';

type props = {
    children: React.ReactNode;
}

const BasePanel = ({ children }: props) => <div className='base-panel'>
    <div className="base-panel-wrapper"> 
        <div className='nav-lights'>
            <BorderedLight size={'xlarge'} color={'blue'} />
            <TrafficLight />
        </div>
        {children}
        <Hinge />
    </div>
    <PanelDivision />
</div>;

export default BasePanel;