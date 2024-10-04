// Global definitions
const adminName = 'filippa';
// const adminPassword = "1234";
const adminPassword =
  '$2b$12$9jmRBLDswTRTEYUPpBdkEeVhPHqiD0sCclIgN3LyXQBA2Esm4XskC';

//bcrypt
const bcrypt = require('bcrypt');
//salt round for bcrypt algorithm
const saltRounds = 12;

// bcrypt.hash(adminPassword, saltRounds, function (err, hash) {
//   if (err) {
//     console.log("---> Error encryptinh the password: ", err);
//   } else {
//     console.log("---> Hashed password (GENERATE only ONCE): ", hash);
//   }
// });

// Packages
const express = require('express');
const { engine } = require('express-handlebars');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const connectSqlite3 = require ('connect-sqlite3')

// Application
const app = express();

// Define port
const port = 8000;

// sqlite3 database
const dbFile = "maneskin-database.sqlite3.db"; //filnamnet
db = new sqlite3.Database(dbFile);

//Sessions
const SQLiteStore = connectSqlite3(session)

app.use(session({
  store: new SQLiteStore({db: "session-db.db"}),
  "saveUninitialized": false,
  "resave": false,
  "secret": "This123Is@Another#456GreatSecret678%Sentence"
}))

app.use (function (req, res, next) {
  console.log ("Session passed to response locals...")
  res.locals.session = req.session;
  next ();
})

//Members
const members = [
  {
      name: "Damiano David",
      imageUrl: "/img/damiano.png", 
      description: "Singer"
  },
  {
      name: "Victoria De Angelis",
      imageUrl: "/img/vic.png", 
      description: "Bassist"
  },
  {
      name: "Thomas Raggi",
      imageUrl: "/img/thomas.png", 
      description: "Guitarist"
  },
  {
      name: "Ethan Torchio",
      imageUrl: "/img/ethan.png", 
      description: "Drummer"
  }
];


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

  // db.run(
  //   `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
  //    VALUES ('RUSH! (ARE U COMING?)', 2023, 22, '01:07:00')`,
  //   function (error) {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else {
  //       const rush2AlbumID = this.lastID;
  //       console.log("Inserted albumID:", albumID);
  //     }
  //   }
  // );

  // db.run(
  //   `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
  //    VALUES ('RUSH!', 2023, 18, '53:00')`,
  //   function (error) {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else {
  //       const rushAlbumID = this.lastID;
  //       console.log("Inserted albumID:", albumID);
  //     }
  //   }
  // );

  // db.run(
  //   `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
  //    VALUES ('Teatro d''ira: Vol. I', 2021, 8, '29:38')`,
  //   function (error) {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else {
  //       const teatroAlbumID = this.lastID;
  //       console.log("Inserted albumID:", albumID);
  //     }
  //   }
  // );

  // db.run(
  //   `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
  //    VALUES ('Il ballo della vita', 2018, 12, '34:00')`,
  //   function (error) {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else {
  //       const balloAlbumID = this.lastID;
  //       console.log("Inserted albumID:", albumID);
  //     }
  //   }
  // );

  // db.run(
  //   `INSERT INTO albums (albumTitle, releasedYear, numberOfSongs, albumLenght)
  //    VALUES ('Chosen', 2017, 7, '20:00')`,
  //   function (error) {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else {
  //       const chosenAlbumID = this.lastID;
  //       console.log("Inserted albumID:", albumID);
  //     }
  //   }
  // );

// Songs table
db.run(
  `CREATE TABLE IF NOT EXISTS songs (
      songID INTEGER PRIMARY KEY AUTOINCREMENT,
      albumID INTEGER,
      trackNumber INTEGER,
      songTitle TEXT,
      duration TEXT,
      FOREIGN KEY (albumID) REFERENCES albums(albumID) ON DELETE CASCADE
    )`,
  function (error) {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

// const rush2AlbumID = 1; 

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//    VALUES (?, 1, 'HONEY (ARE U COMING?)', '02:47'),
//           (?, 2, 'VALENTINE', '03:36'),
//           (?, 3, 'OFF MY FACE', '02:29'),
//           (?, 4, 'THE DRIVER', '03:07'),
//           (?, 5, 'TRASTEVERE', '03:02'),
//           (?, 6, 'OWN MY MIND', '03:05'),
//           (?, 7, 'GOSSIP (feat. Tom Morello)', '02:48'),
//           (?, 8, 'TIMEZONE', '03:33'),
//           (?, 9, 'BLA BLA BLA', '03:02'),
//           (?, 10, 'BABY SAID', '02:46'),
//           (?, 11, 'GASOLINE', '03:44'),
//           (?, 12, 'FEEL', '02:48'),
//           (?, 13, 'DON''T WANNA SLEEP', '03:20'),  -- Dubbelapostrof för att undvika syntaxfel
//           (?, 14, 'KOOL KIDS', '03:01'),
//           (?, 15, 'IF NOT FOR YOU', '03:22'),
//           (?, 16, 'READ YOUR DIARY', '02:30'),
//           (?, 17, 'MARK CHAPMAN', '03:39'),
//           (?, 18, 'LA FINE', '03:20'),
//           (?, 19, 'IL DONO DELLA VITA', '03:44'),
//           (?, 20, 'MAMMAMIA', '03:06'),
//           (?, 21, 'SUPERMODEL', '02:27'),
//           (?, 22, 'THE LONELIEST', '04:06')`,
  
//   Array(22).fill(rush2AlbumID), 
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for RUSH! (ARE U COMING?) inserted successfully");
//     }
//   }
// );


// const rushAlbumID = 2; 

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//    VALUES (?, 1, 'HONEY (ARE U COMING?)', '02:47'),
//           (?, 2, 'OWN MY MIND', '03:05'),
//           (?, 3, 'GOSSIP (feat. Tom Morello)', '02:48'),
//           (?, 4, 'TIMEZONE', '03:33'),
//           (?, 5, 'BLA BLA BLA', '03:02'),
//           (?, 6, 'BABY SAID', '02:46'),
//           (?, 7, 'GASOLINE', '03:44'),
//           (?, 8, 'FEEL', '02:48'),
//           (?, 9, 'DON''T WANNA SLEEP', '03:20'),  -- Dubbelapostrof för att undvika fel
//           (?, 10, 'KOOL KIDS', '03:01'),
//           (?, 11, 'IF NOT FOR YOU', '03:22'),
//           (?, 12, 'READ YOUR DIARY', '02:30'),
//           (?, 13, 'MARK CHAPMAN', '03:39'),
//           (?, 14, 'LA FINE', '03:20'),
//           (?, 15, 'IL DONO DELLA VITA', '03:44'),
//           (?, 16, 'MAMMAMIA', '03:06'),
//           (?, 17, 'SUPERMODEL', '02:27'),
//           (?, 18, 'THE LONELIEST', '04:06')`,
  
//   Array(18).fill(rushAlbumID), 
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for RUSH! (ARE U COMING?) inserted successfully");
//     }
//   }
// );


// const teatroAlbumID = 3; 

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//    VALUES
//    (?, 1, 'ZITTI E BUONI', '03:15'),
//    (?, 2, 'CORALINE', '05:00'),
//    (?, 3, 'LIVIDI SUI GOMITI', '02:46'),
//    (?, 4, 'I WANNA BE YOUR SLAVE', '02:53'),
//    (?, 5, 'IN NOME DEL PADRE', '03:40'),
//    (?, 6, 'FOR YOUR LOVE', '03:50'),
//    (?, 7, 'LA PAURA DEL BUIO', '03:29'),
//    (?, 8, 'VENT''ANNI', '04:13')`,
//    Array(8).fill(teatroAlbumID),
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for Teatro d'ira: Vol. I inserted successfully");
//     }
//   }
// );


// const balloAlbumID = 4; 

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//    VALUES
//    (?, 1, 'NEW SONG', '03:48'),
//    (?, 2, 'TORNA A CASA', '03:50'),
//    (?, 3, 'L''ALTRA DIMENSIONE', '03:26'),
//    (?, 4, 'SH*T BLVD', '02:37'),
//    (?, 5, 'FEAR FOR NOBODY', '02:30'),
//    (?, 6, 'LE PAROLE LONTANE', '04:06'),
//    (?, 7, 'IMMORTALE (feat. Vegas Jones)', '04:02'),
//    (?, 8, 'LASCIAMI STARE', '02:49'),
//    (?, 9, 'ARE YOU READY?', '02:33'),
//    (?, 10, 'CLOSE TO THE TOP', '02:18'),
//    (?, 11, 'NIENTE DA DIRE', '02:36'),
//    (?, 12, 'MORIRÓ DA RE', '02:37')`,
//   Array(12).fill(balloAlbumID), 
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for Il ballo della vita inserted successfully");
//     }
//   }
// );


// const chosenAlbumID = 5; 

// db.run(
//   `INSERT INTO songs (albumID, trackNumber, songTitle, duration)
//    VALUES
//    (?, 1, 'CHOSEN', '02:42'),
//    (?, 2, 'RECOVERY', '02:55'),
//    (?, 3, 'VENGO DALLA LUNA', '03:04'),
//    (?, 4, 'BEGGIN', '03:31'),
//    (?, 5, 'LET''S GET IT STARTED', '02:26'),
//    (?, 6, 'SOMEBODY TOLD ME', '02:40'),
//    (?, 7, 'YOU NEED ME, I DON''T NEED YOU', '03:30')`,
//   Array(7).fill(chosenAlbumID), 
//   function (error) {
//     if (error) {
//       console.log("ERROR: ", error);
//     } else {
//       console.log("Songs for Chosen inserted successfully");
//     }
//   }
// );

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

app.use(express.urlencoded({ extended: false}));

// ROUTES
// create routes
app.get("/", function (req, res) {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin
  }
  console.log ("---> Home model: " + JSON.stringify(model))
  res.render('home.handlebars', model);
  //   res.send("My site!");
})

app.get('/about', (req, res) => {
  res.render('about.handlebars');
});

app.get('/albums', (req, res) => {
  db.all('SELECT * FROM albums', [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error fetching albums");
    }
    res.render('album', { albums: rows }); 
  });
});


app.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID;
  db.get('SELECT * FROM albums WHERE albumID = ?', [albumID], (err, row) => {
      if (err) {
          return res.status(500).send('Database error');
      }
      if (!row) {
          return res.status(404).send('Album not found');
      }
      res.render('album-details', { album: row }); 
  });
});

app.get("/members", (req, res) => {
  const model = {
    members: members
  };
  res.render("members.handlebars", model);
});


app.get('/contact/new',(req, res) => {
 res.render('add/contact');
});

app.get("/contact", (req, res) => {
  res.render("contact.handlebars"); 
});
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  db.run('INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)', [name, email, subject, message], (err) => {
    if (err) {
      res.status(500).send({error: 'Server error'});
    } else {
      res.redirect('/contact');
    }
  }) 
});

app.get("/login", (req, res) => {
  res.render("login.handlebars");
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
if (err) {
  console.log ("Error while destroying the session:  ", err)
} else {
  console.log ('Logged out...')
  res.redirect('/')
}
  })
})

// Form post login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //verification steps
  if (!username || !password) {
    //check if both username and password contain some text
    //build a model
    model = { error: "Username and password are required.", message: "" };
    // send a response
    return res.status(400).render("login.handlebars", model);
  }
  if (username == adminName) {
    console.log("The username is the admin one!");

    bcrypt.compare(password, adminPassword, (err, result) => {
      if (err) {
        //build a model
        const model = {
          error: "Error while comparing passwords: " + err,
          message: "",
        };
        //send a response
        res.render("login.handlebars", model);
      }
      if (result) {
        console.log ('The password is the admin one!')
        //save the information into the session
        req.session.isAdmin = true
        req.session.isLoggedIn = true
        req.session.name = username
        console.log ("Session information: " + JSON.stringify(req.session))
        //build a model
        // const model = { error: "", message: "Yor are the admin. Welcome!" }
        //send a response
        // res.render("login.handlebars", model);
        //do not go to /login but instead /
        res.redirect("/");
      } else {
        //build a model
        const model = { error: "Sorry, the password is not correct...", message: "" }
        //send a response
        res.status(400).render('login.handlebars', model);
      }
    })
  } else {
    //build a model
    const model = { error: `Sorry the usernam ${username} is not correct...`, message: "" }
    //send a response
    res.status(400).render('login.handlebars', model);
  }
})

//Listen
app.listen(port, () => {
  console.log("Server is running on port" + port + "...");
});
