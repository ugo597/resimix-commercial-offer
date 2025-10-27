# Resimix Commercial Offer Generator - User Guide

## 📦 What's Included

This package contains everything you need to generate professional commercial offers for Resimix products:

1. **RESIMIX_COMMERCIAL_OFFER_SKILL.md** - Complete skill documentation
2. **generate-resimix-offer.js** - Example implementation script
3. **Offerta_RESIMIX_OF172-25_RAILWAY.docx** - Sample generated offer document

## 🎯 Quick Start

### For Claude Users

Simply ask Claude to create a commercial offer:

```
"Create a commercial offer for Resicol 100 to Quadrio Costruzioni"
```

Claude will:
1. Look up the customer in the Resimix database
2. Retrieve product information and pricing
3. Generate a professional Word document
4. Provide you with a download link

### For Developers

If you want to customize or extend the functionality:

1. **Review the skill documentation**:
   - Open `RESIMIX_COMMERCIAL_OFFER_SKILL.md`
   - Read the structure, formatting, and best practices

2. **Customize the script**:
   - Edit `generate-resimix-offer.js`
   - Modify the `offerData` object with your values
   - Run: `node generate-resimix-offer.js`

3. **Integrate with Resimix tools**:
   - Use the Resimix MCP tools to fetch live data
   - Examples in the skill documentation

## 📋 Document Structure

The generated offers follow this structure:

1. **Header**: Offer number and date (centered, Resimix blue)
2. **Logo**: Resimix company logo (or text placeholder)
3. **Customer Info**: Company name, contact person, validity period
4. **Product Details**: Product name, configuration, characteristics
5. **Pricing Table**: Item descriptions and unit prices
6. **Terms & Conditions**: Payment, delivery, IVA, technical support
7. **Signature Block**: Acceptance signatures for both parties

## 🎨 Branding

### Colors
- **Resimix Blue**: #003865 (Headers, titles)
- **Light Gray**: #F2F2F2 (Table headers)
- **Light Blue**: #E6F2FF (Highlighted sections)

### Typography
- **Font**: Calibri
- **Sizes**: 10-14pt (body to headings)
- **Style**: Professional, clean, readable

## 🔧 Customization Guide

### 1. Changing Offer Details

Edit the `offerData` object in `generate-resimix-offer.js`:

```javascript
const offerData = {
  offerNumber: "OF173/25",        // Your offer number
  date: "25 Ottobre 2025",        // Today's date
  
  customer: {
    name: "YOUR CUSTOMER NAME",
    attention: "Alla c.a. del sig. Name",
  },
  
  product: {
    name: "YOUR PRODUCT NAME",
    configuration: "Conf. details",
    characteristics: [
      "Feature 1",
      "Feature 2",
      // ... add more
    ],
  },
  
  pricing: [
    { 
      description: "Product description",
      unit: "€/kg", 
      price: "150,00" 
    },
    // ... add more rows
  ],
};
```

### 2. Adding Multiple Products

To create an offer with multiple products:

```javascript
// Create multiple product tables
const products = [
  { name: "RESICOL 100", config: "Conf. A+B da 40 kg" },
  { name: "RESITAR 30 A", config: "Conf. da 25 kg" },
];

// Generate a product table for each
products.forEach(product => {
  children.push(createProductTable(product));
  children.push(new Paragraph({ text: "", spacing: { after: 300 } }));
});
```

### 3. Integrating Live Data

Connect to Resimix tools for dynamic pricing:

```javascript
// Example: Get last price sold to customer
async function getCustomerPrice(customerName, productName) {
  // Call Resimix:client_product_history tool
  const history = await callResimixTool('client_product_history', { 
    customer: customerName 
  });
  
  // Find most recent purchase
  const lastSale = history
    .filter(item => item.product_name.includes(productName))
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  return lastSale ? lastSale.price_per_unit : null;
}

// Use in offer generation
const price = await getCustomerPrice("QUADRIO", "RESICOL 100");
offerData.pricing[0].price = price.toFixed(2).replace('.', ',');
```

### 4. Adding a Logo

To include the actual Resimix logo:

```javascript
// Replace createLogoPlaceholder() with:
function createLogo() {
  const imageBuffer = fs.readFileSync('/path/to/resimix-logo.png');
  
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [
      new ImageRun({
        data: imageBuffer,
        transformation: {
          width: 200,
          height: 80,
        },
      }),
    ],
  });
}
```

## 📊 Common Use Cases

### Case 1: Standard Single Product Offer
```javascript
// Customer: Quadrio Costruzioni
// Product: Resicol 100, 40kg kit
// Price: Last sold price + 5% margin
// Terms: Standard 30-day payment
```

### Case 2: Volume Discount Offer
```javascript
pricing: [
  { description: "1-10 kit", unit: "€/kit", price: "110,00" },
  { description: "11-50 kit", unit: "€/kit", price: "105,00" },
  { description: "51+ kit", unit: "€/kit", price: "98,00" },
]
```

### Case 3: Project-Based Offer
```javascript
// Add project details before product table
new Paragraph({
  children: [
    new TextRun({
      text: "Progetto: Ristrutturazione Ponte Autostrada A4",
      size: 22,
      bold: true,
    }),
  ],
}),
new Paragraph({
  children: [
    new TextRun({
      text: "Quantità stimata: 500 kg | Consegna: Dicembre 2025",
      size: 20,
    }),
  ],
  spacing: { after: 300 },
}),
```

## 🔍 Troubleshooting

### Issue: "Module not found: docx"
**Solution**: Run `npm install docx` in your project directory

### Issue: "Cannot find customer in database"
**Solution**: Use fuzzy search or ask Claude to list available customers first

### Issue: "Pricing data missing"
**Solution**: Check if product exists in database, use cost-plus calculation as fallback

### Issue: "Logo not displaying"
**Solution**: Ensure logo file path is correct and file format is PNG/JPG

### Issue: "Italian formatting incorrect"
**Solution**: Use Italian number format (comma for decimals: 1.234,56)

## 📝 Best Practices

### Content
- ✅ Always include product codes when available
- ✅ Specify configurations clearly (A+B components, packaging)
- ✅ Include transport/delivery terms
- ✅ Reference technical data sheets
- ✅ Use metric units (kg, liters, m²)

### Pricing
- ✅ Format: "103,00 €/kg" (Italian style)
- ✅ Show tiered pricing for volume discounts
- ✅ Include quantity minimums
- ✅ Specify unit of measure

### Legal
- ✅ Include "Condizioni generali di vendita" reference
- ✅ Specify IVA rate (22% standard)
- ✅ Note CIG/CUP requirement for public works
- ✅ State payment terms explicitly

### File Management
- ✅ Naming: `Offerta_RESIMIX_OF###-YY_ClientName.docx`
- ✅ Save to: `/mnt/user-data/outputs/`
- ✅ Version control: Include offer date in filename

## 🚀 Advanced Features

### Multi-Page Documents
Add page numbers and footers:

```javascript
sections: [{
  properties: {
    page: {
      pageNumbers: {
        start: 1,
        formatType: NumberFormat.DECIMAL,
      },
    },
  },
  footers: {
    default: new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Resimix S.r.l. - P.IVA [number]",
              size: 18,
              color: COLORS.GRAY,
            }),
          ],
        }),
      ],
    }),
  },
}]
```

### Conditional Sections
Show/hide sections based on offer type:

```javascript
const sections = [
  createHeader(),
  createLogo(),
  createCustomerTable(),
];

// Only add volume discount table if applicable
if (offerType === 'volume_discount') {
  sections.push(createVolumeDiscountTable());
}

// Only add project details for project-based offers
if (offerType === 'project') {
  sections.push(createProjectDetailsTable());
}
```

### Batch Generation
Generate multiple offers at once:

```javascript
const customers = [
  { name: "Quadrio", product: "Resicol 100" },
  { name: "Villa Sandi", product: "Resitar 30 A" },
  // ...
];

for (const customer of customers) {
  offerData.customer.name = customer.name;
  offerData.product.name = customer.product;
  await generateOffer();
}
```

## 📞 Support

For questions or issues:
- **Documentation**: Review `RESIMIX_COMMERCIAL_OFFER_SKILL.md`
- **Examples**: See generated sample document
- **Claude**: Ask Claude for help with specific scenarios

## 📄 File Naming Convention

Generated files follow this pattern:
```
Offerta_RESIMIX_OF###-YY_ClientName.docx

Where:
  ### = Sequential offer number (e.g., 172)
  YY  = Two-digit year (e.g., 25 for 2025)
  ClientName = First word of company name

Examples:
  Offerta_RESIMIX_OF172-25_RAILWAY.docx
  Offerta_RESIMIX_OF173-25_QUADRIO.docx
  Offerta_RESIMIX_OF174-25_MAPEI.docx
```

## ✨ Next Steps

1. **Try the Example**: Open the generated sample document to see the format
2. **Review the Skill**: Read the full skill documentation for details
3. **Customize**: Modify the script for your specific needs
4. **Integrate**: Connect with Resimix database tools for live data
5. **Automate**: Set up batch generation for recurring customers

---

**Created**: October 24, 2025  
**Version**: 1.0  
**Author**: Ugo Bot - Future of Work Lab  
**For**: Resimix S.r.l. Commercial Operations
