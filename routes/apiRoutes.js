const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");


router.get('/api/notes', async (req, res) => {
  const jsonDb = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(jsonDb);
});


router.post('/api/notes', (req, res) => {
  const jsonDb = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const feedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  jsonDb.push(feedback);
  fs.writeFileSync("db/db.json",JSON.stringify(jsonDb));
  res.json(jsonDb);
});


router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON =  JSON.parse(data);
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
  res.json("Deleted note.");
});

module.exports = router; 
