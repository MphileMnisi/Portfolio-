# React Developer Portfolio

A sleek, modern, and responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. This project is designed to help developers showcase their projects, skills, education, and experience in a professional manner.

## ✨ Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Dark/Light Mode**: Built-in theme toggler for optimal viewing experience in any lighting condition.
- **Interactive UI**:
  - Typing effect in the Hero section.
  - Project filtering by tags.
  - Detailed project modals with rich descriptions.
  - Smooth scrolling navigation.
- **Modern Tech Stack**: Built with React (v19) and TypeScript best practices.
- **Styling**: Utility-first styling with Tailwind CSS.

## 🛠️ Tech Stack

- **React**: UI Library
- **TypeScript**: Static typing for better code quality
- **Tailwind CSS**: For styling and responsive design
- **Custom Icons**: Lightweight SVG icons for visual elements

## 📂 Project Structure

```text
├── components/
│   ├── icons/          # SVG Icon components
│   ├── About.tsx       # About Me section with skills
│   ├── Contact.tsx     # Contact form and social links
│   ├── Education.tsx   # Education timeline
│   ├── Experience.tsx  # Work experience timeline component
│   ├── Footer.tsx      # Footer component
│   ├── Header.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section with typing effect
│   ├── Projects.tsx    # Project gallery with filtering and modal
│   └── Section.tsx     # Reusable section wrapper
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application component
├── index.tsx           # Entry point
└── index.html          # HTML template
```

## ⚡ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-developer-portfolio.git
   cd react-developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎨 Customization

You can easily customize the portfolio with your own information by modifying the data within the component files:

- **Personal Info & Hero Text**: Edit `components/Hero.tsx` and `components/About.tsx`.
- **Projects**: Update the `projectsData` array in `components/Projects.tsx` to add your own work.
- **Education**: Update the `educationData` array in `components/Education.tsx`.
- **Experience**: The `components/Experience.tsx` file contains the structure for work experience. *Note: You may need to import and add this component to `App.tsx` to display it.*
- **Contact Info**: Update email and social links in `components/Contact.tsx` and `components/Footer.tsx`.
- **Theme Colors**: Tailwind configuration is located in `index.html` (under `tailwind.config`) where you can adjust the primary, secondary, and accent colors.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built by Nkosimphile Mnisi.