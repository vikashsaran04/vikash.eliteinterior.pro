// Script to generate valid PDF 1.4 documents for Vikash Kumar
import fs from 'fs';
import path from 'path';

function buildPdf({ title, width = 612, height = 792, contentStream }) {
  const contentBytes = Buffer.from(contentStream, 'utf-8');
  const streamLength = contentBytes.length;

  const objects = [
    // 1: Catalog
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
    // 2: Pages
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
    // 3: Page
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`,
    // 4: Font Helvetica-Bold
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`,
    // 5: Font Helvetica
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
    // 6: Stream
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ];

  let header = '%PDF-1.4\n';
  let body = '';
  let offsets = [];

  let currentOffset = Buffer.byteLength(header, 'latin1');
  for (let i = 0; i < objects.length; i++) {
    offsets.push(currentOffset);
    body += objects[i];
    currentOffset += Buffer.byteLength(objects[i], 'latin1');
  }

  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }

  let trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${currentOffset}\n%%EOF\n`;

  return Buffer.concat([
    Buffer.from(header, 'latin1'),
    Buffer.from(body, 'latin1'),
    Buffer.from(xref, 'latin1'),
    Buffer.from(trailer, 'latin1')
  ]);
}

// 1. Digital Visiting Card PDF (3.5 x 2 inches standard card = 400 x 240 pt)
const cardWidth = 400;
const cardHeight = 240;
const cardStream = `
q
0.98 0.99 1.0 rg
0 0 400 240 re f
0.88 0.91 0.94 RG
1 w
10 10 380 220 re S
0.145 0.388 0.921 rg
15 15 370 5 re f
Q
BT
/F1 18 Tf
0.06 0.09 0.16 rg
30 185 Td
(VIKASH KUMAR) Tj
ET
BT
/F1 10 Tf
0.145 0.388 0.921 rg
30 168 Td
(CO-FOUNDER | ELITE INTERIOR) Tj
ET
BT
/F2 8 Tf
0.3 0.35 0.42 rg
30 152 Td
(Interior Design & Turnkey Execution - Ahmedabad) Tj
ET
q
0.88 0.91 0.94 RG
0.5 w
30 142 m 370 142 l S
Q
BT
/F1 8 Tf
0.1 0.15 0.2 rg
30 120 Td
(Phone / WhatsApp:) Tj
ET
BT
/F2 8 Tf
0.15 0.2 0.3 rg
125 120 Td
(+91 8529326036) Tj
ET
BT
/F1 8 Tf
0.1 0.15 0.2 rg
30 105 Td
(Personal Web:) Tj
ET
BT
/F2 8 Tf
0.145 0.388 0.921 rg
125 105 Td
(https://vikash.eliteinterior.pro/) Tj
ET
BT
/F1 8 Tf
0.1 0.15 0.2 rg
30 90 Td
(Business Web:) Tj
ET
BT
/F2 8 Tf
0.145 0.388 0.921 rg
125 90 Td
(https://eliteinterior.pro/) Tj
ET
BT
/F1 8 Tf
0.1 0.15 0.2 rg
30 75 Td
(Office Address:) Tj
ET
BT
/F2 7.5 Tf
0.2 0.25 0.3 rg
125 75 Td
(A-212a, Sun South Trade, Gala Gymkhana Road,) Tj
ET
BT
/F2 7.5 Tf
0.2 0.25 0.3 rg
125 65 Td
(South Bopal, Ahmedabad, Gujarat - 380058) Tj
ET
BT
/F1 8 Tf
0.1 0.15 0.2 rg
30 48 Td
(Native Origin:) Tj
ET
BT
/F2 8 Tf
0.2 0.25 0.3 rg
125 48 Td
(Bamarla, Serwa (Sedwa), Barmer, Rajasthan) Tj
ET
`;

const visitingCardPdf = buildPdf({
  title: 'Vikash Kumar Visiting Card',
  width: cardWidth,
  height: cardHeight,
  contentStream: cardStream
});

// 2. CV / Resume PDF (Letter size = 612 x 792 pt)
const cvWidth = 612;
const cvHeight = 792;
const cvStream = `
q
0.145 0.388 0.921 rg
0 780 612 12 re f
Q
BT
/F1 22 Tf
0.06 0.09 0.16 rg
50 740 Td
(VIKASH KUMAR) Tj
ET
BT
/F1 12 Tf
0.145 0.388 0.921 rg
50 722 Td
(Co-Founder, Elite Interior | Digital & Business Operations) Tj
ET
BT
/F2 9 Tf
0.35 0.35 0.35 rg
50 705 Td
(Ahmedabad, Gujarat | Phone: +91 8529326036 | Web: https://vikash.eliteinterior.pro/) Tj
ET
BT
/F2 9 Tf
0.35 0.35 0.35 rg
50 692 Td
(Native: Bamarla, Serwa (Sedwa), Barmer, Rajasthan | Email: vikashkumar823981@gmail.com) Tj
ET
q
0.85 0.85 0.85 RG
1 w
50 678 m 562 678 l S
Q
BT
/F1 12 Tf
0.1 0.1 0.1 rg
50 655 Td
(PROFESSIONAL PROFILE) Tj
ET
BT
/F2 9.5 Tf
0.2 0.2 0.2 rg
50 638 Td
(Vikash Kumar directs digital strategy, tech infrastructure, and business operations at Elite Interior,) Tj
ET
BT
/F2 9.5 Tf
0.2 0.2 0.2 rg
50 624 Td
(a premier interior design and turnkey execution company in Ahmedabad, Gujarat. He integrates) Tj
ET
BT
/F2 9.5 Tf
0.2 0.2 0.2 rg
50 610 Td
(technology, workflow automation, client onboarding, and marketing systems with on-ground execution.) Tj
ET
q
0.85 0.85 0.85 RG
0.5 w
50 595 m 562 595 l S
Q
BT
/F1 12 Tf
0.1 0.1 0.1 rg
50 575 Td
(PROFESSIONAL EXPERIENCE) Tj
ET
BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
50 555 Td
(Elite Interior - Ahmedabad, Gujarat) Tj
ET
BT
/F1 9.5 Tf
0.8 0.55 0.1 rg
380 555 Td
(Co-Founder | 2014 - Present) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 538 Td
(- Leads digital transformation, website development, online presence, and digital client pipelines.) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 524 Td
(- Manages client onboarding processes, project scheduling software, and communication channels.) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 510 Td
(- Collaborates with Co-Founder Ramesh Taak (Execution Lead) to bridge design and site execution.) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 496 Td
(- Oversees business development, data management, social media, and digital branding strategy.) Tj
ET
BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
50 470 Td
(Ramdev Interior Pvt. Ltd.) Tj
ET
BT
/F1 9.5 Tf
0.8 0.55 0.1 rg
380 470 Td
(Marketing Manager) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 453 Td
(- Handled marketing campaigns, client acquisition, and day-to-day business operations.) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 439 Td
(- Gained hands-on expertise in the interior design and contracting ecosystem across Gujarat.) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
50 425 Td
(- Developed foundational experience in supplier coordination and interior client management.) Tj
ET
q
0.85 0.85 0.85 RG
0.5 w
50 405 m 562 405 l S
Q
BT
/F1 12 Tf
0.1 0.1 0.1 rg
50 385 Td
(CORE COMPETENCIES & EXPERTISE) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 365 Td
(Digital Strategy & Systems:) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
180 365 Td
(Web Development, Project Scheduling Software, Process Automation) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 348 Td
(Business Operations:) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
180 348 Td
(Client Onboarding, Project Monitoring, Workflow Management) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 331 Td
(Interior Industry Knowledge:) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
180 331 Td
(Turnkey Execution, Modular Interiors, Space Planning Coordination) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 314 Td
(Brand & Communications:) Tj
ET
BT
/F2 9 Tf
0.25 0.25 0.25 rg
180 314 Td
(Social Media Management, Digital Marketing, Client Relations) Tj
ET
q
0.85 0.85 0.85 RG
0.5 w
50 295 m 562 295 l S
Q
BT
/F1 12 Tf
0.1 0.1 0.1 rg
50 275 Td
(OFFICIAL LINKS & CONTACT) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 255 Td
(Personal Website:) Tj
ET
BT
/F2 9 Tf
0.2 0.4 0.8 rg
180 255 Td
(https://vikash.eliteinterior.pro/) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 240 Td
(Business Website:) Tj
ET
BT
/F2 9 Tf
0.2 0.4 0.8 rg
180 240 Td
(https://eliteinterior.pro/) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 225 Td
(LinkedIn Profile:) Tj
ET
BT
/F2 9 Tf
0.2 0.4 0.8 rg
180 225 Td
(https://in.linkedin.com/in/vikash-kumar-045934331) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 210 Td
(Instagram Profile:) Tj
ET
BT
/F2 9 Tf
0.2 0.4 0.8 rg
180 210 Td
(https://www.instagram.com/vikiiiii.04) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 195 Td
(WhatsApp & Phone:) Tj
ET
BT
/F2 9 Tf
0.2 0.2 0.2 rg
180 195 Td
(+91 8529326036) Tj
ET
BT
/F1 9 Tf
0.1 0.1 0.1 rg
50 180 Td
(Business Office:) Tj
ET
BT
/F2 9 Tf
0.2 0.2 0.2 rg
180 180 Td
(A-212a, Sun South Trade, Gala Gymkhana Rd, South Bopal, Ahmedabad 380058) Tj
ET
q
0.9 0.9 0.9 RG
0.5 w
50 120 m 562 120 l S
Q
BT
/F2 8 Tf
0.5 0.5 0.5 rg
50 100 Td
(Verified official resume of Vikash Kumar, Co-Founder of Elite Interior, Ahmedabad, Gujarat.) Tj
ET
`;

const cvPdf = buildPdf({
  title: 'Vikash Kumar Curriculum Vitae',
  width: cvWidth,
  height: cvHeight,
  contentStream: cvStream
});

fs.writeFileSync('documents/vikash-kumar-visiting-card.pdf', visitingCardPdf);
fs.writeFileSync('documents/vikash-kumar-cv.pdf', cvPdf);
fs.writeFileSync('public/documents/vikash-kumar-visiting-card.pdf', visitingCardPdf);
fs.writeFileSync('public/documents/vikash-kumar-cv.pdf', cvPdf);

console.log('PDFs successfully generated!');
