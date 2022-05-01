import { useState } from 'react';
import BasePanel from './basePanel/BasePanel';
import Cover from './cover/Cover';
import MainPanel from './mainPanel/MainPanel';
import SelectorPanel from './selectorPanel/SelectorPanel';
import './Pokedex.css';

const Pokedex = () => {
    const [open, setOpen] = useState(false);
    return <div className={`pokedex `}>
        <BasePanel>
            {open ?
                 <MainPanel /> 
                 : <Cover onOpen={() => setOpen(true)} />
            }
        </BasePanel>
        {open && <SelectorPanel onClose={() => setOpen(false)}/>}
    </div>
}

export default Pokedex;