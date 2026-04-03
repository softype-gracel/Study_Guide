# Setup & Administration

**Section ID:** 1
**Section Title:** Setup & Administration

---

## Topic: Enable Features

**Description:**
Learn about NetSuite's Enable Features configuration and how to activate/deactivate functionality modules.

### Key Points

- **Enable Features** is located at **Setup → Company → Enable Features**
- This is the master switch for turning major NetSuite functionality on or off (e.g., CRM, SuiteCommerce, Advanced Inventory)
- Some features require NetSuite Support to enable and **cannot be reversed** once turned on (e.g., Multi-Location Inventory)
- Enabling a feature may unlock additional preferences and configuration options elsewhere in the system

### Important Notes

> **Warning:** Multi-Location Inventory (MLI) is the classic example of a feature that requires NetSuite Support intervention to enable and cannot be reversed once turned on, because it fundamentally changes how inventory data is stored.

### Memory Trick

**Memory trick — "EGAL":** The 4 places to configure behavior: **E**nable Features → **G**eneral Preferences → **A**ccounting Preferences → user-**L**evel (Set Preferences). They go from broadest (system) to narrowest (user).

### Exam Tip

**Exam Tip:** When a question says "Where do you turn on...", the answer is almost always Enable Features. When it says "Where do you set the default behavior...", think General Preferences or Accounting Preferences.

### Practice Question

**Question:** Where does an Administrator enable the CRM feature in NetSuite?

**Options:**
A) Home → Set Preferences
B) Setup → Company → Enable Features
C) Setup → Company → General Preferences
D) Setup → Accounting → Accounting Preferences

**Correct Answer:** B

**Explanation:**
Enable Features is the centralized location for turning features on/off at the company level. General Preferences and Accounting Preferences control default behaviors, not feature activation. Set Preferences is user-level only.

---

## Topic: Record Renaming

**Description:**
Understanding how renaming record types affects the system and user interface.

### Key Points

- Record types (e.g., "Sales Order") can be renamed to match your business terminology (e.g., "Service Order")
- **UI Label Changes:** The new name appears company-wide across the interface for all users
- **Internal References Unchanged:** SuiteScript references, internal IDs, and SuiteAnswers documentation continue using the original name
- This is purely a cosmetic change that does not affect system functionality

### Example

If you rename "Sales Order" to "Service Order":
- Users see "Service Order" in the UI
- SuiteScript still uses `record.Type.SALES_ORDER`
- Help documentation still refers to "Sales Order"

### Practice Question

**Question:** After renaming "Sales Order" to "Service Order," which of the following is TRUE?

**Options:**
A) SuiteScript references must also be updated
B) SuiteAnswers documentation will still refer to "Sales Order"
C) The change only affects Administrators
D) The internal ID of the record changes

**Correct Answer:** B

**Explanation:**
Renaming only changes the UI label company-wide. Internal IDs, scripting references, and documentation all continue using the original name. This affects all users, not just administrators.

---

## Topic: Classifications (Departments, Classes, Locations)

**Description:**
Learn about the three standard classification types for segmenting transactions and reporting.

### The Three Classifications

NetSuite provides three classification types for segmentation:

1. **Departments** - Organize by functional areas (Sales, Marketing, Operations)
2. **Classes** - Track by product lines, divisions, or custom categories
3. **Locations** - Segment by physical or virtual locations

### Key Characteristics

- All three can be **renamed** to suit your business needs
- Enable at **Setup → Company → Enable Features → Company**
- Can be made **mandatory** on transactions
- Used for segmented reporting and analysis
- Appear as fields on transaction forms

> **Note:** These are NOT the same as Subsidiaries. Subsidiaries represent legal entities, while classifications are segmentation tools.

---

## Topic: Subsidiaries

**Description:**
Understanding subsidiaries as legal entities in NetSuite OneWorld.

### Key Points

- **Subsidiaries represent legal entities** in NetSuite OneWorld
- The **only classification** that supports consolidated financial reporting
- Enable multi-subsidiary functionality in OneWorld accounts
- Support for **intercompany transactions** between subsidiaries
- Each subsidiary can have its own:
  - Currency
  - Fiscal calendar
  - Tax settings
  - Chart of accounts

### Elimination Subsidiaries

- Used to offset intercompany transactions in consolidated reports
- Journals posted to elimination subsidiaries remove double-counting effects
- Critical for accurate consolidated financial statements

### Practice Question

**Question:** Which structure allows tracking of consolidated financial reports by legal entity?

**Options:**
A) Classes
B) Locations
C) Subsidiaries
D) Departments

**Correct Answer:** C

**Explanation:**
Subsidiaries represent legal entities in NetSuite OneWorld. They are the only classification that supports consolidated financial reporting by legal entity. Departments, Classes, and Locations are segmentation tools but don't represent legal structures.

---

## Topic: Custom Records

**Description:**
Learn how to enable and use Custom Records for extending NetSuite's data model.

### Enabling Custom Records

- Must first be enabled at **Setup → Company → Enable Features**
- After enabling, create and manage at **Setup → Customization → Custom Records**
- This is a common trick question on the exam!

### Use Cases

- Track custom business data not covered by standard records
- Create relationships between custom and standard records
- Build custom applications on the NetSuite platform
- Extend functionality without modifying core system

### Important Note

> **Exam Tip:** Remember that Custom Records must be enabled in Enable Features BEFORE you can create them in the Customization menu.

---

## Topic: Enable Features vs. General Preferences

**Description:**
Understanding the difference between Enable Features and General Preferences.

### Enable Features

- **Purpose:** Master switch for turning functionality on/off
- **Location:** Setup → Company → Enable Features
- **Scope:** Company-level
- **Examples:** CRM, Advanced PDF, SuiteFlow, Projects

### General Preferences

- **Purpose:** Configure default company-wide behaviors
- **Location:** Setup → Company → General Preferences
- **Scope:** Company-level
- **Examples:** Mandatory fields, display options, default forms

### Key Difference

**Enable Features** controls what's available. **General Preferences** controls how available features behave.

### Practice Question

**Question:** What is the difference between Enable Features and General Preferences?

**Options:**
A) They are the same thing
B) Enable Features turns functionality on/off; General Preferences controls default company-wide behavior
C) General Preferences turns features on/off; Enable Features sets defaults
D) Enable Features is user-level; General Preferences is company-level

**Correct Answer:** B

**Explanation:**
Enable Features is the master switch for turning capabilities on or off. General Preferences configures default company-wide behaviors (like mandatory fields and display options). Both are company-level, but they serve different purposes.

---

## Topic: SuiteFlow (Workflow Manager)

**Description:**
Introduction to NetSuite's visual workflow automation tool.

### What is SuiteFlow?

SuiteFlow (Workflow Manager) is a **visual, point-and-click tool** for automating business processes without scripting.

### Key Features

- **States:** Define different stages in a workflow
- **Transitions:** Conditions that move records between states
- **Actions:** Automated tasks (send email, update field, create record)
- **No Code Required:** Build complex workflows visually

### Common Use Cases

- Approval workflows (purchase orders, expense reports)
- Automated notifications and alerts
- Field updates based on conditions
- Record creation and linking

### Practice Question

**Question:** What is SuiteFlow used for?

**Options:**
A) Managing data imports via CSV
B) Automating business processes with a visual point-and-click tool
C) Tracking financial transactions in the GL
D) Creating custom saved searches

**Correct Answer:** B

**Explanation:**
SuiteFlow (Workflow Manager) is a visual, point-and-click tool for automating business processes without scripting. You create states, transitions, and actions based on conditions to automate workflows.

---
