//Dependencies
const Pwned_PW = require("pwned-pw")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    return console.log("node index.js <passwords>")
}

if(!Fs.existsSync(Self_Args[0])){
    return console.log("The provided passwords file path is invalid.")
}

const passwords = Fs.readFileSync(Self_Args[0], "utf8").replace(/\r/g, "").split("\n")

if(!passwords.length){
    return console.log("passwords data is empty.")
}

for( const password of passwords ){
    Pwned_PW.check(password).then(count => {
        if(count){
            console.log(`Pwned: ${password}`)
        }else{
            console.log(`Not pwned: ${password}`)
        }
    })
}