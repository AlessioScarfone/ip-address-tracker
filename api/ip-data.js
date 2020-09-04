const fetch = require("node-fetch");
const net = require('net');

module.exports = async (req, res) => {

    let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_API_KEY}`;

    const input = req.query.search;
    if (input) {
        //isIP: Tests if input is an IP address. Returns 0 for invalid strings, returns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses.
        const domainRegex = new RegExp(/(?:[\w-]+\.)+[\w-]+/);
        if (net.isIP(input) !== 0) {
            url += `&ipAddress=${input}`
        } else if(domainRegex.test(input)) {
            url += `&domain=${input}`
        }
        else {
            res.status(400);
            res.send({ error: "Input not valid" });
        }
    }

    console.log("call url:", url);

    let ipData = await fetch(url);
    let json = await ipData.json();
    if (json.messages && json.code) {
        console.error("ERROR: ", "IP: " + input, "Message: " + json.messages)
        res.status(json.code);
        res.send({ error: json.messages })
    } else {
        console.log(json);
        res.send(json);
    }

}   