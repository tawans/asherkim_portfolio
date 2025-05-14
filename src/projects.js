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

// 프로젝트 클릭 시 PDF 다운로드 또는 팝업
projects.forEach((project) => {
  project.addEventListener('click', (event) => {
    event.preventDefault();
    const pdfPath = project.dataset.pdf;
    if (pdfPath) {
      // 다운로드 여부 확인 팝업
      const shouldDownload = confirm('포트폴리오 파일을 다운로드 받으시겠습니까?');
      if (shouldDownload) {
        // PDF 다운로드
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      // 팝업 표시
      alert('해당 프로젝트는 다운로드 할 파일이 없습니다.');
    }
  });
});
