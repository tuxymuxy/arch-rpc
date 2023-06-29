const RPC = require("discord-rpc");
var colors = require("colors");
const config = require("./config.json");
const rpc = new RPC.Client({
	transport: "ipc",
});
function getRandom(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
const strings = [
	"Installing Arch on my washing machine",
	"Installing Arch on my keyboard",
	"Installing Linux on my stove",
	"Installing Arch on my browser",
	"Installing Arch on my freezer",
	"Installing Linux on my clock",
	"Installing Arch on my smart fridge",
	"Installing Linux on my microwave",
	"Installing Arch for the 100th time",
];
let time = new Date();
let i = 0;
let updatePresence = () => {
	if (i != 250) {
		i = i + 1;
		console.log(i);
	}
	rpc.setActivity({
		details: getRandom(strings),
		largeImageKey: "arch",
		largeImageText: "Arch Logo",
		state: "Installing Packages",
		partySize: i,
		partyMax: 250,
		startTimestamp: time,
	});
	console.log("[INFO] ".green + "Updated Presence!".magenta);
};
rpc.on("ready", () => {
	console.log("[INFO] ".green + "Connected to Discord's API".magenta);
	updatePresence();
	setInterval(updatePresence, config.updateIntervalInMinutes * 60 * 1000);
});
rpc.login({
	clientId: config.clientID,
});
rpc.on("error", (err) => {
	console.log(err);
});
