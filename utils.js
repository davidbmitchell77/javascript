/*-----------------------------------------------------------------------------*/
/* @script        - utils.js                                                   */
/* @date          - 22-JAN-2021                                                */
/* @author        - David B. Mitchell                                          */
/* @description   - Miscellaneous javascript utility functions.                */
/*-----------------------------------------------------------------------------*/
export default
{
    crypto:
    {
        base64:
        {
            encode: (s) => { 
                return ((s) ? btoa(unescape(encodeURIComponent(s))) : null);
            },
            decode: (s) => {
                return ((s) ? atob(s) : null);
            }
        },
        uuid: () =>
        {
            let result = "";
            try {
                result = crypto.randomUUID();
            }
            catch(e)
            {
                console.warn("crypto.randomUUID() is not avaiable in this browser.  Using default uuid generator.");
                let s = [];
                let hexDigits = "0123456789abcdef";

                for (let i=0; i<36; i++) {
                    s[i] = hexDigits.substr(Math.floor((Math.random() * 0x10)), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";
                result = s.join("");
            }
            return result;
        }
    },
    currency: 
    {
        eur: (n) => {
            const eur = new Intl.NumberFormat('en-US', { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
            return eur.format(n);
        },
        gbp: (n) => {
            const gbp = new Intl.NumberFormat('en-US', { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
            return gbp.format(n);
        },
        usd: (n) => {
            const usd = new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", maximumFractionDigits: 2 });
            return usd.format(n);
        },
        format: (n, s, d) => {
            const currency = new Intl.NumberFormat('en-US', { style: "currency", currency: (s ? s.toUpperCase().trim() : "usd"), maximumFractionDigits: (d ? d : 2) });
            return currency.format(n);
        }
    },
    json:
    {
        deserialize: (s) => {
            return JSON.parse(s);
        },
        parse: (s) => {
            return JSON.parse(s);
        },
        serialize: (obj) => {
            return JSON.stringify(obj);
        },
        serializePretty: (obj) => {
            return JSON.stringify(obj, null, 2);
        },
        stringify: (obj) => {
            return JSON.stringify(obj);
        },
        stringifyPretty: (obj) => {
            return JSON.stringify(obj, null, 2);
        }
    },
    log: (message) =>
    {
        let messageType = Object.prototype.toString.call(message);

        switch (messageType.toLowerCase())
        {
            case "[object string]":
                console.log(message);
                break;
            case "[object number]":
                console.log(message);
                break;
            case "[object array]":
                console.info(message);
                break;
            case "[object object]":
                console.info(message);
                break;
            case "[object error]":
                console.error(message);
                break;
            default:
                console.warn(messageType, message);
        }
    },
	number:
    {
    	format: (n) => {
        	return n.toLocaleString("en-US");
        },
        isEven: (n) => {
            return !(n % 2);
        },
        isOdd: (n) => {
            return !!(n % 2);
        },
        round: (n, d) => {
        	return (Math.round((n + Number.EPSILON) * (10 ** d)) / (10 ** d));
        }
    },
    string:
    {
        left: (s, chars) =>
        {
            let result = null;
            if (s && chars > 0)
            {
                if (chars > String(s).length) {
                    result = s;
                }
	            else {
	                result = String(s).substring(0, chars);
                }
            }
            return result;
        },
        mid: (s, startpos, endpos) => {
            return s.substring(startpos, endpos);
        },
        right: (s, chars) =>
        {
            let result = null;
            if (s && chars > 0)
            {
                if (chars > String(s).length) {
                   result = s;
                }
                else
                {
                   let len = String(s).length;
                   result = String(s).substring(len, (len - chars));
                }
            }
            return result;
        }
    },
    window:
    {
        browser: () =>
        {
            var ua = navigator.userAgent;
            var m = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

            if (/trident/i.test(m[1]))
            {
                let temp = (/\brv[ :]+(\d+)/g.exec(ua) || []); 
                return {
                    name: "IE",
                    version: (temp[1] || "")
                };
            }   

            if (m[1] === "Chrome")
            {
                let temp = ua.match(/\bOPR|Edge\/(\d+)/);
                if (temp != null)
                {
                    return {
                        name:"Opera",
                        version:temp[1]
                    };
                }
            }   

            m = ((m[2]) ? [ m[1], m[2] ] : [ navigator.appName, navigator.appVersion, '-?' ]);

            let temp = ua.match(/version\/(\d+)/i);
            if (temp != null) {
                m.splice(1, 1, temp[1]);
            }

            return {
                name: m[0],
                version: m[1]
            };
        },
        popupCenter: (url, title, w, h) =>
        {
          //Fixes dual-screen position                              most browsers       firefox
            let dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
            let dualScreenTop  = window.screenTop  !==  undefined ? window.screenTop  : window.screenY;

            let width  = window.innerWidth  ? window.innerWidth  : document.documentElement.clientWidth  ? document.documentElement.clientWidth  : screen.width;
            let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            let systemZoom = (width / window.screen.availWidth);
            let left = (width - w) / 2 / systemZoom + dualScreenLeft;
            let top = (height - h) / 2 / systemZoom + dualScreenTop;

            let newWindow = window.open
            (
                url,
                title,
                `
                scrollbars=no,
                width=${w / systemZoom},
                height=${h / systemZoom},
                top=${top},
                left=${left}
                `
            );

            if (window.focus) {
                newWindow.focus();
            }
        }
    }
};
