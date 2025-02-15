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
        <div className="bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg p-8 w-full max-w-3xl relative shadow-lg flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                <div className="flex gap-6 w-full">
                    <input
                        type="text"
                        placeholder="Enter Teacher's Name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        className="w-1/2 px-4 py-3 bg-transparent border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                    <input
                        type="text"
                        placeholder="Enter Teacher's Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-1/2 px-4 py-3 bg-transparent border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                </div>
                <button type="submit" className="bg-[var(--secondary-color)] hover:bg-[var(--accent-color)] text-black font-bold py-3 px-5 rounded-lg transition duration-300">
                    Submit
                </button>
            </form>
            <button
                onClick={onRemove}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl"
            >
                ✖
            </button>
        </div>
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
        <div className="min-h-screen bg-[var(--bg-color)] p-10 flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-bold text-[var(--accent-color)] text-center">Faculty Details</h1>
            <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
                {cards.map((card) => (
                    <FacultyDetails key={card.id} onRemove={() => removeCard(card.id)} />
                ))}
            </div>
            <button
                onClick={addCard}
                className="mt-6 px-6 py-3 bg-[var(--secondary-color)] text-black rounded-lg hover:bg-[var(--accent-color)] transition duration-300 text-lg font-semibold shadow-md"
            >
                + Add Teacher
            </button>
        </div>
    );
};

export default App;
