var toneMap = {
		"ā": "a1",
		"á": "a2",
		"ǎ": "a3",
		"à": "a4",
		"ō": "o1",
		"ó": "o2",
		"ǒ": "o3",
		"ò": "o4",
		"ē": "e1",
		"é": "e2",
		"ě": "e3",
		"è": "e4",
		"ī": "i1",
		"í": "i2",
		"ǐ": "i3",
		"ì": "i4",
		"ū": "u1",
		"ú": "u2",
		"ǔ": "u3",
		"ù": "u4",
		"ü": "v0",
		"ǖ": "v1",
		"ǘ": "v2",
		"ǚ": "v3",
		"ǜ": "v4",
		"ń": "n2",
		"ň": "n3",
		"": "m2"
	},
	dict = {
		"firstletter": require("./pinYinFirstLetter")
	}

module.exports = {
	/**
	 * 解析各种字典文件，所需的字典文件必须在本JS之前导入
	 */
	/**
	 * 根据汉字获取拼音，如果不是汉字直接返回原字符
	 * @param chinese 要转换的汉字
	 * @param splitter 分隔字符，默认用空格分隔
	 * @param withtone 返回结果是否包含声调，默认是
	 * @param polyphone 是否支持多音字，默认否
	 */
	getPinyin: function (chinese, splitter, withtone, polyphone) {
		if (!chinese || /^ +$/g.test(chinese)) return '';
		splitter = splitter == undefined ? ' ' : splitter;
		withtone = withtone == undefined ? true : withtone;
		polyphone = polyphone == undefined ? false : polyphone;
		var result = [];
		if (dict.withtone) // 优先使用带声调的字典文件
		{
			var noChinese = '';
			for (var i = 0, len = chinese.length; i < len; i++) {
				var pinyin = dict.withtone[chinese[i]];
				if (pinyin) {
					// 如果不需要多音字，默认返回第一个拼音，后面的直接忽略
					// 所以这对数据字典有一定要求，常见字的拼音必须放在最前面
					if (!polyphone) pinyin = pinyin.replace(/ .*$/g, '');
					if (!withtone) pinyin = this.removeTone(pinyin); // 如果不需要声调
					//空格，把noChinese作为一个词插入
					noChinese && (result.push(noChinese), noChinese = '');
					result.push(pinyin);
				} else if (!chinese[i] || /^ +$/g.test(chinese[i])) {
					//空格，把noChinese作为一个词插入
					noChinese && (result.push(noChinese), noChinese = '');
				} else {
					noChinese += chinese[i];
				}
			}
			if (noChinese) {
				result.push(noChinese);
				noChinese = '';
			}
		} else if (dict.notone) // 使用没有声调的字典文件
		{
			if (withtone) console.warn('pinyin_dict_notone 字典文件不支持声调！');
			if (polyphone) console.warn('pinyin_dict_notone 字典文件不支持多音字！');
			var noChinese = '';
			for (var i = 0, len = chinese.length; i < len; i++) {
				var temp = chinese.charAt(i),
					pinyin = dict.notone[temp];
				if (pinyin) { //插入拼音
					//空格，把noChinese作为一个词插入
					noChinese && (result.push(noChinese), noChinese = '');
					result.push(pinyin);
				} else if (!temp || /^ +$/g.test(temp)) {
					//空格，插入之前的非中文字符
					noChinese && (result.push(noChinese), noChinese = '');
				} else {
					//非空格，关联到noChinese中
					noChinese += temp;
				}
			}

			if (noChinese) {
				result.push(noChinese);
				noChinese = '';
			}
		} else {
			throw '抱歉，未找到合适的拼音字典文件！';
		}
		if (!polyphone) return result.join(splitter);
		else {
			if (window.pinyin_dict_polyphone) return parsePolyphone(chinese, result, splitter, withtone)
		}
	},
	/**
	 * 获取汉字的拼音首字母
	 * @param str 汉字字符串，如果遇到非汉字则原样返回
	 * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
	 */
	getFirstLetter: function (str, polyphone) {
		polyphone = polyphone == undefined ? false : polyphone;
		if (!str || /^ +$/g.test(str)) return '';
		if (dict.firstletter) // 使用首字母字典文件
		{
			var result = [];
			for (var i = 0; i < str.length; i++) {
				var unicode = str.charCodeAt(i);
				var ch = str.charAt(i);
				if (unicode >= 19968 && unicode <= 40869) {
					ch = dict.firstletter.all.charAt(unicode - 19968);
					if (polyphone) ch = dict.firstletter.polyphone[unicode] || ch;
				}
				result.push(ch);
			}
			if (!polyphone) return result.join(''); // 如果不用管多音字，直接将数组拼接成字符串
		} else {
			var py = this.getPinyin(str, ' ', false, polyphone);
			py = py instanceof Array ? py : [py];
			var result = [];
			for (var i = 0; i < py.length; i++) {
				result.push(py[i].replace(/(^| )(\w)\w*/g, function (m, $1, $2) {
					return $2.toUpperCase();
				}));
			}
			if (!polyphone) return result[0];
			else return simpleUnique(result);
		}
	},
	/**
	 * 去除拼音中的声调，比如将 xiǎo míng tóng xué 转换成 xiao ming tong xue
	 * @param pinyin 需要转换的拼音
	 */
	removeTone: function (pinyin) {
		return pinyin.replace(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜńň]/g, function (m) {
			return toneMap[m][0];
		});
	}
};

// 简单数组去重
function simpleUnique(array) {
	var result = [];
	var hash = {};
	for (var i = 0; i < array.length; i++) {
		var key = (typeof array[i]) + array[i];
		if (!hash[key]) {
			result.push(array[i]);
			hash[key] = true;
		}
	}
	return result;
}