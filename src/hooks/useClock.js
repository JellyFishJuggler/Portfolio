import { useEffect, useState } from "react";

/**
 * Live clock in the site's timezone.
 * @param {string} timeZone - IANA name, e.g. "Asia/Kolkata".
 * @param {number} [intervalMs=15000] - refresh cadence.
 * @returns {string} formatted time, e.g. "10:26 PM".
 */
export function useClock(timeZone, intervalMs = 15000) {
  const fmt = () =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    })
      .format(new Date())
      .toUpperCase();

  const [time, setTime] = useState(fmt);

  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), intervalMs);
    return () => clearInterval(id);
  }, [timeZone, intervalMs]);

  return time;
}

export default useClock;
