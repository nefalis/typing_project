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
    const [successGif, setSuccessGif] = useState(false);  // Contrôle l'affichage du GIF

    useEffect(() => {
        axios.get('http://localhost:8000/api/lessons/')
        .then(response => setLessons(response.data))
        .catch(error => console.error('Erreur lors du chargement des leçons:', error));
    }, []);

    useEffect(() => {
        if (typedText.length > 0 && startTime) {
            const timeSpent = (Date.now() - startTime) / 1000 / 60; // en minutes
            setWpm(Math.round((typedText.length / 5) / timeSpent));
        }
    }, [typedText]);

    const handleLessonChange = (e) => {
        setSelectedLesson(e.target.value);
        setTypedText('');
        setInputText(lessons.find(lesson => lesson.id === parseInt(e.target.value)).content);
        setStartTime(Date.now());
        setErrors(0);
        setWpm(0);
        setSuccessGif(false); // Réinitialiser le GIF
    };

    const handleKeyPress = (e) => {
        const nextChar = inputText[typedText.length];
        if (!nextChar) return;

        setTypedText(prev => prev + e.key);
        setErrors(prevErrors => (e.key !== nextChar ? prevErrors + 1 : prevErrors));

        // Vérifie si l'utilisateur a terminé la leçon
        if (typedText.length + 1 === inputText.length) {
            setSuccessGif(true);  // Afficher le GIF quand l'utilisateur a terminé
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [typedText, inputText, errors]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Apprentissage du clavier</h1>

            <select value={selectedLesson} onChange={handleLessonChange} className="mb-4 p-2 border rounded">
                <option value="">Choisir une leçon</option>
                {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                ))}
            </select>

            <div className="w-full h-40 border p-2 mb-4 bg-white text-lg font-mono">
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

            {/* Centrer le GIF sur la page et l'afficher uniquement lorsque l'utilisateur a terminé */}
            {successGif && (
                <div className="flex justify-center">
                    <GifDisplay successGif={successGif} />
                </div>
            )}
        </div>
    );
};

export default Home;

