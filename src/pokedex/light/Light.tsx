import './Light.css'

type props = {
    color: 'red' | 'yellow' | 'green' | 'blue';
    size: 'xsmall' | 'small' | 'medium' | 'xlarge';
    reflective?: boolean;
}

const Light = ({ color, size, reflective }: props) => <div className={`dot ${color} ${size}`}>
    {reflective && <div className={`dot reflex reflex-${size}`} />}
</div>

const BorderedLight = ({ color, size, reflective }: props) => <div className={`dot border ${size}`}>
    <Light
        color={color}
        size={size}
        reflective={reflective} />
</div>

export default Light;
export {BorderedLight};