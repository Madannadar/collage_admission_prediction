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
    <div className="flex flex-col gap-6 w-full bg-white p-6 rounded-lg relative shadow-lg max-w-3xl">
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl w-6 h-6 flex items-center justify-center"
      >
        ✖
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Department Details</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
            <input
              type="number"
              value={noOfStudents}
              onChange={(e) => setNoOfStudents(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HOD Name</label>
            <input
              type="text"
              value={hodName}
              onChange={(e) => setHodName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Faculties</label>
            <input
              type="text"
              value={noOfFaculties}
              onChange={(e) => setNoOfFaculties(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of ClassRooms</label>
            <input
              type="text"
              value={noOfClassrooms}
              onChange={(e) => setNoOfClassrooms(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Labs</label>
            <input
              type="text"
              value={noOfRooms}
              onChange={(e) => setNoOfRooms(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
        </div>
        
        {/* Year-wise Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year-wise Subjects</label>
          {[1, 2, 3, 4].map((year) => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Year {year}</h3>
              {yearWiseSubjects[`year${year}`].map((subject, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => handleSubjectChange(`year${year}`, index, e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder={`Subject ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(`year${year}`, index)}
                    className="text-red-500 hover:text-red-700 w-6 h-6 flex items-center justify-center"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSubject(`year${year}`)}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                + Add Subject
              </button>
            </div>
          ))}
        </div>
      </form>
      <button
        onClick={onRemove}
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg transition duration-300"
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
    <div className="min-h-screen bg-black p-10 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold text-white text-center">Department Details</h1>
      <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
        {cards.map((card) => (
          <DepartmentForm key={card.id} onRemove={() => removeCard(card.id)} />
        ))}
      </div>
      <button
        onClick={addCard}
        className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 text-lg font-semibold shadow-md"
      >
        + Add Department
      </button>
    </div>
  );
};

export default App;