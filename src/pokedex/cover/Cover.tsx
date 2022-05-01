import './Cover.css';

type props = {
    onOpen: () => void
}

const Cover = ({onOpen}:props) => <div className='cover'>
    <div className="arrow-right-border" onClick={onOpen}>
        <div className="arrow-right"/>
    </div>
    <div className="bar"/>
</div>

export default Cover;