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
                statusEl.style.color = "#09b909";
            } else {
                statusEl.innerText = "Offline";
                statusEl.style.color = "#FF0000";
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
// Update Shop product visibility based on filters
document.getElementById('shop-filter').addEventListener('change', function() {
    const filter = this.value;
    document.querySelectorAll('.product').forEach(product => {
        if (filter === 'all') {
            product.style.display = '';
        } else if (product.classList.contains(`filter-${filter}`)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
    if (document.querySelector('.filter-ranks:not([style*="display: none"])')) {
        document.getElementById('ranks-title').style.display = '';
    } else {
        document.getElementById('ranks-title').style.display = 'none';
    }
    if (document.querySelector('.filter-cosmetics:not([style*="display: none"])')) {
        document.getElementById('cosmetics-title').style.display = '';
    } else {
        document.getElementById('cosmetics-title').style.display = 'none';
    }
    if (document.querySelector('.filter-other:not([style*="display: none"])')) {
        document.getElementById('other-title').style.display = '';
    } else {
        document.getElementById('other-title').style.display = 'none';
    }
    if (document.querySelectorAll('.product:not([style*="display: none"])').length === 0) {
        document.getElementById('filter-nothing').style.display = '';
    } else {
        document.getElementById('filter-nothing').style.display = 'none';
    }
});
// Update Limited Time Offers
function updateLimitedOffers() {
    const now = new Date();
    const offer1End = new Date("2026-07-31T23:59:59");
    const offer2End = new Date("2026-08-15T23:59:59");
    const offer1El = document.getElementById("limited-1");
    const offer2El = document.getElementById("limited-2");
    offer1El.innerHTML = offer1End-now > 0 ? `Ends in ${Math.floor((offer1End - now) / (1000 * 60 * 60 * 24))}d` : "Expired";
    offer2El.innerHTML = offer2End-now > 0 ? `Ends in ${Math.floor((offer2End - now) / (1000 * 60 * 60 * 24))}d` : "Expired";
}
updateLimitedOffers();
setInterval(updateLimitedOffers, 1000);