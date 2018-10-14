# tor-redirect.js &middot; [![GitHub license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://github.com/chrisdavidmiles/tor-redirect.js/blob/master/LICENSE)

Redirect TOR traffic on your website from a clearnet domain to a TOR hidden service using client-side JavaScript. The basic premise is that a list of IPs are periodically scraped from TorProject.org's [TorBulkExitList](https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1) which is then used to generate a JavaScript file that will redirect users connecting from an exit node in the list.

* [Usage](#issues)
* [Issues](#issues)
* [Changelog](#changelog)
* [License](#license)
## 


## Usage
The files in this repo are meant to be customized to your liking, but can be used as is. To use tor-redirect.js, you just need to
 * Ensure visitor IP is available as a JavaScript variable on the page.
 * Customize the template file `template.js` to your liking.
 * Generate a new tor-redirect.js file periodically
 * Include the latest copy of tor-redirect.js on the page, which will check that variable against a list of TOR exit nodes. 

### Printing visitor IP as a JavaScript variable
This can be done in a variety of ways. For example, you can use [L2.IO](https://l2.io/), a free service for printing visitor IP as a JS varialbe for this step.
```html
<script type="text/javascript" src="https://l2.io/ip.js?var=vip"></script>
```
If you prefer to self-host the IP checker, you can do that as well. If your applicated is PHP based for example, you can include [print-ip.php](https://github.com/chrisdavidmiles/tor-redirect.js/blob/master/print-ip.php) in your header.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php include('./print-ip.php'); ?>
```
Whatever method you use, just be sure that there is a variable that is uneque and globally in scope, that is set to visitor's IP address on page load.
### Customizing template.js
**Required settings:**
You will need to set your clear net domain name and your onion domain name in the template.js file 
```javascript
var clearnetdomain = 'your-domain-here.com';
var oniondomain = 'your-onion-domain-here.onion';
```
**Optional changes:**
The [example template.js file](https://github.com/chrisdavidmiles/tor-redirect.js/blob/master/template.js) included in this repo is the one I use at chrisdavidmiles.com. It uses the variable `vip` (for visitor IP), but you can change this to anything you like, so long as you're printing the visitor IP on the page with the same variable name.

You could modify the template to do things other than redirect. My file automatically redirects TOR users, but tor-redirect.js is esentially just an if/then check to see if a user is coming from a TOR exit node, so you can also leverage this any number of other ways such as: 
 * Show an interstitial or a new menu item only to TOR users them know there is TOR hidden service version of your site available. 
 * Conditionally load page elements for TOR or non TOR users such as large images or network-heavy ad code
 * Pass TOR traffic stats to Google Analytics as a [custom dimension](https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets).
 * Anything else you can do with JavaScript.
 
### Generating tor-redirect.js
This copy of this file used on your product site is meant to be updated and replaced priodically. It contains a list of TOR exit node IPs in a JavaScript array, and since these IPs can change from time to time, it's best if this file is replaced with an updated copy daily. I generate the file twice a day using [crontab](https://opensource.com/article/17/11/how-use-cron-linux).
```
0 3,15 * * * /bin/sh /full/path/to/generator.sh
```
There are variables in the file that you should adjust for your implementation. 
 * `torWorkingDir` should be set to the absolute path of the folder where you keep the code in this repo, and should exist as a working space for generating tor-redirect.js. The folder should not be accessible by a web server. (Such as `/home/user/bin/tor-redirect.js/`).
 * `ProductionDir` should be set to the absolute path of the folder on your website where you want the production tor-redirect.js file to live. (Such as `/var/www/example.com/public_html/js/`).  

### Using tor-redirect.js on your website.
Once `generator.sh` is in place and set up to generate a production copy of tor-redirect.js, you can include tor-redirect.js like any other JavaScript file.
```html
<script type="text/javascript" src="/tor-redirect.js"></script>
```

### Debugging
The example template file includes console.log messages to help with troubleshooting and debugging. 

TOR traffic will get
 ```javascript
console.log("This connection smells like onions.");
``` 
and non TOR traffic will get
```javascript
console.log("This connection doesn't smell like onions.");
```
If tor-redirect.js is not behaving as expected make sure that visitor IPs are available as a JS varilable before tor-redirect.js runs. You might also want to check that visitor IP is being accurately fetched. Check the IP your script has against the IP that [check.torproject.org](https://check.torproject.org/) says you have. 

## Issues
This is the 2nd major version of tor-redirect.js. This version uses IP based detection rather than fingerprint guesswork so it's much more likely to be accurate regardless of browser type. And although v2 is a considerable improvement over v1, it's not without a few fundamental problems.
* This script doesn't ask or have a way of knowing if users _want_ to be redirected. It just does it. Just because a user is using the Tor network doesn't mean they want to see everything at .onion domains. Onion routing is a lot slower than traditional DNS, and the redirecting itself can be unexpected for users which might create a bad experience. I have some ideas about how I might soften the edges of these problems, and combine it with other consent based privacy options that are presented to users. But I'd like to do this without an annoying cookie nag if possible.
* This code requires checking the user's IP address. TOR users often care about privacy and being tracked. Although IPs are not logged, this is still arguably a privacy problem.
* This method requires continuous updating of the script since the list of TOR IPs is constantly changing. 

An ideal solution would be one that where a user can choose to use the hidden service version of the site, rather than being automatically redirected, and without checking for IPs. Unfortunately a method for this does not yet exist. Cloudflare has gotten close, with their [CloudFlare Onion Routing service](https://blog.cloudflare.com/cloudflare-onion-service/), but there does not yet exist a perfect and decentralized solution.

If I find a better solution, I'll include it in Version 3.

## Changelog

**v2.1** - This version is the first version to be published on Github. This version also added `generator.sh` so that the exit node IP list in `tor-redirect.js` can automatically stay up to date.

**v2.0** - This version introduced IP checking and did away with HTML5 canvas data extraction.

**v1.0** - This version [(gist.github.com)](https://gist.github.com/chrisdavidmiles/923b03766e02c2a1c077eb85672efb36) would try and detect the official tor browser by checking if HTML5 canvas data extraction was blocked by default.

## License
This project is licensed under the [GNU General Public License v2.0](https://www.gnu.org/licenses/gpl-2.0.html)
