import './Light.css'

type props = {
    color: 'red' | 'yellow' | 'green';
    size: 'xsmall' | 'small';
    reflective?: boolean;
}

const Light = ({ color, size, reflective }: props) => <div className={`dot ${color} ${size}`}>
    {reflective && <div className={`dot reflex reflex-${size}`} />}
</div>

export default Light;