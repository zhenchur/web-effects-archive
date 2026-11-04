function gt(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function Ii(o, t) {
  o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.__proto__ = t;
}
/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var nt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, oe = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Je, W, z, ft = 1e8, D = 1 / ft, Ne = Math.PI * 2, zr = Ne / 4, Fr = 0, Ni = Math.sqrt, Lr = Math.cos, Ir = Math.sin, q = function(t) {
  return typeof t == "string";
}, N = function(t) {
  return typeof t == "function";
}, vt = function(t) {
  return typeof t == "number";
}, ti = function(t) {
  return typeof t > "u";
}, dt = function(t) {
  return typeof t == "object";
}, j = function(t) {
  return t !== !1;
}, ei = function() {
  return typeof window < "u";
}, me = function(t) {
  return N(t) || q(t);
}, Bi = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, H = Array.isArray, Nr = /random\([^)]+\)/g, Br = /,\s*/g, yi = /(?:-?\.?\d|\.)+/gi, Vi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Xt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, De = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Yi = /[+-]=-?[.\d]+/, Vr = /[^,'"\[\]\s]+/gi, Yr = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, L, lt, Be, ii, st = {}, xe = {}, Ui, Xi = function(t) {
  return (xe = $t(t, st)) && J;
}, ri = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, ue = function(t, e) {
  return !e && console.warn(t);
}, qi = function(t, e) {
  return t && (st[t] = e) && xe && (xe[t] = e) || st;
}, fe = function() {
  return 0;
}, Ur = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ge = {
  suppressEvents: !0,
  kill: !1
}, Xr = {
  suppressEvents: !0
}, ni = {}, St = [], Ve = {}, Wi, tt = {}, Re = {}, vi = 30, ye = [], si = "", ai = function(t) {
  var e = t[0], i, r;
  if (dt(e) || N(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ye.length; r-- && !ye[r].targetTest(e); )
      ;
    i = ye[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new cr(t[r], i))) || t.splice(r, 1);
  return t;
}, Lt = function(t) {
  return t._gsap || ai(ht(t))[0]._gsap;
}, Gi = function(t, e, i) {
  return (i = t[e]) && N(i) ? t[e]() : ti(i) && t.getAttribute && t.getAttribute(e) || i;
}, K = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, V = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, F = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Wt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, qr = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Te = function() {
  var t = St.length, e = St.slice(0), i, r;
  for (Ve = {}, St.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, oi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, Hi = function(t, e, i, r) {
  St.length && !W && Te(), t.render(e, i, !!(W && e < 0 && oi(t))), St.length && !W && Te();
}, $i = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Vr).length < 2 ? e : q(t) ? t.trim() : t;
}, ji = function(t) {
  return t;
}, at = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Wr = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, $t = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, xi = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = dt(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, be = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, ne = function(t) {
  var e = t.parent || L, i = t.keyframes ? Wr(H(t.keyframes)) : at;
  if (j(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Gr = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Ki = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Ce = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Ot = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, It = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Hr = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Ye = function(t, e, i, r) {
  return t._startAt && (W ? t._startAt.revert(ge) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, $r = function o(t) {
  return !t || t._ts && o(t.parent);
}, Ti = function(t) {
  return t._repeat ? jt(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, jt = function(t, e) {
  var i = Math.floor(t = F(t / e));
  return t && i === t ? i - 1 : i;
}, we = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Me = function(t) {
  return t._end = F(t._start + (t._tDur / Math.abs(t._ts || t._rts || D) || 0));
}, ke = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = F(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Me(t), i._dirty || It(i, t)), t;
}, Qi = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = we(t.rawTime(), e), (!e._dur || pe(0, e.totalDuration(), i) - e._tTime > D) && e.render(i, !0)), It(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -D;
  }
}, _t = function(t, e, i, r) {
  return e.parent && Ot(e), e._start = F((vt(i) ? i : i || t !== L ? ut(t, i, e) : t._time) + e._delay), e._end = F(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Ki(t, e, "_first", "_last", t._sort ? "_start" : 0), Ue(e) || (t._recent = e), r || Qi(t, e), t._ts < 0 && ke(t, t._tTime), t;
}, Zi = function(t, e) {
  return (st.ScrollTrigger || ri("scrollTrigger", e)) && st.ScrollTrigger.create(e, t);
}, Ji = function(t, e, i, r, n) {
  if (fi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !W && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Wi !== et.frame)
    return St.push(t), t._lazy = [n, r], 1;
}, jr = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, Ue = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Kr = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && jr(t) && !(!t._initted && Ue(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ue(t)) ? 0 : 1, a = t._rDelay, u = 0, f, h, _;
  if (a && t._repeat && (u = pe(0, t._tDur, e), h = jt(u, a), t._yoyo && h & 1 && (s = 1 - s), h !== jt(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || W || r || t._zTime === D || !e && t._zTime) {
    if (!t._initted && Ji(t, e, r, i, u))
      return;
    for (_ = t._zTime, t._zTime = e || (i ? D : 0), i || (i = e && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, f = t._pt; f; )
      f.r(s, f.d), f = f._next;
    e < 0 && Ye(t, e, i, !0), t._onUpdate && !i && it(t, "onUpdate"), u && t._repeat && !i && t.parent && it(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Ot(t, 1), !i && !W && (it(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Qr = function(t, e, i) {
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
}, Kt = function(t, e, i, r) {
  var n = t._repeat, s = F(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : F(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && ke(t, t._tTime = t._tDur * a), t.parent && Me(t), i || It(t.parent, t), t;
}, bi = function(t) {
  return t instanceof $ ? It(t) : Kt(t, t._dur);
}, Zr = {
  _start: 0,
  endTime: fe,
  totalDuration: fe
}, ut = function o(t, e, i) {
  var r = t.labels, n = t._recent || Zr, s = t.duration() >= ft ? n.endTime(!1) : t._dur, a, u, f;
  return q(e) && (isNaN(e) || e in r) ? (u = e.charAt(0), f = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (f ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), f && i && (u = u / 100 * (H(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + u : s + u)) : e == null ? s : +e;
}, se = function(t, e, i) {
  var r = vt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, u;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, u = i; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = j(u.vars.inherit) && u.parent;
    s.immediateRender = j(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new Y(e[0], s, e[n + 1]);
}, kt = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, pe = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, G = function(t, e) {
  return !q(t) || !(e = Yr.exec(t)) ? "" : e[1];
}, Jr = function(t, e, i) {
  return kt(i, function(r) {
    return pe(t, e, r);
  });
}, Xe = [].slice, tr = function(t, e) {
  return t && dt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && dt(t[0])) && !t.nodeType && t !== lt;
}, tn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return q(r) && !e || tr(r, 1) ? (n = i).push.apply(n, ht(r)) : i.push(r);
  }) || i;
}, ht = function(t, e, i) {
  return z && !e && z.selector ? z.selector(t) : q(t) && !i && (Be || !Qt()) ? Xe.call((e || ii).querySelectorAll(t), 0) : H(t) ? tn(t, i) : tr(t) ? Xe.call(t, 0) : t ? [t] : [];
}, qe = function(t) {
  return t = ht(t)[0] || ue("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return ht(e, i.querySelectorAll ? i : i === t ? ue("Invalid scope") || ii.createElement("div") : t);
  };
}, er = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, ir = function(t) {
  if (N(t))
    return t;
  var e = dt(t) ? t : {
    each: t
  }, i = Nt(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, u = isNaN(r) || a, f = e.axis, h = r, _ = r;
  return q(r) ? h = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && u && (h = r[0], _ = r[1]), function(c, d, p) {
    var l = (p || e).length, m = s[l], v, y, b, w, g, P, x, S, T;
    if (!m) {
      if (T = e.grid === "auto" ? 0 : (e.grid || [1, ft])[1], !T) {
        for (x = -ft; x < (x = p[T++].getBoundingClientRect().left) && T < l; )
          ;
        T < l && T--;
      }
      for (m = s[l] = [], v = u ? Math.min(T, l) * h - 0.5 : r % T, y = T === ft ? 0 : u ? l * _ / T - 0.5 : r / T | 0, x = 0, S = ft, P = 0; P < l; P++)
        b = P % T - v, w = y - (P / T | 0), m[P] = g = f ? Math.abs(f === "y" ? w : b) : Ni(b * b + w * w), g > x && (x = g), g < S && (S = g);
      r === "random" && er(m), m.max = x - S, m.min = S, m.v = l = (parseFloat(e.amount) || parseFloat(e.each) * (T > l ? l - 1 : f ? f === "y" ? l / T : T : Math.max(T, l / T)) || 0) * (r === "edges" ? -1 : 1), m.b = l < 0 ? n - l : n, m.u = G(e.amount || e.each) || 0, i = i && l < 0 ? dn(i) : i;
    }
    return l = (m[c] - m.min) / m.max || 0, F(m.b + (i ? i(l) : l) * m.v) + m.u;
  };
}, We = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = F(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (vt(i) ? 0 : G(i));
  };
}, rr = function(t, e) {
  var i = H(t), r, n;
  return !i && dt(t) && (r = i = t.radius || ft, t.values ? (t = ht(t.values), (n = !vt(t[0])) && (r *= r)) : t = We(t.increment)), kt(e, i ? N(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), f = ft, h = 0, _ = t.length, c, d; _--; )
      n ? (c = t[_].x - a, d = t[_].y - u, c = c * c + d * d) : c = Math.abs(t[_] - a), c < f && (f = c, h = _);
    return h = !r || f <= r ? t[h] : s, n || h === s || vt(s) ? h : h + G(s);
  } : We(t));
}, nr = function(t, e, i, r) {
  return kt(H(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return H(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, en = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, rn = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || G(i));
  };
}, nn = function(t, e, i) {
  return ar(t, e, 0, 1, i);
}, sr = function(t, e, i) {
  return kt(i, function(r) {
    return t[~~e(r)];
  });
}, sn = function o(t, e, i) {
  var r = e - t;
  return H(t) ? sr(t, o(0, t.length), e) : kt(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, an = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return H(t) ? sr(t, o(0, t.length - 1), e) : kt(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, he = function(t) {
  return t.replace(Nr, function(e) {
    var i = e.indexOf("[") + 1, r = e.substring(i || 7, i ? e.indexOf("]") : e.length - 1).split(Br);
    return nr(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5);
  });
}, ar = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return kt(n, function(u) {
    return i + ((u - t) / s * a || 0);
  });
}, on = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!n) {
    var s = q(t), a = {}, u, f, h, _, c;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (H(t) && !H(e)) {
      for (h = [], _ = t.length, c = _ - 2, f = 1; f < _; f++)
        h.push(o(t[f - 1], t[f]));
      _--, n = function(p) {
        p *= _;
        var l = Math.min(c, ~~p);
        return h[l](p - l);
      }, i = e;
    } else r || (t = $t(H(t) ? [] : {}, t));
    if (!h) {
      for (u in e)
        ui.call(a, t, u, "get", e[u]);
      n = function(p) {
        return _i(p, a) || (s ? t.p : t);
      };
    }
  }
  return kt(i, n);
}, wi = function(t, e, i) {
  var r = t.labels, n = ft, s, a, u;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (u = s, n = a);
  return u;
}, it = function(t, e, i) {
  var r = t.vars, n = r[e], s = z, a = t._ctx, u, f, h;
  if (n)
    return u = r[e + "Params"], f = r.callbackScope || t, i && St.length && Te(), a && (z = a), h = u ? n.apply(f, u) : n.call(f), z = s, h;
}, ie = function(t) {
  return Ot(t), t.scrollTrigger && t.scrollTrigger.kill(!!W), t.progress() < 1 && it(t, "onInterrupt"), t;
}, qt, or = [], ur = function(t) {
  if (t)
    if (t = !t.name && t.default || t, ei() || t.headless) {
      var e = t.name, i = N(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: fe,
        render: _i,
        add: ui,
        kill: Sn,
        modifier: wn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: li,
        aliases: {},
        register: 0
      };
      if (Qt(), t !== r) {
        if (tt[e])
          return;
        at(r, at(be(t, n), s)), $t(r.prototype, $t(n, be(t, s))), tt[r.prop = e] = r, t.targetTest && (ye.push(r), ni[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      qi(e, r), t.register && t.register(J, r, Q);
    } else
      or.push(t);
}, k = 255, re = {
  aqua: [0, k, k],
  lime: [0, k, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, k],
  navy: [0, 0, 128],
  white: [k, k, k],
  olive: [128, 128, 0],
  yellow: [k, k, 0],
  orange: [k, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [k, 0, 0],
  pink: [k, 192, 203],
  cyan: [0, k, k],
  transparent: [k, k, k, 0]
}, Ae = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * k + 0.5 | 0;
}, fr = function(t, e, i) {
  var r = t ? vt(t) ? [t >> 16, t >> 8 & k, t & k] : 0 : re.black, n, s, a, u, f, h, _, c, d, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), re[t])
      r = re[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & k, r & k, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & k, t & k];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(yi), !e)
        u = +r[0] % 360 / 360, f = +r[1] / 100, h = +r[2] / 100, s = h <= 0.5 ? h * (f + 1) : h + f - h * f, n = h * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Ae(u + 1 / 3, n, s), r[1] = Ae(u, n, s), r[2] = Ae(u - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Vi), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(yi) || re.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / k, s = r[1] / k, a = r[2] / k, _ = Math.max(n, s, a), c = Math.min(n, s, a), h = (_ + c) / 2, _ === c ? u = f = 0 : (d = _ - c, f = h > 0.5 ? d / (2 - _ - c) : d / (_ + c), u = _ === n ? (s - a) / d + (s < a ? 6 : 0) : _ === s ? (a - n) / d + 2 : (n - s) / d + 4, u *= 60), r[0] = ~~(u + 0.5), r[1] = ~~(f * 100 + 0.5), r[2] = ~~(h * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, hr = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Pt).forEach(function(n) {
    var s = n.match(Xt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Si = function(t, e, i) {
  var r = "", n = (t + r).match(Pt), s = e ? "hsla(" : "rgba(", a = 0, u, f, h, _;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = fr(c, e, 1)) && s + (e ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), i && (h = hr(t), u = i.c, u.join(r) !== h.c.join(r)))
    for (f = t.replace(Pt, "1").split(Xt), _ = f.length - 1; a < _; a++)
      r += f[a] + (~u.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
  if (!f)
    for (f = t.split(Pt), _ = f.length - 1; a < _; a++)
      r += f[a] + n[a];
  return r + f[_];
}, Pt = (function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in re)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
})(), un = /hsl[a]?\(/, lr = function(t) {
  var e = t.join(" "), i;
  if (Pt.lastIndex = 0, Pt.test(e))
    return i = un.test(e), t[1] = Si(t[1], i), t[0] = Si(t[0], i, hr(t[1])), !0;
}, le, et = (function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], u, f, h, _, c, d, p = function l(m) {
    var v = o() - r, y = m === !0, b, w, g, P;
    if ((v > t || v < 0) && (i += v - e), r += v, g = r - i, b = g - s, (b > 0 || y) && (P = ++_.frame, c = g - _.time * 1e3, _.time = g = g / 1e3, s += b + (b >= n ? 4 : n - b), w = 1), y || (u = f(l)), w)
      for (d = 0; d < a.length; d++)
        a[d](g, c, P, m);
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
      Ui && (!Be && ei() && (lt = Be = window, ii = lt.document || {}, st.gsap = J, (lt.gsapVersions || (lt.gsapVersions = [])).push(J.version), Xi(xe || lt.GreenSockGlobals || !lt.gsap && lt || {}), or.forEach(ur)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && _.sleep(), f = h || function(m) {
        return setTimeout(m, s - _.time * 1e3 + 1 | 0);
      }, le = 1, p(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(u), le = 0, f = fe;
    },
    lagSmoothing: function(m, v) {
      t = m || 1 / 0, e = Math.min(v || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = _.time * 1e3 + n;
    },
    add: function(m, v, y) {
      var b = v ? function(w, g, P, x) {
        m(w, g, P, x), _.remove(b);
      } : m;
      return _.remove(m), a[y ? "unshift" : "push"](b), Qt(), b;
    },
    remove: function(m, v) {
      ~(v = a.indexOf(m)) && a.splice(v, 1) && d >= v && d--;
    },
    _listeners: a
  }, _;
})(), Qt = function() {
  return !le && et.wake();
}, C = {}, fn = /^[\d.\-M][\d.\-,\s]/, hn = /["']/g, ln = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, u, f; n < s; n++)
    u = i[n], a = n !== s - 1 ? u.lastIndexOf(",") : u.length, f = u.substr(0, a), e[r] = isNaN(f) ? f.replace(hn, "").trim() : +f, r = u.substr(a + 1).trim();
  return e;
}, _n = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, cn = function(t) {
  var e = (t + "").split("("), i = C[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [ln(e[1])] : _n(t).split(",").map($i)) : C._CE && fn.test(t) ? C._CE("", t) : i;
}, dn = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Nt = function(t, e) {
  return t && (N(t) ? t : C[t] || cn(t)) || e;
}, Vt = function(t, e, i, r) {
  i === void 0 && (i = function(u) {
    return 1 - e(1 - u);
  }), r === void 0 && (r = function(u) {
    return u < 0.5 ? e(u * 2) / 2 : 1 - e((1 - u) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return K(t, function(a) {
    C[a] = st[a] = n, C[s = a.toLowerCase()] = i;
    for (var u in n)
      C[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = C[a + "." + u] = n[u];
  }), n;
}, _r = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Ee = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ne * (Math.asin(1 / r) || 0), a = function(h) {
    return h === 1 ? 1 : r * Math.pow(2, -10 * h) * Ir((h - s) * n) + 1;
  }, u = t === "out" ? a : t === "in" ? function(f) {
    return 1 - a(1 - f);
  } : _r(a);
  return n = Ne / n, u.config = function(f, h) {
    return o(t, f, h);
  }, u;
}, ze = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : _r(i);
  return r.config = function(n) {
    return o(t, n);
  }, r;
};
K("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, t) {
  var e = t < 5 ? t + 1 : t;
  Vt(o + ",Power" + (e - 1), t ? function(i) {
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
Vt("Elastic", Ee("in"), Ee("out"), Ee());
(function(o, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? o * a * a : a < i ? o * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? o * (a -= 2.25 / t) * a + 0.9375 : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Vt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Vt("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
Vt("Circ", function(o) {
  return -(Ni(1 - o * o) - 1);
});
Vt("Sine", function(o) {
  return o === 1 ? 1 : -Lr(o * zr) + 1;
});
Vt("Back", ze("in"), ze("out"), ze());
C.SteppedEase = C.steps = st.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - D;
    return function(a) {
      return ((r * pe(0, s, a) | 0) + n) * i;
    };
  }
};
oe.ease = C["quad.out"];
K("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return si += o + "," + o + "Params,";
});
var cr = function(t, e) {
  this.id = Fr++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Gi, this.set = e ? e.getSetter : li;
}, _e = /* @__PURE__ */ (function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Kt(this, +e.duration, 1, 1), this.data = e.data, z && (this._ctx = z, z.data.push(this)), le || et.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Kt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (Qt(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (ke(this, i), !n._dp || n.parent || Qi(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && _t(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === D || !this._initted && this._dur && i || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Hi(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ti(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ti(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? jt(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -D ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? we(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -D ? 0 : this._rts, this.totalTime(pe(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Me(this), Hr(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Qt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== D && (this._tTime -= D)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = F(i);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && _t(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (j(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? we(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Xr);
    var r = W;
    return W = i, oi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), W = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, bi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, bi(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(ut(this, i), j(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, j(r)), this._dur || (this._zTime = -D), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -D : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -D, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - D);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this, n = r._prom;
    return new Promise(function(s) {
      var a = N(i) ? i : ji, u = function() {
        var h = r.then;
        r.then = null, n && n(), N(a) && (a = a(r)) && (a.then || a === r) && (r.then = h), s(a), r.then = h;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? u() : r._prom = u;
    });
  }, t.kill = function() {
    ie(this);
  }, o;
})();
at(_e.prototype, {
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
  _zTime: -D,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var $ = /* @__PURE__ */ (function(o) {
  Ii(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = j(i.sortChildren), L && _t(i.parent || L, gt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Zi(gt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return se(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return se(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return se(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, ne(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Y(r, n, ut(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return _t(this, Y.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, u, f, h) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = f, s.onCompleteParams = h, s.parent = this, new Y(r, s, ut(this, u)), this;
  }, e.staggerFrom = function(r, n, s, a, u, f, h) {
    return s.runBackwards = 1, ne(s).immediateRender = j(s.immediateRender), this.staggerTo(r, n, s, a, u, f, h);
  }, e.staggerFromTo = function(r, n, s, a, u, f, h, _) {
    return a.startAt = s, ne(a).immediateRender = j(a.immediateRender), this.staggerTo(r, n, a, u, f, h, _);
  }, e.render = function(r, n, s) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, f = this._dur, h = r <= 0 ? 0 : F(r), _ = this._zTime < 0 != r < 0 && (this._initted || !f), c, d, p, l, m, v, y, b, w, g, P, x;
    if (this !== L && h > u && r >= 0 && (h = u), h !== this._tTime || s || _) {
      if (a !== this._time && f && (h += this._time - a, r += this._time - a), c = h, w = this._start, b = this._ts, v = !b, _ && (f || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (P = this._yoyo, m = f + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = F(h % m), h === u ? (l = this._repeat, c = f) : (g = F(h / m), l = ~~g, l && l === g && (c = f, l--), c > f && (c = f)), g = jt(this._tTime, m), !a && this._tTime && g !== l && this._tTime - g * m - this._dur <= 0 && (g = l), P && l & 1 && (c = f - c, x = 1), l !== g && !this._lock) {
          var S = P && g & 1, T = S === (P && l & 1);
          if (l < g && (S = !S), a = S ? 0 : h % f ? f : h, this._lock = 1, this.render(a || (x ? 0 : F(l * m)), n, !f)._lock = 0, this._tTime = h, !n && this.parent && it(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, g = l), a && a !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (f = this._dur, u = this._tDur, T && (this._lock = 2, a = S ? f : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = Qr(this, F(a), F(c)), y && (h -= c - (c = y._start))), this._tTime = h, this._time = c, this._act = !!b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && f && !n && !g && (it(this, "onStart"), this._tTime !== h))
        return this;
      if (c >= a && r >= 0)
        for (d = this._first; d; ) {
          if (p = d._next, (d._act || c >= d._start) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (c - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (c - d._start) * d._ts, n, s), c !== this._time || !this._ts && !v) {
              y = 0, p && (h += this._zTime = -D);
              break;
            }
          }
          d = p;
        }
      else {
        d = this._last;
        for (var O = r < 0 ? r : c; d; ) {
          if (p = d._prev, (d._act || O <= d._end) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (O - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (O - d._start) * d._ts, n, s || W && oi(d)), c !== this._time || !this._ts && !v) {
              y = 0, p && (h += this._zTime = O ? -D : D);
              break;
            }
          }
          d = p;
        }
      }
      if (y && !n && (this.pause(), y.render(c >= a ? 0 : -D)._zTime = c >= a ? 1 : -1, this._ts))
        return this._start = w, Me(this), this.render(r, n, s);
      this._onUpdate && !n && it(this, "onUpdate", !0), (h === u && this._tTime >= this.totalDuration() || !h && a) && (w === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((r || !f) && (h === u && this._ts > 0 || !h && this._ts < 0) && Ot(this, 1), !n && !(r < 0 && !a) && (h || a || !u) && (it(this, h === u && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (vt(n) || (n = ut(this, n, r)), !(r instanceof _e)) {
      if (H(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (q(r))
        return this.addLabel(r, n);
      if (N(r))
        r = Y.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? _t(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ft);
    for (var u = [], f = this._first; f; )
      f._start >= a && (f instanceof Y ? n && u.push(f) : (s && u.push(f), r && u.push.apply(u, f.getChildren(!0, n, s)))), f = f._next;
    return u;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return q(r) ? this.removeLabel(r) : N(r) ? this.killTweensOf(r) : (r.parent === this && Ce(this, r), r === this._recent && (this._recent = this._last), It(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = F(et.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = ut(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = Y.delayedCall(0, n || fe, s);
    return a.data = "isPause", this._hasPause = 1, _t(this, a, ut(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = ut(this, r); n; )
      n._start === r && n.data === "isPause" && Ot(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), u = a.length; u--; )
      Tt !== a[u] && a[u].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = ht(r), u = this._first, f = vt(n), h; u; )
      u instanceof Y ? qr(u._targets, a) && (f ? (!Tt || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (h = u.getTweensOf(a, n)).length && s.push.apply(s, h), u = u._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = ut(s, r), u = n, f = u.startAt, h = u.onStart, _ = u.onStartParams, c = u.immediateRender, d, p = Y.to(s, at({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (f && "time" in f ? f.time : s._time)) / s.timeScale()) || D,
      onStart: function() {
        if (s.pause(), !d) {
          var m = n.duration || Math.abs((a - (f && "time" in f ? f.time : s._time)) / s.timeScale());
          p._dur !== m && Kt(p, m, 0, 1).render(p._time, !0, !0), d = 1;
        }
        h && h.apply(p, _ || []);
      }
    }, n));
    return c ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, at({
      startAt: {
        time: ut(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), wi(this, ut(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), wi(this, ut(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + D);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    var a = this._first, u = this.labels, f;
    for (r = F(r); a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (f in u)
        u[f] >= s && (u[f] += r);
    return It(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), It(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, u = ft, f, h, _;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (_ = s.parent; a; )
        f = a._prev, a._dirty && a.totalDuration(), h = a._start, h > u && s._sort && a._ts && !s._lock ? (s._lock = 1, _t(s, a, h - a._delay, 1)._lock = 0) : u = h, h < 0 && a._ts && (n -= h, (!_ && !s._dp || _ && _.smoothChildTiming) && (s._start += F(h / s._ts), s._time -= h, s._tTime -= h), s.shiftChildren(-h, !1, -1 / 0), u = 0), a._end > n && a._ts && (n = a._end), a = f;
      Kt(s, s === L && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (L._ts && (Hi(L, we(r, L)), Wi = et.frame), et.frame >= vi) {
      vi += nt.autoSleep || 120;
      var n = L._first;
      if ((!n || !n._ts) && nt.autoSleep && et._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || et.sleep();
      }
    }
  }, t;
})(_e);
at($.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var pn = function(t, e, i, r, n, s, a) {
  var u = new Q(this._pt, t, e, 0, 1, vr, null, n), f = 0, h = 0, _, c, d, p, l, m, v, y;
  for (u.b = i, u.e = r, i += "", r += "", (v = ~r.indexOf("random(")) && (r = he(r)), s && (y = [i, r], s(y, t, e), i = y[0], r = y[1]), c = i.match(De) || []; _ = De.exec(r); )
    p = _[0], l = r.substring(f, _.index), d ? d = (d + 1) % 5 : l.substr(-5) === "rgba(" && (d = 1), p !== c[h++] && (m = parseFloat(c[h - 1]) || 0, u._pt = {
      _next: u._pt,
      p: l || h === 1 ? l : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? Wt(m, p) - m : parseFloat(p) - m,
      m: d && d < 4 ? Math.round : 0
    }, f = De.lastIndex);
  return u.c = f < r.length ? r.substring(f, r.length) : "", u.fp = a, (Yi.test(r) || v) && (u.e = 0), this._pt = u, u;
}, ui = function(t, e, i, r, n, s, a, u, f, h) {
  N(r) && (r = r(n || 0, t, s));
  var _ = t[e], c = i !== "get" ? i : N(_) ? f ? t[e.indexOf("set") || !N(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](f) : t[e]() : _, d = N(_) ? f ? xn : gr : hi, p;
  if (q(r) && (~r.indexOf("random(") && (r = he(r)), r.charAt(1) === "=" && (p = Wt(c, r) + (G(c) || 0), (p || p === 0) && (r = p))), !h || c !== r || Ge)
    return !isNaN(c * r) && r !== "" ? (p = new Q(this._pt, t, e, +c || 0, r - (c || 0), typeof _ == "boolean" ? bn : yr, 0, d), f && (p.fp = f), a && p.modifier(a, this, t), this._pt = p) : (!_ && !(e in t) && ri(e, r), pn.call(this, t, e, c, r, d, u || nt.stringFilter, f));
}, mn = function(t, e, i, r, n) {
  if (N(t) && (t = ae(t, n, e, i, r)), !dt(t) || t.style && t.nodeType || H(t) || Bi(t))
    return q(t) ? ae(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = ae(t[a], n, e, i, r);
  return s;
}, dr = function(t, e, i, r, n, s) {
  var a, u, f, h;
  if (tt[t] && (a = new tt[t]()).init(n, a.rawVars ? e[t] : mn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = u = new Q(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== qt))
    for (f = i._ptLookup[i._targets.indexOf(n)], h = a._props.length; h--; )
      f[a._props[h]] = u;
  return a;
}, Tt, Ge, fi = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, u = r.lazy, f = r.onUpdate, h = r.runBackwards, _ = r.yoyoEase, c = r.keyframes, d = r.autoRevert, p = t._dur, l = t._startAt, m = t._targets, v = t.parent, y = v && v.data === "nested" ? v.vars.targets : m, b = t._overwrite === "auto" && !Je, w = t.timeline, g = r.easeReverse || _, P, x, S, T, O, A, E, M, R, X, U, B, ot;
  if (w && (!c || !n) && (n = "none"), t._ease = Nt(n, oe.ease), t._rEase = g && (Nt(g) || t._ease), t._from = !w && !!r.runBackwards, t._from && (t.ratio = 1), !w || c && !r.stagger) {
    if (M = m[0] ? Lt(m[0]).harness : 0, B = M && r[M.prop], P = be(r, ni), l && (l._zTime < 0 && l.progress(1), e < 0 && h && a && !d ? l.render(-1, !0) : l.revert(h && p ? ge : Ur), l._lazy = 0), s) {
      if (Ot(t._startAt = Y.set(m, at({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !l && j(u),
        startAt: null,
        delay: 0,
        onUpdate: f && function() {
          return it(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (W || !a && !d) && t._startAt.revert(ge), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && p && !l) {
      if (e && (a = !1), S = at({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !l && j(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, P), B && (S[M.prop] = B), Ot(t._startAt = Y.set(m, S)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (W ? t._startAt.revert(ge) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, D, D);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = p && j(u) || u && !p, x = 0; x < m.length; x++) {
      if (O = m[x], E = O._gsap || ai(m)[x]._gsap, t._ptLookup[x] = X = {}, Ve[E.id] && St.length && Te(), U = y === m ? x : y.indexOf(O), M && (R = new M()).init(O, B || P, t, U, y) !== !1 && (t._pt = T = new Q(t._pt, O, R.name, 0, 1, R.render, R, 0, R.priority), R._props.forEach(function(Yt) {
        X[Yt] = T;
      }), R.priority && (A = 1)), !M || B)
        for (S in P)
          tt[S] && (R = dr(S, P, t, U, O, y)) ? R.priority && (A = 1) : X[S] = T = ui.call(t, O, S, "get", P[S], U, y, 0, r.stringFilter);
      t._op && t._op[x] && t.kill(O, t._op[x]), b && t._pt && (Tt = t, L.killTweensOf(O, X, t.globalTime(e)), ot = !t.parent, Tt = 0), t._pt && u && (Ve[E.id] = 1);
    }
    A && xr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = f, t._initted = (!t._op || t._pt) && !ot, c && e <= 0 && w.render(ft, !0, !0);
}, gn = function(t, e, i, r, n, s, a, u) {
  var f = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, _, c, d;
  if (!f)
    for (f = t._ptCache[e] = [], c = t._ptLookup, d = t._targets.length; d--; ) {
      if (h = c[d][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Ge = 1, t.vars[e] = "+=0", fi(t, a), Ge = 0, u ? ue(e + " not eligible for reset. Try splitting into individual properties") : 1;
      f.push(h);
    }
  for (d = f.length; d--; )
    _ = f[d], h = _._pt || _, h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + s * h.c, h.c = i - h.s, _.e && (_.e = V(i) + G(_.e)), _.b && (_.b = h.s + G(_.b));
}, yn = function(t, e) {
  var i = t[0] ? Lt(t[0]).harness : 0, r = i && i.aliases, n, s, a, u;
  if (!r)
    return e;
  n = $t({}, e);
  for (s in r)
    if (s in n)
      for (u = r[s].split(","), a = u.length; a--; )
        n[u[a]] = n[s];
  return n;
}, vn = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if (H(e))
    a = i[t] || (i[t] = []), e.forEach(function(u, f) {
      return a.push({
        t: f / (e.length - 1) * 100,
        v: u,
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
}, ae = function(t, e, i, r, n) {
  return N(t) ? t.call(e, i, r, n) : q(t) && ~t.indexOf("random(") ? he(t) : t;
}, pr = si + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", mr = {};
K(pr + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return mr[o] = 1;
});
var Y = /* @__PURE__ */ (function(o) {
  Ii(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : ne(r)) || this;
    var u = a.vars, f = u.duration, h = u.delay, _ = u.immediateRender, c = u.stagger, d = u.overwrite, p = u.keyframes, l = u.defaults, m = u.scrollTrigger, v = r.parent || L, y = (H(i) || Bi(i) ? vt(i[0]) : "length" in r) ? [i] : ht(i), b, w, g, P, x, S, T, O;
    if (a._targets = y.length ? ai(y) : ue("GSAP target " + i + " not found. https://gsap.com", !nt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, p || c || me(f) || me(h)) {
      r = a.vars;
      var A = r.easeReverse || r.yoyoEase;
      if (b = a.timeline = new $({
        data: "nested",
        defaults: l || {},
        targets: v && v.data === "nested" ? v.vars.targets : y
      }), b.kill(), b.parent = b._dp = gt(a), b._start = 0, c || me(f) || me(h)) {
        if (P = y.length, T = c && ir(c), dt(c))
          for (x in c)
            ~pr.indexOf(x) && (O || (O = {}), O[x] = c[x]);
        for (w = 0; w < P; w++)
          g = be(r, mr), g.stagger = 0, A && (g.easeReverse = A), O && $t(g, O), S = y[w], g.duration = +ae(f, gt(a), w, S, y), g.delay = (+ae(h, gt(a), w, S, y) || 0) - a._delay, !c && P === 1 && g.delay && (a._delay = h = g.delay, a._start += h, g.delay = 0), b.to(S, g, T ? T(w, S, y) : 0), b._ease = C.none;
        b.duration() ? f = h = 0 : a.timeline = 0;
      } else if (p) {
        ne(at(b.vars.defaults, {
          ease: "none"
        })), b._ease = Nt(p.ease || r.ease || "none");
        var E = 0, M, R, X;
        if (H(p))
          p.forEach(function(U) {
            return b.to(y, U, ">");
          }), b.duration();
        else {
          g = {};
          for (x in p)
            x === "ease" || x === "easeEach" || vn(x, p[x], g, p.easeEach);
          for (x in g)
            for (M = g[x].sort(function(U, B) {
              return U.t - B.t;
            }), E = 0, w = 0; w < M.length; w++)
              R = M[w], X = {
                ease: R.e,
                duration: (R.t - (w ? M[w - 1].t : 0)) / 100 * f
              }, X[x] = R.v, b.to(y, X, E), E += X.duration;
          b.duration() < f && b.to({}, {
            duration: f - b.duration()
          });
        }
      }
      f || a.duration(f = b.duration());
    } else
      a.timeline = 0;
    return d === !0 && !Je && (Tt = gt(a), L.killTweensOf(y), Tt = 0), _t(v, gt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (_ || !f && !p && a._start === F(v._time) && j(_) && $r(gt(a)) && v.data !== "nested") && (a._tTime = -D, a.render(Math.max(0, -h) || 0)), m && Zi(gt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, u = this._tDur, f = this._dur, h = r < 0, _ = r > u - D && !h ? u : r < D ? 0 : r, c, d, p, l, m, v, y, b;
    if (!f)
      Kr(this, r, n, s);
    else if (_ !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (c = _, b = this.timeline, this._repeat) {
        if (l = f + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(l * 100 + r, n, s);
        if (c = F(_ % l), _ === u ? (p = this._repeat, c = f) : (m = F(_ / l), p = ~~m, p && p === m ? (c = f, p--) : c > f && (c = f)), v = this._yoyo && p & 1, v && (c = f - c), m = jt(this._tTime, l), c === a && !s && this._initted && p === m)
          return this._tTime = _, this;
        p !== m && this.vars.repeatRefresh && !v && !this._lock && c !== l && this._initted && (this._lock = s = 1, this.render(F(l * p), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (Ji(this, h ? r : c, s, n, _))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (f !== this._dur)
          return this.render(r, n, s);
      }
      if (this._rEase) {
        var w = c < a;
        if (w !== this._inv) {
          var g = w ? a : f - a;
          this._inv = w, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = g ? (w ? -1 : 1) / g : 0, this._invScale = w ? -this.ratio : 1 - this.ratio, this._invEase = w ? this._rEase : this._ease;
        }
        this.ratio = y = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
      } else
        this.ratio = y = this._ease(c / f);
      if (this._from && (this.ratio = y = 1 - y), this._tTime = _, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && _ && !n && !m && (it(this, "onStart"), this._tTime !== _))
        return this;
      for (d = this._pt; d; )
        d.r(y, d.d), d = d._next;
      b && b.render(r < 0 ? r : b._dur * b._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (h && Ye(this, r, n, s), it(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && it(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (h && !this._onUpdate && Ye(this, r, !0, !0), (r || !f) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && Ot(this, 1), !n && !(h && !a) && (_ || a || v) && (it(this, _ === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, u) {
    le || et.wake(), this._ts || this.play();
    var f = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || fi(this, f), h = this._ease(f / this._dur), gn(this, r, n, s, a, h, f, u) ? this.resetTo(r, n, s, a, 1) : (ke(this, 0), this.parent || Ki(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? ie(this) : this.scrollTrigger && this.scrollTrigger.kill(!!W), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Tt && Tt.vars.overwrite !== !0)._first || ie(this), this.parent && s !== this.timeline.totalDuration() && Kt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, u = r ? ht(r) : a, f = this._ptLookup, h = this._pt, _, c, d, p, l, m, v;
    if ((!n || n === "all") && Gr(a, u))
      return n === "all" && (this._pt = 0), ie(this);
    for (_ = this._op = this._op || [], n !== "all" && (q(n) && (l = {}, K(n, function(y) {
      return l[y] = 1;
    }), n = l), n = yn(a, n)), v = a.length; v--; )
      if (~u.indexOf(a[v])) {
        c = f[v], n === "all" ? (_[v] = n, p = c, d = {}) : (d = _[v] = _[v] || {}, p = n);
        for (l in p)
          m = c && c[l], m && ((!("kill" in m.d) || m.d.kill(l) === !0) && Ce(this, m, "_pt"), delete c[l]), d !== "all" && (d[l] = 1);
      }
    return this._initted && !this._pt && h && ie(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return se(1, arguments);
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
    return se(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return L.killTweensOf(r, n, s);
  }, t;
})(_e);
at(Y.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
K("staggerTo,staggerFrom,staggerFromTo", function(o) {
  Y[o] = function() {
    var t = new $(), e = Xe.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var hi = function(t, e, i) {
  return t[e] = i;
}, gr = function(t, e, i) {
  return t[e](i);
}, xn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Tn = function(t, e, i) {
  return t.setAttribute(e, i);
}, li = function(t, e) {
  return N(t[e]) ? gr : ti(t[e]) && t.setAttribute ? Tn : hi;
}, yr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, bn = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, vr = function(t, e) {
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
}, _i = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, wn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Sn = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Ce(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Pn = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, xr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, Q = /* @__PURE__ */ (function() {
  function o(e, i, r, n, s, a, u, f, h) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || yr, this.d = u || this, this.set = f || hi, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Pn, this.m = i, this.mt = n, this.tween = r;
  }, o;
})();
K(si + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(o) {
  return ni[o] = 1;
});
st.TweenMax = st.TweenLite = Y;
st.TimelineLite = st.TimelineMax = $;
L = new $({
  sortChildren: !1,
  defaults: oe,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
nt.stringFilter = lr;
var Bt = [], ve = {}, On = [], Pi = 0, Cn = 0, Fe = function(t) {
  return (ve[t] || On).map(function(e) {
    return e();
  });
}, He = function() {
  var t = Date.now(), e = [];
  t - Pi > 2 && (Fe("matchMediaInit"), Bt.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, u, f;
    for (a in r)
      s = lt.matchMedia(r[a]).matches, s && (u = 1), s !== n[a] && (n[a] = s, f = 1);
    f && (i.revert(), u && e.push(i));
  }), Fe("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Pi = t, Fe("matchMedia"));
}, Tr = /* @__PURE__ */ (function() {
  function o(e, i) {
    this.selector = i && qe(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Cn++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    N(i) && (n = r, r = i, i = N);
    var s = this, a = function() {
      var f = z, h = s.selector, _;
      return f && f !== s && f.data.push(s), n && (s.selector = qe(n)), z = s, _ = r.apply(s, arguments), N(_) && s._r.push(_), z = f, s.selector = h, s.isReverted = !1, _;
    };
    return s.last = a, i === N ? a(s, function(u) {
      return s.add(null, u);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = z;
    z = null, i(this), z = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof Y && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? (function() {
      for (var a = n.getTweens(), u = n.data.length, f; u--; )
        f = n.data[u], f.data === "isFlip" && (f.revert(), f.getChildren(!0, !0, !1).forEach(function(h) {
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
      }), u = n.data.length; u--; )
        f = n.data[u], f instanceof $ ? f.data !== "nested" && (f.scrollTrigger && f.scrollTrigger.revert(), f.kill()) : !(f instanceof Y) && f.revert && f.revert(i);
      n._r.forEach(function(h) {
        return h(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Bt.length; s--; )
        Bt[s].id === this.id && Bt.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
})(), Mn = /* @__PURE__ */ (function() {
  function o(e) {
    this.contexts = [], this.scope = e, z && z.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    dt(i) || (i = {
      matches: i
    });
    var s = new Tr(0, n || this.scope), a = s.conditions = {}, u, f, h;
    z && !s.selector && (s.selector = z.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (f in i)
      f === "all" ? h = 1 : (u = lt.matchMedia(i[f]), u && (Bt.indexOf(s) < 0 && Bt.push(s), (a[f] = u.matches) && (h = 1), u.addListener ? u.addListener(He) : u.addEventListener("change", He)));
    return h && r(s, function(_) {
      return s.add(null, _);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
})(), Se = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return ur(r);
    });
  },
  timeline: function(t) {
    return new $(t);
  },
  getTweensOf: function(t, e) {
    return L.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    q(t) && (t = ht(t)[0]);
    var n = Lt(t || {}).get, s = i ? ji : $i;
    return i === "native" && (i = ""), t && (e ? s((tt[e] && tt[e].get || n)(t, e, i, r)) : function(a, u, f) {
      return s((tt[a] && tt[a].get || n)(t, a, u, f));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = ht(t), t.length > 1) {
      var r = t.map(function(h) {
        return J.quickSetter(h, e, i);
      }), n = r.length;
      return function(h) {
        for (var _ = n; _--; )
          r[_](h);
      };
    }
    t = t[0] || {};
    var s = tt[e], a = Lt(t), u = a.harness && (a.harness.aliases || {})[e] || e, f = s ? function(h) {
      var _ = new s();
      qt._pt = 0, _.init(t, i ? h + i : h, qt, 0, [t]), _.render(1, _), qt._pt && _i(1, qt);
    } : a.set(t, u);
    return s ? f : function(h) {
      return f(t, u, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = J.to(t, at((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(u, f, h) {
      return n.resetTo(e, u, f, h);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return L.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Nt(t.ease, oe.ease)), xi(oe, t || {});
  },
  config: function(t) {
    return xi(nt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !tt[a] && !st[a] && ue(e + " effect requires " + a + " plugin.");
    }), Re[e] = function(a, u, f) {
      return i(ht(a), at(u || {}, n), f);
    }, s && ($.prototype[e] = function(a, u, f) {
      return this.add(Re[e](a, dt(u) ? u : (f = u) && {}, this), f);
    });
  },
  registerEase: function(t, e) {
    C[t] = Nt(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Nt(t, e) : C;
  },
  getById: function(t) {
    return L.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new $(t), r, n;
    for (i.smoothChildTiming = j(t.smoothChildTiming), L.remove(i), i._dp = 0, i._time = i._tTime = L._time, r = L._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof Y && r.vars.onComplete === r._targets[0])) && _t(i, r, r._start - r._delay), r = n;
    return _t(L, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Tr(t, e) : z;
  },
  matchMedia: function(t) {
    return new Mn(t);
  },
  matchMediaRefresh: function() {
    return Bt.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || He();
  },
  addEventListener: function(t, e) {
    var i = ve[t] || (ve[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = ve[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: sn,
    wrapYoyo: an,
    distribute: ir,
    random: nr,
    snap: rr,
    normalize: nn,
    getUnit: G,
    clamp: Jr,
    splitColor: fr,
    toArray: ht,
    selector: qe,
    mapRange: ar,
    pipe: en,
    unitize: rn,
    interpolate: on,
    shuffle: er
  },
  install: Xi,
  effects: Re,
  ticker: et,
  updateRoot: $.updateRoot,
  plugins: tt,
  globalTimeline: L,
  core: {
    PropTween: Q,
    globals: qi,
    Tween: Y,
    Timeline: $,
    Animation: _e,
    getCache: Lt,
    _removeLinkedListItem: Ce,
    reverting: function() {
      return W;
    },
    context: function(t) {
      return t && z && (z.data.push(t), t._ctx = z), z;
    },
    suppressOverwrites: function(t) {
      return Je = t;
    }
  }
};
K("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return Se[o] = Y[o];
});
et.add($.updateRoot);
qt = Se.to({}, {
  duration: 0
});
var kn = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Dn = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = kn(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Le = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var u, f;
        if (q(n) && (u = {}, K(n, function(h) {
          return u[h] = 1;
        }), n = u), e) {
          u = {};
          for (f in n)
            u[f] = e(n[f]);
          n = u;
        }
        Dn(a, n);
      };
    }
  };
}, J = Se.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, u;
    this.tween = i;
    for (s in e)
      u = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (u || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = u, this._props.push(s);
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
}, Le("roundProps", We), Le("modifiers"), Le("snap", rr)) || Se;
Y.version = $.version = J.version = "3.15.0";
Ui = 1;
ei() && Qt();
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
var Oi, bt, Gt, ci, Ft, Ci, di, Rn = function() {
  return typeof window < "u";
}, xt = {}, zt = 180 / Math.PI, Ht = Math.PI / 180, Ut = Math.atan2, Mi = 1e8, pi = /([A-Z])/g, An = /(left|right|width|margin|padding|x)/i, En = /[\s,\(]\S/, ct = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, $e = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, zn = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Fn = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Ln = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, In = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, br = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, wr = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Nn = function(t, e, i) {
  return t.style[e] = i;
}, Bn = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Vn = function(t, e, i) {
  return t._gsap[e] = i;
}, Yn = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Un = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, Xn = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, I = "transform", Z = I + "Origin", qn = function o(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in xt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = ct[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = yt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : yt(r, t), t === Z && (this.tfm.zOrigin = s.zOrigin);
    else
      return ct.transform.split(",").forEach(function(a) {
        return o.call(i, a, e);
      });
    if (this.props.indexOf(I) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(Z, e, "")), t = I;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, Sr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Wn = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(pi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = di(), (!n || !n.isStart) && !i[I] && (Sr(i), r.zOrigin && i[Z] && (i[Z] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Pr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: Wn,
    save: qn
  };
  return t._gsap || J.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Or, je = function(t, e) {
  var i = bt.createElementNS ? bt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : bt.createElement(t);
  return i && i.style ? i : bt.createElement(t);
}, rt = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(pi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, Zt(e) || e, 1) || "";
}, ki = "O,Moz,ms,Ms,Webkit".split(","), Zt = function(t, e, i) {
  var r = e || Ft, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(ki[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? ki[s] : "") + t;
}, Ke = function() {
  Rn() && window.document && (Oi = window, bt = Oi.document, Gt = bt.documentElement, Ft = je("div") || {
    style: {}
  }, je("div"), I = Zt(I), Z = I + "Origin", Ft.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Or = !!Zt("perspective"), di = J.core.reverting, ci = 1);
}, Di = function(t) {
  var e = t.ownerSVGElement, i = je("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Gt.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Gt.removeChild(i), n;
}, Ri = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Cr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Di(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Di(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ri(t, ["x", "cx", "x1"]) || 0,
    y: +Ri(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Mr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Cr(t));
}, Ct = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in xt && e !== Z && (e = I), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(pi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, wt = function(t, e, i, r, n, s) {
  var a = new Q(t._pt, e, i, 0, 1, s ? wr : br);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Ai = {
  deg: 1,
  rad: 1,
  turn: 1
}, Gn = {
  grid: 1,
  flex: 1
}, Mt = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Ft.style, u = An.test(e), f = t.tagName.toLowerCase() === "svg", h = (f ? "client" : "offset") + (u ? "Width" : "Height"), _ = 100, c = r === "px", d = r === "%", p, l, m, v;
  if (r === s || !n || Ai[r] || Ai[s])
    return n;
  if (s !== "px" && !c && (n = o(t, e, i, "px")), v = t.getCTM && Mr(t), (d || s === "%") && (xt[e] || ~e.indexOf("adius")))
    return p = v ? t.getBBox()[u ? "width" : "height"] : t[h], V(d ? n / p * _ : n / 100 * p);
  if (a[u ? "width" : "height"] = _ + (c ? s : r), l = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !f ? t : t.parentNode, v && (l = (t.ownerSVGElement || {}).parentNode), (!l || l === bt || !l.appendChild) && (l = bt.body), m = l._gsap, m && d && m.width && u && m.time === et.time && !m.uncache)
    return V(n / m.width * _);
  if (d && (e === "height" || e === "width")) {
    var y = t.style[e];
    t.style[e] = _ + r, p = t[h], y ? t.style[e] = y : Ct(t, e);
  } else
    (d || s === "%") && !Gn[rt(l, "display")] && (a.position = rt(t, "position")), l === t && (a.position = "static"), l.appendChild(Ft), p = Ft[h], l.removeChild(Ft), a.position = "absolute";
  return u && d && (m = Lt(l), m.time = et.time, m.width = l[h]), V(c ? p * n / _ : p && n ? _ / p * n : 0);
}, yt = function(t, e, i, r) {
  var n;
  return ci || Ke(), e in ct && e !== "transform" && (e = ct[e], ~e.indexOf(",") && (e = e.split(",")[0])), xt[e] && e !== "transform" ? (n = de(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Oe(rt(t, Z)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Pe[e] && Pe[e](t, e, i) || rt(t, e) || Gi(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Mt(t, e, n, i) + i : n;
}, Hn = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = Zt(e, t, 1), s = n && rt(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = rt(t, "borderTopColor"));
  }
  var a = new Q(this._pt, t.style, e, 0, 1, vr), u = 0, f = 0, h, _, c, d, p, l, m, v, y, b, w, g;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = rt(t, r.substring(4, r.indexOf(")")))), r === "auto" && (l = t.style[e], t.style[e] = r, r = rt(t, e) || r, l ? t.style[e] = l : Ct(t, e)), h = [i, r], lr(h), i = h[0], r = h[1], c = i.match(Xt) || [], g = r.match(Xt) || [], g.length) {
    for (; _ = Xt.exec(r); )
      m = _[0], y = r.substring(u, _.index), p ? p = (p + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (p = 1), m !== (l = c[f++] || "") && (d = parseFloat(l) || 0, w = l.substr((d + "").length), m.charAt(1) === "=" && (m = Wt(d, m) + w), v = parseFloat(m), b = m.substr((v + "").length), u = Xt.lastIndex - b.length, b || (b = b || nt.units[e] || w, u === r.length && (r += b, a.e += b)), w !== b && (d = Mt(t, e, l, b) || 0), a._pt = {
        _next: a._pt,
        p: y || f === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: v - d,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < r.length ? r.substring(u, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? wr : br;
  return Yi.test(r) && (a.e = 0), this._pt = a, a;
}, Ei = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, $n = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Ei[i] || i, e[1] = Ei[r] || r, e.join(" ");
}, jn = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, u, f;
    if (n === "all" || n === !0)
      r.cssText = "", u = 1;
    else
      for (n = n.split(","), f = n.length; --f > -1; )
        a = n[f], xt[a] && (u = 1, a = a === "transformOrigin" ? Z : I), Ct(i, a);
    u && (Ct(i, I), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", de(i, 1), s.uncache = 1, Sr(r)));
  }
}, Pe = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new Q(t._pt, e, i, 0, 0, jn);
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
}, ce = [1, 0, 0, 1, 0, 0], kr = {}, Dr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, zi = function(t) {
  var e = rt(t, I);
  return Dr(e) ? ce : e.substr(7).match(Vi).map(V);
}, mi = function(t, e) {
  var i = t._gsap || Lt(t), r = t.style, n = zi(t), s, a, u, f;
  return i.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? ce : n) : (n === ce && !t.offsetParent && t !== Gt && !i.svg && (u = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (f = 1, a = t.nextElementSibling, Gt.appendChild(t)), n = zi(t), u ? r.display = u : Ct(t, "display"), f && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : Gt.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Qe = function(t, e, i, r, n, s) {
  var a = t._gsap, u = n || mi(t, !0), f = a.xOrigin || 0, h = a.yOrigin || 0, _ = a.xOffset || 0, c = a.yOffset || 0, d = u[0], p = u[1], l = u[2], m = u[3], v = u[4], y = u[5], b = e.split(" "), w = parseFloat(b[0]) || 0, g = parseFloat(b[1]) || 0, P, x, S, T;
  i ? u !== ce && (x = d * m - p * l) && (S = w * (m / x) + g * (-l / x) + (l * y - m * v) / x, T = w * (-p / x) + g * (d / x) - (d * y - p * v) / x, w = S, g = T) : (P = Cr(t), w = P.x + (~b[0].indexOf("%") ? w / 100 * P.width : w), g = P.y + (~(b[1] || b[0]).indexOf("%") ? g / 100 * P.height : g)), r || r !== !1 && a.smooth ? (v = w - f, y = g - h, a.xOffset = _ + (v * d + y * l) - v, a.yOffset = c + (v * p + y * m) - y) : a.xOffset = a.yOffset = 0, a.xOrigin = w, a.yOrigin = g, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[Z] = "0px 0px", s && (wt(s, a, "xOrigin", f, w), wt(s, a, "yOrigin", h, g), wt(s, a, "xOffset", _, a.xOffset), wt(s, a, "yOffset", c, a.yOffset)), t.setAttribute("data-svg-origin", w + " " + g);
}, de = function(t, e) {
  var i = t._gsap || new cr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", u = getComputedStyle(t), f = rt(t, Z) || "0", h, _, c, d, p, l, m, v, y, b, w, g, P, x, S, T, O, A, E, M, R, X, U, B, ot, Yt, Jt, te, Dt, gi, pt, Rt;
  return h = _ = c = l = m = v = y = b = w = 0, d = p = 1, i.svg = !!(t.getCTM && Mr(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (r[I] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[I] !== "none" ? u[I] : "")), r.scale = r.rotate = r.translate = "none"), x = mi(t, i.svg), i.svg && (i.uncache ? (ot = t.getBBox(), f = i.xOrigin - ot.x + "px " + (i.yOrigin - ot.y) + "px", B = "") : B = !e && t.getAttribute("data-svg-origin"), Qe(t, B || f, !!B || i.originIsAbsolute, i.smooth !== !1, x)), g = i.xOrigin || 0, P = i.yOrigin || 0, x !== ce && (A = x[0], E = x[1], M = x[2], R = x[3], h = X = x[4], _ = U = x[5], x.length === 6 ? (d = Math.sqrt(A * A + E * E), p = Math.sqrt(R * R + M * M), l = A || E ? Ut(E, A) * zt : 0, y = M || R ? Ut(M, R) * zt + l : 0, y && (p *= Math.abs(Math.cos(y * Ht))), i.svg && (h -= g - (g * A + P * M), _ -= P - (g * E + P * R))) : (Rt = x[6], gi = x[7], Jt = x[8], te = x[9], Dt = x[10], pt = x[11], h = x[12], _ = x[13], c = x[14], S = Ut(Rt, Dt), m = S * zt, S && (T = Math.cos(-S), O = Math.sin(-S), B = X * T + Jt * O, ot = U * T + te * O, Yt = Rt * T + Dt * O, Jt = X * -O + Jt * T, te = U * -O + te * T, Dt = Rt * -O + Dt * T, pt = gi * -O + pt * T, X = B, U = ot, Rt = Yt), S = Ut(-M, Dt), v = S * zt, S && (T = Math.cos(-S), O = Math.sin(-S), B = A * T - Jt * O, ot = E * T - te * O, Yt = M * T - Dt * O, pt = R * O + pt * T, A = B, E = ot, M = Yt), S = Ut(E, A), l = S * zt, S && (T = Math.cos(S), O = Math.sin(S), B = A * T + E * O, ot = X * T + U * O, E = E * T - A * O, U = U * T - X * O, A = B, X = ot), m && Math.abs(m) + Math.abs(l) > 359.9 && (m = l = 0, v = 180 - v), d = V(Math.sqrt(A * A + E * E + M * M)), p = V(Math.sqrt(U * U + Rt * Rt)), S = Ut(X, U), y = Math.abs(S) > 2e-4 ? S * zt : 0, w = pt ? 1 / (pt < 0 ? -pt : pt) : 0), i.svg && (B = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Dr(rt(t, I)), B && t.setAttribute("transform", B))), Math.abs(y) > 90 && Math.abs(y) < 270 && (n ? (d *= -1, y += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (p *= -1, y += y <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = _ - ((i.yPercent = _ && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = c + s, i.scaleX = V(d), i.scaleY = V(p), i.rotation = V(l) + a, i.rotationX = V(m) + a, i.rotationY = V(v) + a, i.skewX = y + a, i.skewY = b + a, i.transformPerspective = w + s, (i.zOrigin = parseFloat(f.split(" ")[2]) || !e && i.zOrigin || 0) && (r[Z] = Oe(f)), i.xOffset = i.yOffset = 0, i.force3D = nt.force3D, i.renderTransform = i.svg ? Qn : Or ? Rr : Kn, i.uncache = 0, i;
}, Oe = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Ie = function(t, e, i) {
  var r = G(e);
  return V(parseFloat(e) + parseFloat(Mt(t, "x", i + "px", r))) + r;
}, Kn = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Rr(t, e);
}, At = "0deg", ee = "0px", Et = ") ", Rr = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.z, f = i.rotation, h = i.rotationY, _ = i.rotationX, c = i.skewX, d = i.skewY, p = i.scaleX, l = i.scaleY, m = i.transformPerspective, v = i.force3D, y = i.target, b = i.zOrigin, w = "", g = v === "auto" && t && t !== 1 || v === !0;
  if (b && (_ !== At || h !== At)) {
    var P = parseFloat(h) * Ht, x = Math.sin(P), S = Math.cos(P), T;
    P = parseFloat(_) * Ht, T = Math.cos(P), s = Ie(y, s, x * T * -b), a = Ie(y, a, -Math.sin(P) * -b), u = Ie(y, u, S * T * -b + b);
  }
  m !== ee && (w += "perspective(" + m + Et), (r || n) && (w += "translate(" + r + "%, " + n + "%) "), (g || s !== ee || a !== ee || u !== ee) && (w += u !== ee || g ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Et), f !== At && (w += "rotate(" + f + Et), h !== At && (w += "rotateY(" + h + Et), _ !== At && (w += "rotateX(" + _ + Et), (c !== At || d !== At) && (w += "skew(" + c + ", " + d + Et), (p !== 1 || l !== 1) && (w += "scale(" + p + ", " + l + Et), y.style[I] = w || "translate(0, 0)";
}, Qn = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.rotation, f = i.skewX, h = i.skewY, _ = i.scaleX, c = i.scaleY, d = i.target, p = i.xOrigin, l = i.yOrigin, m = i.xOffset, v = i.yOffset, y = i.forceCSS, b = parseFloat(s), w = parseFloat(a), g, P, x, S, T;
  u = parseFloat(u), f = parseFloat(f), h = parseFloat(h), h && (h = parseFloat(h), f += h, u += h), u || f ? (u *= Ht, f *= Ht, g = Math.cos(u) * _, P = Math.sin(u) * _, x = Math.sin(u - f) * -c, S = Math.cos(u - f) * c, f && (h *= Ht, T = Math.tan(f - h), T = Math.sqrt(1 + T * T), x *= T, S *= T, h && (T = Math.tan(h), T = Math.sqrt(1 + T * T), g *= T, P *= T)), g = V(g), P = V(P), x = V(x), S = V(S)) : (g = _, S = c, P = x = 0), (b && !~(s + "").indexOf("px") || w && !~(a + "").indexOf("px")) && (b = Mt(d, "x", s, "px"), w = Mt(d, "y", a, "px")), (p || l || m || v) && (b = V(b + p - (p * g + l * x) + m), w = V(w + l - (p * P + l * S) + v)), (r || n) && (T = d.getBBox(), b = V(b + r / 100 * T.width), w = V(w + n / 100 * T.height)), T = "matrix(" + g + "," + P + "," + x + "," + S + "," + b + "," + w + ")", d.setAttribute("transform", T), y && (d.style[I] = T);
}, Zn = function(t, e, i, r, n) {
  var s = 360, a = q(n), u = parseFloat(n) * (a && ~n.indexOf("rad") ? zt : 1), f = u - r, h = r + f + "deg", _, c;
  return a && (_ = n.split("_")[1], _ === "short" && (f %= s, f !== f % (s / 2) && (f += f < 0 ? s : -s)), _ === "cw" && f < 0 ? f = (f + s * Mi) % s - ~~(f / s) * s : _ === "ccw" && f > 0 && (f = (f - s * Mi) % s - ~~(f / s) * s)), t._pt = c = new Q(t._pt, e, i, r, f, zn), c.e = h, c.u = "deg", t._props.push(i), c;
}, Fi = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Jn = function(t, e, i) {
  var r = Fi({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, u, f, h, _, c, d, p;
  r.svg ? (f = i.getAttribute("transform"), i.setAttribute("transform", ""), s[I] = e, a = de(i, 1), Ct(i, I), i.setAttribute("transform", f)) : (f = getComputedStyle(i)[I], s[I] = e, a = de(i, 1), s[I] = f);
  for (u in xt)
    f = r[u], h = a[u], f !== h && n.indexOf(u) < 0 && (d = G(f), p = G(h), _ = d !== p ? Mt(i, u, f, p) : parseFloat(f), c = parseFloat(h), t._pt = new Q(t._pt, a, u, _, c - _, $e), t._pt.u = p || 0, t._props.push(u));
  Fi(a, r);
};
K("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  Pe[t > 1 ? "border" + o : o] = function(a, u, f, h, _) {
    var c, d;
    if (arguments.length < 4)
      return c = s.map(function(p) {
        return yt(a, p, f);
      }), d = c.join(" "), d.split(c[0]).length === 5 ? c[0] : d;
    c = (h + "").split(" "), d = {}, s.forEach(function(p, l) {
      return d[p] = c[l] = c[l] || c[(l - 1) / 2 | 0];
    }), a.init(u, d, _);
  };
});
var Ar = {
  name: "css",
  register: Ke,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, u = i.vars.startAt, f, h, _, c, d, p, l, m, v, y, b, w, g, P, x, S, T;
    ci || Ke(), this.styles = this.styles || Pr(t), S = this.styles.props, this.tween = i;
    for (l in e)
      if (l !== "autoRound" && (h = e[l], !(tt[l] && dr(l, e, i, r, t, n)))) {
        if (d = typeof h, p = Pe[l], d === "function" && (h = h.call(i, r, t, n), d = typeof h), d === "string" && ~h.indexOf("random(") && (h = he(h)), p)
          p(this, t, l, h, i) && (x = 1);
        else if (l.substr(0, 2) === "--")
          f = (getComputedStyle(t).getPropertyValue(l) + "").trim(), h += "", Pt.lastIndex = 0, Pt.test(f) || (m = G(f), v = G(h), v ? m !== v && (f = Mt(t, l, f, v) + v) : m && (h += m)), this.add(a, "setProperty", f, h, r, n, 0, 0, l), s.push(l), S.push(l, 0, a[l]);
        else if (d !== "undefined") {
          if (u && l in u ? (f = typeof u[l] == "function" ? u[l].call(i, r, t, n) : u[l], q(f) && ~f.indexOf("random(") && (f = he(f)), G(f + "") || f === "auto" || (f += nt.units[l] || G(yt(t, l)) || ""), (f + "").charAt(1) === "=" && (f = yt(t, l))) : f = yt(t, l), c = parseFloat(f), y = d === "string" && h.charAt(1) === "=" && h.substr(0, 2), y && (h = h.substr(2)), _ = parseFloat(h), l in ct && (l === "autoAlpha" && (c === 1 && yt(t, "visibility") === "hidden" && _ && (c = 0), S.push("visibility", 0, a.visibility), wt(this, a, "visibility", c ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), l !== "scale" && l !== "transform" && (l = ct[l], ~l.indexOf(",") && (l = l.split(",")[0]))), b = l in xt, b) {
            if (this.styles.save(l), T = h, d === "string" && h.substring(0, 6) === "var(--") {
              if (h = rt(t, h.substring(4, h.indexOf(")"))), h.substring(0, 5) === "calc(") {
                var O = t.style.perspective;
                t.style.perspective = h, h = rt(t, "perspective"), O ? t.style.perspective = O : Ct(t, "perspective");
              }
              _ = parseFloat(h);
            }
            if (w || (g = t._gsap, g.renderTransform && !e.parseTransform || de(t, e.parseTransform), P = e.smoothOrigin !== !1 && g.smooth, w = this._pt = new Q(this._pt, a, I, 0, 1, g.renderTransform, g, 0, -1), w.dep = 1), l === "scale")
              this._pt = new Q(this._pt, g, "scaleY", g.scaleY, (y ? Wt(g.scaleY, y + _) : _) - g.scaleY || 0, $e), this._pt.u = 0, s.push("scaleY", l), l += "X";
            else if (l === "transformOrigin") {
              S.push(Z, 0, a[Z]), h = $n(h), g.svg ? Qe(t, h, 0, P, 0, this) : (v = parseFloat(h.split(" ")[2]) || 0, v !== g.zOrigin && wt(this, g, "zOrigin", g.zOrigin, v), wt(this, a, l, Oe(f), Oe(h)));
              continue;
            } else if (l === "svgOrigin") {
              Qe(t, h, 1, P, 0, this);
              continue;
            } else if (l in kr) {
              Zn(this, g, l, c, y ? Wt(c, y + h) : h);
              continue;
            } else if (l === "smoothOrigin") {
              wt(this, g, "smooth", g.smooth, h);
              continue;
            } else if (l === "force3D") {
              g[l] = h;
              continue;
            } else if (l === "transform") {
              Jn(this, h, t);
              continue;
            }
          } else l in a || (l = Zt(l) || l);
          if (b || (_ || _ === 0) && (c || c === 0) && !En.test(h) && l in a)
            m = (f + "").substr((c + "").length), _ || (_ = 0), v = G(h) || (l in nt.units ? nt.units[l] : m), m !== v && (c = Mt(t, l, f, v)), this._pt = new Q(this._pt, b ? g : a, l, c, (y ? Wt(c, y + _) : _) - c, !b && (v === "px" || l === "zIndex") && e.autoRound !== !1 ? In : $e), this._pt.u = v || 0, b && T !== h ? (this._pt.b = f, this._pt.e = T, this._pt.r = Ln) : m !== v && v !== "%" && (this._pt.b = f, this._pt.r = Fn);
          else if (l in a)
            Hn.call(this, t, l, f, y ? y + h : h);
          else if (l in t)
            this.add(t, l, f || t[l], y ? y + h : h, r, n);
          else if (l !== "parseTransform") {
            ri(l, h);
            continue;
          }
          b || (l in a ? S.push(l, 0, a[l]) : typeof t[l] == "function" ? S.push(l, 2, t[l]()) : S.push(l, 1, f || t[l])), s.push(l);
        }
      }
    x && xr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !di())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: yt,
  aliases: ct,
  getSetter: function(t, e, i) {
    var r = ct[e];
    return r && r.indexOf(",") < 0 && (e = r), e in xt && e !== Z && (t._gsap.x || yt(t, "x")) ? i && Ci === i ? e === "scale" ? Yn : Vn : (Ci = i || {}) && (e === "scale" ? Un : Xn) : t.style && !ti(t.style[e]) ? Nn : ~e.indexOf("-") ? Bn : li(t, e);
  },
  core: {
    _removeProperty: Ct,
    _getMatrix: mi
  }
};
J.utils.checkPrefix = Zt;
J.core.getStyleSaver = Pr;
(function(o, t, e, i) {
  var r = K(o + "," + t + "," + e, function(n) {
    xt[n] = 1;
  });
  K(t, function(n) {
    nt.units[n] = "deg", kr[n] = 1;
  }), ct[r[13]] = o + "," + t, K(i, function(n) {
    var s = n.split(":");
    ct[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
K("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  nt.units[o] = "px";
});
J.registerPlugin(Ar);
var Ze = J.registerPlugin(Ar) || J;
Ze.core.Tween;
const Er = (o, t, e) => Math.max(t, Math.min(e, o)), mt = (o, t, e, i) => Er(typeof o == "number" && Number.isFinite(o) ? o : t, e, i);
function Li(o) {
  const t = mt(o.height, 800, 1, 1e6), e = mt(o.fontSize, 128, 1, 1e6), i = Math.floor(mt(o.lineCount, 1, 1, 1e6)), r = mt(o.lineHeight, 0.9, 0.1, 10), n = mt(o.gap, 0, 0, 10), s = mt(o.minScale, 0.16, 0.01, 1), a = mt(o.spread, 0.45, 0.05, 4), u = mt(o.focusY, t / 2, 0, t), f = e * r * (1 + n), h = Math.max(0.25, t / f * a), _ = (1 - s) / (2 * Math.tanh(0.5 / h));
  return Object.freeze({
    height: t,
    focusY: u,
    fontSize: e,
    lineCount: i,
    lineHeight: r,
    gap: n,
    pitch: f,
    minScale: s,
    spread: a,
    curveWidth: h,
    lensAmplitude: _
  });
}
function ts(o, t, e) {
  if (!Number.isInteger(t) || t < 0 || t >= o.lineCount)
    return { y: o.focusY, scale: 0, opacity: 0, visible: !1 };
  const i = mt(e, 0, 0, 1) * (o.lineCount - 1), r = t - i, n = Math.tanh((r - 0.5) / o.curveWidth), s = Math.tanh((r + 0.5) / o.curveWidth), a = o.focusY + o.pitch * (o.minScale * r + o.lensAmplitude * (n + s) / 2), u = Er(
    o.minScale + o.lensAmplitude * (s - n),
    o.minScale,
    1
  ), f = o.fontSize * o.lineHeight * u / 2;
  return { y: a, scale: u, opacity: 1, visible: a + f > 0 && a - f < o.height };
}
const es = ["Fresh", "Content", "from", "Mexico", "City", "to the", "World"];
function is(o, t = {}) {
  var w;
  const e = o.ownerDocument, i = e.defaultView;
  if (!i) throw new Error("Fresh Content requires a browser document.");
  const r = (w = t.lines) == null ? void 0 : w.map((g) => g.trim()).filter(Boolean), n = r != null && r.length ? r : [...es], s = Number.isFinite(t.repetitions) ? Math.max(1, Math.min(12, Math.round(t.repetitions))) : 3, a = i.matchMedia("(prefers-reduced-motion: reduce)");
  let u = 0, f = !1, h, _ = 0, c = [];
  const d = e.createElement("div");
  d.className = "fc-effect", d.style.setProperty("--fc-line-count", String(n.length));
  const p = e.createElement("div");
  p.className = "fc-stage", p.dataset.nodeId = "3799:717";
  const l = e.createElement("h3");
  l.className = "fc-heading", l.lang = "en", l.dataset.nodeId = "3799:720", l.setAttribute("aria-label", n.join(" ")), p.append(l), d.append(p), o.append(d);
  function m(g) {
    if (c.length === g * n.length) return;
    const P = e.createDocumentFragment();
    c = Array.from({ length: g * n.length }, (x, S) => {
      const T = e.createElement("span");
      return T.className = "fc-line", T.textContent = n[S % n.length], T.setAttribute("aria-hidden", "true"), P.append(T), {
        element: T,
        visible: !0,
        setFontSize: Ze.quickSetter(T, "fontSize", "px"),
        setTop: Ze.quickSetter(T, "top", "px")
      };
    }), l.replaceChildren(P);
  }
  function v() {
    if (f || !h || d.dataset.fcMotion !== "true") return;
    const P = (_ + u * (n.length * s - 1)) / Math.max(1, c.length - 1);
    for (let x = 0; x < c.length; x++) {
      const S = c[x], T = ts(h, x, P);
      if (!T.visible) {
        S.visible && (S.element.style.visibility = "hidden"), S.visible = !1;
        continue;
      }
      S.visible || (S.element.style.visibility = "visible"), S.visible = !0;
      const O = h.fontSize * T.scale;
      S.setFontSize(O), S.setTop(T.y - O * h.lineHeight / 2);
    }
  }
  function y() {
    if (f) return;
    const g = t.reducedMotion ?? a.matches;
    if (d.dataset.fcMotion = String(!g), g) {
      h = void 0, m(1), c.forEach((R) => {
        R.element.removeAttribute("style"), R.visible = !0;
      });
      return;
    }
    const P = parseFloat(i.getComputedStyle(l).fontSize) || 44, x = p.clientHeight;
    if (!x) return;
    const S = parseFloat(i.getComputedStyle(d).getPropertyValue("--fc-focus-y")), T = Math.min(P * 0.55, x / 2), O = Number.isFinite(S) ? Math.max(T, Math.min(x - T, S)) : x / 2, A = Li({ height: x, focusY: O, fontSize: P, lineCount: 1 }), E = Math.ceil(Math.max(O, x - O) / (A.pitch * A.minScale)) + 2, M = Math.max(1, Math.ceil(E / n.length));
    _ = M * n.length, m(s + M * 2), h = Li({ height: x, focusY: O, fontSize: P, lineCount: c.length }), v();
  }
  const b = new ResizeObserver(y);
  return b.observe(o), a.addEventListener("change", y), e.fonts.addEventListener("loadingdone", y), e.fonts.ready.then(y), y(), {
    setProgress(g) {
      if (f) return;
      const P = Number.isNaN(g) ? 0 : Math.max(0, Math.min(1, g));
      P !== u && (u = P, v());
    },
    refresh: y,
    destroy() {
      f || (f = !0, b.disconnect(), a.removeEventListener("change", y), e.fonts.removeEventListener("loadingdone", y), d.remove());
    }
  };
}
export {
  es as FRESH_CONTENT_LINES,
  is as createFreshContent
};
