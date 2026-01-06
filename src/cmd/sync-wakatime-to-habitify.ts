import { HABITIFY_TARGET_HABIT_ID, WAKATIME_TARGET_PROJECT } from "../constant";
import { updateHabitifyMinLog } from "../lib/habitify";
import { getTodayTimeForProject } from "../lib/wakatime";

async function main() {
	console.log("Syncing Wakatime data to Habitify...");

	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD\
	if (!today) {
		throw new Error("Failed to get today's date");
	}
	const totalSeconds = await getTodayTimeForProject(
		WAKATIME_TARGET_PROJECT,
		today,
	);
	const totalMinutes = Math.floor(totalSeconds / 60);

	const now = new Date();
	const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
	const timestamp = `${jst.toISOString().slice(0, 19)}+09:00`;

	await updateHabitifyMinLog(HABITIFY_TARGET_HABIT_ID, totalMinutes, timestamp);

	console.log("Sync completed.");
}

main().catch((err) => {
	console.error("Error during sync:", err);
	process.exit(1);
});
