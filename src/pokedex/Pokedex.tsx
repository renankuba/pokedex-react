import BasePanel from './basePanel/BasePanel';
import MainPanel from './mainPanel/MainPanel';
import './Pokedex.css';

const Pokedex = () => <div className='pokedex closed'>
    <BasePanel>
        <MainPanel/>
    </BasePanel>
</div>

export default Pokedex;