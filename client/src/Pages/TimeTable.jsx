import React, { useState, useEffect } from "react";
import { timeServices } from "../zServices/facultyServices";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const TimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // Get the user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const collegeId = user.data._id;

        // Fetch the timetable data
        const response = await timeServices(collegeId);

        // Check if the response and its nested data exist
        console.log(response.data.timetable.timetable[0].subjects)
        if (response?.data.timetable?.timetable?.length > 0) {
          setTimetableData(response.data.timetable.timetable[0].subjects);
        } else {
          setError("No timetable data found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-7xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Time Table
        </h1>

        {/* Time Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Time Slot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timetableData.length > 0 ? (
              timetableData.map((subject, index) => (
                <React.Fragment key={index}>
                  {subject.timeSlots.map((slot, slotIndex) => (
                    <TableRow key={`${index}-${slotIndex}`}>
                      <TableCell>{slot.day}</TableCell>
                      <TableCell>{subject.subjectName}</TableCell>
                      <TableCell>{slot.faculty}</TableCell>
                      <TableCell>{slot.time}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TimeTable;