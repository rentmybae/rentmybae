# RentMyBae — Static Website

Static site (HTML/CSS/JS) for **RentMyBae – Your Perfect Plus One**. Pre-launch landing site, deployable on GitHub Pages.

## Structure
```
assets/images/   logo, symbol, favicon and app icons
index.html       home page
about.html       about page
styles.css       styles
script.js        mobile menu, year, contact-link config
robots.txt       crawler rules
sitemap.xml      sitemap
keywords.md      SEO research notes
```

## Before publishing
1. **Domain:** replace `YOUR_DOMAIN` everywhere (canonical, og, robots, sitemap):
   `grep -rl YOUR_DOMAIN . | xargs sed -i 's#YOUR_DOMAIN#yourdomain.com#g'`
   For a project page use `USERNAME.github.io/REPO`.
2. **Contact email:** set `contactEmail` at the top of `script.js`. While empty, contact buttons stay hidden.
3. Don't add claims (user counts, ratings, app links) that aren't true yet.
4. Legal pages (Terms, Privacy, Refund) need qualified Indian legal review before launch.

## Deploy on GitHub Pages
Push to GitHub → Settings → Pages → Source: *Deploy from a branch* → `main` / root.

## Local preview
`python3 -m http.server 8000` then open http://localhost:8000

## Note
This is a static site only (no accounts, bookings or payments). The full marketplace is a separate Next.js project.
