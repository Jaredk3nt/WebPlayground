var input;
var source;
var order = 6;
var ngrams = {};

function preload() {
	input = loadStrings('markovSource.txt')
}

function setup() {
	source = input[0];
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i <= source.length - order; i++) {
		var gram = source.substring(i, i + order);

		if (!ngrams[gram]) {
			ngrams[gram] = [];
		}
		ngrams[gram].push(source.charAt(i + order));
	}

	var chains = produceChains(10);
	for(var i = 0; i < chains.length; i++) {
		text(chains[i]);
	}
}

function draw() {

}

function createChain() {
	var currentGram = source.substring(0, order);
	var result = currentGram;
	var running = true;

	while(running) {
		var possibilities = ngrams[currentGram];
		var next = possibilities[getRandom(possibilities.length)];
		result += next;
		currentGram = result.substring(result.length - order, result.length);

		if(result.charAt(result.length - 1) == '.') {
			if(result.length > 50) {
				running = false;
			}
		}
	}

	return result;
}

function getRandom(max) {
	max = Math.floor(max);
	return Math.floor(Math.random() * (max));
}

function produceChains(n) {
	var chains = [];
	for (var i = 0; i < n; i++) {
		chains.push(createChain());
	}
	return chains;
}

function printArray(array) {
	for (var i = 0; i < array.length; i++) {
		console.log(array[i] + "\n");
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
