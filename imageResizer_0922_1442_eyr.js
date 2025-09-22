// 代码生成时间: 2025-09-22 14:42:39
const sharp = require('sharp'); // 引入Sharp库来处理图片

// 图片尺寸批量调整器函数
async function batchResizeImages(sourceDir, targetDir, newDimensions) {
  // 检查源目录和目标目录是否存在
  try {
    await checkDirectoryExistence(sourceDir, targetDir);
  } catch (error) {
    console.error('Error:', error.message);
    return;
  }

  // 读取源目录中所有的图片文件
  const imageFiles = await readImageFiles(sourceDir);

  // 对每个图片文件进行处理
  for (const file of imageFiles) {
    try {
      const resizedImagePath = await resizeImage(file, targetDir, newDimensions);
      console.log(`Resized image saved at: ${resizedImagePath}`);
    } catch (error) {
      console.error(`Error resizing image ${file}:`, error);
    }
  }
}

// 检查目录是否存在，如果不存在则创建
async function checkDirectoryExistence(...directories) {
  for (const dir of directories) {
    await sharp.ensureInputFile(dir).catch(() => {
      console.error(`Directory ${dir} does not exist. Creating...`);
      sharp.mkdir(dir);
    });
  }
}

// 读取目录下的所有图片文件
function readImageFiles(directory) {
  return sharp.readdir(directory)
    .then(files => files.filter(file => sharp.isImageFile(file)));
}

// 调整图片尺寸并保存到目标目录
async function resizeImage(imagePath, targetDir, dimensions) {
  const { width, height } = dimensions;
  const outputFile = `${targetDir}/${path.basename(imagePath)}`;
  await sharp(imagePath)
    .resize({ width, height })
    .toFile(outputFile);
  return outputFile;
}

// 使用示例
// batchResizeImages('path/to/source', 'path/to/target', { width: 800, height: 600 });

// 以下是辅助函数和错误处理，确保代码的健壮性
const path = require('path'); // 引入path模块处理文件路径
const fs = require('fs'); // 引入fs模块处理文件系统操作

// 确保输入目录存在
function ensureDirectoryExistence(directory) {
  return new Promise((resolve, reject) => {
    fs.stat(directory, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.mkdir(directory, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
              reject(`Failed to create directory: ${mkdirErr}`);
            } else {
              resolve();
            }
          });
        } else {
          reject(err);
        }
      } else if (stats.isDirectory()) {
        resolve();
      } else {
        reject(`Path ${directory} is not a directory`);
      }
    });
  });
}

// 确保输入文件存在
function ensureFileExistence(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(`File ${file} does not exist`);
      } else if (stats.isFile()) {
        resolve();
      } else {
        reject(`Path ${file} is not a file`);
      }
    });
  });
}

module.exports = { batchResizeImages }; // 导出batchResizeImages函数