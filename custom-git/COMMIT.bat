@echo off
echo started file
cd ..

:START
echo LAST COMMIT MESSAGE:
echo ----------------------
for /f "usebackq tokens=*" %%i in ("custom-git\commitmsg.txt") do (
    set "latest=%%i"
)
echo %latest%
echo ----------------------
git add -A
echo added files

set /p message="Enter your commit message: "

REM Appending the latest commit message to the existing commit messages
type custom-git\commitmsg.txt > custom-git\temp.txt
echo %message% >> custom-git\temp.txt
move /y custom-git\temp.txt custom-git\commitmsg.txt

echo added message

if "%message%"=="push" (
    echo Pushing changes...
    call :PUSHING
) else if "%message%"=="pull" (
    echo Pulling changes...
    call :PULLING
) else if "%message%"=="cls" (
    cls
    call :START
) else (
    git commit -m "%message%"
    echo committed changes with message:
    echo %message%
)
GOTO START

:PUSHING
git push

echo Just Pushed!
GOTO START

:PULLING
git pull

echo Just Pulled!
GOTO START
