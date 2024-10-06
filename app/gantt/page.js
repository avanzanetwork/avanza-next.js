'use client';

import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import membersData from "./avanza.json"

const GanttChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processedData = [
      [
        { type: 'string', label: 'Member Name' },
        { type: 'string', label: 'Degree' },
        { type: 'date', label: 'Start' },
        { type: 'date', label: 'End' },
      ],
    ];

    const memberDegrees = {};

    membersData.forEach(member => {
      const fullName = member["First Name"] + " " + member["Last Name"];
      const degrees = member["School Info"]?.split('\n') ?? [];
      
      if (!memberDegrees[fullName]) {
        memberDegrees[fullName] = [];
      }

      degrees.forEach(degree => {
        const [school, degreeInfo, year] = degree.split(', ');
        const graduationYear = parseInt(year);
        if (!isNaN(graduationYear)) {
          let duration = 0; // Default for BS
          if (['PHD', 'Ph.D.', 'ABD', 'BS'].some(degree => degreeInfo.includes(degree))) {
            duration = 4;
          } else if (degreeInfo.includes('MS')) {
            duration = 2;
          } else {
            duration = 2;
          }
          memberDegrees[fullName].push({
            degree: `${school} - ${degreeInfo}`,
            start: new Date(graduationYear - duration, 8, 1),
            end: new Date(graduationYear, 5, 1)
          });
        }
      });
    });

    const sortedMembers = Object.entries(memberDegrees).sort((a, b) => {
      const aEarliestGrad = Math.min(...a[1].map(d => d.end.getTime()));
      const bEarliestGrad = Math.min(...b[1].map(d => d.end.getTime()));
      return aEarliestGrad - bEarliestGrad;
    });

    sortedMembers.forEach(([fullName, degrees]) => {
      degrees.forEach(degree => {
        processedData.push([
          fullName,
          degree.degree,
          degree.start,
          degree.end
        ]);
      });
    });

    console.log(processedData);

    setChartData(processedData);
  }, [membersData]);

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
            timeline: { groupByRowLabel: true },
          }}
        />
      )}
    </div>
  );
};

export default GanttChart;
