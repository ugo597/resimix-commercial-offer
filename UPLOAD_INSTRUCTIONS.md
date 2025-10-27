# How to Upload Your Resimix Commercial Offer Skill

## ⚠️ IMPORTANT: Use the Correct Branch

**This skill is properly structured on branch: `claude/fix-repository-upload-011CUXaMstch9NkyJyLa4EAs`**

DO NOT download from the main branch - it has the old, incorrect structure!

## Quick Start - Upload Now!

**A ready-to-upload ZIP file has been created: `resimix-commercial-offer.zip`**

This ZIP file is in the root of this repository and contains the correct structure.

## Directory Structure ✅

```
resimix-commercial-offer.zip contains:
├── SKILL.md                    (✅ At root level - Required)
├── README.md                   (✅ Optional - user guide)
├── generate-resimix-offer.js   (✅ Optional - executable script)
└── examples/                   (✅ Optional - reference materials)
    ├── Offerta_RESIMIX_OF172-25_RAILWAY.docx
    ├── RESIMIX_Offerta_Template_Oct26.docx
    └── Resimix.png
```

## Upload Methods

### Option 1: Upload to Claude.ai (Recommended - Easiest!)

1. **Download the pre-made ZIP file**:
   - File: `resimix-commercial-offer.zip` (in this repository root)
   - Already properly structured and ready to upload!

2. **Upload via Claude.ai**:
   - Go to https://claude.ai
   - Navigate to **Settings** → **Features** → **Skills**
   - Click **Upload Skill**
   - Select your `resimix-commercial-offer.zip` file
   - Wait for confirmation

3. **Start Using**:
   - Simply ask Claude: "Create a commercial offer for [customer] with [product]"
   - The skill will automatically activate when relevant

### Option 2: Use with Claude Code (For Developers)

1. **Personal Skills** (available in all projects):
   ```bash
   mkdir -p ~/.claude/skills/resimix-commercial-offer
   cp SKILL.md README.md generate-resimix-offer.js ~/.claude/skills/resimix-commercial-offer/
   cp -r examples/ ~/.claude/skills/resimix-commercial-offer/
   ```

2. **Project-Specific Skills** (only in this project):
   ```bash
   mkdir -p .claude/skills/resimix-commercial-offer
   cp SKILL.md README.md generate-resimix-offer.js .claude/skills/resimix-commercial-offer/
   cp -r examples/ .claude/skills/resimix-commercial-offer/
   ```

3. **Verify Installation**:
   ```bash
   ls -la ~/.claude/skills/resimix-commercial-offer/
   # or
   ls -la .claude/skills/resimix-commercial-offer/
   ```

### Option 3: Use Claude Skills API (For Programmatic Access)

```bash
curl -X POST https://api.anthropic.com/v1/skills \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $ANTHROPIC_API_KEY" \
  -F "skill=@resimix-commercial-offer.zip"
```

## Skill Validation ✅

Your skill meets all requirements:

- ✅ **Name**: `resimix-commercial-offer` (valid format, <64 chars)
- ✅ **Description**: Clear, explains what it does AND when to use it (<1024 chars)
- ✅ **YAML Frontmatter**: Properly formatted with triple dashes
- ✅ **File Structure**: SKILL.md at root with supporting files organized
- ✅ **No XML Tags**: Description is clean text only
- ✅ **No Restricted Terms**: Name doesn't contain "anthropic" or "claude"

## Testing Your Skill

After upload, test with these prompts:

1. **Basic Test**:
   ```
   Create a commercial offer for Quadrio Costruzioni for Resicol 100
   ```

2. **With Details**:
   ```
   Generate an offer for Railway Enterprise with the following details:
   - Product: Resicol 100, A+B 40kg configuration
   - Price: 103.00 EUR per kit
   - Contact: Dott. Pasquale Isernia
   ```

3. **With Data Integration**:
   ```
   Create an offer for [customer name] using their last purchase price for [product name]
   ```

## What Happens When You Use the Skill?

Claude will:
1. Read the SKILL.md instructions
2. Gather customer information (if available in Resimix databases)
3. Retrieve product specifications and pricing
4. Generate a professionally formatted DOCX document
5. Follow Resimix branding guidelines (colors, fonts, structure)
6. Provide you with a download link

## Skill Activation

The skill automatically activates when Claude detects:
- Keywords: "commercial offer", "quotation", "price proposal", "offerta"
- Resimix product names: "Resicol", "Resitar", "Resisystem"
- Customer context with pricing requests

## Files Included

- **SKILL.md**: Complete instructions for generating offers (20KB)
- **README.md**: User guide and customization instructions (9KB)
- **generate-resimix-offer.js**: Example implementation script (20KB)
- **examples/**: Sample documents and logo files

## Need Help?

- **Documentation**: Review `README.md` for detailed usage
- **Examples**: Check `examples/` for sample outputs
- **Support**: Ask Claude for help with specific scenarios

## Version Information

- **Skill Name**: resimix-commercial-offer
- **Created**: October 2025
- **Format**: Claude Skills v1.0
- **File Size**: ~60KB total (well under limits)

---

**Ready to upload!** Choose your preferred method above and start creating professional Resimix commercial offers.
