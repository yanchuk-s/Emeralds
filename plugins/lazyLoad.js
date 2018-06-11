
var _onDemandHash = {}, _onDemandURL;

// status codes - based on XMLHttpRequest.readyState ( see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
var UNSENT = 0,
    LOADING = 3,
    DONE = 4;


var lazyLoad = {
    js: function(url, main, cb)
    {
        var isMainJs = (main === true);
        if (!isMainJs)
        {
            cb = main;
            if (document.jsState === "loading")
            {
                setTimeout(function()
                    {
                        lazyLoad.js(url, cb);
                    },
                    5);
                return;
            }
        }
        else
            document.jsState = "loading";

        lazyLoad.appendScript(url, cb, isMainJs);
    },
    jsOnReady: function(url, cb)
    {
        lazyLoad.onLoad(function()
        {
            lazyLoad.appendScript(url, cb);
        });
    },
    css: function(url)
    {
        var link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        link.type = "text/css";
        var a = document.getElementsByTagName("link")[0];
        a.parentNode.insertBefore(link, a);
    },
    onLoad: function(cb)
    {
        if (document.readyState == "complete")
            cb();
        else
        {
            if (window.addEventListener)
                window.addEventListener("load", cb, false);
            else
                window.attachEvent("onload", cb);
        }
    },
    lazyJs: function(url, main, cb)
    {
        if (main === true)
            document.jsState = "loading";
        lazyLoad.onLoad(function()
        {
            lazyLoad.js(url, main, cb);
        });
    },
    lazyCss: function(url, delay)
    {
        delay = delay || 0;
        lazyLoad.onLoad(function()
        {
            setTimeout(function()
                {
                    lazyLoad.css(url);
                },
                delay);
        });
    },
    lazyRunJs: function(func)
    {
        var callOnTime = function()
        {
            if (document.jsState === "loading")
            {
                setTimeout(function()
                    {
                        lazyLoad.lazyRunJs(func);
                    },
                    5);
                return;
            }
            else
                func();
        };
        lazyLoad.onLoad(callOnTime);
    },
    appendScript: function(url, cb, isMainJs)
    {
        var h = document.getElementsByTagName("head")[0], d = false, s = document.createElement("script");

        s.src = url;
        s.onload = s.onreadystatechange = function()
        {
            if (!d && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete"))
            {
                d = true;
                if (isMainJs)
                    document.jsState = "complete";
                if (typeof cb === "function")
                    cb();
            }
        };
        h.appendChild(s);
    },
    setOdUrl: function(url)
    {
        _onDemandURL = url;
    },
    onDemand: function(moduleName)
    {
        // fail if _onDemandURL is undefined
        if (!_onDemandURL)
            throw "_onDemandURL in not yet defined";

        var record = _onDemandHash[moduleName];

        //create a record if it doesn't exist
        if (!record)
        {
            record = _onDemandHash[moduleName] = {
                "readyState": UNSENT
            };
            this.js(_onDemandURL + moduleName,
                function()
                {
                    record.readyState = DONE;
                    if (record.deferred)
                        record.deferred.resolve();
                });
            record.readyState = LOADING;
        }


        // if jQuery.Deferred is available; use it.
        if (!record.deferred && jQuery && jQuery.Deferred)
        {
            record.deferred = new jQuery.Deferred;
            /*
                It is possible (however unlikely) that jQuery.Deferred will become
                available between the first and second requests for the same module.
                In that case we want to resolve the deferred immidiately
            */
            if (record.readyState === DONE)
                record.deferred.resolve();
        }

        return record.deferred || null;
    },
    prefetch: function(urls)
    {
        if (!urls || !urls.length)
            return;
        if (typeof urls === "string")
            urls = [urls];
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4)
                loader.prefetch(urls);
        };
        xhr.open("GET", urls.splice(0, 1), true);
        xhr.send();
    }
};

if (process.client)
{
  if (!window.lazyLoad)
    window.lazyLoad = lazyLoad;
}


