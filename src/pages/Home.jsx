import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Typing',
            description: 'Améliore ta vitesse de frappe au clavier',
            color: 'from-green-300 to-green-500',
            link: '/typing'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-white">Bienvenue</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        className={`cursor-pointer bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-xl text-white hover:scale-105 transform transition`}
                        onClick={() => navigate(card.link)}
                    >
                        <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
