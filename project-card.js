const projects = {
    blogReact: {
        title: "The End of React?",
        description: "This is a blog post about React",
		link: "/blog-post-1.html",
        images: [
            "assets/blog-post-1-hero-1.png",
            "assets/blog-post-1-hero-2.png",
        ]

    },
    blogEMC: {
        title: "Einstein's Mass-Energy Equivalence",
        description: "This is what Einstein stated.",
		link: "/extra-credit.html",
        images: [
            "assets/blog-post-2-hero-1.jpg",
            "assets/blog-post-2-hero-2.jpg",
        ]
    }
};


class ProjectCard extends HTMLElement {
	static get observedAttributes() {
		return ["compact"];
	}
	constructor() {
		super();
		this.currImgIdx = 0;
	}

	connectedCallback() {
		if (this.initialized) return;
		this.initialized = true;

		const projectId = this.getAttribute("project");
		this.project = projects[projectId];
		if (!this.project) {
			this.textContent = "Project not found.";
			return;
		}

		this.images = [...this.project.images];
		this.dogUrls = new Set();

		this.titleElem = document.createElement("h2");
		this.description = document.createElement("p");
		this.image = document.createElement("img");
		this.status = document.createElement("p");

		this.dogButton = document.createElement("button");
		this.dogButton.type = "button";
		this.dogButton.textContent = "Surprise me with a dog!";

		this.dogButton.addEventListener("click", () => {
			this.handleDogButton();
		});

		const buttonGroup = document.createElement("section");
		const prevButton = document.createElement("button");
		const nextButton = document.createElement("button");

		const readButton = document.createElement("a");


		this.titleElem.textContent = this.project.title;
		this.description.textContent = this.project.description;

		prevButton.type = "button";
		prevButton.textContent = "Previous";

		nextButton.type = "button";
		nextButton.textContent = "Next";

		prevButton.setAttribute("aria-label", "Previous image");
		nextButton.setAttribute("aria-label", "Next image");

		this.status.setAttribute("role", "status");

		prevButton.addEventListener("click", this.handlePrevButton);
		nextButton.addEventListener("click", this.handleNextButton);

		buttonGroup.append(prevButton, nextButton);

		readButton.setAttribute("href", this.project.link);
		readButton.textContent = "Read";
		this.append(this.titleElem, this.description, this.image, buttonGroup, this.status, readButton, this.dogButton);
		this.renderImage();
		this.updateCompactMode();
	}
	renderImage() {
		const imageCount = this.images.length;
		const imageUrl = this.images[this.currImgIdx];
		this.image.src = imageUrl;

		if (this.dogUrls.has(imageUrl)) {
			this.image.alt = "Random dog photo";
		} else {
			this.image.alt = `${this.project.title} image ${this.currImgIdx + 1}`;
		}

		this.status.textContent = `Image ${this.currImgIdx + 1} of ${imageCount}`;
	}
	
	async handleDogButton() {
		this.dogButton.disabled = true;
		this.status.textContent = "Loading dog...";
		try {
			const res = await fetch("https://dog.ceo/api/breeds/image/random");
			if (!res.ok) {
				throw new Error(`HTTP error: ${res.status}`);
			}

			const data = await res.json();
			if (data?.status !== "success" || typeof data?.message !== "string") {
				throw new Error ("Unexpected Response");
			}

			const imageUrl = new URL(data.message);

			if (imageUrl.protocol !== "https:") {
				throw new Error("Image URL must use HTTPS");
			}

			this.images.push(imageUrl.href);
			this.dogUrls.add(imageUrl.href);

			this.currImgIdx = this.images.length - 1;

			this.renderImage();
			this.status.textContent = `Dog added! ${this.currImgIdx + 1} of ${this.images.length}`;
		} catch (error) {
			console.error("failed to fetch dog image:", error);
			this.status.textContent = "Could not load dog image, Please try again."
		} finally {
			this.dogButton.disabled = false;
		}
	}
	handlePrevButton = () => {
		this.currImgIdx = (this.currImgIdx - 1 + this.images.length) % this.images.length;
		this.renderImage();
	}

	handleNextButton = () => {
		this.currImgIdx = (this.currImgIdx + 1) % this.images.length;
		this.renderImage();
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (name === "compact") {
			this.updateCompactMode();
		}
	}

	updateCompactMode() {
		if (this.description) {
			this.description.hidden = this.hasAttribute("compact");
		}
	}
}

customElements.define("project-card", ProjectCard);