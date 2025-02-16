import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const TimeTable = () => {
  // State for input fields
  const [lectures, setLectures] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  // Temporary hardcoded data
  const tableData = [
    {
      day : "Monday",
      subject: "Mathematics",
      lectures: 5,
      totalHours: 10,
    },
    {
      day : "Tuesday",
      subject: "Physics",
      lectures: 4,
      totalHours: 8,
    },
    {
      day : "Wednesday",
      subject: "Chemistry",
      lectures: 3,
      totalHours: 6,
    },
    {
      day : "Thursday",
      subject: "English",
      lectures: 2,
      totalHours: 4,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-7xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Time Table
        </h1>
        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="lectures"
              className="block text-sm font-medium text-white mb-1"
            >
              No. of Lectures
            </label>
            <input
              type="number"
              id="lectures"
              value={lectures}
              onChange={(e) => setLectures(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter lectures"
            />
          </div>
          <div>
            <label
              htmlFor="workingHours"
              className="block text-sm font-medium text-white mb-1"
            >
              Total Working Hours
            </label>
            <input
              type="number"
              id="workingHours"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter hours"
            />
          </div>
        </div>

        {/* Time Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>No. of Lectures</TableHead>
              <TableHead>Total Working Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.lectures}</TableCell>
                <TableCell>{row.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TimeTable;
