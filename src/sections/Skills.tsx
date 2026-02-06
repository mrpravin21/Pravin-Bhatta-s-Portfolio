import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend Development',
      skills: ['React.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS'],
      color: 'red'
    },
    {
      icon: Server,
      title: 'Backend Development',
      skills: ['Node.js', 'Python', 'Java', 'Express.js', 'ICP Blockchain', 'Motoko', 'RESTful APIs', 'GraphQL', 'Microservices'],
      color: 'gold'
    },
    {
      icon: Database,
      title: 'Database & Cloud',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Supabase'],
      color: 'red'
    },
    {
      icon: Wrench,
      title: 'Tools & Methodologies',
      skills: ['Git', 'GitHub', 'Blockchain', 'Web3', 'VS Code', 'Figma', 'Agile/Scrum', 'CI/CD', 'Jest', 'Postman'],
      color: 'gold'
    }
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: '.skills-header',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.skills-label',
            { width: 0, opacity: 0 },
            { width: 'auto', opacity: 1, duration: 0.8, ease: 'steps(12)' }
          );
          
          gsap.fromTo('.skills-headline',
            { clipPath: 'inset(50% 0)', opacity: 0 },
            { clipPath: 'inset(0% 0)', opacity: 1, duration: 0.8, ease: 'power4.inOut', delay: 0.2 }
          );
          
          gsap.fromTo('.skills-subheadline',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.4 }
          );
        },
        once: true
      });
      triggers.push(headerTrigger);

      // Cards 3D flip animation
      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.skill-card',
            { rotateX: -90, opacity: 0, transformOrigin: 'top center' },
            { 
              rotateX: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: 'expo.out',
              stagger: 0.15
            }
          );

          // Skill tags pop in
          gsap.fromTo('.skill-tag',
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.4, 
              ease: 'elastic.out(1, 0.5)',
              stagger: 0.05,
              delay: 0.8
            }
          );
        },
        once: true
      });
      triggers.push(cardsTrigger);

    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-24 bg-black overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 184, 28, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 184, 28, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="skills-header text-center mb-16">
          <p className="skills-label section-label inline-block overflow-hidden whitespace-nowrap">
            My Expertise
          </p>
          <h2 className="skills-headline font-display text-display-3 md:text-display-2 text-white mt-4">
            Skills & <span className="text-gradient-gold">Technologies</span>
          </h2>
          <p className="skills-subheadline text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            A comprehensive toolkit built through academic excellence and hands-on project experience
          </p>
        </div>

        {/* Skills Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 perspective-1000"
        >
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`skill-card group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-${category.color}/50 transition-all duration-500 preserve-3d`}
              style={{ 
                transformStyle: 'preserve-3d',
                marginTop: index % 2 === 1 ? '2rem' : '0'
              }}
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-${category.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-xl bg-${category.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className={`w-8 h-8 text-${category.color}`} />
              </div>

              {/* Title */}
              <h3 className="relative font-display text-3xl text-white mb-6">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="relative flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className={`skill-tag px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10 hover:bg-${category.color} hover:text-black hover:border-${category.color} transition-all duration-300 cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${category.color}/20 to-transparent rounded-tr-2xl opacity-50`} />
            </div>
          ))}
        </div>

        {/* Additional tech icons row */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
            Technologies I Work With
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {['React', 'Node.js', 'Python', 'PostgreSQL', 'ICP Canisters', 'Git', 'Figma'].map((tech, index) => (
              <span 
                key={index}
                className="text-gray-400 font-medium hover:text-gold transition-colors duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
