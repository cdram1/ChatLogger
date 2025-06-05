if (window.alt1) {
  alt1.identifyAppUrl("./appconfig.json");
  alt1.setOverlay(false);
}

const BROADCAST_KEYWORDS = [
  "has received", "News:", "received a drop", "rare drop", "pet"
];

let loggedMessages = [];

function captureChat() {
  const cap = a1lib.captureHoldFullRs();
  const ocr = new a1lib.Ocr();

  ocr.loadFont("smallchars");

  const text = ocr.readSmall(cap.canvas);

  if (text && text.text) {
    const lines = text.text.split("\n");

    lines.forEach(line => {
      if (BROADCAST_KEYWORDS.some(k => line.includes(k))) {
        if (!loggedMessages.includes(line)) {
          loggedMessages.push(line);
          const li = document.createElement("li");
          li.textContent = line;
          document.getElementById("log").appendChild(li);
        }
      }
    });
  }
}

setInterval(captureChat, 10000);

function exportToCSV() {
  if (loggedMessages.length === 0) {
    alert("No messages to export.");
    return;
  }

  const csvContent = "data:text/csv;charset=utf-8,"
    + loggedMessages.map(e => `"${e.replace(/"/g, '""')}"`).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chat_log.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Hook up export button
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);
});
