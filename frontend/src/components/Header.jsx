import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex justify-between items-center mb-4 p-4 h-20 bg-gray">
            <h2 className="text-2xl font-semibold">Entrainement au clavier</h2>
            <nav>
                <ul className="flex space-x-4">
                    <li className='rounded-lg p-2  bg-pink hover:font-bold shadow-lg'>
                        <NavLink
                            to="/"
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li className='rounded-lg p-2  bg-mauve hover:font-bold shadow-lg'>
                        <NavLink
                            to="/editor"
                        >
                            Éditeur
                        </NavLink>
                    </li>
                    <li className='rounded-lg p-2  bg-green hover:font-bold shadow-lg'>
                        <NavLink
                            to="/about"
                        >
                            À propos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
