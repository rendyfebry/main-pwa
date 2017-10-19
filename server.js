import {
	API_URL,
	API_KEY,
} from './src/shared/config'

const express = require('express')
const fs = require('fs')
const sqlite = require('sql.js')
const fetch = require('node-fetch')

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3')

const db = new sqlite.Database(filebuffer)

const app = express()

app.set('port', (process.env.PORT || 3001))

const COLUMNS = [
	'carbohydrate_g',
	'protein_g',
	'fa_sat_g',
	'fa_mono_g',
	'fa_poly_g',
	'kcal',
	'description',
]

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
		filePath = __dirname + '/build/index.html'
		res.sendFile(filePath)
	})
}

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
