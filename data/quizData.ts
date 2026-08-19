export interface QuizQuestion {
  q: string;
  opts: string[];
  correct: number;
  domain: string;
  explain: string;
}

export const quizDataAll: QuizQuestion[] = [
  // ── DOMAIN 1: SETUP & ADMINISTRATION (Q1–Q8) ──
  {
    q: "Which of the following is configured at Setup → Company → Enable Features?",
    opts: ["Default transaction forms", "User time zone", "Turning on CRM functionality", "CSV export format"],
    correct: 2,
    domain: "Setup & Administration",
    explain: "Enable Features is where you activate/deactivate major NetSuite functionality modules like CRM, SuiteCommerce, and Advanced Inventory. Default forms, time zones, and export formats are configured elsewhere."
  },
  {
    q: "What happens when you rename a record type in NetSuite (e.g., 'Sales Order' to 'Service Order')?",
    opts: ["SuiteScript references automatically update", "The internal ID changes", "The UI label changes company-wide but internal references remain unchanged", "Only the Administrator sees the new name"],
    correct: 2,
    domain: "Setup & Administration",
    explain: "Renaming a record type only changes the display label across the entire UI for all users. Internal IDs, SuiteScript references, and SuiteAnswers documentation continue to use the original name."
  },
  {
    q: "Which classification structure represents a legal entity and enables consolidated financial reporting?",
    opts: ["Departments", "Classes", "Locations", "Subsidiaries"],
    correct: 3,
    domain: "Setup & Administration",
    explain: "Subsidiaries represent legal entities in NetSuite OneWorld and are the only classification that supports consolidated financial reporting. Departments, Classes, and Locations are segmentation tools."
  },
  {
    q: "How can the impact of intercompany purchases and sales be offset?",
    opts: ["Post journals to an elimination subsidiary", "Ensure subsidiaries have the same parent", "Exclude one subsidiary when reporting", "Use a non-posting journal entry"],
    correct: 0,
    domain: "Setup & Administration",
    explain: "Elimination subsidiaries are used to offset intercompany transactions in consolidated financial reports. Journals posted to the elimination subsidiary remove the double-counting effect."
  },
  {
    q: "Where does an Administrator turn on Custom Records?",
    opts: ["Users/Roles", "Enable Features", "Setup → Customization", "Company Preferences"],
    correct: 1,
    domain: "Setup & Administration",
    explain: "Custom Records must first be enabled under Setup → Company → Enable Features. Customization is where you create and manage them after the feature is turned on. This is a common trick question on the exam."
  },
  {
    q: "What is the difference between Enable Features and General Preferences?",
    opts: ["They are the same thing", "Enable Features turns functionality on/off; General Preferences controls default company-wide behavior", "General Preferences turns features on/off; Enable Features sets defaults", "Enable Features is user-level; General Preferences is company-level"],
    correct: 1,
    domain: "Setup & Administration",
    explain: "Enable Features is the master switch for turning capabilities on or off. General Preferences configures default company-wide behaviors (like mandatory fields and display options). Both are company-level, but they serve different purposes."
  },
  {
    q: "Which feature is commonly cited as requiring NetSuite Support to enable and being irreversible?",
    opts: ["Advanced PDF/HTML Templates", "Multi-Location Inventory", "Custom Records", "SuiteFlow"],
    correct: 1,
    domain: "Setup & Administration",
    explain: "Multi-Location Inventory (MLI) is the classic example of a feature that requires NetSuite Support intervention to enable and cannot be reversed once turned on, because it fundamentally changes how inventory data is stored."
  },
  {
    q: "What is SuiteFlow used for?",
    opts: ["Managing data imports via CSV", "Automating business processes with a visual point-and-click tool", "Tracking financial transactions in the GL", "Creating custom saved searches"],
    correct: 1,
    domain: "Setup & Administration",
    explain: "SuiteFlow (Workflow Manager) is a visual, point-and-click tool for automating business processes without scripting. You create states, transitions, and actions based on conditions to automate workflows."
  },

  // ── DOMAIN 2: NETSUITE USER INTERFACE (Q9–Q16) ──
  {
    q: "Which action can be taken to optimize NetSuite's performance in a browser?",
    opts: ["Resize dashboard portlets", "Use multiple browser tabs", "Use the smallest portlet level refresh", "Maximize dashboard reports and searches"],
    correct: 2,
    domain: "NetSuite User Interface",
    explain: "Using the smallest portlet level refresh reduces the data loaded on the dashboard, improving performance. Multiple browser tabs and maximizing reports would hurt performance, not help it."
  },
  {
    q: "What information is displayed in a pop-up window after double-clicking the NetSuite logo?",
    opts: ["The PET (Page, Email, Time) page", "The ISP (Internet, Service, Performance) page", "The status.netsuite.com page", "The NPN (NetSuite Performance Notification) page"],
    correct: 0,
    domain: "NetSuite User Interface",
    explain: "Double-clicking the NetSuite logo opens the PET page, which stands for Page, Email, Time. This displays performance metrics like page load time, email queue status, and server response times — useful for diagnosing issues."
  },
  {
    q: "Which two options can be set by the User under Home → Set Preferences?",
    opts: ["The default role and the default forms", "The default subsidiary and the tab navigation", "The company logo and the default currency", "The fiscal year and the chart of accounts"],
    correct: 0,
    domain: "NetSuite User Interface",
    explain: "Under Home → Set Preferences, users can set their default role (which role loads on login) and default forms (which form version appears when creating records). Subsidiary, fiscal year, and chart of accounts are admin-level configurations."
  },
  {
    q: "How does the Shortcuts dashboard portlet differ from the Shortcuts menu icon?",
    opts: ["The portlet is on the navigation bar; the icon is on the dashboard", "They are identical in functionality and placement", "The portlet is on the dashboard with richer display options; the icon is a dropdown in the nav bar", "The menu icon supports more shortcuts than the portlet"],
    correct: 2,
    domain: "NetSuite User Interface",
    explain: "The Shortcuts dashboard portlet lives on your dashboard and offers more visual customization (icons, grouping). The Shortcuts menu icon is a simple dropdown in the navigation bar. Both provide quick links, but the portlet is more feature-rich."
  },
  {
    q: "Which navigation tool in NetSuite allows you to search across all record types using prefixes like 'cust:' or 'tran:'?",
    opts: ["Quick Search", "Recent Records", "Global Search", "Saved Searches"],
    correct: 2,
    domain: "NetSuite User Interface",
    explain: "Global Search is the search bar at the top of every page that searches across all record types. It supports prefixes to narrow results (e.g., 'cust:' for customers, 'tran:' for transactions). Quick search is more targeted within specific lists."
  },
  {
    q: "What determines the top-level tab navigation (Centers) a user sees in NetSuite?",
    opts: ["The user's department", "The user's assigned role", "The company's Enable Features settings", "The user's Set Preferences selections"],
    correct: 1,
    domain: "NetSuite User Interface",
    explain: "Roles determine which Centers (top-level tabs) a user sees. Different roles show different navigation — for example, an Accountant role shows different tabs than a Sales Manager role. Centers are role-based, not user-preference-based."
  },
  {
    q: "Which feature requires a user to agree to the Mass Messaging Application Terms of Service?",
    opts: ["Mail Merge", "Capture Email Replies", "Subscription Categories", "Customer Relationship Manager"],
    correct: 0,
    domain: "NetSuite User Interface",
    explain: "Mail Merge is a mass messaging feature that sends personalized emails or letters in bulk, which is why it requires agreement to the Mass Messaging Application Terms of Service before use."
  },
  {
    q: "Where can a user enable the 'Show Internal IDs' preference?",
    opts: ["Setup → Company → Enable Features", "Setup → Company → General Preferences", "Home → Set Preferences", "Customization → Scripting"],
    correct: 2,
    domain: "NetSuite User Interface",
    explain: "Show Internal IDs is a user-level preference found under Home → Set Preferences. It displays internal ID numbers next to records in lists and dropdowns, which is especially useful for scripting and debugging."
  },

  // ── DOMAIN 3: STANDARD NS PROCESS FLOWS (Q17–Q28) ──
  {
    q: "What is the correct progression in the NetSuite sales cycle?",
    opts: ["Customer → Prospect → Lead", "Lead → Customer → Prospect", "Lead → Prospect → Customer", "Prospect → Lead → Customer"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "The standard NetSuite sales cycle is Lead → Prospect → Customer. Creating an Opportunity converts a Lead to a Prospect. Creating a Sales Order converts a Prospect to a Customer."
  },
  {
    q: "What is the difference between a Drop Ship and a Special Order?",
    opts: ["Drop Ship ships from you; Special Order ships from vendor", "Drop Ship ships directly from vendor to customer; Special Order ships from vendor to you first", "They are identical features", "Special Order requires a Purchase Request"],
    correct: 1,
    domain: "Standard Process Flows",
    explain: "In a Drop Ship, the vendor ships directly to the customer. In a Special Order, the vendor ships to your company first, and then you ship to the customer."
  },
  {
    q: "Which item type shows component items as a single line item on a Sales Order?",
    opts: ["Group Item", "Kit/Package", "Assembly Item", "Non-Inventory Item"],
    correct: 1,
    domain: "Standard Process Flows",
    explain: "Kit/Package items display as a single line on the transaction with one price. Group Items show each component as individual lines. Assembly Items are manufactured finished goods."
  },
  {
    q: "A Sales Order by itself has which GL impact?",
    opts: ["Debits Accounts Receivable", "Credits Revenue", "No GL impact — it's a non-posting transaction", "Debits Inventory"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Sales Orders are non-posting transactions — they represent a commitment to sell but create no accounting entries. GL entries are created by downstream transactions like Item Fulfillment and Invoice."
  },
  {
    q: "What is the formula for Available Inventory?",
    opts: ["On Hand + Committed", "On Hand − On Order", "On Hand − Committed", "On Hand + On Order − Committed"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Available inventory = On Hand minus Committed. Committed items are reserved by approved Sales Orders but not yet fulfilled, so they reduce the available quantity."
  },
  {
    q: "Which transaction in the sales flow reduces inventory and posts to COGS?",
    opts: ["Sales Order", "Invoice", "Item Fulfillment", "Customer Payment"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Item Fulfillment is the transaction that physically ships goods, which reduces inventory (credits Inventory account) and recognizes cost of goods sold (debits COGS). The Sales Order is non-posting, and the Invoice recognizes revenue."
  },
  {
    q: "What is the downstream flow after a Return Authorization (RMA)?",
    opts: ["Credit Memo → Item Receipt → Refund", "Item Receipt → Credit Memo → optional Refund", "Invoice → Item Receipt → Refund", "Credit Memo → Invoice → Payment"],
    correct: 1,
    domain: "Standard Process Flows",
    explain: "The return flow is: RMA → Item Receipt (receives goods back, increases inventory) → Credit Memo (reverses revenue, reduces AR) → optionally a Customer Refund (cash returned). This mirrors the reverse of the sales flow."
  },
  {
    q: "What type of item is manufactured from component items via an Assembly Build transaction?",
    opts: ["Kit/Package", "Group Item", "Assembly Item", "Matrix Item"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Assembly Items are manufactured finished goods created by combining component items through an Assembly Build transaction. They are tracked in inventory as completed products. Kits and Groups are sold as bundles but are not manufactured."
  },
  {
    q: "Which pricing feature allows you to set discounts based on the quantity purchased?",
    opts: ["Price Levels", "Pricing Groups", "Quantity Pricing", "Pricing Schedules"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Quantity Pricing provides tiered discounts based on how many units are purchased (e.g., buy 10+ get 10% off). Price Levels are fixed tiers like Retail/Wholesale. Pricing Schedules are time-based. Pricing Groups assign pricing to customer groups."
  },
  {
    q: "What must be true for billable time and expenses to appear on a customer's Invoice?",
    opts: ["They must be marked as billable and associated with a customer", "They must be approved by an Administrator", "They must be entered by an employee with the Billing role", "They must be linked to a Sales Order"],
    correct: 0,
    domain: "Standard Process Flows",
    explain: "Time entries and expense reports must be marked as billable and linked to a specific customer in order to flow into that customer's Invoice during the billing process."
  },
  {
    q: "In the standard purchasing flow, which transaction is non-posting (no GL impact)?",
    opts: ["Item Receipt", "Vendor Bill", "Purchase Order", "Bill Payment"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "The Purchase Order is a non-posting transaction — like the Sales Order, it represents a commitment but doesn't create accounting entries. GL impact starts with the Item Receipt (if Advanced Receiving is on) or the Vendor Bill."
  },
  {
    q: "Where can users set subsidiary-level support preferences for Case Management?",
    opts: ["Case Profile", "Setup → Company → General Preferences", "Setup → Support → Support Preferences", "Subsidiary record"],
    correct: 2,
    domain: "Standard Process Flows",
    explain: "Subsidiary-level support preferences are configured at Setup → Support → Support Preferences. Case Profiles control case behavior and routing rules, not subsidiary-level settings."
  },

  // ── DOMAIN 4: SUITEANALYTICS (Q29–Q33) ──
  {
    q: "Which saved search element allows you to conditionally format rows (e.g., highlight overdue invoices in red)?",
    opts: ["Criteria", "Available Filters", "Highlighting", "Audience"],
    correct: 2,
    domain: "SuiteAnalytics",
    explain: "Highlighting allows you to apply conditional formatting to search result rows based on field values. Criteria filters results, Available Filters let users refine results, and Audience controls access."
  },
  {
    q: "Which data management tool allows you to change a field value across many records simultaneously?",
    opts: ["Inline Editing", "Mass Updates", "CSV Import", "Duplicate Detection"],
    correct: 1,
    domain: "SuiteAnalytics",
    explain: "Mass Updates let you select records matching certain criteria and change a field value across all of them at once. Inline Editing changes individual records from list view."
  },
  {
    q: "Which saved search element controls who can see and use the search?",
    opts: ["Criteria", "Available Filters", "Highlighting", "Audience"],
    correct: 3,
    domain: "SuiteAnalytics",
    explain: "The Audience tab on a saved search defines which roles, departments, or specific users can access and run the search. Criteria filters data, Available Filters provide user-facing refinement, and Highlighting formats rows."
  },
  {
    q: "What does the 'Show List when only 1 result' preference do in saved searches?",
    opts: ["Shows a list view even if the search only returns one record, instead of auto-navigating to that record", "Limits search results to a maximum of one record", "Forces all searches to show as lists rather than cards", "Hides the search if it only finds one result"],
    correct: 0,
    domain: "SuiteAnalytics",
    explain: "By default, if a search returns exactly one result, NetSuite navigates directly to that record. Enabling 'Show List when only 1 result' keeps you on the list view instead, which some users prefer for confirmation before opening the record."
  },
  {
    q: "Which portlet displays summary data from reports or saved searches with date range comparisons and threshold highlighting?",
    opts: ["Report Snapshot", "Key Performance Indicators (KPI)", "Account Reconciliation Summary", "Reminders"],
    correct: 1,
    domain: "SuiteAnalytics",
    explain: "The KPI portlet shows summary metrics with date range comparisons and conditional threshold-based highlighting. Report Snapshots display report data but with fewer interactive comparison features. Reminders show pending action items."
  },

  // ── DOMAIN 5: MAINTENANCE, RESOURCES & DATA SECURITY (Q34–Q42) ──
  {
    q: "Why is it recommended to create custom roles rather than modify standard out-of-the-box roles?",
    opts: ["Custom roles are faster to create", "Standard roles cannot be modified", "Standard roles may be reset during upgrades", "Custom roles have more permission options"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "Standard roles can be overwritten during NetSuite upgrades, which would undo your modifications. Custom roles preserve your configurations across all updates."
  },
  {
    q: "Which portlet shows recent login history for the current user?",
    opts: ["KPI Meter", "Reminders", "My Login Audit", "Settings Portlet"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "The My Login Audit portlet displays recent login activity for the currently logged-in user, including date, time, and IP address information."
  },
  {
    q: "Which feature tracks changes to individual line items on transactions?",
    opts: ["System Notes", "Transaction Audit Trail", "Line-Level Audit Trail", "Login Audit Trail"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "Line-Level Audit Trail specifically tracks changes at the line level of transactions (e.g., quantity or price changes on Sales Order lines). System Notes track field-level changes more broadly."
  },
  {
    q: "In the standard Accounts Payable flow, which transaction creates the AP liability?",
    opts: ["Purchase Order", "Item Receipt", "Vendor Bill", "Bill Payment"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "The Vendor Bill is where the Accounts Payable liability is recognized (credit to AP). The Purchase Order is non-posting. Item Receipt (with Advanced Receiving) posts to inventory/accrual but not AP. Bill Payment reduces the AP balance."
  },
  {
    q: "Which NetSuite resource allows users to submit and vote on feature requests?",
    opts: ["SuiteAnswers", "User Groups", "SuiteIdeas (Enhancement Center)", "SuiteApp.com"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "SuiteIdeas (also known as the Enhancement Center) is where users can submit feature requests and vote on suggestions from other users. SuiteAnswers is the knowledge base, User Groups are community forums, and SuiteApp.com is the app marketplace."
  },
  {
    q: "What should you always verify before contacting NetSuite Support?",
    opts: ["Your browser version and operating system", "Your Account Number and which environment you're logged into (Production vs. Sandbox)", "The number of users on your account", "Your SuiteCloud license tier"],
    correct: 1,
    domain: "Maintenance & Data Security",
    explain: "Before contacting Support, always verify your Account Number and confirm whether you're in the Production or Sandbox environment. This helps Support locate your account and understand the context of your issue immediately."
  },
  {
    q: "What happens to System Notes history if a custom field's type is changed (e.g., from Text to List)?",
    opts: ["The history is preserved exactly as-is", "The history may be lost or become unreadable", "The history is archived in a separate log", "NetSuite prevents field type changes on fields with history"],
    correct: 1,
    domain: "Maintenance & Data Security",
    explain: "Changing a field's type can cause existing System Notes history for that field to become unreadable or effectively lost, because the old values were stored in the original format. This is an important consideration when modifying custom fields."
  },
  {
    q: "Which permission on a role specifically prevents users from performing bulk data extraction?",
    opts: ["View All Records", "Full Transaction Access", "Restrict CSV Import and Export", "Data Administration"],
    correct: 2,
    domain: "Maintenance & Data Security",
    explain: "The 'Restrict CSV Import and Export' permission can be set on roles to prevent users from performing bulk data operations via CSV. This is a key security control for protecting sensitive data from unauthorized extraction."
  },
  {
    q: "How does Two-Factor Authentication (2FA) enhance NetSuite security?",
    opts: ["It encrypts all data at rest", "It requires a second verification step beyond the password (e.g., authenticator app)", "It restricts access to a single browser", "It automatically logs users out after 5 minutes"],
    correct: 1,
    domain: "Maintenance & Data Security",
    explain: "Two-Factor Authentication adds a second layer of security by requiring users to provide an additional verification (like a code from an authenticator app or phone) beyond their password. It can be required for specific roles."
  }
];
