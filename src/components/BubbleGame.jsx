import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BubbleGame = ({ table, onSuccess }) => {
    const [bubbles, setBubbles] = useState([]);
    const [operation, setOperation] = useState({ a: table, b: 1, result: table });
    const [wrongBubbleId, setWrongBubbleId] = useState(null);

    useEffect(() => {
        generateBubbles();
    }, [table]);

    const generateBubbles = () => {
        const b = Math.floor(Math.random() * 10) + 1;
        const result = table * b;
        setOperation({ a: table, b, result });
        setWrongBubbleId(null);

        const options = [result];

        while (options.length < 4) {
            const wrong = table * (Math.floor(Math.random() * 10) + 1);
            if (!options.includes(wrong)) options.push(wrong);
        }

        const shuffled = options.sort(() => 0.5 - Math.random());

        setBubbles(shuffled.map((val, index) => ({
            id: index,
            value: val,
            isCorrect: val === result
        })));
    };

    const handleBubbleClick = (bubble) => {
        if (bubble.isCorrect) {
            onSuccess();
            generateBubbles();
        } else {
            setWrongBubbleId(bubble.id);
            setTimeout(() => setWrongBubbleId(null), 800);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="text-3xl font-bold text-purple-700 mb-6">
                Combien font {operation.a} × {operation.b} ?
            </div>

            <div className="grid grid-cols-2 gap-6">
                {bubbles.map(bubble => (
                    <motion.button
                        key={bubble.id}
                        onClick={() => handleBubbleClick(bubble)}
                        className={`w-24 h-24 rounded-full text-white text-2xl font-bold shadow-lg border-4 transition-colors duration-300 ${
                            wrongBubbleId === bubble.id
                                ? 'border-red-500'
                                : 'border-transparent'
                        }`}
                        style={{ backgroundColor: `hsl(${Math.random() * 360}, 90%, 60%)` }}
                        whileTap={{ scale: 1.2 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        {bubble.value}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default BubbleGame;
