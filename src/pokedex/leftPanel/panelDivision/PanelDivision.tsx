import './PanelDivision.css'

const PanelDivision = () => <svg height="100" width="360" className={'division'}>
    <polyline
        points="0,75 100,75 130,20 360,20"
        className="division-line"
    />
</svg>

export default PanelDivision;