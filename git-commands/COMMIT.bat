@echo off
echo started file
cd ..
:START
git add .
echo added files

set /p message="Enter your commit message: "
echo added message

git commit -m "%message%"
echo committed changes with message: 
echo %message%
echo .
cls
GOTO START