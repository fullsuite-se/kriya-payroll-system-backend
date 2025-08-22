export const getIsoUTCNow = () => {
    return new Date().toISOString();
};

export const getCreatedUpdatedIsoUtcNow = (): { created_at: string, updated_at: string } => {
    const now = new Date().toISOString();
    return { created_at: now, updated_at: now };
};