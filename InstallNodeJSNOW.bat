@echo off
where node
if %ERRORLEVEL% == 1 (
    winget install nodejs
) else (
    echo you have nodejs already
)
pause