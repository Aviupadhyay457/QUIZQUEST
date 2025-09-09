# QUIZQUEST 🧠✨

An interactive and engaging quiz application built with React.js that allows users to customize their quiz experience by selecting the number of questions, categories, and difficulty levels.

## 🚀 Features

- **Customizable Quiz Setup**: Choose number of questions, categories, and difficulty level before starting
- **Interactive Navigation**: Navigate back and forth between questions during the quiz
- **Real-time Question Fetching**: Dynamic questions fetched from The Trivia API
- **Multiple Categories**: Wide variety of quiz categories to choose from
- **Difficulty Levels**: Easy, Medium, and Hard difficulty options
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface with dynamic styling using clsx

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite for fast development and optimized builds
- **API**: The Trivia API for fetching quiz questions
- **Animation**: Framer Motion for smooth transitions and animations
- **Styling Utility**: clsx for conditional CSS classes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aviupadhyay457/QUIZQUEST.git
   cd QUIZQUEST
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Use

### 1. **Quiz Setup**
   - Select the number of questions you want
   - Choose your preferred category (Science, History, Sports, etc.)
   - Pick your difficulty level (Easy, Medium, or Hard)
   - Click "Start Quiz" to begin

### 2. **Taking the Quiz**
   - Answer questions one at a time with multiple choice options
   - Use "Previous" and "Next" buttons to navigate between questions
   - Questions are fetched dynamically from The Trivia API
   - Track your progress with the question counter

### 3. **View Results**
   - Get instant feedback on your performance
   - See your final score 
   - Option to restart with new settings

```
QUIZQUEST/
│   .gitattributes
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   README.md
│   vite.config.js
│
├───public
└───src
    │   App.jsx
    │   Aside.css
    │   Aside.jsx
    │   index.css
    │   main.jsx
    │   MainComponent.jsx
    │   QuizQuestions.css
    │   QuizQuestions.jsx
    │
    ├───assets
    │       android-chrome-192x192.png
    │       android-chrome-512x512.png
    │       Animated Shape.svg
    │       Animated Shape1.svg
    │       Animated Shape2.svg
    │       apple-touch-icon.png
    │       bgQuiz1.svg
    │       bgQuiz2.svg
    │       bgQuiz3.svg
    │       bgQuiz4.svg
    │       bgQuiz5.svg
    │       Colored Shapes.svg
    │       favicon-16x16.png
    │       favicon-32x32.png
    │       favicon.ico
    │       Glowing Stars.svg
    │       site.webmanifest
    │
    └───utils
            category.js
            difficulty.js
```

## 🌐 API Integration

This project uses **The Trivia API** to fetch random questions dynamically:

- **API Source**: [The Trivia API](https://the-trivia-api.com/)
- **Features**: Multiple categories, difficulty levels, and question types
- **Endpoint**: Questions are fetched based on user preferences for category and difficulty

⭐ If you found this project helpful, please consider giving it a star on GitHub!

**Built with ❤️ using React.js and The Trivia API**

Happy Quizzing! 🎯
