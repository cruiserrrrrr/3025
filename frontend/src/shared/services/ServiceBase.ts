abstract class ServiceBase {
    protected static async request<T>(
        endpoint: string,
        method: string,
        body?: unknown,
    ): Promise<T> {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        return (text ? JSON.parse(text) : undefined) as T;
    }

    protected static get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, "GET");
    }

    protected static post<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, "POST", body);
    }

    protected static delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, "DELETE");
    }
}

export default ServiceBase;
