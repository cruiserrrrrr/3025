export async function runWithConcurrency<T>(
    items: T[],
    limit: number,
    worker: (item: T) => Promise<void>,
): Promise<void> {
    let index = 0;
    const runners = Array.from(
        { length: Math.min(limit, items.length) },
        async () => {
            while (index < items.length) {
                const current = items[index++];
                await worker(current);
            }
        },
    );
    await Promise.all(runners);
}
