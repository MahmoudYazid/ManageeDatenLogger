export function formatToISO8601(dateString) {
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
  
    // Add 12 hours (12 * 60 * 60 * 1000 milliseconds)
    date.setHours(date.getHours() + 12);
  
    return date.toISOString();
  }
  