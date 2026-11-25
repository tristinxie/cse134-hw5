# Homework 5 - Web Components, APIs, and Static Site Generation.

## SSG Exercise
### Folder
```
./ssg-exercise
```
### Pages
- Home: /
- About: /profile/

Other pages are linked in nav but do not work.

### Shared Component
The footer is defined `src/components/Footer.astro` and is used by both pages.

### Run Instructions
Install dependencies:
```
npm install
```

Start dev server:
```
npm run dev
```

Build static site:
```
npm run build
```

Preview generated site:
```
npm run preview
```

## Design and Visitor Task Flow
### Project Cards
The custom `<project-card>` Web Component allows us to easily define new blog or project posts on my portfolio in a reusable way. It allows users to easily explore them on my blog page. Each card has collapsible descriptions which is all controlled by an external button. The toggled preference is saved in localStorage. The hero image for the post supports multiple images and can be scrolled through with a previous and next button. To read the post, the user can click on the Read link to be taken to the article.

### Dog CEO API
For fun and whimsy each `<project-card>` contains a "Surprise Me with a Dog!" Button which uses the Dog CEO API to fetch a random dog image and appends it to the image list for that project card. 

When the user clicks the button we track the status of the request and it is displayed in the same status paragraph for the image number we are on. 

Fetch from `https://dog.ceo/api/breeds/image/random` which returns something like:
```
{
	message: dog-img-url
	status: success
}
```
States are handled like the following:
1. Loading: Displays `Loading...` and uses the fetch API
2. Success: Checks the HTTP response is valid and the URL is valid. The URL is appended to the card's image array. The new dog image is displayed through the DOM without reloading. The status is updated showing the dog was added and the current index and total image numbers.
3. Failure: The status shows an error message and the button is reenabled to let the user try again. The project images are unchanged.