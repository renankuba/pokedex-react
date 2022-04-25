import './DexDisplay.css'

type props = {
    color: 'green';
}

const DexDisplay = ({color}:props) => <div className={`dex-display ${color}`}/>;

export default DexDisplay;