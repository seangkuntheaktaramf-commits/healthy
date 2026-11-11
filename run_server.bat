@echo off
chcp 65001 >nul
cd /d "%~dp0"
title ផ្ទះម៉ាក់រចនា - Khmer Kitchen & Online E-Commerce

echo ========================================================
echo   ផ្ទះម៉ាក់រចនា (Pteah Mak Rachana) - E-Commerce Web System
echo   Starting Local Server at http://localhost:8080 ...
echo ========================================================

:: Open browser
start "" "http://localhost:8080"

:: Start python HTTP server with auto fallback
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python -m http.server 8080
) else (
    where py >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        py -m http.server 8080
    ) else (
        echo [ERROR] Python is not found in PATH!
        echo Opening index.html directly in browser...
        start "" "%~dp0index.html"
    )
)

pause
