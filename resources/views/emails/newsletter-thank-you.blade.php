<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank You for Subscribing</title>
</head>

@php
    $appUrl = env('APP_URL');
@endphp
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8;">

  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #27AE60; padding: 30px 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 26px;">🎉 Thank You for Subscribing!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px 20px; color: #333333;">
              <p style="font-size: 16px;">Dear Subscriber,</p>

              <p style="font-size: 15px; margin-top: 10px;">
                Welcome to the AbuLegal community! We're thrilled to have you on board.
              </p>

              <p style="font-size: 15px;">
                From now on, you’ll receive exclusive updates on legal news, upcoming events, and special offers delivered straight to your inbox.
              </p>

              <p style="font-size: 15px;">
                If you ever have questions or need support, feel free to <a href="{{ $appUrl }}/contact" style="color: #27AE60; text-decoration: underline;">contact our team</a> anytime.
              </p>

              <p style="margin-top: 30px;">Warm regards,<br><strong>The AbuLegal Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f3f5; text-align: center; padding: 20px; font-size: 12px; color: #777;">
              <p style="margin: 0;">This email was sent to <strong>{{ $email }}</strong>. If you did not subscribe, you may safely ignore this message.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>