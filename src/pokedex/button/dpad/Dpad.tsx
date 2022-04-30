import './Dpad.css'

const Dpad = () => <div className="d-pad">
    <button className={`poke-button arrow up`}/>
    <button className={`poke-button arrow left`}/>
    <button className={`poke-button arrow right`}/>
    <button className={`poke-button arrow down`}/>
    <div className="center-wrapper">
        <button 
            className='poke-button center'
            disabled={true} />
    </div>
</div>

export default Dpad;