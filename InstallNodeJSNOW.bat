@echo off
where node
if %ERRORLEVEL% == 1 (
    winget install OpenJS.NodeJS
) else (
    echo you have nodejs already
)
where git
if %ERRORLEVEL% == 1 (
    winget install Git.git
) else (
    echo you have git already
)
pause