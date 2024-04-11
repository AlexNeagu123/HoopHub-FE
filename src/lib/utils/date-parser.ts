export function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function statusToET(gameStatus: string) {
    if (gameStatus.trim() === "Final" || gameStatus.includes("Qtr") || gameStatus.includes("Halftime")) {
        return gameStatus;
    }

    const dateTimeParts = gameStatus.split("T");
    const dateStr = dateTimeParts[0];
    const timeStr = dateTimeParts[1].substring(0, 8); // Extract only the time part (hh:mm:ss)

    const [year, month, day] = dateStr.split("-");
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);

    const utcDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), hours, minutes, seconds)); // Month is zero-indexed

    const etTime = new Date(utcDate.toLocaleString('en-US', {timeZone: 'America/New_York'}));

    const etHours = etTime.getHours();
    const etMinutes = etTime.getMinutes().toString().padStart(2, '0');
    const amPmIndicator = etHours >= 12 ? 'PM' : 'AM';
    const formattedHours = etHours % 12 || 12; // Convert hours to 12-hour format
    return `${formattedHours}:${etMinutes} ${amPmIndicator} ET`;
}