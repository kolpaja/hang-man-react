import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import Popup from './components/Popup'
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helpers'

import './App.css'

const words = ['application', 'programming', 'interface', 'wizard', 'game', 'apple', 'samsung', 'iphone', 'football', 'tenis', 'success'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const App = () => {
    const [playable, setPlayable] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])

    const playAgain = () => {
        setPlayable(true);
        setCorrectLetters([]);
        setWrongLetters([]);
        selectedWord = words[Math.floor(Math.random() * words.length)];
    }

    useEffect(() => {
        const handleKeydown = (e) => {
            const { key, keyCode } = e;

            if (playable && (keyCode >= 65 && keyCode <= 90)) {
                const letter = key;
                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(correctLetters => [...correctLetters, letter]);
                    } else {
                        show(setShowNotification)
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters(wrongLetters => [...wrongLetters, letter]);
                    } else {
                        show(setShowNotification)
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [playable, correctLetters, wrongLetters])




    return (
        <>
            <Header />

            <div className='game-container'>
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>

            <Popup
                selectedWord={selectedWord}
                correctLetters={correctLetters}
                wrongLetters={wrongLetters}
                setPlayable={setPlayable}
                playAgain={playAgain}
            />

            <Notification showNotification={showNotification} />
        </>
    )
}

export default App