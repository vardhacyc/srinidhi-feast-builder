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

export const generateQuotationPDF = (data: QuotationData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const gold = [201, 162, 39] as const;
  const dark = [10, 10, 10] as const;
  const warmGray = [120, 110, 100] as const;

  // ── Header Banner ──
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Gold accent line
  doc.setFillColor(...gold);
  doc.rect(0, 45, pageWidth, 2, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Sri Nidhi', margin, 22);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gold);
  doc.text('C A T E R I N G', margin, 30);

  // Contact info on right
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text('+91 87601 01010', pageWidth - margin, 18, { align: 'right' });
  doc.text('srinidhicatering10@gmail.com', pageWidth - margin, 24, { align: 'right' });
  doc.text('Coimbatore, Tamil Nadu', pageWidth - margin, 30, { align: 'right' });

  // ── Quotation Title ──
  let y = 55;
  doc.setFontSize(18);
  doc.setTextColor(...dark);
  doc.setFont('helvetica', 'bold');
  doc.text('QUOTATION', margin, y);

  // Quotation details on right
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...warmGray);
  doc.text(`Ref: ${data.quotationNumber}`, pageWidth - margin, y - 5, { align: 'right' });
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth - margin, y + 1, { align: 'right' });
  doc.text(`Valid for: ${data.validityDays} days`, pageWidth - margin, y + 7, { align: 'right' });

  // ── Divider ──
  y += 12;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  // ── Customer & Event Details ──
  y += 8;
  const colMid = pageWidth / 2;

  // Left: Customer Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Customer Details', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...warmGray);
  y += 7;
  doc.text(`Name: ${data.customerName}`, margin, y);
  y += 5;
  doc.text(`Phone: ${data.customerPhone}`, margin, y);
  y += 5;
  if (data.customerEmail) doc.text(`Email: ${data.customerEmail}`, margin, y);

  // Right: Event Info
  let yRight = y - 17;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Event Details', colMid + 5, yRight);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...warmGray);
  yRight += 7;
  doc.text(`Type: ${data.eventType || 'Not specified'}`, colMid + 5, yRight);
  yRight += 5;
  doc.text(`Date: ${data.eventDate || 'TBD'}`, colMid + 5, yRight);
  yRight += 5;
  if (data.eventTime) doc.text(`Time: ${data.eventTime}`, colMid + 5, yRight);
  yRight += 5;
  doc.text(`Guests: ${data.guestCount}`, colMid + 5, yRight);

  y += 8;
  if (data.deliveryAddress) {
    doc.setTextColor(...warmGray);
    doc.text(`Delivery: ${data.deliveryAddress}`, margin, y, { maxWidth: pageWidth - margin * 2 });
    y += 8;
  }

  // ── Items Table ──
  y += 5;
  const tableBody = data.items.map((item, i) => [
    (i + 1).toString(),
    item.name,
    item.quantity.toString(),
    `₹${item.rate.toLocaleString('en-IN')}`,
    `₹${item.total.toLocaleString('en-IN')}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [['#', 'Item', 'Qty', 'Rate', 'Amount']],
    body: tableBody,
    theme: 'plain',
    headStyles: {
      fillColor: [...dark],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 4,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [60, 60, 60],
      cellPadding: 3.5,
    },
    alternateRowStyles: {
      fillColor: [248, 245, 240],
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 35, halign: 'right' },
    },
    margin: { left: margin, right: margin },
    didDrawPage: () => {
      // Gold line under header on each page
      doc.setFillColor(...gold);
      doc.rect(margin, y + 12, pageWidth - margin * 2, 0.5, 'F');
    },
  });

  // ── Totals ──
  const finalY = (doc as any).lastAutoTable.finalY + 5;
  const totalsX = pageWidth - margin - 60;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...warmGray);
  doc.text('Subtotal:', totalsX, finalY);
  doc.text(`₹${data.subtotal.toLocaleString('en-IN')}`, pageWidth - margin, finalY, { align: 'right' });

  doc.text('GST (5%):', totalsX, finalY + 6);
  doc.text(`₹${data.gstAmount.toLocaleString('en-IN')}`, pageWidth - margin, finalY + 6, { align: 'right' });

  // Grand total line
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.line(totalsX - 5, finalY + 10, pageWidth - margin, finalY + 10);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Grand Total:', totalsX, finalY + 17);
  doc.setTextColor(...gold);
  doc.text(`₹${data.grandTotal.toLocaleString('en-IN')}`, pageWidth - margin, finalY + 17, { align: 'right' });

  // ── Notes ──
  let notesY = finalY + 28;
  if (data.notes) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Special Instructions:', margin, notesY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...warmGray);
    notesY += 5;
    doc.text(data.notes, margin, notesY, { maxWidth: pageWidth - margin * 2 });
    notesY += 10;
  }

  // ── Terms & Conditions ──
  const termsY = notesY + 5;
  doc.setFillColor(248, 245, 240);
  doc.rect(margin, termsY - 3, pageWidth - margin * 2, 40, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Terms & Conditions', margin + 3, termsY + 3);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...warmGray);
  doc.setFontSize(7);
  const terms = [
    `1. This quotation is valid for ${data.validityDays} days from the date of issue.`,
    '2. 50% advance payment required to confirm the order.',
    '3. Final prices may vary based on market rates and availability.',
    '4. GST of 5% is applicable on all items.',
    '5. Cancellation within 48 hours of the event will incur a 25% charge.',
    '6. Menu items are subject to seasonal availability.',
  ];
  terms.forEach((term, i) => {
    doc.text(term, margin + 3, termsY + 9 + i * 4.5);
  });

  // ── Footer ──
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFillColor(...gold);
  doc.rect(0, footerY - 3, pageWidth, 1, 'F');

  doc.setFontSize(7);
  doc.setTextColor(...warmGray);
  doc.text(
    'Sri Nidhi Catering | B 111, Manchester Grand, MG Road, Avarampalayam, Coimbatore, TN - 641004',
    pageWidth / 2, footerY + 3, { align: 'center' }
  );
  doc.text(
    'Phone: +91 87601 01010 | Email: srinidhicatering10@gmail.com',
    pageWidth / 2, footerY + 8, { align: 'center' }
  );

  // Save
  doc.save(`Quotation_${data.quotationNumber}_${data.customerName.replace(/\s+/g, '_')}.pdf`);
};
