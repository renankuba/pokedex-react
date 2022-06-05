import { useState } from 'react';
import BasePanel from './basePanel/BasePanel';
import Cover from './cover/Cover';
import MainPanel from './mainPanel/MainPanel';
import SelectorPanel from './selectorPanel/SelectorPanel';
import './Pokedex.css';
import Pokemon from '../model/Pokemon';
import pokedexService from '../services/PokedexService';

const Pokedex = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPokemonId, setPokemonId] = useState<number>();
    const [selectedPokemon, setPokemon] = useState<Pokemon>();
    const [on, setOn] = useState<boolean>(false);

    const next = () => {
        if(selectedPokemonId && selectedPokemonId < 151) {
            handleConfirmSelection(selectedPokemonId + 1);
        }
    };

    const previous = () => {
        if(selectedPokemonId && selectedPokemonId > 1) {
            handleConfirmSelection(selectedPokemonId - 1);
        }
    };

    const handleConfirmSelection = (pokemonId:number) => {
        setPokemonId(pokemonId);
        fetchPokemon(pokemonId);
    }

    const fetchPokemon = (pokemonId:number) => {
        pokedexService.fetchPokemonById(pokemonId)
            .then(setPokemon);
    }

    const handlePowerButton = () => {
        setOn(!on)
        setPokemon(undefined);
        setPokemonId(undefined);
    }

    return <div className={`pokedex `}>
        <BasePanel>
            {open ?
                <MainPanel 
                    selectedPokemon={selectedPokemon}
                    goToNext={next}
                    goToPrevious={previous}
                    on={on}
                    onPowerPressed={handlePowerButton}
                />
                : <Cover onOpen={() => setOpen(true)} />
            }
        </BasePanel>
        {open &&
            <SelectorPanel
                key={`selector-${on}-${selectedPokemonId}`}
                on={on}
                selectedPokemonId={selectedPokemonId}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirmSelection} />}
    </div>
}

export default Pokedex;