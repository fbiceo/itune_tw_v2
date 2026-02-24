document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine Language (Default vs LocalStorage)
    const savedLang = localStorage.getItem('i18n_lang');
    const defaultLang = 'zh-TW';
    const currentLang = savedLang || defaultLang;

    // 2. DOM Elements
    const langSwitcher = document.getElementById('lang-switcher');

    // Set initial value of switcher if it exists
    if (langSwitcher) {
        langSwitcher.value = currentLang;

        // Listen to changes
        langSwitcher.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // 3. Apply Language Function
    function setLanguage(lang) {
        if (!translations[lang]) return;

        // Save to LocalStorage
        localStorage.setItem('i18n_lang', lang);

        // Update document lang attribute
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Check if we need to set innerHTML or textContent
                // If the translation contains HTML tags (like <i>) or HTML entities (like &copy;), use innerHTML
                if (translations[lang][key].includes('<') || translations[lang][key].includes('&')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update document title and meta description
        if (translations[lang]["meta.title"]) {
            document.title = translations[lang]["meta.title"];
        }
        if (translations[lang]["meta.desc"]) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute("content", translations[lang]["meta.desc"]);
            }
        }
    }

    // 4. Initialize
    setLanguage(currentLang);
});
