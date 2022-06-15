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
    const [selectedPokemon, setPokemon] = useState<Pokemon | Array<Pokemon>>();
    const [on, setOn] = useState<boolean>(false);
    const [cursor, setCursor] = useState<number>(0);

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

    const handleConfirmSelection = (pokemonId?:number) => {
        if(Array.isArray(selectedPokemon)){
            pokemonId = selectedPokemon[cursor].number;
        }
        if(pokemonId){
            setPokemonId(pokemonId);
            fetchPokemon(pokemonId);
        } else {
            fetchPokemonList();
        }
    }

    const fetchPokemon = (pokemonId:number) => {
        pokedexService.fetchPokemonById(pokemonId)
            .then(setPokemon);
    }

    const fetchPokemonList = () => {
        setCursor(0);
        pokedexService.fetchPokemonList()
            .then(setPokemon);
    }

    const handlePowerButton = () => {
        setOn(!on)
        setPokemon(undefined);
        setPokemonId(undefined);
    }

    const handleGoUp = () => {
        if(Array.isArray(selectedPokemon) && cursor > 0)
            setCursor(cursor - 1);
    }

    const handleGoDown = () => {
        if(Array.isArray(selectedPokemon) && cursor < selectedPokemon.length-1)
            setCursor(cursor + 1);
    }

    return <div className={`pokedex `}>
        <BasePanel>
            {open ?
                <MainPanel 
                    selectedPokemon={selectedPokemon}
                    goToNext={next}
                    goToPrevious={previous}
                    goUp={handleGoUp}
                    goDown={handleGoDown}
                    on={on}
                    onPowerPressed={handlePowerButton}
                    cursor={cursor}
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