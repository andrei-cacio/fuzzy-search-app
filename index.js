import * as wasm from "fuzzy-search";
import books from './books-db';
import lorem from './lorem';

const loremOpts = {
	isHardcore: false
};

async function renderLorem() {
	let text = await lorem.getLorem(loremOpts);


	document.getElementById('text').innerHTML = text;
	document.getElementById('searchField').disabled = false;
}

async function handleSearch(e) {
	const content = await lorem.getLorem(loremOpts);
	const query = e.target.value;
	const fuzzyed = wasm.fuzzy(query, content);

	const filteredBooks = wasm.filter_books({ col: books }, query);
	renderBooks(filteredBooks.col);

	document.getElementById('text').innerHTML = fuzzyed;
}

function jsFuzzy(query, content) {
	const rgx = new RegExp(query, 'g');

	return content.replace(rgx, i => `<span>${i}</span>`);
}

function renderBooks(books) {
	const booksContainer = document.getElementById('books');
	booksContainer.innerHTML = '';

	let booksHTML = '';

	books.forEach(book => {
		booksHTML += `<div class="book">${book.author} - ${book.title}</div>`;
	});

	booksContainer.innerHTML = booksHTML;
}


document.getElementById('searchField').addEventListener('input', handleSearch);

renderLorem();
renderBooks(books);
