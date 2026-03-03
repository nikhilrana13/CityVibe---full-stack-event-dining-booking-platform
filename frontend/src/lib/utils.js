import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//  Format a number using the Indian numbering system (e.g. 154000 -> "1,54,000").
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
  // if neither date provided, return empty string
  if (!start && !end) return "";
  // helper to format a single date consistently
  const formatSingle = (d) =>
    new Date(d)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(/,/g, "");

  if (start && !end) {
    return formatSingle(start);
  }
  if (!start && end) {
    return formatSingle(end);
  }
  // both dates provided
  const startFormatted = formatSingle(start);
  const endFormatted = formatSingle(end);
  if (start === end) {
    return startFormatted;
  }
  return `${startFormatted} - ${endFormatted}`;
};
 export const formatDuration = (duration) => {
  if (!duration) return "NA"

  const value = duration.toString().toLowerCase().trim()
  // If already contains hours → return clean capitalized version
  if (value.includes("hour")) {
    return value.replace(/\b\w/g, c => c.toUpperCase())
  }
  // If contains minutes
  if (value.includes("min")) {
    const minutes = parseInt(value)
    if (isNaN(minutes)) return duration

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours && remainingMinutes) {
      return `${hours}h ${remainingMinutes}m`
    }
    if (hours) {
      return `${hours}h`
    }
    return `${remainingMinutes}m`
  }
  // If just number (like 180)
  const numeric = parseInt(value)
  if (!isNaN(numeric)) {
    const hours = Math.floor(numeric / 60)
    const remainingMinutes = numeric % 60

    if (hours && remainingMinutes) {
      return `${hours}h ${remainingMinutes}m`
    }
    if (hours) {
      return `${hours}h`
    }
    return `${remainingMinutes}m`
  }
  return duration
  };
  /**
   * Convert a 24‑hour time string ("HH:mm" or "HH:mm:ss") to 12‑hour with am/pm
   * e.g. "14:30" -> "2:30 PM". Returns empty string for falsy input.
   */
  export const formatTime = (time) => {
    if (!time) return "";
    const [hourPart, minutePart] = time.split(":");
    if (hourPart == null || minutePart == null) return time;
    let hour = parseInt(hourPart, 10);
    const minute = minutePart.substring(0,2);
    const ampm = hour >= 12 ? "PM" : "AM";
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return `${hour}:${minute} ${ampm}`;
  };

  

export const generateSlug = (text) => slugify(text || "", { lower: true, strict: true })


