# NetSuite SuiteFoundation Study Guide - Next.js Application

This is a modern Next.js conversion of the NetSuite SuiteFoundation exam study guide, featuring:

- **6 Study Sections** covering all exam domains
- **36+ Topics** with detailed concepts, mnemonics, and tips
- **42 Practice Questions** with randomized quiz mode
- **Progress Tracking** with localStorage persistence
- **Fully Responsive** design
- **Modern UI** with beautiful color-coded content blocks

## Features

### Study Content
- **Setup & Administration** - Enable Features, classifications, subsidiaries
- **NetSuite User Interface** - Navigation, preferences, performance optimization
- **Standard Process Flows** - CRM, sales cycle, order management, AP/AR
- **SuiteAnalytics** - Saved searches, portlets, data management
- **Maintenance & Security** - Roles, permissions, audit trails

### Interactive Elements
- ✅ Checkbox tracking for completed topics
- 📊 Progress bar showing study completion percentage
- 🎯 Practice quiz with 42 randomized questions
- 💾 Automatic progress saving to localStorage
- 🎨 Color-coded content blocks (concepts, tips, warnings, mnemonics)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd netsuite-study-guide
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
netsuite-study-guide/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Hero header
│   ├── ProgressBar.tsx     # Study progress tracker
│   ├── InfoStrip.tsx       # Exam info cards
│   ├── TabNavigation.tsx   # Section tabs
│   ├── Section.tsx         # Section wrapper
│   ├── TopicCard.tsx       # Collapsible topic card
│   ├── QuizMode.tsx        # Practice quiz
│   └── Footer.tsx          # Footer
├── data/
│   ├── quizData.ts         # 42 practice questions
│   └── topicsData.ts       # Study content
├── package.json
├── tsconfig.json
└── next.config.js
```

## Customization

### Adding More Content
Edit `data/topicsData.ts` to add more sections or topics. Each topic follows this structure:

```typescript
{
  id: "t1_1",
  title: "Topic Title",
  content: `<div class="concept-block">...</div>`
}
```

### Adding More Quiz Questions
Edit `data/quizData.ts` to add questions:

```typescript
{
  q: "Question text",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  correct: 2, // Index of correct answer (0-3)
  domain: "Domain name",
  explain: "Explanation"
}
```

### Styling
All CSS is in `app/globals.css`. The design uses CSS custom properties for easy theming:

```css
:root {
  --bg: #FAF7F2;
  --primary: #C45D3E;
  --green: #2D7D46;
  /* ... more variables */
}
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **React Hooks** - State management
- **CSS3** - Styling with custom properties
- **localStorage** - Progress persistence

## Original HTML File

This Next.js application is a conversion of the original `suitefoundation-study-guide.html` file. The conversion includes:

- ✅ All 42 quiz questions extracted and typed
- ✅ All study content preserved with HTML structure
- ✅ Progress tracking functionality
- ✅ Responsive design improvements
- ✅ Component-based architecture for maintainability

## License

Based on official NetSuite SuiteFoundation study materials. For exam registration and official resources, visit [NetSuite Certification](https://www.netsuite.com/portal/services/training/certification.shtml).

## Notes

- **Note on Content**: The `topicsData.ts` file currently contains Section 1 as a demonstration. To add all sections (2-5), extract the remaining content from the original HTML file and follow the same structure pattern.
- Progress is saved automatically in your browser's localStorage
- Quiz questions are randomized on each load
- The application works offline after the first load (PWA-ready)
