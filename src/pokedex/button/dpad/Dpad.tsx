import './Dpad.css'

const Dpad = () => <div className="d-pad">
    <button className={`poke-button arrow up`}/>
    <button className={`poke-button arrow left`}/>
    <div className="center"></div>
    <button className={`poke-button arrow right`}/>
    <button className={`poke-button arrow down`}/>
</div>

export default Dpad;