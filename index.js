import express from "express";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token("body", function (req,res){
    return JSON.stringify(req.body)
});

app.use(cors());
app.use(morgan(":method :url :status :body"));
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        importart: true
    },
    {
        id: 2,
        content: "Javascript is hard",
        importart: false
    },
    {
        id: 3,
        content: "this is a note",
        importart: true
    },
    {
        id: 4,
        content: "CSS is awesome",
        importart: true
    },
];



function generateID() {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
}

// url and function
app.get("/", (req,res) => {
    res.send("<h1>Hello JS</h1>");
});

app.get("/notes/info", (req,res) => {
    const totalNumber = notes.length;
    return res.send(`<p> Notes app have ${totalNumber} notes</p>`)
});

app.get("/notes", (req,res) => {
    res.json(notes);
});

app.get("/notes/:id", (req,res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);

    res.json(note);
});



app.delete("/notes/:id", (req,res) => {
    const id = Number (req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
})

app.post ("/notes", (req,res) => {
    const body = req.body;

    if (!body.content){
        return res.status(400).json({error: "content missing"});
    }

    const note = {
        id: generateID(),
        content: body.content,
        important: body.important || false,
    }
   
    notes = notes.concat(note);
    res.status(201).json(note);
});




app.listen(PORT, () => {
    console.log('Server is Running on PORT 3001')
});
