import React, { useState } from "react";

const DepartmentForm = ({ onRemove }) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    noOfStudents: "",
    hodName: "",
    noOfFaculties: "",
    noOfClassrooms: "",
    noOfRooms: "",
    yearWiseSubjects: {
      year1: [""],
      year2: [""],
      year3: [""],
      year4: [""],
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (year, index, value) => {
    setFormData((prev) => {
      const updatedSubjects = [...prev.yearWiseSubjects[year]];
      updatedSubjects[index] = value;
      return {
        ...prev,
        yearWiseSubjects: {
          ...prev.yearWiseSubjects,
          [year]: updatedSubjects,
        },
      };
    });
  };

  const addSubject = (year) => {
    setFormData((prev) => ({
      ...prev,
      yearWiseSubjects: {
        ...prev.yearWiseSubjects,
        [year]: [...prev.yearWiseSubjects[year], ""],
      },
    }));
  };

  const removeSubject = (year, index) => {
    setFormData((prev) => ({
      ...prev,
      yearWiseSubjects: {
        ...prev.yearWiseSubjects,
        [year]: prev.yearWiseSubjects[year].filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Separate payload for departments and subjects
    const departmentPayload = {
      departmentName: formData.departmentName,
      noOfStudents: formData.noOfStudents,
      hodName: formData.hodName,
      noOfFaculties: formData.noOfFaculties,
      noOfClassrooms: formData.noOfClassrooms,
      noOfRooms: formData.noOfRooms,
    };

    const subjectsPayload = Object.entries(formData.yearWiseSubjects).flatMap(
      ([year, subjects]) =>
        subjects
          .filter((subject) => subject.trim() !== "")
          .map((subject) => ({
            SubjectName: subject,
            Year: year.replace("year", ""),
          }))
    );

    console.log("Department Payload:", departmentPayload);
    console.log("Subjects Payload:", subjectsPayload);

    // You can handle the submission logic here
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-white p-6 rounded-lg relative shadow-lg max-w-3xl">
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl w-6 h-6 flex items-center justify-center"
      >
        ✖
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Department Details</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Department Name", name: "departmentName" },
            { label: "Number of Students", name: "noOfStudents", type: "number" },
            { label: "HOD Name", name: "hodName" },
            { label: "Number of Faculties", name: "noOfFaculties", type: "number" },
            { label: "Number of Classrooms", name: "noOfClassrooms", type: "number" },
            { label: "Number of Labs", name: "noOfRooms", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Year-wise Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year-wise Subjects</label>
          {[1, 2, 3, 4].map((year) => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Year {year}</h3>
              {formData.yearWiseSubjects[`year${year}`].map((subject, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) =>
                      handleSubjectChange(`year${year}`, index, e.target.value)
                    }
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder={`Subject ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(`year${year}`, index)}
                    className="text-red-500 hover:text-red-700 w-6 h-6 flex items-center justify-center"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSubject(`year${year}`)}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                + Add Subject
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
