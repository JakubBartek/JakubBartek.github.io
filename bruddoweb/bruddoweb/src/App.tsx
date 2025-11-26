import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import van1 from './assets/van1.jpg'
import van2 from './assets/van2.avif'
import van3 from './assets/van3.jpg'

function App() {
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [formMessage, setFormMessage] = useState('')
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const images = [van1, van2, van3]
  const currentImageIndex = lightboxImage ? images.indexOf(lightboxImage) : -1

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentImageIndex < images.length - 1) {
      setLightboxImage(images[currentImageIndex + 1])
    } else {
      setLightboxImage(images[0])
    }
  }

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentImageIndex > 0) {
      setLightboxImage(images[currentImageIndex - 1])
    } else {
      setLightboxImage(images[images.length - 1])
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is in top 100px of screen
      if (e.clientY < 100) {
        setIsNavVisible(true)
      } else {
        setIsNavVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus('success')
        setFormMessage('Objednávka bola úspešne odoslaná!')
        e.currentTarget.reset()
      } else {
        setFormStatus('error')
        setFormMessage('Chyba pri odosielaní. Skúste to znova.')
      }
    } catch (error: unknown) {
      console.log(error)
      setFormStatus('error')
      setFormMessage('Chyba pri odosielaní. Skúste to znova.')
    }
  }

  return (
    <div className='min-h-screen fullpage-animated-gradient'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full z-50 px-6 md:px-24'>
        <div
          className={`absolute inset-0 bg-slate-900 shadow-lg glass-card transition-opacity duration-300 ${
            isNavVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className='relative mx-auto py-4'>
          <div className='flex justify-center gap-2 md:gap-6'>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('specifikacie')}
              className='text-lg font-medium text-blue-300 hover:text-blue-100 hover:bg-blue-900/50'
            >
              Špecifikácie
            </Button>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('objednat')}
              className='text-lg font-medium text-blue-300 hover:text-blue-100 hover:bg-blue-900/50'
            >
              Objednať si
            </Button>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('kontakt')}
              className='text-lg font-medium text-blue-300 hover:text-blue-100 hover:bg-blue-900/50'
            >
              Kontakt
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {/* Vitajte Section */}
        <section
          id='vitajte'
          className='min-h-screen flex items-center justify-center relative'
        >
          <div className='max-w-4xl mx-auto px-4 py-32 relative z-10 text-center'>
            <h1 className='text-5xl font-extrabold mb-6 text-blue-300'>
              Vitajte na našej stránke
            </h1>
            <p className='text-xl text-blue-100'>
              Objavte naše špecifikácie a objednajte si ešte dnes!
            </p>
          </div>
        </section>
        {/* Špecifikácie Section */}
        <section
          id='specifikacie'
          className='min-h-screen flex items-center justify-center relative'
        >
          <div className='max-w-4xl md:w-4xl mx-auto px-4 py-32 relative z-10'>
            <h2 className='text-4xl font-bold mb-6 text-center text-blue-300'>
              Špecifikácie
            </h2>
            <div className='glass-card p-8 rounded-lg shadow-2xl'>
              <ul className='space-y-3 text-lg mb-8'>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>✓</span>
                  <span className='text-blue-100'>
                    Vysoká kvalita produktov
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>✓</span>
                  <span className='text-blue-100'>Rýchle dodanie</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>✓</span>
                  <span className='text-blue-100'>Profesionálny servis</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>✓</span>
                  <span className='text-blue-100'>
                    Záručný servis 24 mesiacov
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>✓</span>
                  <span className='text-blue-100'>
                    Možnosť prispôsobenia podľa potrieb
                  </span>
                </li>
              </ul>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <div className='overflow-hidden rounded-lg border border-blue-800 cursor-pointer'>
                  <img
                    src={van1}
                    alt='Dodávka 1'
                    className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
                    onClick={() => setLightboxImage(van1)}
                  />
                </div>
                <div className='overflow-hidden rounded-lg border border-blue-800 cursor-pointer'>
                  <img
                    src={van2}
                    alt='Dodávka 2'
                    className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
                    onClick={() => setLightboxImage(van2)}
                  />
                </div>
                <div className='overflow-hidden rounded-lg border border-blue-800 cursor-pointer'>
                  <img
                    src={van3}
                    alt='Dodávka 3'
                    className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
                    onClick={() => setLightboxImage(van3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Objednať si Section */}
        <section
          id='objednat'
          className='min-h-screen flex items-center justify-center relative'
        >
          <div className='max-w-4xl md:w-4xl mx-auto px-4 py-32 relative z-10'>
            <h2 className='text-4xl font-bold mb-6 text-center text-blue-300'>
              Objednať si
            </h2>
            <div className='glass-card p-8 rounded-lg shadow-2xl'>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <input
                  type='hidden'
                  name='access_key'
                  value='YOUR_WEB3FORMS_ACCESS_KEY'
                />
                <input
                  type='hidden'
                  name='subject'
                  value='Nova objednavka z webovej stranky'
                />
                <input
                  type='hidden'
                  name='from_name'
                  value='Bruddoweb Contact Form'
                />

                <div>
                  <label className='block text-sm font-medium mb-2 text-blue-300'>
                    Meno
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    className='w-full px-4 py-2 bg-slate-800 border border-blue-800 text-blue-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Vaše meno'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2 text-blue-300'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    required
                    className='w-full px-4 py-2 bg-slate-800 border border-blue-800 text-blue-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='vas@email.com'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2 text-blue-300'>
                    Správa
                  </label>
                  <textarea
                    name='message'
                    required
                    className='w-full px-4 py-2 bg-slate-800 border border-blue-800 text-blue-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    rows={4}
                    placeholder='Vaša správa'
                  />
                </div>

                {formStatus === 'success' && (
                  <div className='p-4 bg-blue-900/30 border border-blue-700 text-blue-200 rounded-md'>
                    {formMessage}
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className='p-4 bg-red-900/30 border border-red-700 text-red-200 rounded-md'>
                    {formMessage}
                  </div>
                )}

                <Button
                  type='submit'
                  className='w-full bg-blue-700 hover:bg-blue-600 text-white'
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting'
                    ? 'Odeosielam...'
                    : 'Odoslať objednávku'}
                </Button>
              </form>
            </div>
          </div>
        </section>
        {/* Kontakt Section */}
        <section
          id='kontakt'
          className='min-h-screen flex items-center justify-center relative'
        >
          <div className='max-w-4xl md:w-4xl mx-auto px-4 py-32 relative z-10'>
            <h2 className='text-4xl font-bold mb-6 text-center text-blue-300'>
              Kontakt
            </h2>
            <div className='glass-card p-8 rounded-lg shadow-2xl md:w-4xl text-center'>
              <p className='text-lg mb-4 text-blue-100'>
                <strong className='text-blue-300'>Email:</strong>{' '}
                info@example.com
              </p>
              <p className='text-lg mb-4 text-blue-100'>
                <strong className='text-blue-300'>Telefón:</strong> +421 123 456
                789
              </p>
              <p className='text-lg text-blue-100'>
                <strong className='text-blue-300'>Adresa:</strong> Bratislava,
                Slovensko
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className='fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4'
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={showPrevImage}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-300 transition-colors z-10 p-4'
            aria-label='Predchádzajúci obrázok'
          >
            ‹
          </button>

          <div className='relative max-w-7xl max-h-[90vh]'>
            <button
              onClick={() => setLightboxImage(null)}
              className='absolute -top-12 right-0 text-white text-4xl hover:text-blue-300 transition-colors'
              aria-label='Zavrieť'
            >
              ×
            </button>
            <img
              src={lightboxImage}
              alt='Veľký náhľad'
              className='max-w-full max-h-[90vh] object-contain rounded-lg'
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            onClick={showNextImage}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-300 transition-colors z-10 p-4'
            aria-label='Ďalší obrázok'
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default App
