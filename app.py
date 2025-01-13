from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/fetch', methods=['POST'])
def fetch():
    sitemap_url = request.form.get('sitemapUrl')

    if not sitemap_url:
        return "Error: Sitemap URL is required", 400

    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'xml')
        urls = [loc.text for loc in soup.find_all('loc')]

        return render_template('index.html', urls=urls, sitemap_url=sitemap_url)
    except Exception as e:
        return f"Error fetching sitemap: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
