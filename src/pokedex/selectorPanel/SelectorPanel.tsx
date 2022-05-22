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
    onConfirm: (pokemonId:number) => void;
}

const SelectorPanel = ({onClose, onConfirm, selectedPokemonId}:props) => {
    const emptyText = "___";
    const [text, setText] = useState<string>((selectedPokemonId?.toString() || emptyText).padStart(3, "_"));
    const [reset, setReset] = useState<boolean>(true);

    const handleSetText = (text: string, pressedNumber: number) => {
        let blank = '_'
        text = reset?'':text.replace(blank, '');
        if(text.length === 3)
            text = '';
        text = (text+pressedNumber);
        setReset(false);
        return text.padStart(3, blank);
    }

    const handleConfirm = () => {
        onConfirm(Number.parseInt(text.replaceAll("_", "")));
        setReset(true);
    }

    return <div className="selector-panel-wrapper">
        <div className='selector-panel'>
            <DexDisplay
                color="gray"
                text={text}
                size="large" />
            <NumPad onClick={pressedNumber => setText(handleSetText(text, pressedNumber))} />
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