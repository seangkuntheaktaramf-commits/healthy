@echo off
title ផ្ទះម៉ាក់រចនា - Khmer Kitchen & Online E-Commerce
echo ========================================================
echo   ផ្ទះម៉ាក់រចនា (Pteah Mak Rachana) - E-Commerce Web System
echo   Starting Local Server at http://localhost:8080 ...
echo ========================================================
start http://localhost:8080
python -m http.server 8080
pause

