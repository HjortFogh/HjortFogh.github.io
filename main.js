window.onload=function() {
	canvas = document.getElementById("game_screen");
	ctx = canvas.getContext("2d");

	console.log("Logged");

	ctx.fillRect(20, 20, 100, 100);
}