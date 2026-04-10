import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mrpravin21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pravin-bhatta-5b4637215/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/bh_pravinn', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/pravinn_bhatta/', label: 'Instagram' },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const footerTrigger = ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          // Top border draw
          gsap.fromTo('.footer-border',
            { width: '0%' },
            { width: '100%', duration: 1, ease: 'expo.out' }
          );

          // Logo fade in
          gsap.fromTo('.footer-logo',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out', delay: 0.2 }
          );

          // Tagline
          gsap.fromTo('.footer-tagline',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.4 }
          );

          // Quick links
          gsap.fromTo('.footer-link',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.5 }
          );

          // Social icons
          gsap.fromTo('.footer-social',
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)', stagger: 0.05, delay: 0.7 }
          );

          // Copyright
          gsap.fromTo('.footer-copyright',
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.9 }
          );
        },
        once: true
      });
      triggers.push(footerTrigger);

    }, footerRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-black border-t border-white/10"
    >
      {/* Animated top border */}
      <div className="footer-border absolute top-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="footer-logo font-display text-4xl text-gold mb-2">
              PRAVIN BHATTA
            </h3>
            <p className="footer-tagline text-gray-400 text-sm">
              FullStack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="footer-link text-gray-400 hover:text-gold transition-all duration-300 hover:translate-x-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold hover:scale-110 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-copyright mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Pravin Bhatta. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Designed & Built with <Heart className="w-4 h-4 text-red fill-red" />
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-gold transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
