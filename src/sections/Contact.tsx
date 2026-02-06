import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mrpravin21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pravin-bhatta-5b4637215/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/bh_pravinn', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/pravinn_bhatta/', label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bhattapravin9@gmail.com', href: 'mailto:bhattapravin9@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal', href: '#' },
    { icon: Phone, label: 'Phone', value: '+977 9861294833', href: 'tel:+9779861294833' },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: '.contact-header',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.contact-label',
            { opacity: 0, textShadow: '0 0 0 rgba(255, 184, 28, 0)' },
            { opacity: 1, textShadow: '0 0 20px rgba(255, 184, 28, 0.5)', duration: 0.6, ease: 'expo.out' }
          );
          
          gsap.fromTo('.contact-headline',
            { y: 80, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
          
          gsap.fromTo('.contact-subheadline',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.4 }
          );
        },
        once: true
      });
      triggers.push(headerTrigger);

      // Form animation
      const formTrigger = ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(formRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );

          gsap.fromTo('.form-input',
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.1, delay: 0.3 }
          );

          gsap.fromTo('.submit-btn',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', delay: 0.7 }
          );
        },
        once: true
      });
      triggers.push(formTrigger);

      // Social icons animation
      const socialsTrigger = ScrollTrigger.create({
        trigger: '.social-links',
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo('.social-link',
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08, delay: 0.5 }
          );
        },
        once: true
      });
      triggers.push(socialsTrigger);

      // Contact info animation
      const infoTrigger = ScrollTrigger.create({
        trigger: '.contact-info',
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo('.info-item',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.6 }
          );
        },
        once: true
      });
      triggers.push(infoTrigger);

    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Use your actual IDs from the EmailJS Dashboard
  const SERVICE_ID = "service_fb5f75r";
  const TEMPLATE_ID = "template_y2lhkfd";
  const PUBLIC_KEY = "pdHxXrdoLRcqJZ8NJ";

  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    // Success state
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    console.error('FAILED...', error);
    alert("Message failed to send. Please check your connection or try again later.");
  } finally {
    setIsSubmitting(false);
    // Reset the "Success" message/animation after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  }
};


  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-24 bg-black overflow-hidden"
    >
      {/* Particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <p className="contact-label section-label">Let's Connect</p>
          <h2 className="contact-headline font-display text-display-3 md:text-display-2 text-white mt-4">
            Ready to Create Something <span className="text-gradient-gold">Amazing?</span>
          </h2>
          <p className="contact-subheadline text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            I'm always excited to discuss new opportunities, innovative projects, or just chat about technology. 
            Reach out and let's build the future together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-input space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-400 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-input space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-400 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-input space-y-2">
                <label htmlFor="subject" className="text-sm text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-input space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`submit-btn w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red text-white hover:opacity-90 hover:shadow-glow-red'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : submitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="contact-info space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="info-item group flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-gold transition-colors duration-300">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-links">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Connect With Me</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-link w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red/10 to-gold/10 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white font-medium">Available for Work</span>
              </div>
              <p className="text-gray-400 text-sm">
                I'm currently open to full-time opportunities and freelance projects. 
                Let's discuss how I can contribute to your team!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
