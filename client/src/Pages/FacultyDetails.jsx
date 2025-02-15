import React, { useState } from 'react';

const FacultyDetails = ({ onRemove }) => {
    const [teacherName, setTeacherName] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Teacher Name:", teacherName);
        console.log("Subject:", subject);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full bg-white p-6 rounded-lg relative shadow-lg max-w-3xl">
            <button
                onClick={onRemove}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl w-6 h-6 flex items-center justify-center"
            >
                ✖
            </button>
            <div className="flex gap-6 w-full text-black">
                <input
                    type="text"
                    placeholder="Enter Teacher's Name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-1/2 px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                    type="text"
                    placeholder="Enter Teacher's Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-1/2 px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>
            <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg transition duration-300">
                Submit
            </button>
        </form>
    );
};

const App = () => {
    const [cards, setCards] = useState([{ id: 1 }]);

    const addCard = () => {
        const newCard = { id: Date.now() };
        setCards([...cards, newCard]);
    };

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <div className="min-h-screen bg-black p-10 flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-bold text-white text-center">Faculty Details</h1>
            <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
                {cards.map((card) => (
                    <FacultyDetails key={card.id} onRemove={() => removeCard(card.id)} />
                ))}
            </div>
            <button
                onClick={addCard}
                className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 text-lg font-semibold shadow-md"
            >
                + Add Teacher
            </button>
        </div>
    );
};

export default App;
