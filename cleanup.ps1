# 停止所有Node进程
Write-Host "正在停止所有Node进程..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# 清理Next.js缓存
Write-Host "正在清理Next.js缓存..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# 清理node_modules
Write-Host "正在清理node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}

# 重新安装依赖
Write-Host "正在重新安装依赖..." -ForegroundColor Green
npm install

# 启动开发服务器
Write-Host "正在启动开发服务器..." -ForegroundColor Green
npm run dev 