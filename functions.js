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

videoFeed.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => {
            const videos = document.querySelectorAll('.video');
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

            // Останавливаем все видео, кроме текущего
            videos.forEach(video => {
                if (video !== currentVideo) {
                    video.pause();
                    video.currentTime = 0; // Перемотка в начало
                } else {
                    video.play(); // Запуск текущего видео
                }
            });

            isScrolling = false;
        }, 300); // Задержка для плавного скроллинга
    }
});