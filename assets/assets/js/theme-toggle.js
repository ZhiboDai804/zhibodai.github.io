const themeToggleBtn = document.getElementById('theme-toggle-btn');

const currentTheme = document.documentElement.getAttribute('data-theme');
themeToggleBtn.textContent = currentTheme === 'dark' ? '陽' : '陰';

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '陰';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '陽';
        localStorage.setItem('theme', 'dark');
    }
});