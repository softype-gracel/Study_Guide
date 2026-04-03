# Maintenance, Resources & Data Security

**Section ID:** 5
**Section Title:** Maintenance, Resources & Data Security

---

## Topic: Working with NetSuite Support

**Description:**
Support best practices, NetSuite resources, roles and permissions, authentication, and audit tracking.

### Key Concepts

- Always verify your **Account Number and Environment** (Production vs. Sandbox) before contacting Support.
- Know the **Support Phone Menu Routing** options — different queues for billing, technical, etc.
- Provide clear reproduction steps, screenshots, and the URL of the affected page when filing a case.
- Check **status.netsuite.com** for system-wide outages before calling Support.

---

## Topic: NetSuite Resources & Help

**Description:**
Key resources and documentation available to NetSuite users.

### Key Concepts

- **SuiteAnswers**: Primary knowledge base. Search articles, guides, videos, best practices. Accessed from within NetSuite.
- **Learning Center / MyLearn**: Training courses and learning paths.
- **Help User Guides**: Contextual help available from within the application.
- **User Groups**: Community forums for NetSuite users to discuss and share.
- **status.netsuite.com**: Real-time system status and maintenance windows.
- **SuiteApp.com**: Marketplace for third-party and NetSuite-built applications.
- **SuiteIdeas (Enhancement Center)**: Submit and vote on feature requests.

### Memory Tip

**"SHLUSS"** — **S**uiteAnswers, **H**elp Guides, **L**earning Center, **U**ser Groups, **S**uiteApp.com, **S**uiteIdeas. Six key resources to know for the exam.

---

## Topic: Release Cycles & New Features

**Description:**
Understanding NetSuite's release schedule and how to prepare.

### Key Concepts

- NetSuite releases **two major releases per year** (typically named by year and release number, e.g., 2024.1, 2024.2).
- **Release Preview** environments are available before production rollout for testing.
- **Release Notes** document all new features, changes, and deprecations.
- SuiteAnswers topics: Release Preview Notifications, More New Release Resources, Preparing for Testing.
- Certification maintenance requires passing an annual **New Release Quiz**.

---

## Topic: Custom Roles & Data Access Control

**Description:**
Managing user access and permissions through roles.

### Key Concepts

- **Roles** define what a user can see and do. Each user can be assigned multiple roles and switch between them.
- **Permissions** on roles control access to: Transactions, Reports, Lists, Setup pages, and Custom Records. Levels: None, View, Create, Edit, Full.
- **Custom Roles** are preferred over modifying standard roles — standard roles can be reset during upgrades.
- Restrict access by **Department, Class, Location, or Subsidiary** on the role definition.
- **Restrict CSV Import/Export**: A specific permission that can be set on roles to prevent bulk data extraction.
- **Testing custom roles:** Log in as a user with only that role assigned to verify correct access.

### Practice Question

**Question:** What is the best practice for creating roles with specific permissions?

**Options:**
A) Modify standard out-of-the-box roles
B) Create custom roles rather than modifying standard roles
C) Give all users the Administrator role
D) Use a single role for all users and restrict with preferences

**Correct Answer:** B

**Explanation:**
Creating custom roles is the best practice because standard roles can be reset during system upgrades. Custom roles preserve your specific permission configurations across updates.

---

## Topic: User Authentication & Security Questions

**Description:**
Security features and authentication methods.

### Key Concepts

- **Two-Factor Authentication (2FA)**: Adds a second verification step (e.g., phone, authenticator app). Can be required for specific roles.
- **Security Questions**: Set during first login or via preferences. Used for password recovery and identity verification.
- If you forget security question answers, you must contact your Administrator to reset them.
- **Password Policies**: Admins can enforce minimum length, complexity, expiration, and lockout rules.
- **IP Address Restrictions**: Limit role access to specific IP addresses for added security.

---

## Topic: Settings Portlet & Tracking Record Changes

**Description:**
Settings access and audit trail capabilities.

### Key Concepts — Settings Portlet

- The Settings Portlet provides quick links to commonly used setup pages.
- Visible on the dashboard. Content varies by role.
- Provides shortcuts to: Set Preferences, Enable Features, General Preferences, Accounting Preferences, etc.

### Tracking Changes to Records

- **System Notes**: Automatically logged on every record. Shows who changed what, when, and from what value to what new value. The primary audit mechanism.
- **Transaction Audit Trail**: Tracks changes to transactions specifically.
- **Line-Level Audit Trail**: Tracks changes to individual lines on transactions (e.g., item quantity changes on a Sales Order).
- **Login Audit Trail**: Tracks who logged in, when, from what IP.
- **GL Impact**: If a change affects the General Ledger, the GL posting history reflects the change.
- If a **field type is changed**, the history for that field in System Notes may be lost or become unreadable.
