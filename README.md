# Texas Tribune Scraper(https://damp-caverns-74679.herokuapp.com/)

### Overview

This is a full-stack web app that lets users view and leave comments on the latest political news in Texas.

Inspiration by [NYT-Mongo-Scraper](https://youtu.be/4ltZr3VPmno), a semi-scraper that leverages NYT API.

---

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Future Development](#future)
- [Developer](#team)

---

## Overview <a name="overview"></a>

![news-scraper-screenshot](./public/assets/img/news-scraper.png)

1. User visits the [deployed site](https://damp-caverns-74679.herokuapp.com/).

Alternatively, user can install the app locally via GitHub, Node and NPM:

```js
git clone https://github.com/danninemx/news-scraper.git
npm i
npm start
```

`

2. If news articles are not on display, user can press "Scrape New Articles" to initiate a scrape.

This will collect:

- Headline - the title of the article
- Summary - a short summary of the article
- URL - the url to the original article
- Photos - any attached image available

3. User can then interact with the articles by:

- Reading the summary
- Saving the article
- Adding/removing comments

---

## Technologies <a name="technologies"></a>

- [Node.js](https://nodejs.org/en/)
- [NPM: Axios](https://www.npmjs.com/package/axios)
- [NPM: Cheerio](https://www.npmjs.com/package/cheerio)
- [NPM: Express](https://www.npmjs.com/package/express)
- [NPM: Express Handlebars](https://www.npmjs.com/package/express-handlebars)
- [NPM: MongoJS](https://www.npmjs.com/package/mongojs)
- [NPM: Mongoose](https://www.npmjs.com/package/mongoose)
- [NPM: Morgan](https://www.npmjs.com/package/morgan)
- [NPM: Request](https://www.npmjs.com/package/request)
- [Heroku](https://heroku.com)
- [Heroku Add-on: mLab MongoDB](https://elements.heroku.com/addons/mongolab)

---

## Future Development <a name="future"></a>

- Profile personalization
- Cron tasks for scheduled scraping
- Additional publishers and subject areas
- Refactor in declarative frontend framework

---

## Developer <a name="team"></a>

- [Danny Kim](https://github.com/danninemx)
