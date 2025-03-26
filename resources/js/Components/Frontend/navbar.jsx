'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePage, Link } from '@inertiajs/react'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
]

export default function Navbar () {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { url } = usePage()
    const isContactPage = url === '/contact'

    // Function to check if a link is active
    const isLinkActive = href => {
        if (href.startsWith('#')) return false
        return url === href
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Top Bar - Only visible when scrolled */}
            <div
                className={cn(
                    'hidden md:block bg-primary text-primary-foreground py-3 fixed w-full z-50 transition-all duration-300',
                    isScrolled
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-[-100%] opacity-0'
                )}
            >
                <div className='container flex justify-center items-center'>
                    <div className='flex items-center space-x-8'>
                        <div className='flex items-center'>
                            <Phone className='h-5 w-5 mr-2 text-secondary' />
                            <a
                                href='tel:+0285403701'
                                className='text-base font-medium'
                            >
                                +02 8540 3701
                            </a>
                        </div>
                        <div className='flex items-center'>
                            <Mail className='h-5 w-5 mr-2 text-secondary' />
                            <a
                                href='mailto:abus@lawyer.com'
                                className='text-base font-medium'
                            >
                                abus@lawyer.com
                            </a>
                        </div>
                        <div className='flex items-center'>
                            <Clock className='h-5 w-5 mr-2 text-secondary' />
                            <span className='text-base font-medium'>
                                Mon-Fri: 9:00 AM - 5:30 PM
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header
                className={cn(
                    'fixed top-0 w-full z-50 transition-all duration-500',
                    isContactPage
                        ? isScrolled
                            ? 'bg-black/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md translate-y-0 md:translate-y-[48px]'
                            : 'bg-black/95 dark:bg-gray-900/95 translate-y-0'
                        : isScrolled
                        ? 'bg-black/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md translate-y-0 md:translate-y-[48px]'
                        : 'bg-transparent translate-y-0'
                )}
            >
                <div className='container mx-auto px-4'>
                    <div className='flex h-20 items-center justify-between'>
                        <div className='flex items-center'>
                            <Link href='/' className='flex items-center'>
                                <img
                                    src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Abu%20Legal%20Logo2-Photoroom-Q77BJKVpjQf66LR9Qtrduxtszpna6B.png'
                                    alt='Abu Legal Logo'
                                    className='h-10 md:h-12'
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className='hidden md:flex items-center space-x-1'>
                            {navLinks.map(link => (
                                <div key={link.name} className='relative group'>
                                    {link.href.startsWith('#') ? (
                                        <a
                                            href={link.href}
                                            className='px-4 py-2 text-base font-medium text-white hover:text-secondary rounded-md transition-colors'
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                'px-4 py-2 text-base font-medium rounded-md transition-colors',
                                                isLinkActive(link.href)
                                                    ? 'text-secondary font-semibold'
                                                    : 'text-white hover:text-secondary'
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className='hidden md:block'>
                            <Button
                                className={cn(
                                    'hover:bg-secondary/90 text-secondary-foreground',
                                    isLinkActive('/contact')
                                        ? 'bg-secondary'
                                        : 'bg-secondary/80'
                                )}
                                asChild
                            >
                                <Link href='/contact'>Free Consultation</Link>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <div className='md:hidden'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label='Toggle menu'
                                className='text-white hover:bg-white/10 hover:text-white'
                            >
                                {isOpen ? (
                                    <X className='h-6 w-6' />
                                ) : (
                                    <Menu className='h-6 w-6' />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
                        isOpen ? 'max-h-screen' : 'max-h-0'
                    )}
                >
                    <div className='px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900'>
                        {navLinks.map(link => (
                            <div key={link.name}>
                                {link.href.startsWith('#') ? (
                                    <a
                                        href={link.href}
                                        className='block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'block px-3 py-2 text-lg font-medium rounded-md',
                                            isLinkActive(link.href)
                                                ? 'text-primary dark:text-primary font-semibold bg-gray-100 dark:bg-gray-800'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className='pt-4'>
                            <Button
                                className={cn(
                                    'w-full hover:bg-primary/90 text-white',
                                    isLinkActive('/contact')
                                        ? 'bg-primary'
                                        : 'bg-primary/80'
                                )}
                                asChild
                            >
                                <Link href='/contact'>Free Consultation</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
