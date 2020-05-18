const print = console.log
const port = process.env.PORT || 3000
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socket(server)
const { addUser, getUser, removeUser, getUserList, clearArray} = require('./user')
const permute = require('./permutationGenerator')
const fakeUsers = () => {
    addUser({id:'1', username:'Groot'})
    // addUser({id:'2', username:'Alice'})
    // addUser({id:'3', username:'shaheen'})
}
const choice = permute([1, 2, 3, 4])

io.on('connection', (socket) => {
    print('made new socket connection', socket.id)

    socket.on('join', (userName)=> {
        let myID = socket.id
        socket.emit('myID', myID, userName)
        //clearArray()
        addUser({id:myID, username:userName})
        if(userName == 'Anik404') fakeUsers()
        fakeUsers()
    })

    socket.on('getConnectionList', (message)=>{
        if(getUserList().length == 4) {
            io.emit('listOfConnection', getUserList())
        } else {
            print('array lenth is not 4 ', getUserList().length)
        }
    })

    socket.on('shuffle', ()=> {
        let x = Math.floor(Math.random() * 23)
        //print(choice[x])
        const players = getUserList()
        const character = [
            {id: players[0].id, character:choice[x][0]},
            {id: players[1].id, character:choice[x][1]},
            {id: players[2].id, character:choice[x][2]},
            {id: players[3].id, character:choice[x][3]}
        ]
        //print(character)
        io.emit('characters', character)
    })

    socket.on('guessResult', (res) => {
        if(res) {
            io.emit('gameResult', 'true')
            print('true')
        } else {
            io.emit('gameResult', 'false')
            print('false')
        }
    }) 

    socket.on('emptyTheArray', ()=>{
        clearArray();
        socket.emit('arrayLength', getUserList().length)
        print(getUserList().length)
    })

    socket.on('removeID', (id) => {
        removeUser(id)
        print(getUserList())
    })
})

server.listen(port, ()=>{
    print(`server is running on port ${port}`)
})
