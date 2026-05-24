// announcement-bar.js
// To remove the announcement bar from all pages later:
// Option 1: Set ANNOUNCEMENT_ENABLED = false
// Option 2: Delete this file entirely

const ANNOUNCEMENT_ENABLED = true;

function closeAnnouncementBar() {
    const bar = document.getElementById('announcement-bar');
    if (bar) {
        bar.style.display = 'none';
        const navbar = document.querySelector('nav');
        if (navbar) navbar.style.top = '0px';
        document.body.style.paddingTop = '0px';
        sessionStorage.setItem('announcementClosed', 'true');
    }
}

function loadAnnouncementBar() {
    if (!ANNOUNCEMENT_ENABLED) return;
    if (sessionStorage.getItem('announcementClosed') === 'true') return;

    // Inject CSS for announcement bar positioning
    const style = document.createElement('style');
    style.textContent = `
        #announcement-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background-color: #d97706;
            color: white;
            text-align: center;
            padding: 10px 16px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        #announcement-bar .ann-inner {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        #announcement-bar .ann-btn {
            background: white;
            color: #d97706;
            padding: 2px 16px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 700;
            text-decoration: none;
        }
        #announcement-bar .ann-btn:hover { background: #f3f4f6; }
        #announcement-bar .ann-close {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: rgba(255,255,255,0.8);
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
        }
        #announcement-bar .ann-close:hover { color: white; }
    `;
    document.head.appendChild(style);

    // Build the bar HTML
    const bar = document.createElement('div');
    bar.id = 'announcement-bar';
    bar.innerHTML = `
        <div class="ann-inner">
            <span>🔥 Data Analytics Bootcamp Registration is Open — Starts June 13, 2026</span>
            <a href="contact.html" class="ann-btn">Register Now</a>
        </div>
        <button class="ann-close" onclick="closeAnnouncementBar()" aria-label="Close">&#10005;</button>
    `;

    document.body.insertBefore(bar, document.body.firstChild);

    // Push navbar and body down by bar height
    requestAnimationFrame(() => {
        const barHeight = bar.offsetHeight;
        const navbar = document.querySelector('nav');
        if (navbar) navbar.style.top = barHeight + 'px';
        document.body.style.paddingTop = barHeight + 'px';
    });
}

// Run immediately when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAnnouncementBar);
} else {
    loadAnnouncementBar();
}
