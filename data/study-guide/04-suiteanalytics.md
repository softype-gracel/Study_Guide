# SuiteAnalytics

**Section ID:** 4
**Section Title:** SuiteAnalytics

---

## Topic: Options for Finding Records

**Description:**
Finding records, saved searches, portlet types, and data management tools.

### Key Concepts

- **Global Search**: Search bar at the top. Searches across all record types. Use prefixes to narrow (e.g., "cust:" for customers, "tran:" for transactions).
- **Lists**: Navigate via menu to see full lists of records (e.g., Lists → Relationships → Customers).
- **Reports**: Pre-built and custom reports for aggregated data analysis.
- **Saved Searches**: The most powerful record-finding tool — customizable queries with criteria, results, filters, and formulas.

---

## Topic: Building Saved Searches

**Description:**
Understanding the components and capabilities of saved searches.

### Key Concepts

- **Criteria**: Filters to narrow results (Standard and Summary criteria). Think of this as the WHERE clause.
- **Results**: Columns to display. Think of this as the SELECT clause.
- **Available Filters**: Filters shown on the search results page for end-users to further refine results dynamically.
- **Audience**: Controls who can see and use the saved search (specific roles, departments, etc.).
- **Highlighting**: Conditional formatting — highlight rows based on criteria (e.g., overdue invoices in red).
- **Formulas**: Basic formulas for calculated fields in results (uses SQL-like syntax).
- **Key Set Preferences that affect searches**: "Show Inactive" (includes inactive records), "Show List when only 1 result" (bypasses auto-navigation to single result), "Main Line for Transactions" (controls transaction line display).

### Exam Tip

The exam will NOT test on summary types, SQL, joins, or HTML in searches. Focus on the basic elements listed above.

### Practice Question

**Question:** Which element of a saved search controls conditional row highlighting based on specific criteria?

**Options:**
A) Available Filters
B) Audience
C) Highlighting
D) Formulas

**Correct Answer:** C

**Explanation:**
Highlighting is the saved search element that applies conditional formatting to rows — for example, coloring overdue invoices red. Available Filters let users refine results. Audience controls who sees the search. Formulas add calculated columns.

---

## Topic: Portlet Types

**Description:**
Different types of dashboard portlets and their uses.

### Key Concepts

- **KPI (Key Performance Indicators)**: Displays summary metrics with comparisons and thresholds. Supports date range comparisons and conditional highlighting.
- **KPI Meter**: Visual gauge/speedometer-style display of a single KPI.
- **KPI Scorecard**: Shows multiple KPIs in a card layout for quick status overview.
- **Report Snapshot**: Displays summary data from reports or saved searches for selected date ranges.
- **Reminders**: Shows alerts for items needing attention (e.g., pending approvals, overdue tasks).
- **Shortcuts**: Quick links to frequently used pages.
- **Custom Portlets**: HTML, list, or form-based custom content.
- **My Login Audit**: Shows recent login history for the current user.
- **Settings Portlet**: Quick access to setup/configuration links.

### Practice Question

**Question:** Which portlet displays summary data from reports or saved searches for selected date ranges, with options to compare ranges and highlight thresholds?

**Options:**
A) Report Snapshot
B) Key Performance Indicators
C) Account Reconciliation Summary
D) SMT Links

**Correct Answer:** B

**Explanation:**
The KPI portlet displays summary data with date range comparisons and threshold-based highlighting. Report Snapshots show report data but with fewer interactive comparison features.

---

## Topic: Data Management Tools

**Description:**
Tools for managing, importing, exporting, and maintaining data.

### Key Concepts

- **Inline Editing**: Edit field values directly from list views without opening the record. Must be enabled. Not available on all fields.
- **Mass Updates**: Change a field value across many records at once. Select criteria → choose field → set new value. Runs as a background process.
- **CSV Import**: Import data from CSV files into NetSuite records. Uses the Import Assistant (`Setup → Import/Export → Import CSV Records`). Supports creating new records and updating existing ones.
- **CSV Export**: Export list views and search results to CSV format.
- **Duplicate Detection**: Identifies potential duplicate records based on configurable matching criteria (name, email, phone, etc.).
- **Delete All Data**: Removes all data from the account — used in sandbox/test environments. Very destructive — requires Admin role.

### Warning

**Critical:** Delete All Data is irreversible and available only to Administrators. It removes ALL transaction and record data. This is intended for sandbox cleanup, never for production use.
