import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number using the Indian numbering system (e.g. 154000 -> "1,54,000").
 *
 * @param {number|string} value
 * @returns {string}
 */
export function formatIndianNumber(value) {
  if (value === null || value === undefined || value === "") return "0";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "0";
  // convert to string without decimals
  const [integer, decimal] = num.toString().split(".");
  let lastThree = integer.slice(-3);
  const otherDigits = integer.slice(0, -3);
  if (otherDigits !== "") {
    lastThree = "," + lastThree;
  }
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formattedOther + lastThree + (decimal ? "." + decimal : "");
}
export const formatDateRange = (start, end) => {
  const startFormatted = new Date(start)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "");

  if (!end || start === end) {
    return startFormatted;
  }

  const endFormatted = new Date(end)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "");

  return `${startFormatted} - ${endFormatted}`;
};
 export const formatDuration = (minutes) => {
    if (!minutes) return "";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hrs} Hours` : `${hrs}h ${mins}m`;
  };

  export const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
}


