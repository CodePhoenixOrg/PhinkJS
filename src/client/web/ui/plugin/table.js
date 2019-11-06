var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Table = class Q extends Phink.Web.UI.Plugin {
    constructor() {
        super();
    }
    bind(tableId, data, callback) {
        let values = data.values;
        let templates = data.templates;
        let colNum = templates.length;
        let rowNum = values.length;
        for (let j = 0; j < rowNum; j++) {
            let row = values[j];
            for (let i = 0; i < colNum; i++) {
                let template = templates[i];
                let html = Phink.Web.UI.Plugin.applyTemplate(templates, row, i);
                if (template.enabled) {
                    document.querySelector(tableId + 'td' + (i + colNum * j).toString()).innerHTML = html;
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
