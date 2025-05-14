'use strict';

// 프로젝트 필터링 관련 로직 처리
const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
categories.addEventListener('click', (event) => {
  const filter = event.target.dataset.category;
  if (filter == null) {
    return;
  }
  handleActiveSelection(event.target);
  filterProjects(filter);
});

function handleActiveSelection(target) {
  const active = document.querySelector('.category--selected');
  active.classList.remove('category--selected');
  target.classList.add('category--selected');
}

function filterProjects(filter) {
  projects.forEach((project) => {
    if (filter === 'all' || filter === project.dataset.type) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
  projectsContainer.classList.add('anim-out');
  setTimeout(() => {
    projectsContainer.classList.remove('anim-out');
  }, 250);
}

// 커스텀 다운로드 팝업 제어
const downloadModal = document.getElementById('downloadModal');
const downloadConfirmBtn = document.getElementById('downloadConfirmBtn');
const downloadCancelBtn = document.getElementById('downloadCancelBtn');
let pendingPdfPath = null;

function showDownloadModal(pdfPath) {
  pendingPdfPath = pdfPath;
  downloadModal.classList.remove('hidden');
}
function hideDownloadModal() {
  pendingPdfPath = null;
  downloadModal.classList.add('hidden');
}

downloadConfirmBtn.addEventListener('click', () => {
  if (pendingPdfPath) {
    // PDF 다운로드 (window.open 사용: 브라우저 호환성↑)
    window.open(pendingPdfPath, '_blank');
  }
  hideDownloadModal();
});
downloadCancelBtn.addEventListener('click', hideDownloadModal);

document.addEventListener('keydown', (e) => {
  if (!downloadModal.classList.contains('hidden') && (e.key === 'Escape')) {
    hideDownloadModal();
  }
});

// 프로젝트 클릭 시 PDF 다운로드 또는 팝업
projects.forEach((project) => {
  project.addEventListener('click', (event) => {
    event.preventDefault();
    const pdfPath = project.dataset.pdf;
    if (pdfPath) {
      showDownloadModal(pdfPath);
    } else {
      alert('해당 프로젝트는 다운로드 할 파일이 없습니다.');
    }
  });
});
