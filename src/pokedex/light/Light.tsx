import './Light.css'

type props = {
    color: 'red' | 'yellow' | 'green' | 'blue';
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

const Light = ({ color, size }: props) => <div className={`light ${color} ${size}`}>
    <div className={`light reflex reflex-${size}`} />
</div>

const BorderedLight = ({ color, size}: props) => <div className={`light border ${size}`}>
    <Light
        color={color}
        size={size} />
</div>

export default Light;
export {BorderedLight};