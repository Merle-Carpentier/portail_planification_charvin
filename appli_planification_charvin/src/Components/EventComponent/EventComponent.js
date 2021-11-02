import React from 'react'

export default function EventComponent({ event, children }) {

    const { title } = children.props
    const 

    return (
        <div>
            <input type="text" className="EventComponent-input-tittle" placeholder="ref rdv" />
            <input type="text" className="EventComponent-input" placeholder="ref rdv" />
        </div>
    )
}
