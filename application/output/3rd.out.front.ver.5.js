! function(a, b) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
		if (!a.document) throw new Error("jQuery requires a window with a document");
		return b(a)
	} : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
	function c(a) {
		var b = a.length,
			c = fb.type(a);
		return "function" === c || fb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
	}
	function d(a, b, c) {
		if (fb.isFunction(b)) return fb.grep(a, function(a, d) {
			return !!b.call(a, d, a) !== c
		});
		if (b.nodeType) return fb.grep(a, function(a) {
			return a === b !== c
		});
		if ("string" == typeof b) {
			if (nb.test(b)) return fb.filter(b, a, c);
			b = fb.filter(b, a)
		}
		return fb.grep(a, function(a) {
			return fb.inArray(a, b) >= 0 !== c
		})
	}
	function e(a, b) {
		do a = a[b];
		while (a && 1 !== a.nodeType);
		return a
	}
	function f(a) {
		var b = vb[a] = {};
		return fb.each(a.match(ub) || [], function(a, c) {
			b[c] = !0
		}), b
	}
	function g() {
		pb.addEventListener ? (pb.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (pb.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
	}
	function h() {
		(pb.addEventListener || "load" === event.type || "complete" === pb.readyState) && (g(), fb.ready())
	}
	function i(a, b, c) {
		if (void 0 === c && 1 === a.nodeType) {
			var d = "data-" + b.replace(Ab, "-$1").toLowerCase();
			if (c = a.getAttribute(d), "string" == typeof c) {
				try {
					c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : zb.test(c) ? fb.parseJSON(c) : c
				} catch (e) {}
				fb.data(a, b, c)
			} else c = void 0
		}
		return c
	}
	function j(a) {
		var b;
		for (b in a) if (("data" !== b || !fb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
		return !0
	}
	function k(a, b, c, d) {
		if (fb.acceptData(a)) {
			var e, f, g = fb.expando,
				h = a.nodeType,
				i = h ? fb.cache : a,
				j = h ? a[g] : a[g] && g;
			if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || fb.guid++ : g), i[j] || (i[j] = h ? {} : {
				toJSON: fb.noop
			}), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = fb.extend(i[j], b) : i[j].data = fb.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[fb.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[fb.camelCase(b)])) : e = f, e
		}
	}
	function l(a, b, c) {
		if (fb.acceptData(a)) {
			var d, e, f = a.nodeType,
				g = f ? fb.cache : a,
				h = f ? a[fb.expando] : fb.expando;
			if (g[h]) {
				if (b && (d = c ? g[h] : g[h].data)) {
					fb.isArray(b) ? b = b.concat(fb.map(b, fb.camelCase)) : b in d ? b = [b] : (b = fb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
					for (; e--;) delete d[b[e]];
					if (c ? !j(d) : !fb.isEmptyObject(d)) return
				}(c || (delete g[h].data, j(g[h]))) && (f ? fb.cleanData([a], !0) : db.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
			}
		}
	}
	function m() {
		return !0
	}
	function n() {
		return !1
	}
	function o() {
		try {
			return pb.activeElement
		} catch (a) {}
	}
	function p(a) {
		var b = Lb.split("|"),
			c = a.createDocumentFragment();
		if (c.createElement) for (; b.length;) c.createElement(b.pop());
		return c
	}
	function q(a, b) {
		var c, d, e = 0,
			f = typeof a.getElementsByTagName !== yb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== yb ? a.querySelectorAll(b || "*") : void 0;
		if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || fb.nodeName(d, b) ? f.push(d) : fb.merge(f, q(d, b));
		return void 0 === b || b && fb.nodeName(a, b) ? fb.merge([a], f) : f
	}
	function r(a) {
		Fb.test(a.type) && (a.defaultChecked = a.checked)
	}
	function s(a, b) {
		return fb.nodeName(a, "table") && fb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}
	function t(a) {
		return a.type = (null !== fb.find.attr(a, "type")) + "/" + a.type, a
	}
	function u(a) {
		var b = Wb.exec(a.type);
		return b ? a.type = b[1] : a.removeAttribute("type"), a
	}
	function v(a, b) {
		for (var c, d = 0; null != (c = a[d]); d++) fb._data(c, "globalEval", !b || fb._data(b[d], "globalEval"))
	}
	function w(a, b) {
		if (1 === b.nodeType && fb.hasData(a)) {
			var c, d, e, f = fb._data(a),
				g = fb._data(b, f),
				h = f.events;
			if (h) {
				delete g.handle, g.events = {};
				for (c in h) for (d = 0, e = h[c].length; e > d; d++) fb.event.add(b, c, h[c][d])
			}
			g.data && (g.data = fb.extend({}, g.data))
		}
	}
	function x(a, b) {
		var c, d, e;
		if (1 === b.nodeType) {
			if (c = b.nodeName.toLowerCase(), !db.noCloneEvent && b[fb.expando]) {
				e = fb._data(b);
				for (d in e.events) fb.removeEvent(b, d, e.handle);
				b.removeAttribute(fb.expando)
			}
			"script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), db.html5Clone && a.innerHTML && !fb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Fb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
		}
	}
	function y(b, c) {
		var d = fb(c.createElement(b)).appendTo(c.body),
			e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : fb.css(d[0], "display");
		return d.detach(), e
	}
	function z(a) {
		var b = pb,
			c = ac[a];
		return c || (c = y(a, b), "none" !== c && c || (_b = (_b || fb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (_b[0].contentWindow || _b[0].contentDocument).document, b.write(), b.close(), c = y(a, b), _b.detach()), ac[a] = c), c
	}
	function A(a, b) {
		return {
			get: function() {
				var c = a();
				return null != c ? c ? void delete this.get : (this.get = b).apply(this, arguments) : void 0
			}
		}
	}
	function B(a, b) {
		if (b in a) return b;
		for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = nc.length; e--;) if (b = nc[e] + c, b in a) return b;
		return d
	}
	function C(a, b) {
		for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = fb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Db(d) && (f[g] = fb._data(d, "olddisplay", z(d.nodeName)))) : f[g] || (e = Db(d), (c && "none" !== c || !e) && fb._data(d, "olddisplay", e ? c : fb.css(d, "display"))));
		for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
		return a
	}
	function D(a, b, c) {
		var d = jc.exec(b);
		return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
	}
	function E(a, b, c, d, e) {
		for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += fb.css(a, c + Cb[f], !0, e)), d ? ("content" === c && (g -= fb.css(a, "padding" + Cb[f], !0, e)), "margin" !== c && (g -= fb.css(a, "border" + Cb[f] + "Width", !0, e))) : (g += fb.css(a, "padding" + Cb[f], !0, e), "padding" !== c && (g += fb.css(a, "border" + Cb[f] + "Width", !0, e)));
		return g
	}
	function F(a, b, c) {
		var d = !0,
			e = "width" === b ? a.offsetWidth : a.offsetHeight,
			f = bc(a),
			g = db.boxSizing() && "border-box" === fb.css(a, "boxSizing", !1, f);
		if (0 >= e || null == e) {
			if (e = cc(a, b, f), (0 > e || null == e) && (e = a.style[b]), ec.test(e)) return e;
			d = g && (db.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
		}
		return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
	}
	function G(a, b, c, d, e) {
		return new G.prototype.init(a, b, c, d, e)
	}
	function H() {
		return setTimeout(function() {
			oc = void 0
		}), oc = fb.now()
	}
	function I(a, b) {
		var c, d = {
			height: a
		}, e = 0;
		for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Cb[e], d["margin" + c] = d["padding" + c] = a;
		return b && (d.opacity = d.width = a), d
	}
	function J(a, b, c) {
		for (var d, e = (uc[b] || []).concat(uc["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
	}
	function K(a, b, c) {
		var d, e, f, g, h, i, j, k, l = this,
			m = {}, n = a.style,
			o = a.nodeType && Db(a),
			p = fb._data(a, "fxshow");
		c.queue || (h = fb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
			h.unqueued || i()
		}), h.unqueued++, l.always(function() {
			l.always(function() {
				h.unqueued--, fb.queue(a, "fx").length || h.empty.fire()
			})
		})), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = fb.css(a, "display"), k = z(a.nodeName), "none" === j && (j = k), "inline" === j && "none" === fb.css(a, "float") && (db.inlineBlockNeedsLayout && "inline" !== k ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", db.shrinkWrapBlocks() || l.always(function() {
			n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
		}));
		for (d in b) if (e = b[d], qc.exec(e)) {
			if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
				if ("show" !== e || !p || void 0 === p[d]) continue;
				o = !0
			}
			m[d] = p && p[d] || fb.style(a, d)
		}
		if (!fb.isEmptyObject(m)) {
			p ? "hidden" in p && (o = p.hidden) : p = fb._data(a, "fxshow", {}), f && (p.hidden = !o), o ? fb(a).show() : l.done(function() {
				fb(a).hide()
			}), l.done(function() {
				var b;
				fb._removeData(a, "fxshow");
				for (b in m) fb.style(a, b, m[b])
			});
			for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
		}
	}
	function L(a, b) {
		var c, d, e, f, g;
		for (c in a) if (d = fb.camelCase(c), e = b[d], f = a[c], fb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = fb.cssHooks[d], g && "expand" in g) {
			f = g.expand(f), delete a[d];
			for (c in f) c in a || (a[c] = f[c], b[c] = e)
		} else b[d] = e
	}
	function M(a, b, c) {
		var d, e, f = 0,
			g = tc.length,
			h = fb.Deferred().always(function() {
				delete i.elem
			}),
			i = function() {
				if (e) return !1;
				for (var b = oc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
				return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
			}, j = h.promise({
				elem: a,
				props: fb.extend({}, b),
				opts: fb.extend(!0, {
					specialEasing: {}
				}, c),
				originalProperties: b,
				originalOptions: c,
				startTime: oc || H(),
				duration: c.duration,
				tweens: [],
				createTween: function(b, c) {
					var d = fb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
					return j.tweens.push(d), d
				},
				stop: function(b) {
					var c = 0,
						d = b ? j.tweens.length : 0;
					if (e) return this;
					for (e = !0; d > c; c++) j.tweens[c].run(1);
					return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
				}
			}),
			k = j.props;
		for (L(k, j.opts.specialEasing); g > f; f++) if (d = tc[f].call(j, a, k, j.opts)) return d;
		return fb.map(k, J, j), fb.isFunction(j.opts.start) && j.opts.start.call(a, j), fb.fx.timer(fb.extend(i, {
			elem: a,
			anim: j,
			queue: j.opts.queue
		})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
	}
	function N(a) {
		return function(b, c) {
			"string" != typeof b && (c = b, b = "*");
			var d, e = 0,
				f = b.toLowerCase().match(ub) || [];
			if (fb.isFunction(c)) for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
		}
	}
	function O(a, b, c, d) {
		function e(h) {
			var i;
			return f[h] = !0, fb.each(a[h] || [], function(a, h) {
				var j = h(b, c, d);
				return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
			}), i
		}
		var f = {}, g = a === Sc;
		return e(b.dataTypes[0]) || !f["*"] && e("*")
	}
	function P(a, b) {
		var c, d, e = fb.ajaxSettings.flatOptions || {};
		for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
		return c && fb.extend(!0, a, c), a
	}
	function Q(a, b, c) {
		for (var d, e, f, g, h = a.contents, i = a.dataTypes;
		"*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
		if (e) for (g in h) if (h[g] && h[g].test(e)) {
			i.unshift(g);
			break
		}
		if (i[0] in c) f = i[0];
		else {
			for (g in c) {
				if (!i[0] || a.converters[g + " " + i[0]]) {
					f = g;
					break
				}
				d || (d = g)
			}
			f = f || d
		}
		return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
	}
	function R(a, b, c, d) {
		var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
		if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
		for (f = k.shift(); f;) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
		else if ("*" !== i && i !== f) {
			if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
				g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
				break
			}
			if (g !== !0) if (g && a["throws"]) b = g(b);
			else try {
				b = g(b)
			} catch (l) {
				return {
					state: "parsererror",
					error: g ? l : "No conversion from " + i + " to " + f
				}
			}
		}
		return {
			state: "success",
			data: b
		}
	}
	function S(a, b, c, d) {
		var e;
		if (fb.isArray(b)) fb.each(b, function(b, e) {
			c || Wc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
		});
		else if (c || "object" !== fb.type(b)) d(a, b);
		else for (e in b) S(a + "[" + e + "]", b[e], c, d)
	}
	function T() {
		try {
			return new a.XMLHttpRequest
		} catch (b) {}
	}
	function U() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch (b) {}
	}
	function V(a) {
		return fb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
	}
	var W = [],
		X = W.slice,
		Y = W.concat,
		Z = W.push,
		$ = W.indexOf,
		_ = {}, ab = _.toString,
		bb = _.hasOwnProperty,
		cb = "".trim,
		db = {}, eb = "1.11.0",
		fb = function(a, b) {
			return new fb.fn.init(a, b)
		}, gb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		hb = /^-ms-/,
		ib = /-([\da-z])/gi,
		jb = function(a, b) {
			return b.toUpperCase()
		};
	fb.fn = fb.prototype = {
		jquery: eb,
		constructor: fb,
		selector: "",
		length: 0,
		toArray: function() {
			return X.call(this)
		},
		get: function(a) {
			return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
		},
		pushStack: function(a) {
			var b = fb.merge(this.constructor(), a);
			return b.prevObject = this, b.context = this.context, b
		},
		each: function(a, b) {
			return fb.each(this, a, b)
		},
		map: function(a) {
			return this.pushStack(fb.map(this, function(b, c) {
				return a.call(b, c, b)
			}))
		},
		slice: function() {
			return this.pushStack(X.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(a) {
			var b = this.length,
				c = +a + (0 > a ? b : 0);
			return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: Z,
		sort: W.sort,
		splice: W.splice
	}, fb.extend = fb.fn.extend = function() {
		var a, b, c, d, e, f, g = arguments[0] || {}, h = 1,
			i = arguments.length,
			j = !1;
		for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || fb.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (fb.isPlainObject(c) || (b = fb.isArray(c))) ? (b ? (b = !1, f = a && fb.isArray(a) ? a : []) : f = a && fb.isPlainObject(a) ? a : {}, g[d] = fb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
		return g
	}, fb.extend({
		expando: "jQuery" + (eb + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(a) {
			throw new Error(a)
		},
		noop: function() {},
		isFunction: function(a) {
			return "function" === fb.type(a)
		},
		isArray: Array.isArray || function(a) {
			return "array" === fb.type(a)
		},
		isWindow: function(a) {
			return null != a && a == a.window
		},
		isNumeric: function(a) {
			return a - parseFloat(a) >= 0
		},
		isEmptyObject: function(a) {
			var b;
			for (b in a) return !1;
			return !0
		},
		isPlainObject: function(a) {
			var b;
			if (!a || "object" !== fb.type(a) || a.nodeType || fb.isWindow(a)) return !1;
			try {
				if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf")) return !1
			} catch (c) {
				return !1
			}
			if (db.ownLast) for (b in a) return bb.call(a, b);
			for (b in a);
			return void 0 === b || bb.call(a, b)
		},
		type: function(a) {
			return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a
		},
		globalEval: function(b) {
			b && fb.trim(b) && (a.execScript || function(b) {
				a.eval.call(a, b)
			})(b)
		},
		camelCase: function(a) {
			return a.replace(hb, "ms-").replace(ib, jb)
		},
		nodeName: function(a, b) {
			return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
		},
		each: function(a, b, d) {
			var e, f = 0,
				g = a.length,
				h = c(a);
			if (d) {
				if (h) for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
				else for (f in a) if (e = b.apply(a[f], d), e === !1) break
			} else if (h) for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
			else for (f in a) if (e = b.call(a[f], f, a[f]), e === !1) break;
			return a
		},
		trim: cb && !cb.call("﻿ ") ? function(a) {
			return null == a ? "" : cb.call(a)
		} : function(a) {
			return null == a ? "" : (a + "").replace(gb, "")
		},
		makeArray: function(a, b) {
			var d = b || [];
			return null != a && (c(Object(a)) ? fb.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d
		},
		inArray: function(a, b, c) {
			var d;
			if (b) {
				if ($) return $.call(b, a, c);
				for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c
			}
			return -1
		},
		merge: function(a, b) {
			for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
			if (c !== c) for (; void 0 !== b[d];) a[e++] = b[d++];
			return a.length = e, a
		},
		grep: function(a, b, c) {
			for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
			return e
		},
		map: function(a, b, d) {
			var e, f = 0,
				g = a.length,
				h = c(a),
				i = [];
			if (h) for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
			else for (f in a) e = b(a[f], f, d), null != e && i.push(e);
			return Y.apply([], i)
		},
		guid: 1,
		proxy: function(a, b) {
			var c, d, e;
			return "string" == typeof b && (e = a[b], b = a, a = e), fb.isFunction(a) ? (c = X.call(arguments, 2), d = function() {
				return a.apply(b || this, c.concat(X.call(arguments)))
			}, d.guid = a.guid = a.guid || fb.guid++, d) : void 0
		},
		now: function() {
			return +new Date
		},
		support: db
	}), fb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
		_["[object " + b + "]"] = b.toLowerCase()
	});
	var kb = function(a) {
		function b(a, b, c, d) {
			var e, f, g, h, i, j, l, o, p, q;
			if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
			if (1 !== (h = b.nodeType) && 9 !== h) return [];
			if (I && !d) {
				if (e = sb.exec(a)) if (g = e[1]) {
					if (9 === h) {
						if (f = b.getElementById(g), !f || !f.parentNode) return c;
						if (f.id === g) return c.push(f), c
					} else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
				} else {
					if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
					if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
				}
				if (x.qsa && (!J || !J.test(a))) {
					if (o = l = N, p = b, q = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
						for (j = m(a), (l = b.getAttribute("id")) ? o = l.replace(ub, "\\$&") : b.setAttribute("id", o), o = "[id='" + o + "'] ", i = j.length; i--;) j[i] = o + n(j[i]);
						p = tb.test(a) && k(b.parentNode) || b, q = j.join(",")
					}
					if (q) try {
						return _.apply(c, p.querySelectorAll(q)), c
					} catch (r) {} finally {
						l || b.removeAttribute("id")
					}
				}
			}
			return v(a.replace(ib, "$1"), b, c, d)
		}
		function c() {
			function a(c, d) {
				return b.push(c + " ") > y.cacheLength && delete a[b.shift()], a[c + " "] = d
			}
			var b = [];
			return a
		}
		function d(a) {
			return a[N] = !0, a
		}
		function e(a) {
			var b = G.createElement("div");
			try {
				return !!a(b)
			} catch (c) {
				return !1
			} finally {
				b.parentNode && b.parentNode.removeChild(b), b = null
			}
		}
		function f(a, b) {
			for (var c = a.split("|"), d = a.length; d--;) y.attrHandle[c[d]] = b
		}
		function g(a, b) {
			var c = b && a,
				d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
			if (d) return d;
			if (c) for (; c = c.nextSibling;) if (c === b) return -1;
			return a ? 1 : -1
		}
		function h(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return "input" === c && b.type === a
			}
		}
		function i(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return ("input" === c || "button" === c) && b.type === a
			}
		}
		function j(a) {
			return d(function(b) {
				return b = +b, d(function(c, d) {
					for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
				})
			})
		}
		function k(a) {
			return a && typeof a.getElementsByTagName !== V && a
		}
		function l() {}
		function m(a, c) {
			var d, e, f, g, h, i, j, k = S[a + " "];
			if (k) return c ? 0 : k.slice(0);
			for (h = a, i = [], j = y.preFilter; h;) {
				(!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
					value: d,
					type: e[0].replace(ib, " ")
				}), h = h.slice(d.length));
				for (g in y.filter)!(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
					value: d,
					type: g,
					matches: e
				}), h = h.slice(d.length));
				if (!d) break
			}
			return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
		}
		function n(a) {
			for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
			return d
		}
		function o(a, b, c) {
			var d = b.dir,
				e = c && "parentNode" === d,
				f = Q++;
			return b.first ? function(b, c, f) {
				for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, f)
			} : function(b, c, g) {
				var h, i, j = [P, f];
				if (g) {
					for (; b = b[d];) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
				} else for (; b = b[d];) if (1 === b.nodeType || e) {
					if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
					if (i[d] = j, j[2] = a(b, c, g)) return !0
				}
			}
		}
		function p(a) {
			return a.length > 1 ? function(b, c, d) {
				for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1;
				return !0
			} : a[0]
		}
		function q(a, b, c, d, e) {
			for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
			return g
		}
		function r(a, b, c, e, f, g) {
			return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
				var j, k, l, m = [],
					n = [],
					o = g.length,
					p = d || u(b || "*", h.nodeType ? [h] : h, []),
					r = !a || !d && b ? p : q(p, m, a, h, i),
					s = c ? f || (d ? a : o || e) ? [] : g : r;
				if (c && c(r, s, h, i), e) for (j = q(s, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
				if (d) {
					if (f || a) {
						if (f) {
							for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
							f(null, s = [], j, i)
						}
						for (k = s.length; k--;)(l = s[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
					}
				} else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : _.apply(g, s)
			})
		}
		function s(a) {
			for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = o(function(a) {
				return a === b
			}, g, !0), j = o(function(a) {
				return bb.call(b, a) > -1
			}, g, !0), k = [function(a, c, d) {
				return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
			}]; e > h; h++) if (c = y.relative[a[h].type]) k = [o(p(k), c)];
			else {
				if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
					for (d = ++h; e > d && !y.relative[a[d].type]; d++);
					return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
						value: " " === a[h - 2].type ? "*" : ""
					})).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
				}
				k.push(c)
			}
			return p(k)
		}
		function t(a, c) {
			var e = c.length > 0,
				f = a.length > 0,
				g = function(d, g, h, i, j) {
					var k, l, m, n = 0,
						o = "0",
						p = d && [],
						r = [],
						s = C,
						t = d || f && y.find.TAG("*", j),
						u = P += null == s ? 1 : Math.random() || .1,
						v = t.length;
					for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
						if (f && k) {
							for (l = 0; m = a[l++];) if (m(k, g, h)) {
								i.push(k);
								break
							}
							j && (P = u)
						}
						e && ((k = !m && k) && n--, d && p.push(k))
					}
					if (n += o, e && o !== n) {
						for (l = 0; m = c[l++];) m(p, r, g, h);
						if (d) {
							if (n > 0) for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
							r = q(r)
						}
						_.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
					}
					return j && (P = u, C = s), p
				};
			return e ? d(g) : g
		}
		function u(a, c, d) {
			for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
			return d
		}
		function v(a, b, c, d) {
			var e, f, g, h, i, j = m(a);
			if (!d && 1 === j.length) {
				if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && y.relative[f[1].type]) {
					if (b = (y.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
					a = a.slice(f.shift().value.length)
				}
				for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]);) if ((i = y.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
					if (f.splice(e, 1), a = d.length && n(f), !a) return _.apply(c, d), c;
					break
				}
			}
			return B(a, j)(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
		}
		var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
			O = a.document,
			P = 0,
			Q = 0,
			R = c(),
			S = c(),
			T = c(),
			U = function(a, b) {
				return a === b && (E = !0), 0
			}, V = "undefined",
			W = 1 << 31,
			X = {}.hasOwnProperty,
			Y = [],
			Z = Y.pop,
			$ = Y.push,
			_ = Y.push,
			ab = Y.slice,
			bb = Y.indexOf || function(a) {
				for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
				return -1
			}, cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			db = "[\\x20\\t\\r\\n\\f]",
			eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			fb = eb.replace("w", "w#"),
			gb = "\\[" + db + "*(" + eb + ")" + db + "*(?:([*^$|!~]?=)" + db + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fb + ")|)|)" + db + "*\\]",
			hb = ":(" + eb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + gb.replace(3, 8) + ")*)|.*)\\)|)",
			ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"),
			jb = new RegExp("^" + db + "*," + db + "*"),
			kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"),
			lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"),
			mb = new RegExp(hb),
			nb = new RegExp("^" + fb + "$"),
			ob = {
				ID: new RegExp("^#(" + eb + ")"),
				CLASS: new RegExp("^\\.(" + eb + ")"),
				TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + gb),
				PSEUDO: new RegExp("^" + hb),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + cb + ")$", "i"),
				needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
			}, pb = /^(?:input|select|textarea|button)$/i,
			qb = /^h\d$/i,
			rb = /^[^{]+\{\s*\[native \w/,
			sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			tb = /[+~]/,
			ub = /'|\\/g,
			vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"),
			wb = function(a, b, c) {
				var d = "0x" + b - 65536;
				return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
			};
		try {
			_.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
		} catch (xb) {
			_ = {
				apply: Y.length ? function(a, b) {
					$.apply(a, ab.call(b))
				} : function(a, b) {
					for (var c = a.length, d = 0; a[c++] = b[d++];);
					a.length = c - 1
				}
			}
		}
		x = b.support = {}, A = b.isXML = function(a) {
			var b = a && (a.ownerDocument || a).documentElement;
			return b ? "HTML" !== b.nodeName : !1
		}, F = b.setDocument = function(a) {
			var b, c = a ? a.ownerDocument || a : O,
				d = c.defaultView;
			return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !A(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() {
				F()
			}, !1) : d.attachEvent && d.attachEvent("onunload", function() {
				F()
			})), x.attributes = e(function(a) {
				return a.className = "i", !a.getAttribute("className")
			}), x.getElementsByTagName = e(function(a) {
				return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
			}), x.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function(a) {
				return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
			}), x.getById = e(function(a) {
				return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
			}), x.getById ? (y.find.ID = function(a, b) {
				if (typeof b.getElementById !== V && I) {
					var c = b.getElementById(a);
					return c && c.parentNode ? [c] : []
				}
			}, y.filter.ID = function(a) {
				var b = a.replace(vb, wb);
				return function(a) {
					return a.getAttribute("id") === b
				}
			}) : (delete y.find.ID, y.filter.ID = function(a) {
				var b = a.replace(vb, wb);
				return function(a) {
					var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
					return c && c.value === b
				}
			}), y.find.TAG = x.getElementsByTagName ? function(a, b) {
				return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
			} : function(a, b) {
				var c, d = [],
					e = 0,
					f = b.getElementsByTagName(a);
				if ("*" === a) {
					for (; c = f[e++];) 1 === c.nodeType && d.push(c);
					return d
				}
				return f
			}, y.find.CLASS = x.getElementsByClassName && function(a, b) {
				return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
			}, K = [], J = [], (x.qsa = rb.test(c.querySelectorAll)) && (e(function(a) {
				a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
			}), e(function(a) {
				var b = c.createElement("input");
				b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
			})), (x.matchesSelector = rb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
				x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb)
			}), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
				var c = 9 === a.nodeType ? a.documentElement : a,
					d = b && b.parentNode;
				return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
			} : function(a, b) {
				if (b) for (; b = b.parentNode;) if (b === a) return !0;
				return !1
			}, U = b ? function(a, b) {
				if (a === b) return E = !0, 0;
				var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
				return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1)
			} : function(a, b) {
				if (a === b) return E = !0, 0;
				var d, e = 0,
					f = a.parentNode,
					h = b.parentNode,
					i = [a],
					j = [b];
				if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
				if (f === h) return g(a, b);
				for (d = a; d = d.parentNode;) i.unshift(d);
				for (d = b; d = d.parentNode;) j.unshift(d);
				for (; i[e] === j[e];) e++;
				return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
			}, c) : G
		}, b.matches = function(a, c) {
			return b(a, null, null, c)
		}, b.matchesSelector = function(a, c) {
			if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!x.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
				var d = L.call(a, c);
				if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
			} catch (e) {}
			return b(c, G, null, [a]).length > 0
		}, b.contains = function(a, b) {
			return (a.ownerDocument || a) !== G && F(a), M(a, b)
		}, b.attr = function(a, b) {
			(a.ownerDocument || a) !== G && F(a);
			var c = y.attrHandle[b.toLowerCase()],
				d = c && X.call(y.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
			return void 0 !== d ? d : x.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
		}, b.error = function(a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		}, b.uniqueSort = function(a) {
			var b, c = [],
				d = 0,
				e = 0;
			if (E = !x.detectDuplicates, D = !x.sortStable && a.slice(0), a.sort(U), E) {
				for (; b = a[e++];) b === a[e] && (d = c.push(e));
				for (; d--;) a.splice(c[d], 1)
			}
			return D = null, a
		}, z = b.getText = function(a) {
			var b, c = "",
				d = 0,
				e = a.nodeType;
			if (e) {
				if (1 === e || 9 === e || 11 === e) {
					if ("string" == typeof a.textContent) return a.textContent;
					for (a = a.firstChild; a; a = a.nextSibling) c += z(a)
				} else if (3 === e || 4 === e) return a.nodeValue
			} else for (; b = a[d++];) c += z(b);
			return c
		}, y = b.selectors = {
			cacheLength: 50,
			createPseudo: d,
			match: ob,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(a) {
					return a[1] = a[1].replace(vb, wb), a[3] = (a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
				},
				CHILD: function(a) {
					return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
				},
				PSEUDO: function(a) {
					var b, c = !a[5] && a[2];
					return ob.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && mb.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
				}
			},
			filter: {
				TAG: function(a) {
					var b = a.replace(vb, wb).toLowerCase();
					return "*" === a ? function() {
						return !0
					} : function(a) {
						return a.nodeName && a.nodeName.toLowerCase() === b
					}
				},
				CLASS: function(a) {
					var b = R[a + " "];
					return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function(a) {
						return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
					})
				},
				ATTR: function(a, c, d) {
					return function(e) {
						var f = b.attr(e, a);
						return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
					}
				},
				CHILD: function(a, b, c, d, e) {
					var f = "nth" !== a.slice(0, 3),
						g = "last" !== a.slice(-4),
						h = "of-type" === b;
					return 1 === d && 0 === e ? function(a) {
						return !!a.parentNode
					} : function(b, c, i) {
						var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
							q = b.parentNode,
							r = h && b.nodeName.toLowerCase(),
							s = !i && !h;
						if (q) {
							if (f) {
								for (; p;) {
									for (l = b; l = l[p];) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
									o = p = "only" === a && !o && "nextSibling"
								}
								return !0
							}
							if (o = [g ? q.firstChild : q.lastChild], g && s) {
								for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();) if (1 === l.nodeType && ++m && l === b) {
									k[a] = [P, n, m];
									break
								}
							} else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
							else for (;
							(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
							return m -= e, m === d || m % d === 0 && m / d >= 0
						}
					}
				},
				PSEUDO: function(a, c) {
					var e, f = y.pseudos[a] || y.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
					return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
						for (var d, e = f(a, c), g = e.length; g--;) d = bb.call(a, e[g]), a[d] = !(b[d] = e[g])
					}) : function(a) {
						return f(a, 0, e)
					}) : f
				}
			},
			pseudos: {
				not: d(function(a) {
					var b = [],
						c = [],
						e = B(a.replace(ib, "$1"));
					return e[N] ? d(function(a, b, c, d) {
						for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
					}) : function(a, d, f) {
						return b[0] = a, e(b, null, f, c), !c.pop()
					}
				}),
				has: d(function(a) {
					return function(c) {
						return b(a, c).length > 0
					}
				}),
				contains: d(function(a) {
					return function(b) {
						return (b.textContent || b.innerText || z(b)).indexOf(a) > -1
					}
				}),
				lang: d(function(a) {
					return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(),
					function(b) {
						var c;
						do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
						while ((b = b.parentNode) && 1 === b.nodeType);
						return !1
					}
				}),
				target: function(b) {
					var c = a.location && a.location.hash;
					return c && c.slice(1) === b.id
				},
				root: function(a) {
					return a === H
				},
				focus: function(a) {
					return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
				},
				enabled: function(a) {
					return a.disabled === !1
				},
				disabled: function(a) {
					return a.disabled === !0
				},
				checked: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && !! a.checked || "option" === b && !! a.selected
				},
				selected: function(a) {
					return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
				},
				empty: function(a) {
					for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
					return !0
				},
				parent: function(a) {
					return !y.pseudos.empty(a)
				},
				header: function(a) {
					return qb.test(a.nodeName)
				},
				input: function(a) {
					return pb.test(a.nodeName)
				},
				button: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && "button" === a.type || "button" === b
				},
				text: function(a) {
					var b;
					return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
				},
				first: j(function() {
					return [0]
				}),
				last: j(function(a, b) {
					return [b - 1]
				}),
				eq: j(function(a, b, c) {
					return [0 > c ? c + b : c]
				}),
				even: j(function(a, b) {
					for (var c = 0; b > c; c += 2) a.push(c);
					return a
				}),
				odd: j(function(a, b) {
					for (var c = 1; b > c; c += 2) a.push(c);
					return a
				}),
				lt: j(function(a, b, c) {
					for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
					return a
				}),
				gt: j(function(a, b, c) {
					for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
					return a
				})
			}
		}, y.pseudos.nth = y.pseudos.eq;
		for (w in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) y.pseudos[w] = h(w);
		for (w in {
			submit: !0,
			reset: !0
		}) y.pseudos[w] = i(w);
		return l.prototype = y.filters = y.pseudos, y.setFilters = new l, B = b.compile = function(a, b) {
			var c, d = [],
				e = [],
				f = T[a + " "];
			if (!f) {
				for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
				f = T(a, t(e, d))
			}
			return f
		}, x.sortStable = N.split("").sort(U).join("") === N, x.detectDuplicates = !! E, F(), x.sortDetached = e(function(a) {
			return 1 & a.compareDocumentPosition(G.createElement("div"))
		}), e(function(a) {
			return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
		}) || f("type|href|height|width", function(a, b, c) {
			return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
		}), x.attributes && e(function(a) {
			return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
		}) || f("value", function(a, b, c) {
			return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
		}), e(function(a) {
			return null == a.getAttribute("disabled")
		}) || f(cb, function(a, b, c) {
			var d;
			return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
		}), b
	}(a);
	fb.find = kb, fb.expr = kb.selectors, fb.expr[":"] = fb.expr.pseudos, fb.unique = kb.uniqueSort, fb.text = kb.getText, fb.isXMLDoc = kb.isXML, fb.contains = kb.contains;
	var lb = fb.expr.match.needsContext,
		mb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		nb = /^.[^:#\[\.,]*$/;
	fb.filter = function(a, b, c) {
		var d = b[0];
		return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? fb.find.matchesSelector(d, a) ? [d] : [] : fb.find.matches(a, fb.grep(b, function(a) {
			return 1 === a.nodeType
		}))
	}, fb.fn.extend({
		find: function(a) {
			var b, c = [],
				d = this,
				e = d.length;
			if ("string" != typeof a) return this.pushStack(fb(a).filter(function() {
				for (b = 0; e > b; b++) if (fb.contains(d[b], this)) return !0
			}));
			for (b = 0; e > b; b++) fb.find(a, d[b], c);
			return c = this.pushStack(e > 1 ? fb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
		},
		filter: function(a) {
			return this.pushStack(d(this, a || [], !1))
		},
		not: function(a) {
			return this.pushStack(d(this, a || [], !0))
		},
		is: function(a) {
			return !!d(this, "string" == typeof a && lb.test(a) ? fb(a) : a || [], !1).length
		}
	});
	var ob, pb = a.document,
		qb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		rb = fb.fn.init = function(a, b) {
			var c, d;
			if (!a) return this;
			if ("string" == typeof a) {
				if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : qb.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ob).find(a) : this.constructor(b).find(a);
				if (c[1]) {
					if (b = b instanceof fb ? b[0] : b, fb.merge(this, fb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : pb, !0)), mb.test(c[1]) && fb.isPlainObject(b)) for (c in b) fb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
					return this
				}
				if (d = pb.getElementById(c[2]), d && d.parentNode) {
					if (d.id !== c[2]) return ob.find(a);
					this.length = 1, this[0] = d
				}
				return this.context = pb, this.selector = a, this
			}
			return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : fb.isFunction(a) ? "undefined" != typeof ob.ready ? ob.ready(a) : a(fb) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), fb.makeArray(a, this))
		};
	rb.prototype = fb.fn, ob = fb(pb);
	var sb = /^(?:parents|prev(?:Until|All))/,
		tb = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	fb.extend({
		dir: function(a, b, c) {
			for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !fb(e).is(c));) 1 === e.nodeType && d.push(e), e = e[b];
			return d
		},
		sibling: function(a, b) {
			for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
			return c
		}
	}), fb.fn.extend({
		has: function(a) {
			var b, c = fb(a, this),
				d = c.length;
			return this.filter(function() {
				for (b = 0; d > b; b++) if (fb.contains(this, c[b])) return !0
			})
		},
		closest: function(a, b) {
			for (var c, d = 0, e = this.length, f = [], g = lb.test(a) || "string" != typeof a ? fb(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && fb.find.matchesSelector(c, a))) {
				f.push(c);
				break
			}
			return this.pushStack(f.length > 1 ? fb.unique(f) : f)
		},
		index: function(a) {
			return a ? "string" == typeof a ? fb.inArray(this[0], fb(a)) : fb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(a, b) {
			return this.pushStack(fb.unique(fb.merge(this.get(), fb(a, b))))
		},
		addBack: function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}
	}), fb.each({
		parent: function(a) {
			var b = a.parentNode;
			return b && 11 !== b.nodeType ? b : null
		},
		parents: function(a) {
			return fb.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, c) {
			return fb.dir(a, "parentNode", c)
		},
		next: function(a) {
			return e(a, "nextSibling")
		},
		prev: function(a) {
			return e(a, "previousSibling")
		},
		nextAll: function(a) {
			return fb.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return fb.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, c) {
			return fb.dir(a, "nextSibling", c)
		},
		prevUntil: function(a, b, c) {
			return fb.dir(a, "previousSibling", c)
		},
		siblings: function(a) {
			return fb.sibling((a.parentNode || {}).firstChild, a)
		},
		children: function(a) {
			return fb.sibling(a.firstChild)
		},
		contents: function(a) {
			return fb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : fb.merge([], a.childNodes)
		}
	}, function(a, b) {
		fb.fn[a] = function(c, d) {
			var e = fb.map(this, b, c);
			return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = fb.filter(d, e)), this.length > 1 && (tb[a] || (e = fb.unique(e)), sb.test(a) && (e = e.reverse())), this.pushStack(e)
		}
	});
	var ub = /\S+/g,
		vb = {};
	fb.Callbacks = function(a) {
		a = "string" == typeof a ? vb[a] || f(a) : fb.extend({}, a);
		var b, c, d, e, g, h, i = [],
			j = !a.once && [],
			k = function(f) {
				for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++) if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
					c = !1;
					break
				}
				b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
			}, l = {
				add: function() {
					if (i) {
						var d = i.length;
						! function f(b) {
							fb.each(b, function(b, c) {
								var d = fb.type(c);
								"function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
							})
						}(arguments), b ? e = i.length : c && (h = d, k(c))
					}
					return this
				},
				remove: function() {
					return i && fb.each(arguments, function(a, c) {
						for (var d;
						(d = fb.inArray(c, i, d)) > -1;) i.splice(d, 1), b && (e >= d && e--, g >= d && g--)
					}), this
				},
				has: function(a) {
					return a ? fb.inArray(a, i) > -1 : !(!i || !i.length)
				},
				empty: function() {
					return i = [], e = 0, this
				},
				disable: function() {
					return i = j = c = void 0, this
				},
				disabled: function() {
					return !i
				},
				lock: function() {
					return j = void 0, c || l.disable(), this
				},
				locked: function() {
					return !j
				},
				fireWith: function(a, c) {
					return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this
				},
				fire: function() {
					return l.fireWith(this, arguments), this
				},
				fired: function() {
					return !!d
				}
			};
		return l
	}, fb.extend({
		Deferred: function(a) {
			var b = [
				["resolve", "done", fb.Callbacks("once memory"), "resolved"],
				["reject", "fail", fb.Callbacks("once memory"), "rejected"],
				["notify", "progress", fb.Callbacks("memory")]
			],
				c = "pending",
				d = {
					state: function() {
						return c
					},
					always: function() {
						return e.done(arguments).fail(arguments), this
					},
					then: function() {
						var a = arguments;
						return fb.Deferred(function(c) {
							fb.each(b, function(b, f) {
								var g = fb.isFunction(a[b]) && a[b];
								e[f[1]](function() {
									var a = g && g.apply(this, arguments);
									a && fb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
								})
							}), a = null
						}).promise()
					},
					promise: function(a) {
						return null != a ? fb.extend(a, d) : d
					}
				}, e = {};
			return d.pipe = d.then, fb.each(b, function(a, f) {
				var g = f[2],
					h = f[3];
				d[f[1]] = g.add, h && g.add(function() {
					c = h
				}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
					return e[f[0] + "With"](this === e ? d : this, arguments), this
				}, e[f[0] + "With"] = g.fireWith
			}), d.promise(e), a && a.call(e, e), e
		},
		when: function(a) {
			var b, c, d, e = 0,
				f = X.call(arguments),
				g = f.length,
				h = 1 !== g || a && fb.isFunction(a.promise) ? g : 0,
				i = 1 === h ? a : fb.Deferred(),
				j = function(a, c, d) {
					return function(e) {
						c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
					}
				};
			if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && fb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
			return h || i.resolveWith(d, f), i.promise()
		}
	});
	var wb;
	fb.fn.ready = function(a) {
		return fb.ready.promise().done(a), this
	}, fb.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(a) {
			a ? fb.readyWait++ : fb.ready(!0)
		},
		ready: function(a) {
			if (a === !0 ? !--fb.readyWait : !fb.isReady) {
				if (!pb.body) return setTimeout(fb.ready);
				fb.isReady = !0, a !== !0 && --fb.readyWait > 0 || (wb.resolveWith(pb, [fb]), fb.fn.trigger && fb(pb).trigger("ready").off("ready"))
			}
		}
	}), fb.ready.promise = function(b) {
		if (!wb) if (wb = fb.Deferred(), "complete" === pb.readyState) setTimeout(fb.ready);
		else if (pb.addEventListener) pb.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
		else {
			pb.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
			var c = !1;
			try {
				c = null == a.frameElement && pb.documentElement
			} catch (d) {}
			c && c.doScroll && ! function e() {
				if (!fb.isReady) {
					try {
						c.doScroll("left")
					} catch (a) {
						return setTimeout(e, 50)
					}
					g(), fb.ready()
				}
			}()
		}
		return wb.promise(b)
	};
	var xb, yb = "undefined";
	for (xb in fb(db)) break;
	db.ownLast = "0" !== xb, db.inlineBlockNeedsLayout = !1, fb(function() {
		var a, b, c = pb.getElementsByTagName("body")[0];
		c && (a = pb.createElement("div"), a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", b = pb.createElement("div"), c.appendChild(a).appendChild(b), typeof b.style.zoom !== yb && (b.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (db.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), a = b = null)
	}),
	function() {
		var a = pb.createElement("div");
		if (null == db.deleteExpando) {
			db.deleteExpando = !0;
			try {
				delete a.test
			} catch (b) {
				db.deleteExpando = !1
			}
		}
		a = null
	}(), fb.acceptData = function(a) {
		var b = fb.noData[(a.nodeName + " ").toLowerCase()],
			c = +a.nodeType || 1;
		return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
	};
	var zb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		Ab = /([A-Z])/g;
	fb.extend({
		cache: {},
		noData: {
			"applet ": !0,
			"embed ": !0,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(a) {
			return a = a.nodeType ? fb.cache[a[fb.expando]] : a[fb.expando], !! a && !j(a)
		},
		data: function(a, b, c) {
			return k(a, b, c)
		},
		removeData: function(a, b) {
			return l(a, b)
		},
		_data: function(a, b, c) {
			return k(a, b, c, !0)
		},
		_removeData: function(a, b) {
			return l(a, b, !0)
		}
	}), fb.fn.extend({
		data: function(a, b) {
			var c, d, e, f = this[0],
				g = f && f.attributes;
			if (void 0 === a) {
				if (this.length && (e = fb.data(f), 1 === f.nodeType && !fb._data(f, "parsedAttrs"))) {
					for (c = g.length; c--;) d = g[c].name, 0 === d.indexOf("data-") && (d = fb.camelCase(d.slice(5)), i(f, d, e[d]));
					fb._data(f, "parsedAttrs", !0)
				}
				return e
			}
			return "object" == typeof a ? this.each(function() {
				fb.data(this, a)
			}) : arguments.length > 1 ? this.each(function() {
				fb.data(this, a, b)
			}) : f ? i(f, a, fb.data(f, a)) : void 0
		},
		removeData: function(a) {
			return this.each(function() {
				fb.removeData(this, a)
			})
		}
	}), fb.extend({
		queue: function(a, b, c) {
			var d;
			return a ? (b = (b || "fx") + "queue", d = fb._data(a, b), c && (!d || fb.isArray(c) ? d = fb._data(a, b, fb.makeArray(c)) : d.push(c)), d || []) : void 0
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = fb.queue(a, b),
				d = c.length,
				e = c.shift(),
				f = fb._queueHooks(a, b),
				g = function() {
					fb.dequeue(a, b)
				};
			"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
		},
		_queueHooks: function(a, b) {
			var c = b + "queueHooks";
			return fb._data(a, c) || fb._data(a, c, {
				empty: fb.Callbacks("once memory").add(function() {
					fb._removeData(a, b + "queue"), fb._removeData(a, c)
				})
			})
		}
	}), fb.fn.extend({
		queue: function(a, b) {
			var c = 2;
			return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? fb.queue(this[0], a) : void 0 === b ? this : this.each(function() {
				var c = fb.queue(this, a, b);
				fb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && fb.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				fb.dequeue(this, a)
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, b) {
			var c, d = 1,
				e = fb.Deferred(),
				f = this,
				g = this.length,
				h = function() {
					--d || e.resolveWith(f, [f])
				};
			for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = fb._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
			return h(), e.promise(b)
		}
	});
	var Bb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		Cb = ["Top", "Right", "Bottom", "Left"],
		Db = function(a, b) {
			return a = b || a, "none" === fb.css(a, "display") || !fb.contains(a.ownerDocument, a)
		}, Eb = fb.access = function(a, b, c, d, e, f, g) {
			var h = 0,
				i = a.length,
				j = null == c;
			if ("object" === fb.type(c)) {
				e = !0;
				for (h in c) fb.access(a, b, h, c[h], !0, f, g)
			} else if (void 0 !== d && (e = !0, fb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
				return j.call(fb(a), c)
			})), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
			return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
		}, Fb = /^(?:checkbox|radio)$/i;
	! function() {
		var a = pb.createDocumentFragment(),
			b = pb.createElement("div"),
			c = pb.createElement("input");
		if (b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a>", db.leadingWhitespace = 3 === b.firstChild.nodeType, db.tbody = !b.getElementsByTagName("tbody").length, db.htmlSerialize = !! b.getElementsByTagName("link").length, db.html5Clone = "<:nav></:nav>" !== pb.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, a.appendChild(c), db.appendChecked = c.checked, b.innerHTML = "<textarea>x</textarea>", db.noCloneChecked = !! b.cloneNode(!0).lastChild.defaultValue, a.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", db.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, db.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
			db.noCloneEvent = !1
		}), b.cloneNode(!0).click()), null == db.deleteExpando) {
			db.deleteExpando = !0;
			try {
				delete b.test
			} catch (d) {
				db.deleteExpando = !1
			}
		}
		a = b = c = null
	}(),
	function() {
		var b, c, d = pb.createElement("div");
		for (b in {
			submit: !0,
			change: !0,
			focusin: !0
		}) c = "on" + b, (db[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), db[b + "Bubbles"] = d.attributes[c].expando === !1);
		d = null
	}();
	var Gb = /^(?:input|select|textarea)$/i,
		Hb = /^key/,
		Ib = /^(?:mouse|contextmenu)|click/,
		Jb = /^(?:focusinfocus|focusoutblur)$/,
		Kb = /^([^.]*)(?:\.(.+)|)$/;
	fb.event = {
		global: {},
		add: function(a, b, c, d, e) {
			var f, g, h, i, j, k, l, m, n, o, p, q = fb._data(a);
			if (q) {
				for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = fb.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
					return typeof fb === yb || a && fb.event.triggered === a.type ? void 0 : fb.event.dispatch.apply(k.elem, arguments)
				}, k.elem = a), b = (b || "").match(ub) || [""], h = b.length; h--;) f = Kb.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = fb.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = fb.event.special[n] || {}, l = fb.extend({
					type: n,
					origType: p,
					data: d,
					handler: c,
					guid: c.guid,
					selector: e,
					needsContext: e && fb.expr.match.needsContext.test(e),
					namespace: o.join(".")
				}, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), fb.event.global[n] = !0);
				a = null
			}
		},
		remove: function(a, b, c, d, e) {
			var f, g, h, i, j, k, l, m, n, o, p, q = fb.hasData(a) && fb._data(a);
			if (q && (k = q.events)) {
				for (b = (b || "").match(ub) || [""], j = b.length; j--;) if (h = Kb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
					for (l = fb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
					i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || fb.removeEvent(a, n, q.handle), delete k[n])
				} else for (n in k) fb.event.remove(a, n + b[j], c, d, !0);
				fb.isEmptyObject(k) && (delete q.handle, fb._removeData(a, "events"))
			}
		},
		trigger: function(b, c, d, e) {
			var f, g, h, i, j, k, l, m = [d || pb],
				n = bb.call(b, "type") ? b.type : b,
				o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
			if (h = k = d = d || pb, 3 !== d.nodeType && 8 !== d.nodeType && !Jb.test(n + fb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[fb.expando] ? b : new fb.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : fb.makeArray(c, [b]), j = fb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
				if (!e && !j.noBubble && !fb.isWindow(d)) {
					for (i = j.delegateType || n, Jb.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
					k === (d.ownerDocument || pb) && m.push(k.defaultView || k.parentWindow || a)
				}
				for (l = 0;
				(h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (fb._data(h, "events") || {})[b.type] && fb._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && fb.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
				if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && fb.acceptData(d) && g && d[n] && !fb.isWindow(d)) {
					k = d[g], k && (d[g] = null), fb.event.triggered = n;
					try {
						d[n]()
					} catch (p) {}
					fb.event.triggered = void 0, k && (d[g] = k)
				}
				return b.result
			}
		},
		dispatch: function(a) {
			a = fb.event.fix(a);
			var b, c, d, e, f, g = [],
				h = X.call(arguments),
				i = (fb._data(this, "events") || {})[a.type] || [],
				j = fb.event.special[a.type] || {};
			if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
				for (g = fb.event.handlers.call(this, a, i), b = 0;
				(e = g[b++]) && !a.isPropagationStopped();) for (a.currentTarget = e.elem, f = 0;
				(d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((fb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
				return j.postDispatch && j.postDispatch.call(this, a), a.result
			}
		},
		handlers: function(a, b) {
			var c, d, e, f, g = [],
				h = b.delegateCount,
				i = a.target;
			if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
				for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? fb(c, this).index(i) >= 0 : fb.find(c, this, null, [i]).length), e[c] && e.push(d);
				e.length && g.push({
					elem: i,
					handlers: e
				})
			}
			return h < b.length && g.push({
				elem: this,
				handlers: b.slice(h)
			}), g
		},
		fix: function(a) {
			if (a[fb.expando]) return a;
			var b, c, d, e = a.type,
				f = a,
				g = this.fixHooks[e];
			for (g || (this.fixHooks[e] = g = Ib.test(e) ? this.mouseHooks : Hb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new fb.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
			return a.target || (a.target = f.srcElement || pb), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !! a.metaKey, g.filter ? g.filter(a, f) : a
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(a, b) {
				return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(a, b) {
				var c, d, e, f = b.button,
					g = b.fromElement;
				return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || pb, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== o() && this.focus) try {
						return this.focus(), !1
					} catch (a) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === o() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return fb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
				},
				_default: function(a) {
					return fb.nodeName(a.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(a) {
					void 0 !== a.result && (a.originalEvent.returnValue = a.result)
				}
			}
		},
		simulate: function(a, b, c, d) {
			var e = fb.extend(new fb.Event, c, {
				type: a,
				isSimulated: !0,
				originalEvent: {}
			});
			d ? fb.event.trigger(e, null, b) : fb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
		}
	}, fb.removeEvent = pb.removeEventListener ? function(a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function(a, b, c) {
		var d = "on" + b;
		a.detachEvent && (typeof a[d] === yb && (a[d] = null), a.detachEvent(d, c))
	}, fb.Event = function(a, b) {
		return this instanceof fb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? m : n) : this.type = a, b && fb.extend(this, b), this.timeStamp = a && a.timeStamp || fb.now(), void(this[fb.expando] = !0)) : new fb.Event(a, b)
	}, fb.Event.prototype = {
		isDefaultPrevented: n,
		isPropagationStopped: n,
		isImmediatePropagationStopped: n,
		preventDefault: function() {
			var a = this.originalEvent;
			this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function() {
			var a = this.originalEvent;
			this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = m, this.stopPropagation()
		}
	}, fb.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		fb.event.special[a] = {
			delegateType: b,
			bindType: b,
			handle: function(a) {
				var c, d = this,
					e = a.relatedTarget,
					f = a.handleObj;
				return (!e || e !== d && !fb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
			}
		}
	}), db.submitBubbles || (fb.event.special.submit = {
		setup: function() {
			return fb.nodeName(this, "form") ? !1 : void fb.event.add(this, "click._submit keypress._submit", function(a) {
				var b = a.target,
					c = fb.nodeName(b, "input") || fb.nodeName(b, "button") ? b.form : void 0;
				c && !fb._data(c, "submitBubbles") && (fb.event.add(c, "submit._submit", function(a) {
					a._submit_bubble = !0
				}), fb._data(c, "submitBubbles", !0))
			})
		},
		postDispatch: function(a) {
			a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && fb.event.simulate("submit", this.parentNode, a, !0))
		},
		teardown: function() {
			return fb.nodeName(this, "form") ? !1 : void fb.event.remove(this, "._submit")
		}
	}), db.changeBubbles || (fb.event.special.change = {
		setup: function() {
			return Gb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (fb.event.add(this, "propertychange._change", function(a) {
				"checked" === a.originalEvent.propertyName && (this._just_changed = !0)
			}), fb.event.add(this, "click._change", function(a) {
				this._just_changed && !a.isTrigger && (this._just_changed = !1), fb.event.simulate("change", this, a, !0)
			})), !1) : void fb.event.add(this, "beforeactivate._change", function(a) {
				var b = a.target;
				Gb.test(b.nodeName) && !fb._data(b, "changeBubbles") && (fb.event.add(b, "change._change", function(a) {
					!this.parentNode || a.isSimulated || a.isTrigger || fb.event.simulate("change", this.parentNode, a, !0)
				}), fb._data(b, "changeBubbles", !0))
			})
		},
		handle: function(a) {
			var b = a.target;
			return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function() {
			return fb.event.remove(this, "._change"), !Gb.test(this.nodeName)
		}
	}), db.focusinBubbles || fb.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		var c = function(a) {
			fb.event.simulate(b, a.target, fb.event.fix(a), !0)
		};
		fb.event.special[b] = {
			setup: function() {
				var d = this.ownerDocument || this,
					e = fb._data(d, b);
				e || d.addEventListener(a, c, !0), fb._data(d, b, (e || 0) + 1)
			},
			teardown: function() {
				var d = this.ownerDocument || this,
					e = fb._data(d, b) - 1;
				e ? fb._data(d, b, e) : (d.removeEventListener(a, c, !0), fb._removeData(d, b))
			}
		}
	}), fb.fn.extend({
		on: function(a, b, c, d, e) {
			var f, g;
			if ("object" == typeof a) {
				"string" != typeof b && (c = c || b, b = void 0);
				for (f in a) this.on(f, b, c, a[f], e);
				return this
			}
			if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = n;
			else if (!d) return this;
			return 1 === e && (g = d, d = function(a) {
				return fb().off(a), g.apply(this, arguments)
			}, d.guid = g.guid || (g.guid = fb.guid++)), this.each(function() {
				fb.event.add(this, a, d, c, b)
			})
		},
		one: function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		},
		off: function(a, b, c) {
			var d, e;
			if (a && a.preventDefault && a.handleObj) return d = a.handleObj, fb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
			if ("object" == typeof a) {
				for (e in a) this.off(e, b, a[e]);
				return this
			}
			return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function() {
				fb.event.remove(this, a, c, b)
			})
		},
		trigger: function(a, b) {
			return this.each(function() {
				fb.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			var c = this[0];
			return c ? fb.event.trigger(a, b, c, !0) : void 0
		}
	});
	var Lb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Mb = / jQuery\d+="(?:null|\d+)"/g,
		Nb = new RegExp("<(?:" + Lb + ")[\\s/>]", "i"),
		Ob = /^\s+/,
		Pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Qb = /<([\w:]+)/,
		Rb = /<tbody/i,
		Sb = /<|&#?\w+;/,
		Tb = /<(?:script|style|link)/i,
		Ub = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Vb = /^$|\/(?:java|ecma)script/i,
		Wb = /^true\/(.*)/,
		Xb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		Yb = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: db.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		}, Zb = p(pb),
		$b = Zb.appendChild(pb.createElement("div"));
	Yb.optgroup = Yb.option, Yb.tbody = Yb.tfoot = Yb.colgroup = Yb.caption = Yb.thead, Yb.th = Yb.td, fb.extend({
		clone: function(a, b, c) {
			var d, e, f, g, h, i = fb.contains(a.ownerDocument, a);
			if (db.html5Clone || fb.isXMLDoc(a) || !Nb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : ($b.innerHTML = a.outerHTML, $b.removeChild(f = $b.firstChild)), !(db.noCloneEvent && db.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || fb.isXMLDoc(a))) for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
			if (b) if (c) for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
			else w(a, f);
			return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
		},
		buildFragment: function(a, b, c, d) {
			for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++) if (f = a[o], f || 0 === f) if ("object" === fb.type(f)) fb.merge(n, f.nodeType ? [f] : f);
			else if (Sb.test(f)) {
				for (h = h || m.appendChild(b.createElement("div")), i = (Qb.exec(f) || ["", ""])[1].toLowerCase(), k = Yb[i] || Yb._default, h.innerHTML = k[1] + f.replace(Pb, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
				if (!db.leadingWhitespace && Ob.test(f) && n.push(b.createTextNode(Ob.exec(f)[0])), !db.tbody) for (f = "table" !== i || Rb.test(f) ? "<table>" !== k[1] || Rb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) fb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
				for (fb.merge(n, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
				h = m.lastChild
			} else n.push(b.createTextNode(f));
			for (h && m.removeChild(h), db.appendChecked || fb.grep(q(n, "input"), r), o = 0; f = n[o++];) if ((!d || -1 === fb.inArray(f, d)) && (g = fb.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c)) for (e = 0; f = h[e++];) Vb.test(f.type || "") && c.push(f);
			return h = null, m
		},
		cleanData: function(a, b) {
			for (var c, d, e, f, g = 0, h = fb.expando, i = fb.cache, j = db.deleteExpando, k = fb.event.special; null != (c = a[g]); g++) if ((b || fb.acceptData(c)) && (e = c[h], f = e && i[e])) {
				if (f.events) for (d in f.events) k[d] ? fb.event.remove(c, d) : fb.removeEvent(c, d, f.handle);
				i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== yb ? c.removeAttribute(h) : c[h] = null, W.push(e))
			}
		}
	}), fb.fn.extend({
		text: function(a) {
			return Eb(this, function(a) {
				return void 0 === a ? fb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pb).createTextNode(a))
			}, null, a, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(a) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var b = s(this, a);
					b.appendChild(a)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(a) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var b = s(this, a);
					b.insertBefore(a, b.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(a) {
				this.parentNode && this.parentNode.insertBefore(a, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(a) {
				this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
			})
		},
		remove: function(a, b) {
			for (var c, d = a ? fb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || fb.cleanData(q(c)), c.parentNode && (b && fb.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
			return this
		},
		empty: function() {
			for (var a, b = 0; null != (a = this[b]); b++) {
				for (1 === a.nodeType && fb.cleanData(q(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
				a.options && fb.nodeName(a, "select") && (a.options.length = 0)
			}
			return this
		},
		clone: function(a, b) {
			return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
				return fb.clone(this, a, b)
			})
		},
		html: function(a) {
			return Eb(this, function(a) {
				var b = this[0] || {}, c = 0,
					d = this.length;
				if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(Mb, "") : void 0;
				if (!("string" != typeof a || Tb.test(a) || !db.htmlSerialize && Nb.test(a) || !db.leadingWhitespace && Ob.test(a) || Yb[(Qb.exec(a) || ["", ""])[1].toLowerCase()])) {
					a = a.replace(Pb, "<$1></$2>");
					try {
						for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (fb.cleanData(q(b, !1)), b.innerHTML = a);
						b = 0
					} catch (e) {}
				}
				b && this.empty().append(a)
			}, null, a, arguments.length)
		},
		replaceWith: function() {
			var a = arguments[0];
			return this.domManip(arguments, function(b) {
				a = this.parentNode, fb.cleanData(q(this)), a && a.replaceChild(b, this)
			}), a && (a.length || a.nodeType) ? this : this.remove()
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, b) {
			a = Y.apply([], a);
			var c, d, e, f, g, h, i = 0,
				j = this.length,
				k = this,
				l = j - 1,
				m = a[0],
				n = fb.isFunction(m);
			if (n || j > 1 && "string" == typeof m && !db.checkClone && Ub.test(m)) return this.each(function(c) {
				var d = k.eq(c);
				n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
			});
			if (j && (h = fb.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
				for (f = fb.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = fb.clone(d, !0, !0), e && fb.merge(f, q(d, "script"))), b.call(this[i], d, i);
				if (e) for (g = f[f.length - 1].ownerDocument, fb.map(f, u), i = 0; e > i; i++) d = f[i], Vb.test(d.type || "") && !fb._data(d, "globalEval") && fb.contains(g, d) && (d.src ? fb._evalUrl && fb._evalUrl(d.src) : fb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Xb, "")));
				h = c = null
			}
			return this
		}
	}), fb.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		fb.fn[a] = function(a) {
			for (var c, d = 0, e = [], f = fb(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), fb(f[d])[b](c), Z.apply(e, c.get());
			return this.pushStack(e)
		}
	});
	var _b, ac = {};
	! function() {
		var a, b, c = pb.createElement("div"),
			d = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
		c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], a.style.cssText = "float:left;opacity:.5", db.opacity = /^0.5/.test(a.style.opacity), db.cssFloat = !! a.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", db.clearCloneStyle = "content-box" === c.style.backgroundClip, a = c = null, db.shrinkWrapBlocks = function() {
			var a, c, e, f;
			if (null == b) {
				if (a = pb.getElementsByTagName("body")[0], !a) return;
				f = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", c = pb.createElement("div"), e = pb.createElement("div"), a.appendChild(c).appendChild(e), b = !1, typeof e.style.zoom !== yb && (e.style.cssText = d + ";width:1px;padding:1px;zoom:1", e.innerHTML = "<div></div>", e.firstChild.style.width = "5px", b = 3 !== e.offsetWidth), a.removeChild(c), a = c = e = null
			}
			return b
		}
	}();
	var bc, cc, dc = /^margin/,
		ec = new RegExp("^(" + Bb + ")(?!px)[a-z%]+$", "i"),
		fc = /^(top|right|bottom|left)$/;
	a.getComputedStyle ? (bc = function(a) {
		return a.ownerDocument.defaultView.getComputedStyle(a, null)
	}, cc = function(a, b, c) {
		var d, e, f, g, h = a.style;
		return c = c || bc(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || fb.contains(a.ownerDocument, a) || (g = fb.style(a, b)), ec.test(g) && dc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
	}) : pb.documentElement.currentStyle && (bc = function(a) {
		return a.currentStyle
	}, cc = function(a, b, c) {
		var d, e, f, g, h = a.style;
		return c = c || bc(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), ec.test(g) && !fc.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
	}), ! function() {
		function b() {
			var b, c, d = pb.getElementsByTagName("body")[0];
			d && (b = pb.createElement("div"), c = pb.createElement("div"), b.style.cssText = j, d.appendChild(b).appendChild(c), c.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", fb.swap(d, null != d.style.zoom ? {
				zoom: 1
			} : {}, function() {
				e = 4 === c.offsetWidth
			}), f = !0, g = !1, h = !0, a.getComputedStyle && (g = "1%" !== (a.getComputedStyle(c, null) || {}).top, f = "4px" === (a.getComputedStyle(c, null) || {
				width: "4px"
			}).width), d.removeChild(b), c = d = null)
		}
		var c, d, e, f, g, h, i = pb.createElement("div"),
			j = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
			k = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
		i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = i.getElementsByTagName("a")[0], c.style.cssText = "float:left;opacity:.5", db.opacity = /^0.5/.test(c.style.opacity), db.cssFloat = !! c.style.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", db.clearCloneStyle = "content-box" === i.style.backgroundClip, c = i = null, fb.extend(db, {
			reliableHiddenOffsets: function() {
				if (null != d) return d;
				var a, b, c, e = pb.createElement("div"),
					f = pb.getElementsByTagName("body")[0];
				return f ? (e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = pb.createElement("div"), a.style.cssText = j, f.appendChild(a).appendChild(e), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", b = e.getElementsByTagName("td"), b[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === b[0].offsetHeight, b[0].style.display = "", b[1].style.display = "none", d = c && 0 === b[0].offsetHeight, f.removeChild(a), e = f = null, d) : void 0
			},
			boxSizing: function() {
				return null == e && b(), e
			},
			boxSizingReliable: function() {
				return null == f && b(), f
			},
			pixelPosition: function() {
				return null == g && b(), g
			},
			reliableMarginRight: function() {
				var b, c, d, e;
				if (null == h && a.getComputedStyle) {
					if (b = pb.getElementsByTagName("body")[0], !b) return;
					c = pb.createElement("div"), d = pb.createElement("div"), c.style.cssText = j, b.appendChild(c).appendChild(d), e = d.appendChild(pb.createElement("div")), e.style.cssText = d.style.cssText = k, e.style.marginRight = e.style.width = "0", d.style.width = "1px", h = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), b.removeChild(c)
				}
				return h
			}
		})
	}(), fb.swap = function(a, b, c, d) {
		var e, f, g = {};
		for (f in b) g[f] = a.style[f], a.style[f] = b[f];
		e = c.apply(a, d || []);
		for (f in b) a.style[f] = g[f];
		return e
	};
	var gc = /alpha\([^)]*\)/i,
		hc = /opacity\s*=\s*([^)]*)/,
		ic = /^(none|table(?!-c[ea]).+)/,
		jc = new RegExp("^(" + Bb + ")(.*)$", "i"),
		kc = new RegExp("^([+-])=(" + Bb + ")", "i"),
		lc = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		}, mc = {
			letterSpacing: 0,
			fontWeight: 400
		}, nc = ["Webkit", "O", "Moz", "ms"];
	fb.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var c = cc(a, "opacity");
						return "" === c ? "1" : c
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": db.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, b, c, d) {
			if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
				var e, f, g, h = fb.camelCase(b),
					i = a.style;
				if (b = fb.cssProps[h] || (fb.cssProps[h] = B(i, h)), g = fb.cssHooks[b] || fb.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
				if (f = typeof c, "string" === f && (e = kc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(fb.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || fb.cssNumber[h] || (c += "px"), db.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
					i[b] = "", i[b] = c
				} catch (j) {}
			}
		},
		css: function(a, b, c, d) {
			var e, f, g, h = fb.camelCase(b);
			return b = fb.cssProps[h] || (fb.cssProps[h] = B(a.style, h)), g = fb.cssHooks[b] || fb.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = cc(a, b, d)), "normal" === f && b in mc && (f = mc[b]), "" === c || c ? (e = parseFloat(f), c === !0 || fb.isNumeric(e) ? e || 0 : f) : f
		}
	}), fb.each(["height", "width"], function(a, b) {
		fb.cssHooks[b] = {
			get: function(a, c, d) {
				return c ? 0 === a.offsetWidth && ic.test(fb.css(a, "display")) ? fb.swap(a, lc, function() {
					return F(a, b, d)
				}) : F(a, b, d) : void 0
			},
			set: function(a, c, d) {
				var e = d && bc(a);
				return D(a, c, d ? E(a, b, d, db.boxSizing() && "border-box" === fb.css(a, "boxSizing", !1, e), e) : 0)
			}
		}
	}), db.opacity || (fb.cssHooks.opacity = {
		get: function(a, b) {
			return hc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var c = a.style,
				d = a.currentStyle,
				e = fb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
				f = d && d.filter || c.filter || "";
			c.zoom = 1, (b >= 1 || "" === b) && "" === fb.trim(f.replace(gc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = gc.test(f) ? f.replace(gc, e) : f + " " + e)
		}
	}), fb.cssHooks.marginRight = A(db.reliableMarginRight, function(a, b) {
		return b ? fb.swap(a, {
			display: "inline-block"
		}, cc, [a, "marginRight"]) : void 0
	}), fb.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(a, b) {
		fb.cssHooks[a + b] = {
			expand: function(c) {
				for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Cb[d] + b] = f[d] || f[d - 2] || f[0];
				return e
			}
		}, dc.test(a) || (fb.cssHooks[a + b].set = D)
	}), fb.fn.extend({
		css: function(a, b) {
			return Eb(this, function(a, b, c) {
				var d, e, f = {}, g = 0;
				if (fb.isArray(b)) {
					for (d = bc(a), e = b.length; e > g; g++) f[b[g]] = fb.css(a, b[g], !1, d);
					return f
				}
				return void 0 !== c ? fb.style(a, b, c) : fb.css(a, b)
			}, a, b, arguments.length > 1)
		},
		show: function() {
			return C(this, !0)
		},
		hide: function() {
			return C(this)
		},
		toggle: function(a) {
			return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
				Db(this) ? fb(this).show() : fb(this).hide()
			})
		}
	}), fb.Tween = G, G.prototype = {
		constructor: G,
		init: function(a, b, c, d, e, f) {
			this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (fb.cssNumber[c] ? "" : "px")
		},
		cur: function() {
			var a = G.propHooks[this.prop];
			return a && a.get ? a.get(this) : G.propHooks._default.get(this)
		},
		run: function(a) {
			var b, c = G.propHooks[this.prop];
			return this.pos = b = this.options.duration ? fb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
		}
	}, G.prototype.init.prototype = G.prototype, G.propHooks = {
		_default: {
			get: function(a) {
				var b;
				return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = fb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
			},
			set: function(a) {
				fb.fx.step[a.prop] ? fb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[fb.cssProps[a.prop]] || fb.cssHooks[a.prop]) ? fb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
			}
		}
	}, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
		set: function(a) {
			a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
		}
	}, fb.easing = {
		linear: function(a) {
			return a
		},
		swing: function(a) {
			return .5 - Math.cos(a * Math.PI) / 2
		}
	}, fb.fx = G.prototype.init, fb.fx.step = {};
	var oc, pc, qc = /^(?:toggle|show|hide)$/,
		rc = new RegExp("^(?:([+-])=|)(" + Bb + ")([a-z%]*)$", "i"),
		sc = /queueHooks$/,
		tc = [K],
		uc = {
			"*": [function(a, b) {
				var c = this.createTween(a, b),
					d = c.cur(),
					e = rc.exec(b),
					f = e && e[3] || (fb.cssNumber[a] ? "" : "px"),
					g = (fb.cssNumber[a] || "px" !== f && +d) && rc.exec(fb.css(c.elem, a)),
					h = 1,
					i = 20;
				if (g && g[3] !== f) {
					f = f || g[3], e = e || [], g = +d || 1;
					do h = h || ".5", g /= h, fb.style(c.elem, a, g + f);
					while (h !== (h = c.cur() / d) && 1 !== h && --i)
				}
				return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
			}]
		};
	fb.Animation = fb.extend(M, {
		tweener: function(a, b) {
			fb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
			for (var c, d = 0, e = a.length; e > d; d++) c = a[d], uc[c] = uc[c] || [], uc[c].unshift(b)
		},
		prefilter: function(a, b) {
			b ? tc.unshift(a) : tc.push(a)
		}
	}), fb.speed = function(a, b, c) {
		var d = a && "object" == typeof a ? fb.extend({}, a) : {
			complete: c || !c && b || fb.isFunction(a) && a,
			duration: a,
			easing: c && b || b && !fb.isFunction(b) && b
		};
		return d.duration = fb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in fb.fx.speeds ? fb.fx.speeds[d.duration] : fb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
			fb.isFunction(d.old) && d.old.call(this), d.queue && fb.dequeue(this, d.queue)
		}, d
	}, fb.fn.extend({
		fadeTo: function(a, b, c, d) {
			return this.filter(Db).css("opacity", 0).show().end().animate({
				opacity: b
			}, a, c, d)
		},
		animate: function(a, b, c, d) {
			var e = fb.isEmptyObject(a),
				f = fb.speed(b, c, d),
				g = function() {
					var b = M(this, fb.extend({}, a), f);
					(e || fb._data(this, "finish")) && b.stop(!0)
				};
			return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
		},
		stop: function(a, b, c) {
			var d = function(a) {
				var b = a.stop;
				delete a.stop, b(c)
			};
			return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
				var b = !0,
					e = null != a && a + "queueHooks",
					f = fb.timers,
					g = fb._data(this);
				if (e) g[e] && g[e].stop && d(g[e]);
				else for (e in g) g[e] && g[e].stop && sc.test(e) && d(g[e]);
				for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
				(b || !c) && fb.dequeue(this, a)
			})
		},
		finish: function(a) {
			return a !== !1 && (a = a || "fx"), this.each(function() {
				var b, c = fb._data(this),
					d = c[a + "queue"],
					e = c[a + "queueHooks"],
					f = fb.timers,
					g = d ? d.length : 0;
				for (c.finish = !0, fb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
				for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
				delete c.finish
			})
		}
	}), fb.each(["toggle", "show", "hide"], function(a, b) {
		var c = fb.fn[b];
		fb.fn[b] = function(a, d, e) {
			return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
		}
	}), fb.each({
		slideDown: I("show"),
		slideUp: I("hide"),
		slideToggle: I("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		fb.fn[a] = function(a, c, d) {
			return this.animate(b, a, c, d)
		}
	}), fb.timers = [], fb.fx.tick = function() {
		var a, b = fb.timers,
			c = 0;
		for (oc = fb.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
		b.length || fb.fx.stop(), oc = void 0
	}, fb.fx.timer = function(a) {
		fb.timers.push(a), a() ? fb.fx.start() : fb.timers.pop()
	}, fb.fx.interval = 13, fb.fx.start = function() {
		pc || (pc = setInterval(fb.fx.tick, fb.fx.interval))
	}, fb.fx.stop = function() {
		clearInterval(pc), pc = null
	}, fb.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, fb.fn.delay = function(a, b) {
		return a = fb.fx ? fb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
			var d = setTimeout(b, a);
			c.stop = function() {
				clearTimeout(d)
			}
		})
	},
	function() {
		var a, b, c, d, e = pb.createElement("div");
		e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = e.getElementsByTagName("a")[0], c = pb.createElement("select"), d = c.appendChild(pb.createElement("option")), b = e.getElementsByTagName("input")[0], a.style.cssText = "top:1px", db.getSetAttribute = "t" !== e.className, db.style = /top/.test(a.getAttribute("style")), db.hrefNormalized = "/a" === a.getAttribute("href"), db.checkOn = !! b.value, db.optSelected = d.selected, db.enctype = !! pb.createElement("form").enctype, c.disabled = !0, db.optDisabled = !d.disabled, b = pb.createElement("input"), b.setAttribute("value", ""), db.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), db.radioValue = "t" === b.value, a = b = c = d = e = null
	}();
	var vc = /\r/g;
	fb.fn.extend({
		val: function(a) {
			var b, c, d, e = this[0];
			return arguments.length ? (d = fb.isFunction(a), this.each(function(c) {
				var e;
				1 === this.nodeType && (e = d ? a.call(this, c, fb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : fb.isArray(e) && (e = fb.map(e, function(a) {
					return null == a ? "" : a + ""
				})), b = fb.valHooks[this.type] || fb.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
			})) : e ? (b = fb.valHooks[e.type] || fb.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(vc, "") : null == c ? "" : c)) : void 0
		}
	}), fb.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = fb.find.attr(a, "value");
					return null != b ? b : fb.text(a)
				}
			},
			select: {
				get: function(a) {
					for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (db.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && fb.nodeName(c.parentNode, "optgroup"))) {
						if (b = fb(c).val(), f) return b;
						g.push(b)
					}
					return g
				},
				set: function(a, b) {
					for (var c, d, e = a.options, f = fb.makeArray(b), g = e.length; g--;) if (d = e[g], fb.inArray(fb.valHooks.option.get(d), f) >= 0) try {
						d.selected = c = !0
					} catch (h) {
						d.scrollHeight
					} else d.selected = !1;
					return c || (a.selectedIndex = -1), e
				}
			}
		}
	}), fb.each(["radio", "checkbox"], function() {
		fb.valHooks[this] = {
			set: function(a, b) {
				return fb.isArray(b) ? a.checked = fb.inArray(fb(a).val(), b) >= 0 : void 0
			}
		}, db.checkOn || (fb.valHooks[this].get = function(a) {
			return null === a.getAttribute("value") ? "on" : a.value
		})
	});
	var wc, xc, yc = fb.expr.attrHandle,
		zc = /^(?:checked|selected)$/i,
		Ac = db.getSetAttribute,
		Bc = db.input;
	fb.fn.extend({
		attr: function(a, b) {
			return Eb(this, fb.attr, a, b, arguments.length > 1)
		},
		removeAttr: function(a) {
			return this.each(function() {
				fb.removeAttr(this, a)
			})
		}
	}), fb.extend({
		attr: function(a, b, c) {
			var d, e, f = a.nodeType;
			return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === yb ? fb.prop(a, b, c) : (1 === f && fb.isXMLDoc(a) || (b = b.toLowerCase(), d = fb.attrHooks[b] || (fb.expr.match.bool.test(b) ? xc : wc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = fb.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void fb.removeAttr(a, b)) : void 0
		},
		removeAttr: function(a, b) {
			var c, d, e = 0,
				f = b && b.match(ub);
			if (f && 1 === a.nodeType) for (; c = f[e++];) d = fb.propFix[c] || c, fb.expr.match.bool.test(c) ? Bc && Ac || !zc.test(c) ? a[d] = !1 : a[fb.camelCase("default-" + c)] = a[d] = !1 : fb.attr(a, c, ""), a.removeAttribute(Ac ? c : d)
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (!db.radioValue && "radio" === b && fb.nodeName(a, "input")) {
						var c = a.value;
						return a.setAttribute("type", b), c && (a.value = c), b
					}
				}
			}
		}
	}), xc = {
		set: function(a, b, c) {
			return b === !1 ? fb.removeAttr(a, c) : Bc && Ac || !zc.test(c) ? a.setAttribute(!Ac && fb.propFix[c] || c, c) : a[fb.camelCase("default-" + c)] = a[c] = !0, c
		}
	}, fb.each(fb.expr.match.bool.source.match(/\w+/g), function(a, b) {
		var c = yc[b] || fb.find.attr;
		yc[b] = Bc && Ac || !zc.test(b) ? function(a, b, d) {
			var e, f;
			return d || (f = yc[b], yc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, yc[b] = f), e
		} : function(a, b, c) {
			return c ? void 0 : a[fb.camelCase("default-" + b)] ? b.toLowerCase() : null
		}
	}), Bc && Ac || (fb.attrHooks.value = {
		set: function(a, b, c) {
			return fb.nodeName(a, "input") ? void(a.defaultValue = b) : wc && wc.set(a, b, c)
		}
	}), Ac || (wc = {
		set: function(a, b, c) {
			var d = a.getAttributeNode(c);
			return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
		}
	}, yc.id = yc.name = yc.coords = function(a, b, c) {
		var d;
		return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
	}, fb.valHooks.button = {
		get: function(a, b) {
			var c = a.getAttributeNode(b);
			return c && c.specified ? c.value : void 0
		},
		set: wc.set
	}, fb.attrHooks.contenteditable = {
		set: function(a, b, c) {
			wc.set(a, "" === b ? !1 : b, c)
		}
	}, fb.each(["width", "height"], function(a, b) {
		fb.attrHooks[b] = {
			set: function(a, c) {
				return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
			}
		}
	})), db.style || (fb.attrHooks.style = {
		get: function(a) {
			return a.style.cssText || void 0
		},
		set: function(a, b) {
			return a.style.cssText = b + ""
		}
	});
	var Cc = /^(?:input|select|textarea|button|object)$/i,
		Dc = /^(?:a|area)$/i;
	fb.fn.extend({
		prop: function(a, b) {
			return Eb(this, fb.prop, a, b, arguments.length > 1)
		},
		removeProp: function(a) {
			return a = fb.propFix[a] || a, this.each(function() {
				try {
					this[a] = void 0, delete this[a]
				} catch (b) {}
			})
		}
	}), fb.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(a, b, c) {
			var d, e, f, g = a.nodeType;
			return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !fb.isXMLDoc(a), f && (b = fb.propFix[b] || b, e = fb.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var b = fb.find.attr(a, "tabindex");
					return b ? parseInt(b, 10) : Cc.test(a.nodeName) || Dc.test(a.nodeName) && a.href ? 0 : -1
				}
			}
		}
	}), db.hrefNormalized || fb.each(["href", "src"], function(a, b) {
		fb.propHooks[b] = {
			get: function(a) {
				return a.getAttribute(b, 4)
			}
		}
	}), db.optSelected || (fb.propHooks.selected = {
		get: function(a) {
			var b = a.parentNode;
			return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
		}
	}), fb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		fb.propFix[this.toLowerCase()] = this
	}), db.enctype || (fb.propFix.enctype = "encoding");
	var Ec = /[\t\r\n\f]/g;
	fb.fn.extend({
		addClass: function(a) {
			var b, c, d, e, f, g, h = 0,
				i = this.length,
				j = "string" == typeof a && a;
			if (fb.isFunction(a)) return this.each(function(b) {
				fb(this).addClass(a.call(this, b, this.className))
			});
			if (j) for (b = (a || "").match(ub) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ec, " ") : " ")) {
				for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
				g = fb.trim(d), c.className !== g && (c.className = g)
			}
			return this
		},
		removeClass: function(a) {
			var b, c, d, e, f, g, h = 0,
				i = this.length,
				j = 0 === arguments.length || "string" == typeof a && a;
			if (fb.isFunction(a)) return this.each(function(b) {
				fb(this).removeClass(a.call(this, b, this.className))
			});
			if (j) for (b = (a || "").match(ub) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ec, " ") : "")) {
				for (f = 0; e = b[f++];) for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
				g = a ? fb.trim(d) : "", c.className !== g && (c.className = g)
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a;
			return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(fb.isFunction(a) ? function(c) {
				fb(this).toggleClass(a.call(this, c, this.className, b), b)
			} : function() {
				if ("string" === c) for (var b, d = 0, e = fb(this), f = a.match(ub) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
				else(c === yb || "boolean" === c) && (this.className && fb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : fb._data(this, "__className__") || "")
			})
		},
		hasClass: function(a) {
			for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Ec, " ").indexOf(b) >= 0) return !0;
			return !1
		}
	}), fb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
		fb.fn[b] = function(a, c) {
			return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		}
	}), fb.fn.extend({
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		},
		bind: function(a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind: function(a, b) {
			return this.off(a, null, b)
		},
		delegate: function(a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate: function(a, b, c) {
			return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
		}
	});
	var Fc = fb.now(),
		Gc = /\?/,
		Hc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	fb.parseJSON = function(b) {
		if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
		var c, d = null,
			e = fb.trim(b + "");
		return e && !fb.trim(e.replace(Hc, function(a, b, e, f) {
			return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
		})) ? Function("return " + e)() : fb.error("Invalid JSON: " + b)
	}, fb.parseXML = function(b) {
		var c, d;
		if (!b || "string" != typeof b) return null;
		try {
			a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
		} catch (e) {
			c = void 0
		}
		return c && c.documentElement && !c.getElementsByTagName("parsererror").length || fb.error("Invalid XML: " + b), c
	};
	var Ic, Jc, Kc = /#.*$/,
		Lc = /([?&])_=[^&]*/,
		Mc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Nc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Oc = /^(?:GET|HEAD)$/,
		Pc = /^\/\//,
		Qc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		Rc = {}, Sc = {}, Tc = "*/".concat("*");
	try {
		Jc = location.href
	} catch (Uc) {
		Jc = pb.createElement("a"), Jc.href = "", Jc = Jc.href
	}
	Ic = Qc.exec(Jc.toLowerCase()) || [], fb.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Jc,
			type: "GET",
			isLocal: Nc.test(Ic[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Tc,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": fb.parseJSON,
				"text xml": fb.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(a, b) {
			return b ? P(P(a, fb.ajaxSettings), b) : P(fb.ajaxSettings, a)
		},
		ajaxPrefilter: N(Rc),
		ajaxTransport: N(Sc),
		ajax: function(a, b) {
			function c(a, b, c, d) {
				var e, k, r, s, u, w = b;
				2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (fb.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (fb.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --fb.active || fb.event.trigger("ajaxStop")))
			}
			"object" == typeof a && (b = a, a = void 0), b = b || {};
			var d, e, f, g, h, i, j, k, l = fb.ajaxSetup({}, b),
				m = l.context || l,
				n = l.context && (m.nodeType || m.jquery) ? fb(m) : fb.event,
				o = fb.Deferred(),
				p = fb.Callbacks("once memory"),
				q = l.statusCode || {}, r = {}, s = {}, t = 0,
				u = "canceled",
				v = {
					readyState: 0,
					getResponseHeader: function(a) {
						var b;
						if (2 === t) {
							if (!k) for (k = {}; b = Mc.exec(g);) k[b[1].toLowerCase()] = b[2];
							b = k[a.toLowerCase()]
						}
						return null == b ? null : b
					},
					getAllResponseHeaders: function() {
						return 2 === t ? g : null
					},
					setRequestHeader: function(a, b) {
						var c = a.toLowerCase();
						return t || (a = s[c] = s[c] || a, r[a] = b), this
					},
					overrideMimeType: function(a) {
						return t || (l.mimeType = a), this
					},
					statusCode: function(a) {
						var b;
						if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]];
						else v.always(a[v.status]);
						return this
					},
					abort: function(a) {
						var b = a || u;
						return j && j.abort(b), c(0, b), this
					}
				};
			if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Jc) + "").replace(Kc, "").replace(Pc, Ic[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = fb.trim(l.dataType || "*").toLowerCase().match(ub) || [""], null == l.crossDomain && (d = Qc.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Ic[1] && d[2] === Ic[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Ic[3] || ("http:" === Ic[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = fb.param(l.data, l.traditional)), O(Rc, l, b, v), 2 === t) return v;
			i = l.global, i && 0 === fb.active++ && fb.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Oc.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Gc.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Lc.test(f) ? f.replace(Lc, "$1_=" + Fc++) : f + (Gc.test(f) ? "&" : "?") + "_=" + Fc++)), l.ifModified && (fb.lastModified[f] && v.setRequestHeader("If-Modified-Since", fb.lastModified[f]), fb.etag[f] && v.setRequestHeader("If-None-Match", fb.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Tc + "; q=0.01" : "") : l.accepts["*"]);
			for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
			if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
			u = "abort";
			for (e in {
				success: 1,
				error: 1,
				complete: 1
			}) v[e](l[e]);
			if (j = O(Sc, l, b, v)) {
				v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
					v.abort("timeout")
				}, l.timeout));
				try {
					t = 1, j.send(r, c)
				} catch (w) {
					if (!(2 > t)) throw w;
					c(-1, w)
				}
			} else c(-1, "No Transport");
			return v
		},
		getJSON: function(a, b, c) {
			return fb.get(a, b, c, "json")
		},
		getScript: function(a, b) {
			return fb.get(a, void 0, b, "script")
		}
	}), fb.each(["get", "post"], function(a, b) {
		fb[b] = function(a, c, d, e) {
			return fb.isFunction(c) && (e = e || d, d = c, c = void 0), fb.ajax({
				url: a,
				type: b,
				dataType: e,
				data: c,
				success: d
			})
		}
	}), fb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
		fb.fn[b] = function(a) {
			return this.on(b, a)
		}
	}), fb._evalUrl = function(a) {
		return fb.ajax({
			url: a,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	}, fb.fn.extend({
		wrapAll: function(a) {
			if (fb.isFunction(a)) return this.each(function(b) {
				fb(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = fb(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
					for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			return this.each(fb.isFunction(a) ? function(b) {
				fb(this).wrapInner(a.call(this, b))
			} : function() {
				var b = fb(this),
					c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = fb.isFunction(a);
			return this.each(function(c) {
				fb(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				fb.nodeName(this, "body") || fb(this).replaceWith(this.childNodes)
			}).end()
		}
	}), fb.expr.filters.hidden = function(a) {
		return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !db.reliableHiddenOffsets() && "none" === (a.style && a.style.display || fb.css(a, "display"))
	}, fb.expr.filters.visible = function(a) {
		return !fb.expr.filters.hidden(a)
	};
	var Vc = /%20/g,
		Wc = /\[\]$/,
		Xc = /\r?\n/g,
		Yc = /^(?:submit|button|image|reset|file)$/i,
		Zc = /^(?:input|select|textarea|keygen)/i;
	fb.param = function(a, b) {
		var c, d = [],
			e = function(a, b) {
				b = fb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
			};
		if (void 0 === b && (b = fb.ajaxSettings && fb.ajaxSettings.traditional), fb.isArray(a) || a.jquery && !fb.isPlainObject(a)) fb.each(a, function() {
			e(this.name, this.value)
		});
		else for (c in a) S(c, a[c], b, e);
		return d.join("&").replace(Vc, "+")
	}, fb.fn.extend({
		serialize: function() {
			return fb.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var a = fb.prop(this, "elements");
				return a ? fb.makeArray(a) : this
			}).filter(function() {
				var a = this.type;
				return this.name && !fb(this).is(":disabled") && Zc.test(this.nodeName) && !Yc.test(a) && (this.checked || !Fb.test(a))
			}).map(function(a, b) {
				var c = fb(this).val();
				return null == c ? null : fb.isArray(c) ? fb.map(c, function(a) {
					return {
						name: b.name,
						value: a.replace(Xc, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(Xc, "\r\n")
				}
			}).get()
		}
	}), fb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
		return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
	} : T;
	var $c = 0,
		_c = {}, ad = fb.ajaxSettings.xhr();
	a.ActiveXObject && fb(a).on("unload", function() {
		for (var a in _c) _c[a](void 0, !0)
	}), db.cors = !! ad && "withCredentials" in ad, ad = db.ajax = !! ad, ad && fb.ajaxTransport(function(a) {
		if (!a.crossDomain || db.cors) {
			var b;
			return {
				send: function(c, d) {
					var e, f = a.xhr(),
						g = ++$c;
					if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
					a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
					for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
					f.send(a.hasContent && a.data || null), b = function(c, e) {
						var h, i, j;
						if (b && (e || 4 === f.readyState)) if (delete _c[g], b = void 0, f.onreadystatechange = fb.noop, e) 4 !== f.readyState && f.abort();
						else {
							j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
							try {
								i = f.statusText
							} catch (k) {
								i = ""
							}
							h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
						}
						j && d(h, i, j, f.getAllResponseHeaders())
					}, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = _c[g] = b : b()
				},
				abort: function() {
					b && b(void 0, !0)
				}
			}
		}
	}), fb.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(a) {
				return fb.globalEval(a), a
			}
		}
	}), fb.ajaxPrefilter("script", function(a) {
		void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), fb.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var b, c = pb.head || fb("head")[0] || pb.documentElement;
			return {
				send: function(d, e) {
					b = pb.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
						(c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
					}, c.insertBefore(b, c.firstChild)
				},
				abort: function() {
					b && b.onload(void 0, !0)
				}
			}
		}
	});
	var bd = [],
		cd = /(=)\?(?=&|$)|\?\?/;
	fb.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var a = bd.pop() || fb.expando + "_" + Fc++;
			return this[a] = !0, a
		}
	}), fb.ajaxPrefilter("json jsonp", function(b, c, d) {
		var e, f, g, h = b.jsonp !== !1 && (cd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && cd.test(b.data) && "data");
		return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = fb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(cd, "$1" + e) : b.jsonp !== !1 && (b.url += (Gc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
			return g || fb.error(e + " was not called"), g[0]
		}, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
			g = arguments
		}, d.always(function() {
			a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, bd.push(e)), g && fb.isFunction(f) && f(g[0]), g = f = void 0
		}), "script") : void 0
	}), fb.parseHTML = function(a, b, c) {
		if (!a || "string" != typeof a) return null;
		"boolean" == typeof b && (c = b, b = !1), b = b || pb;
		var d = mb.exec(a),
			e = !c && [];
		return d ? [b.createElement(d[1])] : (d = fb.buildFragment([a], b, e), e && e.length && fb(e).remove(), fb.merge([], d.childNodes))
	};
	var dd = fb.fn.load;
	fb.fn.load = function(a, b, c) {
		if ("string" != typeof a && dd) return dd.apply(this, arguments);
		var d, e, f, g = this,
			h = a.indexOf(" ");
		return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), fb.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && fb.ajax({
			url: a,
			type: f,
			dataType: "html",
			data: b
		}).done(function(a) {
			e = arguments, g.html(d ? fb("<div>").append(fb.parseHTML(a)).find(d) : a)
		}).complete(c && function(a, b) {
			g.each(c, e || [a.responseText, b, a])
		}), this
	}, fb.expr.filters.animated = function(a) {
		return fb.grep(fb.timers, function(b) {
			return a === b.elem
		}).length
	};
	var ed = a.document.documentElement;
	fb.offset = {
		setOffset: function(a, b, c) {
			var d, e, f, g, h, i, j, k = fb.css(a, "position"),
				l = fb(a),
				m = {};
			"static" === k && (a.style.position = "relative"), h = l.offset(), f = fb.css(a, "top"), i = fb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && fb.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), fb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
		}
	}, fb.fn.extend({
		offset: function(a) {
			if (arguments.length) return void 0 === a ? this : this.each(function(b) {
				fb.offset.setOffset(this, a, b)
			});
			var b, c, d = {
				top: 0,
				left: 0
			}, e = this[0],
				f = e && e.ownerDocument;
			return f ? (b = f.documentElement, fb.contains(b, e) ? (typeof e.getBoundingClientRect !== yb && (d = e.getBoundingClientRect()), c = V(f), {
				top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
				left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
			}) : d) : void 0
		},
		position: function() {
			if (this[0]) {
				var a, b, c = {
					top: 0,
					left: 0
				}, d = this[0];
				return "fixed" === fb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), fb.nodeName(a[0], "html") || (c = a.offset()), c.top += fb.css(a[0], "borderTopWidth", !0), c.left += fb.css(a[0], "borderLeftWidth", !0)), {
					top: b.top - c.top - fb.css(d, "marginTop", !0),
					left: b.left - c.left - fb.css(d, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var a = this.offsetParent || ed; a && !fb.nodeName(a, "html") && "static" === fb.css(a, "position");) a = a.offsetParent;
				return a || ed
			})
		}
	}), fb.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(a, b) {
		var c = /Y/.test(b);
		fb.fn[a] = function(d) {
			return Eb(this, function(a, d, e) {
				var f = V(a);
				return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? fb(f).scrollLeft() : e, c ? e : fb(f).scrollTop()) : a[d] = e)
			}, a, d, arguments.length, null)
		}
	}), fb.each(["top", "left"], function(a, b) {
		fb.cssHooks[b] = A(db.pixelPosition, function(a, c) {
			return c ? (c = cc(a, b), ec.test(c) ? fb(a).position()[b] + "px" : c) : void 0
		})
	}), fb.each({
		Height: "height",
		Width: "width"
	}, function(a, b) {
		fb.each({
			padding: "inner" + a,
			content: b,
			"": "outer" + a
		}, function(c, d) {
			fb.fn[d] = function(d, e) {
				var f = arguments.length && (c || "boolean" != typeof d),
					g = c || (d === !0 || e === !0 ? "margin" : "border");
				return Eb(this, function(b, c, d) {
					var e;
					return fb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? fb.css(b, c, g) : fb.style(b, c, d, g)
				}, b, f ? d : void 0, f, null)
			}
		})
	}), fb.fn.size = function() {
		return this.length
	}, fb.fn.andSelf = fb.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
		return fb
	});
	var fd = a.jQuery,
		gd = a.$;
	return fb.noConflict = function(b) {
		return a.$ === fb && (a.$ = gd), b && a.jQuery === fb && (a.jQuery = fd), fb
	}, typeof b === yb && (a.jQuery = a.$ = fb), fb
}),
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
	function b(b, d) {
		var e, f, g, h = b.nodeName.toLowerCase();
		return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap='#" + f + "']")[0], !! g && c(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
	}
	function c(b) {
		return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
			return "hidden" === a.css(this, "visibility")
		}).length
	}
	function d(a) {
		for (var b, c; a.length && a[0] !== document;) {
			if (b = a.css("position"), ("absolute" === b || "relative" === b || "fixed" === b) && (c = parseInt(a.css("zIndex"), 10), !isNaN(c) && 0 !== c)) return c;
			a = a.parent()
		}
		return 0
	}
	function e() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, a.extend(this._defaults, this.regional[""]), this.regional.en = a.extend(!0, {}, this.regional[""]), this.regional["en-US"] = a.extend(!0, {}, this.regional.en), this.dpDiv = f(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}
	function f(b) {
		var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return b.delegate(c, "mouseout", function() {
			a(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover")
		}).delegate(c, "mouseover", g)
	}
	function g() {
		a.datepicker._isDisabledDatepicker(l.inline ? l.dpDiv.parent()[0] : l.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover"))
	}
	function h(b, c) {
		a.extend(b, c);
		for (var d in c) null == c[d] && (b[d] = c[d]);
		return b
	}
	a.ui = a.ui || {}, a.extend(a.ui, {
		version: "1.11.2",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), a.fn.extend({
		scrollParent: function(b) {
			var c = this.css("position"),
				d = "absolute" === c,
				e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				f = this.parents().filter(function() {
					var b = a(this);
					return d && "static" === b.css("position") ? !1 : e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
				}).eq(0);
			return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var a = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++a)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
			})
		}
	}), a.extend(a.expr[":"], {
		data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
			return function(c) {
				return !!a.data(c, b)
			}
		}) : function(b, c, d) {
			return !!a.data(b, d[3])
		},
		focusable: function(c) {
			return b(c, !isNaN(a.attr(c, "tabindex")))
		},
		tabbable: function(c) {
			var d = a.attr(c, "tabindex"),
				e = isNaN(d);
			return (e || d >= 0) && b(c, !e)
		}
	}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {
		function d(b, c, d, f) {
			return a.each(e, function() {
				c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
			}), c
		}
		var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
			f = c.toLowerCase(),
			g = {
				innerWidth: a.fn.innerWidth,
				innerHeight: a.fn.innerHeight,
				outerWidth: a.fn.outerWidth,
				outerHeight: a.fn.outerHeight
			};
		a.fn["inner" + c] = function(b) {
			return void 0 === b ? g["inner" + c].call(this) : this.each(function() {
				a(this).css(f, d(this, b) + "px")
			})
		}, a.fn["outer" + c] = function(b, e) {
			return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {
				a(this).css(f, d(this, b, !0, e) + "px")
			})
		}
	}), a.fn.addBack || (a.fn.addBack = function(a) {
		return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
	}), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
		return function(c) {
			return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
		}
	}(a.fn.removeData)), a.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
		focus: function(b) {
			return function(c, d) {
				return "number" == typeof c ? this.each(function() {
					var b = this;
					setTimeout(function() {
						a(b).focus(), d && d.call(b)
					}, c)
				}) : b.apply(this, arguments)
			}
		}(a.fn.focus),
		disableSelection: function() {
			var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(a + ".ui-disableSelection", function(a) {
					a.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(b) {
			if (void 0 !== b) return this.css("zIndex", b);
			if (this.length) for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
				if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
				e = e.parent()
			}
			return 0
		}
	}), a.ui.plugin = {
		add: function(b, c, d) {
			var e, f = a.ui[b].prototype;
			for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
		},
		call: function(a, b, c, d) {
			var e, f = a.plugins[b];
			if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)) for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
		}
	};
	var i = 0,
		j = Array.prototype.slice;
	a.cleanData = function(b) {
		return function(c) {
			var d, e, f;
			for (f = 0; null != (e = c[f]); f++) try {
				d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
			} catch (g) {}
			b(c)
		}
	}(a.cleanData), a.widget = function(b, c, d) {
		var e, f, g, h, i = {}, j = b.split(".")[0];
		return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {
			return !!a.data(b, e)
		}, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {
			return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
		}, a.extend(g, f, {
			version: d.version,
			_proto: a.extend({}, d),
			_childConstructors: []
		}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {
			return a.isFunction(d) ? void(i[b] = function() {
				var a = function() {
					return c.prototype[b].apply(this, arguments)
				}, e = function(a) {
					return c.prototype[b].apply(this, a)
				};
				return function() {
					var b, c = this._super,
						f = this._superApply;
					return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
				}
			}()) : void(i[b] = d)
		}), g.prototype = a.widget.extend(h, {
			widgetEventPrefix: f ? h.widgetEventPrefix || b : b
		}, i, {
			constructor: g,
			namespace: j,
			widgetName: b,
			widgetFullName: e
		}), f ? (a.each(f._childConstructors, function(b, c) {
			var d = c.prototype;
			a.widget(d.namespace + "." + d.widgetName, g, c._proto)
		}), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
	}, a.widget.extend = function(b) {
		for (var c, d, e = j.call(arguments, 1), f = 0, g = e.length; g > f; f++) for (c in e[f]) d = e[f][c], e[f].hasOwnProperty(c) && void 0 !== d && (b[c] = a.isPlainObject(d) ? a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : d);
		return b
	}, a.widget.bridge = function(b, c) {
		var d = c.prototype.widgetFullName || b;
		a.fn[b] = function(e) {
			var f = "string" == typeof e,
				g = j.call(arguments, 1),
				h = this;
			return e = !f && g.length ? a.widget.extend.apply(null, [e].concat(g)) : e, this.each(f ? function() {
				var c, f = a.data(this, d);
				return "instance" === e ? (h = f, !1) : f ? a.isFunction(f[e]) && "_" !== e.charAt(0) ? (c = f[e].apply(f, g), c !== f && void 0 !== c ? (h = c && c.jquery ? h.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + e + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + e + "'")
			} : function() {
				var b = a.data(this, d);
				b ? (b.option(e || {}), b._init && b._init()) : a.data(this, d, new c(e, this))
			}), h
		}
	}, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(b, c) {
			c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(a) {
					a.target === c && this.destroy()
				}
			}), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: a.noop,
		_getCreateEventData: a.noop,
		_create: a.noop,
		_init: a.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: a.noop,
		widget: function() {
			return this.element
		},
		option: function(b, c) {
			var d, e, f, g = b;
			if (0 === arguments.length) return a.widget.extend({}, this.options);
			if ("string" == typeof b) if (g = {}, d = b.split("."), b = d.shift(), d.length) {
				for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
				if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
				e[b] = c
			} else {
				if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
				g[b] = c
			}
			return this._setOptions(g), this
		},
		_setOptions: function(a) {
			var b;
			for (b in a) this._setOption(b, a[b]);
			return this
		},
		_setOption: function(a, b) {
			return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !! b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(b, c, d) {
			var e, f = this;
			"boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
				function h() {
					return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
				}
				"string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
				var i = d.match(/^([\w:-]*)\s*(.*)$/),
					j = i[1] + f.eventNamespace,
					k = i[2];
				k ? e.delegate(k, j, h) : c.bind(j, h)
			})
		},
		_off: function(b, c) {
			c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
		},
		_delay: function(a, b) {
			function c() {
				return ("string" == typeof a ? d[a] : a).apply(d, arguments)
			}
			var d = this;
			return setTimeout(c, b || 0)
		},
		_hoverable: function(b) {
			this.hoverable = this.hoverable.add(b), this._on(b, {
				mouseenter: function(b) {
					a(b.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(b) {
					a(b.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(b) {
			this.focusable = this.focusable.add(b), this._on(b, {
				focusin: function(b) {
					a(b.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(b) {
					a(b.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(b, c, d) {
			var e, f, g = this.options[b];
			if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent) for (e in f) e in c || (c[e] = f[e]);
			return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
		}
	}, a.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(b, c) {
		a.Widget.prototype["_" + b] = function(d, e, f) {
			"string" == typeof e && (e = {
				effect: e
			});
			var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
			e = e || {}, "number" == typeof e && (e = {
				duration: e
			}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
				a(this)[b](), f && f.call(d[0]), c()
			})
		}
	});
	var k = (a.widget, !1);
	a(document).mouseup(function() {
		k = !1
	});
	a.widget("ui.mouse", {
		version: "1.11.2",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var b = this;
			this.element.bind("mousedown." + this.widgetName, function(a) {
				return b._mouseDown(a)
			}).bind("click." + this.widgetName, function(c) {
				return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(b) {
			if (!k) {
				this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
				var c = this,
					d = 1 === b.which,
					e = "string" == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
				return d && !e && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					c.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
					return c._mouseMove(a)
				}, this._mouseUpDelegate = function(a) {
					return c._mouseUp(a)
				}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), k = !0, !0)) : !0
			}
		},
		_mouseMove: function(b) {
			if (this._mouseMoved) {
				if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b);
				if (!b.which) return this._mouseUp(b)
			}
			return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
		},
		_mouseUp: function(b) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), k = !1, !1
		},
		_mouseDistanceMet: function(a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	});
	! function() {
		function b(a, b, c) {
			return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
		}
		function c(b, c) {
			return parseInt(a.css(b, c), 10) || 0
		}
		function d(b) {
			var c = b[0];
			return 9 === c.nodeType ? {
				width: b.width(),
				height: b.height(),
				offset: {
					top: 0,
					left: 0
				}
			} : a.isWindow(c) ? {
				width: b.width(),
				height: b.height(),
				offset: {
					top: b.scrollTop(),
					left: b.scrollLeft()
				}
			} : c.preventDefault ? {
				width: 0,
				height: 0,
				offset: {
					top: c.pageY,
					left: c.pageX
				}
			} : {
				width: b.outerWidth(),
				height: b.outerHeight(),
				offset: b.offset()
			}
		}
		a.ui = a.ui || {};
		var e, f, g = Math.max,
			h = Math.abs,
			i = Math.round,
			j = /left|center|right/,
			k = /top|center|bottom/,
			l = /[\+\-]\d+(\.[\d]+)?%?/,
			m = /^\w+/,
			n = /%$/,
			o = a.fn.position;
		a.position = {
			scrollbarWidth: function() {
				if (void 0 !== e) return e;
				var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					f = d.children()[0];
				return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c
			},
			getScrollInfo: function(b) {
				var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
					d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
					e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
					f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
				return {
					width: f ? a.position.scrollbarWidth() : 0,
					height: e ? a.position.scrollbarWidth() : 0
				}
			},
			getWithinInfo: function(b) {
				var c = a(b || window),
					d = a.isWindow(c[0]),
					e = !! c[0] && 9 === c[0].nodeType;
				return {
					element: c,
					isWindow: d,
					isDocument: e,
					offset: c.offset() || {
						left: 0,
						top: 0
					},
					scrollLeft: c.scrollLeft(),
					scrollTop: c.scrollTop(),
					width: d || e ? c.width() : c.outerWidth(),
					height: d || e ? c.height() : c.outerHeight()
				}
			}
		}, a.fn.position = function(e) {
			if (!e || !e.of) return o.apply(this, arguments);
			e = a.extend({}, e);
			var n, p, q, r, s, t, u = a(e.of),
				v = a.position.getWithinInfo(e.within),
				w = a.position.getScrollInfo(v),
				x = (e.collision || "flip").split(" "),
				y = {};
			return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function() {
				var a, b, c = (e[this] || "").split(" ");
				1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]]
			}), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function() {
				var d, j, k = a(this),
					l = k.outerWidth(),
					m = k.outerHeight(),
					o = c(this, "marginLeft"),
					t = c(this, "marginTop"),
					z = l + o + c(this, "marginRight") + w.width,
					A = m + t + c(this, "marginBottom") + w.height,
					B = a.extend({}, s),
					C = b(y.my, k.outerWidth(), k.outerHeight());
				"right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f || (B.left = i(B.left), B.top = i(B.top)), d = {
					marginLeft: o,
					marginTop: t
				}, a.each(["left", "top"], function(b, c) {
					a.ui.position[x[b]] && a.ui.position[x[b]][c](B, {
						targetWidth: p,
						targetHeight: q,
						elemWidth: l,
						elemHeight: m,
						collisionPosition: d,
						collisionWidth: z,
						collisionHeight: A,
						offset: [n[0] + C[0], n[1] + C[1]],
						my: e.my,
						at: e.at,
						within: v,
						elem: k
					})
				}), e.using && (j = function(a) {
					var b = r.left - B.left,
						c = b + p - l,
						d = r.top - B.top,
						f = d + q - m,
						i = {
							target: {
								element: u,
								left: r.left,
								top: r.top,
								width: p,
								height: q
							},
							element: {
								element: k,
								left: B.left,
								top: B.top,
								width: l,
								height: m
							},
							horizontal: 0 > c ? "left" : b > 0 ? "right" : "center",
							vertical: 0 > f ? "top" : d > 0 ? "bottom" : "middle"
						};
					l > p && h(b + c) < p && (i.horizontal = "center"), m > q && h(d + f) < q && (i.vertical = "middle"), i.important = g(h(b), h(c)) > g(h(d), h(f)) ? "horizontal" : "vertical", e.using.call(this, a, i)
				}), k.offset(a.extend(B, {
					using: j
				}))
			})
		}, a.ui.position = {
			fit: {
				left: function(a, b) {
					var c, d = b.within,
						e = d.isWindow ? d.scrollLeft : d.offset.left,
						f = d.width,
						h = a.left - b.collisionPosition.marginLeft,
						i = e - h,
						j = h + b.collisionWidth - f - e;
					b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
				},
				top: function(a, b) {
					var c, d = b.within,
						e = d.isWindow ? d.scrollTop : d.offset.top,
						f = b.within.height,
						h = a.top - b.collisionPosition.marginTop,
						i = e - h,
						j = h + b.collisionHeight - f - e;
					b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
				}
			},
			flip: {
				left: function(a, b) {
					var c, d, e = b.within,
						f = e.offset.left + e.scrollLeft,
						g = e.width,
						i = e.isWindow ? e.scrollLeft : e.offset.left,
						j = a.left - b.collisionPosition.marginLeft,
						k = j - i,
						l = j + b.collisionWidth - g - i,
						m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
						n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
						o = -2 * b.offset[0];
					0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
				},
				top: function(a, b) {
					var c, d, e = b.within,
						f = e.offset.top + e.scrollTop,
						g = e.height,
						i = e.isWindow ? e.scrollTop : e.offset.top,
						j = a.top - b.collisionPosition.marginTop,
						k = j - i,
						l = j + b.collisionHeight - g - i,
						m = "top" === b.my[1],
						n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
						o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
						p = -2 * b.offset[1];
					0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p))
				}
			},
			flipfit: {
				left: function() {
					a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
				},
				top: function() {
					a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
				}
			}
		},
		function() {
			var b, c, d, e, g, h = document.getElementsByTagName("body")[0],
				i = document.createElement("div");
			b = document.createElement(h ? "div" : "body"), d = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, h && a.extend(d, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			});
			for (g in d) b.style[g] = d[g];
			b.appendChild(i), c = h || document.documentElement, c.insertBefore(b, c.firstChild), i.style.cssText = "position: absolute; left: 10.7432222px;", e = a(i).offset().left, f = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
		}()
	}();
	a.ui.position;
	a.widget("ui.draggable", a.ui.mouse, {
		version: "1.11.2",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
		},
		_setOption: function(a, b) {
			this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function() {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
		},
		_mouseCapture: function(b) {
			var c = this.options;
			return this._blurActiveElement(b), this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0) : !1)
		},
		_blockFrames: function(b) {
			this.iframeBlocks = this.document.find(b).map(function() {
				var b = a(this);
				return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_blurActiveElement: function(b) {
			var c = this.document[0];
			if (this.handleElement.is(b.target)) try {
				c.activeElement && "body" !== c.activeElement.nodeName.toLowerCase() && a(c.activeElement).blur()
			} catch (d) {}
		},
		_mouseStart: function(b) {
			var c = this.options;
			return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
				return "fixed" === a(this).css("position")
			}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._normalizeRightBottom(), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
		},
		_refreshOffsets: function(a) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: !1,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}, this.offset.click = {
				left: a.pageX - this.offset.left,
				top: a.pageY - this.offset.top
			}
		},
		_mouseDrag: function(b, c) {
			if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
				var d = this._uiHash();
				if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
				this.position = d.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
		},
		_mouseStop: function(b) {
			var c = this,
				d = !1;
			return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				c._trigger("stop", b) !== !1 && c._clear()
			}) : this._trigger("stop", b) !== !1 && this._clear(), !1
		},
		_mouseUp: function(b) {
			return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.focus(), a.ui.mouse.prototype._mouseUp.call(this, b)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(b) {
			return this.options.handle ? !! a(b.target).closest(this.element.find(this.options.handle)).length : !0
		},
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
		},
		_removeHandleClassName: function() {
			this.handleElement.removeClass("ui-draggable-handle")
		},
		_createHelper: function(b) {
			var c = this.options,
				d = a.isFunction(c.helper),
				e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
			return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e
		},
		_setPositionRelative: function() {
			/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
		},
		_adjustOffsetFromHelper: function(b) {
			"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
				left: +b[0],
				top: +b[1] || 0
			}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_isRootNode: function(a) {
			return /(html|body)/i.test(a.tagName) || a === this.document[0]
		},
		_getParentOffset: function() {
			var b = this.offsetParent.offset(),
				c = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
				top: 0,
				left: 0
			}), {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" !== this.cssPosition) return {
				top: 0,
				left: 0
			};
			var a = this.element.position(),
				b = this._isRootNode(this.scrollParent[0]);
			return {
				top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
				left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var b, c, d, e = this.options,
				f = this.document[0];
			return this.relativeContainer = null, e.containment ? "window" === e.containment ? void(this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void(this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void(this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void(d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null)
		},
		_convertPositionTo: function(a, b) {
			b || (b = this.position);
			var c = "absolute" === a ? 1 : -1,
				d = this._isRootNode(this.scrollParent[0]);
			return {
				top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
				left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
			}
		},
		_generatePosition: function(a, b) {
			var c, d, e, f, g = this.options,
				h = this._isRootNode(this.scrollParent[0]),
				i = a.pageX,
				j = a.pageY;
			return h && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
				top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
				left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
		},
		_normalizeRightBottom: function() {
			"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
		},
		_trigger: function(b, c, d) {
			return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), a.ui.plugin.add("draggable", "connectToSortable", {
		start: function(b, c, d) {
			var e = a.extend({}, c, {
				item: d.element
			});
			d.sortables = [], a(d.options.connectToSortable).each(function() {
				var c = a(this).sortable("instance");
				c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e))
			})
		},
		stop: function(b, c, d) {
			var e = a.extend({}, c, {
				item: d.element
			});
			d.cancelHelperRemoval = !1, a.each(d.sortables, function() {
				var a = this;
				a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
					position: a.placeholder.css("position"),
					top: a.placeholder.css("top"),
					left: a.placeholder.css("left")
				}, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e))
			})
		},
		drag: function(b, c, d) {
			a.each(d.sortables, function() {
				var e = !1,
					f = this;
				f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function() {
					return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e
				})), e ? (f.isOver || (f.isOver = 1, f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function() {
					return c.helper[0]
				}, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function() {
					this.refreshPositions()
				}), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function() {
					this.refreshPositions()
				}))
			})
		}
	}), a.ui.plugin.add("draggable", "cursor", {
		start: function(b, c, d) {
			var e = a("body"),
				f = d.options;
			e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor)
		},
		stop: function(b, c, d) {
			var e = d.options;
			e._cursor && a("body").css("cursor", e._cursor)
		}
	}), a.ui.plugin.add("draggable", "opacity", {
		start: function(b, c, d) {
			var e = a(c.helper),
				f = d.options;
			e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity)
		},
		stop: function(b, c, d) {
			var e = d.options;
			e._opacity && a(c.helper).css("opacity", e._opacity)
		}
	}), a.ui.plugin.add("draggable", "scroll", {
		start: function(a, b, c) {
			c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
		},
		drag: function(b, c, d) {
			var e = d.options,
				f = !1,
				g = d.scrollParentNotHidden[0],
				h = d.document[0];
			g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
		}
	}), a.ui.plugin.add("draggable", "snap", {
		start: function(b, c, d) {
			var e = d.options;
			d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function() {
				var b = a(this),
					c = b.offset();
				this !== d.element[0] && d.snapElements.push({
					item: this,
					width: b.outerWidth(),
					height: b.outerHeight(),
					top: c.top,
					left: c.left
				})
			})
		},
		drag: function(b, c, d) {
			var e, f, g, h, i, j, k, l, m, n, o = d.options,
				p = o.snapTolerance,
				q = c.offset.left,
				r = q + d.helperProportions.width,
				s = c.offset.top,
				t = s + d.helperProportions.height;
			for (m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, i - p > r || q > j + p || k - p > t || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
				snapItem: d.snapElements[m].item
			})), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", {
				top: k - d.helperProportions.height,
				left: 0
			}).top), f && (c.position.top = d._convertPositionTo("relative", {
				top: l,
				left: 0
			}).top), g && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: i - d.helperProportions.width
			}).left), h && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: j
			}).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", {
				top: k,
				left: 0
			}).top), f && (c.position.top = d._convertPositionTo("relative", {
				top: l - d.helperProportions.height,
				left: 0
			}).top), g && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: i
			}).left), h && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: j - d.helperProportions.width
			}).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
				snapItem: d.snapElements[m].item
			})), d.snapElements[m].snapping = e || f || g || h || n)
		}
	}), a.ui.plugin.add("draggable", "stack", {
		start: function(b, c, d) {
			var e, f = d.options,
				g = a.makeArray(a(f.stack)).sort(function(b, c) {
					return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
				});
			g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function(b) {
				a(this).css("zIndex", e + b)
			}), this.css("zIndex", e + g.length))
		}
	}), a.ui.plugin.add("draggable", "zIndex", {
		start: function(b, c, d) {
			var e = a(c.helper),
				f = d.options;
			e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex)
		},
		stop: function(b, c, d) {
			var e = d.options;
			e._zIndex && a(c.helper).css("zIndex", e._zIndex)
		}
	});
	a.ui.draggable;
	a.widget("ui.droppable", {
		version: "1.11.2",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			var b, c = this.options,
				d = c.accept;
			this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function(a) {
				return a.is(d)
			}, this.proportions = function() {
				return arguments.length ? void(b = arguments[0]) : b ? b : b = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				}
			}, this._addToManager(c.scope), c.addClasses && this.element.addClass("ui-droppable")
		},
		_addToManager: function(b) {
			a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this)
		},
		_splice: function(a) {
			for (var b = 0; b < a.length; b++) a[b] === this && a.splice(b, 1)
		},
		_destroy: function() {
			var b = a.ui.ddmanager.droppables[this.options.scope];
			this._splice(b), this.element.removeClass("ui-droppable ui-droppable-disabled")
		},
		_setOption: function(b, c) {
			if ("accept" === b) this.accept = a.isFunction(c) ? c : function(a) {
				return a.is(c)
			};
			else if ("scope" === b) {
				var d = a.ui.ddmanager.droppables[this.options.scope];
				this._splice(d), this._addToManager(c)
			}
			this._super(b, c)
		},
		_activate: function(b) {
			var c = a.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
		},
		_deactivate: function(b) {
			var c = a.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
		},
		_over: function(b) {
			var c = a.ui.ddmanager.current;
			c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
		},
		_out: function(b) {
			var c = a.ui.ddmanager.current;
			c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
		},
		_drop: function(b, c) {
			var d = c || a.ui.ddmanager.current,
				e = !1;
			return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
				var c = a(this).droppable("instance");
				return c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(c, {
					offset: c.element.offset()
				}), c.options.tolerance, b) ? (e = !0, !1) : void 0
			}), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
		},
		ui: function(a) {
			return {
				draggable: a.currentItem || a.element,
				helper: a.helper,
				position: a.position,
				offset: a.positionAbs
			}
		}
	}), a.ui.intersect = function() {
		function a(a, b, c) {
			return a >= b && b + c > a
		}
		return function(b, c, d, e) {
			if (!c.offset) return !1;
			var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
				g = (b.positionAbs || b.position.absolute).top + b.margins.top,
				h = f + b.helperProportions.width,
				i = g + b.helperProportions.height,
				j = c.offset.left,
				k = c.offset.top,
				l = j + c.proportions().width,
				m = k + c.proportions().height;
			switch (d) {
				case "fit":
					return f >= j && l >= h && g >= k && m >= i;
				case "intersect":
					return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;
				case "pointer":
					return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);
				case "touch":
					return (g >= k && m >= g || i >= k && m >= i || k > g && i > m) && (f >= j && l >= f || h >= j && l >= h || j > f && h > l);
				default:
					return !1
			}
		}
	}(), a.ui.ddmanager = {
		current: null,
		droppables: {
			"default": []
		},
		prepareOffsets: function(b, c) {
			var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
				g = c ? c.type : null,
				h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
			a: for (d = 0; d < f.length; d++) if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
				for (e = 0; e < h.length; e++) if (h[e] === f[d].element[0]) {
					f[d].proportions().height = 0;
					continue a
				}
				f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
					width: f[d].element[0].offsetWidth,
					height: f[d].element[0].offsetHeight
				}))
			}
		},
		drop: function(b, c) {
			var d = !1;
			return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
				this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
			}), d
		},
		dragStart: function(b, c) {
			b.element.parentsUntil("body").bind("scroll.droppable", function() {
				b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
			})
		},
		drag: function(b, c) {
			b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance, c),
						h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
					h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
						return a(this).droppable("instance").options.scope === e
					}), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
				}
			})
		},
		dragStop: function(b, c) {
			b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
		}
	};
	a.ui.droppable;
	a.widget("ui.resizable", a.ui.mouse, {
		version: "1.11.2",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function(a) {
			return parseInt(a, 10) || 0
		},
		_isNumber: function(a) {
			return !isNaN(parseInt(a, 10))
		},
		_hasScroll: function(b, c) {
			if ("hidden" === a(b).css("overflow")) return !1;
			var d = c && "left" === c ? "scrollLeft" : "scrollTop",
				e = !1;
			return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
		},
		_create: function() {
			var b, c, d, e, f, g = this,
				h = this.options;
			if (this.element.addClass("ui-resizable"), a.extend(this, {
				_aspectRatio: !! h.aspectRatio,
				aspectRatio: h.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
			}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			}), this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css({
				margin: this.originalElement.css("margin")
			}), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			} : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++) d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({
				zIndex: h.zIndex
			}), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
			this._renderAxis = function(b) {
				var c, d, e, f;
				b = b || this.element;
				for (c in this.handles) this.handles[c].constructor === String && (this.handles[c] = this.element.children(this.handles[c]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), a(this.handles[c]).length
			}, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
				g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se")
			}), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
				h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show())
			}).mouseleave(function() {
				h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide())
			})), this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var b, c = function(b) {
				a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
				position: b.css("position"),
				width: b.outerWidth(),
				height: b.outerHeight(),
				top: b.css("top"),
				left: b.css("left")
			}).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
		},
		_mouseCapture: function(b) {
			var c, d, e = !1;
			for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
			return !this.options.disabled && e
		},
		_mouseStart: function(b) {
			var c, d, e, f = this.options,
				g = this.element;
			return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: c,
				top: d
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: g.width(),
				height: g.height()
			}, this.originalSize = this._helper ? {
				width: g.outerWidth(),
				height: g.outerHeight()
			} : {
				width: g.width(),
				height: g.height()
			}, this.sizeDiff = {
				width: g.outerWidth() - g.width(),
				height: g.outerHeight() - g.height()
			}, this.originalPosition = {
				left: c,
				top: d
			}, this.originalMousePosition = {
				left: b.pageX,
				top: b.pageY
			}, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), g.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
		},
		_mouseDrag: function(b) {
			var c, d, e = this.originalMousePosition,
				f = this.axis,
				g = b.pageX - e.left || 0,
				h = b.pageY - e.top || 0,
				i = this._change[f];
			return this._updatePrevProperties(), i ? (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1) : !1
		},
		_mouseStop: function(b) {
			this.resizing = !1;
			var c, d, e, f, g, h, i, j = this.options,
				k = this;
			return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
				width: k.helper.width() - f,
				height: k.helper.height() - e
			}, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
				top: i,
				left: h
			})), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			}, this.prevSize = {
				width: this.size.width,
				height: this.size.height
			}
		},
		_applyChanges: function() {
			var a = {};
			return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a
		},
		_updateVirtualBoundaries: function(a) {
			var b, c, d, e, f, g = this.options;
			f = {
				minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0,
				maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0,
				minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0,
				maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0
			}, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f
		},
		_updateCache: function(a) {
			this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width)
		},
		_updateRatio: function(a) {
			var b = this.position,
				c = this.size,
				d = this.axis;
			return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a
		},
		_respectSize: function(a) {
			var b = this._vBoundaries,
				c = this.axis,
				d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
				e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
				f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
				g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
				h = this.originalPosition.left + this.originalSize.width,
				i = this.position.top + this.size.height,
				j = /sw|nw|w/.test(c),
				k = /nw|ne|n/.test(c);
			return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
		},
		_getPaddingPlusBorderDimensions: function(a) {
			for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; 4 > b; b++) c[b] = parseInt(d[b], 10) || 0, c[b] += parseInt(e[b], 10) || 0;
			return {
				height: c[0] + c[2],
				width: c[1] + c[3]
			}
		},
		_proportionallyResize: function() {
			if (this._proportionallyResizeElements.length) for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({
				height: c.height() - this.outerDimensions.height || 0,
				width: c.width() - this.outerDimensions.width || 0
			})
		},
		_renderProxy: function() {
			var b = this.element,
				c = this.options;
			this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++c.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function(a, b) {
				return {
					width: this.originalSize.width + b
				}
			},
			w: function(a, b) {
				var c = this.originalSize,
					d = this.originalPosition;
				return {
					left: d.left + b,
					width: c.width - b
				}
			},
			n: function(a, b, c) {
				var d = this.originalSize,
					e = this.originalPosition;
				return {
					top: e.top + c,
					height: d.height - c
				}
			},
			s: function(a, b, c) {
				return {
					height: this.originalSize.height + c
				}
			},
			se: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			sw: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			},
			ne: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			nw: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			}
		},
		_propagate: function(b, c) {
			a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), a.ui.plugin.add("resizable", "animate", {
		stop: function(b) {
			var c = a(this).resizable("instance"),
				d = c.options,
				e = c._proportionallyResizeElements,
				f = e.length && /textarea/i.test(e[0].nodeName),
				g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
				h = f ? 0 : c.sizeDiff.width,
				i = {
					width: c.size.width - h,
					height: c.size.height - g
				}, j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
				k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
			c.element.animate(a.extend(i, k && j ? {
				top: k,
				left: j
			} : {}), {
				duration: d.animateDuration,
				easing: d.animateEasing,
				step: function() {
					var d = {
						width: parseInt(c.element.css("width"), 10),
						height: parseInt(c.element.css("height"), 10),
						top: parseInt(c.element.css("top"), 10),
						left: parseInt(c.element.css("left"), 10)
					};
					e && e.length && a(e[0]).css({
						width: d.width,
						height: d.height
					}), c._updateCache(d), c._propagate("resize", b)
				}
			})
		}
	}), a.ui.plugin.add("resizable", "containment", {
		start: function() {
			var b, c, d, e, f, g, h, i = a(this).resizable("instance"),
				j = i.options,
				k = i.element,
				l = j.containment,
				m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
			m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = {
				left: 0,
				top: 0
			}, i.containerPosition = {
				left: 0,
				top: 0
			}, i.parentData = {
				element: a(document),
				left: 0,
				top: 0,
				width: a(document).width(),
				height: a(document).height() || document.body.parentNode.scrollHeight
			}) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, d) {
				c[a] = i._num(b.css("padding" + d))
			}), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = {
				height: b.innerHeight() - c[3],
				width: b.innerWidth() - c[1]
			}, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = {
				element: m,
				left: d.left,
				top: d.top,
				width: g,
				height: h
			}))
		},
		resize: function(b) {
			var c, d, e, f, g = a(this).resizable("instance"),
				h = g.options,
				i = g.containerOffset,
				j = g.position,
				k = g._aspectRatio || b.shiftKey,
				l = {
					top: 0,
					left: 0
				}, m = g.containerElement,
				n = !0;
			m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height)
		},
		stop: function() {
			var b = a(this).resizable("instance"),
				c = b.options,
				d = b.containerOffset,
				e = b.containerPosition,
				f = b.containerElement,
				g = a(b.helper),
				h = g.offset(),
				i = g.outerWidth() - b.sizeDiff.width,
				j = g.outerHeight() - b.sizeDiff.height;
			b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
				left: h.left - e.left - d.left,
				width: i,
				height: j
			}), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
				left: h.left - e.left - d.left,
				width: i,
				height: j
			})
		}
	}), a.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var b = a(this).resizable("instance"),
				c = b.options,
				d = function(b) {
					a(b).each(function() {
						var b = a(this);
						b.data("ui-resizable-alsoresize", {
							width: parseInt(b.width(), 10),
							height: parseInt(b.height(), 10),
							left: parseInt(b.css("left"), 10),
							top: parseInt(b.css("top"), 10)
						})
					})
				};
			"object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function(a) {
				d(a)
			})
		},
		resize: function(b, c) {
			var d = a(this).resizable("instance"),
				e = d.options,
				f = d.originalSize,
				g = d.originalPosition,
				h = {
					height: d.size.height - f.height || 0,
					width: d.size.width - f.width || 0,
					top: d.position.top - g.top || 0,
					left: d.position.left - g.left || 0
				}, i = function(b, d) {
					a(b).each(function() {
						var b = a(this),
							e = a(this).data("ui-resizable-alsoresize"),
							f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						a.each(g, function(a, b) {
							var c = (e[b] || 0) + (h[b] || 0);
							c && c >= 0 && (f[b] = c || null)
						}), b.css(f)
					})
				};
			"object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function(a, b) {
				i(a, b)
			})
		},
		stop: function() {
			a(this).removeData("resizable-alsoresize")
		}
	}), a.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var b = a(this).resizable("instance"),
				c = b.options,
				d = b.size;
			b.ghost = b.originalElement.clone(), b.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: d.height,
				width: d.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
		},
		resize: function() {
			var b = a(this).resizable("instance");
			b.ghost && b.ghost.css({
				position: "relative",
				height: b.size.height,
				width: b.size.width
			})
		},
		stop: function() {
			var b = a(this).resizable("instance");
			b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
		}
	}), a.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var b, c = a(this).resizable("instance"),
				d = c.options,
				e = c.size,
				f = c.originalSize,
				g = c.originalPosition,
				h = c.axis,
				i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
				j = i[0] || 1,
				k = i[1] || 1,
				l = Math.round((e.width - f.width) / j) * j,
				m = Math.round((e.height - f.height) / k) * k,
				n = f.width + l,
				o = f.height + m,
				p = d.maxWidth && d.maxWidth < n,
				q = d.maxHeight && d.maxHeight < o,
				r = d.minWidth && d.minWidth > n,
				s = d.minHeight && d.minHeight > o;
			d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((0 >= o - k || 0 >= n - j) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = k - b.height, c.size.width = n, c.position.left = g.left + f.width - n))
		}
	});
	a.ui.resizable, a.widget("ui.selectable", a.ui.mouse, {
		version: "1.11.2",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var b, c = this;
			this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
				b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function() {
					var b = a(this),
						c = b.offset();
					a.data(this, "selectable-item", {
						element: this,
						$element: b,
						left: c.left,
						top: c.top,
						right: c.left + b.outerWidth(),
						bottom: c.top + b.outerHeight(),
						startselected: !1,
						selected: b.hasClass("ui-selected"),
						selecting: b.hasClass("ui-selecting"),
						unselecting: b.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
		},
		_destroy: function() {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
		},
		_mouseStart: function(b) {
			var c = this,
				d = this.options;
			this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
				left: b.pageX,
				top: b.pageY,
				width: 0,
				height: 0
			}), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
				var d = a.data(this, "selectable-item");
				d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
					unselecting: d.element
				}))
			}), a(b.target).parents().addBack().each(function() {
				var d, e = a.data(this, "selectable-item");
				return e ? (d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
					selecting: e.element
				}) : c._trigger("unselecting", b, {
					unselecting: e.element
				}), !1) : void 0
			}))
		},
		_mouseDrag: function(b) {
			if (this.dragged = !0, !this.options.disabled) {
				var c, d = this,
					e = this.options,
					f = this.opos[0],
					g = this.opos[1],
					h = b.pageX,
					i = b.pageY;
				return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
					left: f,
					top: g,
					width: h - f,
					height: i - g
				}), this.selectees.each(function() {
					var c = a.data(this, "selectable-item"),
						j = !1;
					c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || c.right < f || c.top > i || c.bottom < g) : "fit" === e.tolerance && (j = c.left > f && c.right < h && c.top > g && c.bottom < i), j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
						selecting: c.element
					}))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
						unselecting: c.element
					}))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
						unselecting: c.element
					})))))
				}), !1
			}
		},
		_mouseStop: function(b) {
			var c = this;
			return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function() {
				var d = a.data(this, "selectable-item");
				d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
					unselected: d.element
				})
			}), a(".ui-selecting", this.element[0]).each(function() {
				var d = a.data(this, "selectable-item");
				d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
					selected: d.element
				})
			}), this._trigger("stop", b), this.helper.remove(), !1
		}
	}), a.widget("ui.sortable", a.ui.mouse, {
		version: "1.11.2",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_isOverAxis: function(a, b, c) {
			return a >= b && b + c > a
		},
		_isFloating: function(a) {
			return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
		},
		_create: function() {
			var a = this.options;
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || this._isFloating(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
		},
		_setOption: function(a, b) {
			this._super(a, b), "handle" === a && this._setHandleClassName()
		},
		_setHandleClassName: function() {
			this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), a.each(this.items, function() {
				(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
			})
		},
		_destroy: function() {
			this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
			for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
			return this
		},
		_mouseCapture: function(b, c) {
			var d = null,
				e = !1,
				f = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function() {
				return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : void 0
			}), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d && (!this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function() {
				this === b.target && (e = !0)
			}), e)) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1)
		},
		_mouseStart: function(b, c, d) {
			var e, f, g = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, a.extend(this.offset, {
				click: {
					left: b.pageX - this.offset.left,
					top: b.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d) for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this));
			return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
		},
		_mouseDrag: function(b) {
			var c, d, e, f, g = this.options,
				h = !1;
			for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--) if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
				if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
				this._rearrange(b, d), this._trigger("change", b, this._uiHash());
				break
			}
			return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function(b, c) {
			if (b) {
				if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
					var d = this,
						e = this.placeholder.offset(),
						f = this.options.axis,
						g = {};
					f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function() {
						d._clear(b)
					})
				} else this._clear(b, c);
				return !1
			}
		},
		cancel: function() {
			if (this.dragging) {
				this._mouseUp({
					target: null
				}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function(b) {
			var c = this._getItemsAsjQuery(b && b.connected),
				d = [];
			return b = b || {}, a(c).each(function() {
				var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
				c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
			}), !d.length && b.key && d.push(b.key + "="), d.join("&")
		},
		toArray: function(b) {
			var c = this._getItemsAsjQuery(b && b.connected),
				d = [];
			return b = b || {}, c.each(function() {
				d.push(a(b.item || this).attr(b.attribute || "id") || "")
			}), d
		},
		_intersectsWith: function(a) {
			var b = this.positionAbs.left,
				c = b + this.helperProportions.width,
				d = this.positionAbs.top,
				e = d + this.helperProportions.height,
				f = a.left,
				g = f + a.width,
				h = a.top,
				i = h + a.height,
				j = this.offset.click.top,
				k = this.offset.click.left,
				l = "x" === this.options.axis || d + j > h && i > d + j,
				m = "y" === this.options.axis || b + k > f && g > b + k,
				n = l && m;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
		},
		_intersectsWithPointer: function(a) {
			var b = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
				c = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
				d = b && c,
				e = this._getDragVerticalDirection(),
				f = this._getDragHorizontalDirection();
			return d ? this.floating ? f && "right" === f || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1) : !1
		},
		_intersectsWithSides: function(a) {
			var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
				c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
				d = this._getDragVerticalDirection(),
				e = this._getDragHorizontalDirection();
			return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b)
		},
		_getDragVerticalDirection: function() {
			var a = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== a && (a > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function() {
			var a = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== a && (a > 0 ? "right" : "left")
		},
		refresh: function(a) {
			return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this
		},
		_connectWith: function() {
			var a = this.options;
			return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
		},
		_getItemsAsjQuery: function(b) {
			function c() {
				h.push(this)
			}
			var d, e, f, g, h = [],
				i = [],
				j = this._connectWith();
			if (j && b) for (d = j.length - 1; d >= 0; d--) for (f = a(j[d]), e = f.length - 1; e >= 0; e--) g = a.data(f[e], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
			for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), d = i.length - 1; d >= 0; d--) i[d][0].each(c);
			return a(h)
		},
		_removeCurrentsFromItems: function() {
			var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = a.grep(this.items, function(a) {
				for (var c = 0; c < b.length; c++) if (b[c] === a.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function(b) {
			this.items = [], this.containers = [this];
			var c, d, e, f, g, h, i, j, k = this.items,
				l = [
					[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
						item: this.currentItem
					}) : a(this.options.items, this.element), this]
				],
				m = this._connectWith();
			if (m && this.ready) for (c = m.length - 1; c >= 0; c--) for (e = a(m[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
				item: this.currentItem
			}) : a(f.options.items, f.element), f]), this.containers.push(f));
			for (c = l.length - 1; c >= 0; c--) for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++) i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
				item: i,
				instance: g,
				width: 0,
				height: 0,
				left: 0,
				top: 0
			})
		},
		refreshPositions: function(b) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var c, d, e, f;
			for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
			return this
		},
		_createPlaceholder: function(b) {
			b = b || this;
			var c, d = b.options;
			d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
				element: function() {
					var d = b.currentItem[0].nodeName.toLowerCase(),
						e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
					return "tr" === d ? b.currentItem.children().each(function() {
						a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(e)
					}) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e
				},
				update: function(a, e) {
					(!c || d.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
				}
			}), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
		},
		_contactContainers: function(b) {
			var c, d, e, f, g, h, i, j, k, l, m = null,
				n = null;
			for (c = this.containers.length - 1; c >= 0; c--) if (!a.contains(this.currentItem[0], this.containers[c].element[0])) if (this._intersectsWith(this.containers[c].containerCache)) {
				if (m && a.contains(this.containers[c].element[0], m.element[0])) continue;
				m = this.containers[c], n = c
			} else this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)), this.containers[c].containerCache.over = 0);
			if (m) if (1 === this.containers.length) this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1);
			else {
				for (e = 1e4, f = null, k = m.floating || this._isFloating(this.currentItem), g = k ? "left" : "top", h = k ? "width" : "height", l = k ? "clientX" : "clientY", d = this.items.length - 1; d >= 0; d--) a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g], j = !1, b[l] - i > this.items[d][h] / 2 && (j = !0), Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i), f = this.items[d], this.direction = j ? "up" : "down"));
				if (!f && !this.options.dropOnEmpty) return;
				if (this.currentContainer === this.containers[n]) return void(this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()), this.currentContainer.containerCache.over = 1));
				f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0), this._trigger("change", b, this._uiHash()), this.containers[n]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[n], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1
			}
		},
		_createHelper: function(b) {
			var c = this.options,
				d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
			return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
		},
		_adjustOffsetFromHelper: function(b) {
			"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
				left: +b[0],
				top: +b[1] || 0
			}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
				top: 0,
				left: 0
			}), {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" === this.cssPosition) {
				var a = this.currentItem.position();
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var b, c, d, e = this.options;
			"parent" === e.containment && (e.containment = this.helper[0].parentNode), ("document" === e.containment || "window" === e.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function(b, c) {
			c || (c = this.position);
			var d = "absolute" === b ? 1 : -1,
				e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				f = /(html|body)/i.test(e[0].tagName);
			return {
				top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
				left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
			}
		},
		_generatePosition: function(b) {
			var c, d, e = this.options,
				f = b.pageX,
				g = b.pageY,
				h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				i = /(html|body)/i.test(h[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
				top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
			}
		},
		_rearrange: function(a, b, c, d) {
			c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var e = this.counter;
			this._delay(function() {
				e === this.counter && this.refreshPositions(!d)
			})
		},
		_clear: function(a, b) {
			function c(a, b, c) {
				return function(d) {
					c._trigger(a, d, b._uiHash(b))
				}
			}
			this.reverting = !1;
			var d, e = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (d in this._storedCSS)("auto" === this._storedCSS[d] || "static" === this._storedCSS[d]) && (this._storedCSS[d] = "");
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !b && e.push(function(a) {
				this._trigger("receive", a, this._uiHash(this.fromOutside))
			}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function(a) {
				this._trigger("update", a, this._uiHash())
			}), this !== this.currentContainer && (b || (e.push(function(a) {
				this._trigger("remove", a, this._uiHash())
			}), e.push(function(a) {
				return function(b) {
					a._trigger("receive", b, this._uiHash(this))
				}
			}.call(this, this.currentContainer)), e.push(function(a) {
				return function(b) {
					a._trigger("update", b, this._uiHash(this))
				}
			}.call(this, this.currentContainer)))), d = this.containers.length - 1; d >= 0; d--) b || e.push(c("deactivate", this, this.containers[d])), this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])), this.containers[d].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !b) {
				for (d = 0; d < e.length; d++) e[d].call(this, a);
				this._trigger("stop", a, this._uiHash())
			}
			return this.fromOutside = !1, !this.cancelHelperRemoval
		},
		_trigger: function() {
			a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function(b) {
			var c = b || this;
			return {
				helper: c.helper,
				placeholder: c.placeholder || a([]),
				position: c.position,
				originalPosition: c.originalPosition,
				offset: c.positionAbs,
				item: c.currentItem,
				sender: b ? b.element : null
			}
		}
	});
	a.extend(a.ui, {
		datepicker: {
			version: "1.11.2"
		}
	});
	var l;
	a.extend(e.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(a) {
			return h(this._defaults, a || {}), this
		},
		_attachDatepicker: function(b, c) {
			var d, e, f;
			d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
		},
		_newInst: function(b, c) {
			var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: d,
				input: b,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: c,
				dpDiv: c ? f(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(b, c) {
			var d = a(b);
			c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b))
		},
		_attachments: function(b, c) {
			var d, e, f, g = this._get(c, "appendText"),
				h = this._get(c, "isRTL");
			c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), ("focus" === d || "both" === d) && b.focus(this._showDatepicker), ("button" === d || "both" === d) && (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
				src: f,
				alt: e,
				title: e
			}) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
				src: f,
				alt: e,
				title: e
			}) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function() {
				return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1
			}))
		},
		_autoSize: function(a) {
			if (this._get(a, "autoSize") && !a.inline) {
				var b, c, d, e, f = new Date(2009, 11, 20),
					g = this._get(a, "dateFormat");
				g.match(/[DM]/) && (b = function(a) {
					for (c = 0, d = 0, e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e);
					return d
				}, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
			}
		},
		_inlineDatepicker: function(b, c) {
			var d = a(b);
			d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(b, c, d, e, f) {
			var g, i, j, k, l, m = this._dialogInst;
			return m || (this.uuid += 1, g = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + g + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), m = this._dialogInst = this._newInst(this._dialogInput, !1), m.settings = {}, a.data(this._dialogInput[0], "datepicker", m)), h(m.settings, e || {}), c = c && c.constructor === Date ? this._formatDate(m, c) : c, this._dialogInput.val(c), this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null, this._pos || (i = document.documentElement.clientWidth, j = document.documentElement.clientHeight, k = document.documentElement.scrollLeft || document.body.scrollLeft, l = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [i / 2 - 100 + k, j / 2 - 150 + l]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), m.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], "datepicker", m), this
		},
		_destroyDatepicker: function(b) {
			var c, d = a(b),
				e = a.data(b, "datepicker");
			d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, "datepicker"), "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === c || "span" === c) && d.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(b) {
			var c, d, e = a(b),
				f = a.data(b, "datepicker");
			e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, f.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
				return a === b ? null : a
			}))
		},
		_disableDatepicker: function(b) {
			var c, d, e = a(b),
				f = a.data(b, "datepicker");
			e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, f.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
				return a === b ? null : a
			}), this._disabledInputs[this._disabledInputs.length] = b)
		},
		_isDisabledDatepicker: function(a) {
			if (!a) return !1;
			for (var b = 0; b < this._disabledInputs.length; b++) if (this._disabledInputs[b] === a) return !0;
			return !1
		},
		_getInst: function(b) {
			try {
				return a.data(b, "datepicker")
			} catch (c) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(b, c, d) {
			var e, f, g, i, j = this._getInst(b);
			return 2 === arguments.length && "string" == typeof c ? "defaults" === c ? a.extend({}, a.datepicker._defaults) : j ? "all" === c ? a.extend({}, j.settings) : this._get(j, c) : null : (e = c || {}, "string" == typeof c && (e = {}, e[c] = d), void(j && (this._curInst === j && this._hideDatepicker(), f = this._getDateDatepicker(b, !0), g = this._getMinMaxDate(j, "min"), i = this._getMinMaxDate(j, "max"), h(j.settings, e), null !== g && void 0 !== e.dateFormat && void 0 === e.minDate && (j.settings.minDate = this._formatDate(j, g)), null !== i && void 0 !== e.dateFormat && void 0 === e.maxDate && (j.settings.maxDate = this._formatDate(j, i)), "disabled" in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)), this._attachments(a(b), j), this._autoSize(j), this._setDate(j, f), this._updateAlternate(j), this._updateDatepicker(j))))
		},
		_changeDatepicker: function(a, b, c) {
			this._optionDatepicker(a, b, c)
		},
		_refreshDatepicker: function(a) {
			var b = this._getInst(a);
			b && this._updateDatepicker(b)
		},
		_setDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
		},
		_getDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
		},
		_doKeyDown: function(b) {
			var c, d, e, f = a.datepicker._getInst(b.target),
				g = !0,
				h = f.dpDiv.is(".ui-datepicker-rtl");
			if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
				case 9:
					a.datepicker._hideDatepicker(), g = !1;
					break;
				case 13:
					return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
				case 27:
					a.datepicker._hideDatepicker();
					break;
				case 33:
					a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 34:
					a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 35:
					(b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
					break;
				case 36:
					(b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
					break;
				case 37:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 38:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
					break;
				case 39:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 40:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
					break;
				default:
					g = !1
			} else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
			g && (b.preventDefault(), b.stopPropagation())
		},
		_doKeyPress: function(b) {
			var c, d, e = a.datepicker._getInst(b.target);
			return a.datepicker._get(e, "constrainInput") ? (c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || " " > d || !c || c.indexOf(d) > -1) : void 0
		},
		_doKeyUp: function(b) {
			var c, d = a.datepicker._getInst(b.target);
			if (d.input.val() !== d.lastVal) try {
				c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
			} catch (e) {}
			return !0
		},
		_showDatepicker: function(b) {
			if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
				var c, e, f, g, i, j, k;
				c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), e = a.datepicker._get(c, "beforeShow"), f = e ? e.apply(b, [b, c]) : {}, f !== !1 && (h(c.settings, f), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), g = !1, a(b).parents().each(function() {
					return g |= "fixed" === a(this).css("position"), !g
				}), i = {
					left: a.datepicker._pos[0],
					top: a.datepicker._pos[1]
				}, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), a.datepicker._updateDatepicker(c), i = a.datepicker._checkOffset(c, i, g), c.dpDiv.css({
					position: a.datepicker._inDialog && a.blockUI ? "static" : g ? "fixed" : "absolute",
					display: "none",
					left: i.left + "px",
					top: i.top + "px"
				}), c.inline || (j = a.datepicker._get(c, "showAnim"), k = a.datepicker._get(c, "duration"), c.dpDiv.css("z-index", d(a(b)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[j] ? c.dpDiv.show(j, a.datepicker._get(c, "showOptions"), k) : c.dpDiv[j || "show"](j ? k : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c))
			}
		},
		_updateDatepicker: function(b) {
			this.maxRows = 4, l = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b);
			var c, d = this._getNumberOfMonths(b),
				e = d[1],
				f = 17,
				h = b.dpDiv.find("." + this._dayOverClass + " a");
			h.length > 0 && g.apply(h.get(0)), b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", f * e + "em"), b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function() {
				c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(a) {
			return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
		},
		_checkOffset: function(b, c, d) {
			var e = b.dpDiv.outerWidth(),
				f = b.dpDiv.outerHeight(),
				g = b.input ? b.input.outerWidth() : 0,
				h = b.input ? b.input.outerHeight() : 0,
				i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
				j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
			return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c
		},
		_findPos: function(b) {
			for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"];
			return c = a(b).offset(), [c.left, c.top]
		},
		_hideDatepicker: function(b) {
			var c, d, e, f, g = this._curInst;
			!g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"), d = this._get(g, "duration"), e = function() {
				a.datepicker._tidyDialog(g)
			}, a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(g, "onClose"), f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(a) {
			a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(b) {
			if (a.datepicker._curInst) {
				var c = a(b.target),
					d = a.datepicker._getInst(c[0]);
				(c[0].id !== a.datepicker._mainDivId && 0 === c.parents("#" + a.datepicker._mainDivId).length && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(b, c, d) {
			var e = a(b),
				f = this._getInst(e[0]);
			this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
		},
		_gotoToday: function(b) {
			var c, d = a(b),
				e = this._getInst(d[0]);
			this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
		},
		_selectMonthYear: function(b, c, d) {
			var e = a(b),
				f = this._getInst(e[0]);
			f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
		},
		_selectDay: function(b, c, d, e) {
			var f, g = a(b);
			a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
		},
		_clearDate: function(b) {
			var c = a(b);
			this._selectDate(c, "")
		},
		_selectDate: function(b, c) {
			var d, e = a(b),
				f = this._getInst(e[0]);
			c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(b) {
			var c, d, e, f = this._get(b, "altField");
			f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function() {
				a(this).val(e)
			}))
		},
		noWeekends: function(a) {
			var b = a.getDay();
			return [b > 0 && 6 > b, ""]
		},
		iso8601Week: function(a) {
			var b, c = new Date(a.getTime());
			return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1
		},
		parseDate: function(b, c, d) {
			if (null == b || null == c) throw "Invalid arguments";
			if (c = "object" == typeof c ? c.toString() : c + "", "" === c) return null;
			var e, f, g, h, i = 0,
				j = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				k = "string" != typeof j ? j : (new Date).getFullYear() % 100 + parseInt(j, 10),
				l = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort,
				m = (d ? d.dayNames : null) || this._defaults.dayNames,
				n = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort,
				o = (d ? d.monthNames : null) || this._defaults.monthNames,
				p = -1,
				q = -1,
				r = -1,
				s = -1,
				t = !1,
				u = function(a) {
					var c = e + 1 < b.length && b.charAt(e + 1) === a;
					return c && e++, c
				}, v = function(a) {
					var b = u(a),
						d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
						e = "y" === a ? d : 1,
						f = new RegExp("^\\d{" + e + "," + d + "}"),
						g = c.substring(i).match(f);
					if (!g) throw "Missing number at position " + i;
					return i += g[0].length, parseInt(g[0], 10)
				}, w = function(b, d, e) {
					var f = -1,
						g = a.map(u(b) ? e : d, function(a, b) {
							return [[b, a]]
						}).sort(function(a, b) {
							return -(a[1].length - b[1].length)
						});
					if (a.each(g, function(a, b) {
						var d = b[1];
						return c.substr(i, d.length).toLowerCase() === d.toLowerCase() ? (f = b[0], i += d.length, !1) : void 0
					}), -1 !== f) return f + 1;
					throw "Unknown name at position " + i
				}, x = function() {
					if (c.charAt(i) !== b.charAt(e)) throw "Unexpected literal at position " + i;
					i++
				};
			for (e = 0; e < b.length; e++) if (t) "'" !== b.charAt(e) || u("'") ? x() : t = !1;
			else switch (b.charAt(e)) {
				case "d":
					r = v("d");
					break;
				case "D":
					w("D", l, m);
					break;
				case "o":
					s = v("o");
					break;
				case "m":
					q = v("m");
					break;
				case "M":
					q = w("M", n, o);
					break;
				case "y":
					p = v("y");
					break;
				case "@":
					h = new Date(v("@")), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate();
					break;
				case "!":
					h = new Date((v("!") - this._ticksTo1970) / 1e4), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate();
					break;
				case "'":
					u("'") ? x() : t = !0;
					break;
				default:
					x()
			}
			if (i < c.length && (g = c.substr(i), !/^\s+/.test(g))) throw "Extra/unparsed characters found in date: " + g;
			if (-1 === p ? p = (new Date).getFullYear() : 100 > p && (p += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (k >= p ? 0 : -100)), s > -1) for (q = 1, r = s;;) {
				if (f = this._getDaysInMonth(p, q - 1), f >= r) break;
				q++, r -= f
			}
			if (h = this._daylightSavingAdjust(new Date(p, q - 1, r)), h.getFullYear() !== p || h.getMonth() + 1 !== q || h.getDate() !== r) throw "Invalid date";
			return h
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
		formatDate: function(a, b, c) {
			if (!b) return "";
			var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
				f = (c ? c.dayNames : null) || this._defaults.dayNames,
				g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
				h = (c ? c.monthNames : null) || this._defaults.monthNames,
				i = function(b) {
					var c = d + 1 < a.length && a.charAt(d + 1) === b;
					return c && d++, c
				}, j = function(a, b, c) {
					var d = "" + b;
					if (i(a)) for (; d.length < c;) d = "0" + d;
					return d
				}, k = function(a, b, c, d) {
					return i(a) ? d[b] : c[b]
				}, l = "",
				m = !1;
			if (b) for (d = 0; d < a.length; d++) if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
			else switch (a.charAt(d)) {
				case "d":
					l += j("d", b.getDate(), 2);
					break;
				case "D":
					l += k("D", b.getDay(), e, f);
					break;
				case "o":
					l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
					break;
				case "m":
					l += j("m", b.getMonth() + 1, 2);
					break;
				case "M":
					l += k("M", b.getMonth(), g, h);
					break;
				case "y":
					l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
					break;
				case "@":
					l += b.getTime();
					break;
				case "!":
					l += 1e4 * b.getTime() + this._ticksTo1970;
					break;
				case "'":
					i("'") ? l += "'" : m = !0;
					break;
				default:
					l += a.charAt(d)
			}
			return l
		},
		_possibleChars: function(a) {
			var b, c = "",
				d = !1,
				e = function(c) {
					var d = b + 1 < a.length && a.charAt(b + 1) === c;
					return d && b++, d
				};
			for (b = 0; b < a.length; b++) if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
			else switch (a.charAt(b)) {
				case "d":
				case "m":
				case "y":
				case "@":
					c += "0123456789";
					break;
				case "D":
				case "M":
					return null;
				case "'":
					e("'") ? c += "'" : d = !0;
					break;
				default:
					c += a.charAt(b)
			}
			return c
		},
		_get: function(a, b) {
			return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b]
		},
		_setDateFromField: function(a, b) {
			if (a.input.val() !== a.lastVal) {
				var c = this._get(a, "dateFormat"),
					d = a.lastVal = a.input ? a.input.val() : null,
					e = this._getDefaultDate(a),
					f = e,
					g = this._getFormatConfig(a);
				try {
					f = this.parseDate(c, d, g) || e
				} catch (h) {
					d = b ? "" : d
				}
				a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
			}
		},
		_getDefaultDate: function(a) {
			return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
		},
		_determineDate: function(b, c, d) {
			var e = function(a) {
				var b = new Date;
				return b.setDate(b.getDate() + a), b
			}, f = function(c) {
				try {
					return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
				} catch (d) {}
				for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j;) {
					switch (j[2] || "d") {
						case "d":
						case "D":
							h += parseInt(j[1], 10);
							break;
						case "w":
						case "W":
							h += 7 * parseInt(j[1], 10);
							break;
						case "m":
						case "M":
							g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
							break;
						case "y":
						case "Y":
							f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g))
					}
					j = i.exec(c)
				}
				return new Date(f, g, h)
			}, g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
			return g = g && "Invalid Date" === g.toString() ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g)
		},
		_daylightSavingAdjust: function(a) {
			return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
		},
		_setDate: function(a, b, c) {
			var d = !b,
				e = a.selectedMonth,
				f = a.selectedYear,
				g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
			a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
		},
		_getDate: function(a) {
			var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return b
		},
		_attachHandlers: function(b) {
			var c = this._get(b, "stepMonths"),
				d = "#" + b.id.replace(/\\\\/g, "\\");
			b.dpDiv.find("[data-handler]").map(function() {
				var b = {
					prev: function() {
						a.datepicker._adjustDate(d, -c, "M")
					},
					next: function() {
						a.datepicker._adjustDate(d, +c, "M")
					},
					hide: function() {
						a.datepicker._hideDatepicker()
					},
					today: function() {
						a.datepicker._gotoToday(d)
					},
					selectDay: function() {
						return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return a.datepicker._selectMonthYear(d, this, "M"), !1
					},
					selectYear: function() {
						return a.datepicker._selectMonthYear(d, this, "Y"), !1
					}
				};
				a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(a) {
			var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
				P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
				Q = this._get(a, "isRTL"),
				R = this._get(a, "showButtonPanel"),
				S = this._get(a, "hideIfNoPrevNext"),
				T = this._get(a, "navigationAsDateFormat"),
				U = this._getNumberOfMonths(a),
				V = this._get(a, "showCurrentAtPos"),
				W = this._get(a, "stepMonths"),
				X = 1 !== U[0] || 1 !== U[1],
				Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
				Z = this._getMinMaxDate(a, "min"),
				$ = this._getMinMaxDate(a, "max"),
				_ = a.drawMonth - V,
				ab = a.drawYear;
			if (0 > _ && (_ += 12, ab--), $) for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && Z > b ? Z : b; this._daylightSavingAdjust(new Date(ab, _, 1)) > b;) _--, 0 > _ && (_ = 11, ab--);
			for (a.drawMonth = _, a.drawYear = ab, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ab, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, ab, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ab, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, ab, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; w < U[0]; w++) {
				for (x = "", this.maxRows = 4, y = 0; y < U[1]; y++) {
					if (z = this._daylightSavingAdjust(new Date(ab, _, a.selectedDay)), A = " ui-corner-all", B = "", X) {
						if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
							case 0:
								B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
								break;
							case U[1] - 1:
								B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
								break;
							default:
								B += " ui-datepicker-group-middle", A = ""
						}
						B += "'>"
					}
					for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ab, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; 7 > v; v++) D = (v + k) % 7, C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>";
					for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ab, _), ab === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(ab, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X && this.maxRows > G ? this.maxRows : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(ab, _, 1 - F)), J = 0; H > J; J++) {
						for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; 7 > v; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && Z > I || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
						B += K + "</tr>"
					}
					_++, _ > 11 && (_ = 0, ab++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
				}
				u += x
			}
			return u += j, a._keyEvent = !1, u
		},
		_generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
			var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
				r = this._get(a, "changeYear"),
				s = this._get(a, "showMonthAfterYear"),
				t = "<div class='ui-datepicker-title'>",
				u = "";
			if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
			else {
				for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; 12 > k; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
				u += "</select>"
			}
			if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml) if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
			else {
				for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function(a) {
					var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
					return isNaN(b) ? m : b
				}, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p >= o; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
				a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
			}
			return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>"
		},
		_adjustInstDate: function(a, b, c) {
			var d = a.drawYear + ("Y" === c ? b : 0),
				e = a.drawMonth + ("M" === c ? b : 0),
				f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
				g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
			a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), ("M" === c || "Y" === c) && this._notifyChange(a)
		},
		_restrictMinMax: function(a, b) {
			var c = this._getMinMaxDate(a, "min"),
				d = this._getMinMaxDate(a, "max"),
				e = c && c > b ? c : b;
			return d && e > d ? d : e
		},
		_notifyChange: function(a) {
			var b = this._get(a, "onChangeMonthYear");
			b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
		},
		_getNumberOfMonths: function(a) {
			var b = this._get(a, "numberOfMonths");
			return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
		},
		_getMinMaxDate: function(a, b) {
			return this._determineDate(a, this._get(a, b + "Date"), null)
		},
		_getDaysInMonth: function(a, b) {
			return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
		},
		_getFirstDayOfMonth: function(a, b) {
			return new Date(a, b, 1).getDay()
		},
		_canAdjustMonth: function(a, b, c, d) {
			var e = this._getNumberOfMonths(a),
				f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
			return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
		},
		_isInRange: function(a, b) {
			var c, d, e = this._getMinMaxDate(a, "min"),
				f = this._getMinMaxDate(a, "max"),
				g = null,
				h = null,
				i = this._get(a, "yearRange");
			return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
		},
		_getFormatConfig: function(a) {
			var b = this._get(a, "shortYearCutoff");
			return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
				shortYearCutoff: b,
				dayNamesShort: this._get(a, "dayNamesShort"),
				dayNames: this._get(a, "dayNames"),
				monthNamesShort: this._get(a, "monthNamesShort"),
				monthNames: this._get(a, "monthNames")
			}
		},
		_formatDate: function(a, b, c, d) {
			b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
			var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
		}
	}), a.fn.datepicker = function(b) {
		if (!this.length) return this;
		a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
		var c = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function() {
			"string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
		}) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
	}, a.datepicker = new e, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.11.2";
	var m = (a.datepicker, a.widget("ui.slider", a.ui.mouse, {
		version: "1.11.2",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		numPages: 5,
		_create: function() {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
		},
		_refresh: function() {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function() {
			var b, c, d = this.options,
				e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				f = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
				g = [];
			for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; c > b; b++) g.push(f);
			this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(b) {
				a(this).data("ui-slider-handle-index", b)
			})
		},
		_createRange: function() {
			var b = this.options,
				c = "";
			b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
				left: "",
				bottom: ""
			}) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : (this.range && this.range.remove(), this.range = null)
		},
		_setupEvents: function() {
			this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
		},
		_destroy: function() {
			this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
		},
		_mouseCapture: function(b) {
			var c, d, e, f, g, h, i, j, k = this,
				l = this.options;
			return l.disabled ? !1 : (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), c = {
				x: b.pageX,
				y: b.pageY
			}, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function(b) {
				var c = Math.abs(d - k.values(b));
				(e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)
			}), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
				left: 0,
				top: 0
			} : {
				left: b.pageX - i.left - f.width() / 2,
				top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(a) {
			var b = {
				x: a.pageX,
				y: a.pageY
			}, c = this._normValueFromMouse(b);
			return this._slide(a, this._handleIndex, c), !1
		},
		_mouseStop: function(a) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(a) {
			var b, c, d, e, f;
			return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
		},
		_start: function(a, b) {
			var c = {
				handle: this.handles[b],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
		},
		_slide: function(a, b, c) {
			var d, e, f;
			this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
				handle: this.handles[b],
				value: c,
				values: e
			}), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c))) : c !== this.value() && (f = this._trigger("slide", a, {
				handle: this.handles[b],
				value: c
			}), f !== !1 && this.value(c))
		},
		_stop: function(a, b) {
			var c = {
				handle: this.handles[b],
				value: this.value()
			};
			this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
		},
		_change: function(a, b) {
			if (!this._keySliding && !this._mouseSliding) {
				var c = {
					handle: this.handles[b],
					value: this.value()
				};
				this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)
			}
		},
		value: function(a) {
			return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()
		},
		values: function(b, c) {
			var d, e, f;
			if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
			if (!arguments.length) return this._values();
			if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
			for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
			this._refreshValue()
		},
		_setOption: function(b, c) {
			var d, e = 0;
			switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), "disabled" === b && this.element.toggleClass("ui-state-disabled", !! c), this._super(b, c), b) {
				case "orientation":
					this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === c ? "bottom" : "left", "");
					break;
				case "value":
					this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
					break;
				case "values":
					for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);
					this._animateOff = !1;
					break;
				case "step":
				case "min":
				case "max":
					this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
					break;
				case "range":
					this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_value: function() {
			var a = this.options.value;
			return a = this._trimAlignValue(a)
		},
		_values: function(a) {
			var b, c, d;
			if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
			if (this.options.values && this.options.values.length) {
				for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
				return c
			}
			return []
		},
		_trimAlignValue: function(a) {
			if (a <= this._valueMin()) return this._valueMin();
			if (a >= this._valueMax()) return this._valueMax();
			var b = this.options.step > 0 ? this.options.step : 1,
				c = (a - this._valueMin()) % b,
				d = a - c;
			return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
		},
		_calculateNewMax: function() {
			var a = (this.options.max - this._valueMin()) % this.options.step;
			this.max = this.options.max - a
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.max
		},
		_refreshValue: function() {
			var b, c, d, e, f, g = this.options.range,
				h = this.options,
				i = this,
				j = this._animateOff ? !1 : h.animate,
				k = {};
			this.options.values && this.options.values.length ? this.handles.each(function(d) {
				c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
					left: c + "%"
				}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
					width: c - b + "%"
				}, {
					queue: !1,
					duration: h.animate
				})) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
					bottom: c + "%"
				}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
					height: c - b + "%"
				}, {
					queue: !1,
					duration: h.animate
				}))), b = c
			}) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				width: c + "%"
			}, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
				width: 100 - c + "%"
			}, {
				queue: !1,
				duration: h.animate
			}), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				height: c + "%"
			}, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
				height: 100 - c + "%"
			}, {
				queue: !1,
				duration: h.animate
			}))
		},
		_handleEvents: {
			keydown: function(b) {
				var c, d, e, f, g = a(b.target).data("ui-slider-handle-index");
				switch (b.keyCode) {
					case a.ui.keyCode.HOME:
					case a.ui.keyCode.END:
					case a.ui.keyCode.PAGE_UP:
					case a.ui.keyCode.PAGE_DOWN:
					case a.ui.keyCode.UP:
					case a.ui.keyCode.RIGHT:
					case a.ui.keyCode.DOWN:
					case a.ui.keyCode.LEFT:
						if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, g), c === !1)) return
				}
				switch (f = this.options.step, d = e = this.options.values && this.options.values.length ? this.values(g) : this.value(), b.keyCode) {
					case a.ui.keyCode.HOME:
						e = this._valueMin();
						break;
					case a.ui.keyCode.END:
						e = this._valueMax();
						break;
					case a.ui.keyCode.PAGE_UP:
						e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case a.ui.keyCode.PAGE_DOWN:
						e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case a.ui.keyCode.UP:
					case a.ui.keyCode.RIGHT:
						if (d === this._valueMax()) return;
						e = this._trimAlignValue(d + f);
						break;
					case a.ui.keyCode.DOWN:
					case a.ui.keyCode.LEFT:
						if (d === this._valueMin()) return;
						e = this._trimAlignValue(d - f)
				}
				this._slide(b, g, e)
			},
			keyup: function(b) {
				var c = a(b.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
			}
		}
	}), "ui-effects-"),
		n = a;
	a.effects = {
		effect: {}
	},
	function(a, b) {
		function c(a, b, c) {
			var d = l[b.type] || {};
			return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
		}
		function d(b) {
			var c = j(),
				d = c._rgba = [];
			return b = b.toLowerCase(), o(i, function(a, e) {
				var f, g = e.re.exec(b),
					h = g && e.parse(g),
					i = e.space || "rgba";
				return h ? (f = c[i](h), c[k[i].cache] = f[k[i].cache], d = c._rgba = f._rgba, !1) : void 0
			}), d.length ? ("0,0,0,0" === d.join() && a.extend(d, f.transparent), c) : f[b]
		}
		function e(a, b, c) {
			return c = (c + 1) % 1, 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
		}
		var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
			h = /^([\-+])=\s*(\d+\.?\d*)/,
			i = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [a[1], a[2], a[3], a[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
				}
			}, {
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function(a) {
					return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
				}
			}, {
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function(a) {
					return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function(a) {
					return [a[1], a[2] / 100, a[3] / 100, a[4]]
				}
			}],
			j = a.Color = function(b, c, d, e) {
				return new a.Color.fn.parse(b, c, d, e)
			}, k = {
				rgba: {
					props: {
						red: {
							idx: 0,
							type: "byte"
						},
						green: {
							idx: 1,
							type: "byte"
						},
						blue: {
							idx: 2,
							type: "byte"
						}
					}
				},
				hsla: {
					props: {
						hue: {
							idx: 0,
							type: "degrees"
						},
						saturation: {
							idx: 1,
							type: "percent"
						},
						lightness: {
							idx: 2,
							type: "percent"
						}
					}
				}
			}, l = {
				"byte": {
					floor: !0,
					max: 255
				},
				percent: {
					max: 1
				},
				degrees: {
					mod: 360,
					floor: !0
				}
			}, m = j.support = {}, n = a("<p>")[0],
			o = a.each;
		n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function(a, b) {
			b.cache = "_" + a, b.props.alpha = {
				idx: 3,
				type: "percent",
				def: 1
			}
		}), j.fn = a.extend(j.prototype, {
			parse: function(e, g, h, i) {
				if (e === b) return this._rgba = [null, null, null, null], this;
				(e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
				var l = this,
					m = a.type(e),
					n = this._rgba = [];
				return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) {
					n[b.idx] = c(e[b.idx], b)
				}), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) {
					e[b.cache] && (l[b.cache] = e[b.cache].slice())
				}) : o(k, function(b, d) {
					var f = d.cache;
					o(d.props, function(a, b) {
						if (!l[f] && d.to) {
							if ("alpha" === a || null == e[a]) return;
							l[f] = d.to(l._rgba)
						}
						l[f][b.idx] = c(e[a], b, !0)
					}), l[f] && a.inArray(null, l[f].slice(0, 3)) < 0 && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
				}), this) : void 0
			},
			is: function(a) {
				var b = j(a),
					c = !0,
					d = this;
				return o(k, function(a, e) {
					var f, g = b[e.cache];
					return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], o(e.props, function(a, b) {
						return null != g[b.idx] ? c = g[b.idx] === f[b.idx] : void 0
					})), c
				}), c
			},
			_space: function() {
				var a = [],
					b = this;
				return o(k, function(c, d) {
					b[d.cache] && a.push(c)
				}), a.pop()
			},
			transition: function(a, b) {
				var d = j(a),
					e = d._space(),
					f = k[e],
					g = 0 === this.alpha() ? j("transparent") : this,
					h = g[f.cache] || f.to(g._rgba),
					i = h.slice();
				return d = d[f.cache], o(f.props, function(a, e) {
					var f = e.idx,
						g = h[f],
						j = d[f],
						k = l[e.type] || {};
					null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
				}), this[e](i)
			},
			blend: function(b) {
				if (1 === this._rgba[3]) return this;
				var c = this._rgba.slice(),
					d = c.pop(),
					e = j(b)._rgba;
				return j(a.map(c, function(a, b) {
					return (1 - d) * e[b] + d * a
				}))
			},
			toRgbaString: function() {
				var b = "rgba(",
					c = a.map(this._rgba, function(a, b) {
						return null == a ? b > 2 ? 1 : 0 : a
					});
				return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
			},
			toHslaString: function() {
				var b = "hsla(",
					c = a.map(this.hsla(), function(a, b) {
						return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
					});
				return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
			},
			toHexString: function(b) {
				var c = this._rgba.slice(),
					d = c.pop();
				return b && c.push(~~ (255 * d)), "#" + a.map(c, function(a) {
					return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
				}).join("")
			},
			toString: function() {
				return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
			}
		}), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) {
			if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
			var b, c, d = a[0] / 255,
				e = a[1] / 255,
				f = a[2] / 255,
				g = a[3],
				h = Math.max(d, e, f),
				i = Math.min(d, e, f),
				j = h - i,
				k = h + i,
				l = .5 * k;
			return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : .5 >= l ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
		}, k.hsla.from = function(a) {
			if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
			var b = a[0] / 360,
				c = a[1],
				d = a[2],
				f = a[3],
				g = .5 >= d ? d * (1 + c) : d + c - d * c,
				h = 2 * d - g;
			return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
		}, o(k, function(d, e) {
			var f = e.props,
				g = e.cache,
				i = e.to,
				k = e.from;
			j.fn[d] = function(d) {
				if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
				var e, h = a.type(d),
					l = "array" === h || "object" === h ? d : arguments,
					m = this[g].slice();
				return o(f, function(a, b) {
					var d = l["object" === h ? a : b.idx];
					null == d && (d = m[b.idx]), m[b.idx] = c(d, b)
				}), k ? (e = j(k(m)), e[g] = m, e) : j(m)
			}, o(f, function(b, c) {
				j.fn[b] || (j.fn[b] = function(e) {
					var f, g = a.type(e),
						i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
						j = this[i](),
						k = j[c.idx];
					return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
				})
			})
		}), j.hook = function(b) {
			var c = b.split(" ");
			o(c, function(b, c) {
				a.cssHooks[c] = {
					set: function(b, e) {
						var f, g, h = "";
						if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
							if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
								for (g = "backgroundColor" === c ? b.parentNode : b;
								("" === h || "transparent" === h) && g && g.style;) try {
									h = a.css(g, "backgroundColor"), g = g.parentNode
								} catch (i) {}
								e = e.blend(h && "transparent" !== h ? h : "_default")
							}
							e = e.toRgbaString()
						}
						try {
							b.style[c] = e
						} catch (i) {}
					}
				}, a.fx.step[c] = function(b) {
					b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
				}
			})
		}, j.hook(g), a.cssHooks.borderColor = {
			expand: function(a) {
				var b = {};
				return o(["Top", "Right", "Bottom", "Left"], function(c, d) {
					b["border" + d + "Color"] = a
				}), b
			}
		}, f = a.Color.names = {
			aqua: "#00ffff",
			black: "#000000",
			blue: "#0000ff",
			fuchsia: "#ff00ff",
			gray: "#808080",
			green: "#008000",
			lime: "#00ff00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			purple: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			teal: "#008080",
			white: "#ffffff",
			yellow: "#ffff00",
			transparent: [null, null, null, 0],
			_default: "#ffffff"
		}
	}(n),
	function() {
		function b(b) {
			var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
				f = {};
			if (e && e.length && e[0] && e[e[0]]) for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
			else for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
			return f
		}
		function c(b, c) {
			var d, f, g = {};
			for (d in c) f = c[d], b[d] !== f && (e[d] || (a.fx.step[d] || !isNaN(parseFloat(f))) && (g[d] = f));
			return g
		}
		var d = ["add", "remove", "toggle"],
			e = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1
			};
		a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) {
			a.fx.step[c] = function(a) {
				("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (n.style(a.elem, c, a.end), a.setAttr = !0)
			}
		}), a.fn.addBack || (a.fn.addBack = function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}), a.effects.animateClass = function(e, f, g, h) {
			var i = a.speed(f, g, h);
			return this.queue(function() {
				var f, g = a(this),
					h = g.attr("class") || "",
					j = i.children ? g.find("*").addBack() : g;
				j = j.map(function() {
					var c = a(this);
					return {
						el: c,
						start: b(this)
					}
				}), f = function() {
					a.each(d, function(a, b) {
						e[b] && g[b + "Class"](e[b])
					})
				}, f(), j = j.map(function() {
					return this.end = b(this.el[0]), this.diff = c(this.start, this.end), this
				}), g.attr("class", h), j = j.map(function() {
					var b = this,
						c = a.Deferred(),
						d = a.extend({}, i, {
							queue: !1,
							complete: function() {
								c.resolve(b)
							}
						});
					return this.el.animate(this.diff, d), c.promise()
				}), a.when.apply(a, j.get()).done(function() {
					f(), a.each(arguments, function() {
						var b = this.el;
						a.each(this.diff, function(a) {
							b.css(a, "")
						})
					}), i.complete.call(g[0])
				})
			})
		}, a.fn.extend({
			addClass: function(b) {
				return function(c, d, e, f) {
					return d ? a.effects.animateClass.call(this, {
						add: c
					}, d, e, f) : b.apply(this, arguments)
				}
			}(a.fn.addClass),
			removeClass: function(b) {
				return function(c, d, e, f) {
					return arguments.length > 1 ? a.effects.animateClass.call(this, {
						remove: c
					}, d, e, f) : b.apply(this, arguments)
				}
			}(a.fn.removeClass),
			toggleClass: function(b) {
				return function(c, d, e, f, g) {
					return "boolean" == typeof d || void 0 === d ? e ? a.effects.animateClass.call(this, d ? {
						add: c
					} : {
						remove: c
					}, e, f, g) : b.apply(this, arguments) : a.effects.animateClass.call(this, {
						toggle: c
					}, d, e, f)
				}
			}(a.fn.toggleClass),
			switchClass: function(b, c, d, e, f) {
				return a.effects.animateClass.call(this, {
					add: c,
					remove: b
				}, d, e, f)
			}
		})
	}(),
	function() {
		function b(b, c, d, e) {
			return a.isPlainObject(b) && (c = b, b = b.effect), b = {
				effect: b
			}, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
		}
		function c(b) {
			return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0
		}
		a.extend(a.effects, {
			version: "1.11.2",
			save: function(a, b) {
				for (var c = 0; c < b.length; c++) null !== b[c] && a.data(m + b[c], a[0].style[b[c]])
			},
			restore: function(a, b) {
				var c, d;
				for (d = 0; d < b.length; d++) null !== b[d] && (c = a.data(m + b[d]), void 0 === c && (c = ""), a.css(b[d], c))
			},
			setMode: function(a, b) {
				return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
			},
			getBaseline: function(a, b) {
				var c, d;
				switch (a[0]) {
					case "top":
						c = 0;
						break;
					case "middle":
						c = .5;
						break;
					case "bottom":
						c = 1;
						break;
					default:
						c = a[0] / b.height
				}
				switch (a[1]) {
					case "left":
						d = 0;
						break;
					case "center":
						d = .5;
						break;
					case "right":
						d = 1;
						break;
					default:
						d = a[1] / b.width
				}
				return {
					x: d,
					y: c
				}
			},
			createWrapper: function(b) {
				if (b.parent().is(".ui-effects-wrapper")) return b.parent();
				var c = {
					width: b.outerWidth(!0),
					height: b.outerHeight(!0),
					"float": b.css("float")
				}, d = a("<div></div>").addClass("ui-effects-wrapper").css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
					e = {
						width: b.width(),
						height: b.height()
					}, f = document.activeElement;
				try {
					f.id
				} catch (g) {
					f = document.body
				}
				return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
					position: "relative"
				}), b.css({
					position: "relative"
				})) : (a.extend(c, {
					position: b.css("position"),
					zIndex: b.css("z-index")
				}), a.each(["top", "left", "bottom", "right"], function(a, d) {
					c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
				}), b.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})), b.css(e), d.css(c).show()
			},
			removeWrapper: function(b) {
				var c = document.activeElement;
				return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
			},
			setTransition: function(b, c, d, e) {
				return e = e || {}, a.each(c, function(a, c) {
					var f = b.cssUnit(c);
					f[0] > 0 && (e[c] = f[0] * d + f[1])
				}), e
			}
		}), a.fn.extend({
			effect: function() {
				function c(b) {
					function c() {
						a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b()
					}
					var e = a(this),
						f = d.complete,
						h = d.mode;
					(e.is(":hidden") ? "hide" === h : "show" === h) ? (e[h](), c()) : g.call(e[0], d, c)
				}
				var d = b.apply(this, arguments),
					e = d.mode,
					f = d.queue,
					g = a.effects.effect[d.effect];
				return a.fx.off || !g ? e ? this[e](d.duration, d.complete) : this.each(function() {
					d.complete && d.complete.call(this)
				}) : f === !1 ? this.each(c) : this.queue(f || "fx", c)
			},
			show: function(a) {
				return function(d) {
					if (c(d)) return a.apply(this, arguments);
					var e = b.apply(this, arguments);
					return e.mode = "show", this.effect.call(this, e)
				}
			}(a.fn.show),
			hide: function(a) {
				return function(d) {
					if (c(d)) return a.apply(this, arguments);
					var e = b.apply(this, arguments);
					return e.mode = "hide", this.effect.call(this, e)
				}
			}(a.fn.hide),
			toggle: function(a) {
				return function(d) {
					if (c(d) || "boolean" == typeof d) return a.apply(this, arguments);
					var e = b.apply(this, arguments);
					return e.mode = "toggle", this.effect.call(this, e)
				}
			}(a.fn.toggle),
			cssUnit: function(b) {
				var c = this.css(b),
					d = [];
				return a.each(["em", "px", "%", "pt"], function(a, b) {
					c.indexOf(b) > 0 && (d = [parseFloat(c), b])
				}), d
			}
		})
	}(),
	function() {
		var b = {};
		a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) {
			b[c] = function(b) {
				return Math.pow(b, a + 2)
			}
		}), a.extend(b, {
			Sine: function(a) {
				return 1 - Math.cos(a * Math.PI / 2)
			},
			Circ: function(a) {
				return 1 - Math.sqrt(1 - a * a)
			},
			Elastic: function(a) {
				return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
			},
			Back: function(a) {
				return a * a * (3 * a - 2)
			},
			Bounce: function(a) {
				for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
				return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
			}
		}), a.each(b, function(b, c) {
			a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
				return 1 - c(1 - a)
			}, a.easing["easeInOut" + b] = function(a) {
				return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
			}
		})
	}();
	a.effects, a.effects.effect.blind = function(b, c) {
		var d, e, f, g = a(this),
			h = /up|down|vertical/,
			i = /up|left|vertical|horizontal/,
			j = ["position", "top", "bottom", "left", "right", "height", "width"],
			k = a.effects.setMode(g, b.mode || "hide"),
			l = b.direction || "up",
			m = h.test(l),
			n = m ? "height" : "width",
			o = m ? "top" : "left",
			p = i.test(l),
			q = {}, r = "show" === k;
		g.parent().is(".ui-effects-wrapper") ? a.effects.save(g.parent(), j) : a.effects.save(g, j), g.show(), d = a.effects.createWrapper(g).css({
			overflow: "hidden"
		}), e = d[n](), f = parseFloat(d.css(o)) || 0, q[n] = r ? e : 0, p || (g.css(m ? "bottom" : "right", 0).css(m ? "top" : "left", "auto").css({
			position: "absolute"
		}), q[o] = r ? f : e + f), r && (d.css(n, 0), p || d.css(o, f + e)), d.animate(q, {
			duration: b.duration,
			easing: b.easing,
			queue: !1,
			complete: function() {
				"hide" === k && g.hide(), a.effects.restore(g, j), a.effects.removeWrapper(g), c()
			}
		})
	}, a.effects.effect.bounce = function(b, c) {
		var d, e, f, g = a(this),
			h = ["position", "top", "bottom", "left", "right", "height", "width"],
			i = a.effects.setMode(g, b.mode || "effect"),
			j = "hide" === i,
			k = "show" === i,
			l = b.direction || "up",
			m = b.distance,
			n = b.times || 5,
			o = 2 * n + (k || j ? 1 : 0),
			p = b.duration / o,
			q = b.easing,
			r = "up" === l || "down" === l ? "top" : "left",
			s = "up" === l || "left" === l,
			t = g.queue(),
			u = t.length;
		for ((k || j) && h.push("opacity"), a.effects.save(g, h), g.show(), a.effects.createWrapper(g), m || (m = g["top" === r ? "outerHeight" : "outerWidth"]() / 3), k && (f = {
			opacity: 1
		}, f[r] = 0, g.css("opacity", 0).css(r, s ? 2 * -m : 2 * m).animate(f, p, q)), j && (m /= Math.pow(2, n - 1)), f = {}, f[r] = 0, d = 0; n > d; d++) e = {}, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q).animate(f, p, q), m = j ? 2 * m : m / 2;
		j && (e = {
			opacity: 0
		}, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q)), g.queue(function() {
			j && g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
		}), u > 1 && t.splice.apply(t, [1, 0].concat(t.splice(u, o + 1))), g.dequeue()
	}, a.effects.effect.clip = function(b, c) {
		var d, e, f, g = a(this),
			h = ["position", "top", "bottom", "left", "right", "height", "width"],
			i = a.effects.setMode(g, b.mode || "hide"),
			j = "show" === i,
			k = b.direction || "vertical",
			l = "vertical" === k,
			m = l ? "height" : "width",
			n = l ? "top" : "left",
			o = {};
		a.effects.save(g, h), g.show(), d = a.effects.createWrapper(g).css({
			overflow: "hidden"
		}), e = "IMG" === g[0].tagName ? d : g, f = e[m](), j && (e.css(m, 0), e.css(n, f / 2)), o[m] = j ? f : 0, o[n] = j ? 0 : f / 2, e.animate(o, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function() {
				j || g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
			}
		})
	}, a.effects.effect.drop = function(b, c) {
		var d, e = a(this),
			f = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
			g = a.effects.setMode(e, b.mode || "hide"),
			h = "show" === g,
			i = b.direction || "left",
			j = "up" === i || "down" === i ? "top" : "left",
			k = "up" === i || "left" === i ? "pos" : "neg",
			l = {
				opacity: h ? 1 : 0
			};
		a.effects.save(e, f), e.show(), a.effects.createWrapper(e), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0) / 2, h && e.css("opacity", 0).css(j, "pos" === k ? -d : d), l[j] = (h ? "pos" === k ? "+=" : "-=" : "pos" === k ? "-=" : "+=") + d, e.animate(l, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function() {
				"hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
			}
		})
	}, a.effects.effect.explode = function(b, c) {
		function d() {
			t.push(this), t.length === l * m && e()
		}
		function e() {
			n.css({
				visibility: "visible"
			}), a(t).remove(), p || n.hide(), c()
		}
		var f, g, h, i, j, k, l = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
			m = l,
			n = a(this),
			o = a.effects.setMode(n, b.mode || "hide"),
			p = "show" === o,
			q = n.show().css("visibility", "hidden").offset(),
			r = Math.ceil(n.outerWidth() / m),
			s = Math.ceil(n.outerHeight() / l),
			t = [];
		for (f = 0; l > f; f++) for (i = q.top + f * s, k = f - (l - 1) / 2, g = 0; m > g; g++) h = q.left + g * r, j = g - (m - 1) / 2, n.clone().appendTo("body").wrap("<div></div>").css({
			position: "absolute",
			visibility: "visible",
			left: -g * r,
			top: -f * s
		}).parent().addClass("ui-effects-explode").css({
			position: "absolute",
			overflow: "hidden",
			width: r,
			height: s,
			left: h + (p ? j * r : 0),
			top: i + (p ? k * s : 0),
			opacity: p ? 0 : 1
		}).animate({
			left: h + (p ? 0 : j * r),
			top: i + (p ? 0 : k * s),
			opacity: p ? 1 : 0
		}, b.duration || 500, b.easing, d)
	}, a.effects.effect.fade = function(b, c) {
		var d = a(this),
			e = a.effects.setMode(d, b.mode || "toggle");
		d.animate({
			opacity: e
		}, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}, a.effects.effect.fold = function(b, c) {
		var d, e, f = a(this),
			g = ["position", "top", "bottom", "left", "right", "height", "width"],
			h = a.effects.setMode(f, b.mode || "hide"),
			i = "show" === h,
			j = "hide" === h,
			k = b.size || 15,
			l = /([0-9]+)%/.exec(k),
			m = !! b.horizFirst,
			n = i !== m,
			o = n ? ["width", "height"] : ["height", "width"],
			p = b.duration / 2,
			q = {}, r = {};
		a.effects.save(f, g), f.show(), d = a.effects.createWrapper(f).css({
			overflow: "hidden"
		}), e = n ? [d.width(), d.height()] : [d.height(), d.width()], l && (k = parseInt(l[1], 10) / 100 * e[j ? 0 : 1]), i && d.css(m ? {
			height: 0,
			width: k
		} : {
			height: k,
			width: 0
		}), q[o[0]] = i ? e[0] : k, r[o[1]] = i ? e[1] : 0, d.animate(q, p, b.easing).animate(r, p, b.easing, function() {
			j && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
		})
	}, a.effects.effect.highlight = function(b, c) {
		var d = a(this),
			e = ["backgroundImage", "backgroundColor", "opacity"],
			f = a.effects.setMode(d, b.mode || "show"),
			g = {
				backgroundColor: d.css("backgroundColor")
			};
		"hide" === f && (g.opacity = 0), a.effects.save(d, e), d.show().css({
			backgroundImage: "none",
			backgroundColor: b.color || "#ffff99"
		}).animate(g, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function() {
				"hide" === f && d.hide(), a.effects.restore(d, e), c()
			}
		})
	}, a.effects.effect.size = function(b, c) {
		var d, e, f, g = a(this),
			h = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
			i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
			j = ["width", "height", "overflow"],
			k = ["fontSize"],
			l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			m = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			n = a.effects.setMode(g, b.mode || "effect"),
			o = b.restore || "effect" !== n,
			p = b.scale || "both",
			q = b.origin || ["middle", "center"],
			r = g.css("position"),
			s = o ? h : i,
			t = {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			};
		"show" === n && g.show(), d = {
			height: g.height(),
			width: g.width(),
			outerHeight: g.outerHeight(),
			outerWidth: g.outerWidth()
		}, "toggle" === b.mode && "show" === n ? (g.from = b.to || t, g.to = b.from || d) : (g.from = b.from || ("show" === n ? t : d), g.to = b.to || ("hide" === n ? t : d)), f = {
			from: {
				y: g.from.height / d.height,
				x: g.from.width / d.width
			},
			to: {
				y: g.to.height / d.height,
				x: g.to.width / d.width
			}
		}, ("box" === p || "both" === p) && (f.from.y !== f.to.y && (s = s.concat(l), g.from = a.effects.setTransition(g, l, f.from.y, g.from), g.to = a.effects.setTransition(g, l, f.to.y, g.to)), f.from.x !== f.to.x && (s = s.concat(m), g.from = a.effects.setTransition(g, m, f.from.x, g.from), g.to = a.effects.setTransition(g, m, f.to.x, g.to))), ("content" === p || "both" === p) && f.from.y !== f.to.y && (s = s.concat(k).concat(j), g.from = a.effects.setTransition(g, k, f.from.y, g.from), g.to = a.effects.setTransition(g, k, f.to.y, g.to)), a.effects.save(g, s), g.show(), a.effects.createWrapper(g), g.css("overflow", "hidden").css(g.from), q && (e = a.effects.getBaseline(q, d), g.from.top = (d.outerHeight - g.outerHeight()) * e.y, g.from.left = (d.outerWidth - g.outerWidth()) * e.x, g.to.top = (d.outerHeight - g.to.outerHeight) * e.y, g.to.left = (d.outerWidth - g.to.outerWidth) * e.x), g.css(g.from), ("content" === p || "both" === p) && (l = l.concat(["marginTop", "marginBottom"]).concat(k), m = m.concat(["marginLeft", "marginRight"]), j = h.concat(l).concat(m), g.find("*[width]").each(function() {
			var c = a(this),
				d = {
					height: c.height(),
					width: c.width(),
					outerHeight: c.outerHeight(),
					outerWidth: c.outerWidth()
				};
			o && a.effects.save(c, j), c.from = {
				height: d.height * f.from.y,
				width: d.width * f.from.x,
				outerHeight: d.outerHeight * f.from.y,
				outerWidth: d.outerWidth * f.from.x
			}, c.to = {
				height: d.height * f.to.y,
				width: d.width * f.to.x,
				outerHeight: d.height * f.to.y,
				outerWidth: d.width * f.to.x
			}, f.from.y !== f.to.y && (c.from = a.effects.setTransition(c, l, f.from.y, c.from), c.to = a.effects.setTransition(c, l, f.to.y, c.to)), f.from.x !== f.to.x && (c.from = a.effects.setTransition(c, m, f.from.x, c.from), c.to = a.effects.setTransition(c, m, f.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function() {
				o && a.effects.restore(c, j)
			})
		})), g.animate(g.to, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function() {
				0 === g.to.opacity && g.css("opacity", g.from.opacity), "hide" === n && g.hide(), a.effects.restore(g, s), o || ("static" === r ? g.css({
					position: "relative",
					top: g.to.top,
					left: g.to.left
				}) : a.each(["top", "left"], function(a, b) {
					g.css(b, function(b, c) {
						var d = parseInt(c, 10),
							e = a ? g.to.left : g.to.top;
						return "auto" === c ? e + "px" : d + e + "px"
					})
				})), a.effects.removeWrapper(g), c()
			}
		})
	}, a.effects.effect.scale = function(b, c) {
		var d = a(this),
			e = a.extend(!0, {}, b),
			f = a.effects.setMode(d, b.mode || "effect"),
			g = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === f ? 0 : 100),
			h = b.direction || "both",
			i = b.origin,
			j = {
				height: d.height(),
				width: d.width(),
				outerHeight: d.outerHeight(),
				outerWidth: d.outerWidth()
			}, k = {
				y: "horizontal" !== h ? g / 100 : 1,
				x: "vertical" !== h ? g / 100 : 1
			};
		e.effect = "size", e.queue = !1, e.complete = c, "effect" !== f && (e.origin = i || ["middle", "center"], e.restore = !0), e.from = b.from || ("show" === f ? {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		} : j), e.to = {
			height: j.height * k.y,
			width: j.width * k.x,
			outerHeight: j.outerHeight * k.y,
			outerWidth: j.outerWidth * k.x
		}, e.fade && ("show" === f && (e.from.opacity = 0, e.to.opacity = 1), "hide" === f && (e.from.opacity = 1, e.to.opacity = 0)), d.effect(e)
	}, a.effects.effect.puff = function(b, c) {
		var d = a(this),
			e = a.effects.setMode(d, b.mode || "hide"),
			f = "hide" === e,
			g = parseInt(b.percent, 10) || 150,
			h = g / 100,
			i = {
				height: d.height(),
				width: d.width(),
				outerHeight: d.outerHeight(),
				outerWidth: d.outerWidth()
			};
		a.extend(b, {
			effect: "scale",
			queue: !1,
			fade: !0,
			mode: e,
			complete: c,
			percent: f ? g : 100,
			from: f ? i : {
				height: i.height * h,
				width: i.width * h,
				outerHeight: i.outerHeight * h,
				outerWidth: i.outerWidth * h
			}
		}), d.effect(b)
	}, a.effects.effect.pulsate = function(b, c) {
		var d, e = a(this),
			f = a.effects.setMode(e, b.mode || "show"),
			g = "show" === f,
			h = "hide" === f,
			i = g || "hide" === f,
			j = 2 * (b.times || 5) + (i ? 1 : 0),
			k = b.duration / j,
			l = 0,
			m = e.queue(),
			n = m.length;
		for ((g || !e.is(":visible")) && (e.css("opacity", 0).show(), l = 1), d = 1; j > d; d++) e.animate({
			opacity: l
		}, k, b.easing), l = 1 - l;
		e.animate({
			opacity: l
		}, k, b.easing), e.queue(function() {
			h && e.hide(), c()
		}), n > 1 && m.splice.apply(m, [1, 0].concat(m.splice(n, j + 1))), e.dequeue()
	}, a.effects.effect.shake = function(b, c) {
		var d, e = a(this),
			f = ["position", "top", "bottom", "left", "right", "height", "width"],
			g = a.effects.setMode(e, b.mode || "effect"),
			h = b.direction || "left",
			i = b.distance || 20,
			j = b.times || 3,
			k = 2 * j + 1,
			l = Math.round(b.duration / k),
			m = "up" === h || "down" === h ? "top" : "left",
			n = "up" === h || "left" === h,
			o = {}, p = {}, q = {}, r = e.queue(),
			s = r.length;
		for (a.effects.save(e, f), e.show(), a.effects.createWrapper(e), o[m] = (n ? "-=" : "+=") + i, p[m] = (n ? "+=" : "-=") + 2 * i, q[m] = (n ? "-=" : "+=") + 2 * i, e.animate(o, l, b.easing), d = 1; j > d; d++) e.animate(p, l, b.easing).animate(q, l, b.easing);
		e.animate(p, l, b.easing).animate(o, l / 2, b.easing).queue(function() {
			"hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
		}), s > 1 && r.splice.apply(r, [1, 0].concat(r.splice(s, k + 1))), e.dequeue()
	}, a.effects.effect.slide = function(b, c) {
		var d, e = a(this),
			f = ["position", "top", "bottom", "left", "right", "width", "height"],
			g = a.effects.setMode(e, b.mode || "show"),
			h = "show" === g,
			i = b.direction || "left",
			j = "up" === i || "down" === i ? "top" : "left",
			k = "up" === i || "left" === i,
			l = {};
		a.effects.save(e, f), e.show(), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(e).css({
			overflow: "hidden"
		}), h && e.css(j, k ? isNaN(d) ? "-" + d : -d : d), l[j] = (h ? k ? "+=" : "-=" : k ? "-=" : "+=") + d, e.animate(l, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function() {
				"hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
			}
		})
	}, a.effects.effect.transfer = function(b, c) {
		var d = a(this),
			e = a(b.to),
			f = "fixed" === e.css("position"),
			g = a("body"),
			h = f ? g.scrollTop() : 0,
			i = f ? g.scrollLeft() : 0,
			j = e.offset(),
			k = {
				top: j.top - h,
				left: j.left - i,
				height: e.innerHeight(),
				width: e.innerWidth()
			}, l = d.offset(),
			m = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(b.className).css({
				top: l.top - h,
				left: l.left - i,
				height: d.innerHeight(),
				width: d.innerWidth(),
				position: f ? "fixed" : "absolute"
			}).animate(k, b.duration, b.easing, function() {
				m.remove(), c()
			})
	}
}),
function(a) {
	function b() {
		var a = h();
		a !== i && (i = a, l.trigger("orientationchange"))
	}
	function c(b, c, d, e) {
		var f = d.type;
		d.type = c, a.event.dispatch.call(b, d, e), d.type = f
	}
	a.attrFn = a.attrFn || {};
	var d = navigator.userAgent.toLowerCase(),
		e = d.indexOf("chrome") > -1 && (d.indexOf("windows") > -1 || d.indexOf("macintosh") > -1 || d.indexOf("linux") > -1) && d.indexOf("chrome") < 0,
		f = {
			swipe_h_threshold: 50,
			swipe_v_threshold: 50,
			taphold_threshold: 750,
			doubletap_int: 500,
			touch_capable: "ontouchstart" in document.documentElement && !e,
			orientation_support: "orientation" in window && "onorientationchange" in window,
			startevent: "ontouchstart" in document.documentElement && !e ? "touchstart" : "mousedown",
			endevent: "ontouchstart" in document.documentElement && !e ? "touchend" : "mouseup",
			moveevent: "ontouchstart" in document.documentElement && !e ? "touchmove" : "mousemove",
			tapevent: "ontouchstart" in document.documentElement && !e ? "tap" : "click",
			scrollevent: "ontouchstart" in document.documentElement && !e ? "touchmove" : "scroll",
			hold_timer: null,
			tap_timer: null
		};
	a.isTouchCapable = function() {
		return f.touch_capable
	}, a.getStartEvent = function() {
		return f.startevent
	}, a.getEndEvent = function() {
		return f.endevent
	}, a.getMoveEvent = function() {
		return f.moveevent
	}, a.getTapEvent = function() {
		return f.tapevent
	}, a.getScrollEvent = function() {
		return f.scrollevent
	}, a.each(["tapstart", "tapend", "tap", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(b, c) {
		a.fn[c] = function(a) {
			return a ? this.bind(c, a) : this.trigger(c)
		}, a.attrFn[c] = !0
	}), a.event.special.tapstart = {
		setup: function() {
			var b = this,
				d = a(b);
			d.bind(f.startevent, function(a) {
				if (d.data("callee", arguments.callee), a.which && 1 !== a.which) return !1;
				var e = a.originalEvent,
					g = {
						position: {
							x: f.touch_capable ? e.touches[0].screenX : a.screenX,
							y: f.touch_capable ? e.touches[0].screenY : a.screenY
						},
						offset: {
							x: f.touch_capable ? e.touches[0].pageX - e.touches[0].target.offsetLeft : a.offsetX,
							y: f.touch_capable ? e.touches[0].pageY - e.touches[0].target.offsetTop : a.offsetY
						},
						time: (new Date).getTime(),
						target: a.target
					};
				return c(b, "tapstart", a, g), !0
			})
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee)
		}
	}, a.event.special.tapend = {
		setup: function() {
			var b = this,
				d = a(b);
			d.bind(f.endevent, function(a) {
				d.data("callee", arguments.callee);
				var e = a.originalEvent,
					g = {
						position: {
							x: f.touch_capable ? e.changedTouches[0].screenX : a.screenX,
							y: f.touch_capable ? e.changedTouches[0].screenY : a.screenY
						},
						offset: {
							x: f.touch_capable ? e.changedTouches[0].pageX - e.changedTouches[0].target.offsetLeft : a.offsetX,
							y: f.touch_capable ? e.changedTouches[0].pageY - e.changedTouches[0].target.offsetTop : a.offsetY
						},
						time: (new Date).getTime(),
						target: a.target
					};
				return c(b, "tapend", a, g), !0
			})
		},
		remove: function() {
			a(this).unbind(f.endevent, a(this).data.callee)
		}
	}, a.event.special.taphold = {
		setup: function() {
			var b, d = this,
				e = a(d),
				g = {
					x: 0,
					y: 0
				};
			e.bind(f.startevent, function(a) {
				if (a.which && 1 !== a.which) return !1;
				e.data("tapheld", !1), b = a.target;
				var h = a.originalEvent,
					i = (new Date).getTime(),
					j = {
						x: f.touch_capable ? h.touches[0].screenX : a.screenX,
						y: f.touch_capable ? h.touches[0].screenY : a.screenY
					}, k = {
						x: f.touch_capable ? h.touches[0].pageX - h.touches[0].target.offsetLeft : a.offsetX,
						y: f.touch_capable ? h.touches[0].pageY - h.touches[0].target.offsetTop : a.offsetY
					};
				return g.x = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageX : a.pageX, g.y = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageY : a.pageY, f.hold_timer = window.setTimeout(function() {
					var l = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageX : a.pageX,
						m = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageY : a.pageY;
					if (a.target == b && g.x == l && g.y == m) {
						e.data("tapheld", !0);
						var n = (new Date).getTime(),
							o = {
								x: f.touch_capable ? h.touches[0].screenX : a.screenX,
								y: f.touch_capable ? h.touches[0].screenY : a.screenY
							}, p = {
								x: f.touch_capable ? h.touches[0].pageX - h.touches[0].target.offsetLeft : a.offsetX,
								y: f.touch_capable ? h.touches[0].pageY - h.touches[0].target.offsetTop : a.offsetY
							};
						duration = n - i;
						var q = {
							startTime: i,
							endTime: n,
							startPosition: j,
							startOffset: k,
							endPosition: o,
							endOffset: p,
							duration: duration,
							target: a.target
						};
						e.data("callee1", arguments.callee), c(d, "taphold", a, q)
					}
				}, f.taphold_threshold), !0
			}).bind(f.endevent, function() {
				e.data("callee2", arguments.callee), e.data("tapheld", !1), window.clearTimeout(f.hold_timer)
			})
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee1).unbind(f.endevent, a(this).data.callee2)
		}
	}, a.event.special.doubletap = {
		setup: function() {
			var b, d, e, g, h = this,
				i = a(h);
			i.bind(f.startevent, function(a) {
				return a.which && 1 !== a.which ? !1 : (i.data("doubletapped", !1), b = a.target, i.data("callee1", arguments.callee), g = a.originalEvent, e = {
					position: {
						x: f.touch_capable ? g.touches[0].screenX : a.screenX,
						y: f.touch_capable ? g.touches[0].screenY : a.screenY
					},
					offset: {
						x: f.touch_capable ? g.touches[0].pageX - g.touches[0].target.offsetLeft : a.offsetX,
						y: f.touch_capable ? g.touches[0].pageY - g.touches[0].target.offsetTop : a.offsetY
					},
					time: (new Date).getTime(),
					target: a.target
				}, !0)
			}).bind(f.endevent, function(a) {
				var j = (new Date).getTime(),
					k = i.data("lastTouch") || j + 1,
					l = j - k;
				if (window.clearTimeout(d), i.data("callee2", arguments.callee), l < f.doubletap_int && l > 0 && a.target == b && l > 100) {
					i.data("doubletapped", !0), window.clearTimeout(f.tap_timer);
					var m = {
						position: {
							x: f.touch_capable ? g.touches[0].screenX : a.screenX,
							y: f.touch_capable ? g.touches[0].screenY : a.screenY
						},
						offset: {
							x: f.touch_capable ? g.touches[0].pageX - g.touches[0].target.offsetLeft : a.offsetX,
							y: f.touch_capable ? g.touches[0].pageY - g.touches[0].target.offsetTop : a.offsetY
						},
						time: (new Date).getTime(),
						target: a.target
					}, n = {
						firstTap: e,
						secondTap: m,
						interval: m.time - e.time
					};
					c(h, "doubletap", a, n)
				} else i.data("lastTouch", j), d = window.setTimeout(function() {
					window.clearTimeout(d)
				}, f.doubletap_int, [a]);
				i.data("lastTouch", j)
			})
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee1).unbind(f.endevent, a(this).data.callee2)
		}
	}, a.event.special.singletap = {
		setup: function() {
			var b = this,
				d = a(b),
				e = null,
				g = null,
				h = {
					x: 0,
					y: 0
				};
			d.bind(f.startevent, function(a) {
				return a.which && 1 !== a.which ? !1 : (g = (new Date).getTime(), e = a.target, d.data("callee1", arguments.callee), h.x = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageX : a.pageX, h.y = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageY : a.pageY, !0)
			}).bind(f.endevent, function(a) {
				d.data("callee2", arguments.callee), a.target == e && (end_pos_x = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0].pageX : a.pageX, end_pos_y = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0].pageY : a.pageY, f.tap_timer = window.setTimeout(function() {
					if (!d.data("doubletapped") && !d.data("tapheld") && h.x == end_pos_x && h.y == end_pos_y) {
						var e = a.originalEvent,
							i = {
								position: {
									x: f.touch_capable ? e.changedTouches[0].screenX : a.screenX,
									y: f.touch_capable ? e.changedTouches[0].screenY : a.screenY
								},
								offset: {
									x: f.touch_capable ? e.changedTouches[0].pageX - e.changedTouches[0].target.offsetLeft : a.offsetX,
									y: f.touch_capable ? e.changedTouches[0].pageY - e.changedTouches[0].target.offsetTop : a.offsetY
								},
								time: (new Date).getTime(),
								target: a.target
							};
						i.time - g < f.taphold_threshold && c(b, "singletap", a, i)
					}
				}, f.doubletap_int))
			})
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee1).unbind(f.endevent, a(this).data.callee2)
		}
	}, a.event.special.tap = {
		setup: function() {
			var b, d = this,
				e = a(d),
				g = !1,
				h = null,
				i = {
					x: 0,
					y: 0
				};
			e.bind(f.startevent, function(a) {
				return e.data("callee1", arguments.callee), a.which && 1 !== a.which ? !1 : (g = !0, i.x = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageX : a.pageX, i.y = a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0].pageY : a.pageY, b = (new Date).getTime(), h = a.target, !0)
			}).bind(f.endevent, function(a) {
				e.data("callee2", arguments.callee);
				var j = a.originalEvent.targetTouches ? a.originalEvent.changedTouches[0].pageX : a.pageX,
					k = a.originalEvent.targetTouches ? a.originalEvent.changedTouches[0].pageY : a.pageY;
				if (h == a.target && g && (new Date).getTime() - b < f.taphold_threshold && i.x == j && i.y == k) {
					var l = a.originalEvent,
						m = {
							position: {
								x: f.touch_capable ? l.changedTouches[0].screenX : a.screenX,
								y: f.touch_capable ? l.changedTouches[0].screenY : a.screenY
							},
							offset: {
								x: f.touch_capable ? l.changedTouches[0].pageX - l.changedTouches[0].target.offsetLeft : a.offsetX,
								y: f.touch_capable ? l.changedTouches[0].pageY - l.changedTouches[0].target.offsetTop : a.offsetY
							},
							time: (new Date).getTime(),
							target: a.target
						};
					c(d, "tap", a, m)
				}
			})
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee1).unbind(f.endevent, a(this).data.callee2)
		}
	}, a.event.special.swipe = {
		setup: function() {
			function b(b) {
				h = a(b.target), h.data("callee1", arguments.callee), k.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, k.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, l.x = k.x, l.y = k.y, i = !0;
				var c = b.originalEvent;
				e = {
					position: {
						x: f.touch_capable ? c.touches[0].screenX : b.screenX,
						y: f.touch_capable ? c.touches[0].screenY : b.screenY
					},
					offset: {
						x: f.touch_capable ? c.touches[0].pageX - c.touches[0].target.offsetLeft : b.offsetX,
						y: f.touch_capable ? c.touches[0].pageY - c.touches[0].target.offsetTop : b.offsetY
					},
					time: (new Date).getTime(),
					target: b.target
				};
				for (var d = new Date; new Date - d < 100;);
			}
			function c(b) {
				h = a(b.target), h.data("callee2", arguments.callee), l.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, l.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, window.clearTimeout(f.hold_timer);
				var c, d = h.data("xthreshold"),
					g = h.data("ythreshold"),
					m = "undefined" != typeof d && d !== !1 && parseInt(d) ? parseInt(d) : f.swipe_h_threshold,
					n = "undefined" != typeof g && g !== !1 && parseInt(g) ? parseInt(g) : f.swipe_v_threshold;
				if (k.y > l.y && k.y - l.y > n && (c = "swipeup"), k.x < l.x && l.x - k.x > m && (c = "swiperight"), k.y < l.y && l.y - k.y > n && (c = "swipedown"), k.x > l.x && k.x - l.x > m && (c = "swipeleft"), void 0 != c && i) {
					k.x = 0, k.y = 0, l.x = 0, l.y = 0, i = !1;
					var o = b.originalEvent;
					endEvnt = {
						position: {
							x: f.touch_capable ? o.touches[0].screenX : b.screenX,
							y: f.touch_capable ? o.touches[0].screenY : b.screenY
						},
						offset: {
							x: f.touch_capable ? o.touches[0].pageX - o.touches[0].target.offsetLeft : b.offsetX,
							y: f.touch_capable ? o.touches[0].pageY - o.touches[0].target.offsetTop : b.offsetY
						},
						time: (new Date).getTime(),
						target: b.target
					};
					var p = Math.abs(e.position.x - endEvnt.position.x),
						q = Math.abs(e.position.y - endEvnt.position.y),
						r = {
							startEvnt: e,
							endEvnt: endEvnt,
							direction: c.replace("swipe", ""),
							xAmount: p,
							yAmount: q,
							duration: endEvnt.time - e.time
						};
					j = !0, h.trigger("swipe", r).trigger(c, r)
				}
			}
			function d(b) {
				h = a(b.target);
				var c = "";
				if (h.data("callee3", arguments.callee), j) {
					var d = h.data("xthreshold"),
						g = h.data("ythreshold"),
						k = "undefined" != typeof d && d !== !1 && parseInt(d) ? parseInt(d) : f.swipe_h_threshold,
						l = "undefined" != typeof g && g !== !1 && parseInt(g) ? parseInt(g) : f.swipe_v_threshold,
						m = b.originalEvent;
					endEvnt = {
						position: {
							x: f.touch_capable ? m.changedTouches[0].screenX : b.screenX,
							y: f.touch_capable ? m.changedTouches[0].screenY : b.screenY
						},
						offset: {
							x: f.touch_capable ? m.changedTouches[0].pageX - m.changedTouches[0].target.offsetLeft : b.offsetX,
							y: f.touch_capable ? m.changedTouches[0].pageY - m.changedTouches[0].target.offsetTop : b.offsetY
						},
						time: (new Date).getTime(),
						target: b.target
					}, e.position.y > endEvnt.position.y && e.position.y - endEvnt.position.y > l && (c = "swipeup"), e.position.x < endEvnt.position.x && endEvnt.position.x - e.position.x > k && (c = "swiperight"), e.position.y < endEvnt.position.y && endEvnt.position.y - e.position.y > l && (c = "swipedown"), e.position.x > endEvnt.position.x && e.position.x - endEvnt.position.x > k && (c = "swipeleft");
					var n = Math.abs(e.position.x - endEvnt.position.x),
						o = Math.abs(e.position.y - endEvnt.position.y),
						p = {
							startEvnt: e,
							endEvnt: endEvnt,
							direction: c.replace("swipe", ""),
							xAmount: n,
							yAmount: o,
							duration: endEvnt.time - e.time
						};
					h.trigger("swipeend", p)
				}
				i = !1, j = !1
			}
			var e, g = this,
				h = a(g),
				i = !1,
				j = !1,
				k = {
					x: 0,
					y: 0
				}, l = {
					x: 0,
					y: 0
				};
			h.bind(f.startevent, b), h.bind(f.moveevent, c), h.bind(f.endevent, d)
		},
		remove: function() {
			a(this).unbind(f.startevent, a(this).data.callee1).unbind(f.moveevent, a(this).data.callee2).unbind(f.endevent, a(this).data.callee3)
		}
	}, a.event.special.scrollstart = {
		setup: function() {
			function b(a, b) {
				d = b, c(g, d ? "scrollstart" : "scrollend", a)
			}
			var d, e, g = this,
				h = a(g);
			h.bind(f.scrollevent, function(a) {
				h.data("callee", arguments.callee), d || b(a, !0), clearTimeout(e), e = setTimeout(function() {
					b(a, !1)
				}, 50)
			})
		},
		remove: function() {
			a(this).unbind(f.scrollevent, a(this).data.callee)
		}
	};
	var g, h, i, j, k, l = a(window),
		m = {
			0: !0,
			180: !0
		};
	if (f.orientation_support) {
		var n = window.innerWidth || a(window).width(),
			o = window.innerHeight || a(window).height(),
			p = 50;
		j = n > o && n - o > p, k = m[window.orientation], (j && k || !j && !k) && (m = {
			"-90": !0,
			90: !0
		})
	}
	a.event.special.orientationchange = g = {
		setup: function() {
			return f.orientation_support ? !1 : (i = h(), l.bind("throttledresize", b), !0)
		},
		teardown: function() {
			return f.orientation_support ? !1 : (l.unbind("throttledresize", b), !0)
		},
		add: function(a) {
			var b = a.handler;
			a.handler = function(a) {
				return a.orientation = h(), b.apply(this, arguments)
			}
		}
	}, a.event.special.orientationchange.orientation = h = function() {
		var a = !0,
			b = document.documentElement;
		return a = f.orientation_support ? m[window.orientation] : b && b.clientWidth / b.clientHeight < 1.1, a ? "portrait" : "landscape"
	}, a.event.special.throttledresize = {
		setup: function() {
			a(this).bind("resize", u)
		},
		teardown: function() {
			a(this).unbind("resize", u)
		}
	};
	var q, r, s, t = 250,
		u = function() {
			r = (new Date).getTime(), s = r - v, s >= t ? (v = r, a(this).trigger("throttledresize")) : (q && window.clearTimeout(q), q = window.setTimeout(b, t - s))
		}, v = 0;
	a.each({
		scrollend: "scrollstart",
		swipeup: "swipe",
		swiperight: "swipe",
		swipedown: "swipe",
		swipeleft: "swipe",
		swipeend: "swipe"
	}, function(b, c) {
		a.event.special[b] = {
			setup: function() {
				a(this).bind(c, a.noop)
			}
		}
	})
}(jQuery),
function(a, b, c) {
	"undefined" != typeof c.module && c.module.exports ? c.module.exports = b.apply(c) : "undefined" != typeof c.define && "function" === c.define && c.define.amd ? define(a, [], b) : c[a] = b()
}("ydn", function() {
	function r(a) {
		return void 0 !== a
	}
	function aa(a) {
		var b = typeof a;
		if ("object" == b) {
			if (!a) return "null";
			if (a instanceof Array) return "array";
			if (a instanceof Object) return b;
			var c = Object.prototype.toString.call(a);
			if ("[object Window]" == c) return "object";
			if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
			if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
		} else if ("function" == b && "undefined" == typeof a.call) return "object";
		return b
	}
	function t(a) {
		return "array" == aa(a)
	}
	function x(a) {
		var b = aa(a);
		return "array" == b || "object" == b && "number" == typeof a.length
	}
	function y(a) {
		return "string" == typeof a
	}
	function ba(a) {
		return "boolean" == typeof a
	}
	function A(a) {
		return "number" == typeof a
	}
	function ca(a) {
		return "function" == aa(a)
	}
	function B(a) {
		var b = typeof a;
		return "object" == b && null != a || "function" == b
	}
	function fa(a) {
		return a.call.apply(a.bind, arguments)
	}
	function ga(a, b) {
		if (!a) throw Error();
		if (2 < arguments.length) {
			var c = Array.prototype.slice.call(arguments, 2);
			return function() {
				var d = Array.prototype.slice.call(arguments);
				return Array.prototype.unshift.apply(d, c), a.apply(b, d)
			}
		}
		return function() {
			return a.apply(b, arguments)
		}
	}
	function C() {
		return C = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga, C.apply(null, arguments)
	}
	function ha(a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return function() {
			var c = b.slice();
			return c.push.apply(c, arguments), a.apply(this, c)
		}
	}
	function ja(a, b) {
		var c = a.split("."),
			d = q;
		c[0] in d || !d.execScript || d.execScript("var " + c[0]);
		for (var e; c.length && (e = c.shift());)!c.length && r(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
	}
	function D(a, b) {
		function c() {}
		c.prototype = b.prototype, a.G = b.prototype, a.prototype = new c, a.prototype.constructor = a, a.Ob = function(a, c) {
			for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
			return b.prototype[c].apply(a, d)
		}
	}
	function ka(a) {
		a.prototype.then = a.prototype.then, a.prototype.$goog_Thenable = !0
	}
	function la(a) {
		if (!a) return !1;
		try {
			return !!a.$goog_Thenable
		} catch (b) {
			return !1
		}
	}
	function ma(a) {
		if (Error.captureStackTrace) Error.captureStackTrace(this, ma);
		else {
			var b = Error().stack;
			b && (this.stack = b)
		}
		a && (this.message = String(a))
	}
	function na(a) {
		for (var b = 0; 1 > b; b++) if ('"' == a.charAt(0) && '"' == a.charAt(a.length - 1)) return a.substring(1, a.length - 1);
		return a
	}
	function ra(a) {
		if (a = String(a), a.quote) return a.quote();
		for (var b = ['"'], c = 0; c < a.length; c++) {
			var d, e = a.charAt(c),
				f = e.charCodeAt(0),
				g = c + 1;
			(d = oa[e]) || (f > 31 && 127 > f || (e in pa ? e = pa[e] : e in oa ? e = pa[e] = oa[e] : (f = e, d = e.charCodeAt(0), d > 31 && 127 > d ? f = e : (256 > d ? (f = "\\x", (16 > d || d > 256) && (f += "0")) : (f = "\\u", 4096 > d && (f += "0")), f += d.toString(16).toUpperCase()), e = pa[e] = f)), d = e), b[g] = d
		}
		return b.push('"'), b.join("")
	}
	function wa(a, b) {
		var c = xa(a, b, void 0);
		return 0 > c ? null : y(a) ? a.charAt(c) : a[c]
	}
	function xa(a, b, c) {
		for (var d = a.length, e = y(a) ? a.split("") : a, f = 0; d > f; f++) if (f in e && b.call(c, e[f], f, a)) return f;
		return -1
	}
	function ya(a) {
		if (!t(a)) for (var b = a.length - 1; b >= 0; b--) delete a[b];
		a.length = 0
	}
	function za(a) {
		var b = a.length;
		if (b > 0) {
			for (var c = Array(b), d = 0; b > d; d++) c[d] = a[d];
			return c
		}
		return []
	}
	function Aa(a, b, c) {
		return 2 >= arguments.length ? sa.slice.call(a, b) : sa.slice.call(a, b, c)
	}
	function Ba(a, b) {
		if (!x(a) || !x(b) || a.length != b.length) return !1;
		for (var c = a.length, d = Ca, e = 0; c > e; e++) if (!d(a[e], b[e])) return !1;
		return !0
	}
	function Ca(a, b) {
		return a === b
	}
	function E(a) {
		return -1 != Da.indexOf(a)
	}
	function Ga(a, b) {
		for (var c = x(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], r(a)); c++);
		return a
	}
	function Ha() {
		var a = arguments.length;
		if (1 == a && t(arguments[0])) return Ha.apply(null, arguments[0]);
		for (var b = {}, c = 0; a > c; c++) b[arguments[c]] = !0;
		return b
	}
	function Ia(a) {
		q.setTimeout(function() {
			throw a
		}, 0)
	}
	function Ka() {
		var a = q.MessageChannel;
		if ("undefined" == typeof a && "undefined" != typeof window && window.postMessage && window.addEventListener && (a = function() {
			var a = document.createElement("iframe");
			a.style.display = "none", a.src = "", document.documentElement.appendChild(a);
			var b = a.contentWindow,
				a = b.document;
			a.open(), a.write(""), a.close();
			var c = "callImmediate" + Math.random(),
				d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
				a = C(function(a) {
					"*" != d && a.origin != d || a.data != c || this.port1.onmessage()
				}, this);
			b.addEventListener("message", a, !1), this.port1 = {}, this.port2 = {
				postMessage: function() {
					b.postMessage(c, d)
				}
			}
		}), "undefined" != typeof a && !E("Trident") && !E("MSIE")) {
			var b = new a,
				c = {}, d = c;
			return b.port1.onmessage = function() {
				if (r(c.next)) {
					c = c.next;
					var a = c.mb;
					c.mb = null, a()
				}
			},
			function(a) {
				d.next = {
					mb: a
				}, d = d.next, b.port2.postMessage(0)
			}
		}
		return "undefined" != typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
			var b = document.createElement("script");
			b.onreadystatechange = function() {
				b.onreadystatechange = null, b.parentNode.removeChild(b), b = null, a(), a = null
			}, document.documentElement.appendChild(b)
		} : function(a) {
			q.setTimeout(a, 0)
		}
	}
	function La(a, b) {
		Ma || Na(), Oa || (Ma(), Oa = !0), Pa.push(new Qa(a, b))
	}
	function Na() {
		if (q.Promise && q.Promise.resolve) {
			var a = q.Promise.resolve();
			Ma = function() {
				a.then(Ra)
			}
		} else Ma = function() {
			var a = Ra;
			!ca(q.setImmediate) || q.Window && q.Window.prototype.setImmediate == q.setImmediate ? (Ja || (Ja = Ka()), Ja(a)) : q.setImmediate(a)
		}
	}
	function Ra() {
		for (; Pa.length;) {
			var a = Pa;
			Pa = [];
			for (var b = 0; b < a.length; b++) {
				var c = a[b];
				try {
					c.a.call(c.b)
				} catch (d) {
					Ia(d)
				}
			}
		}
		Oa = !1
	}
	function Qa(a, b) {
		this.a = a, this.b = b
	}
	function Sa(a, b) {
		this.b = Ta, this.h = void 0, this.a = this.c = null, this.f = this.g = !1;
		try {
			var c = this;
			a.call(b, function(a) {
				Ua(c, Va, a)
			}, function(a) {
				Ua(c, Wa, a)
			})
		} catch (d) {
			Ua(this, Wa, d)
		}
	}
	function Ya(a) {
		a.b == Ta && La(function() {
			var a = new Za(void 0);
			$a(this, a)
		}, a)
	}
	function $a(a, b) {
		if (a.b == Ta) if (a.c) {
			var c = a.c;
			if (c.a) {
				for (var d, e = 0, f = -1, g = 0;
				(d = c.a[g]) && !((d = d.ka) && (e++, d == a && (f = g), f >= 0 && e > 1)); g++);
				f >= 0 && (c.b == Ta && 1 == e ? $a(c, b) : (e = c.a.splice(f, 1)[0], ab(c, e, Wa, b)))
			}
		} else Ua(a, Wa, b)
	}
	function bb(a, b) {
		a.a && a.a.length || a.b != Va && a.b != Wa || cb(a), a.a || (a.a = []), a.a.push(b)
	}
	function Xa(a, b, c, d) {
		var e = {
			ka: null,
			qb: null,
			rb: null
		};
		return e.ka = new Sa(function(a, f) {
			e.qb = b ? function(c) {
				try {
					var e = b.call(d, c);
					a(e)
				} catch (g) {
					f(g)
				}
			} : a, e.rb = c ? function(b) {
				try {
					var e = c.call(d, b);
					!r(e) && b instanceof Za ? f(b) : a(e)
				} catch (g) {
					f(g)
				}
			} : f
		}), e.ka.c = a, bb(a, e), e.ka
	}
	function Ua(a, b, c) {
		if (a.b == Ta) {
			if (a == c) b = Wa, c = new TypeError("Promise cannot resolve to itself");
			else {
				if (la(c)) return a.b = 1, void c.then(a.i, a.l, a);
				if (B(c)) try {
					var d = c.then;
					if (ca(d)) return void db(a, c, d)
				} catch (e) {
					b = Wa, c = e
				}
			}
			a.h = c, a.b = b, cb(a), b != Wa || c instanceof Za || eb(a, c)
		}
	}
	function db(a, b, c) {
		function d(b) {
			f || (f = !0, a.l(b))
		}
		function e(b) {
			f || (f = !0, a.i(b))
		}
		a.b = 1;
		var f = !1;
		try {
			c.call(b, e, d)
		} catch (g) {
			d(g)
		}
	}
	function cb(a) {
		a.g || (a.g = !0, La(a.o, a))
	}
	function ab(a, b, c, d) {
		if (c == Va) b.qb(d);
		else {
			if (b.ka) for (; a && a.f; a = a.c) a.f = !1;
			b.rb(d)
		}
	}
	function eb(a, b) {
		a.f = !0, La(function() {
			a.f && gb.call(null, b)
		})
	}
	function Za(a) {
		ma.call(this, a)
	}
	function F(a, b) {
		this.l = [], this.ba = b || null, this.b = this.c = !1, this.g = void 0, this.ja = this.L = this.o = !1, this.i = 0, this.f = null, this.C = 0
	}
	function hb(a, b, c) {
		a.c = !0, a.g = c, a.b = !b, a.Ua()
	}
	function ib(a) {
		if (a.c) {
			if (!a.ja) throw new jb;
			a.ja = !1
		}
	}
	function kb(a, b, c, d) {
		return a.l.push([b, c, d]), a.c && a.Ua(), a
	}
	function lb(a, b) {
		a.D(b instanceof F ? C(b.ia, b) : function() {
			return b
		})
	}
	function mb(a) {
		return va(a.l, function(a) {
			return ca(a[1])
		})
	}
	function qb(a) {
		var b = new F;
		return b.callback(a), b
	}
	function jb() {
		ma.call(this)
	}
	function ob(a) {
		this.Ca = q.setTimeout(C(this.b, this), 0), this.a = a
	}
	function nb(a) {
		var b = pb[a];
		b && (q.clearTimeout(b.Ca), delete pb[a])
	}
	function wb() {}
	function xb() {}
	function Bb() {}
	function Cb() {}
	function G(a) {
		ma.call(this, a), this.name = "ydn.error.ArgumentException"
	}
	function Db(a) {
		ma.call(this, a), this.name = "ydn.error.NotSupportedException"
	}
	function Eb(a) {
		ma.call(this, a), this.name = "ydn.error.NotImplementedException"
	}
	function Fb(a) {
		ma.call(this, a), this.name = "ydn.error.InvalidOperationException"
	}
	function Gb(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Gb) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.error.InternalError"
	}
	function Hb(a, b) {
		F.call(this, 0, b), this.h = []
	}
	function Ib(a, b) {
		for (var c = 0; c < a.h.length; c++) a.h[c][0].call(a.h[c][1], b)
	}
	function Nb(a, b) {
		var c, d;
		for (2 == arguments.length && y(arguments[1]) ? (c = !0, d = arguments[1].split(".")) : d = (c = x(b)) ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], r(a)); c++);
		return a
	}
	function Ob(a, b, c) {
		if (a) if (-1 == b.indexOf(".")) a[b] = c;
		else {
			b = b.split(".");
			for (var d, e = b.pop(); d = b.shift();) B(a[d]) || (a[d] = {}), a = a[d];
			a[e] = c
		}
	}
	function Qb(a) {
		var b = [a];
		a = new Rb;
		for (var c, d, e = 0; void 0 !== (d = b.pop());) {
			if (0 === e % 4 && e + 4 > 12 && (a.write(e), e = 0), c = typeof d, d instanceof Array) {
				if (e += 4, 0 < d.length) {
					for (b.push(Pb), c = d.length; c--;) b.push(d[c]);
					continue
				}
				a.write(e)
			} else if ("number" === c) e += 1, a.write(e), Sb(a, d);
			else if (d instanceof Date) e += 2, a.write(e), Sb(a, d.valueOf());
			else if ("string" === c) {
				for (e += 3, a.write(e), e = a, c = 0; c < d.length; c++) {
					var f = d.charCodeAt(c);
					126 >= f ? e.write(f + 1) : 16510 >= f ? (f -= 127, e.write(128 | f >> 8, 255 & f)) : e.write(192 | f >> 10, f >> 2 | 255, (3 | f) << 6)
				}
				e.write(0)
			} else {
				if (d !== Pb) return "";
				a.write(0)
			}
			e = 0
		}
		for (b = a.a.length;
		"00" === a.a[--b];);
		return a.a.length = ++b, a.toString()
	}
	function Tb(a) {
		for (var b, c, d = [], e = d, f = [], g = new Ub(a); null != Vb(g);) if (0 === g.a) e = f.pop();
		else {
			if (null === g.a) break;
			for (;;) {
				b = g.a / 4 | 0, a = g.a % 4;
				for (var h = 0; b > h; h++) c = [], e.push(c), f.push(e), e = c;
				if (!(0 === a && 12 < g.a + 4)) break;
				Vb(g)
			}
			1 === a ? e.push(Wb(g)) : 2 === a ? e.push(new Date(Wb(g))) : 3 === a ? e.push(Xb(g)) : 0 === a && (e = f.pop())
		}
		return d[0]
	}
	function Sb(a, b) {
		var c, d, e;
		c = b;
		var f = e = d = 0;
		if (0 !== c) if (isFinite(c)) {
			if (0 > c && (d = 1, c = -c), f = 0, c >= 2.2250738585072014e-308) {
				for (e = c; 1 > e;) f--, e *= 2;
				for (; e >= 2;) f++, e /= 2;
				e = f + 1023
			}
			f = Math.floor(e ? 4503599627370496 * (c / Math.pow(2, f) - 1) : c / 5e-324)
		} else e = 2047, isNaN(c) ? f = 0x8000000000000 : -1 / 0 === c && (d = 1);
		c = d, d = e, e = f, c && (e = 0xfffffffffffff - e, d = 2047 - d), a.write((c ? 0 : 128) | d >> 4), a.write((15 & d) << 4 | 0 | e / 281474976710656), e %= 281474976710656, c = 0 | e / 4294967296, a.write(c >> 8, 255 & c), e %= 4294967296, c = 0 | e / 65536, a.write(c >> 8, 255 & c), c = e % 65536, a.write(c >> 8, 255 & c)
	}
	function Wb(a) {
		var b = 0 | Vb(a),
			c = b >> 7 ? !1 : !0,
			d = c ? -1 : 1,
			e = (127 & b) << 4,
			b = 0 | Vb(a),
			e = e + (b >> 4);
		c && (e = 2047 - e);
		for (var b = [c ? 15 - (15 & b) : 15 & b], f = 6; f--;) b.push(c ? 255 - (0 | Vb(a)) : 0 | Vb(a));
		for (a = 0, f = 7; f--;) a = a / 256 + b[f];
		return a /= 16, 0 === a && 0 === e ? 0 : (a + 1) * Math.pow(2, e - 1023) * d
	}
	function Xb(a) {
		for (var b, c, d = [], e = 0, f = 0, g = 0; b = Vb(a), 0 !== b && null != b;) 0 === e ? (c = b >> 6, 2 > c && !isNaN(b) ? d.push(String.fromCharCode(b - 1)) : (e = c, f = b << 10, g++)) : 2 === e ? (d.push(String.fromCharCode(f + b + 127)), e = f = g = 0) : 2 === g ? (f += b << 2, g++) : (d.push(String.fromCharCode(f | b >> 6)), e = f = g = 0);
		return d.join("")
	}
	function Ub(a) {
		this.a = null, this.b = a, this.c = this.b.length - 1, this.index = -1
	}
	function Vb(a) {
		return a.a = a.index < a.c ? parseInt(a.b.charAt(++a.index) + a.b.charAt(++a.index), 16) : null
	}
	function Rb() {
		this.a = [], this.b = void 0
	}
	function Yb(a, b) {
		var c = Qb(a),
			d = Qb(b);
		return c > d ? 1 : c == d ? 0 : -1
	}
	function J(a, b, c) {
		Hb.call(this, 0, c), this.A = a, this.h = [], this.w = [], this.ta = [], this.a = null, this.ga = "", this.S = 0
	}
	function Zb(a, b, c) {
		if (a.a = b, a.ga = c, b) {
			for (c = 0; c < a.w.length; c++) a.w[c][0].call(a.w[c][1], b);
			a.w.length = 0
		}
	}
	function $b(a) {
		var b = new J(a.A);
		return a.S++, Zb(b, a.a, a.ga + "C" + a.S), b
	}
	function K(a, b, c) {
		var d = a.ta.shift();
		c = !! c, d ? d[0].call(d[1], b, c, function(b, c) {
			K(a, b, c)
		}) : c ? a.m(b) : a.callback(b)
	}
	function bc(a, b, c) {
		a.ta.push([b, c])
	}
	function L(a, b, c) {
		a.a ? b.call(c, a.a) : a.w.push([b, c])
	}
	function cc(a) {
		var b = "";
		return a.ga && (b = a.a ? "*" : "", b = "[" + a.ga + b + "]"), a.A + b
	}
	function dc(a, b) {
		var c = new J(a);
		return K(c, b), c
	}
	function ic() {
		0 != jc && (this[da] || (this[da] = ++ea)), this.ia = this.ia, this.ta = this.ta
	}
	function kc(a, b) {
		this.type = a, this.target = b
	}
	function lc(a, b) {
		kc.call(this, a, b)
	}
	function mc(a, b, c, d, e) {
		kc.call(this, a, b), this.version = c, this.tb = d, this.pb = e
	}
	function nc(a, b, c) {
		kc.call(this, c || "error", a), this.error = b
	}
	function oc(a, b) {
		nc.call(this, a, b, "fail")
	}
	function pc(a, b, c) {
		var d;
		if (B(a)) d = a.store, b = a.id, null != a.parent && (c = new pc(a.parent));
		else if (r(b)) d = a;
		else if (d = a.lastIndexOf("^|"), b = a, d > 0 && (b = a.substr(d), c = new pc(a.substring(0, d))), b = b.split("^:"), d = b[0], b = b[1], !r(b)) throw Error("Invalid key value: " + a);
		this.u = d, this.a = b, this.parent = c || null
	}
	function qc(a) {
		return t(a.a) ? a.a.join("^|") : a.a instanceof Date ? +a.a : a.a
	}
	function rc(a) {
		if (x(a)) {
			for (var b = [], c = 0, d = a.length; d > c; c++) b[c] = a[c];
			return b
		}
		return a
	}
	function P(a, b, c, d) {
		a > b && (b = a = void 0), null === a && (a = void 0), null === b && (b = void 0), this.lower = a, this.upper = b, this.lowerOpen = !! c, this.upperOpen = !! d
	}
	function sc(a) {
		return tc(a)
	}
	function uc(a) {
		return new P(a, a, !1, !1)
	}
	function vc(a, b, c, d) {
		return new P(a, b, c, d)
	}
	function wc(a, b) {
		return new P(void 0, a, void 0, !! b)
	}
	function xc(a, b) {
		return new P(a, void 0, !! b, void 0)
	}
	function yc(a) {
		var b;
		if (t(a)) b = za(a), b.push("￿");
		else if (y(a)) b = a + "￿";
		else {
			if (!A(a)) return uc(a);
			b = a + 2.220460492503131e-16, a -= 2.220460492503131e-16
		}
		return vc(a, b, !1, !0)
	}
	function tc(a) {
		return null != a ? null != a.upper && null != a.lower ? zc.bound(a.lower, a.upper, !! a.lowerOpen, !! a.upperOpen) : null != a.upper ? zc.upperBound(a.upper, a.upperOpen) : null != a.lower ? zc.lowerBound(a.lower, a.lowerOpen) : null : null
	}
	function Ac(a, b) {
		var c = a.lower,
			d = a.upper,
			e = a.lowerOpen,
			f = a.upperOpen;
		return null != b.lower && (null == a.lower || b.lower >= a.lower) && (c = b.lower, e = b.lowerOpen || a.lowerOpen), null != b.upper && (null == a.upper || b.upper <= a.upper) && (d = b.upper, f = b.upperOpen || a.upperOpen), vc(c, d, e, f)
	}
	function Bc(a, b, c, d, e) {
		if (c) if (c.lowerOpen || c.upperOpen || null == c.lower || null == c.upper || 0 !== M(c.lower, c.upper)) {
			if (null != c.lower) {
				var f = c.lowerOpen ? " > " : " >= ";
				d.push(a + f + "?"), e.push(Cc(c.lower, b))
			}
			null != c.upper && (f = c.upperOpen ? " < " : " <= ", d.push(a + f + "?"), e.push(Cc(c.upper, b)))
		} else d.push(a + " = ?"), e.push(Cc(c.lower, b))
	}
	function Dc(a, b, c, d) {
		var e, f, g, h;
		if ("starts" == a || "^" == a) return yc(b);
		if ("<" == a || "<=" == a) e = b, g = "<" == a;
		else if (">" == a || ">=" == a) f = b, h = ">" == a;
		else {
			if ("=" != a && "==" != a) throw new G("invalid op: " + a);
			e = f = b
		}
		if ("<" == c || "<=" == c) e = d, g = "<" == c;
		else if (">" == c || ">=" == c) f = d, h = ">" == c;
		else if (r(c)) throw new G("invalid op2: " + c);
		return vc(f, e, h, g)
	}
	function Ec(a, b, c, d, e, f) {
		if (r(e) || (e = t(a) ? a.join(", ") : a), null != a && !y(a) && !x(a)) throw new G("index keyPath for " + e + " must be a string or array, but " + a + " is " + typeof a);
		if (!r(a) && r(e) && (a = e), this.keyPath = a, this.h = x(this.keyPath), this.a = e, this.type = Fc(b), r(b)) {
			if (!r(this.type)) throw new G("type invalid in index: " + this.a);
			if (t(this.keyPath)) throw new G('composite key for store "' + this.a + '" must not specified type')
		}
		this.unique = !! c, this.multiEntry = !! d, this.i = y(this.type) ? this.type : Gc, this.f = y(e) ? e : t(a) ? this.keyPath.join(",") : a, this.c = ra(this.f), this.b = this.h ? null : this.keyPath.split("."), this.g = f || null
	}
	function Hc(a, b) {
		if (null != b) {
			if (x(a.keyPath)) {
				for (var c = [], d = 0, e = a.keyPath.length; e > d; d++) {
					var f = Nb(b, a.keyPath[d]);
					c[d] = f
				}
				return c
			}
			return Nb(b, a.keyPath)
		}
	}
	function Ic(a, b, c) {
		for (var d = 0; d < a.b.length; d++) d == a.b.length - 1 ? b[a.b[d]] = c : B(b[a.b[d]]) || (b[a.b[d]] = {})
	}
	function Cc(a, b) {
		return "DATE" != b ? null != b ? a : Qb(a) : a instanceof Date ? +a : void 0
	}
	function Jc(a, b) {
		return "DATE" == b ? new Date(a) : r(b) ? a : Tb(a)
	}
	function Fc(a) {
		return y(a) ? (a = ta(Kc, a), Kc[a]) : void 0
	}
	function Lc(a, b) {
		return null != a || null != b ? null != a ? null != b ? x(a) && x(b) ? Ba(a, b) ? null : "expect: " + a + ", but: " + b : Mc(a, b) ? null : "expect: " + a + ", but: " + b : "keyPath: " + a + " no longer defined" : "newly define " + b : null
	}
	function Nc(a, b, c, d, e, f, g, h) {
		if (!y(a)) throw new G("store name must be a string");
		if (this.f = a, this.keyPath = r(b) ? b : null, this.i = x(this.keyPath), null !== this.keyPath && !y(this.keyPath) && !this.i) throw new G("keyPath must be a string or array");
		this.b = !! c;
		var i;
		if (null != d) {
			if (i = Fc(d), !r(i)) throw new G('type "' + d + '" for primary key in store "' + this.f + '" is invalid.');
			if (this.i) throw new G('composite key for store "' + this.f + '" must not specified type')
		}
		for (this.type = null != i ? i : this.b ? "INTEGER" : void 0, this.h = y(this.keyPath) ? this.keyPath.split(".") : [], this.a = e || [], a = [], b = 0; b < this.a.length; b++) {
			if (c = this.a[b].getName(), 0 <= a.indexOf(c)) throw new G('index "' + c + '" already defined in store: ' + this.f);
			a.push(c)
		}
		this.U = !! f, this.ea = !! g, this.w = y(this.type) ? this.type : Gc, this.g = t(this.keyPath) ? this.keyPath.join(",") : y(this.keyPath) ? this.keyPath : "_ROWID_", this.c = ra(this.g), this.o = !! h, this.l = []
	}
	function Oc(a) {
		var b = [],
			c = a.indexes || [];
		if (t(c)) for (var d = 0; d < c.length; d++) {
			var e;
			e = c[d], e = new Ec(e.keyPath, e.type, e.unique, e.multiEntry, e.name, e.generator), r(e.keyPath) && e.keyPath === a.keyPath || b.push(e)
		}
		return new Nc(a.name, a.keyPath, a.autoIncrement, "undefined" === a.type || "null" === a.type ? void 0 : a.type, b, a.dispatchEvents, a.fixed, a.encrypted)
	}
	function Pc(a, b, c, d, e, f, g) {
		return a = Qc(a, b, c, d, e, f, g), b = "", 0 != c && (b += "SELECT " + a.select), b += " FROM " + a.O, a.s && (b += " WHERE " + a.s), a.group && (b += " GROUP BY " + a.group), a.R && (b += " ORDER BY " + a.R), b
	}
	function Qc(a, b, c, d, e, f, g) {
		var h = {
			select: "",
			O: "",
			s: "",
			group: "",
			R: ""
		}, i = a.g,
			j = a.c,
			k = null;
		d !== i && y(d) && (k = Rc(a, d));
		var l = !! k,
			m = d || i,
			n = ra(m),
			o = l ? k.type : a.type,
			p = l && k.multiEntry;
		return h.O = Sc(a), 6 === c ? h.select = "COUNT(" + j + ")" : 3 === c || 1 === c || 2 === c ? (h.select = j, null != d && d != i && (h.select += ", " + n)) : h.select = "*", d = g ? "DISTINCT " : "", i = [], p ? (p = ra("ydn.db.me:" + a.getName() + ":" + k.getName()), h.select = 6 === c ? "COUNT(" + d + p + "." + n + ")" : 3 === c || 1 === c || 2 === c ? "DISTINCT " + Sc(a) + "." + j + ", " + p + "." + n + " AS " + m : "DISTINCT " + Sc(a) + ".*, " + p + "." + n + " AS " + m, h.O = p + " INNER JOIN " + Sc(a) + " USING (" + j + ")", null != e && (Bc(p + "." + n, o, e, i, b), 0 < i.length && (h.s = h.s ? h.s + (" AND " + i.join(" AND ")) : i.join(" AND ")))) : null != e && (Bc(n, o, e, i, b), 0 < i.length && (h.s = h.s ? h.s + (" AND " + i.join(" AND ")) : i.join(" AND "))), l && !k.unique && g && (h.group = n), a = f ? "DESC" : "ASC", h.R = n + " " + a, l && (h.R += ", " + j + " " + a), h
	}
	function Tc(a, b, c, d, e, f, g, h, i) {
		var j, k, l, m;
		return null != e ? (j = e.lower, k = e.upper, l = e.lowerOpen, m = e.upperOpen, f ? null != k ? (e = M(h, k), -1 == e ? (k = h, m = i) : 0 == e && (m = i || m)) : (k = h, m = i) : null != j ? (e = M(h, j), 1 == e ? (j = h, l = i) : 0 == e && (l = i || l)) : (j = h, l = i)) : f ? (k = h, m = i) : (j = h, l = i), e = new P(j, k, !! l, !! m), d = d ? Rc(a, d) : null, b = Qc(a, c, b, d ? d.f : a.g, e, f, g), b = "SELECT " + b.select + " FROM " + b.O + (b.s ? " WHERE " + b.s : "") + (b.group ? " GROUP BY " + b.group : "") + " ORDER BY " + b.R, d && (b += ", " + a.c + (f ? "DESC" : "ASC")), b
	}
	function Uc(a, b, c, d, e, f, g, h, i, j) {
		var k = Rc(a, d),
			l = k.f;
		d = k.c;
		var m = a.c,
			n = i ? " <" : " >",
			n = g ? n + " " : n + "= ";
		return g = Cc(f, k.type), h = Cc(h, a.type), k = "", e ? (a = Qc(a, c, b, l, e, i, j), a.s += " AND ", k = d + n + "?", c.push(g)) : (e = i ? wc(f, !0) : xc(f, !0), a = Qc(a, c, b, l, e, i, j), k = a.s, a.s = ""), a.s += "(" + k + " OR (" + d + " = ? AND " + m + n + "?))", c.push(g), c.push(h), "SELECT " + a.select + " FROM " + a.O + " WHERE " + a.s + (a.group ? " GROUP BY " + a.group : "") + " ORDER BY " + a.R
	}
	function Rc(a, b) {
		return wa(a.a, function(a) {
			return a.getName() == b
		})
	}
	function Vc(a, b) {
		for (var c = 0; c < a.a.length; c++) if (!Lc(a.a[c].keyPath, b)) return a.a[c];
		return null
	}
	function Wc(a, b) {
		return b === a.keyPath ? !0 : va(a.a, function(a) {
			return a.getName() == b
		})
	}
	function Sc(a) {
		return ra(a.f)
	}
	function Xc(a, b) {
		if (!b) return a;
		var c = a.b,
			d = t(a.keyPath) ? za(a.keyPath) : a.keyPath,
			e = a.type,
			f = ua(a.a, function(a) {
				return a.clone()
			});
		r(b.type) || "TEXT" != e || (e = void 0), t(b.keyPath) && y(d) && d == b.keyPath.join(",") && (d = za(b.keyPath));
		for (var g = 0, h = b.a.length; h > g; g++) if (b.a[g].h) for (var i = b.a[g].getName(), j = f.length - 1; j >= 0; j--) if (0 <= i.indexOf(f[j].getName())) {
			f[j] = b.a[g].clone();
			break
		}
		for (g = 0; g < f.length; g++)(h = Rc(b, f[g].getName())) && (f[g] = f[g].hint(h));
		return new Nc(b.f, d, c, e, f)
	}
	function Yc(a) {
		return !!a.keyPath
	}
	function Zc(a, b, c) {
		if (b) {
			if (!a.keyPath && null != c) return c;
			if (a.i) {
				c = [];
				for (var d = 0; d < a.keyPath.length; d++) c.push(Nb(b, a.keyPath[d]));
				return c
			}
			if (a.keyPath) return Ga(b, a.h)
		}
	}
	function $c(a, b, c) {
		for (var d = 0; d < a.h.length; d++) {
			var e = a.h[d];
			if (d == a.h.length - 1) {
				b[e] = c;
				break
			}
			r(b[e]) || (b[e] = {}), b = b[e]
		}
	}
	function ad(a, b, c) {
		var d = [],
			e = [];
		c = r(c) ? c : Zc(a, b), r(c) && (e.push(a.c), d.push(Cc(c, a.type)));
		for (var f = 0; f < a.a.length; f++) {
			var g = a.a[f];
			if (!g.multiEntry && g.getName() !== a.keyPath && "_default_" != g.getName()) {
				var h = Hc(g, b);
				null != h && (d.push(Cc(h, g.type)), e.push(g.c))
			}
		}
		for (a.ea ? a.ea && !a.keyPath && 0 == a.a.length && (d.push(y(b) && -1 == b.indexOf(";base64,") ? b : Q(b)), e.push("_default_")) : (d.push(Q(b)), e.push("_default_")), a = [], f = d.length - 1; f >= 0; f--) a[f] = "?";
		return {
			nb: e,
			sb: a,
			values: d,
			key: c
		}
	}
	function bd(a, b) {
		if (!b) return "missing store: " + a.f;
		if (a.f != b.f) return "store name, expect: " + a.f + ", but: " + b.f;
		var c = Lc(a.keyPath, b.keyPath);
		if (c) return "keyPath, " + c;
		if (r(a.b) && r(b.b) && a.b != b.b) return "autoIncrement, expect:  " + a.b + ", but: " + b.b;
		if (a.a.length != b.a.length) return "indexes length, expect:  " + a.a.length + ", but: " + b.a.length;
		if (r(a.type) && r(b.type) && (x(a.type) ? !Ba(a.type, b.type) : a.type != b.type)) return "data type, expect:  " + a.type + ", but: " + b.type;
		for (c = 0; c < a.a.length; c++) {
			var d, e = Rc(b, a.a[c].getName());
			if (d = a.a[c], e) if (d.a != e.a) d = "name, expect: " + d.a + ", but: " + e.a;
			else {
				var f = Lc(d.keyPath, e.keyPath);
				d = f ? "keyPath, " + f : null != d.unique && null != e.unique && d.unique != e.unique ? "unique, expect: " + d.unique + ", but: " + e.unique : null != d.multiEntry && null != e.multiEntry && d.multiEntry != e.multiEntry ? "multiEntry, expect: " + d.multiEntry + ", but: " + e.multiEntry : r(d.type) && r(e.type) && (x(d.type) ? !Ba(d.type, e.type) : d.type != e.type) ? "data type, expect: " + d.type + ", but: " + e.type : ""
			} else d = "no index for " + d.a;
			if (0 < d.length) return 'index "' + a.a[c].getName() + '" ' + d
		}
		return ""
	}
	function cd(a, b) {
		if (b) for (var c = 0; c < a.a.length; c++) {
			var d = a.a[c],
				e = b;
			if (d.g) {
				var f = d.g(e),
					g = typeof f;
				if ("string" == g || "number" == g || f instanceof Date || t(f)) {
					for (g = 0; g < d.b.length - 1; g++) B(e[d.b[g]]) || (e[d.b[g]] = {});
					e[d.b[d.b.length - 1]] = f
				}
			}
		}
	}
	function dd(a, b, c, d, e) {
		for (var f = 0; f < a.l.length; f++) d !== f && a.l[f].call(e, b, c)
	}
	function ed(a) {
		return eval("(" + a + ")")
	}
	function fd() {}
	function gd(a, b, c) {
		switch (typeof b) {
			case "string":
				hd(b, c);
				break;
			case "number":
				c.push(isFinite(b) && !isNaN(b) ? b : "null");
				break;
			case "boolean":
				c.push(b);
				break;
			case "undefined":
				c.push("null");
				break;
			case "object":
				if (null == b) {
					c.push("null");
					break
				}
				if (t(b)) {
					var d = b.length;
					c.push("[");
					for (var e = "", f = 0; d > f; f++) c.push(e), gd(a, b[f], c), e = ",";
					c.push("]");
					break
				}
				c.push("{"), d = "";
				for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), hd(e, c), c.push(":"), gd(a, f, c), d = ","));
				c.push("}");
				break;
			case "function":
				break;
			default:
				throw Error("Unknown type: " + typeof b)
		}
	}
	function hd(a, b) {
		b.push('"', a.replace(jd, function(a) {
			if (a in id) return id[a];
			var b = a.charCodeAt(0),
				c = "\\u";
			return 16 > b ? c += "000" : 256 > b ? c += "00" : 4096 > b && (c += "0"), id[a] = c + b.toString(16)
		}), '"')
	}
	function kd(a) {
		return !y(a) || /^[\s\xa0]*$/.test(a) ? {} : "undefined" == typeof q.JSON ? ed(a) : JSON.parse(a)
	}
	function ld(a) {
		var b;
		try {
			b = Q(a)
		} catch (c) {
			b = ""
		}
		return b ? b.substr(0, 70) + (70 < b.length ? "..." : "") : ""
	}
	function Q(a) {
		if ("undefined" == typeof q.JSON) {
			var b = [];
			gd(new fd, a, b), a = b.join("")
		} else a = JSON.stringify(a, void 0, void 0);
		return a
	}
	function md(a) {
		this.u = a
	}
	function nd(a, b) {
		this.name = a, this.a = b
	}
	function od(a) {
		if (!t(a.sources)) throw new G("indexes require for full text search index " + a.name + ", but " + a.sources + " of type " + typeof a.sources + " found.");
		var b = a.sources.map(function(a) {
			return new md(a.storeName)
		});
		return new nd(a.name, b)
	}
	function pd(a, b) {
		var c, d, e = b;
		if (B(a)) {
			d = a, c = d.version;
			for (var e = [], f = d.stores || [], g = 0; g < f.length; g++) {
				var h = Oc(f[g]);
				e.push(h)
			}
		} else y(a) ? c = 0 == a.length ? void 0 : parseFloat(a) : A(a) && (c = a);
		if (r(c)) {
			if (!A(c) || 0 > c) throw new G("Invalid version: " + c + " (" + a + ")");
			isNaN(c) && (c = void 0)
		}
		if (r(b) && (!t(b) || 0 < b.length && !(b[0] instanceof Nc))) throw new G("stores");
		if (this.version = c, this.b = !r(this.version), this.stores = e || [], c = [], d && d.fullTextCatalogs) for (g = 0; g < d.fullTextCatalogs.length; g++) e = od(d.fullTextCatalogs[g]), c[g] = e, S(this, e.getName()) || (f = [new Ec("k", Gc), new Ec("v", Gc)], e = new Nc(e.getName(), "id", !1, void 0, f, !1, !1, !1), this.stores.push(e));
		this.c = c
	}
	function qd(a) {
		return ua(a.stores, function(a) {
			return a.getName()
		})
	}
	function S(a, b) {
		return wa(a.stores, function(a) {
			return a.getName() == b
		})
	}
	function rd(a, b) {
		return va(a.stores, function(a) {
			return a.getName() == b
		})
	}
	function sd(a, b, c, d) {
		if (!b || a.stores.length != b.stores.length) return "Number of store: " + a.stores.length + " vs " + b.stores.length;
		for (var e = 0; e < a.stores.length; e++) {
			var f = S(b, a.stores[e].getName());
			if (!f) return 'missing object store "' + a.stores[e].getName() + '"';
			if (c && (f = Xc(f, a.stores[e])), d) for (var g = f, h = a.stores[e], i = 0; i < h.a.length; i++) {
				var j = h.a[i];
				Wc(g, j.getName()) || "BLOB" != j.type || (j = new Ec(j.keyPath, j.type, j.unique, j.multiEntry, j.getName()), g.a.push(j))
			}
			if (f = bd(a.stores[e], f), 0 < f.length) return 'store: "' + a.stores[e].getName() + '" ' + f
		}
		return ""
	}
	function td(a, b) {
		pd.call(this, a, b)
	}
	function ud(a, b) {
		a.stores.push(b)
	}
	function vd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, vd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.error.InternalError"
	}
	function wd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, wd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.error.ConstraintError"
	}
	function xd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, xd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.error.InvalidOperationException"
	}
	function yd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, yd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.error.InvalidOperationError"
	}
	function Mc(a, b) {
		var c;
		if (c = c || {}, null != a && null != b) {
			if (x(a) && x(b)) {
				if (a.length != b.length) return !1;
				for (var d = 0; d < a.length; d++) if (-1 == xa(b, function(b) {
					return Mc(b, a[d])
				})) return !1;
				return !0
			}
			if (x(a)) return 1 == a.length && Mc(a[0], b);
			if (x(b)) return 1 == b.length && Mc(b[0], a);
			if (B(a) && B(a)) {
				for (var e in a) if (a.hasOwnProperty(e) && !c[e]) {
					var f = Mc(a[e], b[e]);
					if (!f) return !1
				}
				for (e in b) if (b.hasOwnProperty(e) && !c[e] && (f = Mc(a[e], b[e]), !f)) return !1;
				return !0
			}
			return a === b
		}
		return !1
	}
	function T(a, b, c) {
		c = c || {}, this.w = c.mechanisms || (hc ? Aa(zd, 1) : zd), this.o = c.size, this.A = r(c.connectionTimeout) ? c.connectionTimeout : 6e4, this.a = null, this.g = [], this.Da = !1;
		var d;
		if (b instanceof pd) d = b;
		else if (B(b)) {
			d = c.autoSchema || !r(b.stores) ? new td(b) : new pd(b);
			var e = b.stores ? b.stores.length : 0;
			for (c = 0; e > c; c++) {
				var f = S(d, b.stores[c].name);
				b.stores[c].Sync && f.getName()
			}
		} else d = new td;
		for (this.b = d, c = 0; c < this.b.count(); c++)(this.b.stores[c] || null).o && (this.b.stores[c] || null).getName();
		r(a) && this.l(a), this.f = new F
	}
	function Ad(a) {
		function b(b, e) {
			b ? (a.ob = 0 / 0, d.gb = function() {}, d.La = function() {
				a.a = null
			}, d.Za = function() {}, setTimeout(function() {
				Bd(a, e), Cd(a)
			}, 10), c.callback(e)) : (setTimeout(function() {
				if (Bd(a, new oc(a, e)), a.g) for (var b; b = a.g.shift();) b.I && b.I("error", e)
			}, 10), c.m(e))
		}
		for (var c = new F, d = null, e = a.w, f = 0; f < e.length; f++) {
			var g = e[f].toLowerCase();
			if (d = a.Ta(g)) {
				d = a.Ta(g);
				break
			}
		}
		null === d ? (e = new wd("No storage mechanism found."), b(!1, new oc(a, e))) : kb(d.connect(a.h, a.b), function(a) {
			this.a = d, b(!0, new mc("ready", this, parseFloat(d.fb()), parseFloat(a), null))
		}, function(a) {
			b(!1, a)
		}, a)
	}
	function Bd(a, b) {
		setTimeout(function() {
			a.b.b && a.f.c || (b instanceof nc ? a.f.m(b.error) : a.f.callback())
		}, 4)
	}
	function Dd(a) {
		return !!a.a && a.a.Ka()
	}
	function Cd(a) {
		var b = a.g.shift();
		b && a.transaction(b.za, b.Eb, b.mode, b.I), a.ob = ia()
	}
	function Ed(a, b, c, d) {
		ic.call(this), this.a = c, this.u = c.getName(), this.V = void 0, this.f = !1, this.v = null, this.i = a, this.w = this.o = !1, this.C = d || 4, this.l = this.c = this.b = void 0, this.S = function() {
			throw new Gb
		}, this.ba = function() {
			throw new Gb
		}, this.ja = function() {}
	}
	function Fd(a, b) {
		a.ba(b), Gd(a), a.o = !0
	}
	function Gd(a) {
		a.c = null != a.c ? rc(a.c) : void 0, a.b = null != a.b ? rc(a.b) : void 0, a.ja(a.w, a.b, a.c)
	}
	function Hd(a) {
		a.w = !0, Gd(a)
	}
	function Id() {}
	function Jd(a, b, c, d, e, f, g) {
		this.b = a, this.f = b, this.h = g, this.A = !! this.f, this.c = r(f) ? f : !! y(this.f), a = "next", d && e ? a = "prevunique" : d ? a = "prev" : e && (a = "nextunique"), this.i = a, this.a = tc(c), this.g = Kd, this.w = 0 / 0
	}
	function Nd(a, b, c) {
		return a = new Jd(a.b, a.f, a.a, Ld(a), Md(a), a.c, a.h), a.l = b, a.o = c, a.g = "rest", a
	}
	function Ld(a) {
		return "prev" === a.i || "prevunique" === a.i
	}
	function Md(a) {
		return "nextunique" === a.i || "prevunique" === a.i
	}
	function Od(a, b, c, d) {
		b = b || Kd, "busy" != a.g && (a.l = c, a.o = d, a.g = b)
	}
	function Pd(a) {
		this.b = a || null, this.a = !1
	}
	function Qd(a, b) {
		var c;
		for (a.a = Ld(b[0]), c = 0; c < b.length; c++);
		return !1
	}
	function Rd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Rd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ConstraintError"
	}
	function Sd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Sd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.db.VersionError"
	}
	function ac(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, ac) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "InvalidStateError"
	}
	function Td(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Td) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "InvalidAccessError"
	}
	function Ud(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Ud) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "NotFoundError"
	}
	function Vd(a, b) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Vd) : this.stack = Error().stack || "", b && (this.message = String(b)), this.message += " :" + a.message + " [" + a.code + "]", this.name = "SQLError"
	}
	function Wd(a, b) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Wd) : this.stack = Error().stack || "", b && (this.message = String(b)), this.message += " :" + a.message, this.name = "SecurityError"
	}
	function Xd(a) {
		Error.captureStackTrace ? Error.captureStackTrace(this, Xd) : this.stack = Error().stack || "", a && (this.message = String(a)), this.name = "ydn.db.TimeoutError"
	}
	function Yd(a, b) {
		this.a = b
	}
	function Zd(a) {
		this.f = a, this.a = null, this.b = 0
	}
	function $d(a) {
		return !!a.a && !a.c
	}
	function ae(a, b, c, d, e, f) {
		this.L = a, this.S = b, this.a = this.f = 0, this.C = d, this.A = e, this.h = c || be, this.l = f || 0
	}
	function ce(a) {
		if (!a) throw new ac("No active transaction");
		if (ca(a.abort)) a.abort();
		else {
			if (!ca(a.executeSql)) throw new Db;
			a.executeSql("ABORT", [], null, function() {
				return !0
			})
		}
	}
	function de(a, b, c, d, e, f) {
		ae.call(this, a, b, c, d, e, f), this.c = [], this.g = [], this.i = null, this.b = new Zd(b), this.o = f || 0, this.w = !1
	}
	function ee(a, b, c) {
		if ("multi" == a.h) a: if (a = a.b, !a.K || !a.mode || c != a.mode && (a.mode != I || c != Kb) || b.length > a.K.length) b = !1;
		else {
			for (c = 0; c < b.length; c++) if (-1 == a.K.indexOf(b[c])) {
				b = !1;
				break a
			}
			b = !0
		} else if ("repeat" == a.h) a: if (a = a.b, a.K && a.mode && c == a.mode && a.K.length == b.length) {
			for (c = 0; c < b.length; c++) if (-1 == a.K.indexOf(b[c])) {
				b = !1;
				break a
			}
			b = !0
		} else b = !1;
		else b = "all" == a.h ? !0 : !1;
		return b
	}
	function fe(a) {
		var b = 0 < a.c.length ? a.c[0].K : null,
			c = 0 < a.c.length ? a.c[0].mode : null;
		return null != b && null != c ? ee(a, b, c) : !1
	}
	function ge(a, b) {
		de.call(this, a, b)
	}
	function he(a, b, c) {
		this.f = a, this.b = b, this.a = c, this.c = null
	}
	function U(a) {
		if (!a.c) {
			var b;
			b = a.f;
			var c = b.hb();
			if ("indexeddb" == c) b = new ie(0, b.b);
			else if ("websql" == c || "sqlite" == c) b = new je(0, b.b);
			else {
				if ("memory" != c && "localstorage" != c && "sessionstorage" != c) throw new Gb("No executor for " + c);
				b = new ke(0, b.b)
			}
			a.c = b
		}
		return a.c
	}
	function le(a, b) {
		var c = y(b) ? b : B(b) ? b.name : void 0;
		if (!y(c)) throw new G("store name " + c + " must be a string, but " + typeof c);
		var d = S(a.b, c);
		if (d) {
			if (a.b.a() && B(b) && (f = Oc(b), f = bd(d, f))) throw new Db(f)
		} else {
			if (!a.b.a()) throw new G('store name "' + c + '" not found.');
			var e = d = Oc(B(b) ? b : {
				name: c
			}),
				f = a.j(),
				g = e instanceof Nc ? e : Oc(e),
				e = S(f.b, e.name);
			if (0 == bd(g, e).length) qb(!1);
			else {
				if (!(f.b instanceof td)) throw new wd("");
				ud(f.b, g), f.a ? (f.a.close(), f.a = null, Ad(f)) : qb(!1)
			}
		}
		if (!d) throw new Ud(c);
		return d
	}
	function V(a, b, c) {
		he.call(this, a, b, c)
	}
	function me(a, b, c) {
		he.call(this, a, b, c)
	}
	function oe(a, b, c) {
		var d, e = I || Kb,
			f = [];
		for (d = 0; d < c.length; d++) for (var g = c[d].stores(), h = 0; h < g.length; h++) 0 <= ta(f, g[h]) || f.push(g[h]);
		return d = a.a.request("qa", f), a.a.ha(d, function(d, e, f) {
			function g() {
				for (var b = 0, f = 0; f < c.length; f++) {
					var g = c[f],
						k = [U(a).b(d, e, g.b)],
						g = g.load(k);
					g.ba = h, g.S = ha(i, b), o[f] = g, l[b] = f, b++
				}
				j = c.length
			}
			function h(a) {
				for (var b = 0; b < o.length; b++) Hd(o[b]);
				ya(o), f(a, !0)
			}
			function i(a, d) {
				if (k) throw new vd;
				p++;
				var e = p === j,
					g = l[a],
					h = c[g],
					i = o[g],
					g = i.Y(),
					i = i.Ma();
				if (m[a] = d, n[a] = h.A ? h.c ? g : i : h.c ? d : i, e) {
					var q;
					if (q = b instanceof Pd ? b.c(m, n) : b(m, n), e = [], h = [], g = [], i = [], t(q)) for (var s = 0; s < q.length; s++)!0 === q[s] ? g[s] = 1 : !1 === q[s] ? i[s] = !0 : h[s] = q[s];
					else if (null === q) e = [];
					else if (r(q)) {
						if (!B(q)) throw new Fb("scan callback output");
						e = q.continuePrimary || [], h = q["continue"] || [], g = q.advance || [], i = q.restart || []
					} else for (e = [], s = 0; s < c.length; s++) r(l[s]) && (g[s] = 1);
					for (s = p = q = 0; s < c.length; s++) null != e[s] || r(h[s]) || null != i[s] || null != g[s] || p++;
					for (s = 0; s < c.length; s++) if (null != e[s] || r(h[s]) || null != i[s] || null != g[s]) {
						var u = l[s];
						if (!r(u)) throw new xd(s + " is not an iterator.");
						var u = c[u],
							v = o[s];
						if (m[s] = void 0, n[s] = void 0, null != i[s]) u = v, u.o = !1, u.w = !1, u.openCursor(void 0, void 0);
						else if (r(h[s])) v.ca(h[s]);
						else if (null != e[s]) v.ra(e[s]);
						else {
							if (null == g[s]) throw new vd(u + ": has no action");
							v.advance(1)
						}
						q++
					}
					if (0 == q) {
						for (q = 0; q < o.length; q++) Hd(o[q]);
						k = !0, ya(o), f(void 0)
					}
				}
			}
			var j, k = !1,
				l = [],
				m = [],
				n = [],
				o = [],
				p = 0;
			b instanceof Pd ? Qd(b, c) || g() : g()
		}, f, e), d
	}
	function pe(a, b, c, d) {
		var e = c.b,
			f = c.f || null,
			g = d || 100,
			h = a.a.request("u", [e]),
			i = "done" == c.g || c.g == Kd ? [] : [c.l, c.o];
		return L(h, function() {
			U(this).da(h, b, e, f, c.a ? c.a instanceof zc ? c.a : zc.bound(c.a.lower, c.a.upper, c.a.lowerOpen, c.a.upperOpen) : null, g, 0, Ld(c), Md(c), i)
		}, a), h.D(function() {
			null != i[0] ? Od(c, "rest", i[0], i[1]) : Od(c)
		}), h
	}
	function ne(a, b, c, d, e) {
		var f = [],
			g = c.a,
			h = cc(c);
		a = U(a);
		for (var i = [], j = d.stores(), k = 0; k < j.length; k++) i[k] = a.b(g, h, j[k]);
		var l = d.load(i);
		l.ba = function(a) {
			Hd(l), K(c, a, !0)
		};
		var m = 0,
			n = !1;
		l.S = function(a) {
			n || (n = !0), null != a ? (l.Y(), m++, 1 == b ? f.push(a) : 2 == b ? f.push(l.Y()) : 3 == b ? f.push([a, l.Y()]) : 6 != b && f.push(l.Ma()), 5 == b ? (Hd(l), K(c, f[0])) : 6 == b || !r(e) || e > m ? l.ca() : (Hd(l), K(c, f))) : (Hd(l), K(c, 5 == b ? f[0] : 6 == b ? m : f))
		}
	}
	function qe(a, b, c, d) {
		this.f = a, this.a = za(c), this.b = d, this.c = []
	}
	function re(a, b, c) {
		if (!a.f) throw new Gb("tx committed on ParallelTxExecutor");
		c && a.c.push(c), b(a.f)
	}
	function se(a, b, c, d, e, f) {
		ae.call(this, a, b, c, d, e, f), this.c = this.b = null
	}
	function te(a, b) {
		se.call(this, a, b, be)
	}
	function ue(a, b, c) {
		T.call(this, a, b, c), this.fa = 0, a = !0, b = be, c && (r(c.isSerial) && (a = !! c.isSerial), c.policy && (b = c.policy)), c = ve(this, b, a), this.i = ve(this, "atomic", !1), this.c = this.na(c, this.i)
	}
	function ve(a, b, c, d, e, f) {
		if (c) {
			if ("multi" == b || "repeat" == b || "all" == b || b == be) return new de(a, a.fa++, b, d, e, f);
			if ("atomic" == b) return new ge(a, a.fa++);
			throw new G('Invalid requestType "' + b + '"')
		}
		if ("multi" == b || "repeat" == b || "all" == b || b == be) return new se(a, a.fa++, b, d, e, f);
		if ("atomic" == b) return new te(a, a.fa++);
		throw new G('Invalid requestType "' + b + '"')
	}
	function W(a, b, c) {
		for (ue.call(this, a, b, c), a = this.b, b = 0; b < a.c.length; b++) {
			c = a.c[b];
			var d = S(a, c.getName());
			if (!d) throw new G('full text index store "' + c.getName() + '" required.');
			if (!Wc(d, "k")) throw new G('full text index store "' + d.getName() + '" must have "keyword" index');
			if (!Wc(d, "v")) throw new G('full text index store "' + d.getName() + '" must have "keyword" index');
			if ("id" != d.keyPath) throw new G('full text index store "' + d.getName() + '" must use "id" as key path.');
			for (d = 0; d < c.count(); d++) {
				var e = c.index(d),
					f = S(a, e.u);
				if (!f) throw new G('full text source store "' + e.u + '" does not exist for full text index "' + c.getName() + '"');
				f.getName()
			}
		}
	}
	function we(a, b, c) {
		W.call(this, a, b, c)
	}
	function xe(a, b, c, d) {
		Ed.call(this, a, 0, c, d), this.g = null
	}
	function ye(a, b) {
		this.a = b
	}
	function ie(a, b) {
		this.a = b
	}
	function ze() {
		this.a = !1
	}
	function Ae(a, b, c, d) {
		Ed.call(this, a, 0, c, d), this.l = this.c = this.b = void 0, this.h = this.g = null, this.A = new ze, this.Ja = this.$ = null
	}
	function Fe(a) {
		setTimeout(function() {
			a.A.a ? (a.A.a = !1, a.P(a.b, a.c, a.l), Fe(a)) : (a.h(), a.h = null)
		}, 4)
	}
	function Ce(a, b) {
		if (a.g = b) {
			var c = b.value;
			if (a.v) if (a.reverse || null == a.v.upper) a.reverse && null != a.v.lower && (d = M(c.key, a.v.lower), -1 == d || 0 == d && a.v.lowerOpen) && (a.g = null);
			else {
				var d = M(c.key, a.v.upper);
				(1 == d || 0 == d && a.v.upperOpen) && (a.g = null)
			}
			if (a.g) {
				if (a.unique && null != a.b && null != c.key && 0 == M(a.b, c.key)) return;
				a.b = c.key, a.c = a.f ? c.a : a.b, 4 == a.C && (a.l = a.la ? a.c : Ge(a.Ja, a.c))
			}
		}
		return a.g || (a.b = void 0, a.c = void 0, a.l = void 0), a.A.a = !0
	}
	function Ke(a, b, c) {
		return a = ["ydn.db", a], r(b) && (a.push(b), r(c) && (a.push(c), r(void 0) && a.push(Qb(void 0)))), a.join("^|")
	}
	function Y(a, b) {
		this.key = a, this.a = b
	}
	function He(a, b) {
		var c = M(a.key, b.key);
		return 0 === c ? null != a.a ? null != b.a ? M(a.a, b.a) : 1 : null != b.a ? -1 : 0 : c
	}
	function Le(a) {
		this.N = a || Me
	}
	function Me(a, b) {
		return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0
	}
	function Qe(a, b) {
		Oe(a, function(a) {
			var c = null,
				d = this.N(a.value, b);
			return d > 0 ? c = a.left : 0 > d ? c = a.right : Re(this, a), c
		})
	}
	function Oe(a, b, c) {
		for (c = c ? c : a.H; c && null != c;) c = b.call(a, c)
	}
	function Pe(a, b) {
		Oe(a, function(a) {
			var b = a.left ? a.left.a : 0,
				c = a.right ? a.right.a : 0;
			return b - c > 1 ? (a.left.right && (!a.left.left || a.left.left.a < a.left.right.a) && Se(this, a.left), Te(this, a)) : c - b > 1 && (a.right.left && (!a.right.right || a.right.right.a < a.right.left.a) && Te(this, a.right), Se(this, a)), b = a.left ? a.left.a : 0, c = a.right ? a.right.a : 0, a.a = Math.max(b, c) + 1, a.parent
		}, b)
	}
	function Se(a, b) {
		Ue(b) ? (b.parent.left = b.right, b.right.parent = b.parent) : Ve(b) ? (b.parent.right = b.right, b.right.parent = b.parent) : (a.H = b.right, a.H.parent = null);
		var c = b.right;
		b.right = b.right.left, null != b.right && (b.right.parent = b), c.left = b, b.parent = c, c.count = b.count, b.count -= (c.right ? c.right.count : 0) + 1
	}
	function Te(a, b) {
		Ue(b) ? (b.parent.left = b.left, b.left.parent = b.parent) : Ve(b) ? (b.parent.right = b.left, b.left.parent = b.parent) : (a.H = b.left, a.H.parent = null);
		var c = b.left;
		b.left = b.left.right, null != b.left && (b.left.parent = b), c.right = b, b.parent = c, c.count = b.count, b.count -= (c.left ? c.left.count : 0) + 1
	}
	function Re(a, b) {
		if (null != b.left || null != b.right) {
			var c, d = null;
			null != b.left ? (c = We(a, b.left), Oe(a, function(a) {
				return a.count--, a.parent
			}, c), c != b.left && ((c.parent.right = c.left) && (c.left.parent = c.parent), c.left = b.left, c.left.parent = c, d = c.parent), c.parent = b.parent, c.right = b.right, c.right && (c.right.parent = c), b == a.W && (a.W = c)) : (c = Xe(a, b.right), Oe(a, function(a) {
				return a.count--, a.parent
			}, c), c != b.right && ((c.parent.left = c.right) && (c.right.parent = c.parent), c.right = b.right, c.right.parent = c, d = c.parent), c.parent = b.parent, c.left = b.left, c.left && (c.left.parent = c), b == a.X && (a.X = c)), c.count = b.count, Ue(b) ? b.parent.left = c : Ve(b) ? b.parent.right = c : a.H = c, Pe(a, d ? d : c)
		} else Oe(a, function(a) {
			return a.count--, a.parent
		}, b.parent), Ue(b) ? (b.parent.left = null, b == a.X && (a.X = b.parent), Pe(a, b.parent)) : Ve(b) ? (b.parent.right = null, b == a.W && (a.W = b.parent), Pe(a, b.parent)) : a.clear()
	}
	function Xe(a, b) {
		if (!b) return a.X;
		var c = b;
		return Oe(a, function(a) {
			var b = null;
			return a.left && (b = c = a.left), b
		}, b), c
	}
	function We(a, b) {
		if (!b) return a.W;
		var c = b;
		return Oe(a, function(a) {
			var b = null;
			return a.right && (b = c = a.right), b
		}, b), c
	}
	function Ne(a, b) {
		this.value = a, this.parent = b ? b : null, this.count = 1
	}
	function Ve(a) {
		return !!a.parent && a.parent.right == a
	}
	function Ue(a) {
		return !!a.parent && a.parent.left == a
	}
	function Ye(a) {
		this.N = a || Me
	}
	function Ee(a, b, c) {
		if (a.H) {
			var d;
			if (c instanceof Ne) d = c;
			else if (c) {
				if (Oe(a, function(a) {
					var b = null;
					return 0 < this.N(a.value, c) ? (b = a.left, d = a) : 0 > this.N(a.value, c) ? b = a.right : d = a, b
				}), !d) return
			} else d = Xe(a);
			a = d;
			for (var e = d.left ? d.left : d; null != a;) if (null != a.left && a.left != e && a.right != e) a = a.left;
			else {
				if (a.right != e && b(a)) return;
				var f = a;
				a = null != a.right && a.right != e ? a.right : a.parent, e = f
			}
			b(null)
		}
	}
	function De(a, b, c) {
		if (a.H) {
			var d;
			if (c instanceof Ne) d = c;
			else if (c) {
				if (Oe(a, C(function(a) {
					var b = null;
					return 0 < this.N(a.value, c) ? b = a.left : (0 > this.N(a.value, c) && (b = a.right), d = a), b
				}, a)), !d) return
			} else d = We(a);
			a = d;
			for (var e = d.right ? d.right : d; null != a;) if (null != a.right && a.right != e && a.left != e) a = a.right;
			else {
				if (a.left != e && b(a)) return;
				var f = a;
				a = null != a.left && a.left != e ? a.left : a.parent, e = f
			}
			b(null)
		}
	}
	function Ze(a, b, c) {
		this.g = a, this.storage = b, this.b = c, this.a = {}, a = this.b.keyPath, this.c = t(a) ? a.join(",") : a || "_ROWID_", this.a[this.c] = null, this.f = Ke(this.g, this.b.getName(), this.c) + "^|"
	}
	function Je(a, b) {
		var c = b || a.c;
		if (!a.a[c]) {
			a.a[c] = new Ye(He);
			for (var d = a.storage.length, e = 0; d > e; e++) {
				var f = a.storage.key(e);
				if (null !== f && 0 == f.lastIndexOf(a.f, 0)) {
					var g = Tb(f.substr(a.f.length));
					if (c == a.c) a.a[c].add(new Y(g));
					else {
						var h = a.storage.getItem(f);
						if (null !== h) if (f = Rc(a.b, c), h = kd(h), h = Hc(f, h), f.multiEntry) {
							if (t(h)) for (f = 0; f < h.length; f++) a.a[c].add(new Y(h[f], g))
						} else a.a[c].add(new Y(h, g))
					}
				}
			}
		}
		return a.a[c]
	}
	function $e(a, b, c) {
		for (var d in a.a) {
			var e = a.a[d];
			if (e) if (d == a.c) Qe(e, new Y(b));
			else {
				var f = Rc(a.b, d),
					f = Nb(c, f.keyPath);
				Qe(e, new Y(b, f))
			}
		}
	}
	function af(a) {
		for (var b in a.a) {
			var c = a.a[b];
			c && c.clear()
		}
		a.a = {}
	}
	function Be(a, b, c, d) {
		if (null == b && (a.b.keyPath && (b = Zc(a.b, c)), a.b.b && null == b)) {
			b = a.f + Qb(void 0);
			var e = kd(a.storage.getItem(b));
			e.key_count || (e.key_count = 0), e.key_count++, a.storage.setItem(b, Q(e)), b = e.key_count
		}
		if (d && (d = null !== a.storage.getItem(a.f + Qb(b))), d) return null;
		a.storage.setItem(a.f + Qb(b), Q(c)), d = b;
		for (var f in a.a) if (e = a.a[f]) if (f == a.c) e.add(new Y(d));
		else {
			var g = Rc(a.b, f),
				g = Nb(c, g.keyPath);
			null != g && e.add(new Y(d, g))
		}
		return b
	}
	function bf(a, b) {
		var c = a.f + Qb(b),
			d = a.storage.getItem(c);
		return null === d ? 0 : (a.storage.removeItem(c), c = kd(d), $e(a, b, c), 1)
	}
	function Ge(a, b) {
		var c = a.storage.getItem(a.f + Qb(b)),
			d = void 0;
		if (null !== c) for (var d = kd(c), c = 0, e = a.b.a.length; e > c; c++) {
			var f = a.b.index(c);
			if ("DATE" == f.type) {
				var g = Hc(f, d);
				g && Ic(f, d, new Date(g))
			}
		}
		return d
	}
	function df(a, b, c) {
		b = b || a.c, a = Je(a, b);
		var d = null,
			e = null,
			f = 0,
			g = !1,
			h = !1;
		return null != c && (null != c.lower && (d = new Y(c.lower)), null != c.upper && (e = new Y(c.upper)), g = c.lowerOpen, h = c.upperOpen), Ee(a, function(a) {
			if (null != a && (a = a.value, !g || null == d || 0 != M(a.key, d.key))) {
				if (null != e && (a = M(a.key, e.key), 1 === a || 0 === a && h)) return !0;
				f++
			}
		}, d), f
	}
	function cf(a, b) {
		var c = Je(a, a.c),
			d = null,
			e = null,
			f = 0,
			g = [],
			h = [],
			i = !1,
			j = !1;
		if (null != b && (null != b.lower && (d = new Y(b.lower)), null != b.upper && (e = new Y(b.upper)), i = b.lowerOpen, j = b.upperOpen), Ee(c, function(b) {
			if (null != b && (b = b.value, !i || null == d || 0 != He(b, d))) {
				if (null != e) {
					var c = He(b, e);
					if (1 === c || 0 === c && j) return !0
				}
				var c = a.f + Qb(b.key),
					k = a.storage.getItem(c);
				null !== k && (a.storage.removeItem(c), f++, 10 > g.length && (g.push(b.key), h.push(kd(k))))
			}
		}, d), 10 > g.length) for (c = 0; c < g.length; c++) $e(a, g[c], h[c]);
		else af(a);
		return f
	}
	function ef(a, b, c, d, e, f, g, h, i) {
		function j(c) {
			if (c && (q++, !(g > q))) {
				var d = c.value;
				if (e) {
					if (t && null != p && (c = m ? He(d, p) : M(d.key, p.key), 0 == c)) return;
					if (null != o && (c = m ? He(d, o) : M(d.key, o.key), -1 == c || 0 == c && s)) return i && (i[0] = void 0, i[1] = void 0), !0
				} else {
					if (s && null != o && (c = m ? He(d, o) : M(d.key, o.key), 0 == c)) return;
					if (null != p && (c = m ? He(d, p) : M(d.key, p.key), 1 == c || 0 == c && t)) return i && (i[0] = void 0, i[1] = void 0), !0
				}
				if (c = d.key, !h || !n || null == k || 0 != M(k, c)) {
					if (d = n ? d.a : c, 2 == b) l.push(d);
					else if (1 == b) l.push(c);
					else if (3 == b) l.push([c, d]);
					else if (4 == b) {
						var j = Ge(a, d);
						l.push(j)
					} else l.push([c, d, Ge(a, d)]);
					i && (i[0] = c, i[1] = d)
				}
				if (k = c, r(f) && l.length >= f) return !0
			}
		}
		var k, l = [],
			m = !! i && null != i[0];
		c = c || a.c;
		var n = c != a.c;
		c = Je(a, c);
		var o = null,
			p = null;
		r(g) || (g = 0);
		var q = -1,
			s = !1,
			t = !1;
		if (null != d && (null != d.lower && (o = n && e ? new Y(d.lower, "￿") : new Y(d.lower)), null != d.upper && (p = n && !e ? new Y(d.upper, "￿") : new Y(d.upper)), s = !! d.lowerOpen, t = !! d.upperOpen), m) {
			e ? t = !0 : s = !0, d = i[0];
			var u = r(i[1]) ? i[1] : "￿";
			e ? p = n ? new Y(d, u) : new Y(d) : o = n ? new Y(d, u) : new Y(d)
		}
		return e ? De(c, j, p) : Ee(c, j, o), l
	}
	function ff() {
		this.clear()
	}
	function gf(a) {
		this.h = a || new ff, this.g = {}
	}
	function Ie(a, b) {
		var c = S(a.a, b);
		if (!c) throw new Gb('store name "' + b + '" not found.');
		return a.g[b] || (a.g[b] = new Ze(a.f, a.c, c)), a.g[b]
	}
	function hf(a, b) {
		this.b = a, this.a = b
	}
	function jf(a, b) {
		this.a = b
	}
	function kf(a, b, c, d) {
		var e = b.a.j(function(a) {
			for (var f, g = [], h = c, i = 0; i < d.length; i++) {
				var j = d[i];
				j instanceof pc && (h = j, j = h.a, h = h.u), f && f.getName() == h || (f = Ie(a, h)), j = Ge(f, j), g[i] = j
			}
			K(b, g, !1), e(), e = null
		}, a)
	}
	function ke(a, b) {
		this.a = b
	}
	function lf(a, b, c, d) {
		Ed.call(this, a, 0, c, d), this.L = null, this.g = this.h = void 0
	}
	function mf(a, b) {
		if (a.h = void 0, a.g = void 0, a.A = void 0, r(b)) if (B(b)) {
			var c = Jc(b[a.a.g], a.a.type);
			if (a.g = c, a.f) {
				var d = Rc(a.a, a.V);
				a.h = Jc(b[a.V], d.type)
			} else a.h = c;
			a.A = a.la ? c : nf(b, a.a)
		} else a.A = b
	}
	function of(a, b, c) {
		Rc(a.a, a.V);
		var d = [],
			e = a.V,
			f = a.v,
			g = a.h;
		if (null != f) {
			var h = f.lower,
				i = f.upper,
				j = f.lowerOpen,
				k = f.upperOpen;
			a.reverse ? i = null != i && -1 == M(i, g) ? i : g : h = null != h && 1 == M(h, g) ? h : g, f = null != h && null != i ? vc(h, i, !! j, !! k) : null != h ? zc.lowerBound(h, !! j) : zc.upperBound(i, !! k)
		} else f = a.reverse ? zc.upperBound(g) : zc.lowerBound(g);
		e = Qc(a.a, d, a.C, e, f, a.reverse, a.unique), c = a.reverse ? zc.upperBound(c, !1) : zc.lowerBound(c, !1), c = Qc(a.a, d, a.C, a.a.g, c, a.reverse, a.unique), e.s = e.s ? e.s + (" AND " + c.s) : c.s, c = "SELECT " + e.select + " FROM " + e.O + (e.s ? " WHERE " + e.s : "") + (e.group ? " GROUP BY " + e.group : "") + " ORDER BY " + e.R, c += " LIMIT 1", Bb(a + ": continuePrimary:  SQL: " + c + " : " + Q(d)), a.i.executeSql(c, d, function(c, d) {
			0 < d.rows.length ? mf(a, d.rows.item(0)) : mf(a), b.call(a, a.h, a.g, a.A), b = null
		}, function(c, d) {
			return Fd(a, d), mf(a), b.call(a, a.g, a.h, a.A), b = null, !1
		})
	}
	function pf(a, b, c, d, e, f) {
		var g = !d;
		d = [], a.f && null != f && null != c ? c = Uc(a.a, a.C, d, a.L.getName(), a.v, c, g, f, a.reverse, a.unique) : null != c ? (f = a.L ? a.L.getName() : null, c = Tc(a.a, a.C, d, f, a.v, a.reverse, a.unique, c, g)) : (c = Pc(a.a, d, a.C, a.f ? a.L.f : a.a.g, a.v, a.reverse, a.unique), a.f && (c += ", " + a.a.c + " ASC")), c += " LIMIT 1", e > 0 && (c += " OFFSET " + e), Bb(a + ": continue:  SQL: " + c + " : " + Q(d)), a.i.executeSql(c, d, function(c, d) {
			0 < d.rows.length ? mf(a, d.rows.item(0)) : mf(a), b.call(a, a.h, a.g, a.A), b = null
		}, function(c, d) {
			return Fd(a, d), mf(a), b.call(a, a.g, a.h, a.A), b = null, !1
		})
	}
	function qf(a, b) {
		this.a = b
	}
	function nf(a, b) {
		if (b.ea && !b.keyPath && 0 == b.a.length && a._default_) {
			var c = a._default_;
			if (-1 == c.indexOf(";base64,")) return kd(c);
			'"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substr(1, c.length - 2));
			for (var d = c.split(";base64,"), c = d[0].split(":")[1], d = window.atob(d[1]), e = d.length, f = new Uint8Array(e), g = 0; e > g; ++g) f[g] = d.charCodeAt(g);
			return new Blob([f.buffer], {
				type: c
			})
		}
		for (c = a._default_ ? kd(a._default_) : {}, null != b.keyPath && (d = Jc(a[b.keyPath], b.type), null != d && $c(b, c, d)), d = 0; d < b.a.length; d++) e = b.index(d), f = e.f, "_default_" == f || e.h || e.multiEntry || "DATE" != e.type && !b.ea || (f = Jc(a[f], e.type), r(f) && Ic(e, c, f));
		return c
	}
	function rf(a, b, c, d, e) {
		function f(a) {
			a = "ydn.db.me:" + h.getName() + ":" + a.getName(), a = "DELETE FROM  " + ra(a) + j, g.executeSql(a, i)
		}
		var g = b.a,
			h = S(a.a, c);
		a = "DELETE FROM " + Sc(h), c = [];
		var i = [],
			j = "";
		for (null != e && (r(d) ? (d = Rc(h, d), Bc(d.c, d.type, e, i, c)) : Bc(h.c, h.type, e, i, c), j = " WHERE " + i.join(" AND ")), g.executeSql(a + j, c, function(a, c) {
			K(b, c.rowsAffected)
		}, function(a, c) {
			return K(b, c, !0), !1
		}), e = 0, d = h.a.length; d > e; e++) a = h.index(e), a.multiEntry && f(a)
	}
	function je(a, b) {
		this.a = b
	}
	function sf(a, b) {
		this.B = null, this.oa = b || 0 / 0
	}
	function tf(a, b, c) {
		function d() {
			var b = {
				autoIncrement: !! c.b
			};
			return null != c.keyPath && (b.keyPath = c.keyPath), a.createObjectStore(c.getName(), b)
		}
		if (wb("Creating Object Store for " + c.getName() + " keyPath: " + c.keyPath), a.objectStoreNames.contains(c.getName())) {
			b = b.objectStore(c.getName()), Lc(c.keyPath || "", b.keyPath || "") ? (a.deleteObjectStore(c.getName()), wb("store: " + c.getName() + " deleted due to keyPath change."), b = d()) : ba(b.autoIncrement) && ba(c.b) && b.autoIncrement != c.b && (a.deleteObjectStore(c.getName()), wb("store: " + c.getName() + " deleted due to autoIncrement change."), b = d());
			for (var e = b.indexNames, f = 0; f < c.a.length; f++) {
				var g = c.index(f);
				!e.contains(g.getName()) && g.g && (b.clear(), wb("store: " + c.getName() + " cleared since generator index need re-indexing."))
			}
			for (var h = 0, i = 0, j = 0, f = 0; f < c.a.length; f++) {
				var g = c.index(f),
					k = !1;
				if (e.contains(g.getName())) {
					var l = b.index(g.getName()),
						m = null != l.unique && null != g.unique && l.unique != g.unique,
						n = null != l.multiEntry && null != g.multiEntry && l.multiEntry != g.multiEntry,
						l = null != l.keyPath && null != g.keyPath && !! Lc(l.keyPath, g.keyPath);
					(m || n || l) && (b.deleteIndex(g.getName()), k = !0, h--, j++)
				} else "BLOB" != g.type && (k = !0);
				k && (g.unique || g.multiEntry ? (k = {
					unique: g.unique,
					multiEntry: g.multiEntry
				}, b.createIndex(g.getName(), g.keyPath, k)) : b.createIndex(g.getName(), g.keyPath), h++)
			}
			for (f = 0; f < e.length; f++) Wc(c, e[f]) || (b.deleteIndex(e[f]), i++)
		} else for (b = d(), f = 0; f < c.a.length; f++) g = c.index(f), "BLOB" != g.type && (Bb("Creating index: " + g + " for " + c.getName()), g.unique || g.multiEntry ? (k = {
			unique: g.unique,
			multiEntry: g.multiEntry
		}, b.createIndex(g.getName(), g.keyPath, k)) : b.createIndex(g.getName(), g.keyPath))
	}
	function uf(a) {
		gf.call(this, a), this.b = 0 / 0
	}
	function vf() {
		uf.call(this, this)
	}
	function wf() {
		uf.call(this, this)
	}
	function xf(a, b) {
		this.a = r(a) ? a : 4194304, this.b = b || "websql"
	}
	function zf(a) {
		var b = a.w,
			c = "CREATE TABLE IF NOT EXISTS " + Sc(a) + " (",
			d = a.c,
			c = c + (d + " " + b + " PRIMARY KEY ");
		a.b && (c += " AUTOINCREMENT "), (!a.ea || !a.keyPath && 0 == a.a.length) && (c += " ,_default_ BLOB");
		for (var e = [], f = [d], g = 0, h = a.a.length; h > g; g++) {
			var i = a.index(g),
				j = "";
			if (i.multiEntry) {
				var j = "ydn.db.me:" + a.getName() + ":" + i.getName(),
					k = i.unique ? " UNIQUE " : "",
					i = "CREATE TABLE IF NOT EXISTS " + ra(j) + " (" + d + " " + b + ", " + i.c + " " + i.i + k + ")";
				e.push(i)
			} else i.unique && (j = " UNIQUE "), k = i.c, -1 == f.indexOf(k) && (c += ", " + k + " " + i.i + j, f.push(k))
		}
		return e.unshift(c + ")"), e
	}
	function yf(a, b, c, d) {
		function e(b) {
			a.executeSql(b, [], function() {
				f++, f == g.length && (c(!0), c = null)
			}, function(a, b) {
				throw f++, f == g.length && (c(!1), c = null), new Vd(b, '"')
			})
		}
		var f = 0,
			g = zf(b),
			h = "Create";
		if (d) {
			if (d = bd(b, d), 0 == d.length) return Bb("same table " + b.getName() + " exists."), c(!0), void(c = null);
			h = "Modify", xb("table: " + b.getName() + " has changed by " + d + " ALTER TABLE cannot run in WebSql, dropping old table."), g.unshift("DROP TABLE IF EXISTS " + ra(b.getName()))
		}
		for (Bb(h + " table: " + b.getName() + ": " + g.join(";")), b = 0; b < g.length; b++) e(g[b])
	}
	function Af(a, b, c) {
		W.call(this, a, b, c)
	}
	function Bf(a, b, c) {
		this.db = a, this.b = b, this.type = c || 0, this.c = null
	}
	function Cf(a) {
		Pd.call(this, a)
	}
	function Df(a) {
		Pd.call(this, a)
	}
	function Ef(a, b, c, d) {
		this.c = a, this.a = b || null, this.h = !! c, this.g = !! d, this.b = [], this.f = []
	}
	function Ff(a, b) {
		for (var c = b.length - 1; c >= 0 && b[c] == a.b[a.b.length - 1]; c--) b = b.slice(0, c);
		if (a.f = b, a.a && a.b[0]) {
			if (a.a.lower != a.a.upper) throw new Rd("Ordering no allowed with range query");
			a.a = yc([a.a.lower])
		}
		return null
	}
	function Gf(a, b) {
		if ((0 != a.b.length || 0 != a.f.length) && Hf(a) && !If(a)) throw new Rd('Require index "' + a.b.concat(a.f).join(", ") + '" not found in store "' + a.c.getName() + '"');
		var c = new Jd(a.c.getName(), Jf(a), a.a, a.h, a.g, !! b);
		return c.w = a.b.length, c
	}
	function If(a) {
		var b = a.b.concat(a.f),
			c = Vc(a.c, b);
		return c || b[b.length - 1] == a.c.keyPath && (c = Vc(a.c, b.slice(0, b.length - 1))) ? c : null
	}
	function Jf(a) {
		return (a = If(a)) ? a.getName() : void 0
	}
	function Hf(a) {
		return 0 < a.b.length ? !0 : 1 == a.f.length ? a.f[0] != a.c.keyPath : 1 < a.f.length ? !0 : !1
	}
	function Kf(a, b, c, d) {
		Bf.call(this, a, b, c), this.a = d
	}
	function Mf(a) {
		for (var b = [], c = 0; c < a.a.length; c++) b[c] = Gf(a.a[c]);
		return b
	}
	function Lf(a) {
		for (var b = 0; b < a.a.length; b++) if (0 < a.a[b].b.length) return !0;
		return !1
	}
	function Z(a, b, c, d) {
		Bf.call(this, a, b, c), this.a = d
	}
	function Nf(a) {
		return Gf(a.a, !(2 == a.type || 3 == a.type || 1 == a.type))
	}
	var l, q = this,
		da = "closure_uid_" + (1e9 * Math.random() >>> 0),
		ea = 0,
		ia = Date.now || function() {
			return +new Date
		};
	D(ma, Error), ma.prototype.name = "CustomError";
	var oa = {
		"\x00": "\\0",
		"\b": "\\b",
		"\f": "\\f",
		"\n": "\\n",
		"\r": "\\r",
		"	": "\\t",
		"": "\\x0B",
		'"': '\\"',
		"\\": "\\\\"
	}, pa = {
		"'": "\\'"
	}, sa = Array.prototype,
		ta = sa.indexOf ? function(a, b, c) {
			return sa.indexOf.call(a, b, c)
		} : function(a, b, c) {
			if (c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c, y(a)) return y(b) && 1 == b.length ? a.indexOf(b, c) : -1;
			for (; c < a.length; c++) if (c in a && a[c] === b) return c;
			return -1
		}, ua = sa.map ? function(a, b, c) {
			return sa.map.call(a, b, c)
		} : function(a, b, c) {
			for (var d = a.length, e = Array(d), f = y(a) ? a.split("") : a, g = 0; d > g; g++) g in f && (e[g] = b.call(c, f[g], g, a));
			return e
		}, va = sa.some ? function(a, b, c) {
			return sa.some.call(a, b, c)
		} : function(a, b, c) {
			for (var d = a.length, e = y(a) ? a.split("") : a, f = 0; d > f; f++) if (f in e && b.call(c, e[f], f, a)) return !0;
			return !1
		}, Da;
	a: {
		var Ea = q.navigator;
		if (Ea) {
			var Fa = Ea.userAgent;
			if (Fa) {
				Da = Fa;
				break a
			}
		}
		Da = ""
	}
	var Ja, Ma, Oa = !1,
		Pa = [],
		Ta = 0,
		Va = 2,
		Wa = 3;
	Sa.prototype.then = function(a, b, c) {
		return Xa(this, ca(a) ? a : null, ca(b) ? b : null, c)
	}, ka(Sa), Sa.prototype.i = function(a) {
		this.b = Ta, Ua(this, Va, a)
	}, Sa.prototype.l = function(a) {
		this.b = Ta, Ua(this, Wa, a)
	}, Sa.prototype.o = function() {
		for (; this.a && this.a.length;) {
			var a = this.a;
			this.a = [];
			for (var b = 0; b < a.length; b++) ab(this, a[b], this.b, this.h)
		}
		this.g = !1
	};
	var gb = Ia;
	D(Za, ma), Za.prototype.name = "cancel", l = F.prototype, l.va = function(a, b) {
		this.o = !1, hb(this, a, b)
	}, l.callback = function(a) {
		ib(this), hb(this, !0, a)
	}, l.m = function(a) {
		ib(this), hb(this, !1, a)
	}, l.D = function(a, b) {
		return kb(this, a, null, b)
	}, l.kb = function(a, b) {
		return kb(this, null, a, b)
	}, l.jb = function(a, b) {
		return kb(this, a, a, b)
	}, l.then = function(a, b, c) {
		var d, e, f = new Sa(function(a, b) {
			d = a, e = b
		});
		return kb(this, d, function(a) {
			e(a)
		}), f.then(a, b, c)
	}, ka(F), F.prototype.Oa = function(a) {
		return kb(this, a.callback, a.m, a), this
	}, F.prototype.ia = function(a) {
		var b = new F;
		return this.Oa(b), a && (b.f = this, this.C++), b
	}, F.prototype.Ua = function() {
		this.i && this.c && mb(this) && (nb(this.i), this.i = 0), this.f && (this.f.C--, delete this.f);
		for (var a = this.g, b = !1, c = !1; this.l.length && !this.o;) {
			var d = this.l.shift(),
				e = d[0],
				f = d[1],
				d = d[2];
			if (e = this.b ? f : e) try {
				var g = e.call(d || this.ba, a);
				r(g) && (this.b = this.b && (g == a || g instanceof Error), this.g = a = g), la(a) && (this.o = c = !0)
			} catch (h) {
				a = h, this.b = !0, mb(this) || (b = !0)
			}
		}
		this.g = a, c && (c = C(this.va, this, !0), g = C(this.va, this, !1), a instanceof F ? (kb(a, c, g), a.L = !0) : a.then(c, g)), b && (a = new ob(a), pb[a.Ca] = a, this.i = a.Ca)
	}, D(jb, ma), jb.prototype.message = "Deferred has already fired", jb.prototype.name = "AlreadyCalledError", ob.prototype.b = function() {
		throw delete pb[this.Ca], window.console.error(this.a.stack), this.a
	};
	var pb = {};
	Ha("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
	var rb = E("Opera") || E("OPR"),
		sb = E("Trident") || E("MSIE"),
		tb = E("Gecko") && -1 == Da.toLowerCase().indexOf("webkit") && !(E("Trident") || E("MSIE")),
		ub = -1 != Da.toLowerCase().indexOf("webkit");
	ub && E("Mobile"), E("Macintosh"), E("Windows"), E("Linux") || E("CrOS");
	var vb = q.navigator || null;
	vb && (vb.appVersion || "").indexOf("X11"), E("Android"), !E("iPhone") || E("iPod") || E("iPad"), E("iPad"),
	function() {
		var a, b = "";
		return rb && q.opera ? (b = q.opera.version, ca(b) ? b() : b) : (tb ? a = /rv\:([^\);]+)(\)|;)/ : sb ? a = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : ub && (a = /WebKit\/(\S+)/), a && (b = (b = a.exec(Da)) ? b[1] : ""), sb && (a = (a = q.document) ? a.documentMode : void 0, a > parseFloat(b)) ? String(a) : b)
	}(), D(G, ma), D(Db, ma), D(Eb, ma), D(Fb, ma), D(Gb, Error), Gb.prototype.name = "ydn.error.InternalError", D(Hb, F), l = Hb.prototype, l.lb = function(a, b) {
		return this.h.push([a, b]), this
	}, l.callback = function(a) {
		this.h.length = 0, Hb.G.callback.call(this, a)
	}, l.m = function(a) {
		this.h.length = 0, Hb.G.m.call(this, a)
	}, l.Oa = function(a) {
		return Hb.G.Oa.call(this, a), a instanceof Hb && a.lb(function(a) {
			Ib(this, a)
		}, this), this
	}, l.Gb = function() {
		return this
	};
	var Jb = {
		READ_ONLY: "readonly",
		READ_WRITE: "readwrite",
		VERSION_CHANGE: "versionchange"
	}, Kb = Jb.READ_ONLY,
		I = Jb.READ_WRITE,
		Lb = Jb.VERSION_CHANGE,
		Mb = q.indexedDB || q.mozIndexedDB || q.webkitIndexedDB || q.moz_indexedDB || q.msIndexedDB;
	F.prototype.done = F.prototype.D, F.prototype.fail = F.prototype.kb, F.prototype.always = F.prototype.jb, Hb.prototype.then = Hb.prototype.then;
	var Pb = {};
	Rb.prototype.write = function() {
		for (var a = 0; a < arguments.length; a++) this.b = arguments[a].toString(16), this.a.push(2 === this.b.length ? this.b : this.b = "0" + this.b)
	}, Rb.prototype.toString = function() {
		return this.a.length ? this.a.join("") : ""
	}, D(J, Hb), l = J.prototype, l.ga = "", l.logger = null, l.wb = function() {
		return !!this.a
	}, l.abort = function() {
		if (!this.a) throw new ac("");
		if (ca(this.a.abort)) this.a.abort();
		else {
			if (!ca(this.a.executeSql)) throw new Db;
			this.a.executeSql("ABORT", [], function() {}, function() {
				return !0
			})
		}
	}, l.callback = function(a) {
		J.G.callback.call(this, a)
	}, l.m = function(a) {
		J.G.m.call(this, a)
	}, l.toString = function() {
		return "Request:" + cc(this)
	}, l.Ua = function() {
		this.i && this.c && mb(this) && (nb(this.i), this.i = 0), this.f && (this.f.C--, delete this.f);
		for (var a = this.g, b = !1; this.l.length && !this.o;) {
			var c = this.l.shift(),
				d = c[0],
				e = c[1],
				c = c[2];
			(d = this.b ? e : d) && (d = d.call(c || this.ba, a), r(d) && (this.b = this.b && (d == a || d instanceof Error), this.g = a = d), la(a) && (this.o = b = !0))
		}
		this.g = a, b && (b = C(this.va, this, !0), d = C(this.va, this, !1), a instanceof F ? (kb(a, b, d), a.L = !0) : a.then(b, d))
	}, l.toJSON = function() {
		var a = (this.ga || "").match(/B(\d+)T(\d+)(?:Q(\d+?))?(?:R(\d+))?/) || [];
		return {
			method: this.A ? this.A.split(":") : [],
			branchNo: parseFloat(a[1]),
			transactionNo: parseFloat(a[2]),
			queueNo: parseFloat(a[3]),
			requestNo: parseFloat(a[4])
		}
	};
	var M = Mb && Mb.cmp ? C(Mb.cmp, Mb) : Yb,
		ec = [],
		fc;
	fc = !1;
	var gc = Da;
	gc && (-1 != gc.indexOf("Firefox") || -1 != gc.indexOf("Camino") || -1 != gc.indexOf("iPad") || -1 != gc.indexOf("iPhone") || -1 != gc.indexOf("iPod") || -1 != gc.indexOf("Chrome") || -1 != gc.indexOf("Android") || -1 != gc.indexOf("Safari") && (fc = !0));
	var hc = fc,
		jc = 0;
	ic.prototype.ia = !1, kc.prototype.preventDefault = function() {}, D(lc, kc), lc.prototype.a = function() {
		return this.u
	}, D(mc, lc), l = mc.prototype, l.name = "ReadyEvent", l.version = 0 / 0, l.tb = 0 / 0, l.pb = null, l.Mb = function() {
		return this.version
	}, l.Ab = function() {
		return this.tb
	}, l.zb = function() {
		return this.pb
	}, D(nc, lc), nc.prototype.toString = function() {
		return this.name + ":" + (this.error ? this.error : "")
	}, nc.prototype.name = "ErrorEvent", nc.prototype.error = null, nc.prototype.b = function() {
		return this.error
	}, D(oc, nc), oc.prototype.name = "FailEvent", l = pc.prototype, l.toJSON = function() {
		var a = {
			store: this.u,
			id: this.a
		};
		return this.parent && (a.parent = this.parent.toJSON()), a
	}, l.valueOf = function() {
		return (this.parent ? this.parent.valueOf() + "^|" : "") + this.u + "^:" + this.a
	}, l.toString = function() {
		return this.valueOf().replace("^|", "|").replace("^:", ":")
	}, l.Ib = function() {
		return this.u
	}, l.xb = function() {
		return this.a
	}, l.Hb = function() {
		return this.parent
	}, P.prototype.lower = void 0, P.prototype.upper = void 0, P.prototype.toJSON = function() {
		var a;
		return a = this || {}, {
			lower: a.lower,
			upper: a.upper,
			lowerOpen: a.lowerOpen,
			upperOpen: a.upperOpen
		}
	};
	var zc = q.IDBKeyRange || q.webkitIDBKeyRange || P,
		Gc = "TEXT",
		Kc = ["BLOB", "DATE", "INTEGER", "NUMERIC", Gc];
	Ec.prototype.getName = function() {
		return this.a
	}, Ec.prototype.toJSON = function() {
		return {
			name: this.a,
			keyPath: this.keyPath,
			type: this.type,
			unique: this.unique,
			multiEntry: this.multiEntry
		}
	}, Ec.prototype.clone = function() {
		var a = t(this.keyPath) ? za(this.keyPath) : this.keyPath;
		return new Ec(a, this.type, this.unique, this.multiEntry, this.a, this.g)
	}, Ec.prototype.hint = function(a) {
		if (!a) return this;
		var b = t(this.keyPath) ? za(this.keyPath) : this.keyPath,
			c = this.type;
		return r(a.type) || "TEXT" != c || (c = void 0), new Ec(b, c, this.unique, this.multiEntry, a.a)
	}, l = Nc.prototype, l.U = !1, l.ea = !1, l.toJSON = function() {
		for (var a = [], b = 0; b < this.a.length; b++) a.push(this.a[b].toJSON());
		return {
			name: this.f,
			keyPath: this.keyPath,
			autoIncrement: this.b,
			type: this.type,
			indexes: a
		}
	}, l.clone = function() {
		return Oc(this.toJSON())
	}, l.index = function(a) {
		return this.a[a] || null
	}, l.getName = function() {
		return this.f
	};
	var id = {
		'"': '\\"',
		"\\": "\\\\",
		"/": "\\/",
		"\b": "\\b",
		"\f": "\\f",
		"\n": "\\n",
		"\r": "\\r",
		"	": "\\t",
		"": "\\u000b"
	}, jd = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
	nd.prototype.getName = function() {
		return this.name
	}, nd.prototype.count = function() {
		return this.a.length
	}, nd.prototype.index = function(a) {
		return this.a[a]
	}, pd.prototype.toJSON = function() {
		var a = ua(this.stores, function(a) {
			return a.toJSON()
		}),
			b = {};
		return b.stores = a, r(this.version) && (b.version = this.version), b
	}, pd.prototype.b = !1, pd.prototype.a = function() {
		return !1
	}, pd.prototype.count = function() {
		return this.stores.length
	}, D(td, pd), td.prototype.a = function() {
		return !0
	}, D(vd, Error), vd.prototype.name = "ydn.InternalError", D(wd, Error), wd.prototype.name = "ydn.error.ConstraintError", D(yd, Error), T.prototype.logger = null, T.prototype.C = function(a) {
		if (r(a)) {
			var b = function(b) {
				a(b.toJSON()), a = void 0
			};
			if (this.a) this.a.M(b);
			else {
				var c = this;
				this.transaction(function(a) {
					c.a.M(b, a)
				}, null, Kb)
			}
		}
		return this.b ? this.b.toJSON() : null
	}, T.prototype.l = function(a) {
		if (this.a) throw new Fb("Already connected with " + this.h);
		this.h = a, Ad(this)
	}, T.prototype.getName = function() {
		return this.h
	};
	var zd = "indexeddb sqlite websql localstorage sessionstorage userdata memory".split(" ");
	l = T.prototype, l.Ta = function() {
		return null
	}, l.hb = function() {
		return this.a ? this.a.qa() : void 0
	}, l.Fa = function(a, b) {
		this.f.ia().jb(a, b)
	}, l.close = function() {
		this.a && (this.a.close(), this.a = null)
	}, l.Lb = function() {
		return this.a ? this.a.eb() : null
	}, l.ob = 0 / 0, l.Da = !1, l.transaction = function(a, b, c, d) {
		var e = b;
		if (y(b) ? e = [b] : null != b || (e = null), this.a && this.a.Ka() && !this.Da) {
			var f = this,
				g = r(c) ? c : Kb;
			g == Lb && (this.Da = !0), this.a.ya(function(b) {
				a(b), a = null
			}, e, g, function(a, b) {
				ca(d) && (d(a, b), d = void 0), g == Lb && (f.Da = !1), Cd(f)
			})
		} else this.g.push({
			za: a,
			Eb: e,
			mode: c,
			I: d
		})
	}, T.prototype.close = T.prototype.close, T.prototype.getType = T.prototype.hb, T.prototype.getName = T.prototype.getName, T.prototype.getSchema = T.prototype.C, T.prototype.onReady = T.prototype.Fa, T.prototype.setName = T.prototype.l, T.prototype.transaction = T.prototype.transaction, T.prototype.db = T.prototype.Lb, ja("ydn.db.version", "1.3.1"), ja("ydn.db.cmp", M), ja("ydn.db.deleteDatabase", function(a, b) {
		for (var c, d = 0; d < ec.length; d++) {
			var e = ec[d](a, b);
			e && (c = e)
		}
		return c || dc("vc", null)
	}), mc.prototype.name = mc.prototype.name, mc.prototype.getVersion = mc.prototype.Mb, mc.prototype.getOldVersion = mc.prototype.Ab, mc.prototype.getOldSchema = mc.prototype.zb, nc.prototype.getError = nc.prototype.b, J.prototype.abort = J.prototype.abort, J.prototype.canAbort = J.prototype.wb, Hb.prototype.progress = Hb.prototype.lb, Hb.prototype.promise = Hb.prototype.Gb, ja("ydn.db.KeyRange", P), P.only = uc, P.bound = vc, P.upperBound = wc, P.lowerBound = xc, D(Ed, ic), l = Ed.prototype, l.ib = function(a, b, c, d, e) {
		r(b) && (a = this.a, this.V = (t(b) ? Vc(a, b) : Rc(a, b)).getName()), this.f = y(this.V), this.v = c || null, this.w = this.o = !1, this.reverse = "prev" == d || "prevunique" == d, this.unique = "nextunique" == d || "prevunique" == d, this.T = d, this.la = e, this.l = this.c = this.b = void 0
	}, l.T = "", l.v = null, l.unique = !1, l.reverse = !1, l.la = !0, l.logger = null, l.P = function(a, b, c) {
		null == a && (this.o = !0), this.b = a, this.c = b, this.l = c, this.o ? (this.S(), Gd(this)) : this.S(this.b)
	}, l.open = function(a, b, c, d) {
		this.i = a, this.o = this.w = !1, this.b = c, this.c = d, this.openCursor(this.b, this.c)
	}, l.Y = function() {
		return this.f ? this.c : this.b
	}, l.Ma = function() {
		return this.la ? this.Y() : this.l
	}, l.ra = function() {}, l.ca = function() {}, D(Jd, Id), Jd.prototype.c = !0;
	var Kd = "init";
	l = Jd.prototype, l.logger = null, l.clone = function() {
		var a = new Jd(this.b, this.f, this.a, Ld(this), Md(this), this.c, this.h);
		return a.w = this.w, a
	}, l.unique = function(a) {
		return new Jd(this.b, this.f, this.a, Ld(this), a, this.c, this.h)
	}, l.reverse = function() {
		return new Jd(this.b, this.f, this.a, !Ld(this), Md(this), this.c, this.h)
	}, l.load = function(a) {
		a = a[0], a.ib(this.b, this.h || this.f, this.a, this.i, this.c), this.g = "busy";
		var b = this;
		return a.ja = function(a, c, d) {
			b.l = c, b.o = d, b.g = a ? "rest" : "done"
		}, a.openCursor(this.l, this.o), a
	}, l.stores = function() {
		return [this.b]
	}, Pd.prototype.logger = null, Pd.prototype.c = function() {
		return []
	}, D(Rd, Error), Rd.prototype.name = "ConstraintError", D(Sd, Error), Sd.prototype.name = "ydn.db.VersionError", D(ac, Error), D(Td, Error), D(Ud, Error), Ud.prototype.name = "NotFoundError", D(Vd, Error), D(Wd, Error), D(Xd, Error), Yd.prototype.logger = null, Zd.prototype.logger = null, Zd.prototype.K = null, Zd.prototype.I = null, ae.prototype.logger = null, ae.prototype.type = function() {
		return this.L.hb()
	}, ae.prototype.j = function() {
		return this.L
	}, ae.prototype.Z = function() {
		return "B" + this.S + "T" + this.f
	};
	var be = "single";
	return D(de, ae), l = de.prototype, l.logger = null, l.abort = function() {
		ce(this.i)
	}, l.aa = function(a, b, c, d) {
		var e = y(b) ? [b] : b,
			f = r(c) ? c : Kb,
			g = this;
		if (this.b.a || !Dd(this.j()) && this.w) this.c.push({
			za: a,
			K: b,
			mode: f,
			I: d
		});
		else {
			if (d && this.g.push(d), this.o && this.f >= this.o) throw new Fb("Exceed maximum number of transactions of " + this.o);
			this.w = !0, this.j().transaction(function(c) {
				var d = g.b;
				for (d.a = c, d.c = !1, d.K = b, d.mode = f, d.b++, d.I = null, Q(b), a(g), a = null; fe(g);) c = g.c.shift(), c.I && g.g.push(c.I), c.za()
			}, e, f, function(a, b) {
				var c = g.b;
				for (c.a && (c.a = null, c.K = null, c.mode = null, ca(c.I) && c.I(a, b), c.I = null), c = 0; c < g.g.length; c++) g.g[c](a, b);
				g.g.length = 0, (c = g.c.shift()) && g.aa(c.za, c.K, c.mode, c.I), g.a = 0
			})
		}
	}, l.Z = function() {
		var a = this.b;
		return "B" + a.f + "T" + a.b
	}, l.request = function(a, b, c, d) {
		function e(a, b) {
			f.a = null, d && d(a, b)
		}
		var f = new J(a);
		a = c || Kb;
		var g = this;
		return $d(this.b) && ee(this, b, a) ? (b = this.b.a, this.a++, Zb(f, b, this.Z() + "R" + this.a), this.g.push(e)) : g.aa(function() {
			var a = g.b.a;
			g.a++, Zb(f, a, g.Z() + "R" + g.a)
		}, b, a, e), f
	}, l.ha = function(a, b, c, d, e) {
		d = d || Kb;
		var f, g = this;
		if ($d(g.b) && ee(this, c, d)) {
			var h = g.b.a;
			g.a++, f = g.Z() + "R" + g.a, b(h, f, function(b, c) {
				g.i = h, c ? a.m(b) : a.callback(b), g.i = null
			}), b = null
		} else g.aa(function() {
			var c = g.b.a;
			g.a++, f = g.Z() + "R" + g.a, b(c, f, function(b, d) {
				g.i = c, d ? a.m(b) : a.callback(b), g.i = null
			}), b = null
		}, c, d, e)
	}, l.getName = function() {
		return this.j().getName()
	}, D(ge, de), ge.prototype.logger = null, ge.prototype.request = function(a, b, c) {
		var d, e, f, g = ge.G.request.call(this, a, b, c, function(a, b) {
			if (g.a = null, d) "complete" != a && (f = !0, e = b), d(e, f);
			else {
				var c = new Xd;
				K(g, c, !0)
			}
		});
		return bc(g, function(a, b, c) {
			f = b, e = a, d = c
		}), g
	}, ge.prototype.ha = function(a, b, c, d, e) {
		var f, g, h = new F;
		kb(h, function(a) {
			g = !1, f = a
		}, function(a) {
			g = !0, f = a
		}), ge.G.ha.call(this, h, b, c, d, function(b, c) {
			if ("complete" != b) a.m(c);
			else if (!0 === g) a.m(f);
			else if (!1 === g) a.callback(f);
			else {
				var d = new Xd;
				a.m(d)
			}
			e && (e(b, c), e = void 0)
		})
	}, he.prototype.logger = null, he.prototype.g = function() {
		return this.a.f
	}, he.prototype.abort = function() {
		this.a.abort()
	}, he.prototype.j = function() {
		return this.f
	}, D(V, he), l = V.prototype, l.logger = null, l.count = function(a, b, c, d) {
		var e, f, g, h;
		if (null != a) if (t(a)) {
			if (r(c) || r(b)) throw new G("too many arguments.");
			f = a;
			for (var i = 0; i < f.length; i++) if (!rd(this.b, f[i])) throw new G('store name "' + f[i] + '" at ' + i + " not found.");
			Cb("countStores: " + Q(f)), e = this.a.request("d", f), L(e, function() {
				U(this).wa(e, f)
			}, this)
		} else {
			if (!y(a)) throw new G("Invalid store name or store names.");
			if (i = S(this.b, a), !i) throw new G('store name "' + a + '" not found.');
			if (f = [a], y(b)) g = b, h = B(c) ? tc(c) : null;
			else {
				if (!B(b) && null != b) throw new G('invalid second argument for count "' + ld(c) + '" of type ' + typeof b);
				if (B(b)) h = tc(b);
				else {
					if (null != b) throw new G("key range must be  an object but found " + ld(b) + " of type " + typeof b);
					h = null
				}
			}
			Cb("countKeyRange: " + a + " " + (g ? g : "") + Q(h)), e = this.a.request("d", f), dd(i, e, arguments), L(e, function() {
				U(this).Ra(e, f[0], h, g, !! d)
			}, this)
		} else i = qd(this.b), e = this.a.request("d", i), bc(e, function(a, b, c) {
			if (b) c(a, !0);
			else {
				for (var d = b = 0; d < a.length; d++) b += a[d];
				c(b, !1)
			}
		}, this), L(e, function() {
			U(this).wa(e, f)
		}, this);
		return e
	}, l.get = function(a, b) {
		var c, d = this;
		if (a instanceof pc) {
			var e = a,
				f = e.u,
				g = S(this.b, f);
			if (!g) {
				if (this.b.a()) return Dd(this.j()) ? dc("e", void 0) : (c = new J("e"), this.j().Fa(function() {
					kb(d.get(a, b), function(a) {
						c.callback(a)
					}, function(a) {
						c.m(a)
					})
				}), c);
				throw new G("Store: " + f + " not found.")
			}
			var h = e.a;
			c = this.a.request("ek", [f]), dd(g, c, arguments, void 0, this), L(c, function() {
				U(this).Aa(c, f, h)
			}, this)
		} else {
			if (!y(a) || !r(b)) throw new G("get require valid input arguments.");
			var i = a,
				g = S(this.b, i);
			if (!g) {
				if (this.b.a()) return Dd(this.j()) ? dc("e", void 0) : (c = new J("e"), this.j().Fa(function() {
					kb(d.get(a, b), function(a) {
						c.callback(a)
					}, function(a) {
						c.m(a)
					})
				}), c);
				throw new G('Store name "' + i + '" not found.')
			}
			var j = b;
			c = this.a.request("e", [i]), dd(g, c, arguments, void 0, this), L(c, function() {
				U(this).Aa(c, i, j)
			}, this)
		}
		return c
	}, l.Bb = function(a, b, c, d, e) {
		var f, g, h, i = S(this.b, a),
			j = null;
		if (B(b) && (j = tc(b)), r(c)) {
			if (!A(c)) throw new G("limit must be a number, but " + c + " is " + typeof c);
			f = c
		} else f = 100;
		if (r(d)) {
			if (!A(d)) throw new G("offset must be a number, but " + d + " is " + typeof d);
			g = d
		} else g = 0;
		if (r(e)) {
			if (!ba(e)) throw new G("reverse must be a boolean, but " + e + " is " + typeof e);
			h = e
		}
		var k = this.a.request("g", [a]);
		return dd(i, k, arguments), L(k, function() {
			U(this).da(k, 2, a, null, j, f, g, h, !1)
		}, this), k
	}, l.ma = function(a, b, c, d, e, f, g) {
		var h, i, j, k, l, m = S(this.b, a);
		if (h = tc(c), A(d)) i = d;
		else {
			if (r(d)) throw new G("limit must be a number");
			i = 100
		}
		if (A(e)) j = e;
		else {
			if (r(e)) throw new G("offset must be a number");
			j = 0
		}
		if (r(f)) {
			if (!ba(f)) throw new G("reverse must be a boolean");
			k = f
		}
		if (r(g)) {
			if (!ba(g)) throw new G("unique must be a boolean");
			l = g
		}
		var n = this.a.request("i", [a]);
		return dd(m, n, arguments), L(n, function() {
			U(this).da(n, 2, a, b, h, i, j, k, l)
		}, this), n
	}, l.keys = function(a, b, c, d, e, f, g) {
		var h = S(this.b, a);
		return this.b.a() && !h ? dc("g", []) : y(b) ? this.ma(a, b, c, d, e, f, g) : this.Bb(a, b, c, d, e)
	}, l.values = function(a, b, c, d, e, f, g) {
		var h, i = this;
		if (y(a)) {
			var j = a,
				k = S(this.b, j);
			if (!k) {
				if (this.b.a()) return Dd(this.j()) ? dc("s", []) : (h = new J("s"), this.j().Fa(function() {
					kb(i.values(a, b, c, d, e, f), function(a) {
						h.callback(a)
					}, function(a) {
						h.m(a)
					})
				}), h);
				throw new Ud(j)
			}
			if (t(b)) {
				var l = b;
				h = this.a.request("v", [j]), dd(k, h, arguments, void 0, this), L(h, function() {
					U(this).Xa(h, j, l)
				}, this)
			} else h = y(b) ? this.pa(j, b, c, d, e, f, g) : this.Fb(j, b, c, d, e)
		} else {
			if (!t(a)) throw new G("first argument " + a + " is invalid.");
			if (!(a[0] instanceof pc)) throw new G("first argumentmust be array of ydn.db.Key, but " + a[0] + " of " + typeof a[0] + " found.");
			for (var k = [], m = a, n = 0; n < m.length; n++) {
				var o = m[n].u;
				if (!rd(this.b, o)) {
					if (this.b.a()) return k = [], k[m.length - 1] = void 0, dc("e", k);
					throw new G("Store: " + o + " not found.")
				}
				0 <= ta(k, o) || k.push(o)
			}
			Cb("listByKeys: " + Q(k) + " " + m.length + " keys"), h = this.a.request("w", k), L(h, function() {
				U(this).Ya(h, m)
			}, this)
		}
		return h
	}, l.Fb = function(a, b, c, d, e) {
		var f, g, h, i = S(this.b, a),
			j = null;
		if (B(b) && (j = tc(b)), r(c)) {
			if (!A(c)) throw new G("limit must be a number, but " + c + " is " + typeof c);
			f = c
		} else f = 100;
		if (r(d)) {
			if (!A(d)) throw new G("offset must be a number, but " + d + " is " + typeof d);
			g = d
		} else g = 0;
		if (r(e)) {
			if (!ba(e)) throw new G("reverse must be a boolean, but " + e + " is " + typeof e);
			h = e
		}
		var k = this.a.request("s", [a]);
		return dd(i, k, arguments), L(k, function() {
			U(this).da(k, 4, a, null, j, f, g, h, !1)
		}, this), k
	}, l.pa = function(a, b, c, d, e, f, g) {
		var h, i, j, k, l = S(this.b, a),
			m = tc(c);
		if (r(d)) {
			if (!A(d)) throw new G("limit must be a number.");
			h = d
		} else h = 100;
		if (r(e)) {
			if (!A(e)) throw new G("offset must be a number.");
			i = e
		} else i = 0;
		if (ba(f)) j = f;
		else if (r(f)) throw new G("reverse must be a boolean, but " + f);
		if (r(g)) {
			if (!ba(g)) throw new G("unique must be a boolean");
			k = g
		}
		var n = this.a.request("u", [a]);
		return dd(l, n, arguments), L(n, function() {
			U(this).da(n, 4, a, b, m, h, i, j, k)
		}, this), n
	}, l.add = function(a, b, c) {
		if (t(b)) return this.sa(a, b, c);
		var d, e = le(this, a),
			f = e.getName();
		if (y(e.keyPath) && r(c)) throw new G("key must not be provided while the store uses in-line key.");
		if (!e.keyPath && !e.b && !r(c)) throw new G("out-of-line key must be provided for store: " + f);
		if (t(b)) {
			for (a = 0; a < b.length; a++) cd(e, b[a]);
			d = this.a.request("b", [f], I), L(d, function() {
				U(this).J(d, !1, !1, f, b, c)
			}, this), e.U && d.D(function() {
				this.j(), this.j()
			}, this)
		} else {
			if (!B(b)) throw new G("record must be an object or array list of objects, but " + b + " of type " + typeof b + " found.");
			Zc(e, b, c), cd(e, b), d = this.a.request("a", [f], I), L(d, function() {
				U(this).J(d, !1, !0, f, [b], [c])
			}, this), e.U && d.D(function() {
				this.j(), e.getName(), this.j()
			}, this)
		}
		return d
	}, l.sa = function(a, b, c) {
		var d, e = le(this, a),
			f = e.getName();
		if (y(e.keyPath) && r(c)) throw new G("key must not be provided while the store uses in-line key.");
		if (!e.keyPath && !e.b && !r(c)) throw new G("out-of-line key must be provided for store: " + f);
		if (!t(b)) throw new G("record must be an array list of objects, but " + b + " of type " + typeof b + " found.");
		for (a = 0; a < b.length; a++) cd(e, b[a]);
		return d = this.a.request("b", [f], I), L(d, function() {
			U(this).J(d, !1, !1, f, b, c)
		}, this), e.U && d.D(function() {
			this.j(), e.getName(), this.j()
		}, this), d
	}, l.put = function(a, b, c) {
		var d, e = this;
		if (a instanceof pc) {
			var f = a,
				g = f.u,
				h = S(this.b, g);
			if (!h) throw new G('store "' + g + '" not found.');
			if (h.keyPath) {
				var i = Zc(h, b);
				if (null != i) {
					if (0 != M(i, f.a)) throw new G("Inline key must be " + f + " but " + i + " found.")
				} else $c(h, b, f.a);
				return this.put(g, b)
			}
			return this.put(g, b, f.a)
		}
		if (t(a)) {
			for (var j = a, k = b, f = [], g = 0, h = j.length; h > g; g++) {
				i = j[g].u, -1 == ta(f, i) && f.push(i);
				var l = S(this.b, i);
				if (!l) throw new G('store "' + i + '" not found.');
				l.keyPath && $c(l, k[g], j[g].a)
			}
			for (Cb("putByKeys: to " + Q(f) + " " + k.length + " objects"), g = 0; g < k.length; g++) cd(l, k[g]);
			d = this.a.request("l", f, I), dd(l, d, arguments), L(d, function() {
				U(e).$a(d, k, j)
			}, this)
		} else {
			if (!y(a) && !B(a)) throw new G("the first argument of put must be store name, store schema or array of keys.");
			var l = le(this, a),
				m = l.getName();
			if (l.keyPath && r(c)) throw new G("key must not be provided while the store uses in-line key.");
			if (!l.keyPath && !l.b && !r(c)) throw new G("out-of-line key must be provided for store: " + m);
			if (t(b)) {
				for (var n = b, o = c, g = 0; g < n.length; g++) cd(l, n[g]);
				d = this.a.request("k", [m], I), dd(l, d, arguments), L(d, function() {
					U(this).J(d, !0, !1, m, n, o)
				}, this), l.U && d.D(function() {
					this.j(), this.j()
				}, this)
			} else {
				if (!B(b)) throw new G("put record value must be Object or array of Objects");
				var p = b,
					s = c;
				if (r(q.Blob) && p instanceof Blob && l.ea && !l.keyPath && 0 == l.a.length && ub) d = new J("j"), f = new FileReader, f.onload = function(a) {
					var b = a.target.result,
						c = e.a.request("j", [m], I);
					dd(l, c, [m, p, s]), L(c, function() {
						U(e).J(c, !0, !0, m, [b], [s])
					}, this), kb(c, function(a) {
						d.callback(a)
					}, function(a) {
						d.m(a)
					})
				}, f.onerror = function(a) {
					d.m(a)
				}, f.onabort = function(a) {
					d.m(a)
				}, f.readAsDataURL(p);
				else {
					cd(l, p), d = this.a.request("j", [m], I);
					var u = [m, p, s];
					dd(l, d, u), L(d, function() {
						var a = r(s) ? [u[2]] : void 0;
						U(e).J(d, !0, !0, m, [u[1]], a)
					}, this)
				}
				l.U && d.D(function() {
					this.j(), this.j()
				}, this)
			}
		}
		return d
	}, l.Ga = function(a, b, c) {
		var d, e = le(this, a),
			f = e.getName();
		if (e.keyPath && r(c)) throw new G("key must not be provided while the store uses in-line key.");
		if (!e.keyPath && !e.b && !r(c)) throw new G("out-of-line key must be provided for store: " + f);
		for (var g = b, h = c, i = 0; i < g.length; i++) cd(e, g[i]);
		return d = this.a.request("k", [f], I), dd(e, d, arguments), L(d, function() {
			U(this).J(d, !0, !1, f, g, h)
		}, this), e.U && d.D(function() {
			this.j(), this.j()
		}, this), d
	}, l.clear = function(a, b) {
		var c;
		if (y(a)) {
			var d = S(this.b, a);
			if (!d) throw new G('store name "' + a + '" not found.');
			if (B(b)) {
				var e = tc(b);
				if (null === e) throw new G("clear method requires a valid non-null KeyRange object.");
				Cb("clearByKeyRange: " + a + ":" + Q(e)), c = this.a.request("c", [a], I), dd(d, c, [a, e]), L(c, function() {
					U(this).Pa(c, a, e)
				}, this)
			} else {
				if (r(b)) throw new G("clear method requires a valid KeyRange object as second argument, but found " + b + " of type " + typeof b);
				c = this.a.request("c", [a], I), L(c, function() {
					U(this).ua(c, [a])
				}, this)
			}
		} else {
			if (!(!r(a) || t(a) && y(a[0]))) throw new G('first argument "' + a + '" is invalid.');
			var f = a || qd(this.b);
			Cb("clearByStores: " + Q(f)), c = this.a.request("c", f, I), L(c, function() {
				U(this).ua(c, f)
			}, this)
		}
		return c
	}, l.Na = function(a, b, c) {
		var d;
		if (y(a)) {
			var e = S(this.b, a);
			if (!e) throw new G('store name "' + a + '" not found.');
			if (r(c)) {
				if (!y(b)) throw new G('index name "' + b + '" must be a string, but ' + typeof b + " found.");
				var f = Rc(e, b);
				if (!f) throw new G("index: " + b + " not found in " + a);
				if (!B(c) && null !== c) throw new G("key range " + c + ' is invalid type "' + typeof c + '".');
				var g = tc(c);
				Cb("removeByIndexKeyRange: " + a + ":" + f.getName() + " " + a), d = this.a.request("p", [a], I), L(d, function() {
					U(this).ab(d, a, f.getName(), g)
				}, this)
			} else if (y(b) || A(b) || x(b) || b instanceof Date) {
				d = this.a.request("m", [a], I);
				var h = [a, b];
				dd(e, d, h), L(d, function() {
					U(this).Ha(d, a, h[1])
				}, this), e.U && d.D(function() {
					this.j(), this.j()
				}, this)
			} else {
				if (!B(b)) throw new G('Invalid key or key range "' + b + '" of type ' + typeof b);
				g = tc(b), Cb("removeByKeyRange: " + a + ":" + Q(g)), d = this.a.request("n", [a], I), dd(e, d, [a, g]), L(d, function() {
					U(this).Ia(d, a, g)
				}, this), e.U && d.D(function() {
					this.j(), this.j()
				}, this)
			}
		} else if (a instanceof pc) {
			var i = a.u,
				e = S(this.b, i);
			d = this.a.request("m", [i], I);
			var j = [i, a.a];
			dd(e, d, j), L(d, function() {
				U(this).Ha(d, i, j[1])
			}, this)
		} else {
			if (!t(a)) throw new G('first argument requires store name, key (ydn.db.Key) or list of keys (array) , but "' + ld(a) + '" (' + aa(a) + ") found.");
			for (b = [], c = 0, e = a.length; e > c; c++) {
				var k = a[c].u; - 1 == ta(b, k) && b.push(k)
			}
			if (1 > b.length) throw new G('at least one valid key required in key list "' + ld(a) + '"');
			d = this.a.request("o", b, I), L(d, function() {
				U(this).bb(d, a)
			}, this)
		}
		return d
	}, D(me, V), l = me.prototype, l.logger = null, l.get = function(a, b) {
		if (a instanceof Jd) {
			var c = a.b,
				d = S(this.b, c);
			if (!d) throw new G('store "' + c + '" not found.');
			var e = a.f;
			if (r(e) && !Wc(d, e)) throw new G('index "' + e + '" not found in store "' + c + '".');
			var f = this.a.request("f", [c]);
			return L(f, function() {
				ne(this, 5, f, a, 1)
			}, this), f
		}
		return me.G.get.call(this, a, b)
	}, l.Wa = function(a, b) {
		var c = 100;
		if (A(b)) {
			if (c = b, 1 > c) throw new G("limit must be a positive value, but " + b)
		} else if (r(b)) throw new G("limit must be a number,  but " + b);
		var d = this.a.request("h", [a.b]);
		return L(d, function() {
			a.A ? ne(this, 1, d, a, c) : ne(this, 2, d, a, c)
		}, this), d
	}, l.keys = function(a, b, c, d, e, f, g) {
		return a instanceof Jd ? this.Wa(a, b) : me.G.keys.call(this, a, b, c, d, e, f, g)
	}, l.Sa = function(a) {
		var b = this.a.request("d", [a.b]);
		return L(b, function() {
			ne(this, 6, b, a)
		}, this), b
	}, l.count = function(a, b, c, d) {
		if (a instanceof Jd) {
			if (r(b) || r(c)) throw new G("too many arguments.");
			return this.Sa(a)
		}
		return me.G.count.call(this, a, b, c, d)
	}, l.cb = function(a, b) {
		var c;
		if (A(b)) {
			if (c = b, 1 > c) throw new G("limit must be a positive value, but " + c)
		} else if (r(b)) throw new G("limit must be a number, but " + b);
		var d = this.a.request("t", [a.b]);
		return L(d, function() {
			a.c ? ne(this, 2, d, a, c) : ne(this, 4, d, a, c)
		}, this), d
	}, l.values = function(a, b, c, d, e, f) {
		return a instanceof Jd ? this.cb(a, b) : me.G.values.call(this, a, b, c, d, e, f)
	}, l.open = function(a, b, c, d) {
		c = c || Kb;
		var e = this,
			f = this.a.request("i5", b.stores(), c);
		return L(f, function(c) {
			for (var g = cc(f), h = b.stores(), i = [], j = 0; j < h.length; j++) i[j] = U(e).b(c, g, h[j]);
			var k = b.load(i);
			k.ba = function(a) {
				K(f, a, !0)
			}, k.S = function(b) {
				if (null != b) {
					var c = a.call(d, k);
					!0 === c ? (k.o = !1, k.w = !1, k.openCursor(void 0, void 0)) : B(c) ? !0 === c.restart ? (b = c["continue"], c = c.continuePrimary, k.o = !1, k.w = !1, k.openCursor(c, b)) : null != c["continue"] ? k.ca(c["continue"]) : null != c.continuePrimary ? k.ra(c.continuePrimary) : (Hd(k), K(f, void 0)) : null === c ? (Hd(k), K(f, void 0)) : null != c ? k.ca(c) : k.advance(1)
				} else Hd(k), K(f, void 0)
			}
		}, this), f
	}, qe.prototype.f = null, D(se, ae), l = se.prototype, l.logger = null, l.abort = function() {
		ce(this.c)
	}, l.ub = function(a, b) {
		var c;
		if ("multi" == this.h) a: if (c = this.b, !c.a || !c.b || b != c.b && (c.b != I || b != Kb) || a.length > c.a.length) c = !1;
		else {
			for (var d = 0; d < a.length; d++) if (-1 == c.a.indexOf(a[d])) {
				c = !1;
				break a
			}
			c = !0
		} else if ("repeat" == this.h) a: if (c = this.b, c.a && c.b && b == c.b && c.a.length == a.length) {
			for (d = 0; d < a.length; d++) if (-1 == c.a.indexOf(a[d])) {
				c = !1;
				break a
			}
			c = !0
		} else c = !1;
		else c = "all" == this.h ? !0 : !1;
		return c
	}, l.aa = function(a, b, c, d) {
		function e(c) {
			i.f++, g = new qe(c, 0, b, h), Q(b), i.b = g, re(i.b, a, d)
		}
		function f(a, b) {
			if (g) {
				for (var c = g, d = 0; d < c.c.length; d++) c.c[d](a, b);
				c.c.length = 0, c.f = null, c.a = null, c.c = null
			}
			i.a = 0
		}
		this.C && (b = this.C), this.A && (c = this.A);
		var g, h = r(c) ? c : Kb,
			i = this;
		if (this.b && this.b.f && this.ub(b, h)) re(this.b, a, d);
		else {
			if (this.l && this.f >= this.l) throw new Fb("Exceed maximum number of transactions of " + this.l);
			this.j().transaction(e, b, h, f)
		}
	}, l.request = function(a, b, c, d) {
		var e = new J(a),
			f = this;
		return this.aa(function(a) {
			f.a++, Zb(e, a, f.Z() + "R" + f.a)
		}, b, c || Kb, function(a, b) {
			e.a = null, d && d(a, b)
		}), e
	}, l.ha = function(a, b, c, d, e) {
		var f, g = this;
		this.aa(function(c) {
			g.a++, f = g.Z() + "R" + g.a, b(c, f, function(b, d) {
				g.c = c, f = g.Z() + "R" + g.a, d ? a.m(b) : a.callback(b), g.c = null
			}), b = null
		}, c, d, e)
	}, D(te, se), te.prototype.logger = null, te.prototype.ub = function() {
		return !1
	}, te.prototype.request = function(a, b, c) {
		var d, e, f, g = te.G.request.call(this, a, b, c, function(a, b) {
			if (g.a = null, d) "complete" != a && (f = !0, e = b), d(e, f);
			else {
				var c = new Xd;
				K(g, c, !0)
			}
		});
		return bc(g, function(a, b, c) {
			f = b, e = a, d = c
		}), g
	}, te.prototype.ha = function(a, b, c, d, e) {
		var f, g, h = new F;
		kb(h, function(a) {
			g = !1, f = a
		}, function(a) {
			g = !0, f = a
		}), te.G.ha.call(this, h, b, c, d, function(b, c) {
			if ("complete" != b) a.m(c);
			else if (!0 === g) a.m(f);
			else if (!1 === g) a.callback(f);
			else {
				var d = new Xd;
				a.m(d)
			}
			e && (e(b, c), e = void 0)
		})
	}, D(ue, T), l = ue.prototype, l.fa = 0, l.vb = function(a, b, c, d, e, f) {
		a = a || be;
		var g;
		return "readonly" == d ? g = Kb : "readwrite" == d && (g = I), a = ve(this, a, b, c, g, e), this.na(a, f ? null : this.i)
	}, l.na = function(a) {
		return new he(this, this.b, a)
	}, l.Db = function(a, b, c) {
		this.fa++, b = b || qd(this.b);
		var d = Kb;
		if (c) if ("readwrite" == c) d = I;
		else if ("readonly" != c) throw new G('Invalid transaction mode "' + c + '"');
		var e = ve(this, "all", !1, b, d, 1),
			f = this.na(e, this.i),
			g = new J("q");
		return e.aa(function(b) {
			Zb(g, b, e.Z() + "R0"), a(f)
		}, b, d, function(a) {
			g.a = null, K(g, e.f, "complete" !== a)
		}), g
	}, l.Nb = function() {
		return this.c ? this.c.a.f : 0 / 0
	}, D(W, ue), l = W.prototype, l.na = function(a) {
		return new V(this, this.b, a)
	}, l.add = function(a, b, c) {
		return this.c.add(a, b, c)
	}, l.sa = function(a, b, c) {
		return this.c.sa(a, b, c)
	}, l.count = function(a, b, c, d) {
		return this.c.count(a, b, c, d)
	}, l.get = function(a, b) {
		return this.c.get(a, b)
	}, l.keys = function(a, b, c, d, e, f, g) {
		return this.c.keys(a, b, c, d, e, f, g)
	}, l.ma = function(a, b, c, d, e, f, g) {
		return this.c.ma(a, b, c, d, e, f, g)
	}, l.values = function(a, b, c, d, e, f) {
		return this.c.values(a, b, c, d, e, f)
	}, l.pa = function(a, b, c, d, e, f) {
		return this.c.pa(a, b, c, d, e, f)
	}, l.put = function(a, b, c) {
		return this.c.put(a, b, c)
	}, l.Ga = function(a, b, c) {
		return this.c.Ga(a, b, c)
	}, l.clear = function(a, b, c) {
		return this.c.clear(a, b, c)
	}, l.Na = function(a, b, c) {
		return this.c.Na(a, b, c)
	}, D(we, W), l = we.prototype, l.na = function(a) {
		return new me(this, this.b, a)
	}, l.open = function(a, b, c, d) {
		return this.c.open(a, b, c, d)
	}, l.Sa = function(a) {
		return this.c.Sa(a)
	}, l.cb = function(a, b) {
		return this.c.cb(a, b)
	}, l.Wa = function(a, b) {
		return this.c.Wa(a, b)
	}, D(xe, Ed), l = xe.prototype, l.logger = null, l.xa = function(a) {
		(a = a.target.result) ? this.P(a.key, a.primaryKey, a.value) : this.P()
	}, l.openCursor = function(a, b) {
		function c(a, b, c) {
			l.g = k, l.g.onsuccess = C(l.xa, l), l.P(a, l.f ? b : void 0, c), k = null
		}
		var d = this.v,
			e = this.i.objectStore(this.u),
			f = y(this.V) ? e.index(this.V) : null;
		if (r(a)) var g = f ? !r(b) : !0,
			h = d ? d.lower : void 0,
			i = d ? d.upper : void 0,
			j = d ? !! d.lowerOpen : !1,
			d = d ? !! d.upperOpen : !1,
			d = sc(this.reverse ? new P(h, a, j, g) : new P(a, i, g, d));
		var k;
		k = this.la ? f ? null != this.T ? f.openKeyCursor(d, this.T) : null != d ? f.openKeyCursor(d) : f.openKeyCursor() : null != this.T ? e.openCursor(d, this.T) : null != d ? e.openCursor(d) : e.openCursor() : f ? null != this.T ? f.openCursor(d, this.T) : null != d ? f.openCursor(d) : f.openCursor() : null != this.T ? e.openCursor(d, this.T) : null != d ? e.openCursor(d) : e.openCursor();
		var l = this;
		k.onerror = function(a) {
			var b = k.error;
			a.preventDefault(), Fd(l, b)
		}, null != a ? k.onsuccess = function(d) {
			if (d = d.target.result) {
				var e = Mb.cmp(d.key, a),
					f = l.reverse ? -1 : 1;
				e == f ? c(d.key, d.primaryKey, d.value) : e == -f ? d["continue"](a) : null != b && Mb.cmp(d.primaryKey, b) == f ? c(d.key, d.primaryKey, d.value) : d["continue"]()
			} else c()
		} : (l.g = k, l.g.onsuccess = C(l.xa, l))
	}, l.Ba = function() {
		return !!this.g
	}, l.update = function(a) {
		var b = this.g.result;
		if (b) {
			var c = new F;
			return a = b.update(a), a.onsuccess = function(a) {
				c.callback(a.target.result)
			}, a.onerror = function(a) {
				a.preventDefault(), c.m(a)
			}, c
		}
		throw new Td("cursor gone")
	}, l.clear = function() {
		var a = this.g.result;
		if (a) {
			var b = new F,
				a = a["delete"]();
			return a.onsuccess = function() {
				b.callback(1)
			}, a.onerror = function(a) {
				a.preventDefault(), b.m(a)
			}, b
		}
		throw new Td("cursor gone")
	}, l.advance = function(a) {
		var b = this.g.result;
		1 == a ? b["continue"]() : b.advance(a)
	}, l.ra = function(a) {
		var b, c = this.g.result,
			d = this;
		this.g.onsuccess = function(e) {
			(c = e.target.result) ? (b = Mb.cmp(c.primaryKey, a), 0 == b || 1 == b && !d.reverse || -1 == b && d.reverse ? (d.g.onsuccess = C(d.xa, d), d.P(c.key, d.f ? c.primaryKey : void 0, c.value)) : c["continue"]()) : (d.g.onsuccess = C(d.xa, d), d.P())
		}, c["continue"]()
	}, l.ca = function(a) {
		var b = this.g.result;
		null != a ? b["continue"](a) : b["continue"]()
	}, D(ye, Yd), l = ye.prototype, l.logger = null, l.wa = function(a, b) {
		function c(e) {
			var f = a.a.objectStore(b[e]).count();
			f.onsuccess = function(f) {
				d[e] = f.target.result, e++, e == b.length ? K(a, d) : c(e)
			}, f.onerror = function(b) {
				b.preventDefault(), K(a, f.error, !0)
			}
		}
		var d = [];
		0 == b.length ? K(a, []) : c(0)
	}, l.J = function(a, b, c, d, e, f) {
		function g(d) {
			if (null == e[d]) if (i++, i == e.length) K(a, h, j);
			else {
				var l = d + 10;
				l < e.length && g(l)
			}
			var m, l = e[d];
			m = f && null != f[d] ? b ? k.put(l, f[d]) : k.add(l, f[d]) : b ? k.put(l) : k.add(l), m.onsuccess = function(b) {
				i++, h[d] = b.target.result, i == e.length ? K(a, c ? h[0] : h, j) : (b = d + 10, b < e.length && g(b))
			}, m.onerror = function(b) {
				i++;
				var f = m.error;
				ld(e[d]), h[d] = f, j = !0, b.preventDefault(), i == e.length ? K(a, c ? h[0] : h, j) : (b = d + 10, b < e.length && g(b))
			}
		}
		var h = [],
			i = 0,
			j = !1,
			k = a.a.objectStore(d);
		if (0 < e.length) for (d = 0; 10 > d && d < e.length; d++) g(d);
		else K(a, [])
	}, l.$a = function(a, b, c) {
		function d(h) {
			var i, j = c[h],
				k = a.a.objectStore(j.u);
			i = null === k.keyPath ? k.put(b[h], j.a) : k.put(b[h]), i.onsuccess = function(c) {
				f++, e[h] = c.target.result, f == b.length ? K(a, e, g) : (c = h + 10, c < b.length && d(c))
			}, i.onerror = function(c) {
				f++, e[h] = i.error, g = !0, c.preventDefault(), f == b.length ? K(a, e, g) : (c = h + 10, c < b.length && d(c))
			}
		}
		var e = [],
			f = 0,
			g = !1;
		if (0 < b.length) for (var h = 0; 10 > h && h < b.length; h++) d(h);
		else K(a, e, g)
	}, l.Ha = function(a, b, c) {
		var d = a.a.objectStore(b).openCursor(zc.only(c));
		d.onsuccess = function(b) {
			if (b = b.target.result) {
				var c = b["delete"]();
				c.onsuccess = function() {
					K(a, 1)
				}, c.onerror = function() {
					K(a, c.error, !0)
				}
			} else K(a, 0)
		}, d.onerror = function(b) {
			b.preventDefault(), K(a, d.error, !0)
		}
	}, l.bb = function(a, b) {
		function c(h) {
			if (h++, h >= b.length) 0 < g.length ? K(a, g, !0) : K(a, f);
			else {
				b[h].u != d && (d = b[h].u, e = a.a.objectStore(d));
				var i = e["delete"](b[h].a);
				i.onsuccess = function() {
					f++, c(h)
				}, i.onerror = function(a) {
					a.preventDefault(), g[h] = i.error, c(h)
				}
			}
		}
		var d, e, f = 0,
			g = [];
		c(-1)
	}, l.Ia = function(a, b, c) {
		var d = a.a.objectStore(b),
			e = d.count(c);
		e.onsuccess = function(b) {
			var e = b.target.result,
				f = d["delete"](c);
			f.onsuccess = function() {
				K(a, e)
			}, f.onerror = function() {
				K(a, f.error, !0)
			}
		}, e.onerror = function(b) {
			b.preventDefault(), K(a, e.error, !0)
		}
	}, l.Pa = function(a, b, c) {
		var d = a.a.objectStore(b)["delete"](c);
		d.onsuccess = function() {
			K(a, void 0)
		}, d.onerror = function(b) {
			b.preventDefault(), K(a, d.error, !0)
		}
	}, l.ab = function(a, b, c, d) {
		var e = [],
			f = a.a.objectStore(b).index(c).openCursor(d),
			g = 0;
		f.onsuccess = function(b) {
			var c = b.target.result;
			if (c) {
				var d = c["delete"]();
				d.onsuccess = function() {
					g++, c["continue"]()
				}, d.onerror = function(a) {
					e.push(d.error), a.preventDefault(), c["continue"]()
				}
			} else 0 < e.length ? K(a, e, !0) : K(a, g)
		}, f.onerror = function(b) {
			b.preventDefault(), K(a, f.error, !0)
		}
	}, l.ua = function(a, b) {
		for (var c = b.length, d = 0, e = 0; c > e; e++) {
			var f = a.a.objectStore(b[e]).clear();
			f.onsuccess = function() {
				d++, d == c && K(a, d)
			}, f.onerror = function(b) {
				d++, b.preventDefault(), d == c && K(a, f.error, !0)
			}
		}
	}, l.Aa = function(a, b, c) {
		var d = a.a.objectStore(b),
			e = d.get(c);
		e.onsuccess = function(b) {
			var c = b.target.result;
			if (!d.keyPath && 0 == d.indexNames.length && ub && y(c) && 0 <= c.indexOf(";base64,")) {
				'"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substr(1, c.length - 2)), c = c.split(";base64,"), b = c[0].split(":")[1];
				for (var c = window.atob(c[1]), e = c.length, f = new Uint8Array(e), g = 0; e > g; ++g) f[g] = c.charCodeAt(g);
				K(a, new Blob([f.buffer], {
					type: b
				}))
			} else K(a, b.target.result)
		}, e.onerror = function(b) {
			b.preventDefault(), K(a, e.error, !0)
		}
	}, l.Xa = function(a, b, c) {
		function d(b) {
			if (null == c[b]) if (f++, e[b] = void 0, f == h) K(a, e);
			else {
				var i = b + 10;
				h > i && d(i)
			}
			var j;
			j = g.get(c[b]), j.onsuccess = function(c) {
				f++, e[b] = c.target.result, f == h ? K(a, e) : (c = b + 10, h > c && d(c))
			}, j.onerror = function(b) {
				f++, b.preventDefault(), K(a, j.error, !0)
			}
		}
		var e = [];
		e.length = c.length;
		var f = 0,
			g = a.a.objectStore(b),
			h = c.length;
		if (h > 0) for (b = 0; 10 > b && h > b; b++) d(b);
		else K(a, [])
	}, l.Ya = function(a, b) {
		function c(f) {
			var g = b[f],
				h = a.a.objectStore(g.u).get(g.a);
			h.onsuccess = function(g) {
				e++, d[f] = g.target.result, e == b.length ? K(a, d) : (g = f + 10, g < b.length && c(g))
			}, h.onerror = function(b) {
				e++, b.preventDefault(), K(a, h.error, !0)
			}
		}
		var d = [];
		d.length = b.length;
		var e = 0;
		if (0 < b.length) for (var f = 0; 10 > f && f < b.length; f++) c(f);
		else K(a, [])
	}, l.Ra = function(a, b, c, d) {
		b = a.a.objectStore(b), c && Q(c);
		var e;
		null != d ? (d = b.index(d), e = null != c ? d.count(c) : d.count()) : e = null != c ? b.count(c) : b.count(), e.onsuccess = function(b) {
			K(a, b.target.result)
		}, e.onerror = function(b) {
			b.preventDefault(), K(a, e.error, !0)
		}
	}, l.da = function(a, b, c, d, e, f, g, h, i, j) {
		var k = [],
			l = a.a.objectStore(c),
			m = h ? i ? "prevunique" : "prev" : i ? "nextunique" : "next";
		if (c = cc(a) + " " + b + " " + c + (d ? ":" + d : "") + (e ? Q(e) : ""), h && (c += " reverse"), i && (c += " unique"), j && r(j[0])) {
			i = d ? !r(j[1]) : !0;
			var n = j[0],
				o = e ? e.lower : void 0,
				p = e ? e.upper : void 0,
				q = e ? !! e.lowerOpen : !1;
			e = e ? !! e.upperOpen : !1, e = sc(h ? new P(o, n, q, i) : new P(n, p, i, e)), c += " starting from " + Q(j[0]), r(j[1]) && (c += ", " + Q(j[1]))
		}
		var s;
		s = 1 == b || 2 == b || 3 == b ? d ? l.index(d).openKeyCursor(e, m) : l.openCursor(e, m) : d ? l.index(d).openCursor(e, m) : l.openCursor(e, m);
		var t = !1;
		s.onsuccess = function(c) {
			if (c = c.target.result) {
				if (!t) {
					if (g > 0) return t = !0, void c.advance(g);
					if (j && d && r(j[0])) if (r(j[1])) {
						var e = Mb.cmp(c.key, j[0]),
							i = h ? -1 : 1;
						if (0 == e) {
							if (e = Mb.cmp(c.primaryKey, j[1]), 0 == e) return t = !0, void c["continue"]();
							if (e != i) return void c["continue"]();
							t = !0
						} else t = !0
					} else t = !0;
					else t = !0
				}
				1 == b ? k.push(c.key) : 2 == b ? k.push(c.primaryKey) : 3 == b ? (i = {}, d && (i[d] = c.key), l.keyPath ? i[l.keyPath] = c.primaryKey : i._ROWID_ = c.primaryKey, k.push(i)) : k.push(4 == b ? c.value : [c.key, c.primaryKey, c.value]), k.length < f ? c["continue"]() : (j && (j[0] = rc(c.key), j[1] = rc(c.primaryKey)), K(a, k))
			} else j && (j[0] = void 0, j[1] = void 0), K(a, k)
		}, s.onerror = function(b) {
			b.preventDefault(), K(a, s.error, !0)
		}
	}, D(ie, ye), ie.prototype.logger = null, ie.prototype.b = function(a, b, c, d) {
		return b = S(this.a, c), new xe(a, 0, b, d)
	}, ze.prototype.a = !1, D(Ae, Ed), l = Ae.prototype, l.logger = null, l.Ba = function() {
		return !!this.i
	}, l.update = function(a) {
		return Be(this.Ja, this.Y(), a), qb()
	}, l.advance = function(a) {
		function b(b) {
			return d++, !b || d >= a ? Ce(c, b) : void 0
		}
		var c = this,
			d = this.g ? -1 : 0;
		this.reverse ? De(this.$, b, this.g) : Ee(this.$, b, this.g)
	}, l.ca = function(a) {
		if (null != a) {
			var b = this,
				c = new Y(a),
				d = function(c) {
					if (b.g = c, !c) return Ce(b, c);
					var d = M(c.value.key, a);
					if (b.reverse) {
						if (1 != d) return Ce(b, c)
					} else if (-1 != d) return Ce(b, c)
				};
			this.reverse ? De(this.$, d, c) : Ee(this.$, d, c)
		} else this.advance(1)
	}, l.openCursor = function(a, b) {
		var c = null;
		if (this.v) if (this.reverse) {
			var d = this.f ? "￿" : void 0;
			null != this.v.upper && (c = new Y(this.v.upper, d))
		} else null != this.v.lower && (c = new Y(this.v.lower));
		null != a && (c = this.f ? new Y(a, b) : new Y(a)), this.h = this.i.j(function(b) {
			function d(b) {
				var d = b.value,
					e = d.key;
				if (b && null != e) if (null != a) {
					if (0 == He(c, d)) return
				} else if (this.v && (!this.reverse && this.v.lowerOpen && null != this.v.lower && (d = M(e, this.v.lower), 0 == d) || this.reverse && this.v.upperOpen && null != this.v.upper && (d = M(e, this.v.upper), 0 == d))) return;
				return Ce(this, b)
			}
			this.Ja = Ie(b, this.u), this.$ = Je(this.Ja, this.V), this.reverse ? De(this.$, C(d, this), c) : Ee(this.$, C(d, this), c), Fe(this)
		}, this)
	}, l.clear = function() {
		throw new Eb
	}, l.ra = function() {
		throw new Eb
	}, l = Le.prototype, l.H = null, l.N = null, l.X = null, l.W = null, l.add = function(a) {
		if (null == this.H) return this.W = this.X = this.H = new Ne(a), !0;
		var b = null;
		return Oe(this, function(c) {
			var d = null,
				e = this.N(c.value, a);
			return e > 0 ? (d = c.left, null == c.left && (b = new Ne(a, c), c.left = b, c == this.X && (this.X = b))) : 0 > e && (d = c.right, null == c.right && (b = new Ne(a, c), c.right = b, c == this.W && (this.W = b))), d
		}), b && (Oe(this, function(a) {
			return a.count++, a.parent
		}, b.parent), Pe(this, b.parent)), !! b
	}, l.clear = function() {
		this.W = this.X = this.H = null
	}, l.contains = function(a) {
		var b = !1;
		return Oe(this, function(c) {
			var d = null,
				e = this.N(c.value, a);
			return e > 0 ? d = c.left : 0 > e ? d = c.right : b = !0, d
		}), b
	}, l.indexOf = function(a) {
		var b = -1,
			c = 0;
		return Oe(this, function(d) {
			var e = this.N(d.value, a);
			return e > 0 ? d.left : (d.left && (c += d.left.count), 0 > e ? (c++, d.right) : (b = c, null))
		}), b
	}, Ne.prototype.left = null, Ne.prototype.right = null, Ne.prototype.a = 1, D(Ye, Le), Ze.prototype.clear = function() {
		af(this), cf(this)
	}, Ze.prototype.getName = function() {
		return this.b.getName()
	}, Ze.prototype.yb = function(a, b) {
		return ef(this, 2, a, b, void 0, void 0, void 0)
	}, l = ff.prototype, l.Qa = function() {
		return this
	}, l.setItem = function(a, b) {
		r(this.a[a]) || (this.keys.push(a.toString()), this.length = this.keys.length), this.a[a] = b
	}, l.getItem = function(a) {
		return r(this.a[a]) ? this.a[a] : null
	}, l.removeItem = function(a) {
		delete this.a[a];
		var b = this.keys;
		a = ta(b, a.toString()), a >= 0 && sa.splice.call(b, a, 1), this.length = this.keys.length
	}, l.length = 0, l.key = function(a) {
		return a = this.keys[a], r(a) ? this.a[a] : null
	}, l.clear = function() {
		this.a = {}, this.keys = [], this.length = 0
	}, gf.prototype.M = function(a) {
		var b = this;
		setTimeout(function() {
			var c = Ke(b.f),
				c = b.c.getItem(c),
				c = new pd(c);
			a(c)
		}, 10)
	}, hf.prototype.j = function(a, b) {
		var c = this.b;
		setTimeout(function() {
			a.call(b, c)
		}, 4);
		var d = this;
		return function() {
			d.a("complete", null), d.a = null, d.b = null
		}
	}, D(jf, Yd), l = jf.prototype, l.logger = null, l.$a = function(a, b, c) {
		this.J(a, !0, !1, null, b, c)
	}, l.J = function(a, b, c, d, e, f) {
		var g = a.a.j(function(h) {
			var i;
			if (c) i = Ie(h, d), h = f ? f[0] : void 0, h = Be(i, h, e[0], !b), null != h ? K(a, h) : (i = new Rd(""), K(a, i, !0));
			else {
				for (var j = d, k = [], l = !1, m = f || {}, n = 0; n < e.length; n++) {
					var o;
					d ? o = m[n] : (j = f[n], o = j.a, j = j.u), i && i.getName() == j || (i = Ie(h, j)), o = Be(i, o, e[n], !b), null != o ? k.push(o) : (l = !0, k.push(new Rd))
				}
				K(a, k, l)
			}
			g(), g = null
		}, this)
	}, l.Aa = function(a, b, c) {
		var d = a.a.j(function(e) {
			e = Ge(Ie(e, b), c), K(a, e), d(), d = null
		}, this)
	}, l.Xa = function(a, b, c) {
		kf(this, a, b, c)
	}, l.Ya = function(a, b) {
		kf(this, a, null, b)
	}, l.Ha = function(a, b, c) {
		var d = a.a.j(function(e) {
			e = bf(Ie(e, b), c), K(a, e), d(), d = null
		}, this)
	}, l.bb = function(a, b) {
		var c, d = 0,
			e = a.a.j(function(f) {
				for (var g = 0; g < b.length; g++) {
					var h = b[g].u,
						i = b[g].a;
					c && c.getName() == h || (c = Ie(f, h)), d += bf(c, i)
				}
				K(a, d), e(), e = null
			}, this)
	}, l.Pa = function(a, b, c) {
		this.Ia(a, b, c)
	}, l.Ia = function(a, b, c) {
		c && Q(c);
		var d = a.a.j(function(e) {
			e = cf(Ie(e, b), c), K(a, e), d(), d = null
		}, this)
	}, l.ab = function(a, b, c, d) {
		d && Q(d);
		var e = a.a.j(function(f) {
			f = Ie(f, b);
			for (var g = f.yb(c, d), h = g.length, i = 0; h > i; i++) bf(f, g[i]);
			K(a, h), e(), e = null
		}, this)
	}, l.ua = function(a, b) {
		var c = a.a.j(function(d) {
			for (var e = 0; e < b.length; e++) Ie(d, b[e]).clear();
			K(a, b.length), c(), c = null
		}, this)
	}, l.wa = function(a, b) {
		var c = a.a.j(function(d) {
			for (var e = [], f = 0; f < b.length; f++) {
				var g = Ie(d, b[f]);
				e.push(df(g))
			}
			K(a, e), c(), c = null
		}, this)
	}, l.Ra = function(a, b, c, d) {
		var e = a.a.j(function(f) {
			f = df(Ie(f, b), d, c), K(a, f), e(), e = null
		}, this)
	}, l.da = function(a, b, c, d, e, f, g, h, i, j) {
		e && ld(e);
		var k = a.a.j(function(l) {
			l = ef(Ie(l, c), b, d, e, h, f, g, i, j), K(a, l), k(), k = null
		}, this)
	}, D(ke, jf), ke.prototype.b = function(a, b, c, d) {
		return b = S(this.a, c), new Ae(a, 0, b, d)
	}, D(lf, Ed), l = lf.prototype, l.logger = null, l.Y = function() {
		return this.g
	}, l.ib = function(a, b, c, d, e) {
		lf.G.ib.call(this, a, b, c, d, e), this.L = y(b) ? Rc(this.a, b) : null
	}, l.Ma = function() {
		return this.A
	}, l.Ba = function() {
		return !!this.i
	}, l.update = function(a) {
		if (!this.Ba()) throw new Td;
		var b = new F,
			c = this.Y();
		a = ad(this.a, a, c);
		var d = "REPLACE INTO " + Sc(this.a) + " (" + a.nb.join(", ") + ") VALUES (" + a.sb.join(", ") + ")";
		return Bb(this + ': update "' + d + '" : ' + Q(a.values)), this.i.executeSql(d, a.values, function() {
			b.callback(c)
		}, function(a, c) {
			return b.m(c), !1
		}), b
	}, l.advance = function(a) {
		var b = this.h,
			c = this.g,
			d = !0;
		null == this.h || this.f && null == this.g || (--a, d = !1), pf(this, function(a, d, e) {
			var f = null != b && null != a && 0 == M(b, a);
			if (this.f) {
				var g = null != d && null != c && 0 == M(d, c);
				if (f && g) throw new Gb("current: " + b + ";" + c + " next: " + a + ";" + d)
			} else if (f) throw new Gb("current: " + b + " next: " + a);
			this.P(a, d, e)
		}, this.h, d, a, this.g)
	}, l.ca = function(a) {
		null != a ? pf(this, this.P, a, !0) : this.advance(1)
	}, l.openCursor = function(a, b) {
		pf(this, this.P, a, !1, 0, b)
	}, l.clear = function() {
		if (!this.Ba()) throw new Td;
		var a = new F,
			b = this.a.g,
			b = "DELETE FROM " + Sc(this.a) + " WHERE " + b + " = ?",
			c = [this.Y()];
		return Bb(this + ': clear "' + b + '" : ' + Q(c)), this.i.executeSql(b, c, function(b, c) {
			a.callback(c.rowsAffected)
		}, function(b, c) {
			return a.m(c), !1
		}), a
	}, l.ra = function(a) {
		var b = M(a, this.g);
		if (0 == b || 1 == b && this.reverse || -1 == b && !this.reverse) throw new yd(this + " to continuePrimaryKey  from " + this.g + " to " + a + " on " + this.T + " direction is wrong");
		of(this, this.P, a)
	}, D(qf, Yd), l = qf.prototype, l.logger = null, l.J = function(a, b, c, d, e, f) {
		function g(b, d) {
			if (null == e[b]) if (k++, k == e.length) K(a, j, l);
			else {
				var m = b + 2;
				m < e.length && g(m, d)
			}
			var n;
			n = r(f) ? ad(h, e[b], f[b]) : ad(h, e[b]), m = i + Sc(h) + " (" + n.nb.join(", ") + ") VALUES (" + n.sb.join(", ") + ");", d.executeSql(m, n.values, function(f, m) {
				function o(a, b) {
					var c = "ydn.db.me:" + h.getName() + ":" + a.getName(),
						c = i + ra(c) + " (" + h.c + ", " + a.c + ") VALUES (?, ?)",
						e = [Cc(p, h.type), Cc(b, a.type)];
					d.executeSql(c, e, function() {}, function() {
						return !1
					})
				}
				k++;
				var p = r(n.key) ? n.key : m.insertId;
				1 > m.rowsAffected && (l = !0, p = new Rd(p + " no-op"));
				for (var q = 0, s = h.a.length; s > q; q++) {
					var t = h.index(q);
					if (t.multiEntry) for (var u = Nb(e[b], t.keyPath), v = (u ? u.length : 0) || 0, w = 0; v > w; w++) o(t, u[w])
				}
				c ? K(a, p) : (j[b] = p, k == e.length ? K(a, j, l) : (q = b + 2, q < e.length && g(q, f)))
			}, function(d, f) {
				if (k++, l = !0, 6 == f.code && (f.name = "ConstraintError"), c) K(a, f, !0);
				else if (j[b] = f, k == e.length) K(a, j, l);
				else {
					var h = b + 2;
					h < e.length && g(h, d)
				}
				return !1
			})
		}
		b = !b;
		var h = S(this.a, d),
			i = b ? "INSERT INTO " : "INSERT OR REPLACE INTO ";
		d = a.a;
		var j = [],
			k = 0,
			l = !1;
		if (0 < e.length) for (b = 0; 2 > b && b < e.length; b++) g(b, d);
		else K(a, [])
	}, l.$a = function(a, b, c) {
		if (0 == c.length) K(a, []);
		else {
			for (var d = [], e = 0, f = 0, g = this, h = function(h, i) {
				for (var j = [], k = Yc(S(g.a, h)), l = k ? void 0 : [], m = 0; m < i.length; m++) j.push(b[i[m]]), k || l.push(c[i[m]].a);
				k = $b(a), kb(k, function(b) {
					for (var c = 0; c < i.length; c++) d[i[c]] = b[c];
					e++, e == f && K(a, d)
				}, function() {
					e++, e == f && K(a, d, !0)
				}), g.J(k, !1, !1, h, j, l)
			}, i = "", j = [], k = [], l = 0; l < c.length; l++) {
				var m = c[l].u,
					n = c[l].a;
				m != i ? (f++, 0 < j.length && h(i, j), j = [l], k = [n], i = m) : (j.push(l), k.push(n))
			}
			0 < j.length && h(i, j)
		}
	}, l.Aa = function(a, b, c) {
		var d = a.a,
			e = S(this.a, b);
		b = e.c, c = [Cc(c, e.type)], b = "SELECT * FROM " + Sc(e) + " WHERE " + b + " = ?", d.executeSql(b, c, function(b, c) {
			if (0 < c.rows.length) {
				var d = c.rows.item(0);
				null != d ? (d = nf(d, e), K(a, d)) : K(a, void 0)
			} else K(a, void 0)
		}, function(b, c) {
			return K(a, c, !0), !1
		})
	}, l.Xa = function(a, b, c) {
		function d(b, e) {
			var i = h.c,
				j = [Cc(c[b], h.type)],
				i = "SELECT * FROM " + Sc(h) + " WHERE " + i + " = ?";
			e.executeSql(i, j, function(e, i) {
				if (g++, 0 < i.rows.length) {
					var j = i.rows.item(0);
					null != j && (f[b] = nf(j, h))
				} else f[b] = void 0;
				g == c.length ? K(a, f) : (j = b + 10, j < c.length && d(j, e))
			}, function(e) {
				if (g++, g == c.length) K(a, f);
				else {
					var h = b + 10;
					h < c.length && d(h, e)
				}
				return !1
			})
		}
		var e = a.a,
			f = [],
			g = 0,
			h = S(this.a, b);
		if (0 < c.length) for (b = 0; 10 > b && b < c.length; b++) d(b, e);
		else K(a, [])
	}, l.Ya = function(a, b) {
		function c(d, h) {
			var i = b[d],
				j = S(e.a, i.u),
				k = qc(i),
				i = j.c,
				k = [Cc(k, j.type)],
				i = "SELECT * FROM " + Sc(j) + " WHERE " + i + " = ?";
			h.executeSql(i, k, function(e, h) {
				if (g++, 0 < h.rows.length) {
					var i = h.rows.item(0);
					null != i && (f[d] = nf(i, j))
				} else f[d] = void 0;
				g == b.length ? K(a, f) : (i = d + 10, i < b.length && c(i, e))
			}, function(b, c) {
				return K(a, c, !0), !1
			})
		}
		var d = a.a,
			e = this,
			f = [],
			g = 0;
		if (0 < b.length) for (var h = 0; 10 > h && h < b.length; h++) c(h, d);
		else K(a, [])
	}, l.ua = function(a, b) {
		function c(d, f) {
			function g(a) {
				a = "ydn.db.me:" + h.getName() + ":" + a.getName(), a = "DELETE FROM  " + ra(a), f.executeSql(a, [])
			}
			var h = S(e.a, b[d]),
				i = "DELETE FROM  " + Sc(h);
			f.executeSql(i, [], function(e) {
				d == b.length - 1 ? K(a, b.length) : c(d + 1, e)
			}, function(b, c) {
				return K(a, c, !0), !1
			});
			for (var i = 0, j = h.a.length; j > i; i++) {
				var k = h.index(i);
				k.multiEntry && g(k)
			}
		}
		var d = a.a,
			e = this;
		0 < b.length ? c(0, d) : K(a, 0)
	}, l.bb = function(a, b) {
		function c(h) {
			if (h >= b.length) K(a, f, g);
			else {
				var i = S(e.a, b[h].u),
					j = Cc(b[h].a, i.type),
					k = " WHERE " + i.c + " = ?",
					l = "DELETE FROM " + Sc(i) + k;
				d.executeSql(l, [j], function() {
					f++, c(h)
				}, function() {
					return g = !0, c(h), !1
				}), h++;
				for (var l = function(a) {
					a = "ydn.db.me:" + i.getName() + ":" + a.getName(), a = "DELETE FROM  " + ra(a) + k, d.executeSql(a, [j])
				}, m = 0, n = i.a.length; n > m; m++) {
					var o = i.index(m);
					o.multiEntry && l(o)
				}
			}
		}
		var d = a.a,
			e = this,
			f = 0,
			g = !1;
		c(0)
	}, l.Ha = function(a, b, c) {
		function d(a) {
			a = "ydn.db.me:" + f.getName() + ":" + a.getName(), a = "DELETE FROM  " + ra(a) + h, e.executeSql(a, [g])
		}
		var e = a.a,
			f = S(this.a, b),
			g = Cc(c, f.type),
			h = " WHERE " + f.c + " = ?";
		for (b = "DELETE FROM " + Sc(f) + h, e.executeSql(b, [g], function(b, c) {
			K(a, c.rowsAffected)
		}, function(b, c) {
			return K(a, c, !0), !1
		}), b = 0, c = f.a.length; c > b; b++) {
			var i = f.index(b);
			i.multiEntry && d(i)
		}
	}, l.Pa = function(a, b, c) {
		rf(this, a, b, void 0, c)
	}, l.Ia = function(a, b, c) {
		rf(this, a, b, void 0, c)
	}, l.ab = function(a, b, c, d) {
		rf(this, a, b, c, d)
	}, l.wa = function(a, b) {
		function c(f) {
			var g = "SELECT COUNT(*) FROM " + ra(b[f]);
			d.executeSql(g, [], function(d, g) {
				var h = g.rows.item(0);
				e[f] = parseInt(h["COUNT(*)"], 10), f++, f == b.length ? K(a, e) : c(f)
			}, function(b, c) {
				return K(a, c, !0), !1
			})
		}
		var d = a.a,
			e = [];
		0 == b.length ? K(a, 0) : c(0)
	}, l.Ra = function(a, b, c, d, e) {
		var f = [];
		b = Pc(S(this.a, b), f, 6, d, c, !1, e), a.a.executeSql(b, f, function(b, c) {
			var d;
			a: {
				if (d = c.rows.item(0)) for (var e in d) if (d.hasOwnProperty(e)) {
					d = d[e];
					break a
				}
				d = void 0
			}
			K(a, d)
		}, function(b, c) {
			return K(a, c, !0), !1
		})
	}, l.da = function(a, b, c, d, e, f, g, h, i, j) {
		var k = [],
			l = S(this.a, c),
			m = l.g,
			n = l.type,
			o = n,
			p = null != d && d !== m ? Rc(l, d) : null,
			q = d || m;
		if (p && (o = p.type), c = [], j && r(j[0])) {
			var s = j[0];
			p && r(j[1]) ? (d = j[1], e = Uc(l, b, c, p.getName(), e, s, !0, d, h, i)) : e = Tc(l, b, c, d, e, h, i, s, !0)
		} else e = Pc(l, c, b, q, e, h, i);
		A(f) && (e += " LIMIT " + f), A(g) && (e += " OFFSET " + g), Q(c), a.a.executeSql(e, c, function(c, d) {
			for (var e, f = d.rows.length, g = 0; f > g; g++) e = d.rows.item(g), 2 == b ? k[g] = Jc(e[m], n) : 1 == b ? k[g] = Jc(e[q], o) : 3 == b ? k[g] = [Jc(e[q], o), Jc(e[m], n)] : null != e && (k[g] = nf(e, l));
			j && e && (j[0] = Jc(e[q], o), j[1] = Jc(e[m], n)), K(a, k)
		}, function(b, c) {
			return K(a, c, !0), !1
		})
	}, D(je, qf), je.prototype.logger = null, je.prototype.b = function(a, b, c, d) {
		return b = S(this.a, c), new lf(a, 0, b, d)
	}, l = sf.prototype, l.connect = function(a, b) {
		function c(a, c) {
			for (var d = 0; d < b.stores.length; d++) tf(a, c, b.stores[d]);
			for (var e = a.objectStoreNames, f = e.length, d = 0; f > d; d++) rd(b, e[d]) || a.deleteObjectStore(e[d])
		}
		function d(a, b) {
			g.c || (r(b) ? (f.B = null, g.m(b)) : (f.B = a, f.B.onabort = function() {}, f.B.onerror = function() {}, f.B.onversionchange = function(a) {
				if (f.B && (f.B.onabort = null, f.B.onblocked = null, f.B.onerror = null, f.B.onversionchange = null, !a.defaultPrevented)) {
					f.B.close(), f.B = null;
					var b = Error();
					b.name = a.type, f.La(b)
				}
			}, g.callback(parseFloat(h))))
		}
		var e, f = this,
			g = new F,
			h = void 0,
			i = b.version;
		return e = r(i) ? Mb.open(a, i) : Mb.open(a), e.onsuccess = function(e) {
			var g = e.target.result;
			if (r(h) || (h = g.version), b.b) f.M(function(e) {
				if (b instanceof td) for (var f = 0; f < e.stores.length; f++) rd(b, e.stores[f].getName()) || ud(b, e.stores[f].clone());
				if (0 < sd(b, e, !1, !0).length) if (e = A(g.version) ? g.version + 1 : 1, "IDBOpenDBRequest" in q) {
					g.close();
					var h = Mb.open(a, e);
					h.onupgradeneeded = function(a) {
						c(a.target.result, h.transaction)
					}, h.onsuccess = function(a) {
						d(a.target.result)
					}, h.onerror = function() {
						d(null)
					}
				} else {
					var i = g.setVersion(e + "");
					i.a = function(a) {
						d(null, a)
					}, i.onsuccess = function() {
						i.transaction.oncomplete = j, c(g, i.transaction)
					};
					var j = function() {
						var b = Mb.open(a);
						b.onsuccess = function(a) {
							d(a.target.result)
						}, b.onerror = function() {
							d(null)
						}
					};
					null != i.transaction && (i.transaction.oncomplete = j)
				} else d(g)
			}, void 0, g);
			else if (b.version > g.version) {
				var i = g.setVersion(b.version);
				i.a = function(a) {
					d(null, a)
				}, i.onsuccess = function() {
					c(g, i.transaction)
				}
			} else f.M(function(a) {
				a = sd(b, a, !1, !0), 0 < a.length ? d(null, new wd("different schema: " + a)) : d(g)
			}, void 0, g)
		}, e.onupgradeneeded = function(a) {
			a = a.target.result, h = 0 / 0, c(a, e.transaction)
		}, e.onerror = function(a) {
			d(null, a)
		}, e.onblocked = function(a) {
			d(null, a)
		}, A(this.oa) && !isNaN(this.oa) && setTimeout(function() {
			"done" != e.readyState && d(null, new Xd("connection timeout after " + f.oa))
		}, this.oa), g
	}, l.oa = 18e4, l.La = function() {}, l.gb = function() {}, l.Za = function() {}, l.qa = function() {
		return "indexeddb"
	}, l.eb = function() {
		return this.B || null
	}, l.Ka = function() {
		return !!this.B
	}, l.logger = null, l.B = null, l.fb = function() {
		return this.B ? parseFloat(this.B.version) : void 0
	}, l.M = function(a, b, c) {
		if (c = c || this.B, r(b)) {
			if (null === b) {
				if (0 == c.objectStoreNames.length) return void a(new pd(c.version));
				throw new vd
			}
			c = b.db
		} else {
			b = [];
			for (var d = c.objectStoreNames.length - 1; d >= 0; d--) b[d] = c.objectStoreNames[d];
			if (0 == b.length) return void a(new pd(c.version));
			b = c.transaction(b, Kb)
		}
		for (var e = c.objectStoreNames, f = [], g = e.length, d = 0; g > d; d++) {
			for (var h = b.objectStore(e[d]), i = [], j = 0, k = h.indexNames.length; k > j; j++) {
				var l = h.index(h.indexNames[j]);
				i[j] = new Ec(l.keyPath, void 0, l.unique, l.multiEntry, l.name)
			}
			f[d] = new Nc(h.name, h.keyPath, h.autoIncrement, void 0, i)
		}
		b = new pd(c.version, f), a(b)
	}, l.ya = function(a, b, c, d) {
		var e = this.B;
		if (!b) {
			b = [];
			for (var f = e.objectStoreNames.length - 1; f >= 0; f--) b[f] = e.objectStoreNames[f]
		}
		0 == b.length ? a(null) : (b = e.transaction(b, c), b.oncomplete = function(a) {
			d("complete", a)
		}, b.onabort = function(a) {
			d("abort", a)
		}, a(b), a = null)
	}, l.close = function() {
		this.B.close()
	}, ec.push(function(a, b) {
		if (!Mb || b && "indexeddb" != b) return null;
		var c = Mb.deleteDatabase(a),
			d = new J("vc");
		return c.onblocked = function(a) {
			Ib(d, a)
		}, c.onerror = function(a) {
			d.m(a)
		}, c.onsuccess = function(a) {
			d.callback(a)
		}, d
	}), D(uf, gf), l = uf.prototype, l.logger = null, l.fb = function() {
		return this.b
	}, l.connect = function(a, b) {
		function c(a, b) {
			setTimeout(function() {
				b ? d.m(b) : d.callback(a)
			}, 10)
		}
		var d = new F;
		this.c = this.h.Qa(a), this.f = a, this.a = b;
		var e = Ke(this.f);
		this.b = 0 / 0;
		var f = kd(this.c.getItem(e));
		if (r(f.version) && !A(f.version) && (f.version = 0 / 0), f) if (f = new pd(f), sd(this.a, f, !1, !1)) if (!this.a.b && !isNaN(f.version) && this.a.version > f.version) c(0 / 0, new Sd(""));
		else {
			var g = this.a.version;
			for (this.b = r(g) ? g : f.version + 1, g = 0; g < this.a.count(); g++) var h = this.a.stores[g] || null;
			if (this.a instanceof td) for (g = 0; g < f.count(); g++) h = f.stores[g] || null, ud(this.a, h);
			g = this.a.toJSON(), g.version = this.b || 0 / 0, this.c.setItem(e, Q(g)), c(f.version || 0 / 0)
		} else {
			for (g = 0; g < this.a.count(); g++) h = this.a.stores[g] || null;
			this.b = f.version || 0 / 0, c(this.b)
		} else f = b.toJSON(), this.b = 1, f.version = this.b, this.c.setItem(e, Q(f)), c(0 / 0);
		return d
	}, l.Ka = function() {
		return !!this.f
	}, l.eb = function() {
		return this.c || null
	}, l.La = function() {}, l.gb = function() {}, l.Za = function() {}, l.qa = function() {
		return "memory"
	}, l.close = function() {}, l.ya = function(a, b, c, d) {
		a(new hf(this, function(a, b) {
			d(a, b)
		}))
	}, D(vf, uf), vf.prototype.Qa = function() {
		return window.localStorage
	}, vf.prototype.qa = function() {
		return "localstorage"
	}, ec.push(function(a, b) {
		if (!b || "localstorage" == b) {
			var c = new vf,
				d = new td;
			c.connect(a, d), c.M(function(a) {
				for (var b = 0; b < a.stores.length; b++) Ie(c, a.stores[b].getName()).clear()
			})
		}
	}), D(wf, uf), wf.prototype.Qa = function() {
		return window.sessionStorage
	}, wf.prototype.qa = function() {
		return "sessionstorage"
	}, ec.push(function(a, b) {
		if (!b || "sessionstorage" == b) {
			var c = new wf,
				d = new td;
			c.connect(a, d), c.M(function(a) {
				for (var b = 0; b < a.stores.length; b++) Ie(c, a.stores[b].getName()).clear()
			})
		}
	}), l = xf.prototype, l.connect = function(a, b) {
		function c(a, b) {
			var c = a.version ? parseInt(a.version, 10) : 0,
				f = !1,
				g = 0;
			a.changeVersion(a.version, (b.b ? isNaN(c) ? 1 : c + 1 : b.version) + "", function(c) {
				e.M(function(a) {
					f = !0;
					for (var d = 0; d < b.count(); d++) {
						var e = S(a, (b.stores[d] || null).getName()),
							e = e ? Xc(e, b.stores[d] || null) : null;
						yf(c, b.stores[d] || null, function(a) {
							a && g++
						}, e)
					}
					for (d = 0; d < a.count(); d++) e = a.stores[d] || null, rd(b, e.getName()) || (b instanceof td ? ud(b, e) : (e = "DROP TABLE " + Sc(e), c.executeSql(e, [], function() {}, function(a, b) {
						throw b
					})))
				}, c, a)
			}, function(a) {
				throw a
			}, function() {
				f && d(a)
			})
		}
		function d(a, b) {
			r(b) ? (e.F = null, g.m(b)) : (e.F = a, g.callback(parseFloat(f)))
		}
		var e = this,
			f = 0 / 0,
			g = new F,
			h = null;
		try {
			"sqlite" == this.b ? q.sqlitePlugin ? (h = q.sqlitePlugin.openDatabase(a, "", a, this.a), h.readTransaction || (h.readTransaction = h.transaction), h.changeVersion = function(a, b, c, d, e) {
				h.transaction(c, d, e)
			}) : (h = null, this.Ea = Error("sqlitePlugin not found.")) : h = q.openDatabase(a, "", a, this.a)
		} catch (i) {
			if ("SECURITY_ERR" != i.name) throw i;
			h = null, this.Ea = new Wd(i)
		}
		return h ? (f = h.version || "", null != b.version && b.version == h.version ? d(h) : this.M(function(a) {
			sd(b, a, !0, !1) ? c(h, b) : d(h)
		}, null, h)) : d(null, this.Ea), g
	}, l.qa = function() {
		return this.b
	}, l.Ea = null, l.F = null, l.eb = function() {
		return this.F || null
	}, l.logger = null, l.La = function() {}, l.gb = function() {}, l.fb = function() {
		return this.F ? parseFloat(this.F.version) : void 0
	}, l.M = function(a, b, c) {
		function d(a, b) {
			throw b
		}
		function e(b, c) {
			if (c && c.rows) {
				for (var d = 0; d < c.rows.length; d++) {
					var e = c.rows.item(d);
					if ("__WebKitDatabaseInfoTable__" != e.name && "sqlite_sequence" != e.name && "table" == e.type) {
						for (var f, i = ("sql" in e ? e.sql : void 0), j = i.substr(i.indexOf("("), i.lastIndexOf(")")).match(/(?:"[^"]*"|[^,])+/g), k = void 0, i = [], l = !1, m = !1, n = 0; n < j.length; n++) {
							var o = j[n].match(/\w+|"[^"]+"/g),
								p = ua(o, function(a) {
									return a.toUpperCase()
								}),
								q = na(o[0]),
								o = Fc(p[1]);
							if (-1 != p.indexOf("PRIMARY") && -1 != p.indexOf("KEY")) {
								if (f = o, y(q) && !/^[\s\xa0]*$/.test(q) && "_ROWID_" != q) {
									var r = q.split(","),
										k = q;
									1 < r.length && (k = r, f = void 0)
								} - 1 != p.indexOf("AUTOINCREMENT") && (l = !0)
							} else if ("_ROWID_" != q) if ("_default_" == q) m = !0;
							else {
								var s = "UNIQUE" == p[2];
								0 == q.lastIndexOf(e.tbl_name + "-", 0) && (q = q.substr(e.tbl_name.length + 1)), p = new Ec(q, o, s), i.push(p)
							}
						}
						if (0 == e.name.lastIndexOf("ydn.db.me:", 0)) {
							var t = e.name.split(":");
							if (3 <= t.length) {
								var u = t[1],
									k = new Ec(t[2], o, s, !0),
									j = xa(i, function(a) {
										return a.getName() == t[2]
									});
								j >= 0 ? i[j] = k : i.push(k), j = xa(h, function(a) {
									return a.getName() === u
								}), j >= 0 ? (n = h[j], h[j] = new Nc(n.getName(), n.keyPath, l, f, i, void 0, !m)) : h.push(new Nc(u, void 0, !1, void 0, [k])), Bb('multi entry index "' + k.getName() + '" found in ' + u + (-1 == j ? "*" : ""))
							}
						} else n = xa(h, function(a) {
							return a.getName() === e.name
						}), n >= 0 ? (j = h[n].index(0), i.push(j), h[n] = new Nc(e.name, k, l, f, i, void 0, !m)) : (i = new Nc(e.name, k, l, f, i, void 0, !m), h.push(i))
					}
				}
				d = new pd(g, h), a(d)
			}
		}
		var f = this,
			g = (c = c || this.F) && c.version ? parseFloat(c.version) : void 0,
			g = isNaN(g) ? void 0 : g,
			h = [];
		b ? b.executeSql("SELECT * FROM sqlite_master", [], e, d) : c.readTransaction(function(b) {
			f.M(a, b, c)
		}, function(a) {
			throw a
		}, e)
	}, l.Ka = function() {
		return !!this.F
	}, l.close = function() {
		this.F = null
	}, l.ya = function(a, b, c, d) {
		function e(a) {
			d("abort", a)
		}
		function f() {
			d("complete", {
				type: "complete"
			})
		}
		function g(b) {
			a(b)
		}
		null === this.F && (a(null), d("abort", this.Ea)), c == Kb ? this.F.readTransaction(g, e, f) : c == Lb ? this.F.changeVersion(this.F.version, this.F.version + 1 + "", g, e, f) : this.F.transaction(g, e, f)
	}, ec.push(function(a, b) {
		if (ca(q.openDatabase) && (!b || "websql" == b)) {
			var c = new xf,
				d = new td,
				d = c.connect(a, d),
				e = function() {};
			d.D(function() {
				c.ya(function(a) {
					a.executeSql('SELECT * FROM sqlite_master WHERE type = "table"', [], function(b, c) {
						if (c && c.rows) for (var d = c.rows.length, e = 0, f = 0; d > f; f++) {
							var g = c.rows.item(f);
							"__WebKitDatabaseInfoTable__" != g.name && "sqlite_sequence" != g.name && (e++, a.executeSql("DROP TABLE " + g.name))
						}
					}, function(a, b) {
						throw b
					})
				}, [], I, e)
			}), d.kb(function() {})
		}
	}), xf.prototype.Za = function() {}, ue.prototype.Ta = function(a) {
		return "indexeddb" == a && Mb ? new sf(0, this.A) : "websql" == a && ca(q.openDatabase) ? new xf(this.o) : "sqlite" == a && q.sqlitePlugin ? new xf(this.o, "sqlite") : "localstorage" == a && window.localStorage ? new vf : "sessionstorage" == a && window.sessionStorage ? new wf : "memory" == a ? new uf : null
	}, ue.prototype.branch = ue.prototype.vb, ue.prototype.getTxNo = ue.prototype.Nb, he.prototype.getTxNo = he.prototype.g, ue.prototype.run = ue.prototype.Db, W.prototype.branch = W.prototype.vb, W.prototype.add = W.prototype.add, W.prototype.addAll = W.prototype.sa, W.prototype.get = W.prototype.get, W.prototype.keys = W.prototype.keys, W.prototype.keysByIndex = W.prototype.ma, W.prototype.values = W.prototype.values, W.prototype.valuesByIndex = W.prototype.pa, W.prototype.put = W.prototype.put, W.prototype.putAll = W.prototype.Ga, W.prototype.clear = W.prototype.clear, W.prototype.remove = W.prototype.Na, W.prototype.count = W.prototype.count, V.prototype.add = V.prototype.add, V.prototype.addAll = V.prototype.sa, V.prototype.get = V.prototype.get, V.prototype.keys = V.prototype.keys, V.prototype.keysByIndex = V.prototype.ma, V.prototype.values = V.prototype.values, V.prototype.valuesByIndex = V.prototype.pa, V.prototype.put = V.prototype.put, V.prototype.putAll = V.prototype.Ga, V.prototype.clear = V.prototype.clear, V.prototype.remove = V.prototype.Na, V.prototype.count = V.prototype.count, ja("ydn.db.Key", pc), pc.prototype.id = pc.prototype.xb, pc.prototype.parent = pc.prototype.Hb, pc.prototype.storeName = pc.prototype.Ib, ja("ydn.db.KeyRange", P), P.upperBound = wc, P.lowerBound = xc, P.bound = vc, P.only = uc, P.starts = yc, lc.prototype.store_name = lc.prototype.u, lc.prototype.getStoreName = lc.prototype.a, D(Af, we), ja("ydn.db.Storage", Af), D(Cf, Pd), Cf.prototype.c = function(a, b) {
		var c = [],
			d = b[0];
		if (null == d) return [];
		for (var e = !0, f = !1, g = d, h = [], i = 1; i < a.length; i++) if (null != b[i]) {
			var j = M(d, b[i]);
			h[i] = j, this.a ? -1 == j ? e = !1 : 1 == j && (e = !1, f = !0, -1 == M(b[i], g) && (g = b[i])) : 1 == j ? e = !1 : -1 == j && (e = !1, f = !0, 1 == M(b[i], g) && (g = b[i]))
		} else e = !1, f = !0;
		if (e) for (f = 0; f < a.length; f++) null != b[f] && (c[f] = !0);
		else if (f) for (f = 0; f < a.length; f++) null != b[f] && (this.a ? -1 == M(g, b[f]) && (c[f] = g) : 1 == M(g, b[f]) && (c[f] = g));
		else for (i = this.a ? -1 : 1, f = 1; f < a.length; f++) h[f] === i && (c[f] = d);
		return e ? (this.b && this.b.push(g), c) : {
			continuePrimary: c
		}
	}, D(Df, Pd), Df.prototype.logger = null, Df.prototype.c = function(a, b) {
		function c(a, b) {
			var c = a.slice(0, a.length - 1);
			return c.push(b), c
		}
		function d(a) {
			return a[a.length - 1]
		}
		var e = [];
		if (0 == a.length || null == a[0] || null == a[0]) return [];
		for (var f = !0, g = 0, h = d(a[g]), i = [], j = 1; j < a.length; j++) {
			if (null == a[j]) return [];
			var k = d(a[j]),
				l = M(h, k);
			i[j] = l, this.a ? -1 == l ? f = !1 : 1 == l && (f = !1, h = k, g = 1) : 1 == l ? f = !1 : -1 == l && (f = !1, h = k, g = 1)
		}
		if (j = this.a ? -1 : 1, f) {
			for (f = 0; f < a.length; f++) null != a[f] && (e[f] = !0);
			return this.b && this.b.push(b[0]), e
		}
		if (0 == g) for (f = 1; f < a.length; f++) i[f] == j && (e[f] = c(a[f], h));
		else for (f = 0; f < a.length; f++) f != g && null != a[f] && M(h, d(a[f])) === j && (e[f] = c(a[f], h));
		return {
			"continue": e
		}
	}, Ef.prototype.clone = function() {
		var a = new Ef(this.c, this.a, this.h, this.g);
		return a.f = this.f.slice(), a.b = this.b.slice(), a
	}, Ef.prototype.reverse = function() {
		var a = this.clone();
		return a.h = !this.h, a
	}, Ef.prototype.unique = function(a) {
		var b = this.clone();
		return b.g = !! a, b
	}, Ef.prototype.s = function(a, b, c, d, e) {
		if (c = Dc(b, c, d, e), 0 < this.b.length) {
			if (!this.a) return "cannot use where clause with existing filter";
			if (null != this.a.lower && null != this.a.upper && 0 == M(this.a.lower, this.a.upper)) a = t(this.a.lower) ? this.a.lower.slice().push(b) : [this.a.lower, b], d = null != d ? d : "￿", c = t(this.a.upper) ? this.a.upper.slice().push(d) : [this.a.upper, d], this.a = Dc(b, a, d, c);
			else {
				if (!(1 == this.b.length && this.b[0] == a || t(a) && Ba(this.b, a))) return "cannot use where clause with existing filter";
				this.a = Ac(this.a, c)
			}
		} else this.b = t(a) ? a : [a], this.a = this.a ? Ac(this.a, c) : c;
		return null
	}, D(Kf, Bf), Kf.prototype.open = function() {
		var a = {
			push: function() {}
		}, a = Lf(this) ? new Df(a) : new Cf(a);
		return oe(this.db, a, Mf(this))
	}, Kf.prototype.Va = function() {
		return this.a.slice()
	}, Kf.prototype.select = function() {
		throw Error("not impl")
	}, Kf.prototype.reverse = function() {
		var a = this.a.map(function(a) {
			return a.reverse()
		});
		return new Kf(this.db, this.b, this.type, a)
	}, D(Z, Bf), l = Z.prototype, l.Jb = function() {
		return new Z(this.db, this.b, this.type, this.a.clone())
	}, l.reverse = function() {
		var a = this.a.reverse();
		return new Z(this.db, this.b, this.type, a)
	}, l.unique = function(a) {
		if (!ba(a)) throw new G("unique value must be a boolean, but " + typeof a + " found");
		return a = this.a.unique(a), new Z(this.db, this.b, this.type, a)
	}, l.R = function(a) {
		var b = y(a) ? [a] : a;
		if (a = this.a.clone(), b = Ff(a, b)) throw Error(b);
		return new Z(this.db, this.b, this.type, a)
	}, l.s = function(a, b, c, d, e) {
		if (Jf(this.a) && Jf(this.a) != a) {
			var f = Dc(b, c, d, e),
				f = new Ef(S(this.b, this.a.c.getName()), f, this.a.h, this.a.g),
				f = new Z(this.db, this.b, this.type, f).Va().concat(this.Va());
			return new Kf(this.db, this.b, this.type, f)
		}
		if (!Jf(this.a) && !Wc(S(this.b, this.a.c.getName()), a)) throw new G('index "' + a + '" not exists in ' + this.a.c.getName());
		if (f = this.a.clone(), a = f.s(a, b, c, d, e)) throw new G(a);
		return new Z(this.db, this.b, this.type, f)
	}, l.select = function(a) {
		var b = S(this.b, this.a.c.getName()),
			c = y(a) ? [a] : a,
			d = this.type;
		if (a = this.a.clone(), d = Jf(this.a), 1 == c.length) if (d = c[0], "_ROWID_" == d || d == b.keyPath) d = 2;
		else if (d && "*" != d) {
			if (!Wc(b, d)) throw new G('Invalid select "' + d + '", index not found in store "' + b.getName() + '"');
			if (b = Ff(a, c)) throw new G(b);
			d = 1
		} else d = 4;
		else {
			if (2 != c.length) throw new G("Selecting more than 2 field names is not supported, but " + c.length + " fields selected.");
			if (!d) throw new G("Only primary key can be selected for this query.");
			for (var e = 0; 2 > e; e++) {
				var f;
				if (f = "_ROWID_" != c[e]) {
					f = b;
					var g = c[e];
					f = !(r(f.keyPath) && (1 == f.h.length ? f.keyPath === g : x(g) && Ba(f.h, g)))
				}
				if (f && c[e] != d) throw new G('select field name must be "' + d + '", but "' + c[e] + '" found.')
			}
			d = 3
		}
		return new Z(this.db, this.b, d, a)
	}, l.Kb = function(a) {
		a = a || 100;
		var b = 4,
			c = Nf(this);
		return this.c && this.c[0] && (c = Nd(c, this.c[0], this.c[1])), (2 == this.type || 3 == this.type || 1 == this.type) && (b = this.type), a = pe(this.db, b, c, a), a.D(function() {
			"rest" == c.g && (this.c = [c.l, c.o])
		}, this), a
	}, l.Va = function() {
		return [this.a.clone()]
	}, l.Cb = function(a, b) {
		var c = Nf(this);
		c.c && (c = new Jd(c.b, c.f, c.a, Ld(c), Md(c), !1, c.h));
		var d = this.db.open(function(c) {
			var e = c.Ma();
			if (y(a)) Ob(e, a, b);
			else if (t(a)) for (var f = 0; f < a.length; f++) Ob(e, a[f], b[f]);
			else if (B(a)) for (f in a) a.hasOwnProperty(f) && (e[f] = a[f]);
			lb(d, c.update(e))
		}, c, I, this);
		return d
	}, l.open = function(a, b) {
		return this.db.open(a, Nf(this), I, b)
	}, l.count = function() {
		return Hf(this.a) ? this.a.g ? this.db.count(Gf(this.a)) : this.db.count(this.a.c.getName(), Jf(this.a), this.a.a) : this.db.count(this.a.c.getName(), this.a.a)
	}, l.clear = function() {
		return Hf(this.a) ? this.db.clear(this.a.c.getName(), Jf(this.a), this.a.a) : this.db.clear(this.a.c.getName(), this.a.a)
	}, we.prototype.O = function(a, b, c, d, e) {
		if (!rd(this.b, a)) throw new G('Store "' + a + '" not found.');
		var f = null;
		if (r(b)) {
			if (!r(c)) throw new G("boundary value must be defined.");
			f = Dc(b, c, d, e)
		} else if (r(d)) throw new G("second boundary must not be defined.");
		return a = new Ef(S(this.b, a), f), new Z(this.c, this.b, null, a)
	}, me.prototype.O = function(a, b, c, d, e) {
		if (!rd(this.b, a)) throw new G('Store "' + a + '" not found.');
		var f = null;
		if (r(b)) {
			if (!r(c)) throw new G("boundary value must be defined.");
			f = Dc(b, c, d, e)
		} else if (r(d)) throw new G("second boundary must not be defined.");
		return a = new Ef(S(this.b, a), f), new Z(this, this.b, null, a)
	}, Z.prototype.copy = Z.prototype.Jb, Z.prototype.count = Z.prototype.count, Z.prototype.list = Z.prototype.Kb, Z.prototype.order = Z.prototype.R, Z.prototype.patch = Z.prototype.Cb, Z.prototype.reverse = Z.prototype.reverse, Z.prototype.unique = Z.prototype.unique, Z.prototype.where = Z.prototype.s, we.prototype.from = we.prototype.O, me.prototype.from = me.prototype.O, ydn
}, this || {}),
function(a) {
	{
		var b = [].slice,
			c = {};
		a.amplify = {
			publish: function(a) {
				if ("string" != typeof a) throw new Error("You must provide a valid topic to publish.");
				var d, e, f, g, h = b.call(arguments, 1),
					i = 0;
				if (!c[a]) return !0;
				for (d = c[a].slice(), f = d.length; f > i && (e = d[i], g = e.callback.apply(e.context, h), g !== !1); i++);
				return g !== !1
			},
			subscribe: function(a, b, d, e) {
				if ("string" != typeof a) throw new Error("You must provide a valid topic to create a subscription.");
				3 === arguments.length && "number" == typeof d && (e = d, d = b, b = null), 2 === arguments.length && (d = b, b = null), e = e || 10;
				for (var f, g = 0, h = a.split(/\s/), i = h.length; i > g; g++) {
					a = h[g], f = !1, c[a] || (c[a] = []);
					for (var j = c[a].length - 1, k = {
						callback: d,
						context: b,
						priority: e
					}; j >= 0; j--) if (c[a][j].priority <= e) {
						c[a].splice(j + 1, 0, k), f = !0;
						break
					}
					f || c[a].unshift(k)
				}
				return d
			},
			unsubscribe: function(a, b, d) {
				if ("string" != typeof a) throw new Error("You must provide a valid topic to remove a subscription.");
				if (2 === arguments.length && (d = b, b = null), c[a]) for (var e = c[a].length, f = 0; e > f; f++) c[a][f].callback === d && (!b || c[a][f].context === b) && (c[a].splice(f, 1), f--, e--)
			}
		}
	}
}(this),
function(a, b) {
	function c(a, c) {
		d.addType(a, function(f, g, h) {
			var i, j, k, l, m = g,
				n = (new Date).getTime();
			if (!f) {
				m = {}, l = [], k = 0;
				try {
					for (f = c.length; f = c.key(k++);) e.test(f) && (j = JSON.parse(c.getItem(f)), j.expires && j.expires <= n ? l.push(f) : m[f.replace(e, "")] = j.data);
					for (; f = l.pop();) c.removeItem(f)
				} catch (o) {}
				return m
			}
			if (f = "__amplify__" + f, g === b) {
				if (i = c.getItem(f), j = i ? JSON.parse(i) : {
					expires: -1
				}, !(j.expires && j.expires <= n)) return j.data;
				c.removeItem(f)
			} else if (null === g) c.removeItem(f);
			else {
				j = JSON.stringify({
					data: g,
					expires: h.expires ? n + h.expires : null
				});
				try {
					c.setItem(f, j)
				} catch (o) {
					d[a]();
					try {
						c.setItem(f, j)
					} catch (o) {
						throw d.error()
					}
				}
			}
			return m
		})
	}
	var d = a.store = function(a, b, c) {
		var e = d.type;
		return c && c.type && c.type in d.types && (e = c.type), d.types[e](a, b, c || {})
	};
	d.types = {}, d.type = null, d.addType = function(a, b) {
		d.type || (d.type = a), d.types[a] = b, d[a] = function(b, c, e) {
			return e = e || {}, e.type = a, d(b, c, e)
		}
	}, d.error = function() {
		return "amplify.store quota exceeded"
	};
	var e = /^__amplify__/;
	for (var f in {
		localStorage: 1,
		sessionStorage: 1
	}) try {
		window[f].setItem("__amplify__", "x"), window[f].removeItem("__amplify__"), c(f, window[f])
	} catch (g) {}
	if (!d.types.localStorage && window.globalStorage) try {
		c("globalStorage", window.globalStorage[window.location.hostname]), "sessionStorage" === d.type && (d.type = "globalStorage")
	} catch (g) {}! function() {
		if (!d.types.localStorage) {
			var a = document.createElement("div"),
				c = "amplify";
			a.style.display = "none", document.getElementsByTagName("head")[0].appendChild(a);
			try {
				a.addBehavior("#default#userdata"), a.load(c)
			} catch (e) {
				return void a.parentNode.removeChild(a)
			}
			d.addType("userData", function(e, f, g) {
				a.load(c);
				var h, i, j, k, l, m = f,
					n = (new Date).getTime();
				if (!e) {
					for (m = {}, l = [], k = 0; h = a.XMLDocument.documentElement.attributes[k++];) i = JSON.parse(h.value), i.expires && i.expires <= n ? l.push(h.name) : m[h.name] = i.data;
					for (; e = l.pop();) a.removeAttribute(e);
					return a.save(c), m
				}
				if (e = e.replace(/[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-"), e = e.replace(/^-/, "_-"), f === b) {
					if (h = a.getAttribute(e), i = h ? JSON.parse(h) : {
						expires: -1
					}, !(i.expires && i.expires <= n)) return i.data;
					a.removeAttribute(e)
				} else null === f ? a.removeAttribute(e) : (j = a.getAttribute(e), i = JSON.stringify({
					data: f,
					expires: g.expires ? n + g.expires : null
				}), a.setAttribute(e, i));
				try {
					a.save(c)
				} catch (o) {
					null === j ? a.removeAttribute(e) : a.setAttribute(e, j), d.userData();
					try {
						a.setAttribute(e, i), a.save(c)
					} catch (o) {
						throw null === j ? a.removeAttribute(e) : a.setAttribute(e, j), d.error()
					}
				}
				return m
			})
		}
	}(),
	function() {
		function a(a) {
			return a === b ? b : JSON.parse(JSON.stringify(a))
		}
		var c = {}, e = {};
		d.addType("memory", function(d, f, g) {
			return d ? f === b ? a(c[d]) : (e[d] && (clearTimeout(e[d]), delete e[d]), null === f ? (delete c[d], null) : (c[d] = f, g.expires && (e[d] = setTimeout(function() {
				delete c[d], delete e[d]
			}, g.expires)), f)) : a(c)
		})
	}()
}(this.amplify = this.amplify || {}),
function(a) {
	"use strict";

	function b() {}
	function c(a) {
		return "[object Function]" === {}.toString.call(a)
	}
	function d(a) {
		var b = !1;
		return setTimeout(function() {
			b = !0
		}, 1),
		function() {
			var c = this,
				d = arguments;
			b ? a.apply(c, d) : setTimeout(function() {
				a.apply(c, d)
			}, 1)
		}
	}
	a.request = function(e, f, g) {
		var h = e || {};
		"string" == typeof h && (c(f) && (g = f, f = {}), h = {
			resourceId: e,
			data: f || {},
			success: g
		});
		var i = {
			abort: b
		}, j = a.request.resources[h.resourceId],
			k = h.success || b,
			l = h.error || b;
		if (h.success = d(function(b, c) {
			c = c || "success", a.publish("request.success", h, b, c), a.publish("request.complete", h, b, c), k(b, c)
		}), h.error = d(function(b, c) {
			c = c || "error", a.publish("request.error", h, b, c), a.publish("request.complete", h, b, c), l(b, c)
		}), !j) throw h.resourceId ? "amplify.request: unknown resourceId: " + h.resourceId : "amplify.request: no resourceId provided";
		return a.publish("request.before", h) ? (a.request.resources[h.resourceId](h, i), i) : void h.error(null, "abort")
	}, a.request.types = {}, a.request.resources = {}, a.request.define = function(b, c, d) {
		if ("string" == typeof c) {
			if (!(c in a.request.types)) throw "amplify.request.define: unknown type: " + c;
			d.resourceId = b, a.request.resources[b] = a.request.types[c](d)
		} else a.request.resources[b] = c
	}
}(amplify),
function(a, b, c) {
	"use strict";
	var d = ["status", "statusText", "responseText", "responseXML", "readyState"],
		e = /\{([^\}]+)\}/g;
	a.request.types.ajax = function(e) {
		return e = b.extend({
			type: "GET"
		}, e),
		function(f, g) {
			var h, i, j = (e.url, g.abort),
				k = b.extend(!0, {}, e, {
					data: f.data
				}),
				l = !1,
				m = {
					readyState: 0,
					setRequestHeader: function(a, b) {
						return h.setRequestHeader(a, b)
					},
					getAllResponseHeaders: function() {
						return h.getAllResponseHeaders()
					},
					getResponseHeader: function(a) {
						return h.getResponseHeader(a)
					},
					overrideMimeType: function(a) {
						return h.overrideMimeType(a)
					},
					abort: function() {
						l = !0;
						try {
							h.abort()
						} catch (a) {}
						i(null, "abort")
					},
					success: function(a, b) {
						f.success(a, b)
					},
					error: function(a, b) {
						f.error(a, b)
					}
				};
			i = function(a, e) {
				b.each(d, function(a, b) {
					try {
						m[b] = h[b]
					} catch (c) {}
				}), /OK$/.test(m.statusText) && (m.statusText = "success"), a === c && (a = null), l && (e = "abort"), /timeout|error|abort/.test(e) ? m.error(a, e) : m.success(a, e), i = b.noop
			}, a.publish("request.ajax.preprocess", e, f, k, m), b.extend(k, {
				isJSONP: function() {
					return /jsonp/gi.test(this.dataType)
				},
				cacheURL: function() {
					if (!this.isJSONP()) return this.url;
					var a = "callback";
					this.hasOwnProperty("jsonp") && (this.jsonp !== !1 ? a = this.jsonp : this.hasOwnProperty("jsonpCallback") && (a = this.jsonpCallback));
					var b = new RegExp("&?" + a + "=[^&]*&?", "gi");
					return this.url.replace(b, "")
				},
				success: function(a, b) {
					i(a, b)
				},
				error: function(a, b) {
					i(null, b)
				},
				beforeSend: function(b, c) {
					h = b, k = c;
					var d = e.beforeSend ? e.beforeSend.call(this, m, k) : !0;
					return d && a.publish("request.before.ajax", e, f, k, m)
				}
			}), k.cache && k.isJSONP() && b.extend(k, {
				cache: !0
			}), b.ajax(k), g.abort = function() {
				m.abort(), j.call(this)
			}
		}
	}, a.subscribe("request.ajax.preprocess", function(a, c, d) {
		var f = [],
			g = d.data;
		"string" != typeof g && (g = b.extend(!0, {}, a.data, g), d.url = d.url.replace(e, function(a, b) {
			return b in g ? (f.push(b), g[b]) : void 0
		}), b.each(f, function(a, b) {
			delete g[b]
		}), d.data = g)
	}), a.subscribe("request.ajax.preprocess", function(a, c, d) {
		var e = d.data,
			f = a.dataMap;
		f && "string" != typeof e && (b.isFunction(f) ? d.data = f(e) : (b.each(a.dataMap, function(a, b) {
			a in e && (e[b] = e[a], delete e[a])
		}), d.data = e))
	});
	var f = a.request.cache = {
		_key: function(a, b, c) {
			function d() {
				return c.charCodeAt(f++) << 24 | c.charCodeAt(f++) << 16 | c.charCodeAt(f++) << 8 | c.charCodeAt(f++) << 0
			}
			c = b + c;
			for (var e = c.length, f = 0, g = d(); e > f;) g ^= d();
			return "request-" + a + "-" + g
		},
		_default: function() {
			var a = {};
			return function(b, c, d, e) {
				var g = f._key(c.resourceId, d.cacheURL(), d.data),
					h = b.cache;
				if (g in a) return e.success(a[g]), !1;
				var i = e.success;
				e.success = function(b) {
					a[g] = b, "number" == typeof h && setTimeout(function() {
						delete a[g]
					}, h), i.apply(this, arguments)
				}
			}
		}()
	};
	a.store && (b.each(a.store.types, function(b) {
		f[b] = function(c, d, e, g) {
			var h = f._key(d.resourceId, e.cacheURL(), e.data),
				i = a.store[b](h);
			if (i) return e.success(i), !1;
			var j = g.success;
			g.success = function(d) {
				a.store[b](h, d, {
					expires: c.cache.expires
				}), j.apply(this, arguments)
			}
		}
	}), f.persist = f[a.store.type]), a.subscribe("request.before.ajax", function(a) {
		var b = a.cache;
		return b ? (b = b.type || b, f[b in f ? b : "_default"].apply(this, arguments)) : void 0
	}), a.request.decoders = {
		jsend: function(a, b, c, d, e) {
			"success" === a.status ? d(a.data) : "fail" === a.status ? e(a.data, "fail") : "error" === a.status ? (delete a.status, e(a, "error")) : e(null, "error")
		}
	}, a.subscribe("request.before.ajax", function(c, d, e, f) {
		function g(a, b) {
			i(a, b)
		}
		function h(a, b) {
			j(a, b)
		}
		var i = f.success,
			j = f.error,
			k = b.isFunction(c.decoder) ? c.decoder : c.decoder in a.request.decoders ? a.request.decoders[c.decoder] : a.request.decoders._default;
		k && (f.success = function(a, b) {
			k(a, b, f, g, h)
		}, f.error = function(a, b) {
			k(a, b, f, g, h)
		})
	})
}(amplify, jQuery),
function(a, b, c) {
	"use strict";

	function d(a) {
		return function() {
			var b, c = arguments[0];
			for (b = "[" + (a ? a + ":" : "") + c + "] http://errors.angularjs.org/1.3.0/" + (a ? a + "/" : "") + c, c = 1; c < arguments.length; c++) {
				b = b + (1 == c ? "?" : "&") + "p" + (c - 1) + "=";
				var d, e = encodeURIComponent;
				d = arguments[c], d = "function" == typeof d ? d.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof d ? "undefined" : "string" != typeof d ? JSON.stringify(d) : d, b += e(d)
			}
			return Error(b)
		}
	}
	function e(a) {
		if (null == a || z(a)) return !1;
		var b = a.length;
		return a.nodeType === Hd && b ? !0 : u(a) || Bd(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
	}
	function f(a, b, c) {
		var d, g;
		if (a) if (x(a)) for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d, a);
		else if (Bd(a) || e(a)) {
			var h = "object" != typeof a;
			for (d = 0, g = a.length; g > d; d++)(h || d in a) && b.call(c, a[d], d, a)
		} else if (a.forEach && a.forEach !== f) a.forEach(b, c, a);
		else for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a);
		return a
	}
	function g(a) {
		var b, c = [];
		for (b in a) a.hasOwnProperty(b) && c.push(b);
		return c.sort()
	}
	function h(a, b, c) {
		for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
		return d
	}
	function i(a) {
		return function(b, c) {
			a(c, b)
		}
	}
	function j() {
		return ++zd
	}
	function k(a, b) {
		b ? a.$$hashKey = b : delete a.$$hashKey
	}
	function l(a) {
		for (var b = a.$$hashKey, c = 1, d = arguments.length; d > c; c++) {
			var e = arguments[c];
			if (e) for (var f = Object.keys(e), g = 0, h = f.length; h > g; g++) {
				var i = f[g];
				a[i] = e[i]
			}
		}
		return k(a, b), a
	}
	function m(a) {
		return parseInt(a, 10)
	}
	function n(a, b) {
		return l(new(l(function() {}, {
			prototype: a
		})), b)
	}
	function o() {}
	function p(a) {
		return a
	}
	function q(a) {
		return function() {
			return a
		}
	}
	function r(a) {
		return "undefined" == typeof a
	}
	function s(a) {
		return "undefined" != typeof a
	}
	function t(a) {
		return null !== a && "object" == typeof a
	}
	function u(a) {
		return "string" == typeof a
	}
	function v(a) {
		return "number" == typeof a
	}
	function w(a) {
		return "[object Date]" === wd.call(a)
	}
	function x(a) {
		return "function" == typeof a
	}
	function y(a) {
		return "[object RegExp]" === wd.call(a)
	}
	function z(a) {
		return a && a.window === a
	}
	function A(a) {
		return a && a.$evalAsync && a.$watch
	}
	function B(a) {
		return "boolean" == typeof a
	}
	function C(a) {
		return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
	}
	function D(a) {
		var b = {};
		a = a.split(",");
		var c;
		for (c = 0; c < a.length; c++) b[a[c]] = !0;
		return b
	}
	function E(a) {
		return qd(a.nodeName || a[0].nodeName)
	}
	function F(a, b) {
		var c = a.indexOf(b);
		return c >= 0 && a.splice(c, 1), b
	}
	function G(a, b, c, d) {
		if (z(a) || A(a)) throw xd("cpws");
		if (b) {
			if (a === b) throw xd("cpi");
			if (c = c || [], d = d || [], t(a)) {
				var e = c.indexOf(a);
				if (-1 !== e) return d[e];
				c.push(a), d.push(b)
			}
			if (Bd(a)) for (var g = b.length = 0; g < a.length; g++) e = G(a[g], null, c, d), t(a[g]) && (c.push(a[g]), d.push(e)), b.push(e);
			else {
				var h = b.$$hashKey;
				Bd(b) ? b.length = 0 : f(b, function(a, c) {
					delete b[c]
				});
				for (g in a) a.hasOwnProperty(g) && (e = G(a[g], null, c, d), t(a[g]) && (c.push(a[g]), d.push(e)), b[g] = e);
				k(b, h)
			}
		} else(b = a) && (Bd(a) ? b = G(a, [], c, d) : w(a) ? b = new Date(a.getTime()) : y(a) ? (b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex) : t(a) && (e = Object.create(Object.getPrototypeOf(a)), b = G(a, e, c, d)));
		return b
	}
	function H(a, b) {
		if (Bd(a)) {
			b = b || [];
			for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
		} else if (t(a)) for (c in b = b || {}, a)("$" !== c.charAt(0) || "$" !== c.charAt(1)) && (b[c] = a[c]);
		return b || a
	}
	function I(a, b) {
		if (a === b) return !0;
		if (null === a || null === b) return !1;
		if (a !== a && b !== b) return !0;
		var d, e = typeof a;
		if (e == typeof b && "object" == e) {
			if (!Bd(a)) {
				if (w(a)) return w(b) ? I(a.getTime(), b.getTime()) : !1;
				if (y(a) && y(b)) return a.toString() == b.toString();
				if (A(a) || A(b) || z(a) || z(b) || Bd(b)) return !1;
				e = {};
				for (d in a) if ("$" !== d.charAt(0) && !x(a[d])) {
					if (!I(a[d], b[d])) return !1;
					e[d] = !0
				}
				for (d in b) if (!e.hasOwnProperty(d) && "$" !== d.charAt(0) && b[d] !== c && !x(b[d])) return !1;
				return !0
			}
			if (!Bd(b)) return !1;
			if ((e = a.length) == b.length) {
				for (d = 0; e > d; d++) if (!I(a[d], b[d])) return !1;
				return !0
			}
		}
		return !1
	}
	function J(a, b, c) {
		return a.concat(td.call(b, c))
	}
	function K(a, b) {
		var c = 2 < arguments.length ? td.call(arguments, 2) : [];
		return !x(b) || b instanceof RegExp ? b : c.length ? function() {
			return arguments.length ? b.apply(a, c.concat(td.call(arguments, 0))) : b.apply(a, c)
		} : function() {
			return arguments.length ? b.apply(a, arguments) : b.call(a)
		}
	}
	function L(a, d) {
		var e = d;
		return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : A(d) && (e = "$SCOPE"), e
	}
	function M(a, b) {
		return "undefined" == typeof a ? c : JSON.stringify(a, L, b ? "  " : null)
	}
	function N(a) {
		return u(a) ? JSON.parse(a) : a
	}
	function O(a) {
		a = md(a).clone();
		try {
			a.empty()
		} catch (b) {}
		var c = md("<div>").append(a).html();
		try {
			return a[0].nodeType === Id ? qd(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
				return "<" + qd(b)
			})
		} catch (d) {
			return qd(c)
		}
	}
	function P(a) {
		try {
			return decodeURIComponent(a)
		} catch (b) {}
	}
	function Q(a) {
		var b, c, d = {};
		return f((a || "").split("&"), function(a) {
			a && (b = a.replace(/\+/g, "%20").split("="), c = P(b[0]), s(c) && (a = s(b[1]) ? P(b[1]) : !0, rd.call(d, c) ? Bd(d[c]) ? d[c].push(a) : d[c] = [d[c], a] : d[c] = a))
		}), d
	}
	function R(a) {
		var b = [];
		return f(a, function(a, c) {
			Bd(a) ? f(a, function(a) {
				b.push(T(c, !0) + (!0 === a ? "" : "=" + T(a, !0)))
			}) : b.push(T(c, !0) + (!0 === a ? "" : "=" + T(a, !0)))
		}), b.length ? b.join("&") : ""
	}
	function S(a) {
		return T(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
	}
	function T(a, b) {
		return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+")
	}
	function U(a, b) {
		var c, d, e = Ed.length;
		for (a = md(a), d = 0; e > d; ++d) if (c = Ed[d] + b, u(c = a.attr(c))) return c;
		return null
	}
	function V(a, b) {
		var c, d, e = {};
		f(Ed, function(b) {
			b += "app", !c && a.hasAttribute && a.hasAttribute(b) && (c = a, d = a.getAttribute(b))
		}), f(Ed, function(b) {
			b += "app";
			var e;
			!c && (e = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(b))
		}), c && (e.strictDi = null !== U(c, "strict-di"), b(c, d ? [d] : [], e))
	}
	function W(c, d, e) {
		t(e) || (e = {}), e = l({
			strictDi: !1
		}, e);
		var g = function() {
			if (c = md(c), c.injector()) {
				var a = c[0] === b ? "document" : O(c);
				throw xd("btstrpd", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
			}
			return d = d || [], d.unshift(["$provide", function(a) {
				a.value("$rootElement", c)
			}]), e.debugInfoEnabled && d.push(["$compileProvider", function(a) {
				a.debugInfoEnabled(!0)
			}]), d.unshift("ng"), a = Hb(d, e.strictDi), a.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
				a.$apply(function() {
					b.data("$injector", d), c(b)(a)
				})
			}]), a
		}, h = /^NG_ENABLE_DEBUG_INFO!/,
			i = /^NG_DEFER_BOOTSTRAP!/;
		return a && h.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(h, "")), a && !i.test(a.name) ? g() : (a.name = a.name.replace(i, ""), void(yd.resumeBootstrap = function(a) {
			f(a, function(a) {
				d.push(a)
			}), g()
		}))
	}
	function X() {
		a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload()
	}
	function Y(a) {
		return yd.element(a).injector().get("$$testability")
	}
	function Z(a, b) {
		return b = b || "_", a.replace(Fd, function(a, c) {
			return (c ? b : "") + a.toLowerCase()
		})
	}
	function $() {
		var b;
		Gd || ((nd = a.jQuery) && nd.fn.on ? (md = nd, l(nd.fn, {
			scope: Vd.scope,
			isolateScope: Vd.isolateScope,
			controller: Vd.controller,
			injector: Vd.injector,
			inheritedData: Vd.inheritedData
		}), b = nd.cleanData, nd.cleanData = function(a) {
			var c;
			if (Ad) Ad = !1;
			else for (var d, e = 0; null != (d = a[e]); e++)(c = nd._data(d, "events")) && c.$destroy && nd(d).triggerHandler("$destroy");
			b(a)
		}) : md = kb, yd.element = md, Gd = !0)
	}
	function _(a, b, c) {
		if (!a) throw xd("areq", b || "?", c || "required");
		return a
	}
	function ab(a, b, c) {
		return c && Bd(a) && (a = a[a.length - 1]), _(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
	}
	function bb(a, b) {
		if ("hasOwnProperty" === a) throw xd("badname", b)
	}
	function cb(a, b, c) {
		if (!b) return a;
		b = b.split(".");
		for (var d, e = a, f = b.length, g = 0; f > g; g++) d = b[g], a && (a = (e = a)[d]);
		return !c && x(a) ? K(e, a) : a
	}
	function db(a) {
		var b = a[0];
		a = a[a.length - 1];
		var c = [b];
		do {
			if (b = b.nextSibling, !b) break;
			c.push(b)
		} while (b !== a);
		return md(c)
	}
	function eb() {
		return Object.create(null)
	}
	function fb(a) {
		function b(a, b, c) {
			return a[b] || (a[b] = c())
		}
		var c = d("$injector"),
			e = d("ng");
		return a = b(a, "angular", Object), a.$$minErr = a.$$minErr || d, b(a, "module", function() {
			var a = {};
			return function(d, f, g) {
				if ("hasOwnProperty" === d) throw e("badname", "module");
				return f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
					function a(a, c, d, e) {
						return e || (e = b),
						function() {
							return e[d || "push"]([a, c, arguments]), j
						}
					}
					if (!f) throw c("nomod", d);
					var b = [],
						e = [],
						h = [],
						i = a("$injector", "invoke", "push", e),
						j = {
							_invokeQueue: b,
							_configBlocks: e,
							_runBlocks: h,
							requires: f,
							name: d,
							provider: a("$provide", "provider"),
							factory: a("$provide", "factory"),
							service: a("$provide", "service"),
							value: a("$provide", "value"),
							constant: a("$provide", "constant", "unshift"),
							animation: a("$animateProvider", "register"),
							filter: a("$filterProvider", "register"),
							controller: a("$controllerProvider", "register"),
							directive: a("$compileProvider", "directive"),
							config: i,
							run: function(a) {
								return h.push(a), this
							}
						};
					return g && i(g), j
				})
			}
		})
	}
	function gb(b) {
		l(b, {
			bootstrap: W,
			copy: G,
			extend: l,
			equals: I,
			element: md,
			forEach: f,
			injector: Hb,
			noop: o,
			bind: K,
			toJson: M,
			fromJson: N,
			identity: p,
			isUndefined: r,
			isDefined: s,
			isString: u,
			isFunction: x,
			isObject: t,
			isNumber: v,
			isElement: C,
			isArray: Bd,
			version: Jd,
			isDate: w,
			lowercase: qd,
			uppercase: sd,
			callbacks: {
				counter: 0
			},
			getTestability: Y,
			$$minErr: d,
			$$csp: Dd,
			reloadWithDebugInfo: X
		}), od = fb(a);
		try {
			od("ngLocale")
		} catch (c) {
			od("ngLocale", []).provider("$locale", cc)
		}
		od("ng", ["ngLocale"], ["$provide", function(a) {
			a.provider({
				$$sanitizeUri: Cc
			}), a.provider("$compile", Ob).directive({
				a: Fe,
				input: Xe,
				textarea: Xe,
				form: Je,
				script: Lf,
				select: Of,
				style: Qf,
				option: Pf,
				ngBind: nf,
				ngBindHtml: pf,
				ngBindTemplate: of,
				ngClass: qf,
				ngClassEven: sf,
				ngClassOdd: rf,
				ngCloak: tf,
				ngController: uf,
				ngForm: Ke,
				ngHide: Ff,
				ngIf: xf,
				ngInclude: yf,
				ngInit: Af,
				ngNonBindable: Bf,
				ngPluralize: Cf,
				ngRepeat: Df,
				ngShow: Ef,
				ngStyle: Gf,
				ngSwitch: Hf,
				ngSwitchWhen: If,
				ngSwitchDefault: Jf,
				ngOptions: Nf,
				ngTransclude: Kf,
				ngModel: cf,
				ngList: jf,
				ngChange: df,
				pattern: ff,
				ngPattern: ff,
				required: ef,
				ngRequired: ef,
				minlength: hf,
				ngMinlength: hf,
				maxlength: gf,
				ngMaxlength: gf,
				ngValue: lf,
				ngModelOptions: mf
			}).directive({
				ngInclude: zf
			}).directive(Ge).directive(vf), a.provider({
				$anchorScroll: Ib,
				$animate: de,
				$browser: Lb,
				$cacheFactory: Mb,
				$controller: Sb,
				$document: Tb,
				$exceptionHandler: Ub,
				$filter: Oc,
				$interpolate: ac,
				$interval: bc,
				$http: Yb,
				$httpBackend: $b,
				$location: oc,
				$log: pc,
				$parse: wc,
				$rootScope: Bc,
				$q: xc,
				$$q: yc,
				$sce: Gc,
				$sceDelegate: Fc,
				$sniffer: Hc,
				$templateCache: Nb,
				$templateRequest: Ic,
				$$testability: Jc,
				$timeout: Kc,
				$window: Nc,
				$$rAF: Ac,
				$$asyncCallback: Jb
			})
		}])
	}
	function hb(a) {
		return a.replace(Md, function(a, b, c, d) {
			return d ? c.toUpperCase() : c
		}).replace(Nd, "Moz$1")
	}
	function ib(a) {
		return a = a.nodeType, a === Hd || !a || 9 === a
	}
	function jb(a, b) {
		var c, d, e = b.createDocumentFragment(),
			g = [];
		if (Rd.test(a)) {
			for (c = c || e.appendChild(b.createElement("div")), d = (Sd.exec(a) || ["", ""])[1].toLowerCase(), d = Ud[d] || Ud._default, c.innerHTML = d[1] + a.replace(Td, "<$1></$2>") + d[2], d = d[0]; d--;) c = c.lastChild;
			g = J(g, c.childNodes), c = e.firstChild, c.textContent = ""
		} else g.push(b.createTextNode(a));
		return e.textContent = "", e.innerHTML = "", f(g, function(a) {
			e.appendChild(a)
		}), e
	}
	function kb(a) {
		if (a instanceof kb) return a;
		var c;
		if (u(a) && (a = Cd(a), c = !0), !(this instanceof kb)) {
			if (c && "<" != a.charAt(0)) throw Pd("nosel");
			return new kb(a)
		}
		if (c) {
			c = b;
			var d;
			a = (d = Qd.exec(a)) ? [c.createElement(d[1])] : (d = jb(a, c)) ? d.childNodes : []
		}
		ub(this, a)
	}
	function lb(a) {
		return a.cloneNode(!0)
	}
	function mb(a, b) {
		if (b || ob(a), a.querySelectorAll) for (var c = a.querySelectorAll("*"), d = 0, e = c.length; e > d; d++) ob(c[d])
	}
	function nb(a, b, c, d) {
		if (s(d)) throw Pd("offargs");
		var e = (d = pb(a)) && d.events,
			g = d && d.handle;
		if (g) if (b) f(b.split(" "), function(b) {
			if (s(c)) {
				var d = e[b];
				if (F(d || [], c), d && 0 < d.length) return
			}
			a.removeEventListener(b, g, !1), delete e[b]
		});
		else for (b in e) "$destroy" !== b && a.removeEventListener(b, g, !1), delete e[b]
	}
	function ob(a, b) {
		var d = a.ng339,
			e = d && Kd[d];
		e && (b ? delete e.data[b] : (e.handle && (e.events.$destroy && e.handle({}, "$destroy"), nb(a)), delete Kd[d], a.ng339 = c))
	}
	function pb(a, b) {
		var d = a.ng339,
			d = d && Kd[d];
		return b && !d && (a.ng339 = d = ++Ld, d = Kd[d] = {
			events: {},
			data: {},
			handle: c
		}), d
	}
	function qb(a, b, c) {
		if (ib(a)) {
			var d = s(c),
				e = !d && b && !t(b),
				f = !b;
			if (a = (a = pb(a, !e)) && a.data, d) a[b] = c;
			else {
				if (f) return a;
				if (e) return a && a[b];
				l(a, b)
			}
		}
	}
	function rb(a, b) {
		return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1
	}
	function sb(a, b) {
		b && a.setAttribute && f(b.split(" "), function(b) {
			a.setAttribute("class", Cd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Cd(b) + " ", " ")))
		})
	}
	function tb(a, b) {
		if (b && a.setAttribute) {
			var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
			f(b.split(" "), function(a) {
				a = Cd(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
			}), a.setAttribute("class", Cd(c))
		}
	}
	function ub(a, b) {
		if (b) if (b.nodeType) a[a.length++] = b;
		else {
			var c = b.length;
			if ("number" == typeof c && b.window !== b) {
				if (c) for (var d = 0; c > d; d++) a[a.length++] = b[d]
			} else a[a.length++] = b
		}
	}
	function vb(a, b) {
		return wb(a, "$" + (b || "ngController") + "Controller")
	}
	function wb(a, b, d) {
		for (9 == a.nodeType && (a = a.documentElement), b = Bd(b) ? b : [b]; a;) {
			for (var e = 0, f = b.length; f > e; e++) if ((d = md.data(a, b[e])) !== c) return d;
			a = a.parentNode || 11 === a.nodeType && a.host
		}
	}
	function xb(a) {
		for (mb(a, !0); a.firstChild;) a.removeChild(a.firstChild)
	}
	function yb(a, b) {
		b || mb(a);
		var c = a.parentNode;
		c && c.removeChild(a)
	}
	function zb(b, c) {
		c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : md(c).on("load", b)
	}
	function Ab(a, b) {
		var c = Wd[b.toLowerCase()];
		return c && Xd[E(a)] && c
	}
	function Bb(a, b) {
		var c = a.nodeName;
		return ("INPUT" === c || "TEXTAREA" === c) && Yd[b]
	}
	function Cb(a, b) {
		var c = function(c, d) {
			c.isDefaultPrevented = function() {
				return c.defaultPrevented
			};
			var e = b[d || c.type],
				f = e ? e.length : 0;
			if (f) {
				if (r(c.immediatePropagationStopped)) {
					var g = c.stopImmediatePropagation;
					c.stopImmediatePropagation = function() {
						c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c)
					}
				}
				c.isImmediatePropagationStopped = function() {
					return !0 === c.immediatePropagationStopped
				}, f > 1 && (e = H(e));
				for (var h = 0; f > h; h++) c.isImmediatePropagationStopped() || e[h].call(a, c)
			}
		};
		return c.elem = a, c
	}
	function Db(a, b) {
		var c = a && a.$$hashKey;
		return c ? ("function" == typeof c && (c = a.$$hashKey()), c) : (c = typeof a, c = "function" == c || "object" == c && null !== a ? a.$$hashKey = c + ":" + (b || j)() : c + ":" + a)
	}
	function Eb(a, b) {
		if (b) {
			var c = 0;
			this.nextUid = function() {
				return ++c
			}
		}
		f(a, this.put, this)
	}
	function Fb(a) {
		return (a = a.toString().replace(ae, "").match(Zd)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
	}
	function Gb(a, b, c) {
		var d;
		if ("function" == typeof a) {
			if (!(d = a.$inject)) {
				if (d = [], a.length) {
					if (b) throw u(c) && c || (c = a.name || Fb(a)), be("strictdi", c);
					b = a.toString().replace(ae, ""), b = b.match(Zd), f(b[1].split($d), function(a) {
						a.replace(_d, function(a, b, c) {
							d.push(c)
						})
					})
				}
				a.$inject = d
			}
		} else Bd(a) ? (b = a.length - 1, ab(a[b], "fn"), d = a.slice(0, b)) : ab(a, "fn", !0);
		return d
	}
	function Hb(a, b) {
		function d(a) {
			return function(b, c) {
				return t(b) ? void f(b, i(a)) : a(b, c)
			}
		}
		function e(a, b) {
			if (bb(a, "service"), (x(b) || Bd(b)) && (b = s.instantiate(b)), !b.$get) throw be("pget", a);
			return p[a + "Provider"] = b
		}
		function g(a, b) {
			return function() {
				var d = w.invoke(b, this, c, a);
				if (r(d)) throw be("undef", a);
				return d
			}
		}
		function h(a, b, c) {
			return e(a, {
				$get: !1 !== c ? g(a, b) : b
			})
		}
		function j(a) {
			var b, c = [];
			return f(a, function(a) {
				function d(a) {
					var b, c;
					for (b = 0, c = a.length; c > b; b++) {
						var d = a[b],
							e = s.get(d[0]);
						e[d[1]].apply(e, d[2])
					}
				}
				if (!n.get(a)) {
					n.put(a, !0);
					try {
						u(a) ? (b = od(a), c = c.concat(j(b.requires)).concat(b._runBlocks), d(b._invokeQueue), d(b._configBlocks)) : x(a) ? c.push(s.invoke(a)) : Bd(a) ? c.push(s.invoke(a)) : ab(a, "module")
					} catch (e) {
						throw Bd(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), be("modulerr", a, e.stack || e.message || e)
					}
				}
			}), c
		}
		function k(a, c) {
			function d(b) {
				if (a.hasOwnProperty(b)) {
					if (a[b] === l) throw be("cdep", b + " <- " + m.join(" <- "));
					return a[b]
				}
				try {
					return m.unshift(b), a[b] = l, a[b] = c(b)
				} catch (d) {
					throw a[b] === l && delete a[b], d
				} finally {
					m.shift()
				}
			}
			function e(a, c, e, f) {
				"string" == typeof e && (f = e, e = null);
				var g = [];
				f = Gb(a, b, f);
				var h, i, j;
				for (i = 0, h = f.length; h > i; i++) {
					if (j = f[i], "string" != typeof j) throw be("itkn", j);
					g.push(e && e.hasOwnProperty(j) ? e[j] : d(j))
				}
				return Bd(a) && (a = a[h]), a.apply(c, g)
			}
			return {
				invoke: e,
				instantiate: function(a, b, c) {
					var d = function() {};
					return d.prototype = (Bd(a) ? a[a.length - 1] : a).prototype, d = new d, a = e(a, d, b, c), t(a) || x(a) ? a : d
				},
				get: d,
				annotate: Gb,
				has: function(b) {
					return p.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b)
				}
			}
		}
		b = !0 === b;
		var l = {}, m = [],
			n = new Eb([], !0),
			p = {
				$provide: {
					provider: d(e),
					factory: d(h),
					service: d(function(a, b) {
						return h(a, ["$injector", function(a) {
							return a.instantiate(b)
						}])
					}),
					value: d(function(a, b) {
						return h(a, q(b), !1)
					}),
					constant: d(function(a, b) {
						bb(a, "constant"), p[a] = b, v[a] = b
					}),
					decorator: function(a, b) {
						var c = s.get(a + "Provider"),
							d = c.$get;
						c.$get = function() {
							var a = w.invoke(d, c);
							return w.invoke(b, null, {
								$delegate: a
							})
						}
					}
				}
			}, s = p.$injector = k(p, function() {
				throw be("unpr", m.join(" <- "))
			}),
			v = {}, w = v.$injector = k(v, function(a) {
				var b = s.get(a + "Provider");
				return w.invoke(b.$get, b, c, a)
			});
		return f(j(a), function(a) {
			w.invoke(a || o)
		}), w
	}
	function Ib() {
		var a = !0;
		this.disableAutoScrolling = function() {
			a = !1
		}, this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
			function e(a) {
				var b = null;
				return Array.prototype.some.call(a, function(a) {
					return "a" === E(a) ? (b = a, !0) : void 0
				}), b
			}
			function f(a) {
				if (a) {
					a.scrollIntoView();
					var c;
					c = g.yOffset, x(c) ? c = c() : C(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : v(c) || (c = 0), c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c))
				} else b.scrollTo(0, 0)
			}
			function g() {
				var a, b = c.hash();
				b ? (a = h.getElementById(b)) ? f(a) : (a = e(h.getElementsByName(b))) ? f(a) : "top" === b && f(null) : f(null)
			}
			var h = b.document;
			return a && d.$watch(function() {
				return c.hash()
			}, function(a, b) {
				a === b && "" === a || zb(function() {
					d.$evalAsync(g)
				})
			}), g
		}]
	}
	function Jb() {
		this.$get = ["$$rAF", "$timeout", function(a, b) {
			return a.supported ? function(b) {
				return a(b)
			} : function(a) {
				return b(a, 0, !1)
			}
		}]
	}
	function Kb(a, b, d, e) {
		function g(a) {
			try {
				a.apply(null, td.call(arguments, 1))
			} finally {
				if (w--, 0 === w) for (; x.length;) try {
					x.pop()()
				} catch (b) {
					d.error(b)
				}
			}
		}
		function h(a, b) {
			! function c() {
				f(z, function(a) {
					a()
				}), y = b(c, a)
			}()
		}
		function i() {
			j(), k()
		}
		function j() {
			A = a.history.state, A = r(A) ? null : A, I(A, H) && (A = H), H = A
		}
		function k() {
			(C !== m.url() || B !== A) && (C = m.url(), B = A, f(F, function(a) {
				a(m.url(), A)
			}))
		}
		function l(a) {
			try {
				return decodeURIComponent(a)
			} catch (b) {
				return a
			}
		}
		var m = this,
			n = b[0],
			p = a.location,
			q = a.history,
			s = a.setTimeout,
			t = a.clearTimeout,
			v = {};
		m.isMock = !1;
		var w = 0,
			x = [];
		m.$$completeOutstandingRequest = g, m.$$incOutstandingRequestCount = function() {
			w++
		}, m.notifyWhenNoOutstandingRequests = function(a) {
			f(z, function(a) {
				a()
			}), 0 === w ? a() : x.push(a)
		};
		var y, z = [];
		m.addPollFn = function(a) {
			return r(y) && h(100, s), z.push(a), a
		};
		var A, B, C = p.href,
			D = b.find("base"),
			E = null;
		j(), B = A, m.url = function(b, c, d) {
			if (r(d) && (d = null), p !== a.location && (p = a.location), q !== a.history && (q = a.history), !b) return E || p.href.replace(/%27/g, "'");
			var f = B === d;
			if (C !== b || e.history && !f) {
				var g = C && hc(C) === hc(b);
				return C = b, B = d, !e.history || g && f ? (g || (E = b), c ? p.replace(b) : p.href = b) : (q[c ? "replaceState" : "pushState"](d, "", b), j(), B = A), m
			}
		}, m.state = function() {
			return A
		};
		var F = [],
			G = !1,
			H = null;
		m.onUrlChange = function(b) {
			return G || (e.history && md(a).on("popstate", i), md(a).on("hashchange", i), G = !0), F.push(b), b
		}, m.$$checkUrlChange = k, m.baseHref = function() {
			var a = D.attr("href");
			return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
		};
		var J = {}, K = "",
			L = m.baseHref();
		m.cookies = function(a, b) {
			var e, f, g, h;
			if (!a) {
				if (n.cookie !== K) for (K = n.cookie, e = K.split("; "), J = {}, g = 0; g < e.length; g++) f = e[g], h = f.indexOf("="), h > 0 && (a = l(f.substring(0, h)), J[a] === c && (J[a] = l(f.substring(h + 1))));
				return J
			}
			b === c ? n.cookie = encodeURIComponent(a) + "=;path=" + L + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (n.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + L).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
		}, m.defer = function(a, b) {
			var c;
			return w++, c = s(function() {
				delete v[c], g(a)
			}, b || 0), v[c] = !0, c
		}, m.defer.cancel = function(a) {
			return v[a] ? (delete v[a], t(a), g(o), !0) : !1
		}
	}
	function Lb() {
		this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
			return new Kb(a, d, b, c)
		}]
	}
	function Mb() {
		this.$get = function() {
			function a(a, c) {
				function e(a) {
					a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
				}
				function f(a, b) {
					a != b && (a && (a.p = b), b && (b.n = a))
				}
				if (a in b) throw d("$cacheFactory")("iid", a);
				var g = 0,
					h = l({}, c, {
						id: a
					}),
					i = {}, j = c && c.capacity || Number.MAX_VALUE,
					k = {}, m = null,
					n = null;
				return b[a] = {
					put: function(a, b) {
						if (j < Number.MAX_VALUE) {
							var c = k[a] || (k[a] = {
								key: a
							});
							e(c)
						}
						return r(b) ? void 0 : (a in i || g++, i[a] = b, g > j && this.remove(n.key), b)
					},
					get: function(a) {
						if (j < Number.MAX_VALUE) {
							var b = k[a];
							if (!b) return;
							e(b)
						}
						return i[a]
					},
					remove: function(a) {
						if (j < Number.MAX_VALUE) {
							var b = k[a];
							if (!b) return;
							b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
						}
						delete i[a], g--
					},
					removeAll: function() {
						i = {}, g = 0, k = {}, m = n = null
					},
					destroy: function() {
						k = h = i = null, delete b[a]
					},
					info: function() {
						return l({}, h, {
							size: g
						})
					}
				}
			}
			var b = {};
			return a.info = function() {
				var a = {};
				return f(b, function(b, c) {
					a[c] = b.info()
				}), a
			}, a.get = function(a) {
				return b[a]
			}, a
		}
	}
	function Nb() {
		this.$get = ["$cacheFactory", function(a) {
			return a("templates")
		}]
	}
	function Ob(a, d) {
		function e(a, b) {
			var c = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
				d = {};
			return f(a, function(a, e) {
				var f = a.match(c);
				if (!f) throw ee("iscp", b, e, a);
				d[e] = {
					attrName: f[3] || e,
					mode: f[1],
					optional: "?" === f[2]
				}
			}), d
		}
		var g = {}, h = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,
			j = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
			k = D("ngSrc,ngSrcset,src,srcset"),
			m = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
			r = /^(on[a-z]+|formaction)$/;
		this.directive = function w(b, c) {
			return bb(b, "directive"), u(b) ? (_(c, "directiveFactory"), g.hasOwnProperty(b) || (g[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function(a, c) {
				var d = [];
				return f(g[b], function(f, g) {
					try {
						var h = a.invoke(f);
						x(h) ? h = {
							compile: q(h)
						} : !h.compile && h.link && (h.compile = q(h.link)), h.priority = h.priority || 0, h.index = g, h.name = h.name || b, h.require = h.require || h.controller && h.name, h.restrict = h.restrict || "EA", t(h.scope) && (h.$$isolateBindings = e(h.scope, h.name)), d.push(h)
					} catch (i) {
						c(i)
					}
				}), d
			}])), g[b].push(c)) : f(b, i(w)), this
		}, this.aHrefSanitizationWhitelist = function(a) {
			return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
		}, this.imgSrcSanitizationWhitelist = function(a) {
			return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
		};
		var v = !0;
		this.debugInfoEnabled = function(a) {
			return s(a) ? (v = a, this) : v
		}, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, e, i, q, s, w, y, z, B, C) {
			function D(a, b) {
				try {
					a.addClass(b)
				} catch (c) {}
			}
			function G(a, b, c, d, e) {
				a instanceof md || (a = md(a)), f(a, function(b, c) {
					b.nodeType == Id && b.nodeValue.match(/\S+/) && (a[c] = md(b).wrap("<span></span>").parent()[0])
				});
				var g = H(a, b, a, c, d, e);
				G.$$addScopeClass(a);
				var h = null;
				return function(b, c, d, e, f) {
					if (_(b, "scope"), h || (h = (f = f && f[0]) && "foreignobject" !== E(f) && f.toString().match(/SVG/) ? "svg" : "html"), f = "html" !== h ? md(W(h, md("<div>").append(a).html())) : c ? Vd.clone.call(a) : a, d) for (var i in d) f.data("$" + i + "Controller", d[i].instance);
					return G.$$addScopeInfo(f, b), c && c(f, b), g && g(b, f, f, e), f
				}
			}
			function H(a, b, d, e, f, g) {
				function h(a, d, e, f) {
					var g, h, i, j, k, l, o;
					if (m) for (o = Array(d.length), j = 0; j < n.length; j += 3) g = n[j], o[g] = d[g];
					else o = d;
					for (j = 0, k = n.length; k > j;) h = o[n[j++]], d = n[j++], g = n[j++], d ? (d.scope ? (i = a.$new(), G.$$addScopeInfo(md(h), i)) : i = a, l = d.transcludeOnThisElement ? J(a, d.transclude, f, d.elementTranscludeOnThisElement) : !d.templateOnThisElement && f ? f : !f && b ? J(a, b) : null, d(g, i, h, e, l)) : g && g(a, h.childNodes, c, f)
				}
				for (var i, j, k, l, m, n = [], o = 0; o < a.length; o++) i = new cb, j = K(a[o], [], i, 0 === o ? e : c, f), (g = j.length ? N(j, a[o], i, b, d, null, [], [], g) : null) && g.scope && G.$$addScopeClass(i.$$element), i = g && g.terminal || !(k = a[o].childNodes) || !k.length ? null : H(k, g ? (g.transcludeOnThisElement || !g.templateOnThisElement) && g.transclude : b), (g || i) && (n.push(o, g, i), l = !0, m = m || g), g = null;
				return l ? h : null
			}
			function J(a, b, c) {
				return function(d, e, f, g, h) {
					return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, f, c, g)
				}
			}
			function K(b, c, d, e, f) {
				var i, k = d.$attr;
				switch (b.nodeType) {
					case Hd:
						Q(c, Pb(E(b)), "E", e, f);
						for (var l, m, n, o = b.attributes, p = 0, q = o && o.length; q > p; p++) {
							var r = !1,
								s = !1;
							l = o[p], i = l.name, l = Cd(l.value), m = Pb(i), (n = hb.test(m)) && (i = Z(m.substr(6), "-"));
							var t, v = m.replace(/(Start|End)$/, "");
							a: {
								var w = v;
								if (g.hasOwnProperty(w)) {
									t = void 0;
									for (var w = a.get(w + "Directive"), x = 0, y = w.length; y > x; x++) if (t = w[x], t.multiElement) {
										t = !0;
										break a
									}
								}
								t = !1
							}
							t && m === v + "Start" && (r = i, s = i.substr(0, i.length - 5) + "end", i = i.substr(0, i.length - 6)),
							m = Pb(i.toLowerCase()),
							k[m] = i,
							(n || !d.hasOwnProperty(m)) && (d[m] = l, Ab(b, m) && (d[m] = !0)),
							Y(b, c, l, m, n),
							Q(c, m, "A", e, f, r, s)
						}
						if (b = b.className, u(b) && "" !== b) for (; i = j.exec(b);) m = Pb(i[2]), Q(c, m, "C", e, f) && (d[m] = Cd(i[3])), b = b.substr(i.index + i[0].length);
						break;
					case Id:
						V(c, b.nodeValue);
						break;
					case 8:
						try {
							(i = h.exec(b.nodeValue)) && (m = Pb(i[1]), Q(c, m, "M", e, f) && (d[m] = Cd(i[2])))
						} catch (z) {}
				}
				return c.sort(T), c
			}
			function L(a, b, c) {
				var d = [],
					e = 0;
				if (b && a.hasAttribute && a.hasAttribute(b)) {
					do {
						if (!a) throw ee("uterdir", b, c);
						a.nodeType == Hd && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
					} while (e > 0)
				} else d.push(a);
				return md(d)
			}
			function M(a, b, c) {
				return function(d, e, f, g, h) {
					return e = L(e[0], b, c), a(d, e, f, g, h)
				}
			}
			function N(a, g, h, i, j, k, l, n, o) {
				function p(a, b, c, d) {
					a && (c && (a = M(a, c, d)), a.require = z.require, a.directiveName = B, (H === z || z.$$isolateScope) && (a = ab(a, {
						isolateScope: !0
					})), l.push(a)), b && (c && (b = M(b, c, d)), b.require = z.require, b.directiveName = B, (H === z || z.$$isolateScope) && (b = ab(b, {
						isolateScope: !0
					})), n.push(b))
				}
				function r(a, b, c, d) {
					var e, g, h = "data",
						i = !1,
						j = c;
					if (u(b)) {
						if (g = b.match(m), b = b.substring(g[0].length), g[3] && (g[1] ? g[3] = null : g[1] = g[3]), "^" === g[1] ? h = "inheritedData" : "^^" === g[1] && (h = "inheritedData", j = c.parent()), "?" === g[2] && (i = !0), e = null, d && "data" === h && (e = d[b]) && (e = e.instance), e = e || j[h]("$" + b + "Controller"), !e && !i) throw ee("ctreq", b, a)
					} else Bd(b) && (e = [], f(b, function(b) {
						e.push(r(a, b, c, d))
					}));
					return e
				}
				function v(a, b, e, i, j) {
					function k(a, b, d) {
						var e;
						return A(a) || (d = b, b = a, a = c), V && (e = u), d || (d = V ? w.parent() : w), j(a, b, e, d, B)
					}
					var m, o, p, t, u, v, w, x;
					if (g === e ? (x = h, w = h.$$element) : (w = md(e), x = new cb(w, h)), H && (t = b.$new(!0)), v = j && k, F && (y = {}, u = {}, f(F, function(a) {
						var c = {
							$scope: a === H || a.$$isolateScope ? t : b,
							$element: w,
							$attrs: x,
							$transclude: v
						};
						p = a.controller, "@" == p && (p = x[a.name]), c = s(p, c, !0, a.controllerAs), u[a.name] = c, V || w.data("$" + a.name + "Controller", c.instance), y[a.name] = c
					})), H) {
						G.$$addScopeInfo(w, t, !0, !(J && (J === H || J === H.$$originalDirective))), G.$$addScopeClass(w, !0), i = y && y[H.name];
						var z = t;
						i && i.identifier && !0 === H.bindToController && (z = i.instance), f(t.$$isolateBindings = H.$$isolateBindings, function(a, c) {
							var e, f, g, h, i = a.attrName,
								j = a.optional;
							switch (a.mode) {
								case "@":
									x.$observe(i, function(a) {
										z[c] = a
									}), x.$$observers[i].$$scope = b, x[i] && (z[c] = d(x[i])(b));
									break;
								case "=":
									if (j && !x[i]) break;
									f = q(x[i]), h = f.literal ? I : function(a, b) {
										return a === b || a !== a && b !== b
									}, g = f.assign || function() {
										throw e = z[c] = f(b), ee("nonassign", x[i], H.name)
									}, e = z[c] = f(b), j = function(a) {
										return h(a, z[c]) || (h(a, e) ? g(b, a = z[c]) : z[c] = a), e = a
									}, j.$stateful = !0, j = b.$watch(q(x[i], j), null, f.literal), t.$on("$destroy", j);
									break;
								case "&":
									f = q(x[i]), z[c] = function(a) {
										return f(b, a)
									}
							}
						})
					}
					for (y && (f(y, function(a) {
						a()
					}), y = null), i = 0, m = l.length; m > i; i++) o = l[i], bb(o, o.isolateScope ? t : b, w, x, o.require && r(o.directiveName, o.require, w, u), v);
					var B = b;
					for (H && (H.template || null === H.templateUrl) && (B = t), a && a(B, e.childNodes, c, j), i = n.length - 1; i >= 0; i--) o = n[i], bb(o, o.isolateScope ? t : b, w, x, o.require && r(o.directiveName, o.require, w, u), v)
				}
				o = o || {};
				for (var w, y, z, B, C, D, E = -Number.MAX_VALUE, F = o.controllerDirectives, H = o.newIsolateScopeDirective, J = o.templateDirective, N = o.nonTlbTranscludeDirective, Q = !1, T = !1, V = o.hasElementTranscludeDirective, X = h.$$element = md(g), Y = i, Z = 0, _ = a.length; _ > Z; Z++) {
					z = a[Z];
					var db = z.$$start,
						eb = z.$$end;
					if (db && (X = L(g, db, eb)), C = c, E > z.priority) break;
					if ((C = z.scope) && (z.templateUrl || (t(C) ? (U("new/isolated scope", H || w, z, X), H = z) : U("new/isolated scope", H, z, X)), w = w || z), B = z.name, !z.templateUrl && z.controller && (C = z.controller, F = F || {}, U("'" + B + "' controller", F[B], z, X), F[B] = z), (C = z.transclude) && (Q = !0, z.$$tlb || (U("transclusion", N, z, X), N = z), "element" == C ? (V = !0, E = z.priority, C = X, X = h.$$element = md(b.createComment(" " + B + ": " + h[B] + " ")), g = X[0], $(j, td.call(C, 0), g), Y = G(C, i, E, k && k.name, {
						nonTlbTranscludeDirective: N
					})) : (C = md(lb(g)).contents(), X.empty(), Y = G(C, i))), z.template) if (T = !0, U("template", J, z, X), J = z, C = x(z.template) ? z.template(X, h) : z.template, C = gb(C), z.replace) {
						if (k = z, C = Rd.test(C) ? Rb(W(z.templateNamespace, Cd(C))) : [], g = C[0], 1 != C.length || g.nodeType !== Hd) throw ee("tplrt", B, "");
						$(j, X, g), _ = {
							$attr: {}
						}, C = K(g, [], _);
						var fb = a.splice(Z + 1, a.length - (Z + 1));
						H && P(C), a = a.concat(C).concat(fb), R(h, _), _ = a.length
					} else X.html(C);
					if (z.templateUrl) T = !0, U("template", J, z, X), J = z, z.replace && (k = z), v = S(a.splice(Z, a.length - Z), X, h, j, Q && Y, l, n, {
						controllerDirectives: F,
						newIsolateScopeDirective: H,
						templateDirective: J,
						nonTlbTranscludeDirective: N
					}), _ = a.length;
					else if (z.compile) try {
						D = z.compile(X, h, Y), x(D) ? p(null, D, db, eb) : D && p(D.pre, D.post, db, eb)
					} catch (hb) {
						e(hb, O(X))
					}
					z.terminal && (v.terminal = !0, E = Math.max(E, z.priority))
				}
				return v.scope = w && !0 === w.scope, v.transcludeOnThisElement = Q, v.elementTranscludeOnThisElement = V, v.templateOnThisElement = T, v.transclude = Y, o.hasElementTranscludeDirective = V, v
			}
			function P(a) {
				for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
					$$isolateScope: !0
				})
			}
			function Q(b, d, f, h, i, j, k) {
				if (d === i) return null;
				if (i = null, g.hasOwnProperty(d)) {
					var l;
					d = a.get(d + "Directive");
					for (var m = 0, o = d.length; o > m; m++) try {
						l = d[m], (h === c || h > l.priority) && -1 != l.restrict.indexOf(f) && (j && (l = n(l, {
							$$start: j,
							$$end: k
						})), b.push(l), i = l)
					} catch (p) {
						e(p)
					}
				}
				return i
			}
			function R(a, b) {
				var c = b.$attr,
					d = a.$attr,
					e = a.$$element;
				f(a, function(d, e) {
					"$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
				}), f(b, function(b, f) {
					"class" == f ? (D(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
				})
			}
			function S(a, b, c, d, e, g, h, j) {
				var k, m, n = [],
					o = b[0],
					p = a.shift(),
					q = l({}, p, {
						templateUrl: null,
						transclude: null,
						replace: null,
						$$originalDirective: p
					}),
					r = x(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl,
					s = p.templateNamespace;
				return b.empty(), i(z.getTrustedResourceUrl(r)).then(function(i) {
					var l, u;
					if (i = gb(i), p.replace) {
						if (i = Rd.test(i) ? Rb(W(s, Cd(i))) : [], l = i[0], 1 != i.length || l.nodeType !== Hd) throw ee("tplrt", p.name, r);
						i = {
							$attr: {}
						}, $(d, b, l);
						var v = K(l, [], i);
						t(p.scope) && P(v), a = v.concat(a), R(c, i)
					} else l = o, b.html(i);
					for (a.unshift(q), k = N(a, l, c, e, b, p, g, h, j), f(d, function(a, c) {
						a == l && (d[c] = b[0])
					}), m = H(b[0].childNodes, e); n.length;) {
						i = n.shift(), u = n.shift();
						var w = n.shift(),
							x = n.shift(),
							v = b[0];
						if (!i.$$destroyed) {
							if (u !== o) {
								var y = u.className;
								j.hasElementTranscludeDirective && p.replace || (v = lb(l)), $(w, md(u), v), D(md(v), y)
							}
							u = k.transcludeOnThisElement ? J(i, k.transclude, x) : x, k(m, i, v, d, u)
						}
					}
					n = null
				}),
				function(a, b, c, d, e) {
					a = e, b.$$destroyed || (n ? (n.push(b), n.push(c), n.push(d), n.push(a)) : (k.transcludeOnThisElement && (a = J(b, k.transclude, e)), k(m, b, c, d, a)))
				}
			}
			function T(a, b) {
				var c = b.priority - a.priority;
				return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
			}
			function U(a, b, c, d) {
				if (b) throw ee("multidir", b.name, c.name, a, O(d))
			}
			function V(a, b) {
				var c = d(b, !0);
				c && a.push({
					priority: 0,
					compile: function(a) {
						a = a.parent();
						var b = !! a.length;
						return b && G.$$addBindingClass(a),
						function(a, d) {
							var e = d.parent();
							b || G.$$addBindingClass(e), G.$$addBindingInfo(e, c.expressions), a.$watch(c, function(a) {
								d[0].nodeValue = a
							})
						}
					}
				})
			}
			function W(a, c) {
				switch (a = qd(a || "html")) {
					case "svg":
					case "math":
						var d = b.createElement("div");
						return d.innerHTML = "<" + a + ">" + c + "</" + a + ">", d.childNodes[0].childNodes;
					default:
						return c
				}
			}
			function X(a, b) {
				if ("srcdoc" == b) return z.HTML;
				var c = E(a);
				return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? z.RESOURCE_URL : void 0
			}
			function Y(a, b, c, e, f) {
				var g = d(c, !0);
				if (g) {
					if ("multiple" === e && "select" === E(a)) throw ee("selmulti", O(a));
					b.push({
						priority: 100,
						compile: function() {
							return {
								pre: function(b, c, h) {
									if (c = h.$$observers || (h.$$observers = {}), r.test(e)) throw ee("nodomevents");
									h[e] && (g = d(h[e], !0, X(a, e), k[e] || f)) && (h[e] = g(b), (c[e] || (c[e] = [])).$$inter = !0, (h.$$observers && h.$$observers[e].$$scope || b).$watch(g, function(a, b) {
										"class" === e && a != b ? h.$updateClass(a, b) : h.$set(e, a)
									}))
								}
							}
						}
					})
				}
			}
			function $(a, c, d) {
				var e, f, g = c[0],
					h = c.length,
					i = g.parentNode;
				if (a) for (e = 0, f = a.length; f > e; e++) if (a[e] == g) {
					a[e++] = d, f = e + h - 1;
					for (var j = a.length; j > e; e++, f++) j > f ? a[e] = a[f] : delete a[e];
					a.length -= h - 1, a.context === g && (a.context = d);
					break
				}
				for (i && i.replaceChild(d, g), a = b.createDocumentFragment(), a.appendChild(g), md(d).data(md(g).data()), nd ? (Ad = !0, nd.cleanData([g])) : delete md.cache[g[md.expando]], g = 1, h = c.length; h > g; g++) i = c[g], md(i).remove(), a.appendChild(i), delete c[g];
				c[0] = d, c.length = 1
			}
			function ab(a, b) {
				return l(function() {
					return a.apply(null, arguments)
				}, a, b)
			}
			function bb(a, b, c, d, f, g) {
				try {
					a(b, c, d, f, g)
				} catch (h) {
					e(h, O(c))
				}
			}
			var cb = function(a, b) {
				if (b) {
					var c, d, e, f = Object.keys(b);
					for (c = 0, d = f.length; d > c; c++) e = f[c], this[e] = b[e]
				} else this.$attr = {};
				this.$$element = a
			};
			cb.prototype = {
				$normalize: Pb,
				$addClass: function(a) {
					a && 0 < a.length && B.addClass(this.$$element, a)
				},
				$removeClass: function(a) {
					a && 0 < a.length && B.removeClass(this.$$element, a)
				},
				$updateClass: function(a, b) {
					var c = Qb(a, b);
					c && c.length && B.addClass(this.$$element, c), (c = Qb(b, a)) && c.length && B.removeClass(this.$$element, c)
				},
				$set: function(a, b, d, g) {
					var h = this.$$element[0],
						i = Ab(h, a),
						j = Bb(h, a),
						h = a;
					if (i ? (this.$$element.prop(a, b), g = i) : j && (this[j] = b, h = j), this[a] = b, g ? this.$attr[a] = g : (g = this.$attr[a]) || (this.$attr[a] = g = Z(a, "-")), i = E(this.$$element), "a" === i && "href" === a || "img" === i && "src" === a) this[a] = b = C(b, "src" === a);
					else if ("img" === i && "srcset" === a) {
						for (var i = "", j = Cd(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(j) ? k : /(,)/, j = j.split(k), k = Math.floor(j.length / 2), l = 0; k > l; l++) var m = 2 * l,
							i = i + C(Cd(j[m]), !0),
							i = i + (" " + Cd(j[m + 1]));
						j = Cd(j[2 * l]).split(/\s/), i += C(Cd(j[0]), !0), 2 === j.length && (i += " " + Cd(j[1])), this[a] = b = i
					}!1 !== d && (null === b || b === c ? this.$$element.removeAttr(g) : this.$$element.attr(g, b)), (a = this.$$observers) && f(a[h], function(a) {
						try {
							a(b)
						} catch (c) {
							e(c)
						}
					})
				},
				$observe: function(a, b) {
					var c = this,
						d = c.$$observers || (c.$$observers = eb()),
						e = d[a] || (d[a] = []);
					return e.push(b), w.$evalAsync(function() {
						e.$$inter || b(c[a])
					}),
					function() {
						F(e, b)
					}
				}
			};
			var db = d.startSymbol(),
				fb = d.endSymbol(),
				gb = "{{" == db || "}}" == fb ? p : function(a) {
					return a.replace(/\{\{/g, db).replace(/}}/g, fb)
				}, hb = /^ngAttr[A-Z]/;
			return G.$$addBindingInfo = v ? function(a, b) {
				var c = a.data("$binding") || [];
				Bd(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c)
			} : o, G.$$addBindingClass = v ? function(a) {
				D(a, "ng-binding")
			} : o, G.$$addScopeInfo = v ? function(a, b, c, d) {
				a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b)
			} : o, G.$$addScopeClass = v ? function(a, b) {
				D(a, b ? "ng-isolate-scope" : "ng-scope")
			} : o, G
		}]
	}
	function Pb(a) {
		return hb(a.replace(fe, ""))
	}
	function Qb(a, b) {
		var c = "",
			d = a.split(/\s+/),
			e = b.split(/\s+/),
			f = 0;
		a: for (; f < d.length; f++) {
			for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
			c += (0 < c.length ? " " : "") + g
		}
		return c
	}
	function Rb(a) {
		a = md(a);
		var b = a.length;
		if (1 >= b) return a;
		for (; b--;) 8 === a[b].nodeType && ud.call(a, b, 1);
		return a
	}
	function Sb() {
		var a = {}, b = !1,
			e = /^(\S+)(\s+as\s+(\w+))?$/;
		this.register = function(b, c) {
			bb(b, "controller"), t(b) ? l(a, b) : a[b] = c
		}, this.allowGlobals = function() {
			b = !0
		}, this.$get = ["$injector", "$window", function(f, g) {
			function h(a, b, c, e) {
				if (!a || !t(a.$scope)) throw d("$controller")("noscp", e, b);
				a.$scope[b] = c
			}
			return function(d, i, j, k) {
				var m, n, o;
				return j = !0 === j, k && u(k) && (o = k), u(d) && (k = d.match(e), n = k[1], o = o || k[3], d = a.hasOwnProperty(n) ? a[n] : cb(i.$scope, n, !0) || (b ? cb(g, n, !0) : c), ab(d, n, !0)), j ? (j = function() {}, j.prototype = (Bd(d) ? d[d.length - 1] : d).prototype, m = new j, o && h(i, o, m, n || d.name), l(function() {
					return f.invoke(d, m, i, n), m
				}, {
					instance: m,
					identifier: o
				})) : (m = f.instantiate(d, i, n), o && h(i, o, m, n || d.name), m)
			}
		}]
	}
	function Tb() {
		this.$get = ["$window", function(a) {
			return md(a.document)
		}]
	}
	function Ub() {
		this.$get = ["$log", function(a) {
			return function() {
				a.error.apply(a, arguments)
			}
		}]
	}
	function Vb(a) {
		var b, c, d, e = {};
		return a ? (f(a.split("\n"), function(a) {
			d = a.indexOf(":"), b = qd(Cd(a.substr(0, d))), c = Cd(a.substr(d + 1)), b && (e[b] = e[b] ? e[b] + ", " + c : c)
		}), e) : e
	}
	function Wb(a) {
		var b = t(a) ? a : c;
		return function(c) {
			return b || (b = Vb(a)), c ? b[qd(c)] || null : b
		}
	}
	function Xb(a, b, c) {
		return x(c) ? c(a, b) : (f(c, function(c) {
			a = c(a, b)
		}), a)
	}
	function Yb() {
		var a = /^\s*(\[|\{[^\{])/,
			b = /[\}\]]\s*$/,
			d = /^\)\]\}',?\n/,
			e = {
				"Content-Type": "application/json;charset=utf-8"
			}, g = this.defaults = {
				transformResponse: [function(c, e) {
					if (u(c)) {
						c = c.replace(d, "");
						var f = e("Content-Type");
						(f && 0 === f.indexOf("application/json") || a.test(c) && b.test(c)) && (c = N(c))
					}
					return c
				}],
				transformRequest: [function(a) {
					return t(a) && "[object File]" !== wd.call(a) && "[object Blob]" !== wd.call(a) ? M(a) : a
				}],
				headers: {
					common: {
						Accept: "application/json, text/plain, */*"
					},
					post: H(e),
					put: H(e),
					patch: H(e)
				},
				xsrfCookieName: "XSRF-TOKEN",
				xsrfHeaderName: "X-XSRF-TOKEN"
			}, i = !1;
		this.useApplyAsync = function(a) {
			return s(a) ? (i = !! a, this) : i
		};
		var j = this.interceptors = [];
		this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, d, e, k, m) {
			function n(a) {
				function b(a) {
					var b = l({}, a);
					return b.data = a.data ? Xb(a.data, a.headers, d.transformResponse) : a.data, a = a.status, a >= 200 && 300 > a ? b : k.reject(b)
				}
				var d = {
					method: "get",
					transformRequest: g.transformRequest,
					transformResponse: g.transformResponse
				}, e = function(a) {
					var b, c, d = g.headers,
						e = l({}, a.headers),
						d = l({}, d.common, d[qd(a.method)]);
					a: for (b in d) {
						a = qd(b);
						for (c in e) if (qd(c) === a) continue a;
						e[b] = d[b]
					}
					return function(a) {
						var b;
						f(a, function(c, d) {
							x(c) && (b = c(), null != b ? a[d] = b : delete a[d])
						})
					}(e),
					e
				}(a);
				l(d, a), d.headers = e, d.method = sd(d.method);
				var h = [function(a) {
					e = a.headers;
					var c = Xb(a.data, Wb(e), a.transformRequest);
					return r(c) && f(e, function(a, b) {
						"content-type" === qd(b) && delete e[b]
					}), r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), o(a, c, e).then(b, b)
				},
				c],
					i = k.when(d);
				for (f(v, function(a) {
					(a.request || a.requestError) && h.unshift(a.request, a.requestError), (a.response || a.responseError) && h.push(a.response, a.responseError)
				}); h.length;) {
					a = h.shift();
					var j = h.shift(),
						i = i.then(a, j)
				}
				return i.success = function(a) {
					return i.then(function(b) {
						a(b.data, b.status, b.headers, d)
					}), i
				}, i.error = function(a) {
					return i.then(null, function(b) {
						a(b.data, b.status, b.headers, d)
					}), i
				}, i
			}
			function o(d, f, h) {
				function j(a, b, c, d) {
					function f() {
						l(b, a, c, d)
					}
					o && (a >= 200 && 300 > a ? o.put(y, [a, b, Vb(c), d]) : o.remove(y)), i ? e.$applyAsync(f) : (f(), e.$$phase || e.$apply())
				}
				function l(a, b, c, e) {
					b = Math.max(b, 0), (b >= 200 && 300 > b ? v.resolve : v.reject)({
						data: a,
						status: b,
						headers: Wb(c),
						config: d,
						statusText: e
					})
				}
				function m() {
					var a = n.pendingRequests.indexOf(d); - 1 !== a && n.pendingRequests.splice(a, 1)
				}
				var o, u, v = k.defer(),
					w = v.promise,
					y = p(d.url, d.params);
				if (n.pendingRequests.push(d), w.then(m, m), !d.cache && !g.cache || !1 === d.cache || "GET" !== d.method && "JSONP" !== d.method || (o = t(d.cache) ? d.cache : t(g.cache) ? g.cache : q), o) if (u = o.get(y), s(u)) {
					if (u && x(u.then)) return u.then(m, m), u;
					Bd(u) ? l(u[1], u[0], H(u[2]), u[3]) : l(u, 200, {}, "OK")
				} else o.put(y, w);
				return r(u) && ((u = Mc(d.url) ? b.cookies()[d.xsrfCookieName || g.xsrfCookieName] : c) && (h[d.xsrfHeaderName || g.xsrfHeaderName] = u), a(d.method, y, f, j, h, d.timeout, d.withCredentials, d.responseType)), w
			}
			function p(a, b) {
				if (!b) return a;
				var c = [];
				return h(b, function(a, b) {
					null === a || r(a) || (Bd(a) || (a = [a]), f(a, function(a) {
						t(a) && (a = w(a) ? a.toISOString() : M(a)), c.push(T(b) + "=" + T(a))
					}))
				}), 0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
			}
			var q = d("$http"),
				v = [];
			return f(j, function(a) {
				v.unshift(u(a) ? m.get(a) : m.invoke(a))
			}), n.pendingRequests = [],
			function() {
				f(arguments, function(a) {
					n[a] = function(b, c) {
						return n(l(c || {}, {
							method: a,
							url: b
						}))
					}
				})
			}("get", "delete", "head", "jsonp"),
			function() {
				f(arguments, function(a) {
					n[a] = function(b, c, d) {
						return n(l(d || {}, {
							method: a,
							url: b,
							data: c
						}))
					}
				})
			}("post", "put", "patch"), n.defaults = g, n
		}]
	}
	function Zb() {
		return new a.XMLHttpRequest
	}
	function $b() {
		this.$get = ["$browser", "$window", "$document", function(a, b, c) {
			return _b(a, Zb, a.defer, b.angular.callbacks, c[0])
		}]
	}
	function _b(a, b, c, d, e) {
		function g(a, b, c) {
			var f = e.createElement("script"),
				g = null;
			return f.type = "text/javascript", f.src = a, f.async = !0, g = function(a) {
				f.removeEventListener("load", g, !1), f.removeEventListener("error", g, !1), e.body.removeChild(f), f = null;
				var h = -1,
					i = "unknown";
				a && ("load" !== a.type || d[b].called || (a = {
					type: "error"
				}), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
			}, f.addEventListener("load", g, !1), f.addEventListener("error", g, !1), e.body.appendChild(f), g
		}
		return function(e, h, i, j, k, l, m, n) {
			function p() {
				t && t(), u && u.abort()
			}
			function q(b, d, e, f, g) {
				w && c.cancel(w), t = u = null, b(d, e, f, g), a.$$completeOutstandingRequest(o)
			}
			if (a.$$incOutstandingRequestCount(), h = h || a.url(), "jsonp" == qd(e)) {
				var r = "_" + (d.counter++).toString(36);
				d[r] = function(a) {
					d[r].data = a, d[r].called = !0
				};
				var t = g(h.replace("JSON_CALLBACK", "angular.callbacks." + r), r, function(a, b) {
					q(j, a, d[r].data, "", b), d[r] = o
				})
			} else {
				var u = b();
				if (u.open(e, h, !0), f(k, function(a, b) {
					s(a) && u.setRequestHeader(b, a)
				}), u.onload = function() {
					var a = u.statusText || "",
						b = "response" in u ? u.response : u.responseText,
						c = 1223 === u.status ? 204 : u.status;
					0 === c && (c = b ? 200 : "file" == Lc(h).protocol ? 404 : 0), q(j, c, b, u.getAllResponseHeaders(), a)
				}, e = function() {
					q(j, -1, null, null, "")
				}, u.onerror = e, u.onabort = e, m && (u.withCredentials = !0), n) try {
					u.responseType = n
				} catch (v) {
					if ("json" !== n) throw v
				}
				u.send(i || null)
			}
			if (l > 0) var w = c(p, l);
			else l && x(l.then) && l.then(p)
		}
	}
	function ac() {
		var a = "{{",
			b = "}}";
		this.startSymbol = function(b) {
			return b ? (a = b, this) : a
		}, this.endSymbol = function(a) {
			return a ? (b = a, this) : b
		}, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
			function f(a) {
				return "\\\\\\" + a
			}
			function g(f, g, m, n) {
				function o(c) {
					return c.replace(j, a).replace(k, b)
				}
				function p(a) {
					try {
						var b, c = m ? e.getTrusted(m, a) : e.valueOf(a);
						if (null == c) b = "";
						else {
							switch (typeof c) {
								case "string":
									break;
								case "number":
									c = "" + c;
									break;
								default:
									c = M(c)
							}
							b = c
						}
						return b
					} catch (g) {
						a = ge("interr", f, g.toString()), d(a)
					}
				}
				n = !! n;
				for (var q, s, t = 0, u = [], v = [], w = f.length, y = [], z = []; w > t;) {
					if (-1 == (q = f.indexOf(a, t)) || -1 == (s = f.indexOf(b, q + h))) {
						t !== w && y.push(o(f.substring(t)));
						break
					}
					t !== q && y.push(o(f.substring(t, q))), t = f.substring(q + h, s), u.push(t), v.push(c(t, p)), t = s + i, z.push(y.length), y.push("")
				}
				if (m && 1 < y.length) throw ge("noconcat", f);
				if (!g || u.length) {
					var A = function(a) {
						for (var b = 0, c = u.length; c > b; b++) {
							if (n && r(a[b])) return;
							y[z[b]] = a[b]
						}
						return y.join("")
					};
					return l(function(a) {
						var b = 0,
							c = u.length,
							e = Array(c);
						try {
							for (; c > b; b++) e[b] = v[b](a);
							return A(e)
						} catch (g) {
							a = ge("interr", f, g.toString()), d(a)
						}
					}, {
						exp: f,
						expressions: u,
						$$watchDelegate: function(a, b, c) {
							var d;
							return a.$watchGroup(v, function(c, e) {
								var f = A(c);
								x(b) && b.call(this, f, c !== e ? d : f, a), d = f
							}, c)
						}
					})
				}
			}
			var h = a.length,
				i = b.length,
				j = new RegExp(a.replace(/./g, f), "g"),
				k = new RegExp(b.replace(/./g, f), "g");
			return g.startSymbol = function() {
				return a
			}, g.endSymbol = function() {
				return b
			}, g
		}]
	}
	function bc() {
		this.$get = ["$rootScope", "$window", "$q", "$$q", function(a, b, c, d) {
			function e(e, g, h, i) {
				var j = b.setInterval,
					k = b.clearInterval,
					l = 0,
					m = s(i) && !i,
					n = (m ? d : c).defer(),
					o = n.promise;
				return h = s(h) ? h : 0, o.then(null, null, e), o.$$intervalId = j(function() {
					n.notify(l++), h > 0 && l >= h && (n.resolve(l), k(o.$$intervalId), delete f[o.$$intervalId]), m || a.$apply()
				}, g), f[o.$$intervalId] = n, o
			}
			var f = {};
			return e.cancel = function(a) {
				return a && a.$$intervalId in f ? (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete f[a.$$intervalId], !0) : !1
			}, e
		}]
	}
	function cc() {
		this.$get = function() {
			return {
				id: "en-us",
				NUMBER_FORMATS: {
					DECIMAL_SEP: ".",
					GROUP_SEP: ",",
					PATTERNS: [{
						minInt: 1,
						minFrac: 0,
						maxFrac: 3,
						posPre: "",
						posSuf: "",
						negPre: "-",
						negSuf: "",
						gSize: 3,
						lgSize: 3
					}, {
						minInt: 1,
						minFrac: 2,
						maxFrac: 2,
						posPre: "¤",
						posSuf: "",
						negPre: "(¤",
						negSuf: ")",
						gSize: 3,
						lgSize: 3
					}],
					CURRENCY_SYM: "$"
				},
				DATETIME_FORMATS: {
					MONTH: "January February March April May June July August September October November December".split(" "),
					SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
					DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
					SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
					AMPMS: ["AM", "PM"],
					medium: "MMM d, y h:mm:ss a",
					"short": "M/d/yy h:mm a",
					fullDate: "EEEE, MMMM d, y",
					longDate: "MMMM d, y",
					mediumDate: "MMM d, y",
					shortDate: "M/d/yy",
					mediumTime: "h:mm:ss a",
					shortTime: "h:mm a"
				},
				pluralCat: function(a) {
					return 1 === a ? "one" : "other"
				}
			}
		}
	}
	function dc(a) {
		a = a.split("/");
		for (var b = a.length; b--;) a[b] = S(a[b]);
		return a.join("/")
	}
	function ec(a, b, c) {
		a = Lc(a, c), b.$$protocol = a.protocol, b.$$host = a.hostname, b.$$port = m(a.port) || ie[a.protocol] || null
	}
	function fc(a, b, c) {
		var d = "/" !== a.charAt(0);
		d && (a = "/" + a), a = Lc(a, c), b.$$path = decodeURIComponent(d && "/" === a.pathname.charAt(0) ? a.pathname.substring(1) : a.pathname), b.$$search = Q(a.search), b.$$hash = decodeURIComponent(a.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
	}
	function gc(a, b) {
		return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
	}
	function hc(a) {
		var b = a.indexOf("#");
		return -1 == b ? a : a.substr(0, b)
	}
	function ic(a) {
		return a.substr(0, hc(a).lastIndexOf("/") + 1)
	}
	function jc(a, b) {
		this.$$html5 = !0, b = b || "";
		var d = ic(a);
		ec(a, this, a), this.$$parse = function(b) {
			var c = gc(d, b);
			if (!u(c)) throw je("ipthprfx", b, d);
			fc(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
		}, this.$$compose = function() {
			var a = R(this.$$search),
				b = this.$$hash ? "#" + S(this.$$hash) : "";
			this.$$url = dc(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
		}, this.$$parseLinkUrl = function(e, f) {
			if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;
			var g, h;
			return (g = gc(a, e)) !== c ? (h = g, h = (g = gc(b, g)) !== c ? d + (gc("/", g) || g) : a + h) : (g = gc(d, e)) !== c ? h = d + g : d == e + "/" && (h = d), h && this.$$parse(h), !! h
		}
	}
	function kc(a, b) {
		var c = ic(a);
		ec(a, this, a), this.$$parse = function(d) {
			var e = gc(a, d) || gc(c, d),
				e = "#" == e.charAt(0) ? gc(b, e) : this.$$html5 ? e : "";
			if (!u(e)) throw je("ihshprfx", d, b);
			fc(e, this, a), d = this.$$path;
			var f = /^\/[A-Z]:(\/.*)/;
			0 === e.indexOf(a) && (e = e.replace(a, "")), f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d), this.$$path = d, this.$$compose()
		}, this.$$compose = function() {
			var c = R(this.$$search),
				d = this.$$hash ? "#" + S(this.$$hash) : "";
			this.$$url = dc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
		}, this.$$parseLinkUrl = function(b) {
			return hc(a) == hc(b) ? (this.$$parse(b), !0) : !1
		}
	}
	function lc(a, b) {
		this.$$html5 = !0, kc.apply(this, arguments);
		var c = ic(a);
		this.$$parseLinkUrl = function(d, e) {
			if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
			var f, g;
			return a == hc(d) ? f = d : (g = gc(c, d)) ? f = a + b + g : c === d + "/" && (f = c), f && this.$$parse(f), !! f
		}, this.$$compose = function() {
			var c = R(this.$$search),
				d = this.$$hash ? "#" + S(this.$$hash) : "";
			this.$$url = dc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + b + this.$$url
		}
	}
	function mc(a) {
		return function() {
			return this[a]
		}
	}
	function nc(a, b) {
		return function(c) {
			return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
		}
	}
	function oc() {
		var b = "",
			c = {
				enabled: !1,
				requireBase: !0,
				rewriteLinks: !0
			};
		this.hashPrefix = function(a) {
			return s(a) ? (b = a, this) : b
		}, this.html5Mode = function(a) {
			return B(a) ? (c.enabled = a, this) : t(a) ? (B(a.enabled) && (c.enabled = a.enabled), B(a.requireBase) && (c.requireBase = a.requireBase), B(a.rewriteLinks) && (c.rewriteLinks = a.rewriteLinks), this) : c
		}, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(d, e, f, g) {
			function h(a, b, c) {
				var d = j.url(),
					f = j.$$state;
				try {
					e.url(a, b, c), j.$$state = e.state()
				} catch (g) {
					throw j.url(d), j.$$state = f, g
				}
			}
			function i(a, b) {
				d.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b)
			}
			var j, k;
			k = e.baseHref();
			var l, m = e.url();
			if (c.enabled) {
				if (!k && c.requireBase) throw je("nobase");
				l = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (k || "/"), k = f.history ? jc : lc
			} else l = hc(m), k = kc;
			j = new k(l, "#" + b), j.$$parseLinkUrl(m, m), j.$$state = e.state();
			var n = /^\s*(javascript|mailto):/i;
			g.on("click", function(b) {
				if (c.rewriteLinks && !b.ctrlKey && !b.metaKey && 2 != b.which) {
					for (var f = md(b.target);
					"a" !== E(f[0]);) if (f[0] === g[0] || !(f = f.parent())[0]) return;
					var h = f.prop("href"),
						i = f.attr("href") || f.attr("xlink:href");
					t(h) && "[object SVGAnimatedString]" === h.toString() && (h = Lc(h.animVal).href), n.test(h) || !h || f.attr("target") || b.isDefaultPrevented() || !j.$$parseLinkUrl(h, i) || (b.preventDefault(), j.absUrl() != e.url() && (d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
				}
			}), j.absUrl() != m && e.url(j.absUrl(), !0);
			var o = !0;
			return e.onUrlChange(function(a, b) {
				d.$evalAsync(function() {
					var c = j.absUrl(),
						e = j.$$state;
					j.$$parse(a), j.$$state = b, d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented ? (j.$$parse(c), j.$$state = e, h(c, !1, e)) : (o = !1, i(c, e))
				}), d.$$phase || d.$digest()
			}), d.$watch(function() {
				var a = e.url(),
					b = e.state(),
					c = j.$$replace,
					g = a !== j.absUrl() || j.$$html5 && f.history && b !== j.$$state;
				(o || g) && (o = !1, d.$evalAsync(function() {
					d.$broadcast("$locationChangeStart", j.absUrl(), a, j.$$state, b).defaultPrevented ? (j.$$parse(a), j.$$state = b) : (g && h(j.absUrl(), c, b === j.$$state ? null : j.$$state), i(a, b))
				})), j.$$replace = !1
			}), j
		}]
	}
	function pc() {
		var a = !0,
			b = this;
		this.debugEnabled = function(b) {
			return s(b) ? (a = b, this) : a
		}, this.$get = ["$window", function(c) {
			function d(a) {
				return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
			}
			function e(a) {
				var b = c.console || {}, e = b[a] || b.log || o;
				a = !1;
				try {
					a = !! e.apply
				} catch (g) {}
				return a ? function() {
					var a = [];
					return f(arguments, function(b) {
						a.push(d(b))
					}), e.apply(b, a)
				} : function(a, b) {
					e(a, null == b ? "" : b)
				}
			}
			return {
				log: e("log"),
				info: e("info"),
				warn: e("warn"),
				error: e("error"),
				debug: function() {
					var c = e("debug");
					return function() {
						a && c.apply(b, arguments)
					}
				}()
			}
		}]
	}
	function qc(a, b) {
		if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw le("isecfld", b);
		return a
	}
	function rc(a, b) {
		if (a) {
			if (a.constructor === a) throw le("isecfn", b);
			if (a.window === a) throw le("isecwindow", b);
			if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw le("isecdom", b);
			if (a === Object) throw le("isecobj", b)
		}
		return a
	}
	function sc(a) {
		return a.constant
	}
	function tc(a, b, c, d) {
		rc(a, d), b = b.split(".");
		for (var e, f = 0; 1 < b.length; f++) {
			e = qc(b.shift(), d);
			var g = rc(a[e], d);
			g || (g = {}, a[e] = g), a = g
		}
		return e = qc(b.shift(), d), rc(a[e], d), a[e] = c
	}
	function uc(a, b, d, e, f, g) {
		return qc(a, g), qc(b, g), qc(d, g), qc(e, g), qc(f, g),
		function(g, h) {
			var i = h && h.hasOwnProperty(a) ? h : g;
			return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
		}
	}
	function vc(a, b, d) {
		var e = ue[a];
		if (e) return e;
		var g = a.split("."),
			h = g.length;
		if (b.csp) e = 6 > h ? uc(g[0], g[1], g[2], g[3], g[4], d) : function(a, b) {
			var e, f = 0;
			do e = uc(g[f++], g[f++], g[f++], g[f++], g[f++], d)(a, b), b = c, a = e;
			while (h > f);
			return e
		};
		else {
			var i = "";
			f(g, function(a, b) {
				qc(a, d), i += "if(s == null) return undefined;\ns=" + (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a + ";\n"
			}), i += "return s;", b = new Function("s", "l", i), b.toString = q(i), e = b
		}
		return e.sharedGetter = !0, e.assign = function(b, c) {
			return tc(b, a, c, a)
		}, ue[a] = e
	}
	function wc() {
		var a = eb(),
			b = {
				csp: !1
			};
		this.$get = ["$filter", "$sniffer", function(c, d) {
			function e(a) {
				var b = a;
				return a.sharedGetter && (b = function(b, c) {
					return a(b, c)
				}, b.literal = a.literal, b.constant = a.constant, b.assign = a.assign), b
			}
			function g(a, b) {
				for (var c = 0, d = a.length; d > c; c++) {
					var e = a[c];
					e.constant || (e.inputs ? g(e.inputs, b) : -1 === b.indexOf(e) && b.push(e))
				}
				return b
			}
			function h(a, b) {
				return null == a || null == b ? a === b : "object" == typeof a && (a = a.valueOf(), "object" == typeof a) ? !1 : a === b || a !== a && b !== b
			}
			function i(a, b, c, d) {
				var e, f = d.$$inputs || (d.$$inputs = g(d.inputs, []));
				if (1 === f.length) {
					var i = h,
						f = f[0];
					return a.$watch(function(a) {
						var b = f(a);
						return h(b, i) || (e = d(a), i = b && b.valueOf()), e
					}, b, c)
				}
				for (var j = [], k = 0, l = f.length; l > k; k++) j[k] = h;
				return a.$watch(function(a) {
					for (var b = !1, c = 0, g = f.length; g > c; c++) {
						var i = f[c](a);
						(b || (b = !h(i, j[c]))) && (j[c] = i && i.valueOf())
					}
					return b && (e = d(a)), e
				}, b, c)
			}
			function j(a, b, c, d) {
				var e, f;
				return e = a.$watch(function(a) {
					return d(a)
				}, function(a, c, d) {
					f = a, x(b) && b.apply(this, arguments), s(a) && d.$$postDigest(function() {
						s(f) && e()
					})
				}, c)
			}
			function k(a, b, c, d) {
				function e(a) {
					var b = !0;
					return f(a, function(a) {
						s(a) || (b = !1)
					}), b
				}
				var g, h;
				return g = a.$watch(function(a) {
					return d(a)
				}, function(a, c, d) {
					h = a, x(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
						e(h) && g()
					})
				}, c)
			}
			function l(a, b, c, d) {
				var e;
				return e = a.$watch(function(a) {
					return d(a)
				}, function() {
					x(b) && b.apply(this, arguments), e()
				}, c)
			}
			function m(a, b) {
				if (!b) return a;
				var c = function(c, d) {
					var e = a(c, d),
						f = b(e, c, d);
					return s(e) ? f : e
				};
				return a.$$watchDelegate && a.$$watchDelegate !== i ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = i, c.inputs = [a]), c
			}
			return b.csp = d.csp,
			function(d, f) {
				var g, h, n;
				switch (typeof d) {
					case "string":
						return n = d = d.trim(), g = a[n], g || (":" === d.charAt(0) && ":" === d.charAt(1) && (h = !0, d = d.substring(2)), g = new se(b), g = new te(g, c, b).parse(d), g.constant ? g.$$watchDelegate = l : h ? (g = e(g), g.$$watchDelegate = g.literal ? k : j) : g.inputs && (g.$$watchDelegate = i), a[n] = g), m(g, f);
					case "function":
						return m(d, f);
					default:
						return m(o, f)
				}
			}
		}]
	}
	function xc() {
		this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
			return zc(function(b) {
				a.$evalAsync(b)
			}, b)
		}]
	}
	function yc() {
		this.$get = ["$browser", "$exceptionHandler", function(a, b) {
			return zc(function(b) {
				a.defer(b)
			}, b)
		}]
	}
	function zc(a, b) {
		function e(a, b, c) {
			function d(b) {
				return function(c) {
					e || (e = !0, b.call(a, c))
				}
			}
			var e = !1;
			return [d(b), d(c)]
		}
		function g() {
			this.$$state = {
				status: 0
			}
		}
		function h(a, b) {
			return function(c) {
				b.call(a, c)
			}
		}
		function i(d) {
			!d.processScheduled && d.pending && (d.processScheduled = !0, a(function() {
				var a, e, f;
				f = d.pending, d.processScheduled = !1, d.pending = c;
				for (var g = 0, h = f.length; h > g; ++g) {
					e = f[g][0], a = f[g][d.status];
					try {
						x(a) ? e.resolve(a(d.value)) : 1 === d.status ? e.resolve(d.value) : e.reject(d.value)
					} catch (i) {
						e.reject(i), b(i)
					}
				}
			}))
		}
		function j() {
			this.promise = new g, this.resolve = h(this, this.resolve), this.reject = h(this, this.reject), this.notify = h(this, this.notify)
		}
		var k = d("$q", TypeError);
		g.prototype = {
			then: function(a, b, c) {
				var d = new j;
				return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([d, a, b, c]), 0 < this.$$state.status && i(this.$$state), d.promise
			},
			"catch": function(a) {
				return this.then(null, a)
			},
			"finally": function(a, b) {
				return this.then(function(b) {
					return m(b, !0, a)
				}, function(b) {
					return m(b, !1, a)
				}, b)
			}
		}, j.prototype = {
			resolve: function(a) {
				this.promise.$$state.status || (a === this.promise ? this.$$reject(k("qcycle", a)) : this.$$resolve(a))
			},
			$$resolve: function(a) {
				var c, d;
				d = e(this, this.$$resolve, this.$$reject);
				try {
					(t(a) || x(a)) && (c = a && a.then), x(c) ? (this.promise.$$state.status = -1, c.call(a, d[0], d[1], this.notify)) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, i(this.promise.$$state))
				} catch (f) {
					d[1](f), b(f)
				}
			},
			reject: function(a) {
				this.promise.$$state.status || this.$$reject(a)
			},
			$$reject: function(a) {
				this.promise.$$state.value = a, this.promise.$$state.status = 2, i(this.promise.$$state)
			},
			notify: function(c) {
				var d = this.promise.$$state.pending;
				0 >= this.promise.$$state.status && d && d.length && a(function() {
					for (var a, e, f = 0, g = d.length; g > f; f++) {
						e = d[f][0], a = d[f][3];
						try {
							e.notify(x(a) ? a(c) : c)
						} catch (h) {
							b(h)
						}
					}
				})
			}
		};
		var l = function(a, b) {
			var c = new j;
			return b ? c.resolve(a) : c.reject(a), c.promise
		}, m = function(a, b, c) {
			var d = null;
			try {
				x(c) && (d = c())
			} catch (e) {
				return l(e, !1)
			}
			return d && x(d.then) ? d.then(function() {
				return l(a, b)
			}, function(a) {
				return l(a, !1)
			}) : l(a, b)
		}, n = function(a, b, c, d) {
			var e = new j;
			return e.resolve(a), e.promise.then(b, c, d)
		}, o = function p(a) {
			if (!x(a)) throw k("norslvr", a);
			if (!(this instanceof p)) return new p(a);
			var b = new j;
			return a(function(a) {
				b.resolve(a)
			}, function(a) {
				b.reject(a)
			}), b.promise
		};
		return o.defer = function() {
			return new j
		}, o.reject = function(a) {
			var b = new j;
			return b.reject(a), b.promise
		}, o.when = n, o.all = function(a) {
			var b = new j,
				c = 0,
				d = Bd(a) ? [] : {};
			return f(a, function(a, e) {
				c++, n(a).then(function(a) {
					d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
				}, function(a) {
					d.hasOwnProperty(e) || b.reject(a)
				})
			}), 0 === c && b.resolve(d), b.promise
		}, o
	}
	function Ac() {
		this.$get = ["$window", "$timeout", function(a, b) {
			var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame,
				d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
				e = !! c,
				f = e ? function(a) {
					var b = c(a);
					return function() {
						d(b)
					}
				} : function(a) {
					var c = b(a, 16.66, !1);
					return function() {
						b.cancel(c)
					}
				};
			return f.supported = e, f
		}]
	}
	function Bc() {
		var a = 10,
			b = d("$rootScope"),
			c = null,
			g = null;
		this.digestTtl = function(b) {
			return arguments.length && (a = b), a
		}, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, h, i, j) {
			function k() {
				this.$id = ++zd, this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = null
			}
			function l(a) {
				if (r.$$phase) throw b("inprog", r.$$phase);
				r.$$phase = a
			}
			function m(a, b, c) {
				do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
				while (a = a.$parent)
			}
			function n() {}
			function p() {
				for (; v.length;) try {
					v.shift()()
				} catch (a) {
					h(a)
				}
				g = null
			}
			function q() {
				null === g && (g = j.defer(function() {
					r.$apply(p)
				}))
			}
			k.prototype = {
				constructor: k,
				$new: function(a, b) {
					function c() {
						d.$$destroyed = !0
					}
					var d;
					return b = b || this, a ? (d = new k, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
						this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = ++zd, this.$$ChildScope = null
					}, this.$$ChildScope.prototype = this), d = new this.$$ChildScope), d.$parent = b, d.$$prevSibling = b.$$childTail, b.$$childHead ? (b.$$childTail.$$nextSibling = d, b.$$childTail = d) : b.$$childHead = b.$$childTail = d, (a || b != this) && d.$on("$destroy", c), d
				},
				$watch: function(a, b, d) {
					var e = i(a);
					if (e.$$watchDelegate) return e.$$watchDelegate(this, b, d, e);
					var f = this.$$watchers,
						g = {
							fn: b,
							last: n,
							get: e,
							exp: a,
							eq: !! d
						};
					return c = null, x(b) || (g.fn = o), f || (f = this.$$watchers = []), f.unshift(g),
					function() {
						F(f, g), c = null
					}
				},
				$watchGroup: function(a, b) {
					function c() {
						i = !1, j ? (j = !1, b(e, e, h)) : b(e, d, h)
					}
					var d = Array(a.length),
						e = Array(a.length),
						g = [],
						h = this,
						i = !1,
						j = !0;
					if (!a.length) {
						var k = !0;
						return h.$evalAsync(function() {
							k && b(e, e, h)
						}),
						function() {
							k = !1
						}
					}
					return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
						e[0] = a, d[0] = c, b(e, a === c ? e : d, f)
					}) : (f(a, function(a, b) {
						var f = h.$watch(a, function(a, f) {
							e[b] = a, d[b] = f, i || (i = !0, h.$evalAsync(c))
						});
						g.push(f)
					}), function() {
						for (; g.length;) g.shift()()
					})
				},
				$watchCollection: function(a, b) {
					function c(a) {
						d = a;
						var b, c, g, h;
						if (t(d)) if (e(d)) for (f !== m && (f = m, p = f.length = 0, k++), a = d.length, p !== a && (k++, f.length = p = a), b = 0; a > b; b++) h = f[b], g = d[b], c = h !== h && g !== g, c || h === g || (k++, f[b] = g);
						else {
							f !== n && (f = n = {}, p = 0, k++), a = 0;
							for (b in d) d.hasOwnProperty(b) && (a++, g = d[b], h = f[b], b in f ? (c = h !== h && g !== g, c || h === g || (k++, f[b] = g)) : (p++, f[b] = g, k++));
							if (p > a) for (b in k++, f) d.hasOwnProperty(b) || (p--, delete f[b])
						} else f !== d && (f = d, k++);
						return k
					}
					c.$stateful = !0;
					var d, f, g, h = this,
						j = 1 < b.length,
						k = 0,
						l = i(a, c),
						m = [],
						n = {}, o = !0,
						p = 0;
					return this.$watch(l, function() {
						if (o ? (o = !1, b(d, d, h)) : b(d, g, h), j) if (t(d)) if (e(d)) {
							g = Array(d.length);
							for (var a = 0; a < d.length; a++) g[a] = d[a]
						} else for (a in g = {}, d) rd.call(d, a) && (g[a] = d[a]);
						else g = d
					})
				},
				$digest: function() {
					var d, e, f, i, k, m, o, q, t, v, w = a,
						y = [];
					l("$digest"), j.$$checkUrlChange(), this === r && null !== g && (j.defer.cancel(g), p()), c = null;
					do {
						for (m = !1, o = this; s.length;) {
							try {
								v = s.shift(), v.scope.$eval(v.expression)
							} catch (z) {
								h(z)
							}
							c = null
						}
						a: do {
							if (i = o.$$watchers) for (k = i.length; k--;) try {
								if (d = i[k]) if ((e = d.get(o)) === (f = d.last) || (d.eq ? I(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
									if (d === c) {
										m = !1;
										break a
									}
								} else m = !0, c = d, d.last = d.eq ? G(e, null) : e, d.fn(e, f === n ? e : f, o), 5 > w && (q = 4 - w, y[q] || (y[q] = []), t = x(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, t += "; newVal: " + M(e) + "; oldVal: " + M(f), y[q].push(t))
							} catch (A) {
								h(A)
							}
							if (!(i = o.$$childHead || o !== this && o.$$nextSibling)) for (; o !== this && !(i = o.$$nextSibling);) o = o.$parent
						} while (o = i);
						if ((m || s.length) && !w--) throw r.$$phase = null, b("infdig", a, M(y))
					} while (m || s.length);
					for (r.$$phase = null; u.length;) try {
						u.shift()()
					} catch (B) {
						h(B)
					}
				},
				$destroy: function() {
					if (!this.$$destroyed) {
						var a = this.$parent;
						if (this.$broadcast("$destroy"), this.$$destroyed = !0, this !== r) {
							for (var b in this.$$listenerCount) m(this, this.$$listenerCount[b], b);
							a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = o, this.$on = this.$watch = this.$watchGroup = function() {
								return o
							}, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
						}
					}
				},
				$eval: function(a, b) {
					return i(a)(this, b)
				},
				$evalAsync: function(a) {
					r.$$phase || s.length || j.defer(function() {
						s.length && r.$digest()
					}), s.push({
						scope: this,
						expression: a
					})
				},
				$$postDigest: function(a) {
					u.push(a)
				},
				$apply: function(a) {
					try {
						return l("$apply"), this.$eval(a)
					} catch (b) {
						h(b)
					} finally {
						r.$$phase = null;
						try {
							r.$digest()
						} catch (c) {
							throw h(c), c
						}
					}
				},
				$applyAsync: function(a) {
					function b() {
						c.$eval(a)
					}
					var c = this;
					a && v.push(b), q()
				},
				$on: function(a, b) {
					var c = this.$$listeners[a];
					c || (this.$$listeners[a] = c = []), c.push(b);
					var d = this;
					do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
					while (d = d.$parent);
					var e = this;
					return function() {
						c[c.indexOf(b)] = null, m(e, 1, a)
					}
				},
				$emit: function(a) {
					var b, c, d, e = [],
						f = this,
						g = !1,
						i = {
							name: a,
							targetScope: f,
							stopPropagation: function() {
								g = !0
							},
							preventDefault: function() {
								i.defaultPrevented = !0
							},
							defaultPrevented: !1
						}, j = J([i], arguments, 1);
					do {
						for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++) if (b[c]) try {
							b[c].apply(null, j)
						} catch (k) {
							h(k)
						} else b.splice(c, 1), c--, d--;
						if (g) return i.currentScope = null, i;
						f = f.$parent
					} while (f);
					return i.currentScope = null, i
				},
				$broadcast: function(a) {
					var b = this,
						c = this,
						d = {
							name: a,
							targetScope: this,
							preventDefault: function() {
								d.defaultPrevented = !0
							},
							defaultPrevented: !1
						};
					if (!this.$$listenerCount[a]) return d;
					for (var e, f, g = J([d], arguments, 1); b = c;) {
						for (d.currentScope = b, c = b.$$listeners[a] || [], e = 0, f = c.length; f > e; e++) if (c[e]) try {
							c[e].apply(null, g)
						} catch (i) {
							h(i)
						} else c.splice(e, 1), e--, f--;
						if (!(c = b.$$listenerCount[a] && b.$$childHead || b !== this && b.$$nextSibling)) for (; b !== this && !(c = b.$$nextSibling);) b = b.$parent
					}
					return d.currentScope = null, d
				}
			};
			var r = new k,
				s = r.$$asyncQueue = [],
				u = r.$$postDigestQueue = [],
				v = r.$$applyAsyncQueue = [];
			return r
		}]
	}
	function Cc() {
		var a = /^\s*(https?|ftp|mailto|tel|file):/,
			b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
		this.aHrefSanitizationWhitelist = function(b) {
			return s(b) ? (a = b, this) : a
		}, this.imgSrcSanitizationWhitelist = function(a) {
			return s(a) ? (b = a, this) : b
		}, this.$get = function() {
			return function(c, d) {
				var e, f = d ? b : a;
				return e = Lc(c).href, "" === e || e.match(f) ? c : "unsafe:" + e
			}
		}
	}
	function Dc(a) {
		if ("self" === a) return a;
		if (u(a)) {
			if (-1 < a.indexOf("***")) throw ve("iwcard", a);
			return a = a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
		}
		if (y(a)) return new RegExp("^" + a.source + "$");
		throw ve("imatcher")
	}
	function Ec(a) {
		var b = [];
		return s(a) && f(a, function(a) {
			b.push(Dc(a))
		}), b
	}
	function Fc() {
		this.SCE_CONTEXTS = we;
		var a = ["self"],
			b = [];
		this.resourceUrlWhitelist = function(b) {
			return arguments.length && (a = Ec(b)), a
		}, this.resourceUrlBlacklist = function(a) {
			return arguments.length && (b = Ec(a)), b
		}, this.$get = ["$injector", function(d) {
			function e(a, b) {
				return "self" === a ? Mc(b) : !! a.exec(b.href)
			}
			function f(a) {
				var b = function(a) {
					this.$$unwrapTrustedValue = function() {
						return a
					}
				};
				return a && (b.prototype = new a), b.prototype.valueOf = function() {
					return this.$$unwrapTrustedValue()
				}, b.prototype.toString = function() {
					return this.$$unwrapTrustedValue().toString()
				}, b
			}
			var g = function() {
				throw ve("unsafe")
			};
			d.has("$sanitize") && (g = d.get("$sanitize"));
			var h = f(),
				i = {};
			return i[we.HTML] = f(h), i[we.CSS] = f(h), i[we.URL] = f(h), i[we.JS] = f(h), i[we.RESOURCE_URL] = f(i[we.URL]), {
				trustAs: function(a, b) {
					var d = i.hasOwnProperty(a) ? i[a] : null;
					if (!d) throw ve("icontext", a, b);
					if (null === b || b === c || "" === b) return b;
					if ("string" != typeof b) throw ve("itype", a);
					return new d(b)
				},
				getTrusted: function(d, f) {
					if (null === f || f === c || "" === f) return f;
					var h = i.hasOwnProperty(d) ? i[d] : null;
					if (h && f instanceof h) return f.$$unwrapTrustedValue();
					if (d === we.RESOURCE_URL) {
						var j, k, h = Lc(f.toString()),
							l = !1;
						for (j = 0, k = a.length; k > j; j++) if (e(a[j], h)) {
							l = !0;
							break
						}
						if (l) for (j = 0, k = b.length; k > j; j++) if (e(b[j], h)) {
							l = !1;
							break
						}
						if (l) return f;
						throw ve("insecurl", f.toString())
					}
					if (d === we.HTML) return g(f);
					throw ve("unsafe")
				},
				valueOf: function(a) {
					return a instanceof h ? a.$$unwrapTrustedValue() : a
				}
			}
		}]
	}
	function Gc() {
		var a = !0;
		this.enabled = function(b) {
			return arguments.length && (a = !! b), a
		}, this.$get = ["$document", "$parse", "$sceDelegate", function(b, c, d) {
			if (a && 8 > b[0].documentMode) throw ve("iequirks");
			var e = H(we);
			e.isEnabled = function() {
				return a
			}, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function(a, b) {
				return b
			}, e.valueOf = p), e.parseAs = function(a, b) {
				var d = c(b);
				return d.literal && d.constant ? d : c(b, function(b) {
					return e.getTrusted(a, b)
				})
			};
			var g = e.parseAs,
				h = e.getTrusted,
				i = e.trustAs;
			return f(we, function(a, b) {
				var c = qd(b);
				e[hb("parse_as_" + c)] = function(b) {
					return g(a, b)
				}, e[hb("get_trusted_" + c)] = function(b) {
					return h(a, b)
				}, e[hb("trust_as_" + c)] = function(b) {
					return i(a, b)
				}
			}), e
		}]
	}
	function Hc() {
		this.$get = ["$window", "$document", function(a, b) {
			var c, d = {}, e = m((/android (\d+)/.exec(qd((a.navigator || {}).userAgent)) || [])[1]),
				f = /Boxee/i.test((a.navigator || {}).userAgent),
				g = b[0] || {}, h = /^(Moz|webkit|O|ms)(?=[A-Z])/,
				i = g.body && g.body.style,
				j = !1,
				k = !1;
			if (i) {
				for (var l in i) if (j = h.exec(l)) {
					c = j[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
					break
				}
				c || (c = "WebkitOpacity" in i && "webkit"), j = !! ("transition" in i || c + "Transition" in i), k = !! ("animation" in i || c + "Animation" in i), !e || j && k || (j = u(g.body.style.webkitTransition), k = u(g.body.style.webkitAnimation))
			}
			return {
				history: !(!a.history || !a.history.pushState || 4 > e || f),
				hasEvent: function(a) {
					if ("input" == a && 9 == ld) return !1;
					if (r(d[a])) {
						var b = g.createElement("div");
						d[a] = "on" + a in b
					}
					return d[a]
				},
				csp: Dd(),
				vendorPrefix: c,
				transitions: j,
				animations: k,
				android: e
			}
		}]
	}
	function Ic() {
		this.$get = ["$templateCache", "$http", "$q", function(a, b, c) {
			function d(e, f) {
				function g() {
					if (h.totalPendingRequests--, !f) throw ee("tpload", e);
					return c.reject()
				}
				var h = d;
				return h.totalPendingRequests++, b.get(e, {
					cache: a
				}).then(function(b) {
					return b = b.data, b && 0 !== b.length ? (h.totalPendingRequests--, a.put(e, b), b) : g()
				}, g)
			}
			return d.totalPendingRequests = 0, d
		}]
	}
	function Jc() {
		this.$get = ["$rootScope", "$browser", "$location", function(a, b, c) {
			return {
				findBindings: function(a, b, c) {
					a = a.getElementsByClassName("ng-binding");
					var d = [];
					return f(a, function(a) {
						var e = yd.element(a).data("$binding");
						e && f(e, function(e) {
							c ? new RegExp("(^|\\s)" + b + "(\\s|\\||$)").test(e) && d.push(a) : -1 != e.indexOf(b) && d.push(a)
						})
					}), d
				},
				findModels: function(a, b, c) {
					for (var d = ["ng-", "data-ng-", "ng\\:"], e = 0; e < d.length; ++e) {
						var f = a.querySelectorAll("[" + d[e] + "model" + (c ? "=" : "*=") + '"' + b + '"]');
						if (f.length) return f
					}
				},
				getLocation: function() {
					return c.url()
				},
				setLocation: function(b) {
					b !== c.url() && (c.url(b), a.$digest())
				},
				whenStable: function(a) {
					b.notifyWhenNoOutstandingRequests(a)
				}
			}
		}]
	}
	function Kc() {
		this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, c, d, e) {
			function f(f, h, i) {
				var j = s(i) && !i,
					k = (j ? d : c).defer(),
					l = k.promise;
				return h = b.defer(function() {
					try {
						k.resolve(f())
					} catch (b) {
						k.reject(b), e(b)
					} finally {
						delete g[l.$$timeoutId]
					}
					j || a.$apply()
				}, h), l.$$timeoutId = h, g[h] = k, l
			}
			var g = {};
			return f.cancel = function(a) {
				return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
			}, f
		}]
	}
	function Lc(a) {
		var b = a;
		return ld && (xe.setAttribute("href", b), b = xe.href), xe.setAttribute("href", b), {
			href: xe.href,
			protocol: xe.protocol ? xe.protocol.replace(/:$/, "") : "",
			host: xe.host,
			search: xe.search ? xe.search.replace(/^\?/, "") : "",
			hash: xe.hash ? xe.hash.replace(/^#/, "") : "",
			hostname: xe.hostname,
			port: xe.port,
			pathname: "/" === xe.pathname.charAt(0) ? xe.pathname : "/" + xe.pathname
		}
	}
	function Mc(a) {
		return a = u(a) ? Lc(a) : a, a.protocol === ye.protocol && a.host === ye.host
	}
	function Nc() {
		this.$get = q(a)
	}
	function Oc(a) {
		function b(c, d) {
			if (t(c)) {
				var e = {};
				return f(c, function(a, c) {
					e[c] = b(c, a)
				}), e
			}
			return a.factory(c + "Filter", d)
		}
		this.register = b, this.$get = ["$injector", function(a) {
			return function(b) {
				return a.get(b + "Filter")
			}
		}], b("currency", Qc), b("date", Yc), b("filter", Pc), b("json", Zc), b("limitTo", $c), b("lowercase", De), b("number", Rc), b("orderBy", _c), b("uppercase", Ee)
	}
	function Pc() {
		return function(a, b, c) {
			if (!Bd(a)) return a;
			var d = typeof c,
				e = [];
			e.check = function(a, b) {
				for (var c = 0; c < e.length; c++) if (!e[c](a, b)) return !1;
				return !0
			}, "function" !== d && (c = "boolean" === d && c ? function(a, b) {
				return yd.equals(a, b)
			} : function(a, b) {
				if (a && b && "object" == typeof a && "object" == typeof b) {
					for (var d in a) if ("$" !== d.charAt(0) && rd.call(a, d) && c(a[d], b[d])) return !0;
					return !1
				}
				return b = ("" + b).toLowerCase(), -1 < ("" + a).toLowerCase().indexOf(b)
			});
			var f = function(a, b) {
				if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
				switch (typeof a) {
					case "boolean":
					case "number":
					case "string":
						return c(a, b);
					case "object":
						switch (typeof b) {
							case "object":
								return c(a, b);
							default:
								for (var d in a) if ("$" !== d.charAt(0) && f(a[d], b)) return !0
						}
						return !1;
					case "array":
						for (d = 0; d < a.length; d++) if (f(a[d], b)) return !0;
						return !1;
					default:
						return !1
				}
			};
			switch (typeof b) {
				case "boolean":
				case "number":
				case "string":
					b = {
						$: b
					};
				case "object":
					for (var g in b)(function(a) {
						"undefined" != typeof b[a] && e.push(function(c) {
							return f("$" == a ? c : c && c[a], b[a])
						})
					})(g);
					break;
				case "function":
					e.push(b);
					break;
				default:
					return a
			}
			for (d = [], g = 0; g < a.length; g++) {
				var h = a[g];
				e.check(h, g) && d.push(h)
			}
			return d
		}
	}
	function Qc(a) {
		var b = a.NUMBER_FORMATS;
		return function(a, c, d) {
			return r(c) && (c = b.CURRENCY_SYM), r(d) && (d = 2), null == a ? a : Sc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c)
		}
	}
	function Rc(a) {
		var b = a.NUMBER_FORMATS;
		return function(a, c) {
			return null == a ? a : Sc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
		}
	}
	function Sc(a, b, c, d, e) {
		if (!isFinite(a) || t(a)) return "";
		var f = 0 > a;
		a = Math.abs(a);
		var g = a + "",
			h = "",
			i = [],
			j = !1;
		if (-1 !== g.indexOf("e")) {
			var k = g.match(/([\d\.]+)e(-?)(\d+)/);
			k && "-" == k[2] && k[3] > e + 1 ? (g = "0", a = 0) : (h = g, j = !0)
		}
		if (j) e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));
		else {
			g = (g.split(ze)[1] || "").length, r(e) && (e = Math.min(Math.max(b.minFrac, g), b.maxFrac)), a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e), 0 === a && (f = !1), a = ("" + a).split(ze), g = a[0], a = a[1] || "";
			var k = 0,
				l = b.lgSize,
				m = b.gSize;
			if (g.length >= l + m) for (k = g.length - l, j = 0; k > j; j++) 0 === (k - j) % m && 0 !== j && (h += c), h += g.charAt(j);
			for (j = k; j < g.length; j++) 0 === (g.length - j) % l && 0 !== j && (h += c), h += g.charAt(j);
			for (; a.length < e;) a += "0";
			e && "0" !== e && (h += d + a.substr(0, e))
		}
		return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
	}
	function Tc(a, b, c) {
		var d = "";
		for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
		return c && (a = a.substr(a.length - b)), d + a
	}
	function Uc(a, b, c, d) {
		return c = c || 0,
		function(e) {
			return e = e["get" + a](), (c > 0 || e > -c) && (e += c), 0 === e && -12 == c && (e = 12), Tc(e, b, d)
		}
	}
	function Vc(a, b) {
		return function(c, d) {
			var e = c["get" + a](),
				f = sd(b ? "SHORT" + a : a);
			return d[f][e]
		}
	}
	function Wc(a) {
		var b = new Date(a, 0, 1).getDay();
		return new Date(a, 0, (4 >= b ? 5 : 12) - b)
	}
	function Xc(a) {
		return function(b) {
			var c = Wc(b.getFullYear());
			return b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +c, b = 1 + Math.round(b / 6048e5), Tc(b, a)
		}
	}
	function Yc(a) {
		function b(a) {
			var b;
			if (b = a.match(c)) {
				a = new Date(0);
				var d = 0,
					e = 0,
					f = b[8] ? a.setUTCFullYear : a.setFullYear,
					g = b[8] ? a.setUTCHours : a.setHours;
				b[9] && (d = m(b[9] + b[10]), e = m(b[9] + b[11])), f.call(a, m(b[1]), m(b[2]) - 1, m(b[3])), d = m(b[4] || 0) - d, e = m(b[5] || 0) - e, f = m(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), g.call(a, d, e, f, b)
			}
			return a
		}
		var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
		return function(c, d, e) {
			var g, h, i = "",
				j = [];
			if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = Ce.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
			for (; d;)(h = Be.exec(d)) ? (j = J(j, h, 1), d = j.pop()) : (j.push(d), d = null);
			return e && "UTC" === e && (c = new Date(c.getTime()), c.setMinutes(c.getMinutes() + c.getTimezoneOffset())), f(j, function(b) {
				g = Ae[b], i += g ? g(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
			}), i
		}
	}
	function Zc() {
		return function(a) {
			return M(a, !0)
		}
	}
	function $c() {
		return function(a, b) {
			if (v(a) && (a = a.toString()), !Bd(a) && !u(a)) return a;
			if (b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b), u(a)) return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
			var c, d, e = [];
			for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++) e.push(a[c]);
			return e
		}
	}
	function _c(a) {
		return function(b, c, d) {
			function f(a, b) {
				return b ? function(b, c) {
					return a(c, b)
				} : a
			}
			function g(a, b) {
				var c = typeof a,
					d = typeof b;
				return c == d ? (w(a) && w(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
			}
			if (!e(b)) return b;
			c = Bd(c) ? c : [c], 0 === c.length && (c = ["+"]), c = c.map(function(b) {
				var c = !1,
					d = b || p;
				if (u(b)) {
					if (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), "" === b) return f(function(a, b) {
						return g(a, b)
					}, c);
					if (d = a(b), d.constant) {
						var e = d();
						return f(function(a, b) {
							return g(a[e], b[e])
						}, c)
					}
				}
				return f(function(a, b) {
					return g(d(a), d(b))
				}, c)
			});
			for (var h = [], i = 0; i < b.length; i++) h.push(b[i]);
			return h.sort(f(function(a, b) {
				for (var d = 0; d < c.length; d++) {
					var e = c[d](a, b);
					if (0 !== e) return e
				}
				return 0
			}, d))
		}
	}
	function ad(a) {
		return x(a) && (a = {
			link: a
		}), a.restrict = a.restrict || "AC", q(a)
	}
	function bd(a, b, d, e, g) {
		var h = this,
			i = [],
			j = h.$$parentForm = a.parent().controller("form") || He;
		h.$error = {}, h.$$success = {}, h.$pending = c, h.$name = g(b.name || b.ngForm || "")(d), h.$dirty = !1, h.$pristine = !0, h.$valid = !0, h.$invalid = !1, h.$submitted = !1, j.$addControl(h), h.$rollbackViewValue = function() {
			f(i, function(a) {
				a.$rollbackViewValue()
			})
		}, h.$commitViewValue = function() {
			f(i, function(a) {
				a.$commitViewValue()
			})
		}, h.$addControl = function(a) {
			bb(a.$name, "input"), i.push(a), a.$name && (h[a.$name] = a)
		}, h.$$renameControl = function(a, b) {
			var c = a.$name;
			h[c] === a && delete h[c], h[b] = a, a.$name = b
		}, h.$removeControl = function(a) {
			a.$name && h[a.$name] === a && delete h[a.$name], f(h.$pending, function(b, c) {
				h.$setValidity(c, null, a)
			}), f(h.$error, function(b, c) {
				h.$setValidity(c, null, a)
			}), F(i, a)
		}, id({
			ctrl: this,
			$element: a,
			set: function(a, b, c) {
				var d = a[b];
				d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c]
			},
			unset: function(a, b, c) {
				var d = a[b];
				d && (F(d, c), 0 === d.length && delete a[b])
			},
			parentForm: j,
			$animate: e
		}), h.$setDirty = function() {
			e.removeClass(a, $e), e.addClass(a, _e), h.$dirty = !0, h.$pristine = !1, j.$setDirty()
		}, h.$setPristine = function() {
			e.setClass(a, $e, _e + " ng-submitted"), h.$dirty = !1, h.$pristine = !0, h.$submitted = !1, f(i, function(a) {
				a.$setPristine()
			})
		}, h.$setUntouched = function() {
			f(i, function(a) {
				a.$setUntouched()
			})
		}, h.$setSubmitted = function() {
			e.addClass(a, "ng-submitted"), h.$submitted = !0, j.$setSubmitted()
		}
	}
	function cd(a) {
		a.$formatters.push(function(b) {
			return a.$isEmpty(b) ? b : b.toString()
		})
	}
	function dd(a, b, c, d, e, f) {
		b.prop("validity");
		var g = b[0].placeholder,
			h = {}, i = qd(b[0].type);
		if (!e.android) {
			var j = !1;
			b.on("compositionstart", function() {
				j = !0
			}), b.on("compositionend", function() {
				j = !1, k()
			})
		}
		var k = function(a) {
			if (!j) {
				var e = b.val(),
					f = a && a.type;
				ld && "input" === (a || h).type && b[0].placeholder !== g ? g = b[0].placeholder : ("password" === i || c.ngTrim && "false" === c.ngTrim || (e = Cd(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, f))
			}
		};
		if (e.hasEvent("input")) b.on("input", k);
		else {
			var l, m = function(a) {
				l || (l = f.defer(function() {
					k(a), l = null
				}))
			};
			b.on("keydown", function(a) {
				var b = a.keyCode;
				91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || m(a)
			}), e.hasEvent("paste") && b.on("paste cut", m)
		}
		b.on("change", k), d.$render = function() {
			b.val(d.$isEmpty(d.$modelValue) ? "" : d.$viewValue)
		}
	}
	function ed(a, b) {
		return function(c, d) {
			var e, g;
			if (w(c)) return c;
			if (u(c)) {
				if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), Le.test(c)) return new Date(c);
				if (a.lastIndex = 0, e = a.exec(c)) return e.shift(), g = d ? {
					yyyy: d.getFullYear(),
					MM: d.getMonth() + 1,
					dd: d.getDate(),
					HH: d.getHours(),
					mm: d.getMinutes(),
					ss: d.getSeconds(),
					sss: d.getMilliseconds() / 1e3
				} : {
					yyyy: 1970,
					MM: 1,
					dd: 1,
					HH: 0,
					mm: 0,
					ss: 0,
					sss: 0
				}, f(e, function(a, c) {
					c < b.length && (g[b[c]] = +a)
				}), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0)
			}
			return 0 / 0
		}
	}
	function fd(a, b, d, e) {
		return function(f, g, h, i, j, k, l) {
			function m(a) {
				return s(a) ? w(a) ? a : d(a) : c
			}
			gd(f, g, h, i), dd(f, g, h, i, j, k);
			var n, o = i && i.$options && i.$options.timezone;
			if (i.$$parserName = a, i.$parsers.push(function(a) {
				return i.$isEmpty(a) ? null : b.test(a) ? (a = d(a, n), "UTC" === o && a.setMinutes(a.getMinutes() - a.getTimezoneOffset()), a) : c
			}), i.$formatters.push(function(a) {
				if (!i.$isEmpty(a)) {
					if (!w(a)) throw Ve("datefmt", a);
					if ((n = a) && "UTC" === o) {
						var b = 6e4 * n.getTimezoneOffset();
						n = new Date(n.getTime() + b)
					}
					return l("date")(a, e, o)
				}
				return n = null, ""
			}), s(h.min) || h.ngMin) {
				var p;
				i.$validators.min = function(a) {
					return i.$isEmpty(a) || r(p) || d(a) >= p
				}, h.$observe("min", function(a) {
					p = m(a), i.$validate()
				})
			}
			if (s(h.max) || h.ngMax) {
				var q;
				i.$validators.max = function(a) {
					return i.$isEmpty(a) || r(q) || d(a) <= q
				}, h.$observe("max", function(a) {
					q = m(a), i.$validate()
				})
			}
			i.$isEmpty = function(a) {
				return !a || a.getTime && a.getTime() !== a.getTime()
			}
		}
	}
	function gd(a, b, d, e) {
		(e.$$hasNativeValidators = t(b[0].validity)) && e.$parsers.push(function(a) {
			var d = b.prop("validity") || {};
			return d.badInput && !d.typeMismatch ? c : a
		})
	}
	function hd(a, b, c, e, f) {
		if (s(e)) {
			if (a = a(e), !a.constant) throw d("ngModel")("constexpr", c, e);
			return a(b)
		}
		return f
	}
	function id(a) {
		function b(a, b) {
			b && !g[a] ? (k.addClass(f, a), g[a] = !0) : !b && g[a] && (k.removeClass(f, a), g[a] = !1)
		}
		function d(a, c) {
			a = a ? "-" + Z(a, "-") : "", b(Ye + a, !0 === c), b(Ze + a, !1 === c)
		}
		var e = a.ctrl,
			f = a.$element,
			g = {}, h = a.set,
			i = a.unset,
			j = a.parentForm,
			k = a.$animate;
		g[Ze] = !(g[Ye] = f.hasClass(Ye)), e.$setValidity = function(a, f, g) {
			f === c ? (e.$pending || (e.$pending = {}), h(e.$pending, a, g)) : (e.$pending && i(e.$pending, a, g), jd(e.$pending) && (e.$pending = c)), B(f) ? f ? (i(e.$error, a, g), h(e.$$success, a, g)) : (h(e.$error, a, g), i(e.$$success, a, g)) : (i(e.$error, a, g), i(e.$$success, a, g)), e.$pending ? (b(af, !0), e.$valid = e.$invalid = c, d("", null)) : (b(af, !1), e.$valid = jd(e.$error), e.$invalid = !e.$valid, d("", e.$valid)), f = e.$pending && e.$pending[a] ? c : e.$error[a] ? !1 : e.$$success[a] ? !0 : null, d(a, f), j.$setValidity(a, f, e)
		}
	}
	function jd(a) {
		if (a) for (var b in a) return !1;
		return !0
	}
	function kd(a, b) {
		return a = "ngClass" + a, ["$animate", function(c) {
			function d(a, b) {
				var c = [],
					d = 0;
				a: for (; d < a.length; d++) {
					for (var e = a[d], f = 0; f < b.length; f++) if (e == b[f]) continue a;
					c.push(e)
				}
				return c
			}
			function e(a) {
				if (!Bd(a)) {
					if (u(a)) return a.split(" ");
					if (t(a)) {
						var b = [];
						return f(a, function(a, c) {
							a && (b = b.concat(c.split(" ")))
						}), b
					}
				}
				return a
			}
			return {
				restrict: "AC",
				link: function(g, h, i) {
					function j(a, b) {
						var c = h.data("$classCounts") || {}, d = [];
						return f(a, function(a) {
							(b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
						}), h.data("$classCounts", c), d.join(" ")
					}
					function k(a) {
						if (!0 === b || g.$index % 2 === b) {
							var f = e(a || []);
							if (l) {
								if (!I(a, l)) {
									var k = e(l),
										m = d(f, k),
										f = d(k, f),
										m = j(m, 1),
										f = j(f, -1);
									m && m.length && c.addClass(h, m), f && f.length && c.removeClass(h, f)
								}
							} else {
								var m = j(f, 1);
								i.$addClass(m)
							}
						}
						l = H(a)
					}
					var l;
					g.$watch(i[a], k, !0), i.$observe("class", function() {
						k(g.$eval(i[a]))
					}), "ngClass" !== a && g.$watch("$index", function(c, d) {
						var f = 1 & c;
						if (f !== (1 & d)) {
							var h = e(g.$eval(i[a]));
							f === b ? (f = j(h, 1), i.$addClass(f)) : (f = j(h, -1), i.$removeClass(f))
						}
					})
				}
			}
		}]
	}
	var ld, md, nd, od, pd = /^\/(.+)\/([a-z]*)$/,
		qd = function(a) {
			return u(a) ? a.toLowerCase() : a
		}, rd = Object.prototype.hasOwnProperty,
		sd = function(a) {
			return u(a) ? a.toUpperCase() : a
		}, td = [].slice,
		ud = [].splice,
		vd = [].push,
		wd = Object.prototype.toString,
		xd = d("ng"),
		yd = a.angular || (a.angular = {}),
		zd = 0;
	ld = b.documentMode, o.$inject = [], p.$inject = [];
	var Ad, Bd = Array.isArray,
		Cd = function(a) {
			return u(a) ? a.trim() : a
		}, Dd = function() {
			if (s(Dd.isActive_)) return Dd.isActive_;
			var a = !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"));
			if (!a) try {
				new Function("")
			} catch (c) {
				a = !0
			}
			return Dd.isActive_ = a
		}, Ed = ["ng-", "data-ng-", "ng:", "x-ng-"],
		Fd = /[A-Z]/g,
		Gd = !1,
		Hd = 1,
		Id = 3,
		Jd = {
			full: "1.3.0",
			major: 1,
			minor: 3,
			dot: 0,
			codeName: "superluminal-nudge"
		};
	kb.expando = "ng339";
	var Kd = kb.cache = {}, Ld = 1;
	kb._data = function(a) {
		return this.cache[a[this.expando]] || {}
	};
	var Md = /([\:\-\_]+(.))/g,
		Nd = /^moz([A-Z])/,
		Od = {
			mouseleave: "mouseout",
			mouseenter: "mouseover"
		}, Pd = d("jqLite"),
		Qd = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		Rd = /<|&#?\w+;/,
		Sd = /<([\w:]+)/,
		Td = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Ud = {
			option: [1, '<select multiple="multiple">', "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	Ud.optgroup = Ud.option, Ud.tbody = Ud.tfoot = Ud.colgroup = Ud.caption = Ud.thead, Ud.th = Ud.td;
	var Vd = kb.prototype = {
		ready: function(c) {
			function d() {
				e || (e = !0, c())
			}
			var e = !1;
			"complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), kb(a).on("load", d), this.on("DOMContentLoaded", d))
		},
		toString: function() {
			var a = [];
			return f(this, function(b) {
				a.push("" + b)
			}), "[" + a.join(", ") + "]"
		},
		eq: function(a) {
			return md(a >= 0 ? this[a] : this[this.length + a])
		},
		length: 0,
		push: vd,
		sort: [].sort,
		splice: [].splice
	}, Wd = {};
	f("multiple selected checked disabled readOnly required open".split(" "), function(a) {
		Wd[qd(a)] = a
	});
	var Xd = {};
	f("input select option textarea button form details".split(" "), function(a) {
		Xd[a] = !0
	});
	var Yd = {
		ngMinlength: "minlength",
		ngMaxlength: "maxlength",
		ngMin: "min",
		ngMax: "max",
		ngPattern: "pattern"
	};
	f({
		data: qb,
		removeData: ob
	}, function(a, b) {
		kb[b] = a
	}), f({
		data: qb,
		inheritedData: wb,
		scope: function(a) {
			return md.data(a, "$scope") || wb(a.parentNode || a, ["$isolateScope", "$scope"])
		},
		isolateScope: function(a) {
			return md.data(a, "$isolateScope") || md.data(a, "$isolateScopeNoTemplate")
		},
		controller: vb,
		injector: function(a) {
			return wb(a, "$injector")
		},
		removeAttr: function(a, b) {
			a.removeAttribute(b)
		},
		hasClass: rb,
		css: function(a, b, c) {
			return b = hb(b), s(c) ? void(a.style[b] = c) : a.style[b]
		},
		attr: function(a, b, d) {
			var e = qd(b);
			if (Wd[e]) {
				if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
				d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
			} else if (s(d)) a.setAttribute(b, d);
			else if (a.getAttribute) return a = a.getAttribute(b, 2), null === a ? c : a
		},
		prop: function(a, b, c) {
			return s(c) ? void(a[b] = c) : a[b]
		},
		text: function() {
			function a(a, b) {
				if (r(b)) {
					var c = a.nodeType;
					return c === Hd || c === Id ? a.textContent : ""
				}
				a.textContent = b
			}
			return a.$dv = "", a
		}(),
		val: function(a, b) {
			if (r(b)) {
				if (a.multiple && "select" === E(a)) {
					var c = [];
					return f(a.options, function(a) {
						a.selected && c.push(a.value || a.text)
					}), 0 === c.length ? null : c
				}
				return a.value
			}
			a.value = b
		},
		html: function(a, b) {
			return r(b) ? a.innerHTML : (mb(a, !0), void(a.innerHTML = b))
		},
		empty: xb
	}, function(a, b) {
		kb.prototype[b] = function(b, d) {
			var e, f, g = this.length;
			if (a !== xb && (2 == a.length && a !== rb && a !== vb ? b : d) === c) {
				if (t(b)) {
					for (e = 0; g > e; e++) if (a === qb) a(this[e], b);
					else for (f in b) a(this[e], f, b[f]);
					return this
				}
				for (e = a.$dv, g = e === c ? Math.min(g, 1) : g, f = 0; g > f; f++) {
					var h = a(this[f], b, d);
					e = e ? e + h : h
				}
				return e
			}
			for (e = 0; g > e; e++) a(this[e], b, d);
			return this
		}
	}), f({
		removeData: ob,
		on: function Rf(a, b, c, d) {
			if (s(d)) throw Pd("onargs");
			if (ib(a)) {
				var e = pb(a, !0);
				d = e.events;
				var f = e.handle;
				f || (f = e.handle = Cb(a, d));
				for (var e = 0 <= b.indexOf(" ") ? b.split(" ") : [b], g = e.length; g--;) {
					b = e[g];
					var h = d[b];
					h || (d[b] = [], "mouseenter" === b || "mouseleave" === b ? Rf(a, Od[b], function(a) {
						var c = a.relatedTarget;
						c && (c === this || this.contains(c)) || f(a, b)
					}) : "$destroy" !== b && a.addEventListener(b, f, !1), h = d[b]), h.push(c)
				}
			}
		},
		off: nb,
		one: function(a, b, c) {
			a = md(a), a.on(b, function d() {
				a.off(b, c), a.off(b, d)
			}), a.on(b, c)
		},
		replaceWith: function(a, b) {
			var c, d = a.parentNode;
			mb(a), f(new kb(b), function(b) {
				c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
			})
		},
		children: function(a) {
			var b = [];
			return f(a.childNodes, function(a) {
				a.nodeType === Hd && b.push(a)
			}), b
		},
		contents: function(a) {
			return a.contentDocument || a.childNodes || []
		},
		append: function(a, b) {
			var c = a.nodeType;
			if (c === Hd || 11 === c) {
				b = new kb(b);
				for (var c = 0, d = b.length; d > c; c++) a.appendChild(b[c])
			}
		},
		prepend: function(a, b) {
			if (a.nodeType === Hd) {
				var c = a.firstChild;
				f(new kb(b), function(b) {
					a.insertBefore(b, c)
				})
			}
		},
		wrap: function(a, b) {
			b = md(b).eq(0).clone()[0];
			var c = a.parentNode;
			c && c.replaceChild(b, a), b.appendChild(a)
		},
		remove: yb,
		detach: function(a) {
			yb(a, !0)
		},
		after: function(a, b) {
			var c = a,
				d = a.parentNode;
			b = new kb(b);
			for (var e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				d.insertBefore(g, c.nextSibling), c = g
			}
		},
		addClass: tb,
		removeClass: sb,
		toggleClass: function(a, b, c) {
			b && f(b.split(" "), function(b) {
				var d = c;
				r(d) && (d = !rb(a, b)), (d ? tb : sb)(a, b)
			})
		},
		parent: function(a) {
			return (a = a.parentNode) && 11 !== a.nodeType ? a : null
		},
		next: function(a) {
			return a.nextElementSibling
		},
		find: function(a, b) {
			return a.getElementsByTagName ? a.getElementsByTagName(b) : []
		},
		clone: lb,
		triggerHandler: function(a, b, c) {
			var d, e, g = b.type || b,
				h = pb(a);
			(h = (h = h && h.events) && h[g]) && (d = {
				preventDefault: function() {
					this.defaultPrevented = !0
				},
				isDefaultPrevented: function() {
					return !0 === this.defaultPrevented
				},
				stopImmediatePropagation: function() {
					this.immediatePropagationStopped = !0
				},
				isImmediatePropagationStopped: function() {
					return !0 === this.immediatePropagationStopped
				},
				stopPropagation: o,
				type: g,
				target: a
			}, b.type && (d = l(d, b)), b = H(h), e = c ? [d].concat(c) : [d], f(b, function(b) {
				d.isImmediatePropagationStopped() || b.apply(a, e)
			}))
		}
	}, function(a, b) {
		kb.prototype[b] = function(b, c, d) {
			for (var e, f = 0, g = this.length; g > f; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = md(e))) : ub(e, a(this[f], b, c, d));
			return s(e) ? e : this
		}, kb.prototype.bind = kb.prototype.on, kb.prototype.unbind = kb.prototype.off
	}), Eb.prototype = {
		put: function(a, b) {
			this[Db(a, this.nextUid)] = b
		},
		get: function(a) {
			return this[Db(a, this.nextUid)]
		},
		remove: function(a) {
			var b = this[a = Db(a, this.nextUid)];
			return delete this[a], b
		}
	};
	var Zd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		$d = /,/,
		_d = /^\s*(_?)(\S+?)\1\s*$/,
		ae = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
		be = d("$injector");
	Hb.$$annotate = Gb;
	var ce = d("$animate"),
		de = ["$provide", function(a) {
			this.$$selectors = {}, this.register = function(b, c) {
				var d = b + "-animation";
				if (b && "." != b.charAt(0)) throw ce("notcsel", b);
				this.$$selectors[b.substr(1)] = d, a.factory(d, c)
			}, this.classNameFilter = function(a) {
				return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
			}, this.$get = ["$$q", "$$asyncCallback", "$rootScope", function(a, b, c) {
				function d(b) {
					var d, e = a.defer();
					return e.promise.$$cancelFn = function() {
						d && d()
					}, c.$$postDigest(function() {
						d = b(function() {
							e.resolve()
						})
					}), e.promise
				}
				function e(a, b) {
					var c = [],
						d = [],
						e = eb();
					return f((a.attr("class") || "").split(/\s+/), function(a) {
						e[a] = !0
					}), f(b, function(a, b) {
						var f = e[b];
						!1 === a && f ? d.push(b) : !0 !== a || f || c.push(b)
					}), 0 < c.length + d.length && [c.length ? c : null, d.length ? d : null]
				}
				function g(a, b, c) {
					for (var d = 0, e = b.length; e > d; ++d) a[b[d]] = c
				}
				function h() {
					return j || (j = a.defer(), b(function() {
						j.resolve(), j = null
					})), j.promise
				}
				function i(a, b) {
					if (yd.isObject(b)) {
						var c = l(b.from || {}, b.to || {});
						a.css(c)
					}
				}
				var j;
				return {
					animate: function(a, b, c) {
						return i(a, {
							from: b,
							to: c
						}), h()
					},
					enter: function(a, b, c, d) {
						return i(a, d), c ? c.after(a) : b.prepend(a), h()
					},
					leave: function(a) {
						return a.remove(), h()
					},
					move: function(a, b, c, d) {
						return this.enter(a, b, c, d)
					},
					addClass: function(a, b, c) {
						return this.setClass(a, b, [], c)
					},
					$$addClassImmediately: function(a, b, c) {
						return a = md(a), b = u(b) ? b : Bd(b) ? b.join(" ") : "", f(a, function(a) {
							tb(a, b)
						}), i(a, c), h()
					},
					removeClass: function(a, b, c) {
						return this.setClass(a, [], b, c)
					},
					$$removeClassImmediately: function(a, b, c) {
						return a = md(a), b = u(b) ? b : Bd(b) ? b.join(" ") : "", f(a, function(a) {
							sb(a, b)
						}), i(a, c), h()
					},
					setClass: function(a, b, c, f) {
						var h = this,
							i = !1;
						a = md(a);
						var j = a.data("$$animateClasses");
						return j ? f && j.options && (j.options = yd.extend(j.options || {}, f)) : (j = {
							classes: {},
							options: f
						}, i = !0), f = j.classes, b = Bd(b) ? b : b.split(" "), c = Bd(c) ? c : c.split(" "), g(f, b, !0), g(f, c, !1), i && (j.promise = d(function(b) {
							var c = a.data("$$animateClasses");
							if (a.removeData("$$animateClasses"), c) {
								var d = e(a, c.classes);
								d && h.$$setClassImmediately(a, d[0], d[1], c.options)
							}
							b()
						}), a.data("$$animateClasses", j)), j.promise
					},
					$$setClassImmediately: function(a, b, c, d) {
						return b && this.$$addClassImmediately(a, b), c && this.$$removeClassImmediately(a, c), i(a, d), h()
					},
					enabled: o,
					cancel: o
				}
			}]
		}],
		ee = d("$compile");
	Ob.$inject = ["$provide", "$$sanitizeUriProvider"];
	var fe = /^(x[\:\-_]|data[\:\-_])/i,
		ge = d("$interpolate"),
		he = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
		ie = {
			http: 80,
			https: 443,
			ftp: 21
		}, je = d("$location"),
		ke = {
			$$html5: !1,
			$$replace: !1,
			absUrl: mc("$$absUrl"),
			url: function(a) {
				return r(a) ? this.$$url : (a = he.exec(a), a[1] && this.path(decodeURIComponent(a[1])), (a[2] || a[1]) && this.search(a[3] || ""), this.hash(a[5] || ""), this)
			},
			protocol: mc("$$protocol"),
			host: mc("$$host"),
			port: mc("$$port"),
			path: nc("$$path", function(a) {
				return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
			}),
			search: function(a, b) {
				switch (arguments.length) {
					case 0:
						return this.$$search;
					case 1:
						if (u(a) || v(a)) a = a.toString(), this.$$search = Q(a);
						else {
							if (!t(a)) throw je("isrcharg");
							a = G(a, {}), f(a, function(b, c) {
								null == b && delete a[c]
							}), this.$$search = a
						}
						break;
					default:
						r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
				}
				return this.$$compose(), this
			},
			hash: nc("$$hash", function(a) {
				return null !== a ? a.toString() : ""
			}),
			replace: function() {
				return this.$$replace = !0, this
			}
		};
	f([lc, kc, jc], function(a) {
		a.prototype = Object.create(ke), a.prototype.state = function(b) {
			if (!arguments.length) return this.$$state;
			if (a !== jc || !this.$$html5) throw je("nostate");
			return this.$$state = r(b) ? null : b, this
		}
	});
	var le = d("$parse"),
		me = Function.prototype.call,
		ne = Function.prototype.apply,
		oe = Function.prototype.bind,
		pe = eb();
	f({
		"null": function() {
			return null
		},
		"true": function() {
			return !0
		},
		"false": function() {
			return !1
		},
		undefined: function() {}
	}, function(a, b) {
		a.constant = a.literal = a.sharedGetter = !0, pe[b] = a
	}), pe["this"] = function(a) {
		return a
	}, pe["this"].sharedGetter = !0;
	var qe = l(eb(), {
		"+": function(a, b, d, e) {
			return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
		},
		"-": function(a, b, c, d) {
			return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
		},
		"*": function(a, b, c, d) {
			return c(a, b) * d(a, b)
		},
		"/": function(a, b, c, d) {
			return c(a, b) / d(a, b)
		},
		"%": function(a, b, c, d) {
			return c(a, b) % d(a, b)
		},
		"===": function(a, b, c, d) {
			return c(a, b) === d(a, b)
		},
		"!==": function(a, b, c, d) {
			return c(a, b) !== d(a, b)
		},
		"==": function(a, b, c, d) {
			return c(a, b) == d(a, b)
		},
		"!=": function(a, b, c, d) {
			return c(a, b) != d(a, b)
		},
		"<": function(a, b, c, d) {
			return c(a, b) < d(a, b)
		},
		">": function(a, b, c, d) {
			return c(a, b) > d(a, b)
		},
		"<=": function(a, b, c, d) {
			return c(a, b) <= d(a, b)
		},
		">=": function(a, b, c, d) {
			return c(a, b) >= d(a, b)
		},
		"&&": function(a, b, c, d) {
			return c(a, b) && d(a, b)
		},
		"||": function(a, b, c, d) {
			return c(a, b) || d(a, b)
		},
		"!": function(a, b, c) {
			return !c(a, b)
		},
		"=": !0,
		"|": !0
	}),
		re = {
			n: "\n",
			f: "\f",
			r: "\r",
			t: "	",
			v: "",
			"'": "'",
			'"': '"'
		}, se = function(a) {
			this.options = a
		};
	se.prototype = {
		constructor: se,
		lex: function(a) {
			for (this.text = a, this.index = 0, this.ch = c, this.tokens = []; this.index < this.text.length;) if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
			else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
			else if (this.isIdent(this.ch)) this.readIdent();
			else if (this.is("(){}[].,;:?")) this.tokens.push({
				index: this.index,
				text: this.ch
			}), this.index++;
			else if (this.isWhitespace(this.ch)) this.index++;
			else {
				a = this.ch + this.peek();
				var b = a + this.peek(2),
					d = qe[this.ch],
					e = qe[a],
					f = qe[b];
				f ? (this.tokens.push({
					index: this.index,
					text: b,
					fn: f
				}), this.index += 3) : e ? (this.tokens.push({
					index: this.index,
					text: a,
					fn: e
				}), this.index += 2) : d ? (this.tokens.push({
					index: this.index,
					text: this.ch,
					fn: d
				}), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
			}
			return this.tokens
		},
		is: function(a) {
			return -1 !== a.indexOf(this.ch)
		},
		peek: function(a) {
			return a = a || 1, this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1
		},
		isNumber: function(a) {
			return a >= "0" && "9" >= a
		},
		isWhitespace: function(a) {
			return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
		},
		isIdent: function(a) {
			return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
		},
		isExpOperator: function(a) {
			return "-" === a || "+" === a || this.isNumber(a)
		},
		throwError: function(a, b, c) {
			throw c = c || this.index, b = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c, le("lexerr", a, b, this.text)
		},
		readNumber: function() {
			for (var a = "", b = this.index; this.index < this.text.length;) {
				var c = qd(this.text.charAt(this.index));
				if ("." == c || this.isNumber(c)) a += c;
				else {
					var d = this.peek();
					if ("e" == c && this.isExpOperator(d)) a += c;
					else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
					else {
						if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
						this.throwError("Invalid exponent")
					}
				}
				this.index++
			}
			a *= 1, this.tokens.push({
				index: b,
				text: a,
				constant: !0,
				fn: function() {
					return a
				}
			})
		},
		readIdent: function() {
			for (var a, b, d, e, f = this.text, g = "", h = this.index; this.index < this.text.length && (e = this.text.charAt(this.index), "." === e || this.isIdent(e) || this.isNumber(e));) "." === e && (a = this.index), g += e, this.index++;
			if (a && "." === g[g.length - 1] && (this.index--, g = g.slice(0, -1), a = g.lastIndexOf("."), -1 === a && (a = c)), a) for (b = this.index; b < this.text.length;) {
				if (e = this.text.charAt(b), "(" === e) {
					d = g.substr(a - h + 1), g = g.substr(0, a - h), this.index = b;
					break
				}
				if (!this.isWhitespace(e)) break;
				b++
			}
			this.tokens.push({
				index: h,
				text: g,
				fn: pe[g] || vc(g, this.options, f)
			}), d && (this.tokens.push({
				index: a,
				text: "."
			}), this.tokens.push({
				index: a + 1,
				text: d
			}))
		},
		readString: function(a) {
			var b = this.index;
			this.index++;
			for (var c = "", d = a, e = !1; this.index < this.text.length;) {
				var f = this.text.charAt(this.index),
					d = d + f;
				if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, c += String.fromCharCode(parseInt(e, 16))) : c += re[f] || f, e = !1;
				else if ("\\" === f) e = !0;
				else {
					if (f === a) return this.index++, void this.tokens.push({
						index: b,
						text: d,
						string: c,
						constant: !0,
						fn: function() {
							return c
						}
					});
					c += f
				}
				this.index++
			}
			this.throwError("Unterminated quote", b)
		}
	};
	var te = function(a, b, c) {
		this.lexer = a, this.$filter = b, this.options = c
	};
	te.ZERO = l(function() {
		return 0
	}, {
		sharedGetter: !0,
		constant: !0
	}), te.prototype = {
		constructor: te,
		parse: function(a) {
			return this.text = a, this.tokens = this.lexer.lex(a), a = this.statements(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), a.literal = !! a.literal, a.constant = !! a.constant, a
		},
		primary: function() {
			var a;
			if (this.expect("(")) a = this.filterChain(), this.consume(")");
			else if (this.expect("[")) a = this.arrayDeclaration();
			else if (this.expect("{")) a = this.object();
			else {
				var b = this.expect();
				(a = b.fn) || this.throwError("not a primary expression", b), b.constant && (a.constant = !0, a.literal = !0)
			}
			for (var c; b = this.expect("(", "[", ".");) "(" === b.text ? (a = this.functionCall(a, c), c = null) : "[" === b.text ? (c = a, a = this.objectIndex(a)) : "." === b.text ? (c = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
			return a
		},
		throwError: function(a, b) {
			throw le("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
		},
		peekToken: function() {
			if (0 === this.tokens.length) throw le("ueoe", this.text);
			return this.tokens[0]
		},
		peek: function(a, b, c, d) {
			if (0 < this.tokens.length) {
				var e = this.tokens[0],
					f = e.text;
				if (f === a || f === b || f === c || f === d || !(a || b || c || d)) return e
			}
			return !1
		},
		expect: function(a, b, c, d) {
			return (a = this.peek(a, b, c, d)) ? (this.tokens.shift(), a) : !1
		},
		consume: function(a) {
			this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
		},
		unaryFn: function(a, b) {
			return l(function(c, d) {
				return a(c, d, b)
			}, {
				constant: b.constant,
				inputs: [b]
			})
		},
		binaryFn: function(a, b, c, d) {
			return l(function(d, e) {
				return b(d, e, a, c)
			}, {
				constant: a.constant && c.constant,
				inputs: !d && [a, c]
			})
		},
		statements: function() {
			for (var a = [];;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
				for (var d, e = 0, f = a.length; f > e; e++) d = a[e](b, c);
				return d
			}
		},
		filterChain: function() {
			for (var a = this.expression(); this.expect("|");) a = this.filter(a);
			return a
		},
		filter: function(a) {
			var b, d, e = this.expect(),
				f = this.$filter(e.text);
			if (this.peek(":")) for (b = [], d = []; this.expect(":");) b.push(this.expression());
			return e = [a].concat(b || []), l(function(e, g) {
				var h = a(e, g);
				if (d) {
					for (d[0] = h, h = b.length; h--;) d[h + 1] = b[h](e, g);
					return f.apply(c, d)
				}
				return f(h)
			}, {
				constant: !f.$stateful && e.every(sc),
				inputs: !f.$stateful && e
			})
		},
		expression: function() {
			return this.assignment()
		},
		assignment: function() {
			var a, b, c = this.ternary();
			return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), l(function(b, d) {
				return c.assign(b, a(b, d), d)
			}, {
				inputs: [c, a]
			})) : c
		},
		ternary: function() {
			var a, b, c = this.logicalOR();
			if (b = this.expect("?")) {
				if (a = this.assignment(), b = this.expect(":")) {
					var d = this.assignment();
					return l(function(b, e) {
						return c(b, e) ? a(b, e) : d(b, e)
					}, {
						constant: c.constant && a.constant && d.constant
					})
				}
				this.throwError("expected :", b)
			}
			return c
		},
		logicalOR: function() {
			for (var a, b = this.logicalAND(); a = this.expect("||");) b = this.binaryFn(b, a.fn, this.logicalAND(), !0);
			return b
		},
		logicalAND: function() {
			var a, b = this.equality();
			return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND(), !0)), b
		},
		equality: function() {
			var a, b = this.relational();
			return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
		},
		relational: function() {
			var a, b = this.additive();
			return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
		},
		additive: function() {
			for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.fn, this.multiplicative());
			return b
		},
		multiplicative: function() {
			for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.fn, this.unary());
			return b
		},
		unary: function() {
			var a;
			return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(te.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
		},
		fieldAccess: function(a) {
			var b = this.text,
				c = this.expect().text,
				d = vc(c, this.options, b);
			return l(function(b, c, e) {
				return d(e || a(b, c))
			}, {
				assign: function(d, e, f) {
					return (f = a(d, f)) || a.assign(d, f = {}), tc(f, c, e, b)
				}
			})
		},
		objectIndex: function(a) {
			var b = this.text,
				d = this.expression();
			return this.consume("]"), l(function(e, f) {
				var g = a(e, f),
					h = d(e, f);
				return qc(h, b), g ? rc(g[h], b) : c
			}, {
				assign: function(c, e, f) {
					var g = qc(d(c, f), b);
					return (f = rc(a(c, f), b)) || a.assign(c, f = {}), f[g] = e
				}
			})
		},
		functionCall: function(a, b) {
			var c = [];
			if (")" !== this.peekToken().text) do c.push(this.expression());
			while (this.expect(","));
			this.consume(")");
			var d = this.text,
				e = c.length ? [] : null;
			return function(f, g) {
				var h = b ? b(f, g) : f,
					i = a(f, g, h) || o;
				if (e) for (var j = c.length; j--;) e[j] = rc(c[j](f, g), d);
				if (rc(h, d), i) {
					if (i.constructor === i) throw le("isecfn", d);
					if (i === me || i === ne || i === oe) throw le("isecff", d)
				}
				return h = i.apply ? i.apply(h, e) : i(e[0], e[1], e[2], e[3], e[4]), rc(h, d)
			}
		},
		arrayDeclaration: function() {
			var a = [];
			if ("]" !== this.peekToken().text) do {
				if (this.peek("]")) break;
				var b = this.expression();
				a.push(b)
			} while (this.expect(","));
			return this.consume("]"), l(function(b, c) {
				for (var d = [], e = 0, f = a.length; f > e; e++) d.push(a[e](b, c));
				return d
			}, {
				literal: !0,
				constant: a.every(sc),
				inputs: a
			})
		},
		object: function() {
			var a = [],
				b = [];
			if ("}" !== this.peekToken().text) do {
				if (this.peek("}")) break;
				var c = this.expect();
				a.push(c.string || c.text), this.consume(":"), c = this.expression(), b.push(c)
			} while (this.expect(","));
			return this.consume("}"), l(function(c, d) {
				for (var e = {}, f = 0, g = b.length; g > f; f++) e[a[f]] = b[f](c, d);
				return e
			}, {
				literal: !0,
				constant: b.every(sc),
				inputs: b
			})
		}
	};
	var ue = eb(),
		ve = d("$sce"),
		we = {
			HTML: "html",
			CSS: "css",
			URL: "url",
			RESOURCE_URL: "resourceUrl",
			JS: "js"
		}, ee = d("$compile"),
		xe = b.createElement("a"),
		ye = Lc(a.location.href, !0);
	Oc.$inject = ["$provide"], Qc.$inject = ["$locale"], Rc.$inject = ["$locale"];
	var ze = ".",
		Ae = {
			yyyy: Uc("FullYear", 4),
			yy: Uc("FullYear", 2, 0, !0),
			y: Uc("FullYear", 1),
			MMMM: Vc("Month"),
			MMM: Vc("Month", !0),
			MM: Uc("Month", 2, 1),
			M: Uc("Month", 1, 1),
			dd: Uc("Date", 2),
			d: Uc("Date", 1),
			HH: Uc("Hours", 2),
			H: Uc("Hours", 1),
			hh: Uc("Hours", 2, -12),
			h: Uc("Hours", 1, -12),
			mm: Uc("Minutes", 2),
			m: Uc("Minutes", 1),
			ss: Uc("Seconds", 2),
			s: Uc("Seconds", 1),
			sss: Uc("Milliseconds", 3),
			EEEE: Vc("Day"),
			EEE: Vc("Day", !0),
			a: function(a, b) {
				return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1]
			},
			Z: function(a) {
				return a = -1 * a.getTimezoneOffset(), a = (a >= 0 ? "+" : "") + (Tc(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + Tc(Math.abs(a % 60), 2))
			},
			ww: Xc(2),
			w: Xc(1)
		}, Be = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
		Ce = /^\-?\d+$/;
	Yc.$inject = ["$locale"];
	var De = q(qd),
		Ee = q(sd);
	_c.$inject = ["$parse"];
	var Fe = q({
		restrict: "E",
		compile: function(a, b) {
			return b.href || b.xlinkHref || b.name ? void 0 : function(a, b) {
				var c = "[object SVGAnimatedString]" === wd.call(b.prop("href")) ? "xlink:href" : "href";
				b.on("click", function(a) {
					b.attr(c) || a.preventDefault()
				})
			}
		}
	}),
		Ge = {};
	f(Wd, function(a, b) {
		if ("multiple" != a) {
			var c = Pb("ng-" + b);
			Ge[c] = function() {
				return {
					restrict: "A",
					priority: 100,
					link: function(a, d, e) {
						a.$watch(e[c], function(a) {
							e.$set(b, !! a)
						})
					}
				}
			}
		}
	}), f(Yd, function(a, b) {
		Ge[b] = function() {
			return {
				priority: 100,
				link: function(a, c, d) {
					return "ngPattern" === b && "/" == d.ngPattern.charAt(0) && (c = d.ngPattern.match(pd)) ? void d.$set("ngPattern", new RegExp(c[1], c[2])) : void a.$watch(d[b], function(a) {
						d.$set(b, a)
					})
				}
			}
		}
	}), f(["src", "srcset", "href"], function(a) {
		var b = Pb("ng-" + a);
		Ge[b] = function() {
			return {
				priority: 99,
				link: function(c, d, e) {
					var f = a,
						g = a;
					"href" === a && "[object SVGAnimatedString]" === wd.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
						b ? (e.$set(g, b), ld && f && d.prop(f, e[g])) : "href" === a && e.$set(g, null)
					})
				}
			}
		}
	});
	var He = {
		$addControl: o,
		$$renameControl: function(a, b) {
			a.$name = b
		},
		$removeControl: o,
		$setValidity: o,
		$setDirty: o,
		$setPristine: o,
		$setSubmitted: o
	};
	bd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
	var Ie = function(a) {
		return ["$timeout", function(b) {
			return {
				name: "form",
				restrict: a ? "EAC" : "E",
				controller: bd,
				compile: function(a) {
					return a.addClass($e).addClass(Ye), {
						pre: function(a, d, e, f) {
							if (!("action" in e)) {
								var g = function(b) {
									a.$apply(function() {
										f.$commitViewValue(), f.$setSubmitted()
									}), b.preventDefault ? b.preventDefault() : b.returnValue = !1
								};
								d[0].addEventListener("submit", g, !1), d.on("$destroy", function() {
									b(function() {
										d[0].removeEventListener("submit", g, !1)
									}, 0, !1)
								})
							}
							var h = f.$$parentForm,
								i = f.$name;
							i && (tc(a, i, f, i), e.$observe(e.name ? "name" : "ngForm", function(b) {
								i !== b && (tc(a, i, c, i), i = b, tc(a, i, f, i), h.$$renameControl(f, i))
							})), d.on("$destroy", function() {
								h.$removeControl(f), i && tc(a, i, c, i), l(f, He)
							})
						}
					}
				}
			}
		}]
	}, Je = Ie(),
		Ke = Ie(!0),
		Le = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
		Me = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
		Ne = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
		Oe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
		Pe = /^(\d{4})-(\d{2})-(\d{2})$/,
		Qe = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
		Re = /^(\d{4})-W(\d\d)$/,
		Se = /^(\d{4})-(\d\d)$/,
		Te = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
		Ue = /(\s+|^)default(\s+|$)/,
		Ve = new d("ngModel"),
		We = {
			text: function(a, b, c, d, e, f) {
				dd(a, b, c, d, e, f), cd(d)
			},
			date: fd("date", Pe, ed(Pe, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
			"datetime-local": fd("datetimelocal", Qe, ed(Qe, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
			time: fd("time", Te, ed(Te, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
			week: fd("week", Re, function(a, b) {
				if (w(a)) return a;
				if (u(a)) {
					Re.lastIndex = 0;
					var c = Re.exec(a);
					if (c) {
						var d = +c[1],
							e = +c[2],
							f = c = 0,
							g = 0,
							h = 0,
							i = Wc(d),
							e = 7 * (e - 1);
						return b && (c = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()), new Date(d, 0, i.getDate() + e, c, f, g, h)
					}
				}
				return 0 / 0
			}, "yyyy-Www"),
			month: fd("month", Se, ed(Se, ["yyyy", "MM"]), "yyyy-MM"),
			number: function(a, b, d, e, f, g) {
				if (gd(a, b, d, e), dd(a, b, d, e, f, g), e.$$parserName = "number", e.$parsers.push(function(a) {
					return e.$isEmpty(a) ? null : Oe.test(a) ? parseFloat(a) : c
				}), e.$formatters.push(function(a) {
					if (!e.$isEmpty(a)) {
						if (!v(a)) throw Ve("numfmt", a);
						a = a.toString()
					}
					return a
				}), d.min || d.ngMin) {
					var h;
					e.$validators.min = function(a) {
						return e.$isEmpty(a) || r(h) || a >= h
					}, d.$observe("min", function(a) {
						s(a) && !v(a) && (a = parseFloat(a, 10)), h = v(a) && !isNaN(a) ? a : c, e.$validate()
					})
				}
				if (d.max || d.ngMax) {
					var i;
					e.$validators.max = function(a) {
						return e.$isEmpty(a) || r(i) || i >= a
					}, d.$observe("max", function(a) {
						s(a) && !v(a) && (a = parseFloat(a, 10)), i = v(a) && !isNaN(a) ? a : c, e.$validate()
					})
				}
			},
			url: function(a, b, c, d, e, f) {
				dd(a, b, c, d, e, f), cd(d), d.$$parserName = "url", d.$validators.url = function(a) {
					return d.$isEmpty(a) || Me.test(a)
				}
			},
			email: function(a, b, c, d, e, f) {
				dd(a, b, c, d, e, f), cd(d), d.$$parserName = "email", d.$validators.email = function(a) {
					return d.$isEmpty(a) || Ne.test(a)
				}
			},
			radio: function(a, b, c, d) {
				r(c.name) && b.attr("name", ++zd), b.on("click", function(a) {
					b[0].checked && d.$setViewValue(c.value, a && a.type)
				}), d.$render = function() {
					b[0].checked = c.value == d.$viewValue
				}, c.$observe("value", d.$render)
			},
			checkbox: function(a, b, c, d, e, f, g, h) {
				var i = hd(h, a, "ngTrueValue", c.ngTrueValue, !0),
					j = hd(h, a, "ngFalseValue", c.ngFalseValue, !1);
				b.on("click", function(a) {
					d.$setViewValue(b[0].checked, a && a.type)
				}), d.$render = function() {
					b[0].checked = d.$viewValue
				}, d.$isEmpty = function(a) {
					return a !== i
				}, d.$formatters.push(function(a) {
					return I(a, i)
				}), d.$parsers.push(function(a) {
					return a ? i : j
				})
			},
			hidden: o,
			button: o,
			submit: o,
			reset: o,
			file: o
		}, Xe = ["$browser", "$sniffer", "$filter", "$parse", function(a, b, c, d) {
			return {
				restrict: "E",
				require: ["?ngModel"],
				link: {
					pre: function(e, f, g, h) {
						h[0] && (We[qd(g.type)] || We.text)(e, f, g, h[0], b, a, c, d)
					}
				}
			}
		}],
		Ye = "ng-valid",
		Ze = "ng-invalid",
		$e = "ng-pristine",
		_e = "ng-dirty",
		af = "ng-pending",
		bf = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, e, g, h, i, j, k, l) {
			this.$modelValue = this.$viewValue = Number.NaN, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = c, this.$name = l(d.name || "", !1)(a);
			var m = g(d.ngModel),
				n = null,
				p = this,
				q = function() {
					var b = m(a);
					return p.$options && p.$options.getterSetter && x(b) && (b = b()), b
				}, t = function() {
					var b;
					p.$options && p.$options.getterSetter && x(b = m(a)) ? b(p.$modelValue) : m.assign(a, p.$modelValue)
				};
			this.$$setOptions = function(a) {
				if (p.$options = a, !(m.assign || a && a.getterSetter)) throw Ve("nonassign", d.ngModel, O(e))
			}, this.$render = o, this.$isEmpty = function(a) {
				return r(a) || "" === a || null === a || a !== a
			};
			var u = e.inheritedData("$formController") || He,
				w = 0;
			id({
				ctrl: this,
				$element: e,
				set: function(a, b) {
					a[b] = !0
				},
				unset: function(a, b) {
					delete a[b]
				},
				parentForm: u,
				$animate: h
			}), this.$setPristine = function() {
				p.$dirty = !1, p.$pristine = !0, h.removeClass(e, _e), h.addClass(e, $e)
			}, this.$setUntouched = function() {
				p.$touched = !1, p.$untouched = !0, h.setClass(e, "ng-untouched", "ng-touched")
			}, this.$setTouched = function() {
				p.$touched = !0, p.$untouched = !1, h.setClass(e, "ng-touched", "ng-untouched")
			}, this.$rollbackViewValue = function() {
				i.cancel(n), p.$viewValue = p.$$lastCommittedViewValue, p.$render()
			}, this.$validate = function() {
				v(p.$modelValue) && isNaN(p.$modelValue) || this.$$parseAndValidate()
			}, this.$$runValidators = function(a, b, d, e) {
				function g() {
					var a = !0;
					return f(p.$validators, function(c, e) {
						var f = c(b, d);
						a = a && f, i(e, f)
					}), a ? !0 : (f(p.$asyncValidators, function(a, b) {
						i(b, null)
					}), !1)
				}
				function h() {
					var a = [],
						e = !0;
					f(p.$asyncValidators, function(f, g) {
						var h = f(b, d);
						if (!h || !x(h.then)) throw Ve("$asyncValidators", h);
						i(g, c), a.push(h.then(function() {
							i(g, !0)
						}, function() {
							e = !1, i(g, !1)
						}))
					}), a.length ? k.all(a).then(function() {
						j(e)
					}, o) : j(!0)
				}
				function i(a, b) {
					l === w && p.$setValidity(a, b)
				}
				function j(a) {
					l === w && e(a)
				}
				w++;
				var l = w;
				(function(a) {
					var b = p.$$parserName || "parse";
					if (a === c) i(b, null);
					else if (i(b, a), !a) return f(p.$validators, function(a, b) {
						i(b, null)
					}), f(p.$asyncValidators, function(a, b) {
						i(b, null)
					}), !1;
					return !0
				})(a) && g() ? h() : j(!1)
			}, this.$commitViewValue = function() {
				var a = p.$viewValue;
				i.cancel(n), (p.$$lastCommittedViewValue !== a || "" === a && p.$$hasNativeValidators) && (p.$$lastCommittedViewValue = a, p.$pristine && (p.$dirty = !0, p.$pristine = !1, h.removeClass(e, $e), h.addClass(e, _e), u.$setDirty()), this.$$parseAndValidate())
			}, this.$$parseAndValidate = function() {
				var a = p.$$lastCommittedViewValue,
					b = a,
					d = r(b) ? c : !0;
				if (d) for (var e = 0; e < p.$parsers.length; e++) if (b = p.$parsers[e](b), r(b)) {
					d = !1;
					break
				}
				v(p.$modelValue) && isNaN(p.$modelValue) && (p.$modelValue = q());
				var f = p.$modelValue,
					g = p.$options && p.$options.allowInvalid;
				g && (p.$modelValue = b, p.$modelValue !== f && p.$$writeModelToScope()), p.$$runValidators(d, b, a, function(a) {
					g || (p.$modelValue = a ? b : c, p.$modelValue !== f && p.$$writeModelToScope())
				})
			}, this.$$writeModelToScope = function() {
				t(p.$modelValue), f(p.$viewChangeListeners, function(a) {
					try {
						a()
					} catch (c) {
						b(c)
					}
				})
			}, this.$setViewValue = function(a, b) {
				p.$viewValue = a, p.$options && !p.$options.updateOnDefault || p.$$debounceViewValueCommit(b)
			}, this.$$debounceViewValueCommit = function(b) {
				var c = 0,
					d = p.$options;
				d && s(d.debounce) && (d = d.debounce, v(d) ? c = d : v(d[b]) ? c = d[b] : v(d["default"]) && (c = d["default"])), i.cancel(n), c ? n = i(function() {
					p.$commitViewValue()
				}, c) : j.$$phase ? p.$commitViewValue() : a.$apply(function() {
					p.$commitViewValue()
				})
			}, a.$watch(function() {
				var a = q();
				if (a !== p.$modelValue) {
					p.$modelValue = a;
					for (var b = p.$formatters, d = b.length, e = a; d--;) e = b[d](e);
					p.$viewValue !== e && (p.$viewValue = p.$$lastCommittedViewValue = e, p.$render(), p.$$runValidators(c, a, e, o))
				}
				return a
			})
		}],
		cf = function() {
			return {
				restrict: "A",
				require: ["ngModel", "^?form", "^?ngModelOptions"],
				controller: bf,
				priority: 1,
				compile: function(a) {
					return a.addClass($e).addClass("ng-untouched").addClass(Ye), {
						pre: function(a, b, c, d) {
							var e = d[0],
								f = d[1] || He;
							e.$$setOptions(d[2] && d[2].$options), f.$addControl(e), c.$observe("name", function(a) {
								e.$name !== a && f.$$renameControl(e, a)
							}), a.$on("$destroy", function() {
								f.$removeControl(e)
							})
						},
						post: function(a, b, c, d) {
							var e = d[0];
							e.$options && e.$options.updateOn && b.on(e.$options.updateOn, function(a) {
								e.$$debounceViewValueCommit(a && a.type)
							}), b.on("blur", function() {
								e.$touched || a.$apply(function() {
									e.$setTouched()
								})
							})
						}
					}
				}
			}
		}, df = q({
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				d.$viewChangeListeners.push(function() {
					a.$eval(c.ngChange)
				})
			}
		}),
		ef = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					d && (c.required = !0, d.$validators.required = function(a) {
						return !c.required || !d.$isEmpty(a)
					}, c.$observe("required", function() {
						d.$validate()
					}))
				}
			}
		}, ff = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, e, f) {
					if (f) {
						var g, h = e.ngPattern || e.pattern;
						e.$observe("pattern", function(a) {
							if (u(a) && 0 < a.length && (a = new RegExp(a)), a && !a.test) throw d("ngPattern")("noregexp", h, a, O(b));
							g = a || c, f.$validate()
						}), f.$validators.pattern = function(a) {
							return f.$isEmpty(a) || r(g) || g.test(a)
						}
					}
				}
			}
		}, gf = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					if (d) {
						var e = 0;
						c.$observe("maxlength", function(a) {
							e = m(a) || 0, d.$validate()
						}), d.$validators.maxlength = function(a, b) {
							return d.$isEmpty(a) || b.length <= e
						}
					}
				}
			}
		}, hf = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					if (d) {
						var e = 0;
						c.$observe("minlength", function(a) {
							e = m(a) || 0, d.$validate()
						}), d.$validators.minlength = function(a, b) {
							return d.$isEmpty(a) || b.length >= e
						}
					}
				}
			}
		}, jf = function() {
			return {
				restrict: "A",
				priority: 100,
				require: "ngModel",
				link: function(a, b, d, e) {
					var g = b.attr(d.$attr.ngList) || ", ",
						h = "false" !== d.ngTrim,
						i = h ? Cd(g) : g;
					e.$parsers.push(function(a) {
						if (!r(a)) {
							var b = [];
							return a && f(a.split(i), function(a) {
								a && b.push(h ? Cd(a) : a)
							}), b
						}
					}), e.$formatters.push(function(a) {
						return Bd(a) ? a.join(g) : c
					}), e.$isEmpty = function(a) {
						return !a || !a.length
					}
				}
			}
		}, kf = /^(true|false|\d+)$/,
		lf = function() {
			return {
				restrict: "A",
				priority: 100,
				compile: function(a, b) {
					return kf.test(b.ngValue) ? function(a, b, c) {
						c.$set("value", a.$eval(c.ngValue))
					} : function(a, b, c) {
						a.$watch(c.ngValue, function(a) {
							c.$set("value", a)
						})
					}
				}
			}
		}, mf = function() {
			return {
				restrict: "A",
				controller: ["$scope", "$attrs", function(a, b) {
					var d = this;
					this.$options = a.$eval(b.ngModelOptions), this.$options.updateOn !== c ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Cd(this.$options.updateOn.replace(Ue, function() {
						return d.$options.updateOnDefault = !0, " "
					}))) : this.$options.updateOnDefault = !0
				}]
			}
		}, nf = ["$compile", function(a) {
			return {
				restrict: "AC",
				compile: function(b) {
					return a.$$addBindingClass(b),
					function(b, d, e) {
						a.$$addBindingInfo(d, e.ngBind), d = d[0], b.$watch(e.ngBind, function(a) {
							d.textContent = a === c ? "" : a
						})
					}
				}
			}
		}],
		of = ["$interpolate", "$compile", function(a, b) {
			return {
				compile: function(d) {
					return b.$$addBindingClass(d),
					function(d, e, f) {
						d = a(e.attr(f.$attr.ngBindTemplate)), b.$$addBindingInfo(e, d.expressions), e = e[0], f.$observe("ngBindTemplate", function(a) {
							e.textContent = a === c ? "" : a
						})
					}
				}
			}
		}],
		pf = ["$sce", "$parse", "$compile", function(a, b, c) {
			return {
				restrict: "A",
				compile: function(d, e) {
					var f = b(e.ngBindHtml),
						g = b(e.ngBindHtml, function(a) {
							return (a || "").toString()
						});
					return c.$$addBindingClass(d),
					function(b, d, e) {
						c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function() {
							d.html(a.getTrustedHtml(f(b)) || "")
						})
					}
				}
			}
		}],
		qf = kd("", !0),
		rf = kd("Odd", 0),
		sf = kd("Even", 1),
		tf = ad({
			compile: function(a, b) {
				b.$set("ngCloak", c), a.removeClass("ng-cloak")
			}
		}),
		uf = [function() {
			return {
				restrict: "A",
				scope: !0,
				controller: "@",
				priority: 500
			}
		}],
		vf = {}, wf = {
			blur: !0,
			focus: !0
		};
	f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
		var b = Pb("ng-" + a);
		vf[b] = ["$parse", "$rootScope", function(c, d) {
			return {
				restrict: "A",
				compile: function(e, f) {
					var g = c(f[b]);
					return function(b, c) {
						c.on(a, function(c) {
							var e = function() {
								g(b, {
									$event: c
								})
							};
							wf[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
						})
					}
				}
			}
		}]
	});
	var xf = ["$animate", function(a) {
		return {
			multiElement: !0,
			transclude: "element",
			priority: 600,
			terminal: !0,
			restrict: "A",
			$$tlb: !0,
			link: function(c, d, e, f, g) {
				var h, i, j;
				c.$watch(e.ngIf, function(c) {
					c ? i || g(function(c, f) {
						i = f, c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
							clone: c
						}, a.enter(c, d.parent(), d)
					}) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = db(h.clone), a.leave(j).then(function() {
						j = null
					}), h = null))
				})
			}
		}
	}],
		yf = ["$templateRequest", "$anchorScroll", "$animate", "$sce", function(a, b, c, d) {
			return {
				restrict: "ECA",
				priority: 400,
				terminal: !0,
				transclude: "element",
				controller: yd.noop,
				compile: function(e, f) {
					var g = f.ngInclude || f.src,
						h = f.onload || "",
						i = f.autoscroll;
					return function(e, f, j, k, l) {
						var m, n, o, p = 0,
							q = function() {
								n && (n.remove(), n = null), m && (m.$destroy(), m = null), o && (c.leave(o).then(function() {
									n = null
								}), n = o, o = null)
							};
						e.$watch(d.parseAsResourceUrl(g), function(d) {
							var g = function() {
								!s(i) || i && !e.$eval(i) || b()
							}, j = ++p;
							d ? (a(d, !0).then(function(a) {
								if (j === p) {
									var b = e.$new();
									k.template = a, a = l(b, function(a) {
										q(), c.enter(a, null, f).then(g)
									}), m = b, o = a, m.$emit("$includeContentLoaded", d), e.$eval(h)
								}
							}, function() {
								j === p && (q(), e.$emit("$includeContentError", d))
							}), e.$emit("$includeContentRequested", d)) : (q(), k.template = null)
						})
					}
				}
			}
		}],
		zf = ["$compile", function(a) {
			return {
				restrict: "ECA",
				priority: -400,
				require: "ngInclude",
				link: function(d, e, f, g) {
					/SVG/.test(e[0].toString()) ? (e.empty(), a(jb(g.template, b).childNodes)(d, function(a) {
						e.append(a)
					}, c, c, e)) : (e.html(g.template), a(e.contents())(d))
				}
			}
		}],
		Af = ad({
			priority: 450,
			compile: function() {
				return {
					pre: function(a, b, c) {
						a.$eval(c.ngInit)
					}
				}
			}
		}),
		Bf = ad({
			terminal: !0,
			priority: 1e3
		}),
		Cf = ["$locale", "$interpolate", function(a, b) {
			var c = /{}/g;
			return {
				restrict: "EA",
				link: function(d, e, g) {
					var h = g.count,
						i = g.$attr.when && e.attr(g.$attr.when),
						j = g.offset || 0,
						k = d.$eval(i) || {}, l = {}, m = b.startSymbol(),
						n = b.endSymbol(),
						o = /^when(Minus)?(.+)$/;
					f(g, function(a, b) {
						o.test(b) && (k[qd(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
					}), f(k, function(a, d) {
						l[d] = b(a.replace(c, m + h + "-" + j + n))
					}), d.$watch(function() {
						var b = parseFloat(d.$eval(h));
						return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d))
					}, function(a) {
						e.text(a)
					})
				}
			}
		}],
		Df = ["$parse", "$animate", function(a, g) {
			var h = d("ngRepeat"),
				i = function(a, b, c, d, e, f, g) {
					a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b))
				};
			return {
				restrict: "A",
				multiElement: !0,
				transclude: "element",
				priority: 1e3,
				terminal: !0,
				$$tlb: !0,
				compile: function(d, j) {
					var k = j.ngRepeat,
						l = b.createComment(" end ngRepeat: " + k + " "),
						m = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
					if (!m) throw h("iexp", k);
					var n = m[1],
						o = m[2],
						p = m[3],
						q = m[4],
						m = n.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
					if (!m) throw h("iidexp", n);
					var r = m[3] || m[1],
						s = m[2];
					if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(p))) throw h("badident", p);
					var t, u, v, w, x = {
						$id: Db
					};
					return q ? t = a(q) : (v = function(a, b) {
						return Db(b)
					}, w = function(a) {
						return a
					}),
					function(a, b, d, j, m) {
						t && (u = function(b, c, d) {
							return s && (x[s] = b), x[r] = c, x.$index = d, t(a, x)
						});
						var n = eb();
						a.$watchCollection(o, function(d) {
							var j, o, q, t, x, y, z, A, B, C, D = b[0],
								E = eb();
							if (p && (a[p] = d), e(d)) A = d, o = u || v;
							else {
								o = u || w, A = [];
								for (C in d) d.hasOwnProperty(C) && "$" != C.charAt(0) && A.push(C);
								A.sort()
							}
							for (t = A.length, C = Array(t), j = 0; t > j; j++) if (x = d === A ? j : A[j], y = d[x], z = o(x, y, j), n[z]) B = n[z], delete n[z], E[z] = B, C[j] = B;
							else {
								if (E[z]) throw f(C, function(a) {
									a && a.scope && (n[a.id] = a)
								}), h("dupes", k, z, M(y));
								C[j] = {
									id: z,
									scope: c,
									clone: c
								}, E[z] = !0
							}
							for (q in n) {
								if (B = n[q], z = db(B.clone), g.leave(z), z[0].parentNode) for (j = 0, o = z.length; o > j; j++) z[j].$$NG_REMOVED = !0;
								B.scope.$destroy()
							}
							for (j = 0; t > j; j++) if (x = d === A ? j : A[j], y = d[x], B = C[j], B.scope) {
								q = D;
								do q = q.nextSibling;
								while (q && q.$$NG_REMOVED);
								B.clone[0] != q && g.move(db(B.clone), null, md(D)), D = B.clone[B.clone.length - 1], i(B.scope, j, r, y, s, x, t)
							} else m(function(a, b) {
								B.scope = b;
								var c = l.cloneNode(!1);
								a[a.length++] = c, g.enter(a, null, md(D)), D = c, B.clone = a, E[B.id] = B, i(B.scope, j, r, y, s, x, t)
							});
							n = E
						})
					}
				}
			}
		}],
		Ef = ["$animate", function(a) {
			return {
				restrict: "A",
				multiElement: !0,
				link: function(b, c, d) {
					b.$watch(d.ngShow, function(b) {
						a[b ? "removeClass" : "addClass"](c, "ng-hide", {
							tempClasses: "ng-hide-animate"
						})
					})
				}
			}
		}],
		Ff = ["$animate", function(a) {
			return {
				restrict: "A",
				multiElement: !0,
				link: function(b, c, d) {
					b.$watch(d.ngHide, function(b) {
						a[b ? "addClass" : "removeClass"](c, "ng-hide", {
							tempClasses: "ng-hide-animate"
						})
					})
				}
			}
		}],
		Gf = ad(function(a, b, c) {
			a.$watch(c.ngStyle, function(a, c) {
				c && a !== c && f(c, function(a, c) {
					b.css(c, "")
				}), a && b.css(a)
			}, !0)
		}),
		Hf = ["$animate", function(a) {
			return {
				restrict: "EA",
				require: "ngSwitch",
				controller: ["$scope", function() {
					this.cases = {}
				}],
				link: function(c, d, e, g) {
					var h = [],
						i = [],
						j = [],
						k = [],
						l = function(a, b) {
							return function() {
								a.splice(b, 1)
							}
						};
					c.$watch(e.ngSwitch || e.on, function(c) {
						var d, e;
						for (d = 0, e = j.length; e > d; ++d) a.cancel(j[d]);
						for (d = j.length = 0, e = k.length; e > d; ++d) {
							var m = db(i[d].clone);
							k[d].$destroy(), (j[d] = a.leave(m)).then(l(j, d))
						}
						i.length = 0, k.length = 0, (h = g.cases["!" + c] || g.cases["?"]) && f(h, function(c) {
							c.transclude(function(d, e) {
								k.push(e);
								var f = c.element;
								d[d.length++] = b.createComment(" end ngSwitchWhen: "), i.push({
									clone: d
								}), a.enter(d, f.parent(), f)
							})
						})
					})
				}
			}
		}],
		If = ad({
			transclude: "element",
			priority: 1200,
			require: "^ngSwitch",
			multiElement: !0,
			link: function(a, b, c, d, e) {
				d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
					transclude: e,
					element: b
				})
			}
		}),
		Jf = ad({
			transclude: "element",
			priority: 1200,
			require: "^ngSwitch",
			multiElement: !0,
			link: function(a, b, c, d, e) {
				d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
					transclude: e,
					element: b
				})
			}
		}),
		Kf = ad({
			restrict: "EAC",
			link: function(a, b, c, e, f) {
				if (!f) throw d("ngTransclude")("orphan", O(b));
				f(function(a) {
					b.empty(), b.append(a)
				})
			}
		}),
		Lf = ["$templateCache", function(a) {
			return {
				restrict: "E",
				terminal: !0,
				compile: function(b, c) {
					"text/ng-template" == c.type && a.put(c.id, b[0].text)
				}
			}
		}],
		Mf = d("ngOptions"),
		Nf = q({
			restrict: "A",
			terminal: !0
		}),
		Of = ["$compile", "$parse", function(a, d) {
			var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
				h = {
					$setViewValue: o
				};
			return {
				restrict: "E",
				require: ["select", "?ngModel"],
				controller: ["$element", "$scope", "$attrs", function(a, b, c) {
					var d, e = this,
						f = {}, g = h;
					e.databound = c.ngModel, e.init = function(a, b, c) {
						g = a, d = c
					}, e.addOption = function(b, c) {
						bb(b, '"option value"'), f[b] = !0, g.$viewValue == b && (a.val(b), d.parent() && d.remove()), c && c[0].hasAttribute("selected") && (c[0].selected = !0)
					}, e.removeOption = function(a) {
						this.hasOption(a) && (delete f[a], g.$viewValue == a && this.renderUnknownOption(a))
					}, e.renderUnknownOption = function(b) {
						b = "? " + Db(b) + " ?", d.val(b), a.prepend(d), a.val(b), d.prop("selected", !0)
					}, e.hasOption = function(a) {
						return f.hasOwnProperty(a)
					}, b.$on("$destroy", function() {
						e.renderUnknownOption = o
					})
				}],
				link: function(h, i, j, k) {
					function l(a, b, c, d) {
						c.$render = function() {
							var a = c.$viewValue;
							d.hasOption(a) ? (y.parent() && y.remove(), b.val(a), "" === a && p.prop("selected", !0)) : r(a) && p ? b.val("") : d.renderUnknownOption(a)
						}, b.on("change", function() {
							a.$apply(function() {
								y.parent() && y.remove(), c.$setViewValue(b.val())
							})
						})
					}
					function m(a, b, c) {
						var d;
						c.$render = function() {
							var a = new Eb(c.$viewValue);
							f(b.find("option"), function(b) {
								b.selected = s(a.get(b.value))
							})
						}, a.$watch(function() {
							I(d, c.$viewValue) || (d = H(c.$viewValue), c.$render())
						}), b.on("change", function() {
							a.$apply(function() {
								var a = [];
								f(b.find("option"), function(b) {
									b.selected && a.push(b.value)
								}), c.$setViewValue(a)
							})
						})
					}
					function n(b, h, i) {
						function j(a, c, d) {
							return H[y] = d, B && (H[B] = c), a(b, H)
						}
						function k(a) {
							var b;
							if (q) if (F && Bd(a)) {
								b = new Eb([]);
								for (var c = 0; c < a.length; c++) b.put(j(F, null, a[c]), !0)
							} else b = new Eb(a);
							else F && (a = j(F, null, a));
							return function(c, d) {
								var e;
								return e = F ? F : A ? A : D, q ? s(b.remove(j(e, c, d))) : a == j(e, c, d)
							}
						}
						function l() {
							v || (b.$$postDigest(n), v = !0)
						}
						function m(a, b, c) {
							a[b] = a[b] || 0, a[b] += c ? 1 : -1
						}
						function n() {
							v = !1;
							var a, c, d, e, l, n = {
								"": []
							}, p = [""];
							d = i.$viewValue, e = E(b) || [];
							var t, y, z, A, D, F = B ? g(e) : e,
								H = {};
							A = k(d), l = !1;
							var I;
							for (D = 0; z = F.length, z > D; D++) t = D, B && (t = F[D], "$" === t.charAt(0)) || (y = e[t], a = j(C, t, y) || "", (c = n[a]) || (c = n[a] = [], p.push(a)), a = A(t, y), l = l || a, t = j(r, t, y), t = s(t) ? t : "", c.push({
								id: B ? F[D] : D,
								label: t,
								selected: a
							}));
							for (q || (u || null === d ? n[""].unshift({
								id: "",
								label: "",
								selected: !l
							}) : l || n[""].unshift({
								id: "?",
								label: "",
								selected: !0
							})), A = 0, F = p.length; F > A; A++) {
								for (a = p[A], c = n[a], G.length <= A ? (d = {
									element: x.clone().attr("label", a),
									label: c.label
								}, e = [d], G.push(e), h.append(d.element)) : (e = G[A], d = e[0], d.label != a && d.element.attr("label", d.label = a)), t = null, D = 0, z = c.length; z > D; D++) a = c[D], (l = e[D + 1]) ? (t = l.element, l.label !== a.label && (m(H, l.label, !1), m(H, a.label, !0), t.text(l.label = a.label)), l.id !== a.id && t.val(l.id = a.id), t[0].selected !== a.selected && (t.prop("selected", l.selected = a.selected), ld && t.prop("selected", l.selected))) : ("" === a.id && u ? I = u : (I = w.clone()).val(a.id).prop("selected", a.selected).attr("selected", a.selected).text(a.label), e.push(l = {
									element: I,
									label: a.label,
									id: a.id,
									selected: a.selected
								}), m(H, a.label, !0), t ? t.after(I) : d.element.append(I), t = I);
								for (D++; e.length > D;) a = e.pop(), m(H, a.label, !1), a.element.remove();
								f(H, function(a, b) {
									a > 0 ? o.addOption(b) : 0 > a && o.removeOption(b)
								})
							}
							for (; G.length > A;) G.pop()[0].element.remove()
						}
						var p;
						if (!(p = t.match(e))) throw Mf("iexp", t, O(h));
						var r = d(p[2] || p[1]),
							y = p[4] || p[6],
							z = / as /.test(p[0]) && p[1],
							A = z ? d(z) : null,
							B = p[5],
							C = d(p[3] || ""),
							D = d(p[2] ? p[1] : y),
							E = d(p[7]),
							F = p[8] ? d(p[8]) : null,
							G = [
								[{
									element: h,
									label: ""
								}]
							],
							H = {};
						u && (a(u)(b), u.removeClass("ng-scope"), u.remove()), h.empty(), h.on("change", function() {
							b.$apply(function() {
								var a, d = E(b) || [];
								if (q) a = [], f(h.val(), function(b) {
									a.push("?" === b ? c : "" === b ? null : j(A ? A : D, b, d[b]))
								});
								else {
									var e = h.val();
									a = "?" === e ? c : "" === e ? null : j(A ? A : D, e, d[e])
								}
								i.$setViewValue(a), n()
							})
						}), i.$render = n, b.$watchCollection(E, l), b.$watchCollection(function() {
							var a, c = E(b);
							if (c && Bd(c)) {
								a = Array(c.length);
								for (var d = 0, e = c.length; e > d; d++) a[d] = j(r, d, c[d])
							} else if (c) for (d in a = {}, c) c.hasOwnProperty(d) && (a[d] = j(r, d, c[d]));
							return a
						}, l), q && b.$watchCollection(function() {
							return i.$modelValue
						}, l)
					}
					if (k[1]) {
						var o = k[0];
						k = k[1];
						var p, q = j.multiple,
							t = j.ngOptions,
							u = !1,
							v = !1,
							w = md(b.createElement("option")),
							x = md(b.createElement("optgroup")),
							y = w.clone();
						j = 0;
						for (var z = i.children(), A = z.length; A > j; j++) if ("" === z[j].value) {
							p = u = z.eq(j);
							break
						}
						o.init(k, u, y), q && (k.$isEmpty = function(a) {
							return !a || 0 === a.length
						}), t ? n(h, i, k) : q ? m(h, i, k) : l(h, i, k, o)
					}
				}
			}
		}],
		Pf = ["$interpolate", function(a) {
			var b = {
				addOption: o,
				removeOption: o
			};
			return {
				restrict: "E",
				priority: 100,
				compile: function(c, d) {
					if (r(d.value)) {
						var e = a(c.text(), !0);
						e || d.$set("value", c.text())
					}
					return function(a, c, d) {
						var f = c.parent(),
							g = f.data("$selectController") || f.parent().data("$selectController");
						g && g.databound || (g = b), e ? a.$watch(e, function(a, b) {
							d.$set("value", a), b !== a && g.removeOption(b), g.addOption(a, c)
						}) : g.addOption(d.value, c), c.on("$destroy", function() {
							g.removeOption(d.value)
						})
					}
				}
			}
		}],
		Qf = q({
			restrict: "E",
			terminal: !1
		});
	a.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ($(), gb(yd), md(b).ready(function() {
		V(b, W)
	}))
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'),
function(a, b) {
	"use strict";

	function c(a, c, d) {
		return {
			restrict: "ECA",
			terminal: !0,
			priority: 400,
			transclude: "element",
			link: function(e, f, g, h, i) {
				function j() {
					n && (d.cancel(n), n = null), l && (l.$destroy(), l = null), m && (n = d.leave(m), n.then(function() {
						n = null
					}), m = null)
				}
				function k() {
					var g = a.current && a.current.locals;
					if (b.isDefined(g && g.$template)) {
						var g = e.$new(),
							h = a.current;
						m = i(g, function(a) {
							d.enter(a, null, m || f).then(function() {
								!b.isDefined(o) || o && !e.$eval(o) || c()
							}), j()
						}), l = h.scope = g, l.$emit("$viewContentLoaded"), l.$eval(p)
					} else j()
				}
				var l, m, n, o = g.autoscroll,
					p = g.onload || "";
				e.$on("$routeChangeSuccess", k), k()
			}
		}
	}
	function d(a, b, c) {
		return {
			restrict: "ECA",
			priority: -400,
			link: function(d, e) {
				var f = c.current,
					g = f.locals;
				e.html(g.$template);
				var h = a(e.contents());
				f.controller && (g.$scope = d, g = b(f.controller, g), f.controllerAs && (d[f.controllerAs] = g), e.data("$ngControllerController", g), e.children().data("$ngControllerController", g)), h(d)
			}
		}
	}
	a = b.module("ngRoute", ["ng"]).provider("$route", function() {
		function a(a, c) {
			return b.extend(new(b.extend(function() {}, {
				prototype: a
			})), c)
		}
		function c(a, b) {
			var c = b.caseInsensitiveMatch,
				d = {
					originalPath: a,
					regexp: a
				}, e = d.keys = [];
			return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, b, c, d) {
				return a = "?" === d ? d : null, d = "*" === d ? d : null, e.push({
					name: c,
					optional: !! a
				}), b = b || "", "" + (a ? "" : b) + "(?:" + (a ? b : "") + (d && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
			}).replace(/([\/$\*])/g, "\\$1"), d.regexp = new RegExp("^" + a + "$", c ? "i" : ""), d
		}
		var d = {};
		this.when = function(a, e) {
			if (d[a] = b.extend({
				reloadOnSearch: !0
			}, e, a && c(a, e)), a) {
				var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
				d[f] = b.extend({
					redirectTo: a
				}, c(f, e))
			}
			return this
		}, this.otherwise = function(a) {
			return "string" == typeof a && (a = {
				redirectTo: a
			}), this.when(null, a), this
		}, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(c, f, g, h, i, j, k) {
			function l(a) {
				var d = s.current;
				(q = (p = n()) && d && p.$$route === d.$$route && b.equals(p.pathParams, d.pathParams) && !p.reloadOnSearch && !r) || !d && !p || c.$broadcast("$routeChangeStart", p, d).defaultPrevented && a && a.preventDefault()
			}
			function m() {
				var a = s.current,
					d = p;
				q ? (a.params = d.params, b.copy(a.params, g), c.$broadcast("$routeUpdate", a)) : (d || a) && (r = !1, (s.current = d) && d.redirectTo && (b.isString(d.redirectTo) ? f.path(o(d.redirectTo, d.params)).search(d.params).replace() : f.url(d.redirectTo(d.pathParams, f.path(), f.search())).replace()), h.when(d).then(function() {
					if (d) {
						var a, c, e = b.extend({}, d.resolve);
						return b.forEach(e, function(a, c) {
							e[c] = b.isString(a) ? i.get(a) : i.invoke(a, null, null, c)
						}), b.isDefined(a = d.template) ? b.isFunction(a) && (a = a(d.params)) : b.isDefined(c = d.templateUrl) && (b.isFunction(c) && (c = c(d.params)), c = k.getTrustedResourceUrl(c), b.isDefined(c) && (d.loadedTemplateUrl = c, a = j(c))), b.isDefined(a) && (e.$template = a), h.all(e)
					}
				}).then(function(e) {
					d == s.current && (d && (d.locals = e, b.copy(d.params, g)), c.$broadcast("$routeChangeSuccess", d, a))
				}, function(b) {
					d == s.current && c.$broadcast("$routeChangeError", d, a, b)
				}))
			}
			function n() {
				var c, e;
				return b.forEach(d, function(d) {
					var g;
					if (g = !e) {
						var h = f.path();
						g = d.keys;
						var i = {};
						if (d.regexp) if (h = d.regexp.exec(h)) {
							for (var j = 1, k = h.length; k > j; ++j) {
								var l = g[j - 1],
									m = h[j];
								l && m && (i[l.name] = m)
							}
							g = i
						} else g = null;
						else g = null;
						g = c = g
					}
					g && (e = a(d, {
						params: b.extend({}, f.search(), c),
						pathParams: c
					}), e.$$route = d)
				}), e || d[null] && a(d[null], {
					params: {},
					pathParams: {}
				})
			}
			function o(a, c) {
				var d = [];
				return b.forEach((a || "").split(":"), function(a, b) {
					if (0 === b) d.push(a);
					else {
						var e = a.match(/(\w+)(.*)/),
							f = e[1];
						d.push(c[f]), d.push(e[2] || ""), delete c[f]
					}
				}), d.join("")
			}
			var p, q, r = !1,
				s = {
					routes: d,
					reload: function() {
						r = !0, c.$evalAsync(function() {
							l(), m()
						})
					},
					updateParams: function(a) {
						if (!this.current || !this.current.$$route) throw e("norout");
						var c = {}, d = this;
						b.forEach(Object.keys(a), function(b) {
							d.current.pathParams[b] || (c[b] = a[b])
						}), a = b.extend({}, this.current.params, a), f.path(o(this.current.$$route.originalPath, a)), f.search(b.extend({}, f.search(), c))
					}
				};
			return c.$on("$locationChangeStart", l), c.$on("$locationChangeSuccess", m), s
		}]
	});
	var e = b.$$minErr("ngRoute");
	a.provider("$routeParams", function() {
		this.$get = function() {
			return {}
		}
	}), a.directive("ngView", c), a.directive("ngView", d), c.$inject = ["$route", "$anchorScroll", "$animate"], d.$inject = ["$compile", "$controller", "$route"]
}(window, window.angular),
function(a, b, c) {
	"use strict";

	function d(a) {
		var c = [];
		return i(c, b.noop).chars(a), c.join("")
	}
	function e(a) {
		var b = {};
		a = a.split(",");
		var c;
		for (c = 0; c < a.length; c++) b[a[c]] = !0;
		return b
	}
	function f(a, c) {
		function d(a, d, f, h) {
			if (d = b.lowercase(d), w[d]) for (; s.last() && x[s.last()];) e("", s.last());
			v[d] && s.last() == d && e("", d), (h = u[d] || !! h) || s.push(d);
			var i = {};
			f.replace(m, function(a, b, c, d, e) {
				i[b] = g(c || d || e || "")
			}), c.start && c.start(d, i, h)
		}
		function e(a, d) {
			var e, f = 0;
			if (d = b.lowercase(d)) for (f = s.length - 1; f >= 0 && s[f] != d; f--);
			if (f >= 0) {
				for (e = s.length - 1; e >= f; e--) c.end && c.end(s[e]);
				s.length = f
			}
		}
		"string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
		var f, h, i, s = [],
			t = a;
		for (s.last = function() {
			return s[s.length - 1]
		}; a;) {
			if (i = "", h = !0, s.last() && y[s.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + s.last() + "[^>]*>", "i"), function(a, b) {
				return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), ""
			}), e("", s.last())) : (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), a = a.substring(f + 3), h = !1)) : q.test(a) ? (f = a.match(q)) && (a = a.replace(f[0], ""), h = !1) : o.test(a) ? (f = a.match(l)) && (a = a.substring(f[0].length), f[0].replace(l, e), h = !1) : n.test(a) && ((f = a.match(k)) ? (f[4] && (a = a.substring(f[0].length), f[0].replace(k, d)), h = !1) : (i += "<", a = a.substring(1))), h && (f = a.indexOf("<"), i += 0 > f ? a : a.substring(0, f), a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(i)))), a == t) throw j("badparse", a);
			t = a
		}
		e()
	}
	function g(a) {
		if (!a) return "";
		var b = D.exec(a);
		a = b[1];
		var c = b[3];
		return (b = b[2]) && (C.innerHTML = b.replace(/</g, "&lt;"), b = "textContent" in C ? C.textContent : C.innerText), a + b + c
	}
	function h(a) {
		return a.replace(/&/g, "&amp;").replace(s, function(a) {
			var b = a.charCodeAt(0);
			return a = a.charCodeAt(1), "&#" + (1024 * (b - 55296) + (a - 56320) + 65536) + ";"
		}).replace(t, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	function i(a, c) {
		var d = !1,
			e = b.bind(a, a.push);
		return {
			start: function(a, f, g) {
				a = b.lowercase(a), !d && y[a] && (d = a), d || !0 !== z[a] || (e("<"), e(a), b.forEach(f, function(d, f) {
					var g = b.lowercase(f),
						i = "img" === a && "src" === g || "background" === g;
					!0 !== B[g] || !0 === A[g] && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'))
				}), e(g ? "/>" : ">"))
			},
			end: function(a) {
				a = b.lowercase(a), d || !0 !== z[a] || (e("</"), e(a), e(">")), a == d && (d = !1)
			},
			chars: function(a) {
				d || e(h(a))
			}
		}
	}
	var j = b.$$minErr("$sanitize"),
		k = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
		l = /^<\/\s*([\w:-]+)[^>]*>/,
		m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		n = /^</,
		o = /^<\//,
		p = /\x3c!--(.*?)--\x3e/g,
		q = /<!DOCTYPE([^>]*?)>/i,
		r = /<!\[CDATA\[(.*?)]]\x3e/g,
		s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
		t = /([^\#-~| |!])/g,
		u = e("area,br,col,hr,img,wbr");
	a = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), c = e("rp,rt");
	var v = b.extend({}, c, a),
		w = b.extend({}, a, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
		x = b.extend({}, c, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
		y = e("script,style"),
		z = b.extend({}, u, w, x, v),
		A = e("background,cite,href,longdesc,src,usemap"),
		B = b.extend({}, A, e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
		C = document.createElement("pre"),
		D = /^(\s*)([\s\S]*?)(\s*)$/;
	b.module("ngSanitize", []).provider("$sanitize", function() {
		this.$get = ["$$sanitizeUri", function(a) {
			return function(b) {
				var c = [];
				return f(b, i(c, function(b, c) {
					return !/^unsafe/.test(a(b, c))
				})), c.join("")
			}
		}]
	}), b.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
		var c = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,
			e = /^mailto:/;
		return function(f, g) {
			function h(a) {
				a && n.push(d(a))
			}
			function i(a, c) {
				n.push("<a "), b.isDefined(g) && (n.push('target="'), n.push(g), n.push('" ')), n.push('href="'), n.push(a), n.push('">'), h(c), n.push("</a>")
			}
			if (!f) return f;
			for (var j, k, l, m = f, n = []; j = m.match(c);) k = j[0], j[2] == j[3] && (k = "mailto:" + k), l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
			return h(m), a(n.join(""))
		}
	}])
}(window, window.angular),
function(a) {
	a.fn.extend({
		addTemporaryClass: function(b, c) {
			var d = this;
			return setTimeout(function() {
				d.removeClass(b)
			}, c), this.each(function() {
				a(this).addClass(b)
			})
		}
	})
}(jQuery),
function(a) {
	a.fn.drags = function(b) {
		if (b = a.extend({
			handle: "",
			cursor: "move"
		}, b), "" === b.handle) var c = this;
		else var c = this.find(b.handle);
		return c.css("cursor", b.cursor).on("mousedown", function(c) {
			if ("" === b.handle) var d = a(this).addClass("draggable");
			else var d = a(this).addClass("active-handle").parent().addClass("draggable");
			var e = d.css("z-index"),
				f = d.outerHeight(),
				g = d.outerWidth(),
				h = d.offset().top + f - c.pageY,
				i = d.offset().left + g - c.pageX;
			d.css("z-index", 1e3).parents().on("mousemove", function(b) {
				a(".draggable").offset({
					top: b.pageY + h - f,
					left: b.pageX + i - g
				}).on("mouseup", function() {
					a(this).removeClass("draggable").css("z-index", e)
				})
			}), c.preventDefault()
		}).on("mouseup", function() {
			"" === b.handle ? a(this).removeClass("draggable") : a(this).removeClass("active-handle").parent().removeClass("draggable")
		})
	}
}(jQuery),
function() {
	for (var a, b = function() {}, c = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], d = c.length, e = window.console = window.console || {}; d--;) a = c[d], e[a] || (e[a] = b)
}(), $(window).resize(function() {
	this.resizeTO && clearTimeout(this.resizeTO), this.resizeTO = setTimeout(function() {
		$(this).trigger("resizeEnd")
	}, 50)
});
var CryptoJS = CryptoJS || function(a, b) {
		var c = {}, d = c.lib = {}, e = function() {}, f = d.Base = {
			extend: function(a) {
				e.prototype = this;
				var b = new e;
				return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
					b.$super.init.apply(this, arguments)
				}), b.init.prototype = b, b.$super = this, b
			},
			create: function() {
				var a = this.extend();
				return a.init.apply(a, arguments), a
			},
			init: function() {},
			mixIn: function(a) {
				for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
				a.hasOwnProperty("toString") && (this.toString = a.toString)
			},
			clone: function() {
				return this.init.prototype.extend(this)
			}
		}, g = d.WordArray = f.extend({
			init: function(a, c) {
				a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
			},
			toString: function(a) {
				return (a || i).stringify(this)
			},
			concat: function(a) {
				var b = this.words,
					c = a.words,
					d = this.sigBytes;
				if (a = a.sigBytes, this.clamp(), d % 4) for (var e = 0; a > e; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
				else if (65535 < c.length) for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2];
				else b.push.apply(b, c);
				return this.sigBytes += a, this
			},
			clamp: function() {
				var b = this.words,
					c = this.sigBytes;
				b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
			},
			clone: function() {
				var a = f.clone.call(this);
				return a.words = this.words.slice(0), a
			},
			random: function(b) {
				for (var c = [], d = 0; b > d; d += 4) c.push(4294967296 * a.random() | 0);
				return new g.init(c, b)
			}
		}),
			h = c.enc = {}, i = h.Hex = {
				stringify: function(a) {
					var b = a.words;
					a = a.sigBytes;
					for (var c = [], d = 0; a > d; d++) {
						var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
						c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
					}
					return c.join("")
				},
				parse: function(a) {
					for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
					return new g.init(c, b / 2)
				}
			}, j = h.Latin1 = {
				stringify: function(a) {
					var b = a.words;
					a = a.sigBytes;
					for (var c = [], d = 0; a > d; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
					return c.join("")
				},
				parse: function(a) {
					for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
					return new g.init(c, b)
				}
			}, k = h.Utf8 = {
				stringify: function(a) {
					try {
						return decodeURIComponent(escape(j.stringify(a)))
					} catch (b) {
						throw Error("Malformed UTF-8 data")
					}
				},
				parse: function(a) {
					return j.parse(unescape(encodeURIComponent(a)))
				}
			}, l = d.BufferedBlockAlgorithm = f.extend({
				reset: function() {
					this._data = new g.init, this._nDataBytes = 0
				},
				_append: function(a) {
					"string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
				},
				_process: function(b) {
					var c = this._data,
						d = c.words,
						e = c.sigBytes,
						f = this.blockSize,
						h = e / (4 * f),
						h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
					if (b = h * f, e = a.min(4 * b, e), b) {
						for (var i = 0; b > i; i += f) this._doProcessBlock(d, i);
						i = d.splice(0, b), c.sigBytes -= e
					}
					return new g.init(i, e)
				},
				clone: function() {
					var a = f.clone.call(this);
					return a._data = this._data.clone(), a
				},
				_minBufferSize: 0
			});
		d.Hasher = l.extend({
			cfg: f.extend(),
			init: function(a) {
				this.cfg = this.cfg.extend(a), this.reset()
			},
			reset: function() {
				l.reset.call(this), this._doReset()
			},
			update: function(a) {
				return this._append(a), this._process(), this
			},
			finalize: function(a) {
				return a && this._append(a), this._doFinalize()
			},
			blockSize: 16,
			_createHelper: function(a) {
				return function(b, c) {
					return new a.init(c).finalize(b)
				}
			},
			_createHmacHelper: function(a) {
				return function(b, c) {
					return new m.HMAC.init(a, c).finalize(b)
				}
			}
		});
		var m = c.algo = {};
		return c
	}(Math);
! function(a) {
	function b(a, b, c, d, e, f, g) {
		return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b
	}
	function c(a, b, c, d, e, f, g) {
		return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b
	}
	function d(a, b, c, d, e, f, g) {
		return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b
	}
	function e(a, b, c, d, e, f, g) {
		return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b
	}
	for (var f = CryptoJS, g = f.lib, h = g.WordArray, i = g.Hasher, g = f.algo, j = [], k = 0; 64 > k; k++) j[k] = 4294967296 * a.abs(a.sin(k + 1)) | 0;
	g = g.MD5 = i.extend({
		_doReset: function() {
			this._hash = new h.init([1732584193, 4023233417, 2562383102, 271733878])
		},
		_doProcessBlock: function(a, f) {
			for (var g = 0; 16 > g; g++) {
				var h = f + g,
					i = a[h];
				a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
			}
			var g = this._hash.words,
				h = a[f + 0],
				i = a[f + 1],
				k = a[f + 2],
				l = a[f + 3],
				m = a[f + 4],
				n = a[f + 5],
				o = a[f + 6],
				p = a[f + 7],
				q = a[f + 8],
				r = a[f + 9],
				s = a[f + 10],
				t = a[f + 11],
				u = a[f + 12],
				v = a[f + 13],
				w = a[f + 14],
				x = a[f + 15],
				y = g[0],
				z = g[1],
				A = g[2],
				B = g[3],
				y = b(y, z, A, B, h, 7, j[0]),
				B = b(B, y, z, A, i, 12, j[1]),
				A = b(A, B, y, z, k, 17, j[2]),
				z = b(z, A, B, y, l, 22, j[3]),
				y = b(y, z, A, B, m, 7, j[4]),
				B = b(B, y, z, A, n, 12, j[5]),
				A = b(A, B, y, z, o, 17, j[6]),
				z = b(z, A, B, y, p, 22, j[7]),
				y = b(y, z, A, B, q, 7, j[8]),
				B = b(B, y, z, A, r, 12, j[9]),
				A = b(A, B, y, z, s, 17, j[10]),
				z = b(z, A, B, y, t, 22, j[11]),
				y = b(y, z, A, B, u, 7, j[12]),
				B = b(B, y, z, A, v, 12, j[13]),
				A = b(A, B, y, z, w, 17, j[14]),
				z = b(z, A, B, y, x, 22, j[15]),
				y = c(y, z, A, B, i, 5, j[16]),
				B = c(B, y, z, A, o, 9, j[17]),
				A = c(A, B, y, z, t, 14, j[18]),
				z = c(z, A, B, y, h, 20, j[19]),
				y = c(y, z, A, B, n, 5, j[20]),
				B = c(B, y, z, A, s, 9, j[21]),
				A = c(A, B, y, z, x, 14, j[22]),
				z = c(z, A, B, y, m, 20, j[23]),
				y = c(y, z, A, B, r, 5, j[24]),
				B = c(B, y, z, A, w, 9, j[25]),
				A = c(A, B, y, z, l, 14, j[26]),
				z = c(z, A, B, y, q, 20, j[27]),
				y = c(y, z, A, B, v, 5, j[28]),
				B = c(B, y, z, A, k, 9, j[29]),
				A = c(A, B, y, z, p, 14, j[30]),
				z = c(z, A, B, y, u, 20, j[31]),
				y = d(y, z, A, B, n, 4, j[32]),
				B = d(B, y, z, A, q, 11, j[33]),
				A = d(A, B, y, z, t, 16, j[34]),
				z = d(z, A, B, y, w, 23, j[35]),
				y = d(y, z, A, B, i, 4, j[36]),
				B = d(B, y, z, A, m, 11, j[37]),
				A = d(A, B, y, z, p, 16, j[38]),
				z = d(z, A, B, y, s, 23, j[39]),
				y = d(y, z, A, B, v, 4, j[40]),
				B = d(B, y, z, A, h, 11, j[41]),
				A = d(A, B, y, z, l, 16, j[42]),
				z = d(z, A, B, y, o, 23, j[43]),
				y = d(y, z, A, B, r, 4, j[44]),
				B = d(B, y, z, A, u, 11, j[45]),
				A = d(A, B, y, z, x, 16, j[46]),
				z = d(z, A, B, y, k, 23, j[47]),
				y = e(y, z, A, B, h, 6, j[48]),
				B = e(B, y, z, A, p, 10, j[49]),
				A = e(A, B, y, z, w, 15, j[50]),
				z = e(z, A, B, y, n, 21, j[51]),
				y = e(y, z, A, B, u, 6, j[52]),
				B = e(B, y, z, A, l, 10, j[53]),
				A = e(A, B, y, z, s, 15, j[54]),
				z = e(z, A, B, y, i, 21, j[55]),
				y = e(y, z, A, B, q, 6, j[56]),
				B = e(B, y, z, A, x, 10, j[57]),
				A = e(A, B, y, z, o, 15, j[58]),
				z = e(z, A, B, y, v, 21, j[59]),
				y = e(y, z, A, B, m, 6, j[60]),
				B = e(B, y, z, A, t, 10, j[61]),
				A = e(A, B, y, z, k, 15, j[62]),
				z = e(z, A, B, y, r, 21, j[63]);
			g[0] = g[0] + y | 0, g[1] = g[1] + z | 0, g[2] = g[2] + A | 0, g[3] = g[3] + B | 0
		},
		_doFinalize: function() {
			var b = this._data,
				c = b.words,
				d = 8 * this._nDataBytes,
				e = 8 * b.sigBytes;
			c[e >>> 5] |= 128 << 24 - e % 32;
			var f = a.floor(d / 4294967296);
			for (c[(e + 64 >>> 9 << 4) + 15] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), c[(e + 64 >>> 9 << 4) + 14] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), b.sigBytes = 4 * (c.length + 1), this._process(), b = this._hash, c = b.words, d = 0; 4 > d; d++) e = c[d], c[d] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
			return b
		},
		clone: function() {
			var a = i.clone.call(this);
			return a._hash = this._hash.clone(), a
		}
	}), f.MD5 = i._createHelper(g), f.HmacMD5 = i._createHmacHelper(g)
}(Math),
function(a) {
	a.fn.extend({
		resizeWindow: function(b, c, d, e) {
			if (d) {
				var f = null;
				f = void 0 != c.scope ? a(window).on("resize", function() {
					c.scope.$apply(e)
				}) : a(window).on("resize", e), b.on("remove", f.unbind)
			}
		},
		dynamicGrid: function(b) {
			var c = a(this),
				b = b || {}, d = void 0 == b.resize ? !0 : b.resize,
				e = function() {
					var a = c.width(),
						d = parseInt(b.width || 220),
						d = d >= a ? a - 10 : d,
						e = void 0 == b.margin || null == b.margin ? 2 : parseInt(b.margin),
						f = b.elements,
						g = parseInt(b.column || 0),
						h = 0 == g ? Math.max(Math.floor(a / (d + e)), 1) : g,
						i = void 0 == b.center ? !1 : b.center;
					i && f.length < h && (h = f.length);
					for (var j = i ? (a - (h * d + h * e)) / 2 : 0, k = [], l = 0; h > l; l++) k.push(0);
					for (var m = function(a) {
						for (var b = 0, c = 1; c < a.length; c++) a[c] < a[b] && (b = c);
						return b
					}, n = 0, l = 0; l < f.length; l++) {
						var o = m(k),
							p = e / 2;
						2 > p && (p = 2), f[l].style.margin = p + "px", f[l].style.top = k[o] + p + "px", f[l].style.left = (d + e) * o + j + "px", k[o] += f[l].clientHeight + e
					}
					n = Math.max.apply(Math, k), c.height(n)
				};
			e(), this.resizeWindow(c, b, d, e)
		},
		evenRows: function(b) {
			var c = a(this),
				b = b || {}, d = void 0 == b.resize ? !0 : b.resize,
				e = function() {
					var d = c.width() - 1,
						e = b.elements,
						f = b.element || "img",
						g = parseInt(b.height || 300),
						h = parseInt(b.margin || 0),
						i = [],
						j = 0,
						k = 0,
						l = 0,
						m = 0,
						n = e.length;
					e.each(function() {
						m++, j++;
						var b = a(this).find(f),
							c = a.isNumeric(b.data("width")) ? b.data("width") : 1,
							e = a.isNumeric(b.data("height")) ? b.data("height") : 1,
							o = a.isNumeric(c / e) ? c / e : 1,
							p = Math.ceil(g * o),
							q = 0,
							r = 0,
							s = 0,
							t = 0,
							u = null;
						if (k += p, l = k + 2 * h * j, i.push({
							element: a(this),
							width: p,
							ratio: o
						}), l >= d) {
							var v = l - d,
								w = null,
								x = null;
							q = j * h * 2, s = k / g, t = Math.floor((d - q) / s);
							for (var y = 0; y < i.length; y++) w = i[y].element.find(f), x = i[y].width / k * (d - q), r += x, w.width(x), w.height(t), w.css("margin", h + "px"), u = w;
							r + q > d && (v = r + q - d, u.width(u.width() - v)), u.width(100 == g ? u.width() - 4 : u.width() - 2), k = 0, j = 0, i = []
						} else if (n == m) {
							q = j * h * 2, s = k / g, t = Math.floor((l - q) / s);
							for (var y = 0; y < i.length; y++) {
								var w = i[y].element.find(f),
									x = i[y].width;
								w.width(x), w.height(t), w.css("margin", h + "px")
							}
						}
					})
				};
			e(), this.resizeWindow(c, b, d, e)
		}
	})
}(jQuery), ! function(a) {
	"undefined" != typeof module && module.exports ? module.exports = a : a(jQuery, window, document)
}(function(a) {
	! function(b) {
		var c = "function" == typeof define && define.amd,
			d = "undefined" != typeof module && module.exports,
			e = "https:" == document.location.protocol ? "https:" : "http:",
			f = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
		c || (d ? require("jquery-mousewheel")(a) : a.event.special.mousewheel || a("head").append(decodeURI("%3Cscript src=" + e + "//" + f + "%3E%3C/script%3E"))), b()
	}(function() {
		var b, c = "mCustomScrollbar",
			d = "mCS",
			e = ".mCustomScrollbar",
			f = {
				setTop: 0,
				setLeft: 0,
				axis: "y",
				scrollbarPosition: "inside",
				scrollInertia: 950,
				autoDraggerLength: !0,
				alwaysShowScrollbar: 0,
				snapOffset: 0,
				mouseWheel: {
					enable: !0,
					scrollAmount: "auto",
					axis: "y",
					deltaFactor: "auto",
					disableOver: ["select", "option", "keygen", "datalist", "textarea"]
				},
				scrollButtons: {
					scrollType: "stepless",
					scrollAmount: "auto"
				},
				keyboard: {
					enable: !0,
					scrollType: "stepless",
					scrollAmount: "auto"
				},
				contentTouchScroll: 25,
				documentTouchScroll: !0,
				advanced: {
					autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
					updateOnContentResize: !0,
					updateOnImageLoad: "auto",
					autoUpdateTimeout: 60
				},
				theme: "light",
				callbacks: {
					onTotalScrollOffset: 0,
					onTotalScrollBackOffset: 0,
					alwaysTriggerOffsets: !0
				}
			}, g = 0,
			h = {}, i = window.attachEvent && !window.addEventListener ? 1 : 0,
			j = !1,
			k = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
			l = {
				init: function(b) {
					var b = a.extend(!0, {}, f, b),
						c = m.call(this);
					if (b.live) {
						var i = b.liveSelector || this.selector || e,
							j = a(i);
						if ("off" === b.live) return void o(i);
						h[i] = setTimeout(function() {
							j.mCustomScrollbar(b), "once" === b.live && j.length && o(i)
						}, 500)
					} else o(i);
					return b.setWidth = b.set_width ? b.set_width : b.setWidth, b.setHeight = b.set_height ? b.set_height : b.setHeight, b.axis = b.horizontalScroll ? "x" : p(b.axis), b.scrollInertia = b.scrollInertia > 0 && b.scrollInertia < 17 ? 17 : b.scrollInertia, "object" != typeof b.mouseWheel && 1 == b.mouseWheel && (b.mouseWheel = {
						enable: !0,
						scrollAmount: "auto",
						axis: "y",
						preventDefault: !1,
						deltaFactor: "auto",
						normalizeDelta: !1,
						invert: !1
					}), b.mouseWheel.scrollAmount = b.mouseWheelPixels ? b.mouseWheelPixels : b.mouseWheel.scrollAmount, b.mouseWheel.normalizeDelta = b.advanced.normalizeMouseWheelDelta ? b.advanced.normalizeMouseWheelDelta : b.mouseWheel.normalizeDelta, b.scrollButtons.scrollType = q(b.scrollButtons.scrollType), n(b), a(c).each(function() {
						var c = a(this);
						if (!c.data(d)) {
							c.data(d, {
								idx: ++g,
								opt: b,
								scrollRatio: {
									y: null,
									x: null
								},
								overflowed: null,
								contentReset: {
									y: null,
									x: null
								},
								bindEvents: !1,
								tweenRunning: !1,
								sequential: {},
								langDir: c.css("direction"),
								cbOffsets: null,
								trigger: null,
								poll: {
									size: {
										o: 0,
										n: 0
									},
									img: {
										o: 0,
										n: 0
									},
									change: {
										o: 0,
										n: 0
									}
								}
							});
							var e = c.data(d),
								f = e.opt,
								h = c.data("mcs-axis"),
								i = c.data("mcs-scrollbar-position"),
								j = c.data("mcs-theme");
							h && (f.axis = h), i && (f.scrollbarPosition = i), j && (f.theme = j, n(f)), r.call(this), e && f.callbacks.onCreate && "function" == typeof f.callbacks.onCreate && f.callbacks.onCreate.call(this), a("#mCSB_" + e.idx + "_container img:not(." + k[2] + ")").addClass(k[2]), l.update.call(null, c)
						}
					})
				},
				update: function(b, c) {
					var e = b || m.call(this);
					return a(e).each(function() {
						var b = a(this);
						if (b.data(d)) {
							var e = b.data(d),
								f = e.opt,
								g = a("#mCSB_" + e.idx + "_container"),
								h = a("#mCSB_" + e.idx),
								i = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")];
							if (!g.length) return;
							e.tweenRunning && U(b), c && e && f.callbacks.onBeforeUpdate && "function" == typeof f.callbacks.onBeforeUpdate && f.callbacks.onBeforeUpdate.call(this), b.hasClass(k[3]) && b.removeClass(k[3]), b.hasClass(k[4]) && b.removeClass(k[4]), h.css("max-height", "none"), h.height() !== b.height() && h.css("max-height", b.height()), t.call(this), "y" === f.axis || f.advanced.autoExpandHorizontalScroll || g.css("width", s(g)), e.overflowed = y.call(this), C.call(this), f.autoDraggerLength && v.call(this), w.call(this), A.call(this);
							var j = [Math.abs(g[0].offsetTop), Math.abs(g[0].offsetLeft)];
							"x" !== f.axis && (e.overflowed[0] ? i[0].height() > i[0].parent().height() ? z.call(this) : (V(b, j[0].toString(), {
								dir: "y",
								dur: 0,
								overwrite: "none"
							}), e.contentReset.y = null) : (z.call(this), "y" === f.axis ? B.call(this) : "yx" === f.axis && e.overflowed[1] && V(b, j[1].toString(), {
								dir: "x",
								dur: 0,
								overwrite: "none"
							}))), "y" !== f.axis && (e.overflowed[1] ? i[1].width() > i[1].parent().width() ? z.call(this) : (V(b, j[1].toString(), {
								dir: "x",
								dur: 0,
								overwrite: "none"
							}), e.contentReset.x = null) : (z.call(this), "x" === f.axis ? B.call(this) : "yx" === f.axis && e.overflowed[0] && V(b, j[0].toString(), {
								dir: "y",
								dur: 0,
								overwrite: "none"
							}))), c && e && (2 === c && f.callbacks.onImageLoad && "function" == typeof f.callbacks.onImageLoad ? f.callbacks.onImageLoad.call(this) : 3 === c && f.callbacks.onSelectorChange && "function" == typeof f.callbacks.onSelectorChange ? f.callbacks.onSelectorChange.call(this) : f.callbacks.onUpdate && "function" == typeof f.callbacks.onUpdate && f.callbacks.onUpdate.call(this)), S.call(this)
						}
					})
				},
				scrollTo: function(b, c) {
					if ("undefined" != typeof b && null != b) {
						var e = m.call(this);
						return a(e).each(function() {
							var e = a(this);
							if (e.data(d)) {
								var f = e.data(d),
									g = f.opt,
									h = {
										trigger: "external",
										scrollInertia: g.scrollInertia,
										scrollEasing: "mcsEaseInOut",
										moveDragger: !1,
										timeout: 60,
										callbacks: !0,
										onStart: !0,
										onUpdate: !0,
										onComplete: !0
									}, i = a.extend(!0, {}, h, c),
									j = Q.call(this, b),
									k = i.scrollInertia > 0 && i.scrollInertia < 17 ? 17 : i.scrollInertia;
								j[0] = R.call(this, j[0], "y"), j[1] = R.call(this, j[1], "x"), i.moveDragger && (j[0] *= f.scrollRatio.y, j[1] *= f.scrollRatio.x), i.dur = cb() ? 0 : k, setTimeout(function() {
									null !== j[0] && "undefined" != typeof j[0] && "x" !== g.axis && f.overflowed[0] && (i.dir = "y", i.overwrite = "all", V(e, j[0].toString(), i)), null !== j[1] && "undefined" != typeof j[1] && "y" !== g.axis && f.overflowed[1] && (i.dir = "x", i.overwrite = "none", V(e, j[1].toString(), i))
								}, i.timeout)
							}
						})
					}
				},
				stop: function() {
					var b = m.call(this);
					return a(b).each(function() {
						var b = a(this);
						b.data(d) && U(b)
					})
				},
				disable: function(b) {
					var c = m.call(this);
					return a(c).each(function() {
						var c = a(this);
						c.data(d) && (c.data(d), S.call(this, "remove"), B.call(this), b && z.call(this), C.call(this, !0), c.addClass(k[3]))
					})
				},
				destroy: function() {
					var b = m.call(this);
					return a(b).each(function() {
						var e = a(this);
						if (e.data(d)) {
							var f = e.data(d),
								g = f.opt,
								h = a("#mCSB_" + f.idx),
								i = a("#mCSB_" + f.idx + "_container"),
								j = a(".mCSB_" + f.idx + "_scrollbar");
							g.live && o(g.liveSelector || a(b).selector), S.call(this, "remove"), B.call(this), z.call(this), e.removeData(d), Z(this, "mcs"), j.remove(), i.find("img." + k[2]).removeClass(k[2]), h.replaceWith(i.contents()), e.removeClass(c + " _" + d + "_" + f.idx + " " + k[6] + " " + k[7] + " " + k[5] + " " + k[3]).addClass(k[4])
						}
					})
				}
			}, m = function() {
				return "object" != typeof a(this) || a(this).length < 1 ? e : this
			}, n = function(b) {
				var c = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
					d = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
					e = ["minimal", "minimal-dark"],
					f = ["minimal", "minimal-dark"],
					g = ["minimal", "minimal-dark"];
				b.autoDraggerLength = a.inArray(b.theme, c) > -1 ? !1 : b.autoDraggerLength, b.autoExpandScrollbar = a.inArray(b.theme, d) > -1 ? !1 : b.autoExpandScrollbar, b.scrollButtons.enable = a.inArray(b.theme, e) > -1 ? !1 : b.scrollButtons.enable, b.autoHideScrollbar = a.inArray(b.theme, f) > -1 ? !0 : b.autoHideScrollbar, b.scrollbarPosition = a.inArray(b.theme, g) > -1 ? "outside" : b.scrollbarPosition
			}, o = function(a) {
				h[a] && (clearTimeout(h[a]), Z(h, a))
			}, p = function(a) {
				return "yx" === a || "xy" === a || "auto" === a ? "yx" : "x" === a || "horizontal" === a ? "x" : "y"
			}, q = function(a) {
				return "stepped" === a || "pixels" === a || "step" === a || "click" === a ? "stepped" : "stepless"
			}, r = function() {
				var b = a(this),
					e = b.data(d),
					f = e.opt,
					g = f.autoExpandScrollbar ? " " + k[1] + "_expand" : "",
					h = ["<div id='mCSB_" + e.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + e.idx + "_scrollbar mCS-" + f.theme + " mCSB_scrollTools_vertical" + g + "'><div class='" + k[12] + "'><div id='mCSB_" + e.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + e.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + e.idx + "_scrollbar mCS-" + f.theme + " mCSB_scrollTools_horizontal" + g + "'><div class='" + k[12] + "'><div id='mCSB_" + e.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
					i = "yx" === f.axis ? "mCSB_vertical_horizontal" : "x" === f.axis ? "mCSB_horizontal" : "mCSB_vertical",
					j = "yx" === f.axis ? h[0] + h[1] : "x" === f.axis ? h[1] : h[0],
					l = "yx" === f.axis ? "<div id='mCSB_" + e.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
					m = f.autoHideScrollbar ? " " + k[6] : "",
					n = "x" !== f.axis && "rtl" === e.langDir ? " " + k[7] : "";
				f.setWidth && b.css("width", f.setWidth), f.setHeight && b.css("height", f.setHeight), f.setLeft = "y" !== f.axis && "rtl" === e.langDir ? "989999px" : f.setLeft, b.addClass(c + " _" + d + "_" + e.idx + m + n).wrapInner("<div id='mCSB_" + e.idx + "' class='mCustomScrollBox mCS-" + f.theme + " " + i + "'><div id='mCSB_" + e.idx + "_container' class='mCSB_container' style='position:relative; top:" + f.setTop + "; left:" + f.setLeft + ";' dir=" + e.langDir + " /></div>");
				var o = a("#mCSB_" + e.idx),
					p = a("#mCSB_" + e.idx + "_container");
				"y" === f.axis || f.advanced.autoExpandHorizontalScroll || p.css("width", s(p)), "outside" === f.scrollbarPosition ? ("static" === b.css("position") && b.css("position", "relative"), b.css("overflow", "visible"), o.addClass("mCSB_outside").after(j)) : (o.addClass("mCSB_inside").append(j), p.wrap(l)), u.call(this);
				var q = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")];
				q[0].css("min-height", q[0].height()), q[1].css("min-width", q[1].width())
			}, s = function(b) {
				var c = [b[0].scrollWidth, Math.max.apply(Math, b.children().map(function() {
					return a(this).outerWidth(!0)
				}).get())],
					d = b.parent().width();
				return c[0] > d ? c[0] : c[1] > d ? c[1] : "100%"
			}, t = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = a("#mCSB_" + c.idx + "_container");
				if (e.advanced.autoExpandHorizontalScroll && "y" !== e.axis) {
					f.css({
						width: "auto",
						"min-width": 0,
						"overflow-x": "scroll"
					});
					var g = Math.ceil(f[0].scrollWidth);
					3 === e.advanced.autoExpandHorizontalScroll || 2 !== e.advanced.autoExpandHorizontalScroll && g > f.parent().width() ? f.css({
						width: g,
						"min-width": "100%",
						"overflow-x": "inherit"
					}) : f.css({
						"overflow-x": "inherit",
						position: "absolute"
					}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
						width: Math.ceil(f[0].getBoundingClientRect().right + .4) - Math.floor(f[0].getBoundingClientRect().left),
						"min-width": "100%",
						position: "relative"
					}).unwrap()
				}
			}, u = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = a(".mCSB_" + c.idx + "_scrollbar:first"),
					g = ab(e.scrollButtons.tabindex) ? "tabindex='" + e.scrollButtons.tabindex + "'" : "",
					h = ["<a href='#' class='" + k[13] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[14] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[15] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[16] + "' oncontextmenu='return false;' " + g + " />"],
					i = ["x" === e.axis ? h[2] : h[0], "x" === e.axis ? h[3] : h[1], h[2], h[3]];
				e.scrollButtons.enable && f.prepend(i[0]).append(i[1]).next(".mCSB_scrollTools").prepend(i[2]).append(i[3])
			}, v = function() {
				var b = a(this),
					c = b.data(d),
					e = a("#mCSB_" + c.idx),
					f = a("#mCSB_" + c.idx + "_container"),
					g = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")],
					h = [e.height() / f.outerHeight(!1), e.width() / f.outerWidth(!1)],
					j = [parseInt(g[0].css("min-height")), Math.round(h[0] * g[0].parent().height()), parseInt(g[1].css("min-width")), Math.round(h[1] * g[1].parent().width())],
					k = i && j[1] < j[0] ? j[0] : j[1],
					l = i && j[3] < j[2] ? j[2] : j[3];
				g[0].css({
					height: k,
					"max-height": g[0].parent().height() - 10
				}).find(".mCSB_dragger_bar").css({
					"line-height": j[0] + "px"
				}), g[1].css({
					width: l,
					"max-width": g[1].parent().width() - 10
				})
			}, w = function() {
				var b = a(this),
					c = b.data(d),
					e = a("#mCSB_" + c.idx),
					f = a("#mCSB_" + c.idx + "_container"),
					g = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")],
					h = [f.outerHeight(!1) - e.height(), f.outerWidth(!1) - e.width()],
					i = [h[0] / (g[0].parent().height() - g[0].height()), h[1] / (g[1].parent().width() - g[1].width())];
				c.scrollRatio = {
					y: i[0],
					x: i[1]
				}
			}, x = function(a, b, c) {
				var d = c ? k[0] + "_expanded" : "",
					e = a.closest(".mCSB_scrollTools");
				"active" === b ? (a.toggleClass(k[0] + " " + d), e.toggleClass(k[1]), a[0]._draggable = a[0]._draggable ? 0 : 1) : a[0]._draggable || ("hide" === b ? (a.removeClass(k[0]), e.removeClass(k[1])) : (a.addClass(k[0]), e.addClass(k[1])))
			}, y = function() {
				var b = a(this),
					c = b.data(d),
					e = a("#mCSB_" + c.idx),
					f = a("#mCSB_" + c.idx + "_container"),
					g = null == c.overflowed ? f.height() : f.outerHeight(!1),
					h = null == c.overflowed ? f.width() : f.outerWidth(!1),
					i = f[0].scrollHeight,
					j = f[0].scrollWidth;
				return i > g && (g = i), j > h && (h = j), [g > e.height(), h > e.width()]
			}, z = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = a("#mCSB_" + c.idx),
					g = a("#mCSB_" + c.idx + "_container"),
					h = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
				if (U(b), ("x" !== e.axis && !c.overflowed[0] || "y" === e.axis && c.overflowed[0]) && (h[0].add(g).css("top", 0), V(b, "_resetY")), "y" !== e.axis && !c.overflowed[1] || "x" === e.axis && c.overflowed[1]) {
					var i = dx = 0;
					"rtl" === c.langDir && (i = f.width() - g.outerWidth(!1), dx = Math.abs(i / c.scrollRatio.x)), g.css("left", i), h[1].css("left", dx), V(b, "_resetX")
				}
			}, A = function() {
				function b() {
					g = setTimeout(function() {
						a.event.special.mousewheel ? (clearTimeout(g), H.call(c[0])) : b()
					}, 100)
				}
				var c = a(this),
					e = c.data(d),
					f = e.opt;
				if (!e.bindEvents) {
					if (E.call(this), f.contentTouchScroll && F.call(this), G.call(this), f.mouseWheel.enable) {
						var g;
						b()
					}
					K.call(this), M.call(this), f.advanced.autoScrollOnFocus && L.call(this), f.scrollButtons.enable && N.call(this), f.keyboard.enable && O.call(this), e.bindEvents = !0
				}
			}, B = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = d + "_" + c.idx,
					g = ".mCSB_" + c.idx + "_scrollbar",
					h = a("#mCSB_" + c.idx + ",#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper," + g + " ." + k[12] + ",#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal," + g + ">a"),
					i = a("#mCSB_" + c.idx + "_container");
				e.advanced.releaseDraggableSelectors && h.add(a(e.advanced.releaseDraggableSelectors)), e.advanced.extraDraggableSelectors && h.add(a(e.advanced.extraDraggableSelectors)), c.bindEvents && (a(document).add(a(!I() || top.document)).unbind("." + f), h.each(function() {
					a(this).unbind("." + f)
				}), clearTimeout(b[0]._focusTimeout), Z(b[0], "_focusTimeout"), clearTimeout(c.sequential.step), Z(c.sequential, "step"), clearTimeout(i[0].onCompleteTimeout), Z(i[0], "onCompleteTimeout"), c.bindEvents = !1)
			}, C = function(b) {
				var c = a(this),
					e = c.data(d),
					f = e.opt,
					g = a("#mCSB_" + e.idx + "_container_wrapper"),
					h = g.length ? g : a("#mCSB_" + e.idx + "_container"),
					i = [a("#mCSB_" + e.idx + "_scrollbar_vertical"), a("#mCSB_" + e.idx + "_scrollbar_horizontal")],
					j = [i[0].find(".mCSB_dragger"), i[1].find(".mCSB_dragger")];
				"x" !== f.axis && (e.overflowed[0] && !b ? (i[0].add(j[0]).add(i[0].children("a")).css("display", "block"), h.removeClass(k[8] + " " + k[10])) : (f.alwaysShowScrollbar ? (2 !== f.alwaysShowScrollbar && j[0].css("display", "none"), h.removeClass(k[10])) : (i[0].css("display", "none"), h.addClass(k[10])), h.addClass(k[8]))), "y" !== f.axis && (e.overflowed[1] && !b ? (i[1].add(j[1]).add(i[1].children("a")).css("display", "block"), h.removeClass(k[9] + " " + k[11])) : (f.alwaysShowScrollbar ? (2 !== f.alwaysShowScrollbar && j[1].css("display", "none"), h.removeClass(k[11])) : (i[1].css("display", "none"), h.addClass(k[11])), h.addClass(k[9]))), e.overflowed[0] || e.overflowed[1] ? c.removeClass(k[5]) : c.addClass(k[5])
			}, D = function(b) {
				var c = b.type,
					d = b.target.ownerDocument !== document ? [a(frameElement).offset().top, a(frameElement).offset().left] : null,
					e = I() && b.target.ownerDocument !== top.document ? [a(b.view.frameElement).offset().top, a(b.view.frameElement).offset().left] : [0, 0];
				switch (c) {
					case "pointerdown":
					case "MSPointerDown":
					case "pointermove":
					case "MSPointerMove":
					case "pointerup":
					case "MSPointerUp":
						return d ? [b.originalEvent.pageY - d[0] + e[0], b.originalEvent.pageX - d[1] + e[1], !1] : [b.originalEvent.pageY, b.originalEvent.pageX, !1];
					case "touchstart":
					case "touchmove":
					case "touchend":
						var f = b.originalEvent.touches[0] || b.originalEvent.changedTouches[0],
							g = b.originalEvent.touches.length || b.originalEvent.changedTouches.length;
						return b.target.ownerDocument !== document ? [f.screenY, f.screenX, g > 1] : [f.pageY, f.pageX, g > 1];
					default:
						return d ? [b.pageY - d[0] + e[0], b.pageX - d[1] + e[1], !1] : [b.pageY, b.pageX, !1]
				}
			}, E = function() {
				function b(a) {
					var b = o.find("iframe");
					if (b.length) {
						var c = a ? "auto" : "none";
						b.css("pointer-events", c)
					}
				}
				function c(a, b, c, d) {
					if (o[0].idleTimer = l.scrollInertia < 233 ? 250 : 0, e.attr("id") === n[1]) var f = "x",
						g = (e[0].offsetLeft - b + d) * k.scrollRatio.x;
					else var f = "y",
						g = (e[0].offsetTop - a + c) * k.scrollRatio.y;
					V(h, g.toString(), {
						dir: f,
						drag: !0
					})
				}
				var e, f, g, h = a(this),
					k = h.data(d),
					l = k.opt,
					m = d + "_" + k.idx,
					n = ["mCSB_" + k.idx + "_dragger_vertical", "mCSB_" + k.idx + "_dragger_horizontal"],
					o = a("#mCSB_" + k.idx + "_container"),
					p = a("#" + n[0] + ",#" + n[1]),
					q = l.advanced.releaseDraggableSelectors ? p.add(a(l.advanced.releaseDraggableSelectors)) : p,
					r = l.advanced.extraDraggableSelectors ? a(!I() || top.document).add(a(l.advanced.extraDraggableSelectors)) : a(!I() || top.document);
				p.bind("mousedown." + m + " touchstart." + m + " pointerdown." + m + " MSPointerDown." + m, function(c) {
					if (c.stopImmediatePropagation(), c.preventDefault(), $(c)) {
						j = !0, i && (document.onselectstart = function() {
							return !1
						}), b(!1), U(h), e = a(this);
						var d = e.offset(),
							k = D(c)[0] - d.top,
							m = D(c)[1] - d.left,
							n = e.height() + d.top,
							o = e.width() + d.left;
						n > k && k > 0 && o > m && m > 0 && (f = k, g = m), x(e, "active", l.autoExpandScrollbar)
					}
				}).bind("touchmove." + m, function(a) {
					a.stopImmediatePropagation(), a.preventDefault();
					var b = e.offset(),
						d = D(a)[0] - b.top,
						h = D(a)[1] - b.left;
					c(f, g, d, h)
				}), a(document).add(r).bind("mousemove." + m + " pointermove." + m + " MSPointerMove." + m, function(a) {
					if (e) {
						var b = e.offset(),
							d = D(a)[0] - b.top,
							h = D(a)[1] - b.left;
						if (f === d && g === h) return;
						c(f, g, d, h)
					}
				}).add(q).bind("mouseup." + m + " touchend." + m + " pointerup." + m + " MSPointerUp." + m, function() {
					e && (x(e, "active", l.autoExpandScrollbar), e = null), j = !1, i && (document.onselectstart = null), b(!0)
				})
			}, F = function() {
				function c(a) {
					if (!_(a) || j || D(a)[2]) return void(b = 0);
					b = 1, w = 0, x = 0, k = 1, y.removeClass("mCS_touch_action");
					var c = E.offset();
					l = D(a)[0] - c.top, m = D(a)[1] - c.left, L = [D(a)[0], D(a)[1]]
				}
				function e(a) {
					if (_(a) && !j && !D(a)[2] && (A.documentTouchScroll || a.preventDefault(), a.stopImmediatePropagation(), (!x || w) && k)) {
						q = X();
						var b = C.offset(),
							c = D(a)[0] - b.top,
							d = D(a)[1] - b.left,
							e = "mcsLinearOut";
						if (G.push(c), H.push(d), L[2] = Math.abs(D(a)[0] - L[0]), L[3] = Math.abs(D(a)[1] - L[1]), z.overflowed[0]) var f = F[0].parent().height() - F[0].height(),
							g = l - c > 0 && c - l > -(f * z.scrollRatio.y) && (2 * L[3] < L[2] || "yx" === A.axis);
						if (z.overflowed[1]) var h = F[1].parent().width() - F[1].width(),
							n = m - d > 0 && d - m > -(h * z.scrollRatio.x) && (2 * L[2] < L[3] || "yx" === A.axis);
						g || n ? (O || a.preventDefault(), w = 1) : (x = 1, y.addClass("mCS_touch_action")), O && a.preventDefault(), u = "yx" === A.axis ? [l - c, m - d] : "x" === A.axis ? [null, m - d] : [l - c, null], E[0].idleTimer = 250, z.overflowed[0] && i(u[0], J, e, "y", "all", !0), z.overflowed[1] && i(u[1], J, e, "x", K, !0)
					}
				}
				function f(a) {
					if (!_(a) || j || D(a)[2]) return void(b = 0);
					b = 1, a.stopImmediatePropagation(), U(y), p = X();
					var c = C.offset();
					n = D(a)[0] - c.top, o = D(a)[1] - c.left, G = [], H = []
				}
				function g(a) {
					if (_(a) && !j && !D(a)[2]) {
						k = 0, a.stopImmediatePropagation(), w = 0, x = 0, r = X();
						var b = C.offset(),
							c = D(a)[0] - b.top,
							d = D(a)[1] - b.left;
						if (!(r - q > 30)) {
							t = 1e3 / (r - p);
							var e = "mcsEaseOut",
								f = 2.5 > t,
								g = f ? [G[G.length - 2], H[H.length - 2]] : [0, 0];
							s = f ? [c - g[0], d - g[1]] : [c - n, d - o];
							var l = [Math.abs(s[0]), Math.abs(s[1])];
							t = f ? [Math.abs(s[0] / 4), Math.abs(s[1] / 4)] : [t, t];
							var m = [Math.abs(E[0].offsetTop) - s[0] * h(l[0] / t[0], t[0]), Math.abs(E[0].offsetLeft) - s[1] * h(l[1] / t[1], t[1])];
							u = "yx" === A.axis ? [m[0], m[1]] : "x" === A.axis ? [null, m[1]] : [m[0], null], v = [4 * l[0] + A.scrollInertia, 4 * l[1] + A.scrollInertia];
							var y = parseInt(A.contentTouchScroll) || 0;
							u[0] = l[0] > y ? u[0] : 0, u[1] = l[1] > y ? u[1] : 0, z.overflowed[0] && i(u[0], v[0], e, "y", K, !1), z.overflowed[1] && i(u[1], v[1], e, "x", K, !1)
						}
					}
				}
				function h(a, b) {
					var c = [1.5 * b, 2 * b, b / 1.5, b / 2];
					return a > 90 ? b > 4 ? c[0] : c[3] : a > 60 ? b > 3 ? c[3] : c[2] : a > 30 ? b > 8 ? c[1] : b > 6 ? c[0] : b > 4 ? b : c[2] : b > 8 ? b : c[3]
				}
				function i(a, b, c, d, e, f) {
					a && V(y, a.toString(), {
						dur: b,
						scrollEasing: c,
						dir: d,
						overwrite: e,
						drag: f
					})
				}
				var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = a(this),
					z = y.data(d),
					A = z.opt,
					B = d + "_" + z.idx,
					C = a("#mCSB_" + z.idx),
					E = a("#mCSB_" + z.idx + "_container"),
					F = [a("#mCSB_" + z.idx + "_dragger_vertical"), a("#mCSB_" + z.idx + "_dragger_horizontal")],
					G = [],
					H = [],
					J = 0,
					K = "yx" === A.axis ? "none" : "all",
					L = [],
					M = E.find("iframe"),
					N = ["touchstart." + B + " pointerdown." + B + " MSPointerDown." + B, "touchmove." + B + " pointermove." + B + " MSPointerMove." + B, "touchend." + B + " pointerup." + B + " MSPointerUp." + B],
					O = void 0 !== document.body.style.touchAction;
				E.bind(N[0], function(a) {
					c(a)
				}).bind(N[1], function(a) {
					e(a)
				}), C.bind(N[0], function(a) {
					f(a)
				}).bind(N[2], function(a) {
					g(a)
				}), M.length && M.each(function() {
					a(this).load(function() {
						I(this) && a(this.contentDocument || this.contentWindow.document).bind(N[0], function(a) {
							c(a), f(a)
						}).bind(N[1], function(a) {
							e(a)
						}).bind(N[2], function(a) {
							g(a)
						})
					})
				})
			}, G = function() {
				function c() {
					return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
				}
				function e(a, b, c) {
					k.type = c && f ? "stepped" : "stepless", k.scrollAmount = 10, P(g, a, b, "mcsLinearOut", c ? 60 : null)
				}
				var f, g = a(this),
					h = g.data(d),
					i = h.opt,
					k = h.sequential,
					l = d + "_" + h.idx,
					m = a("#mCSB_" + h.idx + "_container"),
					n = m.parent();
				m.bind("mousedown." + l, function() {
					b || f || (f = 1, j = !0)
				}).add(document).bind("mousemove." + l, function(a) {
					if (!b && f && c()) {
						var d = m.offset(),
							g = D(a)[0] - d.top + m[0].offsetTop,
							j = D(a)[1] - d.left + m[0].offsetLeft;
						g > 0 && g < n.height() && j > 0 && j < n.width() ? k.step && e("off", null, "stepped") : ("x" !== i.axis && h.overflowed[0] && (0 > g ? e("on", 38) : g > n.height() && e("on", 40)), "y" !== i.axis && h.overflowed[1] && (0 > j ? e("on", 37) : j > n.width() && e("on", 39)))
					}
				}).bind("mouseup." + l + " dragend." + l, function() {
					b || (f && (f = 0, e("off", null)), j = !1)
				})
			}, H = function() {
				function b(b, d) {
					if (U(c), !J(c, b.target)) {
						var g = "auto" !== f.mouseWheel.deltaFactor ? parseInt(f.mouseWheel.deltaFactor) : i && b.deltaFactor < 100 ? 100 : b.deltaFactor || 100,
							k = f.scrollInertia;
						if ("x" === f.axis || "x" === f.mouseWheel.axis) var l = "x",
							m = [Math.round(g * e.scrollRatio.x), parseInt(f.mouseWheel.scrollAmount)],
							n = "auto" !== f.mouseWheel.scrollAmount ? m[1] : m[0] >= h.width() ? .9 * h.width() : m[0],
							o = Math.abs(a("#mCSB_" + e.idx + "_container")[0].offsetLeft),
							p = j[1][0].offsetLeft,
							q = j[1].parent().width() - j[1].width(),
							r = b.deltaX || b.deltaY || d;
						else var l = "y",
							m = [Math.round(g * e.scrollRatio.y), parseInt(f.mouseWheel.scrollAmount)],
							n = "auto" !== f.mouseWheel.scrollAmount ? m[1] : m[0] >= h.height() ? .9 * h.height() : m[0],
							o = Math.abs(a("#mCSB_" + e.idx + "_container")[0].offsetTop),
							p = j[0][0].offsetTop,
							q = j[0].parent().height() - j[0].height(),
							r = b.deltaY || d;
						"y" === l && !e.overflowed[0] || "x" === l && !e.overflowed[1] || ((f.mouseWheel.invert || b.webkitDirectionInvertedFromDevice) && (r = -r), f.mouseWheel.normalizeDelta && (r = 0 > r ? -1 : 1), (r > 0 && 0 !== p || 0 > r && p !== q || f.mouseWheel.preventDefault) && (b.stopImmediatePropagation(), b.preventDefault()), b.deltaFactor < 2 && !f.mouseWheel.normalizeDelta && (n = b.deltaFactor, k = 17), V(c, (o - r * n).toString(), {
							dir: l,
							dur: k
						}))
					}
				}
				if (a(this).data(d)) {
					var c = a(this),
						e = c.data(d),
						f = e.opt,
						g = d + "_" + e.idx,
						h = a("#mCSB_" + e.idx),
						j = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")],
						k = a("#mCSB_" + e.idx + "_container").find("iframe");
					k.length && k.each(function() {
						a(this).load(function() {
							I(this) && a(this.contentDocument || this.contentWindow.document).bind("mousewheel." + g, function(a, c) {
								b(a, c)
							})
						})
					}), h.bind("mousewheel." + g, function(a, c) {
						b(a, c)
					})
				}
			}, I = function(a) {
				var b = null;
				if (a) {
					try {
						var c = a.contentDocument || a.contentWindow.document;
						b = c.body.innerHTML
					} catch (d) {}
					return null !== b
				}
				try {
					var c = top.document;
					b = c.body.innerHTML
				} catch (d) {}
				return null !== b
			}, J = function(b, c) {
				var e = c.nodeName.toLowerCase(),
					f = b.data(d).opt.mouseWheel.disableOver,
					g = ["select", "textarea"];
				return a.inArray(e, f) > -1 && !(a.inArray(e, g) > -1 && !a(c).is(":focus"))
			}, K = function() {
				var b, c = a(this),
					e = c.data(d),
					f = d + "_" + e.idx,
					g = a("#mCSB_" + e.idx + "_container"),
					h = g.parent(),
					i = a(".mCSB_" + e.idx + "_scrollbar ." + k[12]);
				i.bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f, function(c) {
					j = !0, a(c.target).hasClass("mCSB_dragger") || (b = 1)
				}).bind("touchend." + f + " pointerup." + f + " MSPointerUp." + f, function() {
					j = !1
				}).bind("click." + f, function(d) {
					if (b && (b = 0, a(d.target).hasClass(k[12]) || a(d.target).hasClass("mCSB_draggerRail"))) {
						U(c);
						var f = a(this),
							i = f.find(".mCSB_dragger");
						if (f.parent(".mCSB_scrollTools_horizontal").length > 0) {
							if (!e.overflowed[1]) return;
							var j = "x",
								l = d.pageX > i.offset().left ? -1 : 1,
								m = Math.abs(g[0].offsetLeft) - .9 * l * h.width()
						} else {
							if (!e.overflowed[0]) return;
							var j = "y",
								l = d.pageY > i.offset().top ? -1 : 1,
								m = Math.abs(g[0].offsetTop) - .9 * l * h.height()
						}
						V(c, m.toString(), {
							dir: j,
							scrollEasing: "mcsEaseInOut"
						})
					}
				})
			}, L = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = d + "_" + c.idx,
					g = a("#mCSB_" + c.idx + "_container"),
					h = g.parent();
				g.bind("focusin." + f, function() {
					var c = a(document.activeElement),
						d = g.find(".mCustomScrollBox").length,
						f = 0;
					c.is(e.advanced.autoScrollOnFocus) && (U(b), clearTimeout(b[0]._focusTimeout), b[0]._focusTimer = d ? (f + 17) * d : 0, b[0]._focusTimeout = setTimeout(function() {
						var a = [bb(c)[0], bb(c)[1]],
							d = [g[0].offsetTop, g[0].offsetLeft],
							i = [d[0] + a[0] >= 0 && d[0] + a[0] < h.height() - c.outerHeight(!1), d[1] + a[1] >= 0 && d[0] + a[1] < h.width() - c.outerWidth(!1)],
							j = "yx" !== e.axis || i[0] || i[1] ? "all" : "none";
						"x" === e.axis || i[0] || V(b, a[0].toString(), {
							dir: "y",
							scrollEasing: "mcsEaseInOut",
							overwrite: j,
							dur: f
						}), "y" === e.axis || i[1] || V(b, a[1].toString(), {
							dir: "x",
							scrollEasing: "mcsEaseInOut",
							overwrite: j,
							dur: f
						})
					}, b[0]._focusTimer))
				})
			}, M = function() {
				var b = a(this),
					c = b.data(d),
					e = d + "_" + c.idx,
					f = a("#mCSB_" + c.idx + "_container").parent();
				f.bind("scroll." + e, function() {
					(0 !== f.scrollTop() || 0 !== f.scrollLeft()) && a(".mCSB_" + c.idx + "_scrollbar").css("visibility", "hidden")
				})
			}, N = function() {
				var b = a(this),
					c = b.data(d),
					e = c.opt,
					f = c.sequential,
					g = d + "_" + c.idx,
					h = ".mCSB_" + c.idx + "_scrollbar",
					i = a(h + ">a");
				i.bind("mousedown." + g + " touchstart." + g + " pointerdown." + g + " MSPointerDown." + g + " mouseup." + g + " touchend." + g + " pointerup." + g + " MSPointerUp." + g + " mouseout." + g + " pointerout." + g + " MSPointerOut." + g + " click." + g, function(d) {
					function g(a, c) {
						f.scrollAmount = e.scrollButtons.scrollAmount, P(b, a, c)
					}
					if (d.preventDefault(), $(d)) {
						var h = a(this).attr("class");
						switch (f.type = e.scrollButtons.scrollType, d.type) {
							case "mousedown":
							case "touchstart":
							case "pointerdown":
							case "MSPointerDown":
								if ("stepped" === f.type) return;
								j = !0, c.tweenRunning = !1, g("on", h);
								break;
							case "mouseup":
							case "touchend":
							case "pointerup":
							case "MSPointerUp":
							case "mouseout":
							case "pointerout":
							case "MSPointerOut":
								if ("stepped" === f.type) return;
								j = !1, f.dir && g("off", h);
								break;
							case "click":
								if ("stepped" !== f.type || c.tweenRunning) return;
								g("on", h)
						}
					}
				})
			}, O = function() {
				function b(b) {
					function d(a, b) {
						g.type = f.keyboard.scrollType, g.scrollAmount = f.keyboard.scrollAmount, "stepped" === g.type && e.tweenRunning || P(c, a, b)
					}
					switch (b.type) {
						case "blur":
							e.tweenRunning && g.dir && d("off", null);
							break;
						case "keydown":
						case "keyup":
							var h = b.keyCode ? b.keyCode : b.which,
								i = "on";
							if ("x" !== f.axis && (38 === h || 40 === h) || "y" !== f.axis && (37 === h || 39 === h)) {
								if ((38 === h || 40 === h) && !e.overflowed[0] || (37 === h || 39 === h) && !e.overflowed[1]) return;
								"keyup" === b.type && (i = "off"), a(document.activeElement).is(l) || (b.preventDefault(), b.stopImmediatePropagation(), d(i, h))
							} else if (33 === h || 34 === h) {
								if ((e.overflowed[0] || e.overflowed[1]) && (b.preventDefault(), b.stopImmediatePropagation()), "keyup" === b.type) {
									U(c);
									var m = 34 === h ? -1 : 1;
									if ("x" === f.axis || "yx" === f.axis && e.overflowed[1] && !e.overflowed[0]) var n = "x",
										o = Math.abs(j[0].offsetLeft) - .9 * m * k.width();
									else var n = "y",
										o = Math.abs(j[0].offsetTop) - .9 * m * k.height();
									V(c, o.toString(), {
										dir: n,
										scrollEasing: "mcsEaseInOut"
									})
								}
							} else if ((35 === h || 36 === h) && !a(document.activeElement).is(l) && ((e.overflowed[0] || e.overflowed[1]) && (b.preventDefault(), b.stopImmediatePropagation()), "keyup" === b.type)) {
								if ("x" === f.axis || "yx" === f.axis && e.overflowed[1] && !e.overflowed[0]) var n = "x",
									o = 35 === h ? Math.abs(k.width() - j.outerWidth(!1)) : 0;
								else var n = "y",
									o = 35 === h ? Math.abs(k.height() - j.outerHeight(!1)) : 0;
								V(c, o.toString(), {
									dir: n,
									scrollEasing: "mcsEaseInOut"
								})
							}
					}
				}
				var c = a(this),
					e = c.data(d),
					f = e.opt,
					g = e.sequential,
					h = d + "_" + e.idx,
					i = a("#mCSB_" + e.idx),
					j = a("#mCSB_" + e.idx + "_container"),
					k = j.parent(),
					l = "input,textarea,select,datalist,keygen,[contenteditable='true']",
					m = j.find("iframe"),
					n = ["blur." + h + " keydown." + h + " keyup." + h];
				m.length && m.each(function() {
					a(this).load(function() {
						I(this) && a(this.contentDocument || this.contentWindow.document).bind(n[0], function(a) {
							b(a)
						})
					})
				}), i.attr("tabindex", "0").bind(n[0], function(a) {
					b(a)
				})
			}, P = function(b, c, e, f, g) {
				function h(a) {
					l.snapAmount && (m.scrollAmount = l.snapAmount instanceof Array ? "x" === m.dir[0] ? l.snapAmount[1] : l.snapAmount[0] : l.snapAmount);
					var c = "stepped" !== m.type,
						d = g ? g : a ? c ? p / 1.5 : q : 1e3 / 60,
						e = a ? c ? 7.5 : 40 : 2.5,
						i = [Math.abs(n[0].offsetTop), Math.abs(n[0].offsetLeft)],
						k = [j.scrollRatio.y > 10 ? 10 : j.scrollRatio.y, j.scrollRatio.x > 10 ? 10 : j.scrollRatio.x],
						o = "x" === m.dir[0] ? i[1] + m.dir[1] * k[1] * e : i[0] + m.dir[1] * k[0] * e,
						r = "x" === m.dir[0] ? i[1] + m.dir[1] * parseInt(m.scrollAmount) : i[0] + m.dir[1] * parseInt(m.scrollAmount),
						s = "auto" !== m.scrollAmount ? r : o,
						t = f ? f : a ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
						u = a ? !0 : !1;
					return a && 17 > d && (s = "x" === m.dir[0] ? i[1] : i[0]), V(b, s.toString(), {
						dir: m.dir[0],
						scrollEasing: t,
						dur: d,
						onComplete: u
					}), a ? void(m.dir = !1) : (clearTimeout(m.step), void(m.step = setTimeout(function() {
						h()
					}, d)))
				}
				function i() {
					clearTimeout(m.step), Z(m, "step"), U(b)
				}
				var j = b.data(d),
					l = j.opt,
					m = j.sequential,
					n = a("#mCSB_" + j.idx + "_container"),
					o = "stepped" === m.type ? !0 : !1,
					p = l.scrollInertia < 26 ? 26 : l.scrollInertia,
					q = l.scrollInertia < 1 ? 17 : l.scrollInertia;
				switch (c) {
					case "on":
						if (m.dir = [e === k[16] || e === k[15] || 39 === e || 37 === e ? "x" : "y", e === k[13] || e === k[15] || 38 === e || 37 === e ? -1 : 1], U(b), ab(e) && "stepped" === m.type) return;
						h(o);
						break;
					case "off":
						i(), (o || j.tweenRunning && m.dir) && h(!0)
				}
			}, Q = function(b) {
				var c = a(this).data(d).opt,
					e = [];
				return "function" == typeof b && (b = b()), b instanceof Array ? e = b.length > 1 ? [b[0], b[1]] : "x" === c.axis ? [null, b[0]] : [b[0], null] : (e[0] = b.y ? b.y : b.x || "x" === c.axis ? null : b, e[1] = b.x ? b.x : b.y || "y" === c.axis ? null : b), "function" == typeof e[0] && (e[0] = e[0]()), "function" == typeof e[1] && (e[1] = e[1]()), e
			}, R = function(b, c) {
				if (null != b && "undefined" != typeof b) {
					var e = a(this),
						f = e.data(d),
						g = f.opt,
						h = a("#mCSB_" + f.idx + "_container"),
						i = h.parent(),
						j = typeof b;
					c || (c = "x" === g.axis ? "x" : "y");
					var k = "x" === c ? h.outerWidth(!1) : h.outerHeight(!1),
						m = "x" === c ? h[0].offsetLeft : h[0].offsetTop,
						n = "x" === c ? "left" : "top";
					switch (j) {
						case "function":
							return b();
						case "object":
							var o = b.jquery ? b : a(b);
							if (!o.length) return;
							return "x" === c ? bb(o)[1] : bb(o)[0];
						case "string":
						case "number":
							if (ab(b)) return Math.abs(b);
							if (-1 !== b.indexOf("%")) return Math.abs(k * parseInt(b) / 100);
							if (-1 !== b.indexOf("-=")) return Math.abs(m - parseInt(b.split("-=")[1]));
							if (-1 !== b.indexOf("+=")) {
								var p = m + parseInt(b.split("+=")[1]);
								return p >= 0 ? 0 : Math.abs(p)
							}
							if (-1 !== b.indexOf("px") && ab(b.split("px")[0])) return Math.abs(b.split("px")[0]);
							if ("top" === b || "left" === b) return 0;
							if ("bottom" === b) return Math.abs(i.height() - h.outerHeight(!1));
							if ("right" === b) return Math.abs(i.width() - h.outerWidth(!1));
							if ("first" === b || "last" === b) {
								var o = h.find(":" + b);
								return "x" === c ? bb(o)[1] : bb(o)[0]
							}
							return a(b).length ? "x" === c ? bb(a(b))[1] : bb(a(b))[0] : (h.css(n, b), void l.update.call(null, e[0]))
					}
				}
			}, S = function(b) {
				function c() {
					return clearTimeout(m[0].autoUpdate), 0 === h.parents("html").length ? void(h = null) : void(m[0].autoUpdate = setTimeout(function() {
						return j.advanced.updateOnSelectorChange && (i.poll.change.n = f(), i.poll.change.n !== i.poll.change.o) ? (i.poll.change.o = i.poll.change.n, void g(3)) : j.advanced.updateOnContentResize && (i.poll.size.n = h[0].scrollHeight + h[0].scrollWidth + m[0].offsetHeight + h[0].offsetHeight + h[0].offsetWidth, i.poll.size.n !== i.poll.size.o) ? (i.poll.size.o = i.poll.size.n, void g(1)) : !j.advanced.updateOnImageLoad || "auto" === j.advanced.updateOnImageLoad && "y" === j.axis || (i.poll.img.n = m.find("img").length, i.poll.img.n === i.poll.img.o) ? void((j.advanced.updateOnSelectorChange || j.advanced.updateOnContentResize || j.advanced.updateOnImageLoad) && c()) : (i.poll.img.o = i.poll.img.n, void m.find("img").each(function() {
							e(this)
						}))
					}, j.advanced.autoUpdateTimeout))
				}
				function e(b) {
					function c(a, b) {
						return function() {
							return b.apply(a, arguments)
						}
					}
					function d() {
						this.onload = null, a(b).addClass(k[2]), g(2)
					}
					if (a(b).hasClass(k[2])) return void g();
					var e = new Image;
					e.onload = c(e, d), e.src = b.src
				}
				function f() {
					j.advanced.updateOnSelectorChange === !0 && (j.advanced.updateOnSelectorChange = "*");
					var a = 0,
						b = m.find(j.advanced.updateOnSelectorChange);
					return j.advanced.updateOnSelectorChange && b.length > 0 && b.each(function() {
						a += this.offsetHeight + this.offsetWidth
					}), a
				}
				function g(a) {
					clearTimeout(m[0].autoUpdate), l.update.call(null, h[0], a)
				}
				var h = a(this),
					i = h.data(d),
					j = i.opt,
					m = a("#mCSB_" + i.idx + "_container");
				return b ? (clearTimeout(m[0].autoUpdate), void Z(m[0], "autoUpdate")) : void c()
			}, T = function(a, b, c) {
				return Math.round(a / b) * b - c
			}, U = function(b) {
				var c = b.data(d),
					e = a("#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper,#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal");
				e.each(function() {
					Y.call(this)
				})
			}, V = function(b, c, e) {
				function f(a) {
					return i && j.callbacks[a] && "function" == typeof j.callbacks[a]
				}
				function g() {
					return [j.callbacks.alwaysTriggerOffsets || u >= v[0] + y, j.callbacks.alwaysTriggerOffsets || -z >= u]
				}
				function h() {
					var a = [n[0].offsetTop, n[0].offsetLeft],
						c = [s[0].offsetTop, s[0].offsetLeft],
						d = [n.outerHeight(!1), n.outerWidth(!1)],
						f = [m.height(), m.width()];
					b[0].mcs = {
						content: n,
						top: a[0],
						left: a[1],
						draggerTop: c[0],
						draggerLeft: c[1],
						topPct: Math.round(100 * Math.abs(a[0]) / (Math.abs(d[0]) - f[0])),
						leftPct: Math.round(100 * Math.abs(a[1]) / (Math.abs(d[1]) - f[1])),
						direction: e.dir
					}
				}
				var i = b.data(d),
					j = i.opt,
					k = {
						trigger: "internal",
						dir: "y",
						scrollEasing: "mcsEaseOut",
						drag: !1,
						dur: j.scrollInertia,
						overwrite: "all",
						callbacks: !0,
						onStart: !0,
						onUpdate: !0,
						onComplete: !0
					}, e = a.extend(k, e),
					l = [e.dur, e.drag ? 0 : e.dur],
					m = a("#mCSB_" + i.idx),
					n = a("#mCSB_" + i.idx + "_container"),
					o = n.parent(),
					p = j.callbacks.onTotalScrollOffset ? Q.call(b, j.callbacks.onTotalScrollOffset) : [0, 0],
					q = j.callbacks.onTotalScrollBackOffset ? Q.call(b, j.callbacks.onTotalScrollBackOffset) : [0, 0];
				if (i.trigger = e.trigger, (0 !== o.scrollTop() || 0 !== o.scrollLeft()) && (a(".mCSB_" + i.idx + "_scrollbar").css("visibility", "visible"), o.scrollTop(0).scrollLeft(0)), "_resetY" !== c || i.contentReset.y || (f("onOverflowYNone") && j.callbacks.onOverflowYNone.call(b[0]), i.contentReset.y = 1), "_resetX" !== c || i.contentReset.x || (f("onOverflowXNone") && j.callbacks.onOverflowXNone.call(b[0]), i.contentReset.x = 1), "_resetY" !== c && "_resetX" !== c) {
					if (!i.contentReset.y && b[0].mcs || !i.overflowed[0] || (f("onOverflowY") && j.callbacks.onOverflowY.call(b[0]), i.contentReset.x = null), !i.contentReset.x && b[0].mcs || !i.overflowed[1] || (f("onOverflowX") && j.callbacks.onOverflowX.call(b[0]), i.contentReset.x = null), j.snapAmount) {
						var r = j.snapAmount instanceof Array ? "x" === e.dir ? j.snapAmount[1] : j.snapAmount[0] : j.snapAmount;
						c = T(c, r, j.snapOffset)
					}
					switch (e.dir) {
						case "x":
							var s = a("#mCSB_" + i.idx + "_dragger_horizontal"),
								t = "left",
								u = n[0].offsetLeft,
								v = [m.width() - n.outerWidth(!1), s.parent().width() - s.width()],
								w = [c, 0 === c ? 0 : c / i.scrollRatio.x],
								y = p[1],
								z = q[1],
								A = y > 0 ? y / i.scrollRatio.x : 0,
								B = z > 0 ? z / i.scrollRatio.x : 0;
							break;
						case "y":
							var s = a("#mCSB_" + i.idx + "_dragger_vertical"),
								t = "top",
								u = n[0].offsetTop,
								v = [m.height() - n.outerHeight(!1), s.parent().height() - s.height()],
								w = [c, 0 === c ? 0 : c / i.scrollRatio.y],
								y = p[0],
								z = q[0],
								A = y > 0 ? y / i.scrollRatio.y : 0,
								B = z > 0 ? z / i.scrollRatio.y : 0
					}
					w[1] < 0 || 0 === w[0] && 0 === w[1] ? w = [0, 0] : w[1] >= v[1] ? w = [v[0], v[1]] : w[0] = -w[0], b[0].mcs || (h(), f("onInit") && j.callbacks.onInit.call(b[0])), clearTimeout(n[0].onCompleteTimeout), W(s[0], t, Math.round(w[1]), l[1], e.scrollEasing), (i.tweenRunning || !(0 === u && w[0] >= 0 || u === v[0] && w[0] <= v[0])) && W(n[0], t, Math.round(w[0]), l[0], e.scrollEasing, e.overwrite, {
						onStart: function() {
							e.callbacks && e.onStart && !i.tweenRunning && (f("onScrollStart") && (h(), j.callbacks.onScrollStart.call(b[0])), i.tweenRunning = !0, x(s), i.cbOffsets = g())
						},
						onUpdate: function() {
							e.callbacks && e.onUpdate && f("whileScrolling") && (h(), j.callbacks.whileScrolling.call(b[0]))
						},
						onComplete: function() {
							if (e.callbacks && e.onComplete) {
								"yx" === j.axis && clearTimeout(n[0].onCompleteTimeout);
								var a = n[0].idleTimer || 0;
								n[0].onCompleteTimeout = setTimeout(function() {
									f("onScroll") && (h(), j.callbacks.onScroll.call(b[0])), f("onTotalScroll") && w[1] >= v[1] - A && i.cbOffsets[0] && (h(), j.callbacks.onTotalScroll.call(b[0])), f("onTotalScrollBack") && w[1] <= B && i.cbOffsets[1] && (h(), j.callbacks.onTotalScrollBack.call(b[0])), i.tweenRunning = !1, n[0].idleTimer = 0, x(s, "hide")
								}, a)
							}
						}
					})
				}
			}, W = function(a, b, c, d, e, f, g) {
				function h() {
					v.stop || (s || o.call(), s = X() - r, i(), s >= v.time && (v.time = s > v.time ? s + m - (s - v.time) : s + m - 1, v.time < s + 1 && (v.time = s + 1)), v.time < d ? v.id = n(h) : q.call())
				}
				function i() {
					d > 0 ? (v.currVal = l(v.time, t, w, d, e), u[b] = Math.round(v.currVal) + "px") : u[b] = c + "px", p.call()
				}
				function j() {
					m = 1e3 / 60, v.time = s + m, n = window.requestAnimationFrame ? window.requestAnimationFrame : function(a) {
						return i(), setTimeout(a, .01)
					}, v.id = n(h)
				}
				function k() {
					null != v.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(v.id) : clearTimeout(v.id), v.id = null)
				}
				function l(a, b, c, d, e) {
					switch (e) {
						case "linear":
						case "mcsLinear":
							return c * a / d + b;
						case "mcsLinearOut":
							return a /= d, a--, c * Math.sqrt(1 - a * a) + b;
						case "easeInOutSmooth":
							return a /= d / 2, 1 > a ? c / 2 * a * a + b : (a--, -c / 2 * (a * (a - 2) - 1) + b);
						case "easeInOutStrong":
							return a /= d / 2, 1 > a ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : (a--, c / 2 * (-Math.pow(2, -10 * a) + 2) + b);
						case "easeInOut":
						case "mcsEaseInOut":
							return a /= d / 2, 1 > a ? c / 2 * a * a * a + b : (a -= 2, c / 2 * (a * a * a + 2) + b);
						case "easeOutSmooth":
							return a /= d, a--, -c * (a * a * a * a - 1) + b;
						case "easeOutStrong":
							return c * (-Math.pow(2, -10 * a / d) + 1) + b;
						case "easeOut":
						case "mcsEaseOut":
						default:
							var f = (a /= d) * a,
								g = f * a;
							return b + c * (.499999999999997 * g * f + -2.5 * f * f + 5.5 * g + -6.5 * f + 4 * a)
					}
				}
				a._mTween || (a._mTween = {
					top: {},
					left: {}
				});
				var m, n, g = g || {}, o = g.onStart || function() {}, p = g.onUpdate || function() {}, q = g.onComplete || function() {}, r = X(),
					s = 0,
					t = a.offsetTop,
					u = a.style,
					v = a._mTween[b];
				"left" === b && (t = a.offsetLeft);
				var w = c - t;
				v.stop = 0, "none" !== f && k(), j()
			}, X = function() {
				return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
			}, Y = function() {
				var a = this;
				a._mTween || (a._mTween = {
					top: {},
					left: {}
				});
				for (var b = ["top", "left"], c = 0; c < b.length; c++) {
					var d = b[c];
					a._mTween[d].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(a._mTween[d].id) : clearTimeout(a._mTween[d].id), a._mTween[d].id = null, a._mTween[d].stop = 1)
				}
			}, Z = function(a, b) {
				try {
					delete a[b]
				} catch (c) {
					a[b] = null
				}
			}, $ = function(a) {
				return !(a.which && 1 !== a.which)
			}, _ = function(a) {
				var b = a.originalEvent.pointerType;
				return !(b && "touch" !== b && 2 !== b)
			}, ab = function(a) {
				return !isNaN(parseFloat(a)) && isFinite(a)
			}, bb = function(a) {
				var b = a.parents(".mCSB_container");
				return [a.offset().top - b.offset().top, a.offset().left - b.offset().left]
			}, cb = function() {
				function a() {
					var a = ["webkit", "moz", "ms", "o"];
					if ("hidden" in document) return "hidden";
					for (var b = 0; b < a.length; b++) if (a[b] + "Hidden" in document) return a[b] + "Hidden";
					return null
				}
				var b = a();
				return b ? document[b] : !1
			};
		a.fn[c] = function(b) {
			return l[b] ? l[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : l.init.apply(this, arguments)
		}, a[c] = function(b) {
			return l[b] ? l[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : l.init.apply(this, arguments)
		}, a[c].defaults = f, window[c] = !0, a(window).load(function() {
			a(e)[c](), a.extend(a.expr[":"], {
				mcsInView: a.expr[":"].mcsInView || function(b) {
					var c, d, e = a(b),
						f = e.parents(".mCSB_container");
					return f.length ? (c = f.parent(), d = [f[0].offsetTop, f[0].offsetLeft], d[0] + bb(e)[0] >= 0 && d[0] + bb(e)[0] < c.height() - e.outerHeight(!1) && d[1] + bb(e)[1] >= 0 && d[1] + bb(e)[1] < c.width() - e.outerWidth(!1)) : void 0
				},
				mcsOverflow: a.expr[":"].mcsOverflow || function(b) {
					var c = a(b).data(d);
					return c ? c.overflowed[0] || c.overflowed[1] : void 0
				}
			})
		})
	})
}), ! function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
	var b = "waitForImages";
	a.waitForImages = {
		hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
		hasImageAttributes: ["srcset"]
	}, a.expr[":"]["has-src"] = function(b) {
		return a(b).is('img[src][src!=""]')
	}, a.expr[":"].uncached = function(b) {
		return a(b).is(":has-src") ? !b.complete : !1
	}, a.fn.waitForImages = function() {
		var c, d, e, f = 0,
			g = 0,
			h = a.Deferred();
		if (a.isPlainObject(arguments[0]) ? (e = arguments[0].waitForAll, d = arguments[0].each, c = arguments[0].finished) : 1 === arguments.length && "boolean" === a.type(arguments[0]) ? e = arguments[0] : (c = arguments[0], d = arguments[1], e = arguments[2]), c = c || a.noop, d = d || a.noop, e = !! e, !a.isFunction(c) || !a.isFunction(d)) throw new TypeError("An invalid callback was supplied.");
		return this.each(function() {
			var i = a(this),
				j = [],
				k = a.waitForImages.hasImageProperties || [],
				l = a.waitForImages.hasImageAttributes || [],
				m = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
			e ? i.find("*").addBack().each(function() {
				var b = a(this);
				b.is("img:has-src") && j.push({
					src: b.attr("src"),
					element: b[0]
				}), a.each(k, function(a, c) {
					var d, e = b.css(c);
					if (!e) return !0;
					for (; d = m.exec(e);) j.push({
						src: d[2],
						element: b[0]
					})
				}), a.each(l, function(c, d) {
					var e, f = b.attr(d);
					return f ? (e = f.split(","), void a.each(e, function(c, d) {
						d = a.trim(d).split(" ")[0], j.push({
							src: d,
							element: b[0]
						})
					})) : !0
				})
			}) : i.find("img:has-src").each(function() {
				j.push({
					src: this.src,
					element: this
				})
			}), f = j.length, g = 0, 0 === f && (c.call(i[0]), h.resolveWith(i[0])), a.each(j, function(e, j) {
				var k = new Image,
					l = "load." + b + " error." + b;
				a(k).one(l, function m(b) {
					var e = [g, f, "load" == b.type];
					return g++, d.apply(j.element, e), h.notifyWith(j.element, e), a(this).off(l, m), g == f ? (c.call(i[0]), h.resolveWith(i[0]), !1) : void 0
				}), k.src = j.src
			})
		}), h.promise()
	}
});