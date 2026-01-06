export const updateHabitifyMinLog = async (
	habitId: string,
	min: number,
	date: string, // YYYY-MM-DDTHH:MM:SS+timezone
) => {
	const url = `https://api.habitify.me/logs/${encodeURIComponent(habitId)}`;

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `${process.env.HABITIFY_API_KEY}`,
		},
		body: JSON.stringify({
			target_date: date,
			unit_type: "min",
			value: min,
		}),
	});
	if (!res.ok) {
		console.log(await res.text());
		throw new Error(
			`Failed to set Habitify status: ${res.status} ${res.statusText}`,
		);
	}
};
