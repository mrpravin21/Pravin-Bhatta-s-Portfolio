import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Influencer Matchmaking Platform',
      description: 'Full-stack influcencer matching solution with real-time match making based on the brand requirements, influencer rating, and similarity, and a fully responsive design. Features include JWT based user authentication, influencer search, requesting influencers for marketing campaigns, and brand search, with Multi-user support (Either as a Brand, or as an Influencer).',
      image: '/images/tinyties2.jpeg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Express'],
      liveLink: 'https://697ee71bcb88ed35ec233e92--tinyties-demo.netlify.app',
      githubLink: 'https://github.com/mrpravin21/brand',
      color: 'red'
    },
    {
      title: 'College Community Web App',
      description: 'Collaborative space for college students where students can seamlessly share notes, stay informed about campus events, and actively engage in polls to express their opinions, where the polls are timed, and decisions are referred to the college authorities.',
      image: '/images/ncitarena.jpeg',
      technologies: ['React', 'PHP','MySQL', 'Tailwind CSS'],
      liveLink: 'https://cs16u.netlify.app',
      githubLink: 'https://github.com/mrpravin21/NCIT_Project',
      color: 'gold'
    },
    {
      title: 'Originality Checking NFT Marketplace',
      description: 'NFT originality verification prior to minting, using 3 layers, SHA-256 hash mapping for duplicates, pHash using Hamming Distance for similar edited images, and using ResNET model for advanced similarity detection. Features include biometric authentication, NFT minting, originality verification, and marketplace for buying/selling NFTs.',
      image: '/images/mintvault2.jpeg',
      technologies: ['Motoko', 'React', 'ICP Canisters', 'Python', 'FastAPI'],
      liveLink: '',
      githubLink: 'https://github.com/mrpravin21/opend',
      color: 'red'
    },
    {
      title: 'Real Estate Buyers Dashboard',
      description: 'JWT-authenticated (with tokens living in httpOnly cookies) buyers dashboard for a real estate broker to manage property interests. Features include a user-friendly interface for managing property interests.',
      image: '/images/buyersportal.jpeg',
      technologies: ['Next.js', 'Drizzle','Supabase', 'Tailwind CSS'],
      liveLink: 'https://buyerportalassesment.vercel.app',
      githubLink: 'https://github.com/mrpravin21/real-estate-buyer-portal',
      color: 'gold'
    },
    {
      title: 'LAN-based Multiplayer Quiz',
      description: 'Built using C socket programming concept, TCP/IP sockets for communication and Linked list for maintaining leaderboard state, and a web frontend using HTML, CSS, and JavaScript. Players identify flags of countries and earn points. The server keeps track of each player using their roll number and maintains a real-time leaderboard that resets when the server is restarted.',
      image: '/images/flag3.jpeg',
      technologies: ['C', 'TCP/IP Sockets', 'JavaScript', 'Tailwind CSS'],
      liveLink: 'https://flaggame-pi.vercel.app',
      githubLink: 'https://github.com/mrpravin21/FLAG_GAME',
      color: 'red'
    }
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: '.projects-header',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.projects-label',
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
          
          gsap.fromTo('.projects-headline',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
          
          gsap.fromTo('.projects-subheadline',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.4 }
          );
        },
        once: true
      });
      triggers.push(headerTrigger);

      // Project cards animation
      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      projectCards.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(card,
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: index * 0.1 }
            );

            // Animate image
            gsap.fromTo(card.querySelector('.project-image'),
              { scale: 1.2, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay: index * 0.1 + 0.2 }
            );

            // Animate title characters
            const title = card.querySelector('.project-title');
            if (title) {
              gsap.fromTo(title,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: index * 0.1 + 0.4 }
              );
            }

            // Animate description
            gsap.fromTo(card.querySelector('.project-desc'),
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: index * 0.1 + 0.5 }
            );

            // Animate tech tags
            gsap.fromTo(card.querySelectorAll('.tech-tag'),
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)', stagger: 0.05, delay: index * 0.1 + 0.6 }
            );

            // Animate links
            gsap.fromTo(card.querySelectorAll('.project-link'),
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.1, delay: index * 0.1 + 0.7 }
            );
          },
          once: true
        });
        triggers.push(cardTrigger);
      });

    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full py-24 bg-black overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="projects-header text-center mb-16">
          <p className="projects-label section-label">Featured Work</p>
          <h2 className="projects-headline font-display text-display-3 md:text-display-2 text-white mt-4">
            Projects That <span className="text-gradient-gold">Define Me</span>
          </h2>
          <p className="projects-subheadline text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            A selection of my best work showcasing technical expertise and creative problem-solving
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`project-card group grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-video overflow-hidden">
                  <a
                  target="_blank" 
                  href={project.liveLink}
                  >
                    <ExternalLink className="w-4 h-4" />
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  </a>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Hover indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-16 h-16 rounded-full bg-${project.color} flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out`}>
                      <ArrowUpRight className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative border */}
                <div className={`absolute -inset-px rounded-2xl border-2 border-${project.color}/0 group-hover:border-${project.color}/50 transition-colors duration-500`} />
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="project-title font-display text-4xl md:text-5xl text-white group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="project-desc text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`tech-tag px-3 py-1 rounded-full text-sm font-medium bg-${project.color}/10 text-${project.color} border border-${project.color}/30`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    target="_blank" 
                    href={project.liveLink}
                    className={`project-link flex items-center gap-2 px-6 py-3 rounded-lg bg-${project.color} text-white font-medium hover:opacity-90 transition-opacity duration-300`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a 
                    target="_blank"
                    href={project.githubLink}
                    className="project-link flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:border-gold hover:text-gold transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://github.com/mrpravin21?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
