/**
 * Truncates a text to a specified length and appends an ellipsis if necessary.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text with an ellipsis if it exceeds the maximum length.
 */
export const truncateText = (text: string, maxLength: number = 10): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + "...";
};
