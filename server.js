//======= Require third-party stuff =======//

const express = require("express")
    , _ = require("underscore")
    , socket = require('socket.io');

//======= Start Express app and Socket instance =======//

const app = express()
    , io = socket(app.listen(3005, () => console.log('Server listening on port 3005')));

//======= Store data in variables on server instead of database =======//

const questions = require('./app-questions');
let connections = []
  , title = ""
  , audience = []
  , speaker = {}
  , currentQuestion = false
  , results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
  };

//======= Do Socket Stuff =======//

io.sockets.on("connection", socket => {

  //======= On Socket Connection =======//

  connections.push(socket);
  console.log(`connected: ${connections.length} sockets connected`);

  socket.emit("welcome", {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results
  });

  //======= Custom events =======//

  socket.on("join", function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: "member"
    };
    this.emit("joined", newMember);
    audience.push(newMember);
    io.sockets.emit("audience", audience);
    console.log(`audience joined: ${payload.name}` );
  });

  socket.on("start", function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker";
    title = payload.title
    this.emit("joined", speaker);
    io.sockets.emit('start', {title: title, speaker: speaker.name})
    console.log(`Presentation Started: ${title} by ${speaker.name}`);
  });

  socket.on("ask", function(question){
    currentQuestion = question;
    results = {a:0, b:0, c:0, d:0}
    io.sockets.emit('ask', currentQuestion);
    console.log(`Question Asked: ${question.q}`)
  })

  socket.on("answer", function(payload) {
    results[payload.choice]++;
    io.sockets.emit('results', results);
    console.log(`Answer: ${payload.choice} -- ${JSON.stringify(results)}`)
  })


  //======= On Socket Disconnection =======//
  socket.once("disconnect", function() {
    const member = _.findWhere(audience, { id: this.id });

    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
      console.log(`Left: ${member.name} (${audience.length} audience members)`);
    }
    else if(this.id === speaker.id) {
      console.log(`${speaker.name} has left. '${speaker.title}' is over.`);
      speaker = {};
      title = "Untitled Presentation";
      io.sockets.emit('end', { title: title, speaker: "" })
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log(`disconnected: ${connections.length} sockets remaining`);
  });
});
