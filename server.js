const express = require("express");
const mysql = require("mysql")
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { error } = require("console");
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: 3307,
        password: "",
        database: "teliolimpia"
    }

)
//a szerver futásának ellenőrzése
app.get("/", (req, res) => {
    res.send("Szerver működik!")
}
)
app.get("/v", (req, res) => {
    const sql = "Select *From versenyzok"
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);

    })
})

app.get("/v3/:id", (req , res)=> {
    const sql = "Select * From teliolimpia.versenyzok WHERE ID = 3"
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);

    })
})
app.post("/vuj",(req , res) => {
    const sql = "INSERT INTO 'versenyzok' ('ID', 'versenyzo') VALUES (?,?)";
    const VALUES = [req.body.ID,req.body.versenyzo];
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({error:"Hibás adatbázis művelet!"});
        return res.json(result);


})
})




app.listen(3000, () => {
    console.log("A server a 3000 porton fut!")
})