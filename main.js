/**
 * TechFixIT Core Engine (V5.0 - Unified Single-Page Architecture)


const TechFixApp = (() => {
    
    const State = {
        db: [
            { id: 1, category: 'hardware', title: 'Power Supply Failure', content: 'Test PSU with a multimeter. Avoid opening high-voltage capacitors.', keywords: ['psu', 'battery'] },
            { id: 2, category: 'network', title: 'Slow Wi-Fi Speeds', content: 'Switch to 5GHz or change channels (1, 6, 11) to avoid interference.', keywords: ['internet', 'router'] },
            { id: 3, category: 'security', title: 'Malware Removal', content: 'Run a rootkit scan and verify startup items in Task Manager.', keywords: ['virus', 'safety'] },
            { id: 4, category: 'hardware', title: 'Thermal Throttling', content: 'Re-apply thermal paste if CPU temps exceed 90°C under load.', keywords: ['heat', 'fan'] }
        ],
        services: [
            { title: "PC Build", desc: "Optimized assembly and cable management." },
            { title: "Network Audit", desc: "Security and signal-strength analysis." },
            { title: "Data Recovery", desc: "Deep restoration for corrupted drives." },
            { title: "OS Tuning", desc: "Removing bloat for maximum hardware performance." },
            { title: "Virus Clean", desc: "Deep system sterilization and protection." }
        ],
        searchQuery: '',
        activeCategory: 'all',
        carouselIndex: 0,
        isTransitioning: false
    };

    // --- MODULES ---

    const handleTheme = () => {
        const apply = (t) => {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('tf_theme', t);
        };
        apply(localStorage.getItem('tf_theme') || 'light');
        document.querySelectorAll('#theme-toggle').forEach(b => b.addEventListener('click', () => {
            apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        }));
    };

    const fetchMarketData = async () => {
        const el = document.querySelector('#ram-price');
        if (!el) return;
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd');
            const data = await res.json();
            el.textContent = `$${(data.litecoin.usd / 2.1).toFixed(2)} USD`;
        } catch (e) { el.textContent = "OFFLINE"; }
    };

    const renderKB = () => {
        const area = document.querySelector('#results-area');
        if (!area) return;
        const filtered = State.db.filter(i => {
            const q = State.searchQuery.toLowerCase();
            return (i.title.toLowerCase().includes(q) || i.keywords.some(k => k.includes(q))) &&
                   (State.activeCategory === 'all' || i.category === State.activeCategory);
        });
        area.innerHTML = filtered.map(i => `
            <div class="card"><small>${i.category}</small><h3>${i.title}</h3><p>${i.content}</p></div>
        `).join('') || '<p>No results.</p>';
    };

    const initCarousel = () => {
        const track = document.querySelector('#carouselTrack');
        if (!track) return;

        // Render & Clone
        track.innerHTML = State.services.map(s => `<div class="service-card"><h2>${s.title}</h2><p>${s.desc}</p></div>`).join('');
        [...track.children].slice(0, 3).forEach(c => track.appendChild(c.cloneNode(true)));

        const move = (smooth = true) => {
            const w = track.querySelector('.service-card').offsetWidth + 20;
            track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
            track.style.transform = `translateX(-${State.carouselIndex * w}px)`;
        };

        const next = () => {
            if (State.isTransitioning) return;
            State.isTransitioning = true; State.carouselIndex++; move(true);
            if (State.carouselIndex >= State.services.length) {
                setTimeout(() => { State.carouselIndex = 0; move(false); State.isTransitioning = false; }, 500);
            } else { setTimeout(() => State.isTransitioning = false, 500); }
        };

        const prev = () => {
            if (State.isTransitioning) return;
            State.isTransitioning = true;
            if (State.carouselIndex <= 0) {
                State.carouselIndex = State.services.length; move(false);
                setTimeout(() => { State.carouselIndex--; move(true); setTimeout(() => State.isTransitioning = false, 500); }, 10);
            } else { State.carouselIndex--; move(true); setTimeout(() => State.isTransitioning = false, 500); }
        };

        document.querySelector('#nextBtn')?.addEventListener('click', next);
        document.querySelector('#prevBtn')?.addEventListener('click', prev);
        window.addEventListener('resize', () => move(false));
        move(false);
    };

    return {
        init: () => {
            handleTheme();
            initCarousel();
            fetchMarketData();
            renderKB();
            
            document.querySelector('#searchInput')?.addEventListener('input', (e) => {
                State.searchQuery = e.target.value;
                renderKB();
            });

            document.addEventListener('click', (e) => {
                const b = e.target.closest('.category-filter');
                if (b) { State.activeCategory = b.dataset.category; renderKB(); }
            });
        }
    };
})();

document.addEventListener('DOMContentLoaded', TechFixApp.init);

*/

/**
 * TechFixIT Core Engine (V5.1 - Lime Edition)
 */

const TechFixApp = (() => {
    
    const State = {
        db: [
            { id: 1, category: 'hardware', title: 'Power Supply Failure', content: 'Test PSU with a multimeter. Avoid opening high-voltage capacitors.', keywords: ['psu', 'battery'] },
            { id: 2, category: 'network', title: 'Slow Wi-Fi Speeds', content: 'Switch to 5GHz or change channels (1, 6, 11) to avoid interference.', keywords: ['internet', 'router'] },
            { id: 3, category: 'security', title: 'Malware Removal', content: 'Run a rootkit scan and verify startup items in Task Manager.', keywords: ['virus', 'safety'] },
            { id: 4, category: 'hardware', title: 'Thermal Throttling', content: 'Re-apply thermal paste if CPU temps exceed 90°C under load.', keywords: ['heat', 'fan'] }
        ],
        services: [
            { title: "PC Build", desc: "Optimized assembly and cable management." },
            { title: "Network Audit", desc: "Security and signal-strength analysis." },
            { title: "Data Recovery", desc: "Deep restoration for corrupted drives." },
            { title: "OS Tuning", desc: "Removing bloat for maximum hardware performance." },
            { title: "Virus Clean", desc: "Deep system sterilization and protection." }
        ],
        searchQuery: '',
        activeCategory: 'all',
        carouselIndex: 0,
        isTransitioning: false
    };

    const handleTheme = () => {
        const apply = (t) => {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('tf_theme', t);
        };
        apply(localStorage.getItem('tf_theme') || 'light');
        document.querySelectorAll('#theme-toggle').forEach(b => b.addEventListener('click', () => {
            apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        }));
    };

    const fetchMarketData = async () => {
        const el = document.querySelector('#ram-price');
        if (!el) return;
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd');
            const data = await res.json();
            el.textContent = `$${(data.litecoin.usd / 2.1).toFixed(2)} USD`;
        } catch (e) { el.textContent = "OFFLINE"; }
    };

    const renderKB = () => {
        const area = document.querySelector('#results-area');
        if (!area) return;
        const filtered = State.db.filter(i => {
            const q = State.searchQuery.toLowerCase();
            return (i.title.toLowerCase().includes(q) || i.keywords.some(k => k.includes(q))) &&
                   (State.activeCategory === 'all' || i.category === State.activeCategory);
        });
        area.innerHTML = filtered.map(i => `
            <div class="card"><small>${i.category}</small><h3>${i.title}</h3><p>${i.content}</p></div>
        `).join('') || '<p>No results.</p>';
    };

    const initCarousel = () => {
        const track = document.querySelector('#carouselTrack');
        if (!track) return;

        track.innerHTML = State.services.map(s => `<div class="service-card"><h2>${s.title}</h2><p>${s.desc}</p></div>`).join('');
        [...track.children].slice(0, 3).forEach(c => track.appendChild(c.cloneNode(true)));

        const move = (smooth = true) => {
            const w = track.querySelector('.service-card').offsetWidth + 20;
            track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
            track.style.transform = `translateX(-${State.carouselIndex * w}px)`;
        };

        const next = () => {
            if (State.isTransitioning) return;
            State.isTransitioning = true; State.carouselIndex++; move(true);
            if (State.carouselIndex >= State.services.length) {
                setTimeout(() => { State.carouselIndex = 0; move(false); State.isTransitioning = false; }, 500);
            } else { setTimeout(() => State.isTransitioning = false, 500); }
        };

        const prev = () => {
            if (State.isTransitioning) return;
            State.isTransitioning = true;
            if (State.carouselIndex <= 0) {
                State.carouselIndex = State.services.length; move(false);
                setTimeout(() => { State.carouselIndex--; move(true); setTimeout(() => State.isTransitioning = false, 500); }, 10);
            } else { State.carouselIndex--; move(true); setTimeout(() => State.isTransitioning = false, 500); }
        };

        document.querySelector('#nextBtn')?.addEventListener('click', next);
        document.querySelector('#prevBtn')?.addEventListener('click', prev);
        window.addEventListener('resize', () => move(false));
        move(false);
    };

    return {
        init: () => {
            handleTheme();
            initCarousel();
            fetchMarketData();
            renderKB();
            
            document.querySelector('#searchInput')?.addEventListener('input', (e) => {
                State.searchQuery = e.target.value;
                renderKB();
            });

            document.addEventListener('click', (e) => {
                const b = e.target.closest('.category-filter');
                if (b) { State.activeCategory = b.dataset.category; renderKB(); }
            });
        }
    };
})();

document.addEventListener('DOMContentLoaded', TechFixApp.init);