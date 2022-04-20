import React from 'react'

const Word = ({ selectedWord, correctLetters }) => {
    return (
        <div className="word">
            {selectedWord.split('').map((letter, idx) => {
                return (
                    <span className="letter" key={idx}>
                        {correctLetters.includes(letter) ? letter : ''}
                    </span>
                )
            })}
        </div>
    )
}

export default Word