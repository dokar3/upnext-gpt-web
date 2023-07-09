export namespace DateUtil {
  export function getStartAndEndOfDayMs(): [number, number] {
    const now = new Date();

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const startOfDayMs = startOfDay.getTime();
    const endOfDayMs = endOfDay.getTime();

    return [startOfDayMs, endOfDayMs];
  }

  export function getCurrentMinuteBounds(): [number, number] {
    const now = new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
      0
    ).getTime();
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      59,
      999
    ).getTime();
    return [start, end];
  }
}
