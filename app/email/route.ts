export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goldhelmutaward.com";
  const formUrl = `${siteUrl}/profile-submission`;

  const html = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gold Helmet Award — Winner Profiles</title>
  <!--[if gte mso 15]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    body, #bodyTable { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #f4f1ec; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height: 100%; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    #outlook a { padding: 0; }
    .ReadMsgBody { width: 100%; }
    .ExternalClass { width: 100%; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f1ec; -webkit-font-smoothing:antialiased;">
  <table id="bodyTable" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f1ec;">
    <tr>
      <td align="center" valign="top" style="padding:30px 10px;">

        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; width:100%;">

          <!-- Header: dark bar -->
          <tr>
            <td align="center" style="background-color:#1a1a1a; padding:32px 40px; border-radius:8px 8px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:11px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:#b8953e;">
                      Gold Helmet Award
                    </p>
                    <p style="margin:8px 0 0; font-family:Georgia, 'Times New Roman', serif; font-size:28px; font-style:italic; font-weight:600; color:#f0ede8; line-height:1.3;">
                      You're Part of History
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="background-color:#b8953e; height:3px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff; padding:40px 40px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#333333;">
                    <p style="margin:0 0 16px;">
                      Hi there,
                    </p>
                    <p style="margin:0 0 16px;">
                      We're building out the <strong>Gold Helmet Award website</strong> with a dedicated profile for every winner since 1951. Your name is already on the timeline, but we'd love to give you the full treatment: stats, quotes, your story.
                    </p>
                    <p style="margin:0 0 16px;">
                      We've put together a short form where you can share as much or as little as you'd like. If you have a link to a Denver Post article, an old write-up, or even a photo of a newspaper clipping, that works great too. We'll handle all the formatting.
                    </p>
                    <p style="margin:0 0 8px;">
                      Here's what we're looking for:
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Checklist -->
          <tr>
            <td style="background-color:#ffffff; padding:0 40px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#faf8f5; border-radius:6px; border:1px solid #e8e3db;">
                <tr>
                  <td style="padding:24px 28px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; line-height:1.8; color:#555555;">
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;A one-line headline about your season<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;A short bio (2-4 sentences)<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;Your key stats<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;A quote from you, and one from your coach<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;Community involvement<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;Where you went after high school<br>
                    <span style="color:#b8953e; font-weight:600;">&#10003;</span>&nbsp;&nbsp;An action photo (if you have one)
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="background-color:#ffffff; padding:0 40px 40px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#1a1a1a; border-radius:4px;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${formUrl}" style="height:50px;v-text-anchor:middle;width:320px;" arcsize="8%" fillcolor="#1a1a1a" stroke="f">
                    <w:anchorlock/>
                    <center style="color:#b8953e; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; font-weight:bold; letter-spacing:2px; text-transform:uppercase;">FILL OUT YOUR PROFILE</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${formUrl}" target="_blank" style="display:inline-block; padding:16px 48px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#b8953e; text-decoration:none; border:1px solid rgba(184,149,62,0.3); border-radius:4px;">
                      Fill Out Your Profile
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing note -->
          <tr>
            <td style="background-color:#ffffff; padding:0 40px 40px; border-radius:0 0 8px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="border-top:1px solid #e8e3db; padding-top:24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#777777;">
                    <p style="margin:0 0 12px;">
                      No rush on this. Fill it out when you get a chance, and we'll take care of the rest.
                    </p>
                    <p style="margin:0;">
                      Thanks for being part of the Gold Helmet tradition.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px;">
              <p style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; color:#999999; line-height:1.5;">
                Gold Helmet Award Corp<br>
                Recognizing excellence in Colorado high school football since 1951
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
