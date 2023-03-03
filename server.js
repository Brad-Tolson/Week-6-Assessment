const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
const Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: 'acec6ec7350c4a898cca44d8b4608103',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })

app.use(express.json())
app.use(cors())
app.use(express.static('public'));


app.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/public/index.html');
        rollbar.info('Homepage loaded successfully.')
    } catch (error) {
        console.log('ERROR GETTING HOMEPAGE', error)
        res.sendStatus(500)
        rollbar.error(error)
    }
});

app.get('/css', (req,res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, '/public/styles.css'))
        rollbar.info('CSS file loaded successfully.')
    } catch (error) {
        console.log('ERROR GETTING CSS FILE', error)
        res.sendStatus(500)
        rollbar.error(error)
    }
});

app.get('/js', (req,res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, '/public/main.js'))
        rollbar.info('JavaScript file loaded successfully.')
    } catch (error) {
        console.log('ERROR GETTING JAVASCRIPT FILE', error)
        res.sendStatus(500)
        rollbar.error(error)
    }
});
  

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
        rollbar.info('Bots API endpoint loaded successfully.')
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
        rollbar.error(error)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.info('Five Bots API endpoint loaded successfully.')
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
        rollbar.error(error)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.listen(4000, () => {
  console.log(`Listening on 4000`)
})