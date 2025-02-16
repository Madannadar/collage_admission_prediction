import React, { useState } from "react";

const BudgetAllocation = () => {
  const [budgetData, setBudgetData] = useState({
    revenueSources: {
      tuitionFees: "",
      governmentGrants: "",
      donations: "",
      researchIncome: "",
      eventRevenue: "",
    },
    expenses: {
      facultySalaries: "",
      infrastructureMaintenance: "",
      utilities: "",
      academicResources: "",
      studentServices: "",
      administrativeCosts: "",
      capitalExpenditures: "",
      miscellaneous: "",
    },
    predictedSeatsRate: "", // New field for predicted seats rate
  });

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState(null);

  // Calculate budget summary with seat prediction adjustment
  const calculateBudget = () => {
    const seatsRate = Number(budgetData.predictedSeatsRate) || 0;
    const expenseMultiplier = 1 + (seatsRate / 100);

    // Calculate total revenue
    const totalRevenue = Object.values(budgetData.revenueSources).reduce(
      (sum, value) => sum + (Number(value) || 0),
      0
    );

    // Calculate adjusted expenses based on predicted seats rate
    const adjustedExpenses = {};
    let totalExpenses = 0;
    
    Object.entries(budgetData.expenses).forEach(([key, value]) => {
      const baseExpense = Number(value) || 0;
      const adjustedExpense = baseExpense * expenseMultiplier;
      adjustedExpenses[key] = adjustedExpense;
      totalExpenses += adjustedExpense;
    });

    // Calculate net balance
    const netBalance = totalRevenue - totalExpenses;

    return {
      totalRevenue,
      totalExpenses,
      netBalance,
      revenueSources: budgetData.revenueSources,
      expenses: adjustedExpenses,
      predictedSeatsRate: seatsRate,
    };
  };

  // Handle input changes
  const handleInputChange = (e, category, subCategory) => {
    const { value } = e.target;
    if (category === "predictedSeatsRate") {
      setBudgetData((prevData) => ({
        ...prevData,
        predictedSeatsRate: value,
      }));
    } else {
      setBudgetData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [subCategory]: value,
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Calculate budget
    const summary = calculateBudget();
    setBudgetSummary(summary);

    // Format currency for display
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    };

    // Create detailed summary message
    const summaryMessage = `Budget Summary (Adjusted for ${summary.predictedSeatsRate}% Predicted Seats Rate):
    
Total Revenue: ${formatCurrency(summary.totalRevenue)}
Total Expenses (Adjusted): ${formatCurrency(summary.totalExpenses)}
Net Balance: ${formatCurrency(summary.netBalance)}

Revenue Breakdown:
${Object.entries(summary.revenueSources)
  .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${formatCurrency(Number(value) || 0)}`)
  .join('\n')}

Adjusted Expense Breakdown:
${Object.entries(summary.expenses)
  .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${formatCurrency(value)}`)
  .join('\n')}`;

    // Add calculation to messages
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: summaryMessage,
      },
    ]);

    setLoading(false);
  };

  // Sample data loading function
  const loadSampleData = () => {
    setBudgetData({
      revenueSources: {
        tuitionFees: "95000000",
        governmentGrants: "85000000",
        donations: "9000000",
        researchIncome: "9500000",
        eventRevenue: "8500000",
      },
      expenses: {
        facultySalaries: "25000000",
        infrastructureMaintenance: "8000000",
        utilities: "6000000",
        academicResources: "7000000",
        studentServices: "5000000",
        administrativeCosts: "9000000",
        capitalExpenditures: "10000000",
        miscellaneous: "3000000",
      },
      predictedSeatsRate: "110", // 110% occupancy as sample data
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Annual Budget Planning for Engineering College
      </h1>

      <div className="w-full flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-white border-t">
          <div className="mb-4 text-right">
            <button
              onClick={loadSampleData}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Load Sample Data
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Revenue Sources */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Revenue Sources</h2>
              {Object.entries(budgetData.revenueSources).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(e, "revenueSources", key)}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}...`}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Expenses */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Expenses</h2>
              {Object.entries(budgetData.expenses).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(e, "expenses", key)}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}...`}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Predicted Seats Rate */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Seat Occupancy Prediction</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Predicted Seats Rate (%):
                </label>
                <input
                  type="number"
                  value={budgetData.predictedSeatsRate}
                  onChange={(e) => handleInputChange(e, "predictedSeatsRate")}
                  placeholder="Enter predicted seats rate..."
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter the predicted seat occupancy rate (e.g., 110 for 110% occupancy). Expenses will be adjusted accordingly.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Calculate Budget"}
              </button>
            </div>
          </form>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={`${message.type}-${index}`}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocation;