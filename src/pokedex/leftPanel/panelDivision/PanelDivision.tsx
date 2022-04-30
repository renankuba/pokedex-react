import './PanelDivision.css'

const PanelDivision = () => <svg height="100" width="390" className={'division'}>
    <polyline
        points="0,75 100,75 130,20 390,20"
        className="division-line"
    />
</svg>

export default PanelDivision;