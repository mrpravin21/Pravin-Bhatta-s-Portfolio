import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const redShapeRef = useRef<HTMLImageElement>(null);
  const goldShapeRef = useRef<HTMLImageElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([redShapeRef.current, goldShapeRef.current], { 
        scale: 0.8, 
        opacity: 0 
      });
      gsap.set('.hero-label', { 
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0 
      });
      gsap.set(nameRef.current, { 
        y: 100, 
        opacity: 0 
      });
      gsap.set(taglineRef.current, { 
        filter: 'blur(10px)', 
        opacity: 0 
      });
      gsap.set(subheadlineRef.current, { 
        y: 40, 
        opacity: 0 
      });
      gsap.set('.hero-cta', { 
        scale: 0.9, 
        opacity: 0 
      });
      gsap.set('.social-icon', { 
        y: 20, 
        opacity: 0 
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Background shapes
      tl.to([redShapeRef.current, goldShapeRef.current], {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.2
      });

      // Label reveal
      tl.to('.hero-label', {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.inOut'
      }, '-=0.8');

      // Name reveal
      tl.to(nameRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out'
      }, '-=0.4');

      // Tagline blur reveal
      tl.to(taglineRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');

      // Subheadline
      tl.to(subheadlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out'
      }, '-=0.4');

      // CTAs
      tl.to('.hero-cta', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1
      }, '-=0.3');

      // Social icons
      tl.to('.social-icon', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.08
      }, '-=0.2');

      // Continuous floating animation for shapes
      gsap.to(redShapeRef.current, {
        y: -20,
        rotation: 2,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to(goldShapeRef.current, {
        y: 15,
        rotation: -2,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: -2
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background decorative shapes */}
      <img
        ref={redShapeRef}
        src="/images/hero-shape-red.png"
        alt=""
        className="absolute bottom-0 right-0 w-[60vw] max-w-[800px] opacity-60 pointer-events-none z-0"
      />
      <img
        ref={goldShapeRef}
        src="/images/hero-shape-gold.png"
        alt=""
        className="absolute top-0 left-0 w-[40vw] max-w-[500px] opacity-40 pointer-events-none z-0"
      />

      {/* Gold particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-gold rounded-full opacity-40 animate-float" />
        <div className="absolute top-[40%] right-[15%] w-3 h-3 bg-gold rounded-full opacity-30 animate-float-delayed" />
        <div className="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 bg-gold rounded-full opacity-50 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-gold rounded-full opacity-35 animate-float-delayed" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-1 h-1 bg-gold rounded-full opacity-45 animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col items-start gap-6">
          {/* Label */}
          <p className="hero-label section-label text-gold">
          
          </p>

          {/* Main Name */}
          <h1 
            ref={nameRef}
            className="font-display text-display-1 md:text-[10rem] lg:text-[12rem] text-red leading-none tracking-tight"
          >
            PRAVIN BHATTA
          </h1>

          {/* Tagline */}
          <p 
            ref={taglineRef}
            className="font-display text-display-3 md:text-display-2 text-gradient-gold"
          >
            Full-Stack Developer | DApp Builder
          </p>

          {/* Subheadline */}
          <p 
            ref={subheadlineRef}
            className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed mt-4"
          >
            Transforming ideas into elegant solutions. Passionate about 
            design and creating impactful applications that makes a difference.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={scrollToProjects}
              className="hero-cta btn-primary flex items-center gap-2"
            >
              View My Work
              <ArrowDown className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollToContact}
              className="hero-cta btn-secondary"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div 
            ref={socialsRef}
            className="flex items-center gap-6 mt-12"
          >
            <a 
              href="https://github.com/mrpravin21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon group flex items-center justify-center w-12 h-12 rounded-full border border-gray-700 text-gray-400 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/pravin-bhatta-5b4637215/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon group flex items-center justify-center w-12 h-12 rounded-full border border-gray-700 text-gray-400 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:bhattapravin9@gmail.com"
              className="social-icon group flex items-center justify-center w-12 h-12 rounded-full border border-gray-700 text-gray-400 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />
    </section>
  );
};

export default Hero;
