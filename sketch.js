let rec, voice, brain;

function setup() {
    rec = new p5.SpeechRec("da-DK");
    rec.onResult = onRecResult;
    rec.continuous = false;
    rec.interimResults = false;

    voice = new p5.Speech();
    voice.setLang("da-DK");
    voice.onEnd = onSpeechEnd;
    voice.setPitch(1.6);

    brain = new RiveScript();
    brain.loadFile("brain.rive").then(brainReady).catch(brainError);
}

function brainReady() {
    console.log("Chatbot is ready!");
    brain.sortReplies();
    rec.start();
}

function brainError() {
    console.error("Chatbot error!");
}

function onSpeechEnd() {
    rec.start();
}

function speakResponse(reply) {
    voice.speak(reply);
}

function onRecResult() {
    let speech = rec.resultString.toLowerCase();
    speech = speech.replace("æ", "ae");
    speech = speech.replace("ø", "oe");
    speech = speech.replace("å", "aa");

    console.log(speech);
    brain.reply("local-user", speech).then(speakResponse);
}
