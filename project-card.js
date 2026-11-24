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

		this.titleElem = document.createElement("h2");
		this.description = document.createElement("p");
		this.image = document.createElement("img");
		this.status = document.createElement("p");

		const buttonGroup = document.createElement("section");
		const prevButton = document.createElement("button");
		const nextButton = document.createElement("button");

		const readButton = document.createElement("a");

		this.titleElem.textContent = this.project.title;
		this.description.textContent = this.project.description;

		prevButton.type = "button";
		prevButton.textContent = "<";

		nextButton.type = "button";
		nextButton.textContent = ">";

		this.status.setAttribute("role", "status");

		prevButton.addEventListener("click", this.handlePrevButton);
		nextButton.addEventListener("click", this.handleNextButton);

		buttonGroup.append(prevButton, nextButton);

		readButton.setAttribute("href", this.project.link);
		readButton.textContent = "Read"
		this.append(this.titleElem, this.description, this.image, buttonGroup, this.status, readButton);
		this.renderImage();
		this.updateCompactMode();
	}
	renderImage() {
		this.image.src = this.project.images[this.currImgIdx];
		this.image.alt = `${this.project.title} image ${this.currImgIdx + 1}`;
		this.status.textContent = `Image ${this.currImgIdx + 1} of ${this.project.images.length}`;
	}
	handlePrevButton = () => {
		this.currImgIdx = (this.currImgIdx - 1 + this.project.images.length) % this.project.images.length;
		this.renderImage();
	}

	handleNextButton = () => {
		this.currImgIdx = (this.currImgIdx + 1) % this.project.images.length;
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