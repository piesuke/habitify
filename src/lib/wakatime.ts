import { WAKATIME_API_KEY } from "../constant";

type WakaSummariesResponse = {
  data?: Array<{
    projects?: Array<{ name: string; total_seconds: number }>;
    grand_total?: { total_seconds: number };
  }>;
};

export const getTodayTimeForProject = async (
    project: string,
    date: string // YYYY-MM-DD
) => {
    const url =
        `https://wakatime.com/api/v1/users/current/summaries` +
        `?start=${encodeURIComponent(date)}` +
        `&end=${encodeURIComponent(date)}` +
        `&project=${encodeURIComponent(project)}`;

    const res = (await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${WAKATIME_API_KEY}:`).toString("base64")}`,
        },
    }))
    if(!res.ok) {
        throw new Error(`Failed to fetch Wakatime data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json() as WakaSummariesResponse;

    const totalSeconds = data.data?.[0]?.grand_total?.total_seconds || 0;
    return totalSeconds;
}