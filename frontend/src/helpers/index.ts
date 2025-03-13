export const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = duration % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
