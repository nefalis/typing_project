import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-4 p-4 h-20 bg-gradient-to-r from-purple-400 to-blue-400 shadow-md "
        >
            <nav >
                <ul className="flex space-x-4">
                    <motion.li whileHover={{ scale: 1.1 }} className='flex justify-center rounded-lg p-2 w-20 bg-green-500 hover:bg-green-500 shadow-lg'>
                        <NavLink to="/" className="text-white font-semibold">Accueil</NavLink>
                    </motion.li>
                </ul>
            </nav>
        </motion.header>
    );
};

export default Header;
