import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaCog, FaDiscord } from 'react-icons/fa';

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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState(generateStars(100));
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('red');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const requestRef = useRef();

  const animateStars = () => {
    setStars((prevStars) => prevStars.map(star => {
      let newY = star.y + star.speed * star.direction;
      if (newY > window.innerHeight || newY < 0) star.direction *= -1;

      const distance = Math.hypot(cursorPosition.x - star.x, cursorPosition.y - star.y);
      if (distance < 100) star.direction *= -1;

      return { ...star, y: newY };
    }));
    requestRef.current = requestAnimationFrame(animateStars);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateStars);
    return () => cancelAnimationFrame(requestRef.current);
  });

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeColors = {
    red: {
      gradient: 'from-red-300 to-red-500',
      accent: 'red-800',
      button: 'bg-red-600 hover:bg-red-700',
      hover: 'hover:text-red-800 hover:shadow-[0_0_10px_red]'
    },
    blue: {
      gradient: 'from-blue-300 to-blue-500',
      accent: 'blue-800',
      button: 'bg-blue-600 hover:bg-blue-700',
      hover: 'hover:text-blue-800 hover:shadow-[0_0_10px_blue]'
    },
    green: {
      gradient: 'from-green-300 to-green-500',
      accent: 'green-800',
      button: 'bg-green-600 hover:bg-green-700',
      hover: 'hover:text-green-800 hover:shadow-[0_0_10px_green]'
    },
    purple: {
      gradient: 'from-purple-300 to-purple-500',
      accent: 'purple-800',
      button: 'bg-purple-600 hover:bg-purple-700',
      hover: 'hover:text-purple-800 hover:shadow-[0_0_10px_purple]'
    }
  };

  const currentTheme = themeColors[theme];

  return (
    <div className={`min-h-screen bg-gradient-to-r ${currentTheme.gradient} flex flex-col relative overflow-hidden`}>
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
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">MajD</h1>
          <div className="flex space-x-6 text-lg font-medium items-center relative">
            <a href="#projects" className={`${currentTheme.hover} rounded-full transition duration-300`}>Projects</a>
            <a href="#skills" className={`${currentTheme.hover} rounded-full transition duration-300`}>Skills</a>
            <a href="#contact" className={`${currentTheme.hover} rounded-full transition duration-300`}>Contact</a>
            <button onClick={() => setShowThemeMenu(!showThemeMenu)} className={`text-xl ${currentTheme.hover} transition`}>
              <FaCog />
            </button>
            {showThemeMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white bg-opacity-90 shadow-md rounded-lg p-2 space-y-1 z-50">
                {Object.keys(themeColors).map((color) => (
                  <button
                    key={color}
                    onClick={() => setTheme(color)}
                    className="block w-full text-left px-4 py-1 hover:bg-gray-200 rounded"
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)} Theme
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      <section className="container mx-auto text-center py-24 flex-grow">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to My Portfolio</h2>
        <p className="text-xl text-gray-600">I'm a fullstack developer creating sleek and interactive website experiences.</p>
      </section>

      <section id="projects" className="container mx-auto py-12">
  <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">Projects</h3>
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
  <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">Skills</h3>
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
  <h3 className="text-4xl font-bold text-gray-800 mb-4">Contact Me</h3>
  <p className="text-lg text-gray-600 mb-6">Feel free to reach out through any of the platforms below!</p>
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