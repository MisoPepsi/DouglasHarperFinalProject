/*1. createElemWithText
a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is an empty string.
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element.*/
function createElemWithText(elemType = "p", text = "", className) {
	const element = document.createElement(elemType);
	element.textContent = text;
	if (className) element.className = className;
	return element;
}

/*2. createSelectOptions
a. Receives users JSON data as a parameter
b. Returns undefined if no parameter received
c. Loops through the users data
d. Creates an option element for each user
e. Assigns user.id → option.value
f. Assigns user.name → option.textContent
g. Return an array of option elements*/
function createSelectOptions(users) {
	if (!users) return;

	const optionsArray = [];

	for (const user of users) {
		const option = document.createElement("option");
		option.value = String(user.id);
		option.textContent = user.name;
		optionsArray.push(option);
	}

	return optionsArray;
}

/*3. toggleCommentSection
a. Receives a postId as the parameter
b. Selects the section with data-post-id == postId
c. Verify section exists before accessing classList
d. Toggles the 'hide' class on the section
e. Return the section element*/
function toggleCommentSection(postId) {
	if (!postId) return undefined;

	const section = document.querySelector(`section[data-post-id="${postId}"]`);
	if (!section) return null;

	section.classList.toggle("hide");
	return section;
}

/*4. toggleCommentButton
a. Receives a postId
b. Select the button with data-post-id == postId
c. If textContent is 'Show Comments', switch to 'Hide Comments'
d. If textContent is 'Hide Comments', switch to 'Show Comments'
e. Try a ternary operator
f. Return the button element*/
function toggleCommentButton(postId) {
	if (!postId) return undefined;

	const button = document.querySelector(`button[data-post-id="${postId}"]`);
	if (!button) return null;

	button.textContent =
		button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";

	return button;
}

/*5. deleteChildElements
a. Receives a parentElement
b. Let child = parentElement.lastElementChild
c. While child exists:
d.     removeChild(child)
e.     child = parentElement.lastElementChild
f. Return parentElement*/
function deleteChildElements(parentElement) {
	if (!(parentElement instanceof Element)) return;

	while (parentElement.lastElementChild) {
		parentElement.removeChild(parentElement.lastElementChild);
	}

	return parentElement;
}

/*6. addButtonListeners
a. Selects all buttons inside <main>
b. If buttons exist:
c.	Loop through them
d.	Retrieve button.dataset.postId
e.	If postId exists, add a click event listener
f.	Listener calls: toggleComments(event, postId)
g.	Return the NodeList/array of buttons*/
function addButtonListeners() {
	const buttons = document.querySelectorAll("main button");

	for (const button of buttons) {
		const postId = button.dataset.postId;
		if (!postId) continue;

		button.addEventListener("click", (event) => {
			toggleComments(event, postId);
		});
	}

	return buttons;
}


/*7. removeButtonListeners
a. Selects all buttons inside <main>
b. Loops through buttons
c. Retrieve button.dataset.postId
d. If postId exists, remove click event listener
e. Nearly identical to addButtonListeners
f. Return the buttons*/
function removeButtonListeners() {
	const buttons = document.querySelectorAll("main button");

	for (const button of buttons) {
		const postId = button.dataset.postId;
		if (!postId) continue;

		button.replaceWith(button.cloneNode(true)); // clears listeners
	}

	return buttons;
}

/*8. createComments
a. Depends on createElemWithText
b. Receives JSON comments
c. Creates a DocumentFragment
d. For each comment:
e.   Create <article>
f.   h3 = createElemWithText('h3', comment.name)
g.   p = createElemWithText('p', comment.body)
h.   p = createElemWithText('p', `From: ${comment.email}`)
i. Append all to article
j. Append article to fragment
k. Return fragment*/
function createComments(comments) {
	if (!comments) return;

	const fragment = document.createDocumentFragment();

	for (const comment of comments) {
		const article = document.createElement("article");

		const h3 = createElemWithText("h3", comment.name);
		const pBody = createElemWithText("p", comment.body);
		const pEmail = createElemWithText("p", `From: ${comment.email}`);

		article.append(h3, pBody, pEmail);
		fragment.append(article);
	}

	return fragment;
}

/*9. populateSelectMenu
a. Depends on createSelectOptions
b. Receives users JSON
c. Select #selectMenu
d. Pass users to createSelectOptions()
e. Loop through options and append each
f. Return selectMenu*/
function populateSelectMenu(users) {
	if (users === undefined) return undefined;

	const selectMenu = document.querySelector("#selectMenu");

	while (selectMenu.options.length > 1) {
		selectMenu.remove(1);
	}

	const options = createSelectOptions(users);
	for (const opt of options) selectMenu.append(opt);

	return selectMenu;
}

/*10. getUsers
a. Fetch: https://jsonplaceholder.typicode.com/users
b. async function
c. try/catch
d. Use fetch() + await
e. Return JSON data*/
async function getUsers() {
	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/users");
		return await res.json();
	} catch (err) {
		console.error(err);
		return [];
	}
}

/*11. getUserPosts
a. Receives userId
b. Fetch posts?userId=${userId}
c. async + try/catch
d. Return JSON*/
async function getUserPosts(userId) {
	if (userId === undefined) return undefined;

	try {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/posts?userId=${userId}`
		);
		return await res.json();
	} catch (err) {
		console.error(err);
		return [];
	}
}

/*12. getUser
a. Receives userId
b. Fetch /users/${userId}
c. async + try/catch
d. Return JSON*/
async function getUser(userId) {
	if (userId === undefined) return undefined;

	try {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}`
		);
		return await res.json();
	} catch (err) {
		console.error(err);
		return null;
	}
}

/*13. getPostComments
a. Receives postId
b. Fetch /comments?postId=${postId}
c. async + try/catch
d. Return JSON*/
async function getPostComments(postId) {
	if (postId === undefined) return undefined;

	try {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
		);
		return await res.json();
	} catch (err) {
		console.error(err);
		return [];
	}
}

/*14. displayComments
a. Depends on getPostComments, createComments
b. async function
c. Receives postId
d. Creates <section>
e. section.dataset.postId = postId
f. Adds 'comments' and 'hide'
g. comments = await getPostComments(postId)
h. fragment = createComments(comments)
i. Append fragment → section
j. Return section*/
async function displayComments(postId) {
	if (postId === undefined) return undefined;

	const section = document.createElement("section");

	section.dataset.postId = postId;

	section.classList.add("comments", "hide");

	const comments = await getPostComments(postId);

	const fragment = createComments(comments);

	section.append(fragment);
	
	return section;
}

/*15. createPosts
a. Depends on createElemWithText, getUser, displayComments
b. async function
c. Receives posts
d. Creates DocumentFragment
e. For each post:
f.   Create <article>
g.   h2: post.title
h.   p: post.body
i.   p: `Post ID: ${post.id}`
k.   author = await getUser(post.userId)
l.   p: `Author: ${author.name} with ${author.company.name}`
m.   p: author.company.catchPhrase
n.   button: "Show Comments"
o.   button.dataset.postId = post.id
q.   section = await displayComments(post.id)
r. Append everything → article
s. Append article → fragment
t. Return fragment*/
async function createPosts(posts) {
	if (posts === undefined) return undefined;

	const fragment = document.createDocumentFragment();

	for (const post of posts) {
		const article = document.createElement("article");

		const h2 = createElemWithText("h2", post.title);

		const pBody = createElemWithText("p", post.body);

		const pId = createElemWithText("p", `Post ID: ${post.id}`);

		const author = await getUser(post.userId);

		const pAuthor = createElemWithText(
			"p",
			`Author: ${author.name} with ${author.company.name}`
		);
		const pPhrase = createElemWithText("p", author.company.catchPhrase);

		const button = document.createElement("button");

		button.textContent = "Show Comments";

		button.dataset.postId = post.id;

		const section = await displayComments(post.id);

		article.append(h2, pBody, pId, pAuthor, pPhrase, button, section);

		fragment.append(article);
	}

	return fragment;
}

/*16. displayPosts
a. Depends on createPosts, createElemWithText
b. async function
c. Receives posts
d. Select <main>
e. If posts exist: element = await createPosts(posts)
   Else: element = <p> identical to HTML default
f. Append element to main
g. Return element*/
let DEFAULT_MAIN_TEXT = null;

function getDefaultMainText(main) {
	if (DEFAULT_MAIN_TEXT !== null) return DEFAULT_MAIN_TEXT;

	const p =
		main.querySelector("p.default-text") || document.querySelector("p.default-text");

	DEFAULT_MAIN_TEXT = p ? p.textContent : "";
	return DEFAULT_MAIN_TEXT;
}

async function displayPosts(posts) {
	const main = document.querySelector("main");

	const element =
		posts === undefined
			? createElemWithText("p", getDefaultMainText(main), "default-text"): await createPosts(posts);

	main.append(element);
	return element;
}
/*17. toggleComments
a. Depends on toggleCommentSection, toggleCommentButton
b. Receives (event, postId)
c. event.target.listener = true
d. section = toggleCommentSection(postId)
e. button = toggleCommentButton(postId)
f. Return [section, button]*/
function toggleComments(event, postId) {
	if (!event || postId === undefined) return undefined;

	event.target.listener = true;

	const section = toggleCommentSection(postId);

	const button = toggleCommentButton(postId);

	return [section, button];
}

/*18. refreshPosts
a. Depends on removeButtonListeners, deleteChildElements, displayPosts, addButtonListeners
b. async function
c. Receives posts
d. removeButtons = removeButtonListeners()
e. mainElement = deleteChildElements(main)
f. fragment = await displayPosts(posts)
g. addButtons = addButtonListeners()
h. Return [removeButtons, mainElement, fragment, addButtons]*/
async function refreshPosts(posts) {
	if (posts === undefined) return undefined;

	const removeButtons = removeButtonListeners();

	const main = document.querySelector("main");

	const mainElement = deleteChildElements(main);

	const fragment = await displayPosts(posts);

	const addButtons = addButtonListeners();

	return [removeButtons, mainElement, fragment, addButtons];
}



/*19. selectMenuChangeEventHandler
	a. Depends on getUserPosts, refreshPosts
	b. async function
	c. Receives event
	d. Disable select (event.target.disabled = true)
	e. userId = event.target.value || 1
	f. Validate userId (use isNaN); if invalid or missing, fallback to 1
	g. posts = await getUserPosts(userId)
	h. refreshPostsArray = await refreshPosts(posts)
	i. Enable select
	j. Return [userId, posts, refreshPostsArray] */
	async function selectMenuChangeEventHandler(event) {

	if (!event || event.type !== "change") return undefined;

	const select = event.target;

	if (!select) return undefined;

	select.disabled = true;

	const userId = Number(select.value) || 1;

	const posts = await getUserPosts(userId);

	const refreshPostsArray = await refreshPosts(posts);

	select.disabled = false;

	return [userId, posts, refreshPostsArray];
}

/*20. initPage
a. Depends on getUsers, populateSelectMenu
b. async function
c. users = await getUsers()
d. select = populateSelectMenu(users)
e. Return [users, select]*/
async function initPage() {
	const users = await getUsers();

	const select = populateSelectMenu(users);

	return [users, select];
}

/*21. initApp
a. Depends on initPage, selectMenuChangeEventHandler
b. Call initPage()
c. Select #selectMenu
d. Add 'change' listener → selectMenuChangeEventHandler
e. Returns nothing*/
function initApp() {
	initPage();

	const selectMenu = document.querySelector("#selectMenu");

	if (selectMenu) selectMenu.addEventListener("change", selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", initApp);