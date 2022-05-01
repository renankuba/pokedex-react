import './PanelDivision.css'

const PanelDivision = () => <svg height="100" width="362" className={'division'}>
    <polygon
        points="230,18 362,18 362,75 260,75"
        className="hide"
    />
    <polyline
        points="0,20 230,20 260,75 360,75"
        className="division-line"
    />
</svg>

export default PanelDivision;