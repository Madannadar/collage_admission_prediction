import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Timetable = () => {
  const [lecturesPerDay, setLecturesPerDay] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [timetable, setTimetable] = useState([]);

  const handleGenerate = () => {
    const lectures = parseInt(lecturesPerDay, 10);
    const hours = parseInt(workingHours, 10);

    if (isNaN(lectures) ){
      alert('Please enter a valid number of lectures per day.');
      return;
    }

    if (isNaN(hours)) {
      alert('Please enter a valid number of working hours.');
      return;
    }

    const timetableData = [];
    for (let i = 0; i < lectures; i++) {
      timetableData.push({
        lecture: i + 1,
        startTime: `${i * (hours / lectures)}:00`,
        endTime: `${(i + 1) * (hours / lectures)}:00`,
      });
    }

    setTimetable(timetableData);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] p-4">
      {/* Inputs and Generate Button in a Row */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <Input
          type="number"
          placeholder="Number of Lectures per Day"
          value={lecturesPerDay}
          onChange={(e) => setLecturesPerDay(e.target.value)}
          className="w-48 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
          required
        />
        <Input
          type="number"
          placeholder="Total Working Hours"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-48 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
          required
        />
        <Button
          onClick={handleGenerate}
          className="bg-gray-800 hover:bg-gray-900 text-white"
        >
          Generate Timetable
        </Button>
      </div>

      {/* Timetable Table */}
      {timetable.length > 0 && (
        <div className="flex justify-center">
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[var(--primary-color)] text-[var(--text-color)]">
                <th className="p-2 border">Lecture</th>
                <th className="p-2 border">Start Time</th>
                <th className="p-2 border">End Time</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((lecture, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border text-center">{lecture.lecture}</td>
                  <td className="p-2 border text-center">{lecture.startTime}</td>
                  <td className="p-2 border text-center">{lecture.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Timetable;