const toggleButton = document.querySelector("#toggle-details");
const handleToggle = () => {
	const cards = document.querySelectorAll("project-card");
	const shouldExpand = [...cards].some(card => card.hasAttribute("compact"));
	cards.forEach(card => {
		card.toggleAttribute("compact", !shouldExpand);
	});
}
toggleButton.addEventListener("click", handleToggle);
