# Migration Guide: Moving Study Guide Content to Markdown

This guide explains how to migrate your study guide content from hardcoded TypeScript to markdown files.

## Benefits of Markdown-Based Content

✅ **Easier to Edit** - No need to deal with HTML strings and escaping
✅ **Better Version Control** - Cleaner diffs in Git
✅ **Collaboration Ready** - Non-technical contributors can edit
✅ **Consistent Formatting** - Template-based structure
✅ **Faster Updates** - Just edit markdown and parse

## Current Status

**Completed:**
- ✅ Section 1: Setup & Administration (migrated to markdown)
- ✅ Parser system built and tested
- ✅ Practice questions system (already in markdown)

**To Do:**
- ⏳ Section 2: User Interface
- ⏳ Section 3: Process Flows
- ⏳ Section 4: SuiteAnalytics
- ⏳ Section 5: Maintenance & Security

## How to Migrate a Section

### Step 1: Create the Markdown File

Create a new file in `data/study-guide/` following the naming pattern:
- `02-user-interface.md`
- `03-process-flows.md`
- `04-suiteanalytics.md`
- `05-maintenance-security.md`

### Step 2: Add Section Metadata

Start each file with:

```markdown
# User Interface

**Section ID:** 2
**Section Title:** User Interface
```

### Step 3: Convert Each Topic

For each topic in the old `topicsData.ts`, convert to markdown:

**Old Format (topicsData.ts):**
```typescript
{
  id: "t2_1",
  title: "Dashboard Portlets",
  content: `
    <div class="concept-block">
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Portlets</strong> are modular UI components</li>
        <li>Found at <code>Setup → Home</code></li>
      </ul>
    </div>
  `
}
```

**New Format (markdown):**
```markdown
## Topic: Dashboard Portlets

**Description:**
Learn about dashboard portlets and customization.

### Key Concepts

- **Portlets** are modular UI components
- Found at `Setup → Home`
```

### Step 4: Convert HTML to Markdown

| HTML | Markdown |
|------|----------|
| `<h4>Title</h4>` | `### Title` |
| `<strong>Bold</strong>` | `**Bold**` |
| `<em>Italic</em>` | `*Italic*` |
| `<code>code</code>` | `` `code` `` |
| `<ul><li>Item</li></ul>` | `- Item` |
| `<div class="note">...</div>` | `> Note text` |

### Step 5: Add Practice Questions

Convert inline practice questions to the standard format:

```markdown
### Practice Question

**Question:** What is a portlet?

**Options:**
A) A modular UI component
B) A type of report
C) A saved search
D) A custom field

**Correct Answer:** A

**Explanation:**
Portlets are modular UI components that can be added to dashboards.
```

### Step 6: Parse and Test

After creating the markdown file:

```bash
npm run parse-study-guide
npm run dev
```

Check the application to verify formatting looks correct.

## Example Migration: Section 2 Starter

Here's a starter template for Section 2:

```markdown
# User Interface

**Section ID:** 2
**Section Title:** User Interface

---

## Topic: Dashboard Portlets

**Description:**
Understanding dashboard portlets and customization options.

### Key Points

- Portlets are modular components on your dashboard
- Customize at Home → Dashboard
- Types include: KPI, Reports, Lists, Reminders

### Practice Question

**Question:** Which action can be taken to optimize NetSuite's performance in a browser?

**Options:**
A) Resize dashboard portlets
B) Use multiple browser tabs
C) Use the smallest portlet level refresh
D) Maximize dashboard reports and searches

**Correct Answer:** C

**Explanation:**
Using the smallest portlet level refresh reduces the data loaded on the dashboard, improving performance.

---

## Topic: Global Search

[Continue with next topic...]
```

## Tips for Fast Migration

1. **Copy-Paste Structure**: Start with the template
2. **Strip HTML Tags**: Use find/replace to convert common patterns
3. **Keep Practice Questions**: They're already formatted well
4. **Test Frequently**: Parse and check after each topic
5. **One Section at a Time**: Don't try to migrate everything at once

## Common Conversions

### Concept Blocks

**Old:**
```html
<div class="concept-block">
  <h4>Key Concepts</h4>
  <ul><li>Point 1</li></ul>
</div>
```

**New:**
```markdown
### Key Concepts

- Point 1
```

### Mnemonic Boxes

**Old:**
```html
<div class="mnemonic-box">
  <strong>Memory trick:</strong> EGAL
</div>
```

**New:**
```markdown
> **Memory Trick:** EGAL
```

### Tip Boxes

**Old:**
```html
<div class="tip-box">
  <strong>Exam Tip:</strong> Remember this
</div>
```

**New:**
```markdown
> **Exam Tip:** Remember this
```

## Switching to Markdown Data

Once all sections are migrated:

1. Update `app/page.tsx` to import from `topicsDataFromMarkdown.ts`
2. Keep `topicsData.ts` as backup temporarily
3. Test thoroughly
4. Remove old hardcoded data

## Need Help?

The parser output is at `data/parsedStudyGuide.json` - check this file to see how your markdown is being converted.

If content looks wrong:
1. Check markdown syntax
2. Verify section metadata is correct
3. Ensure horizontal rules (`---`) separate topics
4. Run parser again after fixes
