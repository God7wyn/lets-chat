const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const PORT = 7000;

// app.get("/", (req, res) => {
//   res.status(200).json({ name: "Server" });
// });

const users = {};

io.on("connection", (socket) => {
	console.log("someone connected and socket id " + socket.id);

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`);

		for (let user in users) {
			if (users[user] === socket.id) {
				delete users[user];
			}
		}

		io.emit("all_users", users);
	});

	socket.on("new_user", (username) => {
		console.log("Server : " + username);
		users[username] = socket.id;

		//This is a broadcast to tell every other users someone connected
		io.emit("all_users", users);
	});

	socket.on("send_message", (data) => {
		console.log(data);

		const socketId = users[data.receiver];
		io.to(socketId).emit("new_message", data);
	});

	socket.on("view_message", (sender, receiver) => {
		console.log(sender);

		const socketId = users[sender];
		console.log(socketId);
		io.to(socketId).emit("view", sender, receiver);
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server Listening on port ${PORT}`);
});
