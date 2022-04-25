import './Hole.css';

type props = {
    size: 'large' | 'small';
    color: 'red' | 'black'
}

const Hole =({size, color}:props) => <div className={`hole ${size} ${color}`}></div>

export default Hole;