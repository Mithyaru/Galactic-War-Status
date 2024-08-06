let express = require('express')
let cors = require('cors')
let axios = require('axios')
const port = process.env.PORT || 4000

let app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Conectado')
})

app.listen(port, () => console.log('server is running on ' + port))