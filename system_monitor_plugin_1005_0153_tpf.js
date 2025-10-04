// 代码生成时间: 2025-10-05 01:53:27
 * Features:
 * - Retrieves CPU usage
 * - Retrieves memory usage
 * - Retrieves disk usage
 *
# 添加错误处理
 * Usage:
 * - This plugin should be added to the gatsby-config.js file for it to have effect.
 * - It provides a GraphQL query available to fetch system resources data.
 */

// Gatsby Node API to create pages
const { cpu, mem, disk } = require('node-os-utils');
const path = require('path');

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  // Your logic to process nodes when they are created
  // ...
};

exports.createPages = async ({ actions, graphql }) => {
  // Your logic to create pages
  // ...
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  // Helper function to retrieve system resource usage and create nodes
  const createResourceNode = async (resourceType, data) => {
    const nodeContent = JSON.stringify(data);
    const nodeMeta = {
      id: createNodeId(\`${resourceType}-${data.timestamp}\`),
      parent: null,
      children: [],
      internal: {
        type: 'SystemResource', // name of the node
        contentDigest: createContentDigest(data),
      },
    };
    const nodeData = Object.assign({}, nodeMeta, {
      ...data,
      internal: {},
    });
    actions.createNode(nodeData);
  };

  // Fetch CPU usage
  try {
    const cpuUsage = await cpu.usagePercentage();
    await createResourceNode('cpu', {
      type: 'cpu',
      usage: cpuUsage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching CPU usage:', error);
  }

  // Fetch memory usage
  try {
    const memInfo = await mem.info();
# 扩展功能模块
    await createResourceNode('memory', {
      type: 'memory',
      total: memInfo.total,
      free: memInfo.free,
      used: memInfo.used,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching memory usage:', error);
  }

  // Fetch disk usage
  try {
    const diskInfo = await disk.usage('/');
    await createResourceNode('disk', {
      type: 'disk',
      total: diskInfo.total,
      free: diskInfo.free,
      used: diskInfo.used,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching disk usage:', error);
  }
# 改进用户体验
};
# 改进用户体验

// This plugin's schema
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
# 改进用户体验
    type SystemResource implements Node {
# 添加错误处理
      cpu: SystemResourceFields
      memory: SystemResourceFields
      disk: SystemResourceFields
# 优化算法效率
    }
    type SystemResourceFields {
      type: String
      usage: Float
      timestamp: String
# NOTE: 重要实现细节
    }
  `);
# 优化算法效率
};