let indexData = [];

fetch('/index.json')
    .then(response => response.json())
    .then(data => {
        indexData = data;
    });

postsSearch = function () {
    const query = document.getElementById('search-input').value.trim();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (query === '') {
        return;
    }

    const regex = new RegExp(query, 'gi'); // 全局匹配 + 忽略大小写

    // 过滤结果，排除 /about 和 /search 页面
    const results = indexData.filter(item => {
        const isExcluded = item.permalink.includes('/about') || item.permalink.includes('/search');
        return !isExcluded && (regex.test(item.title) || regex.test(item.content));
    });
    
    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result';

        const titleElement = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = item.permalink;
        titleLink.textContent = item.title;
        titleElement.appendChild(titleLink);
        resultElement.appendChild(titleElement);

        const contentElement = document.createElement('p');
        let content = item.content;

        if (regex.test(item.title)) {
            // 如果标题匹配，截取内容的前 100 个字符
            content = content.substring(0, 100);
        } else {
            // 查找内容中匹配的部分
            const match = content.match(new RegExp(`.{0,50}${query}.{0,50}`, 'gi'));
            content = match ? match[0] : '';
        }

        // 高亮匹配的搜索词
        content = content.replace(regex, '<strong>$&</strong>');

        contentElement.innerHTML = content;
        resultElement.appendChild(contentElement);
        resultsContainer.appendChild(resultElement);
    });
}