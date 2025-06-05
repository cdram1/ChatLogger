// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  const logEl = document.getElementById("log");
  const exportBtn = document.getElementById("exportBtn");

  if (!window.alt1) {
    alert("Alt1 is not detected. Please open this plugin inside the Alt1 Toolkit.");
    return;
  }

  if (!alt1.chatbox || !alt1.chatbox.listen) {
    alert("Alt1 chatbox API not available. Make sure Alt1 is allowed to access your RS client.");
    return;
  }

  alt1.chatbox.listen((data) => {
    if (!data || data.channel !== "Broadcast" || !data.text) return;

    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement("li");
    entry.textContent = `${timestamp} - ${data.text}`;
    logEl.appendChild(entry);
  });

  exportBtn.addEventListener("click", () => {
    const rows = Array.from(logEl.children).map(li => li.textContent);
    const csv = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encoded = encodeURI(csv);

    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", "broadcast_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
