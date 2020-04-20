const db = require("../controllers/database.js");

module.exports = newPlayerBegin = async (
  id,
  count,
  playerLine,
  io
) => {
  const result = playerLine.find(player => player.id === id)
  if(result == undefined) {
    return null
  } else {
    let player = id.id
    console.log(id.id)
    io.to(player).emit('wait', `currently a round is active. Please wait so that you can enter the game`);
    console.log("is niet undefined")
  }
}