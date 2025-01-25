// Функция для открытия боковой панели
function openSidePanel(content) {
    const sidePanel = document.getElementById('sidePanel');
    const sidePanelContent = document.getElementById('sidePanelContent');
    sidePanelContent.innerHTML = content;
    sidePanel.classList.add('open');
  }

  // Функция для закрытия боковой панели
  function closeSidePanel() {
    const sidePanel = document.getElementById('sidePanel');
    sidePanel.classList.remove('open');
  }

  // Функция для раскрытия/сворачивания текста описания
  /* function toggleExpand(id) {
    const descText = document.getElementById(id);
    descText.classList.toggle('expanded');
    const showMoreBtn = descText.nextElementSibling;
    showMoreBtn.textContent = descText.classList.contains('expanded') ? 'Свернуть' : 'Смотреть далее';
  } */