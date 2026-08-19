# Practice Questions Template

This template provides a standardized format for creating practice questions.

---

## Question 1
**Topic:** [Topic Name - e.g., SuiteScript 2.0, Entry Points]
**Difficulty:** [Easy | Medium | Hard]
**Question Type:** [Multiple Choice | True/False | Code Analysis]

[Write your question here]

**Options:**
A) [First option]
B) [Second option]
C) [Third option]
D) [Fourth option]

**Correct Answer:** [A/B/C/D]

**Explanation:**
[Provide a detailed explanation of why this is the correct answer and why other options are incorrect]

**Reference:**
[Optional: Link to documentation, page number, or resource]

---

## Question 2
**Topic:** [Topic Name]
**Difficulty:** [Easy | Medium | Hard]
**Question Type:** [Multiple Choice | True/False | Code Analysis]

[Write your question here]

**Options:**
A) [First option]
B) [Second option]
C) [Third option]
D) [Fourth option]

**Correct Answer:** [A/B/C/D]

**Explanation:**
[Provide a detailed explanation]

**Reference:**
[Optional: Link to documentation]

---

## Code Analysis Example

## Question 3
**Topic:** SuiteScript 2.0 - Server Scripts
**Difficulty:** Medium
**Question Type:** Code Analysis

What will be the output of the following code?

```javascript
define(['N/record'], function(record) {
    function beforeSubmit(context) {
        var newRecord = context.newRecord;
        var oldValue = newRecord.getValue('custbody_field');
        log.debug('Value', oldValue);
    }
    return { beforeSubmit: beforeSubmit };
});
```

**Options:**
A) The current value of custbody_field
B) The previous value of custbody_field
C) undefined
D) null

**Correct Answer:** A

**Explanation:**
In beforeSubmit context, newRecord.getValue() returns the current (new) value that will be saved to the database, not the old value. To get the old value, you would need to use context.oldRecord.getValue().

**Reference:**
SuiteScript 2.0 API Documentation - beforeSubmit

---

## True/False Example

## Question 4
**Topic:** SuiteCloud Development Framework
**Difficulty:** Easy
**Question Type:** True/False

**Statement:** The SuiteCloud CLI requires Node.js to be installed.

**Options:**
A) True
B) False

**Correct Answer:** A

**Explanation:**
The SuiteCloud CLI (suitecloud-cli) is a Node.js-based tool and requires Node.js version 14 or higher to be installed on your system.

**Reference:**
SuiteCloud CLI Installation Guide

---
