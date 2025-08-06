const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始部署 Project Stardust...\n');

try {
  // 检查是否有未提交的更改
  console.log('📋 检查 Git 状态...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  检测到未提交的更改，请先提交所有更改。');
    process.exit(1);
  }

  // 安装依赖
  console.log('📦 安装依赖...');
  execSync('npm ci', { stdio: 'inherit' });

  // 构建项目
  console.log('🔨 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 导出静态文件
  console.log('📤 导出静态文件...');
  execSync('npm run export', { stdio: 'inherit' });

  // 检查输出目录
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    console.log('❌ 导出失败：未找到 out 目录');
    process.exit(1);
  }

  // 创建 .nojekyll 文件（GitHub Pages 需要）
  const nojekyllPath = path.join(outDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ 创建 .nojekyll 文件');

  // 创建 CNAME 文件（如果有自定义域名）
  const customDomain = process.env.CUSTOM_DOMAIN;
  if (customDomain) {
    const cnamePath = path.join(outDir, 'CNAME');
    fs.writeFileSync(cnamePath, customDomain);
    console.log(`✅ 创建 CNAME 文件: ${customDomain}`);
  }

  console.log('\n🎉 构建完成！');
  console.log('📁 静态文件已生成到 out 目录');
  console.log('🌐 现在可以将 out 目录的内容部署到 GitHub Pages 或其他静态托管服务');

  // 显示文件大小统计
  const stats = getDirectoryStats(outDir);
  console.log('\n📊 构建统计:');
  console.log(`   文件总数: ${stats.fileCount}`);
  console.log(`   总大小: ${formatBytes(stats.totalSize)}`);

} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}

function getDirectoryStats(dir) {
  let fileCount = 0;
  let totalSize = 0;

  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        traverse(filePath);
      } else {
        fileCount++;
        totalSize += stat.size;
      }
    });
  }

  traverse(dir);
  return { fileCount, totalSize };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
