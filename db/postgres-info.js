const Sequelize = require(`sequelize`);
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/hw_soccer_leagues`
);
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize;

const League = db.define("leagues", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const Team = db.define("teams", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const Player = db.define("players", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

League.hasMany(Team, { as: "teams", foriegnKey: "teamId" });
Team.belongsTo(League);
Player.belongsTo(Team);

const leagueNames = [
  "English Premier League",
  "Bundesliga",
  "Ligue 1",
  "LaLiga",
  "Serie A",
];

const teamNames = [
  "Arsenal",
  "Chelsea",
  "Liverpool",
  "Aston Villa",
  "Manchester City",
  "Bayern Munich",
  "Borussia Dortmund",
  "Bayer Leverkusen",
  "Mainz",
  "Paris Saint Germain",
  "Lille",
  "Monaco",
  "Nice",
  "Barcelona",
  "Real Madrid",
  "Athletico Madrid",
  "Napoli",
  "Juventes",
  "Inter Milan",
  "AC Milan",
];

const playerNames = [
  "Mason Mount",
  "Bakuyo Saka",
  "Emile Smith-Rowe",
  "Gabriel Martinelli",
  "N'Golo Kante",
];

const syncAndSeed = async () => {
  await db.sync({ force: true });

  const [epl, bundesliga, ligue_1, laLiga, serie_A] = await Promise.all(
    leagueNames.map((name) => League.create({ name }))
  );

  const [
    Arsenal,
    Chelsea,
    Liverpool,
    Aston_Villa,
    Manchester_City,
    Bayern_Munich,
    Borussia_Dortmund,
    Bayer_Leverkusen,
    Mainz,
    Paris_Saint_Germain,
    Lille,
    Monaco,
    Nice,
    Barcelona,
    Real_Madrid,
    Athletico_Madrid,
    Napoli,
    Juventes,
    Inter_Milan,
    AC_Milan,
  ] = await Promise.all(teamNames.map((name) => Team.create({ name })));

  const [
    Mason_Mount,
    Bakuyo_Saka,
    Emile_Smith_Rowe,
    Gabriel_Martinelli,
    Kante,
  ] = await Promise.all(playerNames.map((name) => Player.create({ name })));

  Arsenal.leagueId = epl.id;
  Chelsea.leagueId = epl.id;
  Liverpool.leagueId = epl.id;
  Aston_Villa.leagueId = epl.id;
  Manchester_City.leagueId = epl.id;
  Bayern_Munich.leagueId = bundesliga.id;
  Borussia_Dortmund.leagueId = bundesliga.id;
  Bayer_Leverkusen.leagueId = bundesliga.id;
  Mainz.leagueId = ligue_1.id;
  Paris_Saint_Germain.leagueId = ligue_1.id;
  Lille.leagueId = ligue_1.id;
  Monaco.leagueId = ligue_1.id;
  Nice.leagueId = ligue_1.id;
  Barcelona.leagueId = laLiga.id;
  Real_Madrid.leagueId = laLiga.id;
  Athletico_Madrid.leagueId = laLiga.id;
  Napoli.leagueId = serie_A.id;
  Juventes.leagueId = serie_A.id;
  Inter_Milan.leagueId = serie_A.id;
  AC_Milan.leagueId = serie_A.id;

  Bakuyo_Saka.teamId = Arsenal.id;
  Emile_Smith_Rowe.teamId = Arsenal.id;
  Gabriel_Martinelli.teamId = Arsenal.id;
  Mason_Mount.teamId = Chelsea.id;
  Kante.teamId = Chelsea.id;

  await Promise.all([
    Arsenal.save(),
    Chelsea.save(),
    Liverpool.save(),
    Aston_Villa.save(),
    Manchester_City.save(),
    Bayern_Munich.save(),
    Borussia_Dortmund.save(),
    Bayer_Leverkusen.save(),
    Mainz.save(),
    Paris_Saint_Germain.save(),
    Lille.save(),
    Monaco.save(),
    Nice.save(),
    Barcelona.save(),
    Real_Madrid.save(),
    Athletico_Madrid.save(),
    Napoli.save(),
    Juventes.save(),
    Inter_Milan.save(),
    AC_Milan.save(),
    Bakuyo_Saka.save(),
    Emile_Smith_Rowe.save(),
    Gabriel_Martinelli.save(),
    Mason_Mount.save(),
    Kante.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  models: { League, Team, Player },
};
