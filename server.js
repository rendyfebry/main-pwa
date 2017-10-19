const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

const API_URL = 'https://comicvine.gamespot.com'
const API_KEY = 'e47ace99bf094a1a4828ab704205d92a7eb6dfc5'

const app = express()

app.set('port', (process.env.PORT || 3001))

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'))
}

app.get('/api/characters', (req, res) => {
	const sort = req.query.sort || 'name'
	const limit = req.query.limit || 25
	const page = req.query.page || 1
	const offset = (page - 1) * limit

	let apiUrl = `${API_URL}/api/characters`
	apiUrl += `?sort=${sort}`
	apiUrl += `&limit=${limit}`
	apiUrl += `&offset=${offset}`
	apiUrl += '&field_list=id,name,gender,image,publisher'
	apiUrl += `&api_key=${API_KEY}`
	apiUrl += '&format=json'

	fetch(apiUrl)
		.then(response => response.json())
		.then((json) => {
			res.send(json)
		})
})

app.get('/api/issues', (req, res) => {
	const sort = req.query.sort || 'name'
	const limit = req.query.limit || 25
	const page = req.query.page || 1
	const offset = (page - 1) * limit

	let apiUrl = `${API_URL}/api/issues`
	apiUrl += `?sort=${sort}`
	apiUrl += `&limit=${limit}`
	apiUrl += `&offset=${offset}`
	apiUrl += '&field_list=id,name,image,issue_number,'
	apiUrl += `&api_key=${API_KEY}`
	apiUrl += '&format=json'

	fetch(apiUrl)
		.then(response => response.json())
		.then((json) => {
			res.send(json)
		})
})

if (process.env.NODE_ENV === 'production') {
	app.get(/(.*)/, (req, res) => {
		const filePath = path.join(__dirname, '/build/index.html')
		res.sendFile(filePath)
	})
}

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
