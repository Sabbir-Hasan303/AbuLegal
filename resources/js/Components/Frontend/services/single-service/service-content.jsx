import { useRef, useEffect } from 'react'

export default function ServiceContent ({ service }) {
    const sectionRef = useRef(null)
    const elementsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        elementsRef.current.forEach(el => {
            if (el) observer.observe(el)
        })

        return () => {
            elementsRef.current.forEach(el => {
                if (el) observer.unobserve(el)
            })
        }
    }, [])

    return (
        <div ref={sectionRef} className='space-y-12'>
            {/* Overview Section */}
            <section
                ref={el => (elementsRef.current[0] = el)}
                className='opacity-0'
            >
                <h2 className='text-3xl font-bold text-primary font-serif mb-6'>
                    Overview
                </h2>
                <div className='prose prose-lg max-w-none dark:prose-invert'>
                    <div dangerouslySetInnerHTML={{ __html: service.description }} />
                </div>
            </section>
        </div>
    )
}
