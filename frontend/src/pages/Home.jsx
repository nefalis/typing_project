import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GifDisplay from '../components/GifDisplay';
import { motion } from 'framer-motion';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
console.log(API_BASE_URL)

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
        axios.get(`${API_BASE_URL}/api/lessons/`)
            .then(response => setLessons(response.data))
            .catch(error => console.error('Erreur lors du chargement des leçons:', error));
    }, []);

    useEffect(() => {
        if (typedText.length > 0 && startTime) {
            const timeSpent = (Date.now() - startTime) / 1000 / 60;
            setWpm(Math.round((typedText.length / 5) / timeSpent));
        }
    }, [typedText]);

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

        if (e.key.length > 1) {
            return;
        }
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
        <div className="min-h-screen bg-gradient-to-r from-blue-300 to-green-300 flex flex-col items-center p-6 text-gray-900">
            <h2 className="text-4xl font-extrabold mb-6 text-white">Choix de la leçon :</h2>
            <select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)}
                className="mb-6 p-3 border-4 border-mauve rounded-lg bg-white text-xl shadow-lg">
                <option value="">Choisir une leçon</option>
                {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                ))}
            </select>

            <div className="w-full h-80 border-4 border-peach bg-white text-black rounded-lg shadow-md p-4 text-3xl font-mono leading-relaxed">
                {inputText.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className={
                            index < typedText.length
                                ? typedText[index] === char
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                : index === typedText.length
                                    ? 'bg-yellow-200'
                                    : 'text-gray-400'
                        }
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

            <div className="flex justify-between w-full max-w-2xl mt-4 text-xl">
                <p className="text-red-600 font-bold">Erreurs : {errors}</p>
                <p className="text-blue-600 font-bold">Vitesse : {wpm} MPM</p>
            </div>

            {successGif && (
                <div className="flex justify-center mt-6">
                    <GifDisplay successGif={successGif} />
                </div>
            )}
        </div>
    );
};

export default Home;