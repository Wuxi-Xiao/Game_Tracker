const newsTicker = document.querySelector('.news-ticker ul');
const newsItems = document.querySelectorAll('.news-ticker li'); // 获取所有新闻项 // Get all news
const newsItemWidth = newsItems[0].offsetWidth; // 单个宽度 // Single width
const newsItemCount = newsItems.length; // 新闻总数 // Total number of news
let currentIndex = 0;

function scrollNews() {
  // 更新当前新闻项的索引，确保在新闻项总数范围内循环
  // Update the current news item index to ensure it loops within the total number of news items
  currentIndex = (currentIndex + 1) % newsItemCount;
  // 更新新闻滚动条的transform属性，实现滚动效果
  // Update the transform property of the news ticker to achieve the scrolling effect
  newsTicker.style.transform = `translateX(-${currentIndex * newsItemWidth}px)`;
}

setInterval(scrollNews, 10000); // 每10秒滚动一次 // Scroll every 10 seconds
