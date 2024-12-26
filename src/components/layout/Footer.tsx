'use client'

import { Link } from 'react-router-dom'

const Footer = () => {
  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ]

  const socialLinks = [
    { label: 'Facebook', icon: '📘', url: '#' },
    { label: 'Twitter', icon: '🐦', url: '#' },
    { label: 'LinkedIn', icon: '💼', url: '#' },
    { label: 'Instagram', icon: '📸', url: '#' },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">MediGlobal Connect</h3>
            <p className="text-sm text-muted-foreground">
              Connecting you to affordable medical procedures worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: contact@mediglobal.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="text-2xl hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediGlobal Connect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer 