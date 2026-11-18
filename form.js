const form = document.getElementById("contact-form");
const fields = form.querySelectorAll("input:required, select:required, textarea:required")
const comments = document.getElementById("comments");

const errorArea = document.getElementById("error-area");
const infoArea = document.getElementById("info-area");
const commentsCount = document.getElementById("comments-count");

const form_errors = [];
const validateField = (field) => {
	field.setCustomValidity("");

	const fieldNames = {
		name: "Name",
		email: "Email",
		subject: "Subject",
		category: "Category",
		comments: "Comments"
	};

	const fieldName = fieldNames[field.id];
	let message = ""

	if (field.validity.valueMissing) {
		message = `${fieldName} is required.`;
	} else if (field.validity.typeMismatch) {
		message = `Please enter a correct ${fieldName}.`
	} else if (field.validity.tooShort) {
		message = `Please enter at least ${field.minLength} characters for ${fieldName}.`
	}

	field.setCustomValidity(message);
	return message;
}

const showFieldError = (field) => {
	const error = document.getElementById(`${field.id}-error`);
	error.textContent = validateField(field);
}

// On field interaction
const editedFields = new Set();
fields.forEach(field => {
	field.addEventListener("input", () => {
		editedFields.add(field);

		const error = document.getElementById(`${field.id}-error`);

		if (error.textContent !== "") {
			showFieldError(field);
		}
	});

	field.addEventListener("blur", () => {
		if (editedFields.has(field)){
			showFieldError(field);
		}
	});
});

const updateCommentsCount = () => {
	const remaining = comments.maxLength - comments.value.length;

	if (remaining === 0) {
		commentsCount.textContent = "Character limit reached.";
	} else if (remaining <= 100) {
		commentsCount.textContent = `Warning: Only ${remaining} characters renaming.`;
	} else {
		commentsCount.textContent = `${remaining} characters remaining.`;
	}

	commentsCount.classList.toggle("near-limit", remaining <= 100);
}

comments.addEventListener("input", updateCommentsCount);

updateCommentsCount();
infoArea.hidden = false;
errorArea.hidden = false;
// Record Form Errors
const submitButton = form.querySelector('button[type="submit"]');

const recordedAttempt = new Set();

submitButton.addEventListener("click", () => {
	recordedAttempt.clear();
})

form.addEventListener("invalid", (event) => {
	const field = event.target;

	if (recordedAttempt.has(field)) {
		return;
	}

	recordedAttempt.add(field);
	
	const message = validateField(field);
	document.getElementById(`${field.id}-error`).textContent = message;

	form_errors.push({
		field: field.id,
		error: message
	});
}, true);

// Submit Form Errors
const formErrors = document.getElementById("form-errors");
form.addEventListener("submit", () => {
	formErrors.value = JSON.stringify(form_errors);
})