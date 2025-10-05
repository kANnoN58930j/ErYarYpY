// 代码生成时间: 2025-10-06 02:03:24
// Import Gatsby dependencies
const { graphql, Link } = require('gatsby');

// Import other dependencies
const React = require('react');

// Define the Gatsby page component
const AgricultureIoTPage = ({ data }) => {
  // Destructuring data to get sensor data
  const { allSensorData } = data;

  return (
    <div>
      {/* Display title */}
      <h1>Agricultural IoT Dashboard</h1>

      {/* Display sensor data */}
      {allSensorData.nodes.map(sensor => (
        <div key={sensor.id}>
          <h2>{sensor.sensorType}</h2>
          <p>Temperature: {sensor.temperature}°C</p>
          <p>Humidity: {sensor.humidity}%</p>
          <p>Soil Moisture: {sensor.soilMoisture}%</p>
        </div>
      ))}
    </div>
  );
};

// GraphQL query to fetch sensor data
const query = graphql`
  query GetSensorData {
    allSensorData {
      nodes {
        id
        sensorType
        temperature
        humidity
        soilMoisture
      }
    }
  }
`;

// Export the page component and query
module.exports = {
  AgricultureIoTPage,
  pageQuery: query
};

/*
 * Error handling can be added by wrapping the data processing logic
 * in try-catch blocks and providing user-friendly error messages.
 * This is a basic example and can be expanded based on the specific
 * requirements and data sources.
 *
 * For better maintainability and scalability, the application can be
 * broken down into smaller components, such as separate components
 * for displaying individual sensor data, handling data processing,
 * and managing state.
 */