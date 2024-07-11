// maybe expand on themes in the future

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('#toggle-mode');
    toggleButton.id = 'toggle-mode';
    toggleButton.textContent = '🌙';
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            toggleButton.textContent = '🌙';
            localStorage.removeItem('dark-mode');
        }
        else {
            toggleButton.textContent = '☀️';
            localStorage.setItem('dark-mode', 'true');
        }
    });

    toggleButton.textContent = (document.body.classList.contains('light-mode')) ? '🌙' : '☀️';

    // check preference
    const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)').matches && !localStorage.getItem('dark-mode');
    if (prefersLightScheme) toggleButton.click();
});