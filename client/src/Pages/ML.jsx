import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Building, User, Book, Clock, Percent, Users, Briefcase } from 'lucide-react';
import Select from 'react-select';

const ML = () => {
  const [formData, setFormData] = useState({
    year: '',
    totalApplications: '',
    averageGPA: '',
    marketingSpend: '',
    placementRate: '',
    totalIntake: '',
    programs: [],
  });

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const programOptions = [
    { value: 'CS', label: 'CS' },
    { value: 'ECE', label: 'ECE' },
    { value: 'ME', label: 'ME' },
    { value: 'MBA', label: 'MBA' },
    { value: 'Civil', label: 'Civil' },
    { value: 'BioTech', label: 'BioTech' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Pharma', label: 'Pharma' },
    { value: 'CS', label: 'CS' },
    { value: 'ECE', label: 'ECE' },
    { value: 'ME', label: 'ME' },
    { value: 'MBA', label: 'MBA' },
    { value: 'Civil', label: 'Civil' },
    { value: 'BioTech', label: 'BioTech' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Pharma', label: 'Pharma' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Add user's input to messages
    setMessages((prev) => [
      ...prev,
      { 
        type: 'user', 
        text: `Year: ${formData.year}, Applications: ${formData.totalApplications}, GPA: ${formData.averageGPA}, Marketing Spend: ${formData.marketingSpend}, Placement Rate: ${formData.placementRate}, Intake: ${formData.totalIntake}, Programs: ${formData.programs.join(', ')}` 
      },
    ]);

    try {
      // Prepare data for backend
      const requestData = {
        param1: parseInt(formData.year),
        param2: parseInt(formData.totalApplications),
        param3: parseFloat(formData.averageGPA),
        param4: parseInt(formData.marketingSpend),
        param5: parseFloat(formData.placementRate),
        param6: formData.programs[0], // Taking first selected program
        param7: parseInt(formData.totalIntake)
      };

      // Make API call to backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      
      // Add prediction to messages
      setMessages((prev) => [
        ...prev, 
        { 
          type: 'bot', 
          text: `Predicted Admission Rate: ${data.prediction[0].toFixed(0)}` 
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          type: 'bot', 
          text: 'Sorry, there was an error making the prediction. Please try again.' 
        }
      ]);
    } finally {
      setLoading(false);
    }

    // Reset form
    setFormData({
      year: '',
      totalApplications: '',
      averageGPA: '',
      marketingSpend: '',
      placementRate: '',
      totalIntake: '',
      programs: [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] p-4 w-full">
      {/* Chat Header */}
      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            AI Admission Prediction
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Chat Container */}
      <div className="w-full flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Year */}
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Total Applications */}
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="totalApplications"
                  placeholder="Total Applications"
                  value={formData.totalApplications}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Average GPA */}
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="averageGPA"
                  placeholder="Average GPA (out of 5)"
                  value={formData.averageGPA}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Marketing Spend */}
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="marketingSpend"
                  placeholder="Marketing Spend (in Rupees)"
                  value={formData.marketingSpend}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Placement Rate */}
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="placementRate"
                  placeholder="Placement Rate (%)"
                  value={formData.placementRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Total Intake */}
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="number"
                  name="totalIntake"
                  placeholder="Total Intake"
                  value={formData.totalIntake}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>

              {/* Program Selection */}
              <div className="flex items-center space-x-2 col-span-2">
                <User className="w-5 h-5 text-[var(--primary-color)]" />
                <Select
                  isMulti
                  options={programOptions}
                  value={programOptions.filter((option) => formData.programs.includes(option.value))}
                  onChange={(selectedOptions) =>
                    setFormData((prev) => ({
                      ...prev,
                      programs: selectedOptions.map((option) => option.value),
                    }))
                  }
                  className="flex-1 text-black"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-4"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict'}
            </Button>
          </form>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-black">
                Predicting...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ML;