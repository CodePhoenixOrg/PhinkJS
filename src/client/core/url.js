var Phink = Phink || {}

Phink.Url = class U {
    constructor(url, domain, isSSL) {
        this.url = url;
        this.isParsed = false;
        this.isSSL = isSSL;
        this.tmpDomain = domain;
        this.port = '80';
        this.page = window.location.pathname;
        this.domain = this.url;
        this.isRelative = false;
        this.parse();
    }
    parse() {
        var result = [];
        this.protocol = '';
        if (this.tmpDomain !== undefined) {
            this.protocol = (this.tmpDomain.search('://') > -1) ? this.tmpDomain.substring(0, this.tmpDomain.search('://') + 1) : '';
        }
        else {
            this.protocol = (this.url.search('://') > -1) ? this.url.substring(0, this.url.search('://') + 1) : '';
        }
        if (this.protocol === '' && this.tmpDomain === undefined) {
            this.page = this.url;
            this.isRelative = true;
            this.protocol = window.location.protocol;
            this.domain = window.location.hostname;
            this.port = window.location.port;
            //this.url = window.location.href.substring(0, window.location.href.search('/'));
        }
        else {
            if (this.protocol === '' && this.tmpDomain !== undefined) {
                this.domain = this.tmpDomain;
                this.protocol = (this.isSSL) ? 'https:' : 'http:';
            }
            else {
                if (this.protocol === '') {
                    this.protocol = (this.isSSL) ? 'https:' : 'http:';
                    //throw new Error('Invalid absolute url. Protocol is missing');
                }
                this.url = this.url.replace(this.protocol + '//', '');
                var domainLimit = this.url.search('/');
                if (domainLimit > 0) {
                    this.domain = this.url.substring(0, domainLimit);
                    this.url = this.url.replace(this.domain, '');
                }
                else if (this.tmpDomain !== undefined) {
                    this.domain = this.tmpDomain;
                }
                else {
                    this.domain = this.url;
                    this.url = '/';
                }
                if (this.domain.search(':') > -1) {
                    this.port = this.domain.substring(this.domain.search(':'));
                    this.url = this.url.replace(':' + this.port, '');
                }
                if (this.domain.search('localhost') > -1) {
                    this.domain = 'localhost';
                    this.url = this.url.replace(this.domain, '');
                }
            }
            this.page = this.url;
            if (this.page.substring(0, 1) === '/') {
                this.page = this.page.substring(1);
            }
            this.port = (this.port === '') ? '80' : this.port;
            this.protocol = ((this.domain !== '' && this.protocol === '') ? ((this.isSSL) ? 'https:' : 'http:') : this.protocol);
        }
        var queryString = '';
        if (this.page.search(/\?/) > -1) {
            queryString = this.page.substring(this.page.search(/\?/));
        }
        this.queryString = queryString;
        result.isRelative = this.isRelative;
        result.protocol = this.protocol;
        result.domain = this.domain;
        result.port = this.port;
        result.page = this.page;
        result.queryString = this.queryString;
        this.url = result;
        this.isParsed = true;
        return result;
    }
    toString() {
        if (!this.isParsed) {
            this.parse();
        }
        var fqPage = (this.queryString !== '') ? this.page + this.queryString : this.page;
        return this.protocol + '//' + this.domain + '/' + fqPage;
    }
}


