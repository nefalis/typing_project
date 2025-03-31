import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';



const Editor = () => {
    const [lessons, setLessons] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingLesson, setEditingLesson] = useState(null);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        axios.get(`http://localhost:8000/api/lessons/`)
        .then(response => setLessons(response.data))
        .catch(error => console.error('Erreur lors du chargement des leçons:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingLesson) {
            axios.put(`${API_BASE_URL}/api/lessons/${editingLesson.id}/`, { title, content })
                .then(() => {
                    fetchLessons();
                    resetForm();
                })
                .catch(error => console.error('Erreur lors de la mise à jour:', error));
        } else {
            axios.post('${API_BASE_URL}/api/lessons/', { title, content })
                .then(() => {
                    fetchLessons();
                    resetForm();
                })
                .catch(error => console.error('Erreur lors de la création:', error));
        }
    };

    const handleEdit = (lesson) => {
        setEditingLesson(lesson);
        setTitle(lesson.title);
        setContent(lesson.content);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/lessons/${id}/`)
        .then(() => fetchLessons())
        .catch(error => console.error('Erreur lors de la suppression:', error));
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setEditingLesson(null);
    };

    return (
        <motion.div 
            className="p-6  mx-auto shadow-xl  bg-gradient-to-r from-blue-300 to-green-300"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-4xl font-bold text-center text-white mb-6">Éditeur de leçon</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <input 
                    type="text" 
                    placeholder="Titre" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full p-3 border-4 bg-white border-green rounded-xl mb-4 focus:ring-4 focus:ring-green-300 text-xl"
                    required 
                />
                <textarea 
                    placeholder="Contenu de la leçon" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className="w-full p-3 border-4 bg-white border-green rounded-xl mb-4 h-40 focus:ring-4 focus:ring-green-300 text-lg"
                    required
                ></textarea>
                <div className="flex justify-between">
                    <button type="submit" className="  bg-green-400 text-white p-3 rounded-xl text-lg hover:bg-green-600 shadow-lg">{editingLesson ? 'Modifier' : 'Créer'} la leçon</button>
                    {editingLesson && <button type="button" onClick={resetForm} className="p-3 bg-gray-400 text-white rounded-xl text-lg hover:bg-gray-500 shadow-lg">Annuler</button>}
                </div>
            </form>

            <h2 className="text-3xl font-bold text-white mt-8 mb-4">Liste des Leçons</h2>
            <ul className="space-y-3">
                {lessons.map((lesson) => (
                    <motion.li 
                        key={lesson.id} 
                        className="p-4 border-4 border-blue rounded-xl flex justify-between items-center bg-white shadow-md"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xl font-semibold text-blue-800">{lesson.title}</span>
                        <div>
                            <button onClick={() => handleEdit(lesson)} className="bg-yellow-400 text-white p-2 rounded-lg mr-2 hover:bg-yellow-500 shadow-lg">Modifier</button>
                            <button onClick={() => handleDelete(lesson.id)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-lg">Supprimer</button>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Editor;

