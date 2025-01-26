document.addEventListener('DOMContentLoaded', () => {
    const videos = [
        { id: 1, title: 'Инженер программного обеспечения', description: 'Присоединяйся к нам!', videoUrl: 'videos/video1.mp4', country: 'Russia', city: 'Moscow', profession: 'IT' },
        { id: 2, title: 'Маркетолог', description: 'We need a creative mind!', videoUrl: 'videos/video2.mp4', country: 'Russia', city: 'Pushkin', profession: 'Marketing' },
        { id: 3, title: 'Графический дизайнер', description: 'Разукрашивай будущее с нами!', videoUrl: 'videos/video3.mp4', country: 'Belarus', city: 'Minsk', profession: 'Design' }
    ];

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const videoContainer = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const cityFilter = document.getElementById('cityFilter');
    const professionFilter = document.getElementById('professionFilter');

    let currentVideoElement = null; // Текущее видео, которое воспроизводится

    function loadVideos(filteredVideos = videos) {
        videoContainer.innerHTML = '';
        filteredVideos.forEach((video, index) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <video id="video${video.id}" onclick="togglePause(${video.id})">
                    <source src="${video.videoUrl}" type="video/mp4">
                </video>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
                <button class="favorite-button ${favorites.some(fav => fav.id === video.id) ? 'active' : ''}" onclick="toggleFavorite(${video.id})">★</button>
            `;
            videoContainer.appendChild(videoCard);
        });

        // Настройка автоматического воспроизведения текущего видео
        setupVideoAutoplay();
    }

    // Функция для автоматического воспроизведения текущего видео
    function setupVideoAutoplay() {
        const videoElements = document.querySelectorAll('.video-card video');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        // Если видео в зоне видимости, воспроизводим его
                        video.play();
                        currentVideoElement = video;
                    } else {
                        // Если видео вне зоны видимости, останавливаем его
                        video.pause();
                        video.currentTime = 0; // Сбрасываем время воспроизведения
                    }
                });
            },
            {
                threshold: 0.5, // Видео считается видимым, если 50% его площади на экране
            }
        );

        videoElements.forEach((video) => {
            observer.observe(video);
        });
    }

    // Функция для управления паузой при нажатии на видео
    window.togglePause = (id) => {
        const video = document.getElementById(`video${id}`);
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    // Функция для добавления/удаления видео в избранное
    window.toggleFavorite = (id) => {
        const video = videos.find(v => v.id === id);
        const favoriteButton = document.querySelector(`#video${id} + .video-info + .favorite-button`);
        if (favorites.some(fav => fav.id === id)) {
            favorites = favorites.filter(fav => fav.id !== id);
            favoriteButton.classList.remove('active');
        } else {
            favorites.push(video);
            favoriteButton.classList.add('active');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    // Функция для фильтрации видео
    function filterVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        const country = countryFilter.value;
        const city = cityFilter.value;
        const profession = professionFilter.value;

        const filteredVideos = videos.filter(video => {
            return (video.title.toLowerCase().includes(searchTerm) || video.description.toLowerCase().includes(searchTerm)) &&
                   (!country || video.country === country) &&
                   (!city || video.city === city) &&
                   (!profession || video.profession === profession);
        });

        loadVideos(filteredVideos);
    }

    // Слушатели событий для фильтрации
    searchInput.addEventListener('input', filterVideos);
    countryFilter.addEventListener('change', filterVideos);
    cityFilter.addEventListener('change', filterVideos);
    professionFilter.addEventListener('change', filterVideos);

    // Загрузка видео при старте
    loadVideos();
});