import './PokeBar.css'

type props = {
    color: 'blue' | 'red' | 'gray';
}

const PokeBar = ({color}:props) => <button className={`poke-bar ${color}`}/>

export default PokeBar;