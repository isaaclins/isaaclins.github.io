@echo off
setlocal

echo started file

git add .
echo added files

set /p message="Enter your commit message: "
echo added message

git commit -m "%message%"
echo committed changes

git push
echo pushed changes

pause
