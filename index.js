const express = require("express");

const app = express();
const port = 3000;

const isValidDate = d => {
    return d instanceof Date && !isNaN(d);
};

app.get("/api/timestamp/:dateString",(request, response) => {
    const { dateString } = request.params;

    const date = new Date(dateString);
    if (!isValidDate(date)) {
        throw new Error("invalid date");
    }

    response.send({
        unix: date.getTime() / 1000,
        utc: date.toUTCString()
    });
});

app.use((req, res) => {
    console.log("here too");
    res.status(404).send("Invalid path");
});

app.use((err, req, res) => {
    res.status(500).send({ error: "invalid date" });
});

app.listen(port, () => console.log(`Example app listening on port ${ port }!`));