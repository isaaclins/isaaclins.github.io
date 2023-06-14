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

if "%message%"=="push" (
    echo Pushing changes...
    call :PUSHING
) else (
    git commit -m "%message%"
    echo committed changes with message:
    echo %message%
    pause
)
cls
GOTO START

:PUSHING
git push
echo pushed changes to remote repository
GOTO START