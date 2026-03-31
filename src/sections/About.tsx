import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Code2, Lightbulb, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Image 3D reveal animation
      const imageTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(imageRef.current, 
            { rotateY: -15, x: -100, opacity: 0 },
            { rotateY: 0, x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true
      });
      triggers.push(imageTrigger);

      // Content stagger animation
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.about-label',
            { letterSpacing: '0em', opacity: 0 },
            { letterSpacing: '0.3em', opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
          
          gsap.fromTo('.about-headline',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
          
          gsap.fromTo('.about-text',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.15, delay: 0.4 }
          );

          gsap.fromTo('.about-cta',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 0.8 }
          );
        },
        once: true
      });
      triggers.push(contentTrigger);

      // Stats counter animation
      const statsTrigger = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo('.stat-item',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }
          );

          // Animate numbers
          const counters = document.querySelectorAll('.stat-number');
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            gsap.fromTo(counter, 
              { innerText: 0 },
              { 
                innerText: target, 
                duration: 2, 
                ease: 'power2.out',
                snap: { innerText: 1 },
                delay: 0.3
              }
            );
          });
        },
        once: true
      });
      triggers.push(statsTrigger);

      // Parallax effect on image during scroll
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const highlights = [
    { icon: Code2, title: 'Clean Code', desc: 'Writing maintainable, efficient code' },
    { icon: Lightbulb, title: 'Problem Solver', desc: 'Turning challenges into solutions' },
    { icon: Rocket, title: 'Fast Learner', desc: 'Adapting to new technologies quickly' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full py-24 bg-black overflow-hidden"
    >
      {/* Diagonal accent line */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent transform -skew-x-12" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <div 
            ref={imageRef}
            className="relative perspective-1500"
          >
            <div className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-red to-gold rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-shift" />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/images/me2.jpeg" 
                  alt="Pravin Bhatta - IT Engineering Student"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-red text-white px-6 py-3 rounded-lg shadow-glow-red">
                <span className="font-display text-2xl">IT Engineer</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-8">
            <p className="about-label section-label">About Me</p>
            
            <h2 className="about-headline font-display text-display-3 md:text-display-2 text-white">
              Crafting Digital Experiences with <span className="text-gradient-gold">Passion</span>
            </h2>

            <div className="space-y-4">
              <p className="about-text text-gray-300 text-lg leading-relaxed">
                I'm an IT Engineer, recently completing my academic commitments in the Degree of Bachelors of Engineering in Informtion Technology, under Pokhara University. I have a deep fondness for technology and innovation. 
                My journey in tech started with curiosity and has evolved into a passion for creating 
                solutions that make a difference.
              </p>
              
              <p className="about-text text-gray-300 text-lg leading-relaxed">
                I specialize in full-stack development, with expertise in modern frameworks and a keen 
                eye for user experience. Whether it's building responsive web applications or solving 
                complex algorithmic challenges, I bring dedication and creativity to every project.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="about-text text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-gold/50 transition-colors duration-300"
                >
                  <item.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/Pravin_Bhatta_Resume.pdf"
              download="Pravin_Bhatta_Resume.pdf"
            >
            <button 
            className="about-cta btn-secondary flex items-center gap-2 mt-6">
              <Download className="w-5 h-5" />
              Download Resume
            </button>
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div 
          ref={statsRef}
          className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/10"
        >
          <div className="stat-item text-center">
            <div className="font-display text-5xl md:text-6xl text-red mb-2">
              <span className="stat-number" data-target="8">0</span>+
            </div>
            <p className="text-gray-400 uppercase tracking-wider text-sm">Projects Completed</p>
          </div>
          
          <div className="stat-item text-center">
            <div className="font-display text-5xl md:text-6xl text-gold mb-2">
              <span className="stat-number" data-target="4">0</span>
            </div>
            <p className="text-gray-400 uppercase tracking-wider text-sm">Years of Coding</p>
          </div>
          
          <div className="stat-item text-center">
            <div className="font-display text-5xl md:text-6xl text-red mb-2">
              <span className="stat-number" data-target="100">0</span>%
            </div>
            <p className="text-gray-400 uppercase tracking-wider text-sm">Commitment to Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
