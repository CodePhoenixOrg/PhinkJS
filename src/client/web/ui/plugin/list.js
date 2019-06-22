var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.List = class F extends Phink.Web.UI.Plugin {
    constructor() {
        super(this);
    }
    bind(container, data, callback) {
        var names = data.names;
        var values = data.values;
        var templates = data.templates;
        var elements = data.elements;
        var colNum = templates.length;
        var rowNum = values.length;
        var result = '';
        var html = '';
        var css = '';
        result = str_replace('%s', css, elements[0].opening) + "\n";
        var oldValue = [];
        for (i = 0; i < rowNum; i++) {
            var row = (values[i] !== null) ? values[i] : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');
            result += str_replace('%s', '', elements[1].opening) + "\n";
            for (j = 0; j < colNum; j++) {
                var k = i * colNum + j;
                html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);
                if (templates[j]['enabled'] == 1 && row[j] != oldValue[j]) {
                    result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing + "\n";
                }
                oldValue[j] = row[j];
            }
            result += elements[1].closing + "\n";
        }
        result += elements[0].closing + "\n";
        $(container).html("&nbsp;");
        $(container).html(result);
        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    static create() {
        return new Phink.Web.UI.List();
    }
}
