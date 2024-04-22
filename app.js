const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const port = 3000;

// EXPRESS SPECIFIC STUFF
const staticDir = path.join(__dirname, "static");
app.use(express.static(staticDir));

app.use(express.urlencoded());

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static/index.html'));
});

app.post("/", (req, res) => {
    const { text: namee, email, message: mess } = req.body;
    if (namee && email && mess){
        const writetoOutput=`Name is ${namee} , Email is ${email} , Message is ${mess}`
        fs.writeFileSync("output.txt",writetoOutput)
        const readFiles= fs.readFileSync(path.join(__dirname,"static/index.html"),"utf8")
        const alertMess= '<script>alert("Message sent successfully! ✅")</script>'
        const updatedPage = readFiles.replace(`</body>`,`</body> ${alertMess}`)
        res.status(200).send(updatedPage)
    }
    else{
        const readFiles=fs.readFileSync(path.join(__dirname,"static/index.html"),"utf8")
        const alertMess = "<script>alert('Message not sent  ❌');</script>"
        const updatedPage = readFiles.replace(`</body>`,`</body>,${alertMess}`)
        res.status(500).send(updatedPage);

 
}});

// START THE SERVER
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


