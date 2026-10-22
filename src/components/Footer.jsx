"use client"

import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background text-foreground/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="font-bold text-xl text-blue-600">
              StoreForge
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed">
              A modern product management application built with Next.js App
              Router and Firebase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/items"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Management */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Portal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/items/add"
                  className="hover:text-blue-600 transition-colors"
                >
                  Add Item
                </Link>
              </li>
              <li>
                <Link
                  href="/items/manage"
                  className="hover:text-blue-600 transition-colors"
                >
                  Manage Items
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-blue-600 transition-colors"
                >
                  Account Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border/60 hover:text-blue-600 hover:border-blue-600/40 transition-colors"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border/60 hover:text-blue-600 hover:border-blue-600/40 transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border/60 hover:text-blue-600 hover:border-blue-600/40 transition-colors"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-xs text-foreground/50">
          © 2026 StoreForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
