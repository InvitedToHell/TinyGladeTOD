# <div align="center">Tiny Glade TOD Viewer</div>


Tiny Glade TOD Viewer let's you access the current "Theme of the day" without the need to open the game. Also it provides a collection of all past TOD's!

## ✨ Features

- Shows the name of the current TOD
- Let's you change the language (as in the game)
- Tells you when the next theme will be available
- Shows the season in which you will build the theme as background
- Creates a collection of every past TOD
- Let's you download every past TOD's starting map

## 🛜 Using the TOD Collection

> :warning: **Always double-check before continuing! These steps can lead to data-loss!** 


1. Create a random new glade inside of the game
2. Download a TOD's glade
3. Open your saves folder (You can find your save files in ``C:\Users\YOUR_USER_NAME\Saved Games\Tiny Glade\Steam\YOUR_STEAM_ID\saves``. On Linux that's ``~/.local/share/Tiny Glade/Steam/YOUR_STEAM_ID/saves``
4. Open the previously downloaded zip-file and copy its contents to the newest created folder inside of the ``saves`` folder
5. Go back to your game and look out for a new glade when scrolling through your saved glades 😊

## ⌨️ Setup for development

### Styling 
1. Create a fork of this repository
2. Replace the content of the variables ``langs.json`` and ``meta.json`` with dummy content. To get that, open the URLs inside of ``blob.js`` and ``events.js`` and access them in a browser.
3. Play around with the styling as you like.

**There is also a ``local`` branch that has already done that for you!**

### Back-end
Unfortunately it was a bit tricky to get around the CORS Header issue of the API. To get around that, I used cloudflare (where I am also hosting the site) to get the content of the API and pass it through. To test something, you would have to create a free cloudflare account and setup ``Pages`` to automatically deploy your fork on GitHub. There are other methods to get it working, I also used the **Heroku CORS Proxy**, but you would have to replace a big part of code to use that again.
