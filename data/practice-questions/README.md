# Practice Questions System

This directory contains practice questions for the NetSuite study guide in markdown format.

## How It Works

1. **Create Questions**: Add practice questions using the markdown template format (see [template.md](template.md))
2. **Parse to JSON**: Run `npm run parse-questions` to convert markdown files to JSON
3. **Automatic Loading**: The quiz application automatically loads all parsed exams

## Adding New Practice Questions

### Step 1: Create a Markdown File

Create a new `.md` file in this directory following the template format:

```markdown
# Your Exam Title

**Total Questions:** 50 | **Time Allowed:** 60 minutes
**Passing Score:** 70%

---

## Question 1
**Topic:** Topic Name
**Difficulty:** Easy
**Question Type:** Multiple Choice

What is your question text?

**Options:**
A) First option
B) Second option
C) Third option
D) Fourth option

**Correct Answer:** A

**Explanation:**
Detailed explanation of why this is the correct answer.

**Reference:**
Optional reference to documentation or page number

---

## Question 2
...
```

### Step 2: Parse the Questions

After creating or updating markdown files, run:

```bash
npm run parse-questions
```

This will:
- Read all `.md` files (except `template.md`)
- Parse questions into structured data
- Generate `data/parsedQuizExams.json`

### Step 3: Test in the Application

Start the development server:

```bash
npm run dev
```

Navigate to the Practice Quiz tab and you'll see your new exam available.

## Question Format

### Required Fields

- **Topic**: Category or subject area
- **Difficulty**: Easy, Medium, or Hard
- **Question Type**: Multiple Choice, True/False, Matching, or Code Analysis
- **Question Text**: The actual question
- **Options**: Answer choices (A, B, C, D, etc.)
- **Correct Answer**: The letter of the correct option
- **Explanation**: Why the answer is correct

### Optional Fields

- **Reference**: Link to documentation or additional resources

## Supported Question Types

### Multiple Choice
Standard multiple-choice with 2-10 options (A-J)

### True/False
Two options (A) True, B) False)

### Code Analysis
Questions with code blocks in the question text

### Matching
Match items in the question to their descriptions

## Tips

1. **Consistent Formatting**: Follow the template exactly for best parsing results
2. **Clear Explanations**: Write detailed explanations to help users learn
3. **Test Parsing**: Always run `npm run parse-questions` after adding/editing questions
4. **Check Output**: Review `data/parsedQuizExams.json` to verify parsing was successful

## Troubleshooting

**Questions not showing up?**
- Ensure you ran `npm run parse-questions`
- Check for parsing errors in the console
- Verify the markdown format matches the template

**Incorrect answers?**
- Verify the **Correct Answer:** letter matches your intended option
- Options are indexed starting from 'A'

**Build errors?**
- The JSON file must be valid
- Run `npm run parse-questions` before building
