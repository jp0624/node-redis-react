const express = require('express')
const app = express()
app.get('/api', (req, res) => {
const fs = require('fs')

function decode(message_file) {
	// Read the encoded message file synchronously
	const data = fs.readFileSync(message_file, 'utf8')

	// Split data into lines and filter out empty lines
	const lines = data
		.trim()
		.split('\n')
		.filter((line) => line.trim() !== '')

	// Create a dictionary to map numbers to words
	const wordDict = {}
	for (const line of lines) {
		const [number, word] = line.split(' ')
		wordDict[parseInt(number)] = word.trim() // Trim whitespace from word
	}

	// Determine the number of rows in the pyramid
	const maxNumber = Math.max(...Object.keys(wordDict).map(Number))
	const numRows = Math.floor(Math.sqrt(2 * maxNumber))

	// Extract words at the end of each pyramid line
	const decodedMessage = []
	let startNumber = 1
	for (let row = 1; row <= numRows; row++) {
		const endNumber = startNumber + row - 1
		decodedMessage.push(wordDict[endNumber])
		startNumber = endNumber + 1
	}

	// Join the extracted words into a decoded message
	return decodedMessage.join(' ')
}
const messageFile = 'encoded_message.txt'
const decodedMessage = decode(messageFile)
console.log(decodedMessage)

app.get('/api', (req, res) => {
	res.json({
		users: [
			'one',
			'two',
			'three',
			'four',
			'five',
			'six',
			'seven',
			'eight',
			'nine',
		],
	})
})

app.listen(5000, () => {
	console.log('listening on port 5000')
})
