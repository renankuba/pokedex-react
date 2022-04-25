import './MainScreen.css';

type props = {
    isOn:boolean
}
const MainScreen = ({isOn}:props) => <div className={`screen ${isOn?'on':'off'}`}></div>

export default MainScreen;