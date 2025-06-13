import React, { useState, useEffect } from 'react';
import gif1 from '../assets/gif1.gif';
import gif2 from '../assets/gif2.gif';
import gif3 from '../assets/gif3.gif';
import gif4 from '../assets/gif4.gif';
import gif5 from '../assets/gif5.gif';
import gif6 from '../assets/gif6.gif';
import gif7 from '../assets/gif7.gif';
import gif8 from '../assets/gif8.gif';
import gif9 from '../assets/gif9.gif';
import gif10 from '../assets/gif10.gif';
import gif11 from '../assets/gif11.gif';
import gif12 from '../assets/gif12.gif';


const GifDisplay = ({ successGif }) => {
    const gifList = [
        gif1,
        gif2,
        gif3,
        gif4,
        gif5,
        gif6,
        gif7,
        gif8,
        gif9,
        gif10,
        gif11,
        gif12,
    ];

    const [randomGif, setRandomGif] = useState('');

    const getRandomGif = () => {
        const randomIndex = Math.floor(Math.random() * gifList.length);
        return gifList[randomIndex];
    };

    useEffect(() => {
        if (successGif) {
        setRandomGif(getRandomGif());
        }
    }, [successGif]);

    // Ne pas afficher l'image si randomGif est vide
    if (!randomGif) {
        return null;
    }

    return <img src={randomGif} alt="Gif aléatoire" />;
};

export default GifDisplay;
