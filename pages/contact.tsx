import React, { useState } from 'react';

const statBlocks = [
  { label: 'Players Helped', value: '100' },
  { label: 'Avg. Reply Time', value: '< 12h' },
  { label: 'Lag Reports Solved', value: '92%' },
];

const socials = [
  {
    title: 'Discord',
    description: 'Join Discord to beta test builds and ideas.',
    href: 'https://discord.gg/FbVCPBf9EZ',
    display: 'discord.gg/FbVCPBf9EZ',
    icon: (
      <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.445.865-.608 1.25-1.845-.276-3.68-.276-5.487 0-.164-.394-.406-.874-.618-1.25a.077.077 0 00-.078-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.028C.533 9.046-.319 13.58.099 18.058a.082.082 0 00.031.056c2.053 1.508 4.042 2.423 5.993 3.03a.078.078 0 00.084-.028 17.1 17.1 0 001.226-1.994.076.076 0 00-.042-.106c-.652-.247-1.274-.55-1.872-.892a.077.077 0 01-.008-.128c.126-.094.252-.192.372-.29a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.079.009c.12.1.246.199.373.293a.077.077 0 01-.007.128 12.299 12.299 0 01-1.873.89.077.077 0 00-.041.107c.36.699.772 1.364 1.225 1.994a.076.076 0 00.084.029c1.961-.607 3.95-1.522 6.002-3.03a.077.077 0 00.032-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 00-.031-.029zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
    ),
  },
  {
    title: 'Twitter',
    description: 'Catch news in real time.',
    href: 'https://twitter.com/wintercraft',
    display: '@wintercraft',
    icon: (
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    ),
  },
  {
    title: 'YouTube',
    description: 'Watch showcases and cinematic runs.',
    href: 'https://youtube.com/wintercraft',
    display: 'youtube.com/wintercraft',
    icon: (
      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
    ),
  },
  {
    title: 'Email',
    description: 'Official support without waiting in line.',
    href: 'mailto:support@wintercraft.net',
    display: 'support@wintercraft.net',
    icon: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
  },
];

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

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill out all fields',
      });
      return;
    }

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
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to send message.');
      }

      setFormStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      });

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
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-midnight via-night to-midnight text-snow-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,199,255,0.25),_transparent_55%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col gap-10 md:flex-row items-center px-6 py-20 md:py-28">
          <div className="flex-1">
            <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-ice-blue/70 mb-4">
              WinterCraft Support
            </p>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold leading-tight mb-6">
              A contact point where{' '}
              <span className="text-ice-blue">beauty</span> meets lag-free stability.
            </h1>
            <p className="text-lg md:text-xl text-frost-blue max-w-2xl">
              We rebuilt the contact center with lightweight UI and fast response times. Tell us
              what you need&mdash;we'll answer before the snow melts.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {statBlocks.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-3xl font-semibold text-ice-blue">{stat.value}</p>
                  <p className="text-frost-blue text-sm tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="rounded-[32px] border border-white/10 bg-midnight/60 p-6 md:p-8 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-frost-blue/70 mb-4">
                Beta build crew
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
                <a
                  href="https://discord.gg/FbVCPBf9EZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ice-blue transition-colors"
                >
                  Join Discord for beta testing and build duty
                </a>
              </h2>
              <p className="text-frost-blue mb-6">
                Fresh locations, priority access, and a direct channel to the developers. No visual
                noise&mdash;just clean ice and focus on progress.
              </p>
              <a
                href="https://discord.gg/FbVCPBf9EZ"
                target="_blank"
                rel="noopener noreferrer"
                className="winter-button block w-full text-center py-3 text-lg"
              >
                Join Discord
              </a>
              <p className="text-xs text-frost-blue/80 mt-3 text-center">
                Shareable link: discord.gg/FbVCPBf9EZ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Contacts */}
      <section className="winter-section py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-ice-blue/70">Say hello</p>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold mt-2">
                    Send us a message
                  </h3>
                </div>
                <span className="rounded-full border border-ice-blue/40 px-4 py-2 text-xs uppercase tracking-[0.4em] text-ice-blue/80">
                  24/7
                </span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm uppercase tracking-[0.3em] text-frost-blue mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-midnight/70 px-4 py-3 text-snow-white placeholder:text-frost-blue/50 focus:border-ice-blue focus:outline-none focus:ring-2 focus:ring-ice-blue/30 transition"
                    placeholder="Aria Frost"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-[0.3em] text-frost-blue mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-midnight/70 px-4 py-3 text-snow-white placeholder:text-frost-blue/50 focus:border-ice-blue focus:outline-none focus:ring-2 focus:ring-ice-blue/30 transition"
                    placeholder="frost@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-[0.3em] text-frost-blue mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-2xl border border-white/10 bg-midnight/70 px-4 py-3 text-snow-white placeholder:text-frost-blue/50 focus:border-ice-blue focus:outline-none focus:ring-2 focus:ring-ice-blue/30 transition resize-none"
                    placeholder="Tell us about your idea, bug, or request..."
                  />
                </div>

                {formStatus && (
                  <div
                    className={`rounded-2xl border px-4 py-3 ${
                      formStatus.success
                        ? 'border-emerald-400/50 bg-emerald-900/20 text-emerald-200'
                        : 'border-red-400/50 bg-red-900/20 text-red-200'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`winter-button w-full py-3 text-lg ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-aurora-gradient/20 border border-ice-blue/20 p-8 shadow-lg">
                <p className="uppercase tracking-[0.3em] text-xs text-ice-blue/70">Lag-free zone</p>
                <h3 className="text-3xl font-playfair font-semibold mt-3 mb-4">
                  Modern look without heavy textures
                </h3>
                <p className="text-frost-blue">
                  Lightweight UI, soft gradients, and glass cards help the page load fast even on
                  low-end devices&mdash;all within the WinterCraft palette.
                </p>
              </div>

              <div className="grid gap-4">
                {socials.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 flex items-start gap-4 transition hover:border-ice-blue/40 hover:bg-white/10"
                  >
                    <div className="bg-ice-blue text-midnight rounded-xl p-3 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{social.title}</p>
                      <p className="text-sm text-frost-blue mb-2">{social.description}</p>
                      <span className="text-ice-blue group-hover:text-white transition">{social.display}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="winter-section bg-midnight/50 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.35em] text-xs text-ice-blue/70 mb-3">Need clarity?</p>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              FAQ: WinterCraft 2025 essentials
            </h2>
            <p className="text-frost-blue mt-4">
              Answers to common questions about connecting, lag, and seasonal events.
            </p>
          </div>

          <div className="grid gap-6">
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
    </main>
  );
}
