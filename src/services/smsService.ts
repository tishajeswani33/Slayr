/**
 * Twilio SMS Gateway Integration Service
 * Dispatches real-time SMS validation codes to user devices.
 */
export async function sendSMS(to: string, message: string): Promise<boolean> {
  const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
  const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
  const fromNumber = import.meta.env.VITE_TWILIO_FROM_NUMBER;

  // Check if Twilio config exists and is not a placeholder
  if (!accountSid || !authToken || !fromNumber || 
      accountSid.includes('placeholder') || 
      accountSid === 'demo') {
    console.warn('⚠️ Twilio SMS config is missing or placeholder. SMS dispatch skipped for number:', to);
    return false;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
  // URL encoded parameters required by Twilio API
  const bodyParams = new URLSearchParams();
  bodyParams.append('To', to);
  bodyParams.append('From', fromNumber);
  bodyParams.append('Body', message);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Twilio REST request failed:', errorText);
      return false;
    }

    console.log('✅ Twilio SMS dispatched successfully to:', to);
    return true;
  } catch (error) {
    console.error('❌ Twilio SMS dispatch error:', error);
    return false;
  }
}
