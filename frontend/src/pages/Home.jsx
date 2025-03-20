import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GifDisplay from '../components/GifDisplay';

const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [inputText, setInputText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [typedText, setTypedText] = useState('');
    const [errors, setErrors] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [successGif, setSuccessGif] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/lessons/')
            .then(response => setLessons(response.data))
            .catch(error => console.error('Erreur lors du chargement des leçons:', error));
    }, []);

    // Calcul de la vitesse de frappe
    useEffect(() => {
        if (typedText.length > 0 && startTime) {
            const timeSpent = (Date.now() - startTime) / 1000 / 60; // en minutes
            setWpm(Math.round((typedText.length / 5) / timeSpent));
        }
    }, [typedText]);

    // Réagir au changement de leçon
    useEffect(() => {
        if (selectedLesson) {
            const selected = lessons.find(lesson => lesson.id === parseInt(selectedLesson));
            setInputText(selected ? selected.content : '');
            setTypedText('');
            setErrors(0);
            setStartTime(Date.now());
            setWpm(0);
            setSuccessGif(false);
        }
    }, [selectedLesson, lessons]);

    const handleKeyPress = (e) => {
        if (document.activeElement.tagName === "SELECT") {
            return;
        }
    
        const nextChar = inputText[typedText.length];
        if (!nextChar) return;
    
        setTypedText(prev => prev + e.key);
        setErrors(prevErrors => (e.key !== nextChar ? prevErrors + 1 : prevErrors));
    
        if (typedText.length + 1 === inputText.length) {
            setSuccessGif(true);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [typedText, inputText]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Choix de la leçon :</h2>

            <select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} className="mb-4 p-2 border-4 border-purple-400 rounded">
                <option value="">Choisir une leçon</option>
                {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                ))}
            </select>

            <div className="w-full h-40 border-4 border-lime-400 rounded p-2 mb-4 bg-white text-lg font-mono">
                {inputText.split('').map((char, index) => (
                    <span
                        key={index}
                        className={
                            index < typedText.length
                                ? typedText[index] === char
                                    ? 'text-black'
                                    : 'text-red-500'
                                : index === typedText.length
                                    ? 'bg-yellow-200'
                                    : 'text-gray-400'
                        }
                    >
                        {char}
                    </span>
                ))}
            </div>

            <div className="flex justify-between">
                <p>Erreurs : {errors}</p>
                <p>Vitesse : {wpm} MPM</p>
            </div>

            {successGif && (
                <div className="flex justify-center">
                    <GifDisplay successGif={successGif} />
                </div>
            )}
        </div>
    );
};

export default Home;
