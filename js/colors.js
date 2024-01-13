document.addEventListener("DOMContentLoaded", function() {
    const colors = ['blueviolet', 'crimson', 'blue', 'teal'];
    document.querySelectorAll('.folder').forEach((el, i) => {
        el.style.backgroundColor = colors[i % colors.length];
    });
});