import { Language, getTranslation } from '@/lib/translations';

interface TestimonialsProps {
  lang: Language;
}

export function Testimonials({ lang }: TestimonialsProps) {
  const t = getTranslation(lang);

  const colors = [
    'from-amber-400 to-orange-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-amber-500',
  ];

  const avatars = [null, null, null]; // null means use image
  const avatarImages = ['/testimonials/minjun-kimо.jpg', '/testimonials/Ilya_Suslov.jpg', '/testimonials/Lisa Reynolds.jpg'];

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-6">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <span className="text-amber-400 text-xs sm:text-sm font-medium">{t.testimonials.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {t.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-amber-500/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500/20 mb-4 sm:mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              {/* Tag */}
              <div className="mb-4">
                <span className={`inline-flex px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colors[index]} bg-opacity-10 text-amber-300`}>
                  {testimonial.tag}
                </span>
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 sm:mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                {avatarImages[index] ? (
                  <img 
                    src={avatarImages[index]} 
                    alt={testimonial.author}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white font-semibold text-sm sm:text-base`}>
                    {avatars[index]}
                  </div>
                )}
                <div>
                  <div className="text-white font-medium text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-slate-500 text-xs sm:text-sm">{testimonial.company}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
