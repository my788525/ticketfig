"use client";

import { useState } from "react";

interface IcsDeadlineButtonProps {
  title: string;
  description: string;
  daysFromNow?: number;
  targetDate?: string;
  url?: string;
  label?: string;
  filename?: string;
  className?: string;
}

function escapeIcsText(input: string): string {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function formatDateYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function formatUtcTimestamp(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

export default function IcsDeadlineButton({
  title,
  description,
  daysFromNow = 21,
  targetDate,
  url = "https://ticketfig.com/",
  label = "Add Court Deadline (.ics)",
  filename = "ticketfig-court-deadline.ics",
  className = "",
}: IcsDeadlineButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const now = new Date();
    let start: Date;
    if (targetDate) {
      const parsed = new Date(`${targetDate}T09:00:00`);
      start = Number.isNaN(parsed.getTime())
        ? new Date(now.getTime() + daysFromNow * 86400000)
        : parsed;
    } else {
      start = new Date(now.getTime() + daysFromNow * 86400000);
    }

    const end = new Date(start.getTime() + 86400000);
    const uid = `tf-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}@ticketfig.com`;

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TicketFig//2026 Statutory Defense//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatUtcTimestamp(now)}`,
      `DTSTART;VALUE=DATE:${formatDateYmd(start)}`,
      `DTEND;VALUE=DATE:${formatDateYmd(end)}`,
      `SUMMARY:${escapeIcsText(title)}`,
      `DESCRIPTION:${escapeIcsText(description)}`,
      ...(url ? [`URL:${url}`] : []),
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P2D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcsText(`48-Hour Reminder: ${title}`)}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const icsContent = lines.join("\r\n") + "\r\n";
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={
        className ||
        `px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border no-print ${
          downloaded
            ? "bg-[#059669] text-white border-[#059669]"
            : "bg-amber-50 hover:bg-amber-100 text-[#0f2747] border-[#c8a24a]/60"
        }`
      }
    >
      {downloaded ? "Downloaded .ics ✓" : label}
    </button>
  );
}
