import React, { useState } from 'react';

const FacultyDetails = () => {
    const [teacherName, setTeacherName] = useState('');
    const [subject, setSubject] = useState('');
    // const data =[
    //     {
    //         teacherName: "John Doe",
    //         subject: "Math"
    //     },
    //     {
    //         teacherName: "Jane Doe",
    //         subject: "Science"
    //     },
    //     {
    //         teacherName: "James Doe",
    //         subject: "English"
    //     },
    // ]
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        console.log("Teacher Name:", teacherName);
        console.log("Subject:", subject);
        // Add form submission logic here (API call, state update, etc.)
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
                {/* <img src="search.svg" alt="search" className="w-5 h-5" /> */}
                <input
                    type="text"
                    placeholder="Enter Teacher's Name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="bg-transparent outline-none w-full p-2"
                />
            </div>
            
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
                {/* <img src="search.svg" alt="search" className="w-5 h-5" /> */}
                <input
                    type="text"
                    placeholder="Enter Teacher's Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-transparent outline-none w-full p-2"
                />
            </div>

            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition">
                Submit
            </button>
        </form>
    );
};

export default FacultyDetails;
