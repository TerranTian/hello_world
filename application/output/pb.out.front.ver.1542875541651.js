function Slider() {
	this.$el = null, this.$dom = {
		$slider: null,
		$container: null,
		$images: null,
		$cells: null,
		$prevBox: null,
		$nextBox: null,
		$imageBox: null,
		$coverBox: null,
		$text: null
	}, this.settings = {
		heightPercent: .9
	}, this.id = "", this.siteTitle = "", this.items = [], this.const = {}, this.runt = {
		pauseTimerTemporary: !1,
		skipInterval: !1
	};
	var a = function() {
		var a = $(".videoIframe");
		a.length > 0 && a.each(function() {
			$(this).remove()
		})
	};
	this.removeEvents = function() {
		$(this.$dom.prevBox).off("click"), $(this.$dom.nextBox).off("click"), $(this.$dom.slider).unbind("swipe"), this.$dom.imageBox.find(".closeInFigcaption").off("click"), this.$dom.slider.off("click.playVideo"), this.$dom.slider.off("touchstart.playVideo"), $(document).off("keydown.keyNav"), $(window).off("resize.sliderResize"), this.$dom.slider.on("mousemove.fullscreen").off(), clearInterval(this.autoTimer)
	}, this.create = function(a, b, c) {
		this.id = a, this.siteTitle = c, this.items = b;
		var d = this;
		this._createContainer(function() {
			d._createCells(), d._initDom(), d._initMobileFeatures()
		})
	}, this.open = function(b, c, d, e) {
		this.$el = b, this.$el.append(this.$dom.slider), this._setSettings(e), this._setTypeSettings(d), this._initEvents();
		var f = this;
		setTimeout(function() {
			f._initSizeDependencies(), f._loadImage(c)
		}, 1), a()
	}, this.removeSlider = function() {
		this.$dom.slider.remove(), delete this.$dom.slider
	}, this.goToItem = function(b) {
		var c = this;
		this.$dom.container.fadeOut(100, function() {
			c._loadImage(b), c.$dom.container.fadeIn(100)
		}), a()
	}, this.update = function(a, b) {
		this.id = a, this.items = b, this.$dom.slider.remove();
		var c = this;
		if (this._createContainer(function() {
			c._createCells(), c._initDom()
		}), clearInterval(this.autoTimer), 1 != this.settings.pauseTiming) {
			var c = this;
			this.autoTimer = window.setInterval(function() {
				1 != c.runt.pauseTimerTemporary && (c.runt.skipInterval ? c.runt.skipInterval = !1 : c._changeImage(!0))
			}, this.settings.timing)
		}
	}, this._loadImage = function(a) {
		var b = this;
		a = parseInt(a), (void 0 == a || isNaN(a) || null == a) && (a = 0), (0 > a || a > this.settings.nrOfItems - 1) && (a = 0);
		var c = a,
			d = this.$dom.slider.find(".cell"),
			e = this.$dom.slider.find(".cell").eq(c);
		this.runt.currentFilePath = b._setSrcOnActiveImage(e), b._setSrcNeighborImages(e, c);
		var f = a * this.runt.contentWidth;
		this.$dom.slider.animate({
			scrollLeft: f
		}, 1, function() {
			b.$dom.container.css("opacity", 1)
		}), this.runt.currentScrollLeft = f, this.runt.currentIndex = a, d.removeClass("active"), e.addClass("active"), this._removeActiveClassOnSiblings(e, "slide"), this._adjustListTextWidth(e)
	}, this._changeImage = function(b) {
		var c = this;
		if (0 == this.runt.pauseTimerTemporary) {
			this.runt.pauseTimerTemporary = !0;
			var d = 0,
				e = this.runt.currentIndex;
			b ? (e += 1, d = parseInt(this.runt.currentScrollLeft) + this.runt.contentWidth) : (e -= 1, d = parseInt(this.runt.currentScrollLeft) - this.runt.contentWidth), e > this.settings.nrOfItems - 1 ? (e = 0, d = 0) : 0 > e && (e = this.settings.nrOfItems - 1, d = this.runt.totalWidth - this.runt.contentWidth), this.runt.currentIndex = e;
			var f = e,
				g = this.$dom.slider.find(".cell").eq(f);
			if (this._setSrcNeighborImages(g, f), "fade" == this.settings.fx) this.$dom.container.fadeTo(300, .01, function() {
				c.$dom.slider.scrollLeft(d), c.runt.currentScrollLeft = d, c._setActiveClassOnCell(g, "fade"), c.$dom.container.fadeTo(300, 1, function() {
					c.runt.pauseTimerTemporary = !1
				})
			});
			else {
				c._setActiveClassOnCell(g, "slide");
				var h = 400;
				c.const.isTouchCapable && (h = 500), c.$dom.slider.animate({
					scrollLeft: d
				}, h, function() {
					c._removeActiveClassOnSiblings(g, "slide"), c.runt.pauseTimerTemporary = !1
				}), c.runt.currentScrollLeft = d
			}
			this._adjustListTextWidth(g), a(), this.runt.currentFilePath = g.find(".image").attr("src");
			var i = g.index(),
				j = $(".gallerySlider figure.selectedImg");
			j.length > 0 && j.removeClass("selectedImg");
			var k = $(".gallerySlider figure");
			if (k.length > 0) {
				var l = k.eq(i);
				l && l.length > 0 && $(l).addClass("selectedImg")
			}
			return !1
		}
	}, this._setSrcOnActiveImage = function(a) {
		var b = a.find(".image"),
			c = this;
		if (b.attr("src")) b.css("opacity", 1);
		else {
			var d = this._getSrcOfImage(b);
			b.attr("src", d).css("opacity", .1), b.one("load", function() {
				b.fadeTo(1e3, 1)
			}).each(function() {
				this.complete && $(this).load()
			}), b.bind("error", function() {
				var a = c._getSrcIfLoadError($(this));
				$(this).attr("src", a).css("opacity", 1), $(this).unbind("error")
			})
		}
		return d
	}, this._setSrcNeighborImages = function(a, b) {
		var c = this,
			d = b - 1,
			e = b + 1;
		0 == b ? d = this.settings.nrOfItems - 1 : b == this.settings.nrOfItems - 1 && (e = 0);
		var f = this.$dom.slider.find(".cell").eq(e).find(".image");
		if (!f.attr("src")) {
			var g = this._getSrcOfImage(f);
			f.attr("src", g), f.bind("error", function() {
				var a = c._getSrcIfLoadError($(this));
				$(this).attr("src", a).css("opacity", 1), $(this).unbind("error")
			})
		}
		var h = this.$dom.slider.find(".cell").eq(d).find(".image");
		if (!h.attr("src")) {
			var i = this._getSrcOfImage(h);
			h.attr("src", i), h.bind("error", function() {
				var a = c._getSrcIfLoadError($(this));
				$(this).attr("src", a).css("opacity", 1), $(this).unbind("error")
			})
		}
	}, this._setActiveClassOnCell = function(a, b) {
		this.$dom.slider.find(".cell.active").removeClass("active"), a.addClass("active"), "slide" == b && (a.next(".cell").addClass("active"), a.prev(".cell").addClass("active"))
	}, this._removeActiveClassOnSiblings = function(a, b) {
		"slide" == b && (a.next(".cell").removeClass("active"), a.prev(".cell").removeClass("active"))
	}, this._adjustListTextWidth = function(a) {
		if ("fullscreen" != this.settings.type) {
			var b = a.find(".image"),
				c = b.attr("data-width"),
				d = b.attr("data-height"),
				e = c / d,
				f = this.$dom.cells.width(),
				g = this.runt.maxHeight,
				h = f,
				i = h / e;
			i > g && (h = g * e), b.width() > 200 && h > b.width() ? h = b.width() : h > c && (h = c);
			var j = "cover" == this.settings.bgSize && ("fullscreen" == this.settings.type || "fixedheight" == this.settings.type);
			if (1 != this.settings.textPosition && this.settings.textPosition || j) {
				if (2 == this.textPosition) {
					var k = (this.$dom.coverBox.width() - h) / 2 + 10;
					10 > k && (k = 10), this.$dom.nextButton.css("right", k + "px"), this.$dom.prevButton.css("left", k + "px")
				}
			} else 0 == b.width() && h > b.width() ? (a.find("figcaption").css("opacity", 0), pb.utils.getRealImageSize(b, function(c) {
				setTimeout(function() {
					var d = c.width;
					d > b.width() && (d = b.width()), a.find("figcaption").css({
						"margin-left": "0",
						"margin-right": "0",
						opacity: 1
					}), a.find("figcaption").width(d)
				}, 100)
			})) : (a.find("figcaption").css({
				"margin-left": "0",
				"margin-right": "0"
			}), a.find("figcaption").width(h))
		}
	}, this._initSizeDependencies = function() {
		this._initHeight(), this._initWidth()
	}, this._initHeight = function() {
		var a = this;
		if ("fullscreen" == this.settings.type) {
			var b = $(window).width(),
				c = $(window).height();
			this.$dom.slider.height(c), this.$dom.slider.width(b);
			var d = b / c;
			this.$dom.images.each(function() {
				var e = $(this).data("width") / $(this).data("height"),
					f = 0,
					g = 0,
					h = 0;
				"cover" == a.settings.bgSize ? e > d ? (g = c, h = g * e, f = (b - h) / 2, $(this).addClass("wide").removeClass("tall").css("margin-left", f + "px").css("margin-top", 0)) : (h = b, g = h / e, f = (c - g) / 2, $(this).addClass("tall").removeClass("wide").css("margin-top", f + "px").css("margin-left", 0)) : d >= e ? $(this).addClass("tall").removeClass("wide").css("margin-top", 0).css("margin-left", 0) : (h = b, g = h / e, f = (c - g) / 2, $(this).addClass("wide").removeClass("tall").css("margin-top", f + "px").css("margin-left", 0))
			})
		} else if ("fixedheight" == this.settings.type) {
			var e = this.$dom.slider.height(),
				f = this.$dom.slider.width(),
				g = f / e,
				h = this,
				i = pb.environment.isMobile;
			this.$dom.images.each(function() {
				var b = this,
					c = $(this).data("width") / $(this).data("height"),
					d = 0,
					j = 0,
					k = 0;
				if ("cover" == a.settings.bgSize) c > g ? (j = e, k = j * c, d = (f - k) / 2, $(this).addClass("wide").removeClass("tall").css("margin-left", d + "px").css("margin-top", 0)) : (k = f, j = k / c, d = (e - j) / 2, $(this).addClass("tall").removeClass("wide").css("margin-top", d + "px").css("margin-left", 0));
				else {
					var l = function() {
						g >= c ? $(b).addClass("tall").removeClass("wide") : (k = f, j = k / c, d = i ? 15 : (e - j) / 2, $(b).addClass("wide").removeClass("tall").css("margin-top", d + "px"))
					};
					i ? pb.utils.setInterval(function() {
						return $(b).height() > 0 ? (e = h.$dom.slider.height(), f = h.$dom.slider.width(), g = f / e, !0) : void 0
					}, 1, 1e3).done(function() {
						l()
					}).fail(function() {
						l()
					}) : l()
				}
			})
		} else {
			var j = $(window).height();
			if ("incontext" == this.settings.type || "pagepart" == this.settings.type) pb.utils.getMenuHeight(function(b) {
				var c = (j - b) * a.settings.heightPercent;
				a.$dom.images.css("max-height", c + "px"), a.runt.maxHeight = c
			});
			else if ("nomenu" == a.settings.type || "lightbox" == a.settings.type) {
				var k = j * this.settings.heightPercent;
				a.$dom.images.css("max-height", k + "px"), a.runt.maxHeight = k;
				var l = ($(window).height() - k) / 2;
				1 > l && (l = 1), a.$dom.slider.css("margin-top", l + "px");
				var m = a.$dom.slider.width(),
					n = k,
					o = m / k;
				this.$dom.cells.each(function() {
					var b = $(this).find(".image"),
						c = b.data("width") / b.data("height"),
						d = 0,
						e = 0,
						f = 0,
						g = 0;
					if (1 == a.settings.textPosition || pb.environment.isMobile) {
						var h = $(this).find("figcaption"),
							i = h.find(".text").html().length;
						i > 0 && (g = h.height(), g > .3 * n && (g = .3 * n))
					}
					o >= c || (f = m, e = f / c, d = (n - e - g) / 2, 0 > d && (d = 0), $(this).css("margin-top", d + "px"))
				})
			}
		}
	}, this._initWidth = function() {
		var a = this.$dom.slider.width();
		this.runt.contentWidth = a, $(".layout-left").length > 0 && $(".slideshowandthumbs04").length > 0 && 1600 > a && a > 460 && (this.runt.contentWidth = a - 40), this.runt.totalWidth = this.runt.contentWidth * this.settings.nrOfItems, this.$dom.container.width(this.runt.totalWidth), this.$dom.cells.width(this.runt.contentWidth)
	}, this._createContainer = function(a) {
		this.$dom.slider = $('<div class="slider"></div>'), this.$dom.container = $('<div class="container"></div>'), this.$dom.slider.append(this.$dom.container).ready(function() {
			a()
		})
	}, this._createCells = function() {
		var a = this,
			b = this.items || [];
		b = pb.utils.sortByKey(b, "Idx"), $.each(b, function(b, c) {
			var d = a._createCell(c);
			a.$dom.container.append(d)
		})
	}, this._createCell = function(a) {
		var b = "",
			c = function(a) {
				return a.VideoUrl && "" != a.VideoUrl
			}, d = this.siteTitle,
			e = function(a) {
				var b = "";
				if (a.FileName && "{" == a.FileName.charAt(0)) {
					var e = JSON.parse(a.FileName);
					if (e.farm) {
						var f = "https://www.flickr.com/photos/" + pb.data.site.FlickrNsId + "/" + e.id;
						b = "<a href='" + f + "' class='flickrLink' target='_blank' style='display: block'><span class='smicon-1-flickr'></span></a>"
					}
				}
				var g = b + "<img class='image' data-s3='" + a.S3LocationId + "' data-filename='" + a.FileName + "'  alt=\"" + pb.utils.getImgAltOrPageTitle(a.ListText, d) + '"  title="' + pb.utils.getImgAltOrPageTitle(a.ListText, d) + '" width=auto height=auto data-width="' + a.Width + '" data-height="' + a.Height + '" ';
				return g += c(a) ? 'data-videothumb="' + a.VideoThumbUrl + '" />' : "/>"
			};
		b += '<div class="cell"><figure><div class="imageBox"><div class="coverBox">' + e(a) + '<div class="prevBox"><div class="prevButton"><span class="icon-navigate-left"></span></div></div><div class="nextBox"><div class="nextButton"><span class="icon-navigate-right"></span></div></div> </div><figcaption class="fig" ' + (a.TextContent ? "" : 'style="visibility: hidden;"') + '><div class="closeInFigcaption"><span class="icon-close"></span></div><div class="shareButtons"></div><div class="text">' + (a.TextContent ? a.TextContent : "") + "</div></figcaption></div></figure></div>";
		var f = $(b);
		return c(a) && f.find(".image").wrap("<div class='videoItem'>").after("<span class='playVideo' data-url='" + a.VideoUrl + "'><span class='icon-play'></span></div>"), f
	}, this._setSettings = function(a) {
		this.settings = a, 2 == this.settings.textPosition ? (this.$dom.container.addClass("textp-right"), this.$dom.slider.addClass("slider-textp-right")) : this.$dom.container.addClass(3 == this.settings.textPosition ? "textp-hover" : "textp-bottom"), "cover" == this.settings.bgSize ? this.$dom.container.addClass("cover") : "contain" == this.settings.bgSize && this.$dom.container.addClass("contain"), this.const.isTouchCapable && (this.settings.fx = "scrollLeft", this.settings.pauseTiming = 1)
	}, this._setTypeSettings = function(a) {
		this.settings.type = a, this.settings.layoutType = pb.data.site.DsnLayoutType, this.settings.nrOfItems = this.items.length || 0, this.settings.heightPercent = "fullscreen" == a ? 1 : "fixedheight" == a ? 1 : "nomenu" == a ? .85 : "pagepart" == a ? .8 : .85, this.$dom.slider.addClass(this.settings.type), this.settings.nrOfItems < 2 && this.$dom.slider.addClass("singleImage")
	}, this._initDom = function() {
		this.$dom.images = this.$dom.slider.find(".image"), this.$dom.cells = this.$dom.slider.find(".cell"), this.$dom.prevBox = this.$dom.slider.find(".prevBox"), this.$dom.nextBox = this.$dom.slider.find(".nextBox"), this.$dom.prevButton = this.$dom.slider.find(".prevButton"), this.$dom.nextButton = this.$dom.slider.find(".nextButton"), this.$dom.imageBox = this.$dom.slider.find(".imageBox"), this.$dom.coverBox = this.$dom.slider.find(".coverBox"), this.$dom.text = this.$dom.slider.find(".text")
	}, this._initMobileFeatures = function() {
		this.const.isTouchCapable = pb.environment.isTablet || pb.environment.isMobile, this.const.isTouchCapable && this.$dom.slider.addClass("isTouch")
	}, this._initEvents = function() {
		var a = this;
		pb.utils.resizeAndDestroy(void 0, "sliderResize", function() {
			a._initSizeDependencies(), a._loadImage(a.runt.currentIndex)
		}), 1 != this.settings.pauseTiming && (a.autoTimer = window.setInterval(function() {
			1 != a.runt.pauseTimerTemporary && (a.runt.skipInterval ? a.runt.skipInterval = !1 : a._changeImage(!0))
		}, this.settings.timing));
		var b;
		if ($(document).on("keydown.keyNav", function(c) {
			37 == c.keyCode && (b = !1, a.runt.skipInterval = !0, a._changeImage(b)), 39 == c.keyCode && (b = !0, a.runt.skipInterval = !0, a._changeImage(b))
		}), this.$dom.nextBox.on("mouseenter", function() {
			a.$dom.nextButton.fadeIn(1)
		}), this.$dom.nextBox.on("mouseleave", function() {
			a.$dom.nextButton.fadeOut(1)
		}), this.$dom.prevBox.on("mouseenter", function() {
			a.$dom.prevButton.fadeIn(1)
		}), this.$dom.prevBox.on("mouseleave", function() {
			a.$dom.prevButton.fadeOut(1)
		}), this.const.isTouchCapable ? $(this.$dom.slider).bind("swipe", function(b, c) {
			var d = c.direction;
			if ("left" == d || "right" == d) {
				var e = "left" == c.direction;
				a.runt.skipInterval = !0, a._changeImage(e)
			}
		}) : ($(this.$dom.prevBox).click(function() {
			var b = $(this).hasClass("nextBox");
			a.runt.skipInterval = !0, a._changeImage(b)
		}), $(this.$dom.nextBox).click(function() {
			var b = $(this).hasClass("nextBox");
			a.runt.skipInterval = !0, a._changeImage(b)
		})), "fullscreen" !== this.settings.type) 3 != this.settings.textPosition || this.const.isTouchCapable || (this.$dom.imageBox.find(".closeInFigcaption").click(function() {
			$(this).closest("figcaption.fig").fadeOut(200).removeClass("isShown")
		}), this.$dom.imageBox.hover(function() {
			$(this).find("figcaption.fig").fadeIn(200).addClass("isShown")
		}, function() {
			$(this).find("figcaption.fig").fadeOut(300).removeClass("isShown")
		})), 3 == this.settings.textPosition && this.const.isTouchCapable && (this.$dom.coverBox.singletap(function() {
			$(this).closest("figure").find("figcaption.fig").fadeIn(200).addClass("isShown")
		}), this.$dom.imageBox.find(".closeInFigcaption").singletap(function() {
			$(this).closest("figcaption.fig").fadeOut(200).removeClass("isShown")
		}));
		else if (3 == this.settings.textPosition) if (this.const.isTouchCapable) this.$dom.coverBox.singletap(function() {
			$(this).closest("figure").find("figcaption.fig").fadeIn(200).addClass("isShown")
		}), this.$dom.imageBox.find(".closeBottom").singletap(function() {
			$(this).closest("figcaption.fig").fadeOut(200).removeClass("isShown")
		});
		else {
			{
				$(window).height()
			}
			this.$dom.imageBox.hover(function() {
				$(this).find("figcaption.fig").fadeIn(200).addClass("isShown")
			}, function() {
				$(this).find("figcaption.fig").fadeOut(300).removeClass("isShown")
			})
		} else this.$dom.imageBox.find(".closeInFigcaption").click(function() {
			$(this).closest("figcaption.fig").fadeOut(200).removeClass("isShown")
		}), this.$dom.imageBox.hover(function() {
			$(this).find("figcaption.fig").fadeIn(200).addClass("isShown")
		}, function() {});
		var c = this.autoTimer;
		this.$dom.slider.on("click.playVideo touchstart.playVideo", ".playVideo", function() {
			clearInterval(c);
			var a = $(this).data("url"),
				b = '<div class="videoIframe"><iframe src="' + a + '?autoplay=1" frameborder="0" width="100%" height="100%" style="width: 100%; height:100%;" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',
				d = $(this).closest(".videoItem");
			d.append(b)
		})
	}, this._getSrcOfImage = function(a) {
		if (a.attr("data-videothumb") && "" != a.attr("data-videothumb")) return a.attr("data-videothumb");
		var b, c, d = this,
			e = a.attr("data-filename"),
			f = function(a, c) {
				var d = c.attr("data-width") / c.attr("data-height"),
					e = 400 * d,
					f = 800 * d,
					g = 1e3,
					h = 400,
					i = 400 / d,
					j = 1e3 / d,
					k = 400,
					l = 800;
				if ("fixedheight" != a.settings.type && "fullscreen" != a.settings.type || "cover" != a.settings.bgSize) {
					var m = pb.environment.height,
						n = pb.environment.width;
					"fixedheight" == a.settings.type ? (m = a.$dom.slider.height(), n = a.$dom.slider.width()) : a.runt.maxHeight && a.runt.maxHeight > 0 && (m = a.runt.maxHeight), d >= 1 ? -1 == pb.data.site.ImageQuality ? h > n ? b = "w400" : i > m ? b = "w400" : e > n ? b = "h400" : k > m ? b = "h400" : g > n ? b = "w1000" : j > m ? b = "w1000" : f > n ? b = "h800" : l > m && (b = "h800") : h > n ? b = "w1000" : i > m ? b = "w1000" : e > n ? b = "h800" : k > m && (b = "h800") : -1 == pb.data.site.ImageQuality ? k > m ? b = "h400" : e > pb.environment.width ? b = "h400" : i > m ? b = "w400" : h > pb.environment.width ? b = "w400" : l > m ? b = "h800" : f > pb.environment.width ? b = "h800" : j > m ? b = "w1000" : g > pb.environment.width && (b = "w1000") : k > m ? b = "h800" : e > pb.environment.width ? b = "h800" : i > m ? b = "w1000" : h > pb.environment.width && (b = "w1000")
				} else {
					var o, p, q;
					"fixedheight" == a.settings.type ? (p = a.$dom.slider.height(), q = a.$dom.slider.width(), o = q / p) : (o = pb.environment.width / pb.environment.height, p = pb.environment.height, q = pb.environment.width), d > o ? -1 == pb.data.site.ImageQuality ? i > p ? b = "w400" : k > p ? b = "h400" : j > p ? b = "w1000" : l > p && (b = "h800") : i > p ? b = "w1000" : k > p && (b = "h800") : -1 == pb.data.site.ImageQuality ? e > q ? b = "h400" : h > q ? b = "w400" : f > q ? b = "h800" : g > q && (b = "w1000") : e > q ? b = "h800" : h > q && (b = "w1000")
				}
				return b
			};
		if (b = f(d, a), e && "{" != e.charAt(0)) {
			var g = pb.constants.getS3PathById(a.attr("data-s3")),
				h = g + "/" + pb.data.site.Id + "/page/";
			c = void 0 == b ? h + e : h + b + "-" + e
		} else if (e) {
			var i = JSON.parse(e);
			if (1 == i.dummy) c = pb.utils.getDummyImageUrl(i, b);
			else if (i.creativeGuid) c = pb.utils.getFindCreativeImageUrl(i, b);
			else {
				var j = i.sizes ? i.sizes : "",
					k = pb.utils.convertThumbTypeToFlickrAppendix(b, j);
				c = pb.utils.getFlickrPhotoUrl(i, k)
			}
		}
		return c
	}, this._getSrcIfLoadError = function(a) {
		if (a.attr("data-videothumb") && "" != a.attr("data-videothumb")) return a.attr("data-videothumb");
		var b = a.attr("data-filename");
		if (b && "{" != b.charAt(0)) {
			var c = pb.constants.getS3PathById(a.attr("data-s3")),
				d = c + "/" + pb.data.site.Id + "/page/";
			return d + b
		}
		if (b) {
			var e = JSON.parse(b);
			return e.creativeGuid ? pb.utils.getFindCreativeImageUrl(e, void 0) : pb.utils.getFlickrSafeSizeUrl(e)
		}
	}
}
function LightBox() {
	var a = null,
		b = [],
		c = null,
		d = {
			lightboxSlider: null,
			container: null,
			images: null,
			cells: null,
			prevBox: null,
			nextBox: null,
			prevButton: null,
			nextButton: null,
			imageBox: null,
			coverBox: null,
			text: null,
			videos: null
		}, e = {
			"const": {},
			maxHeight: 0
		}, f = function() {
			d.lightboxSlider = $('<div class="lightboxSlider"></div>'), d.container = $('<div class="container"></div>'), d.lightboxSlider.append(d.container)
		}, g = function(a) {
			switch (a[c.Type]) {
				case "video":
					var b = '<div class="cell"><figure><div class="imageBox videoBox"><div class="coverBox"><video class="video" poster="' + a[c.Src] + '" width=auto height=auto controls><source src="' + a[c.VideoSrc] + '"></video><div class="prevBox"><div class="prevButton"><span class="icon-navigate-left"></span></div></div><div class="nextBox"><div class="nextButton"><span class="icon-navigate-right"></span></div></div></div><figcaption><div class="text">' + a[c.Title] + "</div></figcaption></div></figure></div>";
					break;
				case "carousel":
					var b = '<div class="cell"><figure><div class="imageBox carouselBox"><div class="coverBox">';
					a.carousel_media.forEach(function(a) {
						"video" == a.type && (b += '<video class="video carouselItem" width=auto height=auto controls><source src="' + a.videos.standard_resolution.url + '"></video>'), "image" == a.type && (b += '<img class="image carouselItem" src="' + a.images.standard_resolution.url + '" alt="" width=auto height=auto/>')
					}), b += '<div class="prevBox"><div class="prevButton"><span class="icon-navigate-left"></span></div></div><div class="nextBox"><div class="nextButton"><span class="icon-navigate-right"></span></div></div></div><figcaption><div class="text">' + a[c.Title] + "</div></figcaption></div></figure></div>";
					break;
				default:
					var b = '<div class="cell"><figure><div class="imageBox"><div class="coverBox"><img class="image" data-src="' + a[c.Src] + '" alt="" width=auto height=auto/><div class="prevBox"><div class="prevButton"><span class="icon-navigate-left"></span></div></div><div class="nextBox"><div class="nextButton"><span class="icon-navigate-right"></span></div></div></div><figcaption><div class="text">' + a[c.Title] + "</div></figcaption></div></figure></div>"
			}
			return $(b)
		}, h = function() {
			var a = null;
			$.each(b, function(b, c) {
				a = g(c), d.container.append(a)
			})
		}, i = function(a) {
			null === d.videos && (d.videos = $("video")), d.videos.each(function() {
				this.pause()
			});
			var b = 0,
				c = e.currentIndex;
			a ? (c += 1, b = parseInt(e.currentScrollLeft) + e.contentWidth) : (c -= 1, b = parseInt(e.currentScrollLeft) - e.contentWidth), c > e.nrOfItems - 1 ? (c = 0, b = 0) : 0 > c && (c = e.nrOfItems - 1, b = e.totalWidth - e.contentWidth), e.currentIndex = c;
			var f = c,
				g = d.lightboxSlider.find(".cell").eq(f);
			l(g, f);
			var h = 400;
			return d.lightboxSlider.animate({
				scrollLeft: b
			}, h), e.currentScrollLeft = b, n(g), !1
		}, j = function() {
			$(window).resize(function() {
				k(), o(e.currentIndex)
			});
			var a;
			$(document).keydown(function(b) {
				37 == b.keyCode && (a = !1, i(a)), 39 == b.keyCode && (a = !0, i(a))
			}), d.nextBox.on("mouseenter", function() {
				d.nextButton.fadeIn(1)
			}), d.nextBox.on("mouseleave", function() {
				d.nextButton.fadeOut(1)
			}), d.prevBox.on("mouseenter", function() {
				d.prevButton.fadeIn(1)
			}), d.prevBox.on("mouseleave", function() {
				d.prevButton.fadeOut(1)
			}), e.const.isTouchCapable ? $(d.lightboxSlider).bind("swipe", function(a, b) {
				var c = b.direction;
				if ("left" == c || "right" == c) {
					var d = "left" == b.direction;
					i(d)
				}
			}) : ($(d.prevBox).click(function() {
				var a = !1;
				i(a)
			}), $(d.nextBox).click(function() {
				var a = !0;
				i(a)
			})), d.imageBox.hover(function() {
				$(this).find("figcaption").fadeIn(200).addClass("isShown")
			}, function() {
				$(this).find("figcaption").fadeOut(200).removeClass("isShown")
			})
		}, k = function() {
			var a = $(window).height(),
				b = .9 * a;
			d.images.css("max-height", b + "px"), e.maxHeight = b;
			var c = ($(window).height() - b) / 2;
			1 > c && (c = 1), d.lightboxSlider.css("margin-top", c + "px"), e.contentWidth = d.lightboxSlider.width(), e.totalWidth = e.contentWidth * e.nrOfItems, d.container.width(e.totalWidth), d.cells.width(e.contentWidth)
		}, l = function(a, b) {
			var c = b - 1,
				f = b + 1;
			0 == b ? c = e.nrOfItems - 1 : b == e.nrOfItems - 1 && (f = 0);
			var g = d.lightboxSlider.find(".cell").eq(f).find(".image");
			if (!g.attr("src")) {
				var h = g.attr("data-src");
				g.attr("src", h)
			}
			var i = d.lightboxSlider.find(".cell").eq(c).find(".image");
			if (!i.attr("src")) {
				var j = i.attr("data-src");
				i.attr("src", j)
			}
		}, m = function(a) {
			var b = a.find(".image"),
				c = b.attr("data-src");
			b.attr("src", c)
		}, n = function(a) {
			var b = a.find(".image"),
				c = b.width();
			0 == c || void 0 == c ? b.load(function() {
				c = b.width(), a.find("figcaption").width(c)
			}) : a.find("figcaption").width(c)
		}, o = function(a) {
			a = parseInt(a), (void 0 == a || isNaN(a) || null == a) && (a = 0), a = 0 > a || a > e.nrOfItems - 1 ? 0 : a;
			var b = a,
				c = d.lightboxSlider.find(".cell").eq(b);
			m(c), l(c, b);
			var f = a * e.contentWidth;
			d.lightboxSlider.animate({
				scrollLeft: f
			}, 1, function() {
				d.container.css("opacity", 1)
			}), e.currentScrollLeft = f, e.currentIndex = a, n(c)
		}, p = function() {
			e.const.isTouchCapable = $.isTouchCapable(), e.const.isTouchCapable && d.lightboxSlider.css("overflow-x", "scroll")
		}, q = function() {
			d.images = d.lightboxSlider.find(".image"), d.cells = d.lightboxSlider.find(".cell"), d.prevBox = d.lightboxSlider.find(".prevBox"), d.nextBox = d.lightboxSlider.find(".nextBox"), d.prevButton = d.lightboxSlider.find(".prevButton"), d.nextButton = d.lightboxSlider.find(".nextButton"), d.imageBox = d.lightboxSlider.find(".imageBox"), d.coverBox = d.lightboxSlider.find(".coverBox"), d.text = d.lightboxSlider.find(".text")
		}, r = function(a, d) {
			b = a, c = d, f(), h(), q(), p()
		}, s = function(c, f) {
			a = c, a.append(d.lightboxSlider), e.nrOfItems = b.length, j(), k(), o(f)
		};
	return {
		create: r,
		open: s
	}
}
var pb = pb || {};
pb.publicApi = function() {
	var a = function() {
		amplify.request.define("getPageByUrl", "ajax", {
			url: "/api/public/pageapi/getpagebyurl",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getListOfPageByGuid", "ajax", {
			url: "/api/public/pageapi/getlistofpagebyguid",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getPageByGuid", "ajax", {
			url: "/api/public/pageapi/getpagebyguid",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("loginToPage", "ajax", {
			url: "/api/authentication/pageloginapi/logintopage",
			dataType: "json",
			cache: !1,
			type: "POST"
		}), amplify.request.define("getimagesbyflickrid", "ajax", {
			url: "/api/public/miscapi/getimagesbyflickrid",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("getCommentsForPost", "ajax", {
			url: "/api/public/miscapi/getcommentsforpost",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("saveComment", "ajax", {
			url: "/api/public/miscapi/savecomment",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("saveGuestbookMessage", "ajax", {
			url: "/api/public/miscapi/newguestbookmessage",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("getGuestbookMessage", "ajax", {
			url: "/api/public/miscapi/getguestbookmessage",
			dataType: "json",
			cache: !1,
			type: "POST"
		}), amplify.request.define("checkout", "ajax", {
			url: "/api/public/shopapi/checkout",
			dataType: "json",
			cache: !1,
			type: "POST"
		}), amplify.request.define("completeInvoice", "ajax", {
			url: "/api/public/shopapi/completeinvoice",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("get-countries", "ajax", {
			url: "/api/public/resourcesapi/getcountries",
			dataType: "json",
			type: "GET",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("getinstagramdata", "ajax", {
			url: "/api/public/miscapi/getinstagramdata",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("postNewBlockMessage", "ajax", {
			url: "/api/public/miscapi/newblockmessage",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("saveFollower", "ajax", {
			url: "/api/public/miscapi/savefollower",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("logoutFront", "ajax", {
			url: "/api/public/miscapi/logoutFront",
			dataType: "json",
			type: "POST",
			cache: !1,
			decoder: "errorMsgFromServer"
		}), amplify.request.define("getMemberGalleryByGuid", "ajax", {
			url: "/api/public/clubapi/getmembergallerybyguid",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getMemberPostByGuid", "ajax", {
			url: "/api/public/clubapi/getmemberpostbyguid",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getFullMemberSiteById", "ajax", {
			url: "/api/public/clubapi/getfullmemberbysiteid",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getSinglePost", "ajax", {
			url: "/api/public/blogpostapi/getsinglepost",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("getMultiplePost", "ajax", {
			url: "/api/public/blogpostapi/getmultiplepost",
			dataType: "json",
			cache: !1,
			type: "GET"
		}), amplify.request.define("doLike", "ajax", {
			url: "/api/public/miscapi/dolike",
			dataType: "json",
			type: "POST",
			cache: !1
		})
	}, b = function() {
		amplify.subscribe("request.error", function(a, b, c) {
			var d = c.responseText;
			console.log(pb.utils.isNumeric(d) ? "There was an error with the following code: " + d + " and message: " + pb.lang.text.errorCodes[d] : "Unknown error!")
		})
	}, c = function() {
		b(), a()
	};
	return {
		init: c
	}
}();
var pb = pb || {};
pb.commonApi = function() {
	var a = function() {}, b = function() {
		a()
	};
	return {
		init: b
	}
}();
var pb = pb || {};
pb.constants = function() {
	//terran
	// var a = "https://d28avw9ny3vgf2.cloudfront.net",
	var a = "",
		b = 1,
		c = function() {
			return 1 == b ? a : ""
		}, d = {
			0: "https://dvqlxo2m2q99q.cloudfront.net/000_clients",
			1: "https://d2f8l4t0zpiyim.cloudfront.net/000_clients",
			2: "https://dkemhji6i1k0x.cloudfront.net/000_clients",
			3: "https://dif1tzfqclj9f.cloudfront.net/000_clients",
			4: "https://d37b3blifa5mva.cloudfront.net/000_clients",
			5: "https://d3dvldql7ksohz.cloudfront.net/000_clients",
			6: "https://dglb26w8rx2ld.cloudfront.net/000_clients"
		}, e = function(a) {
			// @terran
			// return d[a]
			return "000_clients";
		}, f = {
			1: "poetry-page",
			3: "cover-big-title",
			4: "links-1",
			7: "grid",
			10: "horizontal",
			12: "thumb-sameratio",
			17: "thumbs-original-ratio",
			18: "thumbs-square",
			21: "vertical",
			24: "vertical-two-amp-one",
			25: "gallery-vertical-three-one",
			26: "product-vertical-three-one",
			27: "othersocialflickr",
			29: "guestbook",
			30: "gallery-two-three",
			33: "text-text-plain",
			35: "collection-page-thumbnail",
			37: "collection-vertical-plain",
			38: "collection-vertical-21",
			39: "collection-vertical-three-one",
			51: "horizontal-native",
			55: "cover-big-background",
			57: "text-contact-left-image",
			59: "even-rows",
			60: "blog-verticals",
			61: "blog-thumbs-three-one",
			62: "cover-one-image-1",
			63: "one-page-thumbs",
			64: "one-pages-horizontal-",
			65: "one-page-slideshow",
			66: "one-page-native",
			67: "blog-thumbnails-two-one",
			70: "gallery-threerows",
			71: "multi-page-horizontal",
			72: "multi-thumbnail",
			73: "multi-slideshow",
			74: "multi-page-vertical-",
			75: "slideshow-in-context",
			76: "slideshow-thumbs-below2",
			77: "slideshow-fullscreen",
			78: "gallery-sliedeshow-thumbsbelow3",
			79: "cover-one-image-2",
			80: "parallax",
			81: "collection-two-three",
			82: "shop-two-three",
			100: "shopproofingthumbssameratio",
			101: "slideshow",
			102: "colletionthumbnailsoriginals",
			104: "text-contact-image-map",
			106: "text-slideshow-corporate-plain",
			107: "text-slideshow-corporate-dots",
			108: "text-slideshow-corporate-dots-2",
			109: "text-contact-fullscreen-map",
			111: "shop-proofing-thumbs-grid",
			112: "shop-proofing-thumbs-originals",
			113: "shop-proofing-thumbs-square",
			114: "shop-proofing-slideshow-two-one",
			115: "gallery-slideshow-thumbsabove",
			116: "gallery-sliedeshow-thumbsright",
			117: "text-slideshow-corporate-wide",
			118: "blog-centered-1",
			119: "blog-tags-right",
			120: "onepagerstandard",
			121: "homepage",
			122: "text-contact-image-right",
			123: "text-contact-map-top",
			124: "text-contact-map-top2",
			125: "cover-links3",
			127: "text-contact-contact",
			128: "instagram",
			129: "other-special-video",
			130: "collectionhorizontalstyled",
			131: "collectionhorizontalnative",
			140: "music-soundcloud",
			145: "text-text-contact-right",
			146: "text-big-image",
			147: "text-contact-big-image",
			149: "text-image-left",
			152: "text-image-right",
			157: "shop-proofing-horizontal-native",
			159: "collectionpageevenrows",
			163: "shop-proofing-slideshow-thumbs-below-2",
			165: "shop-proofing-vertical-two-one",
			167: "shop-proofing-vertical-plain",
			170: "collection-multipages-filter",
			177: "text-team-circle",
			178: "text-team-side-to-side",
			179: "text-team-square",
			180: "text-services-inside-boxes",
			181: "text-services-side-to-side",
			182: "text-services-circles",
			183: "text-services-only-text",
			184: "text-cv-right",
			185: "text-cv-center",
			190: "music-spotify",
			191: "music-youtube",
			200: "other-social-flickr-grid",
			201: "other-social-instagram-grid",
			202: "section-page-standard",
			203: "section-page-parallax",
			204: "cover-big-title",
			210: "gallery-thumbs-golden-ratio",
			211: "service-in-box",
			221: "services-zigzag",
			220: "collection-thumbs-golden-ratio",
			230: "shop-thumbs-golden-ratio",
			240: "gallery-thumbs-portraits",
			250: "collection-thumbs-portraits",
			260: "shop-thumbs-portrait",
			270: "gallery-thumbs-align-center",
			280: "collection-thumbs-align-center",
			290: "shop-thumbs-align-center",
			300: "gallery-thumbs-square-2",
			310: "collection-thumbs-square",
			320: "shop-thumbs-square",
			330: "gallery-thumbs-align-bottom",
			340: "collection-thumbs-align-bottom",
			350: "shop-thumbs-align-bottom",
			360: "gallery-horizontal-2",
			370: "collection-horizontal-2",
			380: "shop-horizontal-horizontal-2",
			390: "team-horizontal",
			400: "team-golden-ratio",
			410: "team-portrait",
			420: "team-square",
			430: "service-golden-ratio",
			440: "service-square",
			450: "service-portrait",
			460: "gallery-thumbs-align-bottom-2",
			470: "collectionthumbsalignbottom2",
			480: "shop-thumbs-align-bottom-2",
			490: "text-text-fullscreen-r",
			500: "text-fullscreen-l",
			520: "text-align-center-l",
			530: "text-align-center-r",
			540: "text-half-screen",
			550: "collection-horizontal-changing-links",
			560: "cover-links-horizontal",
			570: "cover-cover-links-corner",
			580: "cover-half-image-and-links",
			590: "cover-cover-slideshow",
			600: "cover-slideshow-and-links",
			610: "cover--slideshow-and-links2",
			620: "text-services-inside-boxes",
			630: "text-services-side-to-side",
			640: "text-services-only-text",
			650: "text-team-circle",
			660: "text-team-side-to-side",
			670: "gallery-thumbs-puzzle",
			680: "collection-thumbs-puzzle-a",
			690: "shop-thumbs-puzzle-a",
			730: "gallery-thumbs-random",
			740: "collection-thumbs-random",
			750: "shop-thumbs-random",
			770: "shop-thumbs-evenrows",
			780: "grid",
			790: "category-page-dynamic-grid",
			800: "shop-proofing-thumbs-grid"
		}, g = function(a) {
			return f[a]
		}, h = 100,
		i = 8,
		j = 50,
		k = 1e3,
		l = 34,
		m = 28,
		n = 24,
		o = 18,
		p = 24,
		q = 5,
		r = 7,
		s = 15,
		t = window.location.hostname,
		u = "https://secure.payment.portfoliobox.net",
		v = "test.me",
		w = {
			appUrl: t.indexOf(v) > -1 == 1 ? "https://www.pbox14.me/mobileadmin" : "https://www.portfoliobox.net/mobileadmin",
			target: "_self",
			options: "location=no,toolbar=no,clearcache=no,hardwareback=no,enableViewportScale=yes",
			createEditPageUrlName: "templates",
			getAppUrl: function(a) {
				return encodeURI(a ? (this.appUrl + "?inAppEdit=" + a.page.Uri + "#/" + this.createEditPageUrlName + "/" + a.page.DsnTemplateType).trim() : (this.appUrl + "#/").trim())
			},
			getFrontUrl: function(a, b) {
				return a = "http://www." + a, encodeURI(b ? (a + "#/" + b.base.mobileApp.seeLiveUrl).trim() : (a + "/?seelive=1").trim())
			}
		}, x = {
			Square: "_s",
			LargeSquare: "_q",
			Thumbnail: "_t",
			Small: "_m",
			Small320: "_n",
			Medium: "",
			Medium640: "_z",
			Medium800: "_c",
			Large: "_b"
		}, y = "6LfffzgUAAAAAJiFD4FTqkSqn1AeJanRwl6EuLyT",
		z = {
			EXTRASMALL: 1,
			SMALL: 2,
			MEDIUM: 0,
			LARGE: 3,
			EXTRALARGE: 4
		}, A = "ca_CHpj1Q89yiNyAPOQmt0xllYq8Ua2mNpa",
		B = "pk_live_ImtNzwZl5f4fgZYTkYoeRt2B",
		C = 72e5,
		D = "https://maps.google.com/maps/api/js?key=AIzaSyBsK0ftk9DwkQXpYG-ttQj3UgUYPkqATU0";
	return {
		getS3PathById: e,
		getServerCdn: c,
		serverCdn: a,
		getExampleUrlForTemplates: g,
		minImgDisplay: j,
		maxImgDisplay: k,
		mobileAppConfig: w,
		maxMobileH1FontSize: l,
		maxMobileH2FontSize: m,
		maxMobileH3FontSize: n,
		maxMobileParagraphFontSize: o,
		maxMobileLineHeight: p,
		maxDisplayImageProp: q,
		maxPostPerPage: i,
		maxProductVariations: r,
		maxProductOptions: s,
		flickrPhotoSizes: x,
		invisibleReCaptchaSitekey: y,
		stripeClientId: A,
		stripeAuthKey: B,
		productOrderExpireTime: C,
		checkoutPageLike: u,
		listImageSizes: z,
		googleMapsApiKey: D,
		maxVideoFileUploadSize: h
	}
}();
var pb = pb || {};
pb.data = function() {
	var a, b, c, d, e = function(a, b) {
		o(function() {
			h.check(a, function(a) {
				p(a), q(a), r(a, function() {
					b()
				})
			})
		})
	}, f = {
		get: function() {
			return d ? d : d = u("timestamp")
		},
		set: function(a) {
			d = a, v("timestamp", a)
		}
	}, g = {
		get: function() {
			return c ? c : c = u("resourceVer")
		},
		set: function(a) {
			c = a, v("resourceVer", c)
		}
	}, h = {
		isResourceVerInvalid: function(a) {
			var b = g.get();
			return void 0 == b || b != a.resourceVer
		},
		isTimestampInValid: function(a) {
			var b = f.get();
			return void 0 == b || a.timestamp != b
		},
		check: function(a, b) {
			var c = this.isTimestampInValid(a),
				d = this.isResourceVerInvalid(a);
			c || d ? (this.clearData(), f.set(a.timestamp), g.set(a.resourceVer), b(a)) : b(a)
		},
		clearData: function() {
			console.log("HARD RESET!!"), pb.data.clearAll()
		}
	}, i = {
		site: function() {
			return void 0 != pb.data.site ? pb.data.site : (pb.data.site = u("site"), pb.data.site)
		},
		menu: function() {
			return void 0 != pb.data.menu ? pb.data.menu : (pb.data.menu = u("menu"), pb.data.menu)
		},
		page: {
			//terran
			byUrl: function(a, b) {
				var c = pb.utils.findItemFromArray(pb.data.pages, "Uri", a);
				if(!c){
					c = pb.utils.findItemFromArray(pb.data.pages, "IsStartPage", 1)
				}
				b(c);

				// c = "/" == a ? pb.utils.findItemFromArray(pb.data.pages, "IsStartPage", 1) : pb.utils.findItemFromArray(pb.data.pages, "Uri", a), 
				// void 0 != c ? b && b(c) : (
				// 	console.info("Sending request by URL"), 
				// 	amplify.request({
				// 		resourceId: "getPageByUrl",
				// 		data: {
				// 			url: a
				// 		},
				// 		success: function(a) {
				// 			if (console.log("BY URL SUCCESS"), void 0 != a && null != a && 0 != a && "false" != a) {
				// 				if (1 != a.IsLocked) {
				// 					var c = pb.utils.findItemFromArray(pb.data.pages, "Uri", a.Uri);
				// 					c ? pb.utils.changeItemInArray(pb.data.pages, "Uri", a.Uri, a) : pb.data.pages.push(a), j.pages(pb.data.pages)
				// 				}
				// 				b && (void 0 != a.Guid && pbAng.PreLoader.getInstance().deepSearch(a), b(a))
				// 			} else b && b(!1)
				// 		},
				// 		error: function(a) {
				// 			console.log("error: " + a)
				// 		}
				// 	})
				// )
			},
			byGuid: function(a, b) {
				var c = pb.utils.findItemFromArray(pb.data.pages, "Guid", a);
				void 0 != c ? b && b(c) : (console.info("Sending request by GUID"), amplify.request("getPageByGuid", {
					guid: a
				}, function(a) {
					if (void 0 != a && null != a && 0 != a && "false" != a) {
						if (1 != a.IsUnPublished && 1 != a.IsPasswordProtected && 1 != a.IsLocked) {
							var c = pb.utils.findItemFromArray(pb.data.pages, "Guid", a.Guid);
							void 0 == c && (pb.data.pages.push(a), j.pages(pb.data.pages))
						}
						b && (void 0 != a.Guid && pbAng.PreLoader.getInstance().deepSearch(a), b(a))
					} else b && b(a)
				}))
			},
			getListOfPageByGuid: function(a, b, c) {
				var d = [];
				amplify.request("getListOfPageByGuid", {
					pagesGuid: a,
					isMenuElements: b
				}, function(a, b) {
					console.log(b), $.each(a, function(a, b) {
						if (1 == b.PageNotFound) d.push(b.Guid);
						else if (b.Guid && 1 != b.IsUnPublished && 1 != b.IsPasswordProtected && 1 != b.IsLocked) {
							var c = pb.utils.findItemFromArray(pb.data.pages, "Guid", b.Guid);
							void 0 == c && (pb.data.pages.push(b), j.pages(pb.data.pages))
						} else b.Guid && d.push(b.Guid)
					}), c(!0, d)
				})
			}
		},
		pages: function(a) {
			//terran
			var data = window.$_pages;
			a(data);

			// pb.data.db ? pb.data.db.get("siteStore", "pages").always(function(b) {
			// 	void 0 != b && void 0 != b.data ? a(b.data) : (console.log("actually not saved"), a(void 0))
			// }) : a(void 0)
		},
		eCommerceSettings: function(a) {
			s("eCommerceSettings", function(b) {
				a(b)
			})
		},
		client: function(a) {
			s("client", function(b) {
				a(b)
			})
		},
		accountInfo: function(a) {
			s("accountInfo", function(b) {
				a(b)
			})
		},
		mediaImages: function(a) {
			s("mediaImages", function(b) {
				a(b)
			})
		},
		mediaFiles: function(a) {
			s("mediaFiles", function(b) {
				a(b)
			})
		},
		taxRegions: function(a) {
			s("taxRegions", function(b) {
				a(b)
			})
		},
		shippingCosts: function(a) {
			s("shippingCosts", function(b) {
				a(b)
			})
		},
		pageList: function(a) {
			s("pageList", function(b) {
				a(b)
			})
		},
		contacts: function(a) {
			s("contacts", function(b) {
				a(b)
			})
		},
		userTranslatedText: function(a) {
			s("userTranslatedText", function(b) {
				a(b)
			})
		},
		comment: function(a) {
			s("comment", function(b) {
				a(b)
			})
		},
		contactMessage: function(a) {
			s("contactMessage", function(b) {
				a(b)
			})
		},
		guestbookentry: function(a) {
			s("guestbookentry", function(b) {
				a(b)
			})
		},
		customDsnTemplates: function(a) {
			s("customDsnTemplates", function(b) {
				a(b)
			})
		},
		emails: function(a) {
			s("emails", function(b) {
				a(b)
			})
		},
		pboxOrders: function(a) {
			s("pboxOrders", function(b) {
				a(b)
			})
		},
		productOrders: function(a) {
			amplify.request({
				resourceId: "get-productOrders",
				success: function(b) {
					a(b.data)
				}
			})
		},
		flickr: {
			photoStream: function(a, b) {
				amplify.request({
					resourceId: "get-flickrPhotoStream",
					data: {
						pageNumber: a
					},
					success: function(a) {
						b(a.data)
					}
				})
			},
			search: function(a, b, c) {
				amplify.request({
					resourceId: "get-flickrSearch",
					data: {
						pageNumber: b,
						text: a
					},
					success: function(a) {
						c(a.data)
					}
				})
			}
		}
	}, j = {
		site: function(a) {
			pb.data.site = a, v("site", a)
		},
		menu: function(a) {
			pb.data.menu = a, v("menu", a)
		},
		client: function(a) {
			t("client", a)
		},
		accountInfo: function(a) {
			t("accountInfo", a)
		},
		contacts: function(a) {
			t("contacts", a)
		},
		shopSetting: function(a) {
			t("shopSetting", a)
		},
		mediaImages: function(a) {
			t("mediaImages", a)
		},
		mediaFiles: function(a) {
			t("mediaFiles", a)
		},
		pages: function(a) {
			var b = {
				data: a
			};
			pb.data.db && pb.data.db.put("siteStore", b, "pages")
		},
		pageList: function(a) {
			var b = {
				data: a
			};
			pb.data.db && pb.data.db.put("siteStore", b, "pageList")
		},
		userTranslatedText: function(a) {
			t("userTranslatedText", a)
		},
		comment: function(a) {
			t("comment", a)
		},
		contactMessage: function(a) {
			t("contactMessage", a)
		},
		guestbookentry: function(a) {
			t("guestbookentry", a)
		},
		customDsnTemplates: function(a) {
			t("customDsnTemplates", a)
		},
		pboxOrders: function(a) {
			t("pboxOrders", a)
		},
		emails: function(a) {
			t("emails", a)
		}
	}, k = {
		pagesArray: function(a) {
			j.pages(a)
		},
		pageList: function(a) {
			j.pageList(a)
		},
		mediaImages: function(a) {
			j.mediaImages(a)
		},
		mediaFiles: function(a) {
			j.mediaFiles(a)
		}
	}, l = {
		Site: function() {
			j.site(pb.data.site)
		},
		MenuElement: function() {
			j.menu(pb.data.menu)
		},
		Page: function() {
			j.pages(pb.data.pages)
		},
		GalleryItem: function() {
			j.pages(pb.data.pages)
		},
		CollectionPage: function() {
			j.pages(pb.data.pages)
		},
		SoundcloudTrack: function() {
			j.pages(pb.data.pages)
		},
		SpotifyTrack: function() {
			j.pages(pb.data.pages)
		},
		YoutubeTrack: function() {
			j.pages(pb.data.pages)
		},
		Music: function() {
			j.pages(pb.data.pages)
		},
		ListItem: function() {
			j.pages(pb.data.pages)
		},
		CvMain: function() {
			j.pages(pb.data.pages)
		},
		CvEducation: function() {
			j.pages(pb.data.pages)
		},
		CvExperience: function() {
			j.pages(pb.data.pages)
		},
		CvAward: function() {
			j.pages(pb.data.pages)
		},
		CvExhibition: function() {
			j.pages(pb.data.pages)
		},
		CvSkill: function() {
			j.pages(pb.data.pages)
		},
		CvLanguage: function() {
			j.pages(pb.data.pages)
		},
		CvInterest: function() {
			j.pages(pb.data.pages)
		},
		Product: function() {
			j.pages(pb.data.pages)
		},
		ProductItem: function() {
			j.pages(pb.data.pages)
		},
		ProductOption: function() {
			j.pages(pb.data.pages)
		},
		ProductOptionAlternative: function() {
			j.pages(pb.data.pages)
		},
		BlogPost: function() {
			j.pages(pb.data.pages)
		},
		Client: function(a) {
			j.client(a)
		},
		AccountInfo: function(a) {
			j.accountInfo(a)
		},
		Contact: function(a) {
			i.contacts(function(b) {
				var c = b;
				pb.utils.changeItemInArray(c, "Guid", a.Guid, a), j.contacts(c)
			})
		},
		TaxRegion: function() {
			j.site(pb.data.site)
		},
		ShippingRegion: function() {
			j.site(pb.data.site)
		},
		ShopSetting: function() {
			j.site(pb.data.site)
		},
		UserTranslatedText: function(a) {
			j.userTranslatedText(a)
		},
		DsnTemplate: function(a) {
			i.customDsnTemplates(function(b) {
				var c = b;
				pb.utils.changeItemInArray(c, "Guid", a.Guid, a), j.customDsnTemplates(c)
			})
		},
		PboxOrders: function(a) {
			i.pboxOrders(function(b) {
				var c = b;
				pb.utils.changeItemInArray(c, "Guid", a.Guid, a), j.pboxOrders(c)
			})
		},
		Email: function(a) {
			i.emails(function(b) {
				pb.utils.removeItemFromArray2(b, "Guid", a.Guid), b.push(a), j.emails(b)
			})
		},
		OnepagerSection: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionItem: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionCollection: function() {
			j.pages(pb.data.pages)
		},
		BlogPostGalleryItem: function() {
			j.pages(pb.data.pages)
		},
		SectionMenuElement: function() {
			j.pages(pb.data.pages)
		},
		VideoItem: function() {
			j.pages(pb.data.pages)
		}
	}, m = {
		Page: function(a) {
			pb.data.pages.push(a), j.pages(pb.data.pages)
		},
		MenuElement: function() {
			j.menu(pb.data.menu)
		},
		GalleryItem: function() {
			j.pages(pb.data.pages)
		},
		CollectionPage: function() {
			j.pages(pb.data.pages)
		},
		ProductItem: function() {
			j.pages(pb.data.pages)
		},
		Product: function() {
			j.pages(pb.data.pages)
		},
		ProductOption: function() {
			j.pages(pb.data.pages)
		},
		ProductOptionAlternative: function() {
			j.pages(pb.data.pages)
		},
		File: function(a) {
			pb.data.get.mediaImages(function(b) {
				b.push(a), pb.data.updateList.mediaImages(b)
			})
		},
		BlogPost: function() {
			j.pages(pb.data.pages)
		},
		BlogTag: function() {
			j.pages(pb.data.pages)
		},
		Email: function(a) {
			i.emails(function(b) {
				b.push(a), j.emails(b)
			})
		},
		Contact: function(a) {
			i.contacts(function(b) {
				var c = b;
				c.push(a), j.contacts(c)
			})
		},
		TaxRegion: function() {
			j.site(pb.data.site)
		},
		ShippingRegion: function() {
			j.site(pb.data.site)
		},
		DsnTemplate: function(a) {
			i.customDsnTemplates(function(b) {
				var c = b;
				c.push(a), j.customDsnTemplates(c)
			})
		},
		PboxOrder: function(a) {
			i.pboxOrders(function(b) {
				var c = b;
				c.push(a), j.pboxOrders(c)
			})
		},
		OnepagerSection: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionItem: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionCollection: function() {
			j.pages(pb.data.pages)
		},
		BlogPostGalleryItem: function() {
			j.pages(pb.data.pages)
		},
		SoundcloudTrack: function() {
			j.pages(pb.data.pages)
		},
		SpotifyTrack: function() {
			j.pages(pb.data.pages)
		},
		YoutubeTrack: function() {
			j.pages(pb.data.pages)
		},
		Music: function() {
			j.pages(pb.data.pages)
		},
		ListItem: function() {
			j.pages(pb.data.pages)
		},
		CvMain: function() {
			j.pages(pb.data.pages)
		},
		CvEducation: function() {
			j.pages(pb.data.pages)
		},
		CvExperience: function() {
			j.pages(pb.data.pages)
		},
		CvAward: function() {
			j.pages(pb.data.pages)
		},
		CvExhibition: function() {
			j.pages(pb.data.pages)
		},
		CvSkill: function() {
			j.pages(pb.data.pages)
		},
		CvLanguage: function() {
			j.pages(pb.data.pages)
		},
		CvInterest: function() {
			j.pages(pb.data.pages)
		},
		SectionMenuElement: function() {
			j.pages(pb.data.pages)
		}
	}, n = {
		GalleryItem: function() {
			j.pages(pb.data.pages)
		},
		SectionGalleryItems: function() {
			j.pages(pb.data.pages)
		},
		CollectionPage: function() {
			j.pages(pb.data.pages)
		},
		SoundcloudTrack: function() {
			j.pages(pb.data.pages)
		},
		SpotifyTrack: function() {
			j.pages(pb.data.pages)
		},
		YoutubeTrack: function() {
			j.pages(pb.data.pages)
		},
		Music: function() {
			j.pages(pb.data.pages)
		},
		ListItem: function() {
			j.pages(pb.data.pages)
		},
		CvMain: function() {
			j.pages(pb.data.pages)
		},
		CvEducation: function() {
			j.pages(pb.data.pages)
		},
		CvExperience: function() {
			j.pages(pb.data.pages)
		},
		CvAward: function() {
			j.pages(pb.data.pages)
		},
		CvExhibition: function() {
			j.pages(pb.data.pages)
		},
		CvSkill: function() {
			j.pages(pb.data.pages)
		},
		CvLanguage: function() {
			j.pages(pb.data.pages)
		},
		CvInterest: function() {
			j.pages(pb.data.pages)
		},
		File: function(a) {
			pb.data.get.mediaImages(function(b) {
				var c = pb.utils.removeItemFromArray(b, "Guid", a.Guid);
				pb.data.updateList.mediaImages(c)
			})
		},
		BlogPost: function() {
			j.pages(pb.data.pages)
		},
		BlogTag: function() {
			j.pages(pb.data.pages)
		},
		Product: function() {
			j.pages(pb.data.pages)
		},
		ProductOption: function() {
			j.pages(pb.data.pages)
		},
		ProductOptionAlternative: function() {
			j.pages(pb.data.pages)
		},
		ProductItem: function() {
			j.pages(pb.data.pages)
		},
		MenuElement: function() {
			j.menu(pb.data.menu)
		},
		Contact: function(a) {
			i.contacts(function(b) {
				var c = b;
				pb.utils.removeItemFromArray2(c, "Guid", a.Guid), j.contacts(c)
			})
		},
		TaxRegion: function() {
			j.site(pb.data.site)
		},
		ShippingRegion: function() {
			j.site(pb.data.site)
		},
		Comment: function(a) {
			i.comment(function(b) {
				var c = b;
				pb.utils.removeItemFromArray2(c, "Guid", a.Guid), j.comment(c)
			})
		},
		ContactMessage: function(a) {
			i.contactMessage(function(b) {
				var c = b;
				pb.utils.removeItemFromArray2(c, "Guid", a.Guid), j.contactMessage(c)
			})
		},
		GuestBookEntry: function(a) {
			i.guestbookentry(function(b) {
				var c = b;
				pb.utils.removeItemFromArray2(c, "Guid", a.Guid), j.guestbookentry(c)
			})
		},
		DsnTemplate: function(a) {
			i.customDsnTemplates(function(b) {
				var c = b;
				pb.utils.removeItemFromArray2(c, "Guid", a.Guid), j.customDsnTemplates(c)
			})
		},
		OnepagerSection: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionItem: function() {
			j.pages(pb.data.pages)
		},
		OnepagerSectionCollection: function() {
			j.pages(pb.data.pages)
		},
		BlogPostGalleryItem: function() {
			j.pages(pb.data.pages)
		},
		SectionMenuElement: function() {
			j.pages(pb.data.pages)
		},
		VideoItem: function() {
			j.pages(pb.data.pages)
		}
	}, o = function(a) {
		var b, c = {
			name: "siteStore",
			autoIncrement: !1
		}, d = {
			name: "resource",
			autoIncrement: !1
		}, e = {
			stores: [c, d]
		};
		b = {
			mechanisms: ["localstorage"]
		};
		try {
			pb.data.db = new ydn.db.Storage("pbox-db", e, b)
		} catch (f) {
			pb.data.db = void 0
		} finally {
			a()
		}
	}, p = function(a) {
		var b = i.site();
		void 0 == b && void 0 != a.siteJson && (b = a.siteJson, j.site(b))
	}, q = function(a) {
		var b = i.menu();
		void 0 == b && void 0 != a.menuJson && (b = a.menuJson, j.menu(b))
	}, r = function(a, b) {
		i.pages(function(c) {
			void 0 != c ? pb.data.pages = c : (console.log("Pages not stored"), pb.data.pages = []);
			var d = pb.utils.getUrl();
			"" == d && a.pageJson && a.pageJson.Uri && (d = a.pageJson.Uri);
			var e = pb.utils.findItemFromArray(pb.data.pages, "Uri", d);
			// void 0 == e && void 0 != a.pageJson && "" != a.pageJson && (e = a.pageJson, pb.data.pages.push(e), j.pages(pb.data.pages)), 
			b();
		})
	}, s = function(a, b) {
		pb.data.db ? pb.data.db.get("siteStore", a).always(function(c) {
			void 0 != c && void 0 != c.data ? b(c.data) : (console.log("GET-REQUEST ON:" + a), amplify.request({
				resourceId: "get-" + a,
				success: function(c) {
					var d = {};
					d.hash = c.hash, d.data = c.data, pb.data.db.put("siteStore", d, a), b(c.data)
				},
				error: function() {
					console.log("Error! Could not get the object!"), b(void 0)
				}
			}))
		}) : b(void 0)
	}, t = function(a, b) {
		pb.data.db && pb.data.db.get("siteStore", a).always(function(c) {
			c.data = b, pb.data.db.put("siteStore", c, a)
		})
	}, u = function(a) {
		return void 0 != amplify.store(a) ? amplify.store(a) : void 0
	}, v = function(a, b) {
		return pb.utils.isLocalStorageSupported() ? amplify.store(a, b) : !1
	}, w = function() {
		var a = amplify.store("hideMarket");
		window.localStorage.clear(), pb.data.db && pb.data.db.clear(), 1 == a && amplify.store("hideMarket", 1)
	}, x = function(a, b) {
		return void 0 == b && (b = "Uri"), pb.utils.findItemFromArray(pb.data.pages, b, a)
	};
	return {
		site: a,
		menu: b,
		get: i,
		updateList: k,
		updateEntity: l,
		createEntity: m,
		eraseEntity: n,
		init: e,
		timestamp: f,
		resourceVer: g,
		dataIntegrityHelper: h,
		clearAll: w,
		set: j,
		getPage: x
	}
}();
var pb = pb || {};
pb.environment = function() {
	var a, b, c, d, e, f, g, h, i = function() {
		this.width = $(window).width(), this.height = $(window).height();
		var a = this;
		$(window).resize(function() {
			a.width = $(window).width(), a.height = $(window).height()
		}), this.minWidth = 768, this.isTouch = $.isTouchCapable(), this.isTablet = pb.utils.isTablet(), this.isMobile = pb.utils.isMobile(), this.visitorLanguage = window.navigator.userLanguage || window.navigator.language
	};
	return {
		isAdmin: a,
		init: i,
		width: b,
		height: c,
		isMobile: d,
		isTouch: f,
		isTablet: e,
		minWidth: g,
		visitorLanguage: h
	}
}();
var pb = pb || {};
pb.initializer = function() {
	var a = function(a, b, c) {
		//pb.environment.isAdmin = b, 
		pb.data.init(a, function() {
			pb.environment.init(), pb.commonApi.init(), pb.lang.initFront(a), 1 == pb.environment.isAdmin ? (pb.lang.init(a), pb.adminApi.init(), pb.admin.init(), pb.adminResources.init(), pb.utils.months = [pb.lang.text.monthName.january, pb.lang.text.monthName.february, pb.lang.text.monthName.march, pb.lang.text.monthName.april, pb.lang.text.monthName.may, pb.lang.text.monthName.june, pb.lang.text.monthName.july, pb.lang.text.monthName.august, pb.lang.text.monthName.september, pb.lang.text.monthName.october, pb.lang.text.monthName.november, pb.lang.text.monthName.december]) : pb.publicApi.init(), c()
		})
	};
	return {
		start: a
	}
}();
var pb = pb || {};
pb.utils = {}, "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(a) {
	return 0 == this.indexOf(a)
}), pb.utils.isMac = function() {
	return navigator.platform.toUpperCase().indexOf("MAC") >= 0
}, pb.utils.isWindows = function() {
	return navigator.platform.toUpperCase().indexOf("WIN") >= 0
}, pb.utils.roughSizeOfObject = function(a) {
	for (var b = [], c = [a], d = 0; c.length;) {
		var e = c.pop();
		if ("boolean" == typeof e) d += 4;
		else if ("string" == typeof e) d += 2 * e.length;
		else if ("number" == typeof e) d += 8;
		else if ("object" == typeof e && -1 === b.indexOf(e)) {
			b.push(e);
			for (i in e) c.push(e[i])
		}
	}
	return d
}, pb.utils.isNumeric = function(a) {
	return !isNaN(a)
}, pb.utils.chunkArray = function(a, b) {
	for (var c = [], d = 0; d < a.length; d += b) c.push(a.slice(d, d + b));
	return c
}, pb.utils.findItemFromArray = function(a, b, c) {
	var a = a || [],
		d = $.grep(a, function(a) {
			return a[b] == c
		});
	return d[0]
}, pb.utils.searchInArray = function(a, b, c) {
	return $.grep(a, function(a) {
		return a[b] == c
	})
}, pb.utils.searchInAssociativeArray = function(a, b, c) {
	var d = {};
	for (var e in a) a[e][b] == c && (d[e] = a[e]);
	return d
}, pb.utils.removeFromAssociativeArray = function(a, b, c) {
	var d = {};
	for (var e in a) a[e][b] != c && (d[e] = a[e]);
	return d
}, pb.utils.searchInArrayWithWildCard = function(a, b, c) {
	return $.grep(a, function(a) {
		return a[b].startsWith(c)
	})
}, pb.utils.inArray = function(a, b, c) {
	var d = pb.utils.searchInArray(a, b, c);
	return 0 != d
}, pb.utils.removeItemFromArray = function(a, b, c) {
	return $.grep(a, function(a) {
		return a[b] == c
	}, !0)
}, pb.utils.removeItemFromArray2 = function(a, b, c) {
	$.each(a, function(d, e) {
		return e[b] == c ? (a.splice(d, 1), !1) : void 0
	})
}, pb.utils.removeItemsFromArray = function(a, b, c) {
	$.each(a, function(d, e) {
		e[b] == c && a.splice(d, 1)
	})
}, pb.utils.removeItemsFromObject = function(a, b, c) {
	$.each(a, function(d, e) {
		e[b] == c && delete a[d]
	})
}, pb.utils.changeItemInArray = function(a, b, c, d) {
	$.each(a, function(e, f) {
		return f[b] == c ? (a[e] = d, !1) : void 0
	})
}, pb.utils.findInMenu = function(a, b, c) {
	var d = null;
	return a && $.each(a, function(a, e) {
		return e[b] == c ? (d = e, !1) : null != e.Children && (d = pb.utils.findInMenu(e.Children, b, c)) ? !1 : void 0
	}), d
}, pb.utils.removeFromMenu = function(a, b, c, d, e) {
	var f = !1;
	return $.each(a, function(g, h) {
		if (h[b] == c || e) {
			if (null != h.Children && pb.utils.removeFromMenu(h.Children, b, c, d, !0), h[b] == c) return a.splice(g, 1), f = !0, (null == d || 0 == d) && pb.admin.erase("MenuElement", h), !1;
			pb.admin.erase("MenuElement", h)
		} else if (null != h.Children) {
			var i = pb.utils.removeFromMenu(h.Children, b, c);
			if (i) return !1
		}
	}), f
}, pb.utils.removeFromSectionMenu = function(a, b, c, d, e) {
	var f = !1;
	return $.each(a, function(g, h) {
		if (h[b] == c || e) {
			if (null != h.Children && pb.utils.removeFromSectionMenu(h.Children, b, c, d, !0), h[b] == c) return a.splice(g, 1), f = !0, (null == d || 0 == d) && pb.admin.erase("SectionMenuElement", h), !1;
			pb.admin.erase("SectionMenuElement", h)
		} else if (null != h.Children) {
			var i = pb.utils.removeFromSectionMenu(h.Children, b, c);
			if (i) return !1
		}
	}), f
}, pb.utils.getUniqueId = function() {
	var a = "",
		b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	pb.data.site && pb.data.site.Id && (a = pb.data.site.Id);
	for (var c = 0; 8 > c; c++) a += b.charAt(Math.floor(Math.random() * b.length));
	return a
}, pb.utils.getUniqeString = function(a) {
	for (var b = "", c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", d = 0; a > d; d++) b += c.charAt(Math.floor(Math.random() * c.length));
	return b
}, pb.utils.getUniqeStringWithoutCapitalLetters = function(a) {
	for (var b = "", c = "abcdefghijklmnopqrstuvwxyz0123456789", d = 0; a > d; d++) b += c.charAt(Math.floor(Math.random() * c.length));
	return b
}, pb.utils.getTimestamp = function() {
	return (new Date).getTime()
}, pb.utils.clone = function(a) {
	if (null == a || "object" != typeof a) return a;
	var b = a.constructor();
	for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
	return b
}, pb.utils.isMobileDevice = function() {
	return /Android|AppleWebKit|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}, pb.utils.getUrl = function() {
	var a = pb.utils.trimUrl(window.location.pathname);
	return "admin" == a && (a = pb.utils.trimUrl(window.location.hash)), (void 0 == a || null == a) && (a = ""), a
}, pb.utils.trimUrl = function(a) {
	var b = a.replace(/^\/|\/$/g, "");
	return b.replace("#/", "")
}, pb.utils.getUrlParams = function(a) {
	{
		var b = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(a, c, d) {
			b[c] = d
		})
	}
	return a ? b[a] : b
}, pb.utils.getActualURL = function(a) {
	return a = a.replace(/^https?:\/\//, ""), a = a.replace(/^http?:\/\//, ""), a = a.replace(/^www./, ""), a = a.replace(/\/$/, "")
}, pb.utils.px2Int = function(a) {
	if ("" == a || null == a) return 12;
	var b = a.replace("px", "");
	return b = b.replace("%", ""), $.isNumeric(b) ? b : 12
}, pb.utils.timer = function() {
	this.startTime = new Date, this.endTime = null, this.duration = null, this.endTimerWithComment = function(a) {
		this.endTime = new Date, this.duration = this.endTime - this.startTime, console.log(a + this.duration + "ms")
	}
}, pb.utils.formatUri = function(a) {
	var b = a.replace(/[^\w\-]/gi, "").toLowerCase();
	return ("" == b || a != b && "-" == b) && (b = pb.utils.getUniqeStringWithoutCapitalLetters(10)), b
}, pb.utils.formatGoogleFontCss = function(a) {
	return a.replace(/ /g, "+")
}, pb.utils.shouldSlideshowSettingsBeShown = function(a) {
	if (void 0 != a && null != a.DsnTemplateProperties) {
		var b = pb.utils.searchInArray(a.DsnTemplateProperties, "type", "slideshow-settings-prop");
		return b && b.length > 0 ? !0 : !1
	}
}, pb.utils.getRandomInt = function(a, b) {
	return Math.floor(Math.random() * (b - a + 1)) + a
}, pb.utils.sortByKey = function(a, b) {
	return a.sort(function(a, c) {
		var d = a[b],
			e = c[b];
		return e > d ? -1 : d > e ? 1 : 0
	})
}, pb.utils.mergeObjects = function(a, b) {
	var c = {};
	for (var d in a) c[d] = a[d];
	for (var d in b) c[d] = b[d];
	return c
}, pb.utils.deleteHashKey = function(a) {
	for (var b in a) {
		for (var c in a[b]) a[b][c] instanceof Array && pb.utils.deleteHashKey(a[b][c]);
		void 0 != a[b].$$hashKey && delete a[b].$$hashKey
	}
	return a
}, pb.utils.getStringInsideParentheses = function(a) {
	var b = /\(([^)]+)\)/,
		c = b.exec(a);
	return c[1]
}, pb.utils.removeAfterCharacter = function(a, b) {
	var c = a,
		d = c.indexOf(b);
	return c = c.substring(0, -1 != d ? d : c.length)
}, pb.utils.addHttp = function(a) {
	return /^(f|ht)tps?:\/\//i.test(a) || (a = "http://" + a), a
}, pb.utils.hasHttp = function(a) {
	return /^(f|ht)tps?:\/\//i.test(a) ? !0 : !1
}, pb.utils.isMobile = function() {
	return pb.environment.isTablet ? !1 : navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Windows Mobile/i) || navigator.userAgent.match(/Nokia/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/Mobile/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/Opera Mobi/i) ? !0 : !1
}, pb.utils.isTablet = function() {
	return navigator.userAgent.match(/iPad/i) ? !0 : navigator.userAgent.match(/Android/i) ? pb.environment.width < pb.environment.minWidth ? !1 : !0 : !1
}, pb.utils.getDataFromVideoUrl = function(a, b) {
	const c = {
		Youtube: "youtube",
		Vimeo: "vimeo"
	};
	a = a.replace("https://", "http://"), a = pb.utils.addHttp(a);
	var d = a,
		e = "",
		f = "",
		g = "";
	if (-1 != a.search("youtube.com") || -1 != a.search("youtu.be")) {
		g = c.Youtube, e = a.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, "https://www.youtube.com/embed/$1");
		var h = function(a) {
			var b = "";
			return a = a.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/), void 0 !== a[2] ? (b = a[2].split(/[^0-9a-z_\-]/i), b[0]) : (console.warn("Could not extract video ID."), !1)
		};
		f = h(e)
	} else if (-1 != a.search("vimeo.com")) {
		g = c.Vimeo, e = pb.utils.getVimeoEmbedUrl(a);
		var i = function() {
			var b = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
				c = a.match(b);
			return c ? c[2] : (console.warn("Could not extract video ID."), !1)
		};
		f = i(e)
	} else {
		var j = "ErrorMessage: Wrong format. You need to add a video from YouTube or Vimeo";
		b(!1, j)
	}
	var k = "";
	g == c.Vimeo && (k = "https://vimeo.com/api/v2/video/" + f + ".json");
	var l = function() {
		$.ajax({
			type: "GET",
			url: "https://noembed.com/embed?url=" + a,
			async: !1,
			jsonpCallback: "my_embed_function",
			jsonp: "callback",
			dataType: "jsonp",
			cache: !1,
			success: function(a) {
				var c = a.height,
					f = a.width,
					g = a.thumbnail_url;
				if (g = g.replace("http://", "https://")) {
					var h = {
						url: e,
						thumb: g,
						height: c,
						width: f,
						originalUrl: d
					};
					b(h, null)
				} else {
					var i = "ErrorMessage: Wrong format. You need to add a video from YouTube or Vimeo";
					b(!1, i)
				}
			},
			error: function(a) {
				b(!1, a.message)
			}
		})
	};
	if (0 == f) l();
	else if (g == c.Vimeo) $.ajax({
		type: "GET",
		url: k,
		jsonp: "callback",
		dataType: "jsonp",
		cache: !1,
		success: function(a) {
			a = a[0];
			var c = a.height,
				f = a.width,
				g = a.thumbnail_large;
			if (g = g.replace("http://", "https://"), g = g.substring(0, g.indexOf("_")), g = g + "_" + a.width + ".jpg") {
				var h = {
					url: e,
					thumb: g,
					height: c,
					width: f,
					originalUrl: d
				};
				b(h, null)
			} else {
				var i = "ErrorMessage: Wrong format. You need to add a video from YouTube or Vimeo";
				b(!1, i)
			}
		},
		error: function(a) {
			b(!1, a.message)
		}
	});
	else if (g == c.Youtube) {
		var m = ["maxresdefault.jpg", "sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg", "default.jpg"],
			n = {
				width: 0,
				height: 0,
				thumbnail_url: ""
			}, o = "https://img.youtube.com/vi/" + f + "/",
			p = function() {
				var a = $.Deferred(),
					b = 0,
					c = function() {
						var a = $.Deferred(),
							c = o + m[b];
						if (b < m.length) {
							var d = new Image;
							d.onerror = function() {
								d = null, b++, a.reject()
							}, d.onload = function() {
								b++, n.width > this.width ? (d = null, a.resolve()) : (n = {
									width: this.width,
									height: this.height,
									thumbnail_url: c
								}, d = null, a.reject())
							}, d.src = c
						} else a.resolve();
						return a
					}, d = function() {
						var b = c();
						b.done(function() {
							120 == n.width && 90 == n.height ? a.reject() : a.resolve()
						}).fail(function() {
							d()
						})
					};
				return d(), a
			}, q = p();
		q.done(function() {
			var a = n.height,
				c = n.width,
				f = n.thumbnail_url;
			if (f = f.replace("http://", "https://")) {
				var g = {
					url: e,
					thumb: f,
					height: a,
					width: c,
					originalUrl: d
				};
				b(g, null)
			} else {
				var h = "ErrorMessage: Wrong format. You need to add a video from YouTube or Vimeo";
				b(!1, h)
			}
		}).fail(function() {
			console.log("New Version Cannot Resolve Youtube Thumb; use Old Version"), l()
		})
	}
}, pb.utils.getDataFromSoundcloudUrl = function(a, b) {
	a = a.replace("https://", "http://"), a = pb.utils.addHttp(a);
	var c = a;
	$.ajax({
		type: "GET",
		url: "https://soundcloud.com/oembed.json?url=" + a,
		json: "callback",
		dataType: "json",
		cache: !1,
		success: function(a) {
			var d = a.title,
				e = a.author_name,
				f = a.author_url,
				g = a.thumbnail_url;
			g = g.replace("http://", "https://");
			var h = " by " + e,
				i = d.replace(h, "");
			if (g) {
				var j = {
					Guid: pb.utils.getUniqueId(),
					Title: i,
					ArtistName: e,
					AuthorUrl: f,
					TrackUrl: c,
					ThumbUrl: g
				};
				b(j, null)
			} else {
				var k = "ErrorMessage: Wrong format. You need to add a song from Soundcloud";
				b(!1, k)
			}
		},
		error: function(a) {
			b(!1, a.message)
		}
	})
}, pb.utils.getDataFromYoutubeUrl = function(a, b) {
	if (-1 != a.search("youtube.com") || -1 != a.search("youtu.be")) {
		a = a.replace("https://", "http://"), a = pb.utils.addHttp(a);
		var c = function(a) {
			var b = "";
			return a = a.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/), void 0 !== a[2] ? (b = a[2].split(/[^0-9a-z_\-]/i), b[0]) : (console.warn("Could not extract video ID."), !1)
		};
		$.ajax({
			type: "GET",
			url: "https://noembed.com/embed?url=" + a,
			jsonp: "callback",
			dataType: "jsonp",
			cache: !1,
			success: function(d) {
				var e = d.title,
					f = d.author_name,
					g = d.thumbnail_url;
				g = g.replace("http://", "https://");
				var h = c(a);
				if (g) {
					var i = {
						Guid: pb.utils.getUniqueId(),
						Title: e,
						ArtistName: f,
						ThumbUrl: g,
						TrackId: h
					};
					b(i, null)
				} else {
					var j = "ErrorMessage: Wrong format. You need to add a song from Youtube";
					b(!1, j)
				}
			},
			error: function(a) {
				b(!1, a.message)
			}
		})
	} else console.log("Only youtube links are acceptable, so be cool and add a proper link")
}, pb.utils.addTemporaryAnimation = function(a, b, c) {
	$(a).addClass("animated " + c + " " + b), setTimeout(function() {
		$(a).removeClass("animated " + c + " " + b)
	}, 1200)
}, pb.utils.isObjectEmpty = function(a) {
	return "{}" == JSON.stringify(a)
}, pb.utils.getCssStyleAndWeight = function(a) {
	var b = {
		"font-style": "normal",
		"font-weight": "normal"
	};
	if (null != a && void 0 != a) if (!isNaN(parseFloat(a)) && isFinite(a)) b["font-weight"] = a;
	else {
		var c = a.match(/\d+/g);
		null == c ? b["font-style"] = a : (b["font-weight"] = c[0], b["font-style"] = a.replace(c[0], ""))
	}
	return b
}, pb.utils.hexTorgb = function(a) {
	var b = parseInt(a.substring(1), 16),
		c = {};
	return c = {
		red: (16711680 & b) >> 16,
		green: (65280 & b) >> 8,
		blue: 255 & b
	}
}, pb.utils.rgbToHex = function(a) {
	var b = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
	return b ? a : (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), a && 4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2) : "")
}, pb.utils.getLinkToCreatePage = function(a) {
	return "blogs" == a ? "page/createblog" : "collections" == a ? "page/createcollection" : "galleries" == a ? "page/creategallery" : "products" == a ? "page/createproducts" : "onepager" == a ? "page/createonepager" : "page/createpage"
}, pb.utils.showDescriptionInContentPanel = function(a) {
	var b = pb.utils.getLinkToCreatePage(a.DsnTemplateType, a.DsnTemplateSubGroup);
	return "page/createpage" == b ? !1 : !0
}, pb.utils.getMenuHeight = function(a) {
	if ("left" == pb.data.site.DsnLayoutType && (0 == pb.environment.isMobile || pb.environment.width > pb.environment.minWidth)) a(20);
	else {
		var b = 0;
		pb.utils.setInterval(function() {
			var a = $("nav.menu");
			if (a.length > 0) {
				var c = $(".menuBox"),
					d = parseInt(a.height()) + parseInt(a.css("padding-top")) + parseInt(a.css("padding-bottom")) + parseInt(a.css("margin-top")) + parseInt(a.css("margin-bottom")),
					e = parseInt(c.css("padding-top")) + parseInt(c.css("padding-bottom")) + parseInt(c.css("margin-top")) + parseInt(c.css("margin-bottom"));
				return b = isNaN(e) || e == Number(void 0) ? d : e + d, !0
			}
		}, 100, 1e3).done(function() {
			a(b)
		})
	}
}, pb.utils.getMobileMenuHeight = function(a, b) {
	var c, d, e = 0;
	pb.utils.setInterval(function() {
		return c = $(".logo"), c.length > 0 ? !0 : void 0
	}, 100, 1e3).done(function() {
		pb.utils.setInterval(function() {
			return d = c.find("a"), d.length > 0 ? !0 : void 0
		}, 10, 1e3).done(function() {
			var f, g = 0,
				h = function() {
					e = c.outerHeight(), e -= e - g, c.height(e), b(e)
				};
			setTimeout(function() {
				1 == a ? (f = d.find("img"), g = f.outerHeight()) : g = d.outerHeight(), h()
			}, 100)
		})
	})
}, pb.utils.getLogoHeight = function(a) {
	var b = 0,
		c = setInterval(function() {
			b++, 2e3 == b && (clearTimeout(c), a(10));
			var d = $("div.logo"),
				e = 0;
			d.length > 0 && (e = parseInt(d.height()) + parseInt(d.css("padding-top")) + parseInt(d.css("padding-bottom")), 0 != e && (clearTimeout(c), a(e)))
		}, 20)
}, pb.utils.getRealImageSize = function(a, b) {
	var c = 0,
		d = 0,
		e = setInterval(function() {
			d++, 2e3 == d && (clearTimeout(e), b(10)), c = 0, a.length > 0 && (c = a.width(), 0 != c && (clearTimeout(e), b({
				width: a.width(),
				height: a.height()
			})))
		}, 20)
}, pb.utils.HexToRGB = function(a) {
	var b = function(a) {
		return "#" == a.charAt(0) ? a.substring(1, 7) : a
	}, c = a ? parseInt(b(a).substring(0, 2), 16) : 0,
		d = a ? parseInt(b(a).substring(2, 4), 16) : 0,
		e = a ? parseInt(b(a).substring(4, 6), 16) : 0;
	return {
		R: c,
		G: d,
		B: e
	}
}, pb.utils.getTransparentColor = function(a, b) {
	b || (b = .1);
	var c = pb.utils.HexToRGB(a);
	return "rgba(" + c.R + "," + c.G + "," + c.B + ", " + b + ")"
}, pb.utils._browser = null, pb.utils.getBrowser = function() {
	if (null != pb.utils._browser) return pb.utils._browser;
	var a, b = navigator.userAgent,
		c = b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
		d = {};
	return /trident/i.test(c[1]) && (a = /\brv[ :]+(\d+)/g.exec(b) || [], d.name = "IE", d.version = parseInt(a[1]) || 0), "Chrome" === c[1] && (a = b.match(/\bOPR\/(\d+)/), null != a && (d.name = "Opera", d.version = parseInt(a[1]) || 0)), c = c[2] ? [c[1], c[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (a = b.match(/version\/(\d+)/i)) && c.splice(1, 1, a[1]), d.name = c[0], d.version = parseInt(c[1]), pb.utils._browser = d, d
}, pb.utils.isBrowserSafariOrAndroid = function() {
	var a = pb.utils.getBrowser(),
		b = a.name.toLowerCase();
	return b.indexOf("safari") > -1 ? !0 : b.indexOf("android") > -1 ? !0 : !1
}, pb.utils.isBrowserIE7to9 = function() {
	var a = pb.utils.getBrowser();
	return "IE" == a.name && a.version > 6 && a.version < 9 ? !0 : !1
}, pb.utils.isBrowserFireFox = function() {
	var a = pb.utils.getBrowser();
	return "Firefox" == a.name ? !0 : !1
}, pb.utils.isBrowserSafari = function() {
	var a = pb.utils.getBrowser(),
		b = a.name.toLowerCase();
	return b.indexOf("safari") > -1 ? !0 : !1
}, pb.utils.isBrowserSafariWindows = function() {
	var a = navigator.userAgent.toLowerCase();
	return -1 !== a.indexOf("safari/") && -1 !== a.indexOf("windows") && -1 === a.indexOf("chrom") ? !0 : !1
}, pb.utils.getVimeoEmbedUrl = function(a) {
	var b = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/,
		c = a.match(b);
	return c ? "//player.vimeo.com/video/" + c[3] : !1
}, pb.utils.setStylesOnLightBox = function(a, b) {
	var c = {};
	c["font-size"] = a.site.PFontSize, c.color = a.site.PFontColor, c["font-family"] = a.site.PFontFamily, c["line-height"] = a.site.PLineHeight, c["letter-spacing"] = parseInt(a.site.PSpacing) / 4 + "px", c["text-transform"] = 1 == a.site.PUpperCase ? "uppercase" : "";
	var d = pb.utils.getCssStyleAndWeight(a.site.PFontVariant);
	c["font-style"] = d["font-style"], c["font-weight"] = d["font-weight"], 3 == b.textPosition && (c.background = a.site.BgBoxColor), $(".slider-popup .content figcaption").css(c).find("a").css("color", a.site.PLinkColor), $(".slider-popup .bg").css("background", a.site.BgBoxColor), $(".slider-popup .closeLightbox").css("color", a.site.PFontColor), $(".slider-popup .socialMediaIconsInLightBox .smiconLb").css("color", a.site.PFontColor)
}, pb.utils.sortMenu = function(a, b, c) {
	var d = [];
	return $.each(a, function(a, e) {
		var f = pb.utils.findInMenu(b, "Guid", e.id);
		if (f) {
			var g = {};
			angular.copy(f, g), g.Children = [], g.ListOrder = a, g.ParentGuid = "", c && (g.ParentGuid = c), e.children && (g.Children = pb.utils.sortMenu(e.children, b, g.Guid)), d.push(g), pb.admin.update("MenuElement", g, "ParentGuid"), pb.admin.update("MenuElement", g, "ListOrder")
		}
	}), d
}, pb.utils.sortSectionMenu = function(a, b, c) {
	var d = [];
	return $.each(a, function(a, e) {
		var f = pb.utils.findInMenu(b, "Guid", e.id);
		if (f) {
			var g = {};
			angular.copy(f, g), g.Children = [], g.Idx = a, g.ParentGuid = "", c && (g.ParentGuid = c), e.children && (g.Children = pb.utils.sortSectionMenu(e.children, b, g.Guid)), d.push(g), pb.admin.update("SectionMenuElement", g, "ParentGuid"), pb.admin.update("SectionMenuElement", g, "Idx")
		}
	}), d
}, pb.utils.getMenuLinkByPage = function(a) {
	var b, c = 0;
	return $.each(pb.data.menu, function(d, e) {
		return c++, b ? void 0 : e.PageGuid == a.Guid ? void(b = e) : void(e.Children && e.Children.length > 0 && $.each(e.Children, function(d, e) {
			return c++, b ? void 0 : e.PageGuid == a.Guid ? void(b = e) : void(e.Children && e.Children.length > 0 && $.each(e.Children, function(d, e) {
				return c++, e.PageGuid == a.Guid ? void(b = e) : void 0
			}))
		}))
	}), b
}, pb.utils.getCookie = function(a) {
	var b = RegExp("" + a + "[^;]+").exec(document.cookie);
	return unescape(b ? b.toString().replace(/^[^=]+./, "") : "")
}, pb.utils.getCookieJSON = function(a) {
	var b = function(a) {
		a += "=";
		for (var b = document.cookie.split(/;\s*/), c = b.length - 1; c >= 0; c--) if (!b[c].indexOf(a)) return b[c].replace(a, "")
	}, c = b(a);
	return void 0 != c ? (c = decodeURIComponent(c), JSON.parse(c)) : !1
}, pb.utils.getViewForProduct = function(a, b) {
	if (!b) return a.saleView;
	var c = pb.utils.searchInArray(b, "ProductKey", a.key);
	if (!c || c.length < 1) return a.saleView;
	var d;
	if (c.length > 1) {
		d = c[0];
		for (var e = 0; e < c.length; e++) new Date(d.payed_at) < new Date(c[e].payed_at) && (d = c[e])
	} else d = c[0];
	return "payed" == d.Status ? a.receiptView : "completed" == d.Status ? 0 == a.timeToBuyAgain ? a.saleView : a.completedView : void 0
}, pb.utils.getOrderToComplete = function(a) {
	if (a && !(a.length < 1)) for (var b = 0; b < a.length; b++) {
		var c = a[b];
		if ("payed" == c.Status) return c
	}
}, pb.utils.getTitle = function(a, b) {
	var c = null != a ? a.trim() : "",
		d = null != b ? b.trim() : "",
		e = "" == c || null == c ? "" : " - " + c;
	return "" == d || null == d ? c : d + e
}, pb.utils.getNonAdminUrl = function(a) {
	return a.replace("admin#/", "")
}, pb.utils.isSitePremium = function(a) {
	return pb.utils.isNrPremium(a)
}, pb.utils.isNrPremium = function(a) {
	return a instanceof Object || void 0 != a.AccountType || void 0 != a.SignUpAccountType ? 1 == a.AccountType || 2 == a.AccountType || 1 == a.SignUpAccountType : 1 == a || 2 == a
}, pb.utils._canUseProValue = null, pb.utils.canUsePro = function(a) {
	if (null != pb.utils._canUseProValue) return pb.utils._canUseProValue;
	if (pb.utils.isSitePremium(a)) return !0;
	var b = new Date(a.created_at),
		c = new Date;
	return c.setDate(c.getDate() - 30), pb.utils._canUseProValue = b > c ? !0 : !1
}, pb.utils.getAccountTypeName = function(a) {
	return 2 == a ? "Portfoliobox EDU" : 1 == a ? "Portfoliobox PRO" : "Portfoliobox FREE"
}, pb.utils.addToNr = {
	galleryItemPlus: function(a) {
		var b = parseInt(a.accountInfo.NrOfImages) || 0;
		a.accountInfo.NrOfImages = b + 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	galleryItemMinus: function(a, b) {
		var c = parseInt(a.accountInfo.NrOfImages) || 0;
		a.accountInfo.NrOfImages = void 0 == b ? c - 1 : c - b, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	onepagerSectionItemPlus: function(a) {
		var b = parseInt(a.accountInfo.NrOfImages) || 0;
		a.accountInfo.NrOfImages = b + 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	onepagerSectionItemMinus: function(a) {
		var b = parseInt(a.accountInfo.NrOfImages) || 0;
		a.accountInfo.NrOfImages = b - 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	pagesPlus: function(a) {
		var b = parseInt(a.accountInfo.NrOfPages) || 0;
		a.accountInfo.NrOfPages = b + 1, pb.data.updateEntity.AccountInfo(a.accountInfo), void 0 != pb.data.site.TotalNumberOfPages && (pb.data.site.TotalNumberOfPages = a.accountInfo.NrOfPages), pb.data.updateEntity.Site()
	},
	blogPostPlus: function(a) {
		var b = parseInt(a.accountInfo.NrOfBlogPosts) || 0;
		a.accountInfo.NrOfBlogPosts = b + 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	blogPostMinus: function(a) {
		var b = parseInt(a.accountInfo.NrOfBlogPosts) || 0;
		a.accountInfo.NrOfBlogPosts = b - 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	blogPostGalleryItemPlus: function(a) {
		pb.utils.addToNr.galleryItemPlus(a)
	},
	blogPostGalleryItemMinus: function(a, b) {
		pb.utils.addToNr.galleryItemMinus(a, b)
	},
	productsPlus: function(a) {
		var b = parseInt(a.accountInfo.NrOfProducts) || 0;
		a.accountInfo.NrOfProducts = b + 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	productsMinus: function(a) {
		var b = parseInt(a.accountInfo.NrOfProducts) || 0;
		a.accountInfo.NrOfProducts = b - 1, pb.data.updateEntity.AccountInfo(a.accountInfo)
	},
	countNrOnDeletePage: function(a) {
		var b = pb.utils.findItemFromArray(pb.data.pages, "Guid", a),
			c = {
				products: 0,
				galleryItems: 0,
				blogPosts: 0,
				sectionItems: 0
			};
		return b && (c.products = b.Products ? b.Products.length : 0, c.galleryItems = b.GalleryItems ? b.GalleryItems.length : 0, c.blogPosts = b.BlogPosts ? b.BlogPosts.length : 0, c.sectionItems = 0, b.OnePagerSections && $.each(b.OnePagerSections, function(a, b) {
			b.Items && (c.sectionItems += b.Items.length)
		})), c
	}
}, pb.utils.convertFontSizeForMobile = function() {
	return "50px"
}, pb.utils.getLengthOfObject = function(a) {
	var b, c, d = 0;
	for (b in a) if (a.hasOwnProperty(b) && (d++, "object" == typeof a[b])) for (c in a[b]) d++;
	return d
}, pb.utils.getLengthOfIndexObject = function(a) {
	var b = 0;
	for (var c in a) if ("object" == typeof a[c]) for (key2 in a[c]) b++;
	return b
}, pb.utils.getFormatedDateAndTime = function() {
	var a = new Date;
	return a.toISOString().slice(0, 10) + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()
}, pb.utils.getFormatedDateAndYear = function(a) {
	var a = new Date(a);
	return pb.utils.months[a.getMonth()].substring(0, 3) + " " + a.getDate() + ", " + a.getFullYear().toString().substr(2, 4)
}, pb.utils.blurSourceSave = function(a) {
	a = void 0 == a ? $("div.sourceEditor") : a, a.addTemporaryClass("const_saved", 1e3)
}, pb.utils.hover = function(a, b, c, d) {
	d || (d = "color"), setTimeout(function() {
		$(a).hover(function() {
			0 == $(this).hasClass("active") && $(this).css(d, b)
		}, function() {
			0 == $(this).hasClass("active") && $(this).css(d, c)
		})
	}, 1)
}, pb.utils.digest = function(a, b, c, d) {
	try {
		d = void 0 == d ? 0 : d, a.$$phase || !a.$root || a.$root.$$phase ? void 0 != b && null != b && 1 == b && setTimeout(function() {
			d++, 100 > d && pb.utils.digest(a, b, c, d)
		}, 10) : void 0 != c && null != c ? a.$digest(c) : a.$digest()
	} catch (e) {
		console.error("Digest Error: Ignore")
	}
}, pb.utils.apply = function(a, b, c, d) {
	try {
		d = void 0 == d ? 0 : d, a.$$phase || !a.$root || a.$root.$$phase ? void 0 != b && null != b && 1 == b && setTimeout(function() {
			d++, 100 > d && pb.utils.apply(a, b, c, d)
		}, 10) : void 0 != c && null != c ? a.$apply(c) : a.$apply()
	} catch (e) {
		console.error("Apply Error: Ignore")
	}
}, pb.utils.galleryPropMaxImageDisplaySize = function(a, b, c) {
	var d = 6;
	if (a.width() < 1081) {
		var e = (c - 48) / 4;
		if (d = 4, 130 > e) {
			var e = (c - 36) / 3;
			d = 3
		}
		b.width(e)
	} else if (a.width() < 1251) {
		var e = (c - 60) / 5;
		if (d = 5, 130 > e) {
			var e = (c - 48) / 4;
			d = 4
		}
		b.width(e)
	} else if (a.width() < 1481) {
		var e = (c - 72) / 6;
		if (d = 6, 130 > e) {
			var e = (c - 60) / 5;
			d = 5
		}
		b.width(e)
	} else b.width(145);
	return d
}, pb.utils.fixSizeForSmallImage = function(a, b) {
	return a
}, pb.utils.decodeHtmlSpecialChar = function(a) {
	return $("<span />", {
		html: a
	}).text()
}, pb.utils.getLangCodeFromLangId = function(a) {
	var b = {
		0: "en",
		1: "se",
		2: "cn",
		3: "de",
		4: "es",
		5: "kr",
		6: "jp",
		7: "ru",
		8: "fr",
		9: "pt",
		10: "ua",
		11: "fi",
		12: "it",
		13: "nl",
		14: "no",
		15: "pl",
		16: "dk",
		17: "tr",
		18: "th",
		19: "hu",
		20: "gr",
		21: "il",
		22: "vn",
		23: "id"
	}, c = b[a] || "en";
	return c
}, pb.utils.getPbLink = function(a) {
	var b = pb.utils.getLangCodeFromLangId(a);
	return "en" == b ? "https://www.portfoliobox.net" : "https://www.portfoliobox.net/" + b
};
var intervalList = [];
pb.utils.removeAllIntervals = function() {
	for (var a = intervalList.length, b = 0; a > b; b++) {
		var c = intervalList.pop();
		try {
			null != c && void 0 != c && c.clear()
		} catch (d) {}
	}
}, pb.utils.setInterval = function(a, b, c, d) {
	var e, f = function() {
		var d, e, f, g, h, i = $.Deferred(),
			j = function() {
				void 0 != h && null != h && clearInterval(h), h = void 0
			}, k = function() {
				j(), i.notify("forced to close")
			}, l = function() {
				g += f, d = void 0 == a ? !1 : a(), 1 == d ? (j(), i.resolve("success")) : g >= e && (j(), i.reject("timeout"))
			}, m = function() {
				e = void 0 == c ? 9e5 : c, f = void 0 == b ? 10 : b, g = 0, h = setInterval(l, f)
			};
		return m(), {
			restart: m,
			clear: k,
			done: i.promise().done,
			fail: i.promise().fail,
			progress: i.promise().notify
		}
	};
	return e = new f, intervalList.push(e), d && d.scope && pb.utils.onDestroy(d.scope, function() {
		if (e) try {
			e.clear()
		} catch (a) {
			console.log("Error Destroy Interval")
		}
	}, "Destroy Intervals"), e
}, pb.utils.isMenuUrlMatchedWithPrivateUrl = function(a) {
	return "checkout" == a || "thankyou" == a || "unlock" == a || "/checkout" == a || "/thankyou" == a || "/unlock" == a ? !0 : !1
}, pb.utils.setCookie = function(a, b, c) {
	var d = new Date;
	d.setTime(d.getTime() + c);
	var e = "expires=" + d.toUTCString();
	document.cookie = a + "=" + b + "; " + e
}, pb.utils.deleteCookie = function(a) {
	document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}, pb.utils.isLocalStorageSupported = function() {
	if ("object" == typeof localStorage) try {
		return localStorage.setItem("localStorage", 1), localStorage.removeItem("localStorage"), !0
	} catch (a) {
		return Storage.prototype._setItem = Storage.prototype.setItem, Storage.prototype.setItem = function() {}, !1
	}
}, pb.utils.getImageThumbTypeForMobile = function() {
	var a = void 0;
	return pb.environment.isMobile && (pb.environment.width < 500 && pb.environment.height < 500 ? a = "h400" : pb.environment.width < 500 && pb.environment.height < 810 ? a = "h800" : pb.environment.height < 900 && (a = "h800")), a
}, pb.utils.calculateDaysDiff = function(a, b) {
	var c = b - a,
		d = c / 864e5;
	return d
}, pb.utils.IsValidHex = function(a) {
	return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(a)
}, pb.utils.getMobileImageSize = function(a) {
	var b = {
		size: 1,
		count: 1
	};
	void 0 == a && (a = 0);
	var c = $("main").width();
	if (400 >= c) return b.size = c - a, b;
	var d = Math.ceil(c / 400);
	return b.size = c / d - a - 2 / d, b.count = d, b
}, pb.utils.getMobileImageSizeSlideShow = function(a) {
	var b = {
		size: 1,
		count: 1
	}, c = $("main").width();
	if (400 >= c) b.size = c / 2 - a - 2, b.count = 2;
	else {
		var d = Math.ceil(c / 110);
		b.size = c / d - 16 - 2 / d, b.count = d
	}
	return b
}, pb.utils.setGalleryMarginTop = function(a, b, c, d) {
	b ? a.css("padding-top", c) : a.css("padding-top", d)
}, pb.utils.setListItemTop = function(a, b, c, d) {
	b ? a.css("top", c) : a.css("top", d)
}, pb.utils.setGalleryMarginTopAndSites = function(a, b, c, d, e) {
	c += "px", d += "px", b ? (a.css("margin-top", c), e && a.css("margin-left", e)) : (a.css("margin-top", d), pb.environment.isMobile || pb.environment.isTablet || (a.css("margin-left", d), a.css("margin-right", d)))
}, pb.utils.getWidthForSize = function(a, b) {
	var c = {
		size: 1,
		count: 1
	};
	if (pb.environment.isMobile) return pb.utils.getMobileImageSize(b);
	var d = {
		1: 117,
		2: 172,
		3: 300,
		4: 460
	};
	return c.size = d[a], void 0 == c.size && (c.size = 220), c
}, pb.utils.getSectionMobileImageSize = function(a, b) {
	var c = {
		size: 1,
		count: 1
	};
	void 0 == a && (a = 0);
	var d = b.width();
	if (400 >= d) return c.size = d - a, c;
	var e = Math.ceil(d / 400);
	return c.size = d / e - a - 2 / e, c.count = e, c
}, pb.utils.getWidthForSizeSection = function(a, b, c) {
	var d = {
		size: 1,
		count: 1
	};
	if (pb.environment.isMobile && c) return pb.utils.getSectionMobileImageSize(b, c);
	var e = {
		0: 117,
		1: 172,
		3: 300,
		4: 460
	};
	return d.size = e[a], void 0 == d.size && (d.size = 220), d
}, pb.utils.getContainer = function(a) {
	return {
		gallery: $("#gallery_container_" + a),
		collection: $("#collection_container_" + a),
		product: $("#product_container_" + a)
	}
}, pb.utils.setTallestFigcaptionMobile = function(a, b) {
	var c = 0,
		d = 0,
		e = 0,
		f = [],
		g = a.find(".imageBox").height();
	a.find("figure").each(function() {
		var a = $(this).find("figcaption");
		if (a.css({
			height: "auto"
		}), c == b.count) {
			for (var h = 0; h < f.length; h++) {
				var i = f[h].height() + d;
				f[h].css({
					height: i
				})
			}
			c = 0, d = 0, e = 0, f = []
		}
		c++, $(this).height(g + 6), f.push($(this)), a.length > 0 && (e = a.height(), e > d && (d = e))
	})
}, pb.utils.getFixedWidth = function(a, b) {
	var c = null,
		d = 0,
		e = {
			container: null,
			width: a
		};
	return "collections" == b ? c = $(".collection") : "galleries" == b ? c = $(".gallery") : "products" == b && (c = $(".products")), e.container = c, null != c && (d = c.width(), a >= d && (e.width = d - 10)), e
}, pb.utils.performanceTest = function(a) {
	var b = +new Date;
	a();
	var c = +new Date,
		d = c - b;
	console.warn("Titme: " + d)
}, pb.utils.getLanguageList = function() {
	var a = pb.constants.serverCdn + "application/_img/salesite2/common/flags/",
		b = {
			0: {
				code: 0,
				src: a + "en.png",
				title: "English"
			},
			8: {
				code: 8,
				src: a + "fr.png",
				title: "Français"
			},
			3: {
				code: 3,
				src: a + "de.png",
				title: "Deutsch"
			},
			4: {
				code: 4,
				src: a + "es.png",
				title: "Español"
			},
			12: {
				code: 12,
				src: a + "it.png",
				title: "Italiano"
			},
			9: {
				code: 9,
				src: a + "pt.png",
				title: "Português"
			},
			13: {
				code: 13,
				src: a + "nl.png",
				title: "Nederlands"
			},
			1: {
				code: 1,
				src: a + "se.png",
				title: "Svenska"
			},
			14: {
				code: 14,
				src: a + "no.png",
				title: "Norsk"
			},
			16: {
				code: 16,
				src: a + "dk.png",
				title: "Dansk"
			},
			2: {
				code: 2,
				src: a + "cn.png",
				title: "中文"
			},
			6: {
				code: 6,
				src: a + "jp.png",
				title: "日本語"
			},
			5: {
				code: 5,
				src: a + "kr.png",
				title: "한국어"
			},
			7: {
				code: 7,
				src: a + "ru.png",
				title: "Русский"
			},
			11: {
				code: 11,
				src: a + "fi.png",
				title: "Suomi"
			},
			15: {
				code: 15,
				src: a + "pl.png",
				title: "Polski"
			}
		};
	return b
}, pb.utils.doGoogleCDNBlock = function() {
	return "CN" == pb.data.site.ClientCountryCode || "zh-cn" == pb.environment.visitorLanguage ? !0 : !1
}, pb.utils.getQueryParameterByName = function(a) {
	var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
		c = b.exec(window.location.href);
	return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
}, pb.utils.getTodaysDate = function() {
	return (new Date).toISOString().slice(0, 10).replace(/-/g, "-")
}, pb.utils.getUniqeArray = function(a) {
	var b = [];
	return $.each(a, function(a, c) {
		-1 === $.inArray(c, b) && b.push(c)
	}), b
}, pb.utils.showMessageAfterSubmit = function(a, b, c, d) {
	b = void 0 == b ? 300 : b, c = void 0 == c ? 3e3 : c, a.show(), setTimeout(function() {
		a.fadeOut(b), void 0 != d && d()
	}, c)
}, pb.utils.removeHTMLTags = function(a) {
	return a ? String(a).replace(/<[^>]+>/gm, "") : ""
}, pb.utils.positionClubPopup = function() {
	var a = $(".clubPopup .contentWrapper"),
		b = .2 * $(window).height() / 2;
	a.css("margin-top", b + "px")
}, pb.utils.containsValue = function(a, b) {
	return a.indexOf(b) > -1
}, pb.utils.resizeAndDestroy = function(a, b, c) {
	b = "resize." + b, $(window).on(b, function() {
		void 0 != c && c($(window).width(), $(window).height())
	}), void 0 != a && pb.utils.onDestroy(a, function() {
		void 0 != b && $(window).off(b), a = null
	}, b)
}, pb.utils.onDestroy = function(a, b, c, d) {
	var e = !0;
	a.$on("$destroy", function() {
		try {
			var f = {
				OnDestroy: ""
			};
			void 0 != b && (b(), void 0 != c && e && (f.OnDestroy = c)), a = null, void 0 != d && d()
		} catch (g) {
			var h = {};
			h[c] = g, console.error(h)
		}
	})
}, pb.utils.onCreateEvents = function(a, b, c, d, e) {
	e = void 0 == e ? !0 : e, d += " - RemoveEvents";
	var f = {}, g = function(b) {
		f[b] = a.$on(b, function(a, d) {
			c(b, a, d)
		})
	};
	$.each(b, function(a, b) {
		g(b)
	});
	var h = function() {
		null != f && (pb.utils.onRemoveEventsAndWatchers(f), f = null)
	};
	e || h(), pb.utils.onDestroy(a, function() {
		h(), a = null
	}, d)
}, pb.utils.onCreateWatchers = function(a, b, c, d, e) {
	e = void 0 == e ? !1 : e, d += " - RemoveWatchers";
	var f = {}, g = function(b) {
		f[b] = a.$watch(b, function() {
			c(b)
		}, e)
	};
	$.each(b, function(a, b) {
		g(b)
	});
	var h = function() {
		null != f && (pb.utils.onRemoveEventsAndWatchers(f), f = null)
	};
	isAdmin || h(), pb.utils.onDestroy(a, function() {
		h(), a = null
	}, d)
}, pb.utils.onRemoveEventsAndWatchers = function(a) {
	if (void 0 != a && null != a) {
		for (var b in a) if (a[b]) try {
			a[b](), a[b] = null
		} catch (c) {
			console.error(c)
		}
		a = null
	}
}, pb.utils.pendingBlogPostGuidList = {}, pb.utils.fetchBlogPosts = function(a, b, c, d, e) {
	var f = c,
		g = [],
		h = [],
		i = 0;
	for (f; f < a.page.BlogPosts.length; f++) {
		var j = a.page.BlogPosts[f];
		if (void 0 == j) break;
		if (void 0 != pb.utils.pendingBlogPostGuidList[j.Guid] || void 0 != j.IsFullPost && 0 != j.IsFullPost || (g.length != d ? (g.push(j.Guid), pb.utils.pendingBlogPostGuidList[j.Guid] = j.Guid) : (h.push(j.Guid), pb.utils.pendingBlogPostGuidList[j.Guid] = j.Guid), i++), i == e) break
	}
	g.length > 0 && b.getMultipleBlogPostByPostGuids(a, g), h.length > 0 && b.getMultipleBlogPostByPostGuids(a, h)
}, pb.utils.mousewheel = function(a, b) {
	var c = function() {
		a.mousewheel(function(a) {
			this.scrollLeft -= Math.abs(a.deltaX) ? 5 * a.deltaX : 5 * a.deltaY, a.preventDefault()
		})
	};
	c();
	var d = null;
	void 0 != b && pb.utils.setInterval(function() {
		return a.find(b).length > 0 ? !0 : void 0
	}, 100, 1e3).done(function() {
		d = a.find(b), d.mouseover(function() {
			a.off("mousewheel"), isTouchPad = void 0, eventCount = 0, eventCountStart = 0
		}), d.mouseleave(function() {
			c()
		})
	})
}, pb.utils.watchFontStyles = function(a, b, c) {
	var d = $(b);
	pb.utils.setInterval(function() {
		return d = $(b), d.length > 0 ? !0 : void 0
	}, 10, 1e3).done(function() {
		isAdmin && pb.utils.onCreateWatchers(a, ["site.ListFontFamily", "site.ListFontSize", "site.ListFontColor", "site.ListSpacing", "site.ListUpperCase", "site.ListFontVariant"], function(c) {
			var d = $(b);
			if ("site.ListFontFamily" == c) d.css("font-family", a.site.ListFontFamily);
			else if ("site.ListFontSize" == c) d.css("font-size", a.site.ListFontSize);
			else if ("site.ListFontColor" == c) d.css("color", a.site.ListFontColor);
			else if ("site.ListSpacing" == c) d.css("letter-spacing", parseInt(a.site.ListSpacing) / 4 + "px");
			else if ("site.ListUpperCase" == c) d.css("text-transform", 1 == a.site.ListUpperCase ? "uppercase" : "");
			else if ("site.ListFontVariant" == c) {
				var e = pb.utils.getCssStyleAndWeight(a.site.ListFontVariant);
				"" != e["font-style"] && d.css("font-style", e["font-style"]), "" != e["font-weight"] && d.css("font-weight", e["font-weight"])
			}
		}, c)
	})
}, pb.utils.changeFigStyles = function(a, b) {
	var c = $(b);
	pb.utils.setInterval(function() {
		return c = $(b), c.length > 0 ? !0 : void 0
	}, 10, 1e3).done(function() {
		c.css("font-family", a.site.ListFontFamily), c.css("font-size", a.site.ListFontSize), c.css("color", a.site.ListFontColor), c.css("letter-spacing", parseInt(a.site.ListSpacing) / 4 + "px"), c.css("text-transform", 1 == a.site.ListUpperCase ? "uppercase" : "");
		var b = pb.utils.getCssStyleAndWeight(a.site.ListFontVariant);
		"" != b["font-style"] && c.css("font-style", b["font-style"]), "" != b["font-weight"] && c.css("font-weight", b["font-weight"]), setTimeout(function() {
			c.find("a").css("color", a.site.PLinkColor)
		}, 10)
	})
}, pb.utils.clearTimeoutForFrontLogout = function() {
	0 == isAdmin && 0 != expTimer && (clearTimeout(expTimer), expTimer = !1)
}, pb.utils.getImgAltOrPageTitle = function(a, b) {
	if (a = String(a), "" == a || void 0 == a || "undefined" == a) return (void 0 == b || "" == b || "undefined" == b) && (b = ""), b;
	try {
		a = a.replace(/<.*?>/g, "")
	} catch (c) {
		a = ""
	} finally {
		return a
	}
}, pb.utils.getLastDateOfMonth = function(a, b) {
	var c = new Date;
	return c.setFullYear(a, b, 1), new Date(c.getFullYear(), c.getMonth(), 0)
}, pb.utils.exportColorCombo = function() {
	var a = {
		BgColor: pb.data.site.BgColor,
		BoxColor: pb.data.site.BgColor,
		H1FontColor: pb.data.site.H1FontColor,
		H2FontColor: pb.data.site.H2FontColor,
		H3FontColor: pb.data.site.H3FontColor,
		PFontColor: pb.data.site.PFontColor,
		PLinkColor: pb.data.site.PLinkColor,
		PLinkColorHover: pb.data.site.PLinkColorHover,
		ListFontColor: pb.data.site.ListFontColor,
		ButtonColor: pb.data.site.ButtonColor,
		ButtonHoverColor: pb.data.site.ButtonHoverColor,
		ButtonTextColor: pb.data.site.ButtonTextColor,
		LogoFontColor: pb.data.site.LogoFontColor,
		MenuFontColor: pb.data.site.MenuFontColor,
		MenuFontColorHover: pb.data.site.MenuFontColorHover,
		MenuBoxBorder: pb.data.site.MenuBoxColor,
		BgFilePath: pb.data.site.BgFilePath,
		ActiveMenuFontColor: pb.data.site.ActiveMenuFontColor,
		ThumbDecorationBorderColor: pb.data.site.ThumbDecorationBorderColor,
		SocialButtonColor: pb.data.site.SocialButtonColor
	};
	console.log(a)
}, pb.utils.isEmailAddress = function(a) {
	var b = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$/i;
	return b.test(a)
}, pb.utils.exportFontCombo = function() {
	var a = {
		LogoFontFamily: pb.data.site.LogoFontFamily,
		LogoFontVariant: pb.data.site.LogoFontVariant,
		LogoFontSize: pb.data.site.LogoFontSize,
		LogoFontSpacing: pb.data.site.LogoFontSpacing,
		LogoFontUpperCase: pb.data.site.LogoFontUpperCase,
		MenuFontFamily: pb.data.site.MenuFontFamily,
		MenuFontVariant: pb.data.site.MenuFontVariant,
		MenuFontSize: pb.data.site.MenuFontSize,
		MenuFontSpacing: pb.data.site.MenuFontSpacing,
		MenuFontUpperCase: pb.data.site.MenuFontUpperCase,
		ActiveMenuFontIsUnderline: pb.data.site.ActiveMenuFontIsUnderline,
		ActiveMenuFontIsItalic: pb.data.site.ActiveMenuFontIsItalic,
		ActiveMenuFontIsBold: pb.data.site.ActiveMenuFontIsBold,
		H1FontFamily: pb.data.site.H1FontFamily,
		H1FontVariant: pb.data.site.H1FontVariant,
		H1FontSize: pb.data.site.H1FontSize,
		H1Spacing: pb.data.site.H1Spacing,
		H1UpperCase: pb.data.site.H1UpperCase,
		H2FontFamily: pb.data.site.H2FontFamily,
		H2FontVariant: pb.data.site.H2FontVariant,
		H2FontSize: pb.data.site.H2FontSize,
		H2Spacing: pb.data.site.H2Spacing,
		H2UpperCase: pb.data.site.H2UpperCase,
		H3FontFamily: pb.data.site.H3FontFamily,
		H3FontVariant: pb.data.site.H3FontVariant,
		H3FontSize: pb.data.site.H3FontSize,
		H3Spacing: pb.data.site.H3Spacing,
		H3UpperCase: pb.data.site.H3UpperCase,
		ListFontFamily: pb.data.site.ListFontVariant,
		ListFontVariant: pb.data.site.ListFontVariant,
		ListFontSize: pb.data.site.ListFontSize,
		ListSpacing: pb.data.site.ListSpacing,
		ListUpperCase: pb.data.site.ListUpperCase,
		PFontFamily: pb.data.site.PFontFamily,
		PFontVariant: pb.data.site.PFontVariant,
		PFontSize: pb.data.site.PFontSize,
		PSpacing: pb.data.site.PSpacing,
		PUpperCase: pb.data.site.PUpperCase
	};
	console.log(a)
}, pb.utils.templateSlider = function(a, b, c) {
	c = c ? c : 540, a.admin.selectedTmplate = 0;
	var d = function(a) {
		b.css({
			transition: "all 400ms ease",
			transform: "translate3d(" + -(c * a) + "px, 0, 0)"
		})
	}, e = function() {
		a.admin.selectedTmplate = 0, b.css({
			transition: "all 0ms ease",
			transform: "translate3d(0, 0, 0)"
		})
	}, f = function(b) {
		a.admin.selectedTmplate = b, d(a.admin.selectedTmplate)
	}, g = function() {
		f(a.admin.selectedTmplate - 1)
	}, h = function() {
		f(a.admin.selectedTmplate + 1)
	};
	return e(), {
		goToIndex: f,
		goToPrevious: g,
		goToNext: h,
		reset: e
	}
}, pb.utils.console = function(a, b, c, d, e) {
	b && console.group(b), "table" == e ? console.table(a) : "log" == e && console.log(a), c && console.timeEnd(), d && console.trace(), b && console.groupEnd(b)
}, pb.utils.consoleTable = function(a, b, c, d) {
	pb.utils.console(a, b, c, d, "table")
}, pb.utils.consoleLog = function(a, b, c, d) {
	pb.utils.console(a, b, c, d, "log")
}, pb.utils.verifyAndSaveBlockContent = function(a, b, c) {
	var d = function(a, d) {
		if (void 0 != d && 1 == d) {
			var e = "VERIFY_" + b + "_HASH";
			void 0 != a && (a = '<span id="' + e + '" class="DO_NOT_REMOVE_OR_COPY_AND_KEEP_IT_TOP ng-scope" style="display:none;width:0;height:0;position:fixed;top:-10px;z-index:-10"></span>\n' + (null != a && a ? a : ""))
		}
		c(a, !0)
	}, e = a ? a.search("VERIFY_") : 0,
		f = a ? a.search("_HASH") : 0;
	if (e > 3 && f > 9) {
		var g = a.substring(e + 7, f);
		b == g ? d(a, !1) : (console.info("Content is not saved: Wrong content, please reload"), c(a, !1))
	} else d(a, !0)
}, pb.utils.fixForMobileBG = function() {}, pb.utils.getPageAndSectionList = function(a, b, c) {
	var d = [],
		e = b && a.page.OnePagerSections && a.page.OnePagerSections.length > 0 ? !0 : !1;
	pb.data.get.pageList(function(b) {
		e && d.push({
			Guid: null,
			Title: "None",
			Group: "Empty"
		}), b.forEach(function(b) {
			b.Guid != a.page.Guid && d.push({
				Guid: b.Guid,
				Title: b.PageTitle,
				Group: "Pages"
			})
		}), e && a.page.OnePagerSections.forEach(function(b) {
			b.Guid != a.admin.currentSection.Guid && d.push({
				Guid: b.Guid,
				Title: b.Title,
				Group: "Sections"
			})
		}), c(d)
	})
}, pb.utils.updateLinkToSectionOrPageGuid = function(a, b, c) {
	var d = null,
		e = {
			LinkToPageGuid: null,
			LinkToSectionGuid: null
		};
	a.some(function(a) {
		return a.Guid == b ? (d = a, !0) : !1
	}), "Pages" == d.Group ? e.LinkToPageGuid = d.Guid : "Sections" == d.Group && (e.LinkToSectionGuid = d.Guid), c(e)
}, pb.utils.setupLinkToSectionOrPage = function(a, b, c, d, e, f, g) {
	a.linkToUrl || (a.linkToUrl = {}), a.linkToUrl.Settings || (a.linkToUrl.Settings = {}), a.linkToUrl.Settings.isSection = void 0 == b ? !1 : b, a.linkToUrl.Settings.hasCustomLink = void 0 == c ? !1 : c, a.linkToUrl.Settings.hasCustomLinkTitle = void 0 == d ? !1 : d, a.linkToUrl.Settings.containerIdName = void 0 == e ? null : e, a.linkToUrl.Settings.checkIndexFirst = void 0 == f ? !1 : f, a.linkToUrl.Settings.indexProp = void 0 == g ? !1 : g
}, pb.utils.setupLinkToSectionOrPageGetTitle = function(a, b, c, d, e, f, g, h, i, j) {
	var k = c,
		l = function(a) {
			e && (k = c[e], void 0 != j && (k = k[j])), b.linkToUrl.Settings.checkIndexFirst && void 0 != a && (b.linkToUrl.Settings.indexProp ? (k = pb.utils.findItemFromArray(c[e], b.linkToUrl.Settings.indexProp, a), k || (k = c[e][a])) : k = c[e][a])
		};
	b.linkToUrl.getTitle = function(a) {
		l(a);
		var c = b.admin.lang.common.linkedTo,
			d = "";
		if (f && k[f]) {
			if (c = "Page: ", !i) {
				var e = pb.utils.findItemFromArray(b.admin.pageList, "Guid", k[f]);
				e && (d = e.PageTitle)
			}
		} else if (g && k[g]) {
			if (c = "Section: ", !i && b.page.OnePagerSections && b.page.OnePagerSections.length > 0) {
				var j = pb.utils.findItemFromArray(b.page.OnePagerSections, "Guid", k[g]);
				j && (d = j.Title)
			}
		} else b.linkToUrl.Settings.hasCustomLink && h && k[h] && (c = "Link: ", b.linkToUrl.Settings.hasCustomLinkTitle && i ? (b.linkToUrl.customLinkTitle = k[i], d = b.linkToUrl.customLinkTitle) : (b.linkToUrl.customLinkTitle = k[h], d = b.linkToUrl.customLinkTitle));
		return "" == d && i && k[i] && (d = k[i]), c += d.length > 20 ? d.substring(0, 20) : d
	}, b.linkToUrl.addLink = function(j, m, n) {
		l(n), "page" == j ? (f && (k[f] = m.Guid), g && (k[g] = null), i && (k[i] = m.PageTitle), h && (k[h] = m.Uri), k.Target = "_self", "undefined" != typeof k.ButtonLink && (k.ButtonLink = null, pb.admin.update("ListItem", k, "ButtonLink"), pb.utils.apply(b, !0))) : "section" == j ? (f && (k[f] = null), g && (k[g] = m.Guid), i && (k[i] = m.Title), h && (k[h] = null), k.Target = "_self") : "custom" == j && (f && (k[f] = null), g && (k[g] = null), i && (k[i] = "" != m.Title ? m.Title : pb.utils.addHttp(m.Url)), h && (k[h] = m.Url.startsWith("mailto:") ? m.Url : pb.utils.addHttp(m.Url), k.Target = "_blank"), "undefined" != typeof k.ButtonLink && (k.ButtonLink = null, pb.admin.update("ListItem", k, "ButtonLink")), pb.utils.apply(b, !0));
		var o = $(".linkBox.activeLinkBox");
		b.linkToUrl.showLinkBox(!1, o), b.admin.broadCast("applySectionLink" + c.Guid, {
			Guid: c.Guid
		}), a && angular.isFunction(a) ? a(k, m) : pb.admin.update(d, c, e)
	}, b.linkToUrl.removeLink = function(j) {
		l(j), f && (k[f] = null), g && (k[g] = null), i && (k[i] = null), h && (k[h] = null), a && angular.isFunction(a) ? a(k) : pb.admin.update(d, c, e), b.admin.broadCast("applySectionLink" + c.Guid, {
			Guid: c.Guid
		})
	}
}, pb.utils.getSectionCustomObjectValues = function(a, b, c, d) {
	return d = d ? d : 0, a.CustomObj && angular.isObject(a.CustomObj) || (a.CustomObj = {}), a.CustomObj[b] && angular.isObject(a.CustomObj[b]) || (a.CustomObj[b] = {}), c ? (a.CustomObj[b][c] || (a.CustomObj[b][c] = d), a.CustomObj[b][c]) : a.CustomObj[b]
}, pb.utils.updateSectionPropView = function(a, b, c, d) {
	c = void 0 == c ? !1 : c, "onepager" == a.page.DsnTemplateType && b && (c && $(".contentPanelWrapper").length > 0 && $(".contentPanelWrapper").css("visibility", "hidden"), setTimeout(function() {
		a.admin.broadCast("updateSectionPropView", {
			section: b
		}), c && $(".contentPanelWrapper").length > 0 && $(".contentPanelWrapper").css("visibility", "visible"), d && angular.isFunction(d) && d()
	}, 10))
}, pb.utils.isSupportedVideoFormat = function(a) {
	return a && "mp4" == a.split(".").pop().toLowerCase() ? !0 : !1
}, pb.utils.testTeam = [1, 4e5, 400001, 400006, 502733, 807233, 807341], pb.utils.getFlickrPhotoUrl = function(a, b) {
	var c;
	if ("_k" == b || "_h" == b) if (a.secret_k && "_k" == b) c = "https://farm" + a.farm + ".staticflickr.com/" + a.server + "/" + a.id + "_" + a.secret_k + "_k.jpg";
	else if (a.secret_h && "_h" == b) c = "https://farm" + a.farm + ".staticflickr.com/" + a.server + "/" + a.id + "_" + a.secret_h + "_h.jpg";
	else {
		var d = a.sizes ? a.sizes : "";
		b = d.indexOf("b") > -1 ? "_b" : d.indexOf("l") > -1 ? "_b" : d.indexOf("c") > -1 ? "_c" : "_z", c = "https://farm" + a.farm + ".staticflickr.com/" + a.server + "/" + a.id + "_" + a.secret + b + ".jpg"
	} else c = "https://farm" + a.farm + ".staticflickr.com/" + a.server + "/" + a.id + "_" + a.secret + b + ".jpg";
	return c
}, pb.utils.convertThumbTypeToFlickrAppendix = function(a, b) {
	var c = function() {
		return f = b.indexOf("c") > -1 ? "_c" : b.indexOf("b") > -1 ? "_b" : b.indexOf("l") > -1 ? "_b" : "_z"
	}, d = function() {
		return f = b.indexOf("h") > -1 ? "_h" : b.indexOf("k") > -1 ? "_k" : b.indexOf("b") > -1 ? "_b" : b.indexOf("l") > -1 ? "_b" : b.indexOf("c") > -1 ? "_c" : "_z"
	}, e = function() {
		return f = b.indexOf("k") > -1 ? "_k" : b.indexOf("h") > -1 ? "_h" : b.indexOf("b") > -1 ? "_b" : b.indexOf("l") > -1 ? "_b" : b.indexOf("c") > -1 ? "_c" : "_z"
	}, f = "";
	return f = "w400" == a ? c() : "w1000" == a ? d() : "h400" == a ? c() : "h800" == a ? d() : e()
}, pb.utils.getFlickrSafeSizeUrl = function(a) {
	return pb.utils.getFlickrPhotoUrl(a, "_c")
}, pb.utils.isIntegerValue = function(a) {
	return Math.floor(a) == a && $.isNumeric(a) ? !0 : !1
}, pb.utils.getFindCreativeImageUrl = function(a, b) {
	var c = {
		0: "https://dvqlxo2m2q99q.cloudfront.net/000_findcreatives",
		1: "https://d2f8l4t0zpiyim.cloudfront.net/000_findcreatives",
		2: "https://dkemhji6i1k0x.cloudfront.net/000_findcreatives",
		3: "https://dif1tzfqclj9f.cloudfront.net/000_findcreatives",
		4: "https://d37b3blifa5mva.cloudfront.net/000_findcreatives",
		5: "https://d3dvldql7ksohz.cloudfront.net/000_findcreatives",
		6: "https://dglb26w8rx2ld.cloudfront.net/000_findcreatives"
	}, d = function(a) {
		return c[a]
	}, e = d(a.s3Id),
		f = e + "/" + a.creativeGuid + "/images/";
	return void 0 == b ? f + a.src : f + b + "-" + a.src
}, pb.utils.getDummyImageUrl = function(a, b) {
	return void 0 == b ? pb.constants.getServerCdn() + "application/_img/dummy/" + a.folder + "/" + a.fileName : pb.constants.getServerCdn() + "application/_img/dummy/" + a.folder + "/" + b + "-" + a.fileName
}, pb.utils.closeDropDownAfterAddingContent = function() {
	var a = $(".sb-active");
	a.siblings(".sb-content").slideUp(100), a.removeClass("sb-active")
}, pb.utils.pxToVw = function(a) {
	return Math.round(a / pb.environment.width * 100 * 100) / 100
}, pb.utils.executeOnObjectLoad = function(a, b, c) {
	c = $.isNumeric(c) ? c : function() {
		return c = parseInt(c), $.isNumeric(c) ? c : 1e3
	};
	var d;
	pb.utils.setInterval(function() {
		return d = $(a), d.length ? !0 : void 0
	}, 1, c).done(function() {
		return b(d), d
	}).fail(function() {
		return !1
	})
}, pb.utils.doesTemplateFromDifferentTypeHaveSlideshow = function(a) {
	for (var b = ["590", "600", "610"], c = 0; c < b.length; c++) if (a == b[c]) return !0;
	return !1
}, pb.utils.getFontSizeClassNames = function() {
	return {
		getArrayPos: function(a) {
			return 10 >= a ? 0 : 12 >= a ? 1 : 14 >= a ? 2 : 18 >= a ? 3 : 22 >= a ? 4 : 36 >= a ? 5 : 48 >= a ? 6 : 7
		},
		fontClassNames: ["mobileFitFontXX-Small", "mobileFitFontX-Small", "mobileFitFontSmall", "mobileFitFontMedium", "mobileFitFontLarge", "mobileFitFontX-Large", "mobileFitFontXX-Large", "mobileFitFontXXX-Large"]
	}
}, pb.utils.isCSSSupportedByBrowser = function(a, b) {
	return CSS.supports(a, b)
}, pb.utils.getListTextPositionValueFromId = function(a) {
	return 1 == a ? "figCover" : 2 == a ? "figBottom1" : 3 == a ? "figBottom2" : void 0
}, pb.utils.getFileChecksum = function(a, b) {
	var c = new FileReader;
	c.onload = function(a) {
		if (a.target.readyState == FileReader.DONE) {
			var c = new SparkMD5,
				d = a.target.result;
			c.appendBinary(d);
			var e = c.end();
			c.destroy(), d = null, c = null, angular.isFunction(b) && b(e)
		}
	}, c.onerror = function() {
		console.error("Could not read the file"), angular.isFunction(b) && b(!1)
	}, c.readAsBinaryString(a.getNative())
};
var pb = pb || {};
pb.seo = {}, pb.seo.changeHeaderMetaContents = function(a) {
	var b = 1 == a.site.AccountType || 2 == a.site.AccountType ? a.site.Url : "www.portfoliobox.net",
		c = window.location.href,
		d = function() {
			var d = document.querySelector("meta[name=title]"),
				e = document.querySelector("meta[name='twitter:title']"),
				f = document.querySelectorAll("meta[name=description]"),
				g = document.querySelector("meta[name='twitter:url']"),
				h = document.querySelector("meta[name='twitter:description']"),
				i = document.querySelector("meta[property='og:url']"),
				j = document.querySelector("meta[itemprop='name']"),
				k = document.querySelector("meta[itemprop='url']"),
				l = document.querySelector("meta[name=keywords]"),
				m = document.querySelector("link[rel=canonical]"),
				n = function(n, o) {
					if (n = n ? n : "", o = o ? o : "", document.title = n, null !== d && d.setAttribute("content", n), null !== e && e.setAttribute("content", n), $.each(f, function(a, b) {
						b.setAttribute("content", o)
					}), null !== h && h.setAttribute("content", o), null !== l) {
						var p = b + ", " + n + ", " + a.site.SeoKeywords;
						l.setAttribute("content", p)
					}! function() {
						if (null !== g && g.setAttribute("content", c), null !== i && i.setAttribute("content", c), null !== k && k.setAttribute("content", c), null !== m) if ("products" == a.page.DsnTemplateType) {
							var b = window.location.origin + "/" + a.page.Uri;
							m.setAttribute("href", b)
						} else m.setAttribute("href", c);
						null !== j && j.setAttribute("content", n)
					}()
				}, o = pb.utils.getUrl();
			if ("" == o && 1 == a.page.IsStartPage) n(a.site.SiteTitle, a.site.SeoDescriptionx);
			else {
				var p = o.split("/");
				if (p.length > 1) {
					var q = p[1],
						r = null;
					"blogs" == a.page.DsnTemplateType ? r = pb.utils.findItemFromArray(a.page.BlogPosts, "Url", q) : "products" == a.page.DsnTemplateType && (r = pb.utils.findItemFromArray(a.page.Products, "Url", q)), r ? n(r.Title, r.MetaDescription) : n("", "")
				} else n(a.page.PageTitle, a.page.SeoDescription)
			}
		};
	a.page ? d() : pb.seo.removeHeaderMetaContents(a)
}, pb.seo.removeHeaderMetaContents = function(a) {
	document.title = a.site.SiteTitle + " - Not Found"
};
var pb = pb || {};
pb.lang = function() {
	var a = function(a) {
		this.text = a.dictionaryJson
	}, b = function(a) {
		this.frontText = a.frontDictionaryJson
	};
	return {
		init: a,
		text: this.text,
		initFront: b,
		frontText: this.text
	}
}();
var pb = pb || {};
pb.frontviews = {}, pb.frontviews.evenRows = {
	setFigure: function() {}
};
var pb = pb || {};
pb.analytics = function() {
	var a = "https://analytics.portfoliobox.net/pb",
		b = function(a, b) {
			var e = {
				accountid: a,
				aid: h,
				page: b,
				platform: d() ? "mobile" : "web",
				referrer: document.referrer
			};
			c(e)
		}, c = function(b) {
			var c = new XMLHttpRequest;
			c.open("POST", a, !0), c.setRequestHeader("Content-Type", "application/json"), c.send(JSON.stringify(b))
		}, d = function() {
			return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4))
		}, e = function(a) {
			for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
				for (var e = c[d];
				" " == e.charAt(0);) e = e.substring(1, e.length);
				if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
			}
			return null
		}, f = function(a, b, c) {
			var d = "",
				e = new Date;
			e.setTime(c ? e.getTime() + 24 * c * 60 * 60 * 1e3 : e.getTime() + 31104e9), d = "; expires=" + e.toUTCString(), document.cookie = a + "=" + (b || "") + d + "; path=/"
		}, g = function() {
			var a, b, c = "";
			for (a = 0; 32 > a; a++) b = 16 * Math.random() | 0, (8 == a || 12 == a || 16 == a || 20 == a) && (c += "-"), c += (12 == a ? 4 : 16 == a ? 3 & b | 8 : b).toString(16);
			return c
		}, h = e("pb.analytics");
	return h || (h = g(), f("pb.analytics", h)), {
		Report: b
	}
}();
var pbAng = {
	dirs: {},
	ctrls: {},
	services: {},
	factories: {},
	filters: {},
	admin: {},
	mobileadmin: {},
	mobilemisc: {},
	mobileresources: {},
	states: {},
	front: {},
	props: {},
	variables: {
		selectedType: null
	},
	constants: {
		p404: "application/views/app/_front/views/pages/app404.html",
		pNoStartPage: "application/views/app/_front/views/pages/nocontent.html"
	}
};
pbAng.registerComponents = function(a, b, c) {
	pbAng.App.isMobileAdmin ? (a.directive("mobileAdminPanel", pbAng.mobileadmin.adminPanel), a.directive("pbMobileHeader", pbAng.dirs.mobileHeaderDir), a.directive("pbMobileModalHeader", pbAng.dirs.mobileModalHeaderDir), a.directive("pbMobileFooter", pbAng.dirs.mobileFooterDir), a.directive("pbMobileTextEditor", pbAng.dirs.mobileTextEditorDir), a.directive("pbMobileIsStartPage", pbAng.dirs.mobileIsStartPageDir), a.directive("pbMobileInMenu", pbAng.dirs.mobileInMenuDir), a.directive("pbMobilePageTitle", pbAng.dirs.mobilePageTitleDir), a.directive("pbMobileUploadEdit", pbAng.dirs.uploadAndEdit), a.directive("mobileGalleryProp", pbAng.props.mobileGalleryProp), a.directive("mobileCollectionProp", pbAng.props.mobileCollectionProp), a.directive("mobileBlogProp", pbAng.props.mobileBlogProp), a.directive("mobileProductProp", pbAng.props.mobileProductProp), a.directive("ckMobileTextEditor", pbAng.dirs.ckMobileTextEditor), a.directive("ngModelOnblur", pbAng.dirs.misc.ngModelOnblur), a.directive("colorPicker", pbAng.dirs.mobileColorPicker), a.directive("imageUploader", pbAng.dirs.imageUploader), a.directive("slider", pbAng.dirs.mobileSliderDir), a.directive("validera", pbAng.dirs.misc.validera), a.directive("progress", pbAng.dirs.progress), a.directive("mobileSideMenu", pbAng.dirs.mobileSideMenu), a.directive("galleryThumb", pbAng.dirs.misc.galleryThumb), a.directive("evalCustomStyle", pbAng.dirs.misc.evalCustomStyle), a.directive("nestedSortableMobile", pbAng.dirs.miscmobile.nestedSortableMobile), a.directive("adjustSpinner", pbAng.dirs.miscmobile.adjustSpinner), a.directive("adjustHeaderFooter", pbAng.dirs.miscmobile.adjustHeaderFooter), a.directive("adjustHeader", pbAng.dirs.miscmobile.adjustHeader), a.directive("adjustLogoImage", pbAng.dirs.miscmobile.adjustLogoImage), a.directive("detectKeyboard", pbAng.dirs.miscmobile.detectKeyboard), a.directive("pbToggle", pbAng.dirs.miscmobile.toogle), a.directive("pbAlignMiddle", pbAng.dirs.miscmobile.pbAlignMiddle), a.controller("MobileBaseController", b), a.controller("FontsCtrl", pbAng.mobileresources.ctrls.fontsCtrl), a.controller("MainPageCtrl", pbAng.mobileadmin.ctrls.mainPageCtrl), a.controller("SelectTemplateCtrl", pbAng.mobileadmin.ctrls.selectTemplateCtrl), a.controller("CreateEditPageCtrl", pbAng.mobileadmin.ctrls.createEditPageCtrl), a.controller("PagesCtrl", pbAng.mobileadmin.ctrls.PagesCtrl), a.controller("TextPageCtrl", pbAng.mobileadmin.ctrls.textPageCtrl), a.controller("GalleryPageCtrl", pbAng.mobileadmin.ctrls.galleryPageCtrl), a.controller("CollectionPageCtrl", pbAng.mobileadmin.ctrls.collectionPageCtrl), a.controller("BlogPageCtrl", pbAng.mobileadmin.ctrls.blogPageCtrl), a.controller("ProductPageCtrl", pbAng.mobileadmin.ctrls.productPageCtrl), a.controller("MenuCtrl", pbAng.mobileadmin.ctrls.menuCtrl), a.controller("DesignCtrl", pbAng.mobileadmin.ctrls.designCtrl), a.controller("LogoCtrl", pbAng.mobileadmin.ctrls.logoCtrl), a.controller("FontCombinationsCtrl", pbAng.mobileadmin.ctrls.fontCombinationsCtrl), a.controller("ColorSchemasCtrl", pbAng.mobileadmin.ctrls.colorSchemasCtrl), a.controller("LayoutCtrl", pbAng.mobileadmin.ctrls.layoutCtrl), a.controller("SettingsCtrl", pbAng.mobileadmin.ctrls.settingsCtrl), a.controller("BillingCtrl", pbAng.mobileadmin.ctrls.billingCtrl), a.controller("UpgradeCtrl", pbAng.mobileadmin.ctrls.upgradeCtrl), a.controller("GeneralCtrl", pbAng.mobileadmin.ctrls.generalCtrl), a.controller("SocialMediaCtrl", pbAng.mobileadmin.ctrls.socialMediaCtrl), a.controller("MessagesCtrl", pbAng.mobileadmin.ctrls.messagesCtrl), a.controller("BlogCommentsCtrl", pbAng.mobileadmin.ctrls.blogCommentsCtrl), a.controller("ContactMessageCtrl", pbAng.mobileadmin.ctrls.contactMessageCtrl), a.controller("GuestBookMessageCtrl", pbAng.mobileadmin.ctrls.guestBookMessageCtrl), a.controller("FollowersMessageCtrl", pbAng.mobileadmin.ctrls.followersMessageCtrl), a.filter("serverCdn", pbAng.filters.misc.serverCdn), a.filter("pboxImage", pbAng.filters.misc.pboxImage), a.filter("pboxImageFile", pbAng.filters.misc.pboxImageFile), a.filter("urlFriendly", pbAng.filters.misc.UrlFriendly), a.service("mobileBlogCommentsService", pbAng.mobileadmin.services.mobileBlogCommentsService), a.service("mobileContactMessageService", pbAng.mobileadmin.services.mobileContactMessageService), a.service("mobileGuestBookService", pbAng.mobileadmin.services.mobileGuestBookService), a.service("mobileFollowersService", pbAng.mobileadmin.services.mobileFollowersService), a.service("mobileLayoutService", pbAng.mobileadmin.services.mobileLayoutService)) : (a.directive("main", pbAng.dirs.misc.main), a.directive("pbMenu", pbAng.dirs.menuDir), a.directive("pbFooter", pbAng.dirs.footerDir), a.directive("pbMainVideo", pbAng.dirs.misc.mainVideo), a.directive("pbVideoPlayer", pbAng.dirs.misc.pbVideoPlayer), a.directive("pbGallery", pbAng.dirs.gallery), a.directive("pbGallerySection", pbAng.dirs.pbGallerySection), a.directive("pbBlogSection", pbAng.dirs.pbBlogSection), a.directive("pbCollection", pbAng.dirs.collection), a.directive("pbCollectionSection", pbAng.dirs.pbCollectionSection), a.directive("pbProductSection", pbAng.dirs.pbProductSection), a.directive("pbProducts", pbAng.dirs.products), a.directive("pbBlog", pbAng.dirs.blog), a.directive("pbGuestbook", pbAng.dirs.guestbook), a.directive("pbFlickrGallery", pbAng.dirs.flickrGallery), a.directive("pbMainText", pbAng.dirs.misc.mainText), a.directive("pbEditorText", pbAng.dirs.misc.editorText), a.directive("pbForm", pbAng.dirs.formBuilder), a.directive("pbFormSection", pbAng.dirs.formBuilderSection), a.directive("pbMap", pbAng.dirs.map), a.directive("pbOnePager", pbAng.dirs.onePager), a.directive("pbOnePagerAdvanced", pbAng.dirs.pbOnePagerAdvanced), a.directive("pbSoundcloud", pbAng.dirs.soundcloud), a.directive("pbSpotify", pbAng.dirs.spotify), a.directive("pbYoutube", pbAng.dirs.youtube), a.directive("pbMusic", pbAng.dirs.music), a.directive("pbInstagramGallery", pbAng.dirs.instagramGallery), a.directive("pbCvEducations", pbAng.dirs.cvEducations), a.directive("pbCvExperiences", pbAng.dirs.cvExperiences), a.directive("pbCvAwards", pbAng.dirs.cvAwards), a.directive("pbCvExhibitions", pbAng.dirs.cvExhibitions), a.directive("pbCvSkills", pbAng.dirs.cvSkills), a.directive("pbCvInterests", pbAng.dirs.cvInterests), a.directive("pbCvLanguages", pbAng.dirs.cvLanguages), a.directive("pbScrolToTop", pbAng.dirs.misc.pbScrolToTop), a.directive("pbImage", pbAng.dirs.misc.pbImage), a.directive("pbVideo", pbAng.dirs.misc.pbVideo), a.service("blogPostsService", pbAng.services.blogPostsService), a.directive("siteBody", pbAng.dirs.siteBodyDir), a.directive("menuElement", pbAng.dirs.menuElement), a.directive("menuElementSection", pbAng.dirs.menuElementSection), a.directive("logoSection", pbAng.dirs.logoSection), a.directive("mobileMenuElement", pbAng.dirs.mobileMenuElement), a.directive("galleryThumb", pbAng.dirs.misc.galleryThumb), a.directive("pbNiceLoad", pbAng.dirs.misc.pbNiceLoad), a.directive("slideshow", pbAng.dirs.slideshow), a.directive("addToCart", pbAng.dirs.addToCart), a.directive("cartButton", pbAng.dirs.cartButton), a.directive("logo", pbAng.dirs.misc.logo), a.directive("mobileLogo", pbAng.dirs.misc.mobileLogo), a.directive("centerThumbsContainer", pbAng.dirs.misc.centerThumbsContainer), a.directive("description", pbAng.dirs.misc.description), a.directive("pagePartLoader", pbAng.dirs.pagePartLoader), a.directive("customHtml", pbAng.dirs.misc.customHtml), a.directive("customCss", pbAng.dirs.misc.customCss), a.directive("customJs", pbAng.dirs.misc.customJs), a.directive("bindUnsafeHtml", pbAng.dirs.misc.bindUnsafeHtml), a.directive("alertRepeatFinished", pbAng.dirs.misc.alertRepeatFinished), a.directive("backgroundImage", pbAng.dirs.misc.backgroundImage), a.directive("sectionBackground", pbAng.dirs.misc.sectionBackground), a.directive("editSectionOnHover", pbAng.dirs.misc.editSectionOnHover), a.directive("linkGuidToPage", pbAng.dirs.misc.linkGuidToPage), a.directive("linkGuidToPageSection", pbAng.dirs.misc.linkGuidToPageSection), a.directive("formInput", pbAng.dirs.formInput), a.directive("blogHelper", pbAng.dirs.blogHelper), a.directive("galleryDots", pbAng.dirs.misc.galleryDots), a.directive("pbClick", pbAng.dirs.misc.pbClick), a.directive("pbClickOnce", pbAng.dirs.misc.pbClickOnce), a.directive("playVideo", pbAng.dirs.misc.playVideo), a.directive("pageFontHelper", pbAng.dirs.misc.pageFontHelper), a.directive("miscHelper", pbAng.dirs.miscHelper), a.directive("styledButton", pbAng.dirs.misc.styledButton), a.directive("styledButtonV2", pbAng.dirs.misc.styledButtonV2), a.directive("styledSubmitButton", pbAng.dirs.misc.styledSubmitButton), a.directive("viewBlogPost", pbAng.dirs.misc.viewBlogPost), a.directive("blogRowsAndVertical", pbAng.dirs.misc.blogRowsAndVertical), a.directive("targ", pbAng.dirs.misc.targ), a.directive("logoutFront", pbAng.dirs.misc.logoutFront), a.directive("publicCookie", pbAng.dirs.misc.publicCookie), a.directive("pbCaptcha", pbAng.dirs.captcha), a.directive("pbInfScroll", pbAng.dirs.misc.pbInfScroll), a.directive("pbStyle", pbAng.dirs.misc.pbStyle), a.directive("evalCustomStyle", pbAng.dirs.misc.evalCustomStyle), a.directive("alignLogoAndMenu", pbAng.dirs.misc.alignLogoAndMenu), a.directive("alignLogoImageAndMenu", pbAng.dirs.misc.alignLogoImageAndMenu), a.directive("contentImage", pbAng.dirs.misc.contentImage), a.directive("pbGalleryErrImgSrc", pbAng.dirs.misc.pbGalleryErrImgSrc), a.directive("mobileSocialMediaIcon", pbAng.dirs.misc.mobileSocialMediaIcon), a.directive("returnToMobileApp", pbAng.dirs.misc.returnToMobileApp), a.directive("mobileViewFrame", pbAng.dirs.misc.mobileViewFrame), a.directive("pbVh", pbAng.dirs.misc.pbVh), a.directive("checkForLink", pbAng.dirs.misc.checkForLink), a.directive("leftLayoutLeft03", pbAng.dirs.layouts.left.left03), a.directive("leftLayoutLeft06", pbAng.dirs.layouts.left.left06), a.directive("leftLayoutLeft07", pbAng.dirs.layouts.left.left07), a.directive("centerLayoutTop06", pbAng.dirs.layouts.center.top06), a.directive("centerLayoutHorizontal02", pbAng.dirs.layouts.center.horizontal02), a.directive("centerLayoutHorizontal06", pbAng.dirs.layouts.center.horizontal06), a.directive("wideLayoutRight01", pbAng.dirs.layouts.wide.right01), a.directive("wideLayoutRight02", pbAng.dirs.layouts.wide.right02), a.directive("wideLayoutRight03", pbAng.dirs.layouts.wide.right03), a.directive("wideLayoutRight04", pbAng.dirs.layouts.wide.right04), a.directive("wideLayoutTop07", pbAng.dirs.layouts.wide.top07), a.directive("wideLayoutTop08", pbAng.dirs.layouts.wide.top08), a.directive("wideLayoutTop10", pbAng.dirs.layouts.wide.top10), a.directive("twoLinesMenuIcon", pbAng.dirs.misc.twoLinesMenuIcon), a.directive("threeLinesMenuIcon", pbAng.dirs.misc.threeLinesMenuIcon), a.directive("threeLinesMenuIconPassive", pbAng.dirs.misc.threeLinesMenuIconPassive), a.directive("commonAligncenter", pbAng.dirs.frontViews.common.alignCenter), a.directive("commonSameratio", pbAng.dirs.frontViews.common.sameRatio), a.directive("commonAlignbottom", pbAng.dirs.frontViews.common.alignBottom), a.directive("commonHorizontalnew", pbAng.dirs.frontViews.common.horizontalNew), a.directive("commonInsideboxes", pbAng.dirs.frontViews.common.insideBoxes), a.directive("commonPuzzle01", pbAng.dirs.frontViews.common.puzzle01), a.directive("commonDynamicgridnew", pbAng.dirs.frontViews.common.dynamicGridNew), a.directive("blogEvenRows", pbAng.dirs.frontViews.blogs.evenRows), a.directive("blogHorizontalStyled", pbAng.dirs.frontViews.blogs.horizontalStyled), a.directive("blogRowsAndVertical", pbAng.dirs.frontViews.blogs.rowsAndVertical), a.directive("collectionDynamicGrid", pbAng.dirs.frontViews.collections.dynamicGrid), a.directive("collectionThreeColumns", pbAng.dirs.frontViews.collections.threeColumns), a.directive("collectionThumbsSameRatio", pbAng.dirs.frontViews.collections.thumbsSameRatio), a.directive("collectionThumbsOriginalRatio", pbAng.dirs.frontViews.collections.thumbsOriginalRatio), a.directive("collectionThumbsSquareRatio", pbAng.dirs.frontViews.collections.thumbsSquareRatio), a.directive("collectionThumbsFilter", pbAng.dirs.frontViews.collections.thumbsFilter), a.directive("collectionThumbsEvenRows", pbAng.dirs.frontViews.collections.thumbsEvenRows), a.directive("collectionVerticalPlain", pbAng.dirs.frontViews.collections.verticalPlain), a.directive("collectionVerticalTwoThree", pbAng.dirs.frontViews.collections.verticalTwoThree), a.directive("collectionVerticalTwoOne", pbAng.dirs.frontViews.collections.verticalTwoOne), a.directive("collectionVerticalThreeOne", pbAng.dirs.frontViews.collections.verticalThreeOne), a.directive("collectionHorizontalNative", pbAng.dirs.frontViews.collections.horizontalNative), a.directive("collectionHorizontalStyled", pbAng.dirs.frontViews.collections.horizontalStyled), a.directive("galleryDynamicGrid", pbAng.dirs.frontViews.galleries.dynamicGrid), a.directive("galleryThreeColumns", pbAng.dirs.frontViews.galleries.threeColumns), a.directive("galleryEvenRows", pbAng.dirs.frontViews.galleries.galleryEvenRows), a.directive("galleryThumbsSameRatio", pbAng.dirs.frontViews.galleries.thumbsSameRatio), a.directive("galleryThumbsOriginalRatio", pbAng.dirs.frontViews.galleries.thumbsOriginalRatio), a.directive("galleryVerticalPlain", pbAng.dirs.frontViews.galleries.verticalPlain), a.directive("galleryVerticalTwoOne", pbAng.dirs.frontViews.galleries.verticalTwoOne), a.directive("galleryVerticalThreeOne", pbAng.dirs.frontViews.galleries.verticalThreeOne), a.directive("galleryVerticalTwoThree", pbAng.dirs.frontViews.galleries.verticalTwoThree), a.directive("galleryThumbsSquareRatio", pbAng.dirs.frontViews.galleries.thumbsSquareRatio), a.directive("galleryHorizontalStyled", pbAng.dirs.frontViews.galleries.horizontalStyled), a.directive("galleryHorizontalNative", pbAng.dirs.frontViews.galleries.horizontalNative), a.directive("galleryHorizontalThumbs", pbAng.dirs.frontViews.galleries.horizontalThumbs), a.directive("gallerySlideshowThumbsThree", pbAng.dirs.frontViews.galleries.slideShowThumbs03), a.directive("gallerySlideshowThumbsFour", pbAng.dirs.frontViews.galleries.slideShowThumbs04), a.directive("gallerySlideshowAndHorizontal", pbAng.dirs.frontViews.galleries.slideshowAndHorizontal), a.directive("galleryParallax01", pbAng.dirs.frontViews.galleries.parallax01), a.directive("gallerySectionDynamicGrid", pbAng.dirs.sectionViews.galleries.dynamicGrid), a.directive("gallerySectionEvenRows", pbAng.dirs.sectionViews.galleries.evenRows), a.directive("gallerySectionSameRatio", pbAng.dirs.sectionViews.galleries.sameRatio), a.directive("gallerySectionSquareRatio", pbAng.dirs.sectionViews.galleries.squareRatio), a.directive("gallerySectionVerticalTwoOne", pbAng.dirs.sectionViews.galleries.verticalTwoOne), a.directive("gallerySectionVerticalThreeOne", pbAng.dirs.sectionViews.galleries.verticalThreeOne), a.directive("gallerySectionHorizontalStyled", pbAng.dirs.sectionViews.galleries.horizontalStyled), a.directive("collectionSectionDynamicGrid", pbAng.dirs.sectionViews.collections.dynamicGrid), a.directive("collectionSectionEvenRows", pbAng.dirs.sectionViews.collections.evenRows), a.directive("collectionSectionSameRatio", pbAng.dirs.sectionViews.collections.sameRatio), a.directive("collectionSectionVerticalTwoOne", pbAng.dirs.sectionViews.collections.verticalTwoOne), a.directive("collectionSectionVerticalThreeOne", pbAng.dirs.sectionViews.collections.verticalThreeOne), a.directive("blogSectionDynamicGrid", pbAng.dirs.sectionViews.blogs.dynamicGrid), a.directive("commonSectionAlignBottom", pbAng.dirs.sectionViews.common.alignBottom), a.directive("commonSectionAlignCenter", pbAng.dirs.sectionViews.common.alignCenter), a.directive("commonSectionSameRatio", pbAng.dirs.sectionViews.common.sameRatio), a.directive("commonSectionPuzzle", pbAng.dirs.sectionViews.common.puzzle), a.directive("commonSectionHorizontal", pbAng.dirs.sectionViews.common.horizontal), a.directive("commonSectionDynamicGrid", pbAng.dirs.sectionViews.common.dynamicGrid), a.directive("commonSectionInsideBoxes", pbAng.dirs.sectionViews.common.insideBoxes), a.directive("productSectionDynamicGrid", pbAng.dirs.sectionViews.products.dynamicGrid), a.directive("productSectionVerticalThreeOne", pbAng.dirs.sectionViews.products.verticalTwoOrThreeOne), a.directive("productSectionVerticalTwoOne", pbAng.dirs.sectionViews.products.verticalTwoOrThreeOne), a.directive("productSectionSameRatio", pbAng.dirs.sectionViews.products.sameRatio), a.directive("productSectionSquareRatio", pbAng.dirs.sectionViews.products.squareRatio), a.directive("productSectionHorizontal", pbAng.dirs.sectionViews.products.horizontalStyled), a.directive("productSectionEvenRows", pbAng.dirs.sectionViews.products.evenRows), a.directive("sectionCoverHeader1", pbAng.dirs.sectionViews.covers.header01), a.directive("sectionMenu02", pbAng.dirs.sectionViews.menus.sectionMenu02), a.directive("sectionMenu04", pbAng.dirs.sectionViews.menus.sectionMenu04), a.directive("sectionMenu05", pbAng.dirs.sectionViews.menus.sectionMenu05), a.directive("picviewIncontext", pbAng.dirs.frontViews.picviews.incontext), a.directive("coverLinkentry01", pbAng.dirs.frontViews.cover.linkentry01), a.directive("coverLinkentry02", pbAng.dirs.frontViews.cover.linkentry02), a.directive("coverLinkentry03", pbAng.dirs.frontViews.cover.linkentry03), a.directive("coverBigtitle", pbAng.dirs.frontViews.cover.bigtitle), a.directive("coverBigtitleicon", pbAng.dirs.frontViews.cover.bigtitleicon), a.directive("coverBigbackground", pbAng.dirs.frontViews.cover.bigbackground), a.directive("coverOneimage01", pbAng.dirs.frontViews.cover.oneimage01), a.directive("coverOneimage02", pbAng.dirs.frontViews.cover.oneimage02), a.directive("coverCollectionlinks", pbAng.dirs.frontViews.cover.collectionLinks), a.directive("flickrDynamicGrid", pbAng.dirs.frontViews.other.flickrDynamicGrid), a.directive("flickrOriginalRatio", pbAng.dirs.frontViews.other.flickrOriginalRatio), a.directive("instagramSquareThumb", pbAng.dirs.frontViews.other.instagramSquareThumb), a.directive("instagramDynamicGrid", pbAng.dirs.frontViews.other.instagramDynamicGrid), a.directive("poetryPage", pbAng.dirs.frontViews.other.poetryPage), a.directive("otherFullscreenVideo", pbAng.dirs.frontViews.other.fullscreenVideo), a.directive("otherFullContentVideo", pbAng.dirs.frontViews.other.fullContentVideo), a.directive("servicesZigzag", pbAng.dirs.frontViews.other.servicesZigZag), a.directive("productsDynamicGrid", pbAng.dirs.frontViews.products.dynamicGrid), a.directive("productsThumbsSameRatio", pbAng.dirs.frontViews.products.thumbsSameRatio), a.directive("productsThumbsOriginalRatio", pbAng.dirs.frontViews.products.thumbsOriginalRatio), a.directive("productsThumbsSquareRatio", pbAng.dirs.frontViews.products.thumbsSquareRatio), a.directive("productsHorizontalNative", pbAng.dirs.frontViews.products.horizontalNative), a.directive("productsVerticalPlain", pbAng.dirs.frontViews.products.verticalPlain), a.directive("productsVerticalTwoOne", pbAng.dirs.frontViews.products.verticalTwoOne), a.directive("productsVerticalThreeOne", pbAng.dirs.frontViews.products.verticalThreeOne), a.directive("productsVerticalTwoThree", pbAng.dirs.frontViews.products.verticalTwoThree), a.directive("text02", pbAng.dirs.frontViews.text.text02), a.directive("textContact02", pbAng.dirs.frontViews.text.contact02), a.directive("fullscreenmap", pbAng.dirs.frontViews.text.fullscreenmap), a.directive("cvMain", pbAng.dirs.frontViews.text.cv), a.directive("cvMain02", pbAng.dirs.frontViews.text.cv02), a.directive("listItem", pbAng.dirs.frontViews.text.listItem), a.directive("listItemSimple", pbAng.dirs.frontViews.text.listItemSimple), a.directive("sectionListItem", pbAng.dirs.sectionViews.listitems.listItem), a.directive("sectionListItemSimple", pbAng.dirs.sectionViews.listitems.listItemSimple), a.directive("sectionServicesSigSack", pbAng.dirs.sectionViews.listitems.servicesSigSack), a.directive("sectionLogos01", pbAng.dirs.sectionViews.listitems.logos01), a.directive("sectionTestimonial01", pbAng.dirs.sectionViews.listitems.testimonial01), a.directive("carousel", pbAng.dirs.carousel), a.directive("sectionCarousel", pbAng.dirs.sectionViews.listitems.sectionCarousel), a.directive("sectionHorizontalStyled", pbAng.dirs.frontViews.sections.horizontalStyled), a.directive("sectionEvenRows", pbAng.dirs.frontViews.sections.evenRows), a.directive("sectionMap02", pbAng.dirs.sectionViews.maps.sectionMap02), a.directive("layoutLeft08", pbAng.dirs.frontViews.layouts.left08), a.directive("partTextPlain", pbAng.dirs.pageParts.text.plain), a.directive("partGallerySlideshow", pbAng.dirs.pageParts.galleries.slideshow), a.directive("partGalleryThumbs", pbAng.dirs.pageParts.galleries.thumbs), a.directive("partGalleryVertical", pbAng.dirs.pageParts.galleries.vertical), a.directive("partGalleryHorizontal", pbAng.dirs.pageParts.galleries.horizontal), a.directive("partProductsSingleproduct", pbAng.dirs.pageParts.products.singleProduct), a.directive("partProductsSingleproductVertical", pbAng.dirs.pageParts.products.singleProductVertical), a.filter("link", pbAng.filters.misc.link), a.filter("partLink", pbAng.filters.misc.partLink), a.filter("pboxImage", pbAng.filters.misc.pboxImage), a.filter("clubMemberImage", pbAng.filters.misc.clubMemberImage), a.filter("embedVideo", pbAng.filters.misc.embedVideo), a.filter("offset", pbAng.filters.misc.offset), a.filter("serverCdn", pbAng.filters.misc.serverCdn), a.filter("round", pbAng.filters.misc.round), a.filter("orderObjectBy", pbAng.filters.misc.orderObjectBy), a.filter("shortContentSummary", pbAng.filters.misc.shorterContentSummary), a.controller("baseController", b), a.controller("noStartPageCtrl", pbAng.front.ctrls.noStartPageCtrl), a.controller("popupSharePostCtrl", pbAng.front.ctrls.popupSharePostCtrl), a.controller("clubGalleryCtrl", pbAng.front.ctrls.clubGalleryCtrl), a.controller("clubBlogCtrl", pbAng.front.ctrls.clubBlogCtrl), a.controller("popupSoundcloudCtrl", pbAng.front.ctrls.popupSoundcloudCtrl), a.controller("clubFrontMembersCtrl", pbAng.front.ctrls.clubFrontMembersCtrl), a.directive("facebook", pbAng.dirs.socialmedia.facebook), a.directive("googleplus", pbAng.dirs.socialmedia.googleplus), a.directive("linkedin", pbAng.dirs.socialmedia.linkedin), a.directive("twitter", pbAng.dirs.socialmedia.twitter), a.directive("linkHeader", pbAng.dirs.linkHeader), a.directive("links", pbAng.dirs.links), a.directive("linksPage", pbAng.dirs.linksPage), a.directive("buttons", pbAng.dirs.buttons), a.directive("socialMediaLinks", pbAng.dirs.socialmedia.socialMediaLinks), a.directive("pbSocialMedia", pbAng.dirs.socialmedia.socialMediaSite), a.directive("pbSocialMediaSection", pbAng.dirs.socialmedia.socialMediaSiteSection), a.directive("pbSocialMediaSectionJustWords", pbAng.dirs.socialmedia.socialMediaSiteSectionJustWords), c && !pbAng.isMobileFront && (a.directive("adminPanel", pbAng.admin.adminPanel), a.directive("colorPicker", pbAng.dirs.cpicker), a.directive("slider", pbAng.dirs.slider), a.directive("simpleSlider", pbAng.dirs.simpleSlider), a.directive("progress", pbAng.dirs.progress), a.directive("propertyInput", pbAng.dirs.propertyInput), a.directive("sortable", pbAng.dirs.sortable), a.directive("ngModelOnblur", pbAng.dirs.misc.ngModelOnblur), a.directive("videoUploader", pbAng.dirs.videoUploader), a.directive("videoPosterUploader", pbAng.dirs.videoPosterUploader), a.directive("imageUploader", pbAng.dirs.imageUploader), a.directive("imageUploaderV2", pbAng.dirs.imageUploaderV2), a.directive("imageUploaderV3", pbAng.dirs.imageUploaderV3), a.directive("details", pbAng.dirs.misc.details), a.directive("selectButton", pbAng.dirs.misc.selectButton), a.directive("ckeditor", pbAng.dirs.ckeditor), a.directive("ckEditorV2", pbAng.dirs.ckEditorV2), a.directive("codeMirror", pbAng.dirs.codeMirror), a.directive("validera", pbAng.dirs.misc.validera), a.directive("hover", pbAng.dirs.misc.hover), a.directive("active", pbAng.dirs.misc.active), a.directive("pageSelector", pbAng.dirs.pageSelector), a.directive("nestedSortable", pbAng.dirs.misc.nestedSortable), a.directive("nestedSortableSection", pbAng.dirs.misc.nestedSortableSection), a.directive("learn", pbAng.dirs.misc.learn), a.directive("blockGrid", pbAng.dirs.misc.blockGrid), a.directive("blockHeadUploaderProgress", pbAng.dirs.misc.blockHeadUploaderProgress), a.directive("buyButton", pbAng.dirs.buyButton), a.directive("adminMessages", pbAng.dirs.misc.adminMessages), a.directive("linkToProduct", pbAng.dirs.misc.linkToProduct), a.directive("linkToBlogPost", pbAng.dirs.misc.linkToBlogPost), a.directive("datePicker", pbAng.dirs.misc.datePicker), a.directive("datePickerSimple", pbAng.dirs.misc.datePickerSimple), a.directive("userlanguageSpecialCharInput", pbAng.dirs.misc.userlanguageSpecialCharInput), a.directive("wizardImageUpload", pbAng.dirs.wizardImageUpload), a.directive("taskFinish", pbAng.dirs.misc.taskFinish), a.directive("contentLoader", pbAng.dirs.misc.contentLoader), a.directive("templateSlider", pbAng.dirs.misc.templateSlider), a.directive("propertySettingsPanel", pbAng.dirs.misc.propertySettingsPanel), a.directive("linkToUrl", pbAng.dirs.misc.linkToUrl), a.directive("moveItemsGallerySection", pbAng.dirs.misc.moveItemsGallerySection), a.directive("pbSelectBox", pbAng.dirs.misc.pbSelectBox), a.directive("selectable", pbAng.dirs.misc.selectable), a.controller("selectTemplateCtrl", pbAng.admin.ctrls.selectTemplateCtrl), a.controller("createPageCtrl", pbAng.admin.ctrls.createPageCtrl), a.controller("editPageCtrl", pbAng.admin.ctrls.editPageCtrl), a.controller("editSectionCtrl", pbAng.admin.ctrls.editSectionCtrl), a.controller("selectTypeCtrl", pbAng.admin.ctrls.selectTypeCtrl), a.controller("listContentCtrl", pbAng.admin.ctrls.listContentCtrl), a.controller("editMenuCtrl", pbAng.admin.ctrls.editMenuCtrl), a.controller("startPageCtrl", pbAng.admin.ctrls.startPageCtrl), a.controller("colorsAndFontsCtrl", pbAng.admin.ctrls.colorsAndFontsCtrl), a.controller("logoCtrl", pbAng.admin.ctrls.logoCtrl), a.controller("layoutCtrl", pbAng.admin.ctrls.layoutCtrl), a.controller("eCommerceCtrl", pbAng.admin.ctrls.eCommerceCtrl), a.controller("billingCtrl", pbAng.admin.ctrls.cpanel.billing), a.controller("socialMediaCtrl", pbAng.admin.ctrls.cpanel.socialMediaCtrl), a.controller("userTranslatedTextCtrl", pbAng.admin.ctrls.userTranslatedTextCtrl), a.controller("contactMessageCtrl", pbAng.admin.ctrls.contactMessageCtrl), a.controller("commentCtrl", pbAng.admin.ctrls.commentCtrl), a.controller("slideshowTextPositionCtrl", pbAng.admin.ctrls.slideshowTextPositionCtrl), a.controller("transitionModeCtrl", pbAng.admin.ctrls.transitionModeCtrl), a.controller("collectionSortTypeCtrl", pbAng.admin.ctrls.collectionSortTypeCtrl), a.controller("sortOrderCtrl", pbAng.admin.ctrls.sortOrderCtrl), a.controller("guestbookMessageCtrl", pbAng.admin.ctrls.guestbookMessageCtrl), a.controller("featureSearchCtrl", pbAng.admin.ctrls.featureSearchCtrl), a.controller("mainPanelCtrl", pbAng.admin.ctrls.mainPanelCtrl), a.controller("editGalleryItemPopupCtrl", pbAng.admin.ctrls.popups.editGalleryItem), a.controller("shareLinkCtrl", pbAng.admin.ctrls.popups.shareLinkCtrl), a.controller("followersCtrl", pbAng.admin.ctrls.followersCtrl), a.controller("likesAndRewardsCtrl", pbAng.admin.ctrls.popups.likesAndRewardsCtrl), a.controller("editCvDescriptionCtrl", pbAng.admin.ctrls.popups.editCvDescription), a.controller("acceptTermsPopup", pbAng.admin.ctrls.popups.acceptTermsPopup), a.controller("settingsCtrl", pbAng.admin.ctrls.cpanel.settingsCtrl), a.controller("deleteAccountCtrl", pbAng.admin.ctrls.cpanel.deleteAccountCtrl), a.controller("seoSettingsCtrl", pbAng.admin.ctrls.cpanel.seoSettingsCtrl), a.controller("messagesCtrl", pbAng.admin.ctrls.cpanel.messagesCtrl), a.controller("customizeCtrl", pbAng.admin.ctrls.cpanel.customizeCtrl), a.controller("customTemplatesCtrl", pbAng.admin.ctrls.cpanel.customTemplatesCtrl), a.controller("createTemplateCtrl", pbAng.admin.ctrls.cpanel.createTemplateCtrl), a.controller("appStoreCtrl", pbAng.admin.ctrls.cpanel.appStoreCtrl), a.controller("marketCtrl", pbAng.admin.ctrls.cpanel.marketCtrl), a.controller("googleAnalyticsCtrl", pbAng.admin.ctrls.cpanel.googleAnalyticsCtrl), a.controller("clubSettingsCtrl", pbAng.admin.ctrls.cpanel.clubSettingsCtrl), a.controller("clubMembersIndexCtrl", pbAng.admin.ctrls.cpanel.clubMembersIndexCtrl), a.controller("clubMembersCtrl", pbAng.admin.ctrls.cpanel.clubMembersCtrl), a.controller("clubMemberInviteCtrl", pbAng.admin.ctrls.cpanel.clubMemberInviteCtrl), a.controller("clubSettingsIndexCtrl", pbAng.admin.ctrls.cpanel.clubSettingsIndexCtrl), a.controller("clubGalleriesCtrl", pbAng.admin.ctrls.cpanel.clubGalleriesCtrl), a.controller("clubBlogPostsCtrl", pbAng.admin.ctrls.cpanel.clubBlogPostsCtrl), a.controller("productviewerCtrl", pbAng.admin.ctrls.dpanel.productviewerCtrl), a.controller("imageviewerCtrl", pbAng.admin.ctrls.dpanel.imageviewerCtrl), a.controller("changeTemplateCtrl", pbAng.admin.ctrls.dpanel.changeTemplateCtrl), a.controller("changeSectionTemplateCtrl", pbAng.admin.ctrls.dpanel.changeSectionTemplateCtrl), a.controller("colorschemaCtrl", pbAng.admin.ctrls.dpanel.colorschemaCtrl), a.controller("standardBackgroundsCtrl", pbAng.admin.ctrls.dpanel.standardBackgroundsCtrl), a.controller("fontcombinationCtrl", pbAng.admin.ctrls.dpanel.fontcombinationCtrl), a.controller("featuresearchCtrl", pbAng.admin.ctrls.dpanel.featuresearchCtrl), a.controller("changelayoutCtrl", pbAng.admin.ctrls.dpanel.changelayoutCtrl), a.controller("changeMobileTemplateCtrl", pbAng.admin.ctrls.dpanel.changeMobileTemplateCtrl), a.controller("fontDialogCtrl", pbAng.admin.ctrls.dpanel.fontDialogCtrl), a.controller("changeLangCtrl", pbAng.admin.ctrls.dpanel.changeLangCtrl), a.controller("publishDialogCtrl", pbAng.admin.ctrls.dpanel.publishDialogCtrl), a.controller("learnDialogCtrl", pbAng.admin.ctrls.dpanel.learnDialogCtrl), a.controller("videoItemsCtrl", pbAng.admin.ctrls.dpanel.videoItemsCtrl), a.controller("startupWizardDialogCtrl", pbAng.admin.ctrls.dpanel.startupWizardDialogCtrl), a.controller("supportDialogCtrl", pbAng.admin.ctrls.dpanel.supportDialogCtrl), a.controller("flickrWizardCtrl", pbAng.admin.ctrls.dpanel.flickrWizardCtrl), a.controller("flickrImportCtrl", pbAng.admin.ctrls.dpanel.flickrImportCtrl), a.controller("proRegularCtrl", pbAng.admin.ctrls.products.proRegularCtrl), a.controller("newDomainCtrl", pbAng.admin.ctrls.products.newDomainCtrl), a.controller("extraImagesCtrl", pbAng.admin.ctrls.products.extraImages), a.directive("mainTextProp", pbAng.props.mainText), a.directive("mainTextPositionProp", pbAng.props.mainTextPosition), a.directive("galleryProp", pbAng.props.galleryItems), a.directive("imageMarginProp", pbAng.props.imageMargin), a.directive("showListTextProp", pbAng.props.showListText), a.directive("showProductTitleProp", pbAng.props.showProductTitle), a.directive("listtextPositionProp", pbAng.props.listtextPositionProp), a.directive("imageSizeProp", pbAng.props.imageSize), a.directive("mainImageProp", pbAng.props.mainImage), a.directive("mainVideoProp", pbAng.props.mainVideo), a.directive("slideshowSettingsProp", pbAng.props.slideshowSettings), a.directive("blogProp", pbAng.props.blog), a.directive("linkHeaderProp", pbAng.props.linkHeaderProp), a.directive("productsProp", pbAng.props.products), a.directive("collectionProp", pbAng.props.collection), a.directive("flickrIdProp", pbAng.props.flickrId), a.directive("instagramOauthProp", pbAng.props.instagramOauth), a.directive("linksProp", pbAng.props.links), a.directive("formBuilderProp", pbAng.props.formBuilder), a.directive("mapProp", pbAng.props.map), a.directive("numberProp", pbAng.props.numberProp), a.directive("shortTextProp", pbAng.props.shortTextProperty), a.directive("textareaProp", pbAng.props.textAreaProperty), a.directive("textEditorProp", pbAng.props.textEditorProp), a.directive("radioButtonsProp", pbAng.props.radioButtons), a.directive("checkboxesProp", pbAng.props.checkBoxes), a.directive("selectProp", pbAng.props.select), a.directive("onepagerProp", pbAng.props.onepager), a.directive("onepagerAdvancedProp", pbAng.props.onepagerAdvancedProp), a.directive("soundcloudProp", pbAng.props.soundcloudProperty), a.directive("spotifyProp", pbAng.props.spotifyProperty), a.directive("youtubeProp", pbAng.props.youtubeProperty), a.directive("musicProp", pbAng.props.musicProperty), a.directive("listItemProp", pbAng.props.listItemProperty), a.directive("cvMainProp", pbAng.props.cvMainProperty), a.directive("cvEducationProp", pbAng.props.cvEducationProperty), a.directive("cvExperienceProp", pbAng.props.cvExperienceProperty), a.directive("cvAwardProp", pbAng.props.cvAwardProperty), a.directive("cvExhibitionProp", pbAng.props.cvExhibitionProperty), a.directive("cvSkillProp", pbAng.props.cvSkillProperty), a.directive("cvInterestProp", pbAng.props.cvInterestProperty), a.directive("cvLanguageProp", pbAng.props.cvLanguageProperty), a.directive("contentImageProp", pbAng.props.contentImageProp), a.directive("buttonProp", pbAng.props.buttonProp), a.directive("linkHeaderSectionProp", pbAng.props.linkHeaderSectionProp), a.directive("linksSectionProp", pbAng.props.linksSectionProp), a.directive("mainTextSectionProp", pbAng.props.mainTextSection), a.directive("gallerySectionProp", pbAng.props.gallerySectionProp), a.directive("collectionSectionProp", pbAng.props.collectionSectionProp), a.directive("sectionSlideshowSettingsProp", pbAng.props.sectionSlideshowSettings), a.directive("menuSectionProp", pbAng.props.menuSectionProp), a.directive("logoSectionProp", pbAng.props.logoSectionProp), a.directive("storeProp", pbAng.props.storeProp), a.directive("socialMediaSectionProp", pbAng.props.socialMediaSectionProp), a.directive("mainImageSectionProp", pbAng.props.mainImageSection), a.directive("blogSectionProp", pbAng.props.blogSectionProp), a.directive("imageSizeSectionProp", pbAng.props.imageSizeSectionProp), a.filter("urlFriendly", pbAng.filters.misc.UrlFriendly), a.filter("langKey", pbAng.filters.misc.langKey), a.controller("onepagerPropTextSection", pbAng.admin.ctrls.onepager.onepagerPropTextSection), a.controller("onepagerPropGallerySection", pbAng.admin.ctrls.onepager.onepagerPropGallerySection), a.controller("onepagerPropCollectionSection", pbAng.admin.ctrls.onepager.onepagerPropCollectionSection)))
}, pbAng.PreLoader = function() {
	function a() {
		var a = {
			pending: !1,
			list: []
		}, c = function(c, d, f) {
			c = pb.utils.getUniqeArray(c), f = void 0 == f ? !1 : f;
			var g = [];
			0 != c.length && $.each(c, function(a, b) {
				var c = pb.utils.findItemFromArray(pb.data.pages, "Guid", b);
				if (void 0 == c && null != b && "" != b) if (void 0 != d && null != d) {
					var e = $.inArray(b, d);
					0 > e && g.push(b)
				} else g.push(b)
			}), 0 != g.length ? e(g, f) : (a.pending = !1, a.list.length > 0 && (a.list.reverse(), b.deepSearch(a.list.pop())))
		}, d = function(a) {
			var b = [];
			return $.each(a, function(a, c) {
				c && void 0 != c.CollectionPages && null != c.CollectionPages && c.CollectionPages.length > 0 && $.each(c.CollectionPages, function(a, c) {
					void 0 != c.PageGuid && null != c.PageGuid && "" != c.PageGuid && b.push(c.PageGuid)
				}), c && void 0 != c.MainImageGuid && null != c.MainImageGuid && void 0 != c.MainImageGuid && null != c.MainImageGuid && "" != c.MainImageGuid && b.push(c.MainImageGuid), c && void 0 != c.LinkHeaders && null != c.LinkHeaders && 0 != c.LinkHeaders.length && $.each(c.LinkHeaders, function(a, c) {
					void 0 != c.LinkPageGuid && null != c.LinkPageGuid && "" != c.LinkPageGuid && b.push(c.LinkPageGuid)
				}), c && void 0 != c.Links && null != c.Links && 0 != c.Links.length && $.each(c.Links, function(a, c) {
					void 0 != c.PageGuid && null != c.PageGuid && "" != c.PageGuid && b.push(c.PageGuid)
				})
			}), b
		}, e = function(a, b) {
			b = void 0 == b ? !1 : b;
			var e = a.length;
			0 != e && setTimeout(function() {
				var f = 0,
					g = function(a) {
						f++, pb.data.get.page.getListOfPageByGuid(a, b, function(a, b) {
							if (a && (f--, 0 == f)) {
								var e = d(pb.data.pages);
								c(e, b)
							}
						})
					}, h = 200;
				if (e > h) for (var i = [], j = 0, k = 0; e > k; k++) h > j ? i.push(a[k]) : (g(i), j = 0, i = [], i.push(a[k])), k == e - 1 && h > j && 0 != i.length && g(i), j++;
				else g(a)
			}, 1e3)
		};
		this.deepSearch = function(b) {
			if (0 == a.pending) {
				a.pending = !0;
				var e = [];
				angular.isArray(b) ? e = b : e[0] = b;
				var f = d(e);
				c(f, null)
			} else a.list.push(b)
		}, this.run = function() {
			a.pending = !0;
			var b = [],
				d = function(a) {
					$.each(a, function(a, c) {
						c.Children && c.Children.length > 0 && d(c.Children), c.Guid && c.PageGuid && "" != c.PageGuid && null != c.PageGuid && b.push(c.PageGuid)
					})
				};
			d(pb.data.menu), c(b, null, !0)
		}
	}
	var b;
	return {
		getInstance: function() {
			return null == b && (b = new a), b
		}
	}
}(), pbAng.App = function() {
	var preloader = pbAng.PreLoader.getInstance(),
		baseController = ["$rootScope", "$scope", "$compile", "$routeParams", "$location", "$interval", "$window", "$sce", "$q", "blogPostsService", function($rootScope, $scope, $compile, $routeParams, $locationProvider, $interval, $window, $sce, $q, blogPostsService) {
			console.log("%cWarning!", "color: darkorange; font-size: 36px; font-weight: bold; -webkit-text-stroke: 1px black; text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"), console.log("%cThis is a browser feature intended for portfoliobox developers.", "color: black; font-size: 24px; font-weight: bold;"), $scope.site = pb.data.site, $scope.menuElements = pb.data.menu;
			var menuChange = $scope.$on("menuChange", function(a, b) {
				$scope.menuElements = b.newMenu, $scope.$digest()
			}),
				loadJs = function(customJs) {
					setTimeout(function() {
						try {
							eval(pb.utils.decodeHtmlSpecialChar(customJs))
						} catch (e) {}
					}, 50)
				};
			if (!isAdmin) {
				var removeCart = pb.utils.getCookie("removeCartId");
				(1 == removeCart || "true" == removeCart) && (console.log(removeCart), pb.utils.deleteCookie("cartId"), pb.utils.deleteCookie("removeCartId"), amplify.store("itemsInCart", 0), amplify.store("cart", []), amplify.store("cartExpire", !1), $locationProvider.path("/"))
			}
			$scope.base = {
				isMobile: pb.environment.isMobile,
				fileCdnPath: pb.constants.serverCdn,
				loadCustomCss: function() {
					var a = $scope.site.CustomCss;
					"" != a && (void 0 != $("#pbox-CustomCSS") && $("#pbox-CustomCSS").detach(), $('<style id="pbox-CustomCSS">' + a + "</style>").appendTo("head"))
				},
				loadCustomJs: function() {
					var a = $scope.site.CustomBodyBottom || "";
					"" != a && loadJs(a)
				},
				getH1Styles: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.H1FontSize : parseInt($scope.site.H1FontSize) > pb.constants.maxMobileH1FontSize ? pb.constants.maxMobileH1FontSize + "px" : $scope.site.H1FontSize, a.color = $scope.site.H1FontColor, a["font-family"] = $scope.site.H1FontFamily, a["letter-spacing"] = $scope.site.H1Spacing, a["text-transform"] = 1 == $scope.site.H1UpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.H1FontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getH2Styles: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.H2FontSize : parseInt($scope.site.H2FontSize) > pb.constants.maxMobileH2FontSize ? pb.constants.maxMobileH2FontSize + "px" : $scope.site.H2FontSize, a.color = $scope.site.H2FontColor, a["font-family"] = $scope.site.H2FontFamily, a["letter-spacing"] = $scope.site.H2Spacing, a["text-transform"] = 1 == $scope.site.H2UpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.H2FontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getH3Styles: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.H3FontSize : parseInt($scope.site.H3FontSize) > pb.constants.maxMobileH3FontSize ? pb.constants.maxMobileH3FontSize + "px" : $scope.site.H3FontSize, a.color = $scope.site.H3FontColor, a["font-family"] = $scope.site.H3FontFamily, a["letter-spacing"] = parseInt($scope.site.H3Spacing) / 4 + "px", a["text-transform"] = 1 == $scope.site.H3UpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.H3FontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getPStyle: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.PFontSize : parseInt($scope.site.PFontSize) > pb.environment.maxMobileParagraphFontSize ? pb.environment.maxMobileParagraphFontSize + "px" : $scope.site.PFontSize, a.color = $scope.site.PFontColor, a["font-family"] = $scope.site.PFontFamily, a["line-height"] = 0 == pb.environment.isMobile ? $scope.site.PLineHeight : parseInt($scope.site.PLineHeight) > pb.constants.maxMobileLineHeight ? pb.constants.maxMobileLineHeight + "px" : $scope.site.PLineHeight, a["letter-spacing"] = parseInt($scope.site.PSpacing) / 4 + "px", a["text-transform"] = 1 == $scope.site.PUpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.PFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getPSimpleStyle: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.PFontSize : parseInt($scope.site.PFontSize) > pb.environment.maxMobileParagraphFontSize ? pb.environment.maxMobileParagraphFontSize + "px" : $scope.site.PFontSize, a.color = $scope.site.PFontColor, a["font-family"] = $scope.site.PFontFamily, a["letter-spacing"] = parseInt($scope.site.PSpacing) / 4 + "px", a["text-transform"] = 1 == $scope.site.PUpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.PFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getPSimpleStyle2: function() {
					var a = {};
					a.color = $scope.site.PFontColor, a["font-family"] = $scope.site.PFontFamily, a["letter-spacing"] = parseInt($scope.site.PSpacing) / 4 + "px", a["text-transform"] = 1 == $scope.site.PUpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.PFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getLinkTextStyle: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.PFontSize : parseInt($scope.site.PFontSize) > pb.environment.maxMobileParagraphFontSize ? pb.environment.maxMobileParagraphFontSize + "px" : $scope.site.PFontSize, a.color = $scope.site.PLinkColor, a["font-family"] = $scope.site.PFontFamily;
					var b = pb.utils.getCssStyleAndWeight($scope.site.PFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getListTextStyle: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.ListFontSize : parseInt($scope.site.ListFontSize) > pb.environment.maxMobileParagraphFontSize ? pb.environment.maxMobileParagraphFontSize + "px" : $scope.site.ListFontSize, a.color = $scope.site.ListFontColor, a["font-family"] = $scope.site.ListFontFamily, a["letter-spacing"] = parseInt($scope.site.ListSpacing) / 4 + "px", a["text-transform"] = 1 == $scope.site.ListUpperCase ? "uppercase" : "";
					var b = pb.utils.getCssStyleAndWeight($scope.site.ListFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a
				},
				getBoxBGColor: function() {
					var a = {};
					return a["background-color"] = $scope.site.BgBoxColor, a
				},
				getBoxColorWithOpacity: function(a) {
					a || (a = .7);
					var b = {};
					return b["background-color"] = pb.utils.getTransparentColor($scope.site.BgBoxColor, a), b
				},
				getSearchBoxStyle: function() {
					var a = {};
					a["font-size"] = 0 == pb.environment.isMobile ? $scope.site.PFontSize : parseInt($scope.site.PFontSize) > pb.environment.maxMobileParagraphFontSize ? pb.environment.maxMobileParagraphFontSize + "px" : $scope.site.PFontSize, a.color = $scope.site.PFontColor, a["font-family"] = $scope.site.PFontFamily;
					var b = pb.utils.getCssStyleAndWeight($scope.site.PFontVariant);
					return a["font-style"] = b["font-style"], a["font-weight"] = b["font-weight"], a["background-color"] = $scope.site.BgBoxColor, a["border-color"] = pb.utils.getTransparentColor($scope.site.PFontColor), a["border-bottom"] = "1px solid", a
				},
				getBoxBGColorOpacity: function(a) {
					a || (a = .6);
					var b = {};
					return b["background-color"] = pb.utils.getTransparentColor($scope.site.BgBoxColor, a), b
				},
				getMenuBoxColor: function() {
					var a = {};
					return a["background-color"] = $scope.site.MobileMenuBoxColor, a
				},
				getMenuElementStyle: function() {
					var a = {};
					return a["font-family"] = $scope.site.MenuFontFamily, a["font-size"] = $scope.site.MenuFontSize, a.color = $scope.site.MenuFontColor, a
				},
				getBorderColor: function() {
					var a = $scope.site.PFontColor,
						b = pb.utils.getTransparentColor(a),
						c = {};
					return c["border-color"] = b, c
				},
				getBorderColor2: function() {
					var a = $scope.site.PFontColor,
						b = {};
					return b["border-color"] = a, b
				},
				set404: function() {
					$scope.DsnTemplate = pbAng.constants.p404, $scope.admin.showSidePanelSection = !1
				},
				getButtonStyle: function() {
					var a = {};
					return a["background-color"] = $scope.site.ButtonColor, a.color = $scope.site.ButtonTextColor, a
				},
				frontLang: pb.lang.frontText,
				cart: {
					quantity: amplify.store("itemsInCart") || null,
					items: amplify.store("cart") || [],
					cartExpire: amplify.store("cartExpire") || !1
				},
				broadCast: function(a, b) {
					try {
						void 0 == b ? $scope.$broadcast(a) : $scope.$broadcast(a, b)
					} catch (c) {}
				},
				popup: {
					show: !1,
					view: null,
					params: {},
					open: function(a, b, c) {
						var d = "application/views/app/_front/views/popups/" + a + ".html";
						$scope.base.popup.show = !0, $scope.base.popup.view = d, $scope.base.popup.data = c, $scope.base.popup.callback = function(a) {
							a && b && b(a)
						}, $scope.base.popup.doDigest && pb.utils.digest($scope, !0), setTimeout(function() {
							"transparent" == $scope.site.BgBoxColor ? $(".basePopup").css("background", "#ffffff") : $(".basePopup").css("background", $scope.site.BgBoxColor)
						}, 1)
					},
					close: function(a) {
						$scope.base.popup.show = !1, $scope.base.popup.view = !1, a && $scope.$digest()
					}
				},
				blockContactForm: {
					text: {},
					textArea: {}
				},
				blockContactFormAction: {
					form: "",
					message: "",
					messageArray: [],
					emails: [],
					captcha: {
						html: '<div data-callback="testCaptcha" class="g-recaptcha" id="captchaBlock" data-size="invisible"></div>',
						widgetID: "",
						recaptchaRendered: !1,
						renderCaptcha: function() {
							$("." + $scope.base.blockContactFormAction.form.$name).append(this.html), $scope.base.blockContactFormAction.captcha.widgetID = grecaptcha.render($("." + $scope.base.blockContactFormAction.form.$name + " #captchaBlock")[0], {
								sitekey: pb.constants.invisibleReCaptchaSitekey
							})
						},
						testCaptcha: function(a) {
							$scope.base.blockContactFormAction.sendRequest(a)
						}
					},
					toggleForm: function() {
						var a = $(".form");
						a.hasClass("disabled") ? a.removeClass("disabled") : a.addClass("disabled")
					},
					clear: function(a) {
						var b = "." + a.$name + " :input";
						$(b).each(function() {
							var a = $(this)[0];
							"text" == a.type || "email" == a.type || "textarea" == a.type ? a.value = "" : ("radio" == a.type || "checkbox" == a.type) && void 0 != a.checked && 1 == a.checked && (a.checked = !1)
						}), $scope.base.blockContactFormAction.message = "", $scope.base.blockContactFormAction.messageArray = [], $scope.base.blockContactFormAction.emails = []
					},
					thankYouMessage: function() {
						var a = $scope.base.getBorderColor(),
							b = $scope.base.getH3Styles(),
							c = '<div class="blockContentMessage"><span class="messageThankYou" pb-style="base.getH3Styles()">' + $scope.site.UserTranslatedText.ThankYou + "</span></div>";
						$(".blockContentForm").find(".form").append(c), $(".blockContentMessage").css({
							border: "2px solid",
							"margin-top": "20px",
							padding: "10px 15px",
							"margin-bottom": "10px",
							"text-align": "left",
							display: "none"
						}), $(".blockContentMessage").css(a), $(".messageThankYou").css(b), pb.utils.showMessageAfterSubmit($(".blockContenMessage"), 300, 4e3, function() {
							$(".blockContentMessage").remove()
						})
					},
					Send: function(a) {
						window.testCaptcha = $scope.base.blockContactFormAction.captcha.testCaptcha;
						var b = !0,
							c = "",
							d = [],
							e = [];
						if (void 0 != a) {
							$scope.base.blockContactFormAction.form = a;
							var f = "." + a.$name + " :input";
							$(f).each(function() {
								var a = $(this)[0],
									f = function(a) {
										b && (b = !1), a.addTemporaryClass("const_errorOnSave", 1e3)
									};
								if ("text" == a.type || "email" == a.type || "textarea" == a.type || "select-one" == a.type || "radio" == a.type || "checkbox" == a.type) if (1 == a.required && "" == a.value) f($(this));
								else {
									var g = a.parentElement.textContent.replace("*", "").trim() + " :";
									if ("select-one" == a.type) void 0 != a.parentElement.innerText && (g = a.parentElement.innerText.replace("*", "").trim() + " :"), $(this).children("option:selected").each(function() {
										c += "<br/><br/>" + g + " " + $(this)[0].value + ", ", d.push({
											label: g,
											value: $(this)[0].value
										})
									});
									else if ("radio" == a.type) {
										if (void 0 != a.checked && 1 == a.checked) {
											var h = a.parentElement.parentElement.textContent.trim();
											g = a.parentElement.parentElement.parentElement.textContent.replace(h, "").trim() + " :", c += "<br/><br/>" + g + " " + a.value + ", ", d.push({
												label: g,
												value: a.value
											})
										}
									} else "checkbox" == a.type ? 1 == a.checked && (c += "<br/><br/>" + a.name + "(" + a.value + ": selected), ", d.push({
										label: a.name,
										value: a.value
									})) : "email" == a.type ? (c += "<br/><br/>" + g + " " + a.value + ", ", d.push({
										label: g,
										value: a.value
									}), pb.utils.isEmailAddress(a.value) && e.push(a.value)) : (c += "<br/><br/>" + g + " " + a.value + ", ", d.push({
										label: g,
										value: a.value
									}), (" " + g + " ").toLowerCase().indexOf("email") && pb.utils.isEmailAddress(a.value) && e.push(a.value))
								}
							})
						}
						b && ($scope.base.blockContactFormAction.captcha.recaptchaRendered || ($scope.base.blockContactFormAction.captcha.renderCaptcha(), $scope.base.blockContactFormAction.captcha.recaptchaRendered = !0), $scope.base.blockContactFormAction.message = c, $scope.base.blockContactFormAction.messageArray = d, $scope.base.blockContactFormAction.emails = e, $scope.base.blockContactFormAction.toggleForm(), grecaptcha.execute($scope.base.blockContactFormAction.captcha.widgetID))
					},
					sendRequest: function(a) {
						amplify.request({
							resourceId: "postNewBlockMessage",
							data: {
								message: JSON.stringify({
									message: $scope.base.blockContactFormAction.messageArray,
									emails: $scope.base.blockContactFormAction.emails
								}),
								pageGuid: $scope.page.Guid,
								captcha: a
							},
							success: function(a) {
								a.IsSuccess && ($scope.base.blockContactFormAction.clear($scope.base.blockContactFormAction.form), $scope.base.broadCast("contactFormMessage"), $scope.base.blockContactFormAction.thankYouMessage()), $scope.base.blockContactFormAction.toggleForm(), grecaptcha.reset($scope.base.blockContactFormAction.captcha.widgetID)
							},
							error: function() {
								$scope.base.blockContactFormAction.toggleForm(), grecaptcha.reset($scope.base.blockContactFormAction.captcha.widgetID)
							}
						})
					}
				},
				isVideo: function(a) {
					return pb.utils.isSupportedVideoFormat(a)
				},
				removeActivePage: function() {
					$scope.page = null
				}
			}, $scope.base.loadCustomCss(), $scope.base.getImgAltOrPageTitle = function(a) {
				return pb.utils.getImgAltOrPageTitle(a, $scope.site.SiteTitle)
			}, $rootScope.$on("$routeChangeStart", function() {
				isAdmin && ($scope.admin.currentPageGuid = null, $scope.admin.canUsePro = pb.utils.canUsePro($scope.site))
			});
			var routePage = function() {
				$rootScope.$on("$routeChangeSuccess", function() {
					pb.utils.clearTimeoutForFrontLogout(), 
					isAdmin && ($scope.admin.currentPageGuid = null, $scope.admin.removeContentOfBlockEditor = !1, $scope.admin.currentSection = null, $scope.admin.showSidePanelSection = !1), 
					$scope.DsnTemplate = null, 
					$scope.page = null, 
					pb.utils.apply($scope, !0);
					var c = $routeParams.pageUrl;
					(void 0 == c || "/" == $locationProvider.path) && (c = "/"), 
					$scope.base.url = c,
					$scope.base.partUrl = $routeParams.partUrl, 
					$scope.base.urlIndex = $routeParams.urlIndex, 
					$scope.base.queryString = $locationProvider.search(), 
					$scope.base.hash = $locationProvider.hash(), 
					pb.data.get.page.byUrl(c, function(d) {
						if (1 == d.IsLocked ? (isAdmin || pb.seo.removeHeaderMetaContents($scope), $scope.$applyAsync(function() {
								$locationProvider.path("/unlock").hash(c)
							})) : 0 == d ? (isAdmin || pb.seo.removeHeaderMetaContents($scope), $scope.DsnTemplate = "/" == c ? pbAng.constants.pNoStartPage : pbAng.constants.p404, $scope.$digest()) : ($scope.page = d, $scope.DsnTemplate = a(d), $scope.base.pageContainerClass = b(d, $scope), isAdmin ? ($scope.admin.DsnTemplateType = $scope.page.DsnTemplateType, $scope.admin.currentPageGuid = $scope.page.Guid) : "complete" == document.readyState && setTimeout(function() {
								0 == isLoadedFromServer ? pb.seo.changeHeaderMetaContents($scope) : isLoadedFromServer = !1
							}, 100), $("body").attr("data-body-page", $scope.page.Guid), pb.utils.apply($scope, !0), $scope.base.broadCast("pageLoaded"), $window.scrollTo(0, 0)), $scope.site.IsLoggedIn && 0 == isAdmin) {
							
							var e = new Date(1e3 * $scope.site.Timeout),
								f = e - new Date;
							0 > f && (f = 1), expTimer = setTimeout(function() {
								$scope.base.broadCast("frontPageOrSiteLogout"), pb.utils.clearTimeoutForFrontLogout()
							}, f)

						} else{
							pb.utils.clearTimeoutForFrontLogout();	
						} 
						var g = $("img");
						pb.utils.setInterval(function() {
							return g = $("img"), g.length > 0 ? !0 : void 0
						}, 100, 1e3, {
							scope: $scope
						}).done(function() {
							g.on("mouseenter", function(a) {
								g.attr("title", ""), g.off("mouseenter"), a.preventDefault()
							})
						})
					})
				}), 
				$scope.base.isAdmin = isAdmin ? !0 : !1;
				var a = function(a) {
					if (1 == a.DsnTemplateIsCustom) return "application/views/app/_front/views/pages/custompage.html";
					if (null == a.DsnTemplateViewFile || void 0 == a.DsnTemplateViewFile) return $scope.base.errorMessage = "The template was not found: " + a.DsnTemplateViewFile + " : " + a.DsnTemplateViewGroup, "application/views/app/_front/views/statics/error.html";
					if (void 0 == $scope.base.partUrl) return isAdmin && ($scope.admin.showSidePanel = !0, $scope.admin.showSidePanelSection = !1), "application/views/app/_front/views/pages/" + a.DsnTemplateType + "/" + a.DsnTemplateViewFile + ".html";
					var b;
					return isAdmin && ($scope.admin.showSidePanel = !1), "galleries" == a.DsnTemplateType || "collections" == a.DsnTemplateType ? "application/views/app/_front/views/pages/galleries/picviews/" + a.DsnPicviewViewFile + ".html" : "products" == a.DsnTemplateType ? ($scope.base.currentProduct = pb.utils.findItemFromArray($scope.page.Products, "Url", $scope.base.partUrl), b = $scope.page.Products.indexOf($scope.base.currentProduct), $scope.showPreviousProduct = !0, $scope.showNextProduct = !0, $scope.nextProduct = $scope.page.Products[b + 1], $scope.previousProduct = $scope.page.Products[b - 1], 0 > b - 1 && ($scope.showPreviousProduct = !1), b + 1 > $scope.page.Products.length - 1 && ($scope.showNextProduct = !1), "application/views/app/_front/views/pages/products/productviews/" + a.DsnProductViewViewFile + ".html") : "blogs" == a.DsnTemplateType ? ($scope.base.currentPost = pb.utils.findItemFromArray($scope.page.BlogPosts, "Url", $scope.base.partUrl), b = $scope.page.BlogPosts.indexOf($scope.base.currentPost), $scope.showPreviousPost = !0, $scope.showNextPost = !0, $scope.nextPost = $scope.page.BlogPosts[b + 1], $scope.previousPost = $scope.page.BlogPosts[b - 1], pb.utils.fetchBlogPosts($scope, blogPostsService, b, 1, 6), 0 > b - 1 && ($scope.showPreviousPost = !1), b + 1 > $scope.page.BlogPosts.length - 1 && ($scope.showNextPost = !1), void 0 != $scope.base.currentPost ? "application/views/app/_front/views/pages/blogs/singlepost.html" : pbAng.constants.p404) : void 0
				}, b = function(a, b) {
					var c = "";
					1 == a.IsUnPublished ? c = "unPublished" : 1 == a.IsPasswordProtected && (c = "passwordProtected");
					var d = "type-" + a.DsnTemplateType + " " + a.DsnTemplateViewFile + " " + c + " id-" + a.Guid;
					return void 0 != b.base.partUrl && (a.DsnProductViewViewFile ? d += " " + a.DsnProductViewViewFile : a.DsnPicviewViewFile && (d += " " + a.DsnPicviewViewFile)), d
				}
			}();
			$scope.$on("$viewContentLoaded", function(event) {
				if (function() {
					var a = $("body");
					pb.environment.isMobile || pb.environment.width < pb.environment.minWidth ? a.attr("data-role", "mobile-body") : a.attr("data-role", "web-body")
				}(), $scope.base.loadCustomJs(), 0 == isAdmin && pb.utils.isSitePremium($scope.site) && $scope.page && pb.analytics.Report($scope.site.Guid, "/" + $scope.page.Uri), $window.ga || $window._gaq || $window.gtag) {
					var googleAnalyticsObjects = $scope.site.GoogleAnalyticsObjects,
						func = "";
					if (null != googleAnalyticsObjects && "" != googleAnalyticsObjects) if (googleAnalyticsObjects = jQuery.parseJSON(googleAnalyticsObjects), "gtag" == googleAnalyticsObjects.objType) try {
						if ($scope.page) {
							var pageTitle = $scope.page.PageTitle,
								pageLocation = window.location.href,
								pagePath = "/" + $scope.page.Uri;
								//terran
							// 1 == $scope.page.IsStartPage && (pagePath = "/"), func = "$window.gtag('config', '" + googleAnalyticsObjects.code + "', {'page_title': '" + pageTitle + "','page_location': '" + pageLocation + "','page_path': '" + pagePath + "'});", eval(func)
						}
					} catch (e) {
						console.error(googleAnalyticsObjects.pages[i] + " is not defined")
					} else {
						if (void 0 != googleAnalyticsObjects.pages) for (var i = 0; i < googleAnalyticsObjects.pages.length; i++) try {
							func = ("$window." + googleAnalyticsObjects.pages[i]).trim(), eval(func)
						} catch (e) {
							console.error(googleAnalyticsObjects.pages[i] + " is not defined")
						}
						if (void 0 != googleAnalyticsObjects.options) for (var i = 0; i < googleAnalyticsObjects.options.length; i++) try {
							func = ("$window." + googleAnalyticsObjects.options[i]).trim(), eval(func)
						} catch (e) {
							console.error(googleAnalyticsObjects.options[i] + " is not defined")
						}
					}
				}
			}), preloader.run(), setTimeout(function() {
				var a = function() {
					var a = serverData.affiliate;
					if (a) {
						console.log(a);
						var b = {
							view: a.View,
							productKey: a.ProductKey
						};
						$scope.admin.broadCast("appStoreViewChange", b);
						var c = {
							productKey: a.ProductKey
						};
						$scope.admin.broadCast("appStorePurchaseCompleted", c);
						var d = a.OrderId || "";
						c.productKey && "proregular" == c.productKey && (console.log("Can Send And Update AFF"), a8sales({
							pid: "s00000015655001",
							order_number: d,
							currency: "JPY",
							items: [{
								code: "yuuryou",
								price: 2e3,
								quantity: 1
							}],
							total_price: 0
						}))
					}
				};
				a()
			}, 5e3), $scope.$on("$destroy", function() {
				try {
					menuChange()
				} catch (a) {}
			})
		}],
		init = function(a) {
			var b;
			a ? (b = angular.module("pboxApp", ["ngRoute", "ngSanitize", "ngTagsInput", "ngBlockContent"]), loadTemplates()) : b = angular.module("pboxApp", ["ngRoute", "ngSanitize", "ngBlockContent"]), b.config(["$routeProvider", "$locationProvider", function(b, c) {
				b.when("/checkout", {
					templateUrl: "application/views/app/_front/views/statics/checkout/checkout.html",
					controller: pbAng.front.ctrls.checkoutCtrl
				}), b.when("/thankyou", {
					templateUrl: "application/views/app/_front/views/statics/checkout/thankyou.html",
					controller: pbAng.front.ctrls.checkoutCtrl
				}), b.when("/unlock", {
					templateUrl: "application/views/app/_front/views/statics/unlock.html",
					controller: pbAng.front.ctrls.unlockCtrl
				}), b.when("/:pageUrl", {
					template: '<div ng-include="DsnTemplate"></div>'
				}), b.when("/:pageUrl/:partUrl", {
					template: '<div ng-include="DsnTemplate"></div>'
				}), b.when("/:pageUrl/:partUrl/:urlIndex", {
					template: '<div ng-include="DsnTemplate"></div>'
				}), b.when("/", {
					template: '<div ng-include="DsnTemplate"></div>'
				}), 1 != a ? (c.html5Mode(!0), c.hashPrefix("!")) : c.html5Mode(!1)
			}]), pbAng.registerComponents(b, baseController, a), angular.element(document).ready(function() {
				angular.bootstrap(document, ["pboxApp"])
			})
		};
	return {
		start: init
	}
}();
var sliderH = function() {
	var a = {}, b = function(a, b, d, f) {
		var g = {
			getMarkup: function() {
				return 1 == pb.data.site.SocialShowShareButtons ? '<ul class="socialMediaIconsInLightBox"><li><a class="smiconLb" target="_blank" data-type="twitter" href="#"><span class="smicon-1-twitter" ></span></a></li><li><a class="smiconLb" target="_blank" data-type="pinterest" href="#"><span class="smicon-1-pinterest" ></span></a></li><li><a class="smiconLb" target="_blank" data-type="googleplus" href="#"><span class="smicon-1-googleplus" ></span></a></li><li><a class="smiconLb" target="_blank" data-type="linkedin" href="#"><span class="smicon-1-linkedin" ></span></a></li></ul>' : ""
			},
			onClick: function(b) {
				var c, d, e, f = b.attr("data-type");
				if (pb.environment.isAdmin) {
					var g;
					g = window.location.hash ? window.location.hash.substring(1) : "", d = "http://www." + pb.data.site.Url + g
				} else d = window.location.href;
				var h = " via @portfoliobox";
				if (1 == pb.data.site.AccountType && (h = ""), "twitter" == f) c = ["https://twitter.com/intent/tweet"], c.push("?text=" + pb.utils.getTitle(pb.data.site.SiteTitle + h)), c.push("&url=" + encodeURIComponent(d)), e = c.join("");
				else if ("pinterest" == f) {
					c = ["https://pinterest.com/pin/create/button/"], c.push("?text=" + pb.utils.getTitle(pb.data.site.SiteTitle + h));
					var i = sliderH.getShareObjectForCurrentImage(a);
					i.imagePath && c.push("&media=" + encodeURIComponent(i.imagePath)), c.push("?url=" + encodeURIComponent(d)), c.push("&description=" + pb.utils.getTitle(pb.data.site.SiteTitle + h)), e = c.join("")
				} else "googleplus" == f ? (c = ["https://plus.google.com/share"], c.push("?url=" + encodeURIComponent(d)), e = c.join("")) : "linkedin" == f && (c = ["https://linkedin.com/shareArticle"], c.push("?url=" + encodeURIComponent(d)), e = c.join(""));
				window.open(e, "_blank")
			}
		}, h = $(".slider-popup");
		if (h.length < 1) {
			var i = g.getMarkup(),
				j = '<div class="slider-popup"><div class="bg"></div><div class="content"></div><div class="closeLightbox"><span class="icon-close"></span></div>' + i + "</div>";
			h = $(j);
			var k = $("body");
			k.append(h), h.on("click", ".bg", function() {
				c(a), h.fadeOut(1).remove()
			}), h.on("click", ".closeLightbox", function() {
				c(a), h.fadeOut(1).remove()
			}), $(document).on("keydown.closeClick", function(b) {
				27 == b.keyCode && (c(a), h.fadeOut(1).remove())
			}), $(window).on("popstate.closeWithBackButton", function() {
				c(a), h.fadeOut(1).remove()
			}), h.on("click", ".cell.active figure", function(b) {
				b.target == this && (c(a), h.fadeOut(1).remove())
			}), h.on("click", ".content", function(b) {
				b.target == this && (c(a), h.fadeOut(1).remove())
			}), h.on("click", ".smiconLb", function() {
				return g.onClick($(this)), !1
			})
		}
		h.fadeIn(1);
		var l = h.find(".content");
		e(l, a, b, "lightbox", d, f)
	}, c = function(b) {
		var c;
		if (b) {
			c = a[b];
			try {
				c.removeEvents()
			} catch (d) {}
			$(document).off("keydown.closeClick"), $(window).off("popstate.closeWithBackButton")
		} else {
			for (var e in a) c = a[e], c.removeEvents();
			$(document).off("keydown.closeClick"), $(window).off("popstate.closeWithBackButton")
		}
	}, d = null,
		e = function(b, c, e, f, g, h, i) {
			if (i = void 0 == i ? "" : i, c in a) {
				var j = a[c];
				j.open(b, g, f, h), d = j
			} else {
				var k = new Slider;
				k.create(c, e, i), d = k, a[c] = k, k.open(b, g, f, h)
			}
		}, f = function(b, c) {
			if (b in a) {
				var d = a[b];
				d.update(b, c)
			}
			for (var e in a) {
				var f = b + "-";
				if (e.indexOf(f) > -1) {
					var g = a[e];
					g.removeSlider(), delete a[e]
				}
			}
		}, g = function(b) {
			if (b in a) {
				var d = a[b];
				c(b), d.removeSlider(), delete a[b]
			}
		}, h = function(b) {
			for (var d in a) if (d.indexOf(b) > -1) {
				var e = a[d];
				c(d), e.removeSlider(), delete a[d]
			}
		}, i = function(b, c) {
			if (b in a) {
				var d = a[b];
				d.goToItem(c)
			} else console.log("Error: the slider doesn't exist")
		}, j = function(a, b) {
			var c;
			return "galleries" == a.DsnTemplateType ? c = a.Guid : "products" == a.DsnTemplateType ? c = b.Guid : "onepager" == a.DsnTemplateType ? c = !1 : "blogs" == a.DsnTemplateType && (c = !1), c
		}, k = function(b) {
			if (b in a) {
				var c = a[b];
				return c.runt.currentIndex
			}
			return 0
		}, l = function(b) {
			if (b in a) {
				var c = a[b];
				return c.runt.currentFilePath
			}
			return 0
		}, m = function(a, b, c) {
			var d = {};
			return a ? (d.index = k(a), d.imagePath = l(a)) : (a = j(b, c), d.index = k(a), d.imagePath = l(a)), b && d.index && b.GalleryItems && (d.image = pb.utils.findItemFromArray(b.GalleryItems, "Idx", d.index)), d
		}, n = {
			defaultValues: {
				fx: "fade",
				timing: 5e3,
				pauseTiming: 1,
				textPosition: 0,
				bgSize: "contain"
			},
			getDefaultValues: function(a) {
				var b = n.defaultValues;
				return a && (void 0 != a.fx && (b.fx = a.fx), void 0 != a.timing && (b.timing = a.timing), void 0 != a.pauseTiming && (b.pauseTiming = a.pauseTiming), void 0 != a.textPosition && (b.textPosition = a.textPosition), void 0 != a.bgSize && (b.bgSize = a.bgSize)), b
			},
			getSettingsForPage: function(a, b, c) {
				var d, e = n.getDefaultValues(c);
				return "slideshow" == b || "slideshows" == a.DsnTemplateSubGroup ? (a.Slideshow && parseInt(a.Slideshow.Timing) < 2e3 && (a.Slideshow.Timing = 2e3), d = {
					fx: a.Slideshow && void 0 != a.Slideshow.Fx ? a.Slideshow.Fx : e.fx,
					timing: a.Slideshow && void 0 != a.Slideshow.Timing ? a.Slideshow.Timing : e.timing,
					pauseTiming: a.Slideshow && void 0 != a.Slideshow.PauseTiming ? a.Slideshow.PauseTiming : e.pauseTiming,
					textPosition: a.Slideshow && void 0 != a.Slideshow.TextPosition ? a.Slideshow.TextPosition : e.textPosition,
					bgSize: a.Slideshow && void 0 != a.Slideshow.BgSize ? a.Slideshow.BgSize : e.bgSize
				}) : (a.Picview && parseInt(a.Picview.Timing) < 2e3 && (a.Picview.Timing = 2e3), d = {
					fx: a.Picview && void 0 != a.Picview.Fx ? a.Picview.Fx : e.fx,
					timing: a.Picview && void 0 != a.Picview.Timing ? a.Picview.Timing : e.timing,
					pauseTiming: a.Picview && void 0 != a.Picview.PauseTiming ? a.Picview.PauseTiming : e.pauseTiming,
					textPosition: a.Picview && void 0 != a.Picview.TextPosition ? a.Picview.TextPosition : e.textPosition,
					bgSize: a.Picview && void 0 != a.Picview.BgSize ? a.Picview.BgSize : e.bgSize
				}), (pb.environment.isTouch || pb.environment.isMobile || pb.environment.width < 800) && (d.textPosition = 1), d
			},
			getSettingsForSection: function(a, b, c) {
				var d, e = n.getDefaultValues(c);
				return a.Slideshow && parseInt(a.Slideshow.Timing) < 2e3 && (a.Slideshow.Timing = 2e3), d = {
					fx: a.Slideshow && void 0 != a.Slideshow.Fx ? a.Slideshow.Fx : e.fx,
					timing: a.Slideshow && void 0 != a.Slideshow.Timing ? a.Slideshow.Timing : e.timing,
					pauseTiming: a.Slideshow && void 0 != a.Slideshow.PauseTiming ? a.Slideshow.PauseTiming : e.pauseTiming,
					textPosition: a.Slideshow && void 0 != a.Slideshow.TextPosition ? a.Slideshow.TextPosition : e.textPosition,
					bgSize: a.Slideshow && void 0 != a.Slideshow.BgSize ? a.Slideshow.BgSize : e.bgSize
				}, (pb.environment.isTouch || pb.environment.isMobile || pb.environment.width < 800) && (d.textPosition = 1), d
			},
			getSettingsForFixedSettings: function(a, b, c, d) {
				var e = n.getSettingsForPage(a, c, d);
				return void 0 != b.fx && (e.fx = b.fx), void 0 != b.timing && (e.timing = b.timing), void 0 != b.pauseTiming && (e.pauseTiming = b.pauseTiming), void 0 != b.textPosition && (e.textPosition = b.textPosition), void 0 != b.bgSize && (e.bgSize = b.bgSize), (pb.environment.isTouch || pb.environment.isMobile || pb.environment.width < 800) && (e.textPosition = 1), e
			},
			getDefaultSettings: function(a) {
				var b = n.getDefaultValues(a);
				return (pb.environment.isTouch || pb.environment.isMobile || pb.environment.width < 800) && (b.textPosition = 1), b
			}
		};
	return {
		openInPopup: b,
		openInElement: e,
		goToItem: i,
		updateSlider: f,
		removeSlider: g,
		removeMultiPageSliders: h,
		settingsH: n,
		removeEvents: c,
		getShareObjectForCurrentImage: m
	}
}(),
	lightboxH = function() {
		var a = function(a, e, f) {
			var g = $(".slider-popup");
			if (g.length < 1) {
				var h = $("body"),
					i = '<div class="lightbox-popup"><div class="bg"></div><div class="content"></div><div class="closeLightbox"><span class="icon-close"></span></div></div>';
				g = $(i), h.append(g), c(h), g.on("click", ".closeLightbox", function() {
					d(h, g)
				}), $(document).keydown(function(a) {
					27 == a.keyCode && d(h, g)
				})
			}
			g.fadeIn(1);
			var j = g.find(".content");
			b(j, a, e, f)
		}, b = function(a, b, c, d) {
			var e = new LightBox;
			e.create(c, d), e.open(a, b)
		}, c = function(a) {
			a.css("overflow", "hidden")
		}, d = function(a, b) {
			a.css("overflow", "auto"), b.fadeOut(1).remove()
		};
		return {
			openInPopup: a
		}
	}();
pbAng.dirs.misc = {}, pbAng.dirs.misc.ngModelOnblur = function() {
	return {
		restrict: "A",
		priority: 100,
		require: "ngModel",
		link: function(a, b, c, d) {
			"radio" !== c.type && "checkbox" !== c.type && (b.unbind("input").unbind("keydown").unbind("change"), b.bind("blur", function() {
				a.$applyAsync(function() {
					d.$setViewValue(b.val())
				})
			}))
		}
	}
}, pbAng.dirs.misc.bindUnsafeHtml = ["$compile", function(a) {
	function b(a) {
		var b, c = {}, d = a.split(",");
		for (b = 0; b < d.length; b++) c[d[b]] = !0;
		return c
	}
	function c(a, b, c) {
		function e(a, c, e, g) {
			if (c = angular.lowercase(c), w[c]) for (; t.last() && x[t.last()];) f("", t.last());
			v[c] && t.last() == c && f("", c), g = s[c] || !! g, g || t.push(c);
			var h = {};
			e.replace(k, function(a, b, c, e, f) {
				var g = c || e || f || "";
				h[b] = d(g)
			}), b.start && b.start(c, h, g)
		}
		function f(a, c) {
			var d, e = 0;
			if (c = angular.lowercase(c)) for (e = t.length - 1; e >= 0 && t[e] != c; e--);
			if (e >= 0) {
				for (d = t.length - 1; d >= e; d--) b.end && b.end(t[d]);
				t.length = e
			}
		}
		"string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
		var g, h, q, r, t = [],
			u = a;
		t.last = function() {
			return t[t.length - 1]
		};
		for (var y = 0; a;) {
			if (y++, y > 3e4) {
				var A = void 0 != c.base ? c.base.broadCast : void 0 != c.$parent.base ? c.$parent.base.broadCast : void 0;
				void 0 != A ? c.admin && c.admin.lang ? A("adminMessage", {
					message: c.admin.lang.messages.missingTags,
					type: "errorMessage"
				}) : A("adminMessage", {
					message: "There are some missing tag in your html source code, content will not display correctly.",
					type: "errorMessage"
				}) : console.error("There are some missing tag in your html source code, content will not display correctly.");
				break
			}
			r = "", h = !0, t.last() && z[t.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + t.last() + "[^>]*>", "i"), function(a, c) {
				return c = c.replace(n, "$1").replace(p, "$1"), b.chars && b.chars(d(c)), ""
			}), f("", t.last())) : (0 === a.indexOf("<!--") ? (g = a.indexOf("--", 4), g >= 0 && a.lastIndexOf("-->", g) === g && (b.comment && b.comment(a.substring(4, g)), a = a.substring(g + 3), h = !1)) : o.test(a) ? (q = a.match(o), q && (a = a.replace(q[0], ""), h = !1)) : m.test(a) ? (q = a.match(j), q && (a = a.substring(q[0].length), q[0].replace(j, f), h = !1)) : l.test(a) && (q = a.match(i), q ? (q[4] && (a = a.substring(q[0].length), q[0].replace(i, e)), h = !1) : (r += "<", a = a.substring(1))), h && (g = a.indexOf("<"), r += 0 > g ? a : a.substring(0, g), a = 0 > g ? "" : a.substring(g), b.chars && b.chars(d(r)))), u = a
		}
		f()
	}
	function d(a) {
		if (!a) return "";
		var b = G.exec(a),
			c = b[1],
			d = b[3],
			e = b[2];
		return e && (F.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in F ? F.textContent : F.innerText), c + e + d
	}
	function e(a) {
		return a.replace(/&/g, "&amp;").replace(q, function(a) {
			var b = a.charCodeAt(0),
				c = a.charCodeAt(1);
			return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
		}).replace(r, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	function f(a, b) {
		var c = !1,
			d = angular.bind(a, a.push);
		return {
			start: function(a, f, g) {
				a = angular.lowercase(a), !c && z[a] && (c = a), c || A[a] !== !0 || (d("<"), d(a), angular.forEach(f, function(c, f) {
					var g = angular.lowercase(f),
						h = "img" === a && "src" === g || "background" === g;
					if (E[g] === !0 && (B[g] !== !0 || b(c, h))) {
						if ("href" == f) {
							var i = e(c),
								j = i.substring(0, 7);
							isAdmin ? 1 != i.startsWith("/") || j.match("/admin#") || (c = "/admin#" + i) : j.match("/admin#") && (c = i.replace("/admin#", ""))
						}
						d(" "), d(f), d('="'), d(e(c)), d('"')
					}
				}), d(g ? "/>" : ">"))
			},
			end: function(a) {
				a = angular.lowercase(a), c || A[a] !== !0 || (d("</"), d(a), d(">")), a == c && (c = !1)
			},
			chars: function(a) {
				c || d(e(a))
			}
		}
	}
	function g(a) {
		var b = a,
			c = document.createElement("a");
		return c.setAttribute("href", b), {
			href: c.href,
			protocol: c.protocol ? c.protocol.replace(/:$/, "") : "",
			host: c.host,
			search: c.search ? c.search.replace(/^\?/, "") : "",
			hash: c.hash ? c.hash.replace(/^#/, "") : "",
			hostname: c.hostname,
			port: c.port,
			pathname: "/" === c.pathname.charAt(0) ? c.pathname : "/" + c.pathname
		}
	}
	function h(a, b) {
		var c, d = b ? I : H;
		return c = g(a).href, "" === c || c.match(d) ? a : "unsafe:" + c
	}
	var i = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
		j = /^<\/\s*([\w:-]+)[^>]*>/,
		k = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		l = /^</,
		m = /^<\//,
		n = /<!--(.*?)-->/g,
		o = /<!DOCTYPE([^>]*?)>/i,
		p = /<!\[CDATA\[(.*?)]]>/g,
		q = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
		r = /([^\#-~| |!])/g,
		s = b("area,br,col,hr,img,wbr"),
		t = b("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
		u = b("rp,rt"),
		v = angular.extend({}, u, t),
		w = angular.extend({}, t, b("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul,form,iframe")),
		x = angular.extend({}, u, b("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var,input,textarea,select,option,checkbox,radio,button")),
		y = b("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),
		z = b("script"),
		A = angular.extend({}, s, w, x, v, y),
		B = b("background,cite,href,longdesc,src,usemap,xlink:href"),
		C = b("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width,ng-class,name,type,ng-model,data-label,style,id,contenteditable,required,pb-style,ng-click,ng-repeat,data-lati,data-longi,ng-if,onclick"),
		D = b("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),
		E = angular.extend({}, B, D, C),
		F = document.createElement("pre"),
		G = /^(\s*)([\s\S]*?)(\s*)$/,
		H = /^\s*(https?|ftp|mailto|tel|file|skype):/,
		I = /^\s*(https?|ftp|file):|data:image\//;
	return function(b, d, e) {
		b.$watch(function(a) {
			return a.$eval(e.bindUnsafeHtml)
		}, function(e) {
			var g = [],
				i = (c(e, f(g, function(a, b) {
					return !/^unsafe/.test(h(a, b))
				}), b), g.join(""));
			d.html(i), a(d.contents())(b)
		})
	}
}], pbAng.dirs.misc.mainVideo = [function() {
	var a = '<div class="mainVideo"><figure ng-if="page.Video.EmbeddedCode" bind-unsafe-html="page.Video.EmbeddedCode" style="width: 100%; height: 100%" ></figure><iframe ng-if="!page.Video.EmbeddedCode" ng-src="{{page.Video.VideoUrl | embedVideo }}" frameborder="0" style="width: 100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
	return {
		template: a,
		link: function(a, b) {
			var c = function() {
				var a = b.find("video");
				a.autoplay
			};
			c(), a.$on("updateVideoPage", function() {
				setTimeout(function() {
					c()
				}, 10)
			})
		}
	}
}], pbAng.dirs.misc.pbVideoPlayer = [function() {
	var a = '<div class="mainBgVideo"><div><figure class="mainBgVideoFigure"><video class="mainVideo video center cover" ng-class="{full: full}" data-height="{{height}}" data-width="{{width}}" playsinline preload="auto" autoplay="autoplay" muted="muted" loop="loop"><source type="video/mp4"></video></figure></div></div>';
	return {
		template: a,
		link: function(a, b) {
			var c = a.source;
			a.contain && b.find("video").removeClass("video center cover").addClass("fullWidth"), a.sectionBg && b.find("video").removeClass("fullWidth").addClass("sectionVideo"), b.find("source").prop("src", c), b.find("video").prop("muted", !0)
		},
		scope: {
			source: "@",
			height: "@",
			width: "@",
			full: "=",
			sectionBg: "=",
			contain: "="
		}
	}
}], pbAng.dirs.misc.galleryThumb = function() {
	var a = ["$scope", "$element", "$filter", function(a, b, c) {
		if (a.noPlay = a.noPlay ? a.noPlay : !1, a.galleryThumb = {}, a.item.VideoUrl && "" != a.item.VideoUrl) {
			var d = a.item.VideoThumbUrl;
			if (a.item.VideoItemGuid) {
				var e = pb.utils.fixSizeForSmallImage(a.size, a.item.Height, a.item.Width);
				if (e) {
					var f = d.substring(d.lastIndexOf("/") + 1);
					d = d.replace(f, e + "-" + f)
				}
			}
			a.item.src = d, 0 == a.noPlay && (b.wrap("<span class='videoThumb'>"), b.after("<span class='play'><span class='icon-play-small'></span></span>"))
		} else "" == a.size && (a.size = void 0), a.size = pb.utils.fixSizeForSmallImage(a.size, a.item.Height, a.item.Width), a.item.src = c("pboxImage")(a.item.FileName, a.item.S3LocationId, a.size)
	}];
	return {
		restrict: "A",
		controller: a,
		scope: {
			item: "=",
			size: "@",
			noPlay: "@"
		}
	}
}, pbAng.dirs.misc.details = function() {
	return {
		restrict: "A",
		link: function(a, b) {
			b.addClass("d-group"), b.on("click", ".d-header", function() {
				a.admin.dPanel.close(), a.$apply();
				var b = $(this),
					c = $(this).siblings(".d-content"),
					d = $(this).closest(".d-group");
				if (c.is(":visible")) d.removeClass("d-active"), b.removeClass("d-active"), c.slideUp(100);
				else {
					var e = b.parent(".subGroup");
					0 == e.length ? ($(".d-group").removeClass("d-active"), $(".d-header").removeClass("d-active"), $(".d-content").slideUp(100)) : 0 != e.parent(".d-content").length && ($(".subGroup .d-group").removeClass("d-active"), $(".subGroup .d-header").removeClass("d-active"), $(".subGroup .d-content").slideUp(100)), d.addClass("d-active"), b.addClass("d-active"), c.slideDown(100)
				}
				return !1
			}), b.on("click", ".e-header", function() {
				var a = $(this),
					b = $(this).siblings(".e-content"),
					c = $(this).closest(".e-group");
				return b.is(":visible") ? (c.removeClass("e-active"), a.removeClass("e-active"), b.slideUp(100)) : (c.addClass("e-active"), a.addClass("e-active"), b.slideDown(100)), !1
			})
		}
	}
}, pbAng.dirs.misc.hover = [function() {
	return {
		restrict: "A",
		link: function(a, b) {
			b.on("mouseover", function() {
				$(this).addClass("hover")
			}), b.on("mouseout", function() {
				$(this).removeClass("hover")
			})
		}
	}
}], pbAng.dirs.misc.active = [function() {
	return {
		restrict: "A",
		link: function(a, b) {
			b.on("click", function() {
				$(this).hasClass("activeElement") ? $(".activeElement").removeClass("activeElement") : ($(".activeElement").removeClass("activeElement"), $("." + $(this).attr("class").replace("hover", "")), $(this).addClass("activeElement"), $(".notActiveElement").removeClass("activeElement").removeClass("notActiveElement"))
			}), pb.utils.onCreateEvents(a, ["editPageMode"], function(a) {
				"editPageMode" == a && ($(".activeElement").removeClass("activeElement"), $(".editThisPage").addClass("activeElement"))
			}, "active element admin");
			! function() {
				if (void 0 != amplify.store.sessionStorage("panelLayoutClass") && "home" != amplify.store.sessionStorage("panelLayoutClass")) {
					var a;
					void 0 != amplify.store.sessionStorage("adminPath") && (a = amplify.store.sessionStorage("activeNav"));
					var b = pbAng.admin.pathDirectory.getPanelsByPath(a),
						c = $("." + b.activeElement);
					c.addClass("activeElement")
				}
			}()
		}
	}
}], pbAng.dirs.misc.selectButton = function() {
	return {
		restrict: "A",
		scope: {
			sample: "=",
			doDissable: "="
		},
		link: function(a, b, c) {
			var d = !1;
			b.on("click", ".sb-header", function() {
				if (1 == a.doDissable) return a.$parent.base.broadCast("adminMessage", {
					message: "Upgrade to PRO to get more space",
					type: "appMessage",
					nav: "appstore/main"
				}), !1;
				var b = $(this),
					e = $(this).siblings(".sb-content");
				e.is(":visible") ? (b.removeClass("sb-active"), e.slideUp(100), d = !1) : (b.addClass("sb-active"), e.slideDown(100), d = !0, void 0 != c.hideContentOnclick && e.on("click", function() {
					b.removeClass("sb-active"), e.slideUp(100), d = !1
				}))
			}), $(document).on("click.clickOutSideSelect", function(a) {
				if (0 != d) {
					var b = $(a.target).closest(".sb-container"),
						c = $(a.target).closest(".sb-no-close-on-select"),
						e = $(a.target).hasClass("icon-navigate-right") || $(a.target).hasClass("icon-navigate-left") ? !0 : !1;
					if (b.length < 1 && 0 == e && c.length < 1) {
						var f = $(".sb-active");
						f.siblings(".sb-content").slideUp(100), f.removeClass("sb-active"), d = !1
					}
				}
			}), pb.utils.onDestroy(a, function() {
				$(document).off("click.clickOutSideSelect")
			}, "Destroy sb Event")
		}
	}
}, pbAng.dirs.misc.contentImage = ["$filter", function(a) {
	var b = a("link")("/"),
		c = '<div class="contentImage" ng-if="obj.ContentImage.Path" id="contentImage_{{obj.Guid}}" pb-style="logoStyleForSection"link-guid-to-page-section guid="{{obj.Guid}}" link-page="{{obj.ContentImage.PageGuid}}" link-section="{{obj.ContentImage.OnepagerSectionGuid}}" link-url="{{obj.ContentImage.Url}}" link-target="{{obj.ContentImage.Target}}"><a ng-if="linkExist" ng-href="' + b + '"><img data-height="{{obj.ContentImage.Height}}" data-width="{{obj.ContentImage.Width}}" class="contentImageStyle" ng-show="obj.ContentImage && obj.ContentImage.Path" ng-src="{{obj.ContentImage.Path}}" alt=""></a><img ng-if="!linkExist" data-height="{{obj.ContentImage.Height}}" data-width="{{obj.ContentImage.Width}}" class="contentImageStyle" ng-show="obj.ContentImage && obj.ContentImage.Path" ng-src="{{obj.ContentImage.Path}}" alt=""></div>',
		d = ["$scope", "$element", function(a, c) {
			a.linkExist = "#/" == b || "/" == b ? !1 : !0;
			var d = function() {
				if (a.obj.ContentImage && a.obj.ContentImage.Path) {
					var b = null,
						d = 0,
						e = 0;
					a.containerId ? b = $("#" + a.containerId) : $("#mainContent_" + a.obj.Guid).length > 0 ? b = $("#mainContent_" + a.obj.Guid) : (b = $("main"), d = 36), e = b.length > 0 ? b.width() - d : $(window).width();
					var f = "30px";
					a.obj.ContentImage.Size && (f = a.obj.ContentImage.Size);
					var g = c.find(".contentImageStyle");
					pb.utils.setInterval(function() {
						return g = c.find(".contentImageStyle"), g.length > 0 ? !0 : void 0
					}, 1, 2e3).done(function() {
						if (a.obj.ContentImage.Height && a.obj.ContentImage.Width && a.obj.ContentImage.Height > 5 && a.obj.ContentImage.Width > 5) {
							var c, d, h = a.obj.ContentImage.Width / a.obj.ContentImage.Height,
								i = parseInt(a.obj.ContentImage.Size);
							i > 5 ? (c = i, d = h * c) : (c = 200, d = h * c), b.length > 0 && d > e && (c = e / h, d = h * c), g.css({
								height: c,
								width: d
							})
						} else g.css({
							height: f
						})
					})
				}
			};
			d(), pb.utils.resizeAndDestroy(a, "sectionContentImage", function() {
				d()
			}), pb.utils.onCreateEvents(a, ["sectionWidthChange_" + a.obj.Guid, "updateContentImage_" + a.obj.Guid, "updatePageContentImage"], function(b, c, e) {
				b == "updateContentImage_" + a.obj.Guid && e && e.Guid == a.obj.Guid || "updatePageContentImage" == b ? d() : b == "sectionWidthChange_" + a.obj.Guid && d()
			}, "Content Image Update")
		}];
	return {
		scope: {
			obj: "=",
			containerId: "@"
		},
		template: c,
		restrict: "E",
		controller: d
	}
}], pbAng.dirs.misc.pbImage = [function() {
	var a = '<div class="pbImageBox"><figure class="pbImageFigure"><img class="pbImage animated" ng-src="{{source}}" /></figure></div>',
		b = ["$scope", "$element", function(a, b) {
			var c = a.maxWidth ? a.maxWidth : 1 == a.half ? 96 : 192,
				d = a.maxHeight ? a.maxHeight : 1 == a.half ? 74.5 : 149,
				e = 1,
				f = a.width ? a.width : b.width(),
				g = a.height ? a.height : b.height(),
				h = b.find(".pbImage"),
				i = function() {
					e = Math.min(c / f, d / g), h.width(f * e).height(g * e).css("visibility", "visible").addClass("fadeIn")
				};
			a.width && a.height ? i() : h.one("load", function() {
				f = this.width, g = this.height, i()
			})
		}];
	return {
		scope: {
			source: "@",
			half: "=",
			height: "@",
			maxHeight: "@",
			width: "@",
			maxWidth: "@"
		},
		template: a,
		restrict: "E",
		controller: b
	}
}], pbAng.dirs.misc.pbVideo = [function() {
	var a = '<div class="pbImageBox"><video class="pbVideo" playsinline muted><source type="video/mp4"></video></div>',
		b = ["$scope", "$element", function(a, b) {
			var c = a.source;
			b.find("source").prop("src", c);
			var d = a.maxWidth ? a.maxWidth : 1 == a.half ? 96 : 192,
				e = a.maxHeight ? a.maxHeight : 1 == a.half ? 74.5 : 149,
				f = 1,
				g = a.width ? a.width : b.width(),
				h = a.height ? a.height : b.height(),
				i = b.find(".pbVideo"),
				j = function() {
					f = Math.min(d / g, e / h), i.width(g * f).height(h * f).css("visibility", "visible").addClass("fadeIn")
				};
			j()
		}];
	return {
		scope: {
			source: "@",
			half: "=",
			height: "@",
			maxHeight: "@",
			width: "@",
			maxWidth: "@"
		},
		template: a,
		restrict: "E",
		controller: b
	}
}], pbAng.dirs.misc.logo = ["$filter", function(a) {
	var b = a("link")("/"),
		c = '<div class="logo" id="{{logoId}}" pb-style="logoStyleForSection"><span ng-show="site.LogoDoUseFile != 1"><a class="logoTextStyle" ng-bind-html="site.LogoText" ng-href="' + b + '"></a></span><a ng-href="' + b + '"><img height="{{getConstantLogoHeight()}}" class="logoImageStyle" ng-show="site.LogoDoUseFile == 1" ng-src="{{site.LogoFilePath}}" alt=""></a></div>',
		d = ["$scope", "$element", function(a, b) {
			var c, d, e, f, g, h, i, j, k;
			if (a.logoId = "sitelogo", a.logoStyleForSection = {}, a.section) {
				a.logoId = "sectionLogo_" + a.section.Guid;
				var l = a.logoId,
					m = "padding",
					n = pb.utils.getSectionCustomObjectValues(a.section, l, m),
					o = {};
				1 == a.section.LogoPosition ? o["padding-bottom"] = n + "px" : 2 == a.section.LogoPosition && (o["padding-top"] = n + "px"), a.logoStyleForSection = o
			}
			a.getConstantLogoHeight = function() {
				return isAdmin || void 0 == a.base.MenuLogImageHeightFromLogo ? "auto" : a.base.MenuLogImageHeightFromLogo
			}, setTimeout(function() {
				void 0 == b.attr("section") && $(".logo").css("visibility", "visible");
				var l = $(".logoTextStyle");
				c = a.$watch("site.LogoFontFamily", function() {
					isAdmin || c(), l.css("font-family", a.site.LogoFontFamily)
				}), l.css("font-family", a.site.LogoFontFamily), d = a.$watch("site.LogoFontSize", function() {
					isAdmin || d(), l.css("font-size", a.site.LogoFontSize)
				}), l.css("font-size", a.site.LogoFontSize), e = a.$watch("site.LogoFontColor", function() {
					isAdmin || e(), l.css("color", a.site.LogoFontColor)
				}), l.css("color", a.site.LogoFontColor), h = a.$watch("site.LogoFontSpacing", function() {
					isAdmin || h(), l.css("letter-spacing", parseInt(a.site.LogoFontSpacing) / 2 + "px")
				}), l.css("letter-spacing", parseInt(a.site.LogoFontSpacing) / 2 + "px"), j = a.$watch("site.LogoFontUpperCase", function() {
					isAdmin || j(), k = 1 == a.site.LogoFontUpperCase ? "uppercase" : "", l.css("text-transform", k)
				}), k = 1 == a.site.LogoFontUpperCase ? "uppercase" : "", l.css("text-transform", k);
				var m = function() {
					i = pb.utils.getCssStyleAndWeight(a.site.LogoFontVariant), "" != i["font-style"] && l.css("font-style", i["font-style"]), "" != i["font-weight"] && l.css("font-weight", i["font-weight"])
				};
				f = a.$watch("site.LogoFontVariant", function() {
					isAdmin || f(), m()
				}), m();
				var n = function() {
					var b = "30px";
					a.site.LogoDisplayHeight && (b = a.site.LogoDisplayHeight);
					var c = $(".logoImageStyle");
					if (c.width() && c.height() && c.width() > 5 && c.height() > 5) {
						var d = c.width() / c.height(),
							e = d * parseInt(b);
						c.css({
							height: b,
							width: e + "px"
						})
					} else c.css({
						height: b
					});
					isAdmin || (a.base.MenuLogImageHeightFromLogo = b)
				};
				g = a.$watch("site.LogoDisplayHeight", function() {
					isAdmin || e(), isAdmin && n()
				}), n(), setTimeout(function() {
					n()
				}, 10)
			}, 1), a.$on("$destroy", function() {
				try {
					c(), d(), e(), f(), g(), h(), j()
				} catch (a) {}
			})
		}];
	return {
		template: c,
		restrict: "E",
		controller: d
	}
}], pbAng.dirs.misc.mobileLogo = ["$filter", function(a) {
	var b = a("link")("/"),
		c = '<div class="logo"><span ng-if="site.MobileLogoDoUseFile != 1"><a class="mobileLogoTextStyle" ng-bind-html="site.MobileLogoText" ng-href="' + b + '" ></a></span><a ng-href="' + b + '"><img class="mobileLogoImageStyle" ng-class="{noDisplay: !site.MobileLogoFilePath}" ng-if="site.MobileLogoDoUseFile == 1" ng-src="{{site.MobileLogoFilePath}}" alt=""></a></div>',
		d = ["$scope", function(a) {
			var b, c, d, e, f, g = function() {
				setTimeout(function() {
					var b = $(".logo"),
						c = $(".mobileLogoTextStyle");
					b.css("visibility", "visible"), c.css("font-family", a.site.MobileLogoFontFamily), c.css("font-size", a.site.MobileLogoFontSize), c.css("color", a.site.MobileLogoFontColor), c.css("letter-spacing", parseInt(a.site.LogoFontSpacing) / 3 + "px");
					var d = 1 == a.site.LogoFontUpperCase ? "uppercase" : "";
					c.css("text-transform", d);
					var e = pb.utils.getCssStyleAndWeight(a.site.MobileLogoFontVariant);
					"" != e["font-style"] && c.css("font-style", e["font-style"]), "" != e["font-weight"] && c.css("font-weight", e["font-weight"]);
					! function() {
						var b = "30px";
						a.site.MobileLogoDisplayHeight && (b = a.site.MobileLogoDisplayHeight), $(".mobileLogoImageStyle").css("height", b)
					}();
					1 != a.site.MobileLogoDoUseFile || void 0 != a.site.MobileLogoFilePath && null != a.site.MobileLogoFilePath || $(".mobileLogoImageStyle").attr("src", "")
				}, 1)
			};
			g();
			var h = a.$on("changeTemplateMobileLogoStyle", function() {
				g()
			});
			a.$on("$destroy", function() {
				try {
					b(), c(), d(), e(), f(), h()
				} catch (a) {}
			})
		}];
	return {
		template: c,
		restrict: "E",
		controller: d
	}
}], pbAng.dirs.misc.centerThumbsContainer = ["$window", function(a) {
	var b = function(a, b) {
		var c = b.find("figure"),
			d = b.find("figure").outerWidth(!0),
			e = $("main").width();
		a.section && (e = $("#mainContent_" + a.section.Guid).width());
		var f, g, h = parseInt(a.page.ListImageMargin);
		if ("centered" == a.site.DsnLayoutType && h > 0 && !pb.environment.isMobile && !pb.environment.isTablet) if (f = Math.floor((e + 2 * h) / d), f > c.length && (f = c.length), g = f * d + 2 * h, g > e) {
			var i = f * d - 2 * h,
				j = (e - i) / 2,
				k = -1 * h + j;
			b.width(g).css({
				"margin-left": k + "px"
			})
		} else b.width(g).css({
			"margin-left": "auto",
			"margin-right": "auto"
		});
		else f = Math.floor(e / d), 1 > f && (f = 1), f > c.length && (f = c.length), g = f * d, b.width(g).css({
			"margin-left": "auto",
			"margin-right": "auto"
		})
	}, c = ["$scope", "$element", function(a, c) {
		if (a.section) pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(d, e, f) {
			d != "renderSectionItems" + a.section.Guid && d != "sectionImageMarginChange" + a.section.Guid && d != "sectionImageSizeChange" + a.section.Guid || !f || f.Guid != a.section.Guid || setTimeout(function() {
				b(a, c)
			}, 10)
		}, "Section Dynamic Grid");
		else {
			var d = a.$on("imageMarginChange", function() {
				setTimeout(function() {
					b(a, c)
				}, 10)
			}),
				e = a.$on("imageSizeChange", function() {
					setTimeout(function() {
						b(a, c)
					}, 10)
				}),
				f = a.$on("collectionChange", function() {
					setTimeout(function() {
						b(a, c)
					}, 10)
				}),
				g = a.$on("galleryItemsChange", function() {
					setTimeout(function() {
						b(a, c)
					}, 10)
				}),
				h = a.$on("productChange", function() {
					setTimeout(function() {
						b(a, c)
					}, 10)
				});
			a.$on("$destroy", function() {
				try {
					d(), e(), f(), g(), h()
				} catch (a) {}
			})
		}
	}];
	return {
		restrict: "A",
		controller: c,
		link: function(c, d) {
			var e = function() {
				setTimeout(function() {
					b(c, d)
				}, 1)
			};
			e(), angular.element(a).bind("resize", function() {
				e()
			})
		}
	}
}], pbAng.dirs.misc.description = [function() {
	var a = ["$scope", "$element", function(a) {
		a.description = {}, a.description.style = {};
		var b = "onepager" == a.page.DsnTemplateType && a.section ? !0 : !1,
			c = function() {
				var b = "description_" + a.pageOrSection.Guid,
					c = "margin",
					d = pb.utils.getSectionCustomObjectValues(a.pageOrSection, b, c),
					e = {};
				d && (e["margin-bottom"] = d + "px", e["margin-top"] = 0), a.description.style = e
			};
		b ? (a.pageOrSection = a.section, c()) : a.pageOrSection = a.page, pb.utils.onCreateEvents(a, ["updateDescriptionMargin" + a.pageOrSection.Guid], function(d, e, f) {
			b && f && f.Guid == a.section.Guid && c()
		}, "Description Margin Change"), void 0 == a.base && void 0 != a.$parent && void 0 != a.$parent.base && (a.base = a.$parent.base), a.description.showDesc = function() {
			return b ? (a.description.class = "top", !0) : a.pageOrSection.BlockContent && 0 != a.pageOrSection.DescriptionPosition ? "top" == a.position && 1 == a.pageOrSection.DescriptionPosition ? (a.description.class = "top", !0) : "bottom" == a.position && 1 != a.pageOrSection.DescriptionPosition ? (a.description.class = "bottom", !0) : !1 : !1
		}
	}],
		b = '<div id="description_container_{{::pageOrSection.Guid}}" pb-style="description.style" class="description {{description.class}} description-container" ng-if="description.showDesc()" bind-unsafe-html="pageOrSection.BlockContent" block-content></div>';
	return {
		restrict: "E",
		template: b,
		controller: a,
		scope: {
			page: "=",
			position: "@",
			site: "=",
			section: "="
		}
	}
}], pbAng.dirs.misc.mainText = [function() {
	var a = '<div bind-unsafe-html="page.BlockContent" block-content></div>';
	return {
		restrict: "E",
		template: a
	}
}], pbAng.dirs.misc.editorText = [function() {
	var a = '<div class="editorText" bind-unsafe-html="html" block-content></div>';
	return {
		restrict: "E",
		template: a,
		transclude: !0,
		link: function(a, b, c, d, e) {
			e(a.$parent, function(b) {
				var c = b.html();
				c = c.replace(/[{{}}]/g, "").replace("page.", ""), a.html = a.page[c]
			})
		}
	}
}], pbAng.dirs.misc.main = ["$window", "$route", function(a, b) {
	return {
		restrict: "E",
		link: function(a, c) {
			var d = $("body"),
				e = $("main"),
				f = function() {
					var b = $(".layout-left.menu-left04"),
						c = $(".layout-left.menu-left05");
					if (b.length > 0 || c.length > 0) {
						var d = $("nav");
						pb.utils.setInterval(function() {
							return d = $("nav"), d.length > 0 ? !0 : void 0
						}, 10, 1e3, {
							scope: a
						}).done(function() {
							setTimeout(function() {
								var a = d.outerWidth(!0) + d.offset().left,
									b = .1 * $(window).width() + 230;
								a >= b && $("main").css("margin-left", a + 20)
							}, 10)
						})
					}
				}, g = function() {
					pb.environment.isMobile || pb.environment.width < pb.environment.minWidth ? (d.attr("data-role", "mobile-body"), d.attr("data-touch", "is-touch"), e.attr("data-role", "mobile"), parseInt(a.site.ListFontSize) > 18 && d.addClass("fixLFSize"), parseInt(a.site.PFontSize) > pb.environment.maxMobileParagraphFontSize && d.addClass("fixPFSize"), parseInt(a.site.PLineHeight) > pb.constants.maxMobileLineHeight && d.addClass("fixPLHeight"), pb.utils.getMobileMenuHeight(a.site.MobileLogoDoUseFile, function(a) {
						40 > a && (a = 30), a += 30, $(".mobilemenu05").length > 0 && (a = 10), setTimeout(function() {
							e.css("margin-top", a)
						}, 1)
					})) : pb.environment.isTouch ? (d.attr("data-touch", "is-touch"), d.attr("data-role", "web-body"), e.attr("data-role", "web"), f()) : (d.attr("data-role", "web-body"), e.attr("data-role", "web"), f())
				};
			g(), pb.utils.resizeAndDestroy(a, "main", function() {
				pb.environment.isMobile || pb.environment.width < pb.environment.minWidth ? a.base.currentSelection = "Mobile" : pb.environment.isTouch ? a.base.currentSelection = "Touch" : (a.base.currentSelection = "Web", f()), void 0 == a.base.oldSelection && (a.base.oldSelection = a.base.currentSelection), a.base.currentSelection == a.base.oldSelection || pb.environment.isMobile || (a.base.oldSelection = a.base.currentSelection, "Web" == a.base.currentSelection && $("body").removeClass("layout-mobile-centered"), b.reload())
			}), c.fadeTo(500, 1)
		}
	}
}], pbAng.dirs.misc.validera = [function() {
	var a = ["$scope", function(a) {
		a.doValidate = function(b) {
			var c = a.validera.replace(/\s+/, "").split(","),
				d = !0;
			return $.each(c, function(c, e) {
				try {
					pb.validate[e](b, a.valideraData) === !1 && (d = !1)
				} catch (f) {
					return console.log(f), console.log("Validation method not found"), d = !1
				}
			}), d
		}
	}];
	return {
		restrict: "A",
		require: "ngModel",
		controller: a,
		priority: 200,
		scope: {
			validera: "@",
			valideraData: "="
		},
		link: function(a, b, c, d) {
			d.$parsers.push(function(c) {
				return a.doValidate(c) ? (b.removeClass("ng-invalid"), c) : (b.addClass("ng-invalid"), d.$modelValue)
			})
		}
	}
}], pbAng.dirs.misc.customHtml = ["$compile", function(a) {
	return {
		restrict: "E",
		link: function(b, c) {
			var d = b.page.DsnTemplateCustomHtml || "";
			c.html(a(d)(b))
		}
	}
}], pbAng.dirs.misc.customCss = ["$compile", function() {
	return {
		restrict: "E",
		link: function(a, b) {
			var c = a.page.DsnTemplateCustomCss || "",
				d = "<style>" + c + "</style>";
			b.html(d)
		}
	}
}], pbAng.dirs.misc.customJs = ["$compile", function($compile) {
	return {
		restrict: "E",
		link: function($scope, $element, attr) {
			var js = $scope.page.DsnTemplateCustomJs || "";
			eval(js)
		}
	}
}], pbAng.dirs.misc.blockGrid = [function() {
	var a = function(a) {
		var b = a.find(".imageWrap"),
			c = b.height(),
			d = b.width(),
			e = d / c;
		a.find(".thumb").each(function() {
			var a = $(this).data("height"),
				b = $(this).data("width"),
				f = b / a;
			if (f > e) {
				var g = d / f,
					h = (c - g) / 2;
				h > 0 && $(this).css({
					"margin-top": h + "px"
				})
			}
		})
	};
	return {
		restrict: "A",
		link: function(b, c) {
			a(c)
		}
	}
}], pbAng.dirs.misc.blockHeadUploaderProgress = [function() {
	var a = '<li class="uploaderProgress" style="display: block!important;" id="{{progressId}}"><span class="fileCounter"><span class="fileNr"></span><span class="slash">/</span><span class="totalNrOfFiles"></span></span><span class="progressBar"><span class="meter"></span></span><span class="percent"><span class="percentNr"></span> %</span><span class="stopUploader" id="{{stopId}}"><span class="text">Stop upload</span></span> </li>';
	return {
		restrict: "A",
		template: a,
		scope: {
			progressId: "@",
			stopId: "@"
		},
		replace: !0
	}
}], pbAng.dirs.misc.alertRepeatFinished = [function() {
	var a = ["$scope", function(a) {
		a.$last && a.base.broadCast("ngRepeatFinished")
	}];
	return {
		controller: a,
		restrict: "A",
		link: function() {}
	}
}], pbAng.dirs.misc.backgroundImage = [function() {
	return function(a, b, c) {
		var d = c.backgroundImage,
			e = pb.utils.isSupportedVideoFormat(d);
		if (!e) {
			if (void 0 != c.backgroundImage && "" != c.backgroundImage) {
				var f = pb.utils.getImageThumbTypeForMobile();
				if (void 0 != a.page.MainImage && a.page.MainImage.FilePath == c.backgroundImage && void 0 != f && 1 == a.page.MainImage.PageMainImageThumb) {
					var g = pb.constants.getS3PathById(a.page.MainImage.S3LocationId);
					d = g + "/" + a.site.Id + "/page/" + f + "-" + a.page.MainImage.FileName
				}
			}
			b.addClass("niceImageLoad"), $("<img/>").attr("src", d).load(function() {
				$(this).remove(), b.css({
					"background-image": "url(" + d + ")"
				}).fadeTo("1500", 1)
			})
		}
	}
}], pbAng.dirs.misc.sectionBackground = [function() {
	return {
		restrict: "A",
		scope: {
			section: "=",
			parallax: "=",
			transparent: "=",
			base: "="
		},
		link: function(a, b) {
			if (void 0 == a.transparent || 0 == a.transparent) {
				var c = a.section.BgFilePath,
					d = a.section.BgColor,
					e = a.section.FullHeight,
					f = a.parallax ? "fixed" : "scroll";
				(pb.utils.isMobile() || pb.utils.isTablet()) && (f = "scroll"), c && b.addClass("niceImageLoad");
				var g = function(g) {
					var h = !1;
					if (a.section.MainImage) {
						var i = pb.utils.findItemFromArray(a.section.Properties, "type", "main-image-section-prop");
						i && i.settings && 1 == i.settings.useAsBackground && a.section.MainImage.FilePath && (c = a.section.MainImage.FilePath, b.addClass("sectionMainImageContent"), h = !0)
					}
					var j = function() {
						if (c) {
							var d = {};
							2 == a.section.BgImagePosition ? (d["background-size"] = "contain", d["background-position"] = "center center", d["background-repeat"] = "no-repeat") : 3 == a.section.BgImagePosition ? (d["background-size"] = "initial", d["background-position"] = "initial", d["background-repeat"] = "repeat") : 4 == a.section.BgImagePosition ? (d["background-size"] = "auto", d["background-position"] = "center center", d["background-repeat"] = "no-repeat") : (d["background-size"] = "cover", d["background-position"] = "center center", d["background-repeat"] = "no-repeat"), d["background-attachment"] = f, b.css(d)
						}
					}, k = function() {
						c ? $("<img/>").attr("src", c).load(function() {
							$(this).remove();
							var a = {
								"background-image": "url(" + c + ")"
							};
							a["background-size"] = "cover", a["background-position"] = "center center", a["background-attachment"] = f, a["background-repeat"] = "no-repeat", b.addClass("fadeIn"), b.css(a), j()
						}) : b.css({
							"background-image": "none"
						})
					}, l = function() {
						c || b.css({
							"background-image": "none"
						}), d && b.css({
							"background-color": d
						})
					}, m = function() {
						if (1 == e) {
							b.find(".mainContent").removeClass("nonFullScreenPadding");
							var c = function() {
								var a = $(window).height();
								b.css({
									"min-height": a
								})
							};
							c(), pb.utils.resizeAndDestroy(a, "section_fullheight_" + a.section.Guid, function() {
								c()
							})
						} else b.css({
							height: "auto",
							"min-height": "auto"
						}), b.find(".mainContent").addClass("nonFullScreenPadding"), $(window).off("resize.section_fullheight_" + a.section.Guid)
					};
					"Initial" == g ? (k(), j(), l(), m()) : "BgFilePath" == g ? (k(), l()) : "BgImagePosition" == g ? j() : "FullHeight" == g ? m() : l()
				};
				if (g("Initial"), 1 == isAdmin) {
					var h = $("#sectionEditOnHover_" + a.section.Guid);
					pb.utils.setInterval(function() {
						return h = $("#sectionEditOnHover_" + a.section.Guid), h.length > 0 ? !0 : void 0
					}, 1, 1e3, {
						scope: a
					}).done(function() {
						h.length > 0 && b.on("mouseover", function() {
							$(this).addClass("section-borders-hover"), h.show()
						}).on("mouseout", function() {
							$(this).removeClass("section-borders-hover"), h.hide()
						})
					})
				}
				pb.utils.onCreateEvents(a, ["applySectionBgStyle_" + a.section.Guid], function(b, f, h) {
					b == "applySectionBgStyle_" + a.section.Guid && h && h.Guid == a.section.Guid && (c = a.section.BgFilePath, d = a.section.BgColor, e = a.section.FullHeight, h.Type = void 0 == h.Type ? "BgColor" : h.Type, g(h.Type), pb.utils.digest(a))
				}, "Section Background Changes")
			}
		}
	}
}], pbAng.dirs.misc.editSectionOnHover = [function() {
	return {
		restrict: "A",
		scope: {
			section: "=",
			admin: "="
		},
		link: function(a, b) {
			isAdmin && (b.on("click", function(b) {
				b.stopPropagation(), a.admin.panelLayout.bPanelClass = "hide", a.admin.panelLayout.cPanelClass = "extend", a.admin.panelLayout.activeSectionProViewOnHover(), setTimeout(function() {
					a.admin.broadCast("updateSectionPropView", {
						section: a.section
					})
				}, 1)
			}), pb.utils.onDestroy(a, function() {
				b.off("click")
			}, "Destroy editSectionOnHover"))
		}
	}
}], pbAng.dirs.misc.linkGuidToPage = ["$location", function(a) {
	return function(b, c, d) {
		d.linkGuidToPage && "" != d.linkGuidToPage || d.linkUrl && "" != d.linkUrl ? c.css("cursor", "pointer") : c.css("cursor", "default"), c.click(function() {
			var c = d.linkGuidToPage;
			return c ? pb.data.get.page.byGuid(c, function(c) {
				return c ? void b.$evalAsync(function() {
					a.path(c.Uri)
				}) : !1
			}) : d.linkUrl && "" != d.linkUrl && window.open(d.linkUrl, "_self"), !1
		})
	}
}], pbAng.dirs.misc.linkGuidToPageSection = ["$location", function(a) {
	return {
		restrict: "A",
		scope: {
			guid: "@",
			linkPage: "@",
			linkSection: "@",
			linkUrl: "@",
			linkTarget: "@",
			item: "="
		},
		link: function(b, c) {
			var d = function() {
				var d = null,
					e = b.linkTarget ? b.linkTarget : "_self";
				b.linkPage || b.linkSection || b.linkUrl || b.item ? (d = !0, c.css("cursor", "pointer")) : c.css("cursor", "default"), d && c.click(function() {
					var c = null,
						d = function(c) {
							pb.data.get.page.byGuid(c, function(c) {
								if (!c) return !1;
								if ("_self" != e) {
									var d = a.$$absUrl.toString().substring(0, decodeURIComponent(a.$$absUrl).toString().indexOf(a.$$path.toString(), a.$$absUrl.toString().indexOf("#")) + 1) + c.Uri;
									window.open(d, e)
								} else b.$evalAsync(function() {
									a.path(c.Uri)
								})
							})
						};
					if (b.item) if (b.item.ButtonLink) b.item.ButtonLink.PageLinkObject.Guid ? (c = b.item.ButtonLink.PageLinkObject.Guid, d(c)) : window.open(b.item.ButtonLink.CustomLink, e);
					else if (b.item.LinkedPageGuid) c = b.item.LinkedPageGuid, d(c);
					else if (b.item.LinkedSectionGuid) {
						var f = $("#section_" + b.item.LinkedSectionGuid);
						f.length > 0 && $("body,html").animate({
							scrollTop: f.position().top
						}, 500)
					} else window.open(b.item.Url, e);
					else if (b.linkPage && (c = b.linkPage), b.linkSection) {
						var g = $("#section_" + b.linkSection);
						g.length > 0 && $("body,html").animate({
							scrollTop: g.position().top
						}, 500)
					} else c ? d(c) : b.linkUrl && window.open(b.linkUrl, e);
					return !1
				})
			};
			d(), pb.utils.onCreateEvents(b, ["applySectionLink" + b.guid], function(a, c, e) {
				a == "applySectionLink" + b.guid && e && e.Guid == b.guid && setTimeout(function() {
					d()
				}, 10)
			}, "Link Update")
		}
	}
}], pbAng.dirs.misc.linkToProduct = ["$location", function(a) {
	return function(b, c, d) {
		c.css("cursor", "pointer"), c.click(function() {
			var c = d.linkToProductPage,
				e = d.linkToProduct;
			return e && c && pb.data.get.page.byGuid(c, function(c) {
				if (!c) return !1;
				var d = pb.utils.findItemFromArray(c.Products, "Guid", e);
				return d ? (a.path(c.Uri + "/" + d.Url), void b.$apply()) : !1
			}), !1
		})
	}
}], pbAng.dirs.misc.linkToBlogPost = ["$location", function(a) {
	return function(b, c, d) {
		c.css("cursor", "pointer"), c.click(function() {
			var e = d.pageGuid,
				f = d.linkToBlogPost;
			return f && e ? pb.data.get.page.byGuid(e, function(c) {
				if (!c) return !1;
				var e = pb.utils.findItemFromArray(c.BlogPosts, "Guid", f);
				if (!e) return !1;
				if (d.newTab && 1 == d.newTab) {
					var g = "http://www." + b.site.Url + "/" + c.Uri + "/" + e.Url + "?c=1",
						h = window.open(g, "_blank");
					h.focus()
				} else a.path(c.Uri + "/" + e.Url), b.$apply()
			}) : c.remove(), !1
		})
	}
}], pbAng.dirs.misc.galleryDots = [function() {
	var a = '<div class="galleryDots"><ol class="dots clearfix" ng-if="galleryDots.Items.length > 1"><li ng-repeat="item in galleryDots.Items | orderBy:\'Idx\' track by item.Guid" ng-class="{\'active\': $first}" style="background:{{site.PFontColor}}" ng-click="galleryDots.doClick(item,$event)"></li></ol></div>',
		b = ["$scope", function(a) {
			a.galleryDots = {};
			! function() {
				"galleries" == a.page.DsnTemplateType ? (a.galleryDots.Items = a.page.GalleryItems || [], a.galleryDots.Id = a.page.Guid) : "products" == a.page.DsnTemplateType && (a.galleryDots.Items = a.base.currentProduct && a.base.currentProduct.Items ? a.base.currentProduct.Items : [], a.galleryDots.Id = a.base.currentProduct.Guid)
			}();
			a.galleryDots.doClick = function(b, c) {
				sliderH.goToItem(a.galleryDots.Id, b.Idx), $(c.target).addClass("active").siblings(".active").removeClass("active")
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a,
		link: function(a, b) {
			var c = function() {
				var a = b.find("li.active"),
					c = a.prev();
				a.removeClass("active"), c.length > 0 ? c.addClass("active") : a.siblings().last().addClass("active")
			}, d = function() {
				var a = b.find("li.active"),
					c = a.next();
				a.removeClass("active"), c.length > 0 ? c.addClass("active") : a.siblings().first().addClass("active")
			}, e = $("body");
			e.on("click", ".prevBox", function() {
				c()
			}), e.on("click", ".nextBox", function() {
				d()
			}), $(document).keydown(function(a) {
				37 == a.keyCode && c(), 39 == a.keyCode && d()
			})
		}
	}
}], pbAng.dirs.misc.pbClick = ["$parse", "$rootScope", function(a) {
	return {
		restrict: "A",
		compile: function(b, c) {
			var d = a(c.pbClick);
			return function(a, b) {
				b.on("click", function(b) {
					d(a, {
						$event: b
					})
				})
			}
		}
	}
}], pbAng.dirs.misc.pbClickOnce = ["$parse", "$rootScope", function(a, b) {
	return {
		restrict: "A",
		compile: function(c, d) {
			var e = a(d.pbClickOnce);
			return function(a, c) {
				c.one("click", function(c) {
					var d = function() {
						e(a, {
							$event: c
						})
					};
					b.$$phase ? a.$evalAsync(d) : a.$apply(d)
				})
			}
		}
	}
}], pbAng.dirs.misc.playVideo = function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			var d = c.playVideo;
			b.addClass("playVideoDir"), b.find(".play").click(function() {
				var a = '<div class="videoIframe"><iframe src="' + d + '" frameborder="0" width="100%" height="100%" style="width: 100%; height:100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
				b.append(a)
			})
		}
	}
}, pbAng.dirs.misc.pageFontHelper = [function() {
	return {
		restrict: "A",
		link: function(a) {
			if (a.page.LinkSettings && void 0 != a.page.LinkSettings.LinkFontCssContent && 0 == pb.utils.doGoogleCDNBlock()) {
				var b = "<link href='https://fonts.googleapis.com/css?subset=latin,latin-ext,greek,cyrillic&family=" + a.page.LinkSettings.LinkFontCssContent + ":" + a.page.LinkSettings.LinkFontVariant + "' rel='stylesheet' type='text/css'>";
				$("head").append(b)
			}
			void 0 != a.page.LinkHeaders && 0 != a.page.LinkHeaders.length && $.each(a.page.LinkHeaders, function(a, b) {
				if (void 0 != b.FontFamily && "" != b.FontFamily && null != b.FontFamily && void 0 != b.LinkHeaderCssContent && 0 == pb.utils.doGoogleCDNBlock()) {
					var c = "<link href='https://fonts.googleapis.com/css?subset=latin,latin-ext,greek,cyrillic&family=" + b.LinkHeaderCssContent + ":" + b.FontVariant + "' rel='stylesheet' type='text/css'>";
					$("head").append(c)
				}
			}), void 0 != a.page.FontCss && $("head").append(a.page.FontCss)
		}
	}
}], pbAng.dirs.misc.nestedSortable = [function() {
	var a = ["$scope", function() {}];
	return {
		restrict: "A",
		controller: a,
		link: function(a, b) {
			setTimeout(function() {
				b.nestedSortable({
					disableNesting: "no-nest",
					handle: "div",
					items: "li",
					maxLevels: 3,
					placeholder: "placeholder",
					tolerance: "pointer",
					toleranceElement: "> div",
					forcePlaceholderSize: !0,
					helper: "clone",
					tabSize: 12,
					stop: function() {
						var c = b.nestedSortable("toHierarchy", {
							startDepthCount: 0
						}),
							d = pb.utils.sortMenu(c, pb.data.menu);
						pb.data.set.menu(d), a.base.broadCast("menuChange", {
							newMenu: d
						}), a.base.broadCast("updateMenuStyle")
					}
				})
			}, 1)
		}
	}
}], pbAng.dirs.misc.nestedSortableSection = [function() {
	var a = ["$scope", function() {}];
	return {
		restrict: "A",
		controller: a,
		link: function(a, b) {
			setTimeout(function() {
				b.nestedSortable({
					disableNesting: "no-nest",
					handle: "div",
					items: "li",
					maxLevels: 3,
					placeholder: "placeholder",
					tolerance: "pointer",
					toleranceElement: "> div",
					forcePlaceholderSize: !0,
					helper: "clone",
					tabSize: 12,
					stop: function() {
						var c = b.nestedSortable("toHierarchy", {
							startDepthCount: 0
						}),
							d = pb.utils.sortSectionMenu(c, a.admin.currentSection.SectionMenuElements);
						a.admin.currentSection.SectionMenuElements = d, pb.utils.apply(a), a.admin.broadCast("changeSectionMenu" + a.admin.currentSection.Guid, {
							Guid: a.admin.currentSection.Guid
						})
					}
				})
			}, 1)
		}
	}
}], pbAng.dirs.misc.styledSubmitButton = [function() {
	var a = ["$scope", function(a) {
		a.button = {
			getStyle: function() {
				var b = {};
				return b["background-color"] = a.site.ButtonColor, b.color = a.site.ButtonTextColor, b
			}
		}
	}];
	return {
		template: '<input class="button" type="submit" href="" pb-style="button.getStyle()" value="{{site.UserTranslatedText.Pay}}"/>',
		restrict: "E",
		replace: !0,
		controller: a,
		transclude: !0,
		link: function(a, b) {
			b.hover(function() {
				b.css("background-color", a.site.ButtonHoverColor)
			}, function() {
				b.css("background-color", a.site.ButtonColor)
			})
		}
	}
}], pbAng.dirs.misc.styledButton = [function() {
	var a = ["$scope", function(a) {
		a.button = {
			getStyle: function() {
				var b = {}, c = a.site.PFontColor;
				return 1 == a.isCartMenu && (c = a.site.MenuFontColor), b.color = c, b["border-color"] = c, b
			}
		}
	}];
	return {
		template: '<a class="button" href="" pb-style="button.getStyle()"><ng-transclude></ng-transclude></a>',
		restrict: "E",
		replace: !0,
		controller: a,
		transclude: !0,
		link: function(a, b, c) {
			a.isCartMenu = c.cartbutton ? 1 : 0
		}
	}
}], pbAng.dirs.misc.styledButtonV2 = [function() {
	var a = ["$scope", function(a) {
		a.button = {
			getStyle: function() {
				var b = {};
				return b.color = a.site.PFontColor, b["border-color"] = a.site.PFontColor, b
			},
			getLoadingStyle: function() {
				var a = {};
				return a["padding-left"] = "10px", a
			},
			getCircleColor: function() {
				var b = {};
				return b["box-shadow"] = "0 1px 0 0 " + a.site.PFontColor, b
			}
		}
	}];
	return {
		template: '<div class="button"><a href="" class="float-left" pb-style="button.getStyle()"><ng-transclude></ng-transclude></a><div class="lds-css noDisplay"><div style="width:100%;height:100%" class="lds-eclipse"><div pb-style="button.getCircleColor()"></div></div></div>',
		restrict: "E",
		replace: !0,
		controller: a,
		transclude: !0,
		scope: {
			site: "=",
			onCheckout: "="
		},
		link: function(a, b) {
			var c = !1;
			b.one("click", function() {
				b.find(".lds-css").removeClass("noDisplay"), b.addClass("defaultcursor"), b.find("a").addClass("defaultcursor"), c = !0, a.onCheckout && angular.isFunction(a.onCheckout) && a.onCheckout()
			})
		}
	}
}], pbAng.dirs.misc.pbStyle = [function() {
	return {
		link: function(a, b, c) {
			var d = a.$watchCollection(c.pbStyle, function(a, c) {
				c && a !== c && b.css(a), a && b.css(a)
			});
			a.$on("$destroy", function() {
				try {
					d()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.evalCustomStyle = [function() {
	return {
		link: function(a, b, c) {
			if (void 0 != c.styleBackgroundColor) b.css({
				"background-color": c.styleBackgroundColor
			});
			else if (void 0 != c.styleFontVariant) {
				var d = pb.utils.getCssStyleAndWeight(c.styleFontVariant);
				b.css(d)
			}
		}
	}
}], pbAng.dirs.misc.adminMessages = [function() {
	var a = ["$scope", function(a) {
		a.navigate = function(b) {
			return b ? (a.admin.panelLayout.clear(), a.admin.nav(b), a.$apply(), void 0) : !1
		}
	}];
	return {
		template: "<div></div>",
		restrict: "E",
		replace: !0,
		controller: a,
		link: function(a, b) {
			var c, d = a.$on("adminMessage", function(d, e) {
				if ("upgrade" == e.type) c = '<div id="upgradeBanner"><div class="bannerHeader">' + a.admin.lang.mobileApp.upgradetopro + '<span id="minimizeUpgradeBanner" class="icon-close"></span></div><div class="bannerText">' + e.message + '</div><div class="bannerButton">' + a.admin.lang.common.upgrade + "</div></div>";
				else if ("upgradeStudent" == e.type) c = '<div id="upgradeBanner"><div class="bannerHeader">' + a.admin.lang.mobileApp.upgradetopro + '<span id="minimizeUpgradeBanner" class="icon-close"></span></div><div class="bannerText">' + e.message + '</div><div class="bannerButton">' + a.admin.lang.common.upgrade + "</div></div>";
				else if ("upgradeIfSignupPro" == e.type) c = '<div id="upgradeBanner"><div class="bannerHeader">' + a.admin.lang.pbProducts.proReceipt2 + '<span id="minimizeUpgradeBanner" class="icon-close"></span></div><div class="bannerText">' + e.message + '</div><div class="bannerButton">' + a.admin.lang.common.payNow + "</div></div>";
				else if ("upgradeExtraImages" == e.type) c = '<div id="upgradeBanner"><div class="bannerHeader">' + a.admin.lang.messages.extraImages + '<span id="minimizeUpgradeBanner" class="icon-close"></span></div><div class="bannerText">' + e.message + '</div><div class="bannerButton">' + a.admin.lang.common.appStore + "</div></div>";
				else if ("systemMessage" == e.type) c = '<div class="singleMessage newPopLayout systemMessage"><div><div><span class="icon icon-alert-general-1"></span><div class="message">' + e.message + '</div></div><span class="closeSystemMessage icon icon-close"></span></div></div>';
				else if ("noPageCannotUseTool" == e.type) {
					if (e.elem) {
						var f = e.elem;
						if (f) {
							var g = f.position(),
								h = $(".noContentMessage");
							h.length > 0 && h.remove(), $("body").off("click.noContentMessage.noPageCannotUseTool"), c = '<div class="noContentMessage animated fadeIn"><div class="container"><div><span class="icon icon-pages-1"></span></div><div><div class="text">' + e.message + "</div></div></div></div>", setTimeout(function() {
								if (h = $(".noContentMessage"), h.length > 0) {
									var a = parseInt(f.height()),
										b = parseInt($(".noContentMessage").height()),
										c = (a - b) / 2,
										d = parseInt(g.top) + c;
									h.css({
										top: d,
										visibility: "visible"
									}), $("body").one("click.noContentMessage.noPageCannotUseTool", function() {
										h.remove()
									})
								}
							}, 100)
						}
					}
				} else {
					var i = "errorMessage",
						j = "icon-alert-error-1";
					"appMessage" == e.type ? (i = "appMessage", j = "icon-alert-general-1") : "successMessage" == e.type ? (i = "successMessage", j = "icon-alert-success-1") : "infoMessage" == e.type && (i = "infoMessage", j = "icon-info"), c = '<div class="singleMessage newPopLayout ' + i + '"><div><div><span class="icon ' + j + '"></span> <div class="message">' + e.message + "</div></div></div>"
				}
				var k = $(c);
				k.addClass(a.admin.panelLayout.class);
				var l = !0;
				e.nav && (k.addClass("clickable"), k.on("click", function() {
					l && a.navigate(e.nav)
				})), b.prepend(k), ["errorMessage", "appMessage", "warning", "infoMessage"].includes(e.type) ? setTimeout(function() {
					k.fadeOut(400, function() {
						$(this).remove()
					})
				}, 5e3) : "systemMessage" == e.type ? k.find(".closeSystemMessage").on("click", function() {
					l = !1, k.fadeOut(400, function() {
						$(this).remove()
					})
				}) : "upgrade" == e.type || "upgradeStudent" == e.type || "upgradeExtraImages" == e.type || "upgradeIfSignupPro" == e.type ? $("#minimizeUpgradeBanner").click(function(a) {
					$("#upgradeBanner").addClass("mini"), a.stopPropagation()
				}) : "noPageCannotUseTool" == e.type && k && k.fadeOut(4e3, function() {
					$("body").off("click.noContentMessage.noPageCannotUseTool"), $(this) && $(this).remove()
				})
			}),
				e = a.$on("hidePanel", function(a, c) {
					c ? (b.hide(), window.fcWidget.close()) : b.show()
				});
			a.$on("$destroy", function() {
				try {
					d(), e()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.datePicker = [function() {
	return {
		restrict: "A",
		link: function(a, b) {
			b.datepicker({
				changeMonth: !0,
				changeYear: !0,
				yearRange: "1978:+0",
				dateFormat: "yy-mm-dd 00:00:00"
			})
		}
	}
}], pbAng.dirs.misc.datePickerSimple = [function() {
	return {
		restrict: "A",
		link: function(a, b) {
			b.datepicker({
				changeMonth: !0,
				changeYear: !0,
				yearRange: "1978:+0",
				dateFormat: "yy-mm-dd"
			})
		}
	}
}], pbAng.dirs.misc.viewBlogPost = ["$route", function() {
	return {
		restrict: "E",
		template: '<div><div ng-if="!currentPost.ImagePosition || currentPost.ImagePosition == 0" bind-unsafe-html="currentPost.Content" block-content></div><div ng-if="!currentPost.DsnBlogPostTemplateId == 0" ng-include="singleBlogPost.viewFile"></div><a ng-if="currentPost.ImagePosition && currentPost.ImagePosition == 2" ng-href="{{postLink}}" class="singlePostTitle"><h1 pb-style="base.getH1Styles()" ng-bind-html="currentPost.Title"></h1><div ng-if="currentPost.ImagePosition && currentPost.ImagePosition == 2" class="date" pb-style="base.getPSimpleStyle()">{{currentPost.PostDate | limitTo:10}}</div></a><div ng-if="currentPost.ImagePosition && currentPost.ImagePosition !== 0" bind-unsafe-html="currentPost.Content" block-content></div></div>',
		scope: {
			site: "=",
			page: "=",
			base: "=",
			currentPost: "=",
			imageSize: "@",
			postLink: "@"
		},
		link: function(a) {
			a.singleBlogPost = {
				viewFile: ""
			};
			var b = "",
				c = "",
				d = function() {
					if (void 0 != a.currentPost) {
						var d = function() {
							if (void 0 != a.currentPost.DsnBlogPostTemplateId && 0 != a.currentPost.DsnBlogPostTemplateId) {
								var d = pb.utils.searchInArray(a.page.DsnBlogPostTemplate, "Id", a.currentPost.DsnBlogPostTemplateId);
								b = void 0 != d ? d[0].ViewFile : a.page.DsnBlogPostTemplate[a.currentPost.DsnBlogPostTemplateId].ViewFile
							}
							void 0 != b && (c = "application/views/app/_front/views/pages/blogs/gallery/" + b + ".html", a.singleBlogPost.viewFile = "" != b ? c : "", pb.utils.digest(a, !0))
						};
						void 0 == a.page.DsnBlogPostTemplate ? pb.adminResources.get.dsnBlogPostTemplates(function(b) {
							a.page.DsnBlogPostTemplate = b, d()
						}) : d()
					}
				};
			d();
			var e = function() {
				pb.utils.changeFigStyles(a, ".blogFigCaption", "blog style")
			};
			e();
			a.$on("changeBlogTemplateViewFile", function() {
				d(), e()
			});
			pb.utils.watchFontStyles(a, ".blogFigCaption", "blogProp");
			a.$on("removeBlogTemplateViewFile", function() {
				a.singleBlogPost.viewFile = "", pb.utils.digest(a, !0)
			})
		}
	}
}], pbAng.dirs.misc.alignLogoAndMenu = [function() {
	return {
		link: function(a) {
			var b = (function() {
				pb.utils.getLogoHeight(function(a) {
					var b = c.height(),
						d = a - b,
						e = d / 2;
					c.css("margin-top", e + "px")
				})
			}(), $("div.logo")),
				c = $("ul.first"),
				d = $("nav.menu"),
				e = function() {
					var e = c.height(),
						f = b.height(),
						g = f - e,
						h = g / 2;
					try {
						if (d.length > 0) {
							var i = c.width(),
								j = i + b.width();
							if (j > d.width()) {
								var k = parseInt(a.site.LogoDisplayHeight);
								h = 0, k > 50 ? h = 10 : k > 30 && (h = 5)
							}
						}
					} catch (l) {}
					c.css("margin-top", h + "px")
				};
			e();
			var f = a.$watch("site.LogoFontSize", function() {
				e()
			}, !0),
				g = a.$watch("site.LogoDisplayHeight", function() {
					e()
				}, !0),
				h = a.$watch("site.LogoDoUseFile", function() {
					setTimeout(function() {
						e()
					}, 100)
				}, !0),
				i = a.$watch("site.MenuFontSize", function() {
					e()
				}, !0);
			pb.utils.resizeAndDestroy(a, "alignLogoAndMenu", function() {
				e()
			}), a.$on("$destroy", function() {
				try {
					f(), g(), h(), i()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.alignLogoImageAndMenu = [function() {
	return {
		link: function(a) {
			var b = $("ul.first"),
				c = (function() {
					1 == a.site.LogoDoUseFile && (isAdmin || void 0 == a.base.MenuMarginTopFromLogo ? pb.utils.getLogoHeight(function(c) {
						var d = b.height(),
							e = c - d,
							f = e / 2;
						isAdmin || (a.base.MenuMarginTopFromLogo = f), b.css({
							"margin-top": f + "px",
							"vertical-align": "top"
						})
					}) : b.css({
						"margin-top": a.base.MenuMarginTopFromLogo + "px",
						"vertical-align": "top"
					}))
				}(), $("div.logo")),
				d = $("nav.menu"),
				e = function() {
					if (1 == a.site.LogoDoUseFile) {
						var e = b.height(),
							f = c.height(),
							g = f - e,
							h = g / 2;
						try {
							if (d.length > 0) {
								var i = b.width(),
									j = i + c.width();
								if (j > d.width()) {
									var k = parseInt(a.site.LogoDisplayHeight);
									h = 0, k > 50 ? h = 10 : k > 30 && (h = 5)
								}
							}
						} catch (l) {}
						b.css("margin-top", h + "px")
					} else b.css("vertical-align", "baseline")
				};
			e();
			var f = a.$watch("site.LogoDisplayHeight", function() {
				e()
			}, !0),
				g = a.$watch("site.LogoDoUseFile", function() {
					setTimeout(function() {
						e()
					}, 100)
				}, !0),
				h = a.$watch("site.MenuFontSize", function() {
					e()
				}, !0);
			pb.utils.resizeAndDestroy(a, "alignLogoImageAndMenu", function() {
				e()
			}), a.$on("$destroy", function() {
				try {
					f(), g(), h()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.pbGalleryErrImgSrc = [function() {
	return {
		link: function(a, b, c) {
			b.bind("error", function() {
				var a = "";
				if (void 0 != c.size && "" != c.size && ("h400" == c.size ? a = "w400" : "h800" == c.size ? a = "w1000" : "w1000" == c.size && (a = "h800")), void 0 != b.data("filename") && "" != b.data("filename") && void 0 != c.s3id && "" != c.s3id) {
					var d = c.s3id,
						e = pb.constants.getS3PathById(d),
						f = e + "/" + pb.data.site.Id + "/page/",
						g = b.data("filename"),
						h = f + a + "-" + g,
						i = function() {
							b.bind("error", function() {
								h = f + g, c.$set("src", h), b.unbind("error")
							})
						};
					"" != a ? c.src != h ? (c.$set("src", h), b.unbind("error"), i()) : (b.unbind("error"), i()) : (c.$set("src", h), b.unbind("error"), i())
				} else b.unbind("error")
			})
		}
	}
}], pbAng.dirs.misc.returnToMobileApp = [function() {
	return {
		restrict: "E",
		link: function(a) {
			var b = function() {
				a.returnToMobileApp.isLoading = !0;
				var b = setTimeout(function() {
					a.returnToMobileApp.isLoading = !1, pb.utils.digest(a), clearTimeout(b)
				}, 6e4)
			};
			a.returnToMobileApp = {
				isMobileRequested: !1,
				isEditAllowed: !1,
				isLoading: !1,
				goToMain: function() {
					b(), pbAng.isMobileFront = !1, window.open(pb.constants.mobileAppConfig.getAppUrl(), pb.constants.mobileAppConfig.target, pb.constants.mobileAppConfig.options)
				},
				goToEditPage: function() {
					b(), pbAng.isMobileFront = !1, window.open(pb.constants.mobileAppConfig.getAppUrl(a), pb.constants.mobileAppConfig.target, pb.constants.mobileAppConfig.options)
				}
			}, pbAng.isMobileFront && (a.returnToMobileApp.isMobileRequested = !0), a.$on("$routeChangeSuccess", function() {
				a.returnToMobileApp.isEditAllowed = !1, pb.utils.setInterval(function() {
					return void 0 != a.page ? !0 : void 0
				}, 1, 1e3, {
					scope: a
				}).done(function() {
					void 0 != a.page.DsnTemplateType && ("blogs" == a.page.DsnTemplateType || "collections" == a.page.DsnTemplateType || "galleries" == a.page.DsnTemplateType || "products" == a.page.DsnTemplateType || "text" == a.page.DsnTemplateType) && (a.returnToMobileApp.isEditAllowed = !0)
				})
			})
		},
		template: '<div ng-if="returnToMobileApp.isMobileRequested == true" class="mainMobileAppButton"><div ng-click="returnToMobileApp.goToMain()" class="appGoBackButton"><span>{{::base.frontLang.common.back}}</span></div><div ng-click="returnToMobileApp.goToEditPage()" ng-if="returnToMobileApp.isEditAllowed == true" class="appEditButton"><span>{{::base.frontLang.common.edit}}</span></div><div class="spinnerContainer" ng-if="returnToMobileApp.isLoading == true"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div></div>'
	}
}], pbAng.dirs.misc.mobileSocialMediaIcon = [function() {
	return {
		restrict: "E",
		link: function(a) {
			a.mobileSocialMediaIcon = {
				isHidden: !0,
				show: function() {
					var b = $(".mobileSocialMedia"),
						c = $(".mfirst"),
						d = "smicon-" + a.site.SocialButtonStyle + "-share";
					a.mobileSocialMediaIcon.isHidden ? (a.mobileSocialMediaIcon.isHidden = !1, b.removeClass(d).addClass("icon-close").addClass("shadow"), $(".icon-close").css({
						"font-size": "24px"
					}), b.css({
						padding: "10px",
						background: a.site.MobileMenuBoxColor,
						color: a.site.PFontColor,
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						opacity: .95,
						"text-align": "left"
					}), c.css("-webkit-overflow-scrolling", "auto"), ($(".mobilemenu03").length > 0 || $(".mobilemenu04").length > 0 || $(".mobilemenu05").length > 0 || $(".mobilemenu07").length > 0) && b.css("z-index", "9999")) : (a.mobileSocialMediaIcon.isHidden = !0, $(".icon-close").css({
						"font-size": "23px"
					}), b.addClass(d).removeClass("icon-close").removeClass("shadow"), b.css({
						padding: "0px",
						background: "none",
						color: a.site.SocialButtonColor,
						"border-radius": "0px",
						margin: "0px",
						position: "",
						"text-align": ""
					}), c.css("-webkit-overflow-scrolling", "touch"), ($(".mobilemenu03").length > 0 || $(".mobilemenu05").length > 0 || $(".mobilemenu07").length > 0) && b.css("z-index", ""))
				},
				canUseShare: function() {
					return 0 == a.site.SocialButtonStyle && pb.utils.canUsePro(a.site) ? !1 : void 0 != a.site.SocialShowShareButtons && null != a.site.SocialShowShareButtons && "" != a.site.SocialShowShareButtons ? !0 : !1
				},
				isMobileSeeLive: !1
			}, void 0 == pbAng.isMobileFront ? a.mobileSocialMediaIcon.isMobileSeeLive = !1 : 1 == pbAng.isMobileFront && (a.mobileSocialMediaIcon.isMobileSeeLive = !0);
			var b = pb.utils.setInterval(function() {
				return 0 != $(".mobileSocialMedia").length ? !0 : void 0
			}, 10, 1e3, {
				scope: a
			});
			b.done(function() {
				var a = $(".mobileSocialMedia"),
					b = 0;
				$(".bottomOrLogoContainer").length > 0 && (b = $(".bottomOrLogoContainer").outerHeight() + 15), $(".noBottomMenu").length > 0 && (b = 10), a.css({
					bottom: b + "px"
				}), setTimeout(function() {
					$(".mobilemenu05").length > 0 && a.css({
						position: "static"
					}), a.fadeIn(100)
				}, 1e3)
			})
		},
		template: '<div ng-if="mobileSocialMediaIcon.canUseShare() == true && mobileSocialMediaIcon.isMobileSeeLive == false" class="mobileSocialMedia smicon smicon-{{site.SocialButtonStyle}}-share" style="color:{{site.SocialButtonColor}}" ng-click="mobileSocialMediaIcon.show()"><div class="mobileSocialPanel" ng-if="mobileSocialMediaIcon.isHidden == false" ng-style="{\'background\': site.MobileMenuBoxColor, \'color\': site.MobileMenuIconColor}"><div><h3 class="shareHead" pb-style="base.getH3Styles()">{{ (site.UserTranslatedText.ShareThePage == "" || site.UserTranslatedText.ShareThePage == null) ? "Share the page" : site.UserTranslatedText.ShareThePage  }}</h3><hr><div class="shareButton" facebook site="site" page="page"  base="base"></div><div class="shareButton" googleplus site="site" page="page"  base="base"></div><div class="shareButton" linkedin site="site" page="page"  base="base"></div><div class="shareButton" twitter site="site" page="page"  base="base"></div></div><hr><div><ul ng-if="site.SocialButtonStyle != 0 && site.ShowSocialMediaLinks != 0" class="socialLink"><li ng-if="site.SocialFacebookUrl != undefined && site.SocialFacebookUrl != null && site.SocialFacebookUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFacebookUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialTwitterUrl != undefined && site.SocialTwitterUrl != null && site.SocialTwitterUrl != \'\'"><a target="_blank" ng-href="{{site.SocialTwitterUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialPinterestUrl != undefined && site.SocialPinterestUrl != null && site.SocialPinterestUrl != \'\'"><a target="_blank" ng-href="{{site.SocialPinterestUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-pinterest" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialFlickrUrl != undefined && site.SocialFlickrUrl != null && site.SocialFlickrUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFlickrUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-flickr" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialInstagramUrl != undefined && site.SocialInstagramUrl != null && site.SocialInstagramUrl != \'\'"><a target="_blank" ng-href="{{site.SocialInstagramUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-instagram" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialGooglePlusUrl != undefined && site.SocialGooglePlusUrl != null && site.SocialGooglePlusUrl != \'\'"><a target="_blank" ng-href="{{site.SocialGooglePlusUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-google-plus" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialLinkedInUrl != undefined && site.SocialLinkedInUrl != null && site.SocialLinkedInUrl != \'\'"><a target="_blank" ng-href="{{site.SocialLinkedInUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialBlogUrl != undefined && site.SocialBlogUrl != null && site.SocialBlogUrl != \'\'"><a target="_blank" ng-href="{{site.SocialBlogUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-blog" style="color:{{site.SocialButtonColor}}"></span></a></li></ul></div><hr><div ng-if="site.SocialHideLikeButton != 1 && 1==1"><span class="icon-heart" style="color:{{site.SocialButtonColor}};"></span><span class="likes" style="color:{{site.SocialButtonColor}};">{{site.NrOfLikes}}</span><styled-button ng-click="socialMediaSite.doPbLike()"><span class="smicon-portfoliobox-logo"></span> {{::base.frontLang.common.like}}</styled-button></div>   </div></div><div ng-if="mobileSocialMediaIcon.canUseShare() == false && mobileSocialMediaIcon.isMobileSeeLive == false" class="socialIcons"><div><ul ng-if="site.SocialButtonStyle != 0 && site.ShowSocialMediaLinks != 0" class="socialLink"><li ng-if="site.SocialFacebookUrl != undefined && site.SocialFacebookUrl != null && site.SocialFacebookUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFacebookUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialTwitterUrl != undefined && site.SocialTwitterUrl != null && site.SocialTwitterUrl != \'\'"><a target="_blank" ng-href="{{site.SocialTwitterUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialPinterestUrl != undefined && site.SocialPinterestUrl != null && site.SocialPinterestUrl != \'\'"><a target="_blank" ng-href="{{site.SocialPinterestUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-pinterest" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialFlickrUrl != undefined && site.SocialFlickrUrl != null && site.SocialFlickrUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFlickrUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-flickr" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialInstagramUrl != undefined && site.SocialInstagramUrl != null && site.SocialInstagramUrl != \'\'"><a target="_blank" ng-href="{{site.SocialInstagramUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-instagram" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialGooglePlusUrl != undefined && site.SocialGooglePlusUrl != null && site.SocialGooglePlusUrl != \'\'"><a target="_blank" ng-href="{{site.SocialGooglePlusUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-google-plus" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialLinkedInUrl != undefined && site.SocialLinkedInUrl != null && site.SocialLinkedInUrl != \'\'"><a target="_blank" ng-href="{{site.SocialLinkedInUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialBlogUrl != undefined && site.SocialBlogUrl != null && site.SocialBlogUrl != \'\'"><a target="_blank" ng-href="{{site.SocialBlogUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-blog" style="color:{{site.SocialButtonColor}}"></span></a></li></ul></div><div ng-if="site.SocialHideLikeButton != 1 && 1==1" class="socialLikeBtn"><span class="icon-heart" style="color:{{site.SocialButtonColor}};"></span><span class="likes" style="color:{{site.SocialButtonColor}};">{{site.NrOfLikes}}</span><styled-button ng-click="socialMediaSite.doPbLike()"><span class="smicon-portfoliobox-logo"></span> {{::base.frontLang.common.like}}</styled-button></div></div>'
	}
}], pbAng.dirs.misc.pbLazySrc = ["$window", "$document", function(a, b) {
	function c(a) {
		function b(b, c) {
			if (!a.is(":visible")) return !1;
			null === h && (h = a.height());
			var d = a.offset().top,
				e = d + h;
			return c >= d && d >= b || c >= e && e >= b || b >= d && e >= c
		}
		function c() {
			g = !0, e()
		}
		function d(a) {
			f = a, g && e()
		}
		function e() {
			a[0].src = f
		}
		var f = null,
			g = !1,
			h = null;
		return {
			isVisible: b,
			render: c,
			setSource: d
		}
	}
	function d(a, b, d) {
		var f = new c(b);
		e.addImage(f), d.$observe("pbLazySrc", function(a) {
			f.setSource(a)
		}), a.$on("$destroy", function() {
			e.removeImage(f)
		})
	}
	var e = function() {
		function c(a) {
			l.push(a), m || h(), t || i()
		}
		function d(a) {
			for (var b = 0; b < l.length; b++) if (l[b] === a) {
				l.splice(b, 1);
				break
			}
			l.length || (g(), j())
		}
		function e() {
			if (!m) {
				var a = p.height();
				a !== q && (q = a, h())
			}
		}
		function f() {
			for (var a = [], b = [], c = o.height(), d = o.scrollTop(), e = d, f = e + c, h = 0; h < l.length; h++) {
				var i = l[h];
				i.isVisible(e, f) ? a.push(i) : b.push(i)
			}
			for (var h = 0; h < a.length; h++) a[h].render();
			l = b, g(), l.length || j()
		}
		function g() {
			clearTimeout(m), m = null
		}
		function h() {
			m = setTimeout(f, n)
		}
		function i() {
			t = !0, o.on("resize.pbLazySrc", k), o.on("scroll.pbLazySrc", k), r = setInterval(e, s)
		}
		function j() {
			t = !1, o.off("resize.pbLazySrc"), o.off("scroll.pbLazySrc"), clearInterval(r)
		}
		function k() {
			m || h()
		}
		var l = [],
			m = null,
			n = 100,
			o = $(a),
			p = b,
			q = p.height(),
			r = null,
			s = 2e3,
			t = !1;
		return {
			addImage: c,
			removeImage: d
		}
	}();
	return {
		link: d,
		restrict: "A"
	}
}], pbAng.dirs.misc.pbNiceLoad = [function() {
	return {
		link: function(a, b) {
			b.addClass("niceImageLoad"), b.one("load", function() {
				b.fadeTo(1500, 1)
			}).each(function() {
				this.complete && 0 != $(this).height() && $(this).load()
			})
		}
	}
}], pbAng.dirs.misc.pbVh = [function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			var d = function() {
				var a = c.property,
					d = c.percent,
					e = $(window).height(),
					f = e * d / 100;
				b.css(a, f + "px")
			};
			d(), $(window).bind("resizeEnd", function() {
				d()
			})
		}
	}
}], pbAng.dirs.misc.userlanguageSpecialCharInput = [function() {
	var a = ["$scope", function(a) {
		a.charInput = {}, a.obj && a.obj.value && (a.obj.value = a.obj.value.replace("&#039;", "'"))
	}];
	return {
		restrict: "A",
		controller: a
	}
}], pbAng.dirs.misc.learn = [function() {
	var a = "<div></div>";
	return {
		template: a,
		restric: "E",
		replace: !0,
		link: function(a, b) {
			{
				var c = a.$on("showLearn", function(a, c) {
					$(".learn-circle.zero").hide();
					var d = function(a, c) {
						setTimeout(function() {
							b.addClass(a + " animated tada learn-circle " + c)
						}, 100)
					};
					b.hasClass("first") && "first" == c.type && (b.removeClass(), d(c.klass, "first show")), b.hasClass("second") && "second" == c.type && (b.removeClass(), c.klass ? d(c.klass, "second show") : d(c.klass, "second")), b.hasClass("third") && "third" == c.type && (b.removeClass(), c.klass ? d(c.klass, "third show") : d(c.klass, "third"))
				});
				a.$on("closeEPanel", function() {
					b.removeClass("show")
				})
			}
			a.$on("$destroy", function() {
				try {
					c()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.targ = [function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			c.$observe("targ", function() {
				"_blank" == c.targ ? b.attr("target", "_blank") : b.removeAttr("target")
			})
		}
	}
}], pbAng.dirs.misc.pbInfScroll = [function() {
	return {
		restrict: "A",
		scope: !1,
		link: function(a, b) {
			var c = pb.constants.minImgDisplay,
				d = pb.constants.maxImgDisplay;
			void 0 == a.infScrollSettings && (a.infScrollSettings = {
				noInfScroll: !1,
				totalDisplayed: c,
				scrolltoleft: !1,
				loadMoreCond: function() {},
				items: []
			}), void 0 == a.infScrollSettings.items && (a.infScrollSettings.items = []), d = a.infScrollSettings.items.length, void 0 == a.infScrollSettings.noInfScroll && (a.infScrollSettings.noInfScroll = !1), $(".noInfScroll").length > 0 && (a.infScrollSettings.noInfScroll = !0);
			var e = null,
				f = .95;
			setTimeout(function() {
				if (a.infScrollSettings.loadMore = function() {
					a.infScrollSettings.totalDisplayed += c, a.infScrollSettings.totalDisplayed <= d + c && a.infScrollSettings.loadMoreCond()
				}, 0 == a.infScrollSettings.noInfScroll) if (0 == a.infScrollSettings.scrolltoleft) if (void 0 != a.$parent.autoImageLoad && 1 == a.$parent.autoImageLoad) {
					var g = setInterval(function() {
						d = a.infScrollSettings.items.length, a.infScrollSettings.totalDisplayed <= d + c ? (a.infScrollSettings.loadMore(), pb.utils.digest(a, !0)) : clearInterval(g)
					}, 5e3);
					a.$on("$destroy", function() {
						try {
							clearInterval(g)
						} catch (a) {}
					})
				} else {
					setTimeout(function() {
						var c = b,
							f = $(window).height();
						e = pb.utils.setInterval(function() {
							var b = c.height();
							return void 0 == a.infScrollSettings.items ? !0 : void 0 != a.infScrollSettings.items && 0 == a.infScrollSettings.items.length ? !0 : void 0 != a.infScrollSettings.items && a.infScrollSettings.totalDisplayed > a.infScrollSettings.items ? !0 : f > b ? (a.infScrollSettings.loadMore(), pb.utils.digest(a, !0), a.infScrollSettings.totalDisplayed > d ? !0 : void 0) : !0
						}, 1e3, {
							scope: a
						})
					}, 1);
					var h = 2 == a.page.DescriptionPosition,
						i = 0;
					$(window).on("scroll.infScrollWindow", function() {
						var b = $(".description");
						h && b.length > 0 && (i = b.height());
						var e = $(window).scrollTop(),
							g = $(document).height(),
							j = $(window).height();
						d = a.infScrollSettings.items.length, g >= i && (g -= i), e / (g - j) > f && a.infScrollSettings.totalDisplayed <= d + c && (a.infScrollSettings.loadMore(), pb.utils.digest(a, !0))
					})
				} else setTimeout(function() {
					b.parent().on("scroll.infScrollElement", function() {
						var e = b.parent().scrollLeft(),
							g = b.width(),
							h = $(window).width();
						d = a.infScrollSettings.items.length, e / (g - h) > f && a.infScrollSettings.totalDisplayed <= d + c && (a.infScrollSettings.loadMore(), pb.utils.digest(a, !0))
					})
				}, 1)
			}, 10), pb.utils.onDestroy(a, function() {
				$(window).off("scroll.infScrollWindow"), b.parent().off("scroll.infScrollElement"), null != e && e.clear()
			}, "InfScroll")
		}
	}
}], pbAng.dirs.misc.pbScrolToTop = [function() {
	var a = ["$scope", function(a) {
		var b = function() {
			pb.utils.setInterval(function() {
				return addScroll ? !0 : void 0
			}, 10, 500, {
				scope: a
			}).done(function() {
				var b = ".return-to-top-" + a.page.Guid,
					c = ".return-to-top";
				("visible" == $(b).css("visibility") || "visible" == $(c).css("visibility")) && ($(window).scroll(function() {
					$(this).scrollTop() >= 200 ? $("#return-to-top").fadeIn(200) : $("#return-to-top").fadeOut(200)
				}), $(document).on("click", "#return-to-top", function(a) {
					return a.preventDefault(), $("body,html").animate({
						scrollTop: 0
					}, 500), !1
				}))
			})
		};
		pb.utils.onCreateEvents(a, ["pageLoaded"], function() {
			b()
		}, "Page Loaded: Scroll To Top")
	}];
	return {
		restrict: "E",
		controller: a,
		template: '<a href="javascript:" id="return-to-top" class="return-to-top return-to-top-{{page.Guid}}"><i class="icon icon-drop-down-arrow-up"></i></a>'
	}
}], pbAng.dirs.misc.logoutFront = [function() {
	var a = ["$scope", function(a) {
		a.logoutFront = {
			logout: function() {
				amplify.request({
					resourceId: "logoutFront",
					success: function() {
						pb.data.clearAll(), window.location.reload(!0)
					}
				})
			}
		}, pb.utils.onCreateEvents(a, ["frontPageOrSiteLogout"], function() {
			console.log("GOT YOU... frontPageOrSiteLogout"), a.logoutFront.logout()
		}, "Front Page or Site Logout")
	}];
	return {
		restrict: "E",
		controller: a,
		template: '<div ng-if="site.IsLoggedIn" class="frontLogout" ng-click="logoutFront.logout()"><span class="icon-log-out"></span></div>'
	}
}], pbAng.dirs.misc.publicCookie = [function() {
	var a = ["$scope", function(a) {
		a.publicCookie = {
			canAddToCookie: !1,
			closeCookieMessage: function() {
				document.cookie = "pck=1", $("#publicCookieUsage").fadeOut()
			},
			getFontStyle: function() {
				var b = a.base.getListTextStyle();
				return b.color = a.site.MobileMenuFontColor, b
			}
		}, 1 == a.site.EnableCookie && navigator.cookieEnabled && (a.publicCookie.canAddToCookie = !0), $("body").on("mousemove", function(b) {
			a.publicCookie.canAddToCookie && -1 == document.cookie.search("pck=1") && $("#publicCookieUsage").fadeIn(), b.preventDefault(), $(this).off("mousemove")
		})
	}];
	return {
		restrict: "E",
		controller: a,
		link: function(a, b) {
			setTimeout(function() {
				b.find("a").css("color", a.site.PLinkColor)
			}, 10)
		},
		template: '<div ng-if="publicCookie.canAddToCookie == true" id="publicCookieUsage" pb-style="{{base.getMenuBoxColor()}}"><div pb-style="{{publicCookie.getFontStyle()}}" ng-bind-html="site.UserTranslatedText.CookieMessage"></div><div class="closeCookieMessage" pb-style="{{base.getBorderColor2()}}" ng-click="publicCookie.closeCookieMessage()"><span pb-style="{{publicCookie.getFontStyle()}}">OK</span></div></div>'
	}
}], pbAng.dirs.misc.taskFinish = [function() {
	return function(a, b, c) {
		if (void 0 != c.animationclass) {
			var d = !1;
			if (void 0 != c.stoptask && (d = c.stoptask), 0 == d || "false" == d) {
				var e = void 0 != c.opentimer ? parseInt(c.opentimer) : 500,
					f = void 0 != c.closetimer ? parseInt(c.closetimer) : 1500;
				b.css("visibility", "hidden"), setTimeout(function() {
					b.css("visibility", "visible"), b.addClass(c.animationclass)
				}, e), setTimeout(function() {
					b.css("visibility", "visible"), b.removeClass(c.animationclass), void 0 != c.hoverclass && b.addClass(c.hoverclass)
				}, f)
			}
		}
	}
}], pbAng.dirs.misc.contentLoader = [function() {
	return function(a, b, c) {
		if (void 0 != c.animationclass) {
			var d = void 0 != c.closetimer ? parseInt(c.closetimer) : 500;
			b.css("visibility", "hidden"), setTimeout(function() {
				b.css("visibility", "visible"), b.addClass(c.animationclass)
			}, d)
		}
	}
}], pbAng.dirs.misc.templateSlider = [function() {
	var a = ["$scope", function(a) {
		a.templatesSlider = function() {
			a.selectTemplate.selectedTmp = 0;
			var b = function(b) {
				$(".tempSliderBox").css({
					transition: "all 400ms ease",
					transform: "translate3d(" + -(a.selectTemplate.width * b) + "px, 0, 0)"
				})
			}, c = function() {
				a.selectTemplate.selectedTmp = 0, $(".tempSliderBox").css({
					transition: "all 0ms ease",
					transform: "translate3d(0, 0, 0)"
				}), a.selectTemplate.width = $("#templateSliderContent").width(), $(".templateSliderFigure").width(a.selectTemplate.width)
			}, d = function(c) {
				a.selectTemplate.selectedTmp = c, b(a.selectTemplate.selectedTmp)
			}, e = function() {
				d(a.selectTemplate.selectedTmp - 1)
			}, f = function() {
				d(a.selectTemplate.selectedTmp + 1)
			};
			return c(), {
				goToIndex: d,
				goToPrevious: e,
				goToNext: f,
				reset: c
			}
		}()
	}];
	return {
		restrict: "A",
		controller: a,
		link: function(a) {
			$(window).resize(function() {
				a.selectTemplate.width = $("#templateSliderContent").width(), $(".tempSliderBox").css({
					transition: "all 400ms ease",
					transform: "translate3d(" + -(a.selectTemplate.width * a.selectTemplate.selectedTmp) + "px, 0, 0)"
				})
			})
		}
	}
}], pbAng.dirs.misc.pbSelectBox = [function() {
	var a = ["$scope", "$element", function(a, b) {
		a.pbSelectBox = {
			showHideSelectBox: function(a) {
				var c = $(".pb-select-box-container");
				c.find(".itemList.activeItemList").fadeOut("fast"), c.find(".selectedItem").removeClass("activeBorder"), c.find(".icon-drop-down-arrow-up").removeClass("show"), c.find(".icon-drop-down-arrow").addClass("show");
				var d = b.find(".itemList");
				a && (d = a);
				var e = d.is(":visible");
				e ? (d.removeClass("activeItemList"), d.fadeOut("fast"), setTimeout(function() {
					b.find(".icon-drop-down-arrow-up").removeClass("show"), b.find(".icon-drop-down-arrow").addClass("show"), b.find(".selectedItem").removeClass("activeBorder")
				}, 100)) : (setTimeout(function() {
					d.addClass("activeItemList");
					var a = $(".itemList.activeItemList").parent().parent();
					a.find(".selectedItem").addClass("activeBorder"), a.find(".icon-drop-down-arrow-up").removeClass("show"), a.find(".icon-drop-down-arrow").addClass("show"), b.find(".icon-drop-down-arrow-up").addClass("show"), b.find(".icon-drop-down-arrow").removeClass("show"), b.find(".selectedItem").addClass("activeBorder")
				}, 100), d.fadeIn("fast"))
			},
			maxHeight: a.maxItems ? 30 * a.maxItems + 1 + "px" : "91px",
			maxWidth: a.width ? parseInt(a.width) + 33 + "px" : "auto",
			top: a.top ? a.top : a.reverse && a.maxItems ? "-" + (30 * a.maxItems + 34) + "px" : "-2px",
			title: a.title,
			getTitleFromProp: function(b) {
				return a.titleTranslate ? a.titleTranslate[b[a.titleProp]] : b[a.titleProp]
			},
			onClick: function(b) {
				a.pbSelectBox.showHideSelectBox(), a.pbSelectBox.title = a.pbSelectBox.getTitleFromProp(b), a.value = b[a.valueProp], a.update && angular.isFunction(a.update) && a.update(b)
			}
		};
		var c = !1,
			d = function() {
				if (a.items.length > 0) {
					if (c = !0, a.orderBy && (a.items = pb.utils.sortByKey(a.items, a.orderBy)), a.filter && angular.isFunction(a.filter)) {
						var b = [],
							d = a.filter();
						a.items.forEach(function(a) {
							var c = d(a);
							c && b.push(c)
						}), a.items = b
					}
					pb.utils.setInterval(function() {
						return a.value ? !0 : void 0
					}, 1, 100).done(function() {
						var b = pb.utils.findItemFromArray(a.items, a.valueProp, a.value);
						b && (a.pbSelectBox.title = a.pbSelectBox.getTitleFromProp(b), pb.utils.digest(a))
					})
				}
			};
		d(), pb.utils.setInterval(function() {
			return a.items.length > 0 ? !0 : void 0
		}, 1, 3e4, {
			scope: a
		}).done(function() {
			0 == c && d()
		}), (void 0 == a.admin.pbSelectBoxDocumentSelector || 0 == a.admin.pbSelectBoxDocumentSelector) && (a.admin.pbSelectBoxDocumentSelector = !0, $(document).on("click.pbSelectBoxDocumentSelector", function(b) {
			if (b.stopPropagation(), $(b.target).closest(".itemList").length < 1) {
				var c = $(".itemList.activeItemList");
				c.length > 0 && (c.removeClass("activeItemList"), a.pbSelectBox.showHideSelectBox(c))
			}
		}), pb.utils.onDestroy(a, function() {
			a.admin.pbSelectBoxDocumentSelector = !1, $(document).off("click.pbSelectBoxDocumentSelector")
		}, "Destroy pbSelectBoxDocumentSelector Event"))
	}];
	return {
		scope: {
			admin: "=",
			width: "@",
			top: "@",
			reverse: "@",
			maxItems: "@",
			title: "@",
			items: "=",
			titleProp: "@",
			titleTranslate: "=",
			valueProp: "@",
			orderBy: "@",
			filter: "=",
			value: "=",
			update: "="
		},
		template: '<div class="pb-select-box-container"><div class="selectedItem" ng-click="pbSelectBox.showHideSelectBox()" style="width: {{::width}};"><span>{{pbSelectBox.title}}</span><span class="icon icon-drop-down-arrow show"></span><span class="icon icon-drop-down-arrow-up"></span></div><div class="sb-container" style="top: {{::pbSelectBox.top}}" ng-class="{\'reverse\': reverse}"><ul class="sb-content itemList animated" style="max-height: {{::pbSelectBox.maxHeight}}; max-width: {{::pbSelectBox.maxWidth}};"><li class="items" style="width: {{::width}};" ng-repeat="item in items" ng-click="pbSelectBox.onClick(item)"><span>{{pbSelectBox.getTitleFromProp(item)}}</span><hr/></li></ul></div></div>',
		restrict: "E",
		replace: !0,
		controller: a
	}
}], pbAng.dirs.misc.propertySettingsPanel = ["$compile", function(a) {
	var b = ["$scope", "$element", function(b, c) {
		var d = null;
		b.propertySettingsPanel = {
			position: "right",
			togglePanel: function(a) {
				$(".dPanel-fontDialogbox").length > 0 && (b.admin.dPanel.close(), pb.utils.apply(b)), d = c.find(".contents"), void 0 != a && (d = a);
				var e = $(".propertySettingsPanel"),
					f = e.find(".contents.activeSettingsPanelContent");
				if (f.length > 0 && (f.slideUp("fast"), f.parent().removeClass("activeSettingPanel"), f.removeClass("activeSettingsPanelContent")), d.length > 0) {
					var g = d.is(":visible"),
						h = d.parent();
					g ? (d.removeClass("activeSettingsPanelContent"), h.removeClass("activeSettingPanel"), d.slideUp("fast")) : (setTimeout(function() {
						d.addClass("activeSettingsPanelContent"), h.addClass("activeSettingPanel")
					}, 100), d.slideDown("fast")), "left" == b.propertySettingsPanel.position && d.removeClass("contentPositionRight")
				}
			},
			getProp: function(d, e) {
				var f = c.find(".prop_" + e);
				pb.utils.setInterval(function() {
					return f = c.find(".prop_" + e), f.length > 0 ? !0 : void 0
				}, 1, 1e3, {
					scope: b
				}).done(function() {
					f.html(a(d.Prop)(b))
				})
			},
			getCondition: function(a) {
				return void 0 != a.Condition ? a.Condition : !0
			}
		};
		var e = function(a) {
			var c = $(".dPanel-fontDialogbox");
			pb.utils.setInterval(function() {
				return c = $(".dPanel-fontDialogbox"), c.length > 0 ? !0 : void 0
			}, 1, 1e3, {
				scope: b
			}).done(function() {
				var b = $(".activeSettingPanel");
				if (b.length > 0) {
					var d = b.find(".contents");
					if (d.length > 0) {
						c.find(".dPanelContent").removeClass("fadeInRight").addClass("fadeIn");
						var e = d.position().top + $(a.target).position().top + 6;
						c.find(".triangle").css({
							display: "block",
							top: e
						});
						var f = d.offset().left - parseInt(d.outerWidth()) + 121;
						c.offset({
							left: f
						}), $(".contentPanel").on("scroll.changeTriengleForOpendFontDPanel", function() {
							var b = d.position().top + $(a.target).position().top + 6;
							c.find(".triangle").css({
								display: "block",
								top: b
							})
						}), $(".dPanelContent").on("mouseenter.stopBodyScrollOnCPanelByDPanel", function() {
							$("body").addClass("noOverflow")
						}).on("mouseleave.stopBodyScrollOnCPanelByDPanel", function() {
							$("body").removeClass("noOverflow")
						})
					}
				}
			})
		};
		(void 0 == b.admin.propertySPContentDocumentSelector || 0 == b.admin.propertySPContentDocumentSelector) && (b.admin.propertySPContentDocumentSelector = !0, $(document).on("click.propertySPContentDocumentSelector", function(a) {
			if (a.stopPropagation(), $(a.target).closest(".activeSettingsPanelContent").length < 1) {
				var c = !1;
				if ($(a.target).closest(".dPanel-fontDialogbox").length > 0 && (c = !0), $(a.target).closest(".colorpicker").length > 0 && (c = !0), 0 == c) {
					var d = $(".contents.activeSettingsPanelContent");
					d.length > 0 && (d.removeClass("activeSettingsPanelContent"), b.propertySettingsPanel.togglePanel(d), $(".contentPanel").off("scroll.changeTriengleForOpendFontDPanel"), $(".dPanelContent").off("mouseenter.stopBodyScrollOnCPanelByDPanel").off("mouseleave.stopBodyScrollOnCPanelByDPanel"))
				}
			}
		}), pb.utils.onDestroy(b, function() {
			b.admin.propertySPContentDocumentSelector = !1, $(document).off("click.propertySPContentDocumentSelector"), $(".contentPanel").off("scroll.changeTriengleForOpendFontDPanel")
		}, "Destroy propertySPContent Event"));
		var f = b.admin.currentSection && b.admin.currentSection.Guid ? b.admin.currentSection.Guid : b.page.Guid;
		pb.utils.onCreateEvents(b, ["openFontDialogInSectionView" + f], function(a, b, c) {
			a == "openFontDialogInSectionView" + f && c && c.Guid == f && c.Event && e(c.Event)
		}, "PropertySettingsPanelContent Event"), pb.utils.onDestroy(b, function() {
			$(document).off("click.propertySettingsPanel"), $(".contentPanel").off("scroll.changeTriengleForOpendFontDPanel"), $(".dPanelContent").off("mouseenter.stopBodyScrollOnCPanelByDPanel").off("mouseleave.stopBodyScrollOnCPanelByDPanel")
		}, "Destroy PropertySettingsPanelContent Event")
	}];
	return {
		template: '<div class="propertySettingsPanel"><span class="icon icon-settings-1" ng-click="::propertySettingsPanel.togglePanel()"></span><div class="contents contentPositionRight propertySettingsPanelContent"><ul><li ng-repeat="data in dataForPropertyAll track by $index" ng-show="{{propertySettingsPanel.getCondition(data)}}" ><div class="table"><div class="titleCol cell"><span>{{data.Title}}</span></div><div class="propCol cell prop_{{$index}}" ng-init="::propertySettingsPanel.getProp(data, $index)"></div></div></li></ul></div></div>',
		restrict: "E",
		replace: !0,
		controller: b,
		link: function(a, b, c) {
			c.position && (a.propertySettingsPanel.position = c.position);
			var d = null;
			c.index && (d = parseInt(c.index)), a.dataForPropertyAll = null != d && angular.isNumber(d) ? a.dataForProperty[d] : a.dataForProperty
		}
	}
}], pbAng.dirs.misc.linkToUrl = [function() {
	var a = ["$scope", "$element", function(a, b) {
		a.linkToUrl || (a.linkToUrl = {}), a.linkToUrl.customLinkUrl = "", a.linkToUrl.customLinkTitle = "", a.linkToUrl.Settings || (a.linkToUrl.Settings = {}), a.linkToUrl.Settings.isSection ? a.page.OnePagerSections && a.page.OnePagerSections.length < 2 && (a.linkToUrl.Settings.isSection = !1) : a.linkToUrl.Settings.isSection = !1, a.linkToUrl.Settings.hasCustomLink || (a.linkToUrl.Settings.hasCustomLink = !1), a.linkToUrl.Settings.hasCustomLinkTitle || (a.linkToUrl.Settings.hasCustomLinkTitle = !1), a.linkToUrl.Settings.containerIdName || (a.linkToUrl.Settings.containerIdName = null), a.linkToUrl.Settings.checkIndexFirst || (a.linkToUrl.Settings.checkIndexFirst = !1), a.linkToUrl.getId = function(b) {
			var c = null;
			return a.linkToUrl.Settings.containerIdName && (c = a.linkToUrl.Settings.containerIdName, a.linkToUrl.Settings.checkIndexFirst && void 0 != b && (c = a.linkToUrl.Settings.containerIdName + "_" + b)), c
		}, a.linkToUrl.showLinkBox = function(c, d) {
			var e = b.find(".linkBox"),
				f = b.find(".linkTo");
			if (d) e = d;
			else {
				var g = a.linkToUrl.getId(c);
				g && (e = $("#" + g).find(".linkBox"), f = $("#" + g).find(".linkTo"))
			}
			var h = e.is(":visible");
			$(".linkContainer").find(".linkBox.activeLinkBox").slideUp("fast"), a.linkToUrl.customLinkUrl = "", a.linkToUrl.customLinkTitle = "", h ? ($(".linkTo").removeClass("activeBox"), e.removeClass("activeLinkBox"), e.slideUp("fast")) : (setTimeout(function() {
				f.addClass("activeBox"), e.addClass("activeLinkBox")
			}, 100), e.slideDown("fast"))
		}, a.linkToUrl.fixCustomLinkPanel = function() {
			var b = {};
			return a.linkToUrl.Settings.isSection || (b.top = "55px"), b
		}, a.linkToUrl.hasTitle = function(b) {
			return a.linkToUrl.getTitle(b) != a.admin.lang.common.linkedTo
		}, (void 0 == a.admin.linkToUrlDocumentSelector || 0 == a.admin.linkToUrlDocumentSelector) && (a.admin.linkToUrlDocumentSelector = !0, $(document).on("click.linkToUrlDocumentSelector", function(b) {
			if (b.stopPropagation(), $(b.target).closest(".linkBox").length < 1) {
				var c = $(".linkBox.activeLinkBox");
				c.length > 0 && (c.removeClass("activeLinkBox"), a.linkToUrl.showLinkBox(!1, c))
			}
		}), pb.utils.onDestroy(a, function() {
			a.admin.linkToUrlDocumentSelector = !1, $(document).off("click.linkToUrlDocumentSelector")
		}, "Destroy PropertySettingsPanelContent Event"))
	}];
	return {
		template: '<div class="linkContainer" id="{{linkToUrl.getId($index)}}"><div class="linkTo" ng-class="{hasLink: linkToUrl.hasTitle($index)}" ng-click="linkToUrl.showLinkBox($index)"><span>{{linkToUrl.getTitle($index)}}</span><span class="icon icon-drop-down-arrow"></span></div><div class="sb-container"><ul class="sb-content linkBox"><li class="pageList fixLinkToUrlHoverPanel">{{::admin.lang.common.pages}} <span class="icon icon-navigate-right"></span><span ng-if="linkToUrl.Settings.isSection || linkToUrl.Settings.hasCustomLink" class="list-bottom-border"></span></li><li class="pageSubList sb-content"><ul><li ng-repeat="page in admin.pageList track by page.Guid" ng-click="linkToUrl.addLink(\'page\',page,$parent.$index)">{{page.PageTitle}}</li></ul></li><li ng-if="linkToUrl.Settings.isSection" class="sectionList fixLinkToUrlHoverPanel">{{::admin.lang.common.sections}} <span class="icon icon-navigate-right"></span><span class="list-bottom-border"></span></li><li ng-if="linkToUrl.Settings.isSection && page.OnePagerSections.length > 1" class="sectionSubList sb-content"><ul><li ng-repeat="section in page.OnePagerSections" ng-if="section.Guid != admin.currentSection.Guid" ng-click="linkToUrl.addLink(\'section\',section,$parent.$parent.$index)">{{section.Title}}</li></ul></li><li ng-if="linkToUrl.Settings.hasCustomLink" class="customLink fixLinkToUrlHoverPanel">{{::admin.lang.common.customLink}} <span class="icon icon-drop-down-arrow"></span></li><li ng-if="linkToUrl.Settings.hasCustomLink" class="customLinkInput sb-content" pb-style="linkToUrl.fixCustomLinkPanel()"><ul><li><div><div ng-if="linkToUrl.Settings.hasCustomLinkTitle"><input class="title" type="text" placeholder="{{admin.lang.common.title}}" ng-model="linkToUrl.customLinkTitle" maxlength="20" style="margin-right: 7px"/></div><div><input type="text" placeholder="https://www.portfoliobox.net" ng-model="linkToUrl.customLinkUrl"/></div><span ng-click="linkToUrl.addLink(\'custom\', {Title: linkToUrl.customLinkTitle, Url: linkToUrl.customLinkUrl, Target: \'_blank\'},$index)" class="btn">{{::admin.lang.common.add}}</span></div></li></ul></li></ul></div><div class="removeLink" ng-if="linkToUrl.hasTitle($index)"><span class="icon icon-delete" ng-click="linkToUrl.removeLink($index)"></span></div></div>',
		restrict: "E",
		replace: !0,
		controller: a
	}
}], pbAng.dirs.misc.moveItemsGallerySection = [function() {
	var a = ["$scope", "$element", function(a, b) {
		(void 0 == a.section || "false" == a.section) && (a.section = !1), a.moveItemsGallerySection = {}, a.moveItemsGallerySection.items = [];
		var c = function() {
			var b = function(b) {
				if (("202" == b.DznTemplateGuid || "203" == b.DznTemplateGuid) && b.OnePagerSections && b.OnePagerSections.length > 1) {
					var c = pb.utils.searchInArray(b.OnePagerSections, "Type", "gallery");
					0 != a.section && (c = pb.utils.removeItemFromArray(c, "Guid", a.section.Guid)), c.length > 0 && a.moveItemsGallerySection.items.push({
						Guid: b.Guid,
						Title: b.PageTitle,
						IsSection: !0,
						sections: c
					})
				}
			};
			pb.data.get.pageList(function(c) {
				$.each(c, function(c, d) {
					if ("galleries" == d.DsnTemplateType) d.Guid != a.page.Guid && a.moveItemsGallerySection.items.push({
						Guid: d.Guid,
						Title: d.PageTitle,
						IsSection: !1
					});
					else if ("onepager" == d.DsnTemplateType) {
						var e = pb.utils.findItemFromArray(pb.data.pages, "Guid", d.Guid);
						e ? b(e) : pb.data.get.page.byUrl(d.Uri, function(c) {
							b(c), pb.utils.digest(a)
						})
					}
				}), pb.utils.digest(a)
			})
		};
		c();
		var d = function() {
			(void 0 == a.admin.moveItemsGallerySection || 0 == a.admin.moveItemsGallerySection) && (a.admin.moveItemsGallerySection = !0, $(document).on("click.moveItemsGallerySection", function(b) {
				if (b.stopPropagation(), $(b.target).closest(".selectBoxMoveItemsGallerySection").length < 1) {
					var c = $(".selectBoxMoveItemsGallerySection");
					c.length > 0 && a.moveItemsGallerySection.showHideListBox()
				}
			}))
		}, e = function() {
			a.admin.moveItemsGallerySection = !1, $(document).off("click.moveItemsGallerySection")
		};
		a.moveItemsGallerySection.showHideListBox = function() {
			var a = b.find(".firstList"),
				c = a.is(":visible");
			c ? (b.find(".icon-drop-down-arrow-up").addClass("noDisplay"), b.find(".icon-drop-down-arrow").removeClass("noDisplay"), a.slideUp("fast"), e()) : (setTimeout(function() {
				b.find(".icon-drop-down-arrow-up").removeClass("noDisplay"), b.find(".icon-drop-down-arrow").addClass("noDisplay")
			}, 100), a.slideDown("fast"), d())
		}, a.moveItemsGallerySection.onHover = function(a) {
			var b = $(a.target),
				c = $("> .sectionList", b),
				d = b.position();
			c.css({
				top: d.top < 0 ? 0 : d.top,
				left: d.left + Math.round(1 * b.outerWidth())
			})
		}, a.moveItemsGallerySection.moveToAnotherGallery = function(b, c, d) {
			var e = null,
				f = null;
			if (b) {
				if (0 != d) {
					if (e = c.Guid, e != d.PageGuid) return !1;
					f = d.Guid
				}
			} else if (e = c.Guid, !e) return !1;
			var g = a.items.length;
			a.admin.setConfirmDialog({
				title: a.admin.lang.common.removeItems + " " + g + " " + a.admin.lang.common.items + "?"
			}, function(c) {
				if (c) {
					var g = !1,
						h = !1,
						i = !1;
					$.each(a.items, function(c, j) {
						var k = null;
						if (0 == a.section) k = pb.utils.findItemFromArray(a.page.GalleryItems, "Guid", j);
						else {
							if (!a.section) return !1;
							g = !0, k = pb.utils.findItemFromArray(a.section.GalleryItems, "Guid", j)
						}
						k && pb.data.get.page.byGuid(e, function(c) {
							0 == g && 0 == b ? (h = !0, pb.data.eraseEntity.GalleryItem(k), k.PageGuid = e, c.GalleryItems = c.GalleryItems ? c.GalleryItems : [], k.Idx = c.GalleryItems.length, c.GalleryItems.push(k), pb.admin.update("GalleryItem", k, "PageGuid"), pb.admin.update("GalleryItem", k, "Idx"), a.page.GalleryItems = pb.utils.removeItemFromArray(a.page.GalleryItems, "Guid", k.Guid), a.admin.broadCast("galleryItemsChange")) : 1 == g && 1 == b ? (i = !0, pb.data.eraseEntity.SectionGalleryItems(k), k.OnepagerSectionGuid = f, d.GalleryItems = d.GalleryItems ? d.GalleryItems : [], k.Idx = d.GalleryItems.length, d.GalleryItems.push(k), pb.admin.update("OnepagerSectionItem", k, "OnepagerSectionGuid"), pb.admin.update("OnepagerSectionItem", k, "Idx"), a.section.GalleryItems = pb.utils.removeItemFromArray(a.section.GalleryItems, "Guid", k.Guid), a.admin.broadCast("renderSectionItems" + f, {
								Guid: f
							})) : 0 == g && 1 == b ? (h = !0, i = !0, pb.data.eraseEntity.GalleryItem(k), k.OnepagerSectionGuid = f, d.GalleryItems = d.GalleryItems ? d.GalleryItems : [], k.Idx = d.GalleryItems.length, d.GalleryItems.push(k), k.MoveToSectionItem = {
								Idx: k.Idx,
								OnepagerSectionGuid: f
							}, pb.admin.update("GalleryItem", k, "MoveToSectionItem"), a.page.GalleryItems = pb.utils.removeItemFromArray(a.page.GalleryItems, "Guid", k.Guid), a.admin.broadCast("galleryItemsChange")) : 1 == g && 0 == b && (h = !0, i = !0, pb.data.eraseEntity.SectionGalleryItems(k), k.PageGuid = e, c.GalleryItems = c.GalleryItems ? c.GalleryItems : [], k.Idx = c.GalleryItems.length, c.GalleryItems.push(k), k.MoveToGalleryItem = {
								Idx: k.Idx,
								PageGuid: e
							}, pb.admin.update("OnepagerSectionItem", k, "MoveToGalleryItem"), a.section.GalleryItems = pb.utils.removeItemFromArray(a.section.GalleryItems, "Guid", k.Guid), a.admin.broadCast("renderSectionItems" + f, {
								Guid: f
							}))
						})
					}), h && (a.items = [], setTimeout(function() {
						a.admin.broadCast("galleryItemsToSort")
					}, 1)), i && (a.items = [], setTimeout(function() {
						a.admin.broadCast("sectionGalleryItemsToSort_" + a.section.Guid), setTimeout(function() {
							d && d.Guid && a.admin.broadCast("sectionGalleryItemsToSort_" + d.Guid)
						}, 1)
					}, 1))
				}
			})
		}, pb.utils.onDestroy(a, function() {
			e()
		}, "Destroy MoveItemsGallerySection Event")
	}];
	return {
		template: '<div id="moveItemsGallerySection"><div ng-if="items && items.length > 0" class="move-items-gallery-section"><div class="selectBox selectBoxMoveItemsGallerySection" ng-click="moveItemsGallerySection.showHideListBox()"><span>{{::admin.lang.common.moveToGallery}}</span><span class="icon icon-drop-down-arrow-up noDisplay"></span><span class="icon icon-drop-down-arrow"></span></div><div class="sb-container"><ul class="topUl"><li><ul class="sb-content firstList"><li class="pageList" ng-mouseover="moveItemsGallerySection.onHover($event)" ng-repeat="page in moveItemsGallerySection.items | orderBy:\'Title\' track by page.Guid"><div ng-if="page.IsSection == false" class="text" ng-click="moveItemsGallerySection.moveToAnotherGallery(page.IsSection, page, false)"><span class="pageTitle">{{page.Title}}</span><span ng-if="page.sections && page.sections.length > 0" class="icon icon-navigate-right"></span><ul class="sb-content sectionList" ng-if="page.sections && page.sections.length > 0" pb-style="moveItemsGallerySection.getTopPosition($index)"><li ng-repeat="sec in page.sections | orderBy:\'Title\' track by sec.Guid" ng-click="moveItemsGallerySection.moveToAnotherGallery(page.IsSection, page, sec)">{{sec.Title}}</li></ul></div><div ng-if="page.IsSection == true" class="text"><span class="pageTitle">{{page.Title}}</span><span ng-if="page.sections && page.sections.length > 0" class="icon icon-navigate-right"></span><ul class="sb-content sectionList" ng-if="page.sections && page.sections.length > 0" pb-style="moveItemsGallerySection.getTopPosition($index)"><li ng-repeat="sec in page.sections | orderBy:\'Title\' track by sec.Guid" ng-click="moveItemsGallerySection.moveToAnotherGallery(page.IsSection, page, sec)">{{sec.Title}}</li></ul></div><div class="borderLine"></div></li></ul></li></ul></div></div></div>',
		restrict: "E",
		replace: !0,
		controller: a,
		scope: {
			admin: "=",
			page: "=",
			section: "=",
			items: "=",
			update: "="
		}
	}
}], pbAng.dirs.misc.mobileViewFrame = [function() {
	var a = ["$scope", "$element", function(a) {
		var b = "",
			c = function(c) {
				c = void 0 == c ? !1 : c, b = "https://www.", b += "" != a.site.SecondaryUrl ? a.site.SecondaryUrl : a.site.Url, c ? setTimeout(function() {
					a.page && "" != a.page.Uri && (b += "/" + a.page.Uri)
				}, 10) : a.page && "" != a.page.Uri && (b += "/" + a.page.Uri)
			};
		c(!0);
		var d = 360,
			e = 640,
			f = $("#mobileViewIframe");
		a.mobileViewFrame = {
			showMobileViewIcon: !1,
			showMobileViewIframe: !1,
			isPortrait: !0,
			iFrameWidth: d,
			iFrameHeight: e,
			showMobileView: function() {
				a.mobileViewFrame.showMobileViewIframe = !a.mobileViewFrame.showMobileViewIframe, a.mobileViewFrame.showMobileViewIframe && pb.utils.setInterval(function() {
					return f = $("#mobileViewIframe"), f.length > 0 ? !0 : void 0
				}, 1, 100, {
					scope: a
				}).done(function() {
					c(), f.attr("src", b)
				})
			},
			rotateMobileViewIframe: function() {
				a.mobileViewFrame.isPortrait = !a.mobileViewFrame.isPortrait, a.mobileViewFrame.isPortrait ? (a.mobileViewFrame.iFrameWidth = d, a.mobileViewFrame.iFrameHeight = e) : (a.mobileViewFrame.iFrameWidth = e, a.mobileViewFrame.iFrameHeight = d), f.attr("src", b)
			}
		};
		var g = amplify.store.sessionStorage("panelLayoutClass");
		a.mobileViewFrame.showMobileViewIcon = "hide" != g ? !1 : !0, pb.utils.onCreateEvents(a, ["hidePanel"], function(b, c, f) {
			a.mobileViewFrame.showMobileViewIcon = f, 0 == f && (a.mobileViewFrame.showMobileViewIframe = f, a.mobileViewFrame.isPortrait = !0, a.mobileViewFrame.iFrameWidth = d, a.mobileViewFrame.iFrameHeight = e)
		}, "mobileViewFrame")
	}];
	return {
		template: '<div class="mobileViewContainer"><div ng-if="mobileViewFrame.showMobileViewIcon" style="user-select: none;"><div id="mobileVieIcon" class="animated slideInLeft" ng-class="{active: mobileViewFrame.showMobileViewIframe}" ng-click="mobileViewFrame.showMobileView()" style="position: fixed; display: block; top: 100px; font-size: 40px; background: #27272c; color: #ffffff; cursor: pointer; z-index: 102; padding: 10px 5px 1px 0px;">  <span class="icon icon-mobile"></span></div><div ng-if="mobileViewFrame.showMobileViewIframe" id="mobileViewTemp" class="animated fadeIn" style="position: fixed; top: 0; width: 100%; height: 100%; background: aliceblue; z-index: 101; display: block;"><div style="left: 50%; top: 50%; position: fixed; transform: translate(-50%, -50%);"><div style="text-align: center; font-size: 20px;"><div id="mobileViewRotate" ng-click="mobileViewFrame.rotateMobileViewIframe()" ng-class="{rotate90: mobileViewFrame.isPortrait}" style="cursor: pointer;"><span class="icon icon-mobile"></span></div></div><div style="padding: 10px; background: #ffffff; border: 1px solid #000000;"><iframe id="mobileViewIframe" width="{{mobileViewFrame.iFrameWidth}}" height="{{mobileViewFrame.iFrameHeight}}"></iframe></div></div></div></div></div>',
		restrict: "E",
		replace: !0,
		controller: a
	}
}], pbAng.dirs.misc.checkForLink = [function() {
	return {
		restrict: "A",
		link: function(a, b) {
			setTimeout(function() {
				var c = b.find("a");
				c.css("color", a.site.PLinkColor)
			}, 1);
			var c = "." + b.attr("class").split(" ").join(".") + " a";
			pb.utils.hover(c, a.site.PLinkColorHover, a.site.PLinkColor)
		}
	}
}], pbAng.dirs.misc.selectable = [function() {
	return {
		restric: "A",
		link: function(a, b) {
			var c = !1,
				d = [];
			b.selectable({
				filter: "figure",
				selecting: function(a, b) {
					return "mousemove" == a.handleObj.type ? (c = !0, !0) : void($(b.selecting).hasClass("ui-selected") && d.push(b.selecting))
				},
				unselecting: function(a, b) {
					$(b.unselecting).addClass("ui-selected")
				},
				stop: function() {
					c || $.each(d, function(a, b) {
						$(b).removeClass("ui-selecting").removeClass("ui-selected")
					}), c = !1, d = [];
					var b = [];
					$(".ui-selected").each(function() {
						b.push($(this).data("obj"))
					}), a.admin.broadCast("elementsSelected", {
						photoObjects: b
					})
				}
			});
			var e = a.$on("clearSelection", function() {
				$(".ui-selected").each(function() {
					$(this).removeClass("ui-selected"), $(this).removeClass("ui-selectee")
				})
			});
			a.$on("$destroy", function() {
				try {
					e()
				} catch (a) {}
			})
		}
	}
}], pbAng.dirs.misc.twoLinesMenuIcon = [function() {
	var a = '<div class="twoLinesMenuIcon linesMenuIcon"><span style="background:{{site.LogoFontColor}}" class="top"></span><span style="background:{{site.LogoFontColor}}" class="bottom"></span></div>';
	return {
		template: a,
		restrict: "E",
		replace: !0,
		controller: ctrl,
		link: function(a, b) {
			$(".menuIcon").hide(), $(b).click(function() {
				$(b).toggleClass("checked")
			})
		}
	}
}], pbAng.dirs.misc.threeLinesMenuIcon = [function() {
	var a = '<div class="threeLinesMenuIcon linesMenuIcon" ng-class="{mobile : base.isMobile}"><span style="background:{{site.LogoFontColor}}" class="top"></span><span style="background:{{site.LogoFontColor}}" class="middle"></span><span style="background:{{site.LogoFontColor}}" class="bottom"></span></div>';
	return {
		template: a,
		restrict: "E",
		replace: !0,
		link: function(a, b) {
			$(b).click(function() {
				$(b).toggleClass("checked")
			})
		}
	}
}], pbAng.dirs.misc.threeLinesMenuIconPassive = [function() {
	var a = '<div class="threeLinesMenuIcon linesMenuIcon" ng-class="{mobile : base.isMobile}"><span style="background:{{site.LogoFontColor}}" class="top"></span><span style="background:{{site.LogoFontColor}}" class="middle"></span><span style="background:{{site.LogoFontColor}}" class="bottom"></span></div>';
	return {
		template: a,
		restrict: "E",
		replace: !0
	}
}], pbAng.dirs.socialmedia = {}, pbAng.dirs.socialmedia.helper = {
	getSiteUrl: function(a) {
		var b, c = a.site,
			d = a.page,
			e = a.base.url,
			f = a.base.partUrl;
		return pb.environment.isAdmin ? "/" == e || "" == e ? b = "http://www." + c.Url : d && d.Uri && (b = f ? "http://www." + c.Url + "/" + d.Uri + "/" + f : "http://www." + c.Url + "/" + d.Uri) : b = window.location.href, b
	},
	getUriForImageShare: function(a) {
		var b;
		if (a.base.urlIndex) {
			var c = sliderH.getShareObjectForCurrentImage(null, a.page, a.base.currentProduct),
				d = c.index;
			return b = "http://www." + pb.data.site.Url + "/" + a.base.url + "/image/" + d
		}
		return b = "http://www." + pb.data.site.Url + "/" + a.base.url
	},
	getUriForImageShareObject: function(a) {
		var b;
		if (a.base.urlIndex) {
			var c = sliderH.getShareObjectForCurrentImage(null, a.page, a.base.currentProduct),
				d = c.index;
			b = "http://www." + pb.data.site.Url + "/" + a.base.url + "/image/" + d, c.pageUrl = b
		} else b = "http://www." + pb.data.site.Url + "/" + a.base.url, c.pageUrl = b;
		return c
	}
}, pbAng.dirs.socialmedia.facebook = ["$window", "$location", function(a) {
	return {
		restrict: "A",
		scope: {
			site: "=",
			page: "=",
			uri: "=",
			base: "="
		},
		link: function(b, c) {
			function d() {
				var d = null;
				d = b.uri ? "http://www." + b.site.Url + b.uri : "" != b.site.SocialFacebookShareUrl && null != b.site.SocialFacebookShareUrl ? b.site.SocialFacebookShareUrl : pbAng.dirs.socialmedia.helper.getSiteUrl(b), c.html('<div class="fb-like"' + (d ? ' data-href="' + d + '"' : "") + ' data-url="' + d + '" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>'), a.FB.XFBML.parse(c.parent()[0])
			}
			try {
				a.FB ? d() : ($.ajaxSetup({
					cache: !0
				}), $.getScript("//connect.facebook.net/en_US/sdk.js", function() {
					a.FB.init({
						appId: "281620631849987",
						xfbml: !0,
						version: "v2.2"
					}), d()
				}))
			} catch (e) {}
		}
	}
}], pbAng.dirs.socialmedia.googleplus = ["$window", "$location", function(a) {
	return {
		restrict: "A",
		scope: {
			site: "=",
			page: "=",
			uri: "=",
			base: "="
		},
		link: function(b, c) {
			function d() {
				var d = null;
				d = b.uri ? "http://www." + b.site.Url + b.uri : pbAng.dirs.socialmedia.helper.getSiteUrl(b), c.html('<div class="g-plusone" data-size="large" data-annotation="bubble" data-href="' + d + '" data-action="share"></div>'), a.gapi.plusone.go(c.parent()[0])
			}
			try {
				a.gapi ? d() : ($.ajaxSetup({
					cache: !0
				}), $.getScript("//apis.google.com/js/platform.js", function() {
					d()
				}))
			} catch (e) {}
		}
	}
}], pbAng.dirs.socialmedia.linkedin = ["$window", "$location", function(a) {
	return {
		restrict: "A",
		scope: {
			site: "=",
			page: "=",
			uri: "=",
			base: "="
		},
		template: '<script type="IN/Share" data-counter="right" data-url="{{linkedinUrl}}"></script>',
		link: function(b) {
			function c() {
				IN.parse && IN.parse()
			}
			var d = null;
			d = b.uri ? "http://www." + b.site.Url + b.uri : pbAng.dirs.socialmedia.helper.getSiteUrl(b), b.linkedinUrl = d;
			try {
				a.lnkdien ? c() : ($.ajaxSetup({
					cache: !0
				}), $.getScript("//platform.linkedin.com/in.js", function() {
					c()
				}))
			} catch (e) {}
		}
	}
}], pbAng.dirs.socialmedia.twitter = ["$window", "$location", function(a) {
	return {
		restrict: "A",
		scope: {
			site: "=",
			page: "=",
			uri: "=",
			title: "=",
			base: "="
		},
		link: function(b, c) {
			function d() {
				var d;
				d = b.uri ? "http://www." + b.site.Url + b.uri : pbAng.dirs.socialmedia.helper.getSiteUrl(b);
				var e;
				e = b.title ? b.title : b.base.partUrl && b.base.currentPost ? b.base.currentProduct.Title + " - " + b.page.PageTitle + " - " + b.site.SiteTitle : b.base.partUrl && b.base.currentProduct ? b.base.currentProduct.Title + " - " + b.page.PageTitle + " - " + b.site.SiteTitle : pb.utils.getTitle(b.site.SiteTitle, b.page.PageTitle);
				var f = " via @portfoliobox";
				1 == b.site.AccountType && (f = ""), c.html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + d + '" data-count="horizontal" data-text="' + e + f + '">Tweet</a>'), a.twttr.widgets.load(c.parent()[0])
			}
			try {
				a.twttr ? d() : ($.ajaxSetup({
					cache: !0
				}), $.getScript("//platform.twitter.com/widgets.js", function() {
					d()
				}))
			} catch (e) {}
		}
	}
}], pbAng.dirs.socialmedia.socialMediaLinks = ["$window", "$location", function(a, b) {
	return {
		template: '<div class="socialMediaIconsOnItem" ng-if="site.SocialShowShareButtons == 1 && isMobileToHideSocialMedia == false"><ul><li><span ng-if="page.DsnTemplateType == \'galleries\' && base.urlIndex" ng-click="socialLink.clickFacebookUrl()"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.SocialButtonColor}}"></span></span></li><li><span ng-click="socialLink.clickTwitterUrl()" ><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.SocialButtonColor}}"></span></span></li><li><span ng-click="socialLink.clickPinterest()" ><span class="smicon smicon-{{site.SocialButtonStyle}}-pinterest" style="color:{{site.SocialButtonColor}}"></span></span></li><li><span ng-click="socialLink.clickGooglePlusUrl()" ><span class="smicon smicon-{{site.SocialButtonStyle}}-googleplus" style="color:{{site.SocialButtonColor}}"></span></span></li><li><span ng-click="socialLink.clickLinkedinUrl()"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.SocialButtonColor}}"></span></span></li></ul></div>',
		restrict: "EA",
		replace: !0,
		transclude: !0,
		link: function(a) {
			a.isMobileToHideSocialMedia = !1, (pb.environment.isMobile || pb.environment.width < pb.environment.minWidth) && (a.isMobileToHideSocialMedia = !0), a.socialLink = {
				clickFacebookUrl: function() {
					var b = "https://www.facebook.com/sharer/sharer.php",
						c = pbAng.dirs.socialmedia.helper.getUriForImageShare(a);
					console.log(c), b += "?m2w&u=" + encodeURIComponent(c), b += "&display=popup", b += "&ref=plugin", b += "&src=like", b += "&app_id=281620631849987", window.open(b, "_blank")
				},
				clickGooglePlusUrl: function() {
					var b = "https://plus.google.com/share",
						c = pbAng.dirs.socialmedia.helper.getUriForImageShare(a);
					b += "?url=" + encodeURIComponent(c), window.open(b, "_blank")
				},
				clickLinkedinUrl: function() {
					var b = "https://linkedin.com/shareArticle",
						c = pbAng.dirs.socialmedia.helper.getUriForImageShare(a);
					b += "?url=" + encodeURIComponent(c), window.open(b, "_blank")
				},
				clickTwitterUrl: function() {
					var b = "https://twitter.com/intent/tweet",
						c = " via @portfoliobox";
					1 == a.site.AccountType && (c = ""), b += "?text=" + pb.utils.getTitle(a.site.SiteTitle, a.page.PageTitle) + c;
					var d = pbAng.dirs.socialmedia.helper.getUriForImageShare(a);
					b += "&url=" + encodeURIComponent(d), window.open(b, "_blank")
				},
				clickPinterest: function() {
					var c = "https://pinterest.com/pin/create/button/",
						d = " via @portfoliobox";
					1 == a.site.AccountType && (d = ""), c += "?text=" + pb.utils.getTitle(a.site.SiteTitle, a.page.PageTitle) + d;
					var e = b.url(),
						f = "http://www." + pb.data.site.Url + e,
						g = sliderH.getShareObjectForCurrentImage(null, a.page, a.base.currentProduct);
					g.imagePath && (c += "&media=" + encodeURIComponent(g.imagePath)), c += "?url=" + encodeURIComponent(f), c += "&description=" + pb.utils.getTitle(a.site.SiteTitle, a.page.PageTitle), window.open(c, "_blank")
				}
			}
		}
	}
}], pbAng.dirs.socialmedia.socialMediaSite = ["$window", function() {
	var a = ["$scope", function(a) {
		a.socialMediaSite = {}, a.socialMediaSite.shareInclude = !1, a.socialMediaSite.followInclude = !1, a.socialMediaSite.pbLikeInclude = !1, a.socialMediaSite.doGoogleCDNBlock = pb.utils.doGoogleCDNBlock(), a.socialMediaSite.nrOfLikes = 0, a.socialMediaSite.clickShare = function() {
			0 == pb.utils.doGoogleCDNBlock() && (a.socialMediaSite.shareInclude = "application/views/app/dirs/socialmedia/socialmediashare.html", setTimeout(function() {
				$(".sharePopup").css("background", a.site.BgColor), $(document).on("click.socialMediaSharePopUp", function(b) {
					b.stopPropagation(), $(b.target).closest("#pb-socialMediaSharePopUp").length < 1 && a.socialMediaSite.closeShare()
				})
			}, 1), a.$digest())
		}, a.socialMediaSite.clickFollow = function() {
			a.socialMediaSite.followInclude = "application/views/app/dirs/socialmedia/socialmediafollow.html", setTimeout(function() {
				$(".sharePopup").css("background", a.site.BgColor), $(".followPopup").css("background", a.site.BgColor), $(".pbLikePopup").css("background", a.site.BgColor), $(document).on("click.socialMediaFollowPopUp", function(b) {
					b.stopPropagation(), $(b.target).closest("#pb-socialMediaFollowPopUp").length < 1 && a.socialMediaSite.closeFollow()
				})
			}, 1), a.$digest(), $(".mfirst").css("-webkit-overflow-scrolling", "auto")
		}, a.socialMediaSite.clickPbLike = function() {
			a.socialMediaSite.pbLikeInclude = "application/views/app/dirs/socialmedia/pblikepopup.html", setTimeout(function() {
				$(".sharePopup").css("background", a.site.BgColor), $(".followPopup").css("background", a.site.BgColor), $(".pbLikePopup").css("background", a.site.BgColor), $(document).on("click.socialMediaPbLikePopUp", function(b) {
					b.stopPropagation(), $(b.target).closest("#pb-socialMediaPbLikePopUp").length < 1 && a.socialMediaSite.closePbLike()
				})
			}, 1), a.$digest()
		}, a.socialMediaSite.closeShare = function() {
			a.socialMediaSite.shareInclude = !1, $(document).off("click.socialMediaSharePopUp"), a.$digest()
		}, a.socialMediaSite.closeFollow = function() {
			a.socialMediaSite.followInclude = !1, $(document).off("click.socialMediaFollowPopUp"), a.$digest(), $(".mfirst").css("-webkit-overflow-scrolling", "touch")
		}, a.socialMediaSite.closePbLike = function() {
			a.socialMediaSite.pbLikeInclude = !1, $(document).off("click.socialMediaPbLikePopUp"), a.$digest()
		}, a.socialMediaSite.doPbLike = function() {
			amplify.request({
				resourceId: "doLike",
				success: function(b) {
					1 == b.Success ? (a.site.NrOfLikes++, pb.data.updateEntity.Site(), a.socialMediaSite.hasLiked = !0, a.$digest()) : a.socialMediaSite.youCanOnlyLikeOnce = !0
				},
				error: function(a) {
					console.log("error: " + a)
				}
			})
		}, a.socialMediaSite.followName = "", a.socialMediaSite.followEmail = "", a.socialMediaSite.isFollow = !1, a.socialMediaSite.follow = function() {
			$("#acceptFollowTerms").is(":checked") ? amplify.request({
				resourceId: "saveFollower",
				data: {
					name: a.socialMediaSite.followName,
					email: a.socialMediaSite.followEmail
				},
				success: function() {
					a.socialMediaSite.isFollow = !0, a.socialMediaSite.followInclude = !1, a.$digest()
				},
				error: function(a) {
					console.log("error: " + a)
				}
			}) : alert(a.site.UserTranslatedText.AcceptTheTerms)
		}, 
		//terran
		a.socialMediaSite.canUsePro = true//pb.utils.isSitePremium(a.site), 
		a.socialMediaSite.canUsePro && (a.socialMediaSite.canUseProClass = "isPro"), a.socialMediaSite.portfolioboxLink = pb.utils.getPbLink(a.site.LanguageId), a.socialMediaSite.saleSiteLang = pb.utils.getLangCodeFromLangId(a.site.LanguageId), "en" == a.socialMediaSite.saleSiteLang && (a.socialMediaSite.saleSiteLang = "")
	}];
	return {
		template: '<div><div class="socialMediaIcons {{socialMediaSite.canUseProClass}}" misc-helper><ul><li class="pboxRSS" ng-if="site.EnableRSS == 1"><a href="https://www.{{site.Url}}/extra/rss" target="_blank"><span class="smicon smicon-{{site.SocialButtonStyle}}-rss" style="color:{{site.SocialButtonColor}}"></span></a></li><span class="otherIcons" ng-if="site.ShowSocialMediaLinks != 0"><li ng-if="site.SocialFacebookUrl != undefined && site.SocialFacebookUrl != null && site.SocialFacebookUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFacebookUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialTwitterUrl != undefined && site.SocialTwitterUrl != null && site.SocialTwitterUrl != \'\'"><a target="_blank" ng-href="{{site.SocialTwitterUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialPinterestUrl != undefined && site.SocialPinterestUrl != null && site.SocialPinterestUrl != \'\'"><a target="_blank" ng-href="{{site.SocialPinterestUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-pinterest" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialFlickrUrl != undefined && site.SocialFlickrUrl != null && site.SocialFlickrUrl != \'\'"><a target="_blank" ng-href="{{site.SocialFlickrUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-flickr" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialInstagramUrl != undefined && site.SocialInstagramUrl != null && site.SocialInstagramUrl != \'\'"><a target="_blank" ng-href="{{site.SocialInstagramUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-instagram" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialGooglePlusUrl != undefined && site.SocialGooglePlusUrl != null && site.SocialGooglePlusUrl != \'\'"><a target="_blank" ng-href="{{site.SocialGooglePlusUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-google-plus" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialLinkedInUrl != undefined && site.SocialLinkedInUrl != null && site.SocialLinkedInUrl != \'\'"><a target="_blank" ng-href="{{site.SocialLinkedInUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.SocialButtonColor}}"></span></a></li><li ng-if="site.SocialBlogUrl != undefined && site.SocialBlogUrl != null && site.SocialBlogUrl != \'\'"><a target="_blank" ng-href="{{site.SocialBlogUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-blog" style="color:{{site.SocialButtonColor}}"></span></a></li></span><li ng-if="socialMediaSite.doGoogleCDNBlock != true && site.SocialShowShareButtons != undefined && site.SocialShowShareButtons != null && site.SocialShowShareButtons != \'\'"><a target="_blank" pb-click="socialMediaSite.clickShare()"><span class="smicon smicon-{{site.SocialButtonStyle}}-share"  style="color:{{site.SocialButtonColor}}"></span></a><div class="sharePopup" ng-if="socialMediaSite.shareInclude"><div ng-include="socialMediaSite.shareInclude"></div></div></li><li ng-if="site.SocialFollowButton != \'\' "><a id="socialMediaFollowButton" target="_blank" pb-click="socialMediaSite.clickFollow()"><span class="smicon smicon-{{site.SocialButtonStyle}}-follow" style="color:{{site.SocialButtonColor}}"></span></a><div class="followPopup" ng-if="socialMediaSite.followInclude"><div ng-include="socialMediaSite.followInclude" ></div></div></li><li class="pboxLike" ng-if="site.SocialHideLikeButton != 1"><span pb-click="socialMediaSite.clickPbLike()" class="smicon smicon-{{site.SocialButtonStyle}}-heart" style="color:{{site.SocialButtonColor}}"></span><span pb-click="socialMediaSite.clickPbLike()" class="noBubble" style="color:{{site.SocialButtonColor}};">{{site.NrOfLikes}}</span><div class="pbLikePopup" ng-if="socialMediaSite.pbLikeInclude"><div ng-include="socialMediaSite.pbLikeInclude" ></div></div></li></ul></div><div class="portfolioboxLink" ng-if="!socialMediaSite.canUsePro" style="color:{{site.SocialButtonColor}} ; border-color:{{site.SocialButtonColor}}"><a target="_blank" href="https://www.portfoliobox.net/{{::socialMediaSite.saleSiteLang}}" style="color:{{site.SocialButtonColor}}">Powered by Portfoliobox</a></div></div>',
		restrict: "E",
		replace: !0,
		controller: a
	}
}], pbAng.dirs.socialmedia.socialMediaSiteSection = [function() {
	return {
		template: '<div class="section-socialMediaIcons social-media-container" id="social_media_container_{{::section.Guid}}"><ul><li class="facebook" ng-if="section.SocialMedia.FacebookUrl != undefined && section.SocialMedia.FacebookUrl != null && section.SocialMedia.FacebookUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.FacebookUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-facebook" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="twitter" ng-if="section.SocialMedia.TwitterUrl != undefined && section.SocialMedia.TwitterUrl != null && section.SocialMedia.TwitterUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.TwitterUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-twitter" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="linkedin" ng-if="section.SocialMedia.LinkedInUrl != undefined && section.SocialMedia.LinkedInUrl != null && section.SocialMedia.LinkedInUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.LinkedInUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-linkedin" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="googleplus" ng-if="section.SocialMedia.GooglePlusUrl != undefined && section.SocialMedia.GooglePlusUrl != null && section.SocialMedia.GooglePlusUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.GooglePlusUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-google-plus" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="pinterest" ng-if="section.SocialMedia.PinterestUrl != undefined && section.SocialMedia.PinterestUrl != null && section.SocialMedia.PinterestUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.PinterestUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-pinterest" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="flickr" ng-if="section.SocialMedia.FlickrUrl != undefined && section.SocialMedia.FlickrUrl != null && section.SocialMedia.FlickrUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.FlickrUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-flickr" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="instagram" ng-if="section.SocialMedia.InstagramUrl != undefined && section.SocialMedia.InstagramUrl != null && section.SocialMedia.InstagramUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.InstagramUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-instagram" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li><li class="blog" ng-if="section.SocialMedia.BlogUrl != undefined && section.SocialMedia.BlogUrl != null && section.SocialMedia.BlogUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.BlogUrl}}"><span class="smicon smicon-{{section.SocialMedia.ButtonStyle}}-blog" ng-style="{\'color\': section.SocialMedia.ButtonColor, \'font-size\': section.SocialMedia.ButtonFontSize }"></span></a></li></ul></div>',
		restrict: "E",
		replace: !0
	}
}], pbAng.dirs.socialmedia.socialMediaSiteSectionJustWords = [function() {
	var a = ["$scope", "$element", "$attrs", function(a) {
		var b = $("#social_media_container_" + a.section.Guid + " li a"),
			c = function() {
				b.css("color", a.section.SocialMedia.FontColor)
			}, d = function() {
				b.css("font-family", a.section.SocialMedia.FontFamily)
			}, e = function() {
				var c = pb.utils.getCssStyleAndWeight(a.section.SocialMedia.FontVariant);
				"" != c["font-style"] && b.css("font-style", c["font-style"]), "" != c["font-weight"] && b.css("font-weight", c["font-weight"]), b.css("text-decoration", "none")
			}, f = function() {
				b.css("font-size", a.section.SocialMedia.FontSize), g()
			}, g = function() {
				pb.utils.hover("#social_media_container_" + a.section.Guid + " li a", a.section.SocialMedia.FontColorHover, a.section.SocialMedia.FontColor)
			}, h = function() {
				var c = 1 == a.section.SocialMedia.IsUppercase ? "uppercase" : "";
				b.css("text-transform", c)
			}, i = function() {
				b.css("letter-spacing", parseInt(a.section.SocialMedia.FontSpacing) / 4 + "px");
				var c = parseInt(a.section.SocialMedia.FontSpacing) / 4 * .7;
				b.css("letter-spacing", c + "px")
			}, j = function(j) {
				pb.utils.setInterval(function() {
					return b = $("#social_media_container_" + a.section.Guid + " li a"), b.length > 0 ? !0 : void 0
				}, 1, 1e3, {
					scope: a
				}).done(function() {
					"FontColor" == j ? c() : "FontColorHover" == j ? g() : "FontFamily" == j ? (d(), e()) : "FontSize" == j ? f() : "FontUpperCase" == j ? h() : "FontSpacing" == j ? i() : (c(), g(), d(), f(), h(), i(), e())
				})
			};
		j(), pb.utils.onCreateEvents(a, ["changeSocialMediaFont" + a.section.Guid], function(b, c, d) {
			d && d.Guid == a.section.Guid && b == "changeSocialMediaFont" + a.section.Guid && j(d.Message)
		}, "Section Social Media Font")
	}];
	return {
		template: '<div class="section-socialMediaIcons social-media-container" id="social_media_container_{{::section.Guid}}"><ul><li class="facebook" ng-if="section.SocialMedia.FacebookUrl != undefined && section.SocialMedia.FacebookUrl != null && section.SocialMedia.FacebookUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.FacebookUrl}}" ><span class="link-facebook">Facebook</span></a></li><li class="twitter" ng-if="section.SocialMedia.TwitterUrl != undefined && section.SocialMedia.TwitterUrl != null && section.SocialMedia.TwitterUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.TwitterUrl}}"><span class="link-twitter">Twitter</span></a></li><li class="linkedin" ng-if="section.SocialMedia.LinkedInUrl != undefined && section.SocialMedia.LinkedInUrl != null && section.SocialMedia.LinkedInUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.LinkedInUrl}}"><span class="link-linkedin">LinkedIn</span></a></li><li class="googleplus" ng-if="section.SocialMedia.GooglePlusUrl != undefined && section.SocialMedia.GooglePlusUrl != null && section.SocialMedia.GooglePlusUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.GooglePlusUrl}}"><span class="link-google-plus">Google Plus</span></a></li><li class="pinterest" ng-if="section.SocialMedia.PinterestUrl != undefined && section.SocialMedia.PinterestUrl != null && section.SocialMedia.PinterestUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.PinterestUrl}}"><span class="link-pinterest">Pinterest</span></a></li><li class="flickr" ng-if="section.SocialMedia.FlickrUrl != undefined && section.SocialMedia.FlickrUrl != null && section.SocialMedia.FlickrUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.FlickrUrl}}"><span class="link-flickr">Flickr</span></a></li><li class="instagram" ng-if="section.SocialMedia.InstagramUrl != undefined && section.SocialMedia.InstagramUrl != null && section.SocialMedia.InstagramUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.InstagramUrl}}"><span class="link-instagram">Instagram</span></a></li><li class="blog" ng-if="section.SocialMedia.BlogUrl != undefined && section.SocialMedia.BlogUrl != null && section.SocialMedia.BlogUrl != \'\'"><a target="_blank" ng-href="{{section.SocialMedia.BlogUrl}}"><span class="link-blog">{{::base.frontLang.common.blog}}</span></a></li></ul></div>',
		restrict: "E",
		controller: a,
		replace: !0
	}
}], pbAng.dirs.frontViews = {
	blogs: {},
	collections: {},
	galleries: {},
	cover: {},
	other: {},
	products: {},
	text: {},
	sections: {},
	layouts: {}
};
var const_frontViews = {
	dynamicGrid: [function() {
		var a = pb.environment.isMobile,
			b = !1,
			c = null,
			d = function(a, b, c) {
				var d = 0,
					e = {
						container: null,
						width: b
					}, f = {
						collections: $(".collection"),
						galleries: $(".gallery"),
						products: $(".products"),
						social: $($("#instagramContainer").length > 0 ? "#instagramContainer" : "#flickrContainer")
					};
				return e.container = f[c], void 0 != e.container && null != e.container && (d = e.container.width(), b >= d && (e.width = a ? d : d - 10)), e
			}, e = function(e, f) {
				var g, h = 15;
				g = a && b ? pb.utils.getMobileImageSizeSlideShow(16) : pb.utils.getWidthForSize(e.page.ListImageSize, 16);
				var i = g.size;
				c = d(a, i, e.page.DsnTemplateType), i = c.width, void 0 != c.container && null != c.container && setTimeout(function() {
					var b = f.find("figure");
					b.each(function() {
						var a = $(this).find(".image"),
							b = $(this).find("figcaption"),
							c = a.data("width"),
							d = a.data("height"),
							e = c / d,
							f = i / e;
						a.width(i), a.height(f), b.width(i), $(this).width(i), $(this).css("display", "block")
					});
					var d = {
						width: i,
						elements: b,
						margin: a ? h : parseInt(e.page.ListImageMargin),
						center: !0,
						resize: !1
					};
					"threecolumns" == e.page.DsnTemplateViewFile && (d.center = !0, (!a || pb.environment.width > 799) && (d.column = 3)), null != c && null != c.container && c.container.dynamicGrid(d), pb.utils.setGalleryMarginTopAndSites(f, a, "0px", "-" + e.page.ListImageMargin)
				}, 10)
			}, f = ["$scope", "$element", function(a, b) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "collectionChange", "galleryItemsChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems", "instagramImageLoaded", "flickrImageLoaded", "siteWidthChange"], function(c) {
					"renderpage" == c || "siteWidthChange" == c ? setTimeout(function() {
						e(a, b)
					}, 10) : e(a, b)
				}, "Dynamic Grid"), pb.utils.onDestroy(a, function() {
					c = null
				}, "Dynamic Grid")
			}];
		return {
			restrict: "A",
			controller: f,
			link: function(a, c, d) {
				void 0 != d.childthumb && "true" == d.childthumb && (b = !0);
				var f = function() {
					setTimeout(function() {
						e(a, c)
					}, 1)
				};
				f(), pb.utils.resizeAndDestroy(a, "galleryDynamicGrid", function() {
					f()
				})
			}
		}
	}],
	galleryEvenRows: [function() {
		var a = pb.environment.isMobile,
			b = {
				1: 200,
				2: 310,
				3: 550,
				4: 700
			}, c = function(c) {
				var d = {
					size: 1,
					count: 1
				};
				return a ? d = pb.utils.getMobileImageSize() : (d.size = b[c], void 0 == d.size && (d.size = 420)), d
			}, d = {}, e = function(b, e) {
				var f = e.find("figure"),
					g = a ? 7.5 : parseInt(b.page.ListImageMargin);
				e.evenRows({
					height: c(b.page.ListImageSize).size,
					elements: f,
					margin: g,
					resize: !1
				});
				var h = [];
				setTimeout(function() {
					e.find("figure").each(function(a) {
						$(this).css("display", "block");
						var c = $(this).find("img"),
							e = $(this).find("figcaption"),
							f = c.width(),
							i = c.height();
						h.push(f), e.width(f), e.css({
							top: g + "px",
							left: g + "px",
							"background-color": "transparent" == b.site.BgBoxColor ? "transparent" : pb.utils.getTransparentColor(b.site.BgBoxColor, .7)
						});
						var j = function() {
							var d = void 0 == b.site.ThumbDecorationBorderWidth ? "0px" : b.site.ThumbDecorationBorderWidth;
							if (d = parseInt(d), e.css("border-width", d + "px"), e.css("border-color", "transparent"), e.css("border-style", "solid"), 0 != d) {
								var f = Math.floor(h[a] - 2 * d);
								c.width(f)
							}
						};
						isAdmin && (d.ThumbDecorationBorderWidth = b.$watch("site.ThumbDecorationBorderWidth", function() {
							j()
						})), setTimeout(function() {
							j()
						}, 1);
						var k = e.height();
						$(this).on("mouseenter", function() {
							var a = parseInt(b.site.ThumbDecorationBorderWidth);
							a = isNaN(a) ? 0 : a, a *= 2, i = $(this).find(".image").height();
							var d = (i - k + a) / 2;
							d > 0 && e.css({
								"padding-top": d + "px",
								visibility: "visible",
								"border-radius": b.site.ThumbDecorationBorderRadius,
								border: "none !important"
							});
							try {
								e.width(c[0].getBoundingClientRect().width)
							} catch (f) {}
							e.height(i - d + a)
						}).on("mouseleave", function() {
							e.css({
								height: "auto",
								visibility: "hidden"
							})
						})
					})
				}, 1), pb.utils.setGalleryMarginTopAndSites(e, a, "0px", "-" + b.page.ListImageMargin)
			}, f = 0,
			g = ["$scope", "$element", function(a, b) {
				null == d && (d = {}), pb.utils.onCreateEvents(a, ["galleryItemsChange", "imageMarginChange", "imageSizeChange", "collectionChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "siteWidthChange", "scrollProductItems"], function(c) {
					"renderpage" == c || "siteWidthChange" == c ? (setTimeout(function() {
						e(a, b)
					}, 10), pb.utils.isWindows() && setTimeout(function() {
						e(a, b)
					}, 100)) : e(a, b)
				}, "Even Rows"), pb.utils.resizeAndDestroy(a, "galleryEvenRows", function() {
					e(a, b)
				}), pb.utils.onDestroy(a, function() {
					pb.utils.onRemoveEventsAndWatchers(d)
				}, "Even Rows")
			}];
		return {
			restrict: "A",
			controller: g,
			link: function(a, b) {
				setTimeout(function() {
					f = b.width(), e(a, b), pb.utils.setInterval(function() {
						return f != b.width() ? (f = b.width(), !0) : void 0
					}, 2e3).done(function() {
						e(a, b)
					})
				}, 1)
			}
		}
	}],
	thumbsSameRatio: [function() {
		var a, b = pb.environment.isMobile,
			c = !1,
			d = function(a, c) {
				var d = 0;
				c.find("figcaption").each(function() {
					$(this).height() > d && (d = $(this).height()), $(this).height(d)
				});
				var e = b ? "7.5px" : a.page.ListImageMargin;
				c.find("figure").css("margin", e), pb.utils.setGalleryMarginTop(c, b, "0px", "-" + a.page.ListImageMargin)
			}, e = function(d, e) {
				var g, h, i = 1.618;
				a = b && c ? pb.utils.getMobileImageSizeSlideShow(24) : pb.utils.getWidthForSize(d.page.ListImageSize, 16), h = Math.floor(a.size), g = h / i, e.find("figure").width(h).find(".imageBox").height(g), f(e)
			}, f = function(a) {
				var b = a.find(".imageBox"),
					c = b.width(),
					d = b.height(),
					e = c / d;
				a.find(".image").each(function() {
					var a = 0,
						b = 0,
						f = $(this).data("width"),
						g = $(this).data("height"),
						h = f / g;
					if (h > e) {
						var i = $(this).attr("src").replace("w400", "h400");
						$(this).attr("src", i), g = d, f = h * g, a = (c - f) / 2
					} else f = c, g = f / h, b = (d - g) / 2;
					$(this).width(f), $(this).height(g), $(this).css({
						top: b + "px",
						left: a + "px"
					})
				})
			}, g = function(c) {
				var d = 0,
					e = c.find("figcaption");
				if (e.css({
					height: "auto"
				}), b) setTimeout(function() {
					pb.utils.setTallestFigcaptionMobile(c, a)
				}, 10);
				else {
					e.each(function() {
						$(this).height() > d && (d = $(this).height())
					});
					var f = c.find(".imageBox").height();
					c.find("figure").height(f + d + 6)
				}
			}, h = function(a, b) {
				d(a, b), e(a, b), g(b);
				var c = b.find("figure");
				c.css("visibility", "visible")
			}, i = ["$scope", "$element", function(a, b) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function(c) {
					"imageMarginChange" == c ? d(a, b) : h(a, b)
				}, "Thumbs Same Ratio")
			}];
		return {
			restrict: "A",
			controller: i,
			link: function(a, b, d) {
				void 0 != d.childthumb && "true" == d.childthumb && (c = !0);
				var e = function() {
					setTimeout(function() {
						h(a, b)
					}, 1)
				};
				e(), pb.utils.resizeAndDestroy(a, "galleryThumbsSameRatio", function() {}), pb.utils.isBrowserSafariWindows() && setTimeout(function() {
					$(".gallery").css("display", "inline")
				}, 10)
			}
		}
	}],
	thumbsOriginalRatio: [function() {
		var a = pb.environment.isMobile,
			b = function(b, c) {
				var d = a ? "7.5px" : b.page.ListImageMargin;
				c.find("figure").css("margin", d), pb.utils.setGalleryMarginTopAndSites(c, a, "0px", "-" + b.page.ListImageMargin)
			}, c = {
				1: 50,
				2: 80,
				3: 200,
				4: 250
			}, d = function(b) {
				var d;
				return a ? d = 120 : (d = c[b], void 0 == d && (d = 120)), d
			}, e = function(b, c) {
				var e = d(b.page.ListImageSize),
					f = 0,
					g = function() {
						c.find(".imageBox").each(function() {
							var a = $(this).height();
							$(this).parent().height(a + f + 6)
						})
					}, h = 0,
					i = 0;
				c.find("figure").each(function() {
					var b = $(this).find("figcaption");
					if (a) $(this).find(".image").css("width", "100%"), $(this).find(".image").css("height", "auto"), b.css("width", "100%");
					else {
						var c = $(this).find(".image").data("width"),
							d = $(this).find(".image").data("height"),
							j = c / d,
							k = e * j,
							l = $(this).find(".image");
						l.width(k), l.height(e), h++, setTimeout(function() {
							b.height() > f && (f = b.height()), i++, h == i && g()
						}, 10), b.width(k)
					}
					$(this).css("display", "block")
				})
			}, f = ["$scope", "$element", function(a, c) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function(d) {
					"imageMarginChange" == d ? b(a, c) : (b(a, c), e(a, c))
				}, "Thumbs Original Ratio")
			}];
		return {
			restrict: "A",
			controller: f,
			link: function(c, d) {
				setTimeout(function() {
					b(c, d), e(c, d), a || setTimeout(function() {
						var a = 0;
						d.find("figcaption").each(function() {
							$(this).height() > a && (a = $(this).height())
						}).each(function() {
							$(this).height(a)
						})
					}, 25)
				}, 1), pb.utils.resizeAndDestroy(c, "galleryThumbsOriginalRatio", function() {})
			}
		}
	}],
	verticalPlain: [function() {
		var a = pb.environment.isMobile,
			b = function(b, c) {
				var d = b.page.ListImageMargin ? 5 * parseInt(b.page.ListImageMargin) : 10;
				a && (d = 15), c.find("figure").css("margin-bottom", d + "px")
			}, c = {
				1: 30,
				2: 50,
				3: 80,
				4: 100
			}, d = function(b, d) {
				var e = 0;
				a ? e = 100 : (e = c[b.page.ListImageSize], void 0 == e && (e = 75)), d.find("figure").width(e + "%"), d.find("figure").each(function() {
					var a = $(this).find("img");
					a.css("width", a.data("width"))
				})
			}, e = ["$scope", "$element", function(a, c) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function(e) {
					"imageMarginChange" == e ? b(a, c) : "imageSizeChange" == e ? d(a, c) : (b(a, c), d(a, c))
				}, "VerticalPlain")
			}];
		return {
			restrict: "A",
			controller: e,
			link: function(a, c) {
				setTimeout(function() {
					b(a, c), d(a, c)
				}, 1)
			}
		}
	}],
	verticaltwoone: [function() {
		var a = !1,
			b = pb.environment.isMobile,
			c = function(a, c) {
				var d = a.page.ListImageMargin ? parseInt(a.page.ListImageMargin) : 10,
					e = a.site.ThumbDecorationBorderWidth ? parseInt(a.site.ThumbDecorationBorderWidth) : 0;
				b && (d = 10);
				var f = 2 * d + e;
				b && (f = 15), c.find("figure").css("margin-bottom", f + "px"), c.find("figure").each(function() {
					var a = $(this).find("figcaption");
					if (a.length) {
						var b = a.height() + f;
						$(this).css("margin-bottom", b)
					}
				})
			}, d = {
				1: 50,
				2: 70,
				3: 90,
				4: 100
			}, e = function(a, c) {
				var e = a.page.ListImageMargin ? parseInt(a.page.ListImageMargin) : 10,
					g = 0;
				b ? g = 100 : (g = d[a.page.ListImageSize], void 0 == g && (g = 80)), c.width(g + "%"), f(c, e)
			}, f = function(c, d) {
				var e = c[0].getBoundingClientRect().width,
					f = [],
					g = 2,
					h = 0,
					i = [];
				e = Math.floor(c.width());
				var j = void 0 == d ? 0 : 2 * d,
					k = j;
				a && (g = 3, k = 2 * j);
				var l = 450,
					m = 0;
				c.find("figure").each(function(a) {
					m++;
					var b = $(this).find("img"),
						c = b.data("width"),
						d = b.data("height"),
						e = c / d,
						j = l * e;
					(a + 1) % (g + 1) == 0 ? (i.push(h), h = 0) : h += j, f.push({
						width: j,
						ratio: e
					})
				}), i.push(h);
				var n = 0;
				if (!b && $(window).width() > 768) {
					for (var o = function() {
						var b = $(c.find("figure")[r]).width() + $(c.find("figure")[r - 1]).width() + (a ? $(c.find("figure")[r - 2]).width() : 0),
							d = 0,
							g = 0,
							h = i[n],
							j = e - k,
							l = f[r - 1].width / h * j,
							m = f[r].width / h * j,
							o = l / f[r - 1].ratio,
							p = m / f[r].ratio,
							q = o > p ? o : p;
						a && (d = f[r - 2].width / h * j, g = d / f[r - 2].ratio, q = g > o ? g : o), $(c.find("figure")[r - 1]).height(q).find("img").height(q), $(c.find("figure")[r]).height(q).find("img").height(q), a && $(c.find("figure")[r - 2]).height(q).find("img").height(q);
						var s = j - b;
						if (0 != s) {
							var t = Math.floor(s + m);
							$(c.find("figure")[r]).width(t).find("img").width(t)
						}
					}, p = f.length, q = 0, r = 0; p > r; r++) {
						if ((r + 1) % (g + 1) == 0) n++, q = 0;
						else {
							var s = f[r].width / i[n] * (e - k);
							$(c.find("figure")[r]).width(Math.floor(s)), q++, q == g && o()
						}
						if (a && r == p - 1) if (f[r].width + f[r - 1].width == i[n]) {
							if (l = 0, $(c.find("figure")[r - 1]).find("img").data("height") > $(c.find("figure")[r]).find("img").data("height")) {
								l = s / f[r].ratio;
								var t = $(c.find("figure")[r]).find("img").data("height"),
									s = $(c.find("figure")[r]).find("img").data("width"),
									u = s / t * l;
								$(c.find("figure")[r]).width(u)
							} else {
								l = s / f[r].ratio;
								var t = $(c.find("figure")[r - 1]).find("img").data("height"),
									s = $(c.find("figure")[r - 1]).find("img").data("width"),
									u = s / t * l;
								$(c.find("figure")[r - 1]).width(u)
							}
							$(c.find("figure")[r - 1]).width(.75 * $(c.find("figure")[r - 1]).width()), $(c.find("figure")[r]).width(.75 * $(c.find("figure")[r]).width())
						} else f[r].width == i[n] && $(c.find("figure")[r]).width("");
						else f[r].width == i[n] && $(c.find("figure")[r]).width("")
					}
					a ? (c.find("figure:nth-child(4n-1)").css({
						"margin-left": j
					}), c.find("figure:nth-child(4n-2)").css({
						"margin-left": j
					})) : c.find("figure:nth-child(3n-1)").css({
						"margin-left": j
					}), e = Math.ceil(c.width()), c.width(e)
				} else for (var r = 0; r < f.length; r++) $(c.find("figure")[r]).width("")
			}, g = ["$scope", "$element", function(b, d) {
				"verticalthreeone" == b.page.DsnTemplateViewFile && (a = !0), pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems", "siteWidthChange", "changeImageBorderWidth"], function(a) {
					if ("imageMarginChange" == a) {
						var g = b.page.ListImageMargin ? parseInt(b.page.ListImageMargin) : 10;
						c(b, d), f(d, g)
					} else "imageSizeChange" == a ? e(b, d) : "siteWidthChange" == a ? setTimeout(function() {
						c(b, d), e(b, d)
					}, 10) : "changeImageBorderWidth" == a ? c(b, d) : (c(b, d), e(b, d))
				}, "Vertical Two One & Three One"), pb.utils.resizeAndDestroy(b, "verticalTwoOneAndThreeOne", function() {
					setTimeout(function() {
						c(b, d), e(b, d)
					}, 50)
				})
			}];
		return {
			restrict: "A",
			controller: g,
			link: function(a, b) {
				setTimeout(function() {
					c(a, b), e(a, b)
				}, 1)
			}
		}
	}],
	verticaltwothree: [function() {
		var a = pb.environment.isMobile || $(window).width() < 769,
			b = function(b, d) {
				var e = b.page.ListImageMargin ? parseInt(b.page.ListImageMargin) : 10;
				a && (e = 10);
				var f = 2 * e;
				a && (f = 15), d.find("figure").css("margin-bottom", f + "px");
				var g = setInterval(function() {
					c(b, d)
				}, 1);
				setTimeout(function() {
					clearInterval(g)
				}, 100)
			}, c = function(a, b) {
				for (var c = b.find("figure"), d = 0, e = 0; e < c.length; e++) {
					switch (d) {
						case 0:
							break;
						case 1:
							var f = $(c[e - 1]).height(),
								g = $(c[e]).height(),
								h = f > g ? f : g;
							$(c[e]).height(h), $(c[e - 1]).height(h);
							break;
						case 2:
							break;
						case 3:
							var f = $(c[e - 1]).height(),
								g = $(c[e]).height(),
								h = f > g ? f : g;
							$(c[e]).height(h), $(c[e - 1]).height(h);
							break;
						case 4:
							var f = $(c[e - 2]).height(),
								g = $(c[e - 1]).height(),
								i = $(c[e]).height(),
								h = f > g ? f : g;
							h = h > i ? h : i, $(c[e]).height(h), $(c[e - 1]).height(h), $(c[e - 2]).height(h)
					}
					d++, d = 5 == d ? 0 : d
				}
			}, d = {
				1: 50,
				2: 70,
				3: 90,
				4: 100
			}, e = function(b, c) {
				var e = b.page.ListImageMargin ? parseInt(b.page.ListImageMargin) : 10,
					g = 0;
				a ? g = 100 : (g = d[b.page.ListImageSize], void 0 == g && (g = 80)), c.width(g + "%"), f(c, e)
			}, f = function(b, c) {
				var d = b[0].getBoundingClientRect().width,
					e = [],
					f = 0,
					g = [];
				d = Math.floor(b.width());
				for (var h = void 0 == c ? 0 : 2 * c, i = h, j = 450, k = 0, l = 0, m = b.find("figure"), n = 0; n < m.length; n++) {
					k++;
					var o = $(m[n]).find("img"),
						p = o.data("width"),
						q = o.data("height"),
						r = p / q,
						s = j * r;
					switch (l) {
						case 0:
							f += s;
							break;
						case 1:
							f += s, g.push(f), f = 0;
							break;
						case 2:
							f += s, n === m.length - 1 && g.push(f);
							break;
						case 3:
							f += s, n === m.length - 1 && g.push(f);
							break;
						case 4:
							f += s, g.push(f), f = 0
					}
					l++, l = 5 == l ? 0 : l, e.push({
						width: s,
						ratio: r
					})
				}
				if (!a && $(window).width() > 768) {
					var t = e.length,
						u = 0;
					l = 0;
					for (var v = 0, w = 0, x = 0; t > x; x++) {
						switch ($(b.find("figure")[x]).height(""), $(b.find("figure")[x]).find(".imageBox").height(""), l) {
							case 0:
								x != t - 1 ? (u = e[x].width / g[v] * (d - i), $(b.find("figure")[x]).css("margin-right", i + "px"), $(b.find("figure")[x]).width(Math.floor(u))) : (u = d / 2, $(b.find("figure")[x]).width(Math.floor(u))), w = u / e[x].ratio, $(b.find("figure")[x]).find(".imageBox").height(Math.floor(w));
								break;
							case 1:
								u = e[x].width / g[v] * (d - i), $(b.find("figure")[x]).width(Math.floor(u)), w = u / e[x].ratio, $(b.find("figure")[x]).find(".imageBox").height(Math.floor(w)), v++;
								break;
							case 2:
								x !== t - 1 ? (u = x !== t - 2 ? e[x].width / g[v] * (d - i - i) : e[x].width / g[v] * (d - i), $(b.find("figure")[x]).width(Math.floor(u)), $(b.find("figure")[x]).css("margin-right", i + "px")) : (u = d / 3, $(b.find("figure")[x]).width(Math.floor(u))), w = u / e[x].ratio, $(b.find("figure")[x]).find(".imageBox").height(Math.floor(w));
								break;
							case 3:
								x !== t - 1 ? (u = e[x].width / g[v] * (d - i - i), $(b.find("figure")[x]).width(Math.floor(u)), $(b.find("figure")[x]).css("margin-right", i + "px")) : (u = e[x].width / g[v] * (d - i), $(b.find("figure")[x]).width(Math.floor(u))), w = u / e[x].ratio, $(b.find("figure")[x]).find(".imageBox").height(Math.floor(w));
								break;
							case 4:
								u = e[x].width / g[v] * (d - i - i), $(b.find("figure")[x]).width(Math.floor(u)), w = u / e[x].ratio, $(b.find("figure")[x]).find(".imageBox").height(Math.floor(w)), v++
						}
						l++, l = 5 === l ? 0 : l
					}
					d = Math.ceil(b.width()), b.width(d)
				} else for (var x = 0; x < e.length; x++) $(b.find("figure")[x]).width("")
			}, g = function(a, b) {
				console.log("Mobile");
				var c = b.find("figure"),
					d = a.page.ListImageMargin ? parseInt(a.page.ListImageMargin) : 10;
				c.css("margin-bottom", d + "px")
			}, h = ["$scope", "$element", function(c, d) {
				a ? g(c, d) : (pb.utils.onCreateEvents(c, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems", "siteWidthChange"], function(a) {
					if ("imageMarginChange" == a) {
						var g = c.page.ListImageMargin ? parseInt(c.page.ListImageMargin) : 10;
						b(c, d), f(d, g)
					} else "imageSizeChange" == a ? e(c, d) : "siteWidthChange" == a ? setTimeout(function() {
						b(c, d), e(c, d)
					}, 10) : (b(c, d), e(c, d))
				}, "Vertical Two One & Three One"), pb.utils.resizeAndDestroy(c, "verticalTwoThree", function() {
					setTimeout(function() {
						b(c, d), e(c, d)
					}, 50)
				}))
			}];
		return {
			restrict: "A",
			controller: h,
			link: function(c, d) {
				setTimeout(function() {
					a ? g(c, d) : (e(c, d), b(c, d))
				}, 1)
			}
		}
	}],
	thumbsSquareRatio: [function() {
		var a, b = pb.environment.isMobile,
			c = function(b, c) {
				var d = c.find(".imageBox");
				a = pb.utils.getWidthForSize(b.page.ListImageSize, 16);
				var e = a.size,
					f = a.size,
					g = 1;
				d.width(e), d.height(f), c.find(".image").each(function() {
					var a = 0,
						b = 0,
						c = $(this).data("width"),
						d = $(this).data("height"),
						h = c / d;
					if (h > g) {
						d = f, c = h * d, a = (e - c) / 2;
						var i = $(this).attr("src").replace("w400", "h400");
						$(this).attr("src", i)
					} else c = e, d = c / h, b = (f - d) / 2;
					$(this).width(c), $(this).height(d), $(this).css({
						top: b + "px",
						left: a + "px"
					})
				})
			}, d = function(a, c) {
				var d = b ? "7.5px" : a.page.ListImageMargin;
				c.find("figure").css("margin", d), pb.utils.setGalleryMarginTop(c, b, "0px", "-" + a.page.ListImageMargin)
			}, e = function(d, e) {
				var f, g;
				if (a = pb.utils.getWidthForSize(d.page.ListImageSize, 16), g = a.size, f = a.size, e.find("figure").width(g).find(".imageBox").height(f), b) pb.utils.setTallestFigcaptionMobile(e, a), e.find("figure").css({
					display: "block"
				});
				else {
					var h = function() {
						var a = f + i + 6;
						0 == i && (a = f), e.find("figure").css({
							display: "block",
							height: a
						})
					}, i = 0,
						j = 0,
						k = 0;
					e.find("figcaption").each(function() {
						j++;
						var a = $(this);
						setTimeout(function() {
							var b = a.height();
							b > i && (i = b), k++, j == k && h()
						}, 10)
					}), h()
				}
				c(d, e)
			}, f = ["$scope", "$element", function(a, b) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function(c) {
					"imageMarginChange" == c ? d(a, b) : "imageSizeChange" == c ? e(a, b) : (d(a, b), e(a, b))
				}, "Thumbs Square Ratio")
			}];
		return {
			restrict: "A",
			controller: f,
			link: function(a, b) {
				var c = function() {
					setTimeout(function() {
						d(a, b), e(a, b)
					}, 1)
				};
				c(), pb.utils.resizeAndDestroy(a, "galleryThumbsSquareRatio", function() {})
			}
		}
	}],
	mainBgImage: [function() {
		var a = function(a, b) {
			return a.page.MainImage ? void(1 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "cover",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			}) : 2 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "contain",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			}) : 3 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "initial",
				"background-attachment": "scroll",
				"background-position": "initial",
				"background-repeat": "repeat"
			}) : 4 == a.page.MainImage.BgMode && b.find("#backgroundImage").css({
				"background-size": "auto",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			})) : !1
		}, b = ["$scope", "$element", function(b, c) {
			var d = b.page.MainImage && b.page.MainImage.FileName ? pb.utils.isSupportedVideoFormat(b.page.MainImage.FileName) : !1,
				e = {}, f = function() {
					d = b.page.MainImage && b.page.MainImage.FileName ? pb.utils.isSupportedVideoFormat(b.page.MainImage.FileName) : !1, void 0 != b.page.MainImage && (b.page.MainImage.FilePath ? d || c.find("#backgroundImage").css({
						"background-image": "url(" + b.page.MainImage.FilePath + ")",
						"background-position": "center center",
						"background-attachment": "cover",
						"background-repeat": "no-repeat"
					}) : d || c.find("#backgroundImage").css({
						"background-image": "none",
						"background-position": "center center",
						"background-attachment": "scroll",
						"background-repeat": "no-repeat"
					}))
				};
			isAdmin && (e.BgMode = b.$watch("page.MainImage.BgMode", function(e, f) {
				e != f && (d || a(b, c))
			}), e.FilePath = b.$watch("page.MainImage.FilePath", function(a, b) {
				a != b && f()
			})), setTimeout(function() {
				f(), d || a(b, c)
			}, 1), pb.utils.onDestroy(b, function() {
				pb.utils.onRemoveEventsAndWatchers(e)
			}, "MainBg Image")
		}];
		return {
			restrict: "A",
			controller: b
		}
	}],
	horizontalNative: [function() {
		var a = "",
			b = pb.environment.isMobile,
			c = {}, d = function(a, d) {
				a.page.ListImageMargin = null == a.page.ListImageMargin ? 0 : a.page.ListImageMargin;
				var e = b && parseInt(a.page.ListImageMargin) > 15 ? 15 : a.page.ListImageMargin;
				$(".descriptionContainer").css("padding-right", e), d.find("figure .imageBox").css("margin-right", e), d.find("figure figcaption").css("margin-right", e);
				var f = function() {
					var b = "0px";
					1 == a.site.ThumbDecorationHasShadow && (b = "20px"), d.find(".imageBox:first").css({
						"margin-left": b
					}), d.find("figcaption:first").css({
						"margin-left": b
					})
				};
				isAdmin && (c.ThumbDecorationHasShadow = a.$watch("site.ThumbDecorationHasShadow", function() {
					f()
				})), setTimeout(function() {
					f()
				}, 1)
			}, e = {
				1: .3,
				2: .5,
				3: .82,
				4: .88
			}, f = function(a) {
				var c;
				if (b) {
					var d = pb.environment.height;
					c = 300 > d ? .7 : 420 > d ? .82 : .88
				} else c = e[a], void 0 == c && (c = .7);
				return c
			}, g = function(a, b, c) {
				var d = f(a.page.ListImageSize),
					e = 20,
					g = $(window).height(),
					h = (g - c - e) * d;
				h = 100 > h ? 100 : Math.round(h), b.find("figure").each(function() {
					var a = $(this).find("img"),
						b = a.data("height"),
						c = a.data("width"),
						d = b / c,
						e = Math.round(h / d);
					a.css({
						height: h,
						width: e
					})
				});
				var i = $(".horizontalContainer");
				i.css({
					height: "auto"
				}), $(".descriptionContainer .description").css({
					height: b.find(".imageBox").height()
				})
			}, h = function(a) {
				var b = $(".horizontalContainer");
				pb.utils.setInterval(function() {
					return b = $(".horizontalContainer"), b.length > 0 ? !0 : void 0
				}, 1, 1e3, {
					scope: a
				}).done(function() {
					pb.utils.isMobile() || pb.utils.isTablet() || (b.mCustomScrollbar("destroy"), b.mCustomScrollbar({
						axis: "x",
						advanced: {
							autoExpandHorizontalScroll: !0,
							updateOnBrowserResize: !0
						},
						scrollInertia: 0,
						autoHideScrollbar: !0
					}));
					var a = b.find(".description");
					a.length > 0 && (a.mCustomScrollbar("destroy"), a.mCustomScrollbar({
						axis: "y",
						advanced: {
							autoExpandHorizontalScroll: !0,
							updateOnBrowserResize: !0
						},
						scrollInertia: 0,
						autoHideScrollbar: !0
					}))
				})
			}, i = ["$scope", "$element", function(b, e) {
				null == c && (c = {}), pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "scrollGalleryItems", "renderpage", "collectionChange", "productChange", "scrollCollectionItems", "scrollProductItems"], function(c) {
					"imageMarginChange" == c ? d(b, e) : "imageSizeChange" == c || "scrollCollectionItems" == c ? g(b, e, a) : (g(b, e, a), d(b, e)), h(b)
				}, "Horizontal Native"), pb.utils.resizeAndDestroy(b, "galleryHorizontalNative", function() {
					g(b, e, a), d(b, e)
				}), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(c)
				}, "Horizontal Native")
			}];
		return {
			restrict: "A",
			controller: i,
			link: function(b, c) {
				setTimeout(function() {
					pb.utils.getMenuHeight(function(e) {
						a = e, g(b, c, a), d(b, c)
					}), h(b)
				}, 1)
			}
		}
	}],
	horizontalStyled: [function() {
		var a = pb.environment.isMobile,
			b = "",
			c = function(b, c) {
				b.page.ListImageMargin = null == b.page.ListImageMargin ? 0 : b.page.ListImageMargin;
				var d = a && parseInt(b.page.ListImageMargin) > 15 ? 15 : b.page.ListImageMargin;
				c.find("figure .imageBox").css("margin-right", d)
			}, d = {
				1: .3,
				2: .5,
				3: .78,
				4: .82
			}, e = function(b) {
				var c;
				if (a) {
					var e = pb.environment.height;
					c = 300 > e ? .7 : 420 > e ? .78 : .82
				} else c = d[b], void 0 == c && (c = .7);
				return c
			}, f = function(a, b, c) {
				var d = e(a.page.ListImageSize),
					f = 20,
					g = $(window).height();
				b.find("figure").each(function() {
					var a = $(this).find("img"),
						b = a.data("height"),
						e = a.data("width"),
						h = b / e,
						i = (g - c - f) * d;
					i = 100 > i ? 100 : Math.round(i);
					var j = Math.round(i / h);
					a.css({
						height: i,
						width: j
					}), $(this).find("figcaption").css({
						width: j
					})
				})
			}, g = function(a) {
				pb.utils.isMobile() || pb.utils.isTablet() || (a.mCustomScrollbar("destroy"), a.mCustomScrollbar({
					axis: "x",
					advanced: {
						autoExpandHorizontalScroll: !0,
						updateOnBrowserResize: !0
					},
					scrollInertia: 0
				}))
			}, h = ["$scope", "$element", function(a, d) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "scrollCollectionItems", "siteWidthChange"], function(e) {
					"imageMarginChange" == e ? c(a, d) : "imageSizeChange" == e ? f(a, d, b) : "siteWidthChange" == e ? setTimeout(function() {
						f(a, d, b), c(a, d)
					}, 10) : (f(a, d, b), c(a, d)), g(d)
				}, "Horizontal Styled"), pb.utils.resizeAndDestroy(a, "galleryHorizontalStyled", function() {
					f(a, d, b), c(a, d)
				}), pb.utils.onDestroy(a, function() {
					d.mCustomScrollbar("destroy")
				}, "Horizontal Styled")
			}];
		return {
			restrict: "A",
			controller: h,
			link: function(a, d) {
				setTimeout(function() {
					pb.utils.getMenuHeight(function(e) {
						b = e, f(a, d, b), c(a, d), g(d)
					})
				}, 1)
			}
		}
	}]
};
pbAng.dirs.frontViews.blogs = {
	evenRows: [function() {
		var a = function(a, b) {
			var c = b.find("figure"),
				d = 10;
			b.evenRows({
				height: 300,
				elements: c,
				margin: d
			}), b.css({
				position: "relative",
				top: "",
				left: ""
			});
			var e = [];
			b.find("figure").each(function() {
				$(this).css("display", "block");
				var b = $(this).find("img"),
					c = $(this).find("figcaption"),
					f = b.width(),
					g = b.height();
				e.push(f), c.width(f), c.css({
					top: d + "px",
					left: d + "px",
					background: a.site.BgBoxColor
				});
				var h = c.height();
				$(this).on("mouseenter", function() {
					var a = (g - h) / 2;
					a > 0 && c.css({
						"padding-top": a + "px",
						visibility: "visible",
						border: "none !important"
					}), c.height(g - a)
				}).on("mouseleave", function() {
					c.css({
						height: "auto",
						visibility: "hidden"
					})
				})
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.resizeAndDestroy(b, "blogEvenRows", function() {
				a(b, c)
			}), pb.utils.onCreateEvents(b, ["blogGalleryItemsUpdate", "blogGalleryItemsChange", "changeBlogTemplate", "siteWidthChange"], function(d) {
				"siteWidthChange" == d ? setTimeout(function() {
					a(b, c)
				}, 10) : a(b, c)
			}, "Blog Even Rows");
			var d = pb.constants.minImgDisplay,
				e = pb.constants.maxImgDisplay;
			b.infScrollSettings = {
				noInfScroll: !1,
				totalDisplayed: d,
				scrolltoleft: !1,
				loadMoreCond: function() {
					setTimeout(function() {
						b.base.broadCast("blogGalleryItemsChange")
					}, 1)
				},
				items: b.currentPost.BlogGalleryItems
			}, setTimeout(function() {
				void 0 != b.currentPost.BlogGalleryItems && (e = b.currentPost.BlogGalleryItems.length)
			}, 1), setTimeout(function() {
				b.base.broadCast("blogGalleryItemsChange")
			}, 10)
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	horizontalStyled: ["$timeout", "$window", function(a) {
		var b = function(a, b) {
			var c = .7,
				d = 0;
			b.find("figure figcaption").each(function() {
				d = $(this).height() > d ? $(this).height() : d
			}), d += 25, b.find("figure").each(function() {
				var a = $(this).find("img"),
					b = a.data("height"),
					e = a.data("width"),
					f = b / e,
					g = $(window).height() * c;
				g = 100 > g ? 100 : g;
				var h = g / f;
				a.css({
					height: g,
					width: h
				}), $(this).find("figcaption").css({
					width: h,
					height: d
				})
			})
		};
		return {
			restrict: "A",
			link: function(c, d) {
				var e = null,
					f = function() {
						d.mCustomScrollbar("destroy"), e = a(function() {
							d.mCustomScrollbar({
								axis: "x",
								advanced: {
									autoExpandHorizontalScroll: !0,
									updateOnBrowserResize: !0
								},
								scrollInertia: 0,
								mouseWheel: {
									invert: !0
								}
							})
						})
					}, g = a(function() {
						pb.utils.resizeAndDestroy(c, "blogHorizontalStyled", function() {
							b(c, d)
						}), b(c, d), f(d)
					});
				pb.utils.onCreateEvents(c, ["blogGalleryItemsChange", "changeBlogTemplate"], function() {
					b(c, d), f(d)
				}, "Blog Horizontal Styled"), pb.utils.onDestroy(c, function() {
					d.mCustomScrollbar("destroy"), null != g && a.cancel(g), null != e && a.cancel(e)
				}, "Blog Horizontal Styled")
			}
		}
	}],
	rowsAndVertical: [function() {
		var a, b = pb.utils.isMobile(),
			c = ["$scope", "$element", function(c, d) {
				c.fixBlogPostImages = function(c) {
					c = c ? c : 2, setTimeout(function() {
						$(".post").removeClass("full").css("margin-left", 0), a = c;
						var e = 0,
							f = [],
							g = 20,
							h = 0,
							i = [],
							j = 450,
							k = $(".blogList").width() - 1;
						d.find(".post").each(function(a) {
							e++;
							var d = $(this).find("img"),
								g = d.data("width") / d.data("height"),
								k = Math.ceil(j * g);
							(a + 1) % (c + 1) == 0 ? (i.push(h), h = 0, $(this).hasClass("full") || b || $(this).addClass("full")) : h += k, f.push({
								width: k,
								ratio: g
							})
						}), i.push(h);
						for (var l = 0, m = 0; m < f.length; m++) if ((m + 1) % (c + 1) == 0) l++, $(d.find(".post")[m]).has(".noImg").height(300);
						else {
							var n = f[m].width / i[l] * (k - g);
							$(d.find(".post")[m]).width(n), $(d.find(".post")[m]).has(".noImg").height(pb.environment.isMobile ? 300 : n)
						}
						for (var o = 1; c > o; o++) d.find(".post:nth-child(" + (c + 1) + "n-" + o + ")").css({
							"margin-left": g / (c - 1)
						});
						d.find(".post").css("margin-bottom", g / (c - 1))
					}, 1)
				}
			}];
		return {
			restrict: "A",
			controller: c,
			link: function(b) {
				pb.utils.resizeAndDestroy(b, "blogRowsAndVerticals", function() {
					b.fixBlogPostImages(a)
				}), b.$on("BlogPostsChange", function() {
					b.fixBlogPostImages(a)
				});
				var c = $(".blogList").width();
				pb.utils.setInterval(function() {
					return $(".blogList").width() < c ? !0 : void 0
				}, 10, 1e3).done(function() {
					b.fixBlogPostImages(a)
				})
			}
		}
	}]
}, pbAng.dirs.frontViews.collections = {
	dynamicGrid: const_frontViews.dynamicGrid,
	threeColumns: const_frontViews.dynamicGrid,
	thumbsSameRatio: const_frontViews.thumbsSameRatio,
	thumbsOriginalRatio: const_frontViews.thumbsOriginalRatio,
	thumbsSquareRatio: const_frontViews.thumbsSquareRatio,
	thumbsFilter: ["$compile", function(a) {
		var b = ["$scope", "$element", function(b, c) {
			b.thumbsFilter = {}, b.thumbsFilter.openPage = function(d) {
				$(".filterMenuElement").css("color", b.site.MenuFontColor), $("#select_" + d.PageGuid).css("color", b.site.ActiveMenuFontColor);
				var e = "thumbs",
					f = c.find("#partContainer");
				return f.html(""), f.html(a("<page-part-loader page-guid='" + d.PageGuid + "' base='base' site='site' page='page' type='" + e + "'></page-part-loader>")(b)), !1
			}
		}];
		return {
			restrict: "A",
			controller: b
		}
	}],
	thumbsEvenRows: const_frontViews.galleryEvenRows,
	verticalPlain: const_frontViews.verticalPlain,
	verticalTwoOne: const_frontViews.verticaltwoone,
	verticalTwoThree: const_frontViews.verticaltwothree,
	verticalThreeOne: const_frontViews.verticaltwoone,
	horizontalNative: const_frontViews.horizontalNative,
	horizontalStyled: const_frontViews.horizontalStyled
}, pbAng.dirs.frontViews.galleries = {
	dynamicGrid: const_frontViews.dynamicGrid,
	threeColumns: const_frontViews.dynamicGrid,
	galleryEvenRows: const_frontViews.galleryEvenRows,
	thumbsSameRatio: const_frontViews.thumbsSameRatio,
	thumbsOriginalRatio: const_frontViews.thumbsOriginalRatio,
	verticalPlain: const_frontViews.verticalPlain,
	verticalTwoOne: const_frontViews.verticaltwoone,
	verticalThreeOne: const_frontViews.verticaltwoone,
	verticalTwoThree: const_frontViews.verticaltwothree,
	thumbsSquareRatio: const_frontViews.thumbsSquareRatio,
	horizontalStyled: const_frontViews.horizontalStyled,
	slideShowThumbs03: [function() {
		var a = function(a, b) {
			var c = 54;
			b.find("figure").each(function() {
				var a = $(this).find(".image"),
					b = a.data("height"),
					d = a.data("width"),
					e = d / b,
					f = e * c;
				a.width(f)
			}), b.mCustomScrollbar("destroy"), b.mCustomScrollbar({
				axis: "x",
				advanced: {
					autoExpandHorizontalScroll: !0,
					updateOnBrowserResize: !0
				},
				scrollInertia: 0
			}), pb.utils.onDestroy(a, function() {
				b.mCustomScrollbar("destroy")
			}, "Slide Show Thumbs 03")
		};
		return {
			restrict: "A",
			link: function(b, c) {
				c.on("click", "figure", function() {
					c.find("figure").removeClass("selectedImg"), $(this).addClass("selectedImg")
				}), setTimeout(function() {
					c.find("figure").first().addClass("selectedImg"), a(b, c)
				}, 1)
			}
		}
	}],
	slideShowThumbs04: [function() {
		var a = "",
			b = function(a) {
				a.mCustomScrollbar("destroy"), a.mCustomScrollbar({
					axis: pb.environment.isMobile ? "x" : "y",
					advanced: {
						autoExpandHorizontalScroll: !0,
						updateOnBrowserResize: !0
					},
					scrollInertia: 0
				})
			}, c = function() {
				var b = $(window).height(),
					c = b / 100 * 90 - a - 50,
					d = $(".right .gallery");
				d.css({
					height: c
				})
			}, d = ["$scope", "$element", function(a, b) {
				pb.utils.resizeAndDestroy(a, "gallerySlideShowThumbs04", function() {
					c(a, b)
				})
			}];
		return {
			restrict: "A",
			controller: d,
			link: function(d, e) {
				e.on("click", "figure", function() {
					e.find("figure").removeClass("selectedImg"), $(this).addClass("selectedImg")
				}), setTimeout(function() {
					pb.utils.getMenuHeight(function(f) {
						a = f, c(d, e), e.find("figure").first().addClass("selectedImg"), b(e)
					})
				}, 1), pb.utils.onDestroy(d, function() {
					e.mCustomScrollbar("destroy")
				}, "Slide Show Thumbs 04")
			}
		}
	}],
	slideshowAndHorizontal: [function() {
		var a = function(a) {
			var b = 95;
			a.find("figure").each(function() {
				var a = $(this).find(".image"),
					c = a.data("height"),
					d = a.data("width"),
					e = d / c,
					f = e * b;
				a.width(f)
			}), a.mCustomScrollbar("destroy"), a.mCustomScrollbar({
				axis: "x",
				advanced: {
					autoExpandHorizontalScroll: !0,
					updateOnBrowserResize: !0
				},
				scrollInertia: 0
			})
		};
		return {
			restrict: "A",
			link: function(b, c) {
				setTimeout(function() {
					c.find("figure").first().addClass("selectedImg"), a(c)
				}, 1), c.on("click", "figure", function() {
					c.find("figure").removeClass("selectedImg"), $(this).addClass("selectedImg")
				}), pb.utils.onDestroy(b, function() {
					c.mCustomScrollbar("destroy"), c.off("click")
				}, "Slideshow And Horizontal")
			}
		}
	}],
	horizontalNative: const_frontViews.horizontalNative,
	horizontalThumbs: [function() {
		var a, b, c = pb.environment.isMobile,
			d = 0,
			e = {}, f = function(a, c) {
				c.find("figure").css("margin", b)
			}, g = {
				1: .3,
				2: .5,
				3: .85,
				4: .9
			}, h = function(a) {
				var d;
				if (c) {
					var e = pb.environment.width;
					e >= 800 ? (d = .85, b = "7.5px") : e >= 1024 && (d = .9, b = "7.5px"), 300 > e ? (d = .5, b = "4.5px") : (d = .7, b = "4.5px")
				} else d = g[a], void 0 == d && (d = .7);
				return d
			}, i = function(a, c, f) {
				var g = c.find(".gallery");
				g.hide(), d = 0;
				var i = h(a.page.ListImageSize),
					j = ($(window).height() - f - parseInt(b)) * i;
				j = 100 > j ? 100 : j, j = j / 3 - 10;
				var k = 0;
				c.find("figure").each(function() {
					$(this).css("display", "block");
					var c = $(this).find("img"),
						f = c.data("height"),
						g = c.data("width"),
						h = f / g,
						i = j / h,
						l = i + 2 * parseInt(b);
					l > k && (k = l), d += l, c.css({
						height: j,
						width: i
					}), $(this).find("figcaption").css({
						width: i
					});
					var m = $(this).find("figcaption");
					m.width(i), m.height(j), m.css({
						"padding-top": 0,
						background: a.site.BgBoxColor,
						"line-height": j + "px"
					});
					var n = function() {
						var b = void 0 == a.site.ThumbDecorationBorderWidth ? "0px" : a.site.ThumbDecorationBorderWidth;
						b = parseInt(b), 0 != b && (m.css("border-width", b + "px"), m.css("border-color", "transparent"), m.css("border-style", "solid"))
					};
					isAdmin && (e.ThumbDecorationBorderWidth = a.$watch("site.ThumbDecorationBorderWidth", function() {
						n()
					})), setTimeout(function() {
						n()
					}, 1), $(this).on("mouseenter", function() {
						m.fadeIn()
					}).on("mouseleave", function() {
						m.fadeOut()
					})
				});
				var l = c.find(".gallery"),
					m = d / 3 + k;
				l.width(m < c.width() ? c.width() : m), g.show()
			}, j = function(a) {
				a.mCustomScrollbar("destroy"), a.mCustomScrollbar({
					axis: "x",
					advanced: {
						autoExpandHorizontalScroll: !0,
						updateOnBrowserResize: !0
					},
					scrollInertia: 0
				})
			}, k = ["$scope", "$element", function(b, c) {
				null == e && (e = {});
				var d = function() {
					c.find("figcaption").css({
						background: b.site.BgBoxColor
					})
				};
				isAdmin && (e.BgBoxColor = b.$watch("site.BgBoxColor", function() {
					d()
				})), setTimeout(function() {
					d()
				}, 1), pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "siteWidthChange"], function(d) {
					"imageMarginChange" == d ? f(b, c) : "imageSizeChange" == d ? i(b, c, a) : "siteWidthChange" == d ? setTimeout(function() {
						i(b, c), f(b, c)
					}, 10) : (i(b, c, a), f(b, c)), j(c)
				}, "Horizontal Thumbs"), pb.utils.resizeAndDestroy(b, "galleryHorizontalThumbs", function() {
					i(b, c, a), f(b, c)
				}), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(e), c.mCustomScrollbar("destroy")
				}, "Horizontal Thumbs")
			}];
		return {
			restrict: "A",
			controller: k,
			link: function(d, e) {
				c || (b = d.page.ListImageMargin), setTimeout(function() {
					pb.utils.getMenuHeight(function(b) {
						a = b, i(d, e, a), f(d, e), j(e)
					})
				}, 1)
			}
		}
	}],
	parallax01: [function() {
		return {
			restrict: "AE",
			link: function(a, b) {
				a.page && a.page.Slideshow && "contain" == a.page.Slideshow.BgSize && b.addClass("bgModeContain");
				var c = pb.environment.height;
				$(".parallax").find(".description").height(c);
				var d = function() {
					c = pb.environment.height;
					var a = $(".parallax");
					a.find(".description").height(c);
					var b = a.find(".gallery").find(".section");
					$.each(b, function() {
						$(this).height(c)
					})
				};
				pb.utils.resizeAndDestroy(a, "galleryParallax01", function() {
					d()
				}), a.getFixedBackgroundClass = function() {
					return pb.utils.isTablet() ? null : "fixed-background"
				}, a.parallax01 = {
					currentUrl: "",
					isVideo: !1,
					setHeightForCurrentElement: function(b) {
						var d = "";
						if (b.VideoUrl) d = b.VideoThumbUrl, a.parallax01.isVideo = !0;
						else {
							a.parallax01.isVideo = !1;
							var e = b.FileName,
								f = b.S3LocationId,
								g = void 0,
								h = {
									switchThumbDependingOnScreenSize: function(a) {
										return -1 == pb.data.site.ImageQuality ? void 0 == a ? pb.environment.width < 401 ? a = "w400" : pb.environment.width < 1001 && (a = "w1000") : "w1000" == a && pb.environment.width < 401 ? a = "w400" : "h800" == a && pb.environment.height < 401 && (a = "h400") : 1 == pb.data.site.ImageQuality && ("w400" == a ? a = "w1000" : "h400" == a ? a = "h800" : "w1000" == a ? a = void 0 : "h800" == a && (a = void 0)), a
									},
									handlePboxImg: function(a, b, c) {
										var d = pb.constants.getS3PathById(b),
											e = d + "/" + pb.data.site.Id + "/page/";
										return c = h.switchThumbDependingOnScreenSize(c), void 0 == c ? e + a : e + c + "-" + a
									},
									handleFlickrImg: function(a, b, c) {
										c = h.switchThumbDependingOnScreenSize(c);
										var d = a.sizes ? a.sizes : "",
											e = pb.utils.convertThumbTypeToFlickrAppendix(c, d);
										return pb.utils.getFlickrPhotoUrl(a, e)
									},
									handleFindCreatives: function(a, b) {
										return b = h.switchThumbDependingOnScreenSize(b), pb.utils.getFindCreativeImageUrl(a, b)
									},
									handleDummy: function(a, b) {
										return b = h.switchThumbDependingOnScreenSize(b), pb.utils.getDummyImageUrl(a, b)
									}
								};
							if (e && "{" != e.charAt(0)) d = h.handlePboxImg(e, f, g);
							else if (e) {
								var i = JSON.parse(e);
								d = i.dummy ? h.handleDummy(i, g) : i.creativeGuid ? h.handleFindCreatives(i, g) : h.handleFlickrImg(i, f, g)
							}
						}
						a.parallax01.currentUrl = d, c = pb.environment.height, setTimeout(function() {
							var a = $("#id_" + b.Idx).find(".section");
							a.height(c), b.VideoUrl && a.wrap("<div class='videoItem'>").after("<span class='playVideo' data-url='" + b.VideoUrl + "'><span class='icon-play'></span></div>")
						}, 10)
					},
					playVideo: function(a) {
						var b = $("#id_" + a.Idx).find(".playVideo");
						if (b.length > 0) {
							var c = b.data("url"),
								d = '<div class="videoIframe"><iframe src="' + c + '?autoplay=1" frameborder="0" width="100%" height="100%" style="width: 100%; height:100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',
								e = b.closest(".videoItem");
							e.append(d)
						}
					}
				};
				var e = $(".descText");
				e.css("visibility", "hidden"), pb.utils.getMenuHeight(function(a) {
					var b = 100,
						c = e.height(),
						d = $(window).height();
					if (c > d - 2 * (a + b)) e.css("padding-top", 2 * (a + b) + "px"), e.css("padding-bottom", 2 * (a + b) + "px");
					else {
						var f = (d - c) / 2;
						e.css("padding-top", f + "px")
					}
					e.css("visibility", "visible")
				})
			}
		}
	}]
}, pbAng.dirs.frontViews.picviews = {
	incontext: ["$location", function(a) {
		return {
			restrict: "A",
			link: function(b, c) {
				c.on("click", ".closeOnImage", function() {
					b.$evalAsync(function() {
						a.path(b.page.Uri).hash("")
					})
				}), pb.utils.onDestroy(b, function() {
					c.off("click"), b = null
				}, "PicViews Incontext")
			}
		}
	}]
}, pbAng.dirs.frontViews.cover = {
	linkentry01: const_frontViews.mainBgImage,
	linkentry02: const_frontViews.mainBgImage,
	linkentry03: [function() {
		var a = function(a, b) {
			return a.page.MainImage ? void(1 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "cover",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			}) : 2 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "contain",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			}) : 3 == a.page.MainImage.BgMode ? b.find("#backgroundImage").css({
				"background-size": "initial",
				"background-attachment": "scroll",
				"background-position": "initial",
				"background-repeat": "repeat"
			}) : 4 == a.page.MainImage.BgMode && b.find("#backgroundImage").css({
				"background-size": "auto",
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-repeat": "no-repeat"
			})) : !1
		};
		return {
			restrict: "A",
			link: function(b, c) {
				var d = {}, e = function() {
					c.find("#backgroundImage").css(b.page.MainImage && b.page.MainImage.FilePath ? {
						"background-image": "url(" + b.page.MainImage.FilePath + ")",
						"background-position": "center center",
						"background-attachment": "cover",
						"background-repeat": "no-repeat"
					} : {
						"background-image": "none",
						"background-position": "center center",
						"background-attachment": "scroll",
						"background-repeat": "no-repeat"
					})
				};
				isAdmin && (d.BgMode = b.$watch("page.MainImage.BgMode", function(d, e) {
					d != e && a(b, c)
				}), d.FilePath = b.$watch("page.MainImage.FilePath", function(a, b) {
					a != b && e()
				})), setTimeout(function() {
					a(b, c), e()
				}, 1), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(d)
				}, "Linkentry 03")
			}
		}
	}],
	bigbackground: const_frontViews.mainBgImage,
	bigtitle: const_frontViews.mainBgImage,
	bigtitleicon: const_frontViews.mainBgImage,
	oneimage01: [function() {
		var a = function(a, b) {
			if (void 0 != a.page.MainImage && null != a.page.MainImage) {
				var c = a.base.isVideo(a.page.MainImage.FileName) ? "video" : "img",
					d = b.find(c),
					e = $(window).height(),
					f = $(window).width(),
					g = a.page.MainImage.Width,
					h = a.page.MainImage.Height,
					i = g / h,
					j = .6 * f,
					k = j / i;
				k > .7 * e && (k = .7 * e, j = k * i);
				var l = (e - k) / 2 * .75;
				d.height(k), d.width(j), d.css("margin-top", l + "px"), (null == a.page.MainImage.Width || null == a.page.MainImage.Height) && (d.attr("src", ""), d.height("0px"), d.width("0px"), d.css("margin-top", "0px"))
			}
		};
		return {
			restrict: "A",
			link: function(b, c) {
				var d = {};
				setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.resizeAndDestroy(b, "galleryOneimage01", function() {
					a(b, c)
				}), isAdmin && (d.MainImage = b.$watch("page.MainImage.FilePath", function() {
					a(b, c)
				})), setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(d)
				}, "One Image 01")
			}
		}
	}],
	oneimage02: [function() {
		var a = function(a, b) {
			var c;
			pb.utils.setInterval(function() {
				return c = $(".menu").width(), null != c ? !0 : void 0
			}, 10).done(function() {
				if (null != c && void 0 != a.page.MainImage && null != a.page.MainImage) {
					var d = a.base.isVideo(a.page.MainImage.FileName) ? "video" : "img",
						e = b.find(d),
						f = $(window).height(),
						g = $(window).width(),
						h = f / 100 * 40,
						i = a.page.MainImage.Width,
						j = a.page.MainImage.Height,
						k = i / j,
						l = .6 * g,
						m = l / k;
					m + h > .9 * f - h && (m = .9 * f - h, l = m * k);
					var n = (f - m - h) / 2 * .8;
					"centered" == a.site.DsnLayoutType && l >= c && (l = c, m = l / k), e.height(m), e.width(l), e.css("margin-top", n + "px"), (null == a.page.MainImage.Width || null == a.page.MainImage.Height) && (e.attr("src", ""), e.height("0px"), e.width("0px"), e.css("margin-top", "0px"))
				}
			})
		};
		return {
			restrict: "A",
			link: function(b, c) {
				var d = {};
				pb.utils.resizeAndDestroy(b, "galleryOneimage02", function() {
					a(b, c)
				}), isAdmin && (d.MainImage = b.$watch("page.MainImage.FilePath", function() {
					a(b, c)
				})), setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(d)
				}, "One Image 02")
			}
		}
	}],
	collectionLinks: [function() {
		var a = ["$scope", "$element", function(a) {
			a.collectionLinks = {
				image: {
					FilePath: void 0,
					Class: ""
				},
				hoverLink: function(b) {
					if (b.ListThumb && b.ListThumb.FileName) {
						var c = pbAng.filters.misc.pboxImage()(b.ListThumb.FileName, b.ListThumb.S3LocationId, void 0);
						c != a.collectionLinks.image.FilePath && (a.collectionLinks.image = {
							FilePath: c,
							Class: "fadeOut"
						}, pb.utils.digest(a), setTimeout(function() {
							a.collectionLinks.image.Class = "", pb.utils.digest(a)
						}, 1))
					}
				}
			};
			var b = function() {
				if (a.page.CollectionPages && a.page.CollectionPages.length > 0) {
					var b = a.page.CollectionPages[0];
					if (b.ListThumb && b.ListThumb.FileName) {
						var c = pbAng.filters.misc.pboxImage()(b.ListThumb.FileName, b.ListThumb.S3LocationId, void 0);
						c != a.collectionLinks.image.FilePath && (a.collectionLinks.image = {
							FilePath: c,
							Class: ""
						})
					} else a.collectionLinks.image = {
						FilePath: void 0,
						Class: ""
					}
				}
			};
			b(), pb.utils.onCreateEvents(a, ["collectionChange", "renderpage"], function() {
				b()
			}, "Collection Links")
		}];
		return {
			restrict: "A",
			controller: a
		}
	}]
}, pbAng.dirs.frontViews.other = {
	flickrDynamicGrid: const_frontViews.dynamicGrid,
	flickrOriginalRatio: [function() {
		var a = function(a, b) {
			b.find("figure").css("margin", a.page.ListImageMargin)
		}, b = {
			1: 50,
			2: 80,
			3: 200,
			4: 250
		}, c = function(a) {
			var c;
			return pb.environment.isMobile ? (pb.environment.width >= 800 ? c = 200 : pb.environment.width >= 1024 && (c = 250), c = pb.environment.width < 300 ? 80 : 120) : (c = b[a], void 0 == c && (c = 120)), c
		}, d = function(a, b) {
			var d = c(a.page.ListImageSize);
			b.find(".image").height(d)
		}, e = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "siteWidthChange"], function(e) {
				"imageMarginChange" == e ? a(b, c) : "siteWidthChange" == e ? setTimeout(function() {
					d(b, c), a(b, c)
				}, 10) : d(b, c)
			}, "Flickr Dynamic Grid")
		}];
		return {
			restrict: "A",
			controller: e,
			link: function(b, c) {
				setTimeout(function() {
					d(b, c), a(b, c)
				}, 1)
			}
		}
	}],
	instagramDynamicGrid: const_frontViews.dynamicGrid,
	instagramSquareThumb: [function() {
		var a = function(a) {
			if (a.length > 0 && !pb.utils.isMobile() && a.find("figure").outerWidth(!0)) {
				var b = a.outerWidth(!0),
					c = a.find("figure").outerWidth(!0),
					d = (b - Math.floor(b / c) * c) / 2;
				a.css({
					"margin-left": d
				})
			}
		}, b = function(b, c) {
			c.find("figure").css("margin", b.page.ListImageMargin), a(c)
		}, c = {
			1: 50,
			2: 80,
			3: 200,
			4: 250
		}, d = function(a) {
			var b;
			return pb.environment.isMobile ? (pb.environment.width >= 800 ? b = 200 : pb.environment.width >= 1024 && (b = 250), b = pb.environment.width < 300 ? 80 : 120) : (b = c[a], void 0 == b && (b = 120)), b
		}, e = function(b, c) {
			var e = d(b.page.ListImageSize),
				f = c.find(".image");
			if (c.find(".imageBox").width(e), c.find(".imageBox").height(e), f.attr("data-height") > f.attr("data-width")) {
				var g = e / f.attr("data-width");
				f.width(e), f.height(g * f.attr("data-height"))
			} else f.height(e);
			a(c)
		}, f = ["$scope", "$element", function(a, c) {
			pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "siteWidthChange"], function(d) {
				"imageMarginChange" == d ? b(a, c) : "siteWidthChange" == d ? setTimeout(function() {
					e(a, c), b(a, c)
				}, 10) : e(a, c)
			}, "Instagram"), pb.utils.resizeAndDestroy(a, "galleryInstagramThumb", function() {
				e(a, c)
			})
		}];
		return {
			restrict: "A",
			controller: f,
			link: function(a, c) {
				setTimeout(function() {
					e(a, c), b(a, c)
				}, 1)
			}
		}
	}],
	poetryPage: [function() {
		var a = function(a, b) {
			var c = pb.environment.height,
				d = b.find("article"),
				e = b.find("article").outerHeight(),
				f = .05 * c,
				g = (c - e) / 2 - f;
			(pb.environment.isMobile || pb.environment.width < pb.environment.minWidth) && (g = 10), c > e ? d.css("margin-top", g, "px") : d.css({
				"margin-top": "50px",
				"margin-bottom": "50px"
			})
		}, b = ["$scope", function(a) {
			a.poetry = {
				close: function() {
					history.go(-1)
				}
			}
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.resizeAndDestroy(b, "pagePoetryType", function() {
					a(b, c)
				})
			}
		}
	}],
	fullscreenVideo: [function() {
		var a = function(a, b) {
			setTimeout(function() {
				var a = b.find("iframe");
				a && (a.height($(window).height()), a.width($(window).width()))
			}, 5)
		};
		return {
			restrict: "A",
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.resizeAndDestroy(b, "pageFullscreenVideo", function() {
					a(b, c)
				})
			}
		}
	}],
	fullContentVideo: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = function() {
					var c, d;
					if (null == a.page.Video) console.log("No video added yet");
					else if (a.page.Video.Height && a.page.Video.Width) {
						c = a.page.Video.Width / a.page.Video.Height;
						var e = b.find(".mainVideo").width(),
							f = e / c;
						pb.utils.getMenuHeight(function(a) {
							var g = $(window).height();
							f > g - a - 120 ? (f = g - a - 120, d = f * c, b.find("iframe").width(d), b.find("iframe").height(f)) : (b.find("iframe").width(e), b.find("iframe").height(f))
						})
					} else a.page.Video && a.page.Video.Height || (b.find("iframe").width(b.width()), b.find("iframe").height(b.height()))
				};
				setTimeout(function() {
					c()
				}, 1), a.$on("updateVideoPage", function() {
					setTimeout(function() {
						c()
					}, 10)
				}), pb.utils.resizeAndDestroy(a, "pageFullContentVideo", function() {
					c()
				})
			}
		}
	}],
	servicesZigZag: [function() {
		var a = function(a, b) {
			var c, d = b.width() / 2,
				e = $(window).width();
			c = "left" == a.site.DsnLayoutType ? .2 * e : "centered" == a.site.DsnLayoutType ? 275 : .23 * e;
			var f = d / c;
			b.find(".image").each(function() {
				var a = $(this).data("width") / $(this).data("height");
				a > f && $(this).addClass("largerRatio")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["listItemsChange"], function() {
				a(b, c)
			}, "Same ratio fullscreen")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}]
}, pbAng.dirs.frontViews.products = {
	dynamicGrid: const_frontViews.dynamicGrid,
	thumbsSameRatio: const_frontViews.thumbsSameRatio,
	thumbsOriginalRatio: const_frontViews.thumbsOriginalRatio,
	thumbsSquareRatio: const_frontViews.thumbsSquareRatio,
	horizontalNative: const_frontViews.horizontalNative,
	verticalPlain: const_frontViews.verticalPlain,
	verticalTwoOne: const_frontViews.verticaltwoone,
	verticalTwoThree: const_frontViews.verticaltwothree,
	verticalThreeOne: const_frontViews.verticaltwoone
}, pbAng.dirs.frontViews.text = {
	text02: [function() {
		var a = function(a, b) {
			var c = $(".headersContent");
			c.width($(".mainContainer").width()), c.height(b.find(".bigImage").height()), c.css("left", $(".mainContainer").css("left"))
		}, b = ["$scope", function() {}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				var d = {};
				b.page.MainImage && pb.utils.executeOnObjectLoad(".bigImage img", function() {
					a(b, c)
				}, 2e3);
				var e = ($(window).resize(function() {
					a(b, c)
				}), function() {
					return b.page.MainImage && b.page.MainImage.FilePath ? void a(b, c) : !1
				});
				isAdmin && (d.MainImage = b.$watch("page.MainImage.FilePath", function(a, b) {
					a != b && e()
				})), pb.utils.onDestroy(b, function() {
					pb.utils.onRemoveEventsAndWatchers(d)
				}, "Text 02")
			}
		}
	}],
	contact02: [function() {
		var a = function(a, b) {
			var c = b.find(".mainImageBox"),
				d = c.height(),
				e = c.width(),
				f = e / d,
				g = a.base.isVideo(a.page.MainImage.FileName) ? ".mainVideo" : ".mainImage",
				h = c.find(g),
				i = a.page.MainImage.Height,
				j = a.page.MainImage.Width,
				k = j / i;
			h.width(""), h.height(""), k > f ? (h.removeClass("tall"), h.addClass("wide"), h.height(d), h.width(d / a.page.MainImage.Height * a.page.MainImage.Width), h.css("bottom", ""), h.css("right", (h.width() - e) / 2 + "px")) : (h.removeClass("wide"), h.addClass("tall"), h.width(e), h.height(e / a.page.MainImage.Width * a.page.MainImage.Height), h.css("right", ""), h.css("bottom", (h.height() - d) / 2 + "px"))
		}, b = ["$scope", function(b) {
			var c = {}, d = function() {
				return b.page.MainImage && b.page.MainImage.FilePath ? void a(b, b.contactO2.$element) : !1
			};
			isAdmin && (c.MainImage = b.$watch("page.MainImage.FilePath", function(a, b) {
				a != b && d()
			})), setTimeout(function() {
				d()
			}, 1), pb.utils.onDestroy(b, function() {
				pb.utils.onRemoveEventsAndWatchers(c)
			}, "Contact 02")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				b.contactO2 = {
					$element: c
				}, setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	fullscreenmap: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = "",
					d = function() {
						var a = $(".container");
						a.css({
							"margin-top": c + 50
						})
					};
				setTimeout(function() {
					pb.utils.getMenuHeight(function(e) {
						c = e, d(a, b)
					})
				}, 1), pb.utils.resizeAndDestroy(a, "pageFullScreenMap", function() {
					d(a, b)
				})
			}
		}
	}],
	cv: [function() {
		var a = pb.environment.isMobile,
			b = (pb.environment.isTablet, ["$scope", function(a) {
				a.cvMain = {
					getBackgroundStyle: function(b) {
						var c = a.base.getBorderColor();
						return c["background-image"] = "url(" + b + ")", c
					}
				}
			}]);
		return {
			controller: b,
			restrict: "A",
			link: function(b, c) {
				var d = function() {
					var b = $("main").width() < 900;
					a || b ? $(".moveMainInfo").insertBefore(".cvContainer.education") : b || $(".moveMainInfo").insertBefore(".cvContainer.skill")
				};
				d(), $(window).resize(function() {
					d()
				}), c.on("mouseover", ".cvLink", function() {
					$(this).css("color", b.site.PLinkColor)
				}), c.on("mouseout", ".cvLink", function() {
					$(this).css("color", b.site.PFontColor)
				})
			}
		}
	}],
	cv02: [function() {
		var a = ["$scope", function(a) {
			a.cvMain02 = {
				getBackgroundStyle: function(b) {
					var c = a.base.getBorderColor();
					return c["background-image"] = "url(" + b + ")", c
				},
				getTitleStyle: function() {
					var b = a.base.getH2Styles();
					return b["border-color"] = pb.utils.getTransparentColor(a.site.PFontColor), b
				}
			}
		}];
		return {
			controller: a,
			restrict: "A",
			link: function(a, b) {
				b.on("mouseover", ".cvLink", function() {
					$(this).css("color", a.site.PLinkColor)
				}), b.on("mouseout", ".cvLink", function() {
					$(this).css("color", a.site.PFontColor)
				})
			}
		}
	}],
	listItem: [function() {
		var a = ["$scope", "$filter", "$element", function(a, b, c) {
			var d = pb.environment.isMobile;
			a.listItemDom = {
				getBackgroundStyle: function(c) {
					var d = a.base.getBorderColor();
					return d["background-image"] = "url(" + b("pboxImage")(c.FileName, c.S3LocationId, "w400") + ")", d
				},
				setImageMargin: function(a, b) {
					var c = d ? "0px" : a.page.ListImageMargin;
					b.find(".item").css("margin", c), pb.utils.setListItemTop(b.find(".listItemContainer"), d, "0px", "-" + a.page.ListImageMargin)
				},
				setImageSize: function(a, b) {
					var c = pb.utils.getWidthForSize(a.page.ListImageSize, 30).size;
					c > 400 && (c = 400), b.find(".item").css("width", c + "px").find(".itemImage").css({
						height: c + "px",
						width: c + "px"
					})
				},
				centerItemContainer: function(a, b) {
					var c, d, e = b.find(".item"),
						f = b.find(".item").outerWidth(!0),
						g = $("main").width(),
						h = parseInt(a.page.ListImageMargin);
					if ("centered" == a.site.DsnLayoutType && h > 0 && !pb.environment.isMobile && !pb.environment.isTablet) if (c = Math.floor((g + 2 * h) / f), c > e.length && (c = e.length), d = c * f, d > g) {
						var i = (d - g) / 2,
							j = -1 * i;
						b.find(".listItemContainer").width(d).css({
							"margin-left": j + "px"
						})
					} else b.find(".listItemContainer").width(d).css({
						"margin-left": "auto",
						"margin-right": "auto"
					});
					else c = Math.floor(g / f), c > e.length && (c = e.length), d = c * f, b.find(".listItemContainer").width(d).css({
						"margin-left": "auto",
						"margin-right": "auto"
					})
				}
			}, pb.utils.onCreateEvents(a, ["listItemsChange", "imageMarginChange", "imageSizeChange", "siteWidthChange"], function(b) {
				"listItemsChange" == b ? (a.listItemDom.setImageMargin(a, c), a.listItemDom.setImageSize(a, c)) : "siteWidthChange" == b ? setTimeout(function() {
					a.listItemDom.setImageSize(a, c), a.listItemDom.setImageMargin(a, c)
				}, 10) : "imageMarginChange" == b ? a.listItemDom.setImageMargin(a, c) : a.listItemDom.setImageSize(a, c), a.listItemDom.centerItemContainer(a, c)
			}, "ListItem")
		}];
		return {
			restrict: "A",
			controller: a,
			replace: !0,
			link: function(a, b) {
				var c = function() {
					setTimeout(function() {
						a.listItemDom.setImageMargin(a, b), a.listItemDom.setImageSize(a, b), a.listItemDom.centerItemContainer(a, b)
					}, 1)
				};
				c(), pb.utils.resizeAndDestroy(a, "pageListItems", function() {
					a.listItemDom.centerItemContainer(a, b)
				})
			}
		}
	}],
	listItemSimple: [function() {
		var a = ["$scope", "$filter", function(a, b) {
			a.listItemDom = {
				getBackgroundStyle: function(c) {
					var d = a.base.getBorderColor();
					return d["background-image"] = "url(" + b("pboxImage")(c.FileName, c.S3LocationId, "w1000") + ")", d
				}
			}
		}];
		return {
			restrict: "A",
			controller: a,
			replace: !0
		}
	}]
}, pbAng.dirs.frontViews.sections = {
	horizontalStyled: ["$timeout", function(a) {
		var b = pb.environment.isMobile,
			c = function(a, c) {
				var d = .9;
				try {
					void 0 != tempObj && void 0 != tempObj.forceHorizontalFullHeight && (d = tempObj.forceHorizontalFullHeight)
				} catch (e) {}
				var f = 1 == a.fullscreen ? d : .6;
				b && (f = 1), c.find("figure").each(function() {
					var a = $(this).find("img"),
						c = a.data("height"),
						d = a.data("width"),
						e = c / d,
						g = $(window).height() * f;
					g = b ? $(window).width() : 100 > g ? 100 : g;
					var h = g / e;
					a.css({
						height: g,
						width: h
					})
				})
			};
		return {
			restrict: "A",
			scope: {
				fullscreen: "@"
			},
			link: function(b, d) {
				var e = null,
					f = null,
					g = {}, h = function(b) {
						b.mCustomScrollbar("destroy"), f = a(function() {
							b.mCustomScrollbar({
								axis: "x",
								advanced: {
									autoExpandHorizontalScroll: !0,
									updateOnBrowserResize: !0
								},
								scrollInertia: 0,
								mouseWheel: {
									invert: !1
								}
							})
						})
					};
				e = a(function() {
					pb.utils.resizeAndDestroy(b, "sectionHorizontalStyled", function() {
						c(b, d)
					}), isAdmin && (g.fullscreen = b.$watch("fullscreen", function() {
						c(b, d)
					})), setTimeout(function() {
						c(b, d)
					}, 1), h(d)
				}), pb.utils.onCreateEvents(b, ["galleryItemsChange", "scrollGalleryItems", "renderpage"], function() {
					c(b, d), h(d)
				}, "Section Horizontal Styled"), pb.utils.onDestroy(b, function() {
					null != e && a.cancel(e), null != f && a.cancel(f), pb.utils.onRemoveEventsAndWatchers(g), d.mCustomScrollbar("destroy")
				}, "Section Horizontal Styled")
			}
		}
	}],
	dynamicGrid: [function() {
		var a = function(a, b) {
			var c = 300,
				d = b.find("figure");
			d.each(function() {
				var a = $(this).find("img"),
					b = a.data("width"),
					d = a.data("height"),
					e = b / d,
					f = c / e;
				a.width(c), a.height(f), $(this).width(c)
			});
			var e = {
				width: c,
				elements: d
			};
			$(".sectionGallery").dynamicGrid(e)
		};
		return {
			restrict: "A",
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.onCreateEvents(b, ["galleryItemsChange", "scrollGalleryItems", "renderpage"], function() {
					a(b, c)
				}, "Section Dynamic Grid")
			}
		}
	}],
	evenRows: [function() {
		var a = function(a, b) {
			var c = b.find("figure"),
				d = 10,
				e = 300;
			pb.environment.isMobile && (e = 100, d = 6), setTimeout(function() {
				b.evenRows({
					height: e,
					elements: c,
					margin: d
				});
				var f = a;
				if (void 0 == a.site && (f = a.$parent), 1 == a.fullscreen) {
					var g = b.outerHeight(),
						h = pb.environment.height;
					if (h > g) {
						var i = h / 2 - g / 2,
							j = b.outerWidth(),
							k = $(window).width(),
							l = k / 2 - j / 2;
						b.css({
							top: i + "px",
							left: l + "px",
							position: "absolute"
						})
					}
					f.base.broadCast("updateOnepager")
				} else b.css({
					position: "relative",
					top: "",
					left: ""
				});
				if ($(".sectionCollection.thumbsevenrows").length > 0) {
					var m = function() {
						pb.utils.changeFigStyles(f, ".collectionFigCaption", "onepage collectionFigCaption")
					};
					m(), pb.utils.watchFontStyles(f, ".collectionFigCaption", "One page collection Font Styles"), setTimeout(function() {
						c.each(function() {
							$(this).css("display", "block");
							var b = $(this).find("img"),
								c = $(this).find("figcaption"),
								e = b.width(),
								f = b.height();
							c.width(e), c.css({
								top: d + "px",
								left: d + "px",
								background: a.$parent.site.BgBoxColor
							});
							var g = c.height();
							$(this).on("mouseenter", function() {
								var a = (f - g) / 2;
								a > 0 && c.css({
									"padding-top": a + "px",
									visibility: "visible",
									border: "none !important"
								}), c.height(f - a)
							}).on("mouseleave", function() {
								c.css({
									height: "auto",
									visibility: "hidden"
								})
							})
						})
					}, 1)
				}
			}, 100)
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.resizeAndDestroy(b, "sectionEvenRows", function() {
				a(b, c)
			});
			var d = {};
			isAdmin && (d.fullscreen = b.$watch("fullscreen", function() {
				a(b, c)
			})), setTimeout(function() {
				a(b, c)
			}, 1), pb.utils.onCreateEvents(b, ["sectionItemsChange", "changeSectionTemplate", "sectionCollectionPageChange"], function() {
				a(b, c)
			}, "Section Even Rows"), pb.utils.onDestroy(b, function() {
				pb.utils.onRemoveEventsAndWatchers(d)
			}, "Section Even Rows")
		}];
		return {
			restrict: "A",
			controller: b,
			scope: {
				fullscreen: "@"
			},
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}]
}, pbAng.dirs.frontViews.layouts = {
	left08: [function() {
		pb.environment.isMobile;
		return {
			restrict: "A",
			link: function() {
				setTimeout(function() {
					var a = $(".socialMediaIcons"),
						b = a.width(),
						c = $("nav.menu").outerWidth(),
						d = (c - b) / 2;
					a.css("left", d + "px")
				}, 100)
			}
		}
	}]
}, pbAng.dirs.frontViews.common = {
	alignCenter: [function() {
		var a = function(a, b) {
			var c = parseInt(a.page.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-column-gap", d + "vw"), b.css("grid-row-gap", 1.5 * d + "vw")
		}, b = function(a, b) {
			var c = function(a) {
				return 1 == a ? 6 : 2 == a ? 5 : 3 == a ? 3 : 4 == a ? 2 : 4
			}, d = c(a.page.ListImageSize);
			b.css("grid-template-columns", "repeat(" + d + ", 1fr)")
		}, c = ["$scope", "$element", function(c, d) {
			pb.utils.onCreateEvents(c, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function() {
				a(c, d), b(c, d)
			}, "new alignCenter")
		}];
		return {
			restrict: "A",
			controller: c,
			link: function(c, d) {
				setTimeout(function() {
					a(c, d), b(c, d)
				}, 1)
			}
		}
	}],
	sameRatio: [function() {
		var a = function(a, b) {
			var c = parseInt(a.page.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-gap", d + "vw")
		}, b = function(a, b) {
			var c = function(a) {
				return 1 == a ? 6 : 2 == a ? 5 : 3 == a ? 3 : 4 == a ? 2 : 4
			}, d = a.ratio,
				e = c(a.page.ListImageSize),
				f = b.width(),
				g = parseInt(a.page.ListImageMargin),
				h = (f - (e - 1) * g) / (e * d),
				i = pb.utils.pxToVw(h);
			b.css("grid-template-columns", "repeat(" + e + ", 1fr)"), b.find("div.imageBox").height(i + "vw")
		}, c = function(a, b) {
			var c = a.figcap;
			a.page.ListTextSettings && a.page.ListTextSettings.Position && (c = pb.utils.getListTextPositionValueFromId(a.page.ListTextSettings.Position)), b.find("figure").each(function() {
				var b = $(this).find("figcaption");
				b.removeClass("figBottom1"), b.removeClass("figBottom2"), b.removeClass("figCover"), "figBottom1" == c ? b.css("background-color", "transparent") : b.css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b.addClass(c);
				var d = $(this).find(".image"),
					e = d.data("width") / d.data("height");
				e < a.ratio && d.addClass("smallerRatio")
			})
		}, d = ["$scope", "$element", function(d, e) {
			pb.utils.onCreateEvents(d, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "listItemsChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems", "listTextPositionChange"], function() {
				a(d, e), b(d, e), c(d, e)
			}, "new sameRatio")
		}];
		return {
			restrict: "A",
			controller: d,
			link: function(d, e, f) {
				d.ratio = f.ratio, d.figcap = f.figcap, setTimeout(function() {
					a(d, e), b(d, e), c(d, e)
				}, 1), ("centered" == d.site.DsnLayoutType || "left" == d.site.DsnLayoutType) && pb.utils.resizeAndDestroy(d, "sameRatio2", function() {
					b(d, e)
				})
			}
		}
	}],
	alignBottom: [function() {
		var a = function(a, b) {
			var c = !1,
				d = function(a) {
					if (c) return c;
					var b = 13;
					return 1 == a ? b = 8 : 2 == a ? b = 10 : 3 == a ? b = 15 : 4 == a && (b = 17), c = b
				}, e = !1,
				f = function(a) {
					if (e) return e;
					var b = parseInt(a.page.ListImageMargin);
					return e = pb.utils.pxToVw(b)
				};
			b.find("figure").each(function() {
				var b = f(a);
				$(this).css("margin-right", b / 1.1 + "vw"), $(this).css("margin-left", b / 1.1 + "vw"), $(this).css("margin-top", b + "vw"), $(this).css("margin-bottom", b + "vw");
				var c = d(a.page.ListImageSize),
					e = 3 * Math.random() / 10 + 1;
				c *= e;
				var g = $(this).find(".image"),
					h = g.data("width") / g.data("height");
				$(this).width(h > 1 ? 1.67 * c + "vw" : h > 1.6 ? 2.2 * c + "vw" : c + "vw")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function() {
				a(b, c)
			}, "new alignBottom")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	horizontalNew: [function() {
		var a = function(a, b) {
			var c = !1,
				d = function(b) {
					if (c) return c;
					var d = 70;
					return 1 == b ? d = 48 : 2 == b ? d = 60 : 3 == b ? d = 78 : 4 == b && (d = 84), "left" == a.site.DsnLayoutType && (d = 1.13 * d), c = d
				}, e = !1,
				f = function(a) {
					if (e) return e;
					var b = parseInt(a.page.ListImageMargin);
					return e = pb.utils.pxToVw(b)
				};
			b.find("figure").each(function() {
				var b = f(a);
				$(this).css("margin-right", b + "vw");
				var c = d(a.page.ListImageSize);
				$(this).find(".image").height(c + "vh")
			})
		}, b = function(a, b) {
			var c = a.figcap;
			a.page.ListTextSettings && a.page.ListTextSettings.Position && (c = pb.utils.getListTextPositionValueFromId(a.page.ListTextSettings.Position)), b.find("figure").each(function() {
				var b = $(this).find("figcaption");
				b.removeClass("figBottom1"), b.removeClass("figBottom2"), b.removeClass("figCover"), "figBottom1" == c ? b.css("background-color", "transparent") : b.css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b.addClass(c)
			})
		}, c = ["$scope", "$element", function(c, d) {
			pb.utils.onCreateEvents(c, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "listItemsChange", "productChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems", "listTextPositionChange"], function() {
				a(c, d), b(c, d)
			}, "horizontalNew")
		}];
		return {
			restrict: "A",
			controller: c,
			link: function(c, d, e) {
				c.figcap = e.figcap, $(".scrollNav").click(function() {
					var a = $(".gridContainer"),
						b = .8 * a.width();
					$(this).hasClass("back") ? a.animate({
						scrollLeft: "-=" + b
					}, 400) : a.animate({
						scrollLeft: "+=" + b
					}, 400)
				}), setTimeout(function() {
					a(c, d), b(c, d)
				}, 1), setTimeout(function() {
					b(c, d)
				}, 5e3)
			}
		}
	}],
	insideBoxes: [function() {
		var a = function(a, b) {
			b.find(".imageBox").each(function() {
				{
					var a = 1.618,
						b = $(this).width(),
						c = b / a,
						d = $(this).find(".image");
					d.data("width") / d.data("height")
				}
				$(this).height(c + "px")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "listItemsChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function() {
				a(b, c)
			}, "insideBoxes")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.resizeAndDestroy(b, "insideBoxes", function() {
					a(b, c)
				})
			}
		}
	}],
	puzzle01: [function() {
		var a = function(a, b) {
			var c = parseInt(a.page.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-gap", d + "vw"), b.find("figure").each(function(b) {
				$(this).find("figcaption").css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), null !== a.site.ThumbDecorationBorderWidth && $(this).find("figcaption").css({
					top: a.site.ThumbDecorationBorderWidth,
					left: a.site.ThumbDecorationBorderWidth
				}), $(this).find("figcaption").css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b / 8 % 1 === 0 && ("centered" == a.site.DsnLayoutType ? $(this).css("height", 480 + c + "px") : $(this).css("height", 42 + d + "vw"))
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "listItemsChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function() {
				a(b, c)
			}, "puzzle01")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	dynamicGridNew: [function() {
		var a = pb.environment.isMobile,
			b = 16,
			c = function(c, d, e) {
				var f = void 0 == c.site.ThumbDecorationBorderWidth ? 0 : parseInt(c.site.ThumbDecorationBorderWidth),
					g = function(b) {
						if (a) {
							var c = $("main").width();
							return 400 >= c ? 1 : 700 >= c ? 2 : 3
						}
						return 1 == b ? 6 : 2 == b ? 5 : 3 == b ? 3 : 4 == b ? 2 : 4
					}, h = function(a, b, c, d) {
						var e = a.width() / $(window).width() * 100;
						return (e - (b - 1) * c) / b - d
					}, i = g(c.page.ListImageSize),
					j = a ? b : parseInt(c.page.ListImageMargin),
					k = pb.utils.pxToVw(j),
					l = pb.utils.pxToVw(f);
				l *= 2;
				for (var m = h(d, i, k, l), n = {}, o = 0; i > o; o++) n[o] || (n[o] = {
					top: 0
				});
				var p = 0,
					q = 0;
				d.find("figure").each(function() {
					var a = $(this),
						b = a.find(".image"),
						d = b.data("width") / b.data("height"),
						e = m / d;
					b.height(e + "vw"), b.width(m + "vw"), a.css("margin-bottom", k + "vw"), a.find("figcaption").css("background-color", "transparent" == c.site.BgBoxColor ? "transparent" : pb.utils.getTransparentColor(c.site.BgBoxColor, .7));
					for (var f = i; f > 0; f--) n[f - 1].top <= q && (q = n[f - 1].top, p = f - 1);
					var g = n[p].top + k + l,
						h = p * (m + k + l);
					a.css("top", g + "vw"), a.css("left", h + "vw"), n[p].top = g + e, q = n[p].top
				});
				for (var r = 0, s = 0; i > s; s++) n[s].top > r && (r = n[s].top);
				d.height(r + "vw"), void 0 != e && angular.isFunction(e) && e()
			}, d = ["$scope", "$element", function(a, b) {
				pb.utils.onCreateEvents(a, ["imageMarginChange", "imageSizeChange", "galleryItemsChange", "collectionChange", "productChange", "listItemsChange", "scrollGalleryItems", "renderpage", "scrollCollectionItems", "scrollProductItems"], function() {
					c(a, b)
				}, "dynamicGridNew")
			}];
		return {
			restrict: "A",
			controller: d,
			link: function(b, d, e) {
				b.ratio = e.ratio, b.figcap = e.figcap;
				var f = d.width(),
					g = function() {
						setTimeout(function() {
							c(b, d, function() {
								a && setTimeout(function() {
									f != d.width() && c(b, d, !1)
								}, 10)
							})
						}, 1)
					};
				g(), a && (setTimeout(function() {
					f != d.width() && c(b, d, !1)
				}, 1e3), pb.utils.resizeAndDestroy(b, "galleryNewDynamicGrid", function() {
					g()
				}))
			}
		}
	}]
}, pbAng.dirs.layouts = {
	left: {},
	center: {},
	wide: {},
	bottoms: {}
}, pbAng.dirs.layouts.left = {
	left06: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = !1,
					d = $("ul.first"),
					e = $(".menuList"),
					f = $("span.menuIcon"),
					g = b.find(".logo");
				d.hide(), b.on("click", ".menuIcon", function() {
					c ? (e.removeClass("show"), f.removeClass("icon-close"), f.addClass("icon-menu-web2"), $("ul.first > li").hide(50), d.animate({
						width: "0px"
					}, 150), d.hide(50), g.hide(50), c = !1, setTimeout(function() {
						e.css("height", "auto")
					}, 150)) : (e.addClass("show"), f.removeClass("icon-menu-web2"), f.addClass("icon-close"), $("ul.first > li").show(200), d.show(200), e.css("height", "100%"), d.animate({
						width: "200px"
					}, 150), g.show(200), c = !0)
				})
			}
		}
	}],
	left07: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = !1,
					d = $("ul.first"),
					e = $(".logoContainer");
				d.hide();
				var f;
				b.on("click", ".menuIcon", function() {
					c ? (f = d.outerWidth(), d.animate({
						left: "-" + f + "px"
					}), e.animate({
						left: "20px"
					}, 440, "linear"), c = !1) : (f = d.outerWidth(), d.css("left", "-" + f + "px").css("display", "block").animate({
						left: "0px"
					}), e.animate({
						left: f + 20 + "px"
					}, 360, "linear"), c = !0)
				})
			}
		}
	}],
	left03: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = !1;
				b.on("mouseover", "li.top", function() {
					if (1 == c) return !1;
					c = !0;
					var a = $(this).find(".second");
					if (0 != a.length) {
						if (!a.hasClass("active")) {
							var b = $(".second.active");
							b.slideUp(300, function() {
								b.removeClass("active")
							})
						}
						a.slideDown(300, function() {
							c = !1, a.addClass("active")
						})
					} else c = !1
				})
			}
		}
	}]
}, pbAng.dirs.layouts.center = {
	top06: [function() {
		return {
			restrict: "A",
			link: function(a) {
				var b = $(".menuContainer");
				b.width($(window).width());
				var c = b.offset().left;
				b.css("left", "-" + c + "px"), a.top06 = {
					toggleLinks: function(a, b, c, d) {
						var e = $("ul.first"),
							f = e.outerHeight();
						e.is(":visible") ? (e.slideUp(200), a && $("span.menuIcon").addClass(b).removeClass(c), void 0 != d && $(d).height(0)) : (e.slideDown(200), a && $("span.menuIcon").removeClass(b).addClass(c), void 0 != d && $(d).height(f))
					}
				}
			}
		}
	}],
	horizontal02: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = b.find(".menuContainer");
				c.css("border-bottom-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2)), c.css("border-top-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2))
			}
		}
	}],
	horizontal06: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = b.find(".main");
				c.css("border-bottom-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2)), b.find("ul.first").css("border-bottom-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2))
			}
		}
	}]
}, pbAng.dirs.layouts.wide = {
	right01: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c, d = !1,
					e = $("ul.first"),
					f = $(".menuIcon");
				b.on("click", ".menuIcon", function() {
					d ? (c = e.outerWidth(), e.animate({
						right: "-" + c + "px"
					}), f.animate({
						right: "20px"
					}, 440, "linear"), d = !1) : (c = e.outerWidth(), e.css("right", "-" + c + "px").css("display", "block").animate({
						right: "0px"
					}), f.animate({
						right: c + 20 + "px"
					}, 360, "linear"), d = !0)
				})
			}
		}
	}],
	right02: [function() {
		return {
			restrict: "A",
			link: function(a) {
				var b = $("ul.first");
				b.hide();
				var c = $(".menuIcon"),
					d = $(".linesMenuIcon");
				c.click(function() {
					b.fadeToggle()
				}), d.click(function() {
					b.fadeToggle()
				}), a.getMenuStyles = function() {
					var b = {};
					return b.background = pb.utils.getTransparentColor(a.site.MenuBoxColor, .9), b
				}
			}
		}
	}],
	right03: [function() {
		return {
			restrict: "A",
			link: function(a) {
				var b = $("ul.first");
				b.hide();
				var c = $(".menuIcon"),
					d = $(".linesMenuIcon");
				c.click(function() {
					b.fadeToggle()
				}), d.click(function() {
					b.fadeToggle()
				}), a.getMenuStyles = function() {
					var b = {};
					return b.background = pb.utils.getTransparentColor(a.site.MenuBoxColor, .9), b
				}
			}
		}
	}],
	right04: [function() {
		return {
			restrict: "A",
			link: function(a) {
				var b = $("ul.first");
				b.hide();
				var c = $(".menuIcon"),
					d = $(".linesMenuIcon");
				c.click(function() {
					b.fadeToggle()
				}), d.click(function() {
					b.fadeToggle()
				}), a.getMenuStyles = function() {
					var b = {};
					return b.background = pb.utils.getTransparentColor(a.site.MenuBoxColor, .9), b
				}
			}
		}
	}],
	top07: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = !1,
					d = $("ul.first"),
					e = b.find(".logo");
				setTimeout(function() {
					d.height($(document).height() - e.outerHeight())
				}, 10), d.hide(), e.css("border-bottom-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2)), e.css("background", pb.utils.getTransparentColor(a.site.BgColor, .4)), d.css("border-right-color", pb.utils.getTransparentColor(a.site.MenuFontColor, .2)), d.css("background", pb.utils.getTransparentColor(a.site.BgColor, .4));
				var f;
				b.on("click", ".menuIcon", function() {
					c ? (f = d.outerWidth(), d.animate({
						left: "-" + f + "px"
					}), c = !1) : (f = d.outerWidth(), d.css("left", "-" + f + "px").css("display", "block").animate({
						left: "0px"
					}), c = !0)
				})
			}
		}
	}],
	top08: ["$document", function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = 0;
				b.on("mouseout", ".top", function() {
					$(this).removeClass("hover").find("ul.second").hide()
				}), b.on("mouseout", ".middle", function() {
					$(this).removeClass("hover").find("ul.third").hide()
				}), b.on("mouseover", "li.top", function() {
					var b = $(this).find("ul.second"),
						d = pb.utils.getTransparentColor(a.site.MenuBoxColor, .9);
					b.css("background-color", d), b.addClass("hover").show();
					try {
						var e = $(this).find("ul.second").find("li.middle"),
							f = $(this).outerWidth() / 2 + $(this).offset().left;
						$("<style>ul.second:after{left:" + f + "px; border-bottom-color:" + d + "!important}</style>").appendTo("head"), c = f - e.width() / 2, e.css("left", c + "px")
					} catch (g) {}
				}), b.on("mouseover", "li.middle", function() {
					var b = $(this).find("ul.third"),
						d = pb.utils.getTransparentColor(a.site.MenuBoxColor, .7);
					b.css("background-color", d), b.addClass("hover").show();
					try {
						var e = $(this).find("ul.third").find("li.bottom"),
							f = c - e.width() / 2;
						e.css("left", f + "px")
					} catch (g) {}
				})
			}
		}
	}],
	top10: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = $("ul.first");
				c.hide();
				var d = $(".menuIcon"),
					e = $(".linesMenuIcon");
				pb.utils.executeOnObjectLoad("#sitelogo.logo", function() {
					var a = $("#sitelogo.logo"),
						f = a.width();
					a.css("right", "calc(50%-" + f + "px)"), a.hide(), d.click(function() {
						c.fadeToggle(), a.fadeToggle()
					}), e.click(function() {
						c.fadeToggle(), a.fadeToggle(), g()
					});
					var g = function() {
						var a = b.find("ul.first > span"),
							c = b.find(".logo"),
							d = 80 + c.height();
						a.css("margin-top", d + "px")
					}
				}, 1e3), a.getMenuStyles = function() {
					var b = {};
					return b.background = pb.utils.getTransparentColor(a.site.MenuBoxColor, .9), b
				}
			}
		}
	}]
}, pbAng.dirs.layouts.bottoms = {}, pbAng.dirs.pageParts = {}, pbAng.dirs.pageParts.galleries = {}, pbAng.dirs.pageParts.text = {}, pbAng.dirs.pageParts.collections = {}, pbAng.dirs.pageParts.products = {}, pbAng.dirs.pageParts.text = {
	plain: function() {
		var a = '<div class="pageParts plain"><div bind-unsafe-html="partPage.BlockContent" block-content></div><div class="link"><a ng-href="{{partPage.Uri | link}}" pb-style="base.getLinkTextStyle()" bind-unsafe-html="partPage.PageTitle"></a></div></div>',
			b = ["$scope", "$element", function() {}];
		return {
			restrict: "A",
			controller: b,
			template: a,
			scope: {
				partPage: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}
}, pbAng.dirs.pageParts.galleries = {
	slideshow: [function() {
		var a = '<div class="pageParts slideshow"><div class="description" ng-if="partPage.BlockContent" bind-unsafe-html="partPage.BlockContent" block-content></div><slideshow type="pagepart" infscroll="false" parent-page="page" page="partPage" site="site" base="base"></slideshow></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				partPage: "=",
				page: "=",
				site: "=",
				base: "="
			}
		}
	}],
	thumbs: [function() {
		var a = '<div class="pageParts thumbs"><div class="description" ng-if="partPage.BlockContent" bind-unsafe-html="partPage.BlockContent" block-content></div><pb-gallery thumb-size="h400" infscroll="false" gallery-even-rows page="partPage" site="site" base="base" parent-page="page"></pb-gallery></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				partPage: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}],
	vertical: [function() {
		var a = '<div class="pageParts vertical"><div class="description" ng-if="partPage.BlockContent" bind-unsafe-html="partPage.BlockContent" block-content></div><pb-gallery thumb-size="w1000" infscroll="true" gallery-vertical-plain page="partPage" site="site" base="base" parent-page="page"></pb-gallery></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				partPage: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}],
	horizontal: [function() {
		var a = '<div class="pageParts horizontal"><div class="description" ng-if="partPage.BlockContent" bind-unsafe-html="partPage.BlockContent" block-content></div><pb-gallery thumb-size="h800" infscroll="false" gallery-horizontal-styled page="partPage " site="site" base="base" parent-page="page"></pb-gallery></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				partPage: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}]
}, pbAng.dirs.pageParts.products = {
	singleProduct: [function() {
		var a = '<div class="pageParts singleProduct"><div class="clearfix singleProductContainer"><div class="sliderBox"><slideshow type="fixedheight" fixed-settings=\'{"bgSize" : "contain","fx" :"scrollLeft","textPosition" : 0}\' page="page" site="site" base="base"></slideshow></div><add-to-cart></add-to-cart></div></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				currentProduct: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}],
	singleProductVertical: [function() {
		var a = '<div class="pageParts singleProductVertical"><div class="clearfix singleProductContainer"><div class="sliderBox"><slideshow type="incontext" fixed-settings=\'{"bgSize" : "contain","fx" :"fade","textPosition" : 0}\' page="page" site="site" base="base"></slideshow></div><add-to-cart></add-to-cart></div></div>';
		return {
			restrict: "A",
			template: a,
			scope: {
				currentProduct: "=",
				site: "=",
				page: "=",
				base: "="
			}
		}
	}]
}, pbAng.dirs.pagePartLoader = ["$compile", function(a) {
	var b = function(a) {
		return "type-" + a.DsnTemplateType + " " + a.DsnTemplateViewFile + " id-" + a.Guid
	}, c = function(a, b) {
		return "slideshow" == a ? "part-gallery-slideshow" : "thumbs" == a ? "part-gallery-thumbs" : "horizontal" == a ? "part-gallery-horizontal" : "vertical" == a ? "part-gallery-vertical" : "singleproduct" == a ? "part-products-singleproduct" : "singleproductvertical" == a ? "part-products-singleproduct-vertical" : "native" == a && b && "galleries" == b.DsnTemplateType ? "verticals" == b.DsnTemplateSubGroup ? "part-gallery-vertical" : "thumbs" == b.DsnTemplateSubGroup ? "part-gallery-thumbs" : "slideshows" == b.DsnTemplateSubGroup ? "part-gallery-slideshow" : "part-gallery-horizontal" : "part-text-plain"
	};
	return {
		restrict: "E",
		scope: {
			pageGuid: "@",
			type: "@",
			base: "=",
			site: "=",
			currentProduct: "=",
			page: "="
		},
		link: function(d, e) {
			d.part = {};
			var f = d.pageGuid,
				g = d.type;
			if (d.currentProduct && (d.base.currentProduct = d.currentProduct), f) pb.data.get.page.byGuid(f, function(f) {
				d.part.page = f, d.part.containerClass = b(f);
				var h = c(g, f);
				e.html(a("<div site='site' page='page' base='base' part-page='part.page' class='pagePartLoader' " + h + " ></div>")(d)), pb.utils.digest(d)
			});
			else if (d.base.currentProduct) {
				var h = c(g);
				e.html(a("<div site='site' page='page' current-product='base.currentProduct' base='base' class='pagePartLoader' " + h + " ></div>")(d)), pb.utils.digest(d)
			}
		}
	}
}], pbAng.dirs.slideshow = ["$timeout", "$route", "$location", "$window", function(a) {
	var b = function(a, b, c) {
		var d, e, f;
		return a && a.fixedSettings && (e = JSON.parse(a.fixedSettings)), a && a.noValueDefaultSettings && (f = JSON.parse(a.noValueDefaultSettings)), d = e ? sliderH.settingsH.getSettingsForFixedSettings(b, e, c, f) : a && "true" == a.isSection ? sliderH.settingsH.getSettingsForSection(b, c, f) : sliderH.settingsH.getSettingsForPage(b, c, f)
	}, c = function(a) {
		var b, c;
		return "galleries" == a.page.DsnTemplateType || pb.utils.doesTemplateFromDifferentTypeHaveSlideshow(a.page.DznTemplateGuid) ? (b = a.page.GalleryItems || [], c = a.page.Guid) : "products" == a.page.DsnTemplateType ? (b = a.base.currentProduct.Items || [], c = a.base.currentProduct.Guid) : "onepager" == a.page.DsnTemplateType ? void 0 != a.sec && (b = a.sec.Items || a.sec.GalleryItems || [], c = a.sec.Guid) : "blogs" == a.page.DsnTemplateType && (b = a.sec.BlogGalleryItems || [], c = a.sec.Guid), {
			items: b,
			id: c
		}
	}, d = null,
		e = function(a, e, f, g, h) {
			var i, j, k;
			if (a.parentPage) i = b(f, a.parentPage, "slideshow"), d = i, k = a.page.GalleryItems || [], j = a.page.Guid + "-" + a.parentPage.Guid, sliderH.openInElement(e, j, k, g, h, i, a.site.SiteTitle);
			else {
				i = a.sec ? b(f, a.sec) : b(f, a.page), d = i;
				var l = c(a);
				sliderH.openInElement(e, l.id, l.items, g, h, i, a.site.SiteTitle)
			}
		}, f = ["$scope", function() {}];
	return {
		restrict: "E",
		replace: !0,
		controller: f,
		scope: {
			page: "=",
			site: "=",
			base: "=",
			parentPage: "=",
			sec: "="
		},
		link: function(b, c, f) {
			var g = f.type || "",
				h = f.index || 0,
				i = f.allwaysUseBoxColor || !1,
				j = null,
				k = null;
			j = a(function() {
				e(b, c, f, g, h)
			}, 1);
			var l = null;
			k = a(function() {
				l = b.$watch("site", function() {
					var a = {};
					a["font-size"] = b.site.PFontSize, a.color = b.site.PFontColor, a["font-family"] = b.site.PFontFamily, a["line-height"] = b.site.PLineHeight, a["letter-spacing"] = parseInt(b.site.PSpacing) / 4 + "px", a["text-transform"] = 1 == b.site.PUpperCase ? "uppercase" : "";
					var e = pb.utils.getCssStyleAndWeight(b.site.PFontVariant);
					a["font-style"] = e["font-style"], a["font-weight"] = e["font-weight"], ("fullscreen" == g || null != d && 3 == d.textPosition || i) && (a.background = b.site.BgBoxColor), setTimeout(function() {
						c.find("figcaption").css(a).find("a").css("color", b.site.PLinkColor)
					}, 1)
				}, !0)
			}), b.$on("$destroy", function() {
				try {
					null != l && l(), null != j && a.cancel(j), null != k && a.cancel(k), sliderH.removeEvents()
				} catch (b) {}
			})
		}
	}
}], pbAng.dirs.gallery = ["$location", "$window", function(a) {
	var b = '<div id="gallery_{{page.Guid}}" class="gallery clearfix {{gallery.class}} gallerySlider" pb-inf-scroll><figure id="gallery_figure_{{item.Guid}}" ng-repeat="item in page.GalleryItems | orderBy:\'Idx\' | limitTo:infScrollSettings.totalDisplayed track by item.Guid " ng-click="gallery.openItem(item)"><div class="imageBox"><img id="gallery_img_{{item.Guid}}" gallery-thumb pb-nice-load ng-class="{noPicview : page.DznPicviewGuid == 1}" data-filename="{{::item.FileName}}" ng-src="{{::item.src}}" pb-gallery-err-img-src item="::item" s3id={{::item.S3LocationId}} size="{{::gallery.thumbSize}}" class="image" alt="{{::base.getImgAltOrPageTitle(item.ListText)}}" data-height="{{::item.Height}}" data-width="{{::item.Width}}"/></div><figcaption id="gallery_figcaption_{{item.Guid}}" class="galleryFigCaption" ng-if="page.DoShowGalleryItemListText != 0 && item.ListText" bind-unsafe-html="item.ListText"></figcaption></figure></div>',
		c = ["$scope", "$element", function(b, c) {
			b.gallery = {}, b.gallery.class = 1 == b.page.DznPicviewGuid ? "noLink" : "";
			var d = pb.constants.minImgDisplay,
				e = pb.constants.maxImgDisplay;
			b.infScrollSettings = {}, b.infScrollSettings.totalDisplayed = d, setTimeout(function() {
				void 0 != b.page.GalleryItems && (e = b.page.GalleryItems.length), void 0 != b.infscroll && 0 == b.infscroll ? (b.infScrollSettings.totalDisplayed = e, b.infScrollSettings.noInfScroll = !0, pb.utils.digest(b, !0)) : b.infScrollSettings.noInfScroll = !1, b.infScrollSettings.scrolltoleft = 1 == b.scrolltoleft ? !0 : !1
			}, 1), setTimeout(function() {
				b.base.broadCast("renderpage")
			}, 10);
			var f = function() {
				setTimeout(function() {
					c.find(".imageBox").css("border-color", b.site.ThumbDecorationBorderColor), c.find(".imageBox").find("img").css("border-color", b.site.ThumbDecorationBorderColor)
				}, 1)
			};
			f();
			var g = function() {
				pb.utils.changeFigStyles(b, ".galleryFigCaption", "gallery style")
			};
			g(), b.infScrollSettings.totalDisplayed <= e + d && (b.infScrollSettings.loadMoreCond = function() {
				setTimeout(function() {
					b.base.broadCast("scrollGalleryItems")
				}, 1), f(), g()
			}, b.infScrollSettings.items = b.page.GalleryItems);
			var h = b.$watch("site.ThumbDecorationBorderColor", function() {
				f()
			}),
				i = b.$on("updateWhenUploadOrAdd", function(a, c) {
					"gallery" == c && (b.$$phase || b.$digest(), f())
				}),
				j = b.$on("editListText", function(a, b) {
					"gallery" == b && g()
				});
			pb.utils.watchFontStyles(b, ".galleryFigCaption", "Gallery Font Styles"), b.gallery.openItem = function(c) {
				if ("goToItem" == b.whenClick) sliderH.goToItem(b.page.Guid, c.Idx), 1 == b.gallery.whenClickScroll && $("html, body").animate({
					scrollTop: $(".slider").offset().top - 20
				}, "slow");
				else {
					var d, e, f;
					if (b.parentPage) {
						if (1 == b.parentPage.DznPicviewGuid) return !1;
						d = sliderH.settingsH.getSettingsForPage(b.parentPage), e = b.page.Guid + "-" + b.parentPage.Guid, f = b.page.GalleryItems || [], sliderH.openInPopup(e, f, c.Idx, d), pb.utils.setStylesOnLightBox(b, d)
					} else {
						if (1 == b.page.DznPicviewGuid) return !1;
						if (10 == b.page.DznPicviewGuid) d = sliderH.settingsH.getSettingsForPage(b.page), e = b.page.Guid, f = b.page.GalleryItems || [], sliderH.openInPopup(e, f, c.Idx, d), pb.utils.setStylesOnLightBox(b, d);
						else {
							var g = "/" + b.page.Uri + "/image/" + c.Idx;
							a.path(g)
						}
					}
				}
			}, b.$on("$destroy", function() {
				try {
					h(), i(), j(), $(window).off("scroll")
				} catch (a) {}
			})
		}];
	return {
		restrict: "E",
		scope: {
			page: "=",
			site: "=",
			base: "=",
			parentPage: "="
		},
		link: function(a, b, c) {
			a.infscroll = "false" == c.infscroll ? !1 : allowinfscroll, a.scrolltoleft = void 0 == c.scrolltoleft || "false" == c.scrolltoleft ? !1 : !0, a.thumbSize = void 0 == c.thumbSize ? "w400" : "" == c.thumbSize ? void 0 : c.thumbSize, a.gallery.thumbSize = a.thumbSize, a.whenClick = c.whenClick || "", a.gallery.whenClickScroll = c.whenClickScroll || ""
		},
		controller: c,
		replace: !0,
		template: b
	}
}], pbAng.dirs.collection = ["$location", "$filter", "$compile", function(a, b, c) {
	var d = '<div id="collection_{{page.Guid}}" class="collection clearfix"><figure id="collection_figure_{{colPage.Guid}}" ng-repeat="colPage in page.CollectionPages |orderBy: \'Idx\' | limitTo:collection.totalDisplayed | filter: collection.ByType track by colPage.PageGuid" " ><div class="imageBox" ng-if="collection.hasImage(colPage)" ><a href="javascript:void(0)" ng-click="collection.openPage(colPage)"><img id="collection_img_{{colPage.Guid}}" data-filename="{{::colPage.ListThumb.FileName}}" ng-src="{{::collection.listImageSrc(colPage)}}" pb-gallery-err-img-src s3id={{::colPage.ListThumb.S3LocationId}} size="{{::thumbSize}}" data-width="{{::collection.listImageWidth(colPage)}}" data-height="{{::collection.listImageHeight(colPage)}}" class="image" pb-nice-load alt="{{::base.getImgAltOrPageTitle(colPage.ListTitle)}}" </a></div><div class="imageBox noImage" pb-style="base.getBoxBGColor()" ng-if="!collection.hasImage(colPage)" ng-click="collection.openPage(colPage)"></div><figcaption id="collection_figcaption_{{colPage.Guid}}" ng-if="colPage.ListTitle" ng-click="collection.openPage(colPage)"><a class="collectionFigCaption" href="javascript:void(0)" bind-unsafe-html="colPage.ListTitle"></a></figcaption></figure></div>',
		e = ["$scope", "$element", function(d, e) {
			d.collection = {}, d.collection.ByType = "", d.collection.listOfPages = [], setTimeout(function() {
				d.base.broadCast("renderpage")
			}, 10);
			var f = function() {
				setTimeout(function() {
					e.find(".imageBox").css("border-color", d.site.ThumbDecorationBorderColor), e.find(".imageBox").find("img").css("border-color", d.site.ThumbDecorationBorderColor)
				}, 1)
			};
			f();
			var g = function() {
				pb.utils.changeFigStyles(d, ".collectionFigCaption", "onepage collectionFigCaption")
			};
			g();
			var h = pb.constants.minImgDisplay,
				i = pb.constants.maxImgDisplay;
			d.collection.totalDisplayed = h, setTimeout(function() {
				void 0 != d.page.CollectionPages && (i = d.page.CollectionPages.length), void 0 != d.infscroll && 0 == d.infscroll && (d.collection.totalDisplayed = i, d.$digest())
			}, 1), d.loadMore = function() {
				d.collection.totalDisplayed += h, d.collection.totalDisplayed <= i + h && (setTimeout(function() {
					d.base.broadCast("scrollCollectionItems")
				}, 1), f(), g())
			}, setTimeout(function() {
				if (void 0 == d.infscroll || 1 == d.infscroll) {
					var a = $(".collection"),
						b = $(window).height();
					pb.utils.setInterval(function() {
						var c = a.height();
						return void 0 == d.page.CollectionPages ? !0 : void 0 != d.page.CollectionPages && 0 == d.page.CollectionPages.length ? !0 : void 0 != d.page.CollectionPages && d.collection.totalDisplayed > d.page.CollectionPages.length ? !0 : b > c ? (d.loadMore(), void pb.utils.digest(d, !0)) : !0
					}, 1e3), $(window).scroll(function() {
						var a, b, c, e = .95;
						1 == d.scrolltoleft ? (a = $(window).scrollLeft(), b = $(document).width(), c = $(window).width()) : (a = $(window).scrollTop(), b = $(document).height(), c = $(window).height()), a / (b - c) > e && d.collection.totalDisplayed <= i + h && (d.loadMore(), pb.utils.digest(d, !0))
					})
				}
			}, 1); {
				var j = d.$watch("site.ThumbDecorationBorderColor", function() {
					f()
				});
				d.$on("updateWhenUploadOrAdd", function(a, b) {
					"collection" == b && (f(), g(), pb.utils.digest(d, !0))
				})
			}
			pb.utils.watchFontStyles(d, ".collectionFigCaption", "Collection Font Styles"), d.collection.styles = {
				getFilterColor: function() {
					var a = {};
					return a.color = d.site.MenuFontColor, a
				},
				getFilterBorderColor: function() {
					var a = d.site.MenuFontColor,
						b = {};
					return b["border-color"] = pb.utils.getTransparentColor(a, .2), b
				}
			}, d.collection.listImageSrc = function(a) {
				return a.ListThumb ? (d.thumbSize = pb.utils.fixSizeForSmallImage(d.thumbSize, a.ListThumb.Height, a.ListThumb.Width), a.ListThumb.VideoThumbUrl ? a.ListThumb.VideoThumbUrl : b("pboxImage")(a.ListThumb.FileName, a.ListThumb.S3LocationId, d.thumbSize)) : void 0 != a.ListThumbVideoThumbUrl && a.ListThumbVideoThumbUrl ? a.ListThumbVideoThumbUrl : ""
			}, d.collection.listImageHeight = function(a) {
				return a.ListThumb ? a.ListThumb.Height : a.ListThumbVideoHeight ? a.ListThumbVideoHeight : ""
			}, d.collection.listImageWidth = function(a) {
				return a.ListThumb ? a.ListThumb.Width : a.ListThumbVideoWidth ? a.ListThumbVideoWidth : ""
			}, d.collection.openPage = function(b) {
				if (d.multiPage) {
					var e = d.multiPage.selector || "",
						f = d.multiPage.type || "",
						g = $(e);
					return g.html(""), g.html(c("<page-part-loader page-guid='" + b.PageGuid + "' base='base' site='site' page='page' type='" + f + "'></page-part-loader>")(d)), $("html, body").animate({
						scrollTop: 0
					}, "slow"), !1
				}
				a.path(b.Uri)
			}, d.collection.hasImage = function(a) {
				return "" != d.collection.listImageSrc(a)
			}, d.$on("$destroy", function() {
				try {
					j(), $(window).off("scroll")
				} catch (a) {}
			})
		}];
	return {
		restrict: "E",
		controller: e,
		replace: !0,
		template: d,
		link: function(a, b, c) {
			a.infscroll = "false" == c.infscroll ? !1 : allowinfscroll, a.scrolltoleft = void 0 == c.scrolltoleft || "false" == c.scrolltoleft ? !1 : !0, a.thumbSize = void 0 == c.thumbSize ? "w400" : "" == c.thumbSize ? void 0 : c.thumbSize, c.multiPage && (a.multiPage = JSON.parse(c.multiPage) || {})
		}
	}
}], pbAng.dirs.products = ["$location", "$filter", "$compile", function(a, b, c) {
	var d = '<div id="product_{{page.Guid}}" class="products clearfix"><figure id="product_figure_{{product.Guid}}" ng-repeat="product in page.Products | orderBy:\'Idx\' | limitTo:productsDir.totalDisplayed track by product.Guid" ><div class="imageBox"><img id="product_img_{{product.Guid}}" alt="{{::base.getImgAltOrPageTitle(product.Title)}}"  title="{{::base.getImgAltOrPageTitle(product.Title)}}" gallery-thumb pb-nice-load class="image" ng-click="productsDir.openItem(product)" item="::productsDir.getFirstItem(product)" ng-src="{{::productsDir.getFirstThumbSrc(product)}}" size="{{::productsDir.thumbSize}}"data-height="{{::productsDir.getFirstThumbHeight(product)}}"data-width="{{::productsDir.getFirstThumbWidth(product)}}"/></div><figcaption id="product_figcaption_{{product.Guid}}" ng-click="productsDir.openItem(product)" class="productFigCaption"><span class="title" ng-if="page.DoShowProductTitle != 0 && product.Title" bind-unsafe-html="product.Title"></span><span class="price" ng-if="page.IsProductsHasNoPrice != 1 && (product.Price > 0 || (page.IsProductsHasSamePrice == 1 && page.ProductSamePrice > 0)) && product.IsSoldOut != 1">{{productsDir.calculatedPrice(product)}} {{site.ShopSettings.Currency}}</span><span class="price" ng-if="product.IsSoldOut == 1" ng-bind-html="site.UserTranslatedText.SoldOut"></span></figcaption></figure></div>',
		e = ["$scope", "$element", function(d, e) {
			var f = function(a) {
				return a.Items && a.Items.length > 0 ? a.Items[0] : null
			};
			d.productsDir = {}, d.productsDir.class = 0 == d.page.DsnProductViewGuid ? "noLink" : "";
			var g = pb.constants.minImgDisplay,
				h = pb.constants.maxImgDisplay;
			d.productsDir.totalDisplayed = g, setTimeout(function() {
				void 0 != d.page.Products && (h = d.page.Products.length)
			}, 1), setTimeout(function() {
				d.base.broadCast("renderpage")
			}, 10);
			var i = function() {
				setTimeout(function() {
					e.find(".imageBox").css("border-color", d.site.ThumbDecorationBorderColor), e.find(".imageBox").find("img").css("border-color", d.site.ThumbDecorationBorderColor)
				}, 1)
			};
			i();
			var j = function() {
				setTimeout(function() {
					e.find(".productFigCaption").css("font-family", d.site.ListFontFamily), e.find(".productFigCaption").css("font-size", d.site.ListFontSize), e.find(".productFigCaption").css("color", d.site.ListFontColor), e.find(".productFigCaption").css("letter-spacing", parseInt(d.site.ListSpacing) / 4 + "px"), e.find(".productFigCaption").css("text-transform", 1 == d.site.ListUpperCase ? "uppercase" : "");
					var a = pb.utils.getCssStyleAndWeight(d.site.ListFontVariant);
					null != a && ("" != a["font-style"] && e.find(".productFigCaption").css("font-style", a["font-style"]), "" != a["font-weight"] && e.find(".productFigCaption").css("font-weight", a["font-weight"]))
				}, 1)
			};
			j(), d.loadMore = function() {
				d.productsDir.totalDisplayed += g, d.productsDir.totalDisplayed <= h + g && (setTimeout(function() {
					d.base.broadCast("scrollProductItems")
				}, 1), i(), j())
			}, setTimeout(function() {
				var a = $(".products"),
					b = $(window).height();
				pb.utils.setInterval(function() {
					var c = a.height();
					return void 0 == d.page.Products ? !0 : void 0 != d.page.Products && 0 == d.page.Products.length ? !0 : void 0 != d.page.Products && d.productsDir.totalDisplayed > d.page.Products.length ? !0 : b > c ? (d.loadMore(), void pb.utils.digest(d, !0)) : !0
				}, 1e3), (void 0 == d.infscroll || 1 == d.infscroll) && $(window).scroll(function() {
					var a, b, c, e = .95;
					a = $(window).scrollTop(), b = $(document).height(), c = $(window).height(), a / (b - c) > e && d.productsDir.totalDisplayed <= h + g && (d.loadMore(), d.$digest())
				})
			}, 1);
			var k, l, m, n, o, p, q = d.$watch("site.ThumbDecorationBorderColor", function() {
				i()
			});
			setTimeout(function() {
				k = d.$watch("site.ListFontFamily", function() {
					isAdmin || k(), $(".productFigCaption").css("font-family", d.site.ListFontFamily)
				}), l = d.$watch("site.ListFontSize", function() {
					isAdmin || l(), $(".productFigCaption").css("font-size", d.site.ListFontSize)
				}), m = d.$watch("site.ListFontColor", function() {
					isAdmin || m(), $(".productFigCaption").css("color", d.site.ListFontColor)
				}), o = d.$watch("site.ListSpacing", function() {
					isAdmin || o(), $(".productFigCaption").css("letter-spacing", parseInt(d.site.ListSpacing) / 4 + "px")
				}), p = d.$watch("site.ListUpperCase", function() {
					isAdmin || p(), $(".productFigCaption").css("text-transform", 1 == d.site.ListUpperCase ? "uppercase" : "")
				}), n = d.$watch("site.ListFontVariant", function() {
					isAdmin || n();
					var a = pb.utils.getCssStyleAndWeight(d.site.ListFontVariant);
					"" != a["font-style"] && $(".productFigCaption").css("font-style", a["font-style"]), "" != a["font-weight"] && $(".productFigCaption").css("font-weight", a["font-weight"])
				})
			}, 1), d.productsDir.isThumbsameRation = function() {
				return 1 != d.site.ThumbDecorationHasShadow || "thumbssameratio" != d.page.DsnTemplateViewFile && "thumbsproducts" != d.page.DsnTemplateViewFile ? !1 : !0
			}, d.productsDir.getFirstThumbSrc = function(a) {
				var c = f(a);
				return c && c.FileName ? (d.productsDir.thumbSize = pb.utils.fixSizeForSmallImage(d.productsDir.thumbSize, c.Height, c.Width), b("pboxImage")(c.FileName, c.S3LocationId, d.productsDir.thumbSize)) : c && c.VideoUrl && "" != c.VideoUrl ? c.VideoThumbUrl : "noimage"
			}, d.productsDir.getFirstItem = function(a) {
				var b = f(a);
				return b ? b : "noimage"
			}, d.productsDir.getFirstThumbHeight = function(a) {
				var b = f(a);
				return b && b.Height ? b.Height : null
			}, d.productsDir.getFirstThumbWidth = function(a) {
				var b = f(a);
				return b && b.Width ? b.Width : null
			}, d.productsDir.openItem = function(b) {
				if (d.multiPage) {
					d.base.currentProduct = b;
					var e = d.multiPage.selector || "",
						f = d.multiPage.type || "",
						g = $(e);
					return g.html(""), g.html(c("<page-part-loader current-product='base.currentProduct' site='site' page='page' base='base' type='" + f + "' ></page-part-loader>")(d)), !1
				}
				if (0 == d.page.DsnProductViewId) return !1;
				var h = "/" + d.page.Uri + "/" + b.Url;
				a.path(h)
			}, d.productsDir.calculatedPrice = function(a) {
				var b = 0,
					c = !1;
				return a.Price && (b = a.Price, a.Options && (c = a.Options)), d.page.IsProductsHasSamePrice && (b = d.page.ProductSamePrice, c = d.page.ProductSameVariations ? d.page.ProductSameVariations : !1), b = parseFloat(b), c && $.each(c, function(a, c) {
					if (c.Alternatives && c.Alternatives.length > 0) {
						var d = c.Alternatives[0];
						b += parseFloat(d.Operation + d.PriceVariation)
					}
				}), pb.utils.isIntegerValue(b) || (b = b.toFixed(2)), b
			}, d.$on("$destroy", function() {
				try {
					q(), k(), l(), m(), n(), o(), p(), $(window).unbind("scroll")
				} catch (a) {}
			})
		}];
	return {
		restrict: "E",
		controller: e,
		replace: !0,
		template: d,
		link: function(a, b, c) {
			a.thumbSize = c.thumbSize || "w400", a.productsDir.thumbSize = a.thumbSize, c.multiPage && (a.multiPage = JSON.parse(c.multiPage) || {})
		}
	}
}], pbAng.dirs.addToCart = ["$location", "$filter", "$timeout", function(a, b, c) {
	var d = '<div class="info"><h1 ng-if="page.DoShowProductTitle == 1" class="h1FontStyle" pb-style="base.getH1Styles()" ng-bind-html="base.currentProduct.Title"></h1><div bind-unsafe-html="base.currentProduct.Description" block-content></div><div class="price" ng-if="base.currentProduct.IsSoldOut == 1" pb-style="base.getPStyle()" ng-bind-html="site.UserTranslatedText.SoldOut"></div><div ng-if="addToCart.getPrice() || page.IsProductsHasNoPrice == 1"><div ng-if="addToCart.getPrice()" class="price" pb-style="base.getH3Styles()">{{addToCart.calculatedPrice()}}</div><div ng-if="addToCart.getPrice()" class="options" ng-repeat="option in addToCart.getProductOptions() | orderBy:\'Idx\'"><h3 pb-style="base.getH3Styles()" bind-unsafe-html="option.Title"></h3><select ng-init="addToCart.selected[$index] = option.Alternatives[0]"ng-model="addToCart.selected[$index]"ng-options="o as addToCart.getActualTitle(o.Title) for o in option.Alternatives"></select></div><div ng-if="base.currentProduct.IsSoldOut != 1" class="addToCartWrapper"><styled-button ng-click="addToCart.add()" ng-bind-html="site.UserTranslatedText.AddToCart"></styled></div></div><div class="message" pb-style="base.getBorderColor()"><span ng-if="!base.isAdmin" pb-style="base.getH3Styles()" bind-unsafe-html="addToCart.addedText"></span><span ng-if="base.isAdmin" pb-style="base.getH3Styles()" bind-unsafe-html="admin.lang.messages.addToCartAdmin"></span></div></div>',
		e = ["$scope", "$element", function(a) {
			var b = null;
			a.addToCart = {
				text: a.site.UserTranslatedText.AddToCart,
				addText: a.site.UserTranslatedText.AddToCart,
				addedText: a.site.UserTranslatedText.ItemWasAddedToTheCart,
				selected: [],
				getActualTitle: function(a) {
					return pb.utils.decodeHtmlSpecialChar(a)
				},
				getProductOptions: function() {
					return 1 == a.page.IsProductsHasSamePrice ? a.page.ProductSameVariations : 1 == a.page.IsProductsHasNoPrice ? 0 : a.base.currentProduct.Options
				},
				getPrice: function() {
					return 1 == a.page.IsProductsHasSamePrice ? a.page.ProductSamePrice : 1 == a.page.IsProductsHasNoPrice ? 0 : a.base.currentProduct.Price
				},
				calculatedPrice: function() {
					var b = parseFloat(a.addToCart.getPrice());
					return $.each(this.selected, function(a, c) {
						c && (b += parseFloat(c.Operation + c.PriceVariation))
					}), pb.utils.isIntegerValue(b) || (b = b.toFixed(2)), b ? (this.show = !0, b + " " + a.site.ShopSettings.Currency) : void 0
				},
				add: function() {
					if (!a.base.isAdmin) {
						var d, e = a.base.currentProduct,
							f = this.selected,
							g = amplify.store("cart") || [],
							h = CryptoJS.MD5(e.Guid + JSON.stringify(f)).toString(CryptoJS.enc.Hex),
							i = 0;
						$.each(g, function(a, b) {
							b.hash == h && (d = b), i += b.quantity
						});
						var j = 0,
							k = [];
						if ($.each(f, function(b, c) {
							j += parseFloat(c.Operation + c.PriceVariation);
							var d = 1 == a.page.IsProductsHasSamePrice ? pb.utils.findItemFromArray(a.page.ProductSameVariations, "Guid", c.ProductOptionGuid) : pb.utils.findItemFromArray(e.Options, "Guid", c.ProductOptionGuid);
							k.push({
								guid: c.Guid,
								title: c.Title,
								optionGuid: d.Guid,
								optionTitle: d.Title
							})
						}), d) d.quantity += 1;
						else {
							var l = parseFloat(a.addToCart.getPrice()) + j;
							l = l.toFixed(2);
							var m = pb.utils.getTimestamp().toString(),
								n = pb.utils.getUniqeStringWithoutCapitalLetters(3).toString(),
								o = pb.utils.getUniqeStringWithoutCapitalLetters(3).toString();
							d = {
								quantity: 1,
								product: {
									guid: e.Guid,
									items: e.Items,
									price: l,
									title: e.Title,
									url: e.Url,
									alts: k
								},
								hash: h,
								token: n + m + o
							}, g.push(d)
						}
						i += 1, amplify.store("itemsInCart", i), amplify.store("cart", g), amplify.store("cartExpire", !1), a.base.cart.quantity = amplify.store("itemsInCart"), a.base.cart.items = amplify.store("cart"), a.addToCart.text = a.addToCart.addedText, b = c(function() {
							a.addToCart.text = a.addToCart.addText
						}, 1e3)
					}
					pb.utils.showMessageAfterSubmit($(".message"))
				}
			}, a.$on("$destroy", function() {
				try {
					null != b && c.cancel(b)
				} catch (a) {}
			})
		}];
	return {
		restrict: "E",
		controller: e,
		replace: !0,
		template: d
	}
}], pbAng.dirs.cartButton = [function() {
	var a = '<li ng-if="base.cart.quantity > 0"><div class="cartButton"><styled-button cartbutton=1 ng-href="{{\'/checkout\' | link}}" >{{base.cart.quantity}} {{site.UserTranslatedText.Item}}</styled-button></div></li>';
	return {
		restrict: "E",
		replace: !0,
		template: a
	}
}], pbAng.front.ctrls = {}, pbAng.front.ctrls.unlockCtrl = ["$scope", "$location", function(a, b) {
	a.unlock = {}, a.pageUrl = b.hash(), a.unlock.password = "", $("#unlockPagePassword").focus(function() {
		$(this).removeClass("invalidPass")
	}), $("#unlockPagePassword").keydown(function() {
		$(this).removeClass("invalidPass")
	}), a.unlock.doLogin = function() {
		amplify.request({
			resourceId: "loginToPage",
			data: {
				password: a.unlock.password,
				url: a.pageUrl
			},
			success: function(b) {
				1 != b.isSuccess ? $("#unlockPagePassword").addClass("invalidPass") : (a.site.IsLoggedIn = !0, a.site.Timeout = b.exp, pb.data.site = a.site, pb.data.updateEntity.Site(), a.unlock.password = "", window.location = "/" + a.pageUrl)
			},
			error: function(a, b) {
				console.log(a, b), console.log("Error!")
			}
		})
	}
}], pbAng.front.ctrls.checkoutCtrl = ["$scope", "$filter", "$location", "$window", function(a, b, c) {
	var d = pb.utils.findItemFromArray(a.site.ShopSettings.ShippingRegions, "CountryCode", "WORLD"),
		e = pb.utils.findItemFromArray(a.site.ShopSettings.TaxRegions, "CountryCode", "WORLD");
	amplify.request({
		resourceId: "get-countries",
		success: function(b) {
			if (a.checkout.allCountries = b.data, a.checkout.euCountries = pb.utils.searchInArray(a.checkout.allCountries, "type", "EU"), d) {
				a.checkout.filteredCountries = a.checkout.allCountries;
				var c = pb.utils.searchInArray(a.checkout.allCountries, "type", "US STATES");
				$.each(c, function(b, c) {
					var d = pb.utils.findItemFromArray(a.site.ShopSettings.ShippingRegions, "CountryCode", c.code);
					d || pb.utils.removeItemFromArray2(a.checkout.filteredCountries, "code", c.code)
				})
			} else {
				var e = [];
				$.each(a.site.ShopSettings.ShippingRegions, function(b, c) {
					if ("EU" == c.CountryCode) $.each(a.checkout.euCountries, function(a, b) {
						var c = pb.utils.findItemFromArray(e, "code", b.code);
						c || e.push(b)
					});
					else {
						var d = pb.utils.findItemFromArray(a.checkout.allCountries, "code", c.CountryCode);
						if (d) {
							var f = pb.utils.findItemFromArray(e, "code", d.code);
							f || e.push(d)
						}
					}
				}), a.checkout.filteredCountries = e
			}
			a.$applyAsync()
		}
	}), a.checkout = {
		allCountries: [],
		selectedCountryCode: "",
		filteredCountries: [],
		euCountries: [],
		shippingCost: 0,
		tax: 0,
		taxCost: 0,
		subtotal: 0,
		total: 0,
		sum: 0,
		checkoutData: "",
		agree: !1,
		view: "application/views/app/_front/views/statics/checkout/viewcart.html",
		isAdmin: isAdmin,
		isShopConfigured: function() {
			return a.site.ShopSettings.ShopName && a.site.ShopSettings.Email && a.site.ShopSettings.Address && a.site.ShopSettings.City && a.site.ShopSettings.CountryCode && a.site.ShopSettings.Currency && a.site.ShopSettings.City ? !1 : "paypal" != a.site.ShopSettings.PaymentMethod || a.site.ShopSettings.PayPalEmail ? !0 : !1
		},
		changeCountry: function() {
			this.getShippingPrice(), this.getTaxPercent(), this.getSubTotal(), this.getTaxPrice(), this.getTotal()
		},
		getShippingPrice: function() {
			var b, c = pb.utils.findItemFromArray(a.site.ShopSettings.ShippingRegions, "CountryCode", "EU");
			if (c) {
				var e = pb.utils.findItemFromArray(a.checkout.euCountries, "code", this.selectedCountryCode);
				e && (b = c)
			}
			var f = pb.utils.findItemFromArray(a.site.ShopSettings.ShippingRegions, "CountryCode", this.selectedCountryCode);
			f && (b = f), b ? this.shippingCost = b.ShippingCost : d ? (b = pb.utils.findItemFromArray(a.site.ShopSettings.ShippingRegions, "CountryCode", "WORLD"), this.shippingCost = b.ShippingCost) : this.shippingCost = 0, this.shippingCost = Math.round(100 * this.shippingCost) / 100
		},
		getTaxPercent: function() {
			if (this.selectedCountryCode) {
				var b, c = pb.utils.findItemFromArray(a.site.ShopSettings.TaxRegions, "CountryCode", "EU");
				if (c) {
					var d = pb.utils.findItemFromArray(a.checkout.euCountries, "code", this.selectedCountryCode);
					d && (b = c)
				}
				var f = pb.utils.findItemFromArray(a.site.ShopSettings.TaxRegions, "CountryCode", this.selectedCountryCode);
				f && (b = f), b ? this.tax = Math.round(100 * b.TaxPercent) / 100 : e ? (b = pb.utils.findItemFromArray(a.site.ShopSettings.TaxRegions, "CountryCode", "WORLD"), this.tax = Math.round(100 * b.TaxPercent) / 100) : this.tax = 0
			} else this.tax = 0
		},
		getCalculatedPrice: function(a) {
			var b = parseFloat(a.product.price * a.quantity);
			return pb.utils.isIntegerValue(b) || (b = b.toFixed(2)), b
		},
		getTaxPrice: function() {
			this.taxCost = Math.round(100 * (this.sum - this.subtotal)) / 100
		},
		getSubTotal: function() {
			var b = 0;
			$.each(a.base.cart.items, function(a, c) {
				b += c.product.price * c.quantity
			}), this.sum = Math.round(100 * b) / 100, this.subtotal = 0 == this.tax ? b : this.sum / (1 + this.tax / 100), this.subtotal = Math.round(100 * this.subtotal) / 100
		},
		getTotal: function() {
			this.total = Math.round(100 * (parseFloat(this.sum) + parseFloat(this.shippingCost))) / 100
		},
		getFirstThumbSrc: function(a) {
			var c = this.getFirstThumb(a);
			return c && c.FileName ? b("pboxImage")(c.FileName, c.S3LocationId, "w400") : c.src ? c.src : "noimage"
		},
		getFirstThumb: function(a) {
			return a.items && a.items.length > 0 ? a.items[0] : null
		},
		changeQuantity: function(b) {
			b && (b.quantity < 1 ? b.quantity = 1 : b.quantity > 999 && (b.quantity = 999), a.checkout.changeCountry(), a.base.cart.quantity = this.countItems(), amplify.store("itemsInCart", a.base.cart.quantity), amplify.store("cart", a.base.cart.items), amplify.store("cartExpire", !1))
		},
		increaseQuantity: function(b) {
			b && (b.quantity += 1, a.checkout.changeQuantity(b))
		},
		decreaseQuantity: function(b) {
			b && (b.quantity -= 1, a.checkout.changeQuantity(b))
		},
		deleteItem: function(b) {
			a.base.cart.items.splice(b, 1), a.base.cart.quantity = this.countItems(), amplify.store("cart", a.base.cart.items), amplify.store("itemsInCart", a.base.cart.quantity), amplify.store("cartExpire", !1), a.checkout.changeCountry(), 0 == a.base.cart.quantity && a.checkout.clearAll()
		},
		countItems: function() {
			var b = 0;
			return $.each(a.base.cart.items, function(a, c) {
				b += c.quantity
			}), b
		},
		payNow: function() {
			if (!a.checkout.isAdmin) {
				var b = !1,
					c = [];
				if ($.each(a.base.cart.items, function(a, d) {
					var e = [];
					if ($.each(d.product.alts, function(a, b) {
						e.push({
							guid: b.guid,
							optionGuid: b.optionGuid
						})
					}), !d.token) {
						var f = pb.utils.getTimestamp().toString(),
							g = pb.utils.getUniqeStringWithoutCapitalLetters(3).toString(),
							h = pb.utils.getUniqeStringWithoutCapitalLetters(3).toString();
						d.token = g + f + h
					}
					c.push({
						token: d.token,
						quantity: d.quantity,
						guid: d.product.guid,
						alts: e
					}), d.quantity || (b = !0)
				}), 0 == b) {
					a.base.cart.cartExpire = amplify.store("cartExpire") || !1;
					var d = function() {
						var b = a.base.cart.cartExpire && a.base.cart.cartExpire.expires ? a.base.cart.cartExpire.expires : pb.utils.getTimestamp() + pb.constants.productOrderExpireTime,
							e = a.base.cart.cartExpire && a.base.cart.cartExpire.guid ? a.base.cart.cartExpire.guid : null,
							f = {
								cart: c,
								expire: b
							}, g = CryptoJS.MD5(JSON.stringify(JSON.stringify(f))).toString(CryptoJS.enc.Hex);
						amplify.request({
							resourceId: "checkout",
							data: {
								hash: g,
								guid: e,
								cart: c
							},
							success: function(c) {
								if (c && c.Guid && c.Status) {
									a.base.cart.cartExpire = {
										hash: g,
										guid: c.Guid,
										expires: b
									}, amplify.store("itemsInCart", a.base.cart.quantity), amplify.store("cart", a.base.cart.items), amplify.store("cartExpire", a.base.cart.cartExpire), pb.utils.setCookie("cartId", c.Guid, 2 * pb.constants.productOrderExpireTime);
									var e = pb.constants.checkoutPageLike,
										f = e + "/" + a.site.Url + "/" + c.Guid + "/checkout";
									window.open(f, "_self")
								} else a.base.cart.cartExpire = !1, d()
							}
						})
					};
					d()
				}
			}
		},
		quantityButtonHover: function(a) {
			setTimeout(function() {
				var b = $("#quantity-nav-" + a),
					c = b.find(".quantity-up"),
					d = b.find(".quantity-down"),
					e = $("#delete-circle-" + a);
				c.length > 0 && d.length > 0 && e.length > 0 && (c.hover(function() {
					c.css("opacity", .9)
				}, function() {
					c.css("opacity", 1)
				}), d.hover(function() {
					d.css("opacity", .9)
				}, function() {
					d.css("opacity", 1)
				}), e.hover(function() {
					e.css("opacity", .5)
				}, function() {
					e.css("opacity", 1)
				}))
			}, 10)
		},
		getStyle: function() {
			var b = {};
			b.color = a.site.PFontColor, b["font-family"] = a.site.PFontFamily, b["letter-spacing"] = parseInt(a.site.PSpacing) / 4 + "px";
			var c = parseInt(a.site.PLineHeight) / 4;
			c = 13 > c ? 13 : c, b["line-height"] = c + "px";
			var d = pb.utils.getCssStyleAndWeight(a.site.PFontVariant);
			return b["font-style"] = d["font-style"], b["font-weight"] = d["font-weight"], b
		},
		getLinkTextStyle: function() {
			var b = {};
			b.color = a.site.PLinkColor, b["font-family"] = a.site.PFontFamily, b["letter-spacing"] = parseInt(a.site.PSpacing) / 4 + "px";
			var c = pb.utils.getCssStyleAndWeight(a.site.PFontVariant);
			return b["font-style"] = c["font-style"], b["font-weight"] = c["font-weight"], b
		},
		getBorderStyle: function() {
			var b = {};
			return b["border-color"] = pb.utils.getTransparentColor(a.site.PFontColor), b
		},
		getCheckoutButtonStyle: function() {
			var b = {};
			return b.color = a.site.PFontColor, b["border-color"] = a.site.PFontColor, b
		},
		showTermsCondition: function() {
			a.base.popup.open("termsconditions")
		},
		clearCart: function() {
			a.base.cart.quantity = 0, a.base.cart.items = [], amplify.store("itemsInCart", 0), amplify.store("cart", []), amplify.store("cartExpire", !1), pb.utils.deleteCookie("cartId"), pb.utils.deleteCookie("removeCartId")
		},
		clearAll: function() {
			a.checkout.clearCart(), a.checkout.view = "", c.path("/")
		},
		hasToFixProdView: !1
	}, a.base.cart.cartExpire = amplify.store("cartExpire") || !1, a.base.cart.cartExpire && a.base.cart.cartExpire.expires && angular.isNumber(a.base.cart.cartExpire.expires) && a.base.cart.cartExpire.expires <= pb.utils.getTimestamp() ? (console.log("Cart is expired: " + a.base.cart.cartExpire), a.checkout.clearAll()) : a.base.cart.quantity && 0 != a.base.cart.quantity ? a.checkout.changeCountry() : a.checkout.clearAll();
	var f = function() {
		(pb.environment.isMobile || pb.environment.width < pb.environment.minWidth) && (pb.environment.width < 640 ? (a.checkout.hasToFixProdView = !0, pb.utils.digest(a)) : (a.checkout.hasToFixProdView = !1, pb.utils.digest(a)))
	};
	f(), pb.utils.resizeAndDestroy(a, "checkoutResize", function() {
		f()
	})
}], pbAng.front.ctrls.noStartPageCtrl = ["$scope", function(a) {
	a.noStartPage = {}, a.noStartPage.hasPages = pb.data.menu.length > 0 || pb.data.menu.pages > 0, a.noStartPage.isAdmin = pb.environment.isAdmin
}], pbAng.front.ctrls.popupSharePostCtrl = ["$scope", function(a) {
	a.sharePost = {}, a.sharePost.post = a.base.popup.data, a.sharePost.doFollow = function() {
		amplify.request({
			resourceId: "saveFollower",
			data: {
				name: a.sharePost.followName,
				email: a.sharePost.followEmail
			},
			success: function() {
				a.sharePost.didFollow = !0, a.$digest()
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}
}], pbAng.front.ctrls.clubGalleryCtrl = ["$scope", function(a) {
	a.clubGallery = {}, a.clubGallery.openedGalleries = {}, a.clubGallery.openGallery = function(b) {
		amplify.request({
			resourceId: "getMemberGalleryByGuid",
			data: {
				pageGuid: b.Guid,
				siteId: b.SiteId
			},
			success: function(b) {
				if (b.Page && b.Site) {
					var c;
					c = a.clubGallery.openedGalleries[b.Page.Guid] ? a.clubGallery.openedGalleries[b.Page.Guid] : {
						page: b.Page,
						site: b.Site
					}, a.clubGallery.popupPage = c.page, a.clubGallery.popupSite = c.site, a.$digest(), pb.utils.positionClubPopup()
				}
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}, a.clubGallery.search = function(b) {
		return a.gallerySearch ? (console.log(a.gallerySearch), -1 != b.PageTitle.toLowerCase().indexOf(a.gallerySearch) || -1 != b.SiteTitle.toLowerCase().indexOf(a.gallerySearch) ? !0 : !1) : !0
	}, a.clubGallery.closePopup = function() {
		a.clubGallery.popupPage = null, a.clubGallery.popupSite = null, a.$digest()
	}
}], pbAng.front.ctrls.clubBlogCtrl = ["$scope", function(a) {
	a.clubBlog = {}, a.clubBlog.openedPosts = {}, a.clubBlog.openPost = function(b) {
		amplify.request({
			resourceId: "getMemberPostByGuid",
			data: {
				postGuid: b.Guid,
				siteId: b.SiteId
			},
			success: function(b) {
				if (b.Post && b.Site) {
					var c;
					c = a.clubBlog.openedPosts[b.Post.Guid] ? a.clubBlog.openedPosts[b.Post.Guid] : {
						post: b.Post,
						site: b.Site
					}, a.clubBlog.popupPost = c.post, a.clubBlog.popupSite = c.site, a.$digest(), pb.utils.positionClubPopup()
				}
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}, a.clubBlog.closePopup = function() {
		a.clubBlog.popupPost = null, a.clubBlog.popupSite = null, a.$digest()
	}
}], pbAng.front.ctrls.clubFrontMembersCtrl = ["$scope", function(a) {
	a.clubMembers = {}, a.clubMembers.openedSites = {}, a.clubMembers.openSite = function(b) {
		amplify.request({
			resourceId: "getFullMemberSiteById",
			data: {
				clubSiteId: pb.data.site.Id,
				memberSiteId: b.SiteId
			},
			success: function(c) {
				if (c.Galleries || c.Posts) {
					var d;
					d = a.clubMembers.openedSites[b.Id] ? a.clubMembers.openedSites[b.Id] : {
						Galleries: c.Galleries,
						Posts: c.Posts,
						Site: {
							SiteTitle: b.SiteTitle,
							Url: b.Url,
							ProfileImageFilePath: b.ProfileImageFilePath
						}
					}, a.clubMembers.popup = d, a.$digest(), pb.utils.positionClubPopup()
				}
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}, a.clubMembers.closePopup = function() {
		a.clubMembers.popup = null, a.$digest()
	}, a.clubMembers.closeGalleryOrBlog = function() {
		a.clubMembers.popup.openGallery = null, a.clubMembers.popup.openPost = null, a.$digest()
	}, a.clubMembers.openGallery = function(b) {
		amplify.request({
			resourceId: "getMemberGalleryByGuid",
			data: {
				pageGuid: b.Guid,
				siteId: b.SiteId
			},
			success: function(b) {
				b.Page && (a.clubMembers.popup.openGallery = b.Page, a.$digest(), $(".contentWrapper").animate({
					scrollTop: 0
				}, "fast"))
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}, a.clubMembers.openPost = function(b) {
		amplify.request({
			resourceId: "getMemberPostByGuid",
			data: {
				postGuid: b.Guid,
				siteId: b.SiteId
			},
			success: function(b) {
				b.Post && (a.clubMembers.popup.openPost = b.Post, a.$digest(), $(".contentWrapper").animate({
					scrollTop: 0
				}, "fast"))
			},
			error: function(a) {
				console.log("error: " + a)
			}
		})
	}
}], pbAng.front.ctrls.popupSoundcloudCtrl = ["$scope", "$sce", function(a, b) {
	var c = "";
	a.base.popup.callback(c), a.soundcloudTrack = a.base.popup.data;
	var d = "https://w.soundcloud.com/player/?url=" + a.soundcloudTrack.TrackUrl + "&amp;color=ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
		e = "https://w.soundcloud.com/player/?url=" + a.soundcloudTrack.TrackUrl + "&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
	pb.environment.isMobile ? (a.displayTrack = e, $(".basePopup").css("width", "280px"), document.getElementById("soundcloudIframe").width = "280", document.getElementById("soundcloudIframe").height = "280", console.log("You are using a mobile device!")) : (a.displayTrack = d, document.getElementById("soundcloudIframe").width = "100%", document.getElementById("soundcloudIframe").height = "166", console.log("You are not using a mobile device!")), a.displayTrack = b.trustAsResourceUrl(a.displayTrack)
}], pbAng.dirs.footerDir = ["$window", function() {
	return {
		template: '<div ng-if="site.IsFooterActive == 1" class="footer" bind-unsafe-html="site.FooterContent" block-content></div>',
		restrict: "E",
		replace: !0
	}
}], pbAng.dirs.miscHelper = function() {
	var a = ["$scope", function(a) {
		a.miscH = {}, a.miscH.openProductItemInSlider = function(b) {
			sliderH.goToItem(a.base.currentProduct.Guid, b.Idx)
		}, a.miscH.openSectionItemInLightbox = function(b, c) {
			var d = c.Guid,
				e = c.Items || [],
				f = sliderH.settingsH.getDefaultSettings();
			sliderH.openInPopup(d, e, b.Idx, f), pb.utils.setStylesOnLightBox(a, f)
		}, a.miscH.openBlogGalleryItemInLightbox = function(b, c) {
			var d;
			d = c ? c : a.base.currentPost;
			var e = d.Guid,
				f = d.BlogGalleryItems || [],
				g = sliderH.settingsH.getDefaultSettings();
			b.TextContent = b.TextContent, isAdmin && sliderH.removeSlider(e), sliderH.openInPopup(e, f, b.Idx, g), pb.utils.setStylesOnLightBox(a, g)
		}, a.miscH.getFormatedDateForCv = function(a, b) {
			var c = " 00:00:00";
			10 === a.length && (a = a.concat(c));
			var d, e = a.split(/[^0-9]/),
				f = parseInt(e[0], 10),
				g = parseInt(e[1], 10) - 1,
				h = parseInt(e[2], 10),
				i = parseInt(e[3], 10),
				j = parseInt(e[4], 10),
				k = parseInt(e[5], 10);
			d = new Date(f, g, h, i, j, k);
			var l;
			if ("yyyy" == b) l = d.getFullYear();
			else if ("mm/yyyy" == b) l = d.getMonth() + 1 + "/" + d.getFullYear();
			else {
				var m = pb.lang.frontText.monthName,
					n = [];
				n[0] = m.january, n[1] = m.february, n[2] = m.march, n[3] = m.april, n[4] = m.may, n[5] = m.june, n[6] = m.july, n[7] = m.august, n[8] = m.september, n[9] = m.october, n[10] = m.november, n[11] = m.december, l = d.getMonth() + 1 + " / " + d.getFullYear()
			}
			return l
		}, a.miscH.getCVPropertyTitleStyle = function() {
			var b = a.base.getH2Styles();
			return b["border-color"] = pb.utils.getTransparentColor(a.site.PFontColor), b
		}
	}];
	return {
		restrict: "A",
		controller: a
	}
}, pbAng.dirs.siteBodyDir = ["$location", function(a) {
	var b = ["$scope", "$element", function(b) {
		b.siteBody = {};
		var c = {};
		c["background-repeat"] = "no-repeat", c["background-position"] = "center center", c["background-attachment"] = "fixed", c["-webkit-background-size"] = "cover", c["-moz-background-size"] = "cover", c["-o-background-size"] = "cover", c["background-size"] = "cover", b.siteBody.getStyles = function() {
			c["background-color"] = b.site.BgColor;
			var d, e = !1;
			if (b.page && b.page.BgImage) {
				var f = pb.constants.getS3PathById(b.page.BgImageS3LocationId),
					g = null,
					h = pb.utils.getImageThumbTypeForMobile();
				g = void 0 != h && 1 == b.page.PageBGThumb ? f + "/" + b.site.Id + "/page/" + h + "-" + b.page.BgImage : f + "/" + b.site.Id + "/page/" + b.page.BgImage, "/checkout" == a.path() ? c["background-image"] = "none" : (c["background-image"] = "url(" + g + ")", d = b.page.BgImagePosition)
			} else if (b.site && 1 == b.site.BgUseImage && b.site.BgFilePath) {
				var h = pb.utils.getImageThumbTypeForMobile();
				if (void 0 != h && 1 == b.site.SiteBGThumb) {
					var f = pb.constants.getS3PathById(b.site.BgFileNameS3Id),
						g = f + "/" + b.site.Id + "/file/" + h + "-" + b.site.BgFileName;
					c["background-image"] = "url(" + g + ")"
				} else c["background-image"] = "url(" + b.site.BgFilePath + ")";
				d = b.site.BgImagePosition
			} else b.site && 1 == b.site.BgUseImage && b.site.StandardBgImage ? (c["background-image"] = "url(" + pb.constants.serverCdn + "application/_img/app/backgrounds/" + b.site.StandardBgImage + ".jpg)", c["background-repeat"] = "no-repeat", c["background-position"] = "center center", c["background-attachment"] = "fixed", c["background-size"] = "cover", e = !0) : c["background-image"] = "none";
			return pb.environment.isMobile && $("html").css("height", "100%"), c["background-image"].indexOf("url") > -1 && 0 == e && (1 == d ? (c["background-repeat"] = "no-repeat", c["background-position"] = "center center", c["background-attachment"] = "fixed", c["background-size"] = "cover") : 2 == d ? (c["background-repeat"] = "no-repeat", c["background-position"] = "center center", c["background-attachment"] = "fixed", c["background-size"] = "contain") : 3 == d ? (c["background-repeat"] = "repeat", c["background-position"] = "initial", c["background-attachment"] = "scroll", c["background-size"] = "auto") : 4 == d && (c["background-repeat"] = "no-repeat", c["background-position"] = "center center", c["background-attachment"] = "fixed", c["background-size"] = "auto")), (pb.environment.isMobile || pb.environment.isTablet) && "fixed" == c["background-attachment"] && (c["background-attachment"] = "scroll", $("body").addClass("mobileFixedBg")), c
		}, b.siteBody.getClasses = function() {
			return pb.environment.isMobile || pb.environment.width < pb.environment.minWidth ? b.site.DsnMobileLayoutViewFile + " mobileBody" : "webBody layout-" + b.site.DsnLayoutType + " menu-" + b.site.DsnLayoutViewFile + " width" + b.site.SiteWidth
		}
	}];
	return {
		restrict: "A",
		controller: b,
		link: function(a) {
			if (!pb.utils.doGoogleCDNBlock()) {
				var b = function(a) {
					var b = "";
					return $.each(a, function(a, c) {
						var d = c.cssContent + ":" + c.variant + "|"; - 1 == b.indexOf(d) && (b += d)
					}), "<link id='sitebodyFonts' href='https://fonts.googleapis.com/css?subset=latin,latin-ext,greek,cyrillic&family=" + b + "' rel='stylesheet' type='text/css'>"
				}, c = [];
				if (a.site.MobileLogoFontCssContent && c.push({
					cssContent: a.site.MobileLogoFontCssContent,
					variant: a.site.MobileLogoFontVariant
				}), a.site.MobileMenuFontCssContent && c.push({
					cssContent: a.site.MobileMenuFontCssContent,
					variant: a.site.MobileMenuFontVariant
				}), a.site.LogoFontCssContent && c.push({
					cssContent: a.site.LogoFontCssContent,
					variant: a.site.LogoFontVariant
				}), a.site.MenuFontCssContent && c.push({
					cssContent: a.site.MenuFontCssContent,
					variant: a.site.MenuFontVariant
				}), a.site.H1FontCssContent && c.push({
					cssContent: a.site.H1FontCssContent,
					variant: a.site.H1FontVariant
				}), a.site.H2FontCssContent && c.push({
					cssContent: a.site.H2FontCssContent,
					variant: a.site.H2FontVariant
				}), a.site.H3FontCssContent && c.push({
					cssContent: a.site.H3FontCssContent,
					variant: a.site.H3FontVariant
				}), a.site.PFontCssContent && c.push({
					cssContent: a.site.PFontCssContent,
					variant: a.site.PFontVariant
				}), a.site.ListFontCssContent && c.push({
					cssContent: a.site.ListFontCssContent,
					variant: a.site.ListFontVariant
				}), c.length > 0) {
					var d = b(c);
					$("head").append(d)
				}
				$("head").append(a.site.FontCss)
			}
		}
	}
}], pbAng.dirs.menuElement = ["$location", function(a) {
	var b = '<li id="menuList_main" class="top" ng-style="menuElement.geHiddenHierarchyBoxColor()" ng-repeat="element in menuElements track by element.Guid"><a targ="{{element.Target}}" ng-style="menuElement.getStyles(element.PageGuid,\'topmenu\',$index)" id="topmenu{{$index}}{{element.PageGuid}}" ng-href="{{element.Url | link}}" ng-class="{defaultcursor: !(element.Url)}" ng-bind-html="element.Title"></a><ul class="second" ng-style="menuElement.geHiddenHierarchyBg()" ng-if="element.Children && element.Children.length > 0"><li class="middle" ng-repeat="child in element.Children track by child.Guid"><a targ="{{child.Target}}" ng-style="menuElement.getStyles(child.PageGuid,\'middlemenu\',$index)" id="middlemenu{{$index}}{{child.PageGuid}}" ng-href="{{child.Url | link}}" ng-class="{defaultcursor: !(child.Url)}" ng-bind-html="child.Title"></a><ul class="third" ng-if="child.Children && child.Children.length > 0"><li class="bottom" ng-repeat="gChild in child.Children track by gChild.Guid"><a targ="{{gChild.Target}}" ng-style="menuElement.getStyles(gChild.PageGuid,\'bottommenu\',$index)" id="bottommenu{{$index}}{{gChild.PageGuid}}" ng-href="{{gChild.Url | link}}" ng-class="{defaultcursor: !(gChild.Url)}" ng-bind-html="gChild.Title"></a></li></ul></li></ul></li>',
		c = ["$scope", "$element", "$attrs", function(b) {
			b.menuElement = {};
			var c, d, e, f, g, h, i, j, k, l, m, n;
			b.menuElement.getStyles = function(c, d, e) {
				var f = {};
				if (void 0 != c && b.page && b.page.Guid == c && void 0 != d && void 0 != e) {
					var g = a.url();
					if (0 == pb.utils.isMenuUrlMatchedWithPrivateUrl(g)) {
						var h = "#" + d.trim() + e + c;
						$(".menu li.top a").removeClass("active"), $(h).addClass("active"), void 0 != b.site.ActiveMenuFontColor && null != b.site.ActiveMenuFontColor && (f.color = b.site.ActiveMenuFontColor, setTimeout(function() {
							$(h).css("color", b.site.ActiveMenuFontColor)
						}, 1)), 1 == b.site.ActiveMenuFontIsBold && (f["font-weight"] = "bold", setTimeout(function() {
							$(h).css("font-weight", "bold")
						}, 1)), 1 == b.site.ActiveMenuFontIsItalic && (f["font-style"] = "italic", setTimeout(function() {
							$(h).css("font-style", "italic")
						}, 1)), 1 == b.site.ActiveMenuFontIsUnderline && (f["text-decoration"] = "underline", setTimeout(function() {
							$(h).css("text-decoration", "underline")
						}, 1))
					}
				}
				return f
			}, b.menuElement.geHiddenHierarchyBg = function() {
				var a = {};
				if (b.menuElement.attr.hiddenHierarchy) {
					var c = b.site.BgColor,
						d = pb.utils.getTransparentColor(c, .8);
					a["background-color"] = d
				}
				return a
			};
			var o = null;
			e = null, isAdmin && (o = b.$watch("site.MenuFontColorHover", function() {
				pb.utils.hover("li.top#menuList_main a", b.site.MenuFontColorHover, b.site.MenuFontColor)
			}), e = b.$watch("site.MenuFontColor", function() {
				pb.utils.hover("li.top#menuList_main a", b.site.MenuFontColorHover, b.site.MenuFontColor)
			})), pb.utils.hover("li.top#menuList_main a", b.site.MenuFontColorHover, b.site.MenuFontColor), pb.utils.hover("li.top#menuList_main a", b.site.HoverMenuBackgroundColor, "transparent", "background-color"), pb.utils.hover("li.top#menuList_main a", b.site.HoverMenuFontIsItalic ? "italic" : "normal", "initial", "font-style"), pb.utils.hover("li.top#menuList_main a", b.site.HoverMenuFontIsUnderline ? "underline" : "none", "none", "text-decoration"), b.site.HoverMenuFontIsBold && pb.utils.setInterval(function() {
				return $(".menu li.top a").length > 0 ? !0 : void 0
			}, 10, 100).done(function() {
				h = $(".menu li.top a").css("font-weight"), pb.utils.hover("li.top a", "bold", h, "font-weight")
			});
			var p = function() {
				setTimeout(function() {
					var a = $(".menu li.top a"),
						h = $(".menu ul.second a");
					$("li.top").css("visibility", "visible"), c = b.$watch("site.MenuFontFamily", function() {
						isAdmin || c(), a.css("font-family", b.site.MenuFontFamily)
					}), a.css("font-family", b.site.MenuFontFamily), d = b.$watch("site.MenuFontSize", function() {
						isAdmin || d(), a.css("font-size", b.site.MenuFontSize), k = Math.pow(parseInt(b.site.MenuFontSize), .92), h.css("font-size", k + "px")
					}), a.css("font-size", b.site.MenuFontSize), k = Math.pow(parseInt(b.site.MenuFontSize), .92), h.css("font-size", k + "px"), e = b.$watch("site.MenuFontColor", function() {
						isAdmin || e(), a.css("color", b.site.MenuFontColor)
					}), a.css("color", b.site.MenuFontColor), f = b.$watch("site.MenuFontSpacing", function() {
						isAdmin || e(), a.css("letter-spacing", parseInt(b.site.MenuFontSpacing) / 4 + "px"), l = parseInt(b.site.MenuFontSpacing) / 4 * .7, h.css("letter-spacing", l + "px")
					}), a.css("letter-spacing", parseInt(b.site.MenuFontSpacing) / 4 + "px"), l = parseInt(b.site.MenuFontSpacing) / 4 * .7, h.css("letter-spacing", l + "px"), i = b.$watch("site.MenuFontUpperCase", function() {
						isAdmin || e(), j = 1 == b.site.MenuFontUpperCase ? "uppercase" : "", a.css("text-transform", j)
					}), j = 1 == b.site.MenuFontUpperCase ? "uppercase" : "", a.css("text-transform", j);
					var o = function() {
						m = pb.utils.getCssStyleAndWeight(b.site.MenuFontVariant), "" != m["font-style"] && a.css("font-style", m["font-style"]), "" != m["font-weight"] && a.css("font-weight", m["font-weight"]), a.css("text-decoration", "none")
					};
					g = b.$watch("site.MenuFontVariant", function() {
						isAdmin || g(), o()
					}), n = b.$watch("site.HoverMenuBackgroundColor", function() {
						pb.utils.hover("li.top#menuList_main a", b.site.HoverMenuBackgroundColor, "transparent", "background-color")
					}), a.each(function() {
						$(this).hasClass("active") ? $(this).css("background-color", b.site.ActiveMenuBackgroundColor) : $(this).css("background-color", "transparent")
					}), o(), pb.utils.hover("li.top#menuList_main a", b.site.MenuFontColorHover, b.site.MenuFontColor)
				}, 1)
			};
			p();
			var q = b.$on("updateMenuStyle", p);
			b.menuElement.geHiddenHierarchyBg = function() {
				var a = {};
				if (b.menuElement.attr.hiddenHierarchy) {
					var c = b.site.BgColor,
						d = pb.utils.getTransparentColor(c, .8);
					a["background-color"] = d
				}
				return a
			}, b.menuElement.getFirstElemStyle = function() {
				var a = {};
				return a["background-color"] = b.site.MenuBoxColor, a
			}, b.$on("$destroy", function() {
				try {
					c(), d(), e(), g(), q(), f(), i(), null != o && o(), null != e && e()
				} catch (a) {}
			})
		}];
	return {
		template: b,
		restrict: "A",
		controller: c,
		replace: !1,
		link: function(a, b, c) {
			a.menuElement.attr = c, c.hiddenHierarchy && (b.on("mouseover", ".top", function() {
				$(this).addClass("hover").find("ul.second").show()
			}), b.on("mouseout", ".top", function() {
				$(this).removeClass("hover").find("ul.second").hide()
			}))
		}
	}
}], pbAng.dirs.mobileMenuElement = [function() {
	var a = '<li class="mtop" ng-repeat="element in menuElements track by element.Guid"><a pb-style="mobileMenuElement.getStyles(element.PageGuid,\'topmenu\',$index)" id="topmenu{{$index}}{{element.PageGuid}}" ng-href="{{element.Url | link}}" ng-bind-html="element.Title"></a><span ng-if="element.Children && element.Children.length > 0"  class="mobileMenuIcon first-menu-icon"></span><ul class="msecond" ng-if="element.Children && element.Children.length > 0"><li class="mmiddle" ng-repeat="child in element.Children track by child.Guid"><a pb-style="mobileMenuElement.getStyles(child.PageGuid,\'middlemenu\',$index)" id="middlemenu{{$index}}{{child.PageGuid}}" ng-href="{{child.Url | link}}" ng-bind-html="child.Title"></a><span ng-if="child.Children && child.Children.length > 0" class="mobileMenuIcon second-menu-icon"></span><ul class="mthird" ng-if="child.Children && child.Children.length > 0"><li class="mbottom" ng-repeat="gChild in child.Children track by gChild.Guid"><a pb-style="mobileMenuElement.getStyles(gChild.PageGuid,\'bottommenu\',$index)" id="bottommenu{{$index}}{{gChild.PageGuid}}" ng-href="{{gChild.Url | link}}" ng-bind-html="gChild.Title"></a></li></ul></li></ul></li><cart-button></cart-button><li class="mtop"><ul ng-if="site.SocialButtonStyle != 0 && site.ShowSocialMediaLinks != 0" class="socialLink"><li ng-if="site.SocialFacebookUrl != undefined && site.SocialFacebookUrl != null && site.SocialFacebookUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialFacebookUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialTwitterUrl != undefined && site.SocialTwitterUrl != null && site.SocialTwitterUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialTwitterUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialPinterestUrl != undefined && site.SocialPinterestUrl != null && site.SocialPinterestUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialPinterestUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-pinterest" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialFlickrUrl != undefined && site.SocialFlickrUrl != null && site.SocialFlickrUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialFlickrUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-flickr" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialInstagramUrl != undefined && site.SocialInstagramUrl != null && site.SocialInstagramUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialInstagramUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-instagram" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialGooglePlusUrl != undefined && site.SocialGooglePlusUrl != null && site.SocialGooglePlusUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialGooglePlusUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-google-plus" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialLinkedInUrl != undefined && site.SocialLinkedInUrl != null && site.SocialLinkedInUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialLinkedInUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialBlogUrl != undefined && site.SocialBlogUrl != null && site.SocialBlogUrl != \'\'" class="socialIcon"><a target="_blank" ng-href="{{site.SocialBlogUrl}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-blog" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.SocialShowShareButtons != undefined && site.SocialShowShareButtons == true" ng-click="mobileSocialIcon.openShare()"><span class="mobileSocialMedia shareMobile socialIcon smicon smicon-{{site.SocialButtonStyle}}-share" style="color:{{site.MobileMenuFontColor}}"></span></li><li ng-if="site.SocialFollowButton != \'\' " ng-click="mobileSocialIcon.openFollow()" class="followMobile socialIcon"><a class="followIcon" target="_blank"><span class="smicon smicon-{{site.SocialButtonStyle}}-follow" style="color:{{site.MobileMenuFontColor}}"></span></a></li><li ng-if="site.EnableRSS == 1" class="rssMobile socialIcon"><a class="rssIcon" href="http://www.{{site.Url}}/extra/rss" target="_blank"><span class="smicon smicon-{{site.SocialButtonStyle}}-rss" style="color:{{site.MobileMenuFontColor}}"></span></a></li></ul><div class="mobileSocialMedia"><div class="mobileSocialPanel" ng-if="mobileSocialIcon.showShare == true"  ng-style="mobileMenuElement.getShareAndFollowMobileBg()"><div class="closeButton checked threeLinesMenuIcon mobile static" ng-click="mobileSocialIcon.closeShare()"><span class="top" style="background:{{site.LogoFontColor}}"></span><span class="bottom" style="background:{{site.LogoFontColor}}"></span></div><div><h3 class="shareHead" pb-style="base.getH3Styles()">{{ (site.UserTranslatedText.Share == "" || site.UserTranslatedText.Share == null) ? "Share" : site.UserTranslatedText.Share  }}</h3><div class="shareButton button"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{mobileMenuElement.getShareLink()}}" style="color:{{site.MobileMenuFontColor}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-facebook" style="color:{{site.MobileMenuFontColor}}"></span><span class="text">Facebook</span></a></div><div class="shareButton button"><a target="_blank" href="https://plus.google.com/share?url={{mobileMenuElement.getShareLink()}}" style="color:{{site.MobileMenuFontColor}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-google-plus" style="color:{{site.MobileMenuFontColor}}"></span><span class="text">Google Plus</span></a></div><div class="shareButton button"><a target="_blank" href="https://www.linkedin.com/cws/share?url={{mobileMenuElement.getShareLink()}}" style="color:{{site.MobileMenuFontColor}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-linkedin" style="color:{{site.MobileMenuFontColor}}"></span><span class="text">LinkedIn</span></a></div><div class="shareButton button"><a target="_blank" href="https://twitter.com/intent/tweet?url={{mobileMenuElement.getShareLink()}}" style="color:{{site.MobileMenuFontColor}}"><span class="smicon smicon-{{site.SocialButtonStyle}}-twitter" style="color:{{site.MobileMenuFontColor}}"></span><span class="text">Tweet</span></a></div></div></div><div class="followMobile"><div class="mobileSocialPanel followPopup" ng-if="mobileSocialIcon.showFollow" ng-style="mobileMenuElement.getShareAndFollowMobileBg()"><div class="closeButton checked threeLinesMenuIcon mobile static" ng-click="mobileSocialIcon.closeFollow()"><span class="top" style="background:{{site.LogoFontColor}}"></span><span class="bottom" style="background:{{site.LogoFontColor}}"></span></div><div class="container" id="pb-socialMediaFollowPopUp"><div class="form" ng-if="!mobileMenuElement.isFollow"><h3 pb-style="base.getH3Styles()">{{::site.UserTranslatedText.Follow}}</h3><input ng-model="mobileMenuElement.followName" type="text" placeholder="{{site.UserTranslatedText.Name}}" pb-style="base.getPSimpleStyle()" style="border-color:{{site.MobileMenuFontColor}}"><input ng-model="mobileMenuElement.followEmail" type="email" placeholder="{{site.UserTranslatedText.Email}}" pb-style="base.getPSimpleStyle()" style="border-color:{{site.MobileMenuFontColor}}"><styled-button ng-click="mobileMenuElement.follow()">{{site.UserTranslatedText.Send}}</styled-button></div><div ng-if="mobileMenuElement.isFollow" class="thankYou"><h3 pb-style="base.getH3Styles()">{{site.UserTranslatedText.ThankYou}}</h3></div></div></div></div></div></li>',
		b = ["$scope", "$element", "$attrs", function(a) {
			a.mobileMenuElement = {
				followName: "",
				followEmail: "",
				isFollow: !1
			}, a.mobileMenuElement.getShareLink = function() {
				var b = null;
				return b = a.uri ? "http://www." + a.site.Url + a.uri : "" != a.site.SocialFacebookShareUrl && null != a.site.SocialFacebookShareUrl ? a.site.SocialFacebookShareUrl : pbAng.dirs.socialmedia.helper.getSiteUrl(a)
			}, a.mobileMenuElement.getShareAndFollowMobileBg = function() {
				var b = {};
				return console.log(a.site.MobileMenuBoxColor), b.background = a.site.MobileMenuBoxColor, b
			}, a.mobileMenuElement.getStyles = function(b, c, d) {
				var e = {};
				if (void 0 != b && a.page && a.page.Guid == b && void 0 != c && void 0 != d) {
					var f = "#" + c.trim() + d + b;
					void 0 != a.site.ActiveMenuFontColor && null != a.site.ActiveMenuFontColor && (e.color = a.site.ActiveMenuFontColor, setTimeout(function() {
						$(f).css("color", a.site.ActiveMenuFontColor)
					}, 2)), 1 == a.site.ActiveMenuFontIsBold && (e["font-weight"] = "bold", setTimeout(function() {
						$(f).css("font-weight", "bold")
					}, 2)), 1 == a.site.ActiveMenuFontIsItalic && (e["font-style"] = "italic", setTimeout(function() {
						$(f).css("font-style", "italic")
					}, 2)), 1 == a.site.ActiveMenuFontIsUnderline && (e["text-decoration"] = "underline", setTimeout(function() {
						$(f).css("text-decoration", "underline")
					}, 2))
				}
				return e
			}, a.mobileMenuElement.follow = function() {
				console.log("follow"), amplify.request({
					resourceId: "saveFollower",
					data: {
						name: a.mobileMenuElement.followName,
						email: a.mobileMenuElement.followEmail
					},
					success: function() {
						a.mobileMenuElement.isFollow = !0, a.$digest()
					},
					error: function(a) {
						console.log("error: " + a)
					}
				})
			}, a.mobileSocialIcon = {
				showShare: !1,
				showFollow: !1,
				openShare: function() {
					$(".menuIcon").fadeOut(), a.mobileSocialIcon.showShare = !0
				},
				closeShare: function() {
					a.mobileSocialIcon.showShare = !1, $(".menuIcon").fadeIn()
				},
				openFollow: function() {
					$(".menuIcon").fadeOut(), a.mobileSocialIcon.showFollow = !0
				},
				closeFollow: function() {
					$(".menuIcon").fadeIn(), a.mobileSocialIcon.showFollow = !1
				}
			}, setTimeout(function() {
				$("li.mtop").css("visibility", "visible");
				var b = $(".menu li.mtop a"),
					c = $(".menu li.mtop span.mobileMenuIcon"),
					d = $(".menu ul.msecond a"),
					e = $(".menu li.socialIcon a"),
					f = 16,
					g = 24;
				b.css("font-family", a.site.MobileMenuFontFamily), b.css("font-size", f + "px"), b.css("line-height", "180%"), b.css("color", a.site.MobileMenuFontColor), b.css("letter-spacing", parseInt(a.site.MenuFontSpacing) / 5 + "px");
				var h = 1 == a.site.MenuFontUpperCase ? "uppercase" : "";
				b.css("text-transform", h);
				var i = pb.utils.getCssStyleAndWeight(a.site.MobileMenuFontVariant);
				"" != i["font-style"] && b.css("font-style", i["font-style"]), "" != i["font-weight"] && b.css("font-weight", i["font-weight"]), b.css("text-decoration", "none");
				var j = Math.pow(f, .92);
				d.css("font-size", j + "px");
				var k = parseInt(a.site.MenuFontSpacing) / 4 * .7;
				d.css("letter-spacing", k + "px"), c.css("color", a.site.MobileMenuFontColor), c.css("font-size", "20px"), e.css("font-size", g + "px")
			}, 1)
		}];
	return {
		template: a,
		restrict: "A",
		controller: b,
		replace: !1,
		compile: function(a) {
			if (isAdmin || ($("body").addClass("layout-mobile-centered"), $("nav.menu").css("width", "100%")), $(".mobilemenu01").length > 0 || $(".mobilemenu06").length > 0) {
				var b = !1;
				a.on("click", "li.mtop", function() {
					var a = $(this).find("ul.msecond");
					if (!b) {
						var c = $(this).find(".first-menu-icon");
						a.is(":visible") ? (c.addClass("icon-navigate-right").removeClass("icon-drop-down-arrow"), a.slideUp(200)) : (c.removeClass("icon-navigate-right").addClass("icon-drop-down-arrow"), a.slideDown(200))
					}
					b = !1
				}), a.on("click", "li.mmiddle", function() {
					b = !0;
					var a = $(this).find(".second-menu-icon"),
						c = $(this).find("ul.mthird");
					c.is(":visible") ? (a.addClass("icon-navigate-right").removeClass("icon-drop-down-arrow"), c.slideUp(200)) : (a.removeClass("icon-navigate-right").addClass("icon-drop-down-arrow"), c.slideDown(200))
				})
			}
		}
	}
}], pbAng.dirs.menuDir = ["$window", function(a) {
	var b = ["$scope", function(b) {
		b.menu = {}, b.menu.getViewFile = function() {
			return pb.environment.isMobile || pb.environment.width < pb.environment.minWidth ? "application/views/app/_front/views/menus/mobile/" + b.site.DsnMobileLayoutViewFile + ".html" : "application/views/app/_front/views/menus/" + b.site.DsnLayoutType + "/" + b.site.DsnLayoutViewFile + ".html"
		}, b.menu.getMobileMenuIconColor = function() {
			var a = {};
			return a.color = b.site.MobileMenuIconColor, a
		}, b.menu.getBgColor = function() {
			var a = {};
			return a.background = pb.utils.getTransparentColor(b.site.MenuBoxColor, .6), a["border-color"] = 1 == b.site.MenuBoxBorder ? pb.utils.getTransparentColor(b.site.MenuFontColor, .2) : "transparent", a
		}, b.menu.getMenuImage = function() {
			var a = {};
			return b.site.MenuImageFilePath && (a["background-image"] = "url('" + b.site.MenuImageFilePath + "')"), a
		}, b.menu.getBgImageOrColor = function() {
			return void 0 != b.site.MenuImageFilePath && null != b.site.MenuImageFilePath ? b.menu.getMenuImage() : b.menu.getBgColor()
		}, b.menu.toggleLinks = function(a, b, c, d) {
			var e = $("ul.first"),
				f = e.outerHeight();
			e.is(":visible") ? (e.slideUp(200), a && ($("span.menuIcon").addClass(b), $("span.menuIcon").removeClass(c)), void 0 != d && $(d).height(0)) : (e.slideDown(200), a && ($("span.menuIcon").removeClass(b), $("span.menuIcon").addClass(c)), void 0 != d && $(d).height(f))
		}, b.menu.mobile = {
			toggleLinks: function() {
				($(".mobilemenu01").length > 0 || $(".mobilemenu06").length > 0) && ($(".first-menu-icon").addClass("icon-navigate-right"), $(".second-menu-icon").addClass("icon-navigate-right")); {
					var a = $("ul.mfirst");
					a.outerHeight()
				}
				a.is(":visible") ? ($(".bottomOrLogoContainer").removeClass("mobileMenuBoxShadow"), a.slideUp(200)) : ($(".bottomOrLogoContainer").addClass("mobileMenuBoxShadow"), a.slideDown(200))
			},
			toggleFullLinks: function() {
				var b = $(".logo"),
					c = $("ul.mfirst"),
					d = $(".linesMenuIcon"),
					e = $(window).height(),
					f = $(window).width(),
					g = ($("nav").outerHeight(), 70),
					h = f - d.width() - g - 10;
				c.width(h), c.height(e + 10), b.is(":visible") ? (d.addClass("checked"), d.addClass("leftPosition"), b.css("display", "none"), $(".menu03over").show(), $(".mainMenuIcon").hide(), $(".bottomOrLogoContainer").addClass("mobileMenuBoxShadow"), c.addClass("mobileMenuBoxShadow"), c.slideDown(200), angular.element(a).bind("resize", function() {
					e = $(window).height(), f = $(window).width(), h = f - d.width() - g - 10, c.height(e + 10)
				})) : (d.removeClass("checked"), d.removeClass("leftPosition"), b.css("display", "block"), $(".menu03over").hide(), $(".mainMenuIcon").show(), $(".bottomOrLogoContainer").removeClass("mobileMenuBoxShadow"), $("body").css("overflow-y", "scroll"), c.removeClass("mobileMenuBoxShadow"), c.slideUp(200))
			},
			getBackgroundColorAndBorder: function() {
				var a = {};
				return a.background = pb.utils.getTransparentColor(b.site.MenuBoxColor, .8), a["border-color"] = b.site.MenuFontColor, a
			},
			toggleLinksStyled: function() {
				var a = $("ul.mfirst"),
					b = $(".menuIcon");
				a.is(":visible") ? (b.removeClass("noBorder"), a.fadeOut(300, function() {})) : (b.addClass("noBorder"), a.fadeIn(300, function() {}))
			},
			getBackgroundColorAndBorderAndMobileIconColor: function() {
				var a = {};
				return a.background = pb.utils.getTransparentColor(b.site.MenuBoxColor, .8), a.color = b.site.MobileMenuIconColor, a["border-color"] = b.site.MenuFontColor, a
			}
		}
	}];
	return {
		template: "<div ng-include='menu.getViewFile()'></div>",
		restrict: "E",
		replace: "true",
		controller: b
	}
}], pbAng.filters.misc = {}, pbAng.filters.misc.link = function() {
	return function(a) {
		return void 0 !== a && null !== a ? 1 == pb.environment.isAdmin ? pb.utils.hasHttp(a) ? a : "#" + a : a : void 0
	}
}, pbAng.filters.misc.shorterContentSummary = function() {
	return function(a, b) {
		if (isNaN(b)) return a;
		if (0 >= b) return "";
		if (a) {
			var c = a.split(/\s+/);
			c.length > b && (a = c.slice(0, b).join(" ") + "...")
		}
		return a
	}
}, pbAng.filters.misc.partLink = function() {
	return function(a, b) {
		var c = "/" + b + "/" + a;
		return 1 == pb.environment.isAdmin ? "#" + c : c
	}
}, pbAng.filters.misc.pboxImage = function() {
	var a = {
		switchThumbDependingOnScreenSize: function(a) {
			return -1 == pb.data.site.ImageQuality ? void 0 == a ? pb.environment.width < 401 ? a = "w400" : pb.environment.width < 1001 && (a = "w1000") : "w1000" == a && pb.environment.width < 401 ? a = "w400" : "h800" == a && pb.environment.height < 401 && (a = "h400") : 1 == pb.data.site.ImageQuality && ("w400" == a ? a = "w1000" : "h400" == a ? a = "h800" : "w1000" == a ? a = void 0 : "h800" == a && (a = void 0)), a
		},
		handlePboxImg: function(b, c, d) {
			var e = pb.constants.getS3PathById(c),
				f = e + "/" + pb.data.site.Id + "/page/";
			return d = a.switchThumbDependingOnScreenSize(d), void 0 == d ? f + b : f + d + "-" + b
		},
		handleFlickrImg: function(b, c, d) {
			d = a.switchThumbDependingOnScreenSize(d);
			var e = b.sizes ? b.sizes : "",
				f = pb.utils.convertThumbTypeToFlickrAppendix(d, e);
			return pb.utils.getFlickrPhotoUrl(b, f)
		},
		handleFindCreatives: function(b, c) {
			return c = a.switchThumbDependingOnScreenSize(c), pb.utils.getFindCreativeImageUrl(b, c)
		},
		handleDummy: function(b, c) {
			return c = a.switchThumbDependingOnScreenSize(c), pb.utils.getDummyImageUrl(b, c)
		}
	};
	return function(b, c, d) {
		if (b && "{" != b.charAt(0)) return a.handlePboxImg(b, c, d);
		if (b) {
			var e = JSON.parse(b);
			return e.dummy ? a.handleDummy(e, d) : e.creativeGuid ? a.handleFindCreatives(e, d) : a.handleFlickrImg(e, c, d)
		}
	}
}, pbAng.filters.misc.clubMemberImage = function() {
	return function(a, b, c, d) {
		var e = pb.constants.getS3PathById(b),
			f = e + "/" + c + "/page/";
		return void 0 == d ? pb.environment.width < 500 ? d = "w400" : pb.environment.width < 1010 && (d = "w1000") : "w1000" == d && pb.environment.width < 500 ? d = "w400" : "h800" == d && pb.environment.height < 500 ? d = "h400" : "h800" == d && pb.environment.height < 500 && (d = "h400"), void 0 == d ? f + a : f + d + "-" + a
	}
}, pbAng.filters.misc.embedVideo = ["$sce", function(a) {
	return function(b) {
		var c;
		if (b && null != b) {
			var d = b.replace("http://", "https://");
			c = -1 != d.search("youtube.com") || -1 != d.search("youtu.be") || -1 != d.search("vimeo.com") ? d : "javascript:false;"
		} else c = "javascript:false;";
		return a.trustAsResourceUrl(c)
	}
}], pbAng.filters.misc.UrlFriendly = function() {
	return function(a, b, c) {
		var d, e, f, g, h, i, j, k = {};
		b || (b = "_"), e = (b + "").replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g"), "\\$&"), k["&.+?;"] = "", k["[^a-z0-9 _-]"] = "", k["\\s+"] = b, k["(" + e + ")+"] = b, f = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, g = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, d = a.replace(g, "").replace(f, "");
		for (h in k) i = k[h], h = new RegExp(h, "ig"), d = d.replace(h, i);
		return c && (d = d.toLowerCase()), j = new RegExp("^" + e + "+|" + e + "+$"), d = d.replace(j, ""), d = d.trim()
	}
}, pbAng.filters.misc.offset = function() {
	return function(a, b) {
		return b = +b, a.slice(b)
	}
}, pbAng.filters.misc.serverCdn = function() {
	return function(a, b) {
		var c = pb.constants.getServerCdn(),
			d = c + b;
		return d + a
	}
}, pbAng.filters.misc.round = function() {
	return function(a, b) {
		return a = parseFloat(a), a.toFixed(b)
	}
}, pbAng.filters.misc.orderObjectBy = function() {
	return function(a, b) {
		if (!angular.isObject(a)) return a;
		var c = [];
		for (var d in a) c.push(a[d]);
		return c.sort(function(a, c) {
			return a = parseInt(a[b]), c = parseInt(c[b]), a - c
		}), c
	}
}, pbAng.filters.misc.langKey = function() {
	return function(a) {
		return 0 == a ? "ENG" : 1 == a ? "SV" : 2 == a ? "CH" : 3 == a ? "DE" : 4 == a ? "ES" : 5 == a ? "KO" : 6 == a ? "JP" : 7 == a ? "RU" : 8 == a ? "FR" : 9 == a ? "PT" : 10 == a ? "AR" : void 0
	}
},
function() {
	"use strict";
	var a = null,
		b = function(b, c) {
			if (null == c && (c = a), null != c) {
				var d = pb.environment.isMobile,
					e = {};
				e["font-size"] = b.site.PFontSize, e.color = b.site.PFontColor, e["font-family"] = b.site.PFontFamily, e["line-height"] = b.site.PLineHeight, e["letter-spacing"] = parseInt(b.site.PSpacing) / 4 + "px", e["text-transform"] = 1 == b.site.PUpperCase ? "uppercase" : "";
				var f = pb.utils.getCssStyleAndWeight(b.site.PFontVariant);
				e["font-style"] = f["font-style"], e["font-weight"] = f["font-weight"];
				var g = {};
				g["font-size"] = b.site.H1FontSize, g.color = b.site.H1FontColor, g["font-family"] = b.site.H1FontFamily, g["letter-spacing"] = b.site.H1Spacing, g["text-transform"] = 1 == b.site.H1UpperCase ? "uppercase" : "";
				var h = pb.utils.getCssStyleAndWeight(b.site.H1FontVariant);
				g["font-style"] = h["font-style"], g["font-weight"] = h["font-weight"];
				var i = {};
				i["font-size"] = b.site.H2FontSize, i.color = b.site.H2FontColor, i["font-family"] = b.site.H2FontFamily, i["letter-spacing"] = b.site.H2Spacing, i["text-transform"] = 1 == b.site.H2UpperCase ? "uppercase" : "";
				var j = pb.utils.getCssStyleAndWeight(b.site.H2FontVariant);
				i["font-style"] = j["font-style"], i["font-weight"] = j["font-weight"];
				var k = {};
				k["font-size"] = b.site.H3FontSize, k.color = b.site.H3FontColor, k["font-family"] = b.site.H3FontFamily, k["letter-spacing"] = parseInt(b.site.H3Spacing) / 4 + "px", k["text-transform"] = 1 == b.site.H3UpperCase ? "uppercase" : "";
				var l = pb.utils.getCssStyleAndWeight(b.site.H3FontVariant);
				k["font-style"] = l["font-style"], k["font-weight"] = l["font-weight"], d && (e["word-wrap"] = "break-word", e["word-break"] = "break-word", e.hyphens = "auto"), c.addClass("blockContent"), c.css(e), setTimeout(function() {
					c.find("a").css("color", b.site.PLinkColor), c.find("h1").css(g).find("a").css("color", b.site.PLinkColor), c.find("h2").css(i).find("a").css("color", b.site.PLinkColor), c.find("h3").css(k).find("a").css("color", b.site.PLinkColor), d && (parseInt(b.site.PFontSize) > pb.constants.maxMobileParagraphFontSize && c.find("p, p > *").css({
						"font-size": pb.constants.maxMobileParagraphFontSize + "px"
					}), parseInt(b.site.PLineHeight) > pb.constants.maxMobileLineHeight && c.find("p, p > *").css({
						"line-height": pb.constants.maxMobileLineHeight + "px"
					}), parseInt(b.site.H1FontSize) > pb.constants.maxMobileH1FontSize && c.find("h1, h1 > *").css({
						"font-size": pb.constants.maxMobileH1FontSize + "px",
						"margin-top": ".3em",
						"margin-bottom": ".3em"
					}), parseInt(b.site.H2FontSize) > pb.constants.maxMobileH2FontSize && c.find("h2, h2 > *").css({
						"font-size": pb.constants.maxMobileH2FontSize + "px",
						"margin-top": ".2em",
						"margin-bottom": ".2em"
					}), parseInt(b.site.H3FontSize) > pb.constants.maxMobileH3FontSize && c.find("h3, h3 > *").css({
						"font-size": pb.constants.maxMobileH3FontSize + "px",
						"margin-top": ".1em",
						"margin-bottom": ".1em"
					}))
				}, 1), pb.utils.hover(".blockContent .block .text a", b.site.PLinkColorHover, b.site.PLinkColor), pb.utils.hover(".blockContent .block .form .button", b.site.ButtonHoverColor, b.site.ButtonColor, "background-color")
			}
		}, c = function(a, b) {
			if (1 == a || a.length > 0) if (window.google) b();
			else if (1 == window.loadingGoogleMapsIsStartedElsewhere) var c = setInterval(function() {
				0 == window.loadingGoogleMapsIsStartedElsewhere && (clearInterval(c), b())
			}, 10);
			else window.loadingGoogleMapsIsStartedElsewhere = 1, $.getScript(pb.constants.googleMapsApiKey, function() {
				$.getScript("https://d28avw9ny3vgf2.cloudfront.net/application/third_party/js/jquery-ui-map/ui/min/jquery.ui.map.min.js", function() {
					window.loadingGoogleMapsIsStartedElsewhere = 0, b()
				})
			})
		}, d = {
			removeResizeAndEdit: function(a) {
				a.$el.find(".editable").each(function() {
					$(this).attr("contenteditable", !1), $(this).removeClass("editable")
				}), a.$el.find(".colresize").each(function() {
					$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
				}), a.$el.find(".image").each(function() {
					$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
				}), a.$el.find(".spacing").each(function() {
					$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
				}), a.$el.find(".iFrame").each(function() {
					$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
				}), a.$el.find(".form").each(function() {
					$(this).hasClass("ui-sortable") && $(this).sortable("destroy")
				}), a.$el.find(".gmap").each(function() {
					$(this).hasClass("ui-resizable") && $(this).resizable("destroy"), $(this).find(".map").remove()
				})
			},
			initResizeAndEdit: function(a) {
				a.$el.find(".colresize").each(function() {
					$(this).resizable({
						grid: [1, 1e4],
						autoHide: !0,
						handles: "e",
						start: resize_start,
						resize: resize_other,
						stop: resize_stop
					})
				}), a.$el.find(".image").each(function() {
					$(this).resizable({
						aspectRatio: !0,
						stop: resize_img_stop
					})
				}), a.$el.find(".spacing").each(function() {
					$(this).resizable({
						handles: "s"
					})
				}), a.$el.find(".iFrame").each(function() {
					$(this).resizable({
						handles: "s",
						start: resize_iframe_start,
						stop: resize_iframe_stop
					})
				}), a.$el.find(".form").each(function() {
					$(this).sortable({
						items: "> .field"
					})
				}), setTimeout(function() {
					c($(".gmap"), function() {
						$(".gmap").each(function() {
							$(this).html(""), $(this).prepend('<div class="map"></div>');
							var a = $(this).data("lati"),
								b = $(this).data("longi");
							$(this).resizable({
								handles: "s"
							}), $(this).find(".map").gmap({
								zoom: 14,
								center: a + "," + b,
								callback: function() {
									this.addMarker({
										position: a + "," + b
									})
								}
							})
						})
					})
				}, 100)
			},
			applyStyle: function(a, c) {
				b(a, c)
			}
		}, e = [function() {
			var e, f, g, h = ["$scope", "$element", function(a) {
				a.blockEditor = {}, pb.data.get.mediaImages(function(b) {
					a.blockEditor.mediaImages = b, a.$apply()
				}), a.blockEditor.deleteImage = function(b) {
					pb.admin.erase("File", b), a.blockEditor.mediaImages = pb.utils.removeItemFromArray(a.blockEditor.mediaImages, "Guid", b.Guid)
				}, a.blockEditor.doGoogleCDNBlock = pb.utils.doGoogleCDNBlock(), a.blockEditor.getExtraParams = function() {
					var b = "&scaletowidth=" + a.blockEditor.scaleToWidth;
					return b
				}, a.blockEditor.scaleToWidth = "", a.blockEditor.content = a.content, a.blockEditor.pageGuid = a.pageGuid ? a.pageGuid : "", f = a.blockEditor.content, g = a.blockEditor.pageGuid, e = a.whenSave, a.blockEditor.onImageUploaded = function(b) {
					var c = {
						Guid: b.Guid,
						FileName: b.FileName,
						Height: b.Height,
						Width: b.Width,
						CDNPath: b.CDNPath,
						S3LocationId: b.S3LocationId,
						Type: "image"
					};
					pb.utils.addToNr.galleryItemPlus(a), a.blockEditor.mediaImages.unshift(c), a.$apply(), pb.admin.create("File", c)
				}
			}],
				i = function() {
					function f(a, b) {
						var c = $(b.element).closest(".row").width(),
							d = $(b.element).width(),
							e = $(b.element).next(".column").width(),
							f = (d + e) / c * 100;
						m.resizeTotalWidth = d + e, m.resizeTotalPercent = f
					}
					function h(a, b) {
						var c = $(b.element).width();
						c > .85 * m.resizeTotalWidth ? c = .85 * m.resizeTotalWidth : c < .15 * m.resizeTotalWidth && (c = .15 * m.resizeTotalWidth), $(b.element).css("width", c);
						var d = $(b.element).next(".column");
						$(d).css("width", m.resizeTotalWidth - c)
					}
					function i(a, b) {
						var c = $(b.element).width(),
							d = $(b.element).next(".column").width(),
							e = m.resizeTotalPercent * (c / m.resizeTotalWidth),
							f = m.resizeTotalPercent * (d / m.resizeTotalWidth);
						$(b.element).width(e + "%"), $(b.element).next(".column").width(f + "%"), window.saveOnResize = !0
					}
					function j(a, b) {
						var c = $(b.element).closest(".block").width(),
							d = $(b.element).width() / c * 100 + "%";
						$(b.element).width(d), $(b.element).height("auto")
					}
					function k(a, b) {
						var c = '<div class="iFrameBlocker"></div>';
						$(b.element).append(c)
					}
					function l(a, b) {
						$(b.element).find(".iFrameBlocker").remove()
					}
					var m = {
						$el: null,
						init: function(b, n) {
							m.initConstants(b, n), m.initUploadListener(), m.helpers.initBgColor(), setTimeout(function() {
								m.savedContentLength = m.$superEdit.html().length, m.savedContentLength < 1 && (m.add.addText(), m.savedContentLength = m.$superEdit.html().length)
							}, 100);
							var o = $(".contentPanel").width(),
								p = m.$geditContent.width();
							m.margin = (o - p) / 2;
							var q = void 0,
								r = !1;
							m.$superEdit.on("click.saveOnTouch touch.saveOnTouch", function() {
								r = !0
							}), $(document).on("click.saveClick", function(c) {
								if (q = $(this), window.doSave) {
									if ($(c.target).closest(".geditContent,.cke,.cke_dialog").length > 0 || $(c.target).closest(".doubleClick").length > 0);
									else if (!m.$gedit.hasClass("inCodeMode")) {
										var f = m.$superEdit.html().length;
										if (f != m.savedContentLength || 1 == window.saveOnResize || r) {
											r = !1, window.saveOnResize = !1;
											var h = {
												inCodeMode: !1,
												whenSave: e,
												pageGuid: g,
												sE: m,
												htmlLength: f,
												globalElement: a,
												saveForCloseAdminPanel: d
											};
											b.admin.broadCast("blockcontentsavecontent", h), $(".contentPanel").length > 0 && (m.savedContentLength = f, m.save.savePage())
										}
									}
									$(".contentPanel").length < 1 && (q.off("click.saveClick"), m.$superEdit.off("click.saveOnTouch touch.saveOnTouch"))
								}
							}), pb.utils.onDestroy(b, function() {
								setTimeout(function() {
									try {
										q.off("click.saveClick")
									} catch (a) {}
								}, 1)
							}, "Block Content");
							var s = m.$el.find(".codeEditor")[0];
							m.codeEditor = CodeMirror.fromTextArea(s, {
								mode: "application/x-ejs",
								lineNumbers: !0
							}), m.$gedit.on("click.fullscreenToggle", ".fullscreenToggle", function() {
								var a = m.$gedit;
								a.hasClass("inFullscreen") ? (a.removeClass("inFullscreen"), $(".contentPanel").css("z-index", 1)) : (a.addClass("inFullscreen"), $(".contentPanel").css("z-index", 1010));
								var b = $(document).width(),
									c = m.$geditContent.width();
								return m.margin = (b - c) / 2, !1
							}), m.$gedit.on("click.sourceToggle", ".sourceToggle", function() {
								var a = m.$gedit,
									b = m.$el.find(".superEdit");
								if (a.hasClass("inCodeMode")) {
									var c = m.codeEditor.getValue();
									b.html(c), m.save._initResizeAndEdit(), a.removeClass("inCodeMode")
								} else {
									m.save._removeResizeAndEdit();
									var d = b.html();
									m.codeEditor.setValue(d), setTimeout(m.codeEditor.refresh, 0), a.addClass("inCodeMode")
								}
								return !1
							}), m.$gedit.on("click", ".saveInsert", function() {
								return m.add.addWidgetFromDialog($(this)), !1
							}), m.$gedit.on("click", ".closeWidget", function() {
								return $(this).closest(".widget").hide(), !1
							}), m.$gedit.on("click", ".savePage", function() {
								return m.save.savePage(), !1
							}), m.$el.on("click", ".addBlock", function() {
								return m.add.addBlock(this), m.$el.find(".addBlockDialog").hide(), !1
							}), m.$el.on("click", ".addBlockButton", function() {
								var a = m.$el.find(".addBlockDialog");
								$(this).addClass("active");
								var b = a.is(":visible");
								b ? (a.slideUp("fast"), $(this).removeClass("active")) : a.slideDown("fast")
							}), m.$gedit.on("click", ".deleteBlock", function() {
								var a = confirm(m.lang.areYouSureToDelete);
								a && (m.layout.removeBlock(), $(this).closest(".widget").hide())
							}), m.$gedit.on("mousedown", ".movehandle", function() {
								m.layout.startBlockMove(this)
							}), $(document).on("mouseup", "body", function(a) {
								$(a.target).hasClass("confhandle") || m.layout.stopBlockMove()
							}), m.$gedit.on("mouseenter", ".block", function() {
								m.layout.showHandles($(this))
							}), m.$gedit.on("mouseleave", ".block", function() {
								m.layout.hideHandles($(this))
							}), m.$gedit.on("mouseenter", ".field", function() {
								m.layout.showFormFieldHandles($(this))
							}), m.$gedit.on("mouseleave", ".field", function() {
								m.layout.hideFormFieldHandles($(this))
							}), m.$el.find(".column.colresize").resizable({
								grid: [1, 1e4],
								autoHide: !0,
								handles: "e",
								start: f,
								resize: h,
								stop: i
							}), m.$el.find(".image").resizable({
								aspectRatio: !0,
								stop: j
							}), m.$el.find(".iFrame").resizable({
								handles: "s",
								start: k,
								stop: l
							}), m.$el.find(".spacing").resizable({
								handles: "s"
							}), m.$el.find(".gmap").resizable({
								handles: "s"
							}), m.$gedit.on("click", ".confhandle", function() {
								m.clickLocation.BlockId = $(this).closest(".block").attr("id"), m.clickLocation.ColumnId = $(this).closest(".column").attr("id"), m.clickLocation.RowId = $(this).closest(".row").attr("id"), m.clickLocation.NumberOfBlocksInCol = $(this).closest(".column").children(".block").length, m.clickLocation.NumberOfColsInRow = $(this).closest(".row").children(".column").length, m.edit.showEditDialog(this)
							}), m.$el.find(".form").sortable({
								items: "> .field"
							}), m.$gedit.on("click", ".field .remove", function() {
								$(this).closest(".field").fadeOut(300, function() {
									$(this).remove()
								})
							}), m.$gedit.on("change", ".fieldType", function() {
								"select" == $(this).val() || "checkbox" == $(this).val() || "option" == $(this).val() ? m.$el.find(".formOptionLabel").show() : m.$el.find(".formOptionLabel").hide()
							}), m.$gedit.on("change", ".imagePosition", function() {
								m.edit.positionImage($(this))
							}), m.$gedit.on("change", ".imageLinkTo", function() {
								m.edit.makeImageALink($(this))
							}), m.$gedit.on("click", ".addImageToContent", function() {
								m.add.addImageToContent($(this))
							}), m.$gedit.on("click", ".editMapSave", function() {
								m.edit.changeMapAddress()
							}), c(m.$gedit.find(".gmap"), function() {
								m.$gedit.find(".gmap").each(function() {
									$(this).prepend('<div class="map"></div>');
									var a = $(this).data("lati"),
										b = $(this).data("longi");
									$(this).find(".map").gmap({
										zoom: 14,
										center: a + "," + b,
										callback: function() {
											this.addMarker({
												position: a + "," + b
											})
										}
									})
								})
							});
							var t = pb.utils.getQueryParameterByName("testeditor");
							if (1 == t) {
								var u;
								m.$superEdit.on("click", ".text", function() {
									$(this).find(".doubleClick").remove();
									var a = $(this).closest(".superEdit").children(".row").length,
										b = $(this).closest(".row").children(".column").length;
									if (1 == a && 1 == b) c = "singlerow";
									else if (b > 1) c = "multicolumns";
									else var c = "regular";
									u = $(this).textTools({
										type: c
									})
								})
							} else {
								var v = {
									toolbar: [
										["RemoveFormat"],
										["Format", "FontSize"],
										["Bold", "Italic", "Underline", "Strike", "-", "TextColor", "BGColor"],
										["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
										["NumberedList", "BulletedList"],
										["HorizontalRule"],
										["Table"],
										["Image", "-", "Link", "Unlink"]
									],
									format_tags: "p;h1;h2;h3",
									forcePasteAsPlainText: !0,
									filebrowserWindowWidth: "640",
									filebrowserWindowHeight: "480"
								};
								b.accountInfo.NrOfImages < b.accountInfo.ImageQuota && (v.filebrowserImageUploadUrl = "/api/private/blockcontentupload/saveimage", pb.utils.isNrPremium(m.accountType) && (v.filebrowserUploadUrl = "/api/private/blockcontentupload/uploadfile"));
								var w = "click";
								m.$superEdit.on(w, ".text", function() {
									$(this).find(".doubleClick").remove(), $(this).attr("contenteditable", !0), $(this).ckeditor(v), $(this).addClass("editable"), m.$el.find(".addBlockDialog").hide(), $(this).focus()
								}), $(document).on(w, "body", function(a) {
									$(a.target).closest(".editable").length < 1 && $(a.target).closest(".cke_reset_all").length < 1 && m.$el.find(".editable").each(function() {
										var a = $(this).ckeditorGet();
										a.destroy(), $(this).removeClass("cke_focus"), $(this).attr("contenteditable", !1), $(this).removeClass("editable")
									})
								})
							}
						},
						initConstants: function(a, b) {
							m.$el = b, m.$superEdit = m.$el.find(".superEdit"), m.$gedit = m.$el.find(".gedit"), m.$geditContent = m.$el.find(".geditContent"), m.$upgradeDialog = m.$el.find(".upgradeDialog"), m.isBlockMove = !1, m.mouse = {
								RowId: "",
								RowTop: "",
								RowLeft: 0,
								ColumnId: "",
								ColumnTop: 0,
								nLeft: 0,
								BlockId: "",
								BlockTop: 0,
								BlockLeft: 0,
								NumberOfColsInRow: 0,
								rowObj: null,
								colObj: null,
								blockObj: null
							}, m.clickLocation = {
								BlockId: "",
								ColumnId: "",
								RowId: "",
								NumberOfBlocksInCol: 0,
								NumberOfColsInRow: 0
							}, m.resizeTotalWidth = 0, m.resizeTotalPercent = 0, m.hasUnsavedContent = !1, m.margin = 0, m.savedContentLength = 0, m.codeEditor = null, m.accountType = a.site.AccountType, m.$scope = a, m.lang = pb.lang.text.blockEditor, m.$scope.fieldCounter = 1e3
						},
						initUploadListener: function() {
							var a = window.addEventListener ? "addEventListener" : "attachEvent",
								b = window[a],
								c = "attachEvent" == a ? "onmessage" : "message";
							b(c, function(a) {
								if ("https://sat.me" != a.origin && "http://sputnik.portfolioboxdns.com" != a.origin) return !1;
								m.$el.find(".uploadImageWait").removeClass("show");
								var b = jQuery.parseJSON(a.data);
								if (void 0 == b.IsSuccess || 1 != b.IsSuccess) MessageHandler.NewProgramMessage(b);
								else {
									var c = {
										fileName: b.filelink,
										width: b.width,
										height: b.height,
										guid: b.guid
									};
									m.$el.find("#imgRow").tmpl(c).prependTo(".imageList");
									var d = new AjaxHelper;
									d.PostUrl = "/admin-api/blockapi/updateimagepostsputnik", d.PostData = {
										s3location: b.s3location,
										height: b.height,
										width: b.width,
										guid: b.guid,
										filename: b.filename
									}, d.OnSuccessReturn = function() {}, d.DoPost()
								}
							}, !1)
						},
						layout: {
							startBlockMove: function(a) {
								m.clickLocation.BlockId = $(a).closest(".block").attr("id"), m.clickLocation.ColumnId = $(a).closest(".column").attr("id"), m.clickLocation.RowId = $(a).closest(".row").attr("id"), m.clickLocation.NumberOfBlocksInCol = $(a).closest(".column").children(".block").length, m.clickLocation.NumberOfColsInRow = $(a).closest(".row").children(".column").length, m.isBlockMove = !0, m.$superEdit.addClass("isBlockMove"), m.$el.find("#" + m.clickLocation.BlockId).addClass("ismoved"), m.$superEdit.on("mousemove", function() {
									m.layout.markDropLocation.onMouseMove()
								}), m.$el.find(".block").on("mousemove", function(a) {
									var b = $(this).outerWidth(),
										c = $(this).outerHeight(),
										d = a.offsetX || a.pageX - $(a.target).offset().left,
										e = a.offsetY || a.pageY - $(a.target).offset().top;
									m.mouse.BlockLeft = d / b * 100, m.mouse.BlockTop = e / c * 100
								}), m.$el.find(".column").on("mousemove", function(a) {
									var b = $(this).outerWidth(),
										c = $(this).outerHeight(),
										d = a.offsetX || a.pageX - $(a.target).offset().left,
										e = a.offsetY || a.pageY - $(a.target).offset().top;
									m.mouse.ColumnLeft = d / b * 100, m.mouse.ColumnTop = e / c * 100
								}), m.$el.find(".row").on("mousemove", function(a) {
									var b = $(this).outerWidth(),
										c = $(this).outerHeight(),
										d = a.offsetX || a.pageX - $(a.target).offset().left,
										e = a.offsetY || a.pageY - $(a.target).offset().top,
										f = 12;
									c -= f, m.mouse.RowLeft = d / b * 100, m.mouse.RowTop = e / c * 100, m.mouse.NumberOfColsInRow = $(this).children(".column").length
								}), m.$el.find(".row").on("mouseenter", function() {
									m.mouse.RowId = $(this).attr("id")
								}), m.$el.find(".column").on("mouseenter", function() {
									m.mouse.ColumnId = $(this).attr("id")
								}), m.$el.find(".block").on("mouseenter", function() {
									m.mouse.BlockId = $(this).attr("id")
								}), m.$el.find(".row").on("mouseleave", function() {
									m.mouse.RowId = "", $(this).removeClass("insertAbove"), $(this).removeClass("insertBelow")
								}), m.$el.find(".column").on("mouseleave", function() {
									m.mouse.ColumnId = "", $(this).removeClass("insertRight"), $(this).removeClass("insertLeft")
								}), m.$el.find(".block").on("mouseleave", function() {
									m.mouse.BlockId = "", $(this).removeClass("insertAbove"), $(this).removeClass("insertBelow")
								})
							},
							stopBlockMove: function() {
								m.$superEdit.off("mousemove"), m.$el.find(".block").off("mousemove"), m.$el.find(".row").off("mousemove"), m.$el.find(".column").off("mousemove"), m.$superEdit.removeClass("isBlockMove"), m.$el.find(".ismoved").removeClass("ismoved"), m.isBlockMove && (m.layout.dropBlock.doDrop(), m.isBlockMove = !1)
							},
							markDropLocation: {
								onMouseMove: function() {
									var a = m.mouse.RowId ? "#" + m.mouse.RowId : null,
										b = m.mouse.ColumnId ? "#" + m.mouse.ColumnId : null,
										c = m.mouse.BlockId ? "#" + m.mouse.BlockId : null;
									m.mouse.rowObj = m.$el.find(a), m.mouse.colObj = m.$el.find(b), m.mouse.blockObj = m.$el.find(c), m.layout.placeConditions.colRowTop() ? this.showColRowTop() : m.layout.placeConditions.colRowBottom() ? this.showColRowBottom() : m.layout.placeConditions.colLeft() ? this.showColLeft() : m.layout.placeConditions.colRight() ? this.showColRight() : m.layout.placeConditions.rowAbove() ? this.showRowAbove() : m.layout.placeConditions.rowBelow() ? this.showRowBelow() : this.hideMarks()
								},
								showColRowTop: function() {
									this.hideRowMarks(), this.hideColMarks(), m.mouse.blockObj.addClass("insertAbove")
								},
								showColRowBottom: function() {
									this.hideRowMarks(), this.hideColMarks(), m.mouse.blockObj.addClass("insertBelow")
								},
								showColLeft: function() {
									this.hideRowMarks(), this.hideColRowMarks(), m.mouse.colObj.addClass("insertLeft")
								},
								showColRight: function() {
									this.hideRowMarks(), this.hideColRowMarks(), m.mouse.colObj.addClass("insertRight")
								},
								showRowAbove: function() {
									m.mouse.rowObj.addClass("insertAbove")
								},
								showRowBelow: function() {
									m.mouse.rowObj.addClass("insertBelow")
								},
								hideMarks: function() {
									m.mouse.rowObj.removeClass("insertAbove"), m.mouse.rowObj.removeClass("insertBelow"), m.mouse.colObj.removeClass("insertRight"), m.mouse.colObj.removeClass("insertLeft"), m.mouse.blockObj.removeClass("insertAbove"), m.mouse.blockObj.removeClass("insertBelow")
								},
								hideRowMarks: function() {
									m.mouse.rowObj.removeClass("insertAbove"), m.mouse.rowObj.removeClass("insertBelow")
								},
								hideColMarks: function() {
									m.mouse.colObj.removeClass("insertRight"), m.mouse.colObj.removeClass("insertLeft")
								},
								hideColRowMarks: function() {
									m.mouse.blockObj.removeClass("insertAbove"), m.mouse.blockObj.removeClass("insertBelow")
								}
							},
							placeConditions: {
								isDropToSameRow: function() {
									return m.mouse.RowId == m.clickLocation.RowId && m.clickLocation.NumberOfColsInRow < 2 ? !0 : !1
								},
								isDropToSameColumn: function() {
									return m.clickLocation.NumberOfBlocksInCol >= 2 || m.mouse.ColumnId != m.clickLocation.ColumnId ? !1 : !0
								},
								isDropToSameBlock: function() {
									return m.mouse.BlockId != m.clickLocation.BlockId ? !1 : !0
								},
								isDropToBlockInRowWithoutCols: function() {
									return m.mouse.NumberOfColsInRow < 2 ? !0 : !1
								},
								colRowTop: function() {
									return "" != m.mouse.ColumnId && m.mouse.BlockTop < 10 && !m.layout.placeConditions.isDropToSameBlock() && !m.layout.placeConditions.isDropToBlockInRowWithoutCols() ? !0 : !1
								},
								colRowBottom: function() {
									return "" != m.mouse.ColumnId && m.mouse.BlockTop > 85 && !m.layout.placeConditions.isDropToSameBlock() && !m.layout.placeConditions.isDropToBlockInRowWithoutCols() ? !0 : !1
								},
								colLeft: function() {
									return m.mouse.ColumnLeft < 10 && "" != m.mouse.ColumnId && !m.layout.placeConditions.isDropToSameColumn() ? !0 : !1
								},
								colRight: function() {
									return m.mouse.ColumnLeft > 90 && "" != m.mouse.ColumnId && !m.layout.placeConditions.isDropToSameColumn() ? !0 : !1
								},
								rowAbove: function() {
									return m.mouse.RowTop < 10 && "" != m.mouse.RowId && !m.layout.placeConditions.isDropToSameRow() ? !0 : !1
								},
								rowBelow: function() {
									return m.mouse.RowTop > 85 && "" != m.mouse.RowId && !m.layout.placeConditions.isDropToSameRow() ? !0 : !1
								}
							},
							dropBlock: {
								_getRandomId: function() {
									var a = [];
									return a[0] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[1] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[2] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[3] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[4] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[5] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[6] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[7] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[8] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a.join("")
								},
								doDrop: function() {
									var a = m.mouse.RowId ? "#" + m.mouse.RowId : null,
										b = m.mouse.ColumnId ? "#" + m.mouse.ColumnId : null,
										c = m.mouse.BlockId ? "#" + m.mouse.BlockId : null;
									m.mouse.rowObj = m.$el.find(a), m.mouse.colObj = m.$el.find(b), m.mouse.blockObj = m.$el.find(c), m.layout.placeConditions.colRowTop() ? this.dropColRow("before") : m.layout.placeConditions.colRowBottom() ? this.dropColRow("after") : m.layout.placeConditions.colLeft() ? this.dropCol("before") : m.layout.placeConditions.colRight() ? this.dropCol("after") : m.layout.placeConditions.rowAbove() ? this.dropRow("before") : m.layout.placeConditions.rowBelow() ? this.dropRow("after") : console.log("drop nothing")
								},
								removeContentResize: function(a) {
									a.find(".image").each(function() {
										$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
									}), a.find(".iFrame").each(function() {
										$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
									}), a.find(".gmap").each(function() {
										$(this).hasClass("ui-resizable") && $(this).resizable("destroy"), $(this).find(".map").remove()
									}), a.find(".form").each(function() {
										$(this).hasClass("ui-sortable") && $(this).sortable("destroy")
									}), a.find(".spacing").each(function() {
										$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
									})
								},
								initContentResize: function(a) {
									a.find(".image").each(function() {
										$(this).resizable({
											aspectRatio: !0,
											stop: j
										})
									}), a.find(".iFrame").each(function() {
										$(this).resizable({
											handles: "s",
											start: k,
											stop: l
										})
									}), a.find(".spacing").each(function() {
										$(this).resizable({
											handles: "s"
										})
									}), a.find(".form").each(function() {
										$(this).sortable({
											items: "> .field"
										})
									}), c(a.find(".gmap"), function() {
										a.find(".gmap").each(function() {
											$(this).resizable({
												handles: "s"
											}), $(this).prepend('<div class="map"></div>');
											var a = $(this).data("lati"),
												b = $(this).data("longi");
											$(this).find(".map").gmap({
												zoom: 14,
												center: a + "," + b,
												callback: function() {
													this.addMarker({
														position: a + "," + b
													})
												}
											})
										})
									})
								},
								deleteBlock: function(a) {
									if (m.clickLocation.NumberOfColsInRow < 2 && m.clickLocation.NumberOfBlocksInCol < 2) m.$el.find("#" + m.clickLocation.RowId).remove();
									else if (m.clickLocation.NumberOfColsInRow >= 2 && m.clickLocation.NumberOfBlocksInCol < 2) {
										m.$el.find("#" + m.clickLocation.ColumnId).remove();
										var b = 99.7 / (m.clickLocation.NumberOfColsInRow - 1);
										m.$el.find("#" + m.clickLocation.RowId).children(".column").width(b + "%"), this.makeColumnResizable(m.$el.find("#" + m.clickLocation.RowId))
									} else a.remove()
								},
								makeColumnResizable: function(a) {
									a.children(".column").each(function() {
										$(this).next(".column").length > 0 ? $(this).hasClass("colresize") || $(this).addClass("colresize") : $(this).hasClass("colresize") && $(this).removeClass("colresize")
									})
								},
								dropColRow: function(a) {
									var b = m.$el.find("#" + m.clickLocation.BlockId),
										c = b.attr("id");
									this.removeContentResize(b);
									var d = b.clone(!0);
									this.deleteBlock(b), "before" == a ? m.mouse.blockObj.before(d) : m.mouse.blockObj.after(d), this.initContentResize(m.$el.find("#" + c)), this.splitOneColumnRow()
								},
								dropCol: function(a) {
									var b = m.$el.find("#" + m.clickLocation.BlockId);
									this.removeContentResize(b);
									var c = b.attr("id"),
										d = b.clone(!0);
									this.deleteBlock(b);
									var e = m.layout.dropBlock._getRandomId(),
										f = '<div class="column" id="' + e + '"></div>';
									"before" == a ? m.mouse.colObj.before(f) : m.mouse.colObj.after(f), m.$el.find("#" + e).html(d);
									var g = m.mouse.colObj.closest(".row").children(".column"),
										h = g.length,
										i = 99.7 / h;
									g.width(i + "%"), this.makeColumnResizable(m.$el.find("#" + m.mouse.RowId)), this.initContentResize(m.$el.find("#" + c))
								},
								dropRow: function(a) {
									var b = m.$el.find("#" + m.clickLocation.BlockId);
									this.removeContentResize(b);
									var c = b.attr("id"),
										d = b.clone(!0);
									this.deleteBlock(b);
									var e = m.layout.dropBlock._getRandomId(),
										f = m.layout.dropBlock._getRandomId(),
										g = '<div class="row" id="' + e + '"><div class="column" id="' + f + '"></div></div>';
									"before" == a ? m.mouse.rowObj.before(g) : m.mouse.rowObj.after(g), m.$el.find("#" + f).html(d);
									var h = m.mouse.colObj.closest(".row").children(".column"),
										i = h.length,
										j = 99.7 / i;
									h.width(j + "%"), this.initContentResize(m.$el.find("#" + c)), this.splitOneColumnRow()
								},
								splitOneColumnRow: function() {
									var a = this;
									2 == m.clickLocation.NumberOfColsInRow && 1 == m.clickLocation.NumberOfBlocksInCol && m.$el.find("#" + m.clickLocation.RowId).find(".column").children(".block").each(function(b) {
										if (b > 0) {
											a.removeContentResize($(this));
											var c = m.layout.dropBlock._getRandomId(),
												d = m.layout.dropBlock._getRandomId(),
												e = '<div class="row" id="' + c + '"><div class="column" id="' + d + '"></div></div>';
											m.$el.find("#" + m.clickLocation.RowId).after(e);
											var f = $(this).clone(!0),
												g = $(this).attr("id");
											$(this).remove(), m.$el.find("#" + d).html(f), a.initContentResize(m.$el.find("#" + g))
										}
									})
								}
							},
							removeBlock: function() {
								var a = m.$el.find("#" + m.clickLocation.BlockId);
								m.layout.dropBlock.deleteBlock(a), m.layout.dropBlock.splitOneColumnRow()
							},
							showHandles: function(a) {
								$(a).addClass("ishovered")
							},
							hideHandles: function(a) {
								$(a).removeClass("ishovered")
							},
							showFormFieldHandles: function(a) {
								$(a).addClass("ishovered")
							},
							hideFormFieldHandles: function(a) {
								$(a).removeClass("ishovered")
							}
						},
						add: {
							addBlock: function(a) {
								var b = $(a).data("type");
								"text" == b ? this.addText() : "spacing" == b ? this.addSpacing() : "horizontalline" == b ? this.addHorizontalLine() : "iframe" == b ? this.showIFrameDialog() : "video" == b ? this.showVideoDialog() : "map" == b ? this.showMapDialog() : "customform" == b ? this.showFormDialog() : "image" == b && this.showImageDialog()
							},
							addWidgetFromDialog: function(a) {
								var b = $(a).closest(".widget"),
									c = b.data("type");
								"iframe" == c ? this.addIFrameFromDialog(b) : "video" == c ? this.addVideoFromDialog(b) : "map" == c ? this.addMapFromDialog(b) : "customform" == c && this.addFormFromDialog(b)
							},
							_addNewRow: function() {
								var a = this._getRandomId(),
									b = this._getRandomId(),
									c = this._getRandomId(),
									d = '<div class="row" id="' + a + '">\n<div class="column" id="' + b + '">\n<div class="block" id="' + c + '">\n<span class="movehandle"></span><span class="confhandle"></span>\n</div>\n</div>\n</div>\n\n';
								return m.$superEdit.append(d), c
							},
							_getRandomId: function() {
								var a = [];
								return a[0] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[1] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[2] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[3] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[4] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[5] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[6] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[7] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a[8] = String.fromCharCode(65 + Math.floor(26 * Math.random())), a.join("")
							},
							_insertHtml: function(a, b) {
								var c = m.$el.find("#" + b);
								c.prepend("\n" + a);
								var d = ".contentPanel";
								m.$gedit.hasClass("inFullscreen") && (d = ".gedit");
								var e = c.offset().top - 20;
								$(d).animate({
									scrollTop: e
								}, "slow")
							},
							_showInsertDialog: function(a) {
								var b = m.$geditContent,
									c = b.height(),
									d = 0,
									e = (a.width(), a.height());
								c -= e / 2, c = c > 0 ? c : 0;
								var f = b.offset().top + c,
									g = ".contentPanel";
								m.$gedit.hasClass("inFullscreen") && (g = ".gedit"), a.css({
									top: c + "px",
									left: d + "px"
								}).show(100, function() {
									$(g).animate({
										scrollTop: f
									}, "slow"), a.drags({
										handle: ".moveWidget"
									})
								})
							},
							showUpgradeDialog: function() {
								var a = m.$upgradeDialog,
									b = m.$geditContent,
									c = b.position().top,
									d = 0;
								a.css({
									top: c + 20 + "px",
									left: d + "px"
								}).show(100, function() {
									a.drags({
										handle: ".moveWidget"
									})
								})
							},
							addText: function() {
								var a, b = this._addNewRow();
								a = '<div class="text tt2"><span class="doubleClick">' + m.lang.doubleClickToStartWriting + "</span></div>", this._insertHtml(a, b)
							},
							addSpacing: function() {
								var a = this._addNewRow(),
									b = '<div class="spacing">&nbsp;</div>';
								this._insertHtml(b, a), m.$el.find("#" + a + " .spacing").resizable({
									handles: "s"
								})
							},
							addHorizontalLine: function() {
								var a = this._addNewRow(),
									b = '<div class="horizontalLine"></div>';
								this._insertHtml(b, a)
							},
							showIFrameDialog: function() {
								if (pb.utils.isNrPremium(m.accountType)) {
									var a = m.$el.find(".insertIFrame");
									this._showInsertDialog(a)
								} else this.showUpgradeDialog()
							},
							showVideoDialog: function() {
								var a = m.$el.find(".insertVideo");
								this._showInsertDialog(a)
							},
							showMapDialog: function() {
								if (pb.utils.isNrPremium(m.accountType)) {
									var a = m.$el.find(".insertMap");
									this._showInsertDialog(a)
								} else this.showUpgradeDialog()
							},
							showFormDialog: function() {
								if (pb.utils.isNrPremium(m.accountType)) {
									var a = m.$el.find(".insertForm");
									a.removeClass("editForm"), this._showInsertDialog(a);
									var b = this._getRandomId();
									a.data("formid", b)
								} else this.showUpgradeDialog()
							},
							showImageDialog: function() {
								var a = m.$el.find(".insertImage"),
									b = m.$geditContent,
									c = b.position().top,
									d = 0;
								a.css({
									top: c + 20 + "px",
									left: d + "px"
								}).show(100, function() {
									a.drags({
										handle: ".moveWidget"
									})
								})
							},
							addIFrameFromDialog: function(a) {
								var b = m.$el.find(".iFrameUrl").val(),
									c = this;
								b.indexOf("https") >= 0 ? amplify.request({
									resourceId: "testIframe",
									data: {
										testUrl: b
									},
									success: function(d) {
										if (1 != d) m.$scope.admin.broadCast("adminMessage", {
											message: "The website cannot be iframed",
											type: "errorMessage"
										});
										else {
											var e = c._addNewRow(),
												f = '<div class="iFrame"><iframe src="' + b + '"></iframe></div>';
											c._insertHtml(f, e), m.$el.find("#" + e + " .iFrame").resizable({
												handles: "s",
												start: k,
												stop: l
											}), m.$el.find(".iFrameUrl").val(""), a.hide()
										}
									},
									error: function() {
										m.$scope.admin.broadCast("adminMessage", {
											message: "The website cannot be iframed",
											type: "errorMessage"
										})
									}
								}) : m.$scope.admin.broadCast("adminMessage", {
									message: "The website needs to be https",
									type: "errorMessage"
								})
							},
							addVideoFromDialog: function(a) {
								var b = m.$el.find(".videoUrl").val();
								m.$el.find(".videoUrl").val(""), b = b.replace("https://", "http://");
								var c = "";
								if (-1 != b.search("youtube.com") || -1 != b.search("youtu.be")) c = b.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
								else {
									if (-1 == b.search("vimeo.com")) return;
									c = b.replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com|player\.vimeo\.com)\/(?:video\/)?(.+)/g, '<iframe src="https://player.vimeo.com/video/$1" width="100%" height="auto" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
								}
								var d = '<div class="iFrame video">' + c + "</div>",
									e = this._addNewRow();
								this._insertHtml(d, e), m.$el.find("#" + e + " .iFrame").resizable({
									handles: "s",
									start: k,
									stop: l
								}), a.hide()
							},
							addMapFromDialog: function(a) {
								var b = m.$el.find(".mapAddress").val();
								m.$el.find(".mapAddress").val(""), m.helpers.GoogleMaps.getLatLongAndInsertMap(b, a, "")
							},
							addFormFromDialog: function(a) {
								var b = m.$el.find(".fieldRequired").is(":checked"),
									c = b ? !0 : !1,
									d = c ? "*" : "";
								b = c ? "required" : "";
								var e = m.$el.find(".fieldName").val(),
									f = m.$el.find(".fieldType").val(),
									g = m.$el.find(".fieldOptions").val(),
									h = a.data("formid"),
									i = 1e3;
								if (m.$el.find(".fieldName").val(""), m.$el.find(".fieldType").val(""), m.$el.find(".fieldOptions").val(""), m.$el.find("#" + h).length < 1) {
									var j = this._addNewRow(),
										k = "blockContentContactForm" + h.trim(),
										l = ('<div class="captchaField clearfix"><label>' + m.$scope.site.UserTranslatedText.EnterTheLetters + '<input type="text" name="captcha" class="captchaImageInput"/></label><div class="captchaBox"><img src="/api/public/captchaapi/getimage" alt="" class="captchaImage"><span class="refreshCaptchaImage">' + m.$scope.site.UserTranslatedText.Refresh + "</span></div></div>", '<div class="blockContentForm blockContentForm-{{page.Guid}}"><form class="form form-{{page.Guid}} ' + k + '" name="' + k + '" id="' + h + '"><div class="send send-{{page.Guid}}"><button ng-click="base.blockContactFormAction.Send(' + k + ')" class="submitForm submitForm-{{page.Guid}} button" pb-style="base.getButtonStyle()">' + m.$scope.site.UserTranslatedText.Send + "</button></div></form></div>");
									this._insertHtml(l, j)
								}
								var n = m.$el.find("#" + h),
									o = (this._makeStringAlphanumeric(e), "");
								if ("text" == f) {
									i = ++m.$scope.fieldCounter;
									var p = "textField" + i,
										q = "text" + i;
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + " " + d + '<input class="text ' + q + '{{page.Guid}}" type="text" ' + b + ' name="' + p + '"/></span><span class="remove"></span></div>'
								} else if ("email" == f) {
									i = ++m.$scope.fieldCounter;
									var p = "textField" + i,
										q = "text" + i;
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + " " + d + '<input class="text ' + q + '{{page.Guid}}" type="email" ' + b + ' name="' + p + '"/></span><span class="remove"></span></div>'
								} else if ("textarea" == f) {
									i = ++m.$scope.fieldCounter;
									var p = "textareaField" + i,
										q = "textarea" + i;
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + " " + d + '<textarea class="textarea ' + q + '{{page.Guid}}" rows="5" cols="20" ' + b + ' name="' + p + '"></textarea></span><span class="remove"></span></div>'
								} else if ("checkbox" == f) {
									i = ++m.$scope.fieldCounter;
									for (var p = "checkboxField" + i, q = "checkbox" + i, r = g.split(","), s = "", t = 0; t < r.length; t++) {
										var u = r[t],
											v = this._makeStringAlphanumeric(u);
										s += "" + u + ' <input class="checkbox ' + q + '{{page.Guid}}" type="checkbox" name="' + e + '" value="' + v + '"/> '
									}
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + "</br>" + s + '</span><span class="remove"></span></div>'
								} else if ("select" == f) {
									for (var r = g.split(","), s = "", t = 0; t < r.length; t++) {
										var u = r[t],
											v = this._makeStringAlphanumeric(u);
										s += '<option value="' + v + '">' + u + "</option>"
									}
									i = ++m.$scope.fieldCounter;
									var p = "selectField" + i,
										q = "select" + i;
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + " " + d + '<select class="select ' + q + '{{page.Guid}}" name="' + p + '">' + s + '</select></span><span class="remove"></span></div>'
								} else if ("option" == f) {
									i = ++m.$scope.fieldCounter;
									for (var p = "radioField" + i, q = "radio" + i, r = g.split(","), s = "", t = 0; t < r.length; t++) {
										var u = r[t],
											v = this._makeStringAlphanumeric(u);
										s += '<label class="radio"><input type="radio" name="' + p + '" value="' + v + '"/>' + u + "</label>"
									}
									o += '<div class="field ' + p + '"><span class="label" pb-style="base.getPStyle()">' + e + ' <div class="radioGroup ' + q + '{{page.Guid}}" >' + s + '</div></span><span class="remove"></span></div>'
								}
								n.find(".send").before(o), n.sortable({
									items: "> .field"
								})
							},
							addImageToContent: function(a) {
								var b = a.data("url"),
									c = this._addNewRow(),
									d = '<div class="image"><img src="' + b + '" alt="" /></div>';
								this._insertHtml(d, c), m.$el.find("#" + c + " .image").resizable({
									aspectRatio: !0,
									stop: j
								}), m.$el.find(".insertImage").hide()
							},
							_makeStringAlphanumeric: function(a) {
								return a.replace(/[^a-z0-9]/gi, "")
							}
						},
						save: {
							savePage: function() {
								var a = null;
								m.$gedit.hasClass("inCodeMode") ? (a = m.codeEditor.getValue(), e(a, g), m.$geditContent.addTemporaryClass("justSaved", 1e3), b(m.$scope, null), m.$scope.$apply()) : (this._removeResizeAndEdit(), a = m.$superEdit.html(), m.save._testIfNullContent(a) && (a = null), e(a, g), m.$geditContent.addTemporaryClass("justSaved", 1e3), this._initResizeAndEdit(), b(m.$scope, null), m.$scope.$apply())
							},
							_testIfNullContent: function(a) {
								var b = $(a),
									c = b.find(".block");
								if (c.length > 1) return !1;
								if (1 != c.find(".text").length) {
									var d = a.replace(/^\s*[\r\n]/gm, "");
									return d ? !1 : !0
								}
								var e = b.find(".text").first().html() || "";
								return "" != e && e != m.lang.doubleClickToStartWriting && e.trim() != "<p>" + m.lang.doubleClickToStartWriting + "</p>" && e.trim() != '<span class="doubleClick">' + m.lang.doubleClickToStartWriting + "</span>" && e ? !1 : !0
							},
							_removeResizeAndEdit: function() {
								m.$el.find(".editable").each(function() {
									var a = $(this).ckeditorGet();
									a.destroy(), $(this).removeClass("cke_focus"), $(this).attr("contenteditable", !1), $(this).removeClass("editable")
								}), m.$el.find(".colresize").each(function() {
									$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
								}), m.$el.find(".image").each(function() {
									$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
								}), m.$el.find(".spacing").each(function() {
									$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
								}), m.$el.find(".iFrame").each(function() {
									$(this).hasClass("ui-resizable") && $(this).resizable("destroy")
								}), m.$el.find(".form").each(function() {
									$(this).hasClass("ui-sortable") && $(this).sortable("destroy")
								}), m.$el.find(".gmap").each(function() {
									$(this).hasClass("ui-resizable") && $(this).resizable("destroy"), $(this).find(".map").remove()
								})
							},
							_initResizeAndEdit: function() {
								m.$el.find(".colresize").each(function() {
									$(this).resizable({
										grid: [1, 1e4],
										autoHide: !0,
										handles: "e",
										start: f,
										resize: h,
										stop: i
									})
								}), m.$el.find(".image").each(function() {
									$(this).resizable({
										aspectRatio: !0,
										stop: j
									})
								}), m.$el.find(".spacing").each(function() {
									$(this).resizable({
										handles: "s"
									})
								}), m.$el.find(".iFrame").each(function() {
									$(this).resizable({
										handles: "s",
										start: k,
										stop: l
									})
								}), m.$el.find(".form").each(function() {
									$(this).sortable({
										items: "> .field"
									})
								}), setTimeout(function() {
									c($(".gmap"), function() {
										$(".gmap").each(function() {
											$(this).html(""), $(this).prepend('<div class="map"></div>');
											var a = $(this).data("lati"),
												b = $(this).data("longi");
											$(this).resizable({
												handles: "s"
											}), $(this).find(".map").gmap({
												zoom: 14,
												center: a + "," + b,
												callback: function() {
													this.addMarker({
														position: a + "," + b
													})
												}
											})
										})
									})
								}, 100)
							}
						},
						edit: {
							showEditDialog: function() {
								var a = m.$el.find("#" + m.clickLocation.BlockId);
								a.find(".text").length > 0 || a.find(".horizontalLine").length > 0 || a.find(".spacing").length > 0 || a.find(".video").length > 0 || a.find(".iFrame").length > 0 ? this._showDeleteEdit(a) : a.find(".image").length > 0 ? this.showImageEdit(a) : a.find(".gmap").length > 0 ? this.showMapEdit(a) : a.find(".form").length > 0 && this.showFormEdit(a)
							},
							_showDeleteEdit: function(a) {
								var b = m.$el.find(".deleteBlockWidget"),
									c = m.$geditContent,
									d = a.offset().top - c.offset().top,
									e = a.offset().left - c.offset().left,
									f = a.width(),
									g = b.width();
								e = e + f - g, b.css({
									top: d + "px",
									left: e + "px"
								}).show(), b.show()
							},
							showImageEdit: function(a) {
								var a = m.$el.find("#" + m.clickLocation.BlockId),
									b = a.find(".image").find("a");
								if (m.$el.find(".imageLinkTo").val(""), b.length > 0) {
									var c = b.attr("href");
									void 0 != c && "" != c && m.$el.find(".imageLinkTo").val(c)
								}
								var d = m.$el.find(".editImagePopup"),
									e = m.$geditContent,
									f = a.offset().top - e.offset().top,
									g = a.offset().left - e.offset().left,
									h = a.width(),
									i = d.width();
								g = g + h - i, d.css({
									top: f + "px",
									left: g + "px"
								}), d.show()
							},
							showMapEdit: function(a) {
								var b = m.$el.find(".editMapPopup"),
									c = m.$geditContent,
									d = a.offset().top - c.offset().top,
									e = a.offset().left - c.offset().left,
									f = a.width(),
									g = b.width();
								e = e + f - g, b.css({
									top: d + "px",
									left: e + "px"
								}), b.show()
							},
							showFormEdit: function(a) {
								var b = m.$geditContent,
									c = a.offset().top - b.offset().top,
									d = a.offset().left - b.offset().left,
									e = a.find(".form").attr("id"),
									f = m.$el.find(".insertForm");
								f.data("formid", e), f.addClass("editForm");
								var g = a.width(),
									h = f.width();
								d = d + g - h, f.css({
									top: c + "px",
									left: d + "px"
								}), f.show(100, function() {
									f.drags({
										handle: ".moveWidget"
									})
								})
							},
							positionImage: function(a) {
								var b = m.$el.find("#" + m.clickLocation.BlockId),
									c = a.val();
								b.css("text-align", c)
							},
							makeImageALink: function(a) {
								var b = m.$el.find("#" + m.clickLocation.BlockId),
									c = a.val();
								return b.find(".image").find("img").parent().is("a") && b.find(".image").find("img").unwrap(), "" == c || " " == c || b.find(".image").find("img").wrap('<a href="' + c + '"></a>'), m.$el.find(".imageLinkTo").addTemporaryClass("updateOk", 2e3), !1
							},
							changeMapAddress: function() {
								var a = m.$el.find(".newMapAddress").val();
								m.$el.find(".newMapAddress").val("");
								var b = m.clickLocation.BlockId;
								m.helpers.GoogleMaps.getLatLongAndInsertMap(a, "", b)
							}
						},
						helpers: {
							GoogleMaps: {
								getLatLongAndInsertMap: function(a, b, d) {
									var e = this;
									c(!0, function() {
										var c = new google.maps.Geocoder;
										c.geocode({
											address: a
										}, function(a, c) {
											if (c == google.maps.GeocoderStatus.OK) {
												var f = a[0].geometry.location;
												"" == d ? e.insertNewMap(f, b) : e.updateMap(f, d)
											} else alert("Geocode was not successful for the following reason: " + c)
										})
									})
								},
								insertNewMap: function(a, b) {
									var d = '<div class="gmap" data-lati="' + a.lat() + '" data-longi="' + a.lng() + '"></div>',
										e = m.add._addNewRow();
									m.add._insertHtml(d, e), b.hide(), m.$el.find("#" + e + " .gmap").prepend('<div class="map"></div>');
									var f = a.lat(),
										g = a.lng();
									c(m.$el.find("#" + e).find(".map"), function() {
										m.$el.find("#" + e).find(".map").gmap({
											zoom: 14,
											center: f + "," + g,
											callback: function() {
												this.addMarker({
													position: f + "," + g
												})
											}
										})
									}), m.$el.find("#" + e + " .gmap").resizable({
										handles: "s"
									})
								},
								updateMap: function(a, b) {
									var d = m.$el.find("#" + b);
									d.find(".gmap").each(function() {
										$(this).hasClass("ui-resizable") && $(this).resizable("destroy"), $(this).remove()
									});
									var e = '<div class="gmap" data-lati="' + a.lat() + '" data-longi="' + a.lng() + '"><div class="map"></div></div>';
									d.prepend(e);
									var f = a.lat(),
										g = a.lng();
									c(d.find(".map"), function() {
										d.find(".map").gmap({
											zoom: 14,
											center: f + "," + g,
											callback: function() {
												this.addMarker({
													position: f + "," + g
												})
											}
										})
									}), d.find(".gmap").resizable({
										handles: "s"
									})
								}
							},
							initBgColor: function() {
								var a = amplify.store.sessionStorage("superEditTheme");
								"dark" == a && (m.$superEdit.addClass("dark"), $(".bgColor .bullet.dark").addClass("active").siblings(".bullet").removeClass("active")), m.$gedit.on("click", ".bgColor .bullet", function() {
									$(this).hasClass("dark") ? (m.$superEdit.addClass("dark"), amplify.store.sessionStorage("superEditTheme", "dark")) : (m.$superEdit.removeClass("dark"), amplify.store.sessionStorage("superEditTheme", "")), $(this).addClass("active").siblings(".bullet").removeClass("active")
								})
							}
						},
						clearAllEvents: function() {
							m.$gedit && (m.$gedit.off("click.fullscreenToggle"), m.$gedit.off("click.sourceToggle"))
						}
					};
					return function(a) {
						var b = a.fn.addClass;
						a.fn.addClass = function(a) {
							if ("colresize" == a) {
								if (this.data("resizable")) return;
								this.resizable({
									grid: [1, 1e4],
									autoHide: !0,
									handles: "e",
									start: f,
									resize: h,
									stop: i
								})
							}
							return b.apply(this, arguments)
						}
					}(jQuery),
					function(a) {
						var b = a.fn.removeClass;
						a.fn.removeClass = function(a) {
							if ("colresize" == a) {
								if (!this.is(".ui-resizable")) return;
								this.resizable("destroy")
							}
							return b.apply(this, arguments)
						}
					}(jQuery), {
						superEditor: m
					}
				}();
			return {
				restrict: "E",
				templateUrl: "application/views/app/modules/blockcontent/editor.html",
				replace: !0,
				controller: h,
				scope: {
					content: "=",
					whenSave: "=",
					pageGuid: "@",
					site: "=",
					accountInfo: "=",
					admin: "="
				},
				link: function(a, b) {
					window.doSave = !0, setTimeout(function() {
						i.superEditor.init(a, b), b.on("click.toExpand", ".gedit", function() {
							$(this).removeClass("editorCollapsed"), b.off("click.toExpand", ".gedit")
						});
						var c = b.find(".gedit");
						null == a.content ? c.removeClass("editorCollapsed") : c.height() < 150 && c.removeClass("editorCollapsed")
					}, 100), a.$on("$routeChangeStart", function() {
						window.dontCloseCPanel || (window.doSave = !1)
					}), a.$on("$destroy", function() {
						i.superEditor.clearAllEvents(), b.remove()
					})
				}
			}
		}],
		f = [function() {
			return {
				restrict: "A",
				link: function(d, e) {
					a = e;
					var f = {}, g = function() {
						f.site = d.$watch("site", function() {
							b(d, e)
						}, !0), d.pageOrSection ? f.pageOrSection = d.$watch("pageOrSection.BlockContent", function() {
							b(d, e)
						}, !0) : f.page = d.$watch("page.BlockContent", function() {
							b(d, e)
						}, !0), setTimeout(function() {
							c(e.find(".gmap"), function() {
								e.find(".gmap").each(function() {
									$(this).html(""), $(this).prepend('<div class="map"></div>');
									var a = $(this).data("lati"),
										b = $(this).data("longi");
									$(this).find(".map").gmap({
										zoom: 14,
										center: a + "," + b,
										callback: function() {
											this.addMarker({
												position: a + "," + b
											})
										}
									})
								})
							})
						}, 1), setTimeout(function() {
							var a = e.find("[title]");
							a.length > 0 && a.removeAttr("title")
						}, 100)
					};
					g(), pb.utils.onDestroy(d, function() {
						pb.utils.onRemoveEventsAndWatchers(f), f = null
					}, "Block Content")
				}
			}
		}],
		g = angular.module("ngBlockContent", []);
	g.directive("blockContentEditor", e), g.directive("blockContent", f)
}(), pbAng.dirs.blogHelper = ["$location", "$filter", function(a, b) {
	var c = ["$scope", "$element", "blogPostsService", function(a, c, d) {
		if (void 0 == a.page.BlogPosts && (a.page.BlogPosts = []), void 0 == a.page.BlogPostTags && (a.page.BlogPostTags = []), a.page.BlogPostTags.length > 0 && 0 == a.page.TagsLoaded) {
			var e = {};
			$.each(a.page.BlogPostTags, function(b, c) {
				var d = [];
				d = {
					Guid: c.Guid,
					Tag: c.Tag
				}, void 0 != c.BlogTagBlogPosts && $.each(c.BlogTagBlogPosts, function(b, c) {
					var f = c.BlogPostGuid,
						g = void 0;
					void 0 != e[f] ? (g = e[f], void 0 == g.Tags && (g.Tags = []), g.Tags.push(d)) : (g = pb.utils.findItemFromArray(a.page.BlogPosts, "Guid", f), g && (void 0 == g.Tags && (g.Tags = []), g.Tags.push(d), e[f] = g))
				})
			}), a.page.TagsLoaded = !0, pb.data.set.pages(pb.data.pages)
		}
		var f = a.page.BlogPosts.indexOf(a.base.currentPost);
		a.blog = {
			allTags: "",
			postPerPage: pb.constants.maxPostPerPage,
			activePageNumber: 1,
			path: b("link")("/" + a.page.Uri),
			postPerTag: {},
			getListLength: function() {
				var c = a.page.BlogPosts.length,
					d = pb.utils.getQueryParameterByName("tag");
				return d && (a.blog.postPerTag[d] ? c = a.blog.postPerTag[d].length : (a.blog.postPerTag[d] = b("filter")(a.page.BlogPosts, {
					Tags: d
				}), c = a.blog.postPerTag[d].length)), c
			},
			getBorderStyle: function() {
				var b = {};
				return b["border-color"] = g.getTransparentColor(a.site.PFontColor), b
			},
			getPostLink: function(c) {
				var d = "/" + a.page.Uri + "/" + c.Url;
				return b("link")(d)
			},
			getPostLinkWithComment: function(c) {
				var d = "/" + a.page.Uri + "/" + c.Url + "?c=1";
				return b("link")(d)
			},
			getAllTags: function() {
				tagName = [], merged = [], $.each(a.page.BlogPosts, function(c, d) {
					void 0 != d.Tags && $.each(d.Tags, function(c, d) {
						if (-1 == tagName.indexOf(d.Tag)) {
							tagName.push(d.Tag);
							var e = "/" + a.page.Uri + "?tag=" + d.Tag;
							d.Link = b("link")(e), merged.push(d)
						}
					})
				}), this.allTags = merged
			},
			nextPageNr: function() {
				var b = a.blog.getListLength(),
					c = a.base.queryString.p * this.postPerPage;
				return b > c
			},
			prevPageNr: function() {
				var b = a.base.queryString.p * this.postPerPage - this.postPerPage;
				return !(0 >= b)
			},
			nextPage: function() {
				var a = this.path + "?p=" + parseInt(parseInt(this.activePageNumber) + 1),
					b = pb.utils.getQueryParameterByName("tag");
				return b && (a += "&tag=" + b), a
			},
			prevPage: function() {
				var a = this.path + "?p=" + parseInt(parseInt(this.activePageNumber) - 1),
					b = pb.utils.getQueryParameterByName("tag");
				return b && (a += "&tag=" + b), a
			},
			nextPost: void 0 == a.page.BlogPosts[f + 1] ? "" : "/" + a.base.url + "/" + a.page.BlogPosts[f + 1].Url,
			prevPost: void 0 == a.page.BlogPosts[f - 1] ? "" : "/" + a.base.url + "/" + a.page.BlogPosts[f - 1].Url,
			checkPage: function() {
				var b = a.blog.getListLength();
				if (void 0 == a.base.queryString.p && b > 0 && (a.base.queryString.p = 1), a.base.queryString.p) if (a.base.queryString.p >= Math.ceil(b / this.postPerPage) + 1) a.base.set404();
				else if (a.base.queryString.p < 1) a.base.set404();
				else if (this.activePageNumber = a.base.queryString.p, void 0 == a.base.queryString.tag || "" == a.base.queryString.tag) {
					var c = this.activePageNumber * pb.constants.maxPostPerPage - pb.constants.maxPostPerPage;
					pb.utils.fetchBlogPosts(a, d, c, 5, 10)
				}
			},
			checkforTags: function(b) {
				"" != a.base.queryString.tag && (void 0 == b.IsFullPost || 0 == b.IsFullPost) && (console.log("GO FOR TAG"), console.log(b), d.getBlogPostByPostGuid(a, b.Guid))
			},
			limit1: function() {
				var b = a.blog.getListLength();
				return -b + a.blog.postPerPage * (a.blog.activePageNumber - 1)
			},
			limit2: function() {
				return a.blog.postPerPage
			},
			openShareDialog: function(b) {
				a.base.popup.open("sharepost", null, b)
			}
		}, a.convertPostDate = function(a) {
			return Date.parse(a.PostDate)
		}, a.captcha = {
			html: '<div data-callback="testCaptcha" class="g-recaptcha" id="captchaBlock" data-size="invisible"></div>',
			widgetID: "",
			recaptchaRendered: !1,
			renderCaptcha: function() {
				c.find("form").append(this.html), a.captcha.widgetID = grecaptcha.render(c.find("#captchaBlock")[0], {
					sitekey: pb.constants.invisibleReCaptchaSitekey
				})
			},
			testCaptcha: function(b) {
				a.comment.sendComment(b)
			}
		}, window.testCaptcha = a.captcha.testCaptcha, a.comment = {
			showFirstTime: !0,
			showForm: !1,
			isAdmin: isAdmin,
			commentBody: {},
			shouldLoad: function() {
				1 == a.base.queryString.c && a.comment.load()
			},
			load: function() {
				a.base.currentPost.Comments = [], a.comment.showForm = !a.comment.showForm, 1 != isAdmin && amplify.request({
					resourceId: "getCommentsForPost",
					data: {
						postGuid: a.base.currentPost.Guid
					},
					success: function(b) {
						a.base.currentPost.Comments = b, a.$digest()
					},
					error: function(a) {
						console.log("error: " + a)
					}
				})
			},
			validateComment: function(b, c) {
				1 != isAdmin && (void 0 != b && c.$valid ? (a.comment.toggleForm(), a.captcha.recaptchaRendered || (a.captcha.renderCaptcha(), a.captcha.recaptchaRendered = !0), b.Guid = pb.utils.getUniqueId(), b.PostGuid = a.base.currentPost.Guid, b.PageGuid = a.page.Guid, b.Date = (new Date).getTime(), a.commentBody = b, grecaptcha.execute(a.captcha.widgetID)) : a.comment.showFirstTime = !1)
			},
			sendComment: function(b) {
				a.commentBody.captcha = b, amplify.request({
					resourceId: "saveComment",
					data: a.commentBody,
					success: function(b) {
						b.IsSuccess ? (a.comment.clear(), a.base.broadCast("contactFormMessage"), pb.utils.showMessageAfterSubmit($(".message"))) : pb.utils.showMessageAfterSubmit($(".error")), a.comment.toggleForm(), grecaptcha.reset(a.captcha.widgetID)
					},
					error: function() {
						a.comment.toggleForm(), pb.utils.showMessageAfterSubmit($(".error")), grecaptcha.reset(a.captcha.widgetID)
					}
				})
			},
			toggleForm: function() {
				var a = $("form");
				a.hasClass("disabled") ? a.removeClass("disabled") : a.addClass("disabled")
			},
			clear: function() {
				var a = c.find("form");
				a.find("input[type='text'],input[type='number'],input[type='email'],textarea").each(function() {
					$(this).val("")
				})
			}
		};
		var g = {
			getTransparentColor: function(a) {
				return pb.utils.getTransparentColor(a)
			}
		}
	}];
	return {
		restrict: "A",
		controller: c
	}
}], pbAng.dirs.misc.blogRowsAndVertical = [function() {
	var a = '<div class="blogList noInfScroll clearfix" blog-helper  ng-init="blog.checkPage(); fixBlogPostImages(base.vcolumns)" pb-style="blog.getBorderStyle()" blog-rows-and-vertical><article class="post" ng-repeat="post in page.BlogPosts | filter: {Tags: base.queryString.tag} | limitTo: blog.limit1()| limitTo: blog.limit2() | orderBy:\'-PostDate\' track by post.Guid"><div ng-if="post.BlogGalleryItems[0].FileName" class="imageBox"><img  gallery-thumb pb-nice-load class="image" data-filename="{{::post.BlogGalleryItems[0].FileName}}" ng-src="{{::post.BlogGalleryItems[0].src}}" item="::post.BlogGalleryItems[0]" size="w1000" alt="{{::base.getImgAltOrPageTitle(post.BlogGalleryItems[0].ListText)}}" title="{{::base.getImgAltOrPageTitle(post.BlogGalleryItems[0].ListText)}}" data-height="{{::post.BlogGalleryItems[0].Height}}" data-width="{{::post.BlogGalleryItems[0].Width}}" /><a href="{{blog.getPostLink(post)}}"></a></div><div ng-if="post.BlogGalleryItems[0].VideoThumbUrl" class="imageBox"><img ng-src="{{::post.BlogGalleryItems[0].VideoThumbUrl}}" class="image" data-height="{{post.BlogGalleryItems[0].Height}}" data-width="{{post.BlogGalleryItems[0].Width}}"/><a href="{{blog.getPostLink(post)}}"></a></div><img ng-if="!post.BlogGalleryItems[0].FileName && !post.BlogGalleryItems[0].VideoThumbUrl" class="noImg" data-height="400" data-width="400"/><div class="infoBox" pb-style="base.getBoxColorWithOpacity()"><div class="textBox"><a ng-href="{{blog.getPostLink(post)}}"><h3 pb-style="base.getH3Styles()" ng-bind-html="post.Title"></h3></a><div class="blogPDate" pb-style="base.getPSimpleStyle()">{{post.PostDate | limitTo:10}}</div><p class="contentSummary" pb-style="base.getPSimpleStyle()" ng-bind-html="post.ContentSummary | shortContentSummary: \'25\'"></p><ul class="blogFooter clearfix" pb-style="base.getLinkTextStyle()"><li class="seeMore"><a ng-href="{{blog.getPostLink(post)}}"><span pb-style="base.getLinkTextStyle()" class="icon icon-eye"></span></a></li><li class="postShare" ng-if="socialMediaSite.doGoogleCDNBlock != true && site.SocialShowShareButtons != undefined && site.SocialShowShareButtons != null && site.SocialShowShareButtons != \'\'"><span pb-style="base.getLinkTextStyle()" class="icon icon-social-media" ng-click="blog.openShareDialog(post)"></span></li><li ng-if="post.AllowComments == 1" class="postDoComment"><a ng-href="{{blog.getPostLinkWithComment(post)}}"><span pb-style="base.getLinkTextStyle()" class="icon icon-communication"></span></a></li></ul></div></div></article></div><a class="prev" ng-if="blog.prevPageNr()" ng-href="{{blog.prevPage()}}"><span style="color:{{site.PFontColor}}" class="icon-navigate-left"></span><span style="display: none" class="navText" pb-style="base.getLinkTextStyle()">{{site.UserTranslatedText.Next}}</span></a><a class="next" ng-if="blog.nextPageNr()" ng-href="{{blog.nextPage()}}"><span style="display: none" class="navText" pb-style="base.getLinkTextStyle()">{{site.UserTranslatedText.Prev}}</span><span style="color:{{site.PFontColor}}" class="icon-navigate-right"></span></a>';
	return {
		restrict: "E",
		template: a
	}
}], pbAng.dirs.onePager = ["$window", "$route", "$filter", "$location", function(a, b, c, d) {
	var e = null,
		f = '<div><div ng-if="onepager.isAdmin == true" ng-repeat="sec in page.OnePagerSections |orderBy: \'Idx\' track by sec.Guid"><section pb-style="onePagerFront.getStyles(sec)" id="id_{{sec.Idx}}" data-height="{{sec.BgImageHeight}}" data-width="{{sec.BgImageWidth}}" data-type="{{sec.Type}}" data-fullheight="{{sec.FullHeight}}" data-containimage="{{sec.ContainBGImageInMobile}}"><div id="id_shortText_{{sec.Idx}}" class="mainContent" ng-class="sec.FullHeight == 1 && sec.Type == \'text\' ? \'deadCenter\' : \'\'"><div ng-include="onePagerFront.getSectionBlock(sec)"></div></div></section><div ng-if="onepager.isMobile == true && sec.ContainBGImageInMobile == 1 && sec.Type == \'text\'" id="id_longText_{{sec.Idx}}" class="mobileContentLongText" ng-class="sec.FullHeight ==1 && sec.Type == \'text\' ? \'deadCenter\' : \'\'"><div ng-include="onePagerFront.getSectionBlock(sec)"></div></div></div><section class="animated fadeIn" ng-if="onepager.isAdmin == false" ng-repeat="sec in page.OnePagerSections |orderBy: \'Idx\'  | limitTo:onepager.limit track by sec.Guid" pb-style="onePagerFront.getStyles(sec)" id="id_{{sec.Idx}}" data-height="{{sec.BgImageHeight}}" data-width="{{sec.BgImageWidth}}" data-type="{{sec.Type}}" data-fullheight="{{sec.FullHeight}}"><div class="mainContent" ng-class="sec.FullHeight == 1 && sec.Type == \'text\' ? \'deadCenter\' : \'\'"><div ng-include="::onePagerFront.getSectionBlock(sec)"></div></div></section></div>',
		g = ["$scope", "$element", function(a, f) {
			$(window).on("scroll");
			var g = !1,
				h = pb.utils.getImageThumbTypeForMobile(),
				i = void 0 != a.page.OnePagerSections ? a.page.OnePagerSections.length : 0;
			! function() {
				pb.environment.isMobile || pb.environment.width < pb.environment.minWidth || pb.environment.isTablet ? g = !0 : (g = !1, setTimeout(function() {
					var a = f.find("section");
					$(".type-onepager.parallax").length > 0 && a.each(function() {
						$(this).css("background-attachment", "fixed")
					})
				}, 1))
			}(), a.onepager = {
				isAdmin: isAdmin,
				limit: 1,
				isMobile: !1
			}, g && (a.onepager = {
				isAdmin: !0,
				isMobile: !0
			}, pb.utils.digest(a, !0)), 1 == a.site.IsFooterActive && 0 == a.onepager.isAdmin && pb.utils.setInterval(function() {
				return $(".footer").length > 0 ? !0 : void 0
			}, 10, 1e3, {
				scope: a
			}).done(function() {
				$(".footer").hide()
			}), 0 == allowinfscroll && (a.onepager.isAdmin = !0), pb.utils.onDestroy(a, function() {
				$(window).off("scroll")
			}, "OnePager Scroll"), a.onepager.collection = {
				getBoxBGColor: function() {
					return a.base.getBoxBGColor()
				},
				listImageSrc: function(b) {
					return b.ListThumb ? (a.thumbSize = pb.utils.fixSizeForSmallImage(a.thumbSize, b.ListThumb.Height, b.ListThumb.Width), b.ListThumb.VideoThumbUrl ? b.ListThumb.VideoThumbUrl : c("pboxImage")(b.ListThumb.FileName, b.ListThumb.S3LocationId, a.thumbSize)) : ""
				},
				hasImage: function(b) {
					return "" != a.onepager.collection.listImageSrc(b)
				},
				openPage: function(a) {
					d.path(a.Uri)
				},
				listImageWidth: function(a) {
					return a.ListThumb ? a.ListThumb.Width : ""
				},
				listImageHeight: function(a) {
					return a.ListThumb ? a.ListThumb.Height : ""
				}
			};
			var j = -1,
				k = function(b) {
					var c = $(window).height(),
						d = null,
						e = function(a) {
							setTimeout(function() {
								$(".type-onepager.parallax").length > 0 && a.css("background-attachment", "fixed")
							}, 10);
							var b = a.find(".mainContent").height(),
								d = c;
							b > c && (d = b + 20); {
								var e = a.data("fullheight");
								a.data("type")
							}
							1 == e && (a.css("min-height", d), a.css("padding", "0")), 0 == allowinfscroll && (a.css("min-height", "100px"), a.css("max-height", "800px"))
						}, g = function() {
							d = f.find("section"), d.each(function() {
								e($(this))
							})
						};
					void 0 != b && 0 == a.onepager.isAdmin ? b.Idx > j && (d = $("#id_" + b.Idx), d.length > 0 ? setTimeout(function() {
						e(d)
					}, 10) : g(), j = b.Idx) : g()
				};
			if (!g && 0 == a.onepager.isAdmin) {
				var l = 0,
					m = function() {
						1 == a.site.IsFooterActive && 0 == a.onepager.isAdmin && pb.utils.setInterval(function() {
							return $(".footer").length > 0 ? !0 : void 0
						}, 1, 1e3, {
							scope: a
						}).done(function() {
							$(".footer").fadeIn()
						})
					};
				setTimeout(function() {
					if (0 != i) {
						var b = $("main"),
							c = $(window).height();
						e = pb.utils.setInterval(function() {
							var d = b.height();
							c >= d && (a.onepager.limit + 1 > i ? ($(window).off("scroll"), m()) : d > l && (a.onepager.limit++, pb.utils.digest(a, !0)))
						}, 10, 2e3, {
							scope: a
						}), $(window).scroll(function() {
							var b, c, d, e = .95;
							1 == a.scrolltoleft ? (b = $(window).scrollLeft(), c = $(document).width(), d = $(window).width()) : (b = $(window).scrollTop(), c = $(document).height(), d = $(window).height()), b / (c - d) > e && (a.onepager.limit + 1 > i ? ($(window).off("scroll"), m()) : (a.onepager.limit++, pb.utils.digest(a, !0)))
						})
					}
				}, 100)
			}
			var n = $(window).width(),
				o = {}, p = $(window).width(),
				q = $(window).height(),
				r = function(a, b, c, d) {
					if (d = void 0 == d ? !1 : d, b.length > 0 && c.length > 0 && !o[a] && c.length > 0) {
						if (1 == d) {
							var e = $("nav.menu").outerHeight();
							e = e ? e : 0;
							var f = q - e + 10
						}
						var g = c.outerHeight();
						b.height(1 == d && f > g ? f : g), o[a] = !0, setTimeout(function() {
							$.each(c.find("img"), function() {
								$(this);
								$(this).one("load", function() {
									g = c.outerHeight(), b.height(1 == d && f > g ? f : g)
								})
							})
						}, 1)
					}
				}, s = function(a, b, c, d) {
					setTimeout(function() {
						var e = b.find(".textContent"),
							f = e.outerHeight(),
							g = b.data("height"),
							h = b.data("width"),
							i = 0,
							j = b.data("fullheight"),
							k = b.data("containimage");
						if (void 0 != c && b.css({
							"background-color": c
						}), g && h) if (void 0 != d && null != d && b.css({
							"background-image": "url(" + d + ")"
						}), 1 != k) b.find(".mainContent").addClass("deadCenter"), r(a, b, e, !0);
						else {
							var l = h / g;
							i = p / l, b.find(".mainContent").addClass("deadCenter"), r(a, b, e, !1), b.height(i);
							var m = $("#id_longText_" + a),
								n = $("#id_shortText_" + a);
							null != f && void 0 != f && f > i ? (m.show(), void 0 != c && m.css({
								"background-color": c
							}), n.css({
								visibility: "hidden"
							})) : (m.hide(), n.css({
								visibility: "visible"
							}))
						} else 1 == j ? r(a, b, e, !0) : r(a, b, e, !1)
					}, 1)
				}, t = function(a, b, c, d) {
					var e = $(window).width(),
						f = b.data("height"),
						g = b.data("width");
					void 0 != c && b.css({
						"background-color": c
					}), f && g && void 0 != d && null != d && b.css({
						"background-image": "url(" + d + ")"
					});
					var h = b.find(".thumbs01");
					if (h.length > 0) setTimeout(function() {
						h.removeClass("deadCenter"), b.css({
							height: h.outerHeight()
						})
					}, 100);
					else {
						var i = b.find(".slideshow01");
						i.length > 0 && i.find(".slideshowBox").addClass("deadCenter");
						var j = b.find(".slideshowfullscreen01");
						if (j.length > 0) {
							var k = j.find(".slideshowBox");
							k.height(e)
						}
						b.height(e)
					}
				}, u = function(a, b, c, d) {
					var e = b.data("height"),
						f = b.data("width");
					void 0 != c && b.css({
						"background-color": c
					}), e && f && void 0 != d && null != d && b.css({
						"background-image": "url(" + d + ")"
					});
					var g = b.find(".thumbsevenrows");
					g.length > 0 && setTimeout(function() {
						g.removeClass("deadCenter"), b.css({
							height: g.outerHeight()
						})
					}, 100)
				}, v = function() {
					setTimeout(function() {
						for (var a = 0; i > a; a++) {
							var b = $("#id_" + a),
								c = b.find(".textContent");
							c.length > 0 ? s(a, b) : t(a, b)
						}
					}, 10)
				}, w = function() {
					if (g) {
						o = {};
						var a = $(window).width();
						n != a && (n = a, p = $(window).width(), q = $(window).height(), v(), $(".slideshowfullscreen01").length > 0 && b.reload())
					} else k()
				};
			pb.utils.resizeAndDestroy(a, "onepager", function() {
				w()
			}), a.$on("updateOnepager", function() {
				setTimeout(function() {
					w()
				}, 100)
			}), a.base.broadCast("updateOnepager"), a.onePagerFront = {
				getStyles: function(a) {
					var b = {};
					return g || (a.BgFilePath && (b["background-image"] = "url(" + a.BgFilePath + ")"), b["background-color"] = a.BgColor, k(a)), b
				},
				getSectionBlock: function(b) {
					return g && setTimeout(function() {
						var c = $("#id_" + b.Idx),
							d = null;
						if (void 0 != h && 1 == b.SectionBGThumb) {
							if (b.BgImage) {
								var e = pb.constants.getS3PathById(b.BgImageS3LocationId);
								d = e + "/" + a.site.Id + "/file/" + h + "-" + b.BgImage
							}
						} else b.BgFilePath && (d = b.BgFilePath);
						"text" == b.Type ? s(b.Idx, c, b.BgColor, d) : "gallery" == b.Type ? t(b.Idx, c, b.BgColor, d) : "collection" == b.Type && u(b.Idx, c, b.BgColor, d)
					}, 100), "application/views/app/dirs/onepager/" + b.Type + "/" + b.ViewFile + ".html"
				}
			}
		}];
	return {
		restrict: "E",
		controller: g,
		replace: !0,
		template: f
	}
}], pbAng.dirs.pbOnePagerAdvanced = ["$window", "$route", "$filter", "$location", function() {
	var a = function(a, b, c) {
		var d = {};
		if (1 != a.FullHeight && a.Padding ? (d["padding-top"] = a.Padding, d["padding-bottom"] = a.Padding) : (d["padding-top"] = null, d["padding-bottom"] = null), c) {
			var e = $("#mainContent_" + a.Guid);
			e.length > 0 && e.css(d)
		}
		return d
	}, b = ["$scope", "$element", function(b) {
		var c = $(window).height(),
			d = pb.utils.isMobile() || pb.utils.isTablet();
		b.pbOnePagerAdvanced = {
			isAdmin: isAdmin,
			getStyle: function(b) {
				return a(b, c)
			},
			getViewFile: function(a) {
				return a.Type && a.ViewFile ? "application/views/app/_front/views/pages/onepageradvanced/" + a.Type + "/" + a.ViewFile + ".html" : ""
			},
			isParallax: !1,
			getSectionWidth: function(a) {
				var b = {};
				return a.Width && !d && (b.width = a.Width), b
			}
		}, b.$on("sectionScrollToPosition", function(a, b) {
			if (b && b.Id) {
				var c = $("#section_" + b.Id);
				c.length > 0 && $("body,html").animate({
					scrollTop: c.position().top
				}, 500)
			}
		})
	}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		templateUrl: "application/views/app/dirs/onepageradvanced/onepageradvanced.html",
		link: function(a, b, c) {
			a.pbOnePagerAdvanced.isParallax = void 0 != c.onepagerType && "parallax" == c.onepagerType ? !0 : !1
		}
	}
}], pbAng.dirs.blog = [function() {
	var a = '<div class="blogList"><article class="post" ng-repeat="post in page.BlogPosts | filter: {Tags: base.queryString.tag} |orderBy:\'-PostDate\' track by post.Guid">NaN<div bind-unsafe-html="post.Content" block-content></div><ul class="postDetails"><li pb-style="base.getTextStyle()">{{post.PostDate | date:\'yyyy-MM-dd\'}}</li><li pb-style="base.getLinkTextStyle()"><span ng-click="vitestar = !vitestar">comment</span></li><li pb-style="base.getLinkTextStyle()">Share</li><li class="tagTitle" ng-show="post.Tags.length > 0" pb-style="base.getTextStyle()"># <ul class="postTags" >NaN</ul></li></ul></article></div>',
		b = ["$scope", "$element", function(a) {
			a.blog = {}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		transclude: !0,
		templateUrl: a
	}
}], pbAng.dirs.flickrGallery = [function() {
	var a = '<div id="flickrContainer" class="flicker clearfix" class="{{flickrGallery.class}}"><figure ng-repeat="item in flickrGallery.flickrGallertyItems"><div class="imageBox"><img ng-src="{{::item.tsrc}}" data-height="{{::item.height}}" data-width="{{::item.width}}" alt="{{::item.title}}" title="{{::item.title}}" class="image animated fadeIn" ng-click="flickrGallery.openItem($index)"/></div></figure></div>',
		b = ["$scope", "$element", function(a) {
			a.flickrGallery = {
				flickrGallertyItems: [],
				pages: void 0,
				oldPageNum: 0,
				openItem: function(a) {
					var b = {
						Src: "src",
						Title: "title"
					};
					lightboxH.openInPopup(a, this.flickrGallertyItems, b)
				}
			};
			var b = !1,
				d = a.$on("flickrSetting", function(d, e) {
					if (void 0 != e) {
						if (e > a.flickrGallery.oldPageNum && (a.flickrGallery.oldPageNum = e, $(window).scroll(function() {
							var b = $(window).scrollTop(),
								d = $(document).height(),
								e = $(window).height(),
								f = .95;
							b / (d - e) > f && ($(window).off("scroll"), c(a, a.flickrGallery.oldPageNum, pb.constants.minImgDisplay))
						})), !b) {
							var f = $(".flicker"),
								g = $(window).height(),
								h = f.height();
							g > h ? (h = f.height(), g > h && c(a, a.flickrGallery.oldPageNum, pb.constants.minImgDisplay)) : b = !0
						}
					} else $(window).off("scroll"), a.flickrGallery.oldPageNum = 1, c(a, a.flickrGallery.oldPageNum, pb.constants.minImgDisplay)
				});
			void 0 != a.page.FlickrSetting && ($(window).off("scroll"), a.flickrGallery.oldPageNum = 1, c(a, a.flickrGallery.oldPageNum, pb.constants.minImgDisplay)), a.$on("$destroy", function() {
				try {
					d()
				} catch (a) {}
			})
		}],
		c = function(a, b, c) {
			return void 0 != a.flickrGallery.pages && a.flickrGallery.oldPageNum == a.flickrGallery.pages ? void $(window).off("scroll") : void(void 0 != a.page.FlickrSetting && amplify.request({
				resourceId: "getimagesbyflickrid",
				data: {
					flickrId: a.page.FlickrSetting.FlickrId,
					pageNum: b,
					perPage: c
				},
				success: function(c) {
					void 0 == a.flickrGallery.pages && (a.flickrGallery.pages = c.pages);
					for (var d = 0; d < c.photos.length; d++) a.flickrGallery.flickrGallertyItems.push(c.photos[d]);
					"false" == c && (a.flickrGallery.flickrGallertyItems = "", $(window).off("scroll")), a.$digest(), a.base.broadCast("imageSizeChange"), a.base.broadCast("imageMarginChange"), setTimeout(function() {
						a.base.broadCast("flickrImageLoaded")
					}, 10), setTimeout(function() {
						a.base.broadCast("flickrImageLoaded")
					}, 20), a.flickrGallery.oldPageNum < a.flickrGallery.pages ? a.base.broadCast("flickrSetting", b + 1) : $(window).off("scroll")
				},
				error: function() {
					console.log("Error found in flickr-gallery")
				}
			}))
		};
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.guestbook = ["$location", function() {
	var a = '<div class="guestbook guestbook{{page.Guid}}"><form class="form" name="guestbookForm" novalidate><label><span class="label" pb-style="base.getH3Styles()">{{site.UserTranslatedText.YourName}}*</span><span><input class="guestBookGuestName" ng-class="{\'ng-invalid ng-dirty\': (guestbookDir.nameMissing && !guestbookForm.guestbookName.$valid) }" name="guestbookName" type="text" ng-model="guestbookProp.YourName" placeholder="{{site.UserTranslatedText.YourName}}" required/> </span></label><label><span class="label"  pb-style="base.getH3Styles()">{{site.UserTranslatedText.Message}}*</span><span><textarea class="guestBookGuestMessage" ng-class="{\'ng-invalid ng-dirty\': (guestbookDir.messageMissing  && !guestbookForm.guestbookMessage.$valid)}" ng-model="guestbookProp.Message"rows="5" name="guestbookMessage" placeholder="{{site.UserTranslatedText.Message}}" required></textarea></span></label><label class="send" ><styled-button ng-click="guestbookDir.validate(guestbookForm)">{{site.UserTranslatedText.Send}}</styled-button></label><div data-callback="testCaptcha" class="g-recaptcha" id="captchaBlock" data-size="invisible"></div><div class="message" pb-style="base.getBorderColor()"><span pb-style="base.getH3Styles()">{{site.UserTranslatedText.ThankYou}}</span></div><div class="error" pb-style="base.getBorderColor()"><span pb-style="base.getH3Styles()">{{site.UserTranslatedText.AnErrorHasOccurred}}</span></div></form><div class="gb_div textContent" pb-style="base.getBoxBGColor()" ng-repeat="message in guestbookMessages.messages"><h3 class="gb_name" pb-style="base.getH3Styles()" ng-bind-html="message.PersonName"></h3><p class="gb_content textContent" pb-style="base.getPStyle()" ng-bind-html="message.Content"></p></div></div>',
		b = ["$scope", "$element", function(a, b) {
			a.captcha = {
				widgetID: "",
				recaptchaRendered: !1,
				renderCaptcha: function() {
					a.captcha.widgetID = grecaptcha.render(document.getElementById("captchaBlock"), {
						sitekey: pb.constants.invisibleReCaptchaSitekey
					})
				},
				testCaptcha: function(b) {
					a.guestbookDir.send(b)
				}
			}, window.testCaptcha = a.captcha.testCaptcha, a.guestbookMessages = [], a.guestbookMessages = {
				messages: []
			};
			var c = function() {
				amplify.request({
					resourceId: "getGuestbookMessage",
					data: {
						pageGuid: a.page.Guid
					},
					success: function(b) {
						a.guestbookMessages.messages = b, a.$digest()
					},
					error: function() {
						console.log("No messages found in GuestBook")
					}
				})
			};
			c(), a.guestbookProp = {
				Message: "",
				YourName: "",
				PageGuid: a.page.Guid
			}, a.guestbookDir = {
				nameMissing: !1,
				messageMissing: !1,
				toggleForm: function() {
					var a = $(".form");
					a.hasClass("disabled") ? a.removeClass("disabled") : a.addClass("disabled")
				},
				clear: function() {
					this.nameMissing = !1, this.messageMissing = !1, a.guestbookProp = {
						Message: "",
						YourName: "",
						PageGuid: a.page.Guid
					}, a.base.popup.params = {}, b.find(".guestBookGuestName").val(""), b.find(".guestBookGuestMessage").val("")
				},
				validate: function(b) {
					a.captcha.recaptchaRendered || (a.captcha.renderCaptcha(), a.captcha.recaptchaRendered = !0), "" == a.guestbookProp.YourName && (this.nameMissing = !0), "" == a.guestbookProp.Message && (this.messageMissing = !0), b.$valid && a.guestbookProp.Message && a.guestbookProp.YourName && (a.guestbookDir.toggleForm(), grecaptcha.execute(a.captcha.widgetID))
				},
				send: function(b) {
					amplify.request({
						resourceId: "saveGuestbookMessage",
						data: {
							formatted: !0,
							message: a.guestbookProp.Message,
							name: a.guestbookProp.YourName,
							pageGuid: a.page.Guid,
							captcha: b
						},
						success: function(b) {
							b.IsSuccess ? (a.guestbookDir.clear(), a.base.broadCast("contactFormMessage"), pb.utils.showMessageAfterSubmit($(".message"))) : pb.utils.showMessageAfterSubmit($(".error")), a.guestbookDir.toggleForm(), grecaptcha.reset(a.captcha.widgetID)
						},
						error: function() {
							a.guestbookDir.toggleForm(), pb.utils.showMessageAfterSubmit($(".error")), grecaptcha.reset(a.captcha.widgetID)
						}
					})
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.formBuilder = ["$route", function(a) {
	var b = ["$scope", "$element", function(b, c) {
		b.captcha = {
			widgetID: "",
			recaptchaRendered: !1,
			renderCaptcha: function() {
				b.captcha.widgetID = grecaptcha.render(document.getElementById("captchaBlock"), {
					sitekey: pb.constants.invisibleReCaptchaSitekey
				})
			},
			testCaptcha: function(a) {
				b.formBuilder.send(a)
			}
		}, window.testCaptcha = b.captcha.testCaptcha;
		var d = b.$on("formbuilderInputUpdate", function() {
			window.dontCloseCPanel = !0, a.reload()
		}),
			e = {}, f = [],
			g = 0,
			h = function(a, b, c) {
				c = void 0 == c ? !1 : c, g++, e[g] = {
					isCheckBox: c,
					label: a,
					value: b
				}
			};
		b.formBuilder = {
			getRequiredMark: function(a) {
				return a ? "*" : void 0
			},
			toggleForm: function() {
				var a = $(".form");
				a.hasClass("disabled") ? a.removeClass("disabled") : a.addClass("disabled")
			},
			validate: function(a) {
				if (b.captcha.recaptchaRendered || (b.captcha.renderCaptcha(), b.captcha.recaptchaRendered = !0), a.$valid) {
					var d = c.find(".submitForm").closest(".form");
					d.find(":input").prop("disabled", !0), d.find("input[type='text'],input[type='number'],input[type='email'],textarea").each(function() {
						var a = $(this).val(),
							b = $(this).data("label");
						"" != a && ("email" == $(this).prop("type") && pb.utils.isEmailAddress(a) && f.push(a), h(b, a, !1))
					}), d.find("select").each(function() {
						var a = $(this).data("label"),
							b = "";
						$(this).find("option").each(function() {
							return $(this).is(":selected") ? (b = $(this).data("label"), !1) : void 0
						}), h(a, b, !1)
					});
					var e = {};
					d.find("input[type='checkbox']").each(function() {
						var a = $(this).data("label");
						if ($(this).is(":checked")) {
							var b = $(this).val();
							"" != b && (void 0 == e[a] && (e[a] = {
								data: []
							}), e[a].data.push(b))
						}
					});
					for (var g in e) h(g, e[g].data, !0);
					d.find("input[type='radio']:checked").each(function() {
						var a = $(this).attr("title"),
							b = $(this).data("label");
						"" != a && h(b, a, !1)
					}), b.formBuilder.toggleForm(), grecaptcha.execute(b.captcha.widgetID)
				} else b.base.broadCast("invalidContactForm")
			},
			send: function(a) {
				amplify.request({
					resourceId: "postNewBlockMessage",
					data: {
						formatted: !0,
						message: JSON.stringify({
							message: e,
							emails: f
						}),
						pageGuid: b.page.Guid,
						captcha: a
					},
					success: function(a) {
						a.IsSuccess ? (b.formBuilder.clear(), b.base.broadCast("contactFormMessage"), pb.utils.showMessageAfterSubmit($(".message"))) : pb.utils.showMessageAfterSubmit($(".error")), b.formBuilder.toggleForm(), grecaptcha.reset(b.captcha.widgetID)
					},
					error: function() {
						b.formBuilder.toggleForm(), pb.utils.showMessageAfterSubmit($(".error")), grecaptcha.reset(b.captcha.widgetID)
					}
				})
			},
			clear: function() {
				e = {}, f = [];
				var a = c.find(".submitForm").closest(".form");
				a.find("input[type='text'],input[type='number'],input[type='email'],textarea").each(function() {
					$(this).val("")
				}), a.find("input[type='checkbox']").each(function() {
					$(this).is(":checked") && $(this).attr("checked", !1)
				}), a.find("input[type='radio']:checked").each(function() {
					$(this).attr("checked", !1)
				}), a.find("select").each(function() {
					$(this).data("label");
					$(this).find("option").each(function() {
						return $(this).is(":selected") ? ($(this).attr("selected", !1), !1) : void 0
					})
				}), a.find(":input").prop("disabled", !1)
			}
		}, b.$on("$destroy", function() {
			try {
				d()
			} catch (a) {}
		})
	}],
		c = '<div class="formBuilder formStyle{{formstyle}} formBuilder-{{page.Guid}}"><form class="form" name="contactForm" novalidate><div ng-repeat="input in page.CustomForm track by input.Guid" class="inputContainer guid-{{input.Guid}}"><span class="label guid-{{input.Guid}}" pb-style="base.getPSimpleStyle()">{{input.label}}{{formBuilder.getRequiredMark(input.isRequired)}}</span><form-input input="input" contactForm="contactForm"></form-input></div><div class="send send-{{page.Guid}}" ng-if="page.CustomForm && page.CustomForm.length > 0"><styled-button ng-click="formBuilder.validate(contactForm)" class="submitForm submitForm-{{page.Guid}}">{{site.UserTranslatedText.Send}}</styled-button></div><div data-callback="testCaptcha" class="g-recaptcha" id="captchaBlock" data-size="invisible"></div><div class="message" pb-style="base.getBorderColor()"><span pb-style="base.getH3Styles()">{{site.UserTranslatedText.ThankYou}}</span></div><div class="error" pb-style="base.getBorderColor()"><span pb-style="base.getH3Styles()">{{site.UserTranslatedText.AnErrorHasOccurred}}</span></div></form></div>';
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: c,
		link: function(a, b, c) {
			c.formstyle && "2" == c.formstyle && (a.formstyle = c.formstyle, setTimeout(function() {
				var c = b.find(".pbInput");
				c.each(function() {
					$(this).css("border-color", a.site.PFontColor), $(this).css("color", a.site.PFontColor), $(this).closest(".inputContainer").find("span.label").addClass("forPbInput")
				}), c.focus(function() {
					$(this).closest(".inputContainer").find("span.label").fadeOut(100), $(this).hasClass("textarea") && $(this).animate({
						height: 100
					}, 200)
				}), c.focusout(function() {
					0 == $(this).val().length && ($(this).closest(".inputContainer").find("span.label").fadeIn(100), $(this).hasClass("textarea") && $(this).animate({
						height: 20
					}, 200))
				})
			}, 10))
		}
	}
}], pbAng.dirs.formBuilderSection = [function() {
	var a = ["$scope", "$element", function(a, b) {
		a.captcha = {
			html: '<div data-callback="testCaptcha" class="g-recaptcha" id="captchaBlock" data-size="invisible"></div>',
			widgetID: "",
			recaptchaRendered: !1,
			renderCaptcha: function() {
				b.find(".form").append(this.html), a.captcha.widgetID = grecaptcha.render(b.find("#captchaBlock")[0], {
					sitekey: pb.constants.invisibleReCaptchaSitekey
				})
			},
			testCaptcha: function(b) {
				a.formBuilderSection.send(b)
			}
		}, window.testCaptcha = a.captcha.testCaptcha;
		var c = {}, d = [],
			e = 0,
			f = function(a, b, d) {
				d = void 0 == d ? !1 : d, e++, c[e] = {
					isCheckBox: d,
					label: a,
					value: b
				}
			};
		a.formBuilderSection = {
			isViewLoaded: !0,
			getRequiredMark: function(a) {
				return a ? "*" : void 0
			},
			toggleForm: function() {
				var a = $(".form");
				a.hasClass("disabled") ? a.removeClass("disabled") : a.addClass("disabled")
			},
			validate: function(c) {
				if (a.captcha.recaptchaRendered || (a.captcha.renderCaptcha(), a.captcha.recaptchaRendered = !0), c.$valid) {
					var e = b.find(".submitForm").closest(".form");
					e.find("input[type='text'],input[type='number'],input[type='email'],textarea").each(function() {
						var a = $(this).val(),
							b = $(this).data("label");
						"" != a && ("email" == $(this).prop("type") && pb.utils.isEmailAddress(a) && d.push(a), f(b, a, !1))
					}), e.find("select").each(function() {
						var a = $(this).data("label"),
							b = "";
						$(this).find("option").each(function() {
							return $(this).is(":selected") ? (b = $(this).data("label"), !1) : void 0
						}), f(a, b, !1)
					});
					var g = {};
					e.find("input[type='checkbox']").each(function() {
						var a = $(this).data("label");
						if ($(this).is(":checked")) {
							var b = $(this).val();
							"" != b && (void 0 == g[a] && (g[a] = {
								data: []
							}), g[a].data.push(b))
						}
					});
					for (var h in g) f(h, g[h].data, !0);
					e.find("input[type='radio']:checked").each(function() {
						var a = $(this).attr("title"),
							b = $(this).data("label");
						"" != a && f(b, a, !1)
					}), a.formBuilderSection.toggleForm(), grecaptcha.execute(a.captcha.widgetID)
				} else a.base.broadCast("invalidContactForm")
			},
			send: function(b) {
				amplify.request({
					resourceId: "postNewBlockMessage",
					data: {
						formatted: !0,
						message: JSON.stringify({
							message: c,
							emails: d
						}),
						pageGuid: a.page.Guid,
						captcha: b
					},
					success: function(b) {
						b.IsSuccess ? (a.formBuilderSection.clear(), a.base.broadCast("contactFormMessage"), pb.utils.showMessageAfterSubmit($(".message"))) : pb.utils.showMessageAfterSubmit($(".error")), a.formBuilderSection.toggleForm(), grecaptcha.reset(a.captcha.widgetID)
					},
					error: function() {
						a.formBuilderSection.toggleForm(), pb.utils.showMessageAfterSubmit($(".error")), grecaptcha.reset(a.captcha.widgetID)
					}
				})
			},
			clear: function() {
				c = {}, d = [];
				var a = b.find(".submitForm").closest(".form");
				a.find("input[type='text'],input[type='number'],input[type='email'],textarea").each(function() {
					$(this).val("")
				}), a.find("input[type='checkbox']").each(function() {
					$(this).is(":checked") && $(this).attr("checked", !1)
				}), a.find("input[type='radio']:checked").each(function() {
					$(this).attr("checked", !1)
				}), a.find("select").each(function() {
					$(this).data("label");
					$(this).find("option").each(function() {
						return $(this).is(":selected") ? ($(this).attr("selected", !1), !1) : void 0
					})
				})
			}
		}, pb.utils.onCreateEvents(a, ["formbuilderInputUpdate"], function(b) {
			"formbuilderInputUpdate" == b && (a.formBuilderSection.isViewLoaded = !1, setTimeout(function() {
				a.formBuilderSection.isViewLoaded = !0, pb.utils.digest(a)
			}, 10))
		}, "Section Form builder")
	}];
	return {
		restrict: "E",
		controller: a,
		replace: !0,
		templateUrl: "application/views/app/dirs/formbuilder-section/formbuilder-section.html"
	}
}], pbAng.dirs.map = [function() {
	var a = function(a, b) {
		var c = "onepager" == a.page.DsnTemplateType && a.section ? !0 : !1;
		if (a.pageOrSection = c ? a.section : a.page, a.pageOrSection.Map && a.pageOrSection.Map.Longitue) {
			var d = a.pageOrSection.Map.Longitue,
				e = a.pageOrSection.Map.Latitude,
				f = [{
					elementType: "geometry",
					stylers: [{
						color: "#f5f5f5"
					}]
				}, {
					elementType: "labels.icon",
					stylers: [{
						visibility: "off"
					}]
				}, {
					elementType: "labels.text.fill",
					stylers: [{
						color: "#616161"
					}]
				}, {
					elementType: "labels.text.stroke",
					stylers: [{
						color: "#f5f5f5"
					}]
				}, {
					featureType: "administrative",
					elementType: "geometry",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "administrative.land_parcel",
					elementType: "labels",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "administrative.land_parcel",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#bdbdbd"
					}]
				}, {
					featureType: "poi",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "poi",
					elementType: "geometry",
					stylers: [{
						color: "#eeeeee"
					}]
				}, {
					featureType: "poi",
					elementType: "labels.text",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "poi",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#757575"
					}]
				}, {
					featureType: "poi.park",
					elementType: "geometry",
					stylers: [{
						color: "#e5e5e5"
					}]
				}, {
					featureType: "poi.park",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#9e9e9e"
					}]
				}, {
					featureType: "road",
					elementType: "geometry",
					stylers: [{
						color: "#ffffff"
					}]
				}, {
					featureType: "road",
					elementType: "labels.icon",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "road.arterial",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#757575"
					}]
				}, {
					featureType: "road.highway",
					elementType: "geometry",
					stylers: [{
						color: "#dadada"
					}]
				}, {
					featureType: "road.highway",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#616161"
					}]
				}, {
					featureType: "road.local",
					elementType: "labels",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "road.local",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#9e9e9e"
					}]
				}, {
					featureType: "transit",
					stylers: [{
						visibility: "off"
					}]
				}, {
					featureType: "transit.line",
					elementType: "geometry",
					stylers: [{
						color: "#e5e5e5"
					}]
				}, {
					featureType: "transit.station",
					elementType: "geometry",
					stylers: [{
						color: "#eeeeee"
					}]
				}, {
					featureType: "water",
					elementType: "geometry",
					stylers: [{
						color: "#c9c9c9"
					}]
				}, {
					featureType: "water",
					elementType: "labels.text.fill",
					stylers: [{
						color: "#9e9e9e"
					}]
				}],
				g = google.maps.ControlPosition.TOP_CENTER;
			109 == a.pageOrSection.DznTemplateGuid && "bottom" !== a.site.DsnLayoutType && (g = google.maps.ControlPosition.BOTTOM_CENTER), b.find(".pageMap").gmap({
				zoom: 14,
				panControl: !1,
				styles: f,
				zoomControl: !1,
				mapTypeControl: !0,
				mapTypeControlOptions: {
					position: g
				},
				gestureHandling: "cooperative",
				center: e + "," + d,
				callback: function() {
					this.addMarker({
						position: e + "," + d
					}, function() {})
				}
			})
		} else b.css("display", "none")
	}, b = '<div class="mapBox"><div class="pageMap"></div></div>',
		c = ["$scope", function() {}];
	return {
		restrict: "E",
		controller: c,
		replace: !0,
		link: function(b, c) {
			setTimeout(function() {
				if (window.google) a(b, c);
				else if (1 == window.loadingGoogleMapsIsStartedElsewhere) var d = setInterval(function() {
					0 == window.loadingGoogleMapsIsStartedElsewhere && (clearInterval(d), a(b, c))
				}, 10);
				else window.loadingGoogleMapsIsStartedElsewhere = 1, $.getScript(pb.constants.googleMapsApiKey, function() {
					$.getScript("https://d28avw9ny3vgf2.cloudfront.net/application/third_party/js/jquery-ui-map/ui/min/jquery.ui.map.min.js", function() {
						window.loadingGoogleMapsIsStartedElsewhere = 0, a(b, c)
					})
				})
			}, 1)
		},
		template: b
	}
}], pbAng.dirs.instagramGallery = ["$location", function() {
	var a = ["$scope", "$element", function(a) {
		a.instagramGallery = {
			items: [],
			openItem: function(a) {
				var b = {
					Src: "src",
					Title: "caption",
					Type: "type",
					VideoSrc: "videoUrl"
				};
				lightboxH.openInPopup(a, this.items, b)
			},
			showGallery: !0
		};
		var b = function() {
			if (null != a.instagramGallery.maxId) {
				var b = $(window).scrollTop(),
					c = $(document).height(),
					d = $(window).height(),
					f = .95;
				b / (c - d) > f && ($(window).unbind("scroll"), e(a.instagramGallery.maxId))
			}
		};
		$(window).scroll(b);
		var c = !1,
			d = !1,
			e = function(f) {
				d || (d = !0, amplify.request({
					resourceId: "getinstagramdata",
					data: {
						maxId: f,
						pageguid: a.page.Guid,
						siteid: a.site.Id
					},
					success: function(f) {
						if (d = !1, f.data) {
							for (var g = 0; g < f.data.length; g++) {
								var h = {
									caption: null != f.data[g].caption && void 0 != f.data[g].caption.text ? f.data[g].caption.text : "",
									images: {
										lowResolution: void 0 != f.data[g].images.low_resolution ? f.data[g].images.low_resolution : null,
										standardResolution: void 0 != f.data[g].images.standard_resolution ? f.data[g].images.standard_resolution : null,
										thumbnail: void 0 != f.data[g].images.thumbnail ? f.data[g].images.thumbnail : null
									},
									video: "video" == f.data[g].type ? f.data[g].videos.standard_resolution : null,
									videoUrl: "video" == f.data[g].type ? f.data[g].videos.standard_resolution.url : null,
									carousel_media: "carousel" == f.data[g].type ? f.data[g].carousel_media : null,
									type: f.data[g].type,
									tags: f.data[g].tags,
									tag: ""
								};
								h.src = null != h.images.standardResolution ? h.images.standardResolution.url : null != h.images.lowResolution ? h.images.lowResolution.url : h.images.thumbnail.url;
								for (var i = 0; i < h.tags.length; i++) if (h.tags[i] == f.tagName) {
									h.tag = f.tagName;
									break
								}
								void 0 == f.tagName || null == f.tagName || "" == f.tagName ? a.instagramGallery.items.push(h) : "" != h.tag && a.instagramGallery.items.push(h)
							}
							if (a.instagramGallery.maxId = f.pagination.next_max_id, pb.utils.digest(a, !0), a.base.broadCast("imageSizeChange"), a.base.broadCast("imageMarginChange"), setTimeout(function() {
								a.base.broadCast("instagramImageLoaded")
							}, 10), !c) {
								$(window).unbind("scroll");
								var j = $(".instagram"),
									k = $(window).height(),
									l = j.height();
								k > l ? (l = j.height(), k > l && null != a.instagramGallery.maxId && e(a.instagramGallery.maxId)) : c = !0
							}
							c && $(window).bind("scroll", b), void 0 == a.instagramGallery.maxId && $(window).unbind("scroll")
						}
						pb.utils.digest(a, !0)
					},
					error: function() {
						console.log("Error on Data load"), d = !1
					}
				}))
			};
		e(null); {
			var f = a.$on("changeInstagramImagesByTagName", function() {
				$(window).scroll(b), c = !1, a.instagramGallery.items = [], pb.utils.digest(a, !0), e(null)
			}),
				g = a.$on("removeAllImageToDeactivateInstagram", function() {
					a.instagramGallery.items = [], a.instagramGallery.showGallery = !1, pb.utils.digest(a, !0)
				});
			a.$on("showImagesForLoginToInstagram", function() {
				a.instagramGallery.items = [], a.instagramGallery.showGallery = !0, setTimeout(function() {
					e(null)
				}, 100)
			})
		}
		a.instagramGallery.getUrl = function(b) {
			return 1 == a.page.ListImageSize || 2 == a.page.ListImageSize ? b.thumbnail.url : 0 == a.page.ListImageSize || 3 == a.page.ListImageSize ? b.lowResolution.url : b.standardResolution.url
		}, a.$on("$destroy", function() {
			try {
				f(), g()
			} catch (a) {}
		})
	}];
	return {
		restrict: "E",
		controller: a,
		replace: !0,
		template: '<div id="instagramContainer" class="instagram clearfix" ng-if="instagramGallery.showGallery"><figure ng-repeat="item in instagramGallery.items"><div class="imageBox" ><img ng-if="base.isAdmin==true" ng-src="{{instagramGallery.getUrl(item.images)}}" data-height="{{item.images.standardResolution.height}}" data-width="{{item.images.standardResolution.width}}" class="image animated fadeIn" ng-click="instagramGallery.openItem($index)"/><img ng-if="base.isAdmin==false" ng-src="{{::instagramGallery.getUrl(item.images)}}" data-height="{{item.images.standardResolution.height}}" data-width="{{item.images.standardResolution.width}}" class="image animated fadeIn" ng-click="instagramGallery.openItem($index)"/></div></figure></div>'
	}
}], pbAng.dirs.formInput = ["$compile", function() {
	var a = function(a) {
		return a && "" != a ? (a = a.toString(), a.replace(/\W/g, "").toLowerCase()) : ""
	}, b = function(b, c) {
		var d = "",
			e = "name" + b.Guid,
			f = b.options || [],
			g = b.isRequired ? "required" : "";
		if ("number" == b.type) d = '<input pb-style="base.getPSimpleStyle()" class="pbInput number input-number-{{$index}}-{{input.Guid}}" type="number" name="' + e + "\" ng-class=\"{'ng-invalid ng-dirty': (!formInput.isValid && input.isRequired && contactForm." + e + '.$invalid)}" ng-model="formInput.number" data-label="{{input.label}}" ' + g + ">";
		else if ("input-text" == b.type) d = '<input pb-style="base.getPSimpleStyle()" class="pbInput text input-text-{{$index}}-{{input.Guid}}" type="text" name="' + e + "\" ng-class=\"{'ng-invalid ng-dirty': (!formInput.isValid && input.isRequired && contactForm." + e + '.$invalid)}" ng-model="formInput.text" data-label="{{input.label}}" ' + g + ">";
		else if ("textarea" == b.type) d = '<textarea pb-style="base.getPSimpleStyle()" class="pbInput textarea input-textarea-{{$index}}-{{input.Guid}}" name="' + e + "\" ng-class=\"{'ng-invalid ng-dirty': (!formInput.isValid && input.isRequired && contactForm." + e + '.$invalid)}" ng-model="formInput.textarea" data-label="{{input.label}}" ' + g + "></textarea>";
		else if ("email" == b.type) d = '<input class="pbInput email input-email-{{$index}}-{{input.Guid}}" type="email" name="' + e + "\" ng-class=\"{'ng-invalid ng-dirty': (!formInput.isValid && input.isRequired && contactForm." + e + '.$invalid)}" ng-model="formInput.email" data-label="{{input.label}}" ' + g + ">";
		else if ("radio-buttons" == b.type) for (var h = 0; h < f.length; h++) {
			var i = f[h],
				j = a(i);
			d += '<span class="radio input-radio-span-{{$index}}-{{input.Guid}}" pb-style="base.getPStyle()" ng-class="{\'required-invalid\': (!formInput.isValid && input.isRequired && contactForm.' + e + '.$invalid)}"><input class="options input-radio-options-' + h + '-{{$index}}-{{input.Guid}}" type="radio" data-label="{{input.label}}" title="' + i + '" ng-model="formInput.radio" value="' + j + '" name="' + e + '" ' + g + ">" + i + "</span>"
		} else if ("checkboxes" == b.type) {
			c.formInputDir.addValueForCurrentCheckbox(c, {
				Required: b.isRequired,
				CheckedCounter: 0
			});
			for (var h = 0; h < f.length; h++) {
				var i = f[h],
					j = a(i);
				c.formInputDir.addValueForCurrentCheckbox(c, {
					label: j,
					name: e,
					oName: i,
					checked: !1,
					isChecked: !1,
					required: b.isRequired
				})
			}
			d += '<span class="checkbox input-checkbox-{{$index}}-{{input.Guid}}" ng-if="!$first" ng-class="{\'required-invalid\': (!formInput.isValid && item.required && input.isRequired)}" class="checkbox" pb-style="base.getPStyle()" ng-repeat="item in formInput.checkboxItems" ng-click="formInputDir.atLeastOneItemSelected(formInput.checkboxItems, $index)"><input class="options input-checkbox-options-' + h + '-{{$index}}-{{input.Guid}}" type="checkbox" ng-model="item.checked" ng-required="item.required" value="{{item.oName}}" data-label="{{input.label}}" name="{{item.oName}}"/>{{item.oName}}</span>'
		} else if ("select" == b.type) {
			d = '<select class="select input-select-{{$index}}-{{input.Guid}}" data-label="{{input.label}}" name="' + e + '" ' + g + ">";
			for (var h = 0; h < f.length; h++) {
				var i = f[h],
					j = a(i);
				d += '<option class="options input-select-options-' + h + '-{{$index}}-{{input.Guid}}" data-label="' + i + '" value="' + j + '">' + i + "</option>"
			}
			d += "</select>"
		}
		return d
	}, c = ["$scope", function(a) {
		a.formInput = {
			template: "",
			number: "",
			text: "",
			textarea: "",
			email: "",
			radio: "",
			isValid: !0,
			checkboxItems: []
		}, a.formInputDir = {
			addValueForCurrentCheckbox: function(a, b) {
				a.formInput.checkboxItems.push(b)
			},
			atLeastOneItemSelected: function(a, b) {
				var c = a[0];
				if (c.Required) {
					var d = a[b];
					0 == d.isChecked ? (d.isChecked = !0, d.checked = !0) : (d.isChecked = !1, d.checked = !1), 0 == d.isChecked ? c.CheckedCounter-- : c.CheckedCounter++;
					for (var e = 1; e < a.length; e++) a[e].required = c.CheckedCounter > 0 ? !1 : !0
				}
			}
		}, a.formInput.template = b(a.input, a, a.contactForm);
		var c = a.$on("invalidContactForm", function() {
			a.formInput.isValid = !1
		}),
			d = a.$on("contactFormMessage", function() {
				a.formInput = {
					template: "",
					number: "",
					text: "",
					textarea: "",
					email: "",
					radio: "",
					isValid: !0,
					checkboxItems: []
				}, a.formInput.template = b(a.input, a, a.contactForm)
			});
		a.$on("$destroy", function() {
			try {
				c(), d()
			} catch (a) {}
		})
	}];
	return {
		restrict: "E",
		controller: c,
		template: "<span bind-unsafe-html='formInput.template'></span>",
		replace: !0
	}
}], pbAng.dirs.captcha = [function() {
	var a = '<div class="captchaContent clearfix"><form name="captchaForm" novalidate><label class="textContetn"><span class="label" pb-style="base.getPStyle()">{{site.UserTranslatedText.EnterTheLetters}}</span><input ng-disabled="captchaDir.AlreadySend" ng-class="{\'ng-invalid ng-dirty\': (captchaDir.IsValidCaptchaValue && !captchaForm.captchaInput.$valid) }" type="text" name="captchaInput" ng-model="captchaDir.CaptchaValue" class="captchaImageInput" required/></label><span class="captchaBox"><img ng-src="{{captchaDir.CaptchaSrc}}" alt="" class="captchaImage"><span class="refreshCaptcha icon icon-updating" ng-style="{color: site.PFontColor}"></span></span><label class="send"><styled-button ng-click="captchaDir.Send(captchaForm)">{{site.UserTranslatedText.Send}}</styled-button></label></form></div>',
		b = function(a, b) {
			var c = b.find(".refreshCaptcha").siblings(".captchaImage");
			c.fadeOut(200, function() {
				var a = new Date;
				c.attr("src", "/api/public/captchaapi/getimage?" + a.getTime()), c.fadeIn(200)
			});
			var d = b.find(".captchaImageInput");
			d.val(""), d.focus(), void 0 != a.captchaDir && (a.captchaDir.CaptchaValue = "")
		}, c = ["$scope", "$element", function(a, c) {
			var d = new Date;
			a.captchaDir = {
				CaptchaSrc: "/api/public/captchaapi/getimage?" + d.getTime(),
				CaptchaValue: "",
				IsValidCaptchaValue: !1,
				AlreadySend: !1,
				Send: function(d) {
					if ("" == this.CaptchaValue && (this.IsValidCaptchaValue = !0), d.$valid) {
						var e = function(a, d) {
							a.base.popup.params.data.captchaValue = a.captchaDir.CaptchaValue, amplify.request({
								resourceId: a.base.popup.params.resourceId,
								data: a.base.popup.params.data,
								success: function(e) {
									e.IsSuccess ? (a.base.popup.callback(!0), b(a, c)) : (a.captchaDir.AlreadySend = !1, a.captchaDir.IsValidCaptchaValue = !0, d.captchaInput.$valid = !1, a.$digest())
								},
								error: function(b) {
									console.error(b), a.base.popup.callback(b)
								}
							})
						};
						this.AlreadySend || (this.AlreadySend = !0, e(a, d))
					}
				}
			}
		}];
	return {
		restrict: "A",
		controller: c,
		replace: !0,
		template: a,
		link: function(a, c) {
			var d = angular.element(document.getElementsByClassName("captchaContent")).parent().parent().parent(),
				e = "250px",
				f = "auto";
			(pb.environment.isMobile || pb.environment.width < pb.environment.minWidth) && (e = "150px", f = "150px"), d.css({
				width: e,
				height: f,
				"border-radius": "20px",
				"-webkit-box-shadow": "rgba(0, 0, 0, 0.4) 0px 5px 20px 0px",
				"-moz-box-shadow": "rgba(0, 0, 0, 0.4) 0px 5px 20px 0px",
				"box-shadow": "rgba(0, 0, 0, 0.4) 0px 5px 20px 0px",
				overflow: "hidden"
			});
			c.find(".captchaImageInput").focus();
			c.find(".refreshCaptcha").on("click", function() {
				b(a, c)
			})
		}
	}
}], pbAng.dirs.soundcloud = [function() {
	var a = '<div class="musicContainer clearfix"><div ng-show="soundcloud.playingTrackIframe" class="musicPlayer soundcloudPlayer"><span ng-click="soundcloud.turnOffPlayer()" class="icon icon-navigate-left"></span></div><table pb-style="base.getBorderColor()" class="soundcloudTrackList trackList"><tr pb-style="base.getBorderColor()" ng-repeat="soundcloudTrack in page.SoundcloudTracks |orderBy: \'Idx\' " ><td pb-style="base.getBorderColor()"><a class="thumbNail" ng-click="soundcloud.openTrack(soundcloudTrack)"><img ng-src="{{soundcloudTrack.ThumbUrl}}"/><span style="color:{{site.PLinkColor}}" class="thumbPlayButton icon icon-play"></span></a></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="soundcloudTrack.AuthorName"></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="soundcloudTrack.Title"></td></tr></table></div>',
		b = ["$scope", "$element", function(a) {
			var b = $(".musicPlayer"),
				c = $(".soundcloudTrackList");
			a.soundcloud = {
				openTrack: function(d) {
					b.find("iframe").remove(), b.css("display", "flex"), a.soundcloud.playingTrackIframe = pb.environment.isMobile ? '<iframe id="soundcloudIframe" width="300" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + d.TrackUrl + '&amp;color=ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>' : '<iframe id="soundcloudIframe" width="300" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + d.TrackUrl + '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', $(a.soundcloud.playingTrackIframe).insertBefore(b.find("span")), pb.utils.addTemporaryAnimation(b, "pulse", ""), $(c).hasClass("trackListLeftC") || (c.addClass("trackListLeftC"), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInLeft", "ultrafast"))
				},
				turnOffPlayer: function() {
					b.hide(), b.find("iframe").remove(), c.removeClass("trackListLeftC"), pb.utils.addTemporaryAnimation(b, "pulse", ""), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInRight", "ultrafast")
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.spotify = [function() {
	var a = '<div class="musicContainer clearfix"><div ng-show="spotify.playingTrackIframe" class="musicPlayer"><span ng-click="spotify.turnOffPlayer()" class="icon icon-navigate-left"></span></div><table pb-style="base.getBorderColor()" class="spotifyTracklist trackList"><tr pb-style="base.getBorderColor()" ng-repeat="spotifyTrack in page.SpotifyTracks |orderBy: \'Idx\' " ><td pb-style="base.getBorderColor()"><a class="thumbNail" ng-click="spotify.openTrack(spotifyTrack)"><img class="spotifyAlbum" ng-src="{{spotifyTrack.ThumbUrl}}"/><span class="thumbPlayButton icon icon-play spotifyColor"></span></a></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="spotifyTrack.ArtistName"></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="spotifyTrack.Title"></td></tr></table></div>',
		b = ["$scope", "$element", function(a) {
			var b = $(".musicPlayer"),
				c = $(".spotifyTracklist");
			a.spotify = {
				openTrack: function(d) {
					b.find("iframe").remove(), b.css("display", "flex"), a.spotify.playingTrackIframe = '<iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A' + d.TrackId + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>', $(a.spotify.playingTrackIframe).insertBefore(b.find("span")), pb.utils.addTemporaryAnimation(b, "pulse", ""), $(c).hasClass("trackListLeftC") || (c.addClass("trackListLeftC"), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInLeft", "ultrafast"))
				},
				turnOffPlayer: function() {
					b.hide(), b.find("iframe").remove(), c.removeClass("trackListLeftC"), pb.utils.addTemporaryAnimation(b, "pulse", ""), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInRight", "ultrafast")
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.youtube = [function() {
	var a = '<div class="musicContainer clearfix"><div ng-show="youtube.playingTrackIframe" class="musicPlayer youtubePlayer"><span ng-click="youtube.turnOffPlayer()" class="icon icon-navigate-left"></span></div><table pb-style="base.getBorderColor()" class="youtubeTrackList trackList"><tr pb-style="base.getBorderColor()" ng-repeat="youtubeTrack in page.YoutubeTracks |orderBy: \'Idx\' " ><td pb-style="base.getBorderColor()"><a class="thumbNail" ng-click="youtube.openTrack(youtubeTrack)"><img ng-src="{{youtubeTrack.ThumbUrl}}"/><span class="thumbPlayButton icon icon-play youtubeColor"></span></a></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="youtubeTrack.AuthorName"></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="youtubeTrack.Title"></td></tr></table></div>',
		b = ["$scope", "$element", function(a) {
			var b = $(".musicPlayer"),
				c = $(".youtubeTrackList");
			a.youtube = {
				openTrack: function(d) {
					b.find("iframe").remove(), b.css("display", "flex"), a.youtube.playingTrackIframe = pb.environment.isMobile ? '<iframe width="300" height="169" src="https://www.youtube.com/embed/' + d.VideoId + '?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe>' : '<iframe width="400" height="225" src="https://www.youtube.com/embed/' + d.VideoId + '?feature=oembed&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe>', $(a.youtube.playingTrackIframe).insertBefore(b.find("span")), pb.utils.addTemporaryAnimation(b, "pulse", ""), $(c).hasClass("trackListLeftC") || (c.addClass("trackListLeftC"), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInLeft", "ultrafast"))
				},
				turnOffPlayer: function() {
					b.hide(), b.find("iframe").remove(), c.removeClass("trackListLeftC"), pb.utils.addTemporaryAnimation(b, "pulse", ""), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInRight", "ultrafast")
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.music = [function() {
	var a = '<div class="musicContainer clearfix"><div ng-show="music.playingTrackIframe" class="musicPlayer" ng-attr-type="{{music.playerType}}"><span ng-click="music.turnOffPlayer()" class="icon icon-navigate-left"></span></div><table pb-style="base.getBorderColor()" class="trackList" ng-attr-type="{{music.playerType}}"><tr pb-style="base.getBorderColor()" ng-repeat="track in page.MusicTracks |orderBy: \'Idx\' " ><td pb-style="base.getBorderColor()" ng-attr-type="{{track.Type}}"><a class="thumbNail" ng-click="music.openTrack(track)"><img class="album" ng-src="{{track.ThumbUrl}}"/><span class="thumbPlayButton icon icon-play typeColor"></span></a></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="track.ArtistName"></td><td pb-style="base.getListTextStyle()" bind-unsafe-html="track.Title"></td></tr></table></div>',
		b = ["$scope", "$element", function(a) {
			var b = $(".musicPlayer"),
				c = $(".trackList");
			a.music = {
				openTrack: function(d) {
					b.find("iframe").remove(), b.css("display", "flex"), "spotify" == d.Type ? (a.music.playerType = "spotify", a.music.playingTrackIframe = pb.environment.isMobile ? '<iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A' + d.TrackId + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>' : '<iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A' + d.TrackId + '" width="400" height="400" frameborder="0" allowtransparency="true"></iframe>') : "youtube" == d.Type ? (a.music.playerType = "youtube", a.music.playingTrackIframe = pb.environment.isMobile ? '<iframe width="300" height="169" src="https://www.youtube.com/embed/' + d.TrackId + '?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe>' : '<iframe width="400" height="225" src="https://www.youtube.com/embed/' + d.TrackId + '?feature=oembed&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe>') : (a.music.playerType = "soundcloud", a.music.playingTrackIframe = pb.environment.isMobile ? '<iframe id="soundcloudIframe" width="300" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + d.TrackUrl + '&amp;color=ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>' : '<iframe id="soundcloudIframe" width="400" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + d.TrackUrl + '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'), $(a.music.playingTrackIframe).insertBefore(b.find("span")), pb.utils.addTemporaryAnimation(b, "pulse", ""), $(c).hasClass("trackListLeftC") || (c.addClass("trackListLeftC"), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInLeft", "ultrafast"))
				},
				turnOffPlayer: function() {
					b.hide(), b.find("iframe").remove(), c.removeClass("trackListLeftC"), pb.utils.addTemporaryAnimation(b, "pulse", ""), pb.environment.isMobile || pb.utils.addTemporaryAnimation(c, "slideInRight", "ultrafast")
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvEducations = [function() {
	var a = '<div class="cvContainer education clearfix" misc-helper><h2 ng-if="page.CvMain.CvEducations && page.CvMain.CvEducations.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Educations}}</h2><div class="cvProperty" ng-repeat="edu in page.CvMain.CvEducations |orderBy: \'Idx\' track by edu.Guid"><div class="cvFieldDetails clearfix"><h3 pb-style="base.getH3Styles()" class="cvFieldTitle" bind-unsafe-html="edu.Title"></h3><div class="cvFieldDate"><div ng-if="edu.StartedAt" pb-style="base.getPSimpleStyle()" class="startDate date" bind-unsafe-html="miscH.getFormatedDateForCv(edu.StartedAt)"></div><div ng-if="edu.StartedAt" pb-style="base.getPSimpleStyle()" class="dateLine date"> - </div><div ng-if="edu.EndedAt" pb-style="base.getPSimpleStyle()" class="endDate date" bind-unsafe-html="miscH.getFormatedDateForCv(edu.EndedAt)"></div><div ng-if="!edu.EndedAt && edu.StillActive == 1" pb-style="base.getPSimpleStyle()" class="endDate date">{{site.UserTranslatedText.Present}}</div></div></div><div pb-style="base.getPStyle()" class="cvFieldDescription" bind-unsafe-html="edu.Description"></div></div></div>';
	return {
		restrict: "E",
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvExperiences = [function() {
	var a = '<div class="cvContainer experience clearfix" misc-helper><h2 ng-if="page.CvMain.CvExperiences && page.CvMain.CvExperiences.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Experiences}}</h2><div class="cvProperty" ng-repeat="exp in page.CvMain.CvExperiences |orderBy: \'Idx\' track by exp.Guid"><div class="cvFieldDetails clearfix"><h3 pb-style="base.getH3Styles()" class="cvFieldTitle" bind-unsafe-html="exp.Title"></h3><div class="cvFieldDate"><div ng-if="exp.StartedAt" pb-style="base.getPSimpleStyle()" class="startDate date" bind-unsafe-html="miscH.getFormatedDateForCv(exp.StartedAt)"></div><div ng-if="exp.StartedAt" pb-style="base.getPSimpleStyle()" class="dateLine date"> - </div><div ng-if="exp.EndedAt" pb-style="base.getPSimpleStyle()" class="endDate date" bind-unsafe-html="miscH.getFormatedDateForCv(exp.EndedAt)"></div><div ng-if="!exp.EndedAt && exp.StillActive == 1" pb-style="base.getPSimpleStyle()" class="endDate date">{{site.UserTranslatedText.Present}}</div></div></div><div pb-style="base.getPStyle()" class="cvFieldDescription" bind-unsafe-html="exp.Description"></div></div></div>';
	return {
		restrict: "E",
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvAwards = [function() {
	var a = '<div class="cvContainer award clearfix" misc-helper><h2 ng-if="page.CvMain.CvAwards && page.CvMain.CvAwards.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Awards}}</h2><div class="cvProperty" ng-repeat="award in page.CvMain.CvAwards |orderBy: \'Idx\' track by award.Guid"><div class="cvFieldDetails clearfix"><h3 pb-style="base.getH3Styles()" class="cvFieldTitle" bind-unsafe-html="award.Title"></h3><div class="cvFieldDate"><div ng-if="award.Date" pb-style="base.getPSimpleStyle()" class="startDate date" bind-unsafe-html="miscH.getFormatedDateForCv(award.Date)"></div></div></div><div pb-style="base.getPStyle()" class="cvFieldDescription" bind-unsafe-html="award.Description"></div></div></div>';
	return {
		restrict: "E",
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvExhibitions = [function() {
	var a = '<div class="cvContainer exhibition clearfix" misc-helper><h2 ng-if="page.CvMain.CvExhibitions && page.CvMain.CvExhibitions.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Exhibitions}}</h2><div class="cvProperty" ng-repeat="exhibi in page.CvMain.CvExhibitions |orderBy: \'Idx\' track by exhibi.Guid" ><div class="cvFieldDetails clearfix"><h3 pb-style="base.getH3Styles()" class="cvFieldTitle" bind-unsafe-html="exhibi.Title"></h3><div class="cvFieldDate"><div ng-if="exhibi.Date" pb-style="base.getPSimpleStyle()" class="startDate date" bind-unsafe-html="miscH.getFormatedDateForCv(exhibi.Date)"></div></div></div><div pb-style="base.getPStyle()" class="cvFieldDescription" bind-unsafe-html="exhibi.Description"></div></div></div>';
	return {
		restrict: "E",
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvSkills = [function() {
	var a = '<div class="cvContainer skill clearfix" misc-helper><h2 ng-if="page.CvMain.CvSkills && page.CvMain.CvSkills.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Skills}}</h2><div class="cvProperty level" ng-repeat="skill in page.CvMain.CvSkills |orderBy: \'Idx\' track by skill.Guid"><div class="cvFieldDetails clearfix"><div pb-style="base.getPSimpleStyle()" class="cvFieldTitle ratingTitle" bind-unsafe-html="skill.Title"></div><div ng-if="skill.Rating" class="cvProgressbarBox" pb-style="cvSkills.getPercentageBarStyle()"><div class="progressBar" pb-style="cvSkills.getPercentage(skill.Rating)"></div></div></div></div></div>',
		b = ["$scope", "$element", function(a) {
			a.cvSkills = {
				getPercentage: function(b) {
					var c = a.base.getBorderColor();
					return c.background = a.site.PLinkColor, c.width = b + "%", c
				},
				getPercentageBarStyle: function() {
					var b = a.base.getBorderColor();
					return b.background = pb.utils.getTransparentColor(a.site.H1FontColor, .7), b
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvInterests = [function() {
	var a = '<div class="cvContainer interest clearfix" misc-helper><h2 ng-if="page.CvMain.CvInterests && page.CvMain.CvInterests.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Interests}}</h2><div class="cvProperty level" ng-repeat="ints in page.CvMain.CvInterests |orderBy: \'Idx\' track by ints.Guid"><div class="cvFieldDetails clearfix"><div pb-style="base.getPSimpleStyle()" class="cvFieldTitle ratingTitle" bind-unsafe-html="ints.Title"></div><div ng-if="ints.Rating" class="cvProgressbarBox" pb-style="cvInterests.getPercentageBarStyle()"><div class="progressBar" pb-style="cvInterests.getPercentage(ints.Rating)"></div></div></div></div></div>',
		b = ["$scope", "$element", function(a) {
			a.cvInterests = {
				getPercentage: function(b) {
					var c = a.base.getBorderColor();
					return c.background = a.site.PLinkColor, c.width = b + "%", c
				},
				getPercentageBarStyle: function() {
					var b = a.base.getBorderColor();
					return b.background = pb.utils.getTransparentColor(a.site.H1FontColor, .7), b
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.dirs.cvLanguages = [function() {
	var a = '<div class="cvContainer language clearfix" misc-helper><h2 ng-if="page.CvMain.CvLanguages && page.CvMain.CvLanguages.length > 0" pb-style="miscH.getCVPropertyTitleStyle()" class="title">{{site.UserTranslatedText.Languages}}</h2><div class="cvProperty level" ng-repeat="lang in page.CvMain.CvLanguages |orderBy: \'Idx\' track by lang.Guid"><div class="cvFieldDetails clearfix"><div pb-style="base.getPSimpleStyle()" class="cvFieldTitle ratingTitle" bind-unsafe-html="lang.Title"></div><div ng-if="lang.Rating" class="cvProgressbarBox" pb-style="cvLanguages.getPercentageBarStyle()"><div class="progressBar" pb-style="cvLanguages.getPercentage(lang.Rating)"></div></div></div></div></div>',
		b = ["$scope", "$element", function(a) {
			a.cvLanguages = {
				getPercentage: function(b) {
					var c = a.base.getBorderColor();
					return c.background = a.site.PLinkColor, c.width = b + "%", c
				},
				getPercentageBarStyle: function() {
					var b = a.base.getBorderColor();
					return b.background = pb.utils.getTransparentColor(a.site.H1FontColor, .7), b
				}
			}
		}];
	return {
		restrict: "E",
		controller: b,
		replace: !0,
		template: a
	}
}], pbAng.services = pbAng.services || {}, pbAng.services.blogPostsService = function() {
	return {
		getBlogPostByPostGuid: function(a, b, c) {
			var d = function() {
				var d = a.page.Guid;
				amplify.request({
					resourceId: "getSinglePost",
					data: {
						pageGuid: d,
						postGuid: b
					},
					success: function(b) {
						if (void 0 != b) {
							delete pb.utils.pendingBlogPostGuidList[b.Guid];
							var d = pb.utils.findItemFromArray(a.page.BlogPosts, "Guid", b.Guid);
							if (void 0 != d && (void 0 == d.IsFullPost || 0 == d.IsFullPost)) {
								for (var e in b) {
									var f = b[e];
									d[e] = f
								}
								pb.data.set.pages(pb.data.pages), pb.utils.digest(a, !0, function() {
									setTimeout(function() {
										a.base.broadCast("changeBlogTemplateViewFile")
									}, 100)
								})
							}
							void 0 != c && c(b)
						} else void 0 != c && c(b)
					},
					error: function() {
						void 0 != c && c(!1)
					}
				})
			};
			d()
		},
		getMultipleBlogPostByPostGuids: function(a, b, c) {
			var d = function() {
				var d = a.page.Guid;
				amplify.request({
					resourceId: "getMultiplePost",
					data: {
						pageGuid: d,
						postGuids: b
					},
					success: function(b) {
						void 0 != b ? ($.each(b, function(b, c) {
							if (void 0 != c) {
								delete pb.utils.pendingBlogPostGuidList[c.Guid];
								var d = pb.utils.findItemFromArray(a.page.BlogPosts, "Guid", c.Guid);
								if (void 0 != d && (void 0 == d.IsFullPost || 0 == d.IsFullPost)) for (var e in c) {
									var f = c[e];
									d[e] = f
								}
							}
						}), pb.data.set.pages(pb.data.pages), pb.utils.digest(a, !0, function() {
							setTimeout(function() {
								a.base.broadCast("changeBlogTemplateViewFile")
							}, 100)
						}), void 0 != c && c(b)) : void 0 != c && c(b)
					},
					error: function() {
						void 0 != c && c(!1)
					}
				})
			};
			d()
		}
	}
}, pbAng.dirs.sectionViews = {
	galleries: {},
	collections: {},
	listitems: {},
	covers: {},
	maps: {}
};
var const_sectionViews = {
	dynamicGrid: [function() {
		var a = pb.environment.isMobile,
			b = function(a, b, c, d) {
				var e = 0,
					f = {
						container: null,
						width: c
					};
				return f.container = pb.utils.getContainer(a)[d], void 0 != f.container && null != f.container && f.container.length > 0 ? (e = f.container.width(), c >= e && (f.width = b ? e : e - 10)) : f = null, f
			}, c = function(c, d, e) {
				if (e) {
					var f, g, h = null,
						i = parseInt(c.section.ListImageMargin),
						j = 15 >= i ? i : 15,
						k = pb.utils.getWidthForSizeSection(c.section.ListImageSize, 16, pb.utils.getContainer(e)[c.section.Type]),
						l = void 0 == c.site.ThumbDecorationBorderWidth ? 0 : parseInt(c.site.ThumbDecorationBorderWidth),
						m = k.size;
					h = b(e, a, m, c.section.Type), h && (m = h.width, f = h.width - 2 * l, void 0 != h.container && null != h.container && setTimeout(function() {
						var b = d.find("figure");
						b.each(function() {
							var a = $(this).find(".image"),
								b = $(this).find("figcaption"),
								c = a.data("width"),
								d = a.data("height"),
								e = c / d;
							g = f / e, a.width(f), a.height(g), b.width(m), $(this).width(m), $(this).css("display", "block")
						});
						var c = {
							width: m,
							elements: b,
							margin: a ? j : i,
							center: !0,
							resize: !1
						};
						null != h && null != h.container && h.container.dynamicGrid(c), pb.utils.setGalleryMarginTopAndSites(d, a, 0, "-" + i, "-3px")
					}, 10))
				}
			}, d = function(a, b) {
				var d = function() {
					setTimeout(function() {
						c(a, b, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 1)
				};
				d(), setTimeout(function() {
					d()
				}, 10), pb.utils.resizeAndDestroy(a, "sectionDynamicGrid", function() {
					d()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(b, c, e) {
					b != "renderSectionItems" + a.section.Guid && b != "sectionImageMarginChange" + a.section.Guid && b != "sectionImageSizeChange" + a.section.Guid || !e || e.Guid != a.section.Guid || setTimeout(function() {
						d()
					}, 10)
				}, "Section Dynamic Grid")
			};
		return {
			restrict: "A",
			link: d
		}
	}],
	evenRows: [function() {
		var a = pb.environment.isMobile,
			b = {
				1: 200,
				2: 310,
				3: 550,
				4: 700
			}, c = function(c) {
				var d = {
					size: 1,
					count: 1
				};
				return a ? d = pb.utils.getMobileImageSize() : (d.size = b[c], void 0 == d.size && (d.size = 420)), d
			}, d = {}, e = function(a, b, c, e, f) {
				if (e && d[e]) {
					var g = void 0 == a.site.ThumbDecorationBorderWidth ? 0 : parseInt(a.site.ThumbDecorationBorderWidth);
					if (b.css({
						"border-width": g + "px",
						"border-color": "transparent",
						"border-style": "solid"
					}), 0 != g) {
						var h = Math.floor(d[e][f] - 2 * g);
						c.width(h)
					}
				}
			}, f = function(b, f, g) {
				if (g) {
					void 0 == d && (d = {}), d[g] = [];
					var h = f.find("figure"),
						i = a ? 7.5 : parseInt(b.section.ListImageMargin);
					f.evenRows({
						height: c(b.section.ListImageSize).size,
						elements: h,
						margin: i,
						resize: !1
					}), setTimeout(function() {
						f.find("figure").each(function(c) {
							$(this).css("display", "block");
							var f = ($(this).find(".imageBox"), $(this).find("img")),
								h = $(this).find("figcaption"),
								j = f.width(),
								k = f.height();
							d[g].push(j), h.width(j), h.css({
								top: i + "px",
								left: i + "px",
								background: b.site.BgBoxColor
							}), e(b, h, f, g, c);
							var l = h.height();
							a || $(this).on("mouseenter", function() {
								if (h.length > 0) {
									var a = parseInt(b.site.ThumbDecorationBorderWidth);
									a = isNaN(a) ? 0 : a, a *= 2, k = $(this).find(".image").height();
									var c = (k - l + a) / 2;
									c > 0 && h.css({
										"padding-top": c + "px",
										visibility: "visible",
										"border-radius": b.site.ThumbDecorationBorderRadius,
										border: "none !important"
									}), h.height(k - c + a)
								}
							}).on("mouseleave", function() {
								h.length > 0 && h.css({
									height: "auto",
									visibility: "hidden"
								})
							})
						})
					}, 1), pb.utils.setGalleryMarginTopAndSites(f, a, 0, "-" + b.section.ListImageMargin)
				}
			}, g = function(a, b) {
				var c = function() {
					setTimeout(function() {
						f(a, b, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 1)
				};
				c(), pb.utils.resizeAndDestroy(a, "sectionEvenRows", function() {
					c()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid, "changeImageBorderWidth"], function(d, f, g) {
					d != "renderSectionItems" + a.section.Guid && d != "sectionImageMarginChange" + a.section.Guid && d != "sectionImageSizeChange" + a.section.Guid || !g || g.Guid != a.section.Guid ? "changeImageBorderWidth" == d && b.find("figure").each(function(b) {
						e(a, $(this).find("figcaption"), $(this).find("img"), a.section.Guid, b)
					}) : setTimeout(function() {
						c()
					}, 10)
				}, "Section Even Rows")
			};
		return {
			restrict: "A",
			link: g
		}
	}],
	sameRatio: [function() {
		var a, b = pb.environment.isMobile,
			c = function(a, c, d) {
				if (d) {
					var e = 0;
					c.find("figcaption").each(function() {
						$(this).height() > e && (e = $(this).height()), $(this).height(e)
					});
					var f = b ? "7.5px" : a.section.ListImageMargin;
					c.find("figure").css("margin", f), pb.utils.setGalleryMarginTopAndSites(c, b, 0, "-" + a.section.ListImageMargin)
				}
			}, d = function(c, d, f) {
				var g, h, i = 1.618;
				a = b && f ? pb.utils.getMobileImageSizeSlideShow(16) : pb.utils.getWidthForSizeSection(c.section.ListImageSize, 16), h = a.size, b && (h = d.outerWidth() - 15), g = h / i, d.find("figure").width(h).find(".imageBox").height(g), e(d)
			}, e = function(a) {
				var b = a.find(".imageBox"),
					c = b.width(),
					d = b.height(),
					e = c / d;
				a.find(".image").each(function() {
					var a = 0,
						b = 0,
						f = $(this).data("width"),
						g = $(this).data("height"),
						h = f / g;
					if (h > e) {
						var i = $(this).attr("src").replace("w400", "h400");
						$(this).attr("src", i), g = d, f = h * g, a = (c - f) / 2
					} else f = c, g = f / h, b = (d - g) / 2;
					$(this).width(f), $(this).height(g), $(this).css({
						top: b + "px",
						left: a + "px"
					})
				})
			}, f = function(c) {
				var d = 0,
					e = c.find("figcaption");
				if (e.css({
					height: "auto"
				}), b) pb.utils.setTallestFigcaptionMobile(c, a);
				else {
					e.each(function() {
						$(this).height() > d && (d = $(this).height())
					});
					var f = c.find(".imageBox").height();
					c.find("figure").height(f + d + 6)
				}
			}, g = function(a, b, e, g) {
				if (e) {
					c(a, b, e), d(a, b, g), f(b);
					var h = b.find("figure");
					h.css("visibility", "visible")
				}
			}, h = function(a, b, d) {
				var e = !1;
				void 0 != d.childthumb && "true" == d.childthumb && (e = !0);
				var f = function() {
					setTimeout(function() {
						g(a, b, a.section.Guid, e), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 1)
				};
				f(), pb.utils.resizeAndDestroy(a, "sectionSameRatio", function() {
					f()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(d, e, g) {
					d == "sectionImageMarginChange" + a.section.Guid && g && g.Guid == a.section.Guid ? setTimeout(function() {
						c(a, b, a.section.Guid)
					}, 10) : d != "renderSectionItems" + a.section.Guid && d != "sectionImageSizeChange" + a.section.Guid || !g || g.Guid != a.section.Guid || setTimeout(function() {
						f()
					}, 10)
				}, "Section Same Ratio")
			};
		return {
			restrict: "A",
			link: h
		}
	}],
	squareRatio: [function() {
		var a, b = pb.environment.isMobile,
			c = function(c, d) {
				var e = void 0 == c.site.ThumbDecorationBorderWidth ? 0 : parseInt(c.site.ThumbDecorationBorderWidth);
				e *= 2;
				var f = d.find(".imageBox");
				a = pb.utils.getWidthForSizeSection(c.section.ListImageSize, 16);
				var g = d.width(),
					h = b ? g - 15 : a.size,
					i = b ? g - 15 : a.size,
					j = 1;
				f.width(h - e), f.height(i - e), d.find(".image").each(function() {
					var a = 0,
						b = 0,
						c = $(this).data("width"),
						d = $(this).data("height"),
						e = c / d;
					if (e > j) {
						d = i, c = e * d, a = (h - c) / 2;
						var f = $(this).attr("src").replace("w400", "h400");
						$(this).attr("src", f)
					} else c = h, d = c / e, b = (i - d) / 2;
					$(this).width(c), $(this).height(d), $(this).css({
						top: b + "px",
						left: a + "px"
					})
				})
			}, d = function(a, c, d) {
				if (d) {
					var e = b ? "7.5px" : a.section.ListImageMargin;
					c.find("figure").css("margin", e), pb.utils.setGalleryMarginTopAndSites(c, b, 0, "-" + a.section.ListImageMargin)
				}
			}, e = function(d, e, f) {
				if (f) {
					var g, h;
					if (a = pb.utils.getWidthForSizeSection(d.section.ListImageSize, 16), h = a.size, g = a.size, b ? e.find("figure").each(function() {
						var a = $(this);
						a.width(e.width() - 15), a.height("auto"), a.find(".imageBox").height(e.width())
					}) : e.find("figure").width(h).find(".imageBox").height(g), b) e.find("figure").css({
						display: "block"
					});
					else {
						var i = function() {
							var a = g + j + 6;
							e.find("figure").css({
								display: "block",
								height: a
							})
						}, j = 0,
							k = 0,
							l = 0;
						e.find("figcaption").each(function() {
							k++;
							var a = $(this);
							setTimeout(function() {
								var b = a.height();
								b > j && (j = b), l++, k == l && i()
							}, 10)
						}), i()
					}
					c(d, e)
				}
			}, f = function(a, b) {
				var c = function() {
					setTimeout(function() {
						d(a, b, a.section.Guid), e(a, b, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 1)
				};
				c(), pb.utils.resizeAndDestroy(a, "sectionSquareRatio", function() {
					c()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(f, g, h) {
					f == "renderSectionItems" + a.section.Guid && h && h.Guid == a.section.Guid ? setTimeout(function() {
						c()
					}, 10) : f == "sectionImageMarginChange" + a.section.Guid && h && h.Guid == a.section.Guid ? setTimeout(function() {
						d(a, b, h.Guid)
					}, 10) : f == "sectionImageSizeChange" + a.section.Guid && h && h.Guid == a.section.Guid && setTimeout(function() {
						e(a, b, h.Guid)
					}, 10)
				}, "Section Square Ratio")
			};
		return {
			restrict: "A",
			link: f
		}
	}],
	verticalTwoOrThreeOne: [function() {
		var a = pb.environment.isMobile || $(window).width() <= 768 ? !0 : !1,
			b = function(b, c, d, e) {
				if (e) {
					var f = b.section.ListImageMargin ? parseInt(b.section.ListImageMargin) : 10;
					a && (f = 10);
					var g = 2 * f;
					a && (g = 15), c.find("figure").css("margin-bottom", g + "px")
				}
			}, c = {
				0: 50,
				1: 70,
				3: 90,
				4: 100
			}, d = function(b, d, f, g) {
				if (g) {
					var h = b.section.ListImageMargin ? parseInt(b.section.ListImageMargin) : 10,
						i = 0;
					a ? i = 100 : (i = c[b.section.ListImageSize], void 0 == i && (i = 80)), d.width(i + "%"), e(b, d, h, f)
				}
			}, e = function(b, c, d, e) {
				var f = c[0].getBoundingClientRect().width,
					g = [],
					h = 2,
					i = 0,
					j = [];
				f -= .1;
				var k = void 0 == d ? 0 : 2 * d,
					l = k;
				e && (h = 3, l = 2 * k);
				var m = 450,
					n = 0;
				c.find("figure").each(function(a) {
					n++;
					var b = $(this).find("img"),
						c = b.data("width"),
						d = b.data("height"),
						e = c / d,
						f = m * e;
					(a + 1) % (h + 1) == 0 ? (j.push(i), i = 0) : i += f, g.push({
						width: f,
						ratio: e
					})
				}), j.push(i);
				var o = 0;
				if (a) for (var p = 0; p < g.length; p++) $(c.find("figure")[p]).width("");
				else {
					for (var p = 0; p < g.length; p++) {
						if ((p + 1) % (h + 1) == 0) o++;
						else {
							var q = g[p].width / j[o] * (f - l);
							$(c.find("figure")[p]).width(q)
						}
						if (e && p) if (g[p].width + g[p - 1].width == j[o]) if ($(c.find("figure")[p - 1]).width(""), $(c.find("figure")[p]).width(""), $(c.find("figure")[p - 1]).height() > $(c.find("figure")[p]).height()) {
							m = $(c.find("figure")[p - 1]).height();
							var r = $(c.find("figure")[p]).height(),
								q = $(c.find("figure")[p]).width(),
								s = q / r * m;
							$(c.find("figure")[p]).width(s)
						} else {
							m = $(c.find("figure")[p]).height();
							var r = $(c.find("figure")[p - 1]).height(),
								q = $(c.find("figure")[p - 1]).width(),
								s = q / r * m;
							$(c.find("figure")[p - 1]).width(s)
						} else g[p].width == j[o] && $(c.find("figure")[p]).width("");
						else g[p].width == j[o] && $(c.find("figure")[p]).width("")
					}
					e ? (c.find("figure:nth-child(4n-1)").css({
						"margin-left": k
					}), c.find("figure:nth-child(4n-2)").css({
						"margin-left": k
					})) : c.find("figure:nth-child(3n-1)").css({
						"margin-left": k
					})
				}
			}, f = function(a, c) {
				var f = !1;
				"verticalthreeone" == a.section.ViewFile && (f = !0);
				var g = function() {
					setTimeout(function() {
						b(a, c, f, a.section.Guid), d(a, c, f, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 10)
				};
				g(), pb.utils.resizeAndDestroy(a, "sectionVerticalTwoOneAndThreeOne", function() {
					g()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(h, i, j) {
					h == "sectionImageMarginChange" + a.section.Guid && j && j.Guid == a.section.Guid ? setTimeout(function() {
						var d = a.section.ListImageMargin ? parseInt(a.section.ListImageMargin) : 10;
						b(a, c, f, j.Guid), e(a, c, d, f)
					}, 10) : h == "sectionImageSizeChange" + a.section.Guid && j && j.Guid == a.section.Guid ? setTimeout(function() {
						d(a, c, f, j.Guid)
					}, 10) : h == "renderSectionItems" + a.section.Guid && j && j.Guid == a.section.Guid && setTimeout(function() {
						g()
					}, 50)
				}, "Section Vertical Two One Or Three One")
			};
		return {
			restrict: "A",
			link: f
		}
	}],
	horizontalStyled: [function() {
		var a = pb.environment.isMobile,
			b = {
				0: .3,
				1: .5,
				3: .88,
				4: 1
			}, c = function(c) {
				var d;
				if (a) {
					var e = pb.environment.height;
					d = 300 > e ? .7 : 420 > e ? .82 : .88
				} else d = b[c], void 0 == d && (d = .7);
				return d
			}, d = function(a, b, d) {
				if (d) {
					var e = c(a.section.ListImageSize),
						f = $(window).height(),
						g = b.find("figcaption").length > 0 ? b.find(".galleryFigCaption").outerHeight(!0) : 0,
						h = (f - g) * e;
					h = 100 > h ? 100 : Math.round(h), b.find("figure").each(function() {
						var a = $(this).find("img"),
							b = a.data("height"),
							c = a.data("width"),
							d = b / c,
							e = Math.round(h / d);
						a.css({
							height: h,
							width: e
						})
					}), $(".descriptionContainer .description").css({
						height: b.find(".imageBox").height()
					})
				}
			}, e = function(b, c, d) {
				if (d) {
					var e = a ? "15px" : b.section.ListImageMargin;
					$(".descriptionContainer").css("padding-right", e), c.find("figure .imageBox").css("margin-right", e), c.find("figure figcaption").css("margin-right", e)
				}
			}, f = function(a, b) {
				var c = function() {
					var c = $(".horizontalContainer");
					pb.utils.setInterval(function() {
						return c = $(".horizontalContainer"), c.length > 0 ? !0 : void 0
					}, 1, 1e3, {
						scope: a
					}).done(function() {
						pb.utils.isMobile() || pb.utils.isTablet() || (c.mCustomScrollbar("destroy"), c.mCustomScrollbar({
							axis: "x",
							advanced: {
								autoExpandHorizontalScroll: !0,
								updateOnBrowserResize: !0
							},
							scrollInertia: 0,
							scrollbarPosition: "inside",
							autoHideScrollbar: !0,
							autoExpandScrollbar: !1,
							mouseWheel: {
								axis: "x"
							}
						})), setTimeout(function() {
							d(a, b, a.section.Guid), e(a, b, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
								Guid: a.section.Guid
							})
						}, 10)
					})
				};
				c(), pb.utils.resizeAndDestroy(a, "sectionHorizontalStyled", function() {
					c()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid, "updateDescriptionMargin" + a.section.Guid], function(f, g, h) {
					f == "renderSectionItems" + a.section.Guid && h && h.Guid == a.section.Guid ? setTimeout(function() {
						c()
					}, 10) : f == "sectionImageMarginChange" + a.section.Guid && h && h.Guid == a.section.Guid ? setTimeout(function() {
						e(a, b, h.Guid)
					}, 10) : f == "sectionImageSizeChange" + a.section.Guid && h && h.Guid == a.section.Guid ? setTimeout(function() {
						d(a, b, h.Guid)
					}, 10) : f == "updateDescriptionMargin" + a.section.Guid && h && h.Guid == a.section.Guid && setTimeout(function() {
						c()
					}, 10)
				}, "Section Horizontal Styled")
			};
		return {
			restrict: "A",
			link: f
		}
	}]
};
pbAng.dirs.sectionViews.galleries = {
	dynamicGrid: const_sectionViews.dynamicGrid,
	evenRows: const_sectionViews.evenRows,
	sameRatio: const_sectionViews.sameRatio,
	squareRatio: const_sectionViews.squareRatio,
	verticalTwoOne: const_sectionViews.verticalTwoOrThreeOne,
	verticalThreeOne: const_sectionViews.verticalTwoOrThreeOne,
	horizontalStyled: const_sectionViews.horizontalStyled
}, pbAng.dirs.sectionViews.collections = {
	dynamicGrid: const_sectionViews.dynamicGrid,
	evenRows: const_sectionViews.evenRows,
	sameRatio: const_sectionViews.sameRatio,
	verticalTwoOne: const_sectionViews.verticalTwoOrThreeOne,
	verticalThreeOne: const_sectionViews.verticalTwoOrThreeOne
}, pbAng.dirs.sectionViews.products = {
	dynamicGrid: const_sectionViews.dynamicGrid,
	evenRows: const_sectionViews.evenRows,
	verticalTwoOrThreeOne: const_sectionViews.verticalTwoOrThreeOne,
	sameRatio: const_sectionViews.sameRatio,
	squareRatio: const_sectionViews.squareRatio,
	horizontalStyled: const_sectionViews.horizontalStyled
}, pbAng.dirs.sectionViews.blogs = {
	dynamicGrid: [function() {
		var a = pb.environment.isMobile,
			b = function(a, b, c) {
				var d = 0,
					e = {
						container: null,
						width: c
					};
				return e.container = $("#blog_container_" + a), void 0 != e.container && null != e.container && e.container.length > 0 ? (d = e.container.width(), c >= d && (e.width = d - 10)) : e = null, e
			}, c = function(c, d, e) {
				if (e) {
					var f = null,
						g = 400,
						h = parseInt(c.section.ListImageMargin),
						i = 15 >= h ? h : 15;
					f = b(e, a, g), f && (g = f.width, void 0 != f.container && null != f.container && setTimeout(function() {
						var b = d.find("article");
						b.each(function() {
							var a = $(this).find(".image"),
								b = a.data("width"),
								c = a.data("height"),
								d = b / c,
								e = g / d;
							a.width(g), a.height(e), $(this).width(g), $(this).css("display", "block")
						});
						var c = {
							width: g,
							elements: b,
							margin: a ? i : h,
							center: !0,
							resize: !1
						};
						null != f && null != f.container && f.container.dynamicGrid(c), pb.utils.setGalleryMarginTopAndSites(d, a, 0, "-" + h)
					}, 10))
				}
			}, d = function(a, b) {
				var d = function() {
					setTimeout(function() {
						c(a, b, a.section.Guid), a.base.broadCast("updateAfterRenderComplete" + a.section.Guid, {
							Guid: a.section.Guid
						})
					}, 1)
				};
				d(), pb.utils.resizeAndDestroy(a, "sectionBlogDynamicGrid", function() {
					d()
				}), pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionWidthChange_" + a.section.Guid], function(b, c, e) {
					b != "renderSectionItems" + a.section.Guid && b != "sectionImageMarginChange" + a.section.Guid || !e || e.Guid != a.section.Guid ? b == "sectionWidthChange_" + a.section.Guid && d() : setTimeout(function() {
						d()
					}, 10)
				}, "Section Blog Dynamic Grid")
			};
		return {
			restrict: "A",
			link: d
		}
	}]
}, pbAng.dirs.sectionViews.listitems = {
	listItem: [function() {
		var a = pb.environment.isMobile,
			b = function(a, b, c) {
				if (c = void 0 == c ? !1 : c) {
					var d, e, f = b.find(".item"),
						g = b.find(".item").outerWidth(!0),
						h = $("#mainContent_" + a.section.Guid).width(),
						i = parseInt(a.section.ListImageMargin);
					if (i > 0) if (d = Math.floor((h + 2 * i) / g), d > f.length && (d = f.length), e = d * g, e > h) {
						var j = (e - h) / 2,
							k = -1 * j;
						b.find(".listItemContainer").width(e).css({
							"margin-left": k + "px"
						})
					} else b.find(".listItemContainer").width(e).css({
						"margin-left": "auto",
						"margin-right": "auto"
					});
					else d = Math.floor(h / g), d > f.length && (d = f.length), e = d * g, b.find(".listItemContainer").width(e).css({
						"margin-left": "auto",
						"margin-right": "auto"
					})
				}
			}, c = function(c, d, e, f) {
				if (e) {
					var g = a ? 0 : c.section.ListImageMargin;
					d.find(".item").css("margin", g), pb.utils.setListItemTop(d.find(".listItemContainer"), a, 0, "-" + c.section.ListImageMargin), b(c, d, f)
				}
			}, d = function(a, c, d, e) {
				if (d) {
					var f = pb.utils.getWidthForSizeSection(a.section.ListImageSize, 16, c).size;
					f > 400 && (f = 400), c.find(".item").css("width", f + "px").find(".itemImage").css({
						height: f + "px",
						width: f + "px"
					}), b(a, c, e)
				}
			}, e = function(a, e) {
				a.sectionListItemDom = {
					getBackgroundStyle: function(b) {
						var c = a.base.getBorderColor();
						return c["background-image"] = "url(" + pbAng.filters.misc.pboxImage()(b.FileName, b.S3LocationId, "w400") + ")", c
					}
				};
				var f = function() {
					setTimeout(function() {
						c(a, e, a.section.Guid), d(a, e, a.section.Guid), b(a, e, !0)
					}, 1)
				};
				f(), pb.utils.resizeAndDestroy(a, "sectionListItems", function() {
					c(a, e, a.section.Guid), d(a, e, a.section.Guid), b(a, e, !0)
				}), pb.utils.onCreateEvents(a, ["sectionListItemsChange" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function(b, g, h) {
					h && h.Guid == a.section.Guid && (b == "sectionListItemsChange" + a.section.Guid ? setTimeout(function() {
						f()
					}, 10) : b == "sectionImageMarginChange" + a.section.Guid ? setTimeout(function() {
						c(a, e, a.section.Guid, !0)
					}, 10) : b == "sectionImageSizeChange" + a.section.Guid && setTimeout(function() {
						d(a, e, a.section.Guid, !0)
					}, 10))
				}, "Section ListItem")
			};
		return {
			restrict: "A",
			replace: !0,
			link: e
		}
	}],
	logos01: [function() {
		var a = function(a, b, c) {
			if (c) {
				var d = parseInt(a.section.ListImageMargin),
					e = pb.utils.pxToVw(d);
				b.css("grid-column-gap", e + "vw"), b.css("grid-row-gap", 1.5 * e + "vw")
			}
		}, b = function(a, b) {
			var c = function(a) {
				return 4 == a ? 4 : 3 == a ? 5 : 2 == a ? 6 : 1 == a ? 7 : 0 == a ? 8 : 6
			}, d = c(a.section.ListImageSize);
			b.css("grid-template-columns", "repeat(" + d + ", 1fr)")
		}, c = function(c, d) {
			var e = function() {
				setTimeout(function() {
					a(c, d, c.section.Guid), b(c, d, c.section.Guid)
				}, 1)
			};
			e(), pb.utils.onCreateEvents(c, ["sectionListItemsChange" + c.section.Guid, "sectionImageMarginChange" + c.section.Guid, "sectionImageSizeChange" + c.section.Guid], function(f, g, h) {
				h && h.Guid == c.section.Guid && (f == "sectionListItemsChange" + c.section.Guid ? setTimeout(function() {
					e()
				}, 10) : f == "sectionImageMarginChange" + c.section.Guid ? setTimeout(function() {
					a(c, d, c.section.Guid)
				}, 10) : f == "sectionImageSizeChange" + c.section.Guid && setTimeout(function() {
					b(c, d, c.section.Guid)
				}, 10))
			}, "Section ListItem")
		};
		return {
			restrict: "A",
			replace: !0,
			link: c
		}
	}],
	testimonial01: [function() {
		var a = function(a, b, c) {
			if (c) {
				var d = parseInt(a.section.ListImageMargin),
					e = pb.utils.pxToVw(d);
				b.css("grid-column-gap", e + "vw"), b.css("grid-row-gap", 1.5 * e + "vw")
			}
		}, b = function(a, b) {
			var c = function(a) {
				return 4 == a ? 1 : 3 == a ? 2 : 2 == a ? 3 : 1 == a ? 4 : 0 == a ? 5 : 3
			}, d = c(a.section.ListImageSize);
			b.css("grid-template-columns", "repeat(" + d + ", 1fr)")
		}, c = function(c, d) {
			var e = function() {
				setTimeout(function() {
					a(c, d, c.section.Guid), b(c, d, c.section.Guid)
				}, 1)
			};
			e(), pb.utils.onCreateEvents(c, ["sectionListItemsChange" + c.section.Guid, "sectionImageMarginChange" + c.section.Guid, "sectionImageSizeChange" + c.section.Guid], function(f, g, h) {
				h && h.Guid == c.section.Guid && (f == "sectionListItemsChange" + c.section.Guid ? setTimeout(function() {
					e()
				}, 10) : f == "sectionImageMarginChange" + c.section.Guid ? setTimeout(function() {
					a(c, d, c.section.Guid)
				}, 10) : f == "sectionImageSizeChange" + c.section.Guid && setTimeout(function() {
					b(c, d, c.section.Guid)
				}, 10))
			}, "Section ListItem")
		};
		return {
			restrict: "A",
			replace: !0,
			link: c
		}
	}],
	sectionCarousel: [function() {
		return {
			restrict: "A",
			replace: !0,
			link: function(a, b) {
				a.section.Guid, $(".carousel_" + a.section.Guid + ".listOfItems"), $(".carousel_" + a.section.Guid + " .item");
				console.log(a.section.ListItems.length), setTimeout(function() {
					console.log(b[0].clientWidth)
				}, 1);
				var c = function() {
					setTimeout(function() {}, 1)
				};
				c()
			}
		}
	}],
	listItemSimple: [function() {
		var a = function(a) {
			a.sectionListItemDom = {
				getBackgroundStyle: function(b) {
					var c = a.base.getBorderColor();
					return c["background-image"] = "url(" + pbAng.filters.misc.pboxImage()(b.FileName, b.S3LocationId, "w400") + ")", c
				}
			}
		};
		return {
			restrict: "A",
			link: a,
			replace: !0
		}
	}],
	servicesSigSack: [function() {
		var a = function(a, b) {
			var c, d = b.width() / 2,
				e = $(window).width();
			c = "left" == a.site.DsnLayoutType ? .2 * e : "centered" == a.site.DsnLayoutType ? 275 : .23 * e;
			var f = d / c;
			b.find(".image").each(function() {
				var a = $(this).data("width") / $(this).data("height");
				a > f && $(this).addClass("largerRatio")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["sectionListItemsChange" + b.section.Guid], function() {
				a(b, c)
			}, "Sig Sack")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c) {
				setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}]
}, pbAng.dirs.sectionViews.covers = {
	header01: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = function() {
					setTimeout(function() {
						var c = b.find(".verticalCenterMe");
						c.css("visibility", "hidden"), c.css("margin-top", 0);
						var d = 0;
						1 != a.section.FullHeight && (d = 2 * pb.utils.px2Int(a.section.Padding));
						var e = function() {
							var a = (b.closest("section").height() - c.height() - d) / 2;
							c.css("margin-top", a + "px"), c.css("visibility", "visible")
						}, f = $("#contentImage_" + a.section.Guid);
						1 == f.length ? (c.css("opacity", .2), pb.utils.setInterval(function() {
							return f.height() > 10 ? !0 : void 0
						}, 10, 1e3).done(function() {
							e(), c.css("opacity", 1)
						})) : e()
					}, 10)
				};
				c(), setTimeout(function() {
					pb.utils.onCreateEvents(a, ["updateContentImage_" + a.section.Guid, "applySectionBgStyle_" + a.section.Guid], function() {
						c()
					}, "Content Image Update")
				}, 1), pb.utils.resizeAndDestroy(a, "sectionVerticalCenter", function() {
					c()
				})
			}
		}
	}]
}, pbAng.dirs.sectionViews.menus = {
	sectionMenu01: [function() {
		return {
			restrict: "A",
			link: function(a) {
				var b = {
					section: $("#section_" + a.section.Guid),
					sectionWrapper: $("#div_" + a.section.Guid),
					mainContent: $("#section_" + a.section.Guid + " .mainContent"),
					startHeight: $("#section_" + a.section.Guid).outerHeight(),
					topOffset: $("#section_" + a.section.Guid).offset().top,
					mainContentStartHeight: $("#section_" + a.section.Guid + " .mainContent").outerHeight()
				}, c = function() {
					$("html, body").animate({
						scrollTop: 0
					}, 350, "swing"), b.section = $("#section_" + a.section.Guid), b.sectionWrapper = $("#div_" + a.section.Guid), b.mainContent = $("#section_" + a.section.Guid + " .mainContent"), b.startHeight = b.section.outerHeight(), b.topOffset = b.sectionWrapper.offset().top, a.section.FullHeight ? b.section.css("min-height", b.mainContent.outerHeight() + "px") : (b.sectionWrapper.css("height", b.startHeight + "px"), b.padding = parseInt(b.mainContent.css("padding-top")), b.startHeight = b.mainContent.outerHeight()), b.section.css("width", "100%"), b.mainContentStartHeight = b.mainContent.outerHeight(), a.section.MenuSettings.StickToTheTop && b.sectionWrapper.css("height", b.startHeight + "px")
				}, d = function() {
					$("html, body").animate({
						scrollTop: 0
					}, 350, "swing"), b.sectionWrapper.css("height", b.section.outerHeight() + "px")
				};
				$(document).ready(function() {
					c()
				}), $(window).resize(function() {
					c()
				});
				var e = function() {
					$("#section_" + a.section.Guid + " .sectionMenu").css("opacity", 0), $("#section_" + a.section.Guid + " .sectionMenu").animate({
						opacity: 1
					}, 350, "linear")
				};
				$(document).scroll(function() {
					if (a.section.FullHeight) if ($(window).scrollTop() >= b.topOffset && a.section.MenuSettings.StickToTheTop) {
						if (b.section.css("position", "fixed"), b.section.css("top", 0), b.section.outerHeight() > b.mainContentStartHeight && $(window).scrollTop() < b.topOffset + b.startHeight - b.mainContentStartHeight) {
							var c = b.startHeight - ($(window).scrollTop() - b.topOffset);
							b.section.outerHeight(c)
						}
						$(window).scrollTop() > b.topOffset + b.startHeight - b.mainContentStartHeight ? !b.mainContent.hasClass("fixedSection") && b.section.hasClass("menu02") && (b.mainContent.addClass("fixedSection"), e()) : (b.mainContent.hasClass("fixedSection") && b.section.hasClass("menu02") && (b.mainContent.removeClass("fixedSection"), e()), b.mainContentStartHeight = b.mainContent.outerHeight())
					} else b.section.css("position", "initial"), b.section.outerHeight(b.startHeight);
					else $(window).scrollTop() >= b.topOffset && a.section.MenuSettings.StickToTheTop ? (b.sectionWrapper.css("height", b.startHeight + "px"), b.section.css("position", "fixed"), b.section.css("top", 0), !b.mainContent.hasClass("fixedSection") && b.section.hasClass("menu02") && (b.mainContent.addClass("fixedSection"), e())) : (b.section.css("position", "initial"), b.section.outerHeight(b.startHeight), b.mainContent.hasClass("fixedSection") && b.section.hasClass("menu02") && (b.mainContent.removeClass("fixedSection"), e()))
				}), setTimeout(function() {
					pb.utils.onCreateEvents(a, ["updateContentImage_" + a.section.Guid, "applySectionBgStyle_" + a.section.Guid], function() {
						c()
					}, "Content Image Update"), pb.utils.onCreateEvents(a, ["changeSectionMenu" + a.section.Guid], function() {
						d()
					}, "Content Image Update")
				}, 1)
			}
		}
	}],
	sectionMenu02: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = pb.utils.isCSSSupportedByBrowser("position", "sticky") || pb.utils.isCSSSupportedByBrowser("position", "-webkit-sticky"),
					d = $("#section_" + a.section.Guid),
					e = b.find(".content"),
					f = a.section.FullHeight,
					g = d.height(),
					h = e.height(),
					i = b.find(".link-header-container"),
					j = b.find(".logo-section-container"),
					k = b.find(".navigation-container"),
					l = function(l) {
						l = void 0 == l ? !1 : l, setTimeout(function() {
							i = b.find(".link-header-container"), j = b.find(".logo-section-container"), k = b.find(".navigation-container"), f ? (d.find(".sectionContentWrapper").height(d.height()), e.height(d.height()), g = d.height(), h = e.height()) : 0 == l && (d.find(".height-inherit").removeClass("height-inherit"), e.height(e.height() + 160), d.height(d.height()), g = d.height(), h = e.height()), 1 == a.section.MenuSettings.StickToTheTop && c && m()
						}, 100)
					}, m = function() {
						$(document).off("scroll.menu02_" + a.section.Guid);
						var h = $("#div_" + a.section.Guid),
							i = 0,
							l = h.offset().top,
							m = l + h.outerHeight();
						setTimeout(function() {
							l = h.offset().top, m = l + h.outerHeight(), o(), $(document).on("scroll.menu02_" + a.section.Guid, function() {
								o()
							})
						}, 1e3);
						var o = function() {
							if (1 == a.section.MenuSettings.StickToTheTop && c) {
								i = $(window).scrollTop(), m = l + h.outerHeight();
								var o = 0,
									p = 0;
								if (j = b.find(".logo-section-container"), j.length > 0 && (p = j.outerHeight(), o = p > o ? p : o), k = b.find(".navigation-container"), k.length > 0 && (p = k.outerHeight(), o = p > o ? p : o), o += 40, i + o > m) {
									if (d.addClass("isSticky"), $("#div_" + a.section.Guid).addClass("sticky"), d.addClass("stickyIsActive"), e.addClass("collapsed"), d.addClass("auto-height"), f) {
										var q = $("#mainContent_" + a.section.Guid);
										if (q.length > 0) {
											var r = q.outerHeight();
											$("#sectionContentWrapper_" + a.section.Guid).height(r), d.css("min-height", r)
										}
									}
								} else if (m >= i - o && d.hasClass("isSticky")) {
									d.removeClass("isSticky"), $("#div_" + a.section.Guid).removeClass("sticky"), d.removeClass("stickyIsActive"), e.removeClass("collapsed"), d.removeClass("auto-height"), n();
									var s = i + g - o;
									window.scrollTo(0, s)
								}
							}
						}
					}, n = function() {
						f && (g = $(window).height(), $("#sectionContentWrapper_" + a.section.Guid).height(g), d.css("min-height", g))
					};
				pb.utils.setInterval(function() {
					return b.find(".content").height() > 10 ? !0 : void 0
				}, 10, 1e3).done(function() {
					l()
				}), pb.utils.resizeAndDestroy(a, "section menu2 resize", function() {
					l(!0), n()
				}), pb.utils.onCreateEvents(a, ["applySectionBgStyle_" + a.section.Guid, "changeSectionMenu" + a.section.Guid, "sectionSortCompleted"], function() {
					l(!0)
				}, "Event menu02"), pb.utils.onDestroy(a, function() {
					$(document).off("scroll.menu02_" + a.section.Guid)
				}, "Destroy menu02")
			}
		}
	}],
	sectionMenu04: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = pb.utils.isCSSSupportedByBrowser("position", "sticky") || pb.utils.isCSSSupportedByBrowser("position", "-webkit-sticky"),
					d = $("#section_" + a.section.Guid),
					e = $("#div_" + a.section.Guid),
					f = d.find(".sectionContentWrapper"),
					g = d.find(".threeLinesMenuIcon"),
					h = d.find("ul.first"),
					i = d.find(".content");
				i.removeClass("mobile"), g.hide(), $(".mainMenuIcon").remove();
				var j = function() {
					$(document).unbind();
					var b = a.section.FullHeight;
					if ($(document).off("scroll.menu04_" + a.section.Guid), a.section.MenuSettings.StickToTheTop && c) if (b) {
						f.addClass("sticky");
						var g = d.offset().top,
							h = $(window).scrollTop(),
							i = 0;
						$(document).on("scroll.menu04_" + a.section.Guid, function() {
							i = $(window).scrollTop();
							var a = $(window).height() - f.height();
							$(window).scrollTop() > g + a && i > h ? (e.css("top", -a), e.addClass("sticky")) : $(window).scrollTop() < g + a && h > i && e.removeClass("sticky"), h = i
						})
					} else f.removeClass("sticky"), e.addClass("sticky");
					else e.removeClass("sticky")
				}, k = function() {
					i.addClass("mobile"), g.show(), h.hide(), g.click(function() {
						a.section.FullHeight ? h.is(":visible") ? h.slideUp({
							duration: 300,
							progress: function() {
								var a = $(window).height() - f.height();
								e.css("top", -a)
							}
						}) : h.slideDown({
							duration: 300,
							progress: function() {
								var a = $(window).height() - f.height();
								e.css("top", -a)
							}
						}) : h.is(":visible") ? h.slideUp({
							duration: 300
						}) : h.slideDown({
							duration: 300
						})
					})
				};
				pb.utils.setInterval(function() {
					return b.find(".content").height() > 10 ? !0 : void 0
				}, 10, 1e3).done(function() {
					j(), pb.utils.isMobile() && k()
				}), setTimeout(function() {
					pb.utils.onCreateEvents(a, ["updateContentImage_" + a.section.Guid, "changeSectionMenu" + a.section.Guid, "sectionWidthChange_" + a.section.Guid, "changeSectionMenuLogo" + a.section.Guid, "applySectionBgStyle_" + a.section.Guid, "sectionSortCompleted"], function(b) {
						b == "sectionWidthChange_" + a.section.Guid || b == "changeSectionMenuLogo" + a.section.Guid || j()
					}, "Event menu04")
				}, 1), pb.utils.onDestroy(a, function() {
					$(document).off("scroll.menu04_" + a.section.Guid)
				}, "Destroy menu04")
			}
		}
	}],
	sectionMenu05: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = pb.utils.isCSSSupportedByBrowser("position", "sticky") || pb.utils.isCSSSupportedByBrowser("position", "-webkit-sticky"),
					d = $("#section_" + a.section.Guid),
					e = $("#div_" + a.section.Guid),
					f = function() {
						$(document).unbind();
						var b = a.section.FullHeight;
						if ($(document).off("scroll.menu04_" + a.section.Guid), a.section.MenuSettings.StickToTheTop && c) {
							var f = d.find(".sectionContentWrapper");
							if (b) {
								f.addClass("sticky");
								var g = d.offset().top,
									h = $(window).scrollTop(),
									i = 0;
								$(document).on("scroll.menu04_" + a.section.Guid, function() {
									i = $(window).scrollTop();
									var a = $(window).height() - f.height();
									$(window).scrollTop() > g + a && i > h ? (e.css("top", -a), e.addClass("sticky")) : $(window).scrollTop() < g + a && h > i && e.removeClass("sticky"), h = i
								})
							} else f.removeClass("sticky"), e.addClass("sticky")
						} else e.removeClass("sticky"), $(window).scrollTop(d.offset().top)
					};
				pb.utils.setInterval(function() {
					return b.find(".content").height() > 10 ? !0 : void 0
				}, 10, 1e3).done(function() {
					f()
				}), setTimeout(function() {
					pb.utils.onCreateEvents(a, ["updateContentImage_" + a.section.Guid, "changeSectionMenu" + a.section.Guid, "sectionWidthChange_" + a.section.Guid, "changeSectionMenuLogo" + a.section.Guid, "applySectionBgStyle_" + a.section.Guid, "sectionSortCompleted"], function(b) {
						b == "sectionWidthChange_" + a.section.Guid || b == "changeSectionMenuLogo" + a.section.Guid || f()
					}, "Event menu05")
				}, 1), pb.utils.onDestroy(a, function() {
					$(document).off("scroll.menu04_" + a.section.Guid)
				}, "Destroy menu05")
			}
		}
	}]
}, pbAng.dirs.sectionViews.maps = {
	sectionMap02: [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				var c = function() {
					pb.utils.executeOnObjectLoad(".content", function() {
						var a = b.find(".mapBox"),
							c = a.outerHeight();
						b.find(".container").height(c)
					}, 1e3)
				};
				c(), setTimeout(function() {
					pb.utils.onCreateEvents(a, ["updateContentImage_" + a.section.Guid, "applySectionBgStyle_" + a.section.Guid], function() {
						c()
					}, "Content Image Update"), pb.utils.onCreateEvents(a, ["changeSectionMenu" + a.section.Guid], function() {
						c()
					}, "Content Image Update")
				}, 1)
			}
		}
	}]
}, pbAng.dirs.sectionViews.common = {
	alignCenter: [function() {
		var a = function(a, b) {
			var c = parseInt(a.section.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-column-gap", d + "vw"), b.css("grid-row-gap", 1.5 * d + "vw")
		}, b = function(a, b) {
			var c = function(a) {
				return 0 == a ? 6 : 1 == a ? 5 : 2 == a ? 4 : 3 == a ? 3 : 4 == a ? 2 : 4
			}, d = c(a.section.ListImageSize);
			b.css("grid-template-columns", "repeat(" + d + ", 1fr)")
		}, c = ["$scope", "$element", function(c, d) {
			pb.utils.onCreateEvents(c, ["renderSectionItems" + c.section.Guid, "sectionImageMarginChange" + c.section.Guid, "sectionImageSizeChange" + c.section.Guid], function() {
				a(c, d), b(c, d)
			}, "new alignCenter")
		}];
		return {
			restrict: "A",
			controller: c,
			link: function(c, d) {
				setTimeout(function() {
					a(c, d), b(c, d)
				}, 1)
			}
		}
	}],
	sameRatio: [function() {
		var a = function(a, b) {
			var c = parseInt(a.section.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-gap", d + "vw")
		}, b = function(a, b) {
			var c = function(a) {
				return 0 == a ? 6 : 1 == a ? 5 : 2 == a ? 4 : 3 == a ? 3 : 4 == a ? 2 : 4
			}, d = a.ratio,
				e = c(a.section.ListImageSize),
				f = b.width(),
				g = parseInt(a.section.ListImageMargin),
				h = (f - (e - 1) * g) / (e * d),
				i = pb.utils.pxToVw(h);
			b.css("grid-template-columns", "repeat(" + e + ", 1fr)"), b.find("div.imageBox").height(i + "vw")
		}, c = function(a, b) {
			var c = a.figcap;
			b.find("figure").each(function() {
				var b = $(this).find("figcaption");
				"figBottom1" != c && b.css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b.addClass(c);
				var d = $(this).find(".image"),
					e = d.data("width") / d.data("height");
				e < a.ratio && d.addClass("smallerRatio")
			})
		}, d = ["$scope", "$element", function(d, e) {
			pb.utils.onCreateEvents(d, ["renderSectionItems" + d.section.Guid, "sectionImageMarginChange" + d.section.Guid, "sectionImageSizeChange" + d.section.Guid], function() {
				a(d, e), b(d, e), c(d, e)
			}, "new sameRatio")
		}];
		return {
			restrict: "A",
			controller: d,
			link: function(d, e, f) {
				d.ratio = f.ratio, d.figcap = f.figcap, setTimeout(function() {
					a(d, e), b(d, e), c(d, e)
				}, 1), ("centered" == d.site.DsnLayoutType || "left" == d.site.DsnLayoutType) && pb.utils.resizeAndDestroy(d, "sameRatio2", function() {
					b(d, e)
				})
			}
		}
	}],
	alignBottom: [function() {
		var a = function(a, b) {
			var c = !1,
				d = function(a) {
					if (c) return c;
					var b = 13;
					return 0 == a ? b = 8 : 1 == a ? b = 10 : 2 == a ? b = 13 : 3 == a ? b = 15 : 4 == a && (b = 17), c = b
				}, e = !1,
				f = function(a) {
					if (e) return e;
					var b = parseInt(a.section.ListImageMargin);
					return e = pb.utils.pxToVw(b)
				};
			b.find("figure").each(function() {
				var b = f(a);
				$(this).css("margin-right", b / 1.1 + "vw"), $(this).css("margin-left", b / 1.1 + "vw"), $(this).css("margin-top", b + "vw"), $(this).css("margin-bottom", b + "vw");
				var c = d(a.section.ListImageSize),
					e = 3 * Math.random() / 10 + 1;
				c *= e;
				var g = $(this).find(".image"),
					h = g.data("width") / g.data("height");
				$(this).width(h > 1 ? 1.67 * c + "vw" : h > 1.6 ? 2.2 * c + "vw" : c + "vw")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["renderSectionItems" + b.section.Guid, "sectionImageMarginChange" + b.section.Guid, "sectionImageSizeChange" + b.section.Guid], function() {
				a(b, c)
			}, "new alignBottom")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	horizontal: [function() {
		var a = function(a, b) {
			var c = !1,
				d = function(b) {
					if (c) return c;
					var d = 70;
					return 0 == b ? d = 48 : 1 == b ? d = 60 : 2 == b ? d = 70 : 3 == b ? d = 78 : 4 == b && (d = 84), "left" == a.site.DsnLayoutType && (d = 1.13 * d), c = d
				}, e = !1,
				f = function(a) {
					if (e) return e;
					var b = parseInt(a.section.ListImageMargin);
					return e = pb.utils.pxToVw(b)
				};
			b.find("figure").each(function() {
				var b = f(a);
				$(this).css("margin-right", b + "vw");
				var c = d(a.section.ListImageSize);
				$(this).find(".image").height(c + "vh")
			})
		}, b = function(a, b) {
			var c = a.figcap;
			b.find("figure").each(function() {
				var b = $(this).find("figcaption");
				"figBottom1" != c && b.css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b.addClass(c)
			})
		}, c = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["renderSectionItems" + b.section.Guid, "sectionImageMarginChange" + b.section.Guid, "sectionImageSizeChange" + b.section.Guid], function() {
				a(b, c)
			}, "horizontalNew")
		}];
		return {
			restrict: "A",
			controller: c,
			link: function(c, d, e) {
				c.figcap = e.figcap, $(".scrollNav").click(function() {
					var a = $(".gridContainer"),
						b = .8 * a.width();
					$(this).hasClass("back") ? a.animate({
						scrollLeft: "-=" + b
					}, 400) : a.animate({
						scrollLeft: "+=" + b
					}, 400)
				}), setTimeout(function() {
					a(c, d), b(c, d)
				}, 1), setTimeout(function() {
					b(c, d)
				}, 5e3)
			}
		}
	}],
	insideBoxes: [function() {
		var a = function(a, b) {
			b.find(".imageBox").each(function() {
				{
					var a = 1.618,
						b = $(this).width(),
						c = b / a,
						d = $(this).find(".image");
					d.data("width") / d.data("height")
				}
				$(this).height(c + "px")
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["renderSectionItems" + b.section.Guid, "sectionImageMarginChange" + b.section.Guid, "sectionImageSizeChange" + b.section.Guid], function() {
				a(b, c)
			}, "insideBoxes")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1), pb.utils.resizeAndDestroy(b, "insideBoxes", function() {
					a(b, c)
				})
			}
		}
	}],
	puzzle: [function() {
		var a = function(a, b) {
			var c = parseInt(a.section.ListImageMargin),
				d = pb.utils.pxToVw(c);
			b.css("grid-gap", d + "vw"), b.find("figure").each(function(b) {
				$(this).find("figcaption").css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), null !== a.site.ThumbDecorationBorderWidth && $(this).find("figcaption").css({
					top: a.site.ThumbDecorationBorderWidth,
					left: a.site.ThumbDecorationBorderWidth
				}), $(this).find("figcaption").css("background-color", pb.utils.getTransparentColor(a.site.BgBoxColor, .7)), b / 8 % 1 === 0 && ("centered" == a.site.DsnLayoutType ? $(this).css("height", 480 + c + "px") : $(this).css("height", 42 + d + "vw"))
			})
		}, b = ["$scope", "$element", function(b, c) {
			pb.utils.onCreateEvents(b, ["renderSectionItems" + b.section.Guid, "sectionImageMarginChange" + b.section.Guid, "sectionImageSizeChange" + b.section.Guid], function() {
				a(b, c)
			}, "puzzle01")
		}];
		return {
			restrict: "A",
			controller: b,
			link: function(b, c, d) {
				b.ratio = d.ratio, b.figcap = d.figcap, setTimeout(function() {
					a(b, c)
				}, 1)
			}
		}
	}],
	dynamicGrid: [function() {
		var a = pb.environment.isMobile,
			b = 16,
			c = function(c, d, e) {
				var f = void 0 == c.site.ThumbDecorationBorderWidth ? 0 : parseInt(c.site.ThumbDecorationBorderWidth),
					g = function(b) {
						if (a) {
							var c = $("main").width();
							return 400 >= c ? 1 : 700 >= c ? 2 : 3
						}
						return 0 == b ? 6 : 1 == b ? 5 : 2 == b ? 4 : 3 == b ? 3 : 4 == b ? 2 : 4
					}, h = function(a, b, c, d) {
						var e = a.width() / $(window).width() * 100;
						return (e - (b - 1) * c) / b - d
					}, i = g(c.section.ListImageSize),
					j = a ? b : parseInt(c.section.ListImageMargin),
					k = pb.utils.pxToVw(j),
					l = pb.utils.pxToVw(f);
				l *= 2;
				for (var m = h(d, i, k, l), n = {}, o = 0; i > o; o++) n[o] || (n[o] = {
					top: 0
				});
				var p = 0,
					q = 0;
				d.find("figure").each(function() {
					var a = $(this),
						b = a.find(".image"),
						d = b.data("width") / b.data("height"),
						e = m / d;
					b.height(e + "vw"), b.width(m + "vw"), a.css("margin-bottom", k + "vw"), a.find("figcaption").css("background-color", "transparent" == c.site.BgBoxColor ? "transparent" : pb.utils.getTransparentColor(c.site.BgBoxColor, .7));
					for (var f = i; f > 0; f--) n[f - 1].top <= q && (q = n[f - 1].top, p = f - 1);
					var g = n[p].top + k + l,
						h = p * (m + k + l);
					a.css("top", g + "vw"), a.css("left", h + "vw"), n[p].top = g + e, q = n[p].top
				});
				for (var r = 0, s = 0; i > s; s++) n[s].top > r && (r = n[s].top);
				d.height(r + "vw"), void 0 != e && angular.isFunction(e) && e()
			}, d = ["$scope", "$element", function(a, b) {
				pb.utils.onCreateEvents(a, ["renderSectionItems" + a.section.Guid, "sectionImageMarginChange" + a.section.Guid, "sectionImageSizeChange" + a.section.Guid], function() {
					c(a, b)
				}, "dynamicGridNew")
			}];
		return {
			restrict: "A",
			controller: d,
			link: function(b, d, e) {
				b.ratio = e.ratio, b.figcap = e.figcap;
				var f = d.width(),
					g = function() {
						setTimeout(function() {
							c(b, d, function() {
								a && setTimeout(function() {
									f != d.width() && c(b, d, !1)
								}, 10)
							})
						}, 1)
					};
				g(), a && (setTimeout(function() {
					f != d.width() && c(b, d, !1)
				}, 1e3), pb.utils.resizeAndDestroy(b, "galleryNewDynamicGrid", function() {
					g()
				}))
			}
		}
	}]
}, pbAng.dirs.carousel = [function() {
	var a = function(a, b, c) {
		a.carousel = {};
		var d, e = 5e3,
			f = 350,
			g = $("#carousel_container_" + a.section.Guid + " .item"),
			h = [],
			i = !1,
			j = $("#section_" + a.section.Guid);
		j.on("swiperight", function() {
			console.log("Swipe Right"), i || a.carousel.showNextSlide(-1)
		}), j.on("swipeleft", function() {
			console.log("Swipe Left"), i || a.carousel.showNextSlide(1)
		});
		var k = "fade";
		switch (c.fx) {
			case "fade":
				k = "fade";
				break;
			case "slide":
				k = "slide";
				break;
			default:
				k = "fade"
		}
		a.carousel.setHeight = function() {
			a.carousel.checkSlides();
			var b, c, d = 0;
			for (g.show(), b = 0; b < a.section.ListItems.length; b++) c = $("#details_" + a.section.ListItems[b].Guid), c.css("height", "auto"), d < c.outerHeight(!0) && (d = c.outerHeight(!0));
			for (b = 0; b < a.section.ListItems.length; b++) c = $("#details_" + a.section.ListItems[b].Guid), c.css("height", d + "px");
			var e = 30,
				f = 400 + d + e;
			$("#constantSizeContainer_" + a.section.Guid).css("height", f + "px"), g.hide()
		}, a.carousel.checkSlides = function() {
			a.section.ListItems && a.section.ListItems.length !== g.length && (g = $("#carousel_container_" + a.section.Guid + " .item"))
		}, a.carousel.checkHeaders = function() {
			for (var b = 0; b < a.section.ListItems.length; b++) if (h[b] !== a.section.ListItems[b].Header) {
				for (var c = 0; c < a.section.ListItems.length; c++) h[c] = a.section.ListItems[c].Header;
				return !0
			}
			return !1
		}, a.carousel.startSlideshow = function() {
			a.section.ListItems && a.section.ListItems.length > 1 ? (a.carousel.checkHeaders(), a.carousel.setHeight(), clearInterval(d), a.carousel.showFirstSlide(), d = setInterval(a.carousel.showNextSlide, e)) : d || (d = setInterval(a.carousel.startSlideshow, e))
		}, a.carousel.showFirstSlide = function() {
			i = !0, "fade" === k ? $("#carousel_container_" + a.section.Guid + " .item:first").show("fade", f, function() {
				i = !1
			}) : "slide" === k ? $("#carousel_container_" + a.section.Guid + " .item:first").show("slide", {
				direction: "right"
			}, f, function() {
				i = !1
			}) : $("#carousel_container_" + a.section.Guid + " .item:first").show(function() {
				i = !1
			}), $("#carousel_container_" + a.section.Guid + " .dot:first").addClass("active")
		}, a.carousel.showSlide = function(b) {
			a.carousel.checkSlides();
			var c = $("#" + b),
				d = $("#dot_" + b),
				e = $("#carousel_container_" + a.section.Guid + " .item:visible"),
				g = $("#carousel_container_" + a.section.Guid + " .dot.active");
			i = !0, "fade" === k ? e.hide("fade", f, function() {
				c.show("fade", f, function() {
					i = !1
				})
			}) : "slide" === k ? e.hide("slide", {
				direction: "left"
			}, f, function() {
				c.show("slide", {
					direction: "right"
				}, f, function() {
					i = !1
				})
			}) : e.hide(function() {
				c.show(function() {
					i = !1
				})
			}), g.removeClass("active", function() {
				d.addClass("active")
			})
		}, a.carousel.showNextSlide = function(b) {
			if (a.section.ListItems && a.section.ListItems.length > 0) if (a.carousel.checkHeaders()) $("#carousel_container_" + a.section.Guid + " .dot.active").removeClass("active"), a.carousel.startSlideshow();
			else {
				var c = $("#carousel_container_" + a.section.Guid + " .item:visible"),
					d = b >= 0 || void 0 === b ? c.next() : c.prev(),
					e = d.attr("id");
				void 0 === e && (d = $("#carousel_container_" + a.section.Guid + " .item:first"), e = d.attr("id")), a.carousel.showSlide(e)
			}
		}, a.carousel.showSlideAndResetTiming = function(b) {
			i || (clearInterval(d), a.carousel.showSlide(b), d = setInterval(a.carousel.showNextSlide, e))
		}, a.carousel.getImage = function(a) {
			return pbAng.filters.misc.pboxImage()(a.FileName, a.S3LocationId)
		}, setTimeout(function() {
			a.carousel.startSlideshow()
		}, 1), pb.utils.onDestroy(a, function() {
			clearInterval(d), a = null
		}, "Carousel"), a.carousel.getMobileFontSizeClassName = function(a, b) {
			if (a.Header && a.Subheader) {
				if (0 == b) return a.Header && a.Header.FontSize && a.Header.Title && a.Subheader && a.Subheader.FontSize && a.Subheader.Title && parseInt(a.Subheader.FontSize) > parseInt(a.Header.FontSize) ? "mobileFitFontMedium" : "mobileFitFontLarge";
				if (1 == b) return a.Subheader && a.Header.FontSize && a.Header.Title && parseInt(a.Subheader.FontSize) >= parseInt(a.Header.FontSize) ? "mobileFitFontLarge" : "mobileFitFontMedium"
			}
			return ""
		}
	};
	return {
		restrict: "E",
		link: a,
		replace: !0,
		templateUrl: "application/views/app/dirs/carousel/carousel.html"
	}
}], pbAng.dirs.linkHeader = [function() {
	return {
		restrict: "E",
		scope: {
			section: "=",
			page: "=",
			site: "="
		},
		controller: ["$scope", "$element", function(a) {
			var b = pb.utils.getFontSizeClassNames(),
				c = b.fontClassNames;
			if (a.linkHeader = {
				isSection: a.section,
				getHeaderStyle: function(a) {
					var b = {};
					a.FontColor && (b.color = a.FontColor), a.FontSize && (b["font-size"] = a.FontSize), a.FontFamily && (b["font-family"] = a.FontFamily);
					var c = parseInt(a.LetterSpace);
					a.LetterSpace && (b["letter-spacing"] = a.LetterSpace, b["margin-right"] = c > 0 ? "-" + c + "px" : c - 2 * c + "px"), b["text-transform"] = 1 == a.IsUppercase ? "uppercase" : "none";
					var d = pb.utils.getCssStyleAndWeight(a.FontVariant);
					return d && (b["font-style"] = d["font-style"], b["font-weight"] = d["font-weight"]), b
				},
				getBoxColor: function() {
					var b = {};
					return a.section && 1009 == a.section.DsnOnepagerTemplateId && (b["background-color"] = a.site.BgBoxColor), b
				},
				getMobileFontSizeClassName: function(d) {
					var e = !1;
					if (a.section ? a.section.LinkHeaders && (e = a.section.LinkHeaders) : a.page.LinkHeaders && (e = a.page.LinkHeaders), e) {
						var f = e[0] && e[0].FontSize && e[0].Title ? parseInt(e[0].FontSize) : 0,
							g = e[1] && e[1].FontSize && e[1].Title ? parseInt(e[1].FontSize) : 0,
							h = b.getArrayPos(f),
							i = b.getArrayPos(g),
							j = 0;
						if (0 == d) g > f && i == h ? (h -= 1, j = 0 > h ? 0 : h) : j = h;
						else if (1 == d) {
							var k = c.length - 1;
							g > f && i == h ? (i += 1, j = i > k ? k : i) : f > g && i == h ? (i -= 1, j = 0 > i ? 0 : i) : j = i
						}
						return c[j]
					}
					return ""
				},
				showLinkHeader1: !1,
				showLinkHeader2: !1
			}, a.section && a.section.Properties) a.section.Properties.forEach(function(b) {
				"link-header-section-prop" == b.type && (0 == b.settings.index ? a.linkHeader.showLinkHeader1 = !0 : 1 == b.settings.index && (a.linkHeader.showLinkHeader2 = !0))
			});
			else if (a.page && a.page.DsnTemplateProperties) {
				var d = a.page.DsnTemplateProperties.filter(function(a) {
					return "link-header-prop" == a.type
				});
				2 == d.length && void 0 != d[0].settings && (a.linkHeader.showLinkHeader1 = void 0 != d[0].settings.showLink ? 1 == d[0].settings.showLink ? !0 : !1 : !0, a.linkHeader.showLinkHeader2 = void 0 != d[1].settings.showLink ? 1 == d[1].settings.showLink ? !0 : !1 : !0)
			}
		}],
		replace: !0,
		templateUrl: "application/views/app/dirs/link-header/link-header.html"
	}
}], pbAng.dirs.buttons = [function() {
	return {
		restrict: "E",
		scope: {
			section: "=",
			page: "=",
			site: "="
		},
		controller: ["$scope", "$element", function(a) {
			var b = "onepager" == a.page.DsnTemplateType && a.section ? !0 : !1;
			a.pageOrSection = b ? a.section : a.page;
			var c = {};
			a.buttons = {
				getStyle: function(a, b) {
					var d = {};
					d["font-size"] = a.FontSize;
					parseInt(a.FontSize);
					return d.padding = a.FontSize.substring(a.FontSize.length - 2, 0) + "px " + 2 * a.FontSize.substring(a.FontSize.length - 2, 0) + "px", d["border-radius"] = a.FontSize.substring(a.FontSize.length - 2, 0) / 3 + "px", d["letter-spacing"] = a.LetterSpace, d.color = a.FontColor, d.margin = "10px", d["background-color"] = a.BgColor, d["text-transform"] = 1 == a.IsUppercase ? "uppercase" : "none", c[b] || (c[b] = !0, $("#button_" + a.Guid).hover(function() {
						$(this).css("background-color", a.HoverColor)
					}, function() {
						$(this).css("background-color", a.BgColor)
					})), d
				}
			}
		}],
		replace: !0,
		templateUrl: "application/views/app/dirs/buttons/buttons.html"
	}
}], pbAng.dirs.links = [function() {
	return {
		restrict: "E",
		scope: {
			section: "=",
			page: "=",
			site: "="
		},
		controller: ["$scope", "$element", function(a, b) {
			a.links = {
				getHeaderStyle: function(b) {
					var c = {};
					return 1 == b.AsButton ? c.color = a.site.ButtonTextColor : b.Color && (c.color = b.Color), b.FontSize && (c["font-size"] = b.FontSize), b.LinkFontFamily && (c["font-family"] = b.LinkFontFamily), b.BottomPadding && (c["padding-bottom"] = b.BottomPadding, (1002 == a.section.DsnOnepagerTemplateId || 1008 == a.section.DsnOnepagerTemplateId) && (c["padding-right"] = b.BottomPadding, c["padding-bottom"] = 0)), c
				},
				getButtonStyle: function(c) {
					var d = b.find(".linkButton"),
						e = {};
					return 1 == c.AsButton ? (1 == c.Shadow ? d.addClass("shadow") : d.removeClass("shadow"), e["background-color"] = 1 == c.ButtonBgColor && a.site.ButtonColor ? a.site.ButtonColor : "transparent", c.ButtonPadding && (e.padding = c.ButtonPadding), c.ButtonRadius && (e["border-radius"] = c.ButtonRadius), e.border = 1 == c.ButtonBorder ? "2px solid " + a.site.ButtonTextColor : "none", 1 == c.ButtonBgHoverColor ? d.mouseenter(function() {
						$(this).css({
							"background-color": a.site.ButtonHoverColor
						})
					}).mouseleave(function() {
						$(this).css({
							"background-color": e["background-color"]
						})
					}) : (d.off("mouseenter"), d.off("mouseleave"))) : (e.padding = 0, e["border-radius"] = 0, e["background-color"] = "transparent", e.border = "none", d.removeClass("shadow"), d.off("mouseenter"), d.off("mouseleave")), e
				}
			}
		}],
		replace: !0,
		templateUrl: "application/views/app/dirs/links/links.html"
	}
}], pbAng.dirs.linksPage = [function() {
	return {
		restrict: "E",
		controller: ["$scope", "$element", function(a) {
			var b = pb.utils.getFontSizeClassNames(),
				c = b.fontClassNames;
			a.linksPageDir = {
				getHeaderStyle: function() {
					var b = {};
					if (a.page.LinkSettings) {
						a.page.LinkSettings.Color && (b.color = a.page.LinkSettings.Color), a.page.LinkSettings.FontSize && (b["font-size"] = a.page.LinkSettings.FontSize), a.page.LinkSettings.LinkFontFamily && (b["font-family"] = a.page.LinkSettings.LinkFontFamily), a.page.LinkSettings.LetterSpace && (b["letter-spacing"] = a.page.LinkSettings.LetterSpace), b["text-transform"] = 1 == a.page.LinkSettings.IsUppercase ? "uppercase" : "none";
						var c = pb.utils.getCssStyleAndWeight(a.page.LinkSettings.FontVariant);
						c && (b["font-style"] = c["font-style"], b["font-weight"] = c["font-weight"])
					}
					return b
				},
				getMobileFontSizeClassName: function() {
					if (a.page.LinkSettings) {
						var d = b.getArrayPos(parseInt(a.page.LinkSettings.FontSize));
						return c[d]
					}
					return ""
				}
			}
		}],
		replace: !0,
		templateUrl: "application/views/app/dirs/links-page/links-page.html"
	}
}], pbAng.dirs.pbGallerySection = [function() {
	var a = '<div id="gallery_container_{{::section.Guid}}" class="gallery gallery-container clearfix"><figure id="figure_{{::item.Guid}}" ng-repeat="item in section.GalleryItems | orderBy:\'Idx\' track by item.Guid " ng-click="pbGallerySection.openItem(item)"><div id="imageBox_{{::item.Guid}}" class="imageBox"><img id="img_{{::item.Guid}}" gallery-thumb pb-nice-load ng-class="{noPicview : page.DznPicviewGuid == 1}" data-filename="{{::item.FileName}}" ng-src="{{::item.src}}" pb-gallery-err-img-src item="::item" s3id={{::item.S3LocationId}} size="{{::pbGallerySection.thumbSize}}" class="image"alt="{{::base.getImgAltOrPageTitle(item.ListText)}}" data-height="{{::item.Height}}" data-width="{{::item.Width}}"/></div><figcaption class="galleryFigCaption" ng-if="section.DoShowGalleryItemListText != 0 && item.ListText" bind-unsafe-html="item.ListText"></figcaption></figure></div>',
		b = ["$scope", "$element", function(a, b) {
			a.pbGallerySection = {
				thumbSize: void 0 == a.thumbSize ? "w400" : "" == a.thumbSize ? void 0 : a.thumbSize,
				openItem: function(b) {
					if ("goToItem" == a.whenClick) sliderH.goToItem(a.section.Guid, b.Idx), 1 == a.whenClickScroll && setTimeout(function() {
						a.base.broadCast("sectionScrollToPosition", {
							Id: a.section.Guid
						})
					}, 1);
					else {
						var c, d, e;
						if (1 == a.section.DznPicviewGuid) return !1;
						10 == a.section.DznPicviewGuid && (c = sliderH.settingsH.getSettingsForPage(a.section), d = a.section.Guid, e = a.section.GalleryItems || [], sliderH.openInPopup(d, e, b.Idx, c), pb.utils.setStylesOnLightBox(a, c))
					}
				}
			};
			var c = function() {
				setTimeout(function() {
					b.find(".imageBox").css("border-color", a.site.ThumbDecorationBorderColor), b.find(".imageBox").find("img").css("border-color", a.site.ThumbDecorationBorderColor)
				}, 1)
			}, d = function() {
				pb.utils.changeFigStyles(a, ".galleryFigCaption", "gallery style")
			};
			pb.utils.watchFontStyles(a, ".galleryFigCaption", "Gallery Font Styles"), pb.utils.onCreateEvents(a, ["changeImageBorderColor", "editSectionListText", "updateAfterRenderComplete" + a.section.Guid], function(b, e, f) {
				"changeImageBorderColor" == b ? c() : "editSectionListText" == b && "gallery" == f ? (d(), a.base.broadCast("renderSectionItems" + a.section.Guid, {
					Guid: a.section.Guid
				})) : b == "updateAfterRenderComplete" + a.section.Guid && f.Guid == a.section.Guid && (c(), d())
			}, "Section Gallery")
		}];
	return {
		restrict: "E",
		replace: !0,
		template: a,
		scope: {
			page: "=",
			section: "=",
			site: "=",
			base: "=",
			parentPage: "=",
			thumbSize: "@",
			whenClick: "@",
			whenClickScroll: "@"
		},
		controller: b
	}
}], pbAng.dirs.pbBlogSection = ["$location", function() {
	var a = ["$scope", "$element", "$filter", function(a, b, c) {
		var d = function() {
			var b = [];
			if (a.section.Blog && a.section.Blog.BlogPageGuid && a.section.Blog.NrOfPosts && a.section.Blog.BlogPageUri) {
				var c = pb.utils.findItemFromArray(pb.data.pages, "Uri", a.section.Blog.BlogPageUri);
				if (c) {
					if (c.BlogPosts.length > 0) {
						var d = a.section.Blog.NrOfPosts,
							e = 0;
						c.BlogPosts = pb.utils.sortByKey(c.BlogPosts, "PostDate").reverse(), c.BlogPosts.some(function(a) {
							if (1 == a.IsPublished) {
								var c = pb.utils.findItemFromArray(a.BlogGalleryItems, "Idx", 0);
								a.PostGalleryItem = c ? c : !1, b.push(a), e++
							}
							return e == d ? !0 : void 0
						})
					}
					a.section.BlogPosts = b
				}
			}
		};
		pb.environment.isAdmin && d(), a.blog = {
			getPostLink: function(b) {
				var d = "/" + a.section.Blog.BlogPageUri + "/" + b.Url;
				return c("link")(d)
			},
			openShareDialog: function(b) {
				a.base.popup.open("sharepost", null, b)
			},
			getPostLinkWithComment: function(b) {
				var d = "/" + a.section.Blog.BlogPageUri + "/" + b.Url + "?c=1";
				return c("link")(d)
			}
		};
		var e = !1;
		pb.utils.onCreateEvents(a, ["updateAfterRenderComplete" + a.section.Guid], function(b, c, d) {
			b == "updateAfterRenderComplete" + a.section.Guid && d.Guid == a.section.Guid && 0 == e && (e = !0, a.base.broadCast("renderSectionItems" + a.section.Guid, {
				Guid: a.section.Guid
			}))
		}, "Section Blog")
	}];
	return {
		restrict: "E",
		scope: {
			page: "=",
			section: "=",
			site: "=",
			base: "="
		},
		controller: a,
		replace: !0,
		templateUrl: "application/views/app/dirs/blog-section/blog-section.html"
	}
}], pbAng.dirs.menuElementSection = ["$location", "$route", function(a) {
	var b = '<li id="menuList_{{section.Guid}}" class="top" ng-style="menuElementSection.geHiddenHierarchyBoxColor()" ng-repeat="element in section.SectionMenuElements |orderBy: \'Idx\' track by element.Guid"><a id="topmenu{{$index}}{{element.Guid}}" class="menuLink_{{section.Guid}}" target="{{element.Target}}" link-target="{{element.Target}}" ng-style="menuElementSection.getStyles(element,\'topmenu\', $index)" link-guid-to-page-section guid="{{section.Guid}}" link-page="{{element.PageGuid}}" link-section="{{element.LinkSectionGuid}}" link-url="{{element.Url}}" ng-bind-html="element.Title"></a><ul class="second" ng-style="menuElementSection.geHiddenHierarchyBg(section.BgColor,section.MenuSettings.FontColor)" ng-if="element.Children && element.Children.length > 0"><li class="middle" ng-repeat="child in element.Children track by child.Guid"><a id="middlemenu{{$index}}{{child.Guid}}" class="menuLink_{{section.Guid}}" target="{{child.Target}}" link-target="{{child.Target}}" ng-style="menuElementSection.getStyles(child, \'middlemmenu\', $index)" link-guid-to-page-section guid="{{section.Guid}}" link-page="{{child.PageGuid}}" link-section="{{child.LinkSectionGuid}}" link-url="{{child.Url}}" ng-bind-html="child.Title"></a><ul class="third" ng-if="child.Children && child.Children.length > 0"><li class="bottom" ng-repeat="gChild in child.Children track by gChild.Guid"><a id="bottommenu{{$index}}{{gChild.Guid}}" class="menuLink_{{section.Guid}}" target="{{gChild.Target}}" link-target="{{gChild.Target}}" ng-style="menuElementSection.getStyles(gChild, \'bottommenu\', $index)" link-guid-to-page-section guid="{{section.Guid}}" link-page="{{gChild.PageGuid}}" link-section="{{gChild.LinkSectionGuid}}" link-url="{{gChild.Url}}" ng-bind-html="gChild.Title"></a></li></ul></li></ul></li>',
		c = ["$scope", "$element", "$attrs", function(b) {
			var c = $("li.top").find(".menuLink_" + b.section.Guid),
				d = $(".logo_" + b.section.Guid);
			b.menuElementSection = {}, b.menuElementSection.getStyles = function(c, d, e) {
				var f = {};
				if (void 0 != c.Guid && b.section && b.section.Guid == c.LinkSectionGuid && void 0 != d && void 0 != e) {
					var g = a.url();
					if (0 == pb.utils.isMenuUrlMatchedWithPrivateUrl(g)) {
						$(".menu li.top a").removeClass("active");
						var h = "#" + d.trim() + e + c.Guid;
						$(h).addClass("active"), b.section.MenuSettings.ActiveMenuFontColor && (f.color = b.section.MenuSettings.ActiveMenuFontColor, setTimeout(function() {
							$(h).css("color", b.section.MenuSettings.ActiveMenuFontColor)
						}, 1)), 1 == b.section.MenuSettings.ActiveMenuFontIsBold && (f["font-weight"] = "bold", setTimeout(function() {
							$(h).css("font-weight", "bold")
						}, 1)), 1 == b.section.MenuSettings.ActiveMenuFontIsItalic && (f["font-style"] = "italic", setTimeout(function() {
							$(h).css("font-style", "italic")
						}, 1)), 1 == b.section.MenuSettings.ActiveMenuFontIsUnderline && (f["text-decoration"] = "underline", setTimeout(function() {
							$(h).css("text-decoration", "underline")
						}, 1))
					}
				}
				return f
			}, b.menuElementSection.geHiddenHierarchyBg = function(a, c) {
				var d = {};
				if (b.menuElementSection.attr.hiddenHierarchy) {
					var e = pb.utils.getTransparentColor(a, .8);
					d["background-color"] = e;
					var f = pb.utils.getTransparentColor(c, .3);
					d["border-color"] = f
				}
				return d
			}, b.menuElementSection.getFirstElemStyle = function() {
				var a = {};
				return a["background-color"] = b.site.MenuBoxColor, a
			};
			var e = function() {
				c.css("color", b.section.MenuSettings.FontColor), f()
			}, f = function() {
				pb.utils.hover("#menuList_" + b.section.Guid + " a", b.section.MenuSettings.FontColorHover, b.section.MenuSettings.FontColor)
			}, g = function() {
				c.css("font-family", b.section.MenuSettings.FontFamily)
			}, h = function() {
				var a = pb.utils.getCssStyleAndWeight(b.section.MenuSettings.FontVariant);
				"" != a["font-style"] && c.css("font-style", a["font-style"]), "" != a["font-weight"] && c.css("font-weight", a["font-weight"]), c.css("text-decoration", "none")
			}, i = function() {
				c.css("font-size", b.section.MenuSettings.FontSize)
			}, j = function() {
				var a = 1 == b.section.MenuSettings.FontUpperCase ? "uppercase" : "";
				c.css("text-transform", a)
			}, k = function() {
				c.css("letter-spacing", parseInt(b.section.MenuSettings.FontSpacing) / 4 + "px");
				var a = parseInt(b.section.MenuSettings.FontSpacing) / 4 * .7;
				c.css("letter-spacing", a + "px")
			}, l = function(a) {
				pb.utils.setInterval(function() {
					return c = $("li.top").find(".menuLink_" + b.section.Guid), d = $(".logo_" + b.section.Guid), c.length > 0 || d.length > 0 ? !0 : void 0
				}, 1, 100, {
					scope: b
				}).done(function() {
					"FontColor" == a ? e() : "FontColorHover" == a ? f() : "FontFamily" == a ? (g(), h()) : "FontSize" == a ? i() : "FontUpperCase" == a ? j() : "FontSpacing" == a ? k() : (e(), f(), g(), i(), j(), k(), h())
				})
			};
			l(), pb.utils.onCreateEvents(b, ["changeSectionMenuStyle" + b.section.Guid, "changeSectionMenu" + b.section.Guid], function(a, c, d) {
				d && d.Guid == b.section.Guid && (a == "changeSectionMenuStyle" + b.section.Guid ? (l(d.Message), !d.Message) : a == "changeSectionMenu" + b.section.Guid && l())
			}, "Section Menu"), pb.utils.onDestroy(b, function() {
				$(window).off("scroll.sectionMenuScroll")
			}, "Destroy section sticky scroller")
		}];
	return {
		template: b,
		restrict: "E",
		controller: c,
		replace: !1,
		link: function(a, b, c) {
			a.menuElementSection.attr = c, c.hiddenHierarchy && (b.on("mouseover", ".top", function() {
				$(this).addClass("hover").find("ul.second").show()
			}), b.on("mouseout", ".top", function() {
				$(this).removeClass("hover").find("ul.second").hide()
			}))
		}
	}
}], pbAng.dirs.logoSection = ["$location", "$route", function() {
	var a = '<div class="sectionLogo logo_{{section.Guid}}"><div link-guid-to-page-section guid="{{section.Guid}}" link-page="{{section.LogoSettings.LinkPageGuid}}" link-section="{{section.LogoSettings.LinkSectionGuid}}" link-url="{{section.LogoSettings.Url}}"><span ng-if="section.LogoSettings.DoUseFile != 1" class="animated fadeIn fastAnimation sectionLogoText sectionLogoText_{{section.Guid}}" bind-unsafe-html="section.LogoSettings.Text"></span><span ng-if="section.LogoSettings.DoUseFile == 1"><img ng-if="section.LogoSettings.Path" class="animated fadeIn fastAnimation sectionLogoImage sectionLogoImage_{{section.Guid}}" ng-src="{{section.LogoSettings.Path}}" alt=""/></span></div><span class="mainMenuIcon icon icon-menu-web2" ng-click="logoSection.toggleMenu(section.Guid)" pb-style="{\'color\': section.LogoSettings.FontColor}"></span></div>',
		b = ["$scope", "$element", "$attrs", function(a) {
			var b = $(".sectionLogoText_" + a.section.Guid),
				c = $(".sectionLogoImage_" + a.section.Guid),
				d = pb.utils.isMobile() || pb.utils.isTablet(),
				e = pb.utils.getFontSizeClassNames(),
				f = e.fontClassNames;
			a.logoSection = {
				toggleMenu: function(a) {
					$("#section_menu_" + a).find("ul.first").slideToggle("fast")
				}
			};
			var g = function() {
				b.css("color", a.section.LogoSettings.FontColor)
			}, h = function() {
				b.css("font-family", a.section.LogoSettings.FontFamily)
			}, i = function() {
				var c = pb.utils.getCssStyleAndWeight(a.section.LogoSettings.FontVariant);
				"" != c["font-style"] && b.css("font-style", c["font-style"]), "" != c["font-weight"] && b.css("font-weight", c["font-weight"]), b.css("text-decoration", "none")
			}, j = function() {
				if (d) {
					var c = e.getArrayPos(parseInt(a.section.LogoSettings.FontSize)),
						g = f[c];
					b.addClass(g)
				} else b.css("font-size", a.section.LogoSettings.FontSize)
			}, k = function() {
				var c = 1 == a.section.LogoSettings.FontUpperCase ? "uppercase" : "";
				b.css("text-transform", c)
			}, l = function() {
				b.css("letter-spacing", parseInt(a.section.LogoSettings.FontSpacing) / 4 + "px");
				var c = parseInt(a.section.LogoSettings.FontSpacing) / 4 * .7;
				b.css("letter-spacing", c + "px")
			}, m = function() {
				var b = "30px";
				a.section.LogoSettings.DisplayHeight && (b = a.section.LogoSettings.DisplayHeight);
				var c = $(".sectionLogoImage_" + a.section.Guid);
				pb.utils.setInterval(function() {
					return c = $(".sectionLogoImage_" + a.section.Guid), c.length > 0 && c.height() > 0 ? !0 : void 0
				}, 1, 1e3, {
					scope: a
				}).done(function() {
					var d = a.section.LogoSettings.Width / a.section.LogoSettings.Height,
						e = d * parseInt(b),
						f = $("#mainContent_" + a.section.Guid);
					if (f.length > 0) {
						var g = f.width();
						e > g && (b = g / d, e = d * b)
					}
					c.css({
						height: b,
						width: e + "px"
					})
				})
			}, n = function(d) {
				pb.utils.setInterval(function() {
					return b = $(".sectionLogoText_" + a.section.Guid), c = $(".sectionLogoImage_" + a.section.Guid), b.length > 0 || c.length > 0 ? !0 : void 0
				}, 1, 1e3, {
					scope: a
				}).done(function() {
					"FontColor" == d ? g() : "FontFamily" == d ? (h(), i()) : "FontSize" == d ? j() : "FontUpperCase" == d ? k() : "FontSpacing" == d ? l() : "DisplayHeight" == d ? m() : a.section.LogoSettings && 1 == a.section.LogoSettings.DoUseFile ? m() : (g(), h(), j(), k(), l(), i())
				})
			};
			n(), pb.utils.onCreateEvents(a, ["changeSectionMenuLogo" + a.section.Guid, "sectionWidthChange_" + a.section.Guid], function(b, c, d) {
				d && d.Guid == a.section.Guid ? b == "changeSectionMenuLogo" + a.section.Guid && n(d.Message) : b == "sectionWidthChange_" + a.section.Guid && n("DisplayHeight")
			}, "Section Menu Logo")
		}];
	return {
		template: a,
		restrict: "E",
		controller: b,
		replace: !1
	}
}], pbAng.dirs.pbCollectionSection = ["$location", "$filter", "$compile", function(a, b) {
	var c = '<div id="collection_container_{{::section.Guid}}" class="collection collection-container clearfix"><figure id="figure_{{::colPage.Guid}}" ng-repeat="colPage in section.CollectionPages |orderBy: \'Idx\' track by colPage.PageGuid" ng-click="pbCollectionSection.openPage(colPage)"><div id="imageBox_{{::colPage.Guid}}" class="imageBox" ng-if="pbCollectionSection.hasImage(colPage)" ><a href="javascript:void(0)"><img id="img_{{::colPage.Guid}}" data-filename="{{::colPage.ListThumb.FileName}}" ng-src="{{::pbCollectionSection.listImageSrc(colPage)}}" pb-gallery-err-img-src s3id={{::colPage.ListThumb.S3LocationId}} size="{{::pbCollectionSection.thumbSize}}" data-width="{{::pbCollectionSection.listImageWidth(colPage)}}" data-height="{{::pbCollectionSection.listImageHeight(colPage)}}" class="image" pb-nice-load alt="{{::base.getImgAltOrPageTitle(colPage.ListTitle)}}" </a></div><div id="imageBox_{{::colPage.Guid}}" class="imageBox noImage" pb-style="base.getBoxBGColor()" ng-if="!pbCollectionSection.hasImage(colPage)" ng-click="pbCollectionSection.openPage(colPage)"></div><figcaption ng-if="colPage.ListTitle"><a class="collectionFigCaption" href="javascript:void(0)" bind-unsafe-html="colPage.ListTitle"></a></figcaption></figure></div>',
		d = ["$scope", "$element", function(c, d) {
			c.pbCollectionSection = {
				thumbSize: void 0 == c.thumbSize ? "w400" : "" == c.thumbSize ? void 0 : c.thumbSize,
				listImageSrc: function(a) {
					return a.ListThumb ? (c.pbCollectionSection.thumbSize = pb.utils.fixSizeForSmallImage(c.pbCollectionSection.thumbSize, a.ListThumb.Height, a.ListThumb.Width), a.ListThumb.VideoThumbUrl ? a.ListThumb.VideoThumbUrl : b("pboxImage")(a.ListThumb.FileName, a.ListThumb.S3LocationId, c.pbCollectionSection.thumbSize)) : void 0 != a.ListThumbVideoThumbUrl && a.ListThumbVideoThumbUrl ? a.ListThumbVideoThumbUrl : ""
				},
				listImageHeight: function(a) {
					return a.ListThumb ? a.ListThumb.Height : a.ListThumbVideoHeight ? a.ListThumbVideoHeight : ""
				},
				listImageWidth: function(a) {
					return a.ListThumb ? a.ListThumb.Width : a.ListThumbVideoWidth ? a.ListThumbVideoWidth : ""
				},
				openPage: function(b) {
					a.path(b.Uri)
				},
				hasImage: function(a) {
					return "" != c.pbCollectionSection.listImageSrc(a)
				}
			};
			var e = function() {
				setTimeout(function() {
					d.find(".imageBox").css("border-color", c.site.ThumbDecorationBorderColor), d.find(".imageBox").find("img").css("border-color", c.site.ThumbDecorationBorderColor)
				}, 1)
			}, f = function() {
				pb.utils.changeFigStyles(c, ".collectionFigCaption", "onepager section style")
			};
			f(), pb.utils.watchFontStyles(c, ".collectionFigCaption", "Collection Font Styles");
			var g = !1;
			pb.utils.onCreateEvents(c, ["changeImageBorderColor", "updateAfterRenderComplete" + c.section.Guid], function(a, b, d) {
				"changeImageBorderColor" == a ? e() : a == "updateAfterRenderComplete" + c.section.Guid && d.Guid == c.section.Guid && (e(), f(), 0 == g && (g = !0, c.base.broadCast("renderSectionItems" + c.section.Guid, {
					Guid: c.section.Guid
				})))
			}, "Section Collection")
		}];
	return {
		restrict: "E",
		replace: !0,
		template: c,
		scope: {
			page: "=",
			section: "=",
			site: "=",
			base: "=",
			thumbSize: "@"
		},
		controller: d
	}
}], pbAng.dirs.pbProductSection = ["$location", "$filter", "$compile", function(a, b) {
	var c = '<div id="product_container_{{::section.Guid}}" class="products product-container clearfix"><figure id="figure_{{::product.Guid}}" ng-repeat="product in section.Products | orderBy:\'Idx\' track by product.Guid" ><div id="imageBox_{{::product.Guid}}" class="imageBox"><img alt="{{base.getImgAltOrPageTitle(product.Title)}}" title="{{base.getImgAltOrPageTitle(product.Title)}}" gallery-thumb pb-nice-load class="image" ng-click="pbProductSection.openItem(product)" item="pbProductSection.getFirstItem(product)" ng-src="{{pbProductSection.getFirstThumbSrc(product)}}" size="{{::pbProductSection.thumbSize}}"data-height="{{pbProductSection.getFirstThumbHeight(product)}}"data-width="{{pbProductSection.getFirstThumbWidth(product)}}"/></div><figcaption class="productFigCaption"><span class="title" ng-if="product.Title" bind-unsafe-html="product.Title"></span><span class="price" ng-if="product.Price > 0 && product.IsSoldOut != 1">{{pbProductSection.calculatedPrice(product)}} {{site.ShopSettings.Currency}}</span><span class="price" ng-if="product.IsSoldOut == 1" ng-bind-html="site.UserTranslatedText.SoldOut"></span></figcaption></figure></div>',
		d = ["$scope", "$element", function(c, d) {
			var e = function() {
				var a = [];
				c.section.Products && (c.section.Products.forEach(function(b) {
					if (b.PageUri) {
						var c = pb.utils.findItemFromArray(pb.data.pages, "Uri", b.PageUri);
						if (c) {
							var d = c.Products;
							if (d && d.length > 0) {
								var e = pb.utils.findItemFromArray(d, "Guid", b.Guid);
								if (e) {
									var f = b.Idx,
										g = b.PageUri;
									b = e, b.Idx = f, b.PageUri = g, a.push(b)
								}
							}
						} else a.push(b)
					} else a.push(b)
				}), a.length > 0 && a.length == c.section.Products.length && (c.section.Products = a))
			};
			pb.environment.isAdmin && e();
			var f = function(a) {
				return a.Items && a.Items.length > 0 ? a.Items[0] : null
			};
			c.pbProductSection = {
				productList: [],
				thumbSize: void 0 == c.thumbSize ? "w400" : "" == c.thumbSize ? void 0 : c.thumbSize,
				getFirstItem: function(a) {
					var b = f(a);
					return b ? b : "noimage"
				},
				getFirstThumbSrc: function(a) {
					var d = f(a);
					return d && d.FileName ? (c.pbProductSection.thumbSize = pb.utils.fixSizeForSmallImage(c.pbProductSection.thumbSize, d.Height, d.Width), b("pboxImage")(d.FileName, d.S3LocationId, c.pbProductSection.thumbSize)) : d && d.VideoUrl && "" != d.VideoUrl ? d.VideoThumbUrl : "noimage"
				},
				getFirstThumbHeight: function(a) {
					var b = f(a);
					return b && b.Height ? b.Height : null
				},
				getFirstThumbWidth: function(a) {
					var b = f(a);
					return b && b.Width ? b.Width : null
				},
				calculatedPrice: function(a) {
					var b = 0;
					return a.Price && (b = parseFloat(a.Price), a.Options && $.each(a.Options, function(a, c) {
						if (c.Alternatives && c.Alternatives.length > 0) {
							var d = c.Alternatives[0];
							b += parseFloat(d.Operation + d.PriceVariation)
						}
					})), Number.isInteger(b) ? b : b.toFixed(2)
				},
				openItem: function(b) {
					if (b.PageUri) {
						var c = "/" + b.PageUri + "/" + b.Url;
						a.path(c)
					}
				}
			};
			var g = function() {
				setTimeout(function() {
					d.find(".imageBox").css("border-color", c.site.ThumbDecorationBorderColor), d.find(".imageBox").find("img").css("border-color", c.site.ThumbDecorationBorderColor)
				}, 1)
			}, h = function() {
				pb.utils.changeFigStyles(c, ".productFigCaption", "onepager section style")
			};
			h(), pb.utils.watchFontStyles(c, ".productFigCaption", "Product Font Styles"), pb.utils.onCreateEvents(c, ["changeImageBorderColor", "updateAfterRenderComplete" + c.section.Guid], function(a, b, d) {
				"changeImageBorderColor" == a ? g() : a == "updateAfterRenderComplete" + c.section.Guid && d.Guid == c.section.Guid && (g(), h())
			}, "Section Product")
		}];
	return {
		restrict: "E",
		replace: !0,
		template: c,
		scope: {
			page: "=",
			section: "=",
			site: "=",
			base: "=",
			thumbSize: "@"
		},
		controller: d
	}
}]