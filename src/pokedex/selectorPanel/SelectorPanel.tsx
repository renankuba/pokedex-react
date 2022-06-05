import { useState } from "react";
import PokeBar from "../button/PokeBar";
import PokeButton from "../button/PokeButton";
import DexDisplay from "../display/DexDisplay";
import Light from "../light/Light";
import NumPad from "../numPad/NumPad";
import PanelDivision from "./panelDivision/PanelDivision";
import './SelectorPanel.css';

type props = {
    selectedPokemonId?: number;
    onClose: ()=>void;
    onConfirm: (pokemonId?:number) => void;
    on: boolean;
}

const SelectorPanel = ({on, onClose, onConfirm, selectedPokemonId}:props) => {
    const emptyText = "___";
    const [text, setText] = useState<string>(on?(selectedPokemonId?.toString() || emptyText).padStart(3, "_"):"");
    const [reset, setResetOnNextInteraction] = useState<boolean>(true);

    const handleSetText = (text: string, pressedNumber: number) => {
        let blank = '_'
        text = reset?'':text.replace(blank, '');
        if(text.length === 3)
            text = '';
        text = (text+pressedNumber);
        setResetOnNextInteraction(false);
        return text.padStart(3, blank);
    }

    const handleConfirm = () => {
        const pokemonIdString = text.replaceAll("_", "");
        if (pokemonIdString === "") {
            onConfirm();
        } else {
            const pokemonId = Number.parseInt(pokemonIdString);
            if (pokemonId) {
                onConfirm(pokemonId);
            } else {
                setText(emptyText)
            }
            setResetOnNextInteraction(true);
        }
    }

    const handleNumpadClick = (pressedNumber: number) => {
        if(on)
            setText(handleSetText(text, pressedNumber));
    }

    return <div className="selector-panel-wrapper">
        <div className='selector-panel'>
            <DexDisplay
                color="gray"
                text={text}
                size="large" />
            <NumPad onClick={handleNumpadClick} />
        </div>
        <div className="selector-bottom-button">
             <div className="selector-top-bar">
                <PokeBar color='gray' />
                <PokeBar color='gray' />
             </div>
             <div className="space-between">
                <div>
                    <Light size='xsmall' color='red' />
                    <Light size='xsmall' color='red' />
                </div>
                <div className="arrow-left-border" onClick={onClose}>
                    <div className="arrow-left" />
                </div>
             </div>
             <div className="space-between">
                 <div>
                    <PokeButton shape="square" color='green' onClickPokebutton={handleConfirm}/>
                    <PokeButton shape="square" color='yellow' onClickPokebutton={()=>setText(emptyText)}/>
                </div>
                <Light size='large' color='yellow' />
             </div>
             <div className="selector-footer">
                 <DexDisplay color="gray" size="medium" />
                 <DexDisplay color="gray" size="medium" />
             </div>
        </div>
        <PanelDivision />
    </div>;
}

export default SelectorPanel;