import React from 'react';
import Hole from '../../hole/Hole';
import Light from '../../light/Light';
import Sound from '../../sound/Sound';
import './ScreenBorder.css'

type props = {
    children: React.ReactNode
}

const ScreenBorder = ({ children }: props) =>
    <div className={`screen-border`}>
        <div className='top-lights-container'>
            <Hole size={'large'} color={'red'}/>
            <Hole size={'large'} color={'red'}/>
        </div>
        {children}
        <div className='bottom-output-container'>
            <Light size={'small'} color={'red'} />
            <Sound/>
        </div>
    </div>

export default ScreenBorder;