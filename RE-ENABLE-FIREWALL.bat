@echo off
echo Re-enabling Windows Firewall...
netsh advfirewall set allprofiles state on
echo.
echo Firewall has been re-enabled!
echo.
pause

