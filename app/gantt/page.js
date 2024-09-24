'use client';

import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import membersData from './members.json';

const GanttChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const sortedMembersData = [...membersData].sort((a, b) => b.graduationYear - a.graduationYear);
    
    const processedData = [
      [
        { type: 'string', label: 'Member Name' },
        { type: 'string', label: 'Degree' },
        { type: 'date', label: 'Start' },
        { type: 'date', label: 'End' },
      ],
      ...sortedMembersData.map(member => [
        member.name,
        member.degrees.join(', '),
        new Date(member.graduationYear - 4, 8, 1),  // Assuming 4-year programs starting in September
        new Date(member.graduationYear, 5, 1)  // Ending in June of graduation year
      ])
    ];

    setChartData(processedData);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h1>Member University Attendance Timeline</h1>
      {chartData.length > 1 && (
        <Chart
          width={'100%'}
          height={'90%'}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            timeline: { groupByRowLabel: false },
          }}
        />
      )}
    </div>
  );
};

export default GanttChart;
