import './PokeButton.css'

type props = {
    shape: 'rounded' | 'square';
    color?: 'gray' | 'blue' | 'green' | 'yellow';
    text?: string | number;
    onClickPokebutton?: ()=>void;
}

const PokeButton = ({ shape, color = 'gray', text, onClickPokebutton }: props) => <button
    className={`poke-button ${shape} ${color}`}
    onClick={onClickPokebutton}>
    {text}
</button>;

export default PokeButton;