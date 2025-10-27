/**
 * RESIMIX COMMERCIAL OFFER GENERATOR
 *
 * Updated to match the new template format (RESIMIX_Offerta_Template_Oct26.docx)
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
  localPath: "./Resimix.png",  // Local logo file
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
// OFFER DATA (Updated to match new template)
// ============================================================================

const offerData = {
  offerNumber: "OF172/25",
  date: "21 Maggio 2025",
  validity: "30 giorni dalla data di emissione",

  customer: {
    name: "RAILWAY ENTERPRISE S.R.L.",
    attention: "Alla c.a. del dott. Pasquale Isernia",
    title: "dott. Pasquale Isernia",  // For greeting
  },

  // Multiple products support
  products: [
    {
      name: "EXPANDUR 20 - Sistema Completo",
      subtitle: "Sistema Bicomponente",
      configuration: "Conf. A+B da 1200+1000 kg",
      quantity: "165 000 kg",
      unitPrice: "€3,40 /kg",
      subtotal: "€561 000,00",
      characteristics: [
        "Resina poliuretanica bicomponente ad espansione rapida",
        "Elevata capacità di penetrazione e consolidamento",
        "Configurazione A+B da 1200+1000 kg per applicazioni industriali",
        "I trasporti sono considerati come carichi da 22-24 T/cad fino a deposito Russi",
      ],
    },
    {
      name: "RESISYSTEM 310 - Cartucce",
      subtitle: "Sistema in Cartucce",
      configuration: "Conf. cartucce da 310 ml",
      quantity: "50 000 pz",
      unitPrice: "€2,50 /pz",
      subtotal: "€125 000,00",
      characteristics: [
        "Resina poliuretanica bicomponente ad espansione rapida",
        "Elevata capacità di penetrazione e consolidamento",
        "Configurazione A+B da 1200+1000 kg per applicazioni industriali",
        "I trasporti sono considerati come carichi da 22-24 T/cad fino a deposito Russi",
      ],
    },
  ],

  // Totals section
  totals: {
    subtotaleMateriali: "€686'000,00",
    pesoTotaleSistema: "180'000 kg",
    iva: "€150'920,00",
    totaleOfferta: "€836 920,00",
  },

  // Updated terms to match new template (7-8 conditions)
  terms: {
    condizioni_generali: {
      title: "Condizioni generali",
      content: "Valida con accettazione condizioni generali di vendita (allegato 1)",
    },
    pagamento: {
      title: "Modalità di pagamento",
      content: "Da concordare in base a quantitativi e cadenza consegne",
    },
    consegna: {
      title: "Consegna e ritiro",
      content: "Ritiro a mezzo cliente. Trasporto quotabile su richiesta",
    },
    coordinate: {
      title: "Coordinate bancarie",
      content: "CASSA RURALE DI BRENDOLA\\nIBAN IT 86 D 08399 60190 000000122760",
    },
    iva: {
      title: "IVA",
      content: "22% - Per cantiere pubblico indicare CIG e CUP",
    },
    assistenza: {
      title: "Assistenza tecnica",
      content: "Supporto applicativo e consulenza inclusi",
    },
    deposito: {
      title: "Deposito fiduciario",
      content: "Disponibile senza effetti sui termini di pagamento",
    },
    validita: {
      title: "Validità dell'offerta",
      content: "Mesi due dalla data di emissione",
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
    spacing: { after: 200 },
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
 * Create logo from local file or use text fallback
 */
async function createLogo() {
  if (LOGO_CONFIG.useTextFallback) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
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
    // Read logo from local file
    const logoBuffer = fs.readFileSync(LOGO_CONFIG.localPath);

    // Create paragraph with logo image
    const { ImageRun } = require('docx');

    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
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
    console.warn('⚠ Failed to load logo from file:', error.message);
    console.warn('  Using text fallback instead');

    // Fallback to text if logo fails
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
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
 * Create customer information section (simplified, no border)
 */
function createCustomerInfo() {
  return [
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
          text: `Validità: ${offerData.validity}`,
          size: FONT_SIZES.BODY,
        }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

/**
 * Create greeting paragraph
 */
function createGreeting() {
  return new Paragraph({
    children: [
      new TextRun({
        text: `Egregio ${offerData.customer.title},`,
        size: FONT_SIZES.BODY,
      }),
    ],
    spacing: { after: 200 },
  });
}

/**
 * Create intro paragraph
 */
function createIntro() {
  return new Paragraph({
    children: [
      new TextRun({
        text: "a seguito della Sua gentile richiesta, con la presente invio l'offerta economica per il prodotto in oggetto.",
        size: FONT_SIZES.BODY,
      }),
    ],
    spacing: { after: 400 },
  });
}

/**
 * Create product section with quantity/price table
 */
function createProductSection(product) {
  const elements = [];

  // Product header
  elements.push(new Paragraph({
    children: [
      new TextRun({
        text: product.name,
        size: FONT_SIZES.MEDIUM,
        bold: true,
      }),
    ],
    spacing: { after: 100 },
  }));

  // Subtitle and configuration
  elements.push(new Paragraph({
    children: [
      new TextRun({
        text: product.subtitle,
        size: FONT_SIZES.BODY,
      }),
    ],
    spacing: { after: 50 },
  }));

  elements.push(new Paragraph({
    children: [
      new TextRun({
        text: product.configuration,
        size: FONT_SIZES.BODY,
      }),
    ],
    spacing: { after: 200 },
  }));

  // Quantity/Price table
  const quantityTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Header row
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            shading: { fill: COLORS.LIGHT_GRAY },
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "QUANTITÀ",
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: COLORS.LIGHT_GRAY },
            width: { size: 34, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "PREZZO UNITARIO",
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: COLORS.LIGHT_GRAY },
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "SUBTOTALE",
                    size: FONT_SIZES.SMALL,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Data row
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: product.quantity,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: product.unitPrice,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: product.subtotal,
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  elements.push(quantityTable);

  // Characteristics
  elements.push(new Paragraph({
    children: [
      new TextRun({
        text: "Caratteristiche:",
        size: FONT_SIZES.BODY,
        bold: true,
      }),
    ],
    spacing: { before: 200, after: 100 },
  }));

  product.characteristics.forEach((char, index) => {
    elements.push(new Paragraph({
      children: [
        new TextRun({
          text: `  ${char}`,
          size: FONT_SIZES.BODY,
        }),
      ],
      spacing: { after: 80 },
    }));
  });

  // Add spacing after product section
  elements.push(new Paragraph({
    text: "",
    spacing: { after: 400 },
  }));

  return elements;
}

/**
 * Create totals section
 */
function createTotalsSection() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Subtotale materiali
      new TableRow({
        children: [
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Subtotale materiali",
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: offerData.totals.subtotaleMateriali,
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
        ],
      }),
      // Peso totale sistema
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Peso totale sistema",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: offerData.totals.pesoTotaleSistema,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
        ],
      }),
      // IVA
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "IVA (22%)",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: offerData.totals.iva,
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
        ],
      }),
      // TOTALE OFFERTA
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "TOTALE OFFERTA",
                    size: FONT_SIZES.LARGE,
                    bold: true,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.SINGLE, size: 2 }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: offerData.totals.totaleOfferta,
                    size: FONT_SIZES.LARGE,
                    bold: true,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.SINGLE, size: 2 }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
          }),
        ],
      }),
    ],
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
 * Create terms and conditions table (updated with all 8 conditions)
 */
function createTermsTable() {
  // Split conditions into two columns (4 per column)
  const leftConditions = ['condizioni_generali', 'pagamento', 'consegna', 'coordinate'];
  const rightConditions = ['iva', 'assistenza', 'deposito', 'validita'];

  const createConditionParagraphs = (key) => {
    const term = offerData.terms[key];
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: `✓ ${term.title}`,
            size: FONT_SIZES.SMALL,
            bold: true,
          }),
        ],
        spacing: { after: 80 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: term.content.replace('\\n', '\n'),
            size: FONT_SIZES.BODY,
          }),
        ],
        spacing: { after: 200 },
      }),
    ];
  };

  const leftChildren = [];
  leftConditions.forEach(key => {
    leftChildren.push(...createConditionParagraphs(key));
  });

  const rightChildren = [];
  rightConditions.forEach(key => {
    rightChildren.push(...createConditionParagraphs(key));
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          // Left column
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: leftChildren,
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          // Right column
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: rightChildren,
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
        ],
      }),
    ],
  });
}

/**
 * Create closing paragraphs
 */
function createClosing() {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: "Vi ringraziamo per l'attenzione prestata e siamo a disposizione per qualsiasi ulteriore chiarimento in merito desideriate richiedere.",
          size: FONT_SIZES.BODY,
        }),
      ],
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "In attesa di un Vs. gradito, positivo riscontro, ci pregiamo porgerVi i più distinti saluti.",
          size: FONT_SIZES.BODY,
        }),
      ],
      spacing: { after: 400 },
    }),
  ];
}

/**
 * Create signature table
 */
function createSignatureTable() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
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
                    text: offerData.customer.name,
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Il Legale rappresentante",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "…………………………………………………",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
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
                    size: FONT_SIZES.BODY,
                    bold: true,
                  }),
                ],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "(ufficio tecnico commerciale)",
                    size: FONT_SIZES.SMALL,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "……………………………………………………",
                    size: FONT_SIZES.BODY,
                  }),
                ],
              }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }},
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

  // Build document children array
  const documentChildren = [
    // 1. Header
    createHeader(),

    // 2. Logo
    logoElement,

    // 3. Customer Info
    ...createCustomerInfo(),

    // 4. Greeting
    createGreeting(),

    // 5. Intro
    createIntro(),
  ];

  // 6. Add all product sections
  offerData.products.forEach(product => {
    documentChildren.push(...createProductSection(product));
  });

  // 7. Totals section
  documentChildren.push(createTotalsSection());

  // Spacing
  documentChildren.push(new Paragraph({ text: "", spacing: { after: 400 } }));

  // 8. Terms heading
  documentChildren.push(createSectionHeading("Condizioni di fornitura"));

  // 9. Terms table
  documentChildren.push(createTermsTable());

  // 10. Closing paragraphs
  documentChildren.push(...createClosing());

  // 11. Signatures
  documentChildren.push(createSignatureTable());

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
        children: documentChildren,
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
  console.log(`  Prodotti: ${offerData.products.length}`);
  console.log(`  Numero offerta: ${offerData.offerNumber}`);
  console.log(`  Totale: ${offerData.totals.totaleOfferta}`);
  console.log(`  Logo: ${LOGO_CONFIG.useTextFallback ? 'Text fallback' : `Resimix logo from ${LOGO_CONFIG.localPath}`}`);

  return filename;
}

// Run the generator
generateOffer().catch((error) => {
  console.error('Errore durante la generazione dell\'offerta:', error);
  process.exit(1);
});
