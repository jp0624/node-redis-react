const express = require('express')
const redis = require('redis')
const axios = require('axios')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)

const app = express()
app.use(express.json())

const connectRedis = () => {
	return new Promise((resolve, reject) => {
		client.connect()
		client.on('connect', () => {
			console.log('Connected to Redis server...')
			resolve()
		})
		client.on('error', (err) => {
			console.error('Error connecting to Redis:', err)
			reject(err)
		})
	})
}

app.get('/api', async (req, res) => {
	const { key } = req.body
	const response = await client.get(key)
	console.log('response: ' + response)
	res.json(response)
})

app.get('/api/posts/:id', async (req, res) => {
	const { id } = req.params
	const cachedPost = await client.get(`post:${id}`)
	if (cachedPost) {
		return res.json(JSON.parse(cachedPost))
	}
	const url = `https://jsonplaceholder.typicode.com/posts/${id}`
	const response = await axios.get(url)
	// client.set(`post:${id}`, JSON.stringify(response.data), 'EX', 3600)
	client.setEx(`post:${id}`, 3600, JSON.stringify(response.data))

	return res.json(response.data)
})

app.get('/api/posts/', async (req, res) => {
	const url = `https://jsonplaceholder.typicode.com/posts/`
	const response = await axios.get(url)

	return res.json(response.data)
})

app.get('/api/posts/range/:range', async (req, res) => {
	let { range } = req.params
	range = range.split(':').map(Number)
	const [start, end] = range
	const posts = []
	for (let index = start; index < end; index++) {
		const cachedPost = await client.get(`post:${index}`)
		if (cachedPost) {
			posts.push(JSON.parse(cachedPost))
		} else {
			const url = `https://jsonplaceholder.typicode.com/posts/${index}`
			const response = await axios.get(url)
			client.setEx(`post:${index}`, 3600, JSON.stringify(response.data))
			posts.push(response.data)
		}
	}

	res.json(posts)
})

app.post('/api', async (req, res) => {
	const { key, value } = req.body
	const response = await client.set(key, value)
	console.log('response: ' + response)
	res.json(response)
})

app.get('/api/layout/', async (req, res) => {
	const cachedLayout = await client.get(`layout`)
	console.log('cachedLayout: ', cachedLayout)

	if (cachedLayout && cachedLayout < 3) {
		client.set('layout', +cachedLayout + 1)
		return res.json({ layout: +cachedLayout + 1 })
	} else {
		client.set('layout', '1')
		return res.json({ layout: 1 })
	}
})

connectRedis()
	.then()
	.catch((err) => {
		console.error('Error in Redis then() block:', err)
		client.quit()
	})

app.listen(5000, () => {
	console.log('listening on port 5000')
})
