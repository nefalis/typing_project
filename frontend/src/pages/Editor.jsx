import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Editor = () => {
    const [lessons, setLessons] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingLesson, setEditingLesson] = useState(null);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        axios.get('http://localhost:8000/api/lessons/')
        .then(response => setLessons(response.data))
        .catch(error => console.error('Erreur lors du chargement des leçons:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données envoyées :", { title, content });

        if (editingLesson) {
        axios.put(`http://localhost:8000/api/lessons/${editingLesson.id}/`, { title, content })
            .then(() => {
            fetchLessons();
            resetForm();
            })
            .catch(error => console.error('Erreur lors de la mise à jour:', error));
        } else {
        axios.post('http://localhost:8000/api/lessons/', { title, content })
            .then((response) => {
            console.log("Réponse API :", response.data);
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
        <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">Éditeur de leçons</h2>
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border-4 border-lime-400 rounded mb-2" required />
            <textarea placeholder="Contenu" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border-4 border-lime-400 rounded mb-2" required></textarea>
            <button type="submit" className="bg-green p-2 rounded hover:hover:bg-lime-400 shadow-lg">{editingLesson ? 'Modifier' : 'Créer'} la leçon</button>
            {editingLesson && <button type="button" onClick={resetForm} className="ml-2 p-2 bg-gray rounded hover:bg-gray-400">Annuler</button>}
        </form>

        
        <ul className='mt-10'>
            <h2 className="text-3xl font-bold mb-4">Liste des leçons</h2>
            {lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2 p-2 border-4 border-pink rounded flex justify-between items-center">
                <span>{lesson.title}</span>
                <div>
                <button onClick={() => handleEdit(lesson)} className="bg-peach p-1 rounded mr-2 hover:bg-yellow-400 shadow-lg">Modifier</button>
                <button onClick={() => handleDelete(lesson.id)} className="bg-red p-1 rounded hover:bg-red-500 shadow-lg">Supprimer</button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Editor;
