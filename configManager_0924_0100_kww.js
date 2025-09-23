// 代码生成时间: 2025-09-24 01:00:28
// configManager.js
// This file is a configuration manager for Gatsby projects.

const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify the readFile function for easier use with async/await
const readFileAsync = util.promisify(fs.readFile);

class ConfigManager {
  // Constructor to initialize configuration file path
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Method to read configuration file
  async readConfig() {
    try {
      // Check if the file exists
      if (!fs.existsSync(this.filePath)) {
        throw new Error('Configuration file does not exist.');
      }

      // Read the file content
      const fileContent = await readFileAsync(this.filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      // Handle errors
      console.error('Failed to read configuration:', error.message);
      throw error;
    }
  }

  // Method to write to the configuration file
  async writeConfig(configData) {
    try {
      // Check if the configuration data is valid JSON object
      if (typeof configData !== 'object' || configData === null) {
        throw new Error('Invalid configuration data.');
      }

      // Convert the configuration data to a JSON string
      const configContent = JSON.stringify(configData, null, 2);

      // Write the JSON string to the file
      await util.promisify(fs.writeFile)(this.filePath, configContent, 'utf-8');
    } catch (error) {
      // Handle errors
      console.error('Failed to write configuration:', error.message);
      throw error;
    }
  }
}

// Example usage
(async () => {
  const configPath = path.join(process.cwd(), 'gatsby-config.json');
  const configManager = new ConfigManager(configPath);

  try {
    // Read the configuration
    const config = await configManager.readConfig();
    console.log('Current Configuration:', config);

    // Update and write the configuration
    const newConfig = { ...config, siteMetadata: { ...config.siteMetadata, title: 'New Gatsby Site' } };
    await configManager.writeConfig(newConfig);
    console.log('Configuration updated successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
