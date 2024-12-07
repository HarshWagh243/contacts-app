import React, { ChangeEventHandler, useEffect } from 'react';
import '../styles/ThemeToggle.css';

// Set dark theme
const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
  document.body.classList.add('dark');
  document.body.classList.remove('light');
};

// Set light theme
const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
  document.body.classList.add('light');
  document.body.classList.remove('dark');
};

// Check stored theme or system preference
const storedTheme = localStorage.getItem('theme');
const prefersDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

// Set initial theme on load
if (defaultDark) {
  setDark();
} else {
  setLight();
}

// Toggle theme handler
const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    // Ensure theme matches saved preference on load
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <div className="toggle-theme-wrapper">
      <span role="img" aria-label="sun">☀️</span>
      <label className="toggle-theme" htmlFor="theme-checkbox">
        <input
          type="checkbox"
          id="theme-checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className="slider round"></div>
      </label>
      <span role="img" aria-label="moon">🌒</span>
    </div>
  );
};

export default ThemeToggle;
