---
name: resimix-commercial-offer
description: "Skill for creating professional commercial offers for Resimix products. Use this skill when generating quotations, price proposals, or commercial offers for Resimix customers."
version: 1.0
author: Ugo Bot - Future of Work Lab
license: Proprietary
---

# Resimix Commercial Offer Generator

## Overview

This skill provides a comprehensive workflow for creating professional commercial offers (Offerte Commerciali) for Resimix Srl products. The documents follow Resimix's brand guidelines and standard business format.

## When to Use This Skill

Use this skill when:
- Creating a new commercial offer (offerta) for a customer
- Generating price quotations for Resimix products
- Preparing formal proposals for industrial flooring, resins, or polymer systems
- Responding to customer inquiries with formal pricing documentation

## Prerequisites

Before creating an offer, gather:
1. **Customer information**: Company name, contact person, title
2. **Product details**: Product code, description, configuration (e.g., "Conf. A+B da 1200+1000 kg")
3. **Pricing**: Current prices from Resimix database tools
4. **Offer number**: Sequential number in format "OF###/YY" (e.g., OF172/25)
5. **Special conditions**: Payment terms, delivery terms, technical support

## Document Structure

### 1. Header Section (First Paragraph)
- **Format**: Centered, 10pt font, color #003865 (Resimix blue)
- **Content**: "Offerta N° OF###/YY • DD Month YYYY"
- **Example**: "Offerta N° OF172/25 • 21 Maggio 2025"

### 2. Logo Placement
- **Position**: Top of document, centered
- **URL**: `https://future-fit-career-accelerator.s3.eu-central-1.amazonaws.com/ResimixAssets/Resimix.png`
- **Size**: Approximately 200px wide × 80px high (adjust based on actual logo aspect ratio)
- **Format**: PNG from S3 bucket
- **Fallback**: If logo fails to load, displays "RESIMIX S.R.L." text in company blue (#003865)

### 3. Customer Information Table (Table 1)
**Format**: Single-cell table, left-aligned
- **Line 1**: Customer company name (13pt, bold, uppercase)
- **Line 2**: Attention line: "Alla c.a. del/della [title] [name]" (10pt, regular)
- **Line 3**: Offer validity: "Validità offerta: 30 giorni dalla data di emissione" (10pt, regular)

**Example**:
```
QUADRIO GAETANO COSTRUZIONI S.P.A.
Alla c.a. del dott. Marco Rossi
Validità offerta: 30 giorni dalla data di emissione
```

### 4. Product Information Table (Table 2)
**Format**: Single-cell table with product details
- **Line 1**: Product name and type (13pt, bold)
- **Line 2**: Configuration/packaging (10pt, regular)
- **Line 3**: "Caratteristiche:" (10pt, bold)
- **Lines 4+**: Bullet points of product characteristics (10pt, regular)
  - Key technical properties
  - Applications
  - Configuration details
  - Delivery/transport terms if applicable

**Example**:
```
RESICOL 100 - Sistema Epossidico Bicomponente
Conf. A+B da 25+15 kg

Caratteristiche:
• Adesivo epossidico strutturale per legno
• Elevata resistenza meccanica e chimica
• Tempo di lavorazione: 45 minuti a 20°C
• Configurazione A+B ottimizzata per cantiere
• Trasporti: franco fabbrica o da concordare
```

### 5. Pricing Table (Table 3)
**Format**: Two-column table
- **Column 1**: Item description or quantity breaks
- **Column 2**: Unit price in EUR

**Layout**:
- Header row with light gray background (#F2F2F2)
- Column headers: "Descrizione" | "Prezzo Unitario (€)"
- Data rows with pricing information
- Optional: Total row at bottom (bold, light blue background #E6F2FF)

**Example**:
```
┌──────────────────────────────┬────────────────────┐
│ Descrizione                  │ Prezzo Unitario (€)│
├──────────────────────────────┼────────────────────┤
│ RESICOL 100 - Kit A+B 40 kg │ 103,00 €/kit      │
│ Quantità minima: 10 kit      │                    │
├──────────────────────────────┼────────────────────┤
│ Sconto quantità >50 kit      │ 98,00 €/kit       │
└──────────────────────────────┴────────────────────┘
```

### 6. Section Heading: "Condizioni di fornitura"
**Format**: Heading 2 style (14pt, bold, Resimix blue #003865)

### 7. Terms and Conditions Table (Table 4)
**Format**: Two-column table with checkmark bullets (✓)
- **Left Column**:
  - ✓ Condizioni generali (11pt, bold)
  - Description text (10pt, regular)
  - ✓ IVA (11pt, bold)
  - IVA rate and notes (10pt, regular)

- **Right Column**:
  - ✓ Modalità di pagamento (11pt, bold)
  - Payment terms (10pt, regular)
  - ✓ Assistenza tecnica (11pt, bold)
  - Technical support description (10pt, regular)

**Standard Content**:
```
Left Column:
✓ Condizioni generali
Valida con accettazione condizioni generali di vendita (allegato 1)

✓ IVA
22% - Per cantiere pubblico indicare CIG e CUP

Right Column:
✓ Modalità di pagamento
Da concordare in base a quantitativi e cadenza consegne

✓ Assistenza tecnica
Supporto applicativo e consulenza inclusi
```

### 8. Signature Table (Table 5)
**Format**: Two-column table for signatures
- **Left Column**:
  - "Per accettazione" (11pt, regular)
  - Customer company name (14pt, bold)
  - "(Il Legale Rappresentante)" (11pt, regular)
  - Signature line: "……………………………………………………."

- **Right Column**:
  - Empty line
  - "Resimix s.r.l." (14pt, bold)
  - "(Ufficio Tecnico Commerciale)" (11pt, regular)
  - Signature line: "……………………………………………………."

## Color Palette

**Primary Colors**:
- **Resimix Blue**: #003865 (RGB: 0, 56, 101) - Headers, titles, emphasis
- **Text Black**: #000000 (RGB: 0, 0, 0) - Body text
- **Gray**: #666666 (RGB: 102, 102, 102) - Secondary text

**Background Colors**:
- **Light Gray**: #F2F2F2 - Table headers
- **Light Blue**: #E6F2FF - Highlighted rows, totals

## Typography

**Font Family**: Calibri (default for professional documents)

**Font Sizes**:
- 14pt: Section headings (H2), signature company names
- 13pt: Customer name (bold), product names (bold)
- 11pt: Subsection headings, terms checkmarks (bold)
- 10pt: Body text, descriptions, pricing
- 9pt: Footer text, fine print (if needed)

**Font Weights**:
- Bold: Company names, product names, section headings, term titles
- Regular: All body text, descriptions, technical details

## Workflow for Creating an Offer

### Step 1: Read the DOCX Skill
```bash
# MANDATORY: Read the complete docx skill before proceeding
# Path: /mnt/skills/public/docx/SKILL.md
```

### Step 2: Gather Information
Before generating the document, collect:

1. **Customer Details**:
   ```javascript
   // Use Resimix tools to get customer information
   // Tool: Fatturato_Clienti_2025 to find exact customer name
   ```

2. **Product Information**:
   ```javascript
   // Get product technical details
   // Tool: Schede_Tecniche for technical specifications
   ```

3. **Pricing Data**:
   ```javascript
   // Get current pricing
   // Tool: client_product_history for last price sold to this customer
   // Tool: calculate_product_cost (costi_unitari_totali) for cost basis
   ```

4. **Offer Number**:
   ```javascript
   // Format: OF###/YY where ### is sequential number, YY is year
   // Example: OF172/25 (Offer 172 of year 2025)
   ```

### Step 3: Create the Document

Use docx-js to create the Word document:

```javascript
const { Document, Paragraph, TextRun, Table, TableCell, TableRow, 
        AlignmentType, BorderStyle, WidthType, HeightRule, VerticalAlign } = require('docx');
const fs = require('fs');

// Define colors
const RESIMIX_BLUE = "003865";
const TEXT_BLACK = "000000";
const GRAY = "666666";
const LIGHT_GRAY = "F2F2F2";
const LIGHT_BLUE = "E6F2FF";

// Create document
const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 1440,    // 1 inch = 1440 twips
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
      },
    },
    children: [
      // Header paragraph
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "Offerta N° OF172/25 • 21 Maggio 2025",
            size: 20,  // 10pt (size in half-points)
            color: RESIMIX_BLUE,
          }),
        ],
      }),
      
      // Logo placeholder (if logo available, insert as image)
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "RESIMIX S.R.L.",
            size: 32,  // 16pt
            bold: true,
            color: RESIMIX_BLUE,
          }),
        ],
        spacing: { after: 400 },
      }),
      
      // Customer info table
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "RAILWAY ENTERPRISE S.R.L.",
                        size: 26,  // 13pt
                        bold: true,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Alla c.a. del dott. Pasquale Isernia",
                        size: 20,  // 10pt
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Validità offerta: 30 giorni dalla data di emissione",
                        size: 20,  // 10pt
                      }),
                    ],
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                  left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                  right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                },
              }),
            ],
          }),
        ],
        margins: {
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        },
      }),
      
      // Spacing
      new Paragraph({ text: "" }),
      
      // Product info table
      // ... (continue with product table, pricing table, etc.)
    ],
  }],
});

// Export
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync('/mnt/user-data/outputs/offerta_resimix.docx', buffer);
```

### Step 4: Dynamic Content Integration

When creating offers, integrate live data:

```javascript
// Example: Get customer's last purchase price
const customerName = "QUADRIO GAETANO COSTRUZIONI S.P.A.";
const productName = "RESICOL 100";

// 1. Get customer history
// Tool: client_product_history(customerName)
// Returns: array of purchases with dates, prices, quantities

// 2. Extract most recent price
const lastPurchase = customerHistory
  .filter(item => item.product_name.includes(productName))
  .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

const suggestedPrice = lastPurchase ? lastPurchase.price_per_unit : null;

// 3. Get product cost for reference
// Tool: costi_unitari_totali(productName, variant)
// Returns: cost per kg including all components

// 4. Calculate margin and pricing strategy
const costPerKg = productCost.cost_per_kg;
const margin = ((suggestedPrice - costPerKg) / suggestedPrice * 100).toFixed(1);
```

## Best Practices

### 1. Professional Formatting
- Use consistent spacing (1-2 blank lines between sections)
- Align currency values to the right in tables
- Keep table borders subtle (light gray, single line)
- Use bold sparingly - only for emphasis and headings

### 2. Content Guidelines
- Always include product code if available (e.g., "RC100", "RESISYSTEM351")
- Specify configurations clearly (A+B components, packaging sizes)
- Include relevant transport/delivery terms
- Reference technical data sheets when applicable
- Use metric units (kg, liters, m²)

### 3. Pricing Presentation
- Always show currency symbol (€)
- Format: "103,00 €/kg" or "1.250,00 €/kit"
- Use Italian number formatting (comma for decimals, period for thousands)
- For quantity discounts, show tiered pricing clearly
- Include unit of measure (€/kg, €/kit, €/m²)

### 4. Legal and Business Terms
- Always include "Condizioni generali di vendita" reference
- Specify IVA (VAT) rate - standard 22% in Italy
- For public works (cantieri pubblici), note CIG and CUP requirement
- Include payment terms explicitly
- Mention technical assistance/support availability

### 5. Document Delivery
- Save as .docx format (not .doc)
- File naming: `Offerta_RESIMIX_OF###-YY_ClientName.docx`
- Example: `Offerta_RESIMIX_OF172-25_RailwayEnterprise.docx`
- Always save to `/mnt/user-data/outputs/`
- Provide download link to user

## Common Variations

### Variation 1: Multi-Product Offer
When offering multiple products:
- Create separate product tables (Table 2) for each product
- Include a summary pricing table at the end
- Add cross-reference notes (e.g., "Prodotto complementare: RESITAR 30 A")

### Variation 2: Volume-Based Pricing
For tiered pricing:
- Use a more detailed pricing table (Table 3)
- Clearly show quantity breaks (1-10 units, 11-50 units, 51+ units)
- Highlight the best value tier

### Variation 3: Project-Based Offer
For specific projects:
- Add a project description section after customer info
- Include estimated quantities needed
- Reference project location and timeline
- Add special delivery coordination notes

## Error Handling

Common issues and solutions:

1. **Missing Price Data**
   - Use cost-plus calculation as fallback
   - Add note: "Prezzo da confermare in base a quantitativi"

2. **Unknown Customer**
   - Use fuzzy search on customer database
   - Ask user to confirm exact company name
   - Create new customer entry if needed

3. **Product Not Found**
   - Search Schede_Tecniche database
   - Check for alternative product codes
   - Ask user for complete product specification

4. **Logo Not Available**
   - Use text placeholder "RESIMIX S.R.L." in company blue
   - Request logo file from user for future use
   - Continue with document generation

## Example Complete Offer Structure

```
┌─────────────────────────────────────────────────────┐
│            [RESIMIX LOGO - Centered]                │
│                                                     │
│    Offerta N° OF172/25 • 21 Maggio 2025           │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐   │
│ │ QUADRIO GAETANO COSTRUZIONI S.P.A.          │   │
│ │ Alla c.a. dell'ing. Marco Rossi             │   │
│ │ Validità offerta: 30 giorni                 │   │
│ └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐   │
│ │ RESICOL 100 - Adesivo Epossidico           │   │
│ │ Conf. A+B da 25+15 kg                       │   │
│ │                                              │   │
│ │ Caratteristiche:                             │   │
│ │ • Adesivo strutturale bicomponente          │   │
│ │ • Resistenza meccanica superiore            │   │
│ │ • Ideale per legno lamellare                │   │
│ └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────┬───────────────────────┐   │
│ │ Descrizione         │ Prezzo Unitario (€)   │   │
│ ├─────────────────────┼───────────────────────┤   │
│ │ Kit A+B 40 kg       │ 103,00 €/kit         │   │
│ │ Qtà minima: 10 kit  │                       │   │
│ └─────────────────────┴───────────────────────┘   │
├─────────────────────────────────────────────────────┤
│                                                     │
│          Condizioni di fornitura                    │
│                                                     │
│ ┌──────────────────────┬───────────────────────┐  │
│ │ ✓ Condizioni generali│ ✓ Modalità pagamento  │  │
│ │ Vedere allegato 1    │ Da concordare         │  │
│ │                      │                        │  │
│ │ ✓ IVA               │ ✓ Assistenza tecnica   │  │
│ │ 22%                  │ Inclusa                │  │
│ └──────────────────────┴───────────────────────┘  │
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────┬───────────────────────┐  │
│ │ Per accettazione     │ Resimix s.r.l.        │  │
│ │ Quadrio Costruzioni  │ (Uff. Tecnico Comm.)  │  │
│ │ (Legale Rapp.)       │                        │  │
│ │                      │                        │  │
│ │ ___________________  │ ___________________   │  │
│ └──────────────────────┴───────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Footer Information (Optional)

For multi-page documents, add footer:
- **Left**: "Resimix S.r.l. - Via [Address]"
- **Center**: Page number
- **Right**: "P.IVA [VAT Number]"

Contact information:
- Resimix S.r.l.
- [Address line 1]
- [Address line 2]
- Tel: [Phone]
- Email: [Email]
- Web: www.resimix.it

## Integration with Resimix Tools

This skill should work seamlessly with:
- `Fatturato_Clienti_2025`: Customer lookup and revenue data
- `client_product_history`: Last prices sold to customer
- `costi_unitari_totali`: Product cost calculation
- `costi_unitari_comp_a/b/c`: Component-level costing
- `Schede_Tecniche`: Product technical specifications
- `product_all_clients`: Product sales history across customers
- `Dettaglio_Vendite`: Detailed sales records

## Version History

- **v1.0** (2025-10-24): Initial skill creation based on OF172/25 template

## Notes

- This skill follows Italian business document conventions
- All currency values in EUR (€)
- Dates in Italian format (DD Mese YYYY)
- Use formal Italian business language (Lei form)
- Technical terms can remain in Italian when standard (e.g., "bicomponente", "cantiere")
