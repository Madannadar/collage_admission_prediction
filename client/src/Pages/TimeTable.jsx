import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const Timetable = () => {
  const [lecturesPerDay, setLecturesPerDay] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [timetable, setTimetable] = useState([]);

  const handleGenerate = () => {
    const lectures = parseInt(lecturesPerDay, 10);
    const hours = parseInt(workingHours, 10);

    if (isNaN(lectures)) {
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            Generate Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Number of Lectures per Day"
                value={lecturesPerDay}
                onChange={(e) => setLecturesPerDay(e.target.value)}
                className="w-full border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Total Working Hours of College"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <Button
              onClick={handleGenerate}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-6"
            >
              Generate Timetable
            </Button>
          </div>

          {timetable.length > 0 && (
            <div className="mt-6">
              <table className="w-full border-collapse">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;