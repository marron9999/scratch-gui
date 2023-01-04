import downloadBlob from '../lib/download-blob';
import { opcode_infos } from '../lib/opcode-infos';

const formatMessage = require('format-message');

const makeProjectHTML = function (title, vm) {
    const infos = opcode_infos();
    vm.htmlProjectSb3(title, infos).then(content => {
        let html = new Blob([content], {type: 'text/html'});
        downloadBlob(title + ".html", html);
    });
};

const labelMakeProjectHTML = function () {
    const msgs = {
    'en': {
        'makehtml.makeHTMLToComputer':"Save document to your computer",
    },
    'ja': {
        'makehtml.makeHTMLToComputer':"コンピューターにドキュメントを保存する",
    },
    'ja-Hira': {
        'makehtml.makeHTMLToComputer':"コンピューターにドキュメントをほぞんする",
    } };
    const localeSetup = formatMessage.setup({locale:document.documentElement.lang});
    for (const locale in msgs) {
        if (!localeSetup.translations[locale]) {
            localeSetup.translations[locale] = {};
        }
        Object.assign(localeSetup.translations[locale], msgs[locale]);
    }
    return formatMessage({id:"makehtml.makeHTMLToComputer"});
};

export { 
    labelMakeProjectHTML,
    makeProjectHTML
};
