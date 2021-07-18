const express = require('express');
const cors = require('cors');
const goalRouter = require("./routes/goal-router");
const dailyGoalsRouter = require('./routes/daily-goal-router');
const weeklyGoalsRouter = require("./routes/weekly-goal-router");
const monthlyGoalsRouter = require("./routes/monthly-goal-router");
const ltGoalsRouter = require("./routes/lt-goal-router");
const app = express();
const port = 8000;
const apiUrl = '/api/v1';
const goalUrl = apiUrl + '/goal';
const dailygoalUrl = apiUrl + '/dailygoal';
const weeklygoalUrl = apiUrl + "/weeklygoal";
const monthlygoalUrl = apiUrl + "/monthlygoal";
const ltGoalsUrl = apiUrl + "/longterm";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(goalUrl, goalRouter);
app.use(dailygoalUrl, dailyGoalsRouter);
app.use(weeklygoalUrl, weeklyGoalsRouter);
app.use(monthlygoalUrl, monthlyGoalsRouter);
app.use(ltGoalsUrl, ltGoalsRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Gol app running on port ${port}`);
})