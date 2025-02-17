import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SubjectServices } from "../zServices/SubjectServices";
import { DepartmentServices } from "../zServices/DepartmentServices";
import { Button } from "../components/ui/button";




const DepartmentForm = ({ onRemove }) => {

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const [forms, setForms] = useState([
        {
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
        },
    ]);

    const navigate = useNavigate(); // Use the useNavigate hook

    const handleInputChange = (e, formIndex) => {
        const { name, value } = e.target;
        setForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[formIndex] = {
                ...updatedForms[formIndex],
                [name]: value,
            };
            return updatedForms;
        });
    };

    const handleSubjectChange = (formIndex, year, index, value) => {
        setForms((prevForms) => {
            const updatedForms = [...prevForms];
            const updatedSubjects = [
                ...updatedForms[formIndex].yearWiseSubjects[year],
            ];
            updatedSubjects[index] = value;
            updatedForms[formIndex] = {
                ...updatedForms[formIndex],
                yearWiseSubjects: {
                    ...updatedForms[formIndex].yearWiseSubjects,
                    [year]: updatedSubjects,
                },
            };
            return updatedForms;
        });
    };

    const addSubject = (formIndex, year) => {
        setForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[formIndex] = {
                ...updatedForms[formIndex],
                yearWiseSubjects: {
                    ...updatedForms[formIndex].yearWiseSubjects,
                    [year]: [
                        ...updatedForms[formIndex].yearWiseSubjects[year],
                        "",
                    ],
                },
            };
            return updatedForms;
        });
    };

    const removeSubject = (formIndex, year, index) => {
        setForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[formIndex] = {
                ...updatedForms[formIndex],
                yearWiseSubjects: {
                    ...updatedForms[formIndex].yearWiseSubjects,
                    [year]: updatedForms[formIndex].yearWiseSubjects[
                        year
                    ].filter((_, i) => i !== index),
                },
            };
            return updatedForms;
        });
    };

    const addDepartmentForm = () => {
        setForms((prevForms) => [
            ...prevForms,
            {
                departmentName: "",
                noOfStudents: "",
                hodName: "",
                noOfFaculties: "",
                noOfClassrooms: "",
                noOfRooms: "",
                collegeId: user.data._id,
                yearWiseSubjects: {
                    year1: [""],
                    year2: [""],
                    year3: [""],
                    year4: [""],
                },
            },
        ]);
    };

   
    console.log("user", user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!user) {
            console.error("User not found in localStorage");
            return;
        }

        try {
            // Prepare payloads for all forms
            const departmentPayloads = [];
            const subjects = [];

            forms.forEach((form) => {
                // Department payload
                const subjectsPayload = Object.entries(
                    form.yearWiseSubjects
                ).flatMap(([year, subjects]) =>
                    subjects
                        .filter((subject) => subject.trim() !== "")
                        .map((subject) => ({
                            subjectName: subject,
                            year: year.replace("year", ""),
                        }))
                );
                subjects.push(...subjectsPayload);

                const departmentPayload = {
                    departmentName: form.departmentName,
                    collegeId: user.data._id,
                    noOfStudents: form.noOfStudents,
                    hodName: form.hodName,
                    noOfFaculties: form.noOfFaculties,
                    noOfClassrooms: form.noOfClassrooms,
                    noOfRooms: form.noOfRooms,
                    subjects : subjects,
                };
                console.log("departmentPayload", departmentPayload);
                
                departmentPayloads.push(departmentPayload);

                // Subjects payload

            });

            // departmentPayloads.push(subjects)
            // Log payloads for debugging
            console.log("Department Payloads:", departmentPayloads);
            console.log("Subjects Payloads:", subjects);

            // Send department data
            await DepartmentServices({ departments: departmentPayloads});

            // Send subjects data
            // await SubjectServices(subjectsPayloads);

            // Navigate after successful submission
            navigate("/FacultyDetails"); // Use the navigate function
        } catch (error) {
            console.error("Error submitting forms:", error);
        }
    };

    const removeForm = (formIndex) => {
        setForms((prevForms) => {
            const updatedForms = prevForms.filter(
                (_, index) => index !== formIndex
            );
            return updatedForms;
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-h-[80vh] overflow-y-auto">
                {/* <button
                    onClick={onRemove}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl w-6 h-6 flex items-center justify-center"
                >
                    ✖
                </button> */}
                {forms.map((form, formIndex) => (
                    <form key={formIndex} className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Department Details
                        </h1>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                {
                                    label: "Department Name",
                                    name: "departmentName",
                                },
                                {
                                    label: "Number of Students",
                                    name: "noOfStudents",
                                    type: "number",
                                },
                                { label: "HOD Name", name: "hodName" },
                                {
                                    label: "Number of Faculties",
                                    name: "noOfFaculties",
                                    type: "number",
                                },
                                {
                                    label: "Number of Classrooms",
                                    name: "noOfClassrooms",
                                    type: "number",
                                },
                                {
                                    label: "Number of Labs",
                                    name: "noOfRooms",
                                    type: "number",
                                },
                            ].map(({ label, name, type = "text" }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={(e) =>
                                            handleInputChange(e, formIndex)
                                        }
                                        className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Year-wise Subjects */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year-wise Subjects
                            </label>
                            {[1, 2, 3, 4].map((year) => (
                                <div key={year} className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                        Year {year}
                                    </h3>
                                    {form.yearWiseSubjects[`year${year}`].map(
                                        (subject, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 mb-2"
                                            >
                                                <input
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) =>
                                                        handleSubjectChange(
                                                            formIndex,
                                                            `year${year}`,
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                    placeholder={`Subject ${
                                                        index + 1
                                                    }`}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSubject(
                                                            formIndex,
                                                            `year${year}`,
                                                            index
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 w-6 h-6 flex items-center justify-center"
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            addSubject(formIndex, `year${year}`)
                                        }
                                        className="text-gray-700 hover:text-gray-900 font-medium"
                                    >
                                        + Add Subject
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={() => removeForm(formIndex)}
                            className="text-blue-500 hover:text-blue-700 text-xl h-12 flex items-center justify-center"
                        >
                            Remove
                        </Button>
                        {/* Horizontal Line */}
                        <hr className="border-t-2 border-gray-300 my-6" />
                    </form>
                ))}

                {/* Fixed Buttons */}
                <button
                    type="button"
                    onClick={addDepartmentForm}
                    className="fixed bottom-6 left-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                    Add Department
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="fixed bottom-6 right-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DepartmentForm;