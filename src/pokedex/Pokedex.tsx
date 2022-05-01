import { useState } from 'react';
import BasePanel from './basePanel/BasePanel';
import Cover from './cover/Cover';
import MainPanel from './mainPanel/MainPanel';
import './Pokedex.css';

const Pokedex = () => {
    const [open, setOpen] = useState(false);
    return <div className={`pokedex closed`}>
        <BasePanel>
            {open ?
                 <MainPanel /> 
                 : <Cover onOpen={() => setOpen(true)} />
            }
        </BasePanel>
    </div>
}

export default Pokedex;