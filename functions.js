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
          const currentVideo = document.querySelector('.video-container:not(.hidden)');
          const nextVideo = currentVideo.nextElementSibling;
    
          if (nextVideo) {
            currentVideo.classList.add('hidden');
            nextVideo.classList.remove('hidden');
          }
    
          isScrolling = false;
        }, 300); // Задержка для плавного скроллинга
      }
    });