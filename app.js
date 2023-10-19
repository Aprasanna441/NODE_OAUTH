import express from "express";
import passport from "./auth.js"
import session from "express-session";
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const app=express()
app.use(express.static(path.join(__dirname,"client")))
app.use(cors())
app.use(session({
    
        secret: 'Hello',      // Secret key for session data
        resave: false,                  // Don't save session data on every request
        saveUninitialized: true,        // Save uninitialized sessions
        // Configure a session store here if needed
      }));





app.get('/',(req,res)=>{
    
    res.sendFile("index.html")

})

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success',(req,res)=>{
    let name=req.user.emails[0].value
    res.send(`Hello  ${name}`)
})
app.get('/auth/google/failure',(req,res)=>{
res.send(`Hello  failure`)
})

app.listen(8080,()=>{
    console.log("App is listening at"+process.env.PORT)
})