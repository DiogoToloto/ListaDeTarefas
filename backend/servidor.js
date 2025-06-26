

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({ nome: String });
const Item = mongoose.model("Item", ItemSchema);

app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post("/items", async (req, res) => {
    const newItem = new Item({ nome: req.body.nome });
    await newItem.save();
    res.json(newItem);
});

app.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removido" });
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
