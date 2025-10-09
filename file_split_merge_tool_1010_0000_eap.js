// 代码生成时间: 2025-10-10 00:00:24
const fs = require('fs');
const path = require('path');

class FileSplitMergeTool {
  /**
   * 构造函数
   * @param {string} directory - 工作目录，存放文件
   */
  constructor(directory) {
    this.directory = directory;
  }

  /**
   * 分割文件
   * @param {string} filename - 需要分割的文件名
   * @param {number} size - 分割后的每个文件的大小
   */
  splitFile(filename, size) {
    try {
      const filePath = path.join(this.directory, filename);
      const fileContent = fs.readFileSync(filePath);
      const chunkSize = size * 1024; // 将size转换为字节大小
      const numChunks = Math.ceil(fileContent.length / chunkSize);
      for (let i = 0; i < numChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, fileContent.length);
        const chunk = fileContent.slice(start, end);
        const chunkName = `${filename}_part${i + 1}`;
        fs.writeFileSync(path.join(this.directory, chunkName), chunk);
      }
      console.log(`文件 ${filename} 已分割成 ${numChunks} 个部分。`);
    } catch (error) {
      console.error('分割文件时出错：', error);
    }
  }

  /**
   * 合并文件
   * @param {string} filename - 需要合并的文件名（不包括分割标记）
   */
  mergeFiles(filename) {
    try {
      const files = fs.readdirSync(this.directory)
        .filter(file => file.startsWith(filename) && !file.endsWith('_part1'))
        .sort()
        .map(file => path.join(this.directory, file));
      if (files.length === 0) {
        throw new Error('没有找到需要合并的文件。');
      }

      const fileContent = files.reduce((acc, file) => {
        return Buffer.concat([acc, fs.readFileSync(file)]);
      }, Buffer.alloc(0));

      fs.writeFileSync(path.join(this.directory, filename), fileContent);
      console.log(`文件 ${filename} 已合并。`);
    } catch (error) {
      console.error('合并文件时出错：', error);
    }
  }
}

// 示例用法
const tool = new FileSplitMergeTool('./data');
tool.splitFile('example.txt', 10); // 分割文件，每个分割文件大小为10MB
tool.mergeFiles('example'); // 合并文件
