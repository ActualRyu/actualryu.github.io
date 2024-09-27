const releaseDates = [
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

function getUserTimezone() {
    const userOffset = -new Date().getTimezoneOffset() / 60;
    return timezones.find(tz => tz.offset === userOffset) || { name: 'Local', offset: userOffset };
}

function updateCountdown() {
    const now = new Date();
    const userTimezone = getUserTimezone();

    releaseDates.forEach((releaseDate, index) => {
        const countdownElement = document.getElementById(`countdown${index + 1}`);
        const adjustedReleaseDate = new Date(releaseDate.getTime() + (userTimezone.offset + 8) * 60 * 60 * 1000);
        const timeLeft = adjustedReleaseDate - now;

        if (timeLeft <= 0) {
            countdownElement.innerHTML = `<div>It's out now, go watch on <a href="https://www.netflix.com/title/81435684" target="_blank">Netflix.</a></div>`;
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <h2>Act ${index + 1}</h2>
                <div>${days}d ${hours}h ${minutes}m ${seconds}s</div>
                <div>${adjustedReleaseDate.toLocaleString()} (${userTimezone.name})</div>
            `;
        }
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();