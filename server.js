const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
// Application
const app = express();
// Define port
const port = 3000;

// sqlite3
const sqlite3 = require("sqlite3");
const dbFile = "maneskin-database.sqlite3.db"; //filnamnet
db = new sqlite3.Database(dbFile);

//CREATING TABLES
// contact table
db.run(
  `CREATE TABLE IF NOT EXISTS contact (
    userID INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    email TEXT, 
    subject TEXT, 
    message TEXT)`,
  function (error) {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

// members table
db.run(
  `CREATE TABLE IF NOT EXISTS members (
    memberID INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    role TEXT, 
    age INTEGER, 
    joinedYear INTEGER,
    FOREIGN KEY (albumID) REFERENCES Albums(albumID) ON DELETE CASCADE)`,
  function (error) {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

// db.run(
//     `INSERT INTO members (name, role, age, joinedYear)
//      VALUES ('Damiano David', 'Singer', 25, 2016)`,
//     `INSERT INTO members (name, role, age, joinedYear)
//      VALUES ('Victoria De Angelis', 'Bass Guitar', 24, 2016)`,
//     `INSERT INTO members (name, role, age, joinedYear)
//      VALUES ('Thomas Raggi', 'Guitar', 23, 2016)`,
//     `INSERT INTO members (name, role, age, joinedYear)
//      VALUES ('Ethan Torchio', 'Drums', 24, 2016)`,
//     `INSERT INTO members (name, role, age, joinedYear)
//      VALUES ('Iggy Pop', 'One-time Collaboration', 77, 2021)`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       }
//     }
//   );

// Create the albums table
db.run(
  `CREATE TABLE IF NOT EXISTS albums (
      albumID INTEGER PRIMARY KEY AUTOINCREMENT, 
      albumTitle TEXT, 
      releasedYear INTEGER, 
      numberOfSongs INTEGER, 
      albumLenght TEXT)`,
  function (error) {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

//   db.run(
//     `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
//      VALUES ('RUSH! (ARE U COMING?)', 2023, 22, '01:07:00')`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         const rush2AlbumID = this.lastID;
//         console.log("Inserted albumID:", albumID);
//       }
//     }
//   );

//   db.run(
//     `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
//      VALUES ('RUSH!', 2023, 18, '53:00')`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         const rushAlbumID = this.lastID;
//         console.log("Inserted albumID:", albumID);
//       }
//     }
//   );

//   db.run(
//     `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
//      VALUES ('Teatro d''ira: Vol. I', 2021, 8, '29:38')`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         const teatroAlbumID = this.lastID;
//         console.log("Inserted albumID:", albumID);
//       }
//     }
//   );

//   db.run(
//     `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
//      VALUES ('Il ballo della vita', 2018, 12, '34:00')`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         const balloAlbumID = this.lastID;
//         console.log("Inserted albumID:", albumID);
//       }
//     }
//   );

//   db.run(
//     `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
//      VALUES ('Chosen', 2017, 7, '20:00')`,
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         const chosenAlbumID = this.lastID;
//         console.log("Inserted albumID:", albumID);
//       }
//     }
//   );

// Songs table
db.run(
  `CREATE TABLE IF NOT EXISTS songs (
      songID INTEGER PRIMARY KEY AUTOINCREMENT,
      albumID INTEGER,
      trackNumber INTEGER,
      songTitle TEXT,
      duration TEXT,
      FOREIGN KEY (albumID) REFERENCES Albums(albumID) ON DELETE CASCADE
    )`,
  function (error) {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

// db.run(
//     `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//      VALUES
//      (?, 1, 'HONEY (ARE U COMING?)', '02:47'),
//      (?, 2, 'VALENTINE', '03:36'),
//      (?, 3, 'OFF MY FACE', '02:29'),
//      (?, 4, 'THE DRIVER', '03:07'),
//      (?, 5, 'TRASTEVERE', '03:02'),
//      (?, 6, 'OWN MY MIND', '03:05'),
//      (?, 7, 'GOSSIP (feat. Tom Morello)', '02:48'),
//      (?, 8, 'TIMEZONE', '03:33'),
//      (?, 9, 'BLA BLA BLA', '03:02'),
//      (?, 10, 'BABY SAID', '02:46'),
//      (?, 11, 'GASOLINE', '03:44'),
//      (?, 12, 'FEEL', '02:48'),
//      (?, 13, 'DON\'T WANNA SLEEP', '03:20'),
//      (?, 14, 'KOOL KIDS', '03:01'),
//      (?, 15, 'IF NOT FOR YOU', '03:22'),
//      (?, 16, 'READ YOUR DIARY', '02:30'),
//      (?, 17, 'MARK CHAPMAN', '03:39'),
//      (?, 18, 'LA FINE', '03:20'),
//      (?, 19, 'IL DONO DELLA VITA', '03:44'),
//      (?, 20, 'MAMMAMIA', '03:06'),
//      (?, 21, 'SUPERMODEL', '02:27'),
//      (?, 22, 'THE LONELIEST', '04:06')`
//      [
//         rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID,
//         rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID,
//         rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID,
//         rush2AlbumID, rush2AlbumID, rush2AlbumID, rush2AlbumID
//       ],
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         console.log("Songs for RUSH! (ARE U COMING?) inserted successfully");
//       }
//     }
//   );

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//      VALUES
//      (?, 1, 'HONEY (ARE U COMING?)', '02:47'),
//      (?, 2, 'OWN MY MIND', '03:05'),
//      (?, 3, 'GOSSIP (feat. Tom Morello)', '02:48'),
//      (?, 4, 'TIMEZONE', '03:33'),
//      (?, 5, 'BLA BLA BLA', '03:02'),
//      (?, 6, 'BABY SAID', '02:46'),
//      (?, 7, 'GASOLINE', '03:44'),
//      (?, 8, 'FEEL', '02:48'),
//      (?, 9, 'DON\'T WANNA SLEEP', '03:20'),
//      (?, 10, 'KOOL KIDS', '03:01'),
//      (?, 11, 'IF NOT FOR YOU', '03:22'),
//      (?, 12, 'READ YOUR DIARY', '02:30'),
//      (?, 13, 'MARK CHAPMAN', '03:39'),
//      (?, 14, 'LA FINE', '03:20'),
//      (?, 15, 'IL DONO DELLA VITA', '03:44'),
//      (?, 16, 'MAMMAMIA', '03:06'),
//      (?, 17, 'SUPERMODEL', '02:27'),
//      (?, 18, 'THE LONELIEST', '04:06')`[
//     (rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID,
//     rushAlbumID)
//   ],
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for RUSH! (ARE U COMING?) inserted successfully");
//     }
//   }
// );

// db.run(
//     `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//      VALUES
//      (?, 1, 'ZITTI E BUONI', '03:15'),
//      (?, 2, 'CORALINE', '05:00'),
//      (?, 3, 'LIVIDI SUI GOMITI', '02:46'),
//      (?, 4, 'I WANNA BE YOUR SLAVE', '02:53'),
//      (?, 5, 'IN NOME DEL PADRE', '03:40'),
//      (?, 6, 'FOR YOUR LOVE', '03:50'),
//      (?, 7, 'LA PAURA DEL BUIO', '03:29'),
//      (?, 8, 'VENT\'ANNI', '04:13')`,
//     [
//       teatroAlbumID, teatroAlbumID, teatroAlbumID, teatroAlbumID,
//       teatroAlbumID, teatroAlbumID, teatroAlbumID, teatroAlbumID
//     ],
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         console.log("Songs for Teatro d'ira: Vol. I inserted successfully");
//       }
//     }
//   );

// db.run(
//     `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//      VALUES
//      (?, 1, 'NEW SONG', '03:48'),
//      (?, 2, 'TORNA A CASA', '03:50'),
//      (?, 3, 'L\'ALTRA DIMENSIONE', '03:26'),
//      (?, 4, 'SH*T BLVD', '02:37'),
//      (?, 5, 'FEAR FOR NOBODY', '02:30'),
//      (?, 6, 'LE PAROLE LONTANE', '04:06'),
//      (?, 7, 'IMMORTALE (feat. Vegas Jones)', '04:02'),
//      (?, 8, 'LASCIAMI STARE', '02:49'),
//      (?, 9, 'ARE YOU READY?', '02:33'),
//      (?, 10, 'CLOSE TO THE TOP', '02:18'),
//      (?, 11, 'NIENTE DA DIRE', '02:36'),
//      (?, 12, 'MORIRÓ DA RE', '02:37')`,

//     [
//       balloAlbumID, balloAlbumID, balloAlbumID, balloAlbumID,
//       balloAlbumID, balloAlbumID, balloAlbumID, balloAlbumID,
//       balloAlbumID, balloAlbumID, balloAlbumID, balloAlbumID
//     ],
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         console.log("Songs for Il ballo della vita inserted successfully");
//       }
//     }
//   );

// db.run(
//     `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//      VALUES
//      (?, 1, 'CHOSEN', '02:42'),
//      (?, 2, 'RECOVERY', '02:55'),
//      (?, 3, 'VENGO DALLA LUNA', '03:04'),
//      (?, 4, 'BEGGIN', '03:31'),
//      (?, 5, 'LET\'S GET IT STARTED', '02:26')
//      (?, 6, 'SOMEBODY TOLD ME', '02:40'),
//      (?, 6, 'YOU NEED ME, I DON\'T NEED YOU', '03:30')`
//     [
//       chosenAlbumID, chosenAlbumID, chosenAlbumID, chosenAlbumID,
//       chosenAlbumID, chosenAlbumID, chosenAlbumID
//     ],
//     function (error) {
//       if (error) {
//         console.log("ERROR: ", error);
//       } else {
//         console.log("Songs for Chosen inserted successfully");
//       }
//     }
//   );

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    },
  })
);

// view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// create routes
app.get("/", (req, res) => {
  res.send("My site!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
