import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SelectionsData {
  date: string;
  food: string[];
  desserts: string[];
  activities: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { date, food, desserts, activities }: SelectionsData = await req.json();

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; background-color: #fff5f7; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    h1 { color: #e74c6c; font-size: 28px; text-align: center; margin-bottom: 30px; }
    h2 { color: #2c3e50; font-size: 20px; margin-top: 25px; margin-bottom: 15px; border-bottom: 2px solid #ffe4e9; padding-bottom: 10px; }
    ul { list-style: none; padding: 0; }
    li { background: #fff5f7; padding: 10px 15px; margin: 8px 0; border-radius: 8px; color: #2c3e50; }
    .date-info { background: linear-gradient(135deg, #ff6b9d 0%, #e74c6c 100%); color: white; padding: 15px; border-radius: 10px; text-align: center; font-size: 18px; margin-bottom: 30px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>💝 Sparshi's Date Selections 💝</h1>

    <div class="date-info">
      <strong>Selected Date:</strong> ${date || 'Not selected'}
    </div>

    <h2>🍽️ Food Preferences</h2>
    <ul>
      ${food && food.length > 0 ? food.map(item => `<li>${item}</li>`).join('') : '<li>No selections made</li>'}
    </ul>

    <h2>🍰 Dessert Choices</h2>
    <ul>
      ${desserts && desserts.length > 0 ? desserts.map(item => `<li>${item}</li>`).join('') : '<li>No selections made</li>'}
    </ul>

    <h2>💕 Date Activities</h2>
    <ul>
      ${activities && activities.length > 0 ? activities.map(item => `<li>${item}</li>`).join('') : '<li>No selections made</li>'}
    </ul>

    <div class="footer">
      <p>Made with love for Sparshi 💖</p>
    </div>
  </div>
</body>
</html>
    `;

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Valentine Selections <onboarding@resend.dev>',
        to: ['adityagururanii@gmail.com'],
        subject: `💝 Sparshi's Valentine Date Selections`,
        html: emailContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Email sending failed: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully!' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});
