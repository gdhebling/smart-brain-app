import React from 'react'
import './ImageLinkForm.css'

export const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div>
                <p className="f3">
                    {"This Magic Brain will detect faces in your pictures. Give it a try."}
                </p>
                <p className="f4">
                    {"Post an image URL with a format of *.png, *.jpg, or *.jpeg. It might take a couple of seconds."}
                </p>
            </div>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
                    <button className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
