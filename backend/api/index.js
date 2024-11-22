const express = require('express');
const connection = require('../Logic/dbContext');
const cors = require('cors');

const app = express()
const port = 3000
app.use(cors());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.get('/data/:controller/:channel/:einheit/:Desc', (req, res) => {
    const { controller } = req.params;
    const { channel } = req.params;
    const { einheit } = req.params;
    const { Desc } = req.params;
    var ModifiedEinHeit = einheit == "u" ? "voltage" :
        einheit == "i" ? "current" :
            einheit == "c" ? "cosphi" :
                einheit == "p" ? "power" :
                    einheit == "q" ? "reactive" :
                        einheit == "s" ? "apparent" :
                            einheit == "f" ? "frequency" : ""
    if (ModifiedEinHeit == "") {
        res.send({ "antwort": "die einheit muss : u , i , c , p , q , s , f" })
    }
    if(Desc !="j" && Desc !="n"  ){
        res.send({"antwort": "Desc muss : j , n"});

    }
    if (Desc == "j") {
        connection.query(`SELECT unit_id, servertime, ch${channel}_${ModifiedEinHeit} FROM view1s_power WHERE unit_id = ${controller} ORDER BY servertime DESC  LIMIT 100;`, (ERROR, RESULTS) => {

            res.send(RESULTS);

        })
    } if(Desc == "n") {
        connection.query(`SELECT unit_id, servertime, ch${channel}_${ModifiedEinHeit} FROM view1s_power WHERE unit_id = ${controller} ORDER BY servertime   LIMIT 100;`, (ERROR, RESULTS) => {

            res.send(RESULTS);

        })

    }

})

app.get('/analysis/:controller/:channel/:einheit/:von/:bis/:ROW_NUM', (req, res) => {
    const { controller } = req.params;
    const { channel } = req.params;
    const { einheit } = req.params;
    const { von } = req.params;
    const { bis } = req.params;
    const { ROW_NUM } = req.params;
    var ModifiedEinHeit = einheit == "u" ? "voltage" :
        einheit == "i" ? "current" :
            einheit == "c" ? "cosphi" :
                einheit == "p" ? "power" :
                    einheit == "q" ? "reactive" :
                        einheit == "s" ? "apparent" :
                            einheit == "f" ? "frequency" : ""
    if (ModifiedEinHeit == "") {
        res.send({ "antwort": "die einheit muss : u , i , c , p , q , s , f" })
    }

    connection.query(`SELECT servertime x, ch${channel}_${ModifiedEinHeit} y FROM view1s_power WHERE unit_id = ${controller} AND servertime BETWEEN "${von}" AND "${bis}"  ORDER BY servertime  LIMIT ${ROW_NUM} ;`, (ERROR, RESULTS) => {

        res.send(RESULTS);

    })

    

})
app.get('/komp/:controller/:channel/:einheit/:von/:bis/:ROW_NUM', (req, res) => {
    const { controller } = req.params;
    const { channel } = req.params;
    const { einheit } = req.params;
    const { von } = req.params;
    const { bis } = req.params;
    const { ROW_NUM } = req.params;
    var ModifiedEinHeit = einheit == "u" ? "voltage" :
        einheit == "i" ? "current" :
            einheit == "c" ? "cosphi" :
                einheit == "p" ? "power" :
                    einheit == "q" ? "reactive" :
                        einheit == "s" ? "apparent" :
                            einheit == "f" ? "frequency" : ""
    if (ModifiedEinHeit == "") {
        res.send({ "antwort": "die einheit muss : u , i , c , p , q , s , f" })
    }

    connection.query(`SELECT servertime x, ch${channel}_${ModifiedEinHeit} y FROM view1s_power WHERE unit_id = ${controller} AND servertime BETWEEN "${von}" AND "${bis}"  ORDER BY servertime  LIMIT ${ROW_NUM} ;`, (ERROR, RESULTS) => {

        res.send(RESULTS);

    })

    

})

app.listen(port || process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
})