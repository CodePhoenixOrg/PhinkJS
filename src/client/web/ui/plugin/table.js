var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Table = class F extends Phink.Web.UI.Plugin {
    constructor() {
        super(this);
    }
    bind(tableId, data, callback) {
        var values = data.values;
        var templates = data.templates;
        var colNum = templates.length;
        var rowNum = values.length;
        for (var j = 0; j < rowNum; j++) {
            var row = values[j];
            for (var i = 0; i < colNum; i++) {
                var template = templates[i];
                var html = Phink.Web.UI.Plugin.applyTemplate(templates, row, i);
                if (template.enabled) {
                    $(tableId + 'td' + (i + colNum * j).toString()).html(html);
                }
            }
        }
        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    static create() {
        return new Phink.Web.UI.Table();
    }
}
