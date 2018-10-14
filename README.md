# tor-redirect.js &middot; [![GitHub license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://github.com/chrisdavidmiles/tor-redirect.js/blob/master/LICENSE)

Redirect TOR traffic on your website from a clearnet domain to a TOR hidden service using client-side JavaScript. The basic premise is that a list of IPs are periodically scraped from TorProject.org's [TorBulkExitList](https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1) which is then used to generate a JavaScript file that will redirect users connecting from an exit node in the list.

* [Issues](#issues)
* [Changelog](#changelog)
* [License](#license)
## 

### Issues
This is the 2nd major version of tor-redirect.js. This version uses IP based detection rather than fingerprint guesswork so it's much more likely to be accurate regardless of browser type. And although v2 is a considerable improvement over v1, it's not without a few fundamental problems.
* This script doesn't ask or have a way of knowing if users _want_ to be redirected. It just does it. Just because a user is using the Tor network doesn't mean they want to see everything at .onion domains. Onion routing is a lot slower than traditional DNS, and the redirecting itself can be unexpected for users which might create a bad experience. I have some ideas about how I might soften the edges of these problems, and combine it with other consent based privacy options that are presented to users. But I'd like to do this without an annoying cookie nag if possible.
* This code requires checking the user's IP address. TOR users often care about privacy and being tracked. Although IPs are not logged, this is still arguably a privacy problem.
* This method requires continuous updating of the script since the list of TOR IPs is constantly changing. 

An ideal solution would be one that where a user can choose to use the hidden service version of the site, rather than being automatically redirected, and without checking for IPs. Unfortunately a method for this does not yet exist. Cloudflare has gotten close, with their [CloudFlare Onion Routing service](https://blog.cloudflare.com/cloudflare-onion-service/), but there does not yet exist a perfect and decentralized solution.

If I find a better solution, I'll include it in Version 3.

### Changelog
For a full changelog including minor changes see [CHANGELOG.md](https://github.com/chrisdavidmiles/tor-redirect.js/blob/master/CHANGELOG.md).

### License
This project is licensed under the [GNU General Public License v2.0](https://www.gnu.org/licenses/gpl-2.0.html)
