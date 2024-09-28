function timeAgo(timestampInSeconds) {
	// Convert the timestamp in seconds to milliseconds for JavaScript Date
	const date = new Date(timestampInSeconds * 1000);

	const seconds = Math.floor((new Date() - date) / 1000);
	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const [unit, value] of Object.entries(intervals)) {
		const count = Math.floor(seconds / value);
		if (count >= 1) {
			return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
		}
	}
	return "just now";
}
export { timeAgo };
