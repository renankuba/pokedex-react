import './Dpad.css'

type props = {
    onPressUp?: () => void;
    onPressDown?: () => void;
    onPressLeft?: () => void;
    onPressRight?: () => void;
}

const Dpad = ({onPressUp, onPressDown, onPressLeft, onPressRight}:props) => <div className="d-pad">
    <button className={`poke-button arrow up`} onClick={onPressUp}/>
    <button className={`poke-button arrow left`} onClick={onPressLeft}/>
    <button className={`poke-button arrow right`} onClick={onPressRight}/>
    <button className={`poke-button arrow down`}  onClick={onPressDown}/>
    <div className="center-wrapper">
        <button 
            className='poke-button center'
            disabled={true} />
    </div>
</div>

export default Dpad;