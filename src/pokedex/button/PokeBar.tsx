import './PokeBar.css'

type props = {
    color: 'blue' | 'red';
}

const PokeBar = ({color}:props) => <button className={`poke-bar ${color}`}/>

export default PokeBar;