import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [yearlyAverages, setYearlyAverages] = useState([]);
  const [placementTrends, setPlacementTrends] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        // Check if user and user.data exist
        const csvFilePath = user?.data?.csv_file_path;

        // Use the fallback URL if csvFilePath is not available
        let url = csvFilePath || "http://res.cloudinary.com/diwcd954n/raw/upload/v1739620742/e0zjdeb1evmodsxdhyjr.csv";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        const textData = await response.text();
        const parsedData = parseCSV(textData);
        setData(parsedData);
        processData(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const rows = text.split("\n");
    const headers = rows[0].split(",");
    return rows.slice(1).filter(row => row.trim() !== '').map((row) => {
      const values = row.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = values[index] ? values[index].trim() : '';
        return acc;
      }, {});
    });
  };

  const processData = (rawData) => {
    // Process yearly averages
    const yearlyData = rawData.reduce((acc, item) => {
      const year = item.Year;
      if (!year) return acc;

      if (!acc[year]) {
        acc[year] = {
          applications: [],
          cgpa: [],
          marketingSpend: [],
          placementRate: []
        };
      }

      const applications = parseFloat(item["Total Applications"]);
      const cgpa = parseFloat(item["Average CGPA"]);
      const marketingSpend = parseFloat(item["Marketing Spend"]);
      let placementRate = item["Placement Rate"];

      // Check if placement rate exists and has the replace method
      placementRate = placementRate && typeof placementRate === 'string'
        ? parseFloat(placementRate.replace('%', ''))
        : 0;

      if (!isNaN(applications)) acc[year].applications.push(applications);
      if (!isNaN(cgpa)) acc[year].cgpa.push(cgpa);
      if (!isNaN(marketingSpend)) acc[year].marketingSpend.push(marketingSpend);
      if (!isNaN(placementRate)) acc[year].placementRate.push(placementRate);

      return acc;
    }, {});

    const yearlyAveragesData = Object.entries(yearlyData).map(([year, values]) => ({
      year,
      avgApplications: values.applications.length > 0 ? average(values.applications) : 0,
      avgCGPA: values.cgpa.length > 0 ? average(values.cgpa) : 0,
      avgMarketingSpend: values.marketingSpend.length > 0 ? average(values.marketingSpend) : 0,
      avgPlacementRate: values.placementRate.length > 0 ? average(values.placementRate) : 0
    }));

    setYearlyAverages(yearlyAveragesData);

    // Process placement trends
    const placementData = rawData.map(item => {
      let placementRate = item["Placement Rate"];
      placementRate = placementRate && typeof placementRate === 'string'
        ? parseFloat(placementRate.replace('%', ''))
        : 0;

      return {
        year: item.Year || '',
        placementRate: !isNaN(placementRate) ? placementRate : 0,
        cgpa: !isNaN(parseFloat(item["Average CGPA"])) ? parseFloat(item["Average CGPA"]) : 0
      };
    });
    setPlacementTrends(placementData);

    // Process correlation data
    const correlationData = rawData.map(item => {
      let placementRate = item["Placement Rate"];
      placementRate = placementRate && typeof placementRate === 'string'
        ? parseFloat(placementRate.replace('%', ''))
        : 0;

      return {
        marketingSpend: !isNaN(parseFloat(item["Marketing Spend"])) ? parseFloat(item["Marketing Spend"]) : 0,
        placementRate: !isNaN(placementRate) ? placementRate : 0,
        applications: !isNaN(parseFloat(item["Total Applications"])) ? parseFloat(item["Total Applications"]) : 0
      };
    });
    setCorrelationData(correlationData);
  };

  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-black">Loading...</p>
    </div>
  );

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  if (loading) return <Loader />;
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">College Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yearly Trends Chart */}
        <Card className="shadow-lg bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-black">Yearly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyAverages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgPlacementRate"
                    stroke="#3B82F6"
                    name="Placement Rate (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgCGPA"
                    stroke="#60A5FA"
                    name="Average CGPA"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Impact Chart */}
        <Card className="shadow-lg bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-black">Marketing Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="marketingSpend"
                    name="Marketing Spend"
                    type="number"
                  />
                  <YAxis
                    dataKey="placementRate"
                    name="Placement Rate"
                    unit="%"
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter
                    data={correlationData}
                    fill="#60A5FA"
                    name="Marketing vs Placement"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Applications Overview */}
        <Card className="shadow-lg md:col-span-2 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-black">Applications Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyAverages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="avgApplications"
                    fill="#60A5FA"
                    name="Average Applications"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="mt-6 shadow-lg bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-black/50">Raw Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-auto">
              <thead className="bg-blue-50">
                <tr>
                  {data.length > 0 && Object.keys(data[0]).map((key, idx) => (
                    <th key={idx} className="border px-4 py-2 text-black/50">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="border px-4 py-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;