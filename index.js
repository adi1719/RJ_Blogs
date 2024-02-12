import express from "express";
import methodOverride from "method-override";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));

// Data store to hold submitted cards
let cards = [];

app.post("/submit", (req, res) => {
    const newCard = {
        Name: req.body.headline,
        Content: req.body.story,
        id: cards.length
    };
    // Store the new card
    cards.push(newCard);
    res.redirect("/posts");
});
app.delete("/delete/:id", (req, res) => {
    const index = parseInt(req.params.id);
    cards.splice(index, 1);

    // Check if there are no more cards remaining
    if (cards.length === 0 || cards.length === 1) {
        // If no cards are remaining, redirect to "/posts"
        res.redirect("/posts");
    } else {
        // If there are remaining cards, continue with the deletion
        res.status(200).send({ message: "Card deleted successfully" });
    }
});

app.get("/", (req, res) => {
    res.render("create.ejs");
});
app.get("/posts", (req, res) => {
    res.render("posts.ejs", { cards: cards });
});
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
