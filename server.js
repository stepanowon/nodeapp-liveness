const express = require('express');

const app = express();
const port = 8080;
let startTime;

app.get('/healthz', (req, res) => {
    let duration = Date.now() - startTime.getTime();
    if (duration > 30000) {
        res.status(500).json({ status: "fail", time: duration })
    } else {
        res.json({ status: "ok", time: duration })
    }
});

app.listen(port, () => {
    console.log(`liveness probe test server is running on port ${port}`);
    startTime = new Date();
});