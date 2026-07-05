// =========================
// GLOBAL
// =========================

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

// =========================
// SEND MESSAGE
// =========================

function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    // USER MESSAGE

    const user = document.createElement("div");

    user.className = "user-message";

    user.innerHTML = `
        <p>${message}</p>
        <small>${time}</small>
    `;

    chatBox.appendChild(user);

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;

    saveChat();

    // TYPING

    const typing = document.createElement("div");

    typing.className = "bot-message typing";

    typing.innerHTML = "🤖 Mimi is typing<span class='dots'></span>";

    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(function () {

        typing.remove();

        // BOT MESSAGE

        const bot = document.createElement("div");

        bot.className = "bot-message";

        bot.innerHTML = `
            <p>${getBotReply(message)}</p>
            <small>${time}</small>
        `;

        chatBox.appendChild(bot);

        chatBox.scrollTop = chatBox.scrollHeight;

        saveChat();

    }, 1000);

}

// =========================
// BOT REPLY
// =========================

function getBotReply(message) {

    message = message.toLowerCase();

    if (message.includes("happy")) {

        return "😊 That's wonderful! Keep smiling and enjoy your day.";

    }

    else if (message.includes("sad")) {

        return "💙 I'm sorry you're feeling sad. Tough times don't last forever.";

    }

    else if (message.includes("stress")) {

        return "🌿 Take a deep breath. Drink some water and relax for a few minutes.";

    }

    else if (message.includes("angry")) {

        return "😌 It's okay to feel angry. Calm yourself before reacting.";

    }

    else if (message.includes("lonely")) {

        return "🤗 You're not alone. I'm always here to listen.";

    }

    else if (message.includes("exam")) {

        return "📚 Believe in yourself. You've got this!";

    }

    else if (message.includes("job")) {

        return "💼 Keep learning and applying. Your opportunity will come.";

    }

    else if (message.includes("love")) {

        return "❤️ Healthy relationships are built with trust and respect.";

    }

    else if (
        message.includes("hello") ||
        message.includes("hi")
    ) {

        return "👋 Hello! Nice to see you. How are you feeling today?";

    }

    else if (message.includes("thank")) {

        return "😊 You're always welcome!";

    }

    else {

        return "💜 I understand. Tell me a little more so I can help you.";

    }

}

// =========================
// ENTER KEY
// =========================

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// =========================
// SAVE CHAT
// =========================

function saveChat() {

    localStorage.setItem("chatData", chatBox.innerHTML);

}

// =========================
// PAGE LOAD
// =========================

window.onload = function () {

    // LOAD CHAT

    const savedChat = localStorage.getItem("chatData");

    if (savedChat) {

        chatBox.innerHTML = savedChat;

    }

    // LOAD USER NAME

    const username = localStorage.getItem("username");

    if (username && document.getElementById("userName")) {

        document.getElementById("userName").innerText = username;

    }

    // LOAD THEME

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        const themeBtn = document.getElementById("themeBtn");

        if (themeBtn) {

            themeBtn.innerHTML = "☀️";

        }

    }

};

// =========================
// CLEAR CHAT
// =========================

function clearChat() {

    localStorage.removeItem("chatData");

    chatBox.innerHTML = `

        <div class="bot-message">

            👋 Hello! I'm <b>Mimi</b>.

            <br><br>

            How are you feeling today? 💜

        </div>

    `;

}
// =========================
// EMOJI PICKER
// =========================

const emojiBtn = document.getElementById("emojiBtn");
const emojiBox = document.getElementById("emojiBox");

emojiBtn.addEventListener("click", function () {

    if (emojiBox.style.display === "block") {

        emojiBox.style.display = "none";

    } else {

        emojiBox.style.display = "block";

    }

});

emojiBox.querySelectorAll("span").forEach(function (emoji) {

    emoji.addEventListener("click", function () {

        input.value += this.innerText;

        emojiBox.style.display = "none";

        input.focus();

    });

});

// Close emoji picker when clicking outside

document.addEventListener("click", function (e) {

    if (
        !emojiBox.contains(e.target) &&
        e.target !== emojiBtn
    ) {

        emojiBox.style.display = "none";

    }

});


// =========================
// QUICK REPLIES
// =========================

function quickReply(text) {

    input.value = text;

    sendMessage();

}



// =========================
// VOICE RECOGNITION
// =========================

if ("webkitSpeechRecognition" in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    document.getElementById("voiceBtn").addEventListener("click", function () {

        recognition.start();

    });

    recognition.onresult = function (event) {

        input.value = event.results[0][0].transcript;

        input.focus();

    };

    recognition.onerror = function () {

        alert("Voice recognition failed. Please try again.");

    };

}


// =========================
// DARK MODE
// =========================

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-mode")) {

        btn.innerHTML = "☀️";

        localStorage.setItem("theme", "dark");

    }

    else {

        btn.innerHTML = "🌙";

        localStorage.setItem("theme", "light");

    }

}


// =========================
// LOGIN
// =========================

function loginUser() {

    const username = document.getElementById("username").value.trim();

    if (username === "") {

        alert("Please enter your username.");

        return;

    }

    localStorage.setItem("username", username);

    window.location.href = "chat.html";

}


// =========================
// EXPORT CHAT
// =========================

function downloadChat() {

    const chat = chatBox.innerText;

    const blob = new Blob([chat], {

        type: "text/plain"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "MindCareAI_Chat.txt";

    link.click();

}