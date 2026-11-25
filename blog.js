const toggleButton = document.querySelector("#toggle-details");
const cards = document.querySelectorAll("project-card");

toggleButton.hidden = false;
let isExpanded = false;

const setDetailsMode = (expanded) => {
	isExpanded = expanded;

	cards.forEach(card => {
		card.toggleAttribute("compact", !isExpanded);
	});

	toggleButton.textContent = isExpanded ? "Collapse Details" : "Expand Details";
	toggleButton.setAttribute("aria-expanded", String(isExpanded));
}

let savedMode = null;

try {
	savedMode = localStorage.getItem("hw5-project-card-mode");
} catch (error) {
	console.warn("Could not read toggle:", error);
}

if (savedMode === "expanded") {
	setDetailsMode(true);
} else {
	setDetailsMode(false);
}
toggleButton.addEventListener("click", () => {
	setDetailsMode(!isExpanded);

	try {
		localStorage.setItem("hw5-project-card-mode", isExpanded ? "expanded" : "compact");
	} catch (error) {
		console.warn("Could not save toggle:", error);
	}
});
