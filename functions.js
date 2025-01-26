// Функция для определения типа устройства
function detectDevice() {
    const userAgent = navigator.userAgent;

    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return 'mobile';
    } else if (/Tablet|iPad|PlayBook|Silk|Kindle|(Android(?!.*Mobile))/.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

// Функция для изменения верстки в зависимости от устройства
function changeLayout() {
    const device = detectDevice();
    const body = document.body;

    // Удаляем предыдущие классы, если они есть
    body.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout');

    // Добавляем класс в зависимости от устройства
    if (device === 'mobile') {
        body.classList.add('mobile-layout');
    } else {
        body.classList.add('desktop-layout');
    }
}

// Вызов функции при загрузке страницы
window.onload = changeLayout;

// Обработка кнопки "Подробнее"
const detailsButtons = document.querySelectorAll('.details-btn');
detailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Открыть полное описание вакансии');
        // Здесь можно добавить переход на страницу с описанием вакансии
    });
});

// Обработка скроллинга
const videoFeed = document.querySelector('.video-feed');
let isScrolling = false;

// Включаем элементы управления для всех видео при загрузке страницы
const videos = document.querySelectorAll('.video');
videos.forEach(video => {
    video.controls = true; // Элементы управления всегда видны
    video.muted = true; // Отключаем звук для автоматического воспроизведения в Chrome
});

// Функция для переключения видео
function switchVideo(direction) {
    const videoContainers = document.querySelectorAll('.video-container');
    let currentIndex = -1;

    // Находим индекс текущего активного видео
    videoContainers.forEach((container, index) => {
        const rect = container.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            currentIndex = index;
        }
    });

    // Определяем индекс следующего видео
    let nextIndex = currentIndex + direction;

    // Проверяем границы
    if (nextIndex < 0) {
        nextIndex = 0; // Остаемся на первом видео
    } else if (nextIndex >= videoContainers.length) {
        nextIndex = videoContainers.length - 1; // Остаемся на последнем видео
    }

    // Прокручиваем к следующему видео
    videoContainers[nextIndex].scrollIntoView();

    // Останавливаем текущее видео и воспроизводим следующее
    if (currentIndex !== -1) {
        videos[currentIndex].pause();
        videos[currentIndex].currentTime = 0; // Перемотка в начало
    }
    videos[nextIndex].play().catch(error => {
        console.error('Ошибка при воспроизведении видео:', error);
    });
}

// Обработка касаний для мобильных устройств
let touchStartY = 0;
let touchEndY = 0;

videoFeed.addEventListener('touchstart', (event) => {
    if (detectDevice() !== 'mobile') return; // Работаем только на мобильных устройствах
    touchStartY = event.touches[0].clientY;
    event.preventDefault(); // Предотвращаем стандартное поведение
}, { passive: false });

videoFeed.addEventListener('touchmove', (event) => {
    if (detectDevice() !== 'mobile') return; // Работаем только на мобильных устройствах
    touchEndY = event.touches[0].clientY;
    event.preventDefault(); // Предотвращаем стандартное поведение
}, { passive: false });

videoFeed.addEventListener('touchend', () => {
    if (detectDevice() !== 'mobile') return; // Работаем только на мобильных устройствах

    const threshold = 50; // Минимальное расстояние для срабатывания скролла
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
            // Прокрутка вверх
            switchVideo(-1);
        } else {
            // Прокрутка вниз
            switchVideo(1);
        }
    }
});

// Разрешаем автоматическое воспроизведение после взаимодействия с пользователем
document.addEventListener('click', () => {
    videos.forEach(video => {
        video.muted = false; // Включаем звук после взаимодействия с пользователем
    });
});