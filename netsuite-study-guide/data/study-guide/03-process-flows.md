# Standard NS Process Flows

**Section ID:** 3
**Section Title:** Standard NS Process Flows

---

## Topic: Sales Force Automation (SFA) Setup

**Description:**
This is the largest exam domain — covering CRM, sales cycle, order management, fulfillment, inventory, purchasing, and accounts payable.

### Key Concepts

- **Lead Routing**: Leads can be assigned to Sales Reps automatically via Sales Territories.
- **Online Customer Forms**: Web-based forms that capture leads directly into NetSuite.
- **Customer Types**: Individual vs. Company — affects which fields appear and how contacts are managed.
- **Contact Records**: Linked to customer/company records. Track people within an organization.
- **CRM Lists**: Configurable lists for Lead Source, Sales Territory, Win/Loss Reason, etc.

---

## Topic: Sales Cycle Progression: Lead → Prospect → Customer

**Description:**
Understanding how customer records progress through the sales lifecycle.

### Key Concepts

- The sales cycle follows: **Lead → Prospect → Customer**.
- **Lead Conversion**: A Lead becomes a Prospect when an Opportunity is created. A Prospect becomes a Customer when a Sales Order or Cash Sale is created.
- **Sales Preferences** control automatic conversion behavior (e.g., auto-convert on first order).
- Understanding how records transform through the cycle is critical for the exam.

### Memory Tip

**"L-P-C"** = Lead → Prospect → Customer. **O**pportunity converts L to P. **S**ales Order converts P to C. Think: **"Opportunity Promotes, Sales Converts."**

### Practice Question

**Question:** At what point does a Lead automatically become a Prospect in NetSuite?

**Options:**
A) When a Quote is sent
B) When an Opportunity is created
C) When a Sales Order is created
D) When a Contact is added

**Correct Answer:** B

**Explanation:**
In NetSuite's standard sales cycle, creating an Opportunity for a Lead automatically converts them to a Prospect. Creating a Sales Order converts the Prospect to a Customer.

---

## Topic: Quotas & Forecast Reporting

**Description:**
Sales performance tracking and forecasting capabilities.

### Key Concepts

- **Quotas** are assigned to Sales Reps, typically per period. Set on the Employee record or via Quota Assignment.
- **Forecasts** can be calculated as weighted (based on opportunity probability) or unweighted.
- Key Sales Preferences: Calculate Forecasts as Weighted, Advanced Forecasting, Use Opportunities in Forecast.
- Forecasts can be edited/overwritten by authorized users in the Forecast Editor.
- **Estimate/Quote** record fields feed into forecast calculations.

---

## Topic: Case Management Setup & Use

**Description:**
Customer support case tracking and management tools.

### Key Concepts

- **Cases** track customer support issues. Created manually or via Online Case Forms.
- **Case Routing**: Automatic assignment of cases based on rules (e.g., product, territory, issue type).
- **Case Profiles**: Templates that control case behavior, auto-responses, and escalation rules.
- **Support Preferences**: Subsidiary-level settings at `Setup → Support → Support Preferences`.
- **Customer Center**: Portal where customers can submit and track their own cases.
- Roles that manage cases: Administrator, Support Administrator, Support Manager.

### Practice Question

**Question:** Where can users set subsidiary-level support preferences?

**Options:**
A) Case Profile
B) Setup → Company → General Preferences
C) Setup → Support → Support Preferences
D) Subsidiary record

**Correct Answer:** C

**Explanation:**
Subsidiary-level support preferences are configured at Setup → Support → Support Preferences. Case Profiles control case behavior and rules, not subsidiary-level settings.

---

## Topic: Marketing Campaigns & SuitePromotions

**Description:**
Marketing campaign management and promotional tools.

### Key Concepts

- **Campaign Components**: Groups (target audience), Promotions, Promo Codes, Email/Marketing Templates, and Campaign Metrics.
- **Campaign Metrics**: Track ROI, responses, conversions per campaign event.
- **Lead Nurturing**: Automated drip campaigns based on triggers and schedules.
- **SuitePromotions**: Tools for creating discount codes and promotional pricing.
- **Global Subscription Status**: "Unsubscribed to Marketing by Default" sets new customers to Soft Opt-Out.

---

## Topic: Sales Orders, GL Impact & Downstream Transactions

**Description:**
Understanding the sales order lifecycle and accounting impacts.

### Key Concepts

- **Sales Order** is a commitment to sell. By itself, it has **no GL impact** — it's a non-posting transaction.
- Downstream transactions created from a Sales Order: **Item Fulfillment → Invoice → Payment** (or Cash Sale directly).
- **Item Fulfillment**: Reduces inventory (posts to COGS and Inventory accounts).
- **Invoice**: Recognizes revenue (posts to Accounts Receivable and Revenue).
- **Cash Sale**: Combines fulfillment + invoice + payment in one transaction.
- Form settings on the Sales Order control which downstream transactions are available.

### Memory Tip

**"SO → FIP":** Sales Order triggers Fulfillment → Invoice → Payment. Remember: the Sales Order itself does NOT post to the GL.

---

## Topic: Order Fulfillment Controls

**Description:**
Different methods and workflows for fulfilling customer orders.

### Key Concepts

- **Basic Fulfillment**: Mark items as fulfilled directly from the Sales Order.
- **Pick/Pack/Ship**: Multi-step fulfillment process. Pick items → Pack into shipments → Ship with carrier.
- **Advanced Shipping**: Supports multiple shipping methods, rate calculations, and carrier integration.
- **Drop Ship**: Items shipped directly from vendor to customer. Creates a Purchase Order linked to the Sales Order.
- **Special Order**: Items ordered from vendor for customer but shipped to YOU first, then to customer.
- **Invoice in Advance of Fulfillment**: Accounting preference allowing invoicing before items are shipped.

### Exam Tip

Know the difference between Drop Ship (vendor ships directly to customer) and Special Order (vendor ships to you, then you ship to customer). This is a classic exam question.

---

## Topic: Payment Methods

**Description:**
Available payment processing options in NetSuite.

### Key Concepts

- Supported payment methods: **Credit Cards, EFT (Electronic Funds Transfer), ACH, PayPal, Customer Payments, Checks**.
- Credit Card Processing requires a **Merchant Account** setup.
- **Electronic Payments** feature must be enabled for EFT/ACH processing.
- Customer Payments are applied against open Invoices to close Accounts Receivable balances.

---

## Topic: Return Authorization, Refunds & GL Impact

**Description:**
Processing customer returns and refunds with accounting impacts.

### Key Concepts

- **Return Authorization (RMA)**: Authorizes a customer return. Non-posting (no GL impact by itself).
- Downstream: RMA → **Item Receipt** (receives goods back, increases inventory) → **Credit Memo** (reverses revenue, reduces AR).
- **Credit Memo**: Can be applied to an existing invoice or converted to a Customer Refund (cash back).
- **Refunding a Cash Sale**: Different process — uses a Cash Refund transaction.
- Customer Return Management Workflow controls the flow and approval steps.

### Memory Tip

**"RMA → RIC":** Return Authorization → Receive Item → Credit Memo. The reverse of the sales flow (SO → FIP).

---

## Topic: Item Types & Best Uses

**Description:**
Understanding different item types and when to use each.

### Key Concepts

- **Inventory Item**: Physically stocked, tracked with quantities and costing. Posts to Inventory and COGS accounts.
- **Non-Inventory Item**: Sold or purchased but NOT tracked in inventory (e.g., items shipped from vendor). Has Sale and Purchase variants.
- **Service Item**: Represents labor or services. Not physically stocked. Used for time-based billing.
- **Group Item**: A collection of items sold together. Each component line shows individually on the transaction (individual pricing visible).
- **Kit/Package**: A collection of items sold together as ONE line item (single price, components hidden from customer).
- **Assembly Item**: Manufactured item made from component items via an Assembly Build. Tracked in inventory as a finished good.
- **Matrix Item**: A parent item with variants (e.g., size, color). The parent isn't sold — the sub-items (child items) are.
- **Serialized/Lot-Numbered**: Items tracked by individual serial numbers or production lot numbers for traceability.

### Memory Tip

**Group vs Kit:** Think "Group = Granular" (shows each component) vs. "Kit = Keeps it together" (shows as one line). This distinction appears frequently on the exam.

### Practice Question

**Question:** Which item type displays component items as individual lines on a Sales Order?

**Options:**
A) Kit/Package
B) Group Item
C) Assembly Item
D) Matrix Item

**Correct Answer:** B

**Explanation:**
Group Items show each component as individual lines on the transaction with separate pricing. Kit/Package items appear as a single line. Assembly Items are manufactured finished goods. Matrix Items are parent-child item structures based on attributes.

---

## Topic: Inventory Transactions & Advanced Inventory

**Description:**
Inventory management transactions and advanced features.

### Key Concepts

- Transactions that **increase** inventory: Item Receipt, Inventory Adjustment (positive), Assembly Build (finished good).
- Transactions that **decrease** inventory: Item Fulfillment, Inventory Adjustment (negative), Assembly Unbuild.
- **Committed quantity**: Items on approved Sales Orders not yet fulfilled (reserved but still in stock).
- **Available = On Hand − Committed**.
- **Advanced Inventory features**: Multi-Location Inventory (MLI), Bins (locations within locations), Units of Measure, Assemblies, Kits/Packages.
- MLI is irreversible once enabled and may require NetSuite Support.

---

## Topic: Sales Pricing Strategies

**Description:**
Different pricing methods and strategies available in NetSuite.

### Key Concepts

- **Base Price**: The default selling price set on the Item record.
- **Price Levels**: Multiple price tiers (e.g., Retail, Wholesale, Employee). Assigned to items and can be assigned to customers.
- **Quantity Pricing**: Discounts based on quantity purchased (e.g., buy 10+ get 10% off).
- **Pricing Groups**: Groups of customers who receive the same pricing.
- **Pricing Schedules**: Time-based pricing rules — e.g., promotional pricing valid for specific date ranges.
- **Multi-Currency Pricing**: Setting prices in different currencies for international customers.
- **Customer-Specific Pricing**: Custom pricing set on individual customer records.

---

## Topic: Billable Items, Time & Expenses to Invoice

**Description:**
Tracking and billing time and expenses to customers.

### Key Concepts

- Employees enter **Time** (time tracking) and **Expense Reports** against customers/projects.
- When marked as **billable**, these entries flow to an Invoice during the billing process.
- Items, time, and expenses must be associated with a customer to appear on their invoice.
- The billing process pulls all approved billable entries into a single invoice.

---

## Topic: Purchasing: Approval & Routing

**Description:**
Purchase request and approval workflows.

### Key Concepts

- **Purchase Requests**: Internal requests to purchase items. Require approval before becoming Purchase Orders.
- Standard approval process is based on: requester's supervisor, spending limits, and approval routing rules.
- Controls determine: when approval is required, who can approve, and spending thresholds.
- Approved Purchase Requests can be converted into **Purchase Orders**.
- *NOT on exam:* Purchase Requisitions and Custom Approval Routing.

---

## Topic: Accounts Payable Transactions & GL Impact

**Description:**
Standard accounts payable transaction flow and accounting impacts.

### Key Concepts

- Standard AP flow: **Purchase Order → Item Receipt → Vendor Bill → Bill Payment**.
- **Purchase Order**: Non-posting (no GL impact).
- **Item Receipt**: With Advanced Receiving enabled, this posts to inventory and an accrual account (not AP yet).
- **Vendor Bill**: Posts to Accounts Payable (credit) and Expense/Inventory (debit). This is where the AP liability is recognized.
- **Bill Payment**: Reduces AP and Cash.
- **Advanced Receiving** changes the workflow by adding the Item Receipt step with its own GL posting.
- If price changes on Vendor Bill after items received, a **variance** may post.

### Memory Tip

**"PO → RIBP":** Purchase Order → Receive Item → Bill → Payment. Mirror of the sales cycle (SO → FIP). PO and SO are both non-posting!
