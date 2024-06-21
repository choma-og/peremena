import Swiper, { Navigation, Pagination, EffectFade, Autoplay, FreeMode } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '@/styles/style.scss';
import axios from 'axios';
import IMask from 'imask';
import { gsap, ScrollTrigger } from 'gsap/all';

// ADAPTIVE 
// Проверяем ширину экрана при загрузке страницы
window.onload = function() {
	moveTextBlock();
};

// Проверяем ширину экрана при изменении размеров окна
window.onresize = function() {
	moveTextBlock();
};

function moveTextBlock() {
	var screenWidth = window.innerWidth;

	// Если ширина экрана меньше или равна 800px
	if (screenWidth <= 800) {
			var aboutBox = document.querySelector('.about__box'); // Находим элемент с классом about__box
			var infoText = document.querySelector('.info-about__text'); // Находим блок с текстом

			// Перемещаем блок с текстом в начало родителя about__box
			if (aboutBox && infoText) {
					aboutBox.insertBefore(infoText, aboutBox.firstChild);
			}
	} else {
			var aboutInfo = document.querySelector('.about__info'); // Находим блок с информацией
			var infoText = document.querySelector('.info-about__text'); // Находим блок с текстом

			// Возвращаем блок с текстом в начало блока с информацией
			if (aboutInfo && infoText && infoText.parentNode !== aboutInfo) {
					aboutInfo.insertBefore(infoText, aboutInfo.firstChild);
			}
	}
}

// OPEN BURGER
const headerIcon = document.querySelector('.header__icon');
const jsHeaderMenu = document.querySelector('.js-header-menu');
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header'); // предположим, что у вас есть элемент header

headerIcon.addEventListener('click', (event) => {
  event.stopPropagation();
  
  document.body.classList.toggle("_lock");
  headerIcon.classList.toggle('active');
  jsHeaderMenu.classList.toggle('active');
  wrapper.classList.toggle('active');
  header.classList.toggle('burger-open');
});

// Общий обработчик клика на document
document.addEventListener('click', (event) => {
  // Проверяем, был ли клик вне jsHeaderMenu и вне modalBody и не на кнопке открытия модального окна
  if (!event.target.closest('.js-header-menu') && !modalBody.contains(event.target) && !Array.from(modalButtons).some(button => button.contains(event.target))) {
    document.body.classList.remove("_lock");
    jsHeaderMenu.classList.remove('active');
    headerIcon.classList.remove('active');
    wrapper.classList.remove('active');
    header.classList.remove('burger-open');
    
    // Закрытие модального окна (если оно открыто)
    if (modalBody.classList.contains("active")) {
      modalBody.classList.remove("active");
      errorBlock.forEach((item) => {
        item.classList.remove("_active");
      });
      modalInputs.forEach(input => {
        input.value = "";
      });
    }
  }
});

// OPEN JS MODAL MAIN
const modalBody = document.querySelector('.modal-main');
const modalButtons = document.querySelectorAll('.js-open-modal-main');
const modalClose = document.querySelector('.modal-main__close');
const errorBlock = document.querySelectorAll('.js-error');
const modalInputs = document.querySelectorAll("input");

if (modalButtons) {
  modalButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      document.body.classList.add("_lock");
      wrapper.classList.add('active'); // Добавляем класс active к wrapper
      modalBody.classList.add("active");
    });
  });
}

if (modalClose) {
  modalClose.addEventListener("click", (e) => {
    document.body.classList.remove("_lock");
    modalBody.classList.remove("active");
    wrapper.classList.remove('active');
    errorBlock.forEach((item) => {
      item.classList.remove("_active");
    });
    modalInputs.forEach(input => {
      input.value = "";
    });
  });
}
// HEADER CHANGE BACKGROUND
window.addEventListener('scroll', function() {
  let header = document.querySelector('.header');
  let scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});



// WIDGET CALL 
// Инициализируем ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Функция для добавления/удаления класса active
const toggleActiveClass = () => {
	const scrollUpButton = document.getElementById('modalscroll-btn');
	const contactsSection = document.getElementById('contacts');
	const scrollUpLink = document.getElementById('scroll-up');
	const footer = document.querySelector('.footer');
	const footerHeight = footer.offsetHeight; // Получаем высоту footer

	// Создаем ScrollTrigger для добавления класса active при достижении 1400 пикселей
	ScrollTrigger.create({
			trigger: scrollUpButton,
			start: 'bottom center',
			endTrigger: contactsSection,
			end: 'top bottom',
			toggleClass: { targets: '#modalscroll-btn', className: 'active' },
	});

	// Создаем ScrollTrigger для удаления класса active при входе в секцию contacts
	ScrollTrigger.create({
			trigger: contactsSection,
			start: 'top top',
			end: 'top top',
			onEnter: () => {
					scrollUpButton.classList.remove('active');
			},
	});

	ScrollTrigger.create({
		trigger: footer,
		start: '30% bottom', // Начинаем отслеживать, когда пользователь входит в footer
		end: 'bottom top', // Завершаем отслеживание, когда пользователь выходит из footer
		toggleClass: { targets: '#scroll-up', className: 'active' },
});
};

// Вызываем функцию при загрузке страницы
window.addEventListener('load', toggleActiveClass);
// APPARTAMENTS




// gallery swiper
document.addEventListener("DOMContentLoaded", function() {
	var gallerySwiper = new Swiper(".gallery-swiper", {
			loop: false,
			spaceBetween: 20,
			modules: [Navigation,Pagination],
			navigation: {
					nextEl: ".gallery-next",
					prevEl: ".gallery-prev",
			},
			pagination: {
					el: ".gallery-progress",
					type: "progressbar",
			},
			on: {
        init: function () {
            updateCounter(this);
        },
        slideChange: function () {
            updateCounter(this);
        }
    }
	});

	function updateCounter(swiper) {
    let currentSlide = swiper.activeIndex + 1;
    document.querySelector('.counter').innerHTML = `
    <span class="counter__current">
    ${currentSlide < 10 ? '0' + currentSlide : currentSlide}
    </span> `;

		// Общее количество слайдов
		let totalSlides = swiper.slides.length;
		document.querySelector('.counter2').innerHTML = `
		<span class="counter__total">
		${totalSlides < 10 ? '0' + totalSlides : totalSlides}
		</span> `;
}

if (gallerySwiper.initialized) {
	updateCounter(gallerySwiper);
} else {
	gallerySwiper.on('init', function () {
			updateCounter(gallerySwiper);
	});
}

	const galleryInfo = document.querySelectorAll(".info-gallery__descr");
	gallerySwiper.on('slideChange', function(swiper) {
		let activeSlideIndex = swiper.realIndex;
		let activeSlide = swiper.slides[activeSlideIndex];
		activeSlide.classList.add('_show');
		let previousSlide = swiper.slides[activeSlideIndex - 1];
		if(previousSlide) {
			previousSlide.classList.remove('_show');
		}
		let nextSlide = swiper.slides[activeSlideIndex + 1];
		if(nextSlide) {
			nextSlide.classList.remove('_show');
		}
		galleryInfo.forEach(info => {
			info.classList.remove('_showEffect');
		});
		let activeInfo = galleryInfo[activeSlideIndex];
		activeInfo.classList.add('_showEffect');
		let previousInfo = galleryInfo[activeSlideIndex - 1];
		if(previousInfo) {
			previousInfo.classList.remove('_showEffect');
		}
		let nextInfo = galleryInfo[activeSlideIndex + 1];
		if(nextInfo) {
			nextInfo.classList.remove('_showEffect');
		}
	});

});

// modal gallery swiper

var swiper = new Swiper(".modal-gallery__slider", {
	spaceBetween: 20,
});


// open modal gallery swiper
// Получаем все элементы с классом js-open-modal-gallery
const openModalGallery = document.querySelectorAll('.js-open-modal-gallery');
const modalGallery = document.querySelector('.modal-gallery');
const modalGalleryClose = document.querySelector('.modal-gallery__close');

// Перебираем все найденные элементы и назначаем им обработчик события клика
openModalGallery.forEach(button => {
    button.addEventListener('click', function() {
        // Находим элемент с классом modal-gallery и добавляем ему класс active
        modalGallery.classList.add('active');
				document.body.classList.add('_lock');
    });
});
// Добавляем обработчик события клика для закрытия модального окна
modalGalleryClose.addEventListener('click', function() {
	// Удаляем класс active у элемента с классом modal-gallery
	modalGallery.classList.remove('active');
	// Удаляем класс _lock у body
	document.body.classList.remove('_lock');
});


// CATEGORIES
const categories = {
	school: [{
		lat: 53.40653,
		lon: 83.93256,
		name: 'школа № 1'
	},
	{
		lat: 53.41216,
		lon: 83.92831,
		name: 'школа № 2'
	},
	{
		lat: 53.41369,
		lon: 83.93986,
		name: 'школа № 3'
	}],
	fitnes: [{
		lat: 53.41258,
		lon: 83.93501,
		name: 'фитнес № 4'
	}],
	kindergarten: [{
		lat: 53.41469,
		lon: 83.93986,
		name: 'садик № 5'
	}],
	garden: [{
		lat: 53.41091,
		lon: 83.93381,
		name: 'сад № 6'
	}],
	supermarket: [{
		lat: 53.41216,
		lon: 83.92831,
		name: 'маркет № 1'
	}],
};

const categoryIcons = {
	school: '/public/img/map/school.svg',
	fitnes: '/public/img/map/fitnes.svg',
	kindergarten: '/public/img/map/sadik.svg',
	garden: '/public/img/map/garden.svg',
	supermarket: '/public/img/map/supermarket.svg',
};

/*=============== MAP ===============*/
// document.addEventListener('DOMContentLoaded', function () {
// 	if (ymaps) {
// 		ymaps.ready(initializeMaps);
// 	}
// });

// let centerPeremena = [53.40895609798134, 83.94165306745913];
// let activeCategory = "school";
// let placemarks = [];

// function initializeMaps() {
// 	let mapPeremena = new ymaps.Map('map-peremena', {
// 		center: centerPeremena,
// 		zoom: 15,
// 	});

// 	// Add custom placemark for a specific location
// 	let placemarkCochlea = new ymaps.Placemark(centerPeremena, {}, {
// 		iconLayout: 'default#image',
// 		iconImageHref: '/public/img/map/dom.png',
// 		iconImageSize: [96, 92],
// 		iconImageOffset: [-20, -30]
// 	});

// 	// Remove unnecessary map controls
// 	mapPeremena.controls.remove('geolocationControl');
// 	mapPeremena.controls.remove('searchControl');
// 	mapPeremena.controls.remove('trafficControl');
// 	mapPeremena.controls.remove('typeSelector');
// 	mapPeremena.controls.remove('rulerControl', { scaleLine: false });
// 	mapPeremena.geoObjects.add(placemarkCochlea);

// 	// Function to add all placemarks with closed balloons
// 	const addAllPlacemarks = () => {
// 		for (const category in categories) {
// 			categories[category].forEach((item) => {
// 				const placemark = new ymaps.Placemark([item.lat, item.lon], {
// 					balloonContent: `<div class="custom-balloon-content">${item.name}</div>`,
// 				}, {
// 					iconLayout: 'default#image',
// 					iconImageHref: categoryIcons[category],
// 					iconImageSize: [30, 30],
// 					iconImageOffset: [-15, -15]
// 				});
// 				placemarks.push({ placemark, category });
// 				mapPeremena.geoObjects.add(placemark);
// 			});
// 		}
// 	};

// 	// Function to show placemarks for the selected category with opened balloons
// 	const showCategory = (category) => {
// 		mapPeremena.balloon.close(); // Close any open balloon

// 		placemarks.forEach(({ placemark, category: placemarkCategory }) => {
// 			if (placemarkCategory === category) {
// 				// Open balloon for placemarks of the selected category
// 				placemark.balloon.open();
// 			} else {
// 				placemark.balloon.close();
// 			}
// 		});
// 		activeCategory = category;
// 	};

// 	addAllPlacemarks(); // Show all placemarks initially

// 	// Add event listeners to category buttons
// 	const categoryButtons = document.querySelectorAll('.map__link');
// 	categoryButtons.forEach((button) => {
// 		button.addEventListener('click', (e) => {
// 			e.preventDefault();
// 			const category = e.currentTarget.dataset.category;
// 			showCategory(category);
// 		});
// 	});
// }





/*=============== MAP ===============*/
const LOCATION = {
  center: [37.623082, 55.75254], // starting position [lng, lat]
  zoom: 9 // starting zoom
};
const LONG_TEXT =
  'Popup on the custom marker (scrollable)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
let map = null;

main();
async function main() {
    // Waiting for all api elements to be loaded
    await ymaps3.ready;
    const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    // Import the package to add a default marker
    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    // Create a custom marker class with a popup
    class CustomMarkerWithPopup extends YMapComplexEntity {
        constructor(props) {
            super(props);
            this._marker = null;
            this._popup = null;
        }

        _onAttach() {
            this._createMarker();
        }

        _onDetach() {
            this._marker = null;
        }

        _onUpdate(props) {
            if (props.zIndex !== undefined) {
                this._marker?.update({ zIndex: props.zIndex });
            }
            if (props.coordinates !== undefined) {
                this._marker?.update({ coordinates: props.coordinates });
            }
        }

        _createMarker() {
            const element = document.createElement('div');
            element.className = 'marker';
            element.onclick = () => {
                this._openPopup();
            };

            this._marker = new YMapMarker({ coordinates: this._props.coordinates }, element);
            this.addChild(this._marker);
        }

        _openPopup() {
            if (this._popup) {
                return;
            }

            const element = document.createElement('div');
            element.className = 'popup';

            const textElement = document.createElement('div');
            textElement.className = 'popup__text';
            textElement.textContent = this._props.popupContent;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'popup__close';
            closeBtn.textContent = 'Close Popup';
            closeBtn.onclick = () => this._closePopup();

            element.append(textElement, closeBtn);

            const zIndex = (this._props.zIndex ?? YMapMarker.defaultProps.zIndex) + 1000;
            this._popup = new YMapMarker({
                coordinates: this._props.coordinates,
                zIndex,
                blockBehaviors: this._props.blockBehaviors
            }, element);
            this.addChild(this._popup);
        }

        _closePopup() {
            if (!this._popup) {
                return;
            }

            this.removeChild(this._popup);
            this._popup = null;
        }
    }

    // Initialize the map
    map = new YMap(
        // Pass the link to the HTMLElement of the container
        document.getElementById('map-peremena'),
        // Pass the map initialization parameters
        { location: LOCATION, showScaleInCopyrights: true },
        [
            // Add a map scheme layer
            new YMapDefaultSchemeLayer({}),
            // Add a layer of geo objects to display the markers
            new YMapDefaultFeaturesLayer({})
        ]
    );

    map
        // Add a default marker with a popup window from the package to the map
        .addChild(
            new YMapDefaultMarker({
                coordinates: [37.9, 55.85],
                color: '#006efc',
                popup: { content: 'Popup on the default marker', position: 'left' }
            })
        )
        // Add a custom marker with a popup window to the map
        .addChild(new CustomMarkerWithPopup({ coordinates: [37.32, 55.57], popupContent: 'Popup on the custom marker (not scrollable)' }))
        .addChild(new CustomMarkerWithPopup({ coordinates: [37.74, 55.43], popupContent: LONG_TEXT, blockBehaviors: true }));
}


// Находим все элементы с классом progress-detail__link
const progressLinks = document.querySelectorAll('.progress-detail__link');

progressLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        progressLinks.forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});


/*=============== INPUT MASK ===============*/

// Найти все элементы с атрибутом data-mask="phone"
let phones = document.querySelectorAll('[data-mask="phone"]');
// Применить маску к каждому найденному элементу
phones.forEach(function(element) {
  new IMask(element, {
    mask: '+{7}(000)000-00-00'
  });
});


// AXIOS
function validatePhone(phone)  {
  const cleanedPhone = phone.replace(/\D/g, "");
  console.log(new String(cleanedPhone).length)
  console.log(cleanedPhone.length === 11, "partial")

  if(cleanedPhone.length === 11) {
    return true; 
  } else {
    return false;
  }
}

function validateText(text)  {
  const trimmedText = text.trim();

    if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}
const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;

  switch(dataType) {
      case "phone": 
      res = validatePhone(input.value)
      break;
      case "text": 
      res = validateText(input.value)
      break;
  }
  console.log(input, res, dataType)
  return res;
}

let forms = document.querySelectorAll('.js-form');
console.log(forms)
forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
	console.log(formButton)
	if(formButton) {
		formButton.addEventListener("click", (e) => {
		e.preventDefault();
		formButton.disabled = true;
		const inputs = form.querySelectorAll("input");
		const method = form.method;
		const action = form.action;
		let isValidated = true;
		let formData = [];
    
		inputs.forEach(input => {
      formData.push({
        name: input.name,
        value: input.value,
        isValidate: validate(input),
      })  
  })

	formData.forEach(item => {
    const input = form.querySelector(`[name="${item.name}"]`);
    const wrapper = input.parentNode;
    const errorBlock = wrapper.querySelector('.js-error');

    if(!item.isValidate) {
        isValidated = false;
        errorBlock.classList.add("_active")
        wrapper.classList.add("_active")
    } else {
        errorBlock.classList.remove("_active");
        wrapper.classList.remove("_active")
    }
  })

	if(!isValidated) {
    formButton.disabled = false;
    return false;
  }

	axios({
		method,
		url: action,
		data: formData,
}).then((response) => {
  sucesOpen();
		console.log("success");
		formButton.disabled = false;
    // modalVacancyBody.classList.remove("_active");
    // modalVacancyContent.classList.remove("_active");
      // Очистка полей ввода
    inputs.forEach(input => {
      input.value = "";
    });
}).catch((error) => {
		console.log("error");
    document.body.classList.remove("_lock");
    // modalMainBody.classList.remove("_active");
    // modalMainContent.classList.remove("_active");
    // modalVacancyBody.classList.remove("_active");
    // modalVacancyContent.classList.remove("_active");
    sucesOpen();
		formButton.disabled = false;
    inputs.forEach(input => {
      input.value = "";
    });
	});
})
	}
})

// Получаем ссылки на элементы DOM
const genplanLinks = document.querySelectorAll('.genplan__link');
const genplanModal = document.querySelector('.genplan-modal');
const apartmentsImage = document.querySelector('.apartments__image');

// Добавляем обработчики событий для каждого genplanLink
genplanLinks.forEach(genplanLink => {
  genplanLink.addEventListener('mouseenter', showGenplanModal);
  genplanLink.addEventListener('mouseleave', hideGenplanModal);
  apartmentsImage.addEventListener('mousemove', moveGenplanModal);
});

// Функция для показа модального окна
function showGenplanModal() {
  genplanModal.classList.add('active');
}

// Функция для перемещения модального окна с учетом каждого genplanLink
function moveGenplanModal(event) {
  if (genplanModal.classList.contains('active')) {
    const rect = apartmentsImage.getBoundingClientRect();
    const modalRect = genplanModal.getBoundingClientRect();
    
		let mouseX = event.clientX - 10 - rect.left - (modalRect.width ) ;
		let mouseY = event.clientY - 10 - rect.top - (modalRect.height) ;
    
    // Ограничиваем движение модального окна внутри apartments__image
    mouseX = Math.max(0, Math.min(mouseX, rect.width - modalRect.width));
    mouseY = Math.max(0, Math.min(mouseY, rect.height - modalRect.height));
    
    gsap.to(genplanModal, {
      duration: 0.2,
      x: mouseX,
      y: mouseY,
      ease: "power1.out"
    });
  }
}

// Функция для скрытия модального окна
function hideGenplanModal() {
  genplanModal.classList.remove('active');
}