
import express from 'express'

// import { Liquid } from 'liquidjs';

const app = express()

app.use(express.static('public'))

// const engine = new Liquid();
// app.engine('liquid', engine.express()); 

// app.set('views', './views')

app.use(express.urlencoded({extended: true}))

// app.get('/', async function (request, response) {
//    response.render('index.liquid', {person: personResponseJSON.data})
// })

// app.post('/', async function (request, response) {
//   response.redirect(303, '/')
// })

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
