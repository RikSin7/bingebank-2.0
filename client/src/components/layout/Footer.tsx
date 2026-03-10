"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Instagram, Linkedin, Globe, Film, Tv, Home } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movies", href: "/explore?category=trending-movies", icon: Film },
    { name: "TV Shows", href: "/explore?category=trending-tv", icon: Tv },
    { name: "Favorites", href: "/favorites", icon: Heart },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/rikxsin/", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ritik-singhh/", icon: Linkedin },
    { name: "Portfolio", href: "https://ritikportfoliosingh.netlify.app/", icon: Globe },
  ];

  return (
    <footer className="w-full relative mt-20 border-t border-[var(--border-medium)] bg-[var(--bg-primary)] overflow-hidden">


      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 pb-8 lg:pb-12 xl:pl-[100px] relative z-10 text-[var(--text-primary)]">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 outline-none group w-fit">
              <Image src="/bingebank.svg" alt="BingeBank Logo" width={36} height={36} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="text-2xl font-black tracking-wider text-[var(--text-primary)]">
                BingeBank
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-xs">
              Your ultimate companion for exploring and tracking the best movies and TV shows. Discover your next binge-watch today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 md:items-center">
            <div className="flex flex-col gap-4 w-fit">
              <h3 className="text-lg font-bold tracking-wide">Quick Links</h3>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="flex items-center gap-2 w-fit text-sm md:text-base text-[var(--text-secondary)] hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-col gap-4 w-fit">
              <h3 className="text-lg font-bold tracking-wide">Connect with me</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-[var(--bg-glass)] border border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)] hover:border-[var(--text-muted)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border-medium)] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>© {year} BingeBank. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by 
            <a href="https://ritikportfoliosingh.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] font-bold md:text-base hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
              style={{ textShadow: "rgba(168, 85, 247, 0.3) 0px 0px 10px" }}
            >
              Ritik
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
