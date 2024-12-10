import React from 'react'

export default function Card({task, text, index, supprCard}) {
  return (
    <div className="container p-2">
        <article className='message'>
            {/* Message */}
            <div className="message-header">
                <p>{task}</p>
                <button className="delete" aria-label="delete" onClick={()=>supprCard(index)}></button>
            </div>
            {/* Content */}
            <div className="message-body has-text-weight-medium">
                {text}
            </div>
        </article>
    </div>
  )
}
