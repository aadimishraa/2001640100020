const express = require("express");
const app = express();
const axios = require('axios')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send('Hello')
})

app.get("/numbers", async(request, response) => {
    let urls = request.query?.url;
    if(!Array.isArray(urls))urls = [urls];
    const ans = [];
    await Promise.all(urls.map(async url => {
        try{
            const ax = await axios.get(url);
            ans.push(...ax.data?.numbers)
        }
        catch(errorHandler){
            console.log("Error");
        }
    }));
    console.log(ans);
    response.status(200).json({
        message : "success", 
        finalResult : ans
    })
})


app.listen(port, () => console.log(`Server is running at ${port}`));
