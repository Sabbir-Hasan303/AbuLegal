<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8;">

  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #2F80ED; padding: 30px 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">📩 New Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px 20px; color: #333333;">
              <p style="font-size: 16px;">Hello Admin,</p>

              <p style="font-size: 15px;">You've received a new message through the contact form. Here are the details:</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="padding: 10px 0;"><strong>Name:</strong></td>
                  <td style="padding: 10px 0;">{{ $contact->first_name }} {{ $contact->last_name }}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px 0;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0;">{{ $contact->email }}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;"><strong>Phone:</strong></td>
                  <td style="padding: 10px 0;">{{ $contact->phone }}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px 0;"><strong>Subject:</strong></td>
                  <td style="padding: 10px 0;">{{ $contact->subject }}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 20px;"><strong>Message:</strong></td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 10px 0; background-color: #f1f3f5; border-radius: 5px;">
                    <p style="margin: 0;">{{ $contact->message }}</p>
                  </td>
                </tr>
              </table>

              <p style="margin-top: 30px;">Please review the submission and take any necessary actions.</p>

              <p>Best regards,<br><strong>AbuLegal System</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>