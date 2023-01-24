@ECHO OFF

setlocal enabledelayedexpansion

if not exist runtime\TypescriptJSON.lua (
    call powershell "[Reflection.Assembly]::LoadWithPartialName("""System.Windows.Forms""");[Windows.Forms.MessageBox]::show("""Cannot find hardcoded reference to runtime\TypescriptJSON.lua, it doesn't exist""", """Compilation Error""", 0, 16)" > NUL
    goto :pause
)

echo checking for unsupported Typescript construct

call npx eslint .
if %ERRORLEVEL% NEQ 0 (
    call powershell "[Reflection.Assembly]::LoadWithPartialName("""System.Windows.Forms""");[Windows.Forms.MessageBox]::show("""Please check the console log""", """Compilation Error""", 0, 16)" > NUL
    goto :pause
)

call npx tstl
if %ERRORLEVEL% NEQ 0 (
    call powershell "[Reflection.Assembly]::LoadWithPartialName("""System.Windows.Forms""");[Windows.Forms.MessageBox]::show("""Please check the console log""", """Compilation Error""", 0, 16)" > NUL
    goto :pause
)



robocopy script *.lua /s /V /XD .git script node_modules .vscode /XF *.ts > NUL
mkdir script\_lib\mod 2> NUL
copy runtime\*.* script\_lib\mod > NUL

:pause
pause

