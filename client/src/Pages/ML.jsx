import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Building, User, Book, Clock, Percent, Users, Briefcase } from 'lucide-react';

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
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProgramChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      programs: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            Machine Learning Inputs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Program Selection (Multi-Select Dropdown) */}
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[var(--primary-color)]" />
              <Select
                isMulti
                options={programOptions}
                value={programOptions.filter((option) => formData.programs.includes(option.value))}
                onChange={handleProgramChange}
                className="flex-1 text-black"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-6"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ML;
