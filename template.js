/*!
 * tor-redirect.js v2.1 | https://git.io/tor-redirect
 * Redirect website traffic coming from the TOR network to a specified tor hidden service. 
 * Tor IP list last updated #DATE#.
 *
 * Copyright 2018 Chris David Miles
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

var clearnetdomain = 'your-domain-here.com';
var oniondomain = 'your-onion-domain-here.onion';

if (window.location.hostname === clearnetdomain) {
  var torips = [#ARRAY-OF-TOR-IPS#];
  if (torips.indexOf(vip) > -1) {
      console.log("This connection smells like onions.");
      var spinner = '<style>.loader{border:8px solid #ececec;border-radius:50%;border-top:8px solid #607d8b;width:60px;height:60px;-webkit-animation:spin 2s linear infinite;animation:spin 1s linear infinite;position: absolute; left: 50%; top: calc(50vh - 46px); margin: -30px 0 0 -30px;}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style><div class="loader-container"><div class="loader"></div></div>';
      document.getElementsByTagName('html')[0].innerHTML = spinner;
      window.location = window.location.href.replace(window.location.protocol + '//' + clearnetdomain, 'http://' + oniondomain);
  } else {
    console.log("This connection doesn't smell like onions.");
  }
}
