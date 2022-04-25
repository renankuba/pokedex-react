import Light from "../Light";
import './TrafficLight.css'

const TrafficLight = () => <div className='signal-container'>
    <Light size={'medium'} color={'red'} reflective={true} />
    <Light size={'medium'} color={'yellow'} reflective={true} />
    <Light size={'medium'} color={'green'} reflective={true} />
</div>

export default TrafficLight;