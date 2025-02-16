import React, { useState } from 'react';

const ResourceAllocation = () => {
  // State to store input values
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [numberOfClassrooms, setNumberOfClassrooms] = useState(0);
  const [capacityOfClassroom, setCapacityOfClassroom] = useState(0);
  const [numberOfLabs, setNumberOfLabs] = useState(0);
  const [capacityOfLabs, setCapacityOfLabs] = useState(0);
  const [numberOfFaculty, setNumberOfFaculty] = useState(0);

  // State to store calculated results
  const [requiredClassrooms, setRequiredClassrooms] = useState(0);
  const [requiredLabs, setRequiredLabs] = useState(0);
  const [requiredFaculty, setRequiredFaculty] = useState(0);

  // State to store messages for insufficient resources
  const [classroomMessage, setClassroomMessage] = useState('');
  const [labMessage, setLabMessage] = useState('');
  const [facultyMessage, setFacultyMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate required classrooms (2/3 of students divided by classroom capacity)
    const studentsForClassrooms = (2 / 3) * numberOfStudents;
    const classroomsNeeded = Math.ceil(studentsForClassrooms / capacityOfClassroom);

    // Calculate required labs (1/3 of students divided by lab capacity)
    const studentsForLabs = (1 / 3) * numberOfStudents;
    const labsNeeded = Math.ceil(studentsForLabs / capacityOfLabs);

    // Calculate required faculty (15 students per faculty)
    const facultyNeeded = Math.ceil(numberOfStudents / 15);

    // Update state with calculated values
    setRequiredClassrooms(classroomsNeeded);
    setRequiredLabs(labsNeeded);
    setRequiredFaculty(facultyNeeded);

    // Check if available resources are sufficient and set messages
    if (numberOfClassrooms < classroomsNeeded) {
      setClassroomMessage(`Insufficient classrooms! You need ${classroomsNeeded - numberOfClassrooms} more classrooms.`);
    } else {
      setClassroomMessage('Classrooms are sufficient.');
    }

    if (numberOfLabs < labsNeeded) {
      setLabMessage(`Insufficient labs! You need ${labsNeeded - numberOfLabs} more labs.`);
    } else {
      setLabMessage('Labs are sufficient.');
    }

    if (numberOfFaculty < facultyNeeded) {
      setFacultyMessage(`Insufficient faculty! You need ${facultyNeeded - numberOfFaculty} more faculty members.`);
    } else {
      setFacultyMessage('Faculty is sufficient.');
    }

    // Log results to the console
    console.log({
      numberOfStudents,
      numberOfClassrooms,
      capacityOfClassroom,
      numberOfLabs,
      capacityOfLabs,
      numberOfFaculty,
      requiredClassrooms: classroomsNeeded,
      requiredLabs: labsNeeded,
      requiredFaculty: facultyNeeded,
    });
  };

  // Function to fill form with sample data
  const useSampleData = () => {
    setNumberOfStudents(300);
    setNumberOfClassrooms(5);
    setCapacityOfClassroom(30);
    setNumberOfLabs(2);
    setCapacityOfLabs(40);
    setNumberOfFaculty(10);
  };

  // Input styles similar to BudgetAllocation
  const inputStyle = {
    "--primary-color": "#1e40af",
    borderColor: "#1e40af",
    outlineColor: "#1e40af",
    marginLeft: '10px',
    padding: '8px',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    width: '200px'
  };

  return (
    <div style={{ 
      padding: '24px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f3f4f6', 
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '1.875rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '1.5rem', 
        color: '#000000' 
      }}>Resource Input Page</h1>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '16px'
      }}>
        <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
          <button
            onClick={useSampleData}
            className='text-blue-800 hover:text-white'
          >
            Load Sample Data
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem', 
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000' }}>
              Resource Inputs
            </h2>

            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Number of Students:
            </label>
            <input
                type="number"
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2 border-blue-500 rounded-md text-base text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>


            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Number of Classrooms:
            </label>
            <input
                type="number"
                value={numberOfClassrooms}
                onChange={(e) => setNumberOfClassrooms(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2  text-blue-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>


            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Capacity of Each Classroom:
            </label>
            <input
                type="number"
                value={capacityOfClassroom}
                onChange={(e) => setCapacityOfClassroom(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2 text-blue-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>


            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Number of Labs:
            </label>
            <input
                type="number"
                value={numberOfLabs}
                onChange={(e) => setNumberOfLabs(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2 text-blue-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>


            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Capacity of Each Lab:
            </label>
            <input
                type="number"
                value={capacityOfLabs}
                onChange={(e) => setCapacityOfLabs(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2 text-blue-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
                Number of Faculty:
            </label>
            <input
                type="number"
                value={numberOfFaculty}
                onChange={(e) => setNumberOfFaculty(parseInt(e.target.value) || 0)}
                className="block w-full p-2 border-2 text-blue-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit" 
              className='text-blue-800 hover:text-white '
            >
              Calculate Requirements
            </button>
          </div>
        </form>
      </div>

      <div style={{ 
        marginTop: '1.5rem', 
        backgroundColor: 'white', 
        padding: '1rem', 
        borderRadius: '0.375rem', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000' }}>
          Current Input Values
        </h2>
        <p style={{ color: '#000000' }}>Number of Students: {numberOfStudents}</p>
        <p style={{ color: '#000000' }}>Number of Classrooms: {numberOfClassrooms}</p>
        <p style={{ color: '#000000' }}>Capacity of Each Classroom: {capacityOfClassroom}</p>
        <p style={{ color: '#000000' }}>Number of Labs: {numberOfLabs}</p>
        <p style={{ color: '#000000' }}>Capacity of Each Lab: {capacityOfLabs}</p>
        <p style={{ color: '#000000' }}>Number of Faculty: {numberOfFaculty}</p>
      </div>

      <div style={{ 
        marginTop: '1.5rem', 
        backgroundColor: 'white', 
        padding: '1rem', 
        borderRadius: '0.375rem', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000' }}>
          Calculated Requirements
        </h2>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>Required Classrooms: {requiredClassrooms}</p>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>Required Labs: {requiredLabs}</p>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>Required Faculty: {requiredFaculty}</p>
      </div>

      <div style={{ 
        marginTop: '1.5rem', 
        backgroundColor: 'white', 
        padding: '1rem', 
        borderRadius: '0.375rem', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000' }}>
          Resource Status
        </h2>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>{classroomMessage}</p>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>{labMessage}</p>
        <p style={{ color: '#1e40af', fontWeight: '500' }}>{facultyMessage}</p>
      </div>
    </div>
  );
};

export default ResourceAllocation;