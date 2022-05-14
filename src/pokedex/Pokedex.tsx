import { useState } from 'react';
import BasePanel from './basePanel/BasePanel';
import Cover from './cover/Cover';
import MainPanel from './mainPanel/MainPanel';
import SelectorPanel from './selectorPanel/SelectorPanel';
import './Pokedex.css';
import { fetchPokemonById } from '../services/PokedexService';
import Pokemon from '../model/Pokemon';


const Pokedex = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPokemon, setPokemon] = useState<Pokemon>();

    return <div className={`pokedex `}>
        <BasePanel>
            {open ?
                <MainPanel
                    selectedPokemon={selectedPokemon}
                />
                : <Cover onOpen={() => setOpen(true)} />
            }
        </BasePanel>
        {open &&
            <SelectorPanel
                onClose={() => setOpen(false)}
                onSelect={n => fetchPokemonById(n).then(setPokemon)} />}
    </div>
}

export default Pokedex;