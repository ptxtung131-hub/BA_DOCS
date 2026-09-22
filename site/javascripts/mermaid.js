document.addEventListener("DOMContentLoaded", function () {
  // 1. Khởi tạo Mermaid với cỡ chữ nhỏ gọn (11px) đồng bộ với văn bản
  mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    themeVariables: {
      fontSize: "11px",                             // Giảm cỡ chữ chính trong sơ đồ
      fontFamily: '"Be Vietnam Pro", sans-serif',   // Dùng chung font với trang web
      nodeBorder: "rgba(212, 175, 55, 0.5)"
    },
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,                           // Giữ kích thước chuẩn không bị bóp méo
      curve: "linear"
    }
  });

  // 2. Kích hoạt tính năng kéo rê (Drag to Pan)
  const checkExist = setInterval(() => {
    const containers = document.querySelectorAll(".mermaid");
    if (containers.length > 0) {
      clearInterval(checkExist);

      containers.forEach((container) => {
        let isDown = false;
        let startX, startY, scrollLeft, scrollTop;

        container.addEventListener("mousedown", (e) => {
          isDown = true;
          container.classList.add("dragging");
          startX = e.pageX - container.offsetLeft;
          startY = e.pageY - container.offsetTop;
          scrollLeft = container.scrollLeft;
          scrollTop = container.scrollTop;
        });

        container.addEventListener("mouseleave", () => {
          isDown = false;
          container.classList.remove("dragging");
        });

        container.addEventListener("mouseup", () => {
          isDown = false;
          container.classList.remove("dragging");
        });

        container.addEventListener("mousemove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const y = e.pageY - container.offsetTop;
          const walkX = (x - startX) * 1.5;
          const walkY = (y - startY) * 1.5;
          container.scrollLeft = scrollLeft - walkX;
          container.scrollTop = scrollTop - walkY;
        });
      });
    }
  }, 200);
});