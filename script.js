const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
      navigation.classList.remove('is-open');
    });
  });
}

const yearElement = document.querySelector('#current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const testimonials = [
  {
    quote: 'Dulu rasanya kami selalu sibuk, tapi tidak selalu maju. Dengan NusaFlow, semua jadi lebih jelas—dan tim punya energi lagi untuk bikin hal-hal hebat.',
    name: 'Nadia Putri',
    role: 'Co-founder, Arkana Studio',
    initial: 'N',
    color: '#f3d9ca',
    textColor: '#855c47'
  },
  {
    quote: 'Akhirnya semua orang tahu apa yang perlu dikerjakan dan kapan harus berkolaborasi. Rapat kami lebih singkat, hasilnya justru jauh lebih terasa.',
    name: 'Dimas Pratama',
    role: 'Product Lead, Kita Digital',
    initial: 'D',
    color: '#d8ebdf',
    textColor: '#45765a'
  },
  {
    quote: 'NusaFlow memberi tim kami ruang untuk fokus. Rasanya menyenangkan melihat ide-ide yang dulu tertunda akhirnya benar-benar terwujud.',
    name: 'Sari Wibowo',
    role: 'Creative Director, Senja Works',
    initial: 'S',
    color: '#e5ddf3',
    textColor: '#735c94'
  }
];

let activeTestimonial = 0;
const quoteElement = document.querySelector('#testimonial-quote');
const nameElement = document.querySelector('#testimonial-name');
const roleElement = document.querySelector('#testimonial-role');
const avatarElement = document.querySelector('#testimonial-avatar');
const slideElement = document.querySelector('#slide-current');

function showTestimonial(index) {
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[activeTestimonial];

  quoteElement.textContent = testimonial.quote;
  nameElement.textContent = testimonial.name;
  roleElement.textContent = testimonial.role;
  avatarElement.textContent = testimonial.initial;
  avatarElement.style.backgroundColor = testimonial.color;
  avatarElement.style.color = testimonial.textColor;
  slideElement.textContent = String(activeTestimonial + 1).padStart(2, '0');
}

document.querySelector('#testimonial-prev')?.addEventListener('click', () => {
  showTestimonial(activeTestimonial - 1);
});

document.querySelector('#testimonial-next')?.addEventListener('click', () => {
  showTestimonial(activeTestimonial + 1);
});

const contactForm = document.querySelector('#contact-form');
const feedbackElement = document.querySelector('#form-feedback');

if (contactForm && feedbackElement) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      feedbackElement.textContent = 'Mohon lengkapi semua kolom dengan benar.';
      feedbackElement.classList.add('error');
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get('name').toString().trim();
    feedbackElement.textContent = `Terima kasih, ${name}! Pesan kamu sudah siap. Hubungi kami di halo@nusaflow.id untuk melanjutkan.`;
    feedbackElement.classList.remove('error');
    contactForm.reset();
  });
}
