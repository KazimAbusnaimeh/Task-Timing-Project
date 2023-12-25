export const formatTime = (timer) => {
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${pad(timer.hours)}:${pad(timer.minutes)}:${pad(timer.seconds)}`;
  };