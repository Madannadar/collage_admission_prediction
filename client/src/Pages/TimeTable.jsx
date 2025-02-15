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

    if (isNaN(lectures) || lectures <= 0) {
      alert('Please enter a valid number of lectures per day.');
      return;
    }

    if (isNaN(hours) || hours <= 0) {
      alert('Please enter a valid number of working hours.');
      return;
    }

    const timetableData = [];
    for (let i = 0; i < lectures; i++) {
      const startTime = Math.floor(i * (hours / lectures));
      const endTime = Math.floor((i + 1) * (hours / lectures));
      timetableData.push({
        lecture: i + 1,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
      });
    }

    setTimetable(timetableData);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Inputs and Button in a Single Row */}
      <div className="flex items-center gap-4">
        <Input
          type="number"
          placeholder="Lectures per Day"
          value={lecturesPerDay}
          onChange={(e) => setLecturesPerDay(e.target.value)}
          className="w-40 p-2 border border-gray-400 text-black"
        />
        <Input
          type="number"
          placeholder="Total Working Hours"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-40 p-2 border border-gray-400 text-black"
        />
        <Button onClick={handleGenerate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
          Generate Timetable
        </Button>
      </div>

      {/* Timetable Table Below */}
      {timetable.length > 0 && (
        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-500 text-white">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-2 border">Lecture</th>
                <th className="p-2 border">Start Time</th>
                <th className="p-2 border">End Time</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((lecture, index) => (
                <tr key={index} className="border text-center">
                  <td className="p-2 border">{lecture.lecture}</td>
                  <td className="p-2 border">{lecture.startTime}</td>
                  <td className="p-2 border">{lecture.endTime}</td>
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
