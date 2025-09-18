// 代码生成时间: 2025-09-18 09:35:05
// Load required modules
const fs = require('fs');
const path = require('path');

// Define a simple error class to handle errors
class RenameError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RenameError';
    }
}

// Function to rename a single file
function renameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                reject(new RenameError(`Failed to rename file: ${oldPath} to ${newPath}`));
                return;
            }
            resolve(newPath);
        });
    });
}

// Function to rename files based on a pattern
async function batchRenameFiles(directoryPath, pattern, replacement) {
    if (!fs.existsSync(directoryPath)) {
        throw new RenameError('The specified directory does not exist.');
    }

    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        const oldPath = path.join(directoryPath, file);
        const stat = fs.statSync(oldPath);

        // Skip directories, only rename files
        if (stat.isDirectory()) continue;

        const fileName = file.replace(pattern, replacement);
        const newPath = path.join(directoryPath, fileName);

        // Avoid overwriting existing files
        if (fs.existsSync(newPath)) {
            console.error(`File already exists: ${newPath}. Skipping...`);
            continue;
        }

        try {
            await renameFile(oldPath, newPath);
            console.log(`Renamed ${oldPath} to ${newPath}`);
        } catch (error) {
            console.error(`Error renaming file: ${oldPath} to ${newPath}. Error: ${error.message}`);
        }
    }
}

// Example usage
const directory = '/path/to/directory';
const pattern = /oldPattern/g;
const replacement = 'newPattern';

batchRenameFiles(directory, pattern, replacement)
    .then(() => console.log('Batch rename operation completed.'))
    .catch(error => console.error('Batch rename operation failed:', error));