import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaEnvelope, FaArrowUp, FaCog, FaDiscord } from 'react-icons/fa';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to My Portfolio",
      subtitle: "I'm a fullstack developer creating sleek and interactive website experiences.",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact Me",
      contactText: "Feel free to reach out through any of the platforms below!",
    },
  },
  sv: {
    translation: {
      welcome: "Välkommen till min portfölj",
      subtitle: "Jag är en fullstackutvecklare som skapar snygga och interaktiva webbupplevelser.",
      projects: "Projekt",
      skills: "Färdigheter",
      contact: "Kontakta mig",
      contactText: "Tveka inte att kontakta mig via någon av plattformarna nedan!",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue dans mon portfolio",
      subtitle: "Je suis un développeur fullstack créant des expériences web élégantes et interactives.",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contactez-moi",
      contactText: "N'hésitez pas à me contacter via l'une des plateformes ci-dessous !",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a mi portafolio",
      subtitle: "Soy un desarrollador fullstack que crea experiencias web elegantes e interactivas.",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contáctame",
      contactText: "¡No dudes en contactarme a través de cualquiera de las plataformas a continuación!",
    },
  },
  zh: {
    translation: {
      welcome: "欢迎来到我的作品集",
      subtitle: "我是一名全栈开发者，致力于打造优雅互动的网页体验。",
      projects: "项目",
      skills: "技能",
      contact: "联系我",
      contactText: "欢迎通过下列平台与我联系！",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبًا بك في معرض أعمالي",
      subtitle: "أنا مطور شامل أنشئ تجارب ويب أنيقة وتفاعلية.",
      projects: "المشاريع",
      skills: "المهارات",
      contact: "تواصل معي",
      contactText: "لا تتردد في التواصل معي عبر أي من المنصات التالية!",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen in meinem Portfolio",
      subtitle: "Ich bin ein Fullstack-Entwickler und kreiere elegante und interaktive Web-Erlebnisse.",
      projects: "Projekte",
      skills: "Fähigkeiten",
      contact: "Kontaktieren Sie mich",
      contactText: "Zögern Sie nicht, mich über eine der folgenden Plattformen zu kontaktieren!",
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo ao meu portfólio",
      subtitle: "Sou um desenvolvedor fullstack criando experiências web elegantes e interativas.",
      projects: "Projetos",
      skills: "Habilidades",
      contact: "Contate-me",
      contactText: "Sinta-se à vontade para entrar em contato por qualquer uma das plataformas abaixo!",
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать в мое портфолио",
      subtitle: "Я fullstack-разработчик, создающий элегантные и интерактивные веб-опыты.",
      projects: "Проекты",
      skills: "Навыки",
      contact: "Связаться со мной",
      contactText: "Не стесняйтесь связаться со мной через любую из платформ ниже!",
    },
  },
  hi: {
    translation: {
      welcome: "मेरे पोर्टफोलियो में आपका स्वागत है",
      subtitle: "मैं एक फुलस्टैक डेवलपर हूँ जो सुंदर और इंटरएक्टिव वेबसाइट अनुभव बनाता हूँ।",
      projects: "प्रोजेक्ट्स",
      skills: "कौशल",
      contact: "संपर्क करें",
      contactText: "नीचे दिए गए किसी भी प्लेटफ़ॉर्म के माध्यम से मुझसे बेझिझक संपर्क करें!",
    },
  },
  bn: {
    translation: {
      welcome: "আমার পোর্টফোলিওতে স্বাগতম",
      subtitle: "আমি একজন ফুলস্ট্যাক ডেভেলপার যিনি চমৎকার এবং ইন্টারঅ্যাকটিভ ওয়েব অভিজ্ঞতা তৈরি করি।",
      projects: "প্রজেক্ট",
      skills: "দক্ষতা",
      contact: "যোগাযোগ করুন",
      contactText: "নিচের যেকোনো প্ল্যাটফর্মের মাধ্যমে নির্দ্বিধায় যোগাযোগ করুন!",
    },
  },
  bs: {
    translation: {
      welcome: "Dobrodošli u moj portfolio",
      subtitle: "Ja sam fullstack programer koji kreira elegantna i interaktivna web iskustva.",
      projects: "Projekti",
      skills: "Vještine",
      contact: "Kontaktirajte me",
      contactText: "Slobodno me kontaktirajte putem bilo koje od platformi ispod!",
    },
  },
  id: {
    translation: {
      welcome: "Selamat datang di portofolio saya",
      subtitle: "Saya adalah pengembang fullstack yang menciptakan pengalaman web yang elegan dan interaktif.",
      projects: "Proyek",
      skills: "Keterampilan",
      contact: "Hubungi Saya",
      contactText: "Jangan ragu untuk menghubungi saya melalui platform di bawah ini!",
    },
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'bs', name: 'Balkan (Bosanski)', flag: '🇧🇦' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];


const generateStars = (num) => {
  return Array.from({ length: num }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: Math.random() * 1 + 0.5,
    size: Math.random() * 2 + 1,
    direction: 1,
  }));
};

export default function Portfolio() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(languages[0]);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState(generateStars(100));
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('red');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showThemeMobileDropdown, setShowThemeMobileDropdown] = useState(false);
  const [showThemeDesktopDropdown, setShowThemeDesktopDropdown] = useState(false);



  const requestRef = useRef();

  const animateStars = () => {
    setStars((prevStars) =>
      prevStars.map((star) => {
        let newY = star.y + star.speed * star.direction;
        if (newY > window.innerHeight || newY < 0) star.direction *= -1;
        const distance = Math.hypot(cursorPosition.x - star.x, cursorPosition.y - star.y);
        if (distance < 100) star.direction *= -1;
        return { ...star, y: newY };
      })
    );
    requestRef.current = requestAnimationFrame(animateStars);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateStars);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  useEffect(() => {
    const followSpeed = 0.1;
    const followCursor = () => {
      setFollowerPosition((pos) => ({
        x: pos.x + (cursorPosition.x - pos.x) * followSpeed,
        y: pos.y + (cursorPosition.y - pos.y) * followSpeed,
      }));
    };
    const animationFrame = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPosition, followerPosition]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const themeColors = {
    red: {
      gradient: 'from-red-300 to-red-500',
      button: 'bg-red-600 hover:bg-red-700',
      hover: 'hover:text-red-800 hover:shadow-[0_0_10px_red]'
    },
    blue: {
      gradient: 'from-blue-300 to-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700',
      hover: 'hover:text-blue-800 hover:shadow-[0_0_10px_blue]'
    },
    green: {
      gradient: 'from-green-300 to-green-500',
      button: 'bg-green-600 hover:bg-green-700',
      hover: 'hover:text-green-800 hover:shadow-[0_0_10px_green]'
    },
    purple: {
      gradient: 'from-purple-300 to-purple-500',
      button: 'bg-purple-600 hover:bg-purple-700',
      hover: 'hover:text-purple-800 hover:shadow-[0_0_10px_purple]'
    },
    orange: {
      gradient: 'from-orange-300 to-orange-500',
      button: 'bg-orange-600 hover:bg-orange-700',
      hover: 'hover:text-orange-800 hover:shadow-[0_0_10px_orange]'
    },
    pink: {
      gradient: 'from-pink-300 to-pink-500',
      button: 'bg-pink-600 hover:bg-pink-700',
      hover: 'hover:text-pink-800 hover:shadow-[0_0_10px_pink]'
    },
    teal: {
      gradient: 'from-teal-300 to-teal-500',
      button: 'bg-teal-600 hover:bg-teal-700',
      hover: 'hover:text-teal-800 hover:shadow-[0_0_10px_teal]'
    },
    indigo: {
      gradient: 'from-indigo-300 to-indigo-500',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      hover: 'hover:text-indigo-800 hover:shadow-[0_0_10px_indigo]'
    },
    white: {
      gradient: 'from-white to-gray-100',
      button: 'bg-white hover:bg-gray-200 text-black',
      hover: 'hover:text-gray-800 hover:shadow-[0_0_10px_white]'
    },
  };

  const currentTheme = themeColors[theme];

  return (
    <div className={`min-h-screen scroll-smooth bg-gradient-to-r ${currentTheme.gradient} flex flex-col relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full opacity-80"
            style={{ left: star.x, top: star.y, width: star.size, height: star.size }}
          />
        ))}
      </div>

      {!isMobile && (
        <div
          className={`pointer-events-none absolute w-12 h-12 ${currentTheme.button.split(' ')[0]} opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2`}
          style={{ left: followerPosition.x, top: followerPosition.y }}
        ></div>
      )}

<header className="container mx-auto py-6 px-4">
  <nav className="flex justify-between items-center relative">
    <h1 className="text-3xl font-bold text-gray-800">MajD</h1>

    {/* Mobile Burger Button */}
    <div className="md:hidden">
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className={`text-2xl ${currentTheme.hover}`}
      >
        ☰
      </button>
    </div>

    {/* Desktop Navigation */}
    <div className="hidden md:flex space-x-6 text-lg font-medium items-center relative">


    <button onClick={() => scrollToSection('projects')} className={`${currentTheme.hover} rounded-full transition duration-300`}>
  {t('projects')}
</button>
<button onClick={() => scrollToSection('skills')} className={`${currentTheme.hover} rounded-full transition duration-300`}>
  {t('skills')}
</button>
<button onClick={() => scrollToSection('contact')} className={`${currentTheme.hover} rounded-full transition duration-300`}>
  {t('contact')}
</button>

      <div className="relative">
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className={`text-xl ${currentTheme.hover} transition`}
        >
          <FaCog />
        </button>
        {showThemeMenu && (
  <div className="absolute top-full mt-2 right-0 bg-white bg-opacity-90 shadow-md rounded-lg p-2 space-y-4 z-50 w-48">
    
    {/* Language dropdown */}
    <div className="relative">
      <button
        className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        onClick={() => setShowLangMenu(!showLangMenu)}
      >
        <span className="flex items-center">
          <span className="mr-2">{language.flag}</span>
          {language.name}
        </span>
        <span>▾</span>
      </button>
      {showLangMenu && (
        <div className="absolute mt-2 left-0 w-full bg-white rounded shadow z-50 max-h-60 overflow-y-auto">
          {languages
            .filter((lang) => lang.code !== language.code)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang);
                  i18n.changeLanguage(lang.code);
                  setShowLangMenu(false);
                  setShowThemeMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
        </div>
      )}
    </div>

    {/* Theme dropdown */}
    <div className="relative">
      <button
        className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        onClick={() => setShowThemeDesktopDropdown(!showThemeDesktopDropdown)}
      >
        <span>Theme</span>
        <span>▾</span>
      </button>
      {showThemeDesktopDropdown && (
        <div className="absolute mt-2 left-0 w-full bg-white rounded shadow z-50 max-h-60 overflow-y-auto">
          {Object.keys(themeColors).map((color) => (
            <button
              key={color}
              onClick={() => {
                setTheme(color);
                setShowThemeDesktopDropdown(false);
                setShowThemeMenu(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
)}

      </div>
    </div>
  </nav>
</header>

{/* Mobile Menu */}
{showThemeMenu && (
  <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white bg-opacity-95 shadow-lg transform transition-transform duration-300 z-50 p-5 space-y-4 ${showThemeMenu ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="flex justify-end">
      <button onClick={() => setShowThemeMenu(false)} className="text-2xl font-bold">×</button>
    </div>
    <button
  onClick={() => {
    scrollToSection('projects');
    setShowThemeMenu(false);
  }}
  className="block text-lg font-medium text-gray-800 hover:bg-gray-200 rounded px-3 py-2"
>
  {t('projects')}
</button>

<button
  onClick={() => {
    scrollToSection('skills');
    setShowThemeMenu(false);
  }}
  className="block text-lg font-medium text-gray-800 hover:bg-gray-200 rounded px-3 py-2"
>
  {t('skills')}
</button>

<button
  onClick={() => {
    scrollToSection('contact');
    setShowThemeMenu(false);
  }}
  className="block text-lg font-medium text-gray-800 hover:bg-gray-200 rounded px-3 py-2"
>
  {t('contact')}
</button>

    <hr className="my-2" />

    <div className="relative">
      <button
        className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        onClick={() => setShowLangMenu(!showLangMenu)}
      >
        <span className="flex items-center">
          <span className="mr-2">{language.flag}</span>
          {language.name}
        </span>
        <span>▾</span>
      </button>
      {showLangMenu && (
        <div className="absolute mt-2 left-0 w-full bg-white rounded shadow z-50 max-h-60 overflow-y-auto">
          {languages
            .filter((lang) => lang.code !== language.code)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang);
                  i18n.changeLanguage(lang.code);
                  setShowLangMenu(false);
                  setShowThemeMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
        </div>
      )}
    </div>

    <hr className="my-2" />

    <div className="relative">
      <button
        className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        onClick={() => setShowThemeMobileDropdown(!showThemeMobileDropdown)}
      >
        <span>Theme</span>
        <span>▾</span>
      </button>
      {showThemeMobileDropdown && (
        <div className="absolute mt-2 left-0 w-full bg-white rounded shadow z-50 max-h-60 overflow-y-auto">
          {Object.keys(themeColors).map((color) => (
            <button
              key={color}
              onClick={() => {
                setTheme(color);
                setShowThemeMobileDropdown(false);
                setShowThemeMenu(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
)}


      <section className="container mx-auto text-center py-24 flex-grow">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">{t('welcome')}</h2>
        <h3 className="text-2xl text-gray-700 font-medium">{t('subtitle')}</h3>
      </section>

      <section id="projects" className="container mx-auto py-12">
  <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">{t('projects')}</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
    {/* Project with image 1 */}
    <div className="bg-white bg-opacity-30 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out">
      <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
        <img
          src="https://i.postimg.cc/Kvdpt4W0/image.png"
          alt="Project"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-2xl font-bold">Vctian Tools</h4>
      <p className="text-gray-600">Simple Shop.</p>
    </div>

    <div className="bg-white bg-opacity-30 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out">
      <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
        <img
          src="https://i.postimg.cc/14xL9Z8H/image.png"
          alt="Project"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-2xl font-bold">CustomPS Hosting</h4>
      <p className="text-gray-600">Simple Shop.</p>
    </div>

    {/* Project with image 2 */}
    <div className="bg-white bg-opacity-30 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out">
      <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
        <img
          src="https://i.postimg.cc/h4xhr5Zc/image.png"
          alt="Project"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-2xl font-bold">Link Tree</h4>
      <p className="text-gray-600">Simple Portfolio.</p>
    </div>

    {/* Project with YouTube video */}
    <div className="bg-white bg-opacity-30 p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out">
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/XhIWT1UAWjM?autoplay=1&mute=1&loop=1&playlist=XhIWT1UAWjM&controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h4 className="text-2xl font-bold">GameHub Central</h4>
      <p className="text-gray-600">Gaming chat.</p>
    </div>

  </div>
</section>

      <section id="skills" className="container mx-auto py-12">
        <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">{t('skills')}</h3>
        {/* Your skill cards go here */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { src: "https://internetmuseum.se/app/uploads/HTML5_logo_and_wordmark.png", label: "HTML 5" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png", label: "CSS 3" },
      { src: "https://d2jdgazzki9vjm.cloudfront.net/images/javascript/javascript_logo.png", label: "JAVASCRIPT" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png", label: "TYPESCRIPT" },
      { src: "https://miro.medium.com/v2/resize:fit:522/1*NJSv6DGoKTloI8d8im98zg.png", label: "REACT.JS" },
      { src: "https://miro.medium.com/v2/resize:fit:1400/1*gxOA6-EF8P8vnYdk3Bc9bg.png", label: "NEXT.JS" },
      { src: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftlqh86jgl25x41gf9eed.png", label: "TAILWIND" },
      { src: "https://www.oderland.se/wp-content/uploads/2017/10/nodejs-new-pantone-black.png", label: "NODE.JS" },
      { src: "https://www.opc-router.de/wp-content/uploads/2021/03/mongodb_thumbnail.png", label: "MONGO DB" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png", label: "LINUX" },
      { src: "https://miro.medium.com/v2/0*A6P405FEycA7QNIU.png", label: "GIT & GITHUB" },
      { src: "https://webtranslateit.com/assets/docs/file_formats/python-d9875d0b3dc4331db8ea594322537b8f38a87acf8fe4e2fb7c4c83950b31cd3e.png", label: "PYTHON" },
    ].map((skill, index) => (
      <div key={index} className="bg-white bg-opacity-30 p-4 shadow-lg rounded-lg flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-105">
        <img src={skill.src} className="w-20 h-20 object-contain mb-2" alt="Skill" />
        {skill.label}
      </div>
    ))}
  </div>
      </section>

      <section id="contact" className="container mx-auto py-12 text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">{t('contact')}</h3>
        <p className="text-lg text-gray-600 mb-6">{t('contactText')}</p>
        <div className="flex justify-center space-x-4">
          <a href="mailto:majoud.codes@gmail.com"><FaEnvelope size={24} /></a>
          <a href="https://github.com/MajoudCodes"><FaGithub size={24} /></a>
          <a href="https://discord.com/users/853008203289985064"><FaDiscord size={24} /></a>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg transition ${currentTheme.button}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      <footer className="text-center py-4 text-gray-600">
        © {new Date().getFullYear()} MajD. All rights reserved.
      </footer>
    </div>
  );
}