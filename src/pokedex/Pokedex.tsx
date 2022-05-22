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
    const [selectedPokemonId, setPokemonId] = useState<number>();
    const [selectedPokemon, setPokemon] = useState<Pokemon>();

    const next = () => {
        if(selectedPokemonId) {
            handleConfirmSelection(selectedPokemonId + 1);
        }
    };

    const previous = () => {
        if(selectedPokemonId) {
            handleConfirmSelection(selectedPokemonId - 1);
        }
    };

    const handleConfirmSelection = (pokemonId:number) => {
        setPokemonId(pokemonId);
        fetchPokemon(pokemonId);
    }

    const fetchPokemon = (pokemonId:number) => {
        fetchPokemonById(pokemonId)
            .then(setPokemon);
    }

    return <div className={`pokedex `}>
        <BasePanel>
            {open ?
                <MainPanel 
                    selectedPokemon={selectedPokemon}
                    goToNext={next}
                    goToPrevious={previous}
                />
                : <Cover onOpen={() => setOpen(true)} />
            }
        </BasePanel>
        {open &&
            <SelectorPanel
                key={selectedPokemonId}
                selectedPokemonId={selectedPokemonId}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirmSelection} />}
    </div>
}

export default Pokedex;