import React from 'react';
import Light from '../light/Light';
import Sound from '../sound/Sound';
import './ScreenBorder.css'

type ScreenBorderProps = {
    children: React.ReactNode
}

const ScreenBorder = ({ children }: ScreenBorderProps) =>
    <div className={`screen-border`}>
        <div className='top-lights-container'>
            <Light size={'xsmall'} color={'red'}/>
            <Light size={'xsmall'} color={'red'}/>
        </div>
        {children}
        <div className='bottom-output-container'>
            <Light size={'small'} color={'red'} reflective={true}/>
            <Sound/>
        </div>
    </div>

export default ScreenBorder;