const countdownDates = [
    new Date('November 9, 2024 00:00:00 PST'),
    new Date('November 16, 2024 00:00:00 PST'),
    new Date('November 23, 2024 00:00:00 PST')
];

const timezones = [
    { name: 'PST', offset: -8 },
    { name: 'CST', offset: -6 },
    { name: 'EST', offset: -5 },
    { name: 'GET', offset: 4 },
    { name: 'GMT', offset: 0 },
    { name: 'BRT', offset: -3 },
    { name: 'ART', offset: -3 },
    { name: 'GST', offset: 4 },
    { name: 'EEST', offset: 3 },
    { name: 'SGT', offset: 8 },
    { name: 'KST', offset: 9 },
    { name: 'JST', offset: 9 },
    { name: 'AEDT', offset: 11 }
];

function getLocalTimezone() {
    const offset = -new Date().getTimezoneOffset() / 60;
    const closestTimezone = timezones.reduce((prev, curr) => 
        Math.abs(curr.offset - offset) < Math.abs(prev.offset - offset) ? curr : prev
    );
    return closestTimezone;
}

function updateCountdown() {
    const now = new Date();
    const localTimezone = getLocalTimezone();

    countdownDates.forEach((date, index) => {
        const targetDate = new Date(date.getTime() + (localTimezone.offset + 8) * 60 * 60 * 1000);
        const timeLeft = targetDate - now;

        const countdownElement = document.querySelector(`#countdown${index + 1} .countdown-values`);

        if (timeLeft < 0) {
            // If the countdown has reached zero, update the text
            countdownElement.innerHTML = `
                <div>It's out now, go watch on <a href="https://www.netflix.com/title/81435684" target="_blank">Netflix.</a></div>`;
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div>${days}d</div>
                <div>${hours}h</div>
                <div>${minutes}m</div>
                <div>${seconds}s</div>
            `;
        }
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();

// Duplicate posters for endless scroll effect
const posterScroll = document.querySelector('.poster-scroll');
const posters = posterScroll.innerHTML;
posterScroll.innerHTML = posters + posters;

// Back button functionality
document.querySelector('.back-button').addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
});