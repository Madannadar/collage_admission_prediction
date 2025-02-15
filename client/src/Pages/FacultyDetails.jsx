import React, { useState } from 'react';

const FacultyDetails = () => {
    const [teacherName, setTeacherName] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        console.log("Teacher Name:", teacherName);
        console.log("Subject:", subject);
        // Add form submission logic here (API call, state update, etc.)
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-[var(--bg-color)] border border-[var(--secondary-color)] rounded-lg p-6 flex flex-col gap-4 text-[var(--text-color)]">
                <h1 className="text-2xl font-bold text-[var(--accent-color)] text-center">Faculty Details</h1>
                <div className="flex items-center gap-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] p-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="Enter Teacher's Name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        className="w-full px-4 py-2 bg-transparent text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                </div>
                
                <div className="flex items-center gap-2 bg-[var(--bg-color)] border border-[var(--secondary-color)] p-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="Enter Teacher's Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 bg-transparent text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                </div>

                <button type="submit" className="bg-[var(--secondary-color)] hover:bg-[var(--accent-color)] text-black font-bold py-2 px-4 rounded-lg transition duration-300">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FacultyDetails;
