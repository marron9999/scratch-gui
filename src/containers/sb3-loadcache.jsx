import downloadBlob from '../lib/download-blob';
import {db} from '../lib/cache-db.js';

const formatMessage = require('format-message');

const maxData = -1;

const labelLoadCache = function (mode) {
	const msgs = {
	'ja': {
		'loadcache.loadFromCache':"ブラウザキャシュから読み込む",
		'loadcache.loadFromCache2':"%1 を読み込む",
	} };
    const localeSetup = formatMessage.setup({locale:document.documentElement.lang});
	for (const locale in msgs) {
		if (!localeSetup.translations[locale]) {
			localeSetup.translations[locale] = {};
		}
		Object.assign(localeSetup.translations[locale], msgs[locale]);
	}
	if(mode) {
		return formatMessage({
			id:"loadcache.loadFromCache2",
			default:"Load %1",
			description:"Menu bar item for load from browser cache"
	});
	}
	return formatMessage({
			id:"loadcache.loadFromCache",
			default:"Load from browser cache",
			description:"Menu bar item for load from browser cache"
	});
};

const enableCache = function (enable) {
	db.enable = enable;
};

const loadCacheContent = function (cacheId, succ, fail) {
	db.open("scratch", function() {
		db.get(cacheId+"c", function(data) {
			if(data.content != undefined) {
				data.content.arrayBuffer().then(buffer => {
					succ(cacheId, buffer);
				}, fail);
			} else {
				fail();
			}
		}, fail);
		db.close();
	});
};
const loadCacheImage = function (cacheId, succ, fail) {
	db.open("scratch", function() {
		db.get(cacheId+"i", function(data) {
			if(data.image != undefined) {
				succ(cacheId, data.image, data.size);
			} else {
				fail();
			}
		}, fail);
		db.close();
	});
};

let timer = null;
let cacheId, uniqueId, filename, vm, image, image_width, image_height;

const saveCache = function (_uniqueId, _filename, _vm) {
	if(timer != null) {
		clearTimeout(timer);
		timer = null;
	}
	if( ! db.enable) {
		console.log("_saveCache: - skip -");
		return;
	}
	uniqueId = _uniqueId;
	filename = _filename;
	vm = _vm;
	timer = setTimeout(_saveCache, 100);
}
const _saveCache = function () {
	timer = null;

	let ids = getCacheIds();
	cacheId = -1;
	for(let i=0; i<ids.length; i++) {
		let info = getCacheInfo(ids[i]);
		if(info.uniqueId == uniqueId) {
			cacheId = ids[i];
			break;
		}
	}
	if(cacheId == -1) {
		cacheId = localStorage.getItem("scratch.lastId");
		if(cacheId == null || cacheId == "") cacheId = 0;
		cacheId = parseInt(cacheId) + 1;
		localStorage.setItem("scratch.lastId", cacheId);
	}

	image = null;
	{
		vm.runtime.renderer.draw();
		let img = vm.runtime.renderer.canvas;
		let w = img.clientWidth;
		let h = img.clientHeight;
		let canvas = document.createElement('canvas');
		image_width = canvas.width = 240;
		image_height = canvas.height = Math.round(h * canvas.width / w);
		let ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
		image = canvas.toDataURL();
		canvas.remove();
	}

	vm.saveProjectSb3().then(content => {
		let blob = new Blob([content]);
		db.open("scratch", function() {
			let data = db.today();
			data.filename = filename;
			data.uniqueId = uniqueId;
			data.cacheId = cacheId;
			console.log("saveCache:"
						+ data.date + " " + data.time
						+ "," + filename
						+ "," + uniqueId);
			db.put(cacheId+"c", {"content":blob});
			db.put(cacheId+"i", {"image":image, "size":[image_width, image_height]});
			localStorage.setItem("scratch." + cacheId, JSON.stringify(data));
			let projects = localStorage.getItem("scratch." + "projects");
			if(projects == null || projects == "") projects = [];
			else projects = JSON.parse(projects);
			let p = projects.indexOf(cacheId);
			if(p >= 0) projects.splice(p, 1);
			if(projects.length == 0 || projects[0] != cacheId) {
				projects.unshift(cacheId);
				if(maxData > 0) {
					for(let i = projects.length - 1; i >= maxData; i--) {
						let id = projects[i];
						projects.splice(i, 1);
						db.delete(id+"c");
						db.delete(id+"i");
						localStorage.removeItem("scratch." + id);
					}
				}
				localStorage.setItem("scratch." + "projects", JSON.stringify(projects));
			}
			db.close();
		});
	});
};

function getCacheIds() {
	let projects = db.ids("scratch", "projects");
	return projects;
}
function getCacheInfo(id, mode) {
	let v = db.info("scratch", id);
	return v;
}
function getCacheInfos(mode) {
	let projects = db.ids("scratch", "projects");
	for(let i=0; i<projects.length; i++) {
		let v = db.info("scratch", projects[i], mode);
		projects[i] = v;
	}
	return projects;
}

export { 
	labelLoadCache,
	enableCache,
	loadCacheContent,
	loadCacheImage,
	saveCache,
	getCacheIds,
	getCacheInfo,
	getCacheInfos
};
