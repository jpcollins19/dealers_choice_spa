const express = require("express");
const app = express();
const path = require("path");
const {
  syncAndSeed,
  models: { League, Team, Player },
} = require(`./db/postgres-info.js`);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get(`/leagues`, async (req, res, next) => {
  try {
    const leagues = await League.findAll({
      include: [
        {
          model: Team,
          as: "teams",
        },
      ],
    });
    res.send(leagues);
  } catch (err) {
    next(err);
  }
});

app.get(`/leagues/teams`, async (req, res, next) => {
  try {
    const teams = await Team.findAll();
    res.send(teams);
  } catch (err) {
    next(err);
  }
});

app.get(`/leagues/teams/players`, async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.send(players);
  } catch (err) {
    next(err);
  }
});

app.post(`/:leagueId/:teamId/players`, async (req, res, next) => {
  try {
    const player = { ...req.body };
    res.status(201).send(await Player.create(player));
  } catch (err) {
    next(err);
  }
});

app.delete("/:leagueId/:teamId/:id", async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    await player.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 2000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

init();
