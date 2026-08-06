# Three-Question Business Health Assessment Design

**Date:** 2026-08-06
**Status:** Approved direction
**Scope:** Hero business-health assessment only

## Goal

Reduce each business assessment from ten questions to three concise, business-specific health questions. The result must show both:

- a plain-language operating status: **Loss**, **Average**, or **Profit**; and
- a supporting **0–100 Business Health Score**.

The shorter flow should help a founder understand the business's current financial condition in about one minute without presenting the result as accounting advice.

## Chosen Approach

Use a direct status question plus two supporting health questions.

- Question 1 is the profitability or operating-position question. Its selected answer determines the status.
- Questions 1–3 all contribute equally to the 0–100 health score.
- Questions 2 and 3 are specific to the operating model, so the assessment does not become a generic three-question survey.

This keeps the status honest: a loss-making business cannot be labeled “Profit” merely because growth or runway is strong.

## Question Banks

Every option is scored from 0 (weakest) to 4 (strongest). Every bank contains exactly three scored questions and no context-only revenue question.

### Ecommerce

1. **What was your net profit margin last month?**
   - More than 10% loss
   - Loss of 1–10%
   - Break-even to 4% profit
   - 5–15% profit
   - Above 15% profit
2. **How is revenue trending across the last three months?**
   - Down more than 20%
   - Down 1–20%
   - Mostly flat
   - Up 1–15%
   - Up more than 15%
3. **How reliably can cash cover inventory and normal operating commitments?**
   - Current commitments cannot be covered
   - Less than one month of coverage
   - One to two months of coverage
   - Three to five months of coverage
   - Six or more months with planned inventory purchasing

### Agency

1. **What is the agency's current net profit margin?**
   - More than 10% loss
   - Loss of 1–10%
   - Break-even to 4% profit
   - 5–15% profit
   - Above 15% profit
2. **How healthy is paid team utilization without overloading delivery?**
   - Unknown or the team is consistently overloaded
   - Under 45% billable
   - 45–60% billable
   - 61–80% billable with uneven forecasting
   - 61–80% billable with reliable capacity forecasting
3. **How much operating runway does the agency have?**
   - Less than one month
   - One to two months
   - Three to five months
   - Six to eleven months
   - Twelve or more months

### SaaS

1. **What is the company's current operating profit or loss position?**
   - Loss is more than 30% of revenue
   - Loss is 1–30% of revenue
   - Break-even to 4% profit
   - 5–15% profit
   - Above 15% profit
2. **How is monthly recurring revenue trending?**
   - Declining more than 10% per month
   - Declining up to 10% per month
   - Flat or changing by less than 2%
   - Growing 2–10% per month
   - Growing more than 10% per month
3. **How much operating runway does the company have?**
   - Less than three months
   - Three to five months
   - Six to eleven months
   - Twelve to seventeen months
   - Eighteen or more months

### Service Business

1. **What is the business's current net profit margin?**
   - More than 10% loss
   - Loss of 1–10%
   - Break-even to 4% profit
   - 5–15% profit
   - Above 15% profit
2. **How much of next month's available service capacity is already booked?**
   - Under 20%
   - 20–40%
   - 41–60%
   - 61–80%
   - Above 80% with capacity under control
3. **How reliably are invoices and customer balances collected?**
   - Frequently more than 60 days overdue
   - Frequently 30–60 days overdue
   - Usually paid within 30 days
   - Usually paid within 14 days
   - Mostly paid immediately or automatically

## Status and Score Rules

### Status

The answer to Question 1 determines the plain-language status:

- option scores 0 or 1 → **Loss**
- option score 2 → **Average**
- option scores 3 or 4 → **Profit**

### Health Score

All three questions contribute equally:

    health score = round((sum of the three option scores / 12) × 100)

The minimum is 0; the maximum is 100.

The result UI must distinguish the two concepts:

- status describes the selected profit/loss position;
- score summarizes profitability plus the two business-specific supporting signals.

## Product and UI Changes

- Replace all four ten-question banks with the exact three-question banks above.
- Derive question count, final-step detection, progress maximum, and progress width from the selected bank length. No UI or coordinator code may hard-code 10, 9, or 10%.
- Show “Question 1 of 3”, “Question 2 of 3”, and “Question 3 of 3”.
- Complete the assessment from the third question.
- Keep previous/back navigation, answer persistence, business-change confirmation, restart, focus management, and privacy behavior unchanged.
- Change the hero promise from “Five minutes” to “About one minute” and describe the assessment as three focused questions.
- On the result screen, replace the old “Critical / Needs attention / Healthy / Strong” label with “Loss / Average / Profit”.
- Keep the 0–100 score ring, recommendations, newsletter CTA, restart control, and professional-advice disclaimer.
- Remove the obsolete “Revenue context” badge because there is no longer a context-only question.

## Data and Scoring Contract

- All twelve questions are health questions with numeric scores.
- AssessmentResult.label becomes “Loss | Average | Profit”.
- AssessmentResult.contextAnswer is removed.
- Score normalization uses the actual maximum score (question count × 4) instead of the old fixed denominator 36.
- Category, risk, next-step, and recommendation ranking continue to use the three resolved questions in stable bank order.
- Recommendation selection remains deterministic and business-type-specific.

## Error Handling and Accessibility

- Missing or invalid answers continue to block completion and focus the first unanswered question.
- Scoring continues to reject incomplete answer records rather than producing partial results.
- Progressbar aria-valuemax, accessible label, and current value use the dynamic question count.
- The result status and score retain clear accessible labels.
- The existing disclaimer remains visible because this is directional guidance, not accounting, legal, investment, or tax advice.

## Test Strategy

Tests will be changed before production code and observed failing for the expected ten-to-three mismatch.

Coverage must prove:

- each supported business type has exactly three ordered, scored questions;
- the four question banks contain the approved business-specific copy;
- status mapping is 0–1 Loss, 2 Average, 3–4 Profit;
- all-low, all-middle, and all-high answers produce scores 0, 50, and 100;
- incomplete answers still throw;
- state completion occurs after question three;
- corrupted indices clamp to the third question;
- progress and final-button behavior use the bank length instead of hard-coded ten-step constants;
- result markup shows the new statuses and removes revenue context;
- the hero promises a short three-question assessment;
- the complete test suite, lint, and production build remain green.

## Out of Scope

- Persisting assessment answers beyond the current browser session
- Adding accounts, analytics, or a backend
- Changing the four supported business types
- Adding more result-analysis panels
- Redesigning unrelated landing-page sections
