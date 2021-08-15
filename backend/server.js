const express   = require ('express')
const dotenv    = require ('dotenv')
const cors      = require ('cors')

dotenv.config()
const app       = express()
const db        = require ('./app/models')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

db.mongoose
.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
.then(()        =>{
    console.log(`Database connected success!`)
}).catch((err)  =>{
    console.log(`Cannot Connect to the database!`,err)
    process.exit()
});

const PORT      = process.env.APP_PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

require('./app/routes/products.routes')(app)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))