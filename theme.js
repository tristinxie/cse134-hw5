const themeToggle = document.getElementById("theme-toggle");
let currentTheme = "light";

// Restore saved theme
try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
} catch (error) {
    // Use default light theme
}

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

applyTheme(currentTheme);
themeToggle.hidden = false;

themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";

    const changeTheme = () => applyTheme(currentTheme);

    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.startViewTransition(changeTheme);
    } else {
        changeTheme();
    }

    try {
        localStorage.setItem("theme", currentTheme);
    } catch (error) {
    }
});