import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex justify-between items-center mb-4 p-4 h-20 bg-gray">
            <h2 className="text-2xl font-semibold">Entrainement au clavier</h2>
            <nav className='w-1/3'>
                <ul className="flex space-x-4">

                    <li className='flex justify-center rounded-lg p-2 w-1/3 bg-green hover:bg-lime-400 shadow-lg'>
                        <NavLink
                            to="/"
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li className='flex justify-center rounded-lg p-2 w-1/3 bg-mauve hover:bg-purple-400 shadow-lg'>
                        <NavLink
                            to="/editor"
                        >
                            Éditeur
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;
