import React, { useState } from "react";
import { facultyServices } from "../zServices/facultyServices";
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../components/index.js";
import { Navigate } from "react-router-dom";

const FacultyDetails = () => {
    const [cards, setCards] = useState([
        { id: 1, facultyName: "", subjectNames: [] },
        { id: 2, facultyName: "", subjectNames: [] }, // Default 2 cards
    ]);

    const subjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
    ];

    const addCard = () => {
        const newCard = {
            id: Date.now(),
            facultyName: "",
            subjectNames: [],
        };
        setCards([...cards, newCard]);
    };

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    const updateCard = (id, field, value) => {
        setCards(
            cards.map((card) =>
                card.id === id ? { ...card, [field]: value } : card
            )
        );
    };

    const toggleSubject = (id, subject) => {
        setCards(
            cards.map((card) => {
                if (card.id === id) {
                    const isSelected = card.subjectNames.includes(subject);
                    const updatedSubjects = isSelected
                        ? card.subjectNames.filter((s) => s !== subject)
                        : [...card.subjectNames, subject];
                    return { ...card, subjectNames: updatedSubjects };
                }
                return card;
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = cards.map(({ facultyName, subjectNames }) => ({
            facultyName,
            subjectNames,
        }));
        facultyServices(payload);
        console.log("Payload to send:", payload);
        Navigate('/')
    };

    const Dropdown = ({ cardId, subjectNames }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");

        const filteredSubjects = subjects.filter((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="relative w-full">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    {subjectNames.length > 0
                        ? subjectNames.join(", ")
                        : "Select Subjects"}
                </button>
                {isOpen && (
                    <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <div className="max-h-48 overflow-y-auto">
                            {filteredSubjects.map((subject) => (
                                <label
                                    key={subject}
                                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" // Ensure text is visible
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={subjectNames.includes(subject)}
                                        onChange={() =>
                                            toggleSubject(cardId, subject)
                                        }
                                    />
                                    {subject}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md z-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-2xl relative"
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Faculty Details
                </h1>
                <div className="space-y-6 overflow-y-auto max-h-[70vh]">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="flex flex-col gap-4 p-6 rounded-lg relative"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-1/2">
                                    <label className="font-semibold text-black block mb-2">
                                        Teacher Name:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Teacher's Name"
                                        value={card.facultyName}
                                        onChange={(e) =>
                                            updateCard(
                                                card.id,
                                                "facultyName",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="font-semibold text-black block mb-2">
                                        Select Subjects:
                                    </label>
                                    <Dropdown
                                        cardId={card.id}
                                        subjectNames={card.subjectNames}
                                    />
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={() =>
                                                    removeCard(card.id)
                                                }
                                                variant="outline"
                                                className="bg-[#253985] text-white hover:bg-[hsl(228,56%,40%)] mt-8 top-3 right-3 text-xl"
                                            >
                                                X
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remove Card</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="button"
                        onClick={addCard}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300"
                    >
                        + Add Teacher
                    </button>
                </div>
                <button
                    type="submit"
                    className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Submit All
                </button>
            </form>
        </div>
    );
};

export default FacultyDetails;