import { useState } from "react";
import PokeBar from "../button/PokeBar";
import PokeButton from "../button/PokeButton";
import DexDisplay from "../display/DexDisplay";
import Light from "../light/Light";
import NumPad from "../numPad/NumPad";
import PanelDivision from "./panelDivision/PanelDivision";
import './SelectorPanel.css';

type props = {
    onClose: ()=>void;
}

const SelectorPanel = ({onClose}:props) => {
    const [text, setText] = useState("___");
    return <div className="selector-panel-wrapper">
        <div className='selector-panel'>
            <DexDisplay
                color="gray"
                text={text}
                size="large" />
            <NumPad onClick={n => setText(handleSetText(text, n))} />
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
                    <PokeButton shape="square" color='green' />
                    <PokeButton shape="square" color='yellow' />
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

const handleSetText = (text: string, n: number) => {
    let blank = '_'
    text = text.replace(blank, '');
    if(text.length === 3)
        text = '';
    text = (text+n);
    return text.padStart(3, blank);
}
