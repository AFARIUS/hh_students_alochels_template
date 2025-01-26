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

videoFeed.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => {
            const videoContainers = document.querySelectorAll('.video-container');

            // Находим текущее активное видео
            let currentVideo = null;
            let currentContainer = null;

            videoContainers.forEach((container, index) => {
                const rect = container.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    currentVideo = videos[index];
                    currentContainer = container;
                }
            });

            // Останавливаем все видео, кроме текущего, и перематываем их в начало
            videos.forEach(video => {
                if (video !== currentVideo) {
                    video.pause();
                    video.currentTime = 0; // Перемотка в начало
                }
            });

            // Воспроизводим текущее видео, если оно не воспроизводится
            if (currentVideo && currentVideo.paused) {
                currentVideo.play().catch(error => {
                    console.error('Ошибка при воспроизведении видео:', error);
                });
            }

            isScrolling = false;
        }, 300); // Задержка для плавного скроллинга
    }
});

// Разрешаем автоматическое воспроизведение после взаимодействия с пользователем
document.addEventListener('click', () => {
    videos.forEach(video => {
        video.muted = false; // Включаем звук после взаимодействия с пользователем
    });
});