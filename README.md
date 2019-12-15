# <a href="https://damp-caverns-74679.herokuapp.com">Texas Tribune Scraper</a> <img src="https://github.com/danninemx/news-scraper/blob/master/public/assets/img/news-scraper-logo.png/" alt="news scraper logo" align="right" height="100"> <a name="top"></a>

## Table of Contents

- [Overview](#overview)
- [Instructions](#instructions)
- [Technologies](#technologies)
- [Future Development](#future)
- [Developer](#team)

---

## Overview <a name="overview"></a>

This is a full-stack web application that lets users view, store and comment on the latest political news in Texas.

Inspiration by [NYT-Mongo-Scraper](https://youtu.be/4ltZr3VPmno), a quasi-scraper that leverages NYT API.

![news-scraper-screenshot](./public/assets/img/news-scraper.png)

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Instructions <a name="instructions"></a>

#### 1. Visit the [deployed site](https://damp-caverns-74679.herokuapp.com/).

Alternatively, user can install the app locally via GitHub, Node and NPM:

```js
git clone https://github.com/danninemx/news-scraper.git
npm i
npm start
```

#### 2. If news articles are not on display, press "Scrape New Articles" to initiate a scrape.

This will collect:

- `Headline` - the title of the article
- `Summary` - a short summary of the article
- `URL` - the url to the original article
- `Photos` - any attached image available

#### 3. Interact with the articles by:

- Reading the summary
- Saving the article
- Adding/removing comments

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Technologies <a name="technologies"></a>

| Technology/Dependency Used                                                  | Purpose                        |
| --------------------------------------------------------------------------- | ------------------------------ |
| [Node.js](https://nodejs.org/en/)                                           | JavaScript runtime environment |
| [NPM: Axios](https://www.npmjs.com/package/axios)                           | API call                       |
| [NPM: Cheerio](https://www.npmjs.com/package/cheerio)                       | Scraping                       |
| [NPM: Express](https://www.npmjs.com/package/express)                       | Server                         |
| [NPM: Express Handlebars](https://www.npmjs.com/package/express-handlebars) | Server-side rendering          |
| [NPM: MongoJS](https://www.npmjs.com/package/mongojs)                       | Database                       |
| [NPM: Mongoose](https://www.npmjs.com/package/mongoose)                     | Database                       |
| [NPM: Morgan](https://www.npmjs.com/package/morgan)                         | Logger                         |
| [NPM: Request](https://www.npmjs.com/package/request)                       | HTTP request                   |
| [Heroku](https://heroku.com)                                                | Deployment                     |
| [Heroku Add-on: mLab MongoDB](https://elements.heroku.com/addons/mongolab)  | Database                       |

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Future Development <a name="future"></a>

- Profile personalization
- Cron tasks for scheduled scraping
- Additional publishers and subject areas
- Refactor in declarative frontend framework

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Developer <a name="team"></a>

- [Danny Kim](https://github.com/danninemx)

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>
