import './PokeButton.css'

type props = {
    shape: 'rounded';
}

const PokeButton = ({shape}:props) => <button 
    className={`poke-button ${shape}`}
/>;

export default PokeButton;