// 代码生成时间: 2025-10-13 03:15:24
const fs = require('fs');
const path = require('path');

// Define the base directory for media assets
const MEDIA_ASSET_DIR = './media-assets';

// Initialize the media assets
let mediaAssets = [];

// Function to read all media assets from the directory
function readMediaAssets() {
  try {
    const files = fs.readdirSync(MEDIA_ASSET_DIR);
    files.forEach(file => {
      const filePath = path.join(MEDIA_ASSET_DIR, file);
      const fileStats = fs.statSync(filePath);
      if (fileStats.isFile()) {
        mediaAssets.push({
          name: file,
          path: filePath,
          size: fileStats.size
        });
      }
    });
  } catch (error) {
    console.error('Error reading media assets:', error);
  }
}

// Function to add a new media asset
function addMediaAsset(name, file) {
  const filePath = path.join(MEDIA_ASSET_DIR, name);
  try {
    fs.writeFileSync(filePath, file);
    mediaAssets.push({
      name: name,
      path: filePath,
      size: Buffer.byteLength(file)
    });
  } catch (error) {
    console.error('Error adding media asset:', error);
  }
}

// Function to get a media asset by name
function getMediaAsset(name) {
  const asset = mediaAssets.find(asset => asset.name === name);
  if (!asset) {
    throw new Error('Media asset not found.');
  }
  return asset;
}

// Function to remove a media asset by name
function removeMediaAsset(name) {
  const asset = getMediaAsset(name);
  try {
    fs.unlinkSync(asset.path);
    mediaAssets = mediaAssets.filter(asset => asset.name !== name);
  } catch (error) {
    console.error('Error removing media asset:', error);
  }
}

// Function to update a media asset by name
function updateMediaAsset(name, file) {
  const asset = getMediaAsset(name);
  try {
    fs.writeFileSync(asset.path, file);
    asset.size = Buffer.byteLength(file);
  } catch (error) {
    console.error('Error updating media asset:', error);
  }
}

// Initialize media assets on program start
readMediaAssets();

// Export functions for use in other Gatsby components
module.exports = {
  addMediaAsset,
  getMediaAsset,
  removeMediaAsset,
  updateMediaAsset
};