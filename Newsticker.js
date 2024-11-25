const newsTicker = document.querySelector('.news-ticker ul');
const newsItems = document.querySelectorAll('.news-ticker li');
const newsItemWidth = newsItems[0].offsetWidth;
const newsItemCount = newsItems.length;
let currentIndex = 0;

function scrollNews() {
  currentIndex = (currentIndex + 1) % newsItemCount;
  newsTicker.style.transform = `translateX(-${currentIndex * newsItemWidth}px)`;
}

setInterval(scrollNews, 10000); // 每10秒滚动一次 // Scroll every 10 seconds
