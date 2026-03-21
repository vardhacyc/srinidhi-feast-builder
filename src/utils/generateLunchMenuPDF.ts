import jsPDF from 'jspdf';
import {
  LUNCH_PACKAGES, NONVEG_PACKAGES, ADD_ONS,
  SERVICE_CHARGES, NONVEG_SERVICE_CHARGES,
  type LunchPackage, type AddOn, type ServiceCharge,
} from '@/data/lunchPackages';

const SAFFRON = [201, 122, 25] as const;
const GOLD = [196, 155, 45] as const;
const CREAM = [255, 248, 235] as const;
const DARK = [45, 30, 15] as const;
const GRAY = [110, 95, 80] as const;
const LIGHT = [255, 240, 218] as const;
const WHITE = [255, 255, 255] as const;
const TERRACOTTA = [180, 90, 40] as const;
const RUST = [212, 96, 58] as const;
const r = (c: readonly number[]) => [...c] as [number, number, number];

const drawPageBg = (doc: jsPDF, topColor: readonly number[]) => {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  doc.setFillColor(...r(CREAM));
  doc.rect(0, 0, pw, ph, 'F');
  doc.setFillColor(...r(topColor));
  doc.rect(0, 0, pw, 3.5, 'F');
  doc.setFillColor(...r(GOLD));
  doc.rect(0, 3.5, pw, 1, 'F');
  // Footer
  doc.setFillColor(...r(GOLD));
  doc.rect(0, ph - 10, pw, 0.4, 'F');
  doc.setFillColor(...r(topColor));
  doc.rect(0, ph - 3, pw, 3, 'F');
  doc.setFontSize(6);
  doc.setTextColor(...r(GRAY));
  doc.setFont('helvetica', 'normal');
  doc.text('Sri Nidhi Catering  •  Coimbatore  •  +91 87601 01010', pw / 2, ph - 5, { align: 'center' });
};

const drawHeader = (doc: jsPDF) => {
  const pw = doc.internal.pageSize.getWidth();
  const m = 14;
  let y = 16;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...r(DARK));
  doc.text('Sri Nidhi', m, y);
  doc.setFontSize(8);
  doc.setTextColor(...r(SAFFRON));
  doc.setFont('helvetica', 'normal');
  doc.text('C  A  T  E  R  I  N  G', m, y + 6);
  doc.setFontSize(7);
  doc.setTextColor(...r(GRAY));
  doc.text('+91 87601 01010', pw - m, y - 2, { align: 'right' });
  doc.text('Coimbatore, Tamil Nadu', pw - m, y + 3, { align: 'right' });
  y = 30;
  doc.setDrawColor(...r(GOLD));
  doc.setLineWidth(0.3);
  doc.line(m, y, pw - m, y);
};

const renderPackages = (
  doc: jsPDF,
  packages: LunchPackage[],
  title: string,
  subtitle: string,
  accentColor: readonly number[],
  addOns: AddOn[],
  serviceCharges: ServiceCharge[],
  startY: number,
) => {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 14;
  let y = startY;

  // Title bar
  doc.setFillColor(...r(LIGHT));
  doc.roundedRect(m, y - 5, pw - m * 2, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...r(DARK));
  doc.text(title, m + 5, y + 4);
  doc.setFontSize(8);
  doc.setTextColor(...r(accentColor));
  doc.text(subtitle, pw - m - 5, y + 4, { align: 'right' });
  doc.setFillColor(...r(accentColor));
  for (let i = 0; i < 7; i++) doc.circle(m + 5 + i * 4, y + 9, 0.4, 'F');

  y += 18;

  // Packages
  packages.forEach((pkg) => {
    const estimatedHeight = 12 + Math.ceil(pkg.items.length / 2) * 5 + 8;
    if (y + estimatedHeight > ph - 20) {
      doc.addPage();
      drawPageBg(doc, accentColor);
      y = 14;
    }

    // Header bar
    const headerH = pkg.priceAlt ? 16 : 10;
    doc.setFillColor(...(pkg.highlight ? r(accentColor) : r(DARK)));
    doc.roundedRect(m, y, pw - m * 2, headerH, 1.5, 1.5, 'F');
    doc.setFillColor(...r(GOLD));
    doc.rect(m, y + headerH - 0.6, pw - m * 2, 0.6, 'F');

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const textColor = pkg.highlight ? r(WHITE) : r(GOLD);
    doc.setTextColor(...textColor);
    doc.text(pkg.name, m + 5, y + (pkg.priceAlt ? 7 : 6.5));

    if (pkg.highlight) {
      doc.setFontSize(6);
      doc.setTextColor(...r(LIGHT));
      doc.text(`★ ${pkg.highlight}`, m + 5, y + (pkg.priceAlt ? 12 : 6.5) + (pkg.priceAlt ? 0 : 0));
      if (!pkg.priceAlt) {
        doc.text(`★ ${pkg.highlight}`, pw - m - 30, y + 6.5, { align: 'right' });
      }
    }

    // Prices
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    if (pkg.priceAlt) {
      doc.text(`₹${pkg.price}/-  (${pkg.priceLabel})`, pw - m - 5, y + 6, { align: 'right' });
      doc.setFontSize(9);
      doc.text(`₹${pkg.priceAlt}/-  (${pkg.priceAltLabel})`, pw - m - 5, y + 12, { align: 'right' });
    } else {
      doc.setFontSize(11);
      doc.text(`₹${pkg.price}/-`, pw - m - 5, y + 6.5, { align: 'right' });
    }

    y += headerH + 3;

    // Items
    doc.setFillColor(...r(WHITE));
    doc.setDrawColor(225, 215, 200);
    doc.setLineWidth(0.2);
    const itemRows = Math.ceil(pkg.items.length / 2);
    const itemsBlockH = itemRows * 5 + 4;
    doc.roundedRect(m, y - 1, pw - m * 2, itemsBlockH, 1, 1, 'FD');
    doc.setFillColor(...r(accentColor));
    doc.rect(m, y - 1, 2, itemsBlockH, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const col1X = m + 7;
    const col2X = pw / 2 + 3;

    pkg.items.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ix = col === 0 ? col1X : col2X;
      const iy = y + 4 + row * 5;
      doc.setFillColor(...r(accentColor));
      doc.circle(ix - 2, iy - 0.8, 0.6, 'F');
      doc.setTextColor(...r(DARK));
      doc.text(item.name, ix, iy);
    });

    y += itemsBlockH + 5;
  });

  // Add-ons & Service Charges
  if (y + 60 > ph - 20) {
    doc.addPage();
    drawPageBg(doc, accentColor);
    y = 14;
  }

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
  addOns.forEach((addon, i) => {
    doc.setTextColor(...r(DARK));
    doc.text(`•  ${addon.name}`, m + 7, y + 8 + i * 5);
    doc.setTextColor(...r(accentColor));
    doc.setFont('helvetica', 'bold');
    doc.text(`₹${addon.price}/-`, pw - m - 5, y + 8 + i * 5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
  });

  y += 25;
  const scH = 8 + serviceCharges.length * 5.5 + 4;
  doc.setFillColor(...r(WHITE));
  doc.setDrawColor(225, 215, 200);
  doc.setLineWidth(0.2);
  doc.roundedRect(m, y - 3, pw - m * 2, scH, 2, 2, 'FD');
  doc.setFillColor(...r(accentColor));
  doc.rect(m, y - 3, 2.5, scH, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...r(accentColor));
  doc.text('SERVICE CHARGES', m + 7, y + 2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  serviceCharges.forEach((charge, i) => {
    doc.setTextColor(...r(DARK));
    doc.text(`•  ${charge.name}`, m + 7, y + 8 + i * 5.5);
    doc.setTextColor(...r(accentColor));
    doc.setFont('helvetica', 'bold');
    const priceStr = typeof charge.price === 'number' ? `₹${charge.price}/-` : charge.price;
    doc.text(priceStr, pw - m - 5, y + 8 + i * 5.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
  });

  y += scH + 6;
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...r(GRAY));
  doc.text('* Mandapam charges (gas, electricity, washing water, vessel rent & cleaning) to be borne by the party.', m, y);
};

export const generateLunchMenuPDF = () => {
  const doc = new jsPDF();

  // ── Page 1+: Veg Packages ──
  drawPageBg(doc, SAFFRON);
  drawHeader(doc);
  renderPackages(doc, LUNCH_PACKAGES, 'LUNCH PACKAGES', 'Traditional South Indian Feast', SAFFRON, ADD_ONS, SERVICE_CHARGES, 40);

  // ── New section: Non-Veg Packages ──
  doc.addPage();
  drawPageBg(doc, RUST);
  drawHeader(doc);
  renderPackages(doc, NONVEG_PACKAGES, 'NON-VEG SOUTH MEALS', 'Biryani & Gravy Specials', RUST, ADD_ONS, NONVEG_SERVICE_CHARGES, 40);

  doc.save('Sri_Nidhi_Complete_Menu.pdf');
};
