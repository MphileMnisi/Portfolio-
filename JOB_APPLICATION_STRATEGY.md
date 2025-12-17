# Job Application Strategy & 10-Minute Showcase Script

## 🎯 Strategic Overview
This document outlines the strategy for utilizing your portfolio during live technical interviews. The goal is to move beyond a passive resume review and drive the conversation toward your strongest technical assets (AI, System Architecture, and Problem Solving).

### Core Value Proposition
"I am an AI-focused Software Engineer who doesn't just build UIs, but architects intelligent solutions that solve complex real-world problems (EdTech, Business Intelligence)."

---

## 🗣️ 10-Minute Showcase Presentation Script

### Part 1: Introduction & Background (Minutes 0:00 - 2:00)
**Visual Aid:** Navigate to the **Hero** section, then scroll to **About**.

**Script:**
"Good morning. I'm Nkosimphile Mnisi, a Software Developer and AI/ML Engineer based in South Africa.

My journey started with my National Diploma in IT at VUT, where I built a strong foundation in software development and networking. Currently, I'm refining my skills as a trainee at Capaciti, focusing on full-stack development.

What sets me apart is my focus on **Generative AI and Intelligent Systems**. I don't just write code; I build systems that can see, read, and understand context. You'll see this today in projects like my optical character recognition grading system and my sentiment analysis tools."

### Part 2: Technical Deep Dive - Data & Algorithms (Minutes 2:00 - 5:00)
**Visual Aid:** Navigate to **Projects** and click "View Details" on **SA School Recommendation System**.

**Script:**
"I'd like to highlight my **SA School Recommendation System**. This wasn't just a CRUD app; it was a data engineering challenge.

**The Problem:** Parents in SA lack a centralized database to compare schools based on specific needs like fees, location, and pass rates.

**The Technical Solution:**
1.  **Data Aggregation:** I wrote custom scripts to scrape and normalize fragmented public data.
2.  **The Algorithm:** I moved beyond simple filtering. I implemented a **weighted content-based filtering algorithm**. It calculates a 'compatibility score' for each school based on user-weighted priorities (e.g., 'Safety' is 50% important, 'Fees' are 30%).
3.  **Architecture:** Built on Next.js for SEO and performance, using Firebase NoSQL for flexible schema management."

### Part 3: Capstone Functionality - AI in EdTech (Minutes 5:00 - 8:00)
**Visual Aid:** Navigate to **Projects** and open **SA Grade 12 Marker**.

**Script:**
"My most complex work is the **SA Grade 12 Marker**. This tackles a massive bottleneck in education: grading time.

**How it works:**
1.  **Input:** Teachers upload photos of handwritten exam scripts.
2.  **OCR & Processing:** The system uses a specialized handwriting OCR API to digitize the text.
3.  **Semantic Grading:** This is the key innovation. Instead of strict keyword matching (which fails if a student phrasing is different), I use **Vector Embeddings**. I compare the semantic cosine similarity between the student's answer and the memo.
4.  **Feedback Loop:** The LLM generates specific feedback on *why* marks were lost, mimicking a human teacher."

*Self-Correction/Constraint Handling:* "One challenge was illegible handwriting. I implemented a 'confidence threshold'—if the OCR confidence is below 70%, the system flags it for human review rather than guessing."

### Part 4: Future Roadmap & Closing (Minutes 8:00 - 10:00)
**Visual Aid:** Scroll to **Education/Certifications**.

**Script:**
"Looking forward, I am aggressively upskilling. I've completed a 12-certificate AI Bootcamp with Coursera and I'm currently finalizing my Azure AI Engineer certifications.

My goal for the next 12 months is to move from building standalone AI tools to architecting enterprise-grade **Agentic Workflows**—systems where AI agents can autonomously plan and execute multi-step tasks.

I'm ready to bring this blend of full-stack engineering and AI innovation to your team. Thank you."

---

## 💡 Interview Q&A Prep

**Q: Why did you choose Firebase over SQL for the School Recommender?**
*A: The data structure of schools varies wildly (different facilities, subjects). A NoSQL document store allowed for a flexible schema without complex migrations during the scraping phase.*

**Q: How do you handle latency in your Chatbot?**
*A: I use **Server-Sent Events (SSE)** to stream the response from the LLM to the client token-by-token. This reduces the Time-To-First-Byte (TTFB) and makes the app feel instant, even if the full generation takes seconds.*

**Q: How do you ensure your AI doesn't hallucinate in the Resume Builder?**
*A: I use a 'Human-in-the-loop' design pattern. The AI generates suggestions, but the user must explicitly click to add them to the resume. I also use low temperature settings (0.1 - 0.2) for the model to prioritize factual accuracy over creativity.*
