import React, { useState } from 'react';
import { submitFeedback } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill out all fields',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        success: false,
        message: 'Please enter a valid email address',
      });
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      await submitFeedback({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      
      setFormStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setFormStatus({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center"
        style={{
          backgroundImage: "url('/gallery/hero-2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-midnight bg-opacity-70"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-aurora-gradient opacity-20 animate-shimmer"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-snow-white mb-4">
            Contact <span className="text-ice-blue">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-frost-blue mb-8">
            Get in touch with the WinterCraft team
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="winter-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
                Send Us a Message
              </h2>
              <div className="w-24 h-1 bg-ice-blue mb-6"></div>
              <p className="text-lg text-frost-blue mb-8">
                Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-frost-blue mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-midnight border border-frost-blue text-snow-white focus:border-ice-blue focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-frost-blue mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-midnight border border-frost-blue text-snow-white focus:border-ice-blue focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-frost-blue mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-midnight border border-frost-blue text-snow-white focus:border-ice-blue focus:outline-none resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                
                {formStatus && (
                  <div className={`p-4 rounded-lg ${
                    formStatus.success 
                      ? 'bg-green-900 bg-opacity-20 border border-green-500' 
                      : 'bg-red-900 bg-opacity-20 border border-red-500'
                  }`}>
                    <p className={`${
                      formStatus.success ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formStatus.message}
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`winter-button py-3 px-8 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
                Connect With Us
              </h2>
              <div className="w-24 h-1 bg-ice-blue mb-6"></div>
              <p className="text-lg text-frost-blue mb-8">
                Join our community and connect with us on these platforms:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-ice-blue p-3 rounded-lg">
                    <svg className="w-6 h-6 text-midnight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-snow-white">Discord</h3>
                    <p className="text-frost-blue mb-2">Join our community server</p>
                    <a 
                      href="https://discord.gg/wintercraft" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ice-blue hover:text-frost-blue transition-colors"
                    >
                      discord.gg/wintercraft
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-ice-blue p-3 rounded-lg">
                    <svg className="w-6 h-6 text-midnight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-snow-white">Twitter</h3>
                    <p className="text-frost-blue mb-2">Follow us for updates</p>
                    <a 
                      href="https://twitter.com/wintercraft" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ice-blue hover:text-frost-blue transition-colors"
                    >
                      @wintercraft
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-ice-blue p-3 rounded-lg">
                    <svg className="w-6 h-6 text-midnight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-snow-white">YouTube</h3>
                    <p className="text-frost-blue mb-2">Watch our videos</p>
                    <a 
                      href="https://youtube.com/wintercraft" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ice-blue hover:text-frost-blue transition-colors"
                    >
                      youtube.com/wintercraft
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-ice-blue p-3 rounded-lg">
                    <svg className="w-6 h-6 text-midnight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-snow-white">Email</h3>
                    <p className="text-frost-blue mb-2">Send us an email</p>
                    <a 
                      href="mailto:support@wintercraft.net" 
                      className="text-ice-blue hover:text-frost-blue transition-colors"
                    >
                      support@wintercraft.net
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="winter-section bg-midnight bg-opacity-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-snow-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-ice-blue mx-auto mb-6"></div>
            <p className="text-lg text-frost-blue max-w-3xl mx-auto">
              Find answers to common questions about WinterCraft 2025.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                How do I join the server?
              </h3>
              <p className="text-frost-blue">
                To join WinterCraft, simply add <span className="text-ice-blue font-medium">play.wintercraft.net</span> to your Minecraft server list. We support Minecraft Java Edition versions 1.16.5 to 1.20.1.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                Why is my game lagging?
              </h3>
              <p className="text-frost-blue">
                Lag can be caused by various factors. Try reducing your render distance, closing background applications, or allocating more RAM to Minecraft. If problems persist, please contact our support team on Discord.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                How does the donation system work?
              </h3>
              <p className="text-frost-blue">
                Our donation system is simple and secure. Visit the Store page, select a package, enter your Minecraft username, and complete the payment. Your rank and perks will be applied instantly through our automated system.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                When do events take place?
              </h3>
              <p className="text-frost-blue">
                Events are scheduled throughout the WinterCraft 2025 season. Check the Events page for the full schedule. We also announce upcoming events on our Discord server and social media channels.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                How can I report a player?
              </h3>
              <p className="text-frost-blue">
                If you encounter a player breaking our rules, you can report them using the <span className="text-ice-blue font-medium">/report</span> command in-game or by contacting a moderator on our Discord server. Please provide evidence if possible.
              </p>
            </div>
            
            <div className="frost-card">
              <h3 className="text-xl font-playfair font-bold text-snow-white mb-2">
                How long will WinterCraft 2025 be active?
              </h3>
              <p className="text-frost-blue">
                WinterCraft 2025 will run from December 1, 2025, to January 31, 2026. After this period, the server will close until the next winter season.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
