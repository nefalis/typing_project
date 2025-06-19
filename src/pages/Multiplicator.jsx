import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Multiplicator = () => {
    const [level, setLevel] = useState(2);
    const [question, setQuestion] = useState(generateQuestion(2));
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [progress, setProgress] = useState(0);

    function generateQuestion(table) {
        const b = Math.floor(Math.random() * 10) + 1;
        return { a: table, b, result: table * b };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === question.result) {
            setFeedback('Super !');
            setProgress(prev => prev + 1);
            setQuestion(generateQuestion(level));
        } else {
            setFeedback('Essaie encore !');
        }
        setUserAnswer('');
    };

    const changeLevel = (lvl) => {
        setLevel(lvl);
        setQuestion(generateQuestion(lvl));
        setProgress(0);
        setFeedback('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-purple-700 mb-6">🧙 Mission Multiplication</h1>

            <div className="flex gap-2 mb-4">
                {[...Array(10)].map((_, i) => (
                    <button key={i} onClick={() => changeLevel(i + 1)}
                        className={`px-4 py-2 rounded-full ${level === i + 1 ? 'bg-purple-600' : 'bg-purple-300'} text-white font-bold shadow`}>
                        x{i + 1}
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded shadow-xl text-2xl mb-4 w-full max-w-md text-center">
                Combien font <span className="font-bold text-green-600">{question.a}</span> × <span className="font-bold text-green-600">{question.b}</span> ?
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="p-3 rounded border text-xl w-32 text-center"
                    placeholder="Réponse"
                    autoFocus
                />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold text-xl shadow">
                    OK
                </button>
            </form>

            {feedback && (
                <motion.div
                    className="text-2xl font-bold mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    {feedback}
                </motion.div>
            )}

            {/* Personnage qui avance */}
            <div className="w-full max-w-md h-20 bg-gray-300 rounded-full mt-8 relative overflow-hidden">
                <motion.div
                    className="absolute top-2 left-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ x: progress * 40 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                </motion.div>
            </div>

            <p className="mt-2 text-lg text-purple-600">Niveau de progression : {progress} / 10</p>
        </div>
    );
};

export default Multiplicator;
