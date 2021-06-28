function getCurrentDate() {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = today.toLocaleString("default", { month: "long" });
	const year = today.getFullYear();

	return `${month} ${day}, ${year}`;
}

export default getCurrentDate;
