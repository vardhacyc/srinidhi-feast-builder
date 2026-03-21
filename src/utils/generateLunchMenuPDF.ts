import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LUNCH_PACKAGES, ADD_ONS, SERVICE_CHARGES } from '@/data/lunchPackages';

const SAFFRON = [201, 122, 25] as const;
const GOLD = [196, 155, 45] as const;
const CREAM = [255, 248, 235] as const;
const DARK = [45, 30, 15] as const;
const GRAY = [110, 95, 80] as const;
const LIGHT = [255, 240, 218] as const;
const WHITE = [255, 255, 255] as const;
const TERRACOTTA = [180, 90, 40] as const;
const r = (c: readonly number[]) => [...c] as [number, number, number];

export const generateLunchMenuPDF = () => {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 14;

  const drawPageBg = () => {
    doc.setFillColor(...r(CREAM));
    doc.rect(0, 0, pw, ph, 'F');
    doc.setFillColor(...r(SAFFRON));
    doc.rect(0, 0, pw, 3.5, 'F');
    doc.setFillColor(...r(GOLD));
    doc.rect(0, 3.5, pw, 1, 'F');
    // Footer
    doc.setFillColor(...r(GOLD));
    doc.rect(0, ph - 10, pw, 0.4, 'F');
    doc.setFillColor(...r(SAFFRON));
    doc.rect(0, ph - 3, pw, 3, 'F');
    doc.setFontSize(6);
    doc.setTextColor(...r(GRAY));
    doc.setFont('helvetica', 'normal');
    doc.text('Sri Nidhi Catering  •  Coimbatore  •  +91 87601 01010', pw / 2, ph - 5, { align: 'center' });
  };

  drawPageBg();

  // ── Page 1: Cover Header ──
  let y = 16;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...r(DARK));
  doc.text('Sri Nidhi', m, y);
  doc.setFontSize(8);
  doc.setTextColor(...r(SAFFRON));
  doc.setFont('helvetica', 'normal');
  doc.text('C  A  T  E  R  I  N  G', m, y + 6);

  // Contact right
  doc.setFontSize(7);
  doc.setTextColor(...r(GRAY));
  doc.text('+91 87601 01010', pw - m, y - 2, { align: 'right' });
  doc.text('Coimbatore, Tamil Nadu', pw - m, y + 3, { align: 'right' });

  // Divider
  y = 30;
  doc.setDrawColor(...r(GOLD));
  doc.setLineWidth(0.3);
  doc.line(m, y, pw - m, y);

  // Title
  y = 40;
  doc.setFillColor(...r(LIGHT));
  doc.roundedRect(m, y - 5, pw - m * 2, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...r(DARK));
  doc.text('LUNCH PACKAGES', m + 5, y + 4);
  doc.setFontSize(8);
  doc.setTextColor(...r(TERRACOTTA));
  doc.text('Traditional South Indian Feast', pw - m - 5, y + 4, { align: 'right' });

  // Decorative dots
  doc.setFillColor(...r(GOLD));
  for (let i = 0; i < 7; i++) doc.circle(m + 5 + i * 4, y + 9, 0.4, 'F');

  y = 58;

  // ── Render packages ──
  LUNCH_PACKAGES.forEach((pkg, idx) => {
    // Check if we need a new page
    const estimatedHeight = 12 + Math.ceil(pkg.items.length / 2) * 5 + 8;
    if (y + estimatedHeight > ph - 20) {
      doc.addPage();
      drawPageBg();
      y = 14;
    }

    // Package header bar
    const headerH = 10;
    if (pkg.highlight) {
      doc.setFillColor(...r(SAFFRON));
    } else {
      doc.setFillColor(...r(DARK));
    }
    doc.roundedRect(m, y, pw - m * 2, headerH, 1.5, 1.5, 'F');

    // Gold underline
    doc.setFillColor(...r(GOLD));
    doc.rect(m, y + headerH - 0.6, pw - m * 2, 0.6, 'F');

    // Package name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...(pkg.highlight ? r(WHITE) : r(GOLD)));
    doc.text(pkg.name, m + 5, y + 6.5);

    // Price
    doc.setFontSize(11);
    doc.setTextColor(...(pkg.highlight ? r(WHITE) : r(GOLD)));
    doc.text(`₹${pkg.price}/-`, pw - m - 5, y + 6.5, { align: 'right' });

    // Highlight badge
    if (pkg.highlight) {
      doc.setFontSize(6);
      doc.setTextColor(...r(LIGHT));
      doc.text(`★ ${pkg.highlight}`, pw - m - 30, y + 6.5, { align: 'right' });
    }

    y += headerH + 3;

    // Items in 2 columns
    doc.setFillColor(...r(WHITE));
    doc.setDrawColor(225, 215, 200);
    doc.setLineWidth(0.2);
    const itemRows = Math.ceil(pkg.items.length / 2);
    const itemsBlockH = itemRows * 5 + 4;
    doc.roundedRect(m, y - 1, pw - m * 2, itemsBlockH, 1, 1, 'FD');

    // Gold left accent
    doc.setFillColor(...r(GOLD));
    doc.rect(m, y - 1, 2, itemsBlockH, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...r(DARK));

    const col1X = m + 7;
    const col2X = pw / 2 + 3;

    pkg.items.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ix = col === 0 ? col1X : col2X;
      const iy = y + 4 + row * 5;

      // Dot
      doc.setFillColor(...r(SAFFRON));
      doc.circle(ix - 2, iy - 0.8, 0.6, 'F');

      doc.setTextColor(...r(DARK));
      doc.text(item.name, ix, iy);
    });

    y += itemsBlockH + 5;
  });

  // ── Add-Ons & Service Charges ──
  if (y + 60 > ph - 20) {
    doc.addPage();
    drawPageBg();
    y = 14;
  }

  // Add-ons
  y += 3;
  doc.setFillColor(...r(LIGHT));
  doc.roundedRect(m, y - 3, pw - m * 2, 20, 2, 2, 'F');
  doc.setFillColor(...r(TERRACOTTA));
  doc.rect(m, y - 3, 2.5, 20, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...r(TERRACOTTA));
  doc.text('ADD-ONS', m + 7, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...r(DARK));
  ADD_ONS.forEach((addon, i) => {
    doc.text(`•  ${addon.name}`, m + 7, y + 8 + i * 5);
    doc.setTextColor(...r(SAFFRON));
    doc.setFont('helvetica', 'bold');
    doc.text(`₹${addon.price}/-`, pw - m - 5, y + 8 + i * 5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...r(DARK));
  });

  y += 25;

  // Service Charges
  doc.setFillColor(...r(WHITE));
  doc.setDrawColor(225, 215, 200);
  doc.setLineWidth(0.2);
  doc.roundedRect(m, y - 3, pw - m * 2, 38, 2, 2, 'FD');
  doc.setFillColor(...r(SAFFRON));
  doc.rect(m, y - 3, 2.5, 38, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...r(SAFFRON));
  doc.text('SERVICE CHARGES', m + 7, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  SERVICE_CHARGES.forEach((charge, i) => {
    doc.setTextColor(...r(DARK));
    doc.text(`•  ${charge.name}`, m + 7, y + 8 + i * 5.5);
    doc.setTextColor(...r(SAFFRON));
    doc.setFont('helvetica', 'bold');
    const priceStr = typeof charge.price === 'number' ? `₹${charge.price}/-` : charge.price;
    doc.text(priceStr, pw - m - 5, y + 8 + i * 5.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
  });

  y += 42;

  // Note
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...r(GRAY));
  doc.text('* Mandapam charges (gas, electricity, washing water, vessel rent & cleaning) to be borne by the party.', m, y);
  doc.text('* All prices are per plate. Minimum order quantities may apply.', m, y + 4);

  doc.save('Sri_Nidhi_Lunch_Packages.pdf');
};
