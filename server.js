
import express from 'express'

import { Liquid } from 'liquidjs';

import { readdir, readFile } from 'node:fs/promises'

import { marked } from 'marked'

const files = await readdir('content')
// console.log(files)

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))

app.get('/', async function (request, response) {
   response.render('home.liquid')
})

app.get('/learningjournal', async function (request, response) {
    response.render('learningjournal.liquid', {files: files})
})

app.get('/learningjournal/:slug', async function(req, res) {
    console.log(req.params.slug)
    const fileContents = await readFile('content/' + req.params.slug, { encoding: 'utf8' })
    const markedUpFileContents = marked.parse(fileContents)
    res.render('artikel.liquid', {fileContents: markedUpFileContents })
  })


app.get('/stuff', async function (request, response) {
    response.render('stuff.liquid')
})

app.get('/digitalgarden', async function (request, response) {
    response.render('digitalgarden.liquid')
})



// app.post('/', async function (request, response) {
//   response.redirect(303, '/')
// })

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
