import Light from "../Light";
import './TrafficLight.css'

const TrafficLight = () => <div className='signal-container'>
    <Light size={'medium'} color={'red'} />
    <Light size={'medium'} color={'yellow'} />
    <Light size={'medium'} color={'green'} />
</div>

export default TrafficLight;