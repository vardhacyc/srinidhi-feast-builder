import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface QuotationItem {
  name: string;
  rate: number;
  quantity: number;
  total: number;
}

export interface QuotationData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventDate: string;
  eventTime: string;
  deliveryAddress: string;
  eventType: string;
  guestCount: number;
  notes: string;
  items: QuotationItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  quotationNumber: string;
  validityDays: number;
}

// ── Color Palette ──
const SAFFRON = [201, 122, 25];    // Deep saffron
const GOLD = [196, 155, 45];       // Warm gold
const CREAM = [255, 248, 235];     // Warm cream
const DARK_BROWN = [45, 30, 15];   // Rich espresso
const WARM_GRAY = [110, 95, 80];   // Warm gray
const TERRACOTTA = [180, 90, 40];  // Terracotta accent
const LIGHT_SAFFRON = [255, 240, 218]; // Light saffron tint
const WHITE = [255, 255, 255];

const r = (c: number[]) => c as [number, number, number];

export const generateQuotationPDF = (data: QuotationData) => {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 16; // margin

  // ═══════════════════════════════════════════
  // FULL PAGE WARM CREAM BACKGROUND
  // ═══════════════════════════════════════════
  doc.setFillColor(...r(CREAM));
  doc.rect(0, 0, pw, ph, 'F');

  // ── Decorative top border (saffron gradient band) ──
  doc.setFillColor(...r(SAFFRON));
  doc.rect(0, 0, pw, 4, 'F');
  doc.setFillColor(...r(GOLD));
  doc.rect(0, 4, pw, 1.5, 'F');

  // ═══════════════════════════════════════════
  // HEADER SECTION
  // ═══════════════════════════════════════════
  let y = 18;

  // Company name - large, elegant
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...r(DARK_BROWN));
  doc.text('Sri Nidhi', m, y);

  // "CATERING" in saffron, spaced
  doc.setFontSize(9);
  doc.setTextColor(...r(SAFFRON));
  doc.setFont('helvetica', 'normal');
  doc.text('C  A  T  E  R  I  N  G', m, y + 7);

  // Decorative motif - small diamond pattern
  const motifX = m + 2;
  const motifY = y + 12;
  doc.setFillColor(...r(GOLD));
  for (let i = 0; i < 5; i++) {
    doc.circle(motifX + i * 5, motifY, 0.6, 'F');
  }

  // Contact info - right aligned, warm gray
  doc.setFontSize(7.5);
  doc.setTextColor(...r(WARM_GRAY));
  doc.setFont('helvetica', 'normal');
  const cx = pw - m;
  doc.text('+91 87601 01010', cx, y - 3, { align: 'right' });
  doc.text('srinidhicatering10@gmail.com', cx, y + 2, { align: 'right' });
  doc.text('B 111, Manchester Grand, MG Road', cx, y + 7, { align: 'right' });
  doc.text('Coimbatore, Tamil Nadu - 641004', cx, y + 12, { align: 'right' });

  // Horizontal divider with saffron
  y = 38;
  doc.setDrawColor(...r(GOLD));
  doc.setLineWidth(0.4);
  doc.line(m, y, pw - m, y);
  doc.setDrawColor(...r(SAFFRON));
  doc.setLineWidth(0.15);
  doc.line(m, y + 1.5, pw - m, y + 1.5);

  // ═══════════════════════════════════════════
  // QUOTATION TITLE SECTION
  // ═══════════════════════════════════════════
  y = 48;

  // Warm background strip for title
  doc.setFillColor(...r(LIGHT_SAFFRON));
  doc.roundedRect(m, y - 5, pw - m * 2, 18, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...r(DARK_BROWN));
  doc.text('QUOTATION', m + 5, y + 4);

  // Ref details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...r(WARM_GRAY));
  doc.text(`Ref: ${data.quotationNumber}`, cx - 5, y - 1, { align: 'right' });
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Date: ${dateStr}`, cx - 5, y + 4, { align: 'right' });
  doc.setTextColor(...r(TERRACOTTA));
  doc.text(`Valid for ${data.validityDays} days`, cx - 5, y + 9, { align: 'right' });

  // ═══════════════════════════════════════════
  // CUSTOMER & EVENT DETAILS
  // ═══════════════════════════════════════════
  y = 72;
  const colMid = pw / 2 + 2;

  // Customer card
  doc.setFillColor(...r(WHITE));
  doc.setDrawColor(220, 210, 195);
  doc.setLineWidth(0.3);
  doc.roundedRect(m, y - 4, colMid - m - 4, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...r(SAFFRON));
  doc.text('CUSTOMER DETAILS', m + 5, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...r(DARK_BROWN));
  y += 9;
  doc.text(data.customerName, m + 5, y);
  doc.setTextColor(...r(WARM_GRAY));
  if (data.customerPhone) { y += 5; doc.text(data.customerPhone, m + 5, y); }
  if (data.customerEmail) { y += 5; doc.text(data.customerEmail, m + 5, y); }
  if (data.deliveryAddress) { y += 5; doc.text(data.deliveryAddress, m + 5, y, { maxWidth: colMid - m - 14 }); }

  // Event card
  let ey = 72;
  doc.setFillColor(...r(WHITE));
  doc.roundedRect(colMid, ey - 4, pw - m - colMid, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...r(SAFFRON));
  doc.text('EVENT DETAILS', colMid + 5, ey + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...r(DARK_BROWN));
  ey += 9;
  doc.text(data.eventType || 'Not specified', colMid + 5, ey);
  doc.setTextColor(...r(WARM_GRAY));
  if (data.eventDate) {
    ey += 5;
    const formatted = new Date(data.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.text(`Date: ${formatted}`, colMid + 5, ey);
  }
  if (data.eventTime) { ey += 5; doc.text(`Time: ${data.eventTime}`, colMid + 5, ey); }
  ey += 5;
  doc.setTextColor(...r(TERRACOTTA));
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.guestCount} Guests`, colMid + 5, ey);

  // ═══════════════════════════════════════════
  // ITEMS TABLE
  // ═══════════════════════════════════════════
  const tableY = 112;

  const tableBody = data.items.map((item, i) => [
    (i + 1).toString(),
    item.name,
    item.quantity.toString(),
    `\u20B9${item.rate.toLocaleString('en-IN')}`,
    `\u20B9${item.total.toLocaleString('en-IN')}`,
  ]);

  autoTable(doc, {
    startY: tableY,
    head: [['#', 'Item Description', 'Qty', 'Rate', 'Amount']],
    body: tableBody,
    theme: 'plain',
    styles: {
      font: 'helvetica',
      cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
    },
    headStyles: {
      fillColor: r(DARK_BROWN),
      textColor: r(GOLD),
      fontStyle: 'bold',
      fontSize: 8.5,
      cellPadding: { top: 5, bottom: 5, left: 5, right: 5 },
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: r(DARK_BROWN),
    },
    alternateRowStyles: {
      fillColor: r(LIGHT_SAFFRON),
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center', textColor: r(WARM_GRAY), fontSize: 8 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 22, halign: 'center' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 35, halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: m, right: m },
    tableLineColor: [220, 210, 195],
    tableLineWidth: 0.2,
    didDrawCell: (cellData) => {
      // Gold line under header
      if (cellData.section === 'head') {
        doc.setFillColor(...r(GOLD));
        doc.rect(cellData.cell.x, cellData.cell.y + cellData.cell.height - 0.8, cellData.cell.width, 0.8, 'F');
      }
    },
  });

  // ═══════════════════════════════════════════
  // TOTALS SECTION
  // ═══════════════════════════════════════════
  let fy = (doc as any).lastAutoTable.finalY + 4;
  const totW = 75;
  const totX = pw - m - totW;

  // Subtotal
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...r(WARM_GRAY));
  doc.text('Subtotal', totX + 5, fy + 5);
  doc.setTextColor(...r(DARK_BROWN));
  doc.text(`\u20B9${data.subtotal.toLocaleString('en-IN')}`, pw - m - 5, fy + 5, { align: 'right' });

  // GST
  fy += 7;
  doc.setTextColor(...r(WARM_GRAY));
  doc.text('GST (5%)', totX + 5, fy + 5);
  doc.setTextColor(...r(DARK_BROWN));
  doc.text(`\u20B9${data.gstAmount.toLocaleString('en-IN')}`, pw - m - 5, fy + 5, { align: 'right' });

  // Grand total band
  fy += 10;
  doc.setFillColor(...r(SAFFRON));
  doc.roundedRect(totX, fy, totW, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...r(WHITE));
  doc.text('GRAND TOTAL', totX + 5, fy + 9);
  doc.setFontSize(12);
  doc.text(`\u20B9${data.grandTotal.toLocaleString('en-IN')}`, pw - m - 5, fy + 9, { align: 'right' });

  // ═══════════════════════════════════════════
  // NOTES
  // ═══════════════════════════════════════════
  fy += 22;
  if (data.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...r(SAFFRON));
    doc.text('SPECIAL INSTRUCTIONS', m, fy);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...r(WARM_GRAY));
    fy += 5;
    doc.text(data.notes, m, fy, { maxWidth: pw - m * 2 });
    fy += 10;
  }

  // ═══════════════════════════════════════════
  // TERMS & CONDITIONS
  // ═══════════════════════════════════════════
  fy += 2;
  doc.setFillColor(...r(WHITE));
  doc.setDrawColor(220, 210, 195);
  doc.setLineWidth(0.3);
  const termsH = 32;
  doc.roundedRect(m, fy, pw - m * 2, termsH, 2, 2, 'FD');

  // Saffron left accent bar
  doc.setFillColor(...r(GOLD));
  doc.rect(m, fy, 2.5, termsH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...r(DARK_BROWN));
  doc.text('Terms & Conditions', m + 7, fy + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...r(WARM_GRAY));
  const terms = [
    `This quotation is valid for ${data.validityDays} days from the date of issue.`,
    '50% advance payment required to confirm the order.',
    'Final prices may vary based on market rates and seasonal availability.',
    'GST of 5% is applicable on all food items as per government regulations.',
    'Cancellation within 48 hours of event will incur a 25% cancellation charge.',
  ];
  terms.forEach((t, i) => {
    doc.text(`${i + 1}.  ${t}`, m + 7, fy + 10 + i * 4.2);
  });

  // ═══════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════
  const footY = ph - 14;

  // Saffron bottom border
  doc.setFillColor(...r(GOLD));
  doc.rect(0, footY - 2, pw, 0.5, 'F');
  doc.setFillColor(...r(SAFFRON));
  doc.rect(0, ph - 4, pw, 4, 'F');

  doc.setFontSize(6.5);
  doc.setTextColor(...r(WARM_GRAY));
  doc.text(
    'Sri Nidhi Catering  \u2022  B 111, Manchester Grand, MG Road, Coimbatore  \u2022  +91 87601 01010  \u2022  srinidhicatering10@gmail.com',
    pw / 2, footY + 2, { align: 'center' }
  );

  // Small decorative dots in footer
  doc.setFillColor(...r(GOLD));
  for (let i = 0; i < 3; i++) {
    doc.circle(pw / 2 - 4 + i * 4, footY + 6, 0.5, 'F');
  }

  // ── Save ──
  doc.save(`Quotation_${data.quotationNumber}_${data.customerName.replace(/\s+/g, '_')}.pdf`);
};
