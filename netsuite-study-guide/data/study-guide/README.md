# Study Guide Content Management

This directory contains markdown files for the NetSuite study guide content. Using markdown makes it easy to maintain, version control, and collaborate on study materials.

## How It Works

1. **Write Content**: Create or edit markdown files in this directory
2. **Parse to JSON**: Run `npm run parse-study-guide` to convert markdown to JSON
3. **Automatic Loading**: The app loads content from the parsed JSON file

## File Structure

```
study-guide/
├── README.md (this file)
├── template.md (template for creating new sections)
├── 01-setup-administration.md
├── 02-user-interface.md
├── 03-process-flows.md
├── 04-suiteanalytics.md
└── 05-maintenance-security.md
```

## Creating a New Section

### Step 1: Create a Markdown File

Create a new `.md` file following the naming convention: `##-section-name.md`

Use the [template.md](template.md) as a starting point.

### Step 2: Add Section Metadata

At the top of your file, include:

```markdown
# Section Title

**Section ID:** 1
**Section Title:** Setup & Administration
```

### Step 3: Add Topics

Each topic should follow this structure:

```markdown
## Topic: Your Topic Name

**Description:**
Brief overview of the topic.

### Key Points

- Point 1
- Point 2 with **bold** emphasis
- Point 3 with `code`

### Important Notes

> This is a callout for important information

### Code Example (Optional)

```javascript
// Your code here
```

### Practice Question (Optional)

**Question:** Your question text?

**Options:**
A) Option 1
B) Option 2
C) Option 3
D) Option 4

**Correct Answer:** A

**Explanation:**
Why this is the correct answer.

---
```

## Markdown Features Supported

### Headers

```markdown
### Key Points (renders as <h4>)
#### Sub-point (renders as <h5>)
```

### Text Formatting

- **Bold**: `**bold text**`
- *Italic*: `*italic text*`
- `Code`: `` `inline code` ``

### Lists

```markdown
- Unordered list item 1
- Unordered list item 2
```

### Blockquotes (Notes)

```markdown
> This becomes a highlighted note box
```

### Code Blocks

````markdown
```javascript
const example = 'code here';
```
````

### Practice Questions

Practice questions are automatically formatted as interactive quiz blocks:

```markdown
### Practice Question

**Question:** Your question?

**Options:**
A) First option
B) Second option
C) Third option
D) Fourth option

**Correct Answer:** B

**Explanation:**
Detailed explanation.
```

## Parsing Content

After creating or updating markdown files, run:

```bash
npm run parse-study-guide
```

This will:
- Read all `.md` files (except `template.md`)
- Convert markdown to HTML
- Parse practice questions
- Generate `data/parsedStudyGuide.json`

## Parse All Content

To parse both study guide and practice questions:

```bash
npm run parse-all
```

## Best Practices

1. **Use Consistent Formatting**: Follow the template structure
2. **One Section Per File**: Keep sections in separate files for easier management
3. **Number Files**: Use `01-`, `02-` prefixes for ordering
4. **Parse After Changes**: Always run `npm run parse-study-guide` after editing
5. **Test in Browser**: Verify formatting looks correct in the application

## Tips

- **Bold Important Terms**: Use `**bold**` for key concepts
- **Use Code Formatting**: Wrap navigation paths in backticks: `` `Setup → Company` ``
- **Add Practice Questions**: Include at least one practice question per topic
- **Use Callouts**: Leverage `>` blockquotes for important notes
- **Keep it Concise**: Focus on exam-relevant information

## Troubleshooting

**Content not showing?**
- Ensure you ran `npm run parse-study-guide`
- Check for parsing errors in the console
- Verify markdown syntax is correct

**Practice questions not working?**
- Ensure format matches template exactly
- Correct Answer must be A, B, C, D (capital letters)
- Options must use format: `A) Option text`

**Formatting looks wrong?**
- Check for proper spacing around headers
- Ensure code blocks have proper backticks
- Verify list items start with `- `

## Migration from Hardcoded Data

To migrate existing content:

1. Copy content from `topicsData.ts`
2. Convert HTML to markdown syntax
3. Follow the template structure
4. Run parser to test
5. Compare output in browser
6. Update imports in components once verified

## Contributing

When adding new content:

1. Create/edit markdown files
2. Run parser: `npm run parse-study-guide`
3. Test in browser
4. Commit both `.md` and `parsedStudyGuide.json` files
