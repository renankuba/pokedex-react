import './DexDisplay.css'

type props = {
    color: 'green' | 'gray';
    size: 'medium' | 'large'; 
    text?: string;
}

const DexDisplay = ({color,size, text}:props) => <div className={`dex-display ${color} ${size}`}>
    {text}
</div>;

export default DexDisplay;