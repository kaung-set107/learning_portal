export const Time = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    // Add leading zero if seconds < 10
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
}