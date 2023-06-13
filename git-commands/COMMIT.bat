@echo off
echo started file
cd ..

:START
echo LAST COMMIT MESSAGE:
echo -------------------
type commitmsg.txt
echo -------------------
git add .
echo added files

set /p message="Enter your commit message: "
echo %message% > commitmsg.txt
echo added message

git commit -m "%message%"
echo committed changes with message: 
echo %message%
pause
cls
GOTO START
