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
            const currency = new Intl.NumberFormat('en-US', { style: "currency", currency: (s ? s.toUpperCase().trim() : "USD"), maximumFractionDigits: (d ? d : 2) });
            return currency.format(n);
        }
    },
    date:
    {
        now: () => {
            return (new Date());
        },
        addDays: (n, d) =>
        {
            let result = ((d) ? d : new Date());
            result.setDate(result.getDate() + n);
            return result;
        },
        addHours: (n, d) =>
        {
            let result = ((d) ? d : new Date());
            result.setHours(result.getHours() + n);
            return result;
        },
        addMinutes: (n, d) =>
        {
            let result = ((d) ? d : new Date());
            result.setMinutes(result.getMinutes() + n);
            return result;
        },
        addSeconds: (n, d) =>
        {
            let result = ((d) ? d : new Date());
            result.setSeconds(result.getSeconds() + n);
            return result;
        },
        addMilliseconds: (n, d) =>
        {
            let result = ((d) ? d : new Date());
            result.setMilliseconds(result.getMilliseconds() + n);
            return result;
        },
        day: (d) => {
            return ((d) ? d.getDay() : Date.getDay());
        },
        diff: (d1, d2) =>
        {
            let ms = Math.abs(d2.getTime() - d1.getTime());
            return {
                milliseconds: ms,
                seconds: (ms / (1000)),
                minutes: (ms / (1000 * 60)),
                hours:   (ms / (1000 * 60 * 60)),
                days:    (ms / (1000 * 60 * 60 * 24))
            };
        },
        month: (d) => {
            return (((d) ? d.getMonth() : new Date().getMonth()) + 1);
        },
        monthName: (d) => {
            let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            return ((d) ? months[d.getMonth()] : months[new Date().getMonth()]);
        },
        year: (d) => {
            return ((d) ? d.getFullYear() : new Date().getFullYear());
        },
        today: () =>
        {
            let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            let weekdays = [ "Sunday", "Monday" ,"Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
            let today = new Date();
            return `Today is: ${weekdays[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}.`;
        },
        isLeapYear: (d) =>
        {
            let result = false;

            let date = ((d) ? d : new Date());
            let year = ((Object.prototype.toString.call(date) === "[object Date]") ? date.getFullYear() : date);

            if ((year % 4) === 0)
            {
                if (year >= 1752)
                 {
                    if (((year % 100) != 0) || ((year % 400) === 0)) {
                        result = true;
                    }
                }
            }

            return result;
        },
        dayNumber: (d) =>
        {
            let result = 0;
    
            let date = ((d) ? d : new Date());

            let jan = 0;
            let feb = (jan + 31);
            let mar = (feb + 28);
            let apr = (mar + 31);
            let may = (apr + 30);
            let jun = (may + 31);
            let jul = (jun + 30);
            let aug = (jul + 31);
            let sep = (aug + 31);
            let oct = (sep + 30);
            let nov = (oct + 31);
            let dec = (nov + 30);

            let year = date.getFullYear();
            if ((year % 4) === 0)
            {
                if (year >= 1752)
                {
                    if (((year % 100) != 0) || ((year % 400) === 0)) {
                        mar += 1;
                    }
                }
            }

            let month = (date.getMonth() + 1);
            if (month ==  1) { result = jan; } else
            if (month ==  2) { result = feb; } else
            if (month ==  3) { result = mar; } else
            if (month ==  4) { result = apr; } else
            if (month ==  5) { result = may; } else
            if (month ==  6) { result = jun; } else
            if (month ==  7) { result = jul; } else
            if (month ==  8) { result = aug; } else
            if (month ==  9) { result = sep; } else
            if (month == 10) { result = oct; } else
            if (month == 11) { result = nov; } else
            if (month == 12) { result = dec; }
    
            result += date.getDate();

            return result;
        },
        weekday: (d) => {
            let weekdays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
            return ((d) ? weekdays[d.getDay()] : weekdays[new Date().getDay()]);
        }
    },
    email:
    {
        isValid: (s) =>
        {
            let result = false;

            if (s > "")
            {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (s.match(pattern)) {
                  result = true;
                }
            }

            return result;
        }
    },
    http:
    {
        geo: () =>
        {
            let url = "https://ipapi.co/json/";
            let req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send();
            console.info(JSON.parse(req.responseText));
            return ((req.status === 200) ? JSON.parse(req.responseText) : req.status);
        },
        get: (url) =>
        {
            let req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send();
            return ((req.status === 200) ? req.responseText : req.status);
        },
        ip: () =>
        {
            let url = "https://jsonip.com/";
            let req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send();
            return ((req.status === 200) ? JSON.parse(req.responseText).ip : req.status);
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
    	format: (n, s) => {
        	return n.toLocaleString((s) ? s : "en-US");
        },
        isEven: (n) => {
            return (((n % 2) === 0) ? true : false);
        },
        isOdd: (n) => {
            return (((n % 2) === 0) ? false : true);
        },
        isPrime: (n) =>
        {
            let result = true;

            if ((isNaN(n))    )  { result = false;    } else
            if ((!isFinite(n)))  { result = false;    } else
            if ((n % 1)       )  { result = false;    } else
            if ((n < 2)       )  { result = false;    } else
            if ((n % 2) === 0 )  { result = (n == 2); } else
            if ((n % 3) === 0 )  { result = (n == 3); } else
            for (let i=5; i<=Math.sqrt(n); (i+=6))
            {
                if ((n % (i + 0)) == 0) { result = false; } else
                if ((n % (i + 2)) == 0) { result = false; }
            }

            return result;
        },
        pi: () => {
            return 3.14159;
        },
        random: () => {
            return (Math.floor(Math.random() * 1000));
        },
        round: (n, d) => {
        	return (Math.round((n + Number.EPSILON) * (10 ** (d ? d : 0))) / (10 ** (d ? d : 0)));
        },
        sqrt: (n) => {
            return Math.sqrt(n);
        }
    },
    string:
    {
        lcase: (s) => {
            return ((s) ? s.toLowerCase() : s);
        },
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
        lpad: (s, c, n) =>
        {
            let result = s;

            if (s.length < n)
            {
                let s1 = ((s) ? s : "");
                let s2 = "";

                for (let i=0; i<n; i++) {
                    s2 += c;
                }

                result = (s2 + s1);

                if (result.length > n)
                {
                    let len = result.length;
                    result = result.substring(len, (len - n));
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
                if (chars > s.length) {
                   result = s;
                }
                else
                {
                   let len = s.length;
                   result = s.substring(len, (len - chars));
                }
            }
            return result;
        },
        rpad: (s, c, n) =>
        {
            let result = s;

            if (s.length < n)
            {
                let s1 = ((s) ? s : "");
                let s2 = "";

                for (let i=0; i<n; i++) {
                    s2 += c;
                }

                result = (s1 + s2);

                if (result.length > n) {
                    result = result.substring(0, n);
                }
            }

            return result;
        },
        ltrim: (s) => {
            return ((s) ? s.trimStart() : s);
        },
        rtrim: (s) => {
            return ((s) ? s.trimEnd() : s);
        },
        trim: (s) => {
            return ((s) ? s.trim() : s);
        },
        tcase: (s) =>
        {
            result = "";
            if (String(s))
            {
                let words = s.toLowerCase().split(" ");
                words.forEach
                (
                    (word) =>
                    {
                        let dash = "";
                        let syllables = word.split("-");
                        for (let i=0; i<syllables.length; i++)
                        {
                            let syllable = syllables[i];
                            let s = syllable.charAt(0).toUpperCase();
                            s += syllable.substring(1, (syllable.length));
                            result += (dash + s);
                            dash = "-";
                        }
                        result = (result + " ");
                    }
                )
                result = result.trimEnd();
            }
            return result;
        },
        ucase: (s) => {
            return ((s) ? s.toUpperCase() : s);
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
