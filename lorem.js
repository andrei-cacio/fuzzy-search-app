async function fetchLorem() {
	const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1');
	const lorem = await res.json();

	return Promise.resolve(lorem);
}

let original = null;
let lorem = null;
let hardcore = '';
async function getLorem(opts = { isHardcore: false }) {
	if (!lorem) {
		original = await fetchLorem();
		lorem = original.join('');
	}

	if (!hardcore && opts.isHardcore) {
		for (let i = 0; i < 50; i++) {
			hardcore += lorem;
		} 
	}

	if (opts.isHardcore) {
		return Promise.resolve(hardcore);
	}

	return Promise.resolve(lorem);
}


export default {
	fetchLorem,
	getLorem
}