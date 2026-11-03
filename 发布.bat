@echo off
setlocal
cd /d "%~dp0"

set "NODE=node"
where node >nul 2>nul
if not errorlevel 1 goto havenode
set "NODE=C:\Users\steroal\.workbuddy\binaries\node\current\node.exe"
if exist "%NODE%" goto havenode
set "NODE=C:\Users\steroal\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"
:havenode

echo.
echo [1/2] Building site...
"%NODE%" node_modules\astro\astro.js build
if errorlevel 1 goto err

echo.
echo [2/2] Deploying to Cloudflare Pages...
"%NODE%" node_modules\wrangler\bin\wrangler.js pages deploy dist --project-name=zhetengji --branch=main --commit-dirty=true
if errorlevel 1 goto err

echo.
echo OK  -^>  https://zhetengji.pages.dev
pause
exit /b 0

:err
echo.
echo FAILED - see the message above.
pause
exit /b 1
