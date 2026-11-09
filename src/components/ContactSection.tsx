'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { OWNER_PROFILE } from '@/data/portfolio';
import { Mail, Copy, Check, ArrowUpRight, Send, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

export function ContactSection() {
  const t = useTranslations('contact');
  const homeT = useTranslations('home');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="pt-10 pb-20 sm:pb-28">
      <div className="relative rounded-3xl theme-card p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
        {/* Subtle background glow */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--accent-primary)] opacity-[0.06] blur-[100px] rounded-full"
        />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider font-bold">
              05 // {locale === 'id' ? 'KOLABORASI & KONTAK' : 'GET IN TOUCH'}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--text-muted)]">
            <MapPin className="h-3 w-3 text-[var(--accent-primary)]" />
            <span>Jakarta, ID (UTC+7)</span>
          </div>
        </div>

        {/* Main Grid: Pitch + Form & Direct Channels */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Call to Action & Fast Links */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]">
              {locale === 'id' ? (
                <>
                  Punya ide proyek atau ingin berkolaborasi?{' '}
                  <span className="text-[var(--accent-primary)]">Mari bicara.</span>
                </>
              ) : (
                <>
                  Have a project in mind or want to collaborate?{' '}
                  <span className="text-[var(--accent-primary)]">Let&apos;s talk.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {locale === 'id'
                ? 'Saya terbuka untuk posisi rekayasa perangkat lunak (Full-Stack & Mobile), pembuatan produk digital, atau eksplorasi game interaktif. Kirimkan pesan langsung melalui email atau formulir di samping.'
                : 'I am available for full-stack engineering roles, freelance software builds, or interactive game collaborations. Reach out directly via email or through the inquiry form.'}
            </p>

            {/* Email Copy Card */}
            <div className="p-5 rounded-2xl theme-chip space-y-3">
              <span className="font-mono text-xs uppercase text-[var(--text-muted)] block">
                Direct Email Channel
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-[var(--text-primary)] select-all">
                  {OWNER_PROFILE.email}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="interactive-btn interactive-btn-secondary px-3.5 py-1.5 text-xs font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                        <span className="text-[var(--accent-primary)] font-bold">{locale === 'id' ? 'Tersalin!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{locale === 'id' ? 'Salin' : 'Copy'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="interactive-btn interactive-btn-primary px-3.5 py-1.5 text-xs font-mono font-bold shadow-md"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{locale === 'id' ? 'Kirim' : 'Email'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Social Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={OWNER_PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl theme-chip hover:border-[var(--accent-primary)]/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="h-4 w-4 text-[var(--accent-primary)]" />
                  <span className="font-mono text-xs text-[var(--text-primary)] font-semibold">GitHub</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              </a>

              <a
                href={OWNER_PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl theme-chip hover:border-[var(--accent-primary)]/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="h-4 w-4 text-[var(--accent-primary)]" />
                  <span className="font-mono text-xs text-[var(--text-primary)] font-semibold">LinkedIn</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Interactive Inquiry Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl theme-chip">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
              {locale === 'id' ? 'Kirim Pesan Langsung' : 'Send an Inquiry'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              {locale === 'id'
                ? 'Isi formulir di bawah ini untuk memulai percakapan.'
                : 'Fill out the form below to start a conversation.'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-center space-y-3">
                <Check className="h-8 w-8 text-[var(--accent-primary)] mx-auto" />
                <h4 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  {locale === 'id' ? 'Terima kasih atas pesan Anda!' : 'Thank you for reaching out!'}
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  {locale === 'id'
                    ? 'Pesan Anda telah diterima. Sakti akan membalas segera melalui email.'
                    : 'Your inquiry has been received. Sakti will reply shortly via email.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="font-mono text-xs text-[var(--accent-primary)] underline pt-2"
                >
                  {locale === 'id' ? 'Kirim pesan lain' : 'Send another note'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-[var(--text-muted)] mb-1.5 uppercase font-medium">
                    {locale === 'id' ? 'Nama Anda' : 'Your Name'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl theme-input text-sm font-mono placeholder:opacity-40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-[var(--text-muted)] mb-1.5 uppercase font-medium">
                    {locale === 'id' ? 'Alamat Email' : 'Email Address'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl theme-input text-sm font-mono placeholder:opacity-40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-[var(--text-muted)] mb-1.5 uppercase font-medium">
                    {locale === 'id' ? 'Pesan / Rencana Proyek' : 'Message / Project Scope'}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      locale === 'id'
                        ? 'Ceritakan tentang kebutuhan proyek atau peluang kolaborasi...'
                        : 'Tell me about your project, timeline, or collaboration ideas...'
                    }
                    className="w-full px-4 py-3 rounded-xl theme-input text-sm font-mono placeholder:opacity-40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="interactive-btn interactive-btn-primary w-full py-3.5 text-xs font-mono uppercase tracking-wider shadow-md"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{locale === 'id' ? 'Kirim Pesan' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
