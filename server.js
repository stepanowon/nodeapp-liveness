const express = require('express');

const app = express();
const port = 8080;
let startTime;

app.get('/healthz', (req, res) => {
    const header = req.headers["health"];
    if (header === "check") {
        let duration = Date.now() - startTime.getTime();
        if (duration > 20000) {
            res.status(500).json({
                status: "fail", 
                message: "server : not available" 
            })
        } else {
            res.json({ status: "ok", message: "server : available." })
        }
    } else {
        res.json({ status: "ok", message: "server : available." })
    }
});

app.listen(port, () => {
    console.log(`liveness probe test server is running on port ${port}`);
    startTime = new Date();
});