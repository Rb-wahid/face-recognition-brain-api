import express from "express";
import bodyParser from "body-parser";
import bcrypt, { hash } from "bcrypt-nodejs";
import cors from "cors";

const app = express();

const database = {
  users: [
    {
      id: "123",
      name: "Rb wahid",
      email: "rbwahid@gmail.com",
      password: "secret",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "borna",
      email: "borna@gmail.com",
      password: "incorrect",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "rbwahid@gmail.com",
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // let hash = "";
  // Load hash from your password DB.
  // bcrypt.compare(
  //   "devdash",
  //   "$2a$10$TMkeGoYRU9enQt8HRVSVGesASSOKX0xblo3YEMviPnjDOwlujdCji",
  //   function (err, res) {
  //     // res == true
  //     console.log("First guess", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$TMkeGoYRU9enQt8HRVSVGesASSOKX0xblo3YEMviPnjDOwlujdCji",
  //   function (err, res) {
  //     // res = false
  //     console.log("Second guess", res);
  //   }
  // );

  if (isValidUser(req.body)) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(lastUser());
});

function lastUser() {
  return database.users[database.users.length - 1];
}

function isValidUser({ email, password }) {
  for (const i of database.users) {
    if (email === i.email && password === i.password) {
      return true;
    }
  }
  return false;
}

isValidUser(" ");

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  console.log(req.params);
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      user.entries++;
      found = true;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json("No such file");
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
