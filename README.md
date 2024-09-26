# <div align="center">Tiny Glade TOD Viewer</div>


Tiny Glade TOD Viewer let's you access the current "Theme of the day" without the need to open the game.

## ✨ Features

- Shows the name of the current TOD
- Let's you change the language (as in the game)
- Tells you when the next theme will be available
- Shows the season in which you will build the theme as background

## ⌨️ Setup for development

### Styling 
1. Create a fork of this repository
2. Replace the content of the variables ``langs.json`` and ``meta.json`` with dummy content. To get that, open the URLs inside of ``blob.js`` and ``events.js`` and access them in a browser.
3. Play around with the styling as you like.

**There is also a ``local`` branch that has already done that for you!**

### Back-end
Unfortunately it was a bit tricky to get around the CORS Header issue of the API. To get around that, I used cloudflare (where I am also hosting the site) to get the content of the API and pass it through. To test something, you would have to create a free cloudflare account and setup ``Pages`` to automatically deploy your fork on GitHub. There are other methods to get it working, I also used the **Heroku CORS Proxy**, but you would have to replace a big part of code to use that again.
