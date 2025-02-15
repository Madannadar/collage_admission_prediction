import React from 'react';

const Generation = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] p-4">
      <h1 className="text-3xl font-bold text-[var(--accent-color)] mb-6">Time Table</h1>

      {/* Department 1: Computer Science */}
      <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4">Computer Science</h2>
      <table className="w-full border-collapse mb-8 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">9:00 - 10:00</th>
            <th className="p-3 border">10:00 - 11:00</th>
            <th className="p-3 border">11:00 - 12:00</th>
            <th className="p-3 border">12:00 - 1:00</th>
            <th className="p-3 border">1:00 - 2:00</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Monday', 'Maths', 'Physics', 'Chemistry', 'Lunch', 'Programming'],
            ['Tuesday', 'Physics', 'Chemistry', 'Maths', 'Lunch', 'Programming'],
            ['Wednesday', 'Chemistry', 'Maths', 'Physics', 'Lunch', 'Programming'],
            ['Thursday', 'Maths', 'Physics', 'Chemistry', 'Lunch', 'Programming'],
            ['Friday', 'Physics', 'Chemistry', 'Maths', 'Lunch', 'Programming'],
          ].map((row, index) => (
            <tr key={index} className="hover:bg-[var(--accent-color)] hover:text-[var(--primary-color)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Department 2: Electronics and Communication */}
      <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4">Electronics and Communication</h2>
      <table className="w-full border-collapse mb-8 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">9:00 - 10:00</th>
            <th className="p-3 border">10:00 - 11:00</th>
            <th className="p-3 border">11:00 - 12:00</th>
            <th className="p-3 border">12:00 - 1:00</th>
            <th className="p-3 border">1:00 - 2:00</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Monday', 'Circuits', 'Signals', 'Electronics', 'Lunch', 'Lab'],
            ['Tuesday', 'Signals', 'Electronics', 'Circuits', 'Lunch', 'Lab'],
            ['Wednesday', 'Electronics', 'Circuits', 'Signals', 'Lunch', 'Lab'],
            ['Thursday', 'Circuits', 'Signals', 'Electronics', 'Lunch', 'Lab'],
            ['Friday', 'Signals', 'Electronics', 'Circuits', 'Lunch', 'Lab'],
          ].map((row, index) => (
            <tr key={index} className="hover:bg-[var(--accent-color)] hover:text-[var(--primary-color)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Department 3: Mechanical Engineering */}
      <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4">Mechanical Engineering</h2>
      <table className="w-full border-collapse mb-8 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">9:00 - 10:00</th>
            <th className="p-3 border">10:00 - 11:00</th>
            <th className="p-3 border">11:00 - 12:00</th>
            <th className="p-3 border">12:00 - 1:00</th>
            <th className="p-3 border">1:00 - 2:00</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Monday', 'Thermodynamics', 'Mechanics', 'Materials', 'Lunch', 'Workshop'],
            ['Tuesday', 'Mechanics', 'Materials', 'Thermodynamics', 'Lunch', 'Workshop'],
            ['Wednesday', 'Materials', 'Thermodynamics', 'Mechanics', 'Lunch', 'Workshop'],
            ['Thursday', 'Thermodynamics', 'Mechanics', 'Materials', 'Lunch', 'Workshop'],
            ['Friday', 'Mechanics', 'Materials', 'Thermodynamics', 'Lunch', 'Workshop'],
          ].map((row, index) => (
            <tr key={index} className="hover:bg-[var(--accent-color)] hover:text-[var(--primary-color)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Department 4: Civil Engineering */}
      <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4">Civil Engineering</h2>
      <table className="w-full border-collapse mb-8 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">9:00 - 10:00</th>
            <th className="p-3 border">10:00 - 11:00</th>
            <th className="p-3 border">11:00 - 12:00</th>
            <th className="p-3 border">12:00 - 1:00</th>
            <th className="p-3 border">1:00 - 2:00</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Monday', 'Structures', 'Geotech', 'Surveying', 'Lunch', 'Lab'],
            ['Tuesday', 'Geotech', 'Surveying', 'Structures', 'Lunch', 'Lab'],
            ['Wednesday', 'Surveying', 'Structures', 'Geotech', 'Lunch', 'Lab'],
            ['Thursday', 'Structures', 'Geotech', 'Surveying', 'Lunch', 'Lab'],
            ['Friday', 'Geotech', 'Surveying', 'Structures', 'Lunch', 'Lab'],
          ].map((row, index) => (
            <tr key={index} className="hover:bg-[var(--accent-color)] hover:text-[var(--primary-color)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Department 5: Biotechnology */}
      <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4">Biotechnology</h2>
      <table className="w-full border-collapse mb-8 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">9:00 - 10:00</th>
            <th className="p-3 border">10:00 - 11:00</th>
            <th className="p-3 border">11:00 - 12:00</th>
            <th className="p-3 border">12:00 - 1:00</th>
            <th className="p-3 border">1:00 - 2:00</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Monday', 'Biology', 'Chemistry', 'Physics', 'Lunch', 'Lab'],
            ['Tuesday', 'Chemistry', 'Physics', 'Biology', 'Lunch', 'Lab'],
            ['Wednesday', 'Physics', 'Biology', 'Chemistry', 'Lunch', 'Lab'],
            ['Thursday', 'Biology', 'Chemistry', 'Physics', 'Lunch', 'Lab'],
            ['Friday', 'Chemistry', 'Physics', 'Biology', 'Lunch', 'Lab'],
          ].map((row, index) => (
            <tr key={index} className="hover:bg-[var(--accent-color)] hover:text-[var(--primary-color)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default {Generation};