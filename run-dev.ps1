<#
Run both backend and frontend in separate PowerShell windows (Windows only).

Usage:
  .\run-dev.ps1

This opens two new PowerShell windows: one running the Spring Boot backend
via the Gradle wrapper and one running the Vite dev server for the frontend.
#>

Write-Host "Launching backend and frontend in new PowerShell windows..."

$backendCmd = "cd '$PSScriptRoot\backend\expense-manager-api'; .\gradlew.bat bootRun"
Start-Process powershell -ArgumentList @('-NoExit', '-Command', $backendCmd)

Start-Sleep -Milliseconds 800

$frontendCmd = "cd '$PSScriptRoot\frontend'; npm run dev"
Start-Process powershell -ArgumentList @('-NoExit', '-Command', $frontendCmd)

Write-Host "Started backend and frontend processes. Check the new windows for logs." 
