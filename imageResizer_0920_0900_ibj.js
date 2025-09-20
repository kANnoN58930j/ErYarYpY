// 代码生成时间: 2025-09-20 09:00:32
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // 使用sharp库来处理图片

/**
 * 图片尺寸批量调整器
 * @param {string} sourceDir - 源图片文件夹路径
 * @param {string} targetDir - 目标图片文件夹路径
 * @param {number} width - 目标图片宽度
 * @param {number} height - 目标图片高度
 */
async function resizeImages(sourceDir, targetDir, width, height) {
  // 检查源文件夹是否存在
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`源文件夹 ${sourceDir} 不存在。`);
  }

  // 确保目标文件夹存在，如果不存在则创建
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 读取源文件夹中的所有文件
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    // 确保文件是图片
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
      try {
        // 读取图片并调整尺寸
        await sharp(filePath)
          .resize(width, height)
          .toFile(path.join(targetDir, file));
        console.log(`图片 ${file} 已调整尺寸并保存至 ${targetDir}`);
      } catch (error) {
        // 错误处理
        console.error(`调整图片 ${file} 尺寸时出错: ${error.message}`);
      }
    }
  }
}

// 使用示例
const sourceDir = './src/images';
const targetDir = './dist/images';
const width = 800;
const height = 600;
resizeImages(sourceDir, targetDir, width, height)
  .then(() => console.log('所有图片尺寸调整完成。'))
  .catch(error => console.error(`批量调整图片尺寸失败: ${error.message}`));