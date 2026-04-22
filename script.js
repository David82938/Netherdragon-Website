document.getElementById('year').innerText = new Date().getFullYear();
document.getElementById("click-event").onclick = function() {
    navigator.clipboard.writeText("play.netherdragon.net").then(function() {
        document.getElementById("click-event").innerText = "Copied to clipboard!";
        setTimeout(function() {
            document.getElementById("click-event").innerText = "play.netherdragon.net";
        }, 1000);
    });
};
const statusEl = document.getElementById("server-status");
function updateStatus() {
    fetch("https://api.mcsrvstat.us/2/play.netherdragon.net")
        .then(res => res.json())
        .then(data => {
            if (data.online) {
                if (data.players.online == 0) {
                    statusEl.innerText = "Online";
                } else {
                    statusEl.innerText =
                        `Online — ${data.players.online}/${data.players.max} players`;
                }
                statusEl.style.color = "lightgreen";
            } else {
                statusEl.innerText = "Offline";
                statusEl.style.color = "red";
            }
        })
        .catch(() => {
            statusEl.innerText = "⚠ Status unavailable";
        });
}
updateStatus();
setInterval(updateStatus, 15000);
// Menu toggle for tablet/mobile
(function(){
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    if (!menuToggle || !nav) return;
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('open');
    });
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.classList.contains('open')) return;
        if (!nav.contains(e.target) && e.target !== menuToggle) {
            nav.classList.remove('open');
        }
    });
    // Close when a link is clicked
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
})();