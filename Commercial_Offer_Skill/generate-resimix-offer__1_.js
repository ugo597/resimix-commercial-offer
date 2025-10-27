/**
 * RESIMIX COMMERCIAL OFFER GENERATOR
 * 
 * Example implementation using the Resimix Commercial Offer Skill
 * This script creates a professional Word document following Resimix standards
 * 
 * Usage: node generate-resimix-offer.js
 */

const { Document, Paragraph, TextRun, Table, TableCell, TableRow, 
        AlignmentType, BorderStyle, WidthType, Packer, ShadingType,
        VerticalAlign } = require('docx');
const fs = require('fs');

// ============================================================================
// CONFIGURATION
// ============================================================================

// Resimix Logo Configuration
const LOGO_CONFIG = {
  url: "https://future-fit-career-accelerator.s3.eu-central-1.amazonaws.com/ResimixAssets/Resimix.png",
  width: 200,   // Width in pixels
  height: 80,   // Height in pixels (adjust based on actual logo aspect ratio)
  useTextFallback: false,  // Set to true to use text placeholder if logo fails
};

// Resimix Brand Colors
const COLORS = {
  RESIMIX_BLUE: "003865",
  TEXT_BLACK: "000000",
  GRAY: "666666",
  LIGHT_GRAY: "F2F2F2",
  LIGHT_BLUE: "E6F2FF",
  WHITE: "FFFFFF",
};

// Font sizes in half-points (multiply pt by 2)
const FONT_SIZES = {
  HEADER: 20,      // 10pt
  LARGE: 28,       // 14pt
  MEDIUM: 26,      // 13pt
  BODY: 20,        // 10pt
  SMALL: 22,       // 11pt
  TINY: 18,        // 9pt
};

// ============================================================================
// OFFER DATA
// ============================================================================

const offerData = {
  offerNumber: "OF172/25",
  date: "21 Maggio 2025",
  validity: "30 giorni dalla data di emissione",
  
  customer: {
    name: "RAILWAY ENTERPRISE S.R.L.",
    attention: "Alla c.a. del dott. Pasquale Isernia",
  },
  
  product: {
    name: "EXPANDUR 20 - Sistema Completo",
    configuration: "Conf. A+B da 1200+1000 kg",
    characteristics: [
      "Resina poliuretanica bicomponente ad espansione rapida",
      "Elevata capacità di penetrazione e consolidamento",
      "Configurazione A+B da 1200+1000 kg per applicazioni industriali",
      "I trasporti sono considerati come carichi da 22-24 T/cad fino a deposito Russi",
    ],
  },
  
  pricing: [
    { description: "EXPANDUR 20 - Sistema completo A+B", unit: "€/sistema", price: "2.850,00" },
    { description: "Quantità minima ordinabile: 1 sistema", unit: "", price: "" },
  ],
  
  terms: {
    condizioni_generali: {
      title: "Condizioni generali",
      content: "Valida con accettazione condizioni generali di vendita (allegato 1)",
    },
    iva: {
      title: "IVA",
      content: "22% - Per cantiere pubblico indicare CIG e CUP",
    },
    pagamento: {
      title: "Modalità di pagamento",
      content: "Da concordare in base a quantitativi e cadenza consegne",
    },
    assistenza: {
      title: "Assistenza tecnica",
      content: "Supporto applicativo e consulenza inclusi",
    },
  },
};

// ============================================================================
// DOCUMENT GENERATION FUNCTIONS
// ============================================================================

/**
 * Create the header paragraph with offer number and date
 */
function createHeader() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [
      new TextRun({
        text: `Offerta N° ${offerData.offerNumber} • ${offerData.date}`,
        size: FONT_SIZES.HEADER,
        color: COLORS.RESIMIX_BLUE,
      }),
    ],
  });
}

/**
 * Create logo from URL or use text fallback
 */
async function createLogo() {
  if (LOGO_CONFIG.useTextFallback) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: "RESIMIX S.R.L.",
          size: 32,  // 16pt
          bold: true,
          color: COLORS.RESIMIX_BLUE,
        }),
      ],
    });
  }

  try {
    // Import required modules for image handling
    const https = require('https');
    const http = require('http');
    
    // Download logo from URL
    const logoBuffer = await new Promise((resolve, reject) => {
      const protocol = LOGO_CONFIG.url.startsWith('https') ? https : http;
      
      protocol.get(LOGO_CONFIG.url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download logo: ${response.statusCode}`));
          return;
        }
        
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      }).on('error', reject);
    });

    // Create paragraph with logo image
    const { ImageRun } = require('docx');
    
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new ImageRun({
          data: logoBuffer,
          transformation: {
            width: LOGO_CONFIG.width,
            height: LOGO_CONFIG.height,
          },
        }),
      ],
    });
  } catch (error) {
    console.warn('⚠ Failed to load logo from URL:', error.message);
    console.warn('  Using text fallback instead');
    
    // Fallback to text if logo fails
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: "RESIMIX S.R.L.",
          size: 32,  // 16pt
          bold: true,
          color: COLORS.RESIMIX_BLUE,
        }),
      ],
    });
  }
}

/**
 * Legacy function - kept for backwards compatibility
 */
function createLogoPlaceholder() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [
      new TextRun({
        text: "RESIMIX S.R.L.",
        size: 32,  // 16pt
        bold: true,
        color: COLORS.RESIMIX_BLUE,
      }),
    ],
  });
}

/**
 * Create customer information table
 */
function createCustomerTable() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: {
      top: 100,
      bottom: 100,
      left: 150,
      right: 150,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLORS.WHITE },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.customer.name,
                    size: FONT_SIZES.MEDIUM,
                    bold: true,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.customer.attention,
                    size: FONT_SIZES.BODY,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Validità offerta: ${offerData.validity}`,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.GRAY },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.GRAY },
              left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.GRAY },
              right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.GRAY },
            },
          }),
        ],
      }),
    ],
  });
}

/**
 * Create product information table
 */
function createProductTable() {
  const characteristicsParagraphs = offerData.product.characteristics.map(
    (char) =>
      new Paragraph({
        children: [
          new TextRun({
            text: `${char}`,
            size: FONT_SIZES.BODY,
          }),
        ],
        spacing: { after: 80 },
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: {
      top: 100,
      bottom: 100,
      left: 150,
      right: 150,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLORS.LIGHT_BLUE },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.product.name,
                    size: FONT_SIZES.MEDIUM,
                    bold: true,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.product.configuration,
                    size: FONT_SIZES.BODY,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Caratteristiche:",
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
                spacing: { after: 100 },
              }),
              ...characteristicsParagraphs,
            ],
          }),
        ],
      }),
    ],
  });
}

/**
 * Create pricing table
 */
function createPricingTable() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        shading: { fill: COLORS.LIGHT_GRAY },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Descrizione",
                size: FONT_SIZES.SMALL,
                bold: true,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        shading: { fill: COLORS.LIGHT_GRAY },
        width: { size: 30, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "Prezzo Unitario",
                size: FONT_SIZES.SMALL,
                bold: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const dataRows = offerData.pricing.map(
    (item) =>
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: item.description,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: item.price ? `${item.price} ${item.unit}` : "",
                    size: FONT_SIZES.BODY,
                    bold: item.price ? true : false,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: {
      top: 100,
      bottom: 100,
      left: 150,
      right: 150,
    },
    rows: [headerRow, ...dataRows],
  });
}

/**
 * Create section heading
 */
function createSectionHeading(text) {
  return new Paragraph({
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text,
        size: FONT_SIZES.LARGE,
        bold: true,
        color: COLORS.RESIMIX_BLUE,
      }),
    ],
  });
}

/**
 * Create terms and conditions table
 */
function createTermsTable() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: {
      top: 100,
      bottom: 100,
      left: 150,
      right: 150,
    },
    rows: [
      new TableRow({
        children: [
          // Left column
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              // Condizioni generali
              new Paragraph({
                children: [
                  new TextRun({
                    text: `✓ ${offerData.terms.condizioni_generali.title}`,
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.terms.condizioni_generali.content,
                    size: FONT_SIZES.BODY,
                  }),
                ],
                spacing: { after: 200 },
              }),
              // IVA
              new Paragraph({
                children: [
                  new TextRun({
                    text: `✓ ${offerData.terms.iva.title}`,
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.terms.iva.content,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
          // Right column
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              // Modalità di pagamento
              new Paragraph({
                children: [
                  new TextRun({
                    text: `✓ ${offerData.terms.pagamento.title}`,
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.terms.pagamento.content,
                    size: FONT_SIZES.BODY,
                  }),
                ],
                spacing: { after: 200 },
              }),
              // Assistenza tecnica
              new Paragraph({
                children: [
                  new TextRun({
                    text: `✓ ${offerData.terms.assistenza.title}`,
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.terms.assistenza.content,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

/**
 * Create signature table
 */
function createSignatureTable() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: {
      top: 100,
      bottom: 100,
      left: 150,
      right: 150,
    },
    rows: [
      new TableRow({
        children: [
          // Left column - Customer
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Per accettazione",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: offerData.customer.name.split(" ")[0] + " " + offerData.customer.name.split(" ")[1],
                    size: FONT_SIZES.LARGE,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "(Il Legale Rappresentante)",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 400 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "………………………………………………………..",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
          // Right column - Resimix
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: " ",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Resimix s.r.l.",
                    size: FONT_SIZES.LARGE,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "(Ufficio Tecnico Commerciale)",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 400 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "………………………………………………………..",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ============================================================================
// MAIN DOCUMENT CREATION
// ============================================================================

async function generateOffer() {
  // Generate logo (async operation)
  const logoElement = await createLogo();
  
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // 1. Header
          createHeader(),
          
          // 2. Logo (now using actual logo from URL)
          logoElement,
          
          // 3. Customer Info
          createCustomerTable(),
          
          // Spacing
          new Paragraph({ text: "", spacing: { after: 300 } }),
          
          // 4. Product Info
          createProductTable(),
          
          // Spacing
          new Paragraph({ text: "", spacing: { after: 300 } }),
          
          // 5. Pricing
          createPricingTable(),
          
          // Spacing
          new Paragraph({ text: "", spacing: { after: 300 } }),
          
          // 6. Section Heading
          createSectionHeading("Condizioni di fornitura"),
          
          // 7. Terms and Conditions
          createTermsTable(),
          
          // Spacing
          new Paragraph({ text: "", spacing: { after: 400 } }),
          
          // 8. Signatures
          createSignatureTable(),
        ],
      },
    ],
  });

  // Export the document
  const buffer = await Packer.toBuffer(doc);
  const filename = `/mnt/user-data/outputs/Offerta_RESIMIX_${offerData.offerNumber.replace('/', '-')}_${offerData.customer.name.split(' ')[0]}.docx`;
  
  fs.writeFileSync(filename, buffer);
  
  console.log(`✓ Offerta generata con successo!`);
  console.log(`  File: ${filename}`);
  console.log(`  Cliente: ${offerData.customer.name}`);
  console.log(`  Prodotto: ${offerData.product.name}`);
  console.log(`  Numero offerta: ${offerData.offerNumber}`);
  console.log(`  Logo: ${LOGO_CONFIG.useTextFallback ? 'Text fallback' : 'Resimix logo from URL'}`);
  
  return filename;
}

// Run the generator
generateOffer().catch((error) => {
  console.error('Errore durante la generazione dell\'offerta:', error);
  process.exit(1);
});
