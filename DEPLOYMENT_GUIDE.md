# GitHub Pages 部署指南

本指南将帮助您设置 GitHub Actions 自动部署到 GitHub Pages。

## 📋 前置条件

1. 您的代码已推送到 GitHub 仓库
2. 仓库名为 `yuyigy.github.io`（用户主页仓库）或其他名称
3. 您有仓库的管理员权限

## 🚀 GitHub Pages 设置步骤

### 步骤 1: 启用 GitHub Pages

1. 打开您的 GitHub 仓库页面
2. 点击仓库顶部的 **Settings** 标签
3. 在左侧菜单中找到并点击 **Pages**

### 步骤 2: 配置 Pages 源

在 Pages 设置页面中：

1. **Source** 部分选择 **"GitHub Actions"**
   - ⚠️ **重要**: 不要选择 "Deploy from a branch"
   - 选择 "GitHub Actions" 可以让我们的自定义工作流处理部署

2. 配置完成后，页面会显示类似这样的信息：
   ```
   ✅ Your site is ready to be published at https://yuyigy.github.io/
   ```

### 步骤 3: 推送代码触发部署

1. 将您的代码推送到 `main` 分支：
   ```bash
   git add .
   git commit -m "Initial commit with GitHub Actions deployment"
   git push origin main
   ```

2. 推送后，GitHub Actions 会自动开始运行

### 步骤 4: 监控部署过程

1. 在仓库页面点击 **Actions** 标签
2. 您会看到一个名为 "Deploy Next.js to GitHub Pages" 的工作流正在运行
3. 点击工作流可以查看详细的执行日志

## 🔧 工作流说明

我们的 GitHub Actions 工作流包含以下步骤：

### 构建阶段 (Build Job)
1. **检出代码**: 获取最新的仓库代码
2. **设置 Node.js**: 安装 Node.js 20.x 环境
3. **安装依赖**: 运行 `npm ci` 安装项目依赖
4. **构建项目**: 运行 `npm run build` 构建 Next.js 应用
5. **添加 .nojekyll**: 防止 GitHub Pages 使用 Jekyll 处理
6. **上传构建产物**: 将 `out` 目录上传为 Pages 构建产物

### 部署阶段 (Deploy Job)
1. **部署到 GitHub Pages**: 使用官方 Actions 部署到 Pages

## 🌐 访问您的网站

部署成功后，您可以通过以下地址访问您的博客：

- **用户主页仓库** (`yuyigy.github.io`): https://yuyigy.github.io/
- **项目仓库** (`project-name`): https://yuyigy.github.io/project-name/

## 🔍 故障排除

### 常见问题

1. **部署失败 - 权限错误**
   - 确保在仓库 Settings > Actions > General 中启用了 "Read and write permissions"

2. **页面显示 404**
   - 检查 `next.config.js` 中的 `basePath` 配置
   - 确保 Pages 源设置为 "GitHub Actions"

3. **样式或资源加载失败**
   - 确保 `next.config.js` 中设置了 `images.unoptimized: true`
   - 检查是否需要设置 `assetPrefix`

### 调试步骤

1. **查看 Actions 日志**:
   - 进入 Actions 标签
   - 点击失败的工作流
   - 查看具体的错误信息

2. **本地测试构建**:
   ```bash
   npm run build
   # 检查 out 目录是否正确生成
   ls -la out/
   ```

3. **检查配置文件**:
   - 确认 `next.config.js` 包含 `output: 'export'`
   - 确认 `package.json` 的 build 脚本正确

## 📝 自定义配置

### 自定义域名

如果您有自定义域名，可以在工作流中添加 CNAME 文件：

```yaml
- name: Add CNAME file
  run: echo 'your-domain.com' > ./out/CNAME
```

### 环境变量

如果需要在构建时使用环境变量，可以在工作流中添加：

```yaml
- name: Build Next.js project
  run: npm run build
  env:
    NEXT_PUBLIC_SITE_URL: https://yuyigy.github.io
```

## ✅ 验证部署

部署成功后，请验证以下功能：

- [ ] 首页正常加载
- [ ] 文章页面可以访问
- [ ] 样式正确显示
- [ ] 图片正常加载
- [ ] 导航链接工作正常

---

🎉 **恭喜！** 您的 Next.js 博客现在已经自动部署到 GitHub Pages 了！

每次您推送代码到 `main` 分支时，网站都会自动更新。
