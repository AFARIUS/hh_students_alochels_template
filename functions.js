document.addEventListener('DOMContentLoaded', () => {
    const videos = [
        { id: 1, title: 'Разработчик видеоигр', description: 'Присоединяйся к нам!', employer: 'Ubisoft', videoUrl: 'videos/video1.mp4', country: 'Japan', city: 'Tokyo', profession: 'IT' },
        { id: 2, title: 'Программист', description: 'Нам нужны идеи! Зарплата от 80 тыс. руб. / мес.', employer: 'From Software', videoUrl: 'videos/video2.mp4', country: 'Russia', city: 'Moscow', profession: 'IT' },
        { id: 3, title: 'Моушн-дизайнер', description: 'Двигай будущее с нами!', employer: 'Fiverr', videoUrl: 'videos/video3.mp4', country: 'Belarus', city: 'Minsk', profession: 'Design' },
        { id: 4, title: 'Сценарист', description: 'Создавай уникальные истории!', employer: 'Fiverr', videoUrl: 'videos/video4.mp4', country: 'Belarus', city: 'Minsk', profession: 'Screenwrite' },
        { id: 5, title: 'Маркетолог', description: 'Продвигай наши проекты!', employer: 'Microsoft', videoUrl: 'videos/video5.mp4', country: 'USA', city: 'New York', profession: 'Marketing' },
        { id: 6, title: 'Журналист', description: 'Описывай наше будущее!', employer: 'Roskomnadzor', videoUrl: 'videos/video6.mp4', country: 'Russia', city: 'Moscow', profession: 'Journalism' },
    ];

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const videoContainer = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    const filterButton = document.getElementById('filterButton');
    const filterSlider = document.querySelector('.filter-slider');
    const searchOverlay = document.querySelector('.search-overlay');
    let currentVideoElement = null;
    let isSearchOpen = false;

    function loadVideos(filteredVideos = videos) {
        videoContainer.innerHTML = '';
        filteredVideos.forEach((video) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <video id="video${video.id}" onclick="togglePause(${video.id})" loop>
                    <source src="${video.videoUrl}" type="video/mp4">
                </video>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p><strong>Работодатель: </strong> ${video.employer}</p>
                    <p>${video.description} <a href="#" onclick="alert('Переход на страницу вакансии'); return false;">Подробнее...</a></p>
                </div>
                <button class="favorite-button ${favorites.some(fav => fav.id === video.id) ? 'active' : ''}" onclick="toggleFavorite(${video.id})">★</button>
            `;
            videoContainer.appendChild(videoCard);
        });

        setupVideoAutoplay();
    }

    function setupVideoAutoplay() {
        const videoElements = document.querySelectorAll('.video-card video');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting && !isSearchOpen) {
                        video.play();
                        currentVideoElement = video;
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        videoElements.forEach((video) => {
            observer.observe(video);
            video.addEventListener('ended', () => {
                video.currentTime = 0; // Зацикливание видео
                video.play();
            });
        });
    }

    window.togglePause = (id) => {
        const video = document.getElementById(`video${id}`);
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

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

    window.applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const country = document.getElementById('countryFilterSlider').value;
        const city = document.getElementById('cityFilterSlider').value;
        const profession = document.getElementById('professionFilterSlider').value;

        const filteredVideos = videos.filter(video => {
            return (video.title.toLowerCase().includes(searchTerm) || video.description.toLowerCase().includes(searchTerm)) &&
                   (!country || video.country === country) &&
                   (!city || video.city === city) &&
                   (!profession || video.profession === profession);
        });

        loadVideos(filteredVideos);
    };

    window.openSearch = () => {
        isSearchOpen = true;
        searchOverlay.style.display = 'flex';
        if (currentVideoElement) {
            currentVideoElement.pause();
        }
    };

    window.closeSearch = () => {
        isSearchOpen = false;
        searchOverlay.style.display = 'none';
        filterSlider.classList.remove('active'); // Закрытие меню фильтров
        if (currentVideoElement) {
            currentVideoElement.play();
        }
    };

    filterButton.addEventListener('click', () => {
        filterSlider.classList.toggle('active');
    });

    searchInput.addEventListener('input', applyFilters);

    loadVideos();
});