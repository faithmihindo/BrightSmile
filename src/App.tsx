/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Stethoscope, 
  User, 
  Menu, 
  X,
  Calendar,
  HeartPulse,
  Award,
  ArrowRight,
  MessageSquare,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & WhatsApp Helper ---
const WHATSAPP_PHONE = '15551234567';
const DEFAULT_PREFILLED_MESSAGE = 'Hello! I would like to book an appointment or inquire about dental services at BrightSmile Dental Clinic.';

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.812 0-3.523-.487-5.01-1.337l-.358-.203-3.723.976.993-3.629-.224-.356A9.827 9.827 0 012.25 12c0-5.424 4.41-9.835 9.835-9.835 5.423 0 9.835 4.411 9.835 9.835 0 5.424-4.412 9.836-9.835 9.836m0-21.671C5.452.172.172 5.452.172 12c0 2.112.551 4.167 1.597 5.978L0 24l6.182-1.621A11.782 11.782 0 0012.051 24c6.548 0 11.828-5.28 11.828-11.828s-5.28-11.828-11.828-11.828" />
  </svg>
);

// --- WhatsApp Floating Widget Component ---
const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(DEFAULT_PREFILLED_MESSAGE);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);

  const quickMessages = [
    'Hello! I would like to book an appointment for a dental checkup.',
    'Hello! What are your working hours and available consultation slots?',
    'Hello! I have a dental emergency and need to speak with a dentist.'
  ];

  const handleOpenWhatsApp = (messageToUse?: string) => {
    const text = encodeURIComponent(messageToUse || customMessage);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Quick Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-5 text-white flex items-center justify-between relative">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                    <HeartPulse className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">BrightSmile Dental</h4>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white p-1 rounded-full hover:bg-emerald-700/50 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-5 bg-slate-50 space-y-4 max-h-96 overflow-y-auto">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">Hi there! 👋</p>
                <p className="leading-relaxed">
                  Welcome to BrightSmile Dental Clinic. How can we help you today? Select a message below or type your own to chat on WhatsApp!
                </p>
                <span className="text-[10px] text-slate-400 block text-right">Online Now</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Quick Messages</p>
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCustomMessage(msg);
                      handleOpenWhatsApp(msg);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs text-slate-700 hover:text-emerald-800 transition-all font-medium flex items-center justify-between group"
                  >
                    <span className="line-clamp-2">{msg}</span>
                    <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              {/* Custom Input Field */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 px-1">
                  Custom Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-800 outline-none resize-none transition-all"
                />
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-white border-t border-slate-100">
              <button
                onClick={() => handleOpenWhatsApp()}
                className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-200 text-sm"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip Callout */}
      {!isOpen && !hasDismissedTooltip && (
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="pointer-events-auto mb-3 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3 text-xs font-semibold text-slate-800"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <button 
            onClick={() => {
              setIsOpen(true);
              setHasDismissedTooltip(true);
            }}
            className="hover:text-emerald-600 transition-colors text-left"
          >
            Chat with us on WhatsApp! 👋
          </button>
          <button 
            onClick={() => setHasDismissedTooltip(true)} 
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasDismissedTooltip(true);
        }}
        className="pointer-events-auto relative bg-[#25D366] hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
        aria-label="Open WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <WhatsAppIcon className="w-7 h-7" />
        )}
      </button>
    </div>
  );
};

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: '1',
    title: 'General Dentistry',
    description: 'Comprehensive oral exams, cleanings, and preventative care for the whole family.',
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    id: '2',
    title: 'Cosmetic Whitening',
    description: 'Professional teeth whitening treatments to brighten your smile safely and effectively.',
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: '3',
    title: 'Dental Implants',
    description: 'Permanent solutions for missing teeth that look and feel completely natural.',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: '4',
    title: 'Orthodontics',
    description: 'Modern braces and clear aligners to straighten teeth and correct bite issues.',
    icon: <HeartPulse className="w-6 h-6" />,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Patient',
    content: 'The best dental experience I\'ve ever had. The staff is incredibly gentle and professional. My teeth have never looked better!',
    rating: 5,
    image: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Patient',
    content: 'I was always nervous about the dentist, but BrightSmile made me feel at ease. The technology they use is top-notch.',
    rating: 5,
    image: 'https://picsum.photos/seed/michael/100/100',
  },
  {
    id: '3',
    name: 'Emma Williams',
    role: 'Patient',
    content: 'Highly recommend their whitening service. Quick, painless, and the results were immediate. I can\'t stop smiling!',
    rating: 5,
    image: 'https://picsum.photos/seed/emma/100/100',
  },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-2">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-blue-900' : 'text-blue-900'}`}>
              Bright<span className="text-blue-600">Smile</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_PREFILLED_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100 flex items-center space-x-1.5 text-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="#contact" 
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3 space-y-2">
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_PREFILLED_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px] hidden lg:block"></div>
      <div className="absolute top-20 left-10 -z-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Voted #1 Dental Clinic in the City</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
              Your Smile is Our <span className="text-blue-600">Top Priority</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience world-class dental care with a gentle touch. From routine checkups to advanced cosmetic procedures, we help you achieve the smile you've always wanted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_PREFILLED_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-200 group gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            
            <div className="mt-12 flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-slate-500 font-medium">Trusted by 2,000+ happy patients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Dental Office" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Emergency Care</p>
                  <p className="text-slate-900 font-bold">Available 24/7</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Dental Services for Every Need</h3>
          <p className="text-slate-600 text-lg">
            We provide a wide range of dental treatments using the latest technology to ensure your comfort and the best possible outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group"
            >
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700">
                Learn More <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Dentist" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-3xl -z-10 rotate-12"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full -z-10"></div>
          </div>

          <div>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">About BrightSmile</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8">A Team Dedicated to Your Oral Health</h3>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Founded in 2010, BrightSmile Dental Clinic has been at the forefront of modern dentistry. Our mission is to provide high-quality, personalized dental care in a comfortable and welcoming environment.
            </p>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              We believe that a healthy smile is the foundation of overall well-being. That's why we take a holistic approach to dental care, focusing on prevention and education alongside treatment.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Expert Professional Staff',
                'Modern Dental Equipment',
                'Comfortable Environment',
                'Personalized Treatment Plans',
                'Emergency Services',
                'Insurance Friendly'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-blue-900 text-white overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-800 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Patient Stories</h2>
          <h3 className="text-4xl font-bold mb-6">What Our Patients Say</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-blue-800/40 backdrop-blur-sm p-8 rounded-3xl border border-blue-700/50">
              <div className="flex items-center text-yellow-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 text-lg italic mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-400"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-blue-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    alert('Thank you! Your appointment request has been sent. We will contact you shortly.');
    setFormState({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Get In Touch</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Book Your Free Consultation Today</h3>
            <p className="text-slate-600 text-lg mb-12">
              Ready to take the first step towards a healthier smile? Fill out the form and our friendly team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <a 
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_PREFILLED_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/80 transition-all group cursor-pointer"
              >
                <div className="bg-[#25D366] p-3 rounded-2xl text-white group-hover:scale-105 transition-transform flex-shrink-0 shadow-md shadow-emerald-200">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2 flex-wrap">
                    WhatsApp Direct
                    <span className="text-[10px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase">
                      Fastest Reply
                    </span>
                  </h4>
                  <p className="text-slate-600 text-sm">
                    +1 (555) 123-4567 • Tap to open WhatsApp with pre-filled hello message
                  </p>
                </div>
              </a>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Our Location</h4>
                  <p className="text-slate-600">123 Dental Plaza, Medical District<br />San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Phone Number</h4>
                  <p className="text-slate-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Address</h4>
                  <p className="text-slate-600">hello@brightsmile.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Working Hours</h4>
                  <p className="text-slate-600">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-[40px] shadow-2xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    placeholder="(555) 000-0000"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Service</label>
                  <select 
                    required
                    value={formState.service}
                    onChange={(e) => setFormState({...formState, service: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none"
                  >
                    <option value="">Choose a service</option>
                    <option value="general">General Checkup</option>
                    <option value="whitening">Teeth Whitening</option>
                    <option value="implants">Dental Implants</option>
                    <option value="orthodontics">Orthodontics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                <textarea 
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Tell us about your dental concerns..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-2 rounded-lg mr-2">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Bright<span className="text-blue-600">Smile</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Providing exceptional dental care with a focus on patient comfort and advanced technology. Your smile is our passion.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-slate-400 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">General Dentistry</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Teeth Whitening</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Dental Implants</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Orthodontics</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Root Canal Therapy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-6">Subscribe to get the latest dental tips and offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border-none rounded-l-xl px-4 py-3 w-full focus:ring-1 focus:ring-blue-600 outline-none"
              />
              <button className="bg-blue-600 px-4 py-3 rounded-r-xl hover:bg-blue-700 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
