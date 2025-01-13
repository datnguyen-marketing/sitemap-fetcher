document.getElementById('sitemapForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn việc tải lại trang
    const sitemapUrl = document.getElementById('sitemapUrl').value;

    if (!sitemapUrl) {
        alert("Please enter a valid sitemap URL.");
        return;
    }

    try {
        const response = await fetch(sitemapUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const urls = xmlDoc.getElementsByTagName('loc');

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "<h2>URLs Found:</h2>";
        const list = document.createElement('ul');

        for (let i = 0; i < urls.length; i++) {
            const li = document.createElement('li');
            li.textContent = urls[i].textContent;
            list.appendChild(li);
        }

        resultsDiv.appendChild(list);

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
