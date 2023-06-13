@echo off
echo started file
cd ..
git add .
echo added files

set /p message="Enter your commit message: "
echo added message

git commit -m "%message%"
echo committed changes with message: 
echo %message%

pause
