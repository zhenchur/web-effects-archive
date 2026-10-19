function vt(u) {
  if (u === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return u;
}
function Vi(u, t) {
  u.prototype = Object.create(t.prototype), u.prototype.constructor = u, u.__proto__ = t;
}
/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var st = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, ue = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, ti, W, L, ft = 1e8, F = 1 / ft, Ve = Math.PI * 2, Ir = Ve / 4, Br = 0, qi = Math.sqrt, Vr = Math.cos, qr = Math.sin, X = function(t) {
  return typeof t == "string";
}, q = function(t) {
  return typeof t == "function";
}, Tt = function(t) {
  return typeof t == "number";
}, ei = function(t) {
  return typeof t > "u";
}, gt = function(t) {
  return typeof t == "object";
}, K = function(t) {
  return t !== !1;
}, ii = function() {
  return typeof window < "u";
}, ge = function(t) {
  return q(t) || X(t);
}, Ui = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, $ = Array.isArray, Ur = /random\([^)]+\)/g, Yr = /,\s*/g, vi = /(?:-?\.?\d|\.)+/gi, Yi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Gt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ee = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Xi = /[+-]=-?[.\d]+/, Xr = /[^,'"\[\]\s]+/gi, Wr = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, B, dt, qe, ri, at = {}, be = {}, Wi, Gi = function(t) {
  return (be = Qt(t, at)) && tt;
}, ni = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, fe = function(t, e) {
  return !e && console.warn(t);
}, $i = function(t, e) {
  return t && (at[t] = e) && be && (be[t] = e) || at;
}, he = function() {
  return 0;
}, Gr = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ye = {
  suppressEvents: !0,
  kill: !1
}, $r = {
  suppressEvents: !0
}, si = {}, kt = [], Ue = {}, Zi, et = {}, Re = {}, xi = 30, ve = [], ai = "", oi = function(t) {
  var e = t[0], i, r;
  if (gt(e) || q(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ve.length; r-- && !ve[r].targetTest(e); )
      ;
    i = ve[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new mr(t[r], i))) || t.splice(r, 1);
  return t;
}, Vt = function(t) {
  return t._gsap || oi(ht(t))[0]._gsap;
}, ji = function(t, e, i) {
  return (i = t[e]) && q(i) ? t[e]() : ei(i) && t.getAttribute && t.getAttribute(e) || i;
}, Q = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, U = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, I = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Zt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, Zr = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, we = function() {
  var t = kt.length, e = kt.slice(0), i, r;
  for (Ue = {}, kt.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, ui = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, Ki = function(t, e, i, r) {
  kt.length && !W && we(), t.render(e, i, !!(W && e < 0 && ui(t))), kt.length && !W && we();
}, Qi = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Xr).length < 2 ? e : X(t) ? t.trim() : t;
}, Hi = function(t) {
  return t;
}, ot = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, jr = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Qt = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Ti = function u(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = gt(e[i]) ? u(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Pe = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, se = function(t) {
  var e = t.parent || B, i = t.keyframes ? jr($(t.keyframes)) : ot;
  if (K(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Kr = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Ji = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Me = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Mt = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, qt = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Qr = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Ye = function(t, e, i, r) {
  return t._startAt && (W ? t._startAt.revert(ye) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, Hr = function u(t) {
  return !t || t._ts && u(t.parent);
}, bi = function(t) {
  return t._repeat ? Ht(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Ht = function(t, e) {
  var i = Math.floor(t = I(t / e));
  return t && i === t ? i - 1 : i;
}, Se = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, De = function(t) {
  return t._end = I(t._start + (t._tDur / Math.abs(t._ts || t._rts || F) || 0));
}, Ae = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = I(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), De(t), i._dirty || qt(i, t)), t;
}, tr = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Se(t.rawTime(), e), (!e._dur || me(0, e.totalDuration(), i) - e._tTime > F) && e.render(i, !0)), qt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -F;
  }
}, pt = function(t, e, i, r) {
  return e.parent && Mt(e), e._start = I((Tt(i) ? i : i || t !== B ? ut(t, i, e) : t._time) + e._delay), e._end = I(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Ji(t, e, "_first", "_last", t._sort ? "_start" : 0), Xe(e) || (t._recent = e), r || tr(t, e), t._ts < 0 && Ae(t, t._tTime), t;
}, er = function(t, e) {
  return (at.ScrollTrigger || ni("scrollTrigger", e)) && at.ScrollTrigger.create(e, t);
}, ir = function(t, e, i, r, n) {
  if (hi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !W && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Zi !== it.frame)
    return kt.push(t), t._lazy = [n, r], 1;
}, Jr = function u(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || u(e));
}, Xe = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, tn = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && Jr(t) && !(!t._initted && Xe(t)) || (t._ts < 0 || t._dp._ts < 0) && !Xe(t)) ? 0 : 1, a = t._rDelay, o = 0, f, h, _;
  if (a && t._repeat && (o = me(0, t._tDur, e), h = Ht(o, a), t._yoyo && h & 1 && (s = 1 - s), h !== Ht(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || W || r || t._zTime === F || !e && t._zTime) {
    if (!t._initted && ir(t, e, r, i, o))
      return;
    for (_ = t._zTime, t._zTime = e || (i ? F : 0), i || (i = e && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = o, f = t._pt; f; )
      f.r(s, f.d), f = f._next;
    e < 0 && Ye(t, e, i, !0), t._onUpdate && !i && rt(t, "onUpdate"), o && t._repeat && !i && t.parent && rt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Mt(t, 1), !i && !W && (rt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, en = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, Jt = function(t, e, i, r) {
  var n = t._repeat, s = I(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : I(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && Ae(t, t._tTime = t._tDur * a), t.parent && De(t), i || qt(t.parent, t), t;
}, wi = function(t) {
  return t instanceof j ? qt(t) : Jt(t, t._dur);
}, rn = {
  _start: 0,
  endTime: he,
  totalDuration: he
}, ut = function u(t, e, i) {
  var r = t.labels, n = t._recent || rn, s = t.duration() >= ft ? n.endTime(!1) : t._dur, a, o, f;
  return X(e) && (isNaN(e) || e in r) ? (o = e.charAt(0), f = e.substr(-1) === "%", a = e.indexOf("="), o === "<" || o === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (o === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (f ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (o = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), f && i && (o = o / 100 * ($(i) ? i[0] : i).totalDuration()), a > 1 ? u(t, e.substr(0, a - 1), i) + o : s + o)) : e == null ? s : +e;
}, ae = function(t, e, i) {
  var r = Tt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, o;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, o = i; o && !("immediateRender" in a); )
      a = o.vars.defaults || {}, o = K(o.vars.inherit) && o.parent;
    s.immediateRender = K(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new Y(e[0], s, e[n + 1]);
}, Et = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, me = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, G = function(t, e) {
  return !X(t) || !(e = Wr.exec(t)) ? "" : e[1];
}, nn = function(t, e, i) {
  return Et(i, function(r) {
    return me(t, e, r);
  });
}, We = [].slice, rr = function(t, e) {
  return t && gt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && gt(t[0])) && !t.nodeType && t !== dt;
}, sn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return X(r) && !e || rr(r, 1) ? (n = i).push.apply(n, ht(r)) : i.push(r);
  }) || i;
}, ht = function(t, e, i) {
  return L && !e && L.selector ? L.selector(t) : X(t) && !i && (qe || !te()) ? We.call((e || ri).querySelectorAll(t), 0) : $(t) ? sn(t, i) : rr(t) ? We.call(t, 0) : t ? [t] : [];
}, Ge = function(t) {
  return t = ht(t)[0] || fe("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return ht(e, i.querySelectorAll ? i : i === t ? fe("Invalid scope") || ri.createElement("div") : t);
  };
}, nr = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, sr = function(t) {
  if (q(t))
    return t;
  var e = gt(t) ? t : {
    each: t
  }, i = Ut(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, o = isNaN(r) || a, f = e.axis, h = r, _ = r;
  return X(r) ? h = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && o && (h = r[0], _ = r[1]), function(c, d, p) {
    var l = (p || e).length, m = s[l], y, g, T, w, v, S, x, P, b;
    if (!m) {
      if (b = e.grid === "auto" ? 0 : (e.grid || [1, ft])[1], !b) {
        for (x = -ft; x < (x = p[b++].getBoundingClientRect().left) && b < l; )
          ;
        b < l && b--;
      }
      for (m = s[l] = [], y = o ? Math.min(b, l) * h - 0.5 : r % b, g = b === ft ? 0 : o ? l * _ / b - 0.5 : r / b | 0, x = 0, P = ft, S = 0; S < l; S++)
        T = S % b - y, w = g - (S / b | 0), m[S] = v = f ? Math.abs(f === "y" ? w : T) : qi(T * T + w * w), v > x && (x = v), v < P && (P = v);
      r === "random" && nr(m), m.max = x - P, m.min = P, m.v = l = (parseFloat(e.amount) || parseFloat(e.each) * (b > l ? l - 1 : f ? f === "y" ? l / b : b : Math.max(b, l / b)) || 0) * (r === "edges" ? -1 : 1), m.b = l < 0 ? n - l : n, m.u = G(e.amount || e.each) || 0, i = i && l < 0 ? yn(i) : i;
    }
    return l = (m[c] - m.min) / m.max || 0, I(m.b + (i ? i(l) : l) * m.v) + m.u;
  };
}, $e = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = I(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (Tt(i) ? 0 : G(i));
  };
}, ar = function(t, e) {
  var i = $(t), r, n;
  return !i && gt(t) && (r = i = t.radius || ft, t.values ? (t = ht(t.values), (n = !Tt(t[0])) && (r *= r)) : t = $e(t.increment)), Et(e, i ? q(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), o = parseFloat(n ? s.y : 0), f = ft, h = 0, _ = t.length, c, d; _--; )
      n ? (c = t[_].x - a, d = t[_].y - o, c = c * c + d * d) : c = Math.abs(t[_] - a), c < f && (f = c, h = _);
    return h = !r || f <= r ? t[h] : s, n || h === s || Tt(s) ? h : h + G(s);
  } : $e(t));
}, or = function(t, e, i, r) {
  return Et($(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return $(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, an = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, on = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || G(i));
  };
}, un = function(t, e, i) {
  return fr(t, e, 0, 1, i);
}, ur = function(t, e, i) {
  return Et(i, function(r) {
    return t[~~e(r)];
  });
}, fn = function u(t, e, i) {
  var r = e - t;
  return $(t) ? ur(t, u(0, t.length), e) : Et(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, hn = function u(t, e, i) {
  var r = e - t, n = r * 2;
  return $(t) ? ur(t, u(0, t.length - 1), e) : Et(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, le = function(t) {
  return t.replace(Ur, function(e) {
    var i = e.indexOf("[") + 1, r = e.substring(i || 7, i ? e.indexOf("]") : e.length - 1).split(Yr);
    return or(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5);
  });
}, fr = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Et(n, function(o) {
    return i + ((o - t) / s * a || 0);
  });
}, ln = function u(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!n) {
    var s = X(t), a = {}, o, f, h, _, c;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if ($(t) && !$(e)) {
      for (h = [], _ = t.length, c = _ - 2, f = 1; f < _; f++)
        h.push(u(t[f - 1], t[f]));
      _--, n = function(p) {
        p *= _;
        var l = Math.min(c, ~~p);
        return h[l](p - l);
      }, i = e;
    } else r || (t = Qt($(t) ? [] : {}, t));
    if (!h) {
      for (o in e)
        fi.call(a, t, o, "get", e[o]);
      n = function(p) {
        return ci(p, a) || (s ? t.p : t);
      };
    }
  }
  return Et(i, n);
}, Pi = function(t, e, i) {
  var r = t.labels, n = ft, s, a, o;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (o = s, n = a);
  return o;
}, rt = function(t, e, i) {
  var r = t.vars, n = r[e], s = L, a = t._ctx, o, f, h;
  if (n)
    return o = r[e + "Params"], f = r.callbackScope || t, i && kt.length && we(), a && (L = a), h = o ? n.apply(f, o) : n.call(f), L = s, h;
}, re = function(t) {
  return Mt(t), t.scrollTrigger && t.scrollTrigger.kill(!!W), t.progress() < 1 && rt(t, "onInterrupt"), t;
}, $t, hr = [], lr = function(t) {
  if (t)
    if (t = !t.name && t.default || t, ii() || t.headless) {
      var e = t.name, i = q(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: he,
        render: ci,
        add: fi,
        kill: Cn,
        modifier: kn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: _i,
        aliases: {},
        register: 0
      };
      if (te(), t !== r) {
        if (et[e])
          return;
        ot(r, ot(Pe(t, n), s)), Qt(r.prototype, Qt(n, Pe(t, s))), et[r.prop = e] = r, t.targetTest && (ve.push(r), si[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      $i(e, r), t.register && t.register(tt, r, H);
    } else
      hr.push(t);
}, R = 255, ne = {
  aqua: [0, R, R],
  lime: [0, R, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, R],
  navy: [0, 0, 128],
  white: [R, R, R],
  olive: [128, 128, 0],
  yellow: [R, R, 0],
  orange: [R, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [R, 0, 0],
  pink: [R, 192, 203],
  cyan: [0, R, R],
  transparent: [R, R, R, 0]
}, Fe = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * R + 0.5 | 0;
}, _r = function(t, e, i) {
  var r = t ? Tt(t) ? [t >> 16, t >> 8 & R, t & R] : 0 : ne.black, n, s, a, o, f, h, _, c, d, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ne[t])
      r = ne[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & R, r & R, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & R, t & R];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(vi), !e)
        o = +r[0] % 360 / 360, f = +r[1] / 100, h = +r[2] / 100, s = h <= 0.5 ? h * (f + 1) : h + f - h * f, n = h * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Fe(o + 1 / 3, n, s), r[1] = Fe(o, n, s), r[2] = Fe(o - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Yi), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(vi) || ne.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / R, s = r[1] / R, a = r[2] / R, _ = Math.max(n, s, a), c = Math.min(n, s, a), h = (_ + c) / 2, _ === c ? o = f = 0 : (d = _ - c, f = h > 0.5 ? d / (2 - _ - c) : d / (_ + c), o = _ === n ? (s - a) / d + (s < a ? 6 : 0) : _ === s ? (a - n) / d + 2 : (n - s) / d + 4, o *= 60), r[0] = ~~(o + 0.5), r[1] = ~~(f * 100 + 0.5), r[2] = ~~(h * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, cr = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Ct).forEach(function(n) {
    var s = n.match(Gt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Si = function(t, e, i) {
  var r = "", n = (t + r).match(Ct), s = e ? "hsla(" : "rgba(", a = 0, o, f, h, _;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = _r(c, e, 1)) && s + (e ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), i && (h = cr(t), o = i.c, o.join(r) !== h.c.join(r)))
    for (f = t.replace(Ct, "1").split(Gt), _ = f.length - 1; a < _; a++)
      r += f[a] + (~o.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
  if (!f)
    for (f = t.split(Ct), _ = f.length - 1; a < _; a++)
      r += f[a] + n[a];
  return r + f[_];
}, Ct = (function() {
  var u = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in ne)
    u += "|" + t + "\\b";
  return new RegExp(u + ")", "gi");
})(), _n = /hsl[a]?\(/, dr = function(t) {
  var e = t.join(" "), i;
  if (Ct.lastIndex = 0, Ct.test(e))
    return i = _n.test(e), t[1] = Si(t[1], i), t[0] = Si(t[0], i, cr(t[1])), !0;
}, _e, it = (function() {
  var u = Date.now, t = 500, e = 33, i = u(), r = i, n = 1e3 / 240, s = n, a = [], o, f, h, _, c, d, p = function l(m) {
    var y = u() - r, g = m === !0, T, w, v, S;
    if ((y > t || y < 0) && (i += y - e), r += y, v = r - i, T = v - s, (T > 0 || g) && (S = ++_.frame, c = v - _.time * 1e3, _.time = v = v / 1e3, s += T + (T >= n ? 4 : n - T), w = 1), g || (o = f(l)), w)
      for (d = 0; d < a.length; d++)
        a[d](v, c, S, m);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return c / (1e3 / (m || 60));
    },
    wake: function() {
      Wi && (!qe && ii() && (dt = qe = window, ri = dt.document || {}, at.gsap = tt, (dt.gsapVersions || (dt.gsapVersions = [])).push(tt.version), Gi(be || dt.GreenSockGlobals || !dt.gsap && dt || {}), hr.forEach(lr)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, o && _.sleep(), f = h || function(m) {
        return setTimeout(m, s - _.time * 1e3 + 1 | 0);
      }, _e = 1, p(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(o), _e = 0, f = he;
    },
    lagSmoothing: function(m, y) {
      t = m || 1 / 0, e = Math.min(y || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = _.time * 1e3 + n;
    },
    add: function(m, y, g) {
      var T = y ? function(w, v, S, x) {
        m(w, v, S, x), _.remove(T);
      } : m;
      return _.remove(m), a[g ? "unshift" : "push"](T), te(), T;
    },
    remove: function(m, y) {
      ~(y = a.indexOf(m)) && a.splice(y, 1) && d >= y && d--;
    },
    _listeners: a
  }, _;
})(), te = function() {
  return !_e && it.wake();
}, C = {}, cn = /^[\d.\-M][\d.\-,\s]/, dn = /["']/g, pn = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, o, f; n < s; n++)
    o = i[n], a = n !== s - 1 ? o.lastIndexOf(",") : o.length, f = o.substr(0, a), e[r] = isNaN(f) ? f.replace(dn, "").trim() : +f, r = o.substr(a + 1).trim();
  return e;
}, mn = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, gn = function(t) {
  var e = (t + "").split("("), i = C[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [pn(e[1])] : mn(t).split(",").map(Qi)) : C._CE && cn.test(t) ? C._CE("", t) : i;
}, yn = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Ut = function(t, e) {
  return t && (q(t) ? t : C[t] || gn(t)) || e;
}, Xt = function(t, e, i, r) {
  i === void 0 && (i = function(o) {
    return 1 - e(1 - o);
  }), r === void 0 && (r = function(o) {
    return o < 0.5 ? e(o * 2) / 2 : 1 - e((1 - o) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return Q(t, function(a) {
    C[a] = at[a] = n, C[s = a.toLowerCase()] = i;
    for (var o in n)
      C[s + (o === "easeIn" ? ".in" : o === "easeOut" ? ".out" : ".inOut")] = C[a + "." + o] = n[o];
  }), n;
}, pr = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ze = function u(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ve * (Math.asin(1 / r) || 0), a = function(h) {
    return h === 1 ? 1 : r * Math.pow(2, -10 * h) * qr((h - s) * n) + 1;
  }, o = t === "out" ? a : t === "in" ? function(f) {
    return 1 - a(1 - f);
  } : pr(a);
  return n = Ve / n, o.config = function(f, h) {
    return u(t, f, h);
  }, o;
}, Le = function u(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : pr(i);
  return r.config = function(n) {
    return u(t, n);
  }, r;
};
Q("Linear,Quad,Cubic,Quart,Quint,Strong", function(u, t) {
  var e = t < 5 ? t + 1 : t;
  Xt(u + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
C.Linear.easeNone = C.none = C.Linear.easeIn;
Xt("Elastic", ze("in"), ze("out"), ze());
(function(u, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? u * a * a : a < i ? u * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? u * (a -= 2.25 / t) * a + 0.9375 : u * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Xt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Xt("Expo", function(u) {
  return Math.pow(2, 10 * (u - 1)) * u + u * u * u * u * u * u * (1 - u);
});
Xt("Circ", function(u) {
  return -(qi(1 - u * u) - 1);
});
Xt("Sine", function(u) {
  return u === 1 ? 1 : -Vr(u * Ir) + 1;
});
Xt("Back", Le("in"), Le("out"), Le());
C.SteppedEase = C.steps = at.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - F;
    return function(a) {
      return ((r * me(0, s, a) | 0) + n) * i;
    };
  }
};
ue.ease = C["quad.out"];
Q("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(u) {
  return ai += u + "," + u + "Params,";
});
var mr = function(t, e) {
  this.id = Br++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : ji, this.set = e ? e.getSetter : _i;
}, ce = /* @__PURE__ */ (function() {
  function u(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Jt(this, +e.duration, 1, 1), this.data = e.data, L && (this._ctx = L, L.data.push(this)), _e || it.wake();
  }
  var t = u.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Jt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (te(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Ae(this, i), !n._dp || n.parent || tr(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && pt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === F || !this._initted && this._dur && i || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Ki(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + bi(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + bi(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Ht(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -F ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Se(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -F ? 0 : this._rts, this.totalTime(me(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), De(this), Qr(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (te(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== F && (this._tTime -= F)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = I(i);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && pt(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (K(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Se(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = $r);
    var r = W;
    return W = i, ui(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), W = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, wi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, wi(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(ut(this, i), K(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, K(r)), this._dur || (this._zTime = -F), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -F : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -F, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - F);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this, n = r._prom;
    return new Promise(function(s) {
      var a = q(i) ? i : Hi, o = function() {
        var h = r.then;
        r.then = null, n && n(), q(a) && (a = a(r)) && (a.then || a === r) && (r.then = h), s(a), r.then = h;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? o() : r._prom = o;
    });
  }, t.kill = function() {
    re(this);
  }, u;
})();
ot(ce.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -F,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var j = /* @__PURE__ */ (function(u) {
  Vi(t, u);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = u.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = K(i.sortChildren), B && pt(i.parent || B, vt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && er(vt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return ae(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return ae(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return ae(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, se(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Y(r, n, ut(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return pt(this, Y.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, o, f, h) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = f, s.onCompleteParams = h, s.parent = this, new Y(r, s, ut(this, o)), this;
  }, e.staggerFrom = function(r, n, s, a, o, f, h) {
    return s.runBackwards = 1, se(s).immediateRender = K(s.immediateRender), this.staggerTo(r, n, s, a, o, f, h);
  }, e.staggerFromTo = function(r, n, s, a, o, f, h, _) {
    return a.startAt = s, se(a).immediateRender = K(a.immediateRender), this.staggerTo(r, n, a, o, f, h, _);
  }, e.render = function(r, n, s) {
    var a = this._time, o = this._dirty ? this.totalDuration() : this._tDur, f = this._dur, h = r <= 0 ? 0 : I(r), _ = this._zTime < 0 != r < 0 && (this._initted || !f), c, d, p, l, m, y, g, T, w, v, S, x;
    if (this !== B && h > o && r >= 0 && (h = o), h !== this._tTime || s || _) {
      if (a !== this._time && f && (h += this._time - a, r += this._time - a), c = h, w = this._start, T = this._ts, y = !T, _ && (f || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (S = this._yoyo, m = f + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = I(h % m), h === o ? (l = this._repeat, c = f) : (v = I(h / m), l = ~~v, l && l === v && (c = f, l--), c > f && (c = f)), v = Ht(this._tTime, m), !a && this._tTime && v !== l && this._tTime - v * m - this._dur <= 0 && (v = l), S && l & 1 && (c = f - c, x = 1), l !== v && !this._lock) {
          var P = S && v & 1, b = P === (S && l & 1);
          if (l < v && (P = !P), a = P ? 0 : h % f ? f : h, this._lock = 1, this.render(a || (x ? 0 : I(l * m)), n, !f)._lock = 0, this._tTime = h, !n && this.parent && rt(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, v = l), a && a !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (f = this._dur, o = this._tDur, b && (this._lock = 2, a = P ? f : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (g = en(this, I(a), I(c)), g && (h -= c - (c = g._start))), this._tTime = h, this._time = c, this._act = !!T, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && f && !n && !v && (rt(this, "onStart"), this._tTime !== h))
        return this;
      if (c >= a && r >= 0)
        for (d = this._first; d; ) {
          if (p = d._next, (d._act || c >= d._start) && d._ts && g !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (c - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (c - d._start) * d._ts, n, s), c !== this._time || !this._ts && !y) {
              g = 0, p && (h += this._zTime = -F);
              break;
            }
          }
          d = p;
        }
      else {
        d = this._last;
        for (var O = r < 0 ? r : c; d; ) {
          if (p = d._prev, (d._act || O <= d._end) && d._ts && g !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (O - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (O - d._start) * d._ts, n, s || W && ui(d)), c !== this._time || !this._ts && !y) {
              g = 0, p && (h += this._zTime = O ? -F : F);
              break;
            }
          }
          d = p;
        }
      }
      if (g && !n && (this.pause(), g.render(c >= a ? 0 : -F)._zTime = c >= a ? 1 : -1, this._ts))
        return this._start = w, De(this), this.render(r, n, s);
      this._onUpdate && !n && rt(this, "onUpdate", !0), (h === o && this._tTime >= this.totalDuration() || !h && a) && (w === this._start || Math.abs(T) !== Math.abs(this._ts)) && (this._lock || ((r || !f) && (h === o && this._ts > 0 || !h && this._ts < 0) && Mt(this, 1), !n && !(r < 0 && !a) && (h || a || !o) && (rt(this, h === o && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < o && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (Tt(n) || (n = ut(this, n, r)), !(r instanceof ce)) {
      if ($(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (X(r))
        return this.addLabel(r, n);
      if (q(r))
        r = Y.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? pt(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ft);
    for (var o = [], f = this._first; f; )
      f._start >= a && (f instanceof Y ? n && o.push(f) : (s && o.push(f), r && o.push.apply(o, f.getChildren(!0, n, s)))), f = f._next;
    return o;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return X(r) ? this.removeLabel(r) : q(r) ? this.killTweensOf(r) : (r.parent === this && Me(this, r), r === this._recent && (this._recent = this._last), qt(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = I(it.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), u.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = ut(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = Y.delayedCall(0, n || he, s);
    return a.data = "isPause", this._hasPause = 1, pt(this, a, ut(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = ut(this, r); n; )
      n._start === r && n.data === "isPause" && Mt(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), o = a.length; o--; )
      Pt !== a[o] && a[o].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = ht(r), o = this._first, f = Tt(n), h; o; )
      o instanceof Y ? Zr(o._targets, a) && (f ? (!Pt || o._initted && o._ts) && o.globalTime(0) <= n && o.globalTime(o.totalDuration()) > n : !n || o.isActive()) && s.push(o) : (h = o.getTweensOf(a, n)).length && s.push.apply(s, h), o = o._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = ut(s, r), o = n, f = o.startAt, h = o.onStart, _ = o.onStartParams, c = o.immediateRender, d, p = Y.to(s, ot({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (f && "time" in f ? f.time : s._time)) / s.timeScale()) || F,
      onStart: function() {
        if (s.pause(), !d) {
          var m = n.duration || Math.abs((a - (f && "time" in f ? f.time : s._time)) / s.timeScale());
          p._dur !== m && Jt(p, m, 0, 1).render(p._time, !0, !0), d = 1;
        }
        h && h.apply(p, _ || []);
      }
    }, n));
    return c ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, ot({
      startAt: {
        time: ut(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Pi(this, ut(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Pi(this, ut(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + F);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    var a = this._first, o = this.labels, f;
    for (r = I(r); a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (f in o)
        o[f] >= s && (o[f] += r);
    return qt(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return u.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), qt(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, o = ft, f, h, _;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (_ = s.parent; a; )
        f = a._prev, a._dirty && a.totalDuration(), h = a._start, h > o && s._sort && a._ts && !s._lock ? (s._lock = 1, pt(s, a, h - a._delay, 1)._lock = 0) : o = h, h < 0 && a._ts && (n -= h, (!_ && !s._dp || _ && _.smoothChildTiming) && (s._start += I(h / s._ts), s._time -= h, s._tTime -= h), s.shiftChildren(-h, !1, -1 / 0), o = 0), a._end > n && a._ts && (n = a._end), a = f;
      Jt(s, s === B && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (B._ts && (Ki(B, Se(r, B)), Zi = it.frame), it.frame >= xi) {
      xi += st.autoSleep || 120;
      var n = B._first;
      if ((!n || !n._ts) && st.autoSleep && it._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || it.sleep();
      }
    }
  }, t;
})(ce);
ot(j.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var vn = function(t, e, i, r, n, s, a) {
  var o = new H(this._pt, t, e, 0, 1, br, null, n), f = 0, h = 0, _, c, d, p, l, m, y, g;
  for (o.b = i, o.e = r, i += "", r += "", (y = ~r.indexOf("random(")) && (r = le(r)), s && (g = [i, r], s(g, t, e), i = g[0], r = g[1]), c = i.match(Ee) || []; _ = Ee.exec(r); )
    p = _[0], l = r.substring(f, _.index), d ? d = (d + 1) % 5 : l.substr(-5) === "rgba(" && (d = 1), p !== c[h++] && (m = parseFloat(c[h - 1]) || 0, o._pt = {
      _next: o._pt,
      p: l || h === 1 ? l : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? Zt(m, p) - m : parseFloat(p) - m,
      m: d && d < 4 ? Math.round : 0
    }, f = Ee.lastIndex);
  return o.c = f < r.length ? r.substring(f, r.length) : "", o.fp = a, (Xi.test(r) || y) && (o.e = 0), this._pt = o, o;
}, fi = function(t, e, i, r, n, s, a, o, f, h) {
  q(r) && (r = r(n || 0, t, s));
  var _ = t[e], c = i !== "get" ? i : q(_) ? f ? t[e.indexOf("set") || !q(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](f) : t[e]() : _, d = q(_) ? f ? Pn : xr : li, p;
  if (X(r) && (~r.indexOf("random(") && (r = le(r)), r.charAt(1) === "=" && (p = Zt(c, r) + (G(c) || 0), (p || p === 0) && (r = p))), !h || c !== r || Ze)
    return !isNaN(c * r) && r !== "" ? (p = new H(this._pt, t, e, +c || 0, r - (c || 0), typeof _ == "boolean" ? On : Tr, 0, d), f && (p.fp = f), a && p.modifier(a, this, t), this._pt = p) : (!_ && !(e in t) && ni(e, r), vn.call(this, t, e, c, r, d, o || st.stringFilter, f));
}, xn = function(t, e, i, r, n) {
  if (q(t) && (t = oe(t, n, e, i, r)), !gt(t) || t.style && t.nodeType || $(t) || Ui(t))
    return X(t) ? oe(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = oe(t[a], n, e, i, r);
  return s;
}, gr = function(t, e, i, r, n, s) {
  var a, o, f, h;
  if (et[t] && (a = new et[t]()).init(n, a.rawVars ? e[t] : xn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = o = new H(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== $t))
    for (f = i._ptLookup[i._targets.indexOf(n)], h = a._props.length; h--; )
      f[a._props[h]] = o;
  return a;
}, Pt, Ze, hi = function u(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, o = r.lazy, f = r.onUpdate, h = r.runBackwards, _ = r.yoyoEase, c = r.keyframes, d = r.autoRevert, p = t._dur, l = t._startAt, m = t._targets, y = t.parent, g = y && y.data === "nested" ? y.vars.targets : m, T = t._overwrite === "auto" && !ti, w = t.timeline, v = r.easeReverse || _, S, x, P, b, O, D, M, k, A, z, E, N, Z;
  if (w && (!c || !n) && (n = "none"), t._ease = Ut(n, ue.ease), t._rEase = v && (Ut(v) || t._ease), t._from = !w && !!r.runBackwards, t._from && (t.ratio = 1), !w || c && !r.stagger) {
    if (k = m[0] ? Vt(m[0]).harness : 0, N = k && r[k.prop], S = Pe(r, si), l && (l._zTime < 0 && l.progress(1), e < 0 && h && a && !d ? l.render(-1, !0) : l.revert(h && p ? ye : Gr), l._lazy = 0), s) {
      if (Mt(t._startAt = Y.set(m, ot({
        data: "isStart",
        overwrite: !1,
        parent: y,
        immediateRender: !0,
        lazy: !l && K(o),
        startAt: null,
        delay: 0,
        onUpdate: f && function() {
          return rt(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (W || !a && !d) && t._startAt.revert(ye), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && p && !l) {
      if (e && (a = !1), P = ot({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !l && K(o),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, S), N && (P[k.prop] = N), Mt(t._startAt = Y.set(m, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (W ? t._startAt.revert(ye) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        u(t._startAt, F, F);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, o = p && K(o) || o && !p, x = 0; x < m.length; x++) {
      if (O = m[x], M = O._gsap || oi(m)[x]._gsap, t._ptLookup[x] = z = {}, Ue[M.id] && kt.length && we(), E = g === m ? x : g.indexOf(O), k && (A = new k()).init(O, N || S, t, E, g) !== !1 && (t._pt = b = new H(t._pt, O, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(wt) {
        z[wt] = b;
      }), A.priority && (D = 1)), !k || N)
        for (P in S)
          et[P] && (A = gr(P, S, t, E, O, g)) ? A.priority && (D = 1) : z[P] = b = fi.call(t, O, P, "get", S[P], E, g, 0, r.stringFilter);
      t._op && t._op[x] && t.kill(O, t._op[x]), T && t._pt && (Pt = t, B.killTweensOf(O, z, t.globalTime(e)), Z = !t.parent, Pt = 0), t._pt && o && (Ue[M.id] = 1);
    }
    D && wr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = f, t._initted = (!t._op || t._pt) && !Z, c && e <= 0 && w.render(ft, !0, !0);
}, Tn = function(t, e, i, r, n, s, a, o) {
  var f = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, _, c, d;
  if (!f)
    for (f = t._ptCache[e] = [], c = t._ptLookup, d = t._targets.length; d--; ) {
      if (h = c[d][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Ze = 1, t.vars[e] = "+=0", hi(t, a), Ze = 0, o ? fe(e + " not eligible for reset. Try splitting into individual properties") : 1;
      f.push(h);
    }
  for (d = f.length; d--; )
    _ = f[d], h = _._pt || _, h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + s * h.c, h.c = i - h.s, _.e && (_.e = U(i) + G(_.e)), _.b && (_.b = h.s + G(_.b));
}, bn = function(t, e) {
  var i = t[0] ? Vt(t[0]).harness : 0, r = i && i.aliases, n, s, a, o;
  if (!r)
    return e;
  n = Qt({}, e);
  for (s in r)
    if (s in n)
      for (o = r[s].split(","), a = o.length; a--; )
        n[o[a]] = n[s];
  return n;
}, wn = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if ($(e))
    a = i[t] || (i[t] = []), e.forEach(function(o, f) {
      return a.push({
        t: f / (e.length - 1) * 100,
        v: o,
        e: n
      });
    });
  else
    for (s in e)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, oe = function(t, e, i, r, n) {
  return q(t) ? t.call(e, i, r, n) : X(t) && ~t.indexOf("random(") ? le(t) : t;
}, yr = ai + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", vr = {};
Q(yr + ",id,stagger,delay,duration,paused,scrollTrigger", function(u) {
  return vr[u] = 1;
});
var Y = /* @__PURE__ */ (function(u) {
  Vi(t, u);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = u.call(this, s ? r : se(r)) || this;
    var o = a.vars, f = o.duration, h = o.delay, _ = o.immediateRender, c = o.stagger, d = o.overwrite, p = o.keyframes, l = o.defaults, m = o.scrollTrigger, y = r.parent || B, g = ($(i) || Ui(i) ? Tt(i[0]) : "length" in r) ? [i] : ht(i), T, w, v, S, x, P, b, O;
    if (a._targets = g.length ? oi(g) : fe("GSAP target " + i + " not found. https://gsap.com", !st.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, p || c || ge(f) || ge(h)) {
      r = a.vars;
      var D = r.easeReverse || r.yoyoEase;
      if (T = a.timeline = new j({
        data: "nested",
        defaults: l || {},
        targets: y && y.data === "nested" ? y.vars.targets : g
      }), T.kill(), T.parent = T._dp = vt(a), T._start = 0, c || ge(f) || ge(h)) {
        if (S = g.length, b = c && sr(c), gt(c))
          for (x in c)
            ~yr.indexOf(x) && (O || (O = {}), O[x] = c[x]);
        for (w = 0; w < S; w++)
          v = Pe(r, vr), v.stagger = 0, D && (v.easeReverse = D), O && Qt(v, O), P = g[w], v.duration = +oe(f, vt(a), w, P, g), v.delay = (+oe(h, vt(a), w, P, g) || 0) - a._delay, !c && S === 1 && v.delay && (a._delay = h = v.delay, a._start += h, v.delay = 0), T.to(P, v, b ? b(w, P, g) : 0), T._ease = C.none;
        T.duration() ? f = h = 0 : a.timeline = 0;
      } else if (p) {
        se(ot(T.vars.defaults, {
          ease: "none"
        })), T._ease = Ut(p.ease || r.ease || "none");
        var M = 0, k, A, z;
        if ($(p))
          p.forEach(function(E) {
            return T.to(g, E, ">");
          }), T.duration();
        else {
          v = {};
          for (x in p)
            x === "ease" || x === "easeEach" || wn(x, p[x], v, p.easeEach);
          for (x in v)
            for (k = v[x].sort(function(E, N) {
              return E.t - N.t;
            }), M = 0, w = 0; w < k.length; w++)
              A = k[w], z = {
                ease: A.e,
                duration: (A.t - (w ? k[w - 1].t : 0)) / 100 * f
              }, z[x] = A.v, T.to(g, z, M), M += z.duration;
          T.duration() < f && T.to({}, {
            duration: f - T.duration()
          });
        }
      }
      f || a.duration(f = T.duration());
    } else
      a.timeline = 0;
    return d === !0 && !ti && (Pt = vt(a), B.killTweensOf(g), Pt = 0), pt(y, vt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (_ || !f && !p && a._start === I(y._time) && K(_) && Hr(vt(a)) && y.data !== "nested") && (a._tTime = -F, a.render(Math.max(0, -h) || 0)), m && er(vt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, o = this._tDur, f = this._dur, h = r < 0, _ = r > o - F && !h ? o : r < F ? 0 : r, c, d, p, l, m, y, g, T;
    if (!f)
      tn(this, r, n, s);
    else if (_ !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (c = _, T = this.timeline, this._repeat) {
        if (l = f + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(l * 100 + r, n, s);
        if (c = I(_ % l), _ === o ? (p = this._repeat, c = f) : (m = I(_ / l), p = ~~m, p && p === m ? (c = f, p--) : c > f && (c = f)), y = this._yoyo && p & 1, y && (c = f - c), m = Ht(this._tTime, l), c === a && !s && this._initted && p === m)
          return this._tTime = _, this;
        p !== m && this.vars.repeatRefresh && !y && !this._lock && c !== l && this._initted && (this._lock = s = 1, this.render(I(l * p), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (ir(this, h ? r : c, s, n, _))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (f !== this._dur)
          return this.render(r, n, s);
      }
      if (this._rEase) {
        var w = c < a;
        if (w !== this._inv) {
          var v = w ? a : f - a;
          this._inv = w, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = v ? (w ? -1 : 1) / v : 0, this._invScale = w ? -this.ratio : 1 - this.ratio, this._invEase = w ? this._rEase : this._ease;
        }
        this.ratio = g = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
      } else
        this.ratio = g = this._ease(c / f);
      if (this._from && (this.ratio = g = 1 - g), this._tTime = _, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && _ && !n && !m && (rt(this, "onStart"), this._tTime !== _))
        return this;
      for (d = this._pt; d; )
        d.r(g, d.d), d = d._next;
      T && T.render(r < 0 ? r : T._dur * T._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (h && Ye(this, r, n, s), rt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && rt(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (h && !this._onUpdate && Ye(this, r, !0, !0), (r || !f) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && Mt(this, 1), !n && !(h && !a) && (_ || a || y) && (rt(this, _ === o ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < o && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), u.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, o) {
    _e || it.wake(), this._ts || this.play();
    var f = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || hi(this, f), h = this._ease(f / this._dur), Tn(this, r, n, s, a, h, f, o) ? this.resetTo(r, n, s, a, 1) : (Ae(this, 0), this.parent || Ji(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? re(this) : this.scrollTrigger && this.scrollTrigger.kill(!!W), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Pt && Pt.vars.overwrite !== !0)._first || re(this), this.parent && s !== this.timeline.totalDuration() && Jt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, o = r ? ht(r) : a, f = this._ptLookup, h = this._pt, _, c, d, p, l, m, y;
    if ((!n || n === "all") && Kr(a, o))
      return n === "all" && (this._pt = 0), re(this);
    for (_ = this._op = this._op || [], n !== "all" && (X(n) && (l = {}, Q(n, function(g) {
      return l[g] = 1;
    }), n = l), n = bn(a, n)), y = a.length; y--; )
      if (~o.indexOf(a[y])) {
        c = f[y], n === "all" ? (_[y] = n, p = c, d = {}) : (d = _[y] = _[y] || {}, p = n);
        for (l in p)
          m = c && c[l], m && ((!("kill" in m.d) || m.d.kill(l) === !0) && Me(this, m, "_pt"), delete c[l]), d !== "all" && (d[l] = 1);
      }
    return this._initted && !this._pt && h && re(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return ae(1, arguments);
  }, t.delayedCall = function(r, n, s, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, s) {
    return ae(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return B.killTweensOf(r, n, s);
  }, t;
})(ce);
ot(Y.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Q("staggerTo,staggerFrom,staggerFromTo", function(u) {
  Y[u] = function() {
    var t = new j(), e = We.call(arguments, 0);
    return e.splice(u === "staggerFromTo" ? 5 : 4, 0, 0), t[u].apply(t, e);
  };
});
var li = function(t, e, i) {
  return t[e] = i;
}, xr = function(t, e, i) {
  return t[e](i);
}, Pn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Sn = function(t, e, i) {
  return t.setAttribute(e, i);
}, _i = function(t, e) {
  return q(t[e]) ? xr : ei(t[e]) && t.setAttribute ? Sn : li;
}, Tr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, On = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, br = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, ci = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, kn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Cn = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Me(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Mn = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, wr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, H = /* @__PURE__ */ (function() {
  function u(e, i, r, n, s, a, o, f, h) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Tr, this.d = o || this, this.set = f || li, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = u.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Mn, this.m = i, this.mt = n, this.tween = r;
  }, u;
})();
Q(ai + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(u) {
  return si[u] = 1;
});
at.TweenMax = at.TweenLite = Y;
at.TimelineLite = at.TimelineMax = j;
B = new j({
  sortChildren: !1,
  defaults: ue,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
st.stringFilter = dr;
var Yt = [], xe = {}, Dn = [], Oi = 0, An = 0, Ne = function(t) {
  return (xe[t] || Dn).map(function(e) {
    return e();
  });
}, je = function() {
  var t = Date.now(), e = [];
  t - Oi > 2 && (Ne("matchMediaInit"), Yt.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, o, f;
    for (a in r)
      s = dt.matchMedia(r[a]).matches, s && (o = 1), s !== n[a] && (n[a] = s, f = 1);
    f && (i.revert(), o && e.push(i));
  }), Ne("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Oi = t, Ne("matchMedia"));
}, Pr = /* @__PURE__ */ (function() {
  function u(e, i) {
    this.selector = i && Ge(i), this.data = [], this._r = [], this.isReverted = !1, this.id = An++, e && this.add(e);
  }
  var t = u.prototype;
  return t.add = function(i, r, n) {
    q(i) && (n = r, r = i, i = q);
    var s = this, a = function() {
      var f = L, h = s.selector, _;
      return f && f !== s && f.data.push(s), n && (s.selector = Ge(n)), L = s, _ = r.apply(s, arguments), q(_) && s._r.push(_), L = f, s.selector = h, s.isReverted = !1, _;
    };
    return s.last = a, i === q ? a(s, function(o) {
      return s.add(null, o);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = L;
    L = null, i(this), L = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof u ? i.push.apply(i, r.getTweens()) : r instanceof Y && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? (function() {
      for (var a = n.getTweens(), o = n.data.length, f; o--; )
        f = n.data[o], f.data === "isFlip" && (f.revert(), f.getChildren(!0, !0, !1).forEach(function(h) {
          return a.splice(a.indexOf(h), 1);
        }));
      for (a.map(function(h) {
        return {
          g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
          t: h
        };
      }).sort(function(h, _) {
        return _.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), o = n.data.length; o--; )
        f = n.data[o], f instanceof j ? f.data !== "nested" && (f.scrollTrigger && f.scrollTrigger.revert(), f.kill()) : !(f instanceof Y) && f.revert && f.revert(i);
      n._r.forEach(function(h) {
        return h(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Yt.length; s--; )
        Yt[s].id === this.id && Yt.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, u;
})(), En = /* @__PURE__ */ (function() {
  function u(e) {
    this.contexts = [], this.scope = e, L && L.data.push(this);
  }
  var t = u.prototype;
  return t.add = function(i, r, n) {
    gt(i) || (i = {
      matches: i
    });
    var s = new Pr(0, n || this.scope), a = s.conditions = {}, o, f, h;
    L && !s.selector && (s.selector = L.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (f in i)
      f === "all" ? h = 1 : (o = dt.matchMedia(i[f]), o && (Yt.indexOf(s) < 0 && Yt.push(s), (a[f] = o.matches) && (h = 1), o.addListener ? o.addListener(je) : o.addEventListener("change", je)));
    return h && r(s, function(_) {
      return s.add(null, _);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, u;
})(), Oe = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return lr(r);
    });
  },
  timeline: function(t) {
    return new j(t);
  },
  getTweensOf: function(t, e) {
    return B.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    X(t) && (t = ht(t)[0]);
    var n = Vt(t || {}).get, s = i ? Hi : Qi;
    return i === "native" && (i = ""), t && (e ? s((et[e] && et[e].get || n)(t, e, i, r)) : function(a, o, f) {
      return s((et[a] && et[a].get || n)(t, a, o, f));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = ht(t), t.length > 1) {
      var r = t.map(function(h) {
        return tt.quickSetter(h, e, i);
      }), n = r.length;
      return function(h) {
        for (var _ = n; _--; )
          r[_](h);
      };
    }
    t = t[0] || {};
    var s = et[e], a = Vt(t), o = a.harness && (a.harness.aliases || {})[e] || e, f = s ? function(h) {
      var _ = new s();
      $t._pt = 0, _.init(t, i ? h + i : h, $t, 0, [t]), _.render(1, _), $t._pt && ci(1, $t);
    } : a.set(t, o);
    return s ? f : function(h) {
      return f(t, o, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = tt.to(t, ot((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(o, f, h) {
      return n.resetTo(e, o, f, h);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return B.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Ut(t.ease, ue.ease)), Ti(ue, t || {});
  },
  config: function(t) {
    return Ti(st, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !et[a] && !at[a] && fe(e + " effect requires " + a + " plugin.");
    }), Re[e] = function(a, o, f) {
      return i(ht(a), ot(o || {}, n), f);
    }, s && (j.prototype[e] = function(a, o, f) {
      return this.add(Re[e](a, gt(o) ? o : (f = o) && {}, this), f);
    });
  },
  registerEase: function(t, e) {
    C[t] = Ut(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Ut(t, e) : C;
  },
  getById: function(t) {
    return B.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new j(t), r, n;
    for (i.smoothChildTiming = K(t.smoothChildTiming), B.remove(i), i._dp = 0, i._time = i._tTime = B._time, r = B._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof Y && r.vars.onComplete === r._targets[0])) && pt(i, r, r._start - r._delay), r = n;
    return pt(B, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Pr(t, e) : L;
  },
  matchMedia: function(t) {
    return new En(t);
  },
  matchMediaRefresh: function() {
    return Yt.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || je();
  },
  addEventListener: function(t, e) {
    var i = xe[t] || (xe[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = xe[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: fn,
    wrapYoyo: hn,
    distribute: sr,
    random: or,
    snap: ar,
    normalize: un,
    getUnit: G,
    clamp: nn,
    splitColor: _r,
    toArray: ht,
    selector: Ge,
    mapRange: fr,
    pipe: an,
    unitize: on,
    interpolate: ln,
    shuffle: nr
  },
  install: Gi,
  effects: Re,
  ticker: it,
  updateRoot: j.updateRoot,
  plugins: et,
  globalTimeline: B,
  core: {
    PropTween: H,
    globals: $i,
    Tween: Y,
    Timeline: j,
    Animation: ce,
    getCache: Vt,
    _removeLinkedListItem: Me,
    reverting: function() {
      return W;
    },
    context: function(t) {
      return t && L && (L.data.push(t), t._ctx = L), L;
    },
    suppressOverwrites: function(t) {
      return ti = t;
    }
  }
};
Q("to,from,fromTo,delayedCall,set,killTweensOf", function(u) {
  return Oe[u] = Y[u];
});
it.add(j.updateRoot);
$t = Oe.to({}, {
  duration: 0
});
var Rn = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Fn = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Rn(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Ie = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var o, f;
        if (X(n) && (o = {}, Q(n, function(h) {
          return o[h] = 1;
        }), n = o), e) {
          o = {};
          for (f in n)
            o[f] = e(n[f]);
          n = o;
        }
        Fn(a, n);
      };
    }
  };
}, tt = Oe.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, o;
    this.tween = i;
    for (s in e)
      o = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (o || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = o, this._props.push(s);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      W ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, Ie("roundProps", $e), Ie("modifiers"), Ie("snap", ar)) || Oe;
Y.version = j.version = tt.version = "3.15.0";
Wi = 1;
ii() && te();
C.Power0;
C.Power1;
C.Power2;
C.Power3;
C.Power4;
C.Linear;
C.Quad;
C.Cubic;
C.Quart;
C.Quint;
C.Strong;
C.Elastic;
C.Back;
C.SteppedEase;
C.Bounce;
C.Sine;
C.Expo;
C.Circ;
/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ki, St, jt, di, Bt, Ci, pi, zn = function() {
  return typeof window < "u";
}, bt = {}, It = 180 / Math.PI, Kt = Math.PI / 180, Wt = Math.atan2, Mi = 1e8, mi = /([A-Z])/g, Ln = /(left|right|width|margin|padding|x)/i, Nn = /[\s,\(]\S/, mt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ke = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, In = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Bn = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Vn = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, qn = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Sr = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, Or = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Un = function(t, e, i) {
  return t.style[e] = i;
}, Yn = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Xn = function(t, e, i) {
  return t._gsap[e] = i;
}, Wn = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Gn = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, $n = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, V = "transform", J = V + "Origin", Zn = function u(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in bt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = mt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = xt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : xt(r, t), t === J && (this.tfm.zOrigin = s.zOrigin);
    else
      return mt.transform.split(",").forEach(function(a) {
        return u.call(i, a, e);
      });
    if (this.props.indexOf(V) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(J, e, "")), t = V;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, kr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, jn = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(mi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = pi(), (!n || !n.isStart) && !i[V] && (kr(i), r.zOrigin && i[J] && (i[J] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Cr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: jn,
    save: Zn
  };
  return t._gsap || tt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Mr, Qe = function(t, e) {
  var i = St.createElementNS ? St.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : St.createElement(t);
  return i && i.style ? i : St.createElement(t);
}, nt = function u(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(mi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && u(t, ee(e) || e, 1) || "";
}, Di = "O,Moz,ms,Ms,Webkit".split(","), ee = function(t, e, i) {
  var r = e || Bt, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Di[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Di[s] : "") + t;
}, He = function() {
  zn() && window.document && (ki = window, St = ki.document, jt = St.documentElement, Bt = Qe("div") || {
    style: {}
  }, Qe("div"), V = ee(V), J = V + "Origin", Bt.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Mr = !!ee("perspective"), pi = tt.core.reverting, di = 1);
}, Ai = function(t) {
  var e = t.ownerSVGElement, i = Qe("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), jt.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), jt.removeChild(i), n;
}, Ei = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Dr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Ai(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Ai(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ei(t, ["x", "cx", "x1"]) || 0,
    y: +Ei(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Ar = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Dr(t));
}, Dt = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in bt && e !== J && (e = V), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(mi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, Ot = function(t, e, i, r, n, s) {
  var a = new H(t._pt, e, i, 0, 1, s ? Or : Sr);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Ri = {
  deg: 1,
  rad: 1,
  turn: 1
}, Kn = {
  grid: 1,
  flex: 1
}, At = function u(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Bt.style, o = Ln.test(e), f = t.tagName.toLowerCase() === "svg", h = (f ? "client" : "offset") + (o ? "Width" : "Height"), _ = 100, c = r === "px", d = r === "%", p, l, m, y;
  if (r === s || !n || Ri[r] || Ri[s])
    return n;
  if (s !== "px" && !c && (n = u(t, e, i, "px")), y = t.getCTM && Ar(t), (d || s === "%") && (bt[e] || ~e.indexOf("adius")))
    return p = y ? t.getBBox()[o ? "width" : "height"] : t[h], U(d ? n / p * _ : n / 100 * p);
  if (a[o ? "width" : "height"] = _ + (c ? s : r), l = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !f ? t : t.parentNode, y && (l = (t.ownerSVGElement || {}).parentNode), (!l || l === St || !l.appendChild) && (l = St.body), m = l._gsap, m && d && m.width && o && m.time === it.time && !m.uncache)
    return U(n / m.width * _);
  if (d && (e === "height" || e === "width")) {
    var g = t.style[e];
    t.style[e] = _ + r, p = t[h], g ? t.style[e] = g : Dt(t, e);
  } else
    (d || s === "%") && !Kn[nt(l, "display")] && (a.position = nt(t, "position")), l === t && (a.position = "static"), l.appendChild(Bt), p = Bt[h], l.removeChild(Bt), a.position = "absolute";
  return o && d && (m = Vt(l), m.time = it.time, m.width = l[h]), U(c ? p * n / _ : p && n ? _ / p * n : 0);
}, xt = function(t, e, i, r) {
  var n;
  return di || He(), e in mt && e !== "transform" && (e = mt[e], ~e.indexOf(",") && (e = e.split(",")[0])), bt[e] && e !== "transform" ? (n = pe(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Ce(nt(t, J)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = ke[e] && ke[e](t, e, i) || nt(t, e) || ji(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? At(t, e, n, i) + i : n;
}, Qn = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = ee(e, t, 1), s = n && nt(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = nt(t, "borderTopColor"));
  }
  var a = new H(this._pt, t.style, e, 0, 1, br), o = 0, f = 0, h, _, c, d, p, l, m, y, g, T, w, v;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = nt(t, r.substring(4, r.indexOf(")")))), r === "auto" && (l = t.style[e], t.style[e] = r, r = nt(t, e) || r, l ? t.style[e] = l : Dt(t, e)), h = [i, r], dr(h), i = h[0], r = h[1], c = i.match(Gt) || [], v = r.match(Gt) || [], v.length) {
    for (; _ = Gt.exec(r); )
      m = _[0], g = r.substring(o, _.index), p ? p = (p + 1) % 5 : (g.substr(-5) === "rgba(" || g.substr(-5) === "hsla(") && (p = 1), m !== (l = c[f++] || "") && (d = parseFloat(l) || 0, w = l.substr((d + "").length), m.charAt(1) === "=" && (m = Zt(d, m) + w), y = parseFloat(m), T = m.substr((y + "").length), o = Gt.lastIndex - T.length, T || (T = T || st.units[e] || w, o === r.length && (r += T, a.e += T)), w !== T && (d = At(t, e, l, T) || 0), a._pt = {
        _next: a._pt,
        p: g || f === 1 ? g : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: y - d,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = o < r.length ? r.substring(o, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? Or : Sr;
  return Xi.test(r) && (a.e = 0), this._pt = a, a;
}, Fi = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Hn = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Fi[i] || i, e[1] = Fi[r] || r, e.join(" ");
}, Jn = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, o, f;
    if (n === "all" || n === !0)
      r.cssText = "", o = 1;
    else
      for (n = n.split(","), f = n.length; --f > -1; )
        a = n[f], bt[a] && (o = 1, a = a === "transformOrigin" ? J : V), Dt(i, a);
    o && (Dt(i, V), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", pe(i, 1), s.uncache = 1, kr(r)));
  }
}, ke = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new H(t._pt, e, i, 0, 0, Jn);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, de = [1, 0, 0, 1, 0, 0], Er = {}, Rr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, zi = function(t) {
  var e = nt(t, V);
  return Rr(e) ? de : e.substr(7).match(Yi).map(U);
}, gi = function(t, e) {
  var i = t._gsap || Vt(t), r = t.style, n = zi(t), s, a, o, f;
  return i.svg && t.getAttribute("transform") ? (o = t.transform.baseVal.consolidate().matrix, n = [o.a, o.b, o.c, o.d, o.e, o.f], n.join(",") === "1,0,0,1,0,0" ? de : n) : (n === de && !t.offsetParent && t !== jt && !i.svg && (o = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (f = 1, a = t.nextElementSibling, jt.appendChild(t)), n = zi(t), o ? r.display = o : Dt(t, "display"), f && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : jt.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Je = function(t, e, i, r, n, s) {
  var a = t._gsap, o = n || gi(t, !0), f = a.xOrigin || 0, h = a.yOrigin || 0, _ = a.xOffset || 0, c = a.yOffset || 0, d = o[0], p = o[1], l = o[2], m = o[3], y = o[4], g = o[5], T = e.split(" "), w = parseFloat(T[0]) || 0, v = parseFloat(T[1]) || 0, S, x, P, b;
  i ? o !== de && (x = d * m - p * l) && (P = w * (m / x) + v * (-l / x) + (l * g - m * y) / x, b = w * (-p / x) + v * (d / x) - (d * g - p * y) / x, w = P, v = b) : (S = Dr(t), w = S.x + (~T[0].indexOf("%") ? w / 100 * S.width : w), v = S.y + (~(T[1] || T[0]).indexOf("%") ? v / 100 * S.height : v)), r || r !== !1 && a.smooth ? (y = w - f, g = v - h, a.xOffset = _ + (y * d + g * l) - y, a.yOffset = c + (y * p + g * m) - g) : a.xOffset = a.yOffset = 0, a.xOrigin = w, a.yOrigin = v, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[J] = "0px 0px", s && (Ot(s, a, "xOrigin", f, w), Ot(s, a, "yOrigin", h, v), Ot(s, a, "xOffset", _, a.xOffset), Ot(s, a, "yOffset", c, a.yOffset)), t.setAttribute("data-svg-origin", w + " " + v);
}, pe = function(t, e) {
  var i = t._gsap || new mr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", o = getComputedStyle(t), f = nt(t, J) || "0", h, _, c, d, p, l, m, y, g, T, w, v, S, x, P, b, O, D, M, k, A, z, E, N, Z, wt, Rt, lt, Ft, yi, yt, zt;
  return h = _ = c = l = m = y = g = T = w = 0, d = p = 1, i.svg = !!(t.getCTM && Ar(t)), o.translate && ((o.translate !== "none" || o.scale !== "none" || o.rotate !== "none") && (r[V] = (o.translate !== "none" ? "translate3d(" + (o.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (o.rotate !== "none" ? "rotate(" + o.rotate + ") " : "") + (o.scale !== "none" ? "scale(" + o.scale.split(" ").join(",") + ") " : "") + (o[V] !== "none" ? o[V] : "")), r.scale = r.rotate = r.translate = "none"), x = gi(t, i.svg), i.svg && (i.uncache ? (Z = t.getBBox(), f = i.xOrigin - Z.x + "px " + (i.yOrigin - Z.y) + "px", N = "") : N = !e && t.getAttribute("data-svg-origin"), Je(t, N || f, !!N || i.originIsAbsolute, i.smooth !== !1, x)), v = i.xOrigin || 0, S = i.yOrigin || 0, x !== de && (D = x[0], M = x[1], k = x[2], A = x[3], h = z = x[4], _ = E = x[5], x.length === 6 ? (d = Math.sqrt(D * D + M * M), p = Math.sqrt(A * A + k * k), l = D || M ? Wt(M, D) * It : 0, g = k || A ? Wt(k, A) * It + l : 0, g && (p *= Math.abs(Math.cos(g * Kt))), i.svg && (h -= v - (v * D + S * k), _ -= S - (v * M + S * A))) : (zt = x[6], yi = x[7], Rt = x[8], lt = x[9], Ft = x[10], yt = x[11], h = x[12], _ = x[13], c = x[14], P = Wt(zt, Ft), m = P * It, P && (b = Math.cos(-P), O = Math.sin(-P), N = z * b + Rt * O, Z = E * b + lt * O, wt = zt * b + Ft * O, Rt = z * -O + Rt * b, lt = E * -O + lt * b, Ft = zt * -O + Ft * b, yt = yi * -O + yt * b, z = N, E = Z, zt = wt), P = Wt(-k, Ft), y = P * It, P && (b = Math.cos(-P), O = Math.sin(-P), N = D * b - Rt * O, Z = M * b - lt * O, wt = k * b - Ft * O, yt = A * O + yt * b, D = N, M = Z, k = wt), P = Wt(M, D), l = P * It, P && (b = Math.cos(P), O = Math.sin(P), N = D * b + M * O, Z = z * b + E * O, M = M * b - D * O, E = E * b - z * O, D = N, z = Z), m && Math.abs(m) + Math.abs(l) > 359.9 && (m = l = 0, y = 180 - y), d = U(Math.sqrt(D * D + M * M + k * k)), p = U(Math.sqrt(E * E + zt * zt)), P = Wt(z, E), g = Math.abs(P) > 2e-4 ? P * It : 0, w = yt ? 1 / (yt < 0 ? -yt : yt) : 0), i.svg && (N = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Rr(nt(t, V)), N && t.setAttribute("transform", N))), Math.abs(g) > 90 && Math.abs(g) < 270 && (n ? (d *= -1, g += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (p *= -1, g += g <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = _ - ((i.yPercent = _ && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = c + s, i.scaleX = U(d), i.scaleY = U(p), i.rotation = U(l) + a, i.rotationX = U(m) + a, i.rotationY = U(y) + a, i.skewX = g + a, i.skewY = T + a, i.transformPerspective = w + s, (i.zOrigin = parseFloat(f.split(" ")[2]) || !e && i.zOrigin || 0) && (r[J] = Ce(f)), i.xOffset = i.yOffset = 0, i.force3D = st.force3D, i.renderTransform = i.svg ? es : Mr ? Fr : ts, i.uncache = 0, i;
}, Ce = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Be = function(t, e, i) {
  var r = G(e);
  return U(parseFloat(e) + parseFloat(At(t, "x", i + "px", r))) + r;
}, ts = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Fr(t, e);
}, Lt = "0deg", ie = "0px", Nt = ") ", Fr = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, o = i.z, f = i.rotation, h = i.rotationY, _ = i.rotationX, c = i.skewX, d = i.skewY, p = i.scaleX, l = i.scaleY, m = i.transformPerspective, y = i.force3D, g = i.target, T = i.zOrigin, w = "", v = y === "auto" && t && t !== 1 || y === !0;
  if (T && (_ !== Lt || h !== Lt)) {
    var S = parseFloat(h) * Kt, x = Math.sin(S), P = Math.cos(S), b;
    S = parseFloat(_) * Kt, b = Math.cos(S), s = Be(g, s, x * b * -T), a = Be(g, a, -Math.sin(S) * -T), o = Be(g, o, P * b * -T + T);
  }
  m !== ie && (w += "perspective(" + m + Nt), (r || n) && (w += "translate(" + r + "%, " + n + "%) "), (v || s !== ie || a !== ie || o !== ie) && (w += o !== ie || v ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + Nt), f !== Lt && (w += "rotate(" + f + Nt), h !== Lt && (w += "rotateY(" + h + Nt), _ !== Lt && (w += "rotateX(" + _ + Nt), (c !== Lt || d !== Lt) && (w += "skew(" + c + ", " + d + Nt), (p !== 1 || l !== 1) && (w += "scale(" + p + ", " + l + Nt), g.style[V] = w || "translate(0, 0)";
}, es = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, o = i.rotation, f = i.skewX, h = i.skewY, _ = i.scaleX, c = i.scaleY, d = i.target, p = i.xOrigin, l = i.yOrigin, m = i.xOffset, y = i.yOffset, g = i.forceCSS, T = parseFloat(s), w = parseFloat(a), v, S, x, P, b;
  o = parseFloat(o), f = parseFloat(f), h = parseFloat(h), h && (h = parseFloat(h), f += h, o += h), o || f ? (o *= Kt, f *= Kt, v = Math.cos(o) * _, S = Math.sin(o) * _, x = Math.sin(o - f) * -c, P = Math.cos(o - f) * c, f && (h *= Kt, b = Math.tan(f - h), b = Math.sqrt(1 + b * b), x *= b, P *= b, h && (b = Math.tan(h), b = Math.sqrt(1 + b * b), v *= b, S *= b)), v = U(v), S = U(S), x = U(x), P = U(P)) : (v = _, P = c, S = x = 0), (T && !~(s + "").indexOf("px") || w && !~(a + "").indexOf("px")) && (T = At(d, "x", s, "px"), w = At(d, "y", a, "px")), (p || l || m || y) && (T = U(T + p - (p * v + l * x) + m), w = U(w + l - (p * S + l * P) + y)), (r || n) && (b = d.getBBox(), T = U(T + r / 100 * b.width), w = U(w + n / 100 * b.height)), b = "matrix(" + v + "," + S + "," + x + "," + P + "," + T + "," + w + ")", d.setAttribute("transform", b), g && (d.style[V] = b);
}, is = function(t, e, i, r, n) {
  var s = 360, a = X(n), o = parseFloat(n) * (a && ~n.indexOf("rad") ? It : 1), f = o - r, h = r + f + "deg", _, c;
  return a && (_ = n.split("_")[1], _ === "short" && (f %= s, f !== f % (s / 2) && (f += f < 0 ? s : -s)), _ === "cw" && f < 0 ? f = (f + s * Mi) % s - ~~(f / s) * s : _ === "ccw" && f > 0 && (f = (f - s * Mi) % s - ~~(f / s) * s)), t._pt = c = new H(t._pt, e, i, r, f, In), c.e = h, c.u = "deg", t._props.push(i), c;
}, Li = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, rs = function(t, e, i) {
  var r = Li({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, o, f, h, _, c, d, p;
  r.svg ? (f = i.getAttribute("transform"), i.setAttribute("transform", ""), s[V] = e, a = pe(i, 1), Dt(i, V), i.setAttribute("transform", f)) : (f = getComputedStyle(i)[V], s[V] = e, a = pe(i, 1), s[V] = f);
  for (o in bt)
    f = r[o], h = a[o], f !== h && n.indexOf(o) < 0 && (d = G(f), p = G(h), _ = d !== p ? At(i, o, f, p) : parseFloat(f), c = parseFloat(h), t._pt = new H(t._pt, a, o, _, c - _, Ke), t._pt.u = p || 0, t._props.push(o));
  Li(a, r);
};
Q("padding,margin,Width,Radius", function(u, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? u + a : "border" + a + u;
  });
  ke[t > 1 ? "border" + u : u] = function(a, o, f, h, _) {
    var c, d;
    if (arguments.length < 4)
      return c = s.map(function(p) {
        return xt(a, p, f);
      }), d = c.join(" "), d.split(c[0]).length === 5 ? c[0] : d;
    c = (h + "").split(" "), d = {}, s.forEach(function(p, l) {
      return d[p] = c[l] = c[l] || c[(l - 1) / 2 | 0];
    }), a.init(o, d, _);
  };
});
var zr = {
  name: "css",
  register: He,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, o = i.vars.startAt, f, h, _, c, d, p, l, m, y, g, T, w, v, S, x, P, b;
    di || He(), this.styles = this.styles || Cr(t), P = this.styles.props, this.tween = i;
    for (l in e)
      if (l !== "autoRound" && (h = e[l], !(et[l] && gr(l, e, i, r, t, n)))) {
        if (d = typeof h, p = ke[l], d === "function" && (h = h.call(i, r, t, n), d = typeof h), d === "string" && ~h.indexOf("random(") && (h = le(h)), p)
          p(this, t, l, h, i) && (x = 1);
        else if (l.substr(0, 2) === "--")
          f = (getComputedStyle(t).getPropertyValue(l) + "").trim(), h += "", Ct.lastIndex = 0, Ct.test(f) || (m = G(f), y = G(h), y ? m !== y && (f = At(t, l, f, y) + y) : m && (h += m)), this.add(a, "setProperty", f, h, r, n, 0, 0, l), s.push(l), P.push(l, 0, a[l]);
        else if (d !== "undefined") {
          if (o && l in o ? (f = typeof o[l] == "function" ? o[l].call(i, r, t, n) : o[l], X(f) && ~f.indexOf("random(") && (f = le(f)), G(f + "") || f === "auto" || (f += st.units[l] || G(xt(t, l)) || ""), (f + "").charAt(1) === "=" && (f = xt(t, l))) : f = xt(t, l), c = parseFloat(f), g = d === "string" && h.charAt(1) === "=" && h.substr(0, 2), g && (h = h.substr(2)), _ = parseFloat(h), l in mt && (l === "autoAlpha" && (c === 1 && xt(t, "visibility") === "hidden" && _ && (c = 0), P.push("visibility", 0, a.visibility), Ot(this, a, "visibility", c ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), l !== "scale" && l !== "transform" && (l = mt[l], ~l.indexOf(",") && (l = l.split(",")[0]))), T = l in bt, T) {
            if (this.styles.save(l), b = h, d === "string" && h.substring(0, 6) === "var(--") {
              if (h = nt(t, h.substring(4, h.indexOf(")"))), h.substring(0, 5) === "calc(") {
                var O = t.style.perspective;
                t.style.perspective = h, h = nt(t, "perspective"), O ? t.style.perspective = O : Dt(t, "perspective");
              }
              _ = parseFloat(h);
            }
            if (w || (v = t._gsap, v.renderTransform && !e.parseTransform || pe(t, e.parseTransform), S = e.smoothOrigin !== !1 && v.smooth, w = this._pt = new H(this._pt, a, V, 0, 1, v.renderTransform, v, 0, -1), w.dep = 1), l === "scale")
              this._pt = new H(this._pt, v, "scaleY", v.scaleY, (g ? Zt(v.scaleY, g + _) : _) - v.scaleY || 0, Ke), this._pt.u = 0, s.push("scaleY", l), l += "X";
            else if (l === "transformOrigin") {
              P.push(J, 0, a[J]), h = Hn(h), v.svg ? Je(t, h, 0, S, 0, this) : (y = parseFloat(h.split(" ")[2]) || 0, y !== v.zOrigin && Ot(this, v, "zOrigin", v.zOrigin, y), Ot(this, a, l, Ce(f), Ce(h)));
              continue;
            } else if (l === "svgOrigin") {
              Je(t, h, 1, S, 0, this);
              continue;
            } else if (l in Er) {
              is(this, v, l, c, g ? Zt(c, g + h) : h);
              continue;
            } else if (l === "smoothOrigin") {
              Ot(this, v, "smooth", v.smooth, h);
              continue;
            } else if (l === "force3D") {
              v[l] = h;
              continue;
            } else if (l === "transform") {
              rs(this, h, t);
              continue;
            }
          } else l in a || (l = ee(l) || l);
          if (T || (_ || _ === 0) && (c || c === 0) && !Nn.test(h) && l in a)
            m = (f + "").substr((c + "").length), _ || (_ = 0), y = G(h) || (l in st.units ? st.units[l] : m), m !== y && (c = At(t, l, f, y)), this._pt = new H(this._pt, T ? v : a, l, c, (g ? Zt(c, g + _) : _) - c, !T && (y === "px" || l === "zIndex") && e.autoRound !== !1 ? qn : Ke), this._pt.u = y || 0, T && b !== h ? (this._pt.b = f, this._pt.e = b, this._pt.r = Vn) : m !== y && y !== "%" && (this._pt.b = f, this._pt.r = Bn);
          else if (l in a)
            Qn.call(this, t, l, f, g ? g + h : h);
          else if (l in t)
            this.add(t, l, f || t[l], g ? g + h : h, r, n);
          else if (l !== "parseTransform") {
            ni(l, h);
            continue;
          }
          T || (l in a ? P.push(l, 0, a[l]) : typeof t[l] == "function" ? P.push(l, 2, t[l]()) : P.push(l, 1, f || t[l])), s.push(l);
        }
      }
    x && wr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !pi())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: xt,
  aliases: mt,
  getSetter: function(t, e, i) {
    var r = mt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in bt && e !== J && (t._gsap.x || xt(t, "x")) ? i && Ci === i ? e === "scale" ? Wn : Xn : (Ci = i || {}) && (e === "scale" ? Gn : $n) : t.style && !ei(t.style[e]) ? Un : ~e.indexOf("-") ? Yn : _i(t, e);
  },
  core: {
    _removeProperty: Dt,
    _getMatrix: gi
  }
};
tt.utils.checkPrefix = ee;
tt.core.getStyleSaver = Cr;
(function(u, t, e, i) {
  var r = Q(u + "," + t + "," + e, function(n) {
    bt[n] = 1;
  });
  Q(t, function(n) {
    st.units[n] = "deg", Er[n] = 1;
  }), mt[r[13]] = u + "," + t, Q(i, function(n) {
    var s = n.split(":");
    mt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Q("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(u) {
  st.units[u] = "px";
});
tt.registerPlugin(zr);
var _t = tt.registerPlugin(zr) || tt;
_t.core.Tween;
const ct = {
  depthRatio: 50 / 86.77616756322344,
  cameraDistanceToHeight: 300 / 86.77616756322344,
  durationFrames: 60,
  halfDurationFrames: 30,
  bankDegrees: 10
}, Lr = (u) => Math.max(0, Math.min(1, u));
function ns(u) {
  const t = Lr(Number.isFinite(u) ? u : 0);
  if (t === 0 || t === 1 || t === 0.5) return t;
  let e = 0, i = 1;
  for (let n = 0; n < 36; n += 1) {
    const s = (e + i) / 2, a = 1 - s;
    3 * a * a * s * 0.838 + 3 * a * s * s * 0.162 + s * s * s < t ? e = s : i = s;
  }
  const r = (e + i) / 2;
  return r * r * (3 - 2 * r);
}
function ss(u) {
  const t = Math.max(0, Math.min(
    ct.durationFrames,
    Number.isFinite(u) ? u : 0
  )), e = t <= ct.halfDurationFrames, i = e ? t / ct.halfDurationFrames : (t - ct.halfDurationFrames) / ct.halfDurationFrames, r = ns(i), n = (e ? -90 * (1 - r) : 90 * r) || 0, s = e ? ct.bankDegrees * (1 - r) : ct.bankDegrees * r;
  return { frame: t, pitch: n, bank: s, parentBank: -s || 0, childBank: s };
}
function Ni(u, t) {
  const e = Lr(Number.isFinite(t) ? t : 0);
  return ss(
    (u === "outgoing" ? ct.halfDurationFrames : 0) + e * ct.halfDurationFrames
  );
}
function as(u) {
  const t = [];
  let e = 0;
  for (const i of u) {
    const r = e + i.length;
    /\s/u.test(i) || t.push({ text: i, start: e, end: r }), e = r;
  }
  return t;
}
function os(u, t, e) {
  if (!e.staggerEnabled || t <= 1) return { offset: 0, duration: 1 };
  const i = Number.isFinite(e.staggerAmount) ? Math.min(0.5, Math.max(0, e.staggerAmount)) : 0, r = Math.min(t - 1, Math.max(0, u)), n = e.staggerFrom === "end" ? t - 1 - r : r;
  return { offset: i * n / (t - 1), duration: 1 - i };
}
const us = [
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "font-stretch",
  "font-kerning",
  "font-feature-settings",
  "font-variation-settings",
  "font-optical-sizing",
  "font-variant",
  "font-synthesis",
  "letter-spacing",
  "word-spacing",
  "line-height",
  "text-transform",
  "text-rendering",
  "direction"
];
function fs(u, t) {
  const e = u.ownerDocument, i = e.defaultView;
  if (!i) return;
  const r = Array.from(u.querySelectorAll(".cl-measure")).map((s) => {
    const a = s.parentElement, o = e.createElement("span"), f = i.getComputedStyle(s);
    for (const h of us) o.style.setProperty(h, f.getPropertyValue(h));
    return Object.assign(o.style, {
      position: "fixed",
      left: "-10000px",
      top: "0",
      display: "block",
      width: "max-content",
      whiteSpace: "pre",
      visibility: "hidden",
      pointerEvents: "none",
      margin: "0",
      padding: "0",
      border: "0"
    }), o.setAttribute("aria-hidden", "true"), o.textContent = s.textContent, { item: a, probe: o };
  }), n = e.createDocumentFragment();
  r.forEach(({ probe: s }) => n.append(s)), t.append(n);
  try {
    r.map(({ item: a, probe: o }) => {
      const f = o.getBoundingClientRect(), h = o.firstChild, _ = e.createRange(), d = (a ? Array.from(a.querySelectorAll("[data-letter-start]")) : []).map((p) => {
        var y;
        const l = Number(p.dataset.letterStart), m = Number(p.dataset.letterEnd);
        return !h || !Number.isInteger(l) || !Number.isInteger(m) || l < 0 || m > (((y = h.textContent) == null ? void 0 : y.length) ?? 0) ? null : (_.setStart(h, l), _.setEnd(h, m), { letter: p, left: _.getBoundingClientRect().left - f.left });
      });
      return { item: a, width: f.width, offsets: d };
    }).forEach(({ item: a, width: o, offsets: f }) => {
      !a || o <= 0 || (a.style.setProperty("--cl-word-width", `${o}px`), f.forEach((h) => {
        h && h.letter.style.setProperty("--cl-letter-x", `${h.left}px`);
      }));
    });
  } finally {
    r.forEach(({ probe: s }) => s.remove());
  }
}
const Nr = ["Made by", "Google", "Gemini", "Android", "Pixel"], Te = (u) => _t.utils.clamp(0, 1, u), hs = (u) => {
  const t = Te(u);
  return t * t * (3 - 2 * t);
}, Ii = (u) => hs((0.82 - Math.abs(u.pitch) / 90) / 0.34);
function Bi(u, t) {
  const e = t.words === void 0 ? u.words : t.words.filter((i) => typeof i == "string" && i.trim().length > 0);
  return {
    words: e.length ? [...e] : [...Nr],
    staggerEnabled: t.staggerEnabled ?? u.staggerEnabled,
    staggerAmount: t.staggerAmount === void 0 || !Number.isFinite(t.staggerAmount) ? u.staggerAmount : _t.utils.clamp(0, 0.5, t.staggerAmount),
    staggerFrom: t.staggerFrom === "start" || t.staggerFrom === "end" ? t.staggerFrom : u.staggerFrom,
    reducedMotion: Object.prototype.hasOwnProperty.call(t, "reducedMotion") ? t.reducedMotion : u.reducedMotion
  };
}
function ls(u, t = {}) {
  const e = u.ownerDocument, i = e.defaultView;
  if (!i) throw new Error("Cinema Letters requires a browser document.");
  let r = Bi({
    words: [...Nr],
    staggerEnabled: !0,
    staggerAmount: 0.04,
    staggerFrom: "start",
    reducedMotion: void 0
  }, t), n = 0, s = !1, a = 0, o, f = [];
  const h = i.matchMedia("(prefers-reduced-motion: reduce)"), _ = e.createElement("div");
  _.className = "cl-effect";
  const c = e.createElement("div");
  c.className = "cl-stage";
  const d = e.createElement("ul");
  d.className = "cl-words", d.setAttribute("role", "list");
  const p = e.createElement("div");
  p.className = "cl-measurements", p.setAttribute("aria-hidden", "true"), c.append(d), _.append(c, p), u.append(_);
  function l(S) {
    const x = e.createElement("span");
    return x.className = S, x;
  }
  function m() {
    var O;
    if (s || _.dataset.clMotion !== "true") return;
    const S = f.length - 1;
    if (S <= 0) {
      (O = f[0]) == null || O.letters.forEach((D) => {
        const M = Ni("incoming", 1);
        D.pose(M), D.opacity(Ii(M));
      });
      return;
    }
    const x = n * S, P = Math.min(S - 1, Math.floor(x)), b = x - P;
    f.forEach((D, M) => {
      D.letters.forEach((k) => {
        if (M !== P && M !== P + 1) {
          k.opacity(0);
          return;
        }
        const A = Te((b - k.offset) / k.duration), z = Te((A - 0.15) / 0.7), E = Ni(M === P ? "outgoing" : "incoming", z);
        k.pose(E), k.opacity(Ii(E));
      });
    });
  }
  function y() {
    var x;
    if (s || (a && (i.cancelAnimationFrame(a), a = 0), _.dataset.clMotion !== "true")) return;
    fs(_, p);
    const S = (x = f[0]) == null ? void 0 : x.item;
    if (S) {
      const P = parseFloat(i.getComputedStyle(S).height);
      P > 0 && Number.isFinite(P) && (_.style.setProperty("--cl-depth", `${P * ct.depthRatio}px`), _.style.setProperty("--cl-perspective", `${P * ct.cameraDistanceToHeight}px`));
    }
    m();
  }
  function g() {
    s || a || (a = i.requestAnimationFrame(() => {
      a = 0, y();
    }));
  }
  function T() {
    o == null || o.revert(), o = void 0, f = [], d.replaceChildren(), _.dataset.clMotion = String(!(r.reducedMotion ?? h.matches)), r.words.forEach((S) => {
      const x = e.createElement("li");
      x.className = "cl-item", x.setAttribute("aria-label", S);
      const P = l("cl-measure");
      P.setAttribute("aria-hidden", "true"), P.textContent = S, x.append(P), as(S).forEach((b) => {
        const O = l("cl-letter");
        O.setAttribute("aria-hidden", "true"), O.dataset.letterStart = String(b.start), O.dataset.letterEnd = String(b.end);
        const D = l("cl-axis"), M = l("cl-pitch"), k = l("cl-compensation"), A = l("cl-face"), z = l("cl-word"), E = l("cl-glyph");
        E.textContent = b.text, z.append(E), A.append(z), k.append(A), M.append(k), D.append(M), O.append(D), x.append(O);
      }), d.append(x);
    }), _.dataset.clMotion === "true" && (o = _t.context(() => {
      f = [...d.children].map((S) => {
        const x = S, b = [...x.querySelectorAll(".cl-letter")].map((O, D, M) => {
          const k = O.querySelector(".cl-axis"), A = O.querySelector(".cl-pitch"), z = O.querySelector(".cl-compensation"), E = O.querySelector(".cl-word");
          _t.set([k, z], { rotationZ: 0 }), _t.set(A, { rotationX: 0 }), _t.set(E, { opacity: 0 });
          const N = _t.quickSetter(k, "rotationZ", "deg"), Z = _t.quickSetter(A, "rotationX", "deg"), wt = _t.quickSetter(z, "rotationZ", "deg"), Rt = _t.quickSetter(E, "opacity");
          return {
            ...os(D, M.length, r),
            pose(lt) {
              N(lt.parentBank), Z(lt.pitch), wt(lt.childBank);
            },
            opacity(lt) {
              Rt(lt);
            }
          };
        });
        return { item: x, letters: b };
      });
    }, _)), y();
  }
  function w() {
    !s && r.reducedMotion === void 0 && T();
  }
  const v = new ResizeObserver(g);
  return v.observe(u), h.addEventListener("change", w), e.fonts.addEventListener("loadingdone", g), e.fonts.ready.then(g), T(), {
    setProgress(S) {
      s || !Number.isFinite(S) || (n = Te(S), m());
    },
    update(S) {
      s || (r = Bi(r, S), T());
    },
    refresh: y,
    destroy() {
      s || (s = !0, a && i.cancelAnimationFrame(a), v.disconnect(), h.removeEventListener("change", w), e.fonts.removeEventListener("loadingdone", g), o == null || o.revert(), _.remove(), f = []);
    }
  };
}
export {
  Nr as DEFAULT_WORDS,
  ls as createCinemaLetters
};
