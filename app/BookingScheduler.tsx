"use client";

import { useEffect, useMemo, useState } from "react";

type CalendarDay = {
  label: string;
  state?: string;
};

type CalendarDisplayDay = CalendarDay & {
  date: Date | null;
  isToday: boolean;
  isUnavailable: boolean;
  key: string;
};

type ScheduleCopy = {
  kicker: string;
  title: string;
  text: string;
  panelKicker: string;
  panelTitle: string;
  panelText: string;
  calendarAria: string;
  month: string;
  prevMonth: string;
  nextMonth: string;
  weekdays: readonly string[];
  selectedPrefix: string;
  selectedDate: string;
  dateLabel: string;
  timeLabel: string;
  serviceLabel: string;
  service: string;
  duration: string;
  submit: string;
  secondary: string;
  times: readonly string[];
  timezone: string;
  chooseDate: string;
  chooseTime: string;
  closePicker: string;
  dateSheetTitle: string;
  timeSheetTitle: string;
};

const iconPaths = {
  calendar:
    "M7 3v3m10-3v3M4.5 9.2h15M6.2 5h11.6A2.2 2.2 0 0 1 20 7.2v10.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8V7.2A2.2 2.2 0 0 1 6.2 5Zm2.6 8h.1m3.1 0h.1m3.1 0h.1m-6.5 3h.1m3.1 0h.1",
  check: "m5 12.4 4.1 4.1L19 6.8",
  clock: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4.2V12l3 1.8",
} as const;

const monthIndexes: Record<string, number> = {
  january: 0,
  janeiro: 0,
  february: 1,
  fevereiro: 1,
  march: 2,
  marco: 2,
  março: 2,
  april: 3,
  abril: 3,
  may: 4,
  maio: 4,
  june: 5,
  junho: 5,
  july: 6,
  julho: 6,
  august: 7,
  agosto: 7,
  september: 8,
  setembro: 8,
  october: 9,
  outubro: 9,
  november: 10,
  novembro: 10,
  december: 11,
  dezembro: 11,
};

function parseScheduleMonth(month: string) {
  const [monthName = "", year = ""] = month.toLocaleLowerCase("pt-BR").split(/\s+/);

  return {
    monthIndex: monthIndexes[monthName] ?? 0,
    year: Number.parseInt(year, 10) || new Date().getFullYear(),
  };
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(date: Date, other: Date) {
  return date.getFullYear() === other.getFullYear()
    && date.getMonth() === other.getMonth()
    && date.getDate() === other.getDate();
}

function MiniIcon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg className="mini-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function BookingScheduler({
  calendarRows,
  schedule,
}: {
  calendarRows: readonly (readonly CalendarDay[])[];
  schedule: ScheduleCopy;
}) {
  const [now] = useState(() => new Date());
  const { monthIndex, year } = useMemo(() => parseScheduleMonth(schedule.month), [schedule.month]);
  const today = useMemo(() => startOfDay(now), [now]);
  const calendarDays = useMemo<CalendarDisplayDay[]>(() => {
    const flatDays = calendarRows.flat();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    return flatDays.map((day, index) => {
      const dayOfMonth = index - firstWeekday + 1;
      const labelNumber = Number.parseInt(day.label, 10);
      const isCurrentMonth = dayOfMonth >= 1
        && dayOfMonth <= daysInMonth
        && labelNumber === dayOfMonth;
      const date = isCurrentMonth ? new Date(year, monthIndex, dayOfMonth) : null;
      const dayStart = date ? startOfDay(date) : null;
      const isWeekend = date ? [0, 6].includes(date.getDay()) : true;
      const isPast = dayStart ? dayStart < today : true;

      return {
        ...day,
        date,
        isToday: Boolean(date && isSameDay(date, today)),
        isUnavailable: day.state === "muted" || !date || isWeekend || isPast,
        key: `${day.label}-${index}`,
      };
    });
  }, [calendarRows, monthIndex, today, year]);
  const availableDays = useMemo(
    () => calendarDays.filter((day) => !day.isUnavailable),
    [calendarDays],
  );
  const defaultDay =
    availableDays.find((day) => day.state === "selected")?.label ?? availableDays[0]?.label ?? "22";
  const defaultTime = schedule.times.find((time) => time === "14:00") ?? schedule.times[0] ?? "";
  const [requestedDay, setRequestedDay] = useState(defaultDay);
  const [requestedTime, setRequestedTime] = useState(defaultTime);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activeSheet, setActiveSheet] = useState<"date" | "time" | null>(null);
  const monthName = schedule.month.replace(/\s+\d{4}$/, "");
  const selectedDay = availableDays.some((day) => day.label === requestedDay)
    ? requestedDay
    : defaultDay;
  const selectedDate = availableDays.find((day) => day.label === selectedDay)?.date ?? null;
  const availableTimes = useMemo(
    () => schedule.times.filter((time) => {
      if (!selectedDate) {
        return false;
      }

      if (startOfDay(selectedDate) < today) {
        return false;
      }

      if (!isSameDay(selectedDate, today)) {
        return true;
      }

      const [hour = "0", minute = "0"] = time.split(":");
      const slotDate = new Date(selectedDate);
      slotDate.setHours(Number.parseInt(hour, 10), Number.parseInt(minute, 10), 0, 0);

      return slotDate > now;
    }),
    [now, schedule.times, selectedDate, today],
  );
  const selectedTime = availableTimes.includes(requestedTime)
    ? requestedTime
    : availableTimes.find((time) => time === "14:00") ?? availableTimes[0] ?? "";
  const selectedSummary = `${selectedDay} ${monthName} · ${selectedTime}`;

  useEffect(() => {
    if (!activeSheet) {
      return;
    }

    document.documentElement.classList.add("booking-sheet-open");
    document.body.classList.add("booking-sheet-open");

    return () => {
      document.documentElement.classList.remove("booking-sheet-open");
      document.body.classList.remove("booking-sheet-open");
    };
  }, [activeSheet]);

  const selectAdjacentDay = (direction: -1 | 1) => {
    const index = availableDays.findIndex((day) => day.label === selectedDay);
    const nextIndex = Math.min(Math.max(index + direction, 0), availableDays.length - 1);
    setRequestedDay(availableDays[nextIndex]?.label ?? selectedDay);
    setIsConfirmed(false);
  };

  const chooseDay = (day: CalendarDisplayDay, openTime = false) => {
    if (day.isUnavailable) {
      return;
    }

    setRequestedDay(day.label);
    setIsConfirmed(false);

    if (openTime) {
      setActiveSheet("time");
    }
  };

  const chooseTime = (time: string, closeAfter = false) => {
    if (!availableTimes.includes(time)) {
      return;
    }

    setRequestedTime(time);
    setIsConfirmed(false);

    if (closeAfter) {
      setActiveSheet(null);
    }
  };

  const calendarGrid = (openTimeAfterSelect = false) => (
    <div className="calendar-grid">
      {schedule.weekdays.map((day) => (
        <span className="calendar-weekday" key={day}>
          {day}
        </span>
      ))}
      {calendarDays.map((day) => {
        const isUnavailable = day.isUnavailable;
        const isSelected = !isUnavailable && day.label === selectedDay;

        return (
          <button
            className={[
              "calendar-day",
              isUnavailable ? "is-muted" : "",
              !isUnavailable && day.isToday ? "is-today" : "",
              isSelected ? "is-selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={isUnavailable}
            key={day.key}
            onClick={() => chooseDay(day, openTimeAfterSelect)}
            type="button"
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );

  const timeButtons = (closeAfterSelect = false) => (
    <div className="booking-slots" aria-label={schedule.timeLabel}>
      {schedule.times.map((time) => (
        <button
          className={time === selectedTime ? "is-selected" : ""}
          disabled={!availableTimes.includes(time)}
          onClick={() => chooseTime(time, closeAfterSelect)}
          type="button"
          key={time}
        >
          {time}
        </button>
      ))}
    </div>
  );

  return (
    <form
      className="booking-panel reveal"
      onSubmit={(event) => {
        event.preventDefault();
        if (!selectedDate || !availableTimes.includes(selectedTime)) {
          return;
        }

        setIsConfirmed(true);
      }}
    >
      <div className="booking-panel-head">
        <span>{schedule.panelKicker}</span>
        <h2>{schedule.panelTitle}</h2>
        <p>{schedule.panelText}</p>
      </div>

      <div className="booking-mobile-flow">
        <div className="booking-mobile-intro">
          <span>{schedule.kicker}</span>
          <strong>{schedule.title}</strong>
          <p>{schedule.text}</p>
        </div>
        <div className="booking-mobile-summary">
          <div>
            <span>{schedule.service}</span>
            <strong>{selectedSummary}</strong>
          </div>
          <em>{schedule.duration}</em>
        </div>
        <div className="booking-mobile-choices">
          <button type="button" onClick={() => setActiveSheet("date")}>
            <MiniIcon name="calendar" />
            <span>
              <small>{schedule.chooseDate}</small>
              <strong>{selectedDay} {monthName}</strong>
            </span>
          </button>
          <button type="button" onClick={() => setActiveSheet("time")}>
            <MiniIcon name="clock" />
            <span>
              <small>{schedule.chooseTime}</small>
              <strong>{selectedTime}</strong>
            </span>
          </button>
        </div>
        <div className="booking-actions">
          <button className="booking-submit" type="submit">
            {schedule.submit}
          </button>
        </div>
        <p className="booking-status" aria-live="polite">
          {isConfirmed ? `${schedule.selectedPrefix}: ${selectedSummary}` : "\u00a0"}
        </p>
      </div>

      <div className="booking-picker-card">
        <div className="booking-picker-top">
          <span>{schedule.panelKicker}</span>
          <strong>{selectedDay} {monthName}</strong>
          <em>{schedule.duration}</em>
        </div>

        <div className="calendar-card" aria-label={schedule.calendarAria}>
          <div className="calendar-title">
            <span>
              <MiniIcon name="calendar" />
              {schedule.dateLabel}
            </span>
          </div>
          <div className="calendar-month">
            <button
              type="button"
              aria-label={schedule.prevMonth}
              onClick={() => selectAdjacentDay(-1)}
            >
              ‹
            </button>
            <strong>{schedule.month}</strong>
            <button
              type="button"
              aria-label={schedule.nextMonth}
              onClick={() => selectAdjacentDay(1)}
            >
              ›
            </button>
          </div>
          {calendarGrid()}
          <p className="selected-date">
            <span>{schedule.selectedPrefix}</span>
            <strong>{selectedSummary}</strong>
          </p>
        </div>

        <div className="time-card">
          <span>
            <MiniIcon name="clock" />
            {schedule.timeLabel}
          </span>
          {timeButtons()}
        </div>

        <div className="booking-actions">
          <button className="booking-submit" type="submit">
            {schedule.submit}
          </button>
          <a href="https://www.instagram.com/brunatinoconutri/" target="_blank" rel="noreferrer">
            {schedule.secondary}
          </a>
        </div>
        <p className="booking-note">
          {schedule.service} · {schedule.timezone}
        </p>
        <p className="booking-status" aria-live="polite">
          {isConfirmed ? `${schedule.selectedPrefix}: ${selectedSummary}` : "\u00a0"}
        </p>
      </div>

      {activeSheet ? (
        <div
          className="booking-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={activeSheet === "date" ? schedule.dateSheetTitle : schedule.timeSheetTitle}
        >
          <button
            className="booking-sheet-backdrop"
            type="button"
            aria-label={schedule.closePicker}
            onClick={() => setActiveSheet(null)}
          />
          <div className="booking-sheet-panel">
            <div className="booking-sheet-head">
              <span>{schedule.service}</span>
              <h3>{activeSheet === "date" ? schedule.dateSheetTitle : schedule.timeSheetTitle}</h3>
              <button
                type="button"
                aria-label={schedule.closePicker}
                onClick={() => setActiveSheet(null)}
              >
                <span />
                <span />
              </button>
            </div>

            {activeSheet === "date" ? (
              <div className="calendar-card" aria-label={schedule.calendarAria}>
                <div className="calendar-month">
                  <button
                    type="button"
                    aria-label={schedule.prevMonth}
                    onClick={() => selectAdjacentDay(-1)}
                  >
                    ‹
                  </button>
                  <strong>{schedule.month}</strong>
                  <button
                    type="button"
                    aria-label={schedule.nextMonth}
                    onClick={() => selectAdjacentDay(1)}
                  >
                    ›
                  </button>
                </div>
                {calendarGrid(true)}
              </div>
            ) : (
              <div className="time-card">
                <span>
                  <MiniIcon name="clock" />
                  {selectedDay} {monthName}
                </span>
                {timeButtons(true)}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </form>
  );
}
