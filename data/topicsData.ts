// TypeScript interfaces for the study guide data structure
export interface Topic {
  id: string;
  title: string;
  content: string;
}

export interface Section {
  id: number;
  title: string;
  description: string;
  topics: Topic[];
}

// Complete study guide data with all 5 sections
export const studyGuideData = {
  sections: [
  // ==========================================
  // SECTION 1: SETUP & ADMINISTRATION
  // ==========================================
  {
    id: 1,
    title: "Setup & Administration",
    description: "Essential account configuration, enabling features, customizations, and administrative tools.",
    topics: [
      {
        id: "t1_1",
        title: "Enable Features — General Functionality",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Enable Features</strong> is found at <code>Setup → Company → Enable Features</code>. This is the master switch panel for turning NetSuite capabilities on or off.</li>
              <li>Features are organized across subtabs: Accounting, CRM, Web Presence, SuiteCloud, etc. — but the exam won't ask which subtab a feature lives on.</li>
              <li><strong>Enable Features vs. General Preferences</strong>: Enable Features turns functionality on/off. General Preferences controls default company-wide behavior (e.g., mandatory fields).</li>
              <li><strong>Enable Features vs. Set Preferences</strong>: Set Preferences (Home → Set Preferences) is user-level; Enable Features is company-level.</li>
              <li><strong>Accounting Preferences</strong> control settings like default accounts, posting behaviors, etc. — separate from Enable Features.</li>
              <li>Some features <strong>cannot be disabled</strong> once enabled (e.g., Multi-Location Inventory). Know which ones are irreversible.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>Memory trick — "EGAL":</strong> The 4 places to configure behavior: <strong>E</strong>nable Features → <strong>G</strong>eneral Preferences → <strong>A</strong>ccounting Preferences → user-Level (Set Preferences). They go from broadest (system) to narrowest (user).</div>
          </div>
          <div class="tip-box">
            <strong>Exam Tip:</strong> When a question says "Where do you turn on…", the answer is almost always Enable Features. When it says "Where do you set the default behavior…", think General Preferences or Accounting Preferences.
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Where does an Administrator enable the CRM feature in NetSuite?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Home → Set Preferences</li>
              <li class="quiz-opt" data-correct="true">B. Setup → Company → Enable Features</li>
              <li class="quiz-opt" data-correct="false">C. Setup → Company → General Preferences</li>
              <li class="quiz-opt" data-correct="false">D. Setup → Accounting → Accounting Preferences</li>
            </ul>
            <div class="quiz-explanation">Enable Features is the centralized location for turning features on/off at the company level. General Preferences and Accounting Preferences control default behaviors, not feature activation. Set Preferences is user-level only.</div>
          </div>
        `
      },
      {
        id: "t1_2",
        title: "Renaming Records & Transactions",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>NetSuite allows you to <strong>rename</strong> standard record types and transaction types to match your company's terminology (e.g., "Sales Order" → "Service Order").</li>
              <li>Found at <code>Setup → Company → Rename Records/Transactions</code>.</li>
              <li><strong>Benefits:</strong> Better user adoption, align with business terminology, clearer for end users.</li>
              <li><strong>Constraints:</strong> Only the <em>label</em> changes — the underlying record/transaction type and its SuiteScript/API name remain the same. SuiteAnswers and Help documentation still use original names. This can cause confusion for new admins.</li>
              <li>Renaming is company-wide and affects all users, all roles, all centers.</li>
            </ul>
          </div>
          <div class="warning-box">
            <strong>Watch Out:</strong> Renaming does NOT change the internal ID, scripting references, or SuiteAnswers documentation. If a user searches NetSuite Help for "Service Order" (your renamed label), they won't find results — they need to search "Sales Order."
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">After renaming "Sales Order" to "Service Order," which of the following is TRUE?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. SuiteScript references must also be updated</li>
              <li class="quiz-opt" data-correct="true">B. SuiteAnswers documentation will still refer to "Sales Order"</li>
              <li class="quiz-opt" data-correct="false">C. The change only affects Administrators</li>
              <li class="quiz-opt" data-correct="false">D. The internal ID of the record changes</li>
            </ul>
            <div class="quiz-explanation">Renaming only changes the UI label company-wide. Internal IDs, scripting references, and documentation all continue using the original name. This affects all users, not just administrators.</div>
          </div>
        `
      },
      {
        id: "t1_3",
        title: "Features Requiring NetSuite Support Intervention",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Certain features <strong>cannot be enabled by an Administrator</strong> alone and require contacting NetSuite Support.</li>
              <li><strong>Multi-Location Inventory (MLI)</strong> is the classic example — it requires Support to enable and <strong>cannot be reversed</strong> once turned on.</li>
              <li>Other examples include certain advanced features that fundamentally change data structures.</li>
              <li>Some features present a <strong>warning message</strong> before being enabled, indicating they are irreversible.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>Rule of thumb:</strong> If enabling a feature changes how data is <em>stored</em> at a structural level (like splitting inventory across locations), it likely requires Support and is irreversible.</div>
          </div>
        `
      },
      {
        id: "t1_4",
        title: "Classifications & Subsidiaries",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>NetSuite has four main classification structures: <strong>Departments, Classes, Locations, and Subsidiaries</strong>.</li>
              <li><strong>Departments</strong>: Organizational units (e.g., Marketing, Engineering). Can restrict record access by department via roles.</li>
              <li><strong>Classes</strong>: Flexible segmentation (e.g., product lines, business segments). Often used for profitability reporting.</li>
              <li><strong>Locations</strong>: Physical or logical locations (e.g., warehouses, stores, offices). Used for inventory tracking per location.</li>
              <li><strong>Subsidiaries</strong>: Legal entities. Required for OneWorld accounts. Enable consolidated financial reports by legal entity. Support intercompany transactions.</li>
              <li>D/C/L are available in all editions. Subsidiaries require <strong>OneWorld</strong>.</li>
              <li>Intercompany transactions can be offset by posting journals to an <strong>elimination subsidiary</strong>.</li>
              <li>All four can be used for reporting segmentation and role-based access restrictions.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"DCLS" — Departments, Classes, Locations, Subsidiaries.</strong> Think of them from most flexible to most structural. Only Subsidiaries represent a <em>legal entity</em> — if the question mentions "consolidated financials" or "legal entity," the answer is Subsidiaries.</div>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which structure allows tracking of consolidated financial reports by legal entity?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Classes</li>
              <li class="quiz-opt" data-correct="false">B. Locations</li>
              <li class="quiz-opt" data-correct="true">C. Subsidiaries</li>
              <li class="quiz-opt" data-correct="false">D. Departments</li>
            </ul>
            <div class="quiz-explanation">Subsidiaries represent legal entities in NetSuite OneWorld. They are the only classification that supports consolidated financial reporting by legal entity. Departments, Classes, and Locations are segmentation tools but don't represent legal structures.</div>
          </div>
        `
      },
      {
        id: "t1_5",
        title: "SuiteBuilder Elements: Custom Forms, Fields, Records, Subtabs",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Custom Forms</strong>: Modified versions of standard forms. You can show/hide fields, rearrange layout, set field defaults. Found under <code>Customization → Forms</code>. Each record can have multiple custom forms.</li>
              <li><strong>Custom Fields</strong>: User-created fields added to standard or custom records. Types include: Free-Form Text, List/Record, Date, Check Box, etc. Can be transaction body or transaction line fields.</li>
              <li><strong>Custom Record Types</strong>: Entirely new record types you create to store data not covered by standard records. Found under <code>Customization → Lists, Records, & Fields → Record Types</code>.</li>
              <li><strong>Subtabs</strong>: Tabs within a record that group related information. You can create custom subtabs on standard records to organize custom fields.</li>
              <li><strong>Custom Records</strong> are enabled under Enable Features, NOT under Customization.</li>
            </ul>
          </div>
          <div class="tip-box">
            <strong>Exam Tip:</strong> "Where does an Administrator turn on Custom Records?" — The answer is <strong>Enable Features</strong>, not Setup → Customization. Customization is where you <em>create</em> them, but the feature itself must first be enabled.
          </div>
        `
      },
      {
        id: "t1_6",
        title: "High-Level Tools: Bundles, SuiteApps, SuiteFlow",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Installed Bundles</strong>: Pre-packaged configurations, scripts, and customizations. Installed via <code>Customization → SuiteBundler → Search & Install Bundles</code>.</li>
              <li><strong>SuiteApps</strong>: Applications from SuiteApp.com marketplace. Include third-party and NetSuite-built solutions that extend functionality.</li>
              <li><strong>SuiteFlow (Workflow Manager)</strong>: A visual, point-and-click tool for automating business processes without scripting. Create states, transitions, and actions based on conditions.</li>
              <li>The exam tests <em>high-level knowledge</em> — know what each tool does, not specific subtabs or configuration details.</li>
            </ul>
          </div>
        `
      }
    ]
  },

  // ==========================================
  // SECTION 2: NETSUITE USER INTERFACE
  // ==========================================
  {
    id: 2,
    title: "NetSuite User Interface",
    description: "Navigation, performance optimization, user preferences, shortcuts, portlets, and daily activity tools.",
    topics: [
      {
        id: "t2_1",
        title: "Navigation Options in NetSuite",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Centers</strong>: Top-level navigation tabs determined by the user's role. Different roles show different centers (e.g., an Accountant role shows Transactions, Reports, Lists).</li>
              <li><strong>Global Search</strong>: The search bar at the top of every page. Searches across records, transactions, and help. Prefix with record type for faster results (e.g., "cust: Acme").</li>
              <li><strong>Quick Search</strong>: A more targeted search within a specific list or record type.</li>
              <li><strong>Recent Records</strong>: Shows recently viewed or edited records for quick access.</li>
              <li><strong>Shortcuts</strong>: Bookmarks for frequently used pages, records, or URLs. Available via the shortcuts menu icon and/or the Shortcuts dashboard portlet.</li>
              <li><strong>Portlets</strong>: Customizable widgets on the dashboard — KPIs, reminders, saved searches, custom content, etc.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"CRGSPS"</strong> — <strong>C</strong>enters, <strong>R</strong>ecent Records, <strong>G</strong>lobal Search, <strong>S</strong>hortcuts, <strong>P</strong>ortlets, Quick <strong>S</strong>earch. Six ways to navigate in NetSuite.</div>
          </div>
        `
      },
      {
        id: "t2_2",
        title: "Browser & System Performance Optimization",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Use the smallest portlet level refresh</strong> — minimizing dashboard portlet data reduces load time.</li>
              <li>Avoid excessive dashboard portlets, reports, and saved searches on the dashboard.</li>
              <li>Minimize the number of open browser tabs running NetSuite.</li>
              <li>Adjust browser settings (clear cache, disable unnecessary extensions).</li>
              <li><strong>Trace Routes</strong> can diagnose network-related performance issues.</li>
              <li>SuiteAnswers topics to review: Identifying Performance Issues, Improving Server Performance, Improving Client Performance.</li>
            </ul>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which action can be taken to optimize NetSuite's performance in a browser?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Resize dashboard portlets</li>
              <li class="quiz-opt" data-correct="false">B. Use multiple browser tabs</li>
              <li class="quiz-opt" data-correct="true">C. Use the smallest portlet level refresh</li>
              <li class="quiz-opt" data-correct="false">D. Maximize dashboard reports and searches</li>
            </ul>
            <div class="quiz-explanation">Using the smallest portlet level refresh reduces the data loaded on the dashboard, improving performance. Multiple browser tabs and maximizing reports would hurt performance, not help it.</div>
          </div>
        `
      },
      {
        id: "t2_3",
        title: "User-Level Preferences",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Accessed via <code>Home → Set Preferences</code>.</li>
              <li><strong>Key settings users can control:</strong> Default role, default forms, appearance/theme, CSV export settings, time zone, date format.</li>
              <li><strong>Show Internal IDs</strong>: Shows the internal ID next to records — useful for scripting/debugging.</li>
              <li><strong>Popup vs. Dropdown Lists</strong>: Users can choose how list fields behave.</li>
              <li>Activity preferences: Calendar, event, and task notification settings.</li>
              <li>These are <em>user-level</em> and do NOT affect other users in the system.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t2_4",
        title: "Shortcuts Portlet vs. Shortcuts Menu Icon",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Shortcuts Menu Icon</strong>: A dropdown from the navigation bar. Shows a simple list of shortcut links. Limited display options.</li>
              <li><strong>Shortcuts Dashboard Portlet</strong>: A portlet on your dashboard. Shows shortcuts with more detail and customization options. Can include icons and grouping.</li>
              <li>Both serve the same purpose (quick navigation) but the portlet offers <strong>more visual flexibility</strong> on the dashboard.</li>
            </ul>
          </div>
          <div class="tip-box">
            <strong>Exam Tip:</strong> The exam specifically asks about the <em>differences</em> between these two. The key distinction is location (nav bar vs. dashboard) and the portlet's richer display options.
          </div>
        `
      },
      {
        id: "t2_5",
        title: "Daily Activities, Communication & Documents",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Events</strong>: Calendar events with attendees, reminders, and recurrence.</li>
              <li><strong>Tasks</strong>: Assignable to-do items with status tracking (Not Started, In Progress, Complete).</li>
              <li><strong>Email</strong>: Send email directly from NetSuite records. Captured in the Messages subtab. Requires proper email setup under preferences.</li>
              <li><strong>File Cabinet</strong>: NetSuite's built-in document management system. Upload, organize, and share files. Organized in folders with access controls.</li>
              <li><strong>Mail Merge</strong>: Requires agreeing to Mass Messaging Application Terms of Service.</li>
            </ul>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which feature requires a user to agree to the Mass Messaging Application Terms of Service?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="true">A. Mail Merge</li>
              <li class="quiz-opt" data-correct="false">B. Capture Email Replies</li>
              <li class="quiz-opt" data-correct="false">C. Subscription Categories</li>
              <li class="quiz-opt" data-correct="false">D. CRM</li>
            </ul>
            <div class="quiz-explanation">Mail Merge is a mass messaging feature that sends personalized emails/letters in bulk, which is why it requires agreement to the Mass Messaging Application Terms of Service before use.</div>
          </div>
        `
      }
    ]
  },

  // ==========================================
  // SECTION 3: STANDARD NS PROCESS FLOWS
  // ==========================================
  {
    id: 3,
    title: "Standard NS Process Flows",
    description: "This is the largest exam domain — covering CRM, sales cycle, order management, fulfillment, inventory, purchasing, and accounts payable.",
    topics: [
      {
        id: "t3_1",
        title: "Sales Force Automation (SFA) Setup",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Lead Routing</strong>: Leads can be assigned to Sales Reps automatically via Sales Territories.</li>
              <li><strong>Online Customer Forms</strong>: Web-based forms that capture leads directly into NetSuite.</li>
              <li><strong>Customer Types</strong>: Individual vs. Company — affects which fields appear and how contacts are managed.</li>
              <li><strong>Contact Records</strong>: Linked to customer/company records. Track people within an organization.</li>
              <li><strong>CRM Lists</strong>: Configurable lists for Lead Source, Sales Territory, Win/Loss Reason, etc.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_2",
        title: "Sales Cycle Progression: Lead → Prospect → Customer",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>The sales cycle follows: <strong>Lead → Prospect → Customer</strong>.</li>
              <li><strong>Lead Conversion</strong>: A Lead becomes a Prospect when an Opportunity is created. A Prospect becomes a Customer when a Sales Order or Cash Sale is created.</li>
              <li><strong>Sales Preferences</strong> control automatic conversion behavior (e.g., auto-convert on first order).</li>
              <li>Understanding how records transform through the cycle is critical for the exam.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"L-P-C"</strong> = Lead → Prospect → Customer. <strong>O</strong>pportunity converts L to P. <strong>S</strong>ales Order converts P to C. Think: <strong>"Opportunity Promotes, Sales Converts."</strong></div>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">At what point does a Lead automatically become a Prospect in NetSuite?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. When a Quote is sent</li>
              <li class="quiz-opt" data-correct="true">B. When an Opportunity is created</li>
              <li class="quiz-opt" data-correct="false">C. When a Sales Order is created</li>
              <li class="quiz-opt" data-correct="false">D. When a Contact is added</li>
            </ul>
            <div class="quiz-explanation">In NetSuite's standard sales cycle, creating an Opportunity for a Lead automatically converts them to a Prospect. Creating a Sales Order converts the Prospect to a Customer.</div>
          </div>
        `
      },
      {
        id: "t3_3",
        title: "Quotas & Forecast Reporting",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Quotas</strong> are assigned to Sales Reps, typically per period. Set on the Employee record or via Quota Assignment.</li>
              <li><strong>Forecasts</strong> can be calculated as weighted (based on opportunity probability) or unweighted.</li>
              <li>Key Sales Preferences: Calculate Forecasts as Weighted, Advanced Forecasting, Use Opportunities in Forecast.</li>
              <li>Forecasts can be edited/overwritten by authorized users in the Forecast Editor.</li>
              <li><strong>Estimate/Quote</strong> record fields feed into forecast calculations.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_4",
        title: "Case Management Setup & Use",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Cases</strong> track customer support issues. Created manually or via Online Case Forms.</li>
              <li><strong>Case Routing</strong>: Automatic assignment of cases based on rules (e.g., product, territory, issue type).</li>
              <li><strong>Case Profiles</strong>: Templates that control case behavior, auto-responses, and escalation rules.</li>
              <li><strong>Support Preferences</strong>: Subsidiary-level settings at <code>Setup → Support → Support Preferences</code>.</li>
              <li><strong>Customer Center</strong>: Portal where customers can submit and track their own cases.</li>
              <li>Roles that manage cases: Administrator, Support Administrator, Support Manager.</li>
            </ul>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Where can users set subsidiary-level support preferences?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Case Profile</li>
              <li class="quiz-opt" data-correct="false">C. Setup → Company → General Preferences</li>
              <li class="quiz-opt" data-correct="true">C. Setup → Support → Support Preferences</li>
              <li class="quiz-opt" data-correct="false">D. Subsidiary record</li>
            </ul>
            <div class="quiz-explanation">Subsidiary-level support preferences are configured at Setup → Support → Support Preferences. Case Profiles control case behavior and rules, not subsidiary-level settings.</div>
          </div>
        `
      },
      {
        id: "t3_5",
        title: "Marketing Campaigns & SuitePromotions",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Campaign Components</strong>: Groups (target audience), Promotions, Promo Codes, Email/Marketing Templates, and Campaign Metrics.</li>
              <li><strong>Campaign Metrics</strong>: Track ROI, responses, conversions per campaign event.</li>
              <li><strong>Lead Nurturing</strong>: Automated drip campaigns based on triggers and schedules.</li>
              <li><strong>SuitePromotions</strong>: Tools for creating discount codes and promotional pricing.</li>
              <li><strong>Global Subscription Status</strong>: "Unsubscribed to Marketing by Default" sets new customers to Soft Opt-Out.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_6",
        title: "Sales Orders, GL Impact & Downstream Transactions",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Sales Order</strong> is a commitment to sell. By itself, it has <strong>no GL impact</strong> — it's a non-posting transaction.</li>
              <li>Downstream transactions created from a Sales Order: <strong>Item Fulfillment → Invoice → Payment</strong> (or Cash Sale directly).</li>
              <li><strong>Item Fulfillment</strong>: Reduces inventory (posts to COGS and Inventory accounts).</li>
              <li><strong>Invoice</strong>: Recognizes revenue (posts to Accounts Receivable and Revenue).</li>
              <li><strong>Cash Sale</strong>: Combines fulfillment + invoice + payment in one transaction.</li>
              <li>Form settings on the Sales Order control which downstream transactions are available.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"SO → FIP":</strong> Sales Order triggers Fulfillment → Invoice → Payment. Remember: the Sales Order itself does NOT post to the GL.</div>
          </div>
        `
      },
      {
        id: "t3_7",
        title: "Order Fulfillment Controls",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Basic Fulfillment</strong>: Mark items as fulfilled directly from the Sales Order.</li>
              <li><strong>Pick/Pack/Ship</strong>: Multi-step fulfillment process. Pick items → Pack into shipments → Ship with carrier.</li>
              <li><strong>Advanced Shipping</strong>: Supports multiple shipping methods, rate calculations, and carrier integration.</li>
              <li><strong>Drop Ship</strong>: Items shipped directly from vendor to customer. Creates a Purchase Order linked to the Sales Order.</li>
              <li><strong>Special Order</strong>: Items ordered from vendor for customer but shipped to YOU first, then to customer.</li>
              <li><strong>Invoice in Advance of Fulfillment</strong>: Accounting preference allowing invoicing before items are shipped.</li>
            </ul>
          </div>
          <div class="tip-box">
            <strong>Exam Tip:</strong> Know the difference between Drop Ship (vendor ships directly to customer) and Special Order (vendor ships to you, then you ship to customer). This is a classic exam question.
          </div>
        `
      },
      {
        id: "t3_8",
        title: "Payment Methods",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Supported payment methods: <strong>Credit Cards, EFT (Electronic Funds Transfer), ACH, PayPal, Customer Payments, Checks</strong>.</li>
              <li>Credit Card Processing requires a <strong>Merchant Account</strong> setup.</li>
              <li><strong>Electronic Payments</strong> feature must be enabled for EFT/ACH processing.</li>
              <li>Customer Payments are applied against open Invoices to close Accounts Receivable balances.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_9",
        title: "Return Authorization, Refunds & GL Impact",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Return Authorization (RMA)</strong>: Authorizes a customer return. Non-posting (no GL impact by itself).</li>
              <li>Downstream: RMA → <strong>Item Receipt</strong> (receives goods back, increases inventory) → <strong>Credit Memo</strong> (reverses revenue, reduces AR).</li>
              <li><strong>Credit Memo</strong>: Can be applied to an existing invoice or converted to a Customer Refund (cash back).</li>
              <li><strong>Refunding a Cash Sale</strong>: Different process — uses a Cash Refund transaction.</li>
              <li>Customer Return Management Workflow controls the flow and approval steps.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"RMA → RIC":</strong> Return Authorization → Receive Item → Credit Memo. The reverse of the sales flow (SO → FIP).</div>
          </div>
        `
      },
      {
        id: "t3_10",
        title: "Item Types & Best Uses",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Inventory Item</strong>: Physically stocked, tracked with quantities and costing. Posts to Inventory and COGS accounts.</li>
              <li><strong>Non-Inventory Item</strong>: Sold or purchased but NOT tracked in inventory (e.g., items shipped from vendor). Has Sale and Purchase variants.</li>
              <li><strong>Service Item</strong>: Represents labor or services. Not physically stocked. Used for time-based billing.</li>
              <li><strong>Group Item</strong>: A collection of items sold together. Each component line shows individually on the transaction (individual pricing visible).</li>
              <li><strong>Kit/Package</strong>: A collection of items sold together as ONE line item (single price, components hidden from customer).</li>
              <li><strong>Assembly Item</strong>: Manufactured item made from component items via an Assembly Build. Tracked in inventory as a finished good.</li>
              <li><strong>Matrix Item</strong>: A parent item with variants (e.g., size, color). The parent isn't sold — the sub-items (child items) are.</li>
              <li><strong>Serialized/Lot-Numbered</strong>: Items tracked by individual serial numbers or production lot numbers for traceability.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>Group vs Kit:</strong> Think "Group = Granular" (shows each component) vs. "Kit = Keeps it together" (shows as one line). This distinction appears frequently on the exam.</div>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which item type displays component items as individual lines on a Sales Order?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Kit/Package</li>
              <li class="quiz-opt" data-correct="true">B. Group Item</li>
              <li class="quiz-opt" data-correct="false">C. Assembly Item</li>
              <li class="quiz-opt" data-correct="false">D. Matrix Item</li>
            </ul>
            <div class="quiz-explanation">Group Items show each component as individual lines on the transaction with separate pricing. Kit/Package items appear as a single line. Assembly Items are manufactured finished goods. Matrix Items are parent-child item structures based on attributes.</div>
          </div>
        `
      },
      {
        id: "t3_11",
        title: "Inventory Transactions & Advanced Inventory",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Transactions that <strong>increase</strong> inventory: Item Receipt, Inventory Adjustment (positive), Assembly Build (finished good).</li>
              <li>Transactions that <strong>decrease</strong> inventory: Item Fulfillment, Inventory Adjustment (negative), Assembly Unbuild.</li>
              <li><strong>Committed quantity</strong>: Items on approved Sales Orders not yet fulfilled (reserved but still in stock).</li>
              <li><strong>Available = On Hand − Committed</strong>.</li>
              <li><strong>Advanced Inventory features</strong>: Multi-Location Inventory (MLI), Bins (locations within locations), Units of Measure, Assemblies, Kits/Packages.</li>
              <li>MLI is irreversible once enabled and may require NetSuite Support.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_12",
        title: "Sales Pricing Strategies",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Base Price</strong>: The default selling price set on the Item record.</li>
              <li><strong>Price Levels</strong>: Multiple price tiers (e.g., Retail, Wholesale, Employee). Assigned to items and can be assigned to customers.</li>
              <li><strong>Quantity Pricing</strong>: Discounts based on quantity purchased (e.g., buy 10+ get 10% off).</li>
              <li><strong>Pricing Groups</strong>: Groups of customers who receive the same pricing.</li>
              <li><strong>Pricing Schedules</strong>: Time-based pricing rules — e.g., promotional pricing valid for specific date ranges.</li>
              <li><strong>Multi-Currency Pricing</strong>: Setting prices in different currencies for international customers.</li>
              <li><strong>Customer-Specific Pricing</strong>: Custom pricing set on individual customer records.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_13",
        title: "Billable Items, Time & Expenses to Invoice",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Employees enter <strong>Time</strong> (time tracking) and <strong>Expense Reports</strong> against customers/projects.</li>
              <li>When marked as <strong>billable</strong>, these entries flow to an Invoice during the billing process.</li>
              <li>Items, time, and expenses must be associated with a customer to appear on their invoice.</li>
              <li>The billing process pulls all approved billable entries into a single invoice.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_14",
        title: "Purchasing: Approval & Routing",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Purchase Requests</strong>: Internal requests to purchase items. Require approval before becoming Purchase Orders.</li>
              <li>Standard approval process is based on: requester's supervisor, spending limits, and approval routing rules.</li>
              <li>Controls determine: when approval is required, who can approve, and spending thresholds.</li>
              <li>Approved Purchase Requests can be converted into <strong>Purchase Orders</strong>.</li>
              <li><em>NOT on exam:</em> Purchase Requisitions and Custom Approval Routing.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t3_15",
        title: "Accounts Payable Transactions & GL Impact",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Standard AP flow: <strong>Purchase Order → Item Receipt → Vendor Bill → Bill Payment</strong>.</li>
              <li><strong>Purchase Order</strong>: Non-posting (no GL impact).</li>
              <li><strong>Item Receipt</strong>: With Advanced Receiving enabled, this posts to inventory and an accrual account (not AP yet).</li>
              <li><strong>Vendor Bill</strong>: Posts to Accounts Payable (credit) and Expense/Inventory (debit). This is where the AP liability is recognized.</li>
              <li><strong>Bill Payment</strong>: Reduces AP and Cash.</li>
              <li><strong>Advanced Receiving</strong> changes the workflow by adding the Item Receipt step with its own GL posting.</li>
              <li>If price changes on Vendor Bill after items received, a <strong>variance</strong> may post.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"PO → RIBP":</strong> Purchase Order → Receive Item → Bill → Payment. Mirror of the sales cycle (SO → FIP). PO and SO are both non-posting!</div>
          </div>
        `
      }
    ]
  },

  // ==========================================
  // SECTION 4: SUITEANALYTICS
  // ==========================================
  {
    id: 4,
    title: "SuiteAnalytics",
    description: "Finding records, saved searches, portlet types, and data management tools.",
    topics: [
      {
        id: "t4_1",
        title: "Options for Finding Records",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Global Search</strong>: Search bar at the top. Searches across all record types. Use prefixes to narrow (e.g., "cust:" for customers, "tran:" for transactions).</li>
              <li><strong>Lists</strong>: Navigate via menu to see full lists of records (e.g., Lists → Relationships → Customers).</li>
              <li><strong>Reports</strong>: Pre-built and custom reports for aggregated data analysis.</li>
              <li><strong>Saved Searches</strong>: The most powerful record-finding tool — customizable queries with criteria, results, filters, and formulas.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t4_2",
        title: "Building Saved Searches",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Criteria</strong>: Filters to narrow results (Standard and Summary criteria). Think of this as the WHERE clause.</li>
              <li><strong>Results</strong>: Columns to display. Think of this as the SELECT clause.</li>
              <li><strong>Available Filters</strong>: Filters shown on the search results page for end-users to further refine results dynamically.</li>
              <li><strong>Audience</strong>: Controls who can see and use the saved search (specific roles, departments, etc.).</li>
              <li><strong>Highlighting</strong>: Conditional formatting — highlight rows based on criteria (e.g., overdue invoices in red).</li>
              <li><strong>Formulas</strong>: Basic formulas for calculated fields in results (uses SQL-like syntax).</li>
              <li><strong>Key Set Preferences that affect searches</strong>: "Show Inactive" (includes inactive records), "Show List when only 1 result" (bypasses auto-navigation to single result), "Main Line for Transactions" (controls transaction line display).</li>
            </ul>
          </div>
          <div class="tip-box">
            <strong>Exam Tip:</strong> The exam will NOT test on summary types, SQL, joins, or HTML in searches. Focus on the basic elements listed above.
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which element of a saved search controls conditional row highlighting based on specific criteria?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Available Filters</li>
              <li class="quiz-opt" data-correct="false">B. Audience</li>
              <li class="quiz-opt" data-correct="true">C. Highlighting</li>
              <li class="quiz-opt" data-correct="false">D. Formulas</li>
            </ul>
            <div class="quiz-explanation">Highlighting is the saved search element that applies conditional formatting to rows — for example, coloring overdue invoices red. Available Filters let users refine results. Audience controls who sees the search. Formulas add calculated columns.</div>
          </div>
        `
      },
      {
        id: "t4_3",
        title: "Portlet Types",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>KPI (Key Performance Indicators)</strong>: Displays summary metrics with comparisons and thresholds. Supports date range comparisons and conditional highlighting.</li>
              <li><strong>KPI Meter</strong>: Visual gauge/speedometer-style display of a single KPI.</li>
              <li><strong>KPI Scorecard</strong>: Shows multiple KPIs in a card layout for quick status overview.</li>
              <li><strong>Report Snapshot</strong>: Displays summary data from reports or saved searches for selected date ranges.</li>
              <li><strong>Reminders</strong>: Shows alerts for items needing attention (e.g., pending approvals, overdue tasks).</li>
              <li><strong>Shortcuts</strong>: Quick links to frequently used pages.</li>
              <li><strong>Custom Portlets</strong>: HTML, list, or form-based custom content.</li>
              <li><strong>My Login Audit</strong>: Shows recent login history for the current user.</li>
              <li><strong>Settings Portlet</strong>: Quick access to setup/configuration links.</li>
            </ul>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">Which portlet displays summary data from reports or saved searches for selected date ranges, with options to compare ranges and highlight thresholds?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Report Snapshot</li>
              <li class="quiz-opt" data-correct="true">B. Key Performance Indicators</li>
              <li class="quiz-opt" data-correct="false">C. Account Reconciliation Summary</li>
              <li class="quiz-opt" data-correct="false">D. SMT Links</li>
            </ul>
            <div class="quiz-explanation">The KPI portlet displays summary data with date range comparisons and threshold-based highlighting. Report Snapshots show report data but with fewer interactive comparison features.</div>
          </div>
        `
      },
      {
        id: "t4_4",
        title: "Data Management Tools",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Inline Editing</strong>: Edit field values directly from list views without opening the record. Must be enabled. Not available on all fields.</li>
              <li><strong>Mass Updates</strong>: Change a field value across many records at once. Select criteria → choose field → set new value. Runs as a background process.</li>
              <li><strong>CSV Import</strong>: Import data from CSV files into NetSuite records. Uses the Import Assistant (<code>Setup → Import/Export → Import CSV Records</code>). Supports creating new records and updating existing ones.</li>
              <li><strong>CSV Export</strong>: Export list views and search results to CSV format.</li>
              <li><strong>Duplicate Detection</strong>: Identifies potential duplicate records based on configurable matching criteria (name, email, phone, etc.).</li>
              <li><strong>Delete All Data</strong>: Removes all data from the account — used in sandbox/test environments. Very destructive — requires Admin role.</li>
            </ul>
          </div>
          <div class="warning-box">
            <strong>Critical:</strong> Delete All Data is irreversible and available only to Administrators. It removes ALL transaction and record data. This is intended for sandbox cleanup, never for production use.
          </div>
        `
      }
    ]
  },

  // ==========================================
  // SECTION 5: MAINTENANCE & DATA SECURITY
  // ==========================================
  {
    id: 5,
    title: "Maintenance, Resources & Data Security",
    description: "Support best practices, NetSuite resources, roles and permissions, authentication, and audit tracking.",
    topics: [
      {
        id: "t5_1",
        title: "Working with NetSuite Support",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>Always verify your <strong>Account Number and Environment</strong> (Production vs. Sandbox) before contacting Support.</li>
              <li>Know the <strong>Support Phone Menu Routing</strong> options — different queues for billing, technical, etc.</li>
              <li>Provide clear reproduction steps, screenshots, and the URL of the affected page when filing a case.</li>
              <li>Check <strong>status.netsuite.com</strong> for system-wide outages before calling Support.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t5_2",
        title: "NetSuite Resources & Help",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>SuiteAnswers</strong>: Primary knowledge base. Search articles, guides, videos, best practices. Accessed from within NetSuite.</li>
              <li><strong>Learning Center / MyLearn</strong>: Training courses and learning paths.</li>
              <li><strong>Help User Guides</strong>: Contextual help available from within the application.</li>
              <li><strong>User Groups</strong>: Community forums for NetSuite users to discuss and share.</li>
              <li><strong>status.netsuite.com</strong>: Real-time system status and maintenance windows.</li>
              <li><strong>SuiteApp.com</strong>: Marketplace for third-party and NetSuite-built applications.</li>
              <li><strong>SuiteIdeas (Enhancement Center)</strong>: Submit and vote on feature requests.</li>
            </ul>
          </div>
          <div class="mnemonic-box">
            <span class="icon">💡</span>
            <div class="text"><strong>"SHLUSS"</strong> — <strong>S</strong>uiteAnswers, <strong>H</strong>elp Guides, <strong>L</strong>earning Center, <strong>U</strong>ser Groups, <strong>S</strong>uiteApp.com, <strong>S</strong>uiteIdeas. Six key resources to know for the exam.</div>
          </div>
        `
      },
      {
        id: "t5_3",
        title: "Release Cycles & New Features",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li>NetSuite releases <strong>two major releases per year</strong> (typically named by year and release number, e.g., 2024.1, 2024.2).</li>
              <li><strong>Release Preview</strong> environments are available before production rollout for testing.</li>
              <li><strong>Release Notes</strong> document all new features, changes, and deprecations.</li>
              <li>SuiteAnswers topics: Release Preview Notifications, More New Release Resources, Preparing for Testing.</li>
              <li>Certification maintenance requires passing an annual <strong>New Release Quiz</strong>.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t5_4",
        title: "Custom Roles & Data Access Control",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Roles</strong> define what a user can see and do. Each user can be assigned multiple roles and switch between them.</li>
              <li><strong>Permissions</strong> on roles control access to: Transactions, Reports, Lists, Setup pages, and Custom Records. Levels: None, View, Create, Edit, Full.</li>
              <li><strong>Custom Roles</strong> are preferred over modifying standard roles — standard roles can be reset during upgrades.</li>
              <li>Restrict access by <strong>Department, Class, Location, or Subsidiary</strong> on the role definition.</li>
              <li><strong>Restrict CSV Import/Export</strong>: A specific permission that can be set on roles to prevent bulk data extraction.</li>
              <li><strong>Testing custom roles:</strong> Log in as a user with only that role assigned to verify correct access.</li>
            </ul>
          </div>
          <div class="quiz-block">
            <h4>Practice Question</h4>
            <div class="quiz-q">What is the best practice for creating roles with specific permissions?</div>
            <ul class="quiz-options">
              <li class="quiz-opt" data-correct="false">A. Modify standard out-of-the-box roles</li>
              <li class="quiz-opt" data-correct="true">B. Create custom roles rather than modifying standard roles</li>
              <li class="quiz-opt" data-correct="false">C. Give all users the Administrator role</li>
              <li class="quiz-opt" data-correct="false">D. Use a single role for all users and restrict with preferences</li>
            </ul>
            <div class="quiz-explanation">Creating custom roles is the best practice because standard roles can be reset during system upgrades. Custom roles preserve your specific permission configurations across updates.</div>
          </div>
        `
      },
      {
        id: "t5_5",
        title: "User Authentication & Security Questions",
        content: `
          <div class="concept-block">
            <h4>Key Concepts</h4>
            <ul>
              <li><strong>Two-Factor Authentication (2FA)</strong>: Adds a second verification step (e.g., phone, authenticator app). Can be required for specific roles.</li>
              <li><strong>Security Questions</strong>: Set during first login or via preferences. Used for password recovery and identity verification.</li>
              <li>If you forget security question answers, you must contact your Administrator to reset them.</li>
              <li><strong>Password Policies</strong>: Admins can enforce minimum length, complexity, expiration, and lockout rules.</li>
              <li><strong>IP Address Restrictions</strong>: Limit role access to specific IP addresses for added security.</li>
            </ul>
          </div>
        `
      },
      {
        id: "t5_6",
        title: "Settings Portlet & Tracking Record Changes",
        content: `
          <div class="concept-block">
            <h4>Key Concepts — Settings Portlet</h4>
            <ul>
              <li>The Settings Portlet provides quick links to commonly used setup pages.</li>
              <li>Visible on the dashboard. Content varies by role.</li>
              <li>Provides shortcuts to: Set Preferences, Enable Features, General Preferences, Accounting Preferences, etc.</li>
            </ul>
          </div>
          <div class="concept-block">
            <h4>Tracking Changes to Records</h4>
            <ul>
              <li><strong>System Notes</strong>: Automatically logged on every record. Shows who changed what, when, and from what value to what new value. The primary audit mechanism.</li>
              <li><strong>Transaction Audit Trail</strong>: Tracks changes to transactions specifically.</li>
              <li><strong>Line-Level Audit Trail</strong>: Tracks changes to individual lines on transactions (e.g., item quantity changes on a Sales Order).</li>
              <li><strong>Login Audit Trail</strong>: Tracks who logged in, when, from what IP.</li>
              <li><strong>GL Impact</strong>: If a change affects the General Ledger, the GL posting history reflects the change.</li>
              <li>If a <strong>field type is changed</strong>, the history for that field in System Notes may be lost or become unreadable.</li>
            </ul>
          </div>
        `
      }
    ]
  }
]
};
