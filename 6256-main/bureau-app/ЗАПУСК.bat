@echo off
chcp 65001 >nul
echo Запуск приложения СЭЦ «БЮРО ЭКСПЕРТОВ»...
echo.
cd /d "%~dp0"
set PORT=3001
call npm start
pause
