export const getIsoUTCNow = () => {
    return new Date().toISOString();
};

export const getCreatedUpdatedIsoUtcNow = (): { created_at: string, updated_at: string } => {
    const now = new Date().toISOString();
    return { created_at: now, updated_at: now };
};

export const convertToISO8601 = (date: Date | string | number | null | undefined): string | null => {
    if (!date) return null;

    const d = new Date(date);

    // if (isNaN(d.getTime())) return null; // invalid date

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


//this will return a Date
// export const convertToISO8601Date = (date: string): Date => {

//     const d = new Date(date);

//     const year = d.getFullYear();
//     const month = d.getMonth();
//     const day = d.getDate();

//     return new Date(Date.UTC(year, month, day));
// };

// export const convertToISO8601Date = (date: string): Date | null => {
//     const d = new Date(date);

//     if (isNaN(d.getTime())) {
//         return null;
//     }

//     const year = d.getFullYear();
//     const month = d.getMonth();
//     const day = d.getDate();

//     return new Date(Date.UTC(year, month, day));
// };
