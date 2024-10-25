const express = require('express');
const connection = require('./Logic/dbContext');
const app = express()
const port = 3000


app.get('/data/:controller/:channel/:einheit', (req, res) => {
    const { controller } = req.params;
    const { channel } = req.params;
    const { einheit } = req.params;
    var ModifiedEinHeit =  einheit =="u" ? "voltage" :
                            einheit =="i" ? "current":
                            einheit =="c" ? "cosphi":
                            einheit =="p" ? "power":
                            einheit =="q" ? "reactive":
                            einheit =="s" ? "apparent":
                            einheit =="f" ? "frequency": ""
    if(ModifiedEinHeit ==""){
        res.send({"antwort": "die einheit muss : u , i , c , p , q , s , f"})
    }
    

    connection.query(`SELECT unit_id, servertime, ch${channel}_${ModifiedEinHeit} FROM view1s_power WHERE unit_id = ${controller} ORDER BY servertime;`,(ERROR , RESULTS)=>{

        res.send(RESULTS);

    })
    
})


app.listen(port || process.env.PORT , () => {
    console.log(`Server is running on port ${port}`);
})