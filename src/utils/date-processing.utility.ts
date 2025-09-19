export const diffDaysExcluding = (
    from: Date,
    to: Date,
    excludeDays: number[] = []
): number => {
    const excludeSet: Set<number> = new Set(excludeDays);

    // Normalize times to midnight
    let start: Date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    let end: Date = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    if (start > end) [start, end] = [end, start]; // swap if needed

    let count = 0;
    while (start <= end) {
        if (!excludeSet.has(start.getDay())) {
            count++;
        }
        start.setDate(start.getDate() + 1);
    }

    return count;
};
