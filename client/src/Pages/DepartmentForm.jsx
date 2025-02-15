import React, { useState } from "react";

const DepartmentForm = ({ onRemove }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [noOfStudents, setNoOfStudents] = useState("");
  const [hodName, setHodName] = useState("");
  const [noOfFaculties, setNoOfFaculties] = useState("");
  const [noOfClassrooms, setNoOfClassrooms] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [yearWiseSubjects, setYearWiseSubjects] = useState({
    year1: [""],
    year2: [""],
    year3: [""],
    year4: [""],
  });

  const handleSubjectChange = (year, index, value) => {
    const updatedSubjects = [...yearWiseSubjects[year]];
    updatedSubjects[index] = value;
    setYearWiseSubjects({
      ...yearWiseSubjects,
      [year]: updatedSubjects,
    });
  };

  const addSubject = (year) => {
    setYearWiseSubjects({
      ...yearWiseSubjects,
      [year]: [...yearWiseSubjects[year], ""],
    });
  };

  const removeSubject = (year, index) => {
    const updatedSubjects = yearWiseSubjects[year].filter((_, i) => i !== index);
    setYearWiseSubjects({
      ...yearWiseSubjects,
      [year]: updatedSubjects,
    });
  };

  return (
    <div className="bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg p-6 mb-6 relative w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-[var(--accent-color)]">Department Details</h1>
      <form className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Number of Students</label>
            <input
              type="number"
              value={noOfStudents}
              onChange={(e) => setNoOfStudents(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>
        

        <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Hod Name</label>
            <input
              type="text"
              value={hodName}
              onChange={(e) => setHodName(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Number of Facluties</label>
            <input
              type="text"
              value={noOfFaculties}
              onChange={(e) => setNoOfFaculties(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Number of ClassRooms</label>
            <input
              type="text"
              value={noOfClassrooms}
              onChange={(e) => setNoOfClassrooms(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">Number of Labs</label>
            <input
              type="text"
              value={noOfRooms}
              onChange={(e) => setNoOfRooms(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              required
            />
          </div>
          </div>
        {/* Year-wise Subjects */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Year-wise Subjects</label>
          {[1, 2, 3, 4].map((year) => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[var(--accent-color)]">Year {year}</h3>
              {yearWiseSubjects[`year${year}`].map((subject, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => handleSubjectChange(`year${year}`, index, e.target.value)}
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    placeholder={`Subject ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(`year${year}`, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSubject(`year${year}`)}
                className="text-[var(--primary-color)] hover:text-[var(--primary-color)]"
              >
                + Add Subject
              </button>
            </div>
          ))}
        </div>
      </form>
      <button
        onClick={onRemove}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Remove Card
      </button>
    </div>
  );
};

// =========================
// ✅ Main App Component
// =========================

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
    <div className="min-h-screen bg-[var(--bg-color)] p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        {cards.map((card) => (
          <DepartmentForm key={card.id} onRemove={() => removeCard(card.id)} />
        ))}
      </div>
      <button
        onClick={addCard}
        className="mt-6 px-6 py-2 bg-[var(--secondary-color)] text-black rounded-lg hover:bg-[var(--accent-color)] transition duration-300"
      >
        + Add Card
      </button>
    </div>
  );
};

export default App;
