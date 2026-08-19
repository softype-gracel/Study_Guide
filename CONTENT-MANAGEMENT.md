# Content Management System

This document explains the markdown-based content management system for the NetSuite Study Guide.

## Overview

The study guide uses **markdown files** for all content, making it easy to create, edit, and maintain without touching code.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Creation                          │
│  (Write/Edit Markdown Files)                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Parsing Scripts                           │
│  npm run parse-all                                           │
│  ├── parse-questions (practice exams)                        │
│  └── parse-study-guide (study topics)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    JSON Output                               │
│  ├── parsedQuizExams.json (practice questions)              │
│  └── parsedStudyGuide.json (study guide topics)             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
│  Components load and display parsed content                  │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
netsuite-study-guide/
├── data/
│   ├── practice-questions/          # Practice exam questions
│   │   ├── README.md               # Documentation
│   │   ├── template.md             # Question template
│   │   └── *.md                    # Exam files
│   │
│   ├── study-guide/                # Study guide content
│   │   ├── README.md               # Documentation
│   │   ├── template.md             # Section template
│   │   └── *.md                    # Section files
│   │
│   ├── parsedQuizExams.json        # Generated from practice-questions/
│   ├── parsedStudyGuide.json       # Generated from study-guide/
│   └── loadQuizData.ts             # Quiz data loader
│
├── scripts/
│   ├── parseMarkdownQuestions.js   # Parser for practice questions
│   └── parseStudyGuide.js          # Parser for study guide
│
└── components/
    ├── EnhancedQuizMode.tsx        # Quiz interface
    └── Section.tsx                 # Study guide sections
```

## Content Types

### 1. Practice Questions (Exams)

**Location:** `data/practice-questions/*.md`

**Format:** Full practice exams with multiple question types
- Multiple Choice (A, B, C, D)
- True/False
- Matching
- Code Analysis

**Example:** `netsuite-enable-features.md` (70 questions)

**Parser:** `npm run parse-questions`

**Output:** `data/parsedQuizExams.json`

### 2. Study Guide Topics

**Location:** `data/study-guide/*.md`

**Format:** Organized sections with topics, key points, and inline practice questions

**Example:** `01-setup-administration.md`

**Parser:** `npm run parse-study-guide`

**Output:** `data/parsedStudyGuide.json`

## Workflow

### Adding Practice Questions

1. Create or edit a `.md` file in `data/practice-questions/`
2. Follow the template format
3. Run: `npm run parse-questions`
4. Questions automatically appear in the Practice Quiz tab

### Adding Study Guide Content

1. Create or edit a `.md` file in `data/study-guide/`
2. Follow the section template
3. Run: `npm run parse-study-guide`
4. Content appears in the appropriate study guide section

### Updating All Content

```bash
npm run parse-all
```

This runs both parsers in sequence.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run parse-questions` | Parse practice question markdown files |
| `npm run parse-study-guide` | Parse study guide markdown files |
| `npm run parse-all` | Parse both questions and study guide |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

## Markdown Features

### Study Guide Supports

- ✅ Headers (`###`, `####`)
- ✅ Bold (`**text**`)
- ✅ Italic (`*text*`)
- ✅ Inline code (`` `code` ``)
- ✅ Code blocks (` ```language `)
- ✅ Lists (`- item`)
- ✅ Blockquotes (`> note`)
- ✅ Practice questions (structured format)

### Practice Questions Support

- ✅ Multiple choice questions
- ✅ True/False questions
- ✅ Matching questions
- ✅ Code snippets in questions
- ✅ Detailed explanations
- ✅ Topic categorization
- ✅ Difficulty levels

## Best Practices

### For Study Guide Content

1. **One section per file**: `01-section-name.md`
2. **Number files**: Use prefixes for ordering (01-, 02-, etc.)
3. **Consistent formatting**: Follow the template
4. **Include practice questions**: Add relevant questions per topic
5. **Parse after editing**: Always run parser before testing

### For Practice Questions

1. **Descriptive filenames**: `exam-topic-name.md`
2. **Complete metadata**: Include total questions, time, passing score
3. **Numbered questions**: Use `## Question 1`, `## Question 2`, etc.
4. **Verify answers**: Double-check correct answer letters
5. **Quality explanations**: Write detailed explanations

## Version Control

### What to Commit

✅ **Always commit:**
- Markdown source files (`*.md`)
- Parsed JSON files (`parsedQuizExams.json`, `parsedStudyGuide.json`)
- Parser scripts

✅ **Why commit JSON?**
- Ensures deployment has latest content
- Serves as snapshot of parsed output
- Faster builds (no parsing during deployment)

### Git Workflow

```bash
# 1. Edit markdown files
# 2. Parse content
npm run parse-all

# 3. Commit both source and output
git add data/
git commit -m "Update study guide content"
```

## Troubleshooting

### Content not showing?

1. ✓ Did you run the parser? (`npm run parse-all`)
2. ✓ Check console for parsing errors
3. ✓ Verify markdown syntax
4. ✓ Refresh browser

### Questions formatted incorrectly?

1. ✓ Verify format matches template exactly
2. ✓ Check option letters (A, B, C, D)
3. ✓ Ensure `**Correct Answer:**` is properly formatted
4. ✓ View parsed JSON to see output

### Study guide content missing?

1. ✓ Check section ID and title metadata
2. ✓ Verify topics separated by `---`
3. ✓ Ensure proper heading levels
4. ✓ Inspect `parsedStudyGuide.json`

## Migration Status

**Current Status:**
- ✅ Practice questions: 100% markdown-based
- ⏳ Study guide: 20% migrated (1 of 5 sections)

**To Do:**
- Migrate remaining 4 sections to markdown
- Update components to use markdown data source
- Remove hardcoded content from `topicsData.ts`

See [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) for detailed migration instructions.

## Performance

**Parsing Speed:**
- ~70 questions: <1 second
- ~7 study topics: <1 second

**Runtime:**
- JSON loading: Instant (pre-parsed)
- No runtime parsing overhead
- Fast page loads

## Future Enhancements

Potential improvements:
- [ ] Markdown preview during editing
- [ ] Validation script to check syntax
- [ ] Auto-numbering for questions
- [ ] Search functionality across content
- [ ] Multi-language support
