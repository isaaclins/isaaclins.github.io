@echo off
echo started file
cd ..

:START
echo LAST COMMIT MESSAGE:
echo -------------------
type custom-git\commitmsg.txt
echo -------------------
git add .
echo added files

set /p message="Enter your commit message: "
echo %message% > custom-git\commitmsg.txt
echo added message

if "%message%"=="push" (
    echo Pushing changes...
    call :PUSHING
) else if "%message%"=="pull" (
    echo Pulling changes...
    call :PULLING
) else (
    git commit -m "%message%"
    echo committed changes with message:
    echo %message%
)
cls
GOTO START

:PUSHING
git push

echo Just Pushed!
GOTO START

:PULLING
git pull

echo Just Pulled!
GOTO START
