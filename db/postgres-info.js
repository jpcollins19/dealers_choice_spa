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
  "Bukayo Saka",
  "Emile Smith-Rowe",
  "Gabriel Martinelli",
  "N'Golo Kante",
  "Romelu Lukaku",
  "Christian Pulisic",
  "Ben White",
  "Mohamed Salah",
  "Sadio Mane",
  "Harvey Elliott",
  "Leon Bailey",
  "Tyrone Mings",
  "Emiliano Martinez",
  "Jack Grealish",
  "Kevin DeBruyne",
  "Raheem Sterling",
  "Robert Lewandowski",
  "Leroy Sane",
  "Benjamen Pavard",
  "Eerling Haaland",
  "Marcus Rues",
  "Giovani Reyna",
  "Florian Wirtz",
  "Amine Adli",
  "Paulinho",
  "Lee Jae-Sung",
  "Jonathan Burkhardt",
  "Silvian Widmer",
  "Neymar",
  "Killian Mbappe",
  "Angel De Maria",
  "Angel Gomes",
  "Jonathan David",
  "Burak Yilmaz",
  "Cesc Fabergas",
  "Kasper Dolberg",
  "Frankie De Jong",
  "Ansu Fati",
  "Pedro",
  "Vinicious Jr.",
  "Casimiro",
  "Luka Modric",
  "Luis Suarez",
  "Antonio Griezman",
  "Lorenzo Insigne",
  "Dries Mertens",
  "Hirving Lozano",
  "Alvaro Morata",
  "Arthur",
  "Lautaro Martinez",
  "Alexis Sanchez",
  "Edin Dzeko",
  "Zlatan",
  "Olivier Giroud",
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
    Bukayo_Saka,
    Emile_Smith_Rowe,
    Gabriel_Martinelli,
    Kante,
    Romelu_Lukaku,
    Christian_Pulisic,
    Ben_White,
    Mohamed_Salah,
    Sadio_Mane,
    Harvey_Elliott,
    Leon_Bailey,
    Tyrone_Mings,
    Emiliano_Martinez,
    Jack_Grealish,
    Kevin_DeBruyne,
    Raheem_Sterling,
    Robert_Lewandowski,
    Leroy_Sane,
    Benjamen_Pavard,
    Eerling_Haaland,
    Marcus_Rues,
    Giovani_Reyna,
    Florian_Wirtz,
    Amine_Adli,
    Paulinho,
    Lee_Jae_Sung,
    Jonathan_Burkhardt,
    Silvian_Widmer,
    Neymar,
    Killian_Mbappe,
    Angel_DeMaria,
    Angel_Gomes,
    Jonathan_David,
    Burak_Yilmaz,
    Cesc_Fabergas,
    Kasper_Dolberg,
    Frankie_DeJong,
    Ansu_Fati,
    Pedro,
    Vinicious_Jr,
    Casimiro,
    Luka_Modric,
    Luis_Suarez,
    Antonio_Griezman,
    Lorenzo_Insigne,
    Dries_Mertens,
    Hirving_Lozano,
    Alvaro_Morata,
    Arthur,
    Lautaro_Martinez,
    Alexis_Sanchez,
    Edin_Dzeko,
    Zlatan,
    Olivier_Giroud,
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

  Bukayo_Saka.teamId = Arsenal.id;
  Emile_Smith_Rowe.teamId = Arsenal.id;
  Gabriel_Martinelli.teamId = Arsenal.id;
  Mason_Mount.teamId = Chelsea.id;
  Kante.teamId = Chelsea.id;
  Romelu_Lukaku.teamId = Chelsea.id;
  Christian_Pulisic.teamId = Chelsea.id;
  Ben_White.teamId = Arsenal.id;
  Mohamed_Salah.teamId = Liverpool.id;
  Sadio_Mane.teamId = Liverpool.id;
  Harvey_Elliott.teamId = Liverpool.id;
  Leon_Bailey.teamId = Aston_Villa.id;
  Tyrone_Mings.teamId = Aston_Villa.id;
  Emiliano_Martinez.teamId = Aston_Villa.id;
  Jack_Grealish.teamId = Manchester_City.id;
  Kevin_DeBruyne.teamId = Manchester_City.id;
  Raheem_Sterling.teamId = Manchester_City.id;
  Robert_Lewandowski.teamId = Bayern_Munich.id;
  Leroy_Sane.teamId = Bayern_Munich.id;
  Benjamen_Pavard.teamId = Bayern_Munich.id;
  Eerling_Haaland.teamId = Borussia_Dortmund.id;
  Marcus_Rues.teamId = Borussia_Dortmund.id;
  Giovani_Reyna.teamId = Borussia_Dortmund.id;
  Florian_Wirtz.teamId = Bayer_Leverkusen.id;
  Amine_Adli.teamId = Bayer_Leverkusen.id;
  Paulinho.teamId = Bayer_Leverkusen.id;
  Lee_Jae_Sung.teamId = Mainz.id;
  Jonathan_Burkhardt.teamId = Mainz.id;
  Silvian_Widmer.teamId = Mainz.id;
  Neymar.teamId = Paris_Saint_Germain.id;
  Killian_Mbappe.teamId = Paris_Saint_Germain.id;
  Angel_DeMaria.teamId = Paris_Saint_Germain.id;
  Angel_Gomes.teamId = Lille.id;
  Jonathan_David.teamId = Lille.id;
  Burak_Yilmaz.teamId = Monaco.id;
  Cesc_Fabergas.teamId = Monaco.id;
  Kasper_Dolberg.teamId = Nice.id;
  Frankie_DeJong.teamId = Barcelona.id;
  Ansu_Fati.teamId = Barcelona.id;
  Pedro.teamId = Barcelona.id;
  Vinicious_Jr.teamId = Real_Madrid.id;
  Casimiro.teamId = Real_Madrid.id;
  Luka_Modric.teamId = Real_Madrid.id;
  Luis_Suarez.teamId = Athletico_Madrid.id;
  Antonio_Griezman.teamId = Athletico_Madrid.id;
  Lorenzo_Insigne.teamId = Napoli.id;
  Dries_Mertens.teamId = Napoli.id;
  Hirving_Lozano.teamId = Napoli.id;
  Alvaro_Morata.teamId = Juventes.id;
  Arthur.teamId = Juventes.id;
  Lautaro_Martinez.teamId = Inter_Milan.id;
  Alexis_Sanchez.teamId = Inter_Milan.id;
  Edin_Dzeko.teamId = Inter_Milan.id;
  Zlatan.teamId = AC_Milan.id;
  Olivier_Giroud.teamId = AC_Milan.id;

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
    Bukayo_Saka.save(),
    Emile_Smith_Rowe.save(),
    Gabriel_Martinelli.save(),
    Mason_Mount.save(),
    Kante.save(),
    Romelu_Lukaku.save(),
    Christian_Pulisic.save(),
    Ben_White.save(),
    Mohamed_Salah.save(),
    Sadio_Mane.save(),
    Harvey_Elliott.save(),
    Leon_Bailey.save(),
    Tyrone_Mings.save(),
    Emiliano_Martinez.save(),
    Jack_Grealish.save(),
    Kevin_DeBruyne.save(),
    Raheem_Sterling.save(),
    Robert_Lewandowski.save(),
    Leroy_Sane.save(),
    Benjamen_Pavard.save(),
    Eerling_Haaland.save(),
    Marcus_Rues.save(),
    Giovani_Reyna.save(),
    Florian_Wirtz.save(),
    Amine_Adli.save(),
    Paulinho.save(),
    Lee_Jae_Sung.save(),
    Jonathan_Burkhardt.save(),
    Silvian_Widmer.save(),
    Neymar.save(),
    Killian_Mbappe.save(),
    Angel_DeMaria.save(),
    Angel_Gomes.save(),
    Jonathan_David.save(),
    Burak_Yilmaz.save(),
    Cesc_Fabergas.save(),
    Kasper_Dolberg.save(),
    Frankie_DeJong.save(),
    Ansu_Fati.save(),
    Pedro.save(),
    Vinicious_Jr.save(),
    Casimiro.save(),
    Luka_Modric.save(),
    Luis_Suarez.save(),
    Antonio_Griezman.save(),
    Lorenzo_Insigne.save(),
    Dries_Mertens.save(),
    Hirving_Lozano.save(),
    Alvaro_Morata.save(),
    Arthur.save(),
    Lautaro_Martinez.save(),
    Alexis_Sanchez.save(),
    Edin_Dzeko.save(),
    Zlatan.save(),
    Olivier_Giroud.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  models: { League, Team, Player },
};
