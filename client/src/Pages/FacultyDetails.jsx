import React, { useState } from 'react';
import { facultyServices } from '../zServices/facultyServices';

const FacultyDetails = () => {
  const [cards, setCards] = useState([{ id: 1, facultyName: '', selectedSubjects: [] }]);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

  const addCard = () => {
    const newCard = { id: Date.now(), facultyName: '', selectedSubjects: [] };
    setCards([...cards, newCard]);
  };

  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const updateCard = (id, field, value) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const toggleSubject = (id, subject) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          const isSelected = card.selectedSubjects.includes(subject);
          const updatedSubjects = isSelected
            ? card.selectedSubjects.filter((s) => s !== subject)
            : [...card.selectedSubjects, subject];
          return { ...card, selectedSubjects: updatedSubjects };
        }
        return card;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = cards.map(({ facultyName, selectedSubjects }) => ({
      facultyName,
      selectedSubjects,
    }));
    facultyServices(payload);
    console.log('Payload to send:', payload);
  };

  const Dropdown = ({ cardId, selectedSubjects }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {selectedSubjects.length > 0
            ? selectedSubjects.join(', ')
            : 'Select Subjects'}
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {subjects.map((subject) => (
              <label
                key={subject}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => toggleSubject(cardId, subject)}
                />
                {subject}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-black p-10 flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-2xl font-bold text-white text-center">Faculty Details</h1>
      <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col gap-6 w-full bg-white p-6 rounded-lg relative shadow-lg max-w-7xl"
          >
            <button
              onClick={() => removeCard(card.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl w-6 h-6 flex items-center justify-center"
            >
              ✖
            </button>
            <div className="flex gap-6 w-full text-black">
              <div className="w-1/2">
                <label className="font-semibold mb-2 block">Teacher Name:</label>
                <input
                  type="text"
                  placeholder="Enter Teacher's Name"
                  value={card.facultyName}
                  onChange={(e) => updateCard(card.id, 'facultyName', e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="w-1/2">
                <label className="font-semibold mb-2 block">Select Subjects:</label>
                <Dropdown
                  cardId={card.id}
                  selectedSubjects={card.selectedSubjects}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addCard}
        className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 text-lg font-semibold shadow-md"
      >
        + Add Teacher
      </button>
      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md"
      >
        Submit All
      </button>
    </form>
  );
};

export default FacultyDetails;
