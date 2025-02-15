import React, { useState } from "react";

const DepartmentForm = () => {
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
    <div className="bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg p-6 mb-6 relative">
      <h1 className="text-2xl font-bold mb-6 text-[var(--accent-color)]">Department Details</h1>
      <form className="space-y-4">
        {/* Department Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* Number of Students */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Number of Students</label>
          <input
            type="number"
            value={noOfStudents}
            onChange={(e) => setNoOfStudents(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* HOD Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">HOD Name</label>
          <input
            type="text"
            value={hodName}
            onChange={(e) => setHodName(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* Number of Faculties */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Number of Faculties</label>
          <input
            type="number"
            value={noOfFaculties}
            onChange={(e) => setNoOfFaculties(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* Number of Classrooms */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Number of Classrooms</label>
          <input
            type="number"
            value={noOfClassrooms}
            onChange={(e) => setNoOfClassrooms(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* Number of Rooms */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Number of Rooms</label>
          <input
            type="number"
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            required
          />
        </div>

        {/* Year-wise Subjects */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)]">Year-wise Subjects</label>
          {[1, 2, 3, 4].map((year) => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[var(--accent-color)]">Year {year}</h3>
              {yearWiseSubjects[`year${year}`].map((subject, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => removeSubject(`year${year}`, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) =>
                      handleSubjectChange(`year${year}`, index, e.target.value)
                    }
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    placeholder={`Subject ${index + 1}`}
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSubject(`year${year}`)}
                className="text-[var(--accent-color)] hover:text-[var(--secondary-color)]"
              >
                + Add Subject
              </button>
            </div>
          ))}
        </div>
      </form>
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
