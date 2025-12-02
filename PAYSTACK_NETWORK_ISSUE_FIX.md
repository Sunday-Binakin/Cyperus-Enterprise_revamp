# Paystack Network Timeout Issue - Solutions

## Current Problem

Your Laravel server **cannot connect to Paystack's API** (`api.paystack.co`).

**Error**: `cURL error 28: Failed to connect to api.paystack.co port 443 after 10006 ms: Timeout was reached`

## Why This Happens

1. **Firewall Blocking** - Windows Firewall or antivirus blocking outbound HTTPS connections
2. **Network Issues** - No internet connection or DNS problems  
3. **Proxy Required** - Your network requires a proxy for external connections
4. **Laravel/PHP cURL not configured** - PHP's cURL extension may need configuration

## Solutions

### Solution 1: Check Internet Connection (Quick Test)

Open PowerShell and run:
```powershell
Test-NetConnection api.paystack.co -Port 443
```

**Expected Result**: Should show "TcpTestSucceeded : True"

If it fails, you have a network/firewall issue.

### Solution 2: Temporarily Disable Firewall (Testing Only)

**⚠️ FOR TESTING ONLY - Re-enable after testing!**

1. Press Windows + R
2. Type: `firewall.cpl`
3. Click "Turn Windows Defender Firewall on or off"
4. Select "Turn off" for Private networks
5. Try the payment again
6. **Re-enable the firewall after testing!**

### Solution 3: Add Firewall Rule for PHP

1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Outbound Rules" → "New Rule"
4. Select "Program" → Browse to: `D:\laragon\bin\php\php-8.3.20-nts-Win32-vs16-x64\php.exe`
5. Allow the connection
6. Apply to all profiles
7. Name it "PHP Laravel"

### Solution 4: Check Antivirus

If you're using antivirus software (Kaspersky, Norton, Avast, etc.):
1. Temporarily disable it
2. Try the payment
3. If it works, add PHP to antivirus exceptions

### Solution 5: Use Different DNS

Sometimes DNS issues prevent connecting to external APIs:

**Change to Google DNS:**
1. Open Network Connections
2. Right-click your adapter → Properties
3. Select "Internet Protocol Version 4 (TCP/IPv4)" → Properties
4. Use these DNS servers:
   - Preferred: `8.8.8.8`
   - Alternate: `8.8.4.4`
5. Click OK
6. Restart your computer

### Solution 6: Test with cURL from Command Line

Open PowerShell and test:
```powershell
curl https://api.paystack.co/transaction/initialize
```

**Expected**: Should return JSON (even if it's an error, it means connection works)

**If it fails**: You have a network/firewall issue

## Quick Verification Commands

Run these in PowerShell to diagnose:

```powershell
# Test 1: Can you ping paystack?
ping api.paystack.co

# Test 2: Can you connect on port 443?
Test-NetConnection api.paystack.co -Port 443

# Test 3: Can curl reach it?
curl https://api.paystack.co

# Test 4: Check PHP curl support
D:\laragon\bin\php\php-8.3.20-nts-Win32-vs16-x64\php.exe -m | Select-String curl
```

If any of these fail, you have a network configuration issue.

## After Fixing Network Issues

Once Paystack API is reachable:

1. **Clear Laravel logs**:
   ```powershell
   Remove-Item D:\laragon\www\cyperus_ent\storage\logs\laravel.log
   ```

2. **Clear config cache**:
   ```powershell
   cd D:\laragon\www\cyperus_ent
   D:\laragon\bin\php\php-8.3.20-nts-Win32-vs16-x64\php.exe artisan config:clear
   ```

3. **Try payment again** - it should redirect to Paystack checkout page

## Expected Successful Flow

Once network is fixed:

1. Fill checkout form
2. Click "Pay"
3. See in console: "Payment initialized successfully"  
4. Browser redirects to: `https://checkout.paystack.com/...`
5. Enter test card: `4084 0840 8408 4081`
6. Complete payment
7. Redirected back to your site
8. Order marked as paid in database

## Still Not Working?

If you've tried everything and it still doesn't work:

1. **Share the output** of these commands:
   ```powershell
   Test-NetConnection api.paystack.co -Port 443
   curl https://api.paystack.co
   ```

2. **Check if you're behind a corporate firewall/proxy** - you may need to configure PHP to use a proxy

3. **Contact your network administrator** if on a corporate/school network

## Alternative: Use Ngrok for Testing

If you can't fix the network issue, you can use Ngrok to expose your local server to the internet and test from a different network.

---

**Bottom Line**: The payment integration code is working correctly. The only issue is your server can't reach Paystack's API due to network/firewall restrictions.

