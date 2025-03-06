const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const missions = [
    {
        id: "101",
        missionName: "Orion",
        astronaut: ["Ahmed", "Chris Hadfield", "Samantha Cristoforetti"],
        progress: 78,
        status: "Active",
    },
    {
        id: "102",
        missionName: "Nebula",
        astronaut: ["Layla", "Tim Peake", "Peggy Whitson"],
        progress: 45,
        status: "Planned",
    },
    {
        id: "103",
        missionName: "Zenith",
        astronaut: ["Omar", "Scott Kelly", "Valentina Tereshkova"],
        progress: 92,
        status: "Completed",
    },
];
app.post("/missions", (req, res) => {
    console.log(req.body);
    if (!req.body.id || !req.body.missionName || !req.body.astronaut || !req.body.progress) {
        return res.status(400).send("Missing required fields.");
    }
    missions.push(req.body);
    res.status(201).send("Mission created successfully.");
});

app.get("/missions", (req, res) => {
    res.json(missions);
});

app.get("/missions/:id", (req, res) => {
    const paramsId = req.params.id;
    for (let i = 0; i < missions.length; i++) {
        if (missions[i].id == paramsId) {
            return res.json(missions[i]);
        }
    }
    res.status(404).send("Mission not found.");
});

app.put("/missions/:id", (req, res) => {
    const paramsId = req.params.id;
    const mission = missions.find(m => m.id === paramsId);
    if (!mission) {
        return res.status(404).send("Mission not found.");
    }

    if (!req.body.status || !["Planned", "Active", "Completed", "Cancelled"].includes(req.body.status)) {
        return res.status(400).send("Invalid status.");
    }

    mission.status = req.body.status;
    res.send("Mission status updated successfully.");
});
app.delete("/missions/:id", (req, res) => {
    const paramsId = req.params.id;
    const index = missions.findIndex(m => m.id === paramsId);
    if (index === -1) {
        return res.status(404).send("Mission not found.");
    }
    missions.splice(index, 1);
    res.send("Mission deleted successfully.");
});
const port = 3000;
app.listen(port, () => {
    console.log("The server is running on port " + port);
});
