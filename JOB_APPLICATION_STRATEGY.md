# Job Application Strategy

## 🎯 Strategic Overview
This document outlines the strategy for positioning yourself during the job application process and technical interviews. The goal is to move beyond a passive resume review and drive the conversation toward your strongest technical assets: **AI Integration**, **System Architecture**, and **Complex Problem Solving**.

### Core Value Proposition
**"I am an AI-focused Software Engineer who doesn't just build UIs, but architects intelligent solutions that solve complex real-world problems in EdTech and Business Intelligence."**

---

## 🔑 Key Strategic Pillars

### 1. The "Data Engineer" Angle (Project: SA School Recommendation System)
**Goal:** Prove you can handle messy data and database architecture, not just frontend code.
*   **The Narrative:** Emphasize that building the UI was easy; the real challenge was **Data Aggregation**.
*   **Key Talking Points:**
    *   Writing custom scripts to scrape and normalize fragmented public data.
    *   Designing a **Weighted Content-Based Filtering Algorithm** (Math over magic).
    *   Choosing **Firebase NoSQL** over SQL to handle flexible schemas for different school facilities.

### 2. The "AI Specialist" Angle (Project: SA Grade 12 Marker)
**Goal:** Prove you understand how to implement AI usefully, not just wrapping an API.
*   **The Narrative:** This addresses a scalable real-world problem (teacher workload).
*   **Key Talking Points:**
    *   **OCR Implementation:** Handling handwritten text and confidence thresholds.
    *   **Semantic Grading:** Moving beyond keyword matching by using **Vector Embeddings (Cosine Similarity)** to understand the *meaning* of an answer.
    *   **Feedback Loops:** Using LLMs to explain *why* marks were lost, mimicking human pedagogy.

### 3. The "Product Architect" Angle (Project: CAPACITI Talent Hub & RecruitmentAI)
**Goal:** Prove you think about the business impact and ethics of software.
*   **The Narrative:** You build systems that optimize hiring workflows while mitigating bias.
*   **Key Talking Points:**
    *   **System Design:** Designing for two distinct user types (Candidates vs. Recruiters).
    *   **Ethics in AI:** Using **RecruitmentAI.Notebook** to visualize and audit algorithmic bias (Disparate Impact Ratio).
    *   **Optimization:** Using Web Workers for client-side heavy data processing.

---

## 💡 Technical Interview Q&A Prep

### Architecture & Database Decisions
**Q: Why did you choose Firebase over a traditional SQL database for the School Recommender?**
*   **Strategy:** Highlight flexibility and speed of iteration.
*   **Answer:** "The data structure of schools varies wildly—some have pools, others have specific subject lists. A NoSQL document store allowed for a flexible schema without complex migrations during the scraping phase, and Firebase offered real-time capabilities out of the box."

### AI Performance & Latency
**Q: How do you handle latency in your Chatbot or AI tools?**
*   **Strategy:** demonstrate knowledge of UX best practices for slow backends.
*   **Answer:** "LLMs are inherently slow. I mitigate this perception by using **Server-Sent Events (SSE)** to stream the response token-by-token. This reduces the Time-To-First-Byte (TTFB) to milliseconds, making the app feel instant even if the full generation takes several seconds."

### Reliability & Hallucinations
**Q: How do you ensure your AI doesn't hallucinate (e.g., in the Resume Builder)?**
*   **Strategy:** Show you understand the limitations of AI.
*   **Answer:** "I use a **'Human-in-the-loop'** design pattern. The AI generates suggestions, but the user must explicitly review and click to add them. I also enforce low temperature settings (0.1 - 0.2) and use strict system prompting to prioritize factual accuracy over creativity."

### Future Growth
**Q: Where do you see yourself in 2 years?**
*   **Strategy:** Align with industry trends.
*   **Answer:** "I am moving from building standalone AI tools to architecting **Agentic Workflows**—systems where AI agents can autonomously plan and execute multi-step tasks. I want to be the engineer who builds the infrastructure that allows AI to do actual work, not just chat."
