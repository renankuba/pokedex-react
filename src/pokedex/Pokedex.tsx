import LeftPanel from './leftPanel/LeftPanel';
import MainPanel from './mainPanel/MainPanel';
import './Pokedex.css';

const Pokedex = () => <div className='pokedex closed'>
    <LeftPanel>
        <MainPanel/>
    </LeftPanel>
</div>

export default Pokedex;