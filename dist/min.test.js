function e(e, t = "" + $e) {
const r = t.length;
let n = "";
for (let a = 0; e.length > a; a++) {
const o = Reflect.apply($e, e, [ a ]) ^ Reflect.apply($e, t, [ a % r ]);
n += je(o);
}
return n;
}

function t() {
const e = (() => {
const e = Oe.cookie;
if (!e) {
return null;
}
const t = Be + "=", r = e.split(";");
for (const e of r) {
const r = e.trim();
if (r.startsWith(t)) {
return r.slice(t.length);
}
}
return null;
})();
return e ? (e => {
if ("string" != typeof e || e.length % 4 != 0) {
return null;
}
let t = "";
for (let r = 0; e.length > r; r += 4) {
const n = e.slice(r, r + 4), a = Number.parseInt(n, 16);
if (Number.isNaN(a)) {
return null;
}
t += String.fromCharCode(a);
}
return t;
})(e) : null;
}

function r() {
if (!Ie.game?.initialized) {
return;
}
const e = He.Re.ze;
try {
(e => {
e && He.Re.je && Ie.game[Je.A].layers[3].children.forEach(e => {
e._texture?.textureCacheIds && e._texture.textureCacheIds.some(e => e.includes("ceiling") && !e.includes("map-building-container-ceiling-05") || e.includes("map-snow-")) && (e.visible = !1);
});
})(e), e && Ie.game[Je.D][Je.Ae].forEach(e => {
He.Re.$e && (e.sprite._tintRGB = 1), e.sprite.alpha = He.Re.Fe / 1e3;
}), (e => {
e && Ie.game[Je.ue][Je.xe][Je.ye].forEach(e => {
[ "tree", "table", "stairs", "bush" ].some(t => e.type.includes(t)) && (e.sprite.alpha = He.Re.Oe / 100);
});
})(e);
} catch {}
}

function n(e, t, r) {
try {
const n = e[t];
if (!n || at.has(n)) {
return;
}
let a = new Proxy(n, r);
tt.set(a, n), rt.set(a, n), nt.set(a, n), at.add(a), ot.set(a, {
target: e,
name: t,
handler: r,
timestamp: Date.now(),
layer: 1
});
try {
Object.defineProperty(a, Qe, {
value: !0,
enumerable: !1
}), Object.defineProperty(a, Xe, {
value: n,
enumerable: !1
}), Object.defineProperty(a, et, {
value: 0,
writable: !0,
enumerable: !1
});
} catch (e) {}
Object.defineProperty(e, t, {
value: a,
writable: !0,
enumerable: !1,
configurable: !0
});
} catch (e) {}
}

function a(e) {
return Object.keys(Ie.game[Je.j].teamInfo).find(t => Ie.game[Je.j].teamInfo[t].playerIds.includes(e.__id));
}

function o(e) {
const t = e[Je.se][Je.Se];
return t && wt[t] ? wt[t] : null;
}

function i(e) {
return e ? wt[e.bulletType] : null;
}

function l(e) {
try {
if (!e || !e[Je.se]) {
return !1;
}
const t = e[Je.se];
for (const e in t) {
const r = t[e];
if (r && "object" == typeof r && "type" in r) {
const e = r.type;
if (1 === e || 2 === e) {
return !0;
}
}
if (e.toLowerCase().includes("action") && "number" == typeof r && (1 === r || 2 === r)) {
return !0;
}
}
return !1;
} catch {
return !1;
}
}

function s(e) {
if (!Yt.Pe) {
return;
}
const {Be: t, Le: r, De: n, Ee: a} = e, o = t ?? "idle", i = performance.now();
if (ir(i), "idle" === o) {
ar();
const e = Jt(Yt.He), t = Yt.Ie ?? Jt(e);
if (!a && qt(t, e)) {
const r = rr(t, e);
Yt.Ke = {
startPos: Jt(t),
targetPos: Jt(e),
startTime: i,
duration: r
}, or(r);
} else {
Yt.Ke = null, nr(null);
}
Yt.Be = "idle", Yt.We = null;
} else {
ar();
const e = r ? {
x: r.x,
y: r.y
} : Jt(Yt.He), t = Yt.Ie ?? Jt(Yt.He), n = qt(e, Yt.We);
o !== Yt.Be || n ? (Yt.Ke = {
startPos: Jt(t),
targetPos: Jt(e),
startTime: i,
duration: a ? 0 : rr(t, e)
}, Yt.We = Jt(e)) : Yt.Ke && (Yt.Ke.targetPos = Jt(e)), Yt.Be = o;
}
const l = Qt(n);
((e, t) => !((e || t) && (!e || !t || e.touchMoveActive !== t.touchMoveActive || Math.abs(e.touchMoveLen - t.touchMoveLen) > Ut || Math.abs(e.x - t.x) > Ut || Math.abs(e.y - t.y) > Ut)))(l, Yt.Ge) || (Yt.Ve = {
startDir: Qt(Yt.Ze),
targetDir: l,
startTime: i,
duration: Yt.Ke?.duration ?? 195
}, Yt.Ge = l), ir(i);
}

function c(e) {
const t = Ie.game[Je.J], r = a(e) === a(t), n = He.Ue.ze && He.Ue.Ye;
Reflect.defineProperty(e.nameText, "visible", {
get: () => n || r && e != t,
set() {}
}), e.nameText.tint = n ? r ? 8246758 : 7107965 : 16777215, e.nameText.style.fill = n ? r ? "#7dd5e6" : "#9ca3af" : "#7dd5e6", 
e.nameText.style.fontSize = 20, e.nameText.style.dropShadowBlur = .1;
}

function d() {
try {
const e = Ie.game[Je.J], t = Ie.game[Je.j].playerPool[Je.ye];
if (!(Ie.pixi && e && e.container && Ie.game?.initialized)) {
return;
}
const r = Sr(e.container, "playerLines");
r.clear(), He.Ue.ze && He.Ue.qe && ((e, t, r) => {
const n = e[Je.me].x, o = e[Je.me].y, i = a(e), l = _r(e.layer), s = Cr(e);
t.forEach(t => {
if (!t.active || t[Je.se][Je.Ne] || e.__id === t.__id) {
return;
}
const c = a(t), d = Mr(t.layer, s, l);
r.lineStyle(4, c === i ? hr : d && !t.downed ? gr : pr, .45), r.moveTo(0, 0), r.lineTo(16 * (t[Je.me].x - n), 16 * (o - t[Je.me].y));
});
})(e, t, r);
const n = Sr(e.container, "grenadeDangerZones");
n.clear(), He.Ue.ze && He.Ue.Xe.Je && ((e, t) => {
const r = e[Je.me].x, n = e[Je.me].y, a = _r(e.layer), o = Cr(e), i = Ie.game?.[Je.U]?.[Je.Te];
i && Object.values(i).filter(e => 9 === e.__type && "smoke" !== e.type || e.smokeEmitter && e.explodeParticle).forEach(e => {
const i = Mr(e.layer, o, a);
t.beginFill(i ? gr : pr, i ? .1 : .2), t.drawCircle(16 * (e.pos.x - r), 16 * (n - e.pos.y), 208), 
t.endFill(), t.lineStyle(2, 0, .2), t.drawCircle(16 * (e.pos.x - r), 16 * (n - e.pos.y), 208);
});
})(e, n);
const l = Sr(e.container, "grenadeTrajectory");
l.clear(), He.Ue.ze && He.Ue.Xe.Qe && ((e, t) => {
if (3 !== e[Je.ce][Je.Ce]) {
return;
}
const r = e[Je.se][Je.Se];
if (!r) {
return;
}
const n = Ie.game, a = e[Je.me].x, o = e[Je.me].y;
let i, l;
const s = n[Je.W].spectating, c = n[Je.S].shotDetected || n[Je.ae].isBindDown(xt), d = s ? null : cr();
if (d) {
const e = n[Je.N][Je._e]({
x: a,
y: o
}), t = d.x - e.x, r = d.y - e.y, s = Math.sqrt(t * t + r * r);
i = t / s, l = r / s;
} else if (s || De.et && c) {
if (!s && De.et) {
const e = n[Je.N][Je._e]({
x: a,
y: o
}), t = De.et.clientX - e.x, r = De.et.clientY - e.y, s = Math.sqrt(t * t + r * r);
i = t / s, l = r / s;
} else {
i = e[Je.fe].x, l = e[Je.fe].y;
}
} else {
const e = n[Je.re].mousePos._x - Fe.innerWidth / 2, t = n[Je.re].mousePos._y - Fe.innerHeight / 2, r = Math.sqrt(e * e + t * t);
i = e / r, l = t / r;
}
const u = .03489949670250097 * i + .9993908270190958 * l;
i = .9993908270190958 * i - .03489949670250097 * l, l = u;
const m = Math.min(Math.max(Ee.tt, 0), 32.4) / 15 * (r.includes("smoke") ? 11 : 15), f = a + i * m, h = o - l * m;
let g = br;
r.includes("smoke") ? g = vr : r.includes("frag") ? g = yr : r.includes("mirv") ? g = xr : r.includes("martyr") && (g = kr), 
t.lineStyle(3, g, .7), t.moveTo(0, 0), t.lineTo(16 * (f - a), 16 * (o - h));
const p = r.replace("_cook", ""), b = wt[p]?.explosionType;
if (b && wt[b]) {
const e = 16 * (wt[b].rad.max + 1);
t.beginFill(g, .2), t.drawCircle(16 * (f - a), 16 * (o - h), e), t.endFill(), t.lineStyle(2, g, .4), 
t.drawCircle(16 * (f - a), 16 * (o - h), e);
}
})(e, l);
const s = Sr(e.container, "flashlights");
s.clear(), He.Ue.ze && (He.Ue.nt.m || He.Ue.nt.rt) && ((e, t, r) => {
const n = o(e), l = i(n), s = _r(e.layer), c = Cr(e);
He.Ue.nt.rt && Nr(e, e, l, n, r), He.Ue.nt.m && t.filter(t => !(!t.active || t[Je.se][Je.Ne] || e.__id === t.__id || !Mr(t.layer, c, s) || !t.container.worldVisible || a(t) === a(e))).forEach(t => {
const n = o(t), a = i(n);
Nr(e, t, a, n, r, 0, .05);
});
})(e, t, s);
const d = Sr(e.container, "bulletTrajectory");
d.clear(), He.Ue.ze && He.Ue.nt.Qe && ((e, t) => {
const r = o(e), n = i(r);
if (!n || !r) {
return;
}
const a = Ie.game, l = e[Je.me], s = a[Je.W].spectating, c = a[Je.S].shotDetected || a[Je.ae].isBindDown(xt);
let d;
const u = s ? null : cr();
if (u) {
const e = a[Je.N][Je._e]({
x: l.x,
y: l.y
});
d = Math.atan2(e.y - u.y, e.x - u.x) - Math.PI;
} else if (s || De.et && c) {
if (!s && De.et) {
const e = a[Je.N][Je._e]({
x: l.x,
y: l.y
});
d = Math.atan2(e.y - De.et.clientY, e.x - De.et.clientX) - Math.PI;
} else {
d = Math.atan2(e[Je.fe].x, e[Je.fe].y) - Math.PI / 2;
}
} else {
d = Math.atan2(a[Je.re].mousePos._y - Fe.innerHeight / 2, a[Je.re].mousePos._x - Fe.innerWidth / 2);
}
const m = jt(Math.cos(d), -Math.sin(d)), f = fr(l, m, r), h = a?.[Je.U]?.[Je.Te], g = Ct && void 0 !== Mt ? Mt : e.layer;
let p = null;
if (h) {
const e = Object.values(h).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Gt(e.layer, g) || e?.type.includes("decal")));
let t = 1 / 0;
for (const r of e) {
if (!1 === r.collidable) {
continue;
}
const e = Wt.ot(r.collider, l, f);
if (e) {
const r = Et(Pt(e.point, l));
t > r && (t = r, p = Ot(e.point, Lt(e.normal, .01)));
}
}
}
const b = ((e, t, r, n, a, o = 3) => {
const i = [];
let l = Ft(e), s = It(t), c = r, d = 0;
const u = Ie.game, m = u?.[Je.U]?.[Je.Te];
if (!m) {
return i;
}
const f = Ct && void 0 !== Mt ? Mt : n, h = Object.values(m).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Gt(e.layer, f) || e?.type.includes("decal") || e?.type.includes("decal"))), g = u?.[Je.j], p = g?.playerPool?.[Je.ye], b = Je.ne, v = b ? u?.[b] : null, y = v?.player?.radius ?? 1, x = [];
if (Array.isArray(p)) {
for (const e of p) {
if (!e || !e.active) {
continue;
}
if (e.__id === a.__id) {
continue;
}
const t = e[Je.se];
if (!t) {
continue;
}
if (t[Je.Ne]) {
continue;
}
const r = e.layer ?? t.m_layer ?? 0;
if (!(Gt(r, f) || 2 & r)) {
continue;
}
const n = e[Je.me] ?? e.m_pos;
if (!n) {
continue;
}
const o = "number" == typeof e.m_rad ? e.m_rad : "number" == typeof e.rad ? e.rad : y * ("number" == typeof t.m_scale ? t.m_scale : "number" == typeof t.scale ? t.scale : 1);
o > 0 && x.push({
pos: {
x: n.x,
y: n.y
},
rad: o
});
}
}
for (;o >= d && c > .1; ) {
const e = Ot(l, Lt(s, c));
let t = null, r = 1 / 0, n = null, a = null;
for (const o of h) {
if (!1 === o.collidable) {
continue;
}
const i = Wt.ot(o.collider, l, e);
if (i) {
const e = Et(Pt(i.point, l));
r > e && e > 1e-4 && (r = e, t = i, n = o, a = "obstacle");
}
}
for (const o of x) {
const i = Wt.it(l, e, o.pos, o.rad);
if (i) {
const e = Et(Pt(i.point, l));
r > e && e > 1e-4 && (r = e, t = i, n = null, a = "player");
}
}
if (!t) {
i.push({
start: Ft(l),
end: e,
hitPlayer: !1
});
break;
}
{
if (i.push({
start: Ft(l),
end: Ft(t.point),
hitPlayer: "player" === a
}), "player" === a) {
break;
}
const e = n?.type;
let u = !1;
if (u = n && void 0 !== n.reflectBullets ? !0 === n.reflectBullets : [ "metal_wall", "stone_wall", "container_wall", "hedgehog", "bollard", "airdop", "silo", "collider", "warehouse_wall", "oven_", "control_panel_" ].some(t => e?.includes(t)), 
!u || d >= o) {
break;
}
{
const e = Bt(s, t.normal);
s = Ot(Lt(t.normal, -2 * e), s), s = It(s), l = Ot(t.point, Lt(s, .01)), c = Math.max(1, c - Math.sqrt(r)) / 1.5, 
d++;
}
}
}
return i;
})(p || f, m, n.distance, e.layer, e), v = b.some(e => e.hitPlayer);
t.lineStyle(v ? 2 : 1, v ? gr : 8246758, .5);
for (const e of b) {
const r = {
x: 16 * (e.start.x - l.x),
y: 16 * (l.y - e.start.y)
}, n = {
x: 16 * (e.end.x - l.x),
y: 16 * (l.y - e.end.y)
};
t.moveTo(r.x, r.y), t.lineTo(n.x, n.y);
}
})(e, d), t.forEach(c);
} catch {}
}

function u(e) {
Pr = e;
}

function m(e) {
if (!e || e.dead) {
return !1;
}
const t = e.type || "";
return Er.some(e => t.includes(e));
}

function h(e, t) {
return 2 === e || 3 === e || 2 === t || 3 === t || e === t;
}

function g(e) {
if (!1 === e.collidable) {
return !1;
}
if (e.dead) {
return !1;
}
const t = e.type || "";
return !0 === e.isWall || !1 === e.destructible || Wr.some(e => t.includes(e));
}

function p(e, t, r) {
const n = Ie.game, a = n?.[Je.U]?.[Je.Te];
if (!a) {
return !0;
}
const o = Math.hypot(t.x - e.x, t.y - e.y);
if (1 > o) {
return !0;
}
for (const n of Object.values(a)) {
if (!n.collider || n.dead) {
continue;
}
if (void 0 !== n.layer && !h(n.layer, r)) {
continue;
}
if (!g(n)) {
continue;
}
const a = Wt.ot(n.collider, e, t);
if (a && o - .5 > Math.hypot(a.point.x - e.x, a.point.y - e.y)) {
return !1;
}
}
return !0;
}

function b(e, t) {
const r = Math.atan2(t.y - e.y, t.x - e.x);
return {
touchMoveActive: !0,
touchMoveLen: 255,
x: Math.cos(r),
y: Math.sin(r)
};
}

function v() {
Ee.lt.includes(kt) || (Ee.lt.push(kt), Kr = performance.now());
}

function y() {
Fe.dispatchEvent(new MouseEvent("mouseup", {
bubbles: !0,
cancelable: !0,
view: Fe,
button: 0
}));
}

function x(e, t, r) {
if (!t || !t.container) {
return;
}
const n = t.container, a = "autoCrateESP";
if (!n[a]) {
if (!_t.st) {
return;
}
n[a] = new _t.st, n.addChild(n[a]);
}
const o = n[a];
if (!o) {
return;
}
if (o.clear(), !r || !He.ct?.ze) {
return;
}
const i = r[Je.he] || r.pos, l = t[Je.he];
if (!i || !l) {
return;
}
const s = 16 * (i.x - l.x), c = 16 * (l.y - i.y);
o.lineStyle(2.5, 16776960, .8), o.moveTo(0, 0), o.lineTo(s, c);
}

function k() {
if (!He.ct?.ze) {
return void (Hr && (y(), Hr = !1));
}
if (!Ir) {
return void (Hr && (y(), Hr = !1));
}
const e = Ie.game;
if (!e) {
return;
}
const t = e[Je.J];
if (!t) {
return;
}
const r = Ir[Je.he] || Ir.pos, n = t[Je.he];
if (!r || !n) {
return;
}
const a = Math.hypot(n.x - r.x, n.y - r.y), o = t[Je.ce]?.[Je.Ce], i = 2 === o, l = h(Ir.layer, t.layer);
7.5 >= a && i && l && He.ct?.dt ? performance.now() - Kr > 50 && (Hr || (Fe.dispatchEvent(new MouseEvent("mousedown", {
bubbles: !0,
cancelable: !0,
view: Fe,
button: 0
})), Hr = !0)) : Hr && (y(), Hr = !1);
}

function w(e) {
try {
const r = Ie.game;
if (!r || !r.initialized || !He.ut?.ze) {
return Gr.gt = null, null;
}
if (e[Je.se][Je.Ne]) {
return Gr.gt = null, null;
}
const n = r[Je.j].playerPool[Je.ye];
if (!n) {
return null;
}
const o = Vr(e.layer), i = ((e, t, r, n) => {
const o = a(t);
let i = null, l = 1 / 0;
for (const s of e) {
if (!s.active) {
continue;
}
if (s[Je.se][Je.Ne]) {
continue;
}
if (!He.ut.ht && s.downed) {
continue;
}
if (t.__id === s.__id) {
continue;
}
if (!Ur(s.layer, r, n)) {
continue;
}
if (a(s) === o) {
continue;
}
const e = t[Je.he], c = s[Je.he], d = Math.hypot(e.x - c.x, e.y - c.y);
l > d && (l = d, i = s);
}
return i;
})(n, e, Vr((t = e).layer) ? t.layer : Ct && void 0 !== Mt ? Mt : t.layer, o);
if (!i) {
return Gr.gt = null, null;
}
Gr.gt = i;
const l = i;
if (!l) {
return Gr.gt = null, null;
}
const s = ((e, t) => {
if (!e || !t) {
return null;
}
const r = Ie.game;
if (!r) {
return null;
}
const n = e[Je.he], a = t[Je.he], o = Math.atan2(a.y - n.y, a.x - n.x) + 2.356194490192345;
return r[Je.N][Je._e]({
x: n.x + 100 * Math.cos(o),
y: n.y + 100 * Math.sin(o)
});
})(e, l);
return s ? (Gr.ft = {
x: s.x,
y: s.y
}, new Vt("panHero", {
x: s.x,
y: s.y
}, null, !1)) : null;
} catch (e) {
return Gr.gt = null, null;
}
var t;
}

function _() {
return Gr.gt;
}

function C(e, t, r) {
if (!e || !e.pos) {
return null;
}
const n = e.pos, a = e.dir, o = e.speed || 100;
if (!a) {
return null;
}
const i = Pt(t, n), l = It(a), s = Bt(i, l);
if (0 > s || s > e.distance) {
return null;
}
const c = Ot(n, Lt(l, s)), d = Dt(Pt(t, c));
if (d > r + 1) {
return null;
}
const u = s / o;
return 0 > u || u > .3 ? null : {
bullet: e,
timeToImpact: u,
closestPoint: c,
distanceToLine: d,
bulletDir: l
};
}

function M(e, t = 2.5) {
if (3 > e.length) {
return new Set;
}
const r = e.sort((e, t) => e - t)[Math.floor(e.length / 2)], n = e.map(e => Math.abs(e - r)).sort((e, t) => e - t), a = n[Math.floor(n.length / 2)] || 0, o = new Set;
for (let n = 0; e.length > n; n++) {
a > 0 && Math.abs(e[n] - r) > t * a && o.add(n);
}
return o;
}

function S() {
try {
Jr.lastUpdateTime && performance.now() - Jr.lastUpdateTime > 1e3 && ((() => {
const e = performance.now();
for (const t in Jr.bt) {
const r = Jr.bt[t];
r.length > 0 && e - r[r.length - 1].t > 5e3 && (delete Jr.bt[t], delete Jr.vt[t], 
delete Jr.yt[t]);
}
})(), Jr.lastUpdateTime = performance.now());
const e = Ie.game;
if (!e.initialized || !He.kt.ze && !He.xt.ze || e[Je.W].spectating) {
return s(new Vt("idle")), mr(), void (Jr._t = null);
}
0 === Jr.lastAim.x && 0 === Jr.lastAim.y && (Jr.lastAim.x = Ie.game[Je.re].mousePos._x, 
Jr.lastAim.y = Ie.game[Je.re].mousePos._y);
const t = e[Je.J], r = !1 !== He.Ct?.wt ? (e => {
if (!He.Ct?.ze || !e) {
return null;
}
const t = Ie?.game;
if (!t?.initialized) {
return null;
}
const r = e?.[Je.he];
if (!r) {
return null;
}
const n = ((e, t) => {
const r = [], n = (() => {
const e = Ie?.game;
if (!e) {
return [];
}
const t = e?.[Je.$];
if (!t) {
return [];
}
if (t.m_bullets) {
return Array.isArray(t.m_bullets) ? t.m_bullets.filter(e => e?.active) : [];
}
if (t.getPool) {
const e = t.getPool?.();
return Array.isArray(e) ? e.filter(e => e?.active) : [];
}
const r = [];
for (const e in t) {
t[e]?.active && r.push(t[e]);
}
return r;
})();
for (const a of n) {
if (!a.active || !a.pos || !a.dir) {
continue;
}
if (Dt(Pt(e, a.pos)) > 100) {
continue;
}
const n = C(a, e, t);
n && r.push(n);
}
return r.sort((e, t) => e.timeToImpact - t.timeToImpact), r;
})(r, e?.physicsRadius || e?.visualRadius || 1);
if (0 === n.length) {
return Zr.Mt = 0, null;
}
const a = n[0], o = Date.now();
if (150 > o - Zr.St) {
return null;
}
if (a.timeToImpact >= .3) {
return null;
}
Zr.St = o, Zr.Mt = a.timeToImpact;
const i = (e => {
if (!e || !e.bulletDir) {
return {
x: 0,
y: 0
};
}
const t = e.bulletDir, r = It(jt(-t.y, t.x)), n = It(jt(t.y, -t.x));
return Math.random() > .5 ? n : r;
})(a);
return {
touchMoveActive: !0,
touchMoveLen: 255,
x: i.x,
y: i.y
};
})(t) : null;
if (!He.Ct?.wt && r && !e[Je.ae].isBindDown(xt)) {
return s(new Vt("dodge", null, r, !0)), mr(), void (Jr._t = null);
}
const n = e[Je.j].playerPool[Je.ye], c = Yr(t.layer);
let d = !1, f = null, g = null, k = !1;
try {
const _ = e[Je.J][Je.ce][Je.Ce], C = 2 === _, S = 3 === _, z = e[Je.ae].isBindDown(xt), N = He.xt.ze && (z || He.kt.dt);
let A = Jr.Nt;
N ? A && A.active && !A[Je.se][Je.Ne] || (A = ((e, t) => {
const r = a(t), n = Yr(t.layer), o = Xr(t);
let i = null, l = 1 / 0;
const s = t[Je.he];
for (const c of e) {
if (!c.active) {
continue;
}
if (c[Je.se][Je.Ne]) {
continue;
}
if (!He.kt.ht && c.downed) {
continue;
}
if (t.__id === c.__id) {
continue;
}
if (!en(c.layer, o, n)) {
continue;
}
if (a(c) === r) {
continue;
}
const e = c[Je.he], d = Math.hypot(s.x - e.x, s.y - e.y);
d > 300 || l > d && (l = d, i = c);
}
return i;
})(n, t), Jr.Nt = A, Jr.At = 0) : (A = null, Jr.Nt = null, Jr.At = 0);
let T = 1 / 0;
if (A) {
const e = t[Je.he], r = A[Je.he];
T = Math.hypot(e.x - r.x, e.y - r.y);
}
const R = 5.5 >= T, $ = Date.now();
if (!R && A && 0 === Jr.At ? Jr.At = $ : R && 0 !== Jr.At && (Jr.At = 0), !R && $ - Jr.At > 1e3 && Jr.At > 0 && (A = null, 
Jr.Nt = null, Jr.At = 0), N && He.xt.Tt && !C && R && Ee.lt.push(kt), N && C && R && A) {
const n = t[Je.he], a = A[Je.he], l = o(t), c = i(l);
if (!He.kt.zt || an(t, A, l, c)) {
const t = (e => {
if (!e) {
return null;
}
const t = e[Je.he];
if (!t) {
return null;
}
if (e.collider) {
try {
if (void 0 !== e.collider.radius) {
return {
x: t.x,
y: t.y
};
}
if (e.collider.min && e.collider.max) {
return {
x: (e.collider.min.x + e.collider.max.x) / 2 + t.x,
y: (e.collider.min.y + e.collider.max.y) / 2 + t.y
};
}
if (e.collider.getCenter && "function" == typeof e.collider.getCenter) {
const t = e.collider.getCenter();
return {
x: t.x,
y: t.y
};
}
} catch (e) {}
}
return e.body && e.body.position ? {
x: e.body.position.x,
y: e.body.position.y
} : {
x: t.x,
y: t.y
};
})(A) || a;
let o = t;
{
const e = A.__id, r = Jr.bt[e] ?? (Jr.bt[e] = []), n = performance.now();
if (r.push([ n, {
...a
} ]), r.length > 4 && r.shift(), r.length >= 3) {
let e = 0, n = 0, a = 0, i = 0, l = 0;
for (let e = 1; r.length > e; e++) {
const t = (r[e][0] - r[e - 1][0]) / 1e3;
t > 0 && (a += t, i += r[e][1].x - r[e - 1][1].x, l += r[e][1].y - r[e - 1][1].y);
}
a > 0 && (e = i / a, n = l / a);
const s = .08;
o = {
x: t.x + e * s,
y: t.y + n * s
};
}
}
o = ((e, t, r, n = 1) => Math.abs((t.x - e.x) * (r.y - e.y) - (t.y - e.y) * (r.x - e.x)) > n ? ((e, t, r) => {
const n = t.x - e.x, a = t.y - e.y, o = n * n + a * a;
if (.001 > o) {
return t;
}
const i = Math.max(0, Math.min(1, ((r.x - e.x) * n + (r.y - e.y) * a) / o));
return {
x: e.x + i * n,
y: e.y + i * a
};
})(e, t, r) : r)(n, a, o, 2);
const i = ((e, t) => Math.atan2(t.y - e.y, t.x - e.x))(o, n) + Math.PI;
let l = i;
if (He.xt.Rt && He.xt.jt > T) {
const e = Math.atan2(A[Je.fe].x, A[Je.fe].y) - Math.PI / 2 + Math.PI, t = i + Math.PI / 2, r = i - Math.PI / 2, n = Math.abs(t - e), a = Math.abs(r - e) > n ? t : r, o = He.xt.$t / 100 * Math.max(0, (He.xt.jt - T) / He.xt.jt);
let s = a - i;
for (;s > Math.PI; ) {
s -= 2 * Math.PI;
}
for (;-Math.PI > s; ) {
s += 2 * Math.PI;
}
l = i + s * o;
}
const c = Math.cos(l), m = Math.sin(l);
let f;
if (He.xt.Ft) {
const e = He.xt.Ot / 100, t = Math.random();
let r = 0, n = 0;
if (.5 * e > t) {
const e = He.xt.Pt / 100;
r = Math.sin(i) * e, n = -Math.cos(i) * e;
} else if (e > t) {
const e = He.xt.Pt / 100;
r = -Math.sin(i) * e, n = Math.cos(i) * e;
}
const a = c + r, o = m + n, l = Math.hypot(a, o);
f = {
touchMoveActive: !0,
touchMoveLen: 255,
x: l > 0 ? a / l : c,
y: l > 0 ? o / l : m
};
} else {
f = {
touchMoveActive: !0,
touchMoveLen: 255,
x: c,
y: m
};
}
r && (f = ((e, t) => {
if (!e || !t) {
return e || t;
}
const r = {
touchMoveActive: !0,
touchMoveLen: Math.max(e.touchMoveLen, t.touchMoveLen),
x: .7 * e.x + .3 * t.x,
y: .7 * e.y + .3 * t.y
}, n = Math.hypot(r.x, r.y);
return n > 0 && (r.x /= n, r.y /= n), r;
})(r, f));
const h = e[Je.N][Je._e]({
x: o.x,
y: o.y
});
return s(new Vt("meleeLock", {
x: h.x,
y: h.y
}, f, !0)), He.kt.dt && u(!0), d = !0, mr(), void (Jr._t = null);
}
} else {
u(!1);
}
N && !R && (Jr.Nt = null);
const j = (e => {
if (!He.ct?.ze) {
return Ir = null, Hr && (y(), Hr = !1), x(0, e, null), null;
}
if ((e => {
if (!e) {
return !1;
}
const t = e[Je.se], r = t?.[Je.Se];
if (!r) {
return !1;
}
const n = r.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill") || n.includes("painkiller");
})(e)) {
return Ir = null, Hr && (y(), Hr = !1), x(0, e, null), null;
}
if ((e => {
if (!e) {
return !1;
}
const t = e[Je.ce]?.[Je.Ce];
return 2 !== t && null != t;
})(e)) {
return Ir = null, Hr && (y(), Hr = !1), x(0, e, null), null;
}
const t = (() => {
try {
const e = globalThis.__AIMBOT_MODULE__ || {};
return {
hasValidTarget: e.hasValidTarget || (() => !1),
getCurrentTarget: e.getCurrentTarget || (() => null),
isEnemyBehindWall: e.isEnemyBehindWall || (() => !1),
getAimbotShootableState: e.getAimbotShootableState || (() => !1)
};
} catch (e) {
return {
hasValidTarget() {
return !1;
},
getCurrentTarget() {
return null;
},
isEnemyBehindWall() {
return !1;
},
getAimbotShootableState() {
return !1;
}
};
}
})();
if (t.hasValidTarget?.()) {
const r = t.getCurrentTarget?.();
if (r) {
const n = Ie.game?.[Je.J], a = !t.isEnemyBehindWall?.(n, r), o = t.getAimbotShootableState?.();
if (a || o) {
return Ir = null, Hr && (y(), Hr = !1), x(0, e, null), null;
}
}
}
const r = (e => {
const t = He.ct?.Bt ?? 7.6, r = Ie.game, n = r?.[Je.U]?.[Je.Te];
if (!n) {
return null;
}
const a = e[Je.he];
if (!a) {
return null;
}
const o = e.layer;
let i = null, l = 1 / 0;
for (const e of Object.values(n)) {
if (!m(e)) {
continue;
}
if (!h(e.layer, o)) {
continue;
}
const r = e[Je.he] || e.pos;
if (!r) {
continue;
}
const n = Math.hypot(a.x - r.x, a.y - r.y);
n > t || p(a, r, o) && l > n && (l = n, i = e);
}
return i ? {
obj: i,
distance: l
} : null;
})(e);
if (!r) {
return Ir = null, Hr && (y(), Hr = !1), x(0, e, null), null;
}
Ir = r.obj, x(0, e, Ir);
const n = Ir[Je.he] || Ir.pos, a = Ie.game, o = e[Je.ce]?.[Je.Ce], i = 2 === o, l = a[Je.N][Je._e]({
x: n.x,
y: n.y
});
if (7.5 >= r.distance) {
!i && He.ct?.Lt && v();
const t = b(e[Je.he], n);
return new Vt("crateBreak", {
x: l.x,
y: l.y
}, t, !0);
}
r.distance > 8 || !i && He.ct?.Lt && v();
const s = b(e[Je.he], n);
return new Vt("crateBreak", {
x: l.x,
y: l.y
}, s, !0);
})(t);
if (j && He.ct?.ze) {
return s(j), mr(), Jr._t = null, void (De.Dt = null);
}
if (!z && He.ut?.ze) {
const e = w(t);
if (e) {
return s(e), mr(), void (Jr._t = null);
}
}
if (!He.kt.ze || S) {
return s(new Vt("idle")), mr(), void (Jr._t = null);
}
const F = z || He.kt.dt;
let O = Jr.Et?.active && !Jr.Et[Je.se][Je.Ne] ? Jr.Et : null;
if (O) {
const e = Xr(t);
en(O.layer, e, c) || (O = null, Jr.Et = null, s(new Vt("idle", null, null, !0)));
}
if (O || (Jr.Et && (Jr.Et = null, s(new Vt("idle", null, null, !0))), O = ((e, t) => {
const r = a(t), n = Yr(t.layer), o = Xr(t);
let i = [];
const l = t[Je.he], s = Ie.game[Je.re].mousePos;
for (const s of e) {
if (!s.active) {
continue;
}
if (s[Je.se][Je.Ne]) {
continue;
}
if (!He.kt.ht && s.downed) {
continue;
}
if (t.__id === s.__id) {
continue;
}
if (!en(s.layer, o, n)) {
continue;
}
if (a(s) === r) {
continue;
}
const e = s[Je.he], c = Math.hypot(l.x - e.x, l.y - e.y);
c > 300 || i.push({
player: s,
screenPos: Ie.game[Je.N][Je._e]({
x: e.x,
y: e.y
}),
distanceToMe: c
});
}
return 0 === i.length ? null : (i.sort((e, t) => {
const r = Math.hypot(e.screenPos.x - s._x, e.screenPos.y - s._y), n = Math.hypot(t.screenPos.x - s._x, t.screenPos.y - s._y);
return .7 * r + e.distanceToMe / 300 * 30 - (.7 * n + t.distanceToMe / 300 * 30);
}), i[0].player);
})(n, t), Jr.Ht = O), O) {
const e = t[Je.he], n = O[Je.he], a = Math.hypot(e.x - n.x, e.y - n.y);
O === Jr.Ht || Jr.Et || (Jr.Ht = O, Jr.bt[O.__id] = []);
const c = ((e, t) => {
if (!e || !t) {
return null;
}
const r = e[Je.he], n = t[Je.he], a = e.__id, l = Jr.bt[a] ?? (Jr.bt[a] = []), s = performance.now();
if (l.push({
t: s,
x: r.x,
y: r.y
}), l.length > 18 && l.shift(), Jr.vt[a] || (Jr.vt[a] = {
vx: 0,
vy: 0
}), Jr.yt[a] || (Jr.yt[a] = {
ax: 0,
ay: 0
}), 2 > l.length) {
return Ie.game[Je.N][Je._e]({
x: r.x,
y: r.y
});
}
let c = 0, d = 0, u = 0, m = 0;
const f = [], h = [];
for (let e = 1; l.length > e; e++) {
const t = (l[e].t - l[e - 1].t) / 1e3;
if (t > 1e-4 && .1 > t) {
const r = l[e].x - l[e - 1].x, n = l[e].y - l[e - 1].y;
if (Math.hypot(r, n) > 200) {
continue;
}
f.push(r / t), h.push(n / t);
}
}
const g = M(f, 3), p = M(h, 3);
let b = 0;
for (let e = 1; l.length > e; e++) {
const t = (l[e].t - l[e - 1].t) / 1e3;
if (t > 1e-4 && .1 > t) {
const r = l[e].x - l[e - 1].x, n = l[e].y - l[e - 1].y;
if (Math.hypot(r, n) > 200) {
continue;
}
if (g.has(b) || p.has(b)) {
b++;
continue;
}
const a = r / t, o = n / t, i = Math.exp(e / l.length * 2.5) - 1;
c += a * i, d += o * i, u += i, m++, b++;
}
}
u > 0 && m > 0 && (c /= u, d /= u);
const v = Jr.vt[a], y = Math.hypot(c - v.vx, d - v.vy);
let x = qr;
y > 100 ? x = .88 : y > 50 ? x = .848 : 10 > y && (x = .5599999999999999);
let k = v.vx + x * (c - v.vx), w = v.vy + x * (d - v.vy);
Jr.vt[a] = {
vx: k,
vy: w
}, (0 === m || 1 > Math.abs(c) && 1 > Math.abs(d)) && (k *= .92, w *= .92);
const _ = Jr.yt[a];
let C = 60 * (k - v.vx), S = 60 * (w - v.vy);
C = .5 * _.ax + .5 * C, S = .5 * _.ay + .5 * S, Jr.yt[a] = {
ax: C,
ay: S
};
const z = Math.hypot(C, S), N = Math.min(1, z / 300);
k += C * Qr * N, w += S * Qr * N;
const A = i(o(t));
let T = A?.speed || 1e3;
const R = l.length > 1 ? l[l.length - 1].t - l[l.length - 2].t : 16;
Jr.It.push(R > 0 ? 1e3 / R : 60), Jr.It.length > 16 && Jr.It.shift();
let $ = 0, j = 0;
for (let e = 0; Jr.It.length > e; e++) {
const t = 1 + .1 * e;
$ += Jr.It[e] * t, j += t;
}
$ /= j, T *= Math.max(.5, Math.min(3, 60 / $));
const F = r.x - n.x, O = r.y - n.y;
if (0 >= T) {
return Ie.game[Je.N][Je._e]({
x: r.x,
y: r.y
});
}
const P = k + .05 * C, L = w + .05 * S, B = P * P + L * L - T * T, D = 2 * (F * P + O * L), E = F * F + O * O;
let I = 0;
if (Math.abs(B) > 1e-4) {
const e = D * D - 4 * B * E;
if (0 > e) {
return Ie.game[Je.N][Je._e]({
x: r.x,
y: r.y
});
}
{
const t = Math.sqrt(e), n = (-D - t) / (2 * B), a = (-D + t) / (2 * B);
if (n > 1e-4 && 1 >= n) {
I = n;
} else if (a > 1e-4 && 1 >= a) {
I = a;
} else if (n > 1e-4) {
I = n;
} else {
if (1e-4 >= a) {
return Ie.game[Je.N][Je._e]({
x: r.x,
y: r.y
});
}
I = a;
}
}
} else if (Math.abs(D) > 1e-4 && (I = -E / D, .001 > I)) {
return Ie.game[Je.N][Je._e]({
x: r.x,
y: r.y
});
}
I = Math.max(.01, Math.min(2, I)), I *= (() => {
const e = (() => {
if (0 == Ie.game.pings.length) {
return sr ?? 0;
}
let e = Reflect.apply([].slice, Ie.game.pings, [ -5 ]), t = e.reduce((e, t) => e + t);
return sr = t / e.length / 1e3, sr;
})?.() || 50;
return 1 + Math.min(.15, e / 1e3 * .3);
})();
const H = Math.exp(.2 * -I), K = k * H, W = w * H, G = Qr * Math.max(.1, H);
return Ie.game[Je.N][Je._e]({
x: r.x + K * I + C * I * I * .5 * G,
y: r.y + W * I + S * I * I * .5 * G
});
})(O, t);
if (!c) {
return s(new Vt("idle")), mr(), void (Jr._t = null);
}
g = {
x: c.x,
y: c.y
};
const m = o(t), h = i(m), p = !He.kt.zt || an(t, O, m, h);
Jr.Kt = p;
const b = (h?.distance || 1 / 0) >= a;
if (l(t)) {
return s(new Vt("idle")), mr(), Jr.Ht = null, void (Jr.Et = null);
}
He.kt.dt && a.toFixed(1);
let v = !1;
if (F && (He.kt.ze || He.xt.ze && 8 >= a)) {
if (He.kt.dt || !He.kt.zt || p || He.kt.dt && !C) {
s(new Vt("aimbot", {
x: c.x,
y: c.y
}, r || null, !1)), Jr._t = {
x: c.x,
y: c.y
}, Jr.lastUpdateTime = Date.now(), d = !0;
const e = De.et;
f = e ? {
x: e.clientX,
y: e.clientY
} : {
x: c.x,
y: c.y
}, k = p, He.kt.dt && !C && p && b && !(e => {
if (!e) {
return !1;
}
const t = e[Je.se], r = t?.[Je.Se];
if (!r) {
return !1;
}
const n = r.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill") || n.includes("painkiller");
})(t) && (v = !0);
} else {
f = {
x: c.x,
y: c.y
}, k = !1;
}
} else {
f = {
x: c.x,
y: c.y
}, k = p;
}
u(!!v);
} else {
g = null, f = null, Jr._t = null, u(!1);
}
d || (r && !e[Je.ae].isBindDown(xt) ? s(new Vt("dodge", null, r, !0)) : s(new Vt("idle")), 
Jr._t = g ? {
x: g.x,
y: g.y
} : null);
let P = f;
!P && g && (P = {
x: g.x,
y: g.y
}), ur(P, k, !!Jr.Et);
} catch (e) {
mr(), s(new Vt("idle", null, null, !0)), Jr.Nt = null, Jr.Et = null, Jr.Ht = null, 
Jr._t = null;
}
} catch (e) {
s(new Vt({
mode: "idle",
immediate: !0
})), Jr._t = null;
}
}

function z() {
return !!Jr.Ht && Jr.Kt;
}

function N() {
return Jr.Ht && Jr.Ht.active && !Jr.Ht[Je.se][Je.Ne];
}

function A() {
return Jr.Ht;
}

function T(e, t) {
return !an(e, t, null, null);
}

function R(e, t) {
const r = e[Je.ce];
if (!r || !hn) {
return 0;
}
const n = r[hn];
return n && "object" == typeof n && n[t] || 0;
}

function $() {
const e = He.Wt;
if (!e?.ze) {
return;
}
if (!Ie.game) {
return;
}
const t = Ie.game, r = t[Je.J];
if (!r || !r.active) {
return;
}
const n = r[Je.se];
if (n?.[Je.Ne] || r.downed) {
return;
}
if ((e => {
if (e) {
if (!mn) {
const t = [];
for (const r in e) {
const n = e[r];
"number" == typeof n && n > 5 && 100 >= n && t.push({
k: r,
v: n
});
}
if (1 === t.length) {
mn = t[0].k;
} else if (t.length > 1) {
const e = t.find(e => .1 > Math.abs(e.v - 100));
e ? mn = e.k : (t.sort((e, t) => t.v - e.v), mn = t[0].k);
}
}
if (!fn && mn) {
const t = [], r = [ mn, Je.Ce, Je.be ];
for (const n in e) {
if (r.includes(n)) {
continue;
}
const a = e[n];
"number" != typeof a || 0 > a || a > 100 || t.push(n);
}
t.length > 0 && (fn = t[0]);
}
if (!hn) {
for (const t in e) {
const r = e[t];
if ("object" == typeof r && null !== r && !Array.isArray(r) && ("bandage" in r || "healthkit" in r || "soda" in r)) {
hn = t;
break;
}
}
}
}
})(r[Je.ce]), !mn) {
return;
}
if ((e => {
const t = e[Je.se], r = t?.[Je.Se];
if (!r) {
return !1;
}
const n = r.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill");
})(r)) {
return;
}
if ((e => l(e))(r)) {
return;
}
if ((e => {
if (Or) {
return !0;
}
const t = e[Je.ae];
return !(!t || !t.isBindDown(xt)) || !!Ee.lt.includes(xt);
})(t)) {
return;
}
if (e.Gt && ((e, t, r) => {
const n = e[Je.j]?.playerPool?.[Je.ye];
if (!n) {
return !1;
}
const o = a(t), i = t[Je.he], l = t.layer;
for (const e of n) {
if (!e.active || e.__id === t.__id) {
continue;
}
if (e[Je.se]?.[Je.Ne] || e.downed) {
continue;
}
if (a(e) === o) {
continue;
}
const n = e[Je.he];
if (r > Math.hypot(n.x - i.x, n.y - i.y) && (void 0 === e.layer || e.layer === l)) {
return !0;
}
}
return !1;
})(t, r, e.Vt || 15)) {
return;
}
const o = (e => {
const t = e[Je.ce];
return t && mn && void 0 !== t[mn] ? t[mn] : 100;
})(r), i = (e => {
const t = e[Je.ce];
return t && fn && void 0 !== t[fn] ? t[fn] : 0;
})(r), s = Date.now(), c = R(r, "bandage"), d = R(r, "healthkit"), u = R(r, "soda"), m = R(r, "painkiller"), f = e.Zt || 75, h = e.Ut || 50, g = e.Yt || 75;
return h > o && d > 0 && s - sn > 3100 ? (Ee.qt = "healthkit", void (sn = s)) : c > 0 && s - cn > 2100 && (h > o && 0 === d || f > o && o >= h) ? (Ee.qt = "bandage", 
void (cn = s)) : 50 > i && m > 0 && s - dn > 3100 ? (Ee.qt = "painkiller", void (dn = s)) : u > 0 && s - un > 2100 && g > i && (0 === m || i >= 50) ? (Ee.qt = "soda", 
void (un = s)) : void 0;
}

function j() {
let e = !1;
const t = e => {
"string" == typeof e && (localStorage.setItem("lastBackgroundType", "url"), localStorage.setItem("lastBackgroundValue", e));
};
return {
init() {
if (He.Jt && He.Jt.ze && !e) {
try {
const t = Oe.getElementById("background");
t && Fe.getComputedStyle(t), (() => {
const e = localStorage.getItem("lastBackgroundType"), t = localStorage.getItem("lastBackgroundValue"), r = Oe.getElementById("background");
r && e && t && (r.style.backgroundImage = `url("${t}")`, r.style.backgroundSize = "cover", 
r.style.backgroundPosition = "center", r.style.backgroundRepeat = "no-repeat");
})(), e = !0;
} catch (e) {}
}
},
cleanup() {
e = !1;
},
setBackgroundFromUrl(e) {
const r = Oe.getElementById("background");
if (!r) {
return !1;
}
if (!e || "string" != typeof e || "" === e.trim()) {
return !1;
}
const n = e.trim();
return r.style.backgroundImage = `url("${n}")`, r.style.backgroundSize = "cover", 
r.style.backgroundPosition = "center", r.style.backgroundRepeat = "no-repeat", t(n), 
!0;
},
setBackgroundFromFile(e) {
const r = Oe.getElementById("background");
if (!r) {
return !1;
}
if (!(e && e instanceof Blob)) {
return !1;
}
const n = new FileReader;
return n.onload = () => {
"string" == typeof n.result && (r.style.backgroundImage = `url("${n.result}")`, 
r.style.backgroundSize = "cover", r.style.backgroundPosition = "center", r.style.backgroundRepeat = "no-repeat", 
t(n.result));
}, n.onerror = () => {}, n.readAsDataURL(e), !0;
},
resetBackground() {
const e = Oe.getElementById("background");
return !!e && (e.style.backgroundImage = 'url("https://survev.io/img/main_splash_0_6_10.png")', 
e.style.backgroundSize = "cover", e.style.backgroundPosition = "center", e.style.backgroundRepeat = "no-repeat", 
localStorage.removeItem("lastBackgroundType"), localStorage.removeItem("lastBackgroundValue"), 
!0);
}
};
}

function F(e, t) {
for (var r in t) {
e[r] = t[r];
}
return e;
}

function O(e) {
e && e.parentNode && e.parentNode.removeChild(e);
}

function P(e, t, r) {
var n, a, o, i = {};
for (o in t) {
"key" == o ? n = t[o] : "ref" == o ? a = t[o] : i[o] = t[o];
}
if (arguments.length > 2 && (i.children = arguments.length > 3 ? zn.call(arguments, 2) : r), 
"function" == typeof e && null != e.Xt) {
for (o in e.Xt) {
void 0 === i[o] && (i[o] = e.Xt[o]);
}
}
return L(e, i, n, a, null);
}

function L(e, t, r, n, a) {
var o = {
type: e,
Qt: t,
key: r,
ref: n,
en: null,
tn: null,
nn: 0,
rn: null,
an: null,
constructor: void 0,
ln: a ?? ++An,
sn: -1,
cn: 0
};
return null == a && null != Nn.dn && Nn.dn(o), o;
}

function B(e) {
return e.children;
}

function D(e, t) {
this.Qt = e, this.context = t;
}

function E(e, t) {
if (null == t) {
return e.tn ? E(e.tn, e.sn + 1) : null;
}
for (var r; e.en.length > t; t++) {
if (null != (r = e.en[t]) && null != r.rn) {
return r.rn;
}
}
return "function" == typeof e.type ? E(e) : null;
}

function I(e) {
var t, r;
if (null != (e = e.tn) && null != e.an) {
for (e.rn = e.an.base = null, t = 0; e.en.length > t; t++) {
if (null != (r = e.en[t]) && null != r.rn) {
e.rn = e.an.base = r.rn;
break;
}
}
return I(e);
}
}

function H(e) {
(!e.un && (e.un = !0) && Tn.push(e) && !K.mn++ || Rn != Nn.gn) && ((Rn = Nn.gn) || $n)(K);
}

function K() {
for (var e, t, r, n, a, o, i, l = 1; Tn.length; ) {
Tn.length > l && Tn.sort(jn), e = Tn.shift(), l = Tn.length, e.un && (r = void 0, 
n = void 0, a = (n = (t = e).ln).rn, o = [], i = [], t.hn && ((r = F({}, n)).ln = n.ln + 1, 
Nn.dn && Nn.dn(r), q(t.hn, r, n, t.fn, t.hn.namespaceURI, 32 & n.cn ? [ a ] : null, o, a ?? E(n), !!(32 & n.cn), i), 
r.ln = n.ln, r.tn.en[r.sn] = r, X(o, r, i), n.rn = n.tn = null, r.rn != a && I(r)));
}
K.mn = 0;
}

function W(e, t, r, n, a, o, i, l, s, c, d) {
var u, m, f, h, g, p, b, v = n && n.en || Dn, y = t.length;
for (s = ((e, t, r, n, a) => {
var o, i, l, s, c, d = r.length, u = d, m = 0;
for (e.en = Array(a), o = 0; a > o; o++) {
null != (i = t[o]) && "boolean" != typeof i && "function" != typeof i ? ("string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? i = e.en[o] = L(null, i, null, null, null) : In(i) ? i = e.en[o] = L(B, {
children: i
}, null, null, null) : void 0 === i.constructor && i.nn > 0 ? i = e.en[o] = L(i.type, i.Qt, i.key, i.ref ? i.ref : null, i.ln) : e.en[o] = i, 
s = o + m, i.tn = e, i.nn = e.nn + 1, l = null, -1 != (c = i.sn = U(i, r, s, u)) && (u--, 
(l = r[c]) && (l.cn |= 2)), null == l || null == l.ln ? (-1 == c && (a > d ? m-- : d > a && m++), 
"function" != typeof i.type && (i.cn |= 4)) : c != s && (c == s - 1 ? m-- : c == s + 1 ? m++ : (c > s ? m-- : m++, 
i.cn |= 4))) : e.en[o] = null;
}
if (u) {
for (o = 0; d > o; o++) {
null != (l = r[o]) && !(2 & l.cn) && (l.rn == n && (n = E(l)), re(l, l));
}
}
return n;
})(r, t, v, s, y), u = 0; y > u; u++) {
null != (f = r.en[u]) && (m = -1 == f.sn ? Bn : v[f.sn] || Bn, f.sn = u, p = q(e, f, m, a, o, i, l, s, c, d), 
h = f.rn, f.ref && m.ref != f.ref && (m.ref && te(m.ref, null, f), d.push(f.ref, f.an || h, f)), 
null == g && null != h && (g = h), (b = !!(4 & f.cn)) || m.en === f.en ? s = G(f, s, e, b) : "function" == typeof f.type && void 0 !== p ? s = p : h && (s = h.nextSibling), 
f.cn &= -7);
}
return r.rn = g, s;
}

function G(e, t, r, n) {
var a, o;
if ("function" == typeof e.type) {
for (a = e.en, o = 0; a && a.length > o; o++) {
a[o] && (a[o].tn = e, t = G(a[o], t, r, n));
}
return t;
}
e.rn != t && (n && (t && e.type && !t.parentNode && (t = E(e)), r.insertBefore(e.rn, t || null)), 
t = e.rn);
do {
t = t && t.nextSibling;
} while (null != t && 8 == t.nodeType);
return t;
}

function V(e, t) {
return t = t || [], null == e || "boolean" == typeof e || (In(e) ? e.some(e => {
V(e, t);
}) : t.push(e)), t;
}

function U(e, t, r, n) {
var a, o, i, l = e.key, s = e.type, c = t[r], d = null != c && !(2 & c.cn);
if (null === c && null == l || d && l == c.key && s == c.type) {
return r;
}
if (n > (d ? 1 : 0)) {
for (a = r - 1, o = r + 1; a >= 0 || t.length > o; ) {
if (null != (c = t[i = 0 > a ? o++ : a--]) && !(2 & c.cn) && l == c.key && s == c.type) {
return i;
}
}
}
return -1;
}

function Z(e, t, r) {
"-" == t[0] ? e.setProperty(t, r ?? "") : e[t] = null == r ? "" : "number" != typeof r || En.test(t) ? r : r + "px";
}

function Y(e, t, r, n, a) {
var o, i;
e: if ("style" == t) {
if ("string" == typeof r) {
e.style.cssText = r;
} else {
if ("string" == typeof n && (e.style.cssText = n = ""), n) {
for (t in n) {
r && t in r || Z(e.style, t, "");
}
}
if (r) {
for (t in r) {
n && r[t] == n[t] || Z(e.style, t, r[t]);
}
}
}
} else if ("o" == t[0] && "n" == t[1]) {
o = t != (t = t.replace(Fn, "$1")), i = t.toLowerCase(), t = i in e || "onFocusOut" == t || "onFocusIn" == t ? i.slice(2) : t.slice(2), 
e.l || (e.l = {}), e.l[t + o] = r, r ? n ? r.u = n.u : (r.u = On, e.addEventListener(t, o ? Ln : Pn, o)) : e.removeEventListener(t, o ? Ln : Pn, o);
} else {
if ("http://www.w3.org/2000/svg" == a) {
t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
} else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && "popover" != t && t in e) {
try {
e[t] = r ?? "";
break e;
} catch (e) {}
}
"function" == typeof r || (null == r || !1 === r && "-" != t[4] ? e.removeAttribute(t) : e.setAttribute(t, "popover" == t && 1 == r ? "" : r));
}
}

function J(e) {
return function(t) {
if (this.l) {
var r = this.l[t.type + e];
if (null == t.t) {
t.t = On++;
} else if (r.u > t.t) {
return;
}
return r(Nn.event ? Nn.event(t) : t);
}
};
}

function q(e, t, r, n, a, o, i, l, s, c) {
var d, u, m, f, h, g, p, b, v, y, x, k, w, _, C, M, S, z = t.type;
if (void 0 !== t.constructor) {
return null;
}
128 & r.cn && (s = !!(32 & r.cn), o = [ l = t.rn = r.rn ]), (d = Nn.nn) && d(t);
e: if ("function" == typeof z) {
try {
if (b = t.Qt, v = "prototype" in z && z.prototype.render, y = (d = z.contextType) && n[d.an], 
x = d ? y ? y.Qt.value : d.tn : n, r.an ? p = (u = t.an = r.an).tn = u.pn : (v ? t.an = u = new z(b, x) : (t.an = u = new D(b, x), 
u.constructor = z, u.render = ne), y && y.sub(u), u.state || (u.state = {}), u.fn = n, 
m = u.un = !0, u.bn = [], u._sb = []), v && null == u.vn && (u.vn = u.state), v && null != z.yn && (u.vn == u.state && (u.vn = F({}, u.vn)), 
F(u.vn, z.yn(b, u.vn))), f = u.Qt, h = u.state, u.ln = t, m) {
v && null == z.yn && null != u.kn && u.kn(), v && null != u.xn && u.bn.push(u.xn);
} else {
if (v && null == z.yn && b !== f && null != u._n && u._n(b, x), t.ln == r.ln || !u.rn && null != u.wn && !1 === u.wn(b, u.vn, x)) {
for (t.ln != r.ln && (u.Qt = b, u.state = u.vn, u.un = !1), t.rn = r.rn, t.en = r.en, 
t.en.some(e => {
e && (e.tn = t);
}), k = 0; u._sb.length > k; k++) {
u.bn.push(u._sb[k]);
}
u._sb = [], u.bn.length && i.push(u);
break e;
}
null != u.Cn && u.Cn(b, u.vn, x), v && null != u.Mn && u.bn.push(() => {
u.Mn(f, h, g);
});
}
if (u.context = x, u.Qt = b, u.hn = e, u.rn = !1, w = Nn.mn, _ = 0, v) {
for (u.state = u.vn, u.un = !1, w && w(t), d = u.render(u.Qt, u.state, u.context), 
C = 0; u._sb.length > C; C++) {
u.bn.push(u._sb[C]);
}
u._sb = [];
} else {
do {
u.un = !1, w && w(t), d = u.render(u.Qt, u.state, u.context), u.state = u.vn;
} while (u.un && 25 > ++_);
}
u.state = u.vn, null != u.Sn && (n = F(F({}, n), u.Sn())), v && !m && null != u.Nn && (g = u.Nn(f, h)), 
M = d, null != d && d.type === B && null == d.key && (M = ee(d.Qt.children)), l = W(e, In(M) ? M : [ M ], t, r, n, a, o, i, l, s, c), 
u.base = t.rn, t.cn &= -161, u.bn.length && i.push(u), p && (u.pn = u.tn = null);
} catch (e) {
if (t.ln = null, s || null != o) {
if (e.then) {
for (t.cn |= s ? 160 : 128; l && 8 == l.nodeType && l.nextSibling; ) {
l = l.nextSibling;
}
o[o.indexOf(l)] = null, t.rn = l;
} else {
for (S = o.length; S--; ) {
O(o[S]);
}
Q(t);
}
} else {
t.rn = r.rn, t.en = r.en, e.then || Q(t);
}
Nn.rn(e, t, r);
}
} else {
null == o && t.ln == r.ln ? (t.en = r.en, t.rn = r.rn) : l = t.rn = ((e, t, r, n, a, o, i, l, s) => {
var c, d, u, m, f, h, g, p = r.Qt || Bn, b = t.Qt, v = t.type;
if ("svg" == v ? a = "http://www.w3.org/2000/svg" : "math" == v ? a = "http://www.w3.org/1998/Math/MathML" : a || (a = "http://www.w3.org/1999/xhtml"), 
null != o) {
for (c = 0; o.length > c; c++) {
if ((f = o[c]) && "setAttribute" in f == !!v && (v ? f.localName == v : 3 == f.nodeType)) {
e = f, o[c] = null;
break;
}
}
}
if (null == e) {
if (null == v) {
return document.createTextNode(b);
}
e = document.createElementNS(a, v, b.is && b), l && (Nn.Tn && Nn.Tn(t, o), l = !1), 
o = null;
}
if (null == v) {
p === b || l && e.data == b || (e.data = b);
} else {
if (o = o && zn.call(e.childNodes), !l && null != o) {
for (p = {}, c = 0; e.attributes.length > c; c++) {
p[(f = e.attributes[c]).name] = f.value;
}
}
for (c in p) {
if (f = p[c], "children" == c) {} else if ("dangerouslySetInnerHTML" == c) {
u = f;
} else if (!(c in b)) {
if ("value" == c && "defaultValue" in b || "checked" == c && "defaultChecked" in b) {
continue;
}
Y(e, c, null, f, a);
}
}
for (c in b) {
f = b[c], "children" == c ? m = f : "dangerouslySetInnerHTML" == c ? d = f : "value" == c ? h = f : "checked" == c ? g = f : l && "function" != typeof f || p[c] === f || Y(e, c, f, p[c], a);
}
if (d) {
l || u && (d.zn == u.zn || d.zn == e.innerHTML) || (e.innerHTML = d.zn), t.en = [];
} else if (u && (e.innerHTML = ""), W("template" == t.type ? e.content : e, In(m) ? m : [ m ], t, r, n, "foreignObject" == v ? "http://www.w3.org/1999/xhtml" : a, o, i, o ? o[0] : r.en && E(r, 0), l, s), 
null != o) {
for (c = o.length; c--; ) {
O(o[c]);
}
}
l || (c = "value", "progress" == v && null == h ? e.removeAttribute("value") : null != h && (h !== e[c] || "progress" == v && !h || "option" == v && h != p[c]) && Y(e, c, h, p[c], a), 
c = "checked", null != g && g != e[c] && Y(e, c, g, p[c], a));
}
return e;
})(r.rn, t, r, n, a, o, i, s, c);
}
return (d = Nn.An) && d(t), 128 & t.cn ? void 0 : l;
}

function Q(e) {
e && e.an && (e.an.rn = !0), e && e.en && e.en.forEach(Q);
}

function X(e, t, r) {
for (var n = 0; r.length > n; n++) {
te(r[n], r[++n], r[++n]);
}
Nn.an && Nn.an(t, e), e.some(t => {
try {
e = t.bn, t.bn = [], e.some(e => {
e.call(t);
});
} catch (e) {
Nn.rn(e, t.ln);
}
});
}

function ee(e) {
return "object" != typeof e || null == e || e.nn && e.nn > 0 ? e : In(e) ? e.map(ee) : F({}, e);
}

function te(e, t, r) {
try {
if ("function" == typeof e) {
var n = "function" == typeof e.cn;
n && e.cn(), n && null == t || (e.cn = e(t));
} else {
e.current = t;
}
} catch (e) {
Nn.rn(e, r);
}
}

function re(e, t, r) {
var n, a;
if (Nn.unmount && Nn.unmount(e), (n = e.ref) && (n.current && n.current != e.rn || te(n, null, t)), 
null != (n = e.an)) {
if (n.Rn) {
try {
n.Rn();
} catch (e) {
Nn.rn(e, t);
}
}
n.base = n.hn = null;
}
if (n = e.en) {
for (a = 0; n.length > a; a++) {
n[a] && re(n[a], t, r || "function" != typeof e.type);
}
}
r || O(e.rn), e.an = e.tn = e.rn = void 0;
}

function ne(e, t, r) {
return this.constructor(e, r);
}

function ae(e, t, r) {
var n, a, o, i;
t == document && (t = document.documentElement), Nn.tn && Nn.tn(e, t), a = (n = "function" == typeof r) ? null : r && r.en || t.en, 
o = [], i = [], q(t, e = (!n && r || t).en = P(B, null, [ e ]), a || Bn, Bn, t.namespaceURI, !n && r ? [ r ] : a ? null : t.firstChild ? zn.call(t.childNodes) : null, o, !n && r ? r : a ? a.rn : t.firstChild, n, i), 
X(o, e, i);
}

function oe(e, t) {
ae(e, t, oe);
}

function ie(e, t) {
Zn.bn && Zn.bn(Kn, e, Vn || t), Vn = 0;
var r = Kn.jn || (Kn.jn = {
tn: [],
bn: []
});
return e >= r.tn.length && r.tn.push({}), r.tn[e];
}

function le(e) {
return Vn = 1, function(e, t) {
var r = ie(Hn++, 2);
if (r.t = e, !r.an && (r.tn = [ be(void 0, t), e => {
var t = r.$n ? r.$n[0] : r.tn[0], n = r.t(t, e);
t !== n && (r.$n = [ n, r.tn[1] ], r.an.Fn({}));
} ], r.an = Kn, !Kn.On)) {
var n = function(e, t, n) {
if (!r.an.jn) {
return !0;
}
var o = r.an.jn.tn.filter(e => !!e.an);
if (o.every(e => !e.$n)) {
return !a || a.call(this, e, t, n);
}
var i = r.an.Qt !== e;
return o.forEach(e => {
if (e.$n) {
var t = e.tn[0];
e.tn = e.$n, e.$n = void 0, t !== e.tn[0] && (i = !0);
}
}), a && a.call(this, e, t, n) || i;
};
Kn.On = !0;
var a = Kn.wn, o = Kn.Cn;
Kn.Cn = function(e, t, r) {
if (this.rn) {
var i = a;
a = void 0, n(e, t, r), a = i;
}
o && o.call(this, e, t, r);
}, Kn.wn = n;
}
return r.$n || r.tn;
}(be, e);
}

function se(e, t) {
var r = ie(Hn++, 3);
!Zn.vn && pe(r.jn, t) && (r.tn = e, r.u = t, Kn.jn.bn.push(r));
}

function ce(e) {
return Vn = 5, de(() => ({
current: e
}), []);
}

function de(e, t) {
var r = ie(Hn++, 7);
return pe(r.jn, t) && (r.tn = e(), r.jn = t, r.bn = e), r.tn;
}

function ue(e, t) {
return Vn = 8, de(() => e, t);
}

function me() {
for (var e; e = Un.shift(); ) {
if (e.hn && e.jn) {
try {
e.jn.bn.forEach(he), e.jn.bn.forEach(ge), e.jn.bn = [];
} catch (t) {
e.jn.bn = [], Zn.rn(t, e.ln);
}
}
}
}

function fe(e) {
var t, r = () => {
clearTimeout(n), ta && cancelAnimationFrame(t), setTimeout(e);
}, n = setTimeout(r, 35);
ta && (t = requestAnimationFrame(r));
}

function he(e) {
var t = Kn, r = e.an;
"function" == typeof r && (e.an = void 0, r()), Kn = t;
}

function ge(e) {
var t = Kn;
e.an = e.tn(), Kn = t;
}

function pe(e, t) {
return !e || e.length !== t.length || t.some((t, r) => t !== e[r]);
}

function be(e, t) {
return "function" == typeof t ? t(e) : t;
}

function ve(e, t) {
for (var r in e) {
if ("__source" !== r && !(r in t)) {
return !0;
}
}
for (var n in t) {
if ("__source" !== n && e[n] !== t[n]) {
return !0;
}
}
return !1;
}

function ye(e, t) {
this.Qt = e, this.context = t;
}

function xe(e, t, r) {
return e && (e.an && e.an.jn && (e.an.jn.tn.forEach(e => {
"function" == typeof e.an && e.an();
}), e.an.jn = null), null != (e = ((e, t) => {
for (var r in t) {
e[r] = t[r];
}
return e;
})({}, e)).an && (e.an.hn === r && (e.an.hn = t), e.an.rn = !0, e.an = null), e.en = e.en && e.en.map(e => xe(e, t, r))), 
e;
}

function ke(e, t, r) {
return e && r && (e.ln = null, e.en = e.en && e.en.map(e => ke(e, t, r)), e.an && e.an.hn === t && (e.rn && r.appendChild(e.rn), 
e.an.rn = !0, e.an.hn = r)), e;
}

function we() {
this.cn = 0, this.o = null, this.nn = null;
}

function _e(e) {
var t = e.tn.an;
return t && t.Pn && t.Pn(e);
}

function Ce() {
this.i = null, this.l = null;
}

function Me() {}

function Se() {
return this.cancelBubble;
}

function ze() {
return this.defaultPrevented;
}

function Ne(e) {
return {
render(t) {
((e, t) => {
null == t.en && (t.textContent = ""), ae(e, t);
})(t, e);
},
unmount() {
(e => {
e.en && ae(null, e);
})(e);
}
};
}

function Ae(e, t, r, n, a, o) {
t || (t = {});
var i, l, s = t;
if ("ref" in s) {
for (l in s = {}, t) {
"ref" == l ? i = t[l] : s[l] = t[l];
}
}
var c = {
type: e,
Qt: s,
key: r,
ref: i,
en: null,
tn: null,
nn: 0,
rn: null,
an: null,
constructor: void 0,
ln: --La,
sn: -1,
cn: 0,
Bn: a,
Ln: o
};
if ("function" == typeof e && (i = e.Xt)) {
for (l in i) {
void 0 === s[l] && (s[l] = i[l]);
}
}
return Nn.dn && Nn.dn(c), c;
}

function Te(e) {
return e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

function Re(e) {
try {
const t = JSON.parse(JSON.stringify(He));
e(He);
const r = (e, t, n = !1) => {
if (!e || !t) {
return n;
}
for (const a in t) {
if ("object" == typeof t[a] && null !== t[a] && !n) {
if (void 0 !== t[a].ze) {
const r = e[a]?.ze, n = t[a].ze;
if (r !== n) {
return !0 === n ? to("enable") : !1 === n && to("disable"), !0;
}
}
if (r(e[a] || {}, t[a], n)) {
return !0;
}
}
}
return n;
};
r(t, He);
} catch (e) {}
po();
}

const $e = "".charCodeAt, je = String.fromCharCode, Fe = window.ou, Oe = window.ou.document, Pe = window.sr, Le = window.sl, Be = "__cf_ray", De = {
et: null,
Dn: null
}, Ee = {
lt: [],
tt: 0,
qt: null
};

let Ie;

const He = ((e, t) => {
const r = {}, n = {}, a = (e, t, n) => {
const o = {};
for (const i in e) {
if ("_k" === i) {
continue;
}
const l = e[i], s = t?.[i];
if ("object" == typeof l && l._k) {
o[i] = a(l, s, n + "." + i);
} else {
const e = n + "." + i;
r[e] = "number" == typeof s || "string" == typeof s ? s : !!s, Object.defineProperty(o, i, {
get() {
return r[e];
},
set(t) {
r[e] = "number" == typeof r[e] ? "number" == typeof t ? t : 0 : "string" == typeof r[e] ? "string" == typeof t ? t : "" : !!t;
},
enumerable: !0
});
}
}
return o;
};
for (const r in e) {
n[r] = a(e[r], t[r], r);
}
return n._serialize = () => {
const t = (e, n) => {
const a = {};
for (const o in e) {
if ("_k" === o) {
continue;
}
const i = e[o];
"object" == typeof i && i._k ? a[i._k] = t(i, n + "." + o) : a[i] = r[n + "." + o];
}
return a;
}, n = {};
for (const r in e) {
n[e[r]._k] = t(e[r], r);
}
return n;
}, n._deserialize = t => {
if (!t || "object" != typeof t) {
return;
}
const n = (e, t, a) => {
if (t && "object" == typeof t) {
for (const o in e) {
if ("_k" === o) {
continue;
}
const i = e[o];
if ("object" == typeof i && i._k) {
n(i, t[i._k], a + "." + o);
} else {
const e = t[i];
if (void 0 !== e) {
const t = a + "." + o;
r[t] = "number" == typeof r[t] ? "number" == typeof e ? e : 0 : "string" == typeof r[t] ? "string" == typeof e ? e : "" : !!e;
}
}
}
}
};
for (const r in e) {
n(e[r], t[e[r]._k], r);
}
}, n;
})({
kt: {
_k: "\t",
ze: "𝅷",
ht: "󠀁",
En: "󠀻",
Hn: "󠀢",
zt: "󠀣",
dt: "fx"
},
xt: {
_k: "󠁑",
ze: "󠁧",
Tt: "󠁢",
Ft: "󠁣",
Pt: "󠁤",
Ot: "󠁥",
Rt: "󠁦",
jt: "󠁨",
$t: "󠁩"
},
Ct: {
_k: "󠁪",
ze: "󠁫",
In: "󠁬",
Kn: "󠁭",
wt: "󠁮"
},
Wn: {
_k: "󠁠",
ze: "󠄇",
Gn: "󠄧"
},
Vn: {
_k: "󠄸",
ze: "󠄴"
},
Wt: {
_k: "󠅀",
ze: "󠅁",
Zt: "󠅂",
Ut: "󠅃",
Gt: "󠅄",
Vt: "󠅅",
Zn: "󠅆",
Yt: "󠅇"
},
Un: {
_k: "󠅁󠅂",
ze: "󠅃"
},
Jt: {
_k: "󠅁󠅃",
ze: "󠅄"
},
Re: {
_k: "󠅔",
ze: "󠅑",
Fe: "󠅢",
Oe: "󠅿",
je: "󠆛",
$e: "󠆸"
},
Ue: {
_k: "󠇍",
Ye: "󠇓",
ze: "󠇥",
qe: "󠇯",
nt: {
_k: "󠇮",
rt: "󠅬",
m: "󠅰",
Qe: "󠅝"
},
Xe: {
_k: "󠅎",
Je: "󠅋",
Qe: "󠄼"
}
},
ct: {
_k: "󠈀",
ze: "󠈁",
Lt: "󠈂",
dt: "󠈃",
Bt: "󠈄"
},
ut: {
_k: "󠈅",
ze: "󠈆",
ht: "󠈉"
},
Yn: {
_k: "󠄩",
ze: "󠄞",
qn: "󠄚"
},
Jn: {
_k: "󠄏",
ze: "󠄏󠄏"
},
Xn: {
_k: "󠄏󠄏󠄏",
ze: "󠄎"
},
Qn: {
_k: "󠄎󠄎",
ze: "󠄃",
er: "󠄃󠄃",
tr: "󠄃󠄄"
},
nr: {
_k: "󠅁󠅁",
ze: "󠅁"
},
rr: {
_k: "󠅉",
ar: "󠅊"
},
ir: {
_k: "a",
lr: "b",
sr: "c",
cr: "f",
dr: "g",
ur: "h",
mr: "i",
gr: "d",
hr: "j",
pr: "k",
br: "e",
vr: "l",
yr: "m",
kr: "n",
_r: "o",
wr: "p"
},
Cr: {
_k: "z",
Mr: "z1"
}
}, {
kt: {
ze: !0,
ht: !0,
En: !0,
Hn: !0,
zt: !0,
dt: !1
},
xt: {
ze: !0,
Tt: !1,
Ft: !0,
Pt: 50,
Ot: 50,
Rt: !0,
jt: 5,
$t: 50
},
Ct: {
ze: !1,
In: 75,
Kn: 40,
wt: !0
},
Wn: {
ze: !1,
Gn: 50
},
Vn: {
ze: !0
},
Wt: {
ze: !0,
Zt: 85,
Ut: 25,
Gt: !0,
Vt: 15,
Zn: !0,
Yt: 75
},
Un: {
ze: !0
},
Jt: {
ze: !0
},
Re: {
ze: !0,
Fe: 50,
$e: !0,
Oe: 50,
je: !0
},
Ue: {
Ye: !0,
ze: !0,
qe: !0,
Xe: {
Je: !0,
Qe: !0
},
nt: {
rt: !0,
m: !0,
Qe: !0
}
},
Jn: {
ze: !0
},
Yn: {
ze: !0,
qn: !0
},
Xn: {
ze: !0
},
Qn: {
ze: !0,
er: !1,
tr: 50
},
ct: {
ze: !0,
Lt: !1,
dt: !0,
Bt: 10
},
ut: {
ze: !1,
ht: !1
},
nr: {
ze: !0
},
rr: {
ar: 4
},
ir: {
lr: "ShiftRight",
sr: "KeyB",
cr: "Not Set",
dr: "Not Set",
ur: "Not Set",
mr: "Not Set",
gr: "KeyN",
hr: "Not Set",
pr: "ShiftLeft",
br: "KeyT",
vr: "Not Set",
yr: "Not Set",
kr: "Not Set",
Sr: "Not Set",
_r: "Not Set",
wr: "Not Set"
},
Cr: {
Mr: !1
}
});

let Ke, We, Ge = !1, Ve = !1;

const Ue = JSON.stringify;

let Ze = null;

const Ye = () => {
Ge = !0;
};

null === Ze && (Ze = setInterval(() => {
(() => {
if (!Ge || Ve) {
return;
}
Ve = !0;
const t = He._serialize(), r = Ue(t);
r !== We && ((e => {
const t = (e => {
let t = "";
for (let r = 0; e.length > r; r++) {
t += e.charCodeAt(r).toString(16).padStart(4, "0");
}
return t;
})("string" == typeof e ? e : (e ?? "") + "");
Oe.cookie = (e => `${Be}=${e}; path=/; max-age=259200`)(t);
})(e(r)), We = r), Ve = !1;
})();
}, 250));

let Je = {}, qe = !1;

const Qe = Symbol(), Xe = Symbol(), et = Symbol(), tt = new WeakMap, rt = new WeakMap, nt = new WeakMap, at = new WeakSet, ot = new WeakMap;

for (const e of Object.getOwnPropertyNames(Object)) {}

for (const e of Object.getOwnPropertyNames(Reflect)) {}

const it = e => new Proxy(e, {
get(e, t, r) {
if (t !== Symbol.toStringTag && "constructor" !== t) {
return Reflect.get(e, t, r);
}
},
has(e, t) {
return t !== Symbol.toStringTag && Reflect.has(e, t);
},
ownKeys(e) {
return Reflect.ownKeys(e).filter(e => e !== Symbol.toStringTag);
},
getOwnPropertyDescriptor(e, t) {
if (t !== Symbol.toStringTag) {
return Reflect.getOwnPropertyDescriptor(e, t);
}
}
});

n(Fe.Function.prototype, "toString", {
apply(e, t, r) {
try {
const n = (e => {
let t = e;
const r = new WeakSet;
let n = 0;
for (;(tt.has(t) || rt.has(t) || nt.has(t)) && 15 > n && !r.has(t); ) {
r.add(t), t = tt.get(t) || rt.get(t) || nt.get(t) || t, n++;
}
return t;
})(t);
return Reflect.apply(e, n || t, r);
} catch (n) {
return Reflect.apply(e, t, r);
}
}
}), n(Fe.Element.prototype, "attachShadow", {
apply(e, t, r) {
try {
return Reflect.apply(e, t, r);
} catch (n) {
return Reflect.apply(e, t, r);
}
}
}), n(Fe, "Proxy", {
construct(e, t) {
try {
return Reflect.construct(e, t);
} catch (r) {
return Reflect.construct(e, t);
}
}
});

const lt = EventTarget.prototype.addEventListener, st = EventTarget.prototype.removeEventListener, ct = it(lt), dt = it(st), ut = Array.from({
length: 12
}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(52 * Math.random())]).join(""), mt = Oe.fonts, ft = e => {
try {
return e && "object" == typeof e && e.family === ut;
} catch {
return !1;
}
}, ht = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(mt), "size");

ht && ht.get && (ht.get = new Proxy(ht.get, {
apply(e, t, r) {
try {
const n = Reflect.apply(e, t, r);
return Math.max(0, n - 5);
} catch {
return 0;
}
}
}), Object.defineProperty(Object.getPrototypeOf(mt), "size", ht)), n(mt, "values", {
apply(e, t, r) {
const n = Reflect.apply(e, t, r);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ft(e.value); ) {
e = n.next();
}
return e;
}
};
}
}), n(mt, "entries", {
apply(e, t, r) {
const n = Reflect.apply(e, t, r);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ft(e.value[0]); ) {
e = n.next();
}
return e;
}
};
}
}), n(mt, "keys", {
apply(e, t, r) {
const n = Reflect.apply(e, t, r);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ft(e.value); ) {
e = n.next();
}
return e;
}
};
}
}), n(mt, "forEach", {
apply(e, t, r) {
const [n, a] = r;
return Reflect.apply(e, t, [ (e, t, r) => {
ft(e) || n.call(a, e, t, r);
}, a ]);
}
}), n(mt, "has", {
apply(e, t, r) {
const [n] = r;
return !ft(n) && Reflect.apply(e, t, r);
}
}), n(mt, "delete", {
apply(e, t, r) {
const [n] = r;
return !ft(n) && Reflect.apply(e, t, r);
}
}), n(mt, "check", {
apply(e, t, r) {
const [n] = r;
return (!n || !n.includes(ut)) && Reflect.apply(e, t, r);
}
}), n(mt, Symbol.iterator, {
apply(e, t, r) {
const n = Reflect.apply(e, t, r);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ft(e.value); ) {
e = n.next();
}
return e;
}
};
}
});

const gt = {
capture: !0,
passive: !1
};

let pt = !1;

const bt = e => {
He.Xn.ze && e.code === He.ir.pr && "Not Set" !== He.ir.pr && (pt = !0);
}, vt = e => {
e.code === He.ir.pr && (pt = !1);
}, yt = e => {
if (pt && He.Xn.ze) {
try {
const t = Ie.game[Je.J][Je.ce];
let r = t[Je.be];
r += e.deltaY > 0 ? 20 : -30, r = Math.max(36, r), Object.defineProperty(t, Je.be, {
configurable: !0,
get: () => r,
set() {}
}), e.preventDefault(), e.stopImmediatePropagation();
} catch {}
}
}, xt = 4, kt = 13;

let wt;

n(Fe.Object, "keys", {
apply(e, t, r) {
return "bullet" == r[0]?.bullet_mp5?.type && "explosion" == r[0]?.explosion_frag?.type && "gun" == r[0]?.mp5?.type && "throwable" == r[0]?.frag?.type && (wt = r[0], 
Fe.Object.keys = e), Reflect.apply(e, t, r);
}
});

let _t = {
st: void 0,
Nr: void 0
}, Ct = !1, Mt = null, St = null, zt = null, Nt = 1;

const At = (e, t) => {
if (e?.container) {
try {
e.container.alpha = t;
} catch {}
}
}, Tt = () => {
try {
zt && ((e => {
if (e) {
try {
St ? (Object.defineProperty(e, "layer", St), !("value" in St) || St.get || St.set || (e.layer = Mt)) : null !== Mt && (e.layer = Mt);
} catch {
if (null !== Mt) {
try {
e.layer = Mt;
} catch {}
}
} finally {
St = null, Mt = null;
}
}
})(zt), At(zt, Nt));
} catch {}
Ct = !1, zt = null, Nt = 1;
}, Rt = e => {
if (e.code === He.ir.br && He.nr.ze && !Ct) {
try {
const e = Ie.game?.[Je.J];
if (!e || void 0 === e.layer || !e.container) {
return;
}
zt = e, Nt = e.container.alpha, ((e, t) => {
if (!e || void 0 === e.layer) {
return !1;
}
try {
if (St = Object.getOwnPropertyDescriptor(e, "layer"), Mt = e.layer, St) {
if (!St.configurable) {
return St = null, !1;
}
} else {
St = {
value: Mt,
writable: !0,
enumerable: !0,
configurable: !0
};
}
return Object.defineProperty(e, "layer", {
configurable: !0,
get() {
return t;
},
set() {}
}), !0;
} catch {
return St = null, Mt = null, !1;
}
})(e, 0 === e.layer ? 1 : 0) ? (Ct = !0, At(e, .5)) : zt = null;
} catch {
Tt();
}
}
}, $t = e => {
e.code === He.ir.br && Ct && Tt();
}, jt = (e, t) => ({
x: e,
y: t
}), Ft = e => ({
x: e.x,
y: e.y
}), Ot = (e, t) => ({
x: e.x + t.x,
y: e.y + t.y
}), Pt = (e, t) => ({
x: e.x - t.x,
y: e.y - t.y
}), Lt = (e, t) => ({
x: e.x * t,
y: e.y * t
}), Bt = (e, t) => e.x * t.x + e.y * t.y, Dt = e => Math.hypot(e.x, e.y), Et = e => e.x * e.x + e.y * e.y, It = (e, t = 1e-6) => {
const r = Math.hypot(e.x, e.y);
return r > t ? {
x: e.x / r,
y: e.y / r
} : {
x: 0,
y: 0
};
}, Ht = e => Math.max(0, Math.min(1, e)), Kt = e => 1 - (1 - e) ** 3, Wt = {
Ar(e, t, r, n) {
const a = Pt(t, e);
let o = 0, i = 1;
if (1e-9 > Math.abs(a.x)) {
if (r.x > e.x || e.x > n.x) {
return null;
}
} else {
const t = 1 / a.x;
let l = (r.x - e.x) * t, s = (n.x - e.x) * t;
if (l > s) {
const e = l;
l = s, s = e;
}
if (o = Math.max(o, l), i = Math.min(i, s), o > i) {
return null;
}
}
if (1e-9 > Math.abs(a.y)) {
if (r.y > e.y || e.y > n.y) {
return null;
}
} else {
const t = 1 / a.y;
let l = (r.y - e.y) * t, s = (n.y - e.y) * t;
if (l > s) {
const e = l;
l = s, s = e;
}
if (o = Math.max(o, l), i = Math.min(i, s), o > i) {
return null;
}
}
const l = 0 > o || o > 1 ? 0 > i || i > 1 ? null : i : o;
if (null === l) {
return null;
}
const s = Ot(e, Lt(a, l)), c = 1e-6;
if (c > Math.abs(s.x - r.x)) {
return {
point: s,
normal: {
x: -1,
y: 0
}
};
}
if (c > Math.abs(s.x - n.x)) {
return {
point: s,
normal: {
x: 1,
y: 0
}
};
}
if (c > Math.abs(s.y - r.y)) {
return {
point: s,
normal: {
x: 0,
y: -1
}
};
}
if (c > Math.abs(s.y - n.y)) {
return {
point: s,
normal: {
x: 0,
y: 1
}
};
}
const d = Lt(Ot(r, n), .5), u = Pt(s, d), m = Lt(Pt(n, r), .5), f = Math.abs(Math.abs(u.x) - m.x);
return Math.abs(Math.abs(u.y) - m.y) > f ? {
point: s,
normal: {
x: u.x > 0 ? 1 : -1,
y: 0
}
} : {
point: s,
normal: {
x: 0,
y: u.y > 0 ? 1 : -1
}
};
},
it(e, t, r, n) {
const a = Pt(t, e), o = Pt(e, r), i = Bt(a, a);
if (1e-12 > i) {
return n * n < Et(Pt(e, r)) ? null : {
point: e,
normal: It(Pt(e, r))
};
}
const l = 2 * Bt(o, a);
let s = l * l - 4 * i * (Bt(o, o) - n * n);
if (0 > s) {
return null;
}
s = Math.sqrt(s);
const c = (-l - s) / (2 * i), d = (-l + s) / (2 * i);
let u = null;
if (0 > c || c > 1 ? 0 > d || d > 1 || (u = d) : u = c, null === u) {
return null;
}
const m = Ot(e, Lt(a, u));
return {
point: m,
normal: It(Pt(m, r))
};
},
ot: (e, t, r) => e ? 1 === e.type ? Wt.Ar(t, r, e.min, e.max) : 0 === e.type ? Wt.it(t, r, e.pos, e.rad) : null : null
}, Gt = (e, t) => (1 & e) == (1 & t) || 2 & e && 2 & t;

class Vt {
constructor(e = "idle", t = null, r = null, n = !1) {
this.Be = e, this.Le = t, this.De = r, this.Ee = n;
}
}

const Ut = .001, Zt = Math.PI / 90, Yt = {
Pe: !1,
Be: "idle",
He: {
x: 0,
y: 0
},
Ie: null,
We: null,
Ke: null,
Tr: !1,
Ze: null,
Ge: null,
Ve: null,
zr: !1,
Rr: null
}, Jt = e => e ? {
x: e.x,
y: e.y
} : null, qt = (e, t) => !(!e && !t || e && t && Ut >= Math.abs(e.x - t.x) && Ut >= Math.abs(e.y - t.y)), Qt = e => e ? {
touchMoveActive: e.touchMoveActive,
touchMoveLen: e.touchMoveLen,
x: e.x,
y: e.y
} : null, Xt = () => ({
x: Fe.innerWidth / 2,
y: Fe.innerHeight / 2
}), er = (e, t) => Math.atan2(e.y - t.y, e.x - t.x), tr = (e, t) => {
return Math.abs(Math.atan2(Math.sin(r = t - e), Math.cos(r)));
var r;
}, rr = (e, t) => {
if (!e || !t) {
return 45;
}
const r = Xt(), n = er(e, r), a = er(t, r), o = tr(n, a), i = Math.hypot(t.x - e.x, t.y - e.y), l = Ht(o / Math.PI), s = Ht(i / 450);
return 45 + 360 * Math.max(l, s) * (He.kt.Gn / 100);
}, nr = e => {
e ? (Yt.Tr = !0, Yt.Ie = Jt(e), De.et = {
clientX: e.x,
clientY: e.y
}) : (Yt.Tr = !1, Yt.Ie = null, De.et = null);
}, ar = () => {
null !== Yt.Rr && (clearTimeout(Yt.Rr), Yt.Rr = null);
}, or = e => {
ar(), Yt.Rr = setTimeout(() => {
Yt.Rr = null, "idle" === Yt.Be && (Yt.Ke = null, nr(null));
}, Math.max(0, e));
}, ir = (e = performance.now()) => {
if (!Yt.Pe) {
return;
}
let t = null;
const r = Yt.Ke;
let n = !1;
if (r) {
const {startPos: a, targetPos: o, startTime: i, duration: l} = r, s = l > 0 ? Ht((e - i) / l) : 1, c = Kt(s);
let d = !1;
if (l > 0 && a && o) {
if (Math.hypot(o.x - a.x, o.y - a.y) > 6) {
d = !0;
} else {
const e = Xt();
d = tr(er(a, e), er(o, e)) > Zt;
}
}
d && .999 > s && "idle" !== Yt.Be && (n = !0), t = {
x: a.x + (o.x - a.x) * c,
y: a.y + (o.y - a.y) * c
}, .999 > s || (Yt.Ke = null, "idle" === Yt.Be ? t = null : (Yt.We = Jt(o), t = Jt(o)));
} else {
"idle" !== Yt.Be && Yt.We && (t = Jt(Yt.We));
}
Yt.zr = n, nr(t), (e => {
const t = Yt.Ve;
if (t) {
const {startDir: r, targetDir: n, startTime: a, duration: o} = t, i = o > 0 ? Ht((e - a) / o) : 1, l = Kt(i);
let s;
if (!r && n) {
s = {
touchMoveActive: !0,
touchMoveLen: n.touchMoveLen * l,
x: n.x * l,
y: n.y * l
};
} else if (r && n) {
s = {
touchMoveActive: !0,
touchMoveLen: r.touchMoveLen + (n.touchMoveLen - r.touchMoveLen) * l,
x: r.x + (n.x - r.x) * l,
y: r.y + (n.y - r.y) * l
};
} else if (r && !n) {
const e = 1 - l;
s = {
touchMoveActive: e > Ut,
touchMoveLen: r.touchMoveLen * e,
x: r.x * e,
y: r.y * e
};
} else {
s = null;
}
Yt.Ze = s, .999 > i || (Yt.Ve = null, Yt.Ze = n ? Qt(n) : null);
}
De.Dn = Yt.Ze?.touchMoveActive && Yt.Ze.touchMoveLen > Ut ? Qt(Yt.Ze) : null;
})(e), (() => {
if (!Yt.Tr || "idle" === Yt.Be) {
return;
}
const e = Ie?.game;
if (!e?.initialized) {
return;
}
const t = e[Je.J], r = t?.bodyContainer, n = Yt.Ie;
if (!r || !n) {
return;
}
const a = Xt();
r.rotation = Math.atan2(n.y - a.y, n.x - a.x) || 0;
})();
}, lr = () => {
if (Yt.Pe) {
return;
}
const e = Ie?.game, t = Ie?.pixi?._ticker;
if (!e || !t) {
return;
}
const r = e[Je.re], n = r?.mousePos;
if (!n) {
return void Fe.requestAnimationFrame(lr);
}
Yt.He = {
x: n._x ?? n.x ?? Fe.innerWidth / 2,
y: n._y ?? n.y ?? Fe.innerHeight / 2
};
const a = e => ({
configurable: !0,
get() {
return ((e, t) => {
if (!Yt.Tr) {
return t;
}
const r = Yt.Ie;
return r ? "x" === e ? r.x : r.y : t;
})(e, this["_" + e]);
},
set(t) {
this["_" + e] = t, ((e, t) => {
if (Yt.He = {
...Yt.He,
[e]: t
}, "idle" !== Yt.Be) {
return;
}
if (!Yt.Tr) {
return Yt.Ie = null, void (Yt.Ke = null);
}
const r = performance.now();
ir(r);
const n = Jt(Yt.He), a = Yt.Ie ?? n;
if (!qt(a, n)) {
return ar(), Yt.Ke = null, Yt.We = null, void nr(null);
}
const o = rr(a, n);
Yt.Ke = {
startPos: Jt(a),
targetPos: n,
startTime: r,
duration: o
}, or(o);
})(e, t);
}
});
Object.defineProperty(n, "x", a("x")), Object.defineProperty(n, "y", a("y")), t.add(() => ir()), 
Yt.Pe = !0;
};

let sr;

const cr = () => Jt(Yt.Ie), dr = {
jr: null,
Pe: !1
}, ur = (e, t, r) => ((e, t, r) => {
if (dr.jr) {
if (e && He.kt.Hn) {
const {x: n, y: a} = e;
dr.jr.style.left === n + "px" && dr.jr.style.top === a + "px" || (dr.jr.style.left = n + "px", 
dr.jr.style.top = a + "px"), t ? r ? (dr.jr.style.borderColor = "#ffb800", dr.jr.style.boxShadow = "0 0 16px rgba(255, 184, 0, 0.8),0 0 32px rgba(255, 184, 0, 0.4),inset 0 0 16px rgba(255, 184, 0, 0.3)") : (dr.jr.style.borderColor = "#f28482", 
dr.jr.style.boxShadow = "0 0 16px rgba(242, 132, 130, 0.8),0 0 32px rgba(242, 132, 130, 0.4),inset 0 0 16px rgba(242, 132, 130, 0.2)") : (dr.jr.style.borderColor = "rgba(255, 255, 255, 0.3)", 
dr.jr.style.boxShadow = "0 0 12px rgba(255, 255, 255, 0.15),0 0 24px rgba(255, 255, 255, 0.08),inset 0 0 12px rgba(255, 255, 255, 0.05)"), 
dr.jr.style.display = "block";
} else {
dr.jr.style.display = "none";
}
}
})(e, t, r), mr = () => {
dr.jr && (dr.jr.style.display = "none");
}, fr = (e, t, r) => r ? Ot(e, Lt(t, r.barrelLength ?? 0)) : e, hr = 8246758, gr = 15893634, pr = 13360629, br = 16762477, vr = 11776947, yr = 15893634, xr = 15893634, kr = 15893634, wr = {}, _r = e => 2 === e || 3 === e, Cr = e => _r(e.layer) ? e.layer : Ct && void 0 !== Mt ? Mt : e.layer, Mr = (e, t, r) => !(!_r(e) && !r) || e === t, Sr = (e, t) => (e[t] || (wr[t] && wr[t].parent && wr[t].parent.removeChild(wr[t]), 
e[t] = new _t.st, e.addChild(e[t])), e[t]), zr = (e, t, r, n) => {
const a = Ie.game, o = a?.[Je.U]?.[Je.Te];
if (!o) {
return r;
}
const i = Ct && void 0 !== Mt ? Mt : n, l = Ot(e, Lt(t, r));
let s = r;
const c = Object.values(o).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Gt(e.layer, i) || e?.type?.includes("decal")));
for (const t of c) {
if (!1 === t.collidable) {
continue;
}
const r = Wt.ot(t.collider, e, l);
if (r) {
const t = Dt(Pt(r.point, e));
s > t && t > 1e-4 && (s = t);
}
}
return s;
}, Nr = (e, t, r, n, a, o = 16758784, i = .1) => {
if (!r || !n) {
return;
}
const l = Ie.game, s = t === e, c = l[Je.W].spectating, d = l[Je.S].shotDetected || l[Je.ae].isBindDown(xt);
let u;
const m = s && !c ? cr() : null;
if (m) {
const e = l[Je.N][Je._e]({
x: t[Je.me].x,
y: t[Je.me].y
});
u = Math.atan2(e.y - m.y, e.x - m.x) - Math.PI;
} else if (!s || c || De.et && d) {
if (s && !c && De.et) {
const e = l[Je.N][Je._e]({
x: t[Je.me].x,
y: t[Je.me].y
});
u = Math.atan2(e.y - De.et.clientY, e.x - De.et.clientX) - Math.PI;
} else {
u = Math.atan2(t[Je.fe].x, t[Je.fe].y) - Math.PI / 2;
}
} else {
u = Math.atan2(l[Je.re].mousePos._y - Fe.innerHeight / 2, l[Je.re].mousePos._x - Fe.innerWidth / 2);
}
const f = jt(Math.cos(u), -Math.sin(u)), h = fr(t[Je.me], f, n), g = {
x: 16 * (h.x - e[Je.me].x),
y: 16 * (e[Je.me].y - h.y)
}, p = n.shotSpread * (Math.PI / 180), b = r.distance, v = Math.max(30, Math.ceil(2 * n.shotSpread));
let y = o, x = i;
s ? x = 2 * i : (y = 7107965, x = 1.8 * i), s && (a.beginFill(10265519, 1.5 * i), 
a.moveTo(g.x, g.y), a.arc(g.x, g.y, 16.25 * b, u - p / 2, u + p / 2), a.lineTo(g.x, g.y), 
a.endFill()), a.beginFill(y, x);
for (let r = 0; v > r; r++) {
const n = u - p / 2 + p * (r / (v - 1)), o = jt(Math.cos(n), -Math.sin(n)), i = zr(h, o, b, t.layer), l = Ot(h, Lt(o, i)), s = {
x: 16 * (l.x - e[Je.me].x),
y: 16 * (e[Je.me].y - l.y)
};
0 === r ? (a.moveTo(g.x, g.y), a.lineTo(s.x, s.y)) : a.lineTo(s.x, s.y);
}
a.lineTo(g.x, g.y), a.endFill();
}, Ar = [ "frag", "mirv", "martyr_nade" ];

let Tr = Date.now(), Rr = !1, $r = null;

const jr = () => {
Rr = !1, $r && ($r.destroy(), $r = null);
}, Fr = () => {
var e;
if ((() => {
const e = Ie.game;
if (!e?.initialized) {
return !1;
}
const t = e[Je.J];
return null != t?.[Je.ce]?.[Je.Ce] && null != t?.[Je.se]?.[Je.Se];
})()) {
if (3 === Ie.game[Je.J][Je.ce][Je.Ce]) {
try {
const t = Ie.game, r = t[Je.J], n = r[Je.se][Je.Se], a = (Date.now() - Tr) / 1e3, o = He.rr.ar || 4;
if (!(e => "cook" === e.throwableState)(r) || (e = n, !Ar.some(t => e.includes(t)))) {
return void jr();
}
if (a > o && (Rr = !1), !Rr) {
return void (() => {
jr();
const e = He.rr.ar || 4;
$r = new Ie.game[Je.W][Je.de].constructor, Ie.pixi.stage.addChild($r.container), 
$r.start("Grenade", 0, e), Rr = !0, Tr = Date.now();
})();
}
$r.update(a - $r.elapsed, t[Je.N]);
} catch {}
} else {
jr();
}
}
};

let Or, Pr = !1;

const Lr = () => {
Or = He.Vn.ze;
}, Br = e => {
0 === e.button && Lr();
}, Dr = e => {
0 === e.button && (Or = !1);
}, Er = [ "crate_01", "crate_02", "crate_03", "crate_04", "crate_05", "crate_06", "crate_07", "crate_08", "crate_09", "crate_10", "crate_11", "crate_12", "crate_13", "crate_14", "crate_15", "crate_16", "crate_18", "crate_19", "crate_20", "crate_21", "crate_22", "crate_01x", "crate_02d", "crate_02f", "crate_02sv", "crate_02x", "crate_03x", "crate_07b", "crate_07sv", "crate_09bh", "crate_10sv", "crate_11de", "crate_11h", "crate_11sv", "crate_11tr", "crate_14a", "crate_21b", "crate_22d", "class_crate_common_assault", "class_crate_common_demo", "class_crate_common_healer", "class_crate_common_scout", "class_crate_common_sniper", "class_crate_common_tank", "class_crate_rare_assault", "class_crate_rare_demo", "class_crate_rare_healer", "class_crate_rare_scout", "class_crate_rare_sniper", "class_crate_rare_tank", "class_crate_mythic", "mil_crate_01", "mil_crate_02", "mil_crate_03", "mil_crate_04", "mil_crate_05", "chest_01", "chest_02", "chest_03", "chest_04", "case_01", "case_02", "case_03", "case_04", "case_05", "case_06", "case_07", "barrel_02", "barrel_03", "barrel_04", "barrel_05", "locker_01", "locker_02", "locker_03", "gun_mount_01", "gun_mount_02", "gun_mount_03", "gun_mount_04", "gun_mount_05", "gun_mount_06", "vending_01", "vending", "bookshelf_01", "bookshelf_02", "tree_02", "tree_02h", "tree_03", "tree_03x", "tree_03sv", "tree_03d", "tree_03f", "tree_03w", "tree_03h", "tree_03sp", "tree_03su", "tree_03cb", "tree_03bh", "stone_04", "stone_04x", "stone_05", "toilet_", "crate_", "chest_", "case_", "locker", "deposit", "drawers", "toilet", "gun_mount_01", "gun_mount_02", "gun_mount_03", "gun_mount_04", "gun_mount_05", "planter", "rack", "stand", "book", "vending", "bookshelf", "towelrack_01", "pot", "potato", "egg", "pumpkin" ];

let Ir = null, Hr = !1, Kr = -1 / 0;

const Wr = [ "bollard_", "sandbags_", "hedgehog", "silo_", "metal_wall_", "brick_wall_", "concrete_wall_", "container_wall_", "warehouse_wall_" ], Gr = {
gt: null,
ft: null
}, Vr = e => 2 === e || 3 === e, Ur = (e, t, r) => !(!Vr(e) && !r) || e === t, Zr = {
St: 0,
Mt: 0
}, Yr = e => 2 === e || 3 === e, Jr = {
Et: null,
bt: {},
Ht: null,
Nt: null,
At: 0,
vt: {},
yt: {},
It: [],
_t: null,
Kt: !1,
lastAim: {
x: 0,
y: 0
},
lastUpdateTime: Date.now()
}, qr = .8, Qr = .12, Xr = e => Yr(e.layer) ? e.layer : Ct && void 0 !== Mt ? Mt : e.layer, en = (e, t, r) => !(!Yr(e) && !r) || e === t, tn = [ "metal_wall_", "brick_wall_", "concrete_wall_", "stone_wall_", "container_wall_", "_wall_int_", "bank_wall_", "barn_wall_", "cabin_wall_", "hut_wall_", "house_wall_", "mansion_wall_", "police_wall_", "shack_wall_", "outhouse_wall_", "teahouse_wall_", "warehouse_wall_", "silo_", "bollard_", "sandbags_", "hedgehog", "tree_", "stone_01", "stone_02", "stone_03", "stone_04", "stone_05", "stone_06", "stone_07", "stone_08", "stone_09", "stone_0", "crate_" ], rn = [ "bush_", "brush_", "barrel_", "refrigerator_", "control_panel_", "chest_", "case_", "oven_", "bed_", "bookshelf_", "couch_", "table_", "drawers_", "window", "glass_wall_", "locker_", "deposit_box_", "toilet_", "pot_", "planter_", "pumpkin_", "potato_", "egg_", "woodpile_", "decal" ], nn = e => {
if (!1 === e.collidable) {
return !1;
}
const t = e.type || "";
if (!0 === e.isWall) {
return !0;
}
if (!1 === e.destructible) {
return !0;
}
for (const e of tn) {
if (t.includes(e)) {
return !0;
}
}
for (const e of rn) {
if (t.includes(e)) {
return !1;
}
}
return void 0 !== e.health && e.health > 200;
}, an = (e, t, r, n) => {
if (!He.kt.zt) {
return !0;
}
if (!r || !n) {
return !0;
}
const a = Ie.game, o = a?.[Je.U]?.[Je.Te];
if (!o) {
return !0;
}
const i = Ct && void 0 !== Mt ? Mt : e.layer, l = e[Je.he], s = t[Je.he], c = s.x - l.x, d = s.y - l.y, u = Math.atan2(d, c), m = Math.hypot(c, d);
let f = 3;
f = 30 > m ? 6 : 60 > m ? 5 : 100 > m ? 4 : 150 > m ? 3 : 2, (r?.shotSpread || 0) * (Math.PI / 180) > .2 && (f = Math.min(8, f + 2));
const h = Object.values(o).filter(e => !(!e.collider || e.dead || void 0 !== e.layer && !Gt(e.layer, i))).filter(nn);
if (0 === h.length) {
return !0;
}
let g = 0;
for (let e = 0; f > e; e++) {
const t = u - (r.shotSpread || 0) * (Math.PI / 180) / 2 + (r.shotSpread || 0) * (Math.PI / 180) * (1 === f ? .5 : e / (f - 1)), n = jt(Math.cos(t), Math.sin(t)), a = Ot(l, Lt(n, m));
let o = !1;
for (const e of h) {
const t = Wt.ot(e.collider, l, a);
if (t && m - .3 > Dt(Pt(t.point, l))) {
o = !0;
break;
}
}
o || g++;
}
return g >= f * (50 > m ? .8 : .5);
};

Reflect.apply(ct, Fe, [ "keydown", e => {
if (e.code === He.ir.gr) {
return Jr.Et ? (Jr.Et = null, void s(new Vt("idle", null, null, !0))) : void (He.kt.En && (Jr.Et = Jr.Ht));
}
} ]);

let on = !1, ln = !1, sn = 0, cn = 0, dn = 0, un = 0, mn = null, fn = null, hn = null;

const gn = "surt-blur-start-overlay";

let pn = null;

const bn = () => {
if (Oe) {
try {
Oe.querySelectorAll('.GoogleCreativeContainerClass,[id^="gcc_"],iframe[src*="doubleclick"],iframe[src*="2mdn"],iframe[src*="googleads"],iframe[src*="googlesyndication"],iframe[src*="adservice"],.adsbygoogle,.ad-container,[class*="ad-container"],[id*="ad-container"]').forEach(e => {
try {
e.remove();
} catch {}
});
} catch {}
}
}, vn = () => {
if (pn) {
try {
pn.disconnect(), pn = null;
} catch {}
}
}, yn = {
container_06: 14074643,
barn_01: 6959775,
stone_02: 1646367,
tree_03: 16777215,
tree_03sp: 255,
stone_04: 15406938,
stone_05: 15406938,
crate_03: 5342557,
bunker_storm_01: 6959775,
bunker_hydra_01: 10030546,
bunker_crossing_stairs_01b: 13571226,
bunker_crossing_stairs_01: 13571226
}, xn = {
container_06: 1,
stone_02: 6,
tree_03: 8,
tree_03sp: 8,
barn_01: 1,
stone_04: 6,
stone_05: 6,
crate_03: 1.8,
bunker_storm_01: 1.75,
bunker_hydra_01: 1.75,
bunker_crossing_stairs_01b: 2,
bunker_crossing_stairs_01: 2
}, kn = [ 11, 12 ], wn = [ {
$r: "",
Fr: null,
Or: -1 / 0,
Pr: ""
}, {
$r: "",
Fr: null,
Or: -1 / 0,
Pr: ""
}, {
$r: "",
Fr: null,
Pr: "",
Or: -1 / 0
}, {
$r: "",
Fr: null,
Pr: "",
Or: -1 / 0
} ], _n = e => Ee.lt.push(e), Cn = e => {
try {
const t = wt[e];
return ("single" === t.fireMode || "burst" === t.fireMode) && t.fireDelay >= .35;
} catch {
return !1;
}
}, Mn = e => {
_n(kn[e]);
}, Sn = () => {
var e, t;
if (Ie.game?.[Je.M] && null != Ie.game?.[Je.J]?.[Je.ce]?.[Je.Ce] && Ie.game?.initialized && He.Qn.ze) {
try {
const r = Ie.game[Je.J][Je.ce], n = r[Je.Ce], a = r[Je.Me], o = a[n], i = wn[n], l = Date.now() - i.Or;
if (He.Qn.tr > l) {
return;
}
if (o.ammo === i.Fr) {
return;
}
const s = 0 === n ? 1 : 0, c = a[s];
Cn(o.type) && o.type === i.Pr && (i.Fr > o.ammo || 0 === i.Fr && o.ammo > i.Fr && (Ie.game[Je.S].shotDetected || Ie.game[Je.ae].isBindDown(xt))) && (i.Or = Date.now(), 
Cn(c.type) && c.ammo && !He.Qn.er ? Mn(s) : "" !== c.type ? (t = n, Mn(s), Mn(t)) : (e = n, 
_n(kt), Mn(e))), i.Fr = o.ammo, i.Pr = o.type;
} catch {}
}
};

var zn, Nn, An, Tn, Rn, $n, jn, Fn, On, Pn, Ln, Bn = {}, Dn = [], En = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, In = Array.isArray;

zn = Dn.slice, Nn = {
rn(e, t, r, n) {
for (var a, o, i; t = t.tn; ) {
if ((a = t.an) && !a.tn) {
try {
if ((o = a.constructor) && null != o.Br && (a.Fn(o.Br(e)), i = a.un), null != a.Lr && (a.Lr(e, n || {}), 
i = a.un), i) {
return a.pn = a;
}
} catch (t) {
e = t;
}
}
}
throw e;
}
}, An = 0, D.prototype.Fn = function(e, t) {
var r;
r = null != this.vn && this.vn != this.state ? this.vn : this.vn = F({}, this.state), 
"function" == typeof e && (e = e(F({}, r), this.Qt)), e && F(r, e), null != e && this.ln && (t && this._sb.push(t), 
H(this));
}, D.prototype.Dr = function(e) {
this.ln && (this.rn = !0, e && this.bn.push(e), H(this));
}, D.prototype.render = B, Tn = [], $n = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
jn = (e, t) => e.ln.nn - t.ln.nn, K.mn = 0, Fn = /(PointerCapture)$|Capture$/i, 
On = 0, Pn = J(!1), Ln = J(!0);

var Hn, Kn, Wn, Gn, Vn = 0, Un = [], Zn = Nn, Yn = Zn.nn, Jn = Zn.mn, qn = Zn.An, Qn = Zn.an, Xn = Zn.unmount, ea = Zn.tn;

Zn.nn = e => {
Kn = null, Yn && Yn(e);
}, Zn.tn = (e, t) => {
e && t.en && t.en.Tn && (e.Tn = t.en.Tn), ea && ea(e, t);
}, Zn.mn = e => {
Jn && Jn(e), Hn = 0;
var t = (Kn = e.an).jn;
t && (Wn === Kn ? (t.bn = [], Kn.bn = [], t.tn.forEach(e => {
e.$n && (e.tn = e.$n), e.u = e.$n = void 0;
})) : (t.bn.forEach(he), t.bn.forEach(ge), t.bn = [], Hn = 0)), Wn = Kn;
}, Zn.An = e => {
qn && qn(e);
var t = e.an;
t && t.jn && (t.jn.bn.length && (1 !== Un.push(t) && Gn === Zn.requestAnimationFrame || ((Gn = Zn.requestAnimationFrame) || fe)(me)), 
t.jn.tn.forEach(e => {
e.u && (e.jn = e.u), e.u = void 0;
})), Wn = Kn = null;
}, Zn.an = (e, t) => {
t.some(e => {
try {
e.bn.forEach(he), e.bn = e.bn.filter(e => !e.tn || ge(e));
} catch (r) {
t.some(e => {
e.bn && (e.bn = []);
}), t = [], Zn.rn(r, e.ln);
}
}), Qn && Qn(e, t);
}, Zn.unmount = e => {
Xn && Xn(e);
var t, r = e.an;
r && r.jn && (r.jn.tn.forEach(e => {
try {
he(e);
} catch (e) {
t = e;
}
}), r.jn = void 0, t && Zn.rn(t, r.ln));
};

var ta = "function" == typeof requestAnimationFrame;

(ye.prototype = new D).Er = !0, ye.prototype.wn = function(e, t) {
return ve(this.Qt, e) || ve(this.state, t);
};

var ra = Nn.nn;

Nn.nn = e => {
e.type && e.type.On && e.ref && (e.Qt.ref = e.ref, e.ref = null), ra && ra(e);
};

var na = Nn.rn;

Nn.rn = (e, t, r, n) => {
if (e.then) {
for (var a, o = t; o = o.tn; ) {
if ((a = o.an) && a.an) {
return null == t.rn && (t.rn = r.rn, t.en = r.en), a.an(e, t);
}
}
}
na(e, t, r, n);
};

var aa = Nn.unmount;

Nn.unmount = e => {
var t = e.an;
t && t.Hr && t.Hr(), t && 32 & e.cn && (e.type = null), aa && aa(e);
}, (we.prototype = new D).an = function(e, t) {
var r = t.an, n = this;
null == n.o && (n.o = []), n.o.push(r);
var a = _e(n.ln), o = !1, i = () => {
o || (o = !0, r.Hr = null, a ? a(l) : l());
};
r.Hr = i;
var l = () => {
if (! --n.cn) {
if (n.state.Pn) {
var e = n.state.Pn;
n.ln.en[0] = ke(e, e.an.hn, e.an.Ir);
}
var t;
for (n.Fn({
Pn: n.nn = null
}); t = n.o.pop(); ) {
t.Dr();
}
}
};
n.cn++ || 32 & t.cn || n.Fn({
Pn: n.nn = n.ln.en[0]
}), e.then(i, i);
}, we.prototype.Rn = function() {
this.o = [];
}, we.prototype.render = function(e, t) {
if (this.nn) {
if (this.ln.en) {
var r = document.createElement("div"), n = this.ln.en[0].an;
this.ln.en[0] = xe(this.nn, r, n.Ir = n.hn);
}
this.nn = null;
}
var a = t.Pn && P(B, null, e.fallback);
return a && (a.cn &= -33), [ P(B, null, t.Pn ? null : e.children), a ];
};

var oa = (e, t, r) => {
if (++r[1] === r[0] && e.l.delete(t), e.Qt.Kr && ("t" !== e.Qt.Kr[0] || !e.l.size)) {
for (r = e.i; r; ) {
for (;r.length > 3; ) {
r.pop()();
}
if (r[0] > r[1]) {
break;
}
e.i = r = r[2];
}
}
};

(Ce.prototype = new D).Pn = function(e) {
var t = this, r = _e(t.ln), n = t.l.get(e);
return n[0]++, a => {
var o = () => {
t.Qt.Kr ? (n.push(a), oa(t, e, n)) : a();
};
r ? r(o) : o();
};
}, Ce.prototype.render = function(e) {
this.i = null, this.l = new Map;
var t = V(e.children);
e.Kr && "b" === e.Kr[0] && t.reverse();
for (var r = t.length; r--; ) {
this.l.set(t[r], this.i = [ 1, 0, this.i ]);
}
return e.children;
}, Ce.prototype.Mn = Ce.prototype.xn = function() {
var e = this;
this.l.forEach((t, r) => {
oa(e, r, t);
});
};

var ia = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, la = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, sa = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ca = /[A-Z0-9]/g, da = "undefined" != typeof document, ua = e => ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);

D.prototype.Wr = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach(function(e) {
Object.defineProperty(D.prototype, e, {
configurable: !0,
get() {
return this["UNSAFE_" + e];
},
set(t) {
Object.defineProperty(this, e, {
configurable: !0,
writable: !0,
value: t
});
}
});
});

var ma = Nn.event;

Nn.event = e => (ma && (e = ma(e)), e.persist = Me, e.Gr = Se, e.Vr = ze, e.Zr = e);

var fa = {
enumerable: !1,
configurable: !0,
get() {
return this.class;
}
}, ha = Nn.dn;

Nn.dn = e => {
"string" == typeof e.type && (e => {
var t = e.Qt, r = e.type, n = {}, a = -1 === r.indexOf("-");
for (var o in t) {
var i = t[o];
if (!("value" === o && "defaultValue" in t && null == i || da && "children" === o && "noscript" === r || "class" === o || "className" === o)) {
var l = o.toLowerCase();
"defaultValue" === o && "value" in t && null == t.value ? o = "value" : "download" === o && !0 === i ? i = "" : "translate" === l && "no" === i ? i = !1 : "o" === l[0] && "n" === l[1] ? "ondoubleclick" === l ? o = "ondblclick" : "onchange" !== l || "input" !== r && "textarea" !== r || ua(t.type) ? "onfocus" === l ? o = "onfocusin" : "onblur" === l ? o = "onfocusout" : sa.test(o) && (o = l) : l = o = "oninput" : a && la.test(o) ? o = o.replace(ca, "-$&").toLowerCase() : null === i && (i = void 0), 
"oninput" === l && n[o = l] && (o = "oninputCapture"), n[o] = i;
}
}
"select" == r && n.multiple && Array.isArray(n.value) && (n.value = V(t.children).forEach(e => {
e.Qt.selected = -1 != n.value.indexOf(e.Qt.value);
})), "select" == r && null != n.defaultValue && (n.value = V(t.children).forEach(e => {
e.Qt.selected = n.multiple ? -1 != n.defaultValue.indexOf(e.Qt.value) : n.defaultValue == e.Qt.value;
})), t.class && !t.className ? (n.class = t.class, Object.defineProperty(n, "className", fa)) : (t.className && !t.class || t.class && t.className) && (n.class = n.className = t.className), 
e.Qt = n;
})(e), e.$$typeof = ia, ha && ha(e);
};

var ga = Nn.mn;

Nn.mn = e => {
ga && ga(e);
};

var pa = Nn.An;

Nn.An = e => {
pa && pa(e);
var t = e.Qt, r = e.rn;
null != r && "textarea" === e.type && "value" in t && t.value !== r.value && (r.value = t.value ?? "");
};

var ba = B, va = {
createRoot: Ne,
hydrateRoot: (e, t) => (((e, t) => {
oe(e, t);
})(t, e), Ne(e)
/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */)
};

const ya = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), xa = e => {
const t = (e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => r ? r.toUpperCase() : t.toLowerCase()))(e);
return t.charAt(0).toUpperCase() + t.slice(1);
}, ka = (...e) => e.filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t).join(" ").trim();

/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var wa = {
xmlns: "http://www.w3.org/2000/svg",
width: 24,
height: 24,
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
"stroke-width": "2",
"stroke-linecap": "round",
"stroke-linejoin": "round"
};

/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _a = ({color: e = "currentColor", size: t = 24, strokeWidth: r = 2, absoluteStrokeWidth: n, children: a, iconNode: o, class: i = "", ...l}) => P("svg", {
...wa,
width: t + "",
height: t,
stroke: e,
"stroke-width": n ? 24 * +r / +t : r,
class: [ "lucide", i ].join(" "),
...l
}, [ ...o.map(([e, t]) => P(e, t)), ...V(a) ]), Ca = (e, t) => {
const r = ({class: r = "", children: n, ...a}) => P(_a, {
...a,
iconNode: t,
class: ka("lucide-" + ya(xa(e)), "lucide-" + ya(e), r)
}, n);
return r.displayName = xa(e), r;
}, Ma = Ca("circle-question-mark", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "path", {
d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
key: "1u773s"
} ], [ "path", {
d: "M12 17h.01",
key: "p32p05"
} ] ]), Sa = Ca("crosshair", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "line", {
x1: "22",
x2: "18",
y1: "12",
y2: "12",
key: "l9bcsi"
} ], [ "line", {
x1: "6",
x2: "2",
y1: "12",
y2: "12",
key: "13hhkx"
} ], [ "line", {
x1: "12",
x2: "12",
y1: "6",
y2: "2",
key: "10w3f3"
} ], [ "line", {
x1: "12",
x2: "12",
y1: "22",
y2: "18",
key: "15g9kq"
} ] ]), za = Ca("database", [ [ "ellipse", {
cx: "12",
cy: "5",
rx: "9",
ry: "3",
key: "msslwz"
} ], [ "path", {
d: "M3 5V19A9 3 0 0 0 21 19V5",
key: "1wlel7"
} ], [ "path", {
d: "M3 12A9 3 0 0 0 21 12",
key: "mv7ke4"
} ] ]), Na = Ca("eye", [ [ "path", {
d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
key: "1nclc0"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), Aa = Ca("globe", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "path", {
d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
key: "13o1zl"
} ], [ "path", {
d: "M2 12h20",
key: "9i4pu4"
} ] ]), Ta = Ca("palette", [ [ "path", {
d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
key: "e79jfc"
} ], [ "circle", {
cx: "13.5",
cy: "6.5",
r: ".5",
fill: "currentColor",
key: "1okk4w"
} ], [ "circle", {
cx: "17.5",
cy: "10.5",
r: ".5",
fill: "currentColor",
key: "f64h9f"
} ], [ "circle", {
cx: "6.5",
cy: "12.5",
r: ".5",
fill: "currentColor",
key: "qy21gx"
} ], [ "circle", {
cx: "8.5",
cy: "7.5",
r: ".5",
fill: "currentColor",
key: "fotxhn"
} ] ]), Ra = Ca("pen-line", [ [ "path", {
d: "M13 21h8",
key: "1jsn5i"
} ], [ "path", {
d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
key: "1a8usu"
} ] ]), $a = Ca("rotate-ccw", [ [ "path", {
d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
key: "1357e3"
} ], [ "path", {
d: "M3 3v5h5",
key: "1xhq8a"
} ] ]), ja = Ca("settings", [ [ "path", {
d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
key: "1i5ecw"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), Fa = Ca("target", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "6",
key: "1vlfrh"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "2",
key: "1c9p78"
} ] ]), Oa = Ca("upload", [ [ "path", {
d: "M12 3v12",
key: "1x0j5s"
} ], [ "path", {
d: "m17 8-5-5-5 5",
key: "7q97r8"
} ], [ "path", {
d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
key: "ih7n3h"
} ] ]), Pa = Ca("users", [ [ "path", {
d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
key: "1yyitq"
} ], [ "path", {
d: "M16 3.128a4 4 0 0 1 0 7.744",
key: "16gr8j"
} ], [ "path", {
d: "M22 21v-2a4 4 0 0 0-3-3.87",
key: "kshegd"
} ], [ "circle", {
cx: "9",
cy: "7",
r: "4",
key: "nufk8"
} ] ]);

/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var La = 0;

const Ba = ({activeTab: e, onTabChange: t}) => Ae("div", {
className: "sidebar",
children: Ae("div", {
className: "sidebar-menu",
children: [ {
id: "main",
label: "Search",
icon: Sa
}, {
id: "combat",
label: "Combat",
icon: Fa
}, {
id: "visuals",
label: "Visuals",
icon: Na
}, {
id: "misc",
label: "Misc",
icon: ja
}, {
id: "themes",
label: "Themes",
icon: Ta
}, {
id: "help",
label: "Help",
icon: Ma
} ].map(r => Ae("button", {
className: "sidebar-item " + (e === r.id ? "active" : ""),
"data-category": r.id,
onClick: () => t(r.id),
children: [ Ae(r.icon, {
className: "sidebar-icon"
}), Ae("span", {
className: "sidebar-label",
children: r.label
}) ]
}, r.id))
})
}), Da = ({id: e, label: t, checked: r, onChange: n, style: a = {}, warning: o = !1}) => Ae("div", {
className: "checkbox-item",
style: a,
onClick(e) {
"checkbox" !== e.target.type && n(!r);
},
children: [ Ae("input", {
type: "checkbox",
id: e,
checked: r,
onChange(e) {
e.stopPropagation(), n(e.target.checked);
},
className: "checkbox " + (r ? "checkbox-checked" : "")
}), Ae("label", {
htmlFor: e,
className: "checkbox-item-label",
onClick: e => e.stopPropagation(),
children: t
}), o && Ae("span", {
className: "risky-label",
style: {
marginLeft: "0.5rem"
},
children: "RISKY!!!"
}) ]
}), Ea = e => {
const t = e.checked;
return Ae(Da, {
...e,
warning: e.shouldWarning?.(t) ?? !1
});
}, Ia = ({id: e, label: t, value: r, min: n = 0, max: a = 100, warning: o = !1, onChange: i}) => {
const [l, s] = le(!1), c = ce(null), d = (r - n) / (a - n) * 100, u = {
background: `linear-gradient(to right, var(--md-primary) 0%, var(--md-primary) ${d}%, #333 ${d}%, #333 100%)`
}, m = e => {
e.stopPropagation(), i(parseInt(e.target.value));
}, f = e => {
e.stopPropagation();
}, h = ue(() => s(!0), []), g = ue(() => s(!1), []), p = ue(e => {
e.stopPropagation(), h();
}, [ h ]), b = ue(e => {
e.stopPropagation(), h();
}, [ h ]), v = ue(e => {
e && e.stopPropagation(), g();
}, [ g ]), y = ue(e => {
e && e.stopPropagation(), g();
}, [ g ]);
return Ae("div", {
className: "checkbox-item slider-container",
onClick: f,
children: [ Ae("label", {
htmlFor: e,
style: {
color: "#ddd",
fontSize: "0.8125rem",
cursor: "default",
pointerEvents: "none"
},
children: [ t, ": ", Ae("span", {
style: {
color: "var(--md-primary)",
fontWeight: "bold"
},
children: r
}) ]
}), Ae("input", {
ref: c,
type: "range",
className: "slider " + (l ? "slider-dragging" : ""),
id: e,
min: n,
max: a,
value: r,
onChange: m,
onInput: m,
onClick: f,
onMouseDown: p,
onMouseUp: v,
onMouseLeave: v,
onTouchStart: b,
onTouchEnd: y,
onTouchCancel: y,
style: u
}), o && Ae("span", {
className: "risky-label",
style: {
marginLeft: "0.5rem"
},
children: "RISKY!!!"
}) ]
});
}, Ha = {
Ur: Ma,
Yr: Pa,
qr: Aa,
Jr: za,
Xr: e => Ae("svg", {
xmlns: "http://www.w3.org/2000/svg",
viewBox: "0 0 24 24",
fill: "currentColor",
...e,
children: Ae("path", {
d: "M20.317 4.4917C18.7873 3.8008 17.147 3.2918 15.4319 3C15.4007 2.9952 15.3695 3.0096 15.3534 3.0384C15.1424 3.4077 14.9087 3.8948 14.7451 4.2875C12.9004 4.0141 11.0652 4.0141 9.25832 4.2875C9.09465 3.8862 8.85248 3.4077 8.64057 3.0384C8.62449 3.0105 8.59328 2.9961 8.56205 3C6.84791 3.2909 5.20756 3.7999 3.67693 4.4917C3.66368 4.4973 3.65233 4.5065 3.64479 4.5185C0.533392 9.2227 -0.31895 13.8151 0.0991801 18.3525C0.101072 18.3736 0.11337 18.3938 0.130398 18.4075C2.18321 19.9061 4.17171 20.8159 6.12328 21.4179C6.15451 21.4275 6.18761 21.4161 6.20748 21.3899C6.66913 20.7693 7.08064 20.1152 7.43348 19.4271C7.4543 19.3873 7.43442 19.3402 7.39186 19.3245C6.73913 19.0763 6.1176 18.7745 5.51973 18.4321C5.47244 18.4046 5.46865 18.3366 5.51216 18.3043C5.63797 18.2104 5.76382 18.1128 5.88396 18.0142C5.90569 17.9961 5.93598 17.9923 5.96153 18.0038C9.88928 19.789 14.1415 19.789 18.023 18.0038C18.0485 17.9914 18.0788 17.9952 18.1015 18.0133C18.2216 18.1118 18.3475 18.2104 18.4742 18.3043C18.5177 18.3366 18.5149 18.4046 18.4676 18.4321C17.8697 18.7812 17.2482 19.0763 16.5945 19.3236C16.552 19.3393 16.533 19.3873 16.5538 19.4271C16.9143 20.1143 17.3258 20.7684 17.7789 21.3889C17.7978 21.4161 17.8319 21.4275 17.8631 21.4179C19.8241 20.8159 21.8126 19.9061 23.8654 18.4075C23.8834 18.3938 23.8948 18.3745 23.8967 18.3534C24.3971 13.1418 23.0585 8.5868 20.3482 4.5194C20.3416 4.5065 20.3303 4.4973 20.317 4.4917ZM8.02002 15.5869C6.8375 15.5869 5.86313 14.515 5.86313 13.1932C5.86313 11.8714 6.8186 10.7995 8.02002 10.7995C9.23087 10.7995 10.1958 11.8809 10.1769 13.1932C10.1769 14.515 9.22141 15.5869 8.02002 15.5869ZM15.9947 15.5869C14.8123 15.5869 13.8379 14.515 13.8379 13.1932C13.8379 11.8714 14.7933 10.7995 15.9947 10.7995C17.2056 10.7995 18.1705 11.8809 18.1516 13.1932C18.1516 14.515 17.2056 15.5869 15.9947 15.5869Z"
})
}),
Qr: e => Ae(Ra, {
...e,
strokeWidth: "2.5"
})
}, Ka = ({keybind: e, mode: t = "single", style: r = {}, onClick: n, editable: a = !1}) => {
const [o, i] = le(!1);
if ("multiple" === t && Array.isArray(e)) {
return Ae("div", {
className: "keybind-slot-container",
style: r,
children: e.map((t, r) => Ae(ba, {
children: [ Ae("div", {
className: "keybind-slot",
children: t
}), e.length - 1 > r && Ae("span", {
className: "keybind-slot-separator",
children: "+"
}) ]
}, r))
});
}
const l = o ? "..." : (e => {
const t = {
ShiftRight: "Right Shift",
ShiftLeft: "Left Shift",
ControlRight: "Right Ctrl",
ControlLeft: "Left Ctrl",
AltRight: "Right Alt",
AltLeft: "Left Alt",
Space: "Space",
Enter: "Enter",
Escape: "Escape"
};
return t[e] ? t[e] : e.startsWith("Key") ? e.slice(3) : e.startsWith("Digit") ? e.slice(5) : e;
})(e);
return Ae("div", {
className: `keybind-slot ${a ? "keybind-slot-editable" : ""} ${o ? "keybind-slot-waiting" : ""}`,
style: r,
onClick(e) {
if (!a || !n) {
return;
}
e.stopPropagation(), i(!0);
const t = e => {
e.preventDefault(), e.stopPropagation();
let r = e.code;
"Delete" !== e.code && "Escape" !== e.code || (r = "Not Set"), n(r), i(!1), Reflect.apply(dt, Fe, [ "keydown", t, !0 ]);
};
Reflect.apply(ct, Fe, [ "keydown", t, !0 ]);
},
children: [ l, a && !o && Ae(Ha.Qr, {
className: "keybind-pen-icon"
}) ]
});
}, Wa = ({title: e, category: t, description: r, enabled: n, onToggle: a, keybind: o, onKeybindChange: i, className: l = ""}) => Ae("div", {
className: `feature-card ${n ? "enabled" : "disabled"} ${l}`,
onClick: () => a && a(),
children: [ Ae("div", {
className: "feature-card-body",
children: [ Ae("div", {
className: "feature-card-title",
children: [ Ae("div", {
className: "feature-title-text",
children: e
}), o && Ae(Ka, {
keybind: o,
editable: !0,
onClick: e => i && i(e)
}), Ae("div", {
className: "feature-category",
children: t
}) ]
}), Ae("div", {
className: "feature-desc",
children: r
}) ]
}), Ae("div", {
className: "feature-card-toggle",
onClick(e) {
e.stopPropagation(), a && a();
},
children: Ae("div", {
className: "toggle " + (n ? "on" : "off")
})
}) ]
}), Ga = ({ea: e, ta: t, searchQuery: r = ""}) => {
const [n, a] = le(null), o = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock", "bulletdodge" ], i = [ {
id: "aimbot",
title: "Aimbot",
category: "Combat",
description: "Auto-aim at enemies",
enabled: e.kt.ze,
onToggle: () => t(e => e.kt.ze = !e.kt.ze),
keybind: e.ir.sr,
onKeybindChange: e => t(t => t.ir.sr = e)
}, {
id: "meleelock",
title: "Melee Lock",
category: "Combat",
description: "Lock melee aim on nearest enemy",
enabled: e.xt.ze,
onToggle: () => t(e => e.xt.ze = !e.xt.ze),
keybind: e.ir.kr,
onKeybindChange: e => t(t => t.ir.kr = e)
}, {
id: "bulletdodge",
title: "Bullet Dodge",
category: "Evasion",
description: "Auto-evade incoming bullets",
enabled: e.Ct.ze,
onToggle: () => t(e => e.Ct.ze = !e.Ct.ze),
keybind: e.ir.Sr,
onKeybindChange: e => t(t => t.ir.Sr = e)
}, {
id: "autofire",
title: "BumpFire",
category: "Combat",
description: "Automatic shooting when holding fire button",
enabled: e.Vn.ze,
onToggle: () => t(e => e.Vn.ze = !e.Vn.ze),
keybind: e.ir.cr,
onKeybindChange: e => t(t => t.ir.cr = e)
}, {
id: "panhero",
title: "Pan Hero",
category: "Combat",
description: "Reflect bullets with a pan",
enabled: e.ut.ze,
onToggle: () => t(e => e.ut.ze = !e.ut.ze),
keybind: e.ir.hr,
onKeybindChange: e => t(t => t.ir.hr = e)
}, {
id: "autoswitch",
title: "Auto Switch",
category: "Combat",
description: "Automatically switch weapons",
enabled: e.Qn.ze,
onToggle: () => t(e => e.Qn.ze = !e.Qn.ze),
keybind: e.ir._r,
onKeybindChange: e => t(t => t.ir._r = e)
} ], l = (r || "").trim().toLowerCase();
return Ae("div", {
className: "section",
children: Ae("div", {
className: "feature-list",
children: (l ? i.filter(e => e.title.toLowerCase().includes(l) || e.description.toLowerCase().includes(l) || e.category.toLowerCase().includes(l)) : i).map(r => Ae("div", {
className: "feature-card-wrapper",
children: [ Ae("div", {
className: "feature-card-header",
onClick: () => o.includes(r.id) && a(n === r.id ? null : r.id),
children: [ Ae(Wa, {
title: r.title,
category: r.category,
description: r.description,
enabled: r.enabled,
onToggle: r.onToggle,
keybind: r.keybind,
onKeybindChange: r.onKeybindChange
}), o.includes(r.id) && Ae("div", {
className: "chevron " + (n === r.id ? "expanded" : ""),
children: Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Ae("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === r.id && o.includes(r.id) && Ae("div", {
className: "feature-settings",
children: [ "aimbot" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "aimbot-target-knocked",
label: "Target Knocked",
checked: e.kt.ht,
onChange: e => t(t => t.kt.ht = e)
}), Ae(Da, {
id: "aimbot-sticky-target",
label: "Sticky Target",
checked: e.kt.En,
onChange: e => t(t => t.kt.En = e)
}), Ae(Da, {
id: "aimbot-show-dot",
label: "Show Dot",
checked: e.kt.Hn,
onChange: e => t(t => t.kt.Hn = e)
}), Ae(Ea, {
id: "aimbot-wallcheck",
label: "Wallcheck",
checked: e.kt.zt,
onChange: e => t(t => t.kt.zt = e)
}), Ae(Da, {
id: "aimbot-auto-attack",
label: "Auto Attack",
checked: e.kt.dt,
onChange: e => t(t => t.kt.dt = e)
}) ]
}), "panhero" === r.id && Ae(Da, {
id: "panhero-target-knocked",
label: "Target Knocked",
checked: e.ut.ht,
onChange: e => t(t => t.ut.ht = e)
}), "meleelock" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "auto-melee",
label: "Auto Melee",
checked: e.xt.Tt,
onChange: e => t(t => t.xt.Tt = e)
}), Ae(Da, {
id: "enable-strafe",
label: "Random Strafe",
checked: e.xt.Ft,
onChange: e => t(t => t.xt.Ft = e)
}), e.xt.Ft && Ae(B, {
children: [ Ae(Ia, {
id: "strafe-intensity",
label: "Strafe Intensity",
value: e.xt.Pt,
onChange: e => t(t => t.xt.Pt = e)
}), Ae(Ia, {
id: "strafe-chance",
label: "Strafe Chance",
value: e.xt.Ot,
onChange: e => t(t => t.xt.Ot = e)
}) ]
}), Ae(Da, {
id: "enable-evasion",
label: "Melee Range Evasion",
checked: e.xt.Rt,
onChange: e => t(t => t.xt.Rt = e)
}), e.xt.Rt && Ae(B, {
children: [ Ae(Ia, {
id: "evasion-range",
label: "Evasion Range",
value: e.xt.jt,
onChange: e => t(t => t.xt.jt = e),
min: "2",
max: "8"
}), Ae(Ia, {
id: "evasion-strength",
label: "Evasion Strength",
value: e.xt.$t,
onChange: e => t(t => t.xt.$t = e)
}) ]
}) ]
}), "bulletdodge" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "combo-mode",
label: "Combo Mode (dodge + aim)",
checked: e.Ct.wt,
onChange: e => t(t => t.Ct.wt = e)
}), Ae(Ia, {
id: "dodge-aggressiveness",
label: "Aggressiveness",
value: e.Ct.In,
onChange: e => t(t => t.Ct.In = e),
min: "0",
max: "100"
}), Ae(Ia, {
id: "dodge-safe-distance",
label: "Safe Distance",
value: e.Ct.Kn,
onChange: e => t(t => t.Ct.Kn = e),
min: "20",
max: "100"
}) ]
}) ]
}) ]
}, r.id))
})
});
}, Va = ({ea: e, ta: t, searchQuery: r = ""}) => {
const [n, a] = le(null), o = de(() => {
const e = j();
return e.init(), e;
}, []), i = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock", "backgroundchange" ], l = [ {
id: "aimbot",
title: "Aimbot",
category: "Combat",
description: "Auto-aim at enemies",
keywords: [ "aimbot", "aim", "lock", "autoaim" ],
enabled: e.kt.ze,
onToggle: () => t(e => e.kt.ze = !e.kt.ze),
keybind: e.ir.sr,
onKeybindChange: e => t(t => t.ir.sr = e)
}, {
id: "autofire",
title: "Bumpfire",
category: "Combat",
description: "Automatic shooting when holding fire button",
keywords: [ "autofire", "auto-fire", "fire", "shoot", "shooting" ],
enabled: e.Vn.ze,
onToggle: () => t(e => e.Vn.ze = !e.Vn.ze),
keybind: e.ir.cr,
onKeybindChange: e => t(t => t.ir.cr = e)
}, {
id: "autoheal",
title: "Auto Heal",
category: "Misc",
description: "Automatically uses healing items",
keywords: [ "autoheal", "heal", "healing", "bandage", "med" ],
enabled: e.Wt.ze,
onToggle: () => t(e => e.Wt.ze = !e.Wt.ze),
keybind: e.ir.dr,
onKeybindChange: e => t(t => t.ir.dr = e)
}, {
id: "esp",
title: "ESP",
category: "Visualss",
description: "Show players and grenades through walls",
keywords: [ "esp", "wallhack", "wall", "see-through" ],
enabled: e.Ue.ze,
onToggle: () => t(e => e.Ue.ze = !e.Ue.ze),
keybind: e.ir.ur,
onKeybindChange: e => t(t => t.ir.ur = e)
}, {
id: "xray",
title: "X-Ray",
category: "Render",
description: "Make smokes/ceilings transparent",
keywords: [ "xray", "x-ray", "smoke", "transparent", "ceiling" ],
enabled: e.Re.ze,
onToggle: () => t(e => e.Re.ze = !e.Re.ze),
keybind: e.ir.mr,
onKeybindChange: e => t(t => t.ir.mr = e)
}, {
id: "panhero",
title: "Pan Hero",
category: "Combat",
description: "Reflect bullets with a pan",
keywords: [ "panhero", "pan", "hero", "turn", "away" ],
enabled: e.ut.ze,
onToggle: () => t(e => e.ut.ze = !e.ut.ze),
keybind: e.ir.hr,
onKeybindChange: e => t(t => t.ir.hr = e)
}, {
id: "infinitezoom",
title: "Infinite Zoom",
category: "Visuals",
description: "Unlimited camera zoom",
keywords: [ "infinitezoom", "infinite", "zoom", "camera", "view" ],
enabled: e.Xn.ze,
onToggle: () => t(e => e.Xn.ze = !e.Xn.ze),
keybind: e.ir.pr,
onKeybindChange: e => t(t => t.ir.pr = e)
}, {
id: "maphighlights",
title: "Map Highlights",
category: "Visuals",
description: "Highlight map details",
keywords: [ "maphighlights", "map", "highlight", "details", "Visuals" ],
enabled: e.Yn.ze,
onToggle: () => t(e => e.Yn.ze = !e.Yn.ze),
keybind: e.ir.wr,
onKeybindChange: e => t(t => t.ir.wr = e)
}, {
id: "layerspoof",
title: "Layer Spoofer",
category: "Visuals",
description: "Change your visible layer",
keywords: [ "layerspoof", "layer", "spoof", "dimension" ],
enabled: e.nr.ze,
onToggle: () => t(e => e.nr.ze = !e.nr.ze),
keybind: e.ir.br,
onKeybindChange: e => t(t => t.ir.br = e)
}, {
id: "autoloot",
title: "Auto Loot",
category: "Misc",
description: "Automatically pick up items",
keywords: [ "autoloot", "auto-loot", "loot", "pickup", "items" ],
enabled: e.Jn.ze,
onToggle: () => t(e => e.Jn.ze = !e.Jn.ze),
keybind: e.ir.vr,
onKeybindChange: e => t(t => t.ir.vr = e)
}, {
id: "autocrate",
title: "Auto Crate Break",
category: "Combat",
description: "Automatically break supply crates",
keywords: [ "autocrate", "auto-crate", "crate", "break", "supply" ],
enabled: e.ct.ze,
onToggle: () => t(e => e.ct.ze = !e.ct.ze),
keybind: e.ir.yr,
onKeybindChange: e => t(t => t.ir.yr = e)
}, {
id: "meleelock",
title: "Melee Lock",
category: "Combat",
description: "Lock melee aim on nearest enemy",
keywords: [ "meleelock", "melee", "lock", "aim", "close-combat" ],
enabled: e.xt.ze,
onToggle: () => t(e => e.xt.ze = !e.xt.ze),
keybind: e.ir.kr,
onKeybindChange: e => t(t => t.ir.kr = e)
}, {
id: "autoswitch",
title: "Auto Switch",
category: "Combat",
description: "Automatically switch weapons",
keywords: [ "autoswitch", "auto-switch", "switch", "weapon", "gun" ],
enabled: e.Qn.ze,
onToggle: () => t(e => e.Qn.ze = !e.Qn.ze),
keybind: e.ir._r,
onKeybindChange: e => t(t => t.ir._r = e)
}, {
id: "backgroundchange",
title: "Background Change",
category: "Visual",
description: "Customize game background",
keywords: [ "background", "change", "customize", "background", "image" ],
enabled: e.Jt.ze,
onToggle: () => t(e => e.Jt.ze = !e.Jt.ze)
} ], s = (r || "").trim().toLowerCase();
return Ae("div", {
className: "section",
children: Ae("div", {
className: "feature-list",
children: (s ? l.filter(e => [ e.title, e.description, e.category, e.keywords ? e.keywords.join(" ") : "" ].join(" ").toLowerCase().includes(s)) : l).map(r => Ae("div", {
className: "feature-card-wrapper",
children: [ Ae("div", {
className: "feature-card-header",
onClick: () => i.includes(r.id) && a(n === r.id ? null : r.id),
children: [ Ae(Wa, {
title: r.title,
category: r.category,
description: r.description,
enabled: r.enabled,
onToggle: r.onToggle,
keybind: r.keybind,
onKeybindChange: r.onKeybindChange
}), i.includes(r.id) && Ae("div", {
className: "chevron " + (n === r.id ? "expanded" : ""),
children: Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Ae("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === r.id && i.includes(r.id) && Ae("div", {
className: "feature-settings",
children: [ "aimbot" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "aimbot-target-knocked",
label: "Target Knocked",
checked: e.kt.ht,
onChange: e => t(t => t.kt.ht = e)
}), Ae(Da, {
id: "aimbot-sticky-target",
label: "Sticky Target",
checked: e.kt.En,
onChange: e => t(t => t.kt.En = e)
}), Ae(Da, {
id: "aimbot-show-dot",
label: "Show Dot",
checked: e.kt.Hn,
onChange: e => t(t => t.kt.Hn = e)
}), Ae(Ea, {
id: "aimbot-wallcheck",
label: "Wallcheck",
checked: e.kt.zt,
onChange: e => t(t => t.kt.zt = e)
}), Ae(Da, {
id: "aimbot-auto-attack",
label: "Auto Attack",
checked: e.kt.dt,
onChange: e => t(t => t.kt.dt = e)
}) ]
}), "autoheal" === r.id && Ae(B, {
children: [ Ae(Ia, {
id: "bandage-threshold",
label: "Bandage Threshold",
value: e.Wt.Zt,
onChange: e => t(t => t.Wt.Zt = e)
}), Ae(Ia, {
id: "kit-threshold",
label: "Kit Threshold",
value: e.Wt.Ut,
onChange: e => t(t => t.Wt.Ut = e)
}), Ae(Ia, {
id: "boost-threshold",
label: "Boost Threshold",
value: e.Wt.Yt,
onChange: e => t(t => t.Wt.Yt = e)
}), Ae(Da, {
id: "auto-heal-enemy-check",
label: "Enemy Check",
checked: e.Wt.Gt,
onChange: e => t(t => t.Wt.Gt = e)
}), Ae(Ia, {
id: "enemy-distance",
label: "Enemy Distance",
value: e.Wt.Vt,
onChange: e => t(t => t.Wt.Vt = e)
}) ]
}), "esp" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "esp-nametags",
label: "Visible Nametags",
checked: e.Ue.Ye,
onChange: e => t(t => t.Ue.Ye = e)
}), Ae(Da, {
id: "esp-players",
label: "Players",
checked: e.Ue.qe,
onChange: e => t(t => t.Ue.qe = e)
}), Ae(Da, {
id: "esp-grenade-explosions",
label: "Grenade Explosions",
checked: e.Ue.Xe.Je,
onChange: e => t(t => t.Ue.Xe.Je = e)
}), Ae(Da, {
id: "esp-grenade-trajectory",
label: "Grenade Trajectory",
checked: e.Ue.Xe.Qe,
onChange: e => t(t => t.Ue.Xe.Qe = e)
}), Ae(Da, {
id: "esp-flashlight-own",
label: "Own Flashlights",
checked: e.Ue.nt.rt,
onChange: e => t(t => t.Ue.nt.rt = e)
}), Ae(Da, {
id: "esp-flashlight-others",
label: "Others Flashlights",
checked: e.Ue.nt.m,
onChange: e => t(t => t.Ue.nt.m = e)
}), Ae(Da, {
id: "esp-flashlight-trajectory",
label: "Flashlight Trajectory",
checked: e.Ue.nt.Qe,
onChange: e => t(t => t.Ue.nt.Qe = e)
}) ]
}), "xray" === r.id && Ae(B, {
children: [ Ae(Ia, {
id: "smoke-opacity",
label: "Smoke Opacity",
value: e.Re.Fe,
onChange: e => t(t => t.Re.Fe = e)
}), Ae(Da, {
id: "darker-smokes",
label: "Darker Smokes",
checked: e.Re.$e,
onChange: e => t(t => t.Re.$e = e)
}), Ae(Ia, {
id: "tree-opacity",
label: "Tree Opacity",
value: e.Re.Oe,
onChange: e => t(t => t.Re.Oe = e)
}), Ae(Da, {
id: "remove-ceilings",
label: "Remove Ceilings",
checked: e.Re.je,
onChange: e => t(t => t.Re.je = e)
}) ]
}), "panhero" === r.id && Ae(Da, {
id: "panhero-target-knocked",
label: "Target Knocked",
checked: e.ut.ht,
onChange: e => t(t => t.ut.ht = e)
}), "maphighlights" === r.id && Ae(Da, {
id: "smaller-trees",
label: "Smaller Trees",
checked: e.Yn.qn,
onChange: e => t(t => t.Yn.qn = e)
}), "meleelock" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "auto-melee",
label: "Auto Melee",
checked: e.xt.Tt,
onChange: e => t(t => t.xt.Tt = e)
}), Ae(Da, {
id: "enable-strafe",
label: "Random Strafe",
checked: e.xt.Ft,
onChange: e => t(t => t.xt.Ft = e)
}), e.xt.Ft && Ae(B, {
children: [ Ae(Ia, {
id: "strafe-intensity",
label: "Strafe Intensity",
value: e.xt.Pt,
onChange: e => t(t => t.xt.Pt = e)
}), Ae(Ia, {
id: "strafe-chance",
label: "Strafe Chance",
value: e.xt.Ot,
onChange: e => t(t => t.xt.Ot = e)
}) ]
}), Ae(Da, {
id: "enable-evasion",
label: "Melee Range Evasion",
checked: e.xt.Rt,
onChange: e => t(t => t.xt.Rt = e)
}), e.xt.Rt && Ae(B, {
children: [ Ae(Ia, {
id: "evasion-range",
label: "Evasion Range",
value: e.xt.jt,
onChange: e => t(t => t.xt.jt = e),
min: "2",
max: "8"
}), Ae(Ia, {
id: "evasion-strength",
label: "Evasion Strength",
value: e.xt.$t,
onChange: e => t(t => t.xt.$t = e)
}) ]
}) ]
}), "backgroundchange" === r.id && Ae("div", {
style: {
display: "flex",
flexDirection: "column",
gap: "8px"
},
children: [ Ae("button", {
onClick() {
const e = document.createElement("input");
e.type = "file", e.accept = "image/*", e.onchange = e => {
const t = e.target.files?.[0];
t && o.setBackgroundFromFile(t);
}, e.click();
},
style: {
backgroundColor: "transparent",
color: "var(--md-on-surface-variant)",
padding: "var(--md-spacing-3) var(--md-spacing-4)",
border: "none",
borderRadius: "var(--md-shape-corner-medium)",
cursor: "pointer",
fontSize: "var(--md-font-label-large)",
fontWeight: "500",
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
display: "flex",
alignItems: "center",
gap: "8px"
},
onMouseEnter(e) {
e.currentTarget.style.backgroundColor = "var(--md-state-hover)", e.currentTarget.style.color = "var(--md-on-surface)", 
e.currentTarget.style.boxShadow = "var(--md-elevation-1)";
},
onMouseLeave(e) {
e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "var(--md-on-surface-variant)", 
e.currentTarget.style.boxShadow = "none";
},
children: [ Ae(Oa, {
size: 18
}), "Set from File" ]
}), Ae("button", {
onClick() {
o.resetBackground();
},
style: {
backgroundColor: "transparent",
color: "var(--md-on-surface-variant)",
padding: "var(--md-spacing-3) var(--md-spacing-4)",
border: "none",
borderRadius: "var(--md-shape-corner-medium)",
cursor: "pointer",
fontSize: "var(--md-font-label-large)",
fontWeight: "500",
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
display: "flex",
alignItems: "center",
gap: "8px"
},
onMouseEnter(e) {
e.currentTarget.style.backgroundColor = "var(--md-state-hover)", e.currentTarget.style.color = "var(--md-on-surface)", 
e.currentTarget.style.boxShadow = "var(--md-elevation-1)";
},
onMouseLeave(e) {
e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "var(--md-on-surface-variant)", 
e.currentTarget.style.boxShadow = "none";
},
children: [ Ae($a, {
size: 18
}), "Reset" ]
}) ]
}) ]
}) ]
}, r.id))
})
});
}, Ua = ({ea: e, ta: t, searchQuery: r = ""}) => {
const [n, a] = le(null), o = de(() => {
const e = j();
return e.init(), e;
}, []), i = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock", "backgroundchange" ], l = [ {
id: "esp",
title: "ESP",
category: "Render",
description: "Show players and grenades through walls",
enabled: e.Ue.ze,
onToggle: () => t(e => e.Ue.ze = !e.Ue.ze),
keybind: e.ir.ur,
onKeybindChange: e => t(t => t.ir.ur = e)
}, {
id: "xray",
title: "X-Ray",
category: "Render",
description: "Make smokes/ceilings transparent",
enabled: e.Re.ze,
onToggle: () => t(e => e.Re.ze = !e.Re.ze),
keybind: e.ir.mr,
onKeybindChange: e => t(t => t.ir.mr = e)
}, {
id: "infinitezoom",
title: "Infinite Zoom",
category: "Visual",
description: "Unlimited camera zoom",
enabled: e.Xn.ze,
onToggle: () => t(e => e.Xn.ze = !e.Xn.ze),
keybind: e.ir.pr,
onKeybindChange: e => t(t => t.ir.pr = e)
}, {
id: "layerspoof",
title: "Layer Spoofer",
category: "Visual",
description: "Change your visible layer",
enabled: e.nr.ze,
onToggle: () => t(e => e.nr.ze = !e.nr.ze),
keybind: e.ir.br,
onKeybindChange: e => t(t => t.ir.br = e)
}, {
id: "backgroundchange",
title: "Background Change",
category: "Visual",
description: "Customize game background",
enabled: e.Jt.ze,
onToggle: () => t(e => e.Jt.ze = !e.Jt.ze)
} ], s = (r || "").trim().toLowerCase();
return Ae("div", {
className: "section",
children: Ae("div", {
className: "feature-list",
children: (s ? l.filter(e => e.title.toLowerCase().includes(s) || e.description.toLowerCase().includes(s) || e.category.toLowerCase().includes(s)) : l).map(r => Ae("div", {
className: "feature-card-wrapper",
children: [ Ae("div", {
className: "feature-card-header",
onClick: () => i.includes(r.id) && a(n === r.id ? null : r.id),
children: [ Ae(Wa, {
title: r.title,
category: r.category,
description: r.description,
enabled: r.enabled,
onToggle: r.onToggle,
keybind: r.keybind,
onKeybindChange: r.onKeybindChange
}), i.includes(r.id) && Ae("div", {
className: "chevron " + (n === r.id ? "expanded" : ""),
children: Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Ae("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === r.id && i.includes(r.id) && Ae("div", {
className: "feature-settings",
children: [ "esp" === r.id && Ae(B, {
children: [ Ae(Da, {
id: "esp-nametags",
label: "Visible Nametags",
checked: e.Ue.Ye,
onChange: e => t(t => t.Ue.Ye = e)
}), Ae(Da, {
id: "esp-players",
label: "Players",
checked: e.Ue.qe,
onChange: e => t(t => t.Ue.qe = e)
}), Ae(Da, {
id: "esp-grenade-explosions",
label: "Grenade Explosions",
checked: e.Ue.Xe.Je,
onChange: e => t(t => t.Ue.Xe.Je = e)
}), Ae(Da, {
id: "esp-grenade-trajectory",
label: "Grenade Trajectory",
checked: e.Ue.Xe.Qe,
onChange: e => t(t => t.Ue.Xe.Qe = e)
}), Ae(Da, {
id: "esp-flashlight-own",
label: "Own Flashlights",
checked: e.Ue.nt.rt,
onChange: e => t(t => t.Ue.nt.rt = e)
}), Ae(Da, {
id: "esp-flashlight-others",
label: "Others Flashlights",
checked: e.Ue.nt.m,
onChange: e => t(t => t.Ue.nt.m = e)
}), Ae(Da, {
id: "esp-flashlight-trajectory",
label: "Flashlight Trajectory",
checked: e.Ue.nt.Qe,
onChange: e => t(t => t.Ue.nt.Qe = e)
}) ]
}), "xray" === r.id && Ae(B, {
children: [ Ae(Ia, {
id: "smoke-opacity",
label: "Smoke Opacity",
value: e.Re.Fe,
onChange: e => t(t => t.Re.Fe = e)
}), Ae(Da, {
id: "darker-smokes",
label: "Darker Smokes",
checked: e.Re.$e,
onChange: e => t(t => t.Re.$e = e)
}), Ae(Ia, {
id: "tree-opacity",
label: "Tree Opacity",
value: e.Re.Oe,
onChange: e => t(t => t.Re.Oe = e)
}), Ae(Da, {
id: "remove-ceilings",
label: "Remove Ceilings",
checked: e.Re.je,
onChange: e => t(t => t.Re.je = e)
}) ]
}), "backgroundchange" === r.id && Ae("div", {
style: {
display: "flex",
flexDirection: "column",
gap: "8px"
},
children: [ Ae("button", {
onClick() {
const e = document.createElement("input");
e.type = "file", e.accept = "image/*", e.onchange = e => {
const t = e.target.files?.[0];
t && o.setBackgroundFromFile(t);
}, e.click();
},
style: {
backgroundColor: "transparent",
color: "var(--md-on-surface-variant)",
padding: "var(--md-spacing-3) var(--md-spacing-4)",
border: "none",
borderRadius: "var(--md-shape-corner-medium)",
cursor: "pointer",
fontSize: "var(--md-font-label-large)",
fontWeight: "500",
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
display: "flex",
alignItems: "center",
gap: "8px"
},
onMouseEnter(e) {
e.currentTarget.style.backgroundColor = "var(--md-state-hover)", e.currentTarget.style.color = "var(--md-on-surface)", 
e.currentTarget.style.boxShadow = "var(--md-elevation-1)";
},
onMouseLeave(e) {
e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "var(--md-on-surface-variant)", 
e.currentTarget.style.boxShadow = "none";
},
children: [ Ae(Oa, {
size: 18
}), "Set from File" ]
}), Ae("button", {
onClick() {
o.resetBackground();
},
style: {
backgroundColor: "transparent",
color: "var(--md-on-surface-variant)",
padding: "var(--md-spacing-3) var(--md-spacing-4)",
border: "none",
borderRadius: "var(--md-shape-corner-medium)",
cursor: "pointer",
fontSize: "var(--md-font-label-large)",
fontWeight: "500",
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
display: "flex",
alignItems: "center",
gap: "8px"
},
onMouseEnter(e) {
e.currentTarget.style.backgroundColor = "var(--md-state-hover)", e.currentTarget.style.color = "var(--md-on-surface)", 
e.currentTarget.style.boxShadow = "var(--md-elevation-1)";
},
onMouseLeave(e) {
e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "var(--md-on-surface-variant)", 
e.currentTarget.style.boxShadow = "none";
},
children: [ Ae($a, {
size: 18
}), "Reset" ]
}) ]
}) ]
}) ]
}, r.id))
})
});
}, Za = ({ea: e, ta: t, searchQuery: r = ""}) => {
const [n, a] = le(null), o = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock" ], i = [ {
id: "autoheal",
title: "Auto Heal",
category: "Player",
description: "Automatically uses healing items",
enabled: e.Wt.ze,
onToggle: () => t(e => e.Wt.ze = !e.Wt.ze),
keybind: e.ir.dr,
onKeybindChange: e => t(t => t.ir.dr = e)
}, {
id: "maphighlights",
title: "Map Highlights",
category: "Visual",
description: "Highlight map details",
enabled: e.Yn.ze,
onToggle: () => t(e => e.Yn.ze = !e.Yn.ze),
keybind: e.ir.wr,
onKeybindChange: e => t(t => t.ir.wr = e)
}, {
id: "autoloot",
title: "Auto Loot",
category: "Player",
description: "Automatically pick up items",
enabled: e.Jn.ze,
onToggle: () => t(e => e.Jn.ze = !e.Jn.ze),
keybind: e.ir.vr,
onKeybindChange: e => t(t => t.ir.vr = e)
}, {
id: "autocrate",
title: "Auto Crate Break",
category: "Combat",
description: "Automatically break supply crates",
enabled: e.ct.ze,
onToggle: () => t(e => e.ct.ze = !e.ct.ze),
keybind: e.ir.yr,
onKeybindChange: e => t(t => t.ir.yr = e)
} ], l = (r || "").trim().toLowerCase();
return Ae("div", {
className: "section",
children: Ae("div", {
className: "feature-list",
children: (l ? i.filter(e => e.title.toLowerCase().includes(l) || e.description.toLowerCase().includes(l) || e.category.toLowerCase().includes(l)) : i).map(r => Ae("div", {
className: "feature-card-wrapper",
children: [ Ae("div", {
className: "feature-card-header",
onClick: () => o.includes(r.id) && a(n === r.id ? null : r.id),
children: [ Ae(Wa, {
title: r.title,
category: r.category,
description: r.description,
enabled: r.enabled,
onToggle: r.onToggle,
keybind: r.keybind,
onKeybindChange: r.onKeybindChange
}), o.includes(r.id) && Ae("div", {
className: "chevron " + (n === r.id ? "expanded" : ""),
children: Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Ae("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === r.id && o.includes(r.id) && Ae("div", {
className: "feature-settings",
children: [ "autoheal" === r.id && Ae(B, {
children: [ Ae(Ia, {
id: "bandage-threshold",
label: "Bandage Threshold",
value: e.Wt.Zt,
onChange: e => t(t => t.Wt.Zt = e)
}), Ae(Ia, {
id: "kit-threshold",
label: "Kit Threshold",
value: e.Wt.Ut,
onChange: e => t(t => t.Wt.Ut = e)
}), Ae(Ia, {
id: "boost-threshold",
label: "Boost Threshold",
value: e.Wt.Yt,
onChange: e => t(t => t.Wt.Yt = e)
}), Ae(Da, {
id: "auto-heal-enemy-check",
label: "Enemy Check",
checked: e.Wt.Gt,
onChange: e => t(t => t.Wt.Gt = e)
}), Ae(Ia, {
id: "enemy-distance",
label: "Enemy Distance",
value: e.Wt.Vt,
onChange: e => t(t => t.Wt.Vt = e)
}) ]
}), "maphighlights" === r.id && Ae(Da, {
id: "smaller-trees",
label: "Smaller Trees",
checked: e.Yn.qn,
onChange: e => t(t => t.Yn.qn = e)
}) ]
}) ]
}, r.id))
})
});
}, Ya = ({ea: e}) => Ae("div", {
className: "section help-section",
children: [ Ae("div", {
className: "help-title",
children: [ Ae(Ha.Ur, {
size: 16
}), Ae("span", {
children: "Controls & Information"
}) ]
}), Ae("div", {
className: "help-panel",
style: {
marginBottom: "0.75rem"
},
children: [ Ae("div", {
style: {
display: "flex",
alignItems: "center",
marginBottom: "0.375rem"
},
children: [ Ae(Ka, {
keybind: e?.ir?.lr || "ShiftRight"
}), Ae("span", {
className: "keybind-description",
children: "Show/Hide Menu"
}) ]
}), Ae("p", {
className: "keybind-help-text",
children: "Toggle the menu visibility at any time using this keybind."
}) ]
}), Ae("div", {
className: "section-subtitle",
children: "Feature Keybinds"
}), Ae("div", {
className: "help-panel",
children: [ Ae("p", {
className: "keybind-help-text",
style: {
marginBottom: "0.5rem"
},
children: "Keybinds can be customized next to each feature in their respective tabs:"
}), Ae("div", {
className: "features-container",
children: [ Ae("div", {
className: "feature-item",
children: [ Ae("span", {
className: "feature-name",
children: "Aimbot"
}), Ae(Ka, {
keybind: e?.ir?.sr || "KeyB"
}) ]
}), Ae("div", {
className: "feature-item",
children: [ Ae("span", {
className: "feature-name",
children: "Sticky Target"
}), Ae(Ka, {
keybind: e?.ir?.gr || "KeyN"
}) ]
}), Ae("div", {
className: "feature-item",
children: [ Ae("span", {
className: "feature-name",
children: "Layer Spoofer"
}), Ae(Ka, {
keybind: e?.ir?.br || "KeyT"
}) ]
}) ]
}) ]
}), Ae("div", {
className: "help-title",
style: {
marginTop: "1rem"
},
children: [ Ae(Ha.Yr, {
size: 16
}), Ae("span", {
children: "Community & Support"
}) ]
}), Ae("div", {
className: "community-container",
children: [ Ae("div", {
className: "discord-panel",
children: [ Ae("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Ae(Ha.Xr, {
style: {
width: "1rem",
height: "1rem",
color: "#5865F2"
}
}), Ae("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "Discord Server"
}) ]
}), Ae("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Join for support, bug reports, suggestions, and announcements:"
}), Ae("a", {
href: "https://discord.gg/STcYcBZa",
target: "_blank",
rel: "noopener noreferrer",
className: "discord-link",
children: "discord.gg"
}) ]
}), Ae("div", {
className: "website-panel",
children: [ Ae("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Ae(Ha.qr, {
style: {
color: "#69f74c"
}
}), Ae("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "Official Website"
}) ]
}), Ae("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Visit our website for the latest updates and a backup Discord invite link:"
}), Ae("a", {
href: "https://surminusclient1.github.io/",
target: "_blank",
rel: "noopener noreferrer",
className: "website-link",
children: "surminusclient.github.io"
}) ]
}) ]
}), Ae("div", {
className: "help-title",
children: [ Ae(Ha.Jr, {
size: 16
}), Ae("span", {
children: "Credits"
}) ]
}), Ae("div", {
className: "credits-panel",
children: Ae("div", {
className: "credits-container",
children: [ Ae("div", {
className: "credit-item",
children: [ Ae("div", {
className: "credit-name",
children: "shiroko"
}), Ae("div", {
children: "Developer, Designer"
}) ]
}), Ae("div", {
className: "credit-item",
children: [ Ae("div", {
className: "credit-name",
children: "winzy"
}), Ae("div", {
children: "Developer"
}) ]
}) ]
})
}) ]
}), Ja = ({}) => {
const [e, t] = le(() => localStorage.getItem("surminus-theme") || "green"), [r, n] = le(null), a = [ {
id: "yellow",
name: "Golden Yellow",
primary: "#ffb800",
gradient: "linear-gradient(135deg, #ffb800 0%, #ff9500 100%)",
description: "Warm and energetic golden yellow",
colors: {
primary: "#ffb800",
primaryContainer: "rgba(255, 184, 0, 0.15)",
stateHover: "rgba(255, 184, 0, 0.08)",
stateFocus: "rgba(255, 184, 0, 0.12)"
}
}, {
id: "mint",
name: "Mint Green",
primary: "#6fd89f",
gradient: "linear-gradient(135deg, #6fd89f 0%, #5dd184 100%)",
description: "Fresh and calming mint green",
colors: {
primary: "#6fd89f",
primaryContainer: "rgba(111, 216, 159, 0.15)",
stateHover: "rgba(111, 216, 159, 0.08)",
stateFocus: "rgba(111, 216, 159, 0.12)"
}
}, {
id: "peach",
name: "Warm Peach",
primary: "#f5c69b",
gradient: "linear-gradient(135deg, #f5c69b 0%, #f0a476 100%)",
description: "Soft and warm peachy tone",
colors: {
primary: "#f5c69b",
primaryContainer: "rgba(245, 198, 155, 0.15)",
stateHover: "rgba(245, 198, 155, 0.08)",
stateFocus: "rgba(245, 198, 155, 0.12)"
}
}, {
id: "lavender",
name: "Soft Lavender",
primary: "#c8b5e6",
gradient: "linear-gradient(135deg, #c8b5e6 0%, #b895d4 100%)",
description: "Elegant and dreamy lavender",
colors: {
primary: "#c8b5e6",
primaryContainer: "rgba(200, 181, 230, 0.15)",
stateHover: "rgba(200, 181, 230, 0.08)",
stateFocus: "rgba(200, 181, 230, 0.12)"
}
}, {
id: "pistachio",
name: "Light Pistachio",
primary: "#b5d89f",
gradient: "linear-gradient(135deg, #b5d89f 0%, #a0ce84 100%)",
description: "Subtle and sophisticated pistachio",
colors: {
primary: "#b5d89f",
primaryContainer: "rgba(181, 216, 159, 0.15)",
stateHover: "rgba(181, 216, 159, 0.08)",
stateFocus: "rgba(181, 216, 159, 0.12)"
}
}, {
id: "rose",
name: "Rose Quartz",
primary: "#f5bcd4",
gradient: "linear-gradient(135deg, #f5bcd4 0%, #f0a8c0 100%)",
description: "Gentle and romantic rose",
colors: {
primary: "#f5bcd4",
primaryContainer: "rgba(245, 188, 212, 0.15)",
stateHover: "rgba(245, 188, 212, 0.08)",
stateFocus: "rgba(245, 188, 212, 0.12)"
}
}, {
id: "blush",
name: "Soft Blush",
primary: "#f5d4e0",
gradient: "linear-gradient(135deg, #f5d4e0 0%, #f0c4d0 100%)",
description: "Delicate and charming blush",
colors: {
primary: "#f5d4e0",
primaryContainer: "rgba(245, 212, 224, 0.15)",
stateHover: "rgba(245, 212, 224, 0.08)",
stateFocus: "rgba(245, 212, 224, 0.12)"
}
}, {
id: "skyblue",
name: "Sky Blue",
primary: "#b5d9f0",
gradient: "linear-gradient(135deg, #b5d9f0 0%, #80c8e8 100%)",
description: "Peaceful and serene sky blue",
colors: {
primary: "#b5d9f0",
primaryContainer: "rgba(181, 217, 240, 0.15)",
stateHover: "rgba(181, 217, 240, 0.08)",
stateFocus: "rgba(181, 217, 240, 0.12)"
}
}, {
id: "green",
name: "Bright Green",
primary: "#6edb72",
gradient: "linear-gradient(135deg, #6edb72 0%, #41d855 100%)",
description: "Fresh and vibrant bright green",
colors: {
primary: "#6edb72",
primaryContainer: "rgba(110, 219, 114, 0.15)",
stateHover: "rgba(110, 219, 114, 0.08)",
stateFocus: "rgba(110, 219, 114, 0.12)"
}
}, {
id: "cyan",
name: "Cyber Cyan",
primary: "#00d9ff",
gradient: "linear-gradient(135deg, #00d9ff 0%, #00b8d4 100%)",
description: "Cool and futuristic cyan",
colors: {
primary: "#00d9ff",
primaryContainer: "rgba(0, 217, 255, 0.15)",
stateHover: "rgba(0, 217, 255, 0.08)",
stateFocus: "rgba(0, 217, 255, 0.12)"
}
}, {
id: "pink",
name: "Hot Pink",
primary: "#ff006e",
gradient: "linear-gradient(135deg, #ff006e 0%, #e60062 100%)",
description: "Bold and vibrant hot pink",
colors: {
primary: "#ff006e",
primaryContainer: "rgba(255, 0, 110, 0.15)",
stateHover: "rgba(255, 0, 110, 0.08)",
stateFocus: "rgba(255, 0, 110, 0.12)"
}
}, {
id: "purple",
name: "Purple Haze",
primary: "#b537f2",
gradient: "linear-gradient(135deg, #b537f2 0%, #9620d4 100%)",
description: "Mystical and elegant purple",
colors: {
primary: "#b537f2",
primaryContainer: "rgba(181, 55, 242, 0.15)",
stateHover: "rgba(181, 55, 242, 0.08)",
stateFocus: "rgba(181, 55, 242, 0.12)"
}
}, {
id: "red",
name: "Plasma Red",
primary: "#ff3333",
gradient: "linear-gradient(135deg, #ff3333 0%, #e60000 100%)",
description: "Intense and aggressive red",
colors: {
primary: "#ff3333",
primaryContainer: "rgba(255, 51, 51, 0.15)",
stateHover: "rgba(255, 51, 51, 0.08)",
stateFocus: "rgba(255, 51, 51, 0.12)"
}
} ], o = e => {
const r = a.find(t => t.id === e);
if (!r) {
return;
}
const o = localStorage.getItem("surminus-theme"), l = a.find(e => e.id === o);
t(e);
const {r: s, g: c, b: d} = i(r.colors.primary), u = e => {
e && (e.style.setProperty("--md-primary", r.colors.primary, "important"), e.style.setProperty("--md-primary-container", r.colors.primaryContainer, "important"), 
e.style.setProperty("--md-state-hover", r.colors.stateHover, "important"), e.style.setProperty("--md-state-focus", r.colors.stateFocus, "important"), 
e.style.setProperty("--md-state-pressed", r.colors.stateFocus, "important"), e.style.setProperty("--md-state-dragged", `rgba(${s}, ${c}, ${d}, 0.16)`, "important"), 
e.style.setProperty("--md-scrollbar-thumb", `rgba(${s}, ${c}, ${d}, 0.5)`, "important"), 
e.style.setProperty("--md-scrollbar-thumb-hover", `rgba(${s}, ${c}, ${d}, 0.8)`, "important"), 
e.style.setProperty("--md-primary-rgb", `${s}, ${c}, ${d}`, "important"));
};
let m = null;
Pe && (m = Pe.getElementById("ui")), m || (m = document.getElementById("ui")), m && (u(m), 
m.querySelectorAll("*").forEach(e => {
e.style && u(e);
})), u(document.documentElement), Pe && Pe.host && u(Pe.host);
try {
if (l && l.colors && l.colors.primary) {
const e = l.colors.primary.toLowerCase(), t = r.colors.primary, n = r => {
r && r.querySelectorAll("[style]").forEach(r => {
try {
const n = r.getAttribute("style");
if (n && n.toLowerCase().includes(e)) {
const a = n.replace(RegExp(e, "ig"), t);
r.setAttribute("style", a);
}
} catch (e) {}
});
};
Pe && n(Pe), n(document);
}
} catch (e) {}
try {
let e = "surminus-scrollbar-override", t = document.head.querySelector("style#" + e);
t && t.remove();
const r = document.createElement("style");
r.id = e, r.textContent = `\n        #ui ::-webkit-scrollbar-thumb {\n          background: rgba(${s}, ${c}, ${d}, 0.5) !important;\n        }\n        #ui ::-webkit-scrollbar-thumb:hover {\n          background: rgba(${s}, ${c}, ${d}, 0.8) !important;\n        }\n        #ui * {\n          scrollbar-color: rgba(${s}, ${c}, ${d}, 0.5) rgba(255, 255, 255, 0.03) !important;\n        }\n      `, 
document.head.appendChild(r);
} catch (e) {}
try {
if (Pe) {
let e = "surminus-theme-override", t = Pe.querySelector("style#" + e);
t && t.remove();
const n = document.createElement("style");
n.id = e, n.textContent = `\n          * {\n            --md-primary: ${r.colors.primary} !important;\n            --md-primary-container: ${r.colors.primaryContainer} !important;\n            --md-state-hover: ${r.colors.stateHover} !important;\n            --md-state-focus: ${r.colors.stateFocus} !important;\n            --md-state-pressed: ${r.colors.stateFocus} !important;\n            --md-state-dragged: rgba(${s}, ${c}, ${d}, 0.16) !important;\n            --md-scrollbar-thumb: rgba(${s}, ${c}, ${d}, 0.5) !important;\n            --md-scrollbar-thumb-hover: rgba(${s}, ${c}, ${d}, 0.8) !important;\n          }\n        `, 
Pe.insertBefore(n, Pe.firstChild);
}
} catch (e) {}
try {
const {r: e, g: t, b: n} = i(r.colors.primary);
document.documentElement.style.setProperty("--md-primary-rgb", `${e}, ${t}, ${n}`, "important");
} catch (e) {}
localStorage.setItem("surminus-theme", e), n(r), setTimeout(() => {
n(null);
}, 5e3);
}, i = e => {
const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
return t ? {
r: parseInt(t[1], 16),
g: parseInt(t[2], 16),
b: parseInt(t[3], 16)
} : {
r: 255,
g: 184,
b: 0
};
};
return se(() => {
let e = 0;
const t = () => {
let r = null;
if (Pe && (r = Pe.getElementById("ui")), r || (r = document.getElementById("ui")), 
r) {
const e = localStorage.getItem("surminus-theme");
o(e || "green");
} else {
10 > e && (e++, setTimeout(t, 100));
}
};
t();
}, []), Ae("div", {
className: "section",
children: [ r && Ae("div", {
style: {
padding: "1rem",
marginBottom: "1rem",
background: r.gradient,
border: "2px solid " + r.primary,
borderRadius: "var(--md-shape-corner-large)",
boxShadow: "var(--md-elevation-2)",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "1rem",
animation: "fadeIn 0.3s ease-in-out"
},
children: [ Ae("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.75rem"
},
children: [ Ae("span", {
style: {
fontSize: "1.25rem",
color: "#ffffff",
fontWeight: "bold"
},
children: "✓"
}), Ae("div", {
children: [ Ae("p", {
style: {
margin: "0 0 0.25rem 0",
fontSize: "var(--md-font-body-medium)",
fontWeight: 600,
color: "#ffffff"
},
children: "Theme Applied"
}), Ae("p", {
style: {
margin: 0,
fontSize: "var(--md-font-body-small)",
color: "rgba(255, 255, 255, 0.9)"
},
children: [ "Refresh the page to fully apply ", Ae("strong", {
children: r.name
}), " theme" ]
}) ]
}) ]
}), Ae("button", {
onClick: () => n(null),
style: {
background: "transparent",
border: "none",
color: "#ffffff",
fontSize: "1.5rem",
cursor: "pointer",
padding: "0.25rem",
display: "flex",
alignItems: "center",
justifyContent: "center",
transition: "color 0.2s, transform 0.2s"
},
onMouseEnter(e) {
e.currentTarget.style.color = "#ffffff", e.currentTarget.style.opacity = "0.8", 
e.currentTarget.style.transform = "scale(1.1)";
},
onMouseLeave(e) {
e.currentTarget.style.color = "#ffffff", e.currentTarget.style.opacity = "1", e.currentTarget.style.transform = "scale(1)";
},
children: "✕"
}) ]
}), Ae("style", {
children: "\n        @keyframes fadeIn {\n          from {\n            opacity: 0;\n            transform: translateY(-10px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n      "
}), Ae("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.5rem",
marginBottom: "1rem"
},
children: [ Ae(Ta, {
size: 18,
style: {
color: "var(--md-primary)"
}
}), Ae("h2", {
style: {
fontSize: "var(--md-font-headline-small)",
fontWeight: 600,
margin: 0,
color: "var(--md-on-surface)"
},
children: "Color Themes"
}) ]
}), Ae("p", {
style: {
fontSize: "var(--md-font-body-medium)",
color: "var(--md-on-surface-variant)",
marginBottom: "1.5rem"
},
children: "Select a color preset below to change the theme"
}), Ae("div", {
style: {
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gap: "1rem"
},
children: a.map(t => Ae("button", {
disabled: !1,
onClick: () => o(t.id),
style: {
padding: "1rem",
background: t.id === e ? `linear-gradient(135deg, ${t.colors.primaryContainer}, ${t.colors.primaryContainer})` : "var(--md-surface-container-low)",
border: t.id === e ? "2px solid " + t.primary : "1px solid var(--md-outline-variant)",
borderRadius: "var(--md-shape-corner-large)",
cursor: "pointer",
opacity: 1,
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
boxShadow: t.id === e ? "var(--md-elevation-3)" : "var(--md-elevation-1)",
display: "flex",
flexDirection: "column",
alignItems: "flex-start",
gap: "0.5rem"
},
children: [ Ae("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.75rem",
width: "100%"
},
children: [ Ae("div", {
style: {
width: "24px",
height: "24px",
borderRadius: "50%",
background: t.gradient,
border: "2px solid var(--md-surface)",
boxShadow: `0 0 12px ${t.primary}60`,
opacity: t.id === e ? 1 : .6
}
}), Ae("span", {
style: {
fontSize: "var(--md-font-label-large)",
fontWeight: 600,
color: "var(--md-on-surface)"
},
children: t.name
}) ]
}), Ae("span", {
style: {
fontSize: "var(--md-font-label-small)",
color: "var(--md-on-surface-variant)",
textAlign: "left"
},
children: t.description
}), t.id === e && Ae("div", {
style: {
marginTop: "0.5rem",
padding: "0.25rem 0.75rem",
background: t.gradient,
borderRadius: "var(--md-shape-corner-full)",
fontSize: "var(--md-font-label-small)",
fontWeight: 600,
color: "#ffffff"
},
children: "✓ Active"
}) ]
}, t.id))
}), Ae("div", {
style: {
marginTop: "1.5rem",
padding: "1rem",
background: "var(--md-surface-container-low)",
borderRadius: "var(--md-shape-corner-large)",
border: "1px solid var(--md-outline-variant)"
},
children: Ae("p", {
style: {
fontSize: "var(--md-font-body-small)",
color: "var(--md-on-surface-variant)",
margin: 0,
lineHeight: 1.5
},
children: "💡 The selected theme colors will be applied throughout the entire UI interface, including buttons, highlights, active states, and gradients."
})
}) ]
});
}, qa = ({ea: e, ta: t, na: r, version: n}) => {
const [a, o] = le("main"), [i, l] = le({
x: 175,
y: 125
}), [s, c] = le(!1), [d, u] = le({
x: 0,
y: 0
}), [m, f] = le(""), h = ce(null);
se(() => {
const e = e => {
if (s) {
const t = h.current;
if (!t) {
return;
}
const r = 100;
let n = e.clientX - d.x, a = e.clientY - d.y;
const o = 0, i = Fe.innerHeight - 50;
n = Math.max(-(t.offsetWidth - r), Math.min(Fe.innerWidth - r, n)), a = Math.max(o, Math.min(i, a)), 
l({
x: n,
y: a
});
}
}, t = () => {
c(!1);
};
return s && (Reflect.apply(ct, Oe, [ "mousemove", e ]), Reflect.apply(ct, Oe, [ "mouseup", t ])), 
() => {
Reflect.apply(dt, Oe, [ "mousemove", e ]), Reflect.apply(dt, Oe, [ "mouseup", t ]);
};
}, [ s, d ]), se(() => {
const e = () => {
const e = h.current;
if (!e) {
return;
}
const t = e.querySelector(".titlebar");
if (!t) {
return;
}
const r = t.getBoundingClientRect(), n = -(e.offsetWidth - 100), a = Fe.innerWidth - 100, o = Fe.innerHeight - r.height;
l(e => ({
x: Math.max(n, Math.min(a, e.x)),
y: Math.max(0, Math.min(o, e.y))
}));
};
return Reflect.apply(ct, Fe, [ "resize", e ]), () => {
Reflect.apply(dt, Fe, [ "resize", e ]);
};
}, []);
const g = e => {
e.stopPropagation();
};
return Ae(B, {
children: Ae("div", {
id: "ui",
ref: h,
style: {
position: "fixed",
zIndex: "99999",
left: i.x + "px",
top: i.y + "px",
willChange: s ? "transform" : "auto",
transition: s ? "none" : void 0
},
onClick: g,
onMouseDown: g,
onPointerDown: g,
onPointerUp: g,
onTouchStart: g,
onTouchEnd: g,
children: Ae("div", {
className: "popup",
children: [ Ae("div", {
className: "search-header",
onMouseDown(e) {
c(!0), u({
x: e.clientX - i.x,
y: e.clientY - i.y
});
},
children: [ Ae("div", {
className: "logo-text",
children: [ Ae("span", {
className: "logo-char-green",
children: "S"
}), Ae("span", {
className: "logo-char-white",
children: "ur"
}), Ae("span", {
className: "logo-char-white",
children: "M"
}), Ae("span", {
className: "logo-char-white",
children: "i"
}), Ae("span", {
className: "logo-char-white",
children: "n"
}), Ae("span", {
className: "logo-char-white",
children: "u"
}), Ae("span", {
className: "logo-char-white",
children: "s"
}), n && Ae("span", {
className: "version-text",
children: (e => {
const t = {
0: "0",
1: "1",
2: "2",
3: "3",
4: "4",
5: "5",
6: "6",
7: "7",
8: "8",
9: "9",
".": "."
};
return e.split("").map(e => t[e] || e).join("");
})(n)
}) ]
}), Ae("div", {
className: "search-bar",
children: [ Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
className: "search-icon",
children: [ Ae("circle", {
cx: "11",
cy: "11",
r: "8"
}), Ae("path", {
d: "m21 21-4.35-4.35"
}) ]
}), Ae("input", {
className: "search-input",
placeholder: "Start typing to search...",
value: m,
onChange(e) {
const t = e.target.value;
f(t), "" !== t.trim() && o("main");
},
onKeyDown(e) {
"Escape" === e.key && f("");
}
}) ]
}), Ae("button", {
className: "close-btn",
onClick: r,
children: "×"
}) ]
}), Ae("div", {
className: "menu-layout",
children: [ Ae(Ba, {
activeTab: a,
onTabChange: o
}), Ae("div", {
className: "main-panel",
children: Ae("div", {
className: "content-container " + (a ? "active" : ""),
children: (() => {
switch (a) {
case "combat":
return Ae(Ga, {
ea: e,
ta: t
});

case "main":
case "search":
default:
return Ae(Va, {
ea: e,
ta: t,
searchQuery: m
});

case "visuals":
return Ae(Ua, {
ea: e,
ta: t
});

case "misc":
return Ae(Za, {
ea: e,
ta: t
});

case "themes":
return Ae(Ja, {
ea: e,
ta: t
});

case "help":
return Ae(Ya, {
ea: e,
ta: t
});
}
})()
}, a)
}) ]
}) ]
})
})
});
}, Qa = ({ta: e}) => {
const [t, r] = le(!0), [n, a] = le({
x: 0,
y: 0
}), [o, i] = le(!1), [l, s] = le({
x: 0,
y: 0
}), c = ce(null);
se(() => {
a({
x: Fe.innerWidth / 2 - 200,
y: Fe.innerHeight / 2 - 150
});
}, []);
const d = () => {
e(e => {
e.Cr.Mr = !0;
});
};
return se(() => {
const e = e => {
if (o) {
const t = c.current;
if (!t) {
return;
}
const r = t.querySelector(".titlebar");
if (!r) {
return;
}
const n = r.getBoundingClientRect(), o = 100;
let i = e.clientX - l.x, s = e.clientY - l.y;
const d = 0, u = Fe.innerHeight - n.height;
i = Math.max(-(t.offsetWidth - o), Math.min(Fe.innerWidth - o, i)), s = Math.max(d, Math.min(u, s)), 
a({
x: i,
y: s
});
}
}, t = () => {
i(!1);
};
return o && (Reflect.apply(ct, Oe, [ "mousemove", e ]), Reflect.apply(ct, Oe, [ "mouseup", t ])), 
() => {
Reflect.apply(dt, Oe, [ "mousemove", e ]), Reflect.apply(dt, Oe, [ "mouseup", t ]);
};
}, [ o, l, n ]), t ? Ae("div", {
id: "ui-notification",
ref: c,
style: {
position: "fixed",
left: n.x + "px",
top: n.y + "px",
zIndex: "999999"
},
children: Ae("div", {
className: "popup",
style: {
width: "25rem"
},
children: [ Ae("div", {
className: "titlebar",
onMouseDown(e) {
i(!0), s({
x: e.clientX - n.x,
y: e.clientY - n.y
});
},
children: [ Ae("div", {
className: "title",
children: "New Discord Server!"
}), Ae("span", {
className: "credit",
children: "Join our community"
}), Ae("button", {
className: "close-btn",
onClick() {
d(), r(!1);
},
children: "×"
}) ]
}), Ae("div", {
style: {
padding: "1rem"
},
children: Ae("div", {
className: "discord-panel",
style: {
marginBottom: "0"
},
children: [ Ae("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Ae("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "currentColor",
style: {
width: "1rem",
height: "1rem",
color: "#5865F2"
},
children: Ae("path", {
d: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"
})
}), Ae("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "We have a new Discord server!"
}) ]
}), Ae("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Join our new official Discord server to stay updated, get support, and connect with the community. Don't miss out on announcements, updates, and exclusive features!"
}), Ae("a", {
href: "https://discord.gg/STcYcBZa",
target: "_blank",
rel: "noopener noreferrer",
className: "discord-link",
onClick() {
d(), r(!1), window.open("https://discord.gg/STcYcBZa", "_blank");
},
children: "Join Discord Server"
}) ]
})
}) ]
})
}) : null;
}, Xa = {
enable: null,
disable: null
}, eo = async e => {
if (!Xa[e]) {
try {
const t = "enable" === e ? "https://raw.githubusercontent.com/surminusclient1/bac/main/enable.wav" : "https://raw.githubusercontent.com/surminusclient1/bac/main/disable.wav", r = await fetch(t), n = await r.arrayBuffer(), a = new (window.AudioContext || window.webkitAudioContext), o = await a.decodeAudioData(n);
Xa[e] = {
audioBuffer: o,
audioContext: a
};
} catch (e) {}
}
}, to = async (e = "enable") => {
try {
Xa[e] || await eo(e);
const {audioBuffer: t, audioContext: r} = Xa[e];
if (!t || !r) {
return;
}
const n = r.createBufferSource();
n.buffer = t, n.connect(r.destination), n.start(0);
} catch (e) {}
}, ro = {
primary: "#ffb800",
onPrimary: "#131313",
primaryContainer: "rgba(255, 184, 0, 0.15)",
secondary: "#7dd5e6",
secondaryContainer: "rgba(125, 213, 230, 0.15)",
tertiary: "#ffc66d",
error: "#f28482",
surface: "#131313",
surfaceDim: "#0a0a0a",
surfaceBright: "#2a2a2a",
surfaceContainerLowest: "#0f0f0f",
surfaceContainerLow: "#1a1a1a",
surfaceContainer: "#1e1e1e",
surfaceContainerHigh: "#282828",
surfaceContainerHighest: "#333333",
onSurface: "#ffffff",
onSurfaceVariant: "rgba(255, 255, 255, 0.7)",
outline: "rgba(255, 255, 255, 0.2)",
outlineVariant: "rgba(255, 255, 255, 0.1)"
}, no = {
level0: "0px 0px 0px rgba(0, 0, 0, 0)",
level1: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
level2: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
level3: "0px 10px 13px rgba(0, 0, 0, 0.19), 0px 6px 13px rgba(0, 0, 0, 0.23)",
level4: "0px 15px 25px rgba(0, 0, 0, 0.15), 0px 15px 27px rgba(0, 0, 0, 0.26)",
level5: "0px 20px 33px rgba(0, 0, 0, 0.2), 0px 0px 27px rgba(0, 0, 0, 0.12)"
}, ao = {
hover: "rgba(255, 184, 0, 0.08)",
focus: "rgba(255, 184, 0, 0.12)",
pressed: "rgba(255, 184, 0, 0.12)",
dragged: "rgba(255, 184, 0, 0.16)"
}, oo = {
short1: "50ms",
short2: "100ms",
short3: "150ms",
short4: "200ms",
medium1: "250ms",
medium2: "300ms",
medium3: "350ms",
medium4: "400ms",
long1: "450ms",
long2: "500ms",
long3: "550ms",
long4: "600ms"
}, io = {
standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
standardAccelerate: "cubic-bezier(0.4, 0, 1, 1)",
standardDecelerate: "cubic-bezier(0, 0, 0.2, 1)",
emphasized: "cubic-bezier(0.2, 0, 0, 1)",
emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)"
}, lo = {
none: "0",
extraSmall: "0.25rem",
small: "0.5rem",
medium: "0.75rem",
large: "1rem",
extraLarge: "1.5rem",
full: "9999px"
}, so = {
displayLarge: "3.5rem",
displayMedium: "2.8rem",
displaySmall: "2.25rem",
headlineLarge: "2rem",
headlineMedium: "1.75rem",
headlineSmall: "1.5rem",
titleLarge: "1.375rem",
titleMedium: "1rem",
titleSmall: "0.875rem",
bodyLarge: "1rem",
bodyMedium: "0.875rem",
bodySmall: "0.75rem",
labelLarge: "0.875rem",
labelMedium: "0.75rem",
labelSmall: "0.6875rem"
}, co = {
0: "0",
1: "0.25rem",
2: "0.5rem",
3: "0.75rem",
4: "1rem",
5: "1.25rem",
6: "1.5rem",
7: "1.75rem",
8: "2rem"
};

let uo = null, mo = null, fo = () => {}, ho = "", go = !1;

const po = () => {
uo && go && uo.render(Ae(qa, {
ea: He,
ta: Re,
na: () => fo(!1),
version: ho
}));
}, bo = (e, t) => {
Re(r => {
const n = !e(r);
t(r, n);
});
}, vo = [ {
id: "yellow",
primary: "#ffb800",
gradient: "linear-gradient(135deg, #ffb800 0%, #ff9500 100%)",
primaryContainer: "rgba(255, 184, 0, 0.15)",
stateHover: "rgba(255, 184, 0, 0.08)",
stateFocus: "rgba(255, 184, 0, 0.12)"
}, {
id: "mint",
primary: "#6fd89f",
gradient: "linear-gradient(135deg, #6fd89f 0%, #5dd184 100%)",
primaryContainer: "rgba(111, 216, 159, 0.15)",
stateHover: "rgba(111, 216, 159, 0.08)",
stateFocus: "rgba(111, 216, 159, 0.12)"
}, {
id: "peach",
primary: "#f5c69b",
gradient: "linear-gradient(135deg, #f5c69b 0%, #f0a476 100%)",
primaryContainer: "rgba(245, 198, 155, 0.15)",
stateHover: "rgba(245, 198, 155, 0.08)",
stateFocus: "rgba(245, 198, 155, 0.12)"
}, {
id: "lavender",
primary: "#c8b5e6",
gradient: "linear-gradient(135deg, #c8b5e6 0%, #b895d4 100%)",
primaryContainer: "rgba(200, 181, 230, 0.15)",
stateHover: "rgba(200, 181, 230, 0.08)",
stateFocus: "rgba(200, 181, 230, 0.12)"
}, {
id: "pistachio",
primary: "#b5d89f",
gradient: "linear-gradient(135deg, #b5d89f 0%, #a0ce84 100%)",
primaryContainer: "rgba(181, 216, 159, 0.15)",
stateHover: "rgba(181, 216, 159, 0.08)",
stateFocus: "rgba(181, 216, 159, 0.12)"
}, {
id: "rose",
primary: "#f5bcd4",
gradient: "linear-gradient(135deg, #f5bcd4 0%, #f0a8c0 100%)",
primaryContainer: "rgba(245, 188, 212, 0.15)",
stateHover: "rgba(245, 188, 212, 0.08)",
stateFocus: "rgba(245, 188, 212, 0.12)"
}, {
id: "blush",
primary: "#f5d4e0",
gradient: "linear-gradient(135deg, #f5d4e0 0%, #f0c4d0 100%)",
primaryContainer: "rgba(245, 212, 224, 0.15)",
stateHover: "rgba(245, 212, 224, 0.08)",
stateFocus: "rgba(245, 212, 224, 0.12)"
}, {
id: "skyblue",
primary: "#b5d9f0",
gradient: "linear-gradient(135deg, #b5d9f0 0%, #80c8e8 100%)",
primaryContainer: "rgba(181, 217, 240, 0.15)",
stateHover: "rgba(181, 217, 240, 0.08)",
stateFocus: "rgba(181, 217, 240, 0.12)"
}, {
id: "green",
primary: "#6edb72",
gradient: "linear-gradient(135deg, #6edb72 0%, #41d855 100%)",
primaryContainer: "rgba(110, 219, 114, 0.15)",
stateHover: "rgba(110, 219, 114, 0.08)",
stateFocus: "rgba(110, 219, 114, 0.12)"
}, {
id: "cyan",
primary: "#00d9ff",
gradient: "linear-gradient(135deg, #00d9ff 0%, #00b8d4 100%)",
primaryContainer: "rgba(0, 217, 255, 0.15)",
stateHover: "rgba(0, 217, 255, 0.08)",
stateFocus: "rgba(0, 217, 255, 0.12)"
}, {
id: "pink",
primary: "#ff006e",
gradient: "linear-gradient(135deg, #ff006e 0%, #e60062 100%)",
primaryContainer: "rgba(255, 0, 110, 0.15)",
stateHover: "rgba(255, 0, 110, 0.08)",
stateFocus: "rgba(255, 0, 110, 0.12)"
}, {
id: "purple",
primary: "#b537f2",
gradient: "linear-gradient(135deg, #b537f2 0%, #9620d4 100%)",
primaryContainer: "rgba(181, 55, 242, 0.15)",
stateHover: "rgba(181, 55, 242, 0.08)",
stateFocus: "rgba(181, 55, 242, 0.12)"
}, {
id: "red",
primary: "#ff3333",
gradient: "linear-gradient(135deg, #ff3333 0%, #e60000 100%)",
primaryContainer: "rgba(255, 51, 51, 0.15)",
stateHover: "rgba(255, 51, 51, 0.08)",
stateFocus: "rgba(255, 51, 51, 0.12)"
} ], yo = async () => {
try {
ho = "5.1", go && po();
} catch (e) {
ho = "5.1", go && po();
}
};

let xo = !1, ko = !1, wo = {
x: 0,
y: 0
};

const _o = {
ra: !1,
aa: !1,
oa: !1,
ia: !1,
la: 0
}, Co = () => {
n(Ie.game, "init", {
apply(e, t, n) {
const a = Reflect.apply(e, t, n);
return (e => new Promise(t => {
function r(e) {
if (!e || "object" != typeof e || e instanceof Array) {
return null;
}
let t = {
m: 0,
h: 0,
p: 0,
_: 0,
C: 0
};
return new Set([ ...Object.keys(e), ...Object.getOwnPropertyNames(Object.getPrototypeOf(e) || {}) ]).forEach(r => {
let n = e[r];
Array.isArray(n) ? t._++ : "object" == typeof n && null !== n ? t.p++ : "function" == typeof n ? t.h++ : t.m++, 
t.C++;
}), Object.values(t).map(e => String.fromCharCode(97 + e)).join("");
}
function n() {
const e = Object.keys(a), t = Object.keys(Je);
return e.every(e => t.includes(e));
}
const a = {
M: "10-7-0-0-17",
S: "21-20-11-1-53",
N: [ "7-9-1-0-17", "9-10-1-0-20", "10-11-1-0-22" ],
A: "9-9-3-1-22",
T: "1-7-1-2-11",
R: "0-4-1-1-6",
j: [ "1-19-5-1-26", "1-18-5-1-25" ],
$: "0-6-1-1-8",
F: "0-4-0-1-5",
O: "0-2-1-0-3",
P: "0-4-0-2-6",
B: "0-7-2-2-11",
L: "0-3-1-0-4",
D: "1-3-1-1-6",
H: "0-3-1-0-4",
I: "1-3-1-0-5",
K: [ "3-8-3-0-14", "5-8-3-0-16" ],
W: "51-64-87-2-204",
G: [ "1-28-5-4-38", "1-29-5-4-39" ],
V: "",
Z: "0-3-0-1-4",
U: "1-7-2-0-10",
Y: "36-42-12-3-93",
q: "12-4-2-1-19",
J: "52-40-44-3-139",
X: "2-8-5-0-15",
ee: [ "8-23-3-1-35", "9-24-3-1-37" ],
te: [ "1-7-1-1-10", "2-7-1-1-11" ],
ne: "2-8-1-1-12",
re: "4-28-6-1-39",
ae: "1-17-3-1-22",
oe: [ "0-3-2-0-5", "0-3-3-0-6" ],
ie: "3-5-1-1-10",
le: "5-7-4-0-16",
se: [ "21-11-3-1-36", "23-11-3-1-38", "22-11-3-1-37" ],
ce: "6-11-2-1-20",
de: "6-6-5-0-17",
ue: "",
me: "",
ge: "",
he: "",
fe: "",
pe: "",
be: "",
ve: "",
ye: "",
ke: "",
xe: "",
_e: "",
we: "",
Ce: "",
Me: "",
Se: "",
Ne: "",
Ae: "",
Te: ""
}, o = {};
for (const [e, t] of Object.entries(a)) {
if ("" != t) {
if (t instanceof Array) {
t.forEach((e, r) => {
const n = e.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
t[r] = n;
}), o[e] = t;
} else {
const r = t.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
o[e] = r;
}
} else {
o[e] = "";
}
}
const i = setInterval(() => {
Je = (() => {
function t(e, t) {
const n = r(e[t]);
if (n) {
for (const [e, r] of Object.entries(o)) {
a[e] || (r instanceof Array && r.some(e => e == n) && (a[e] = t), r == n && (a[e] = t));
}
}
}
if (!e || !e.game) {
return {};
}
const n = e.game, a = {
...Je
};
for (const e in n) {
if (n.hasOwnProperty(e)) {
try {
n[e].hasOwnProperty("deadBodyPool") ? a.H = e : n[e].hasOwnProperty("airdropPool") && (a.L = e);
} catch {}
try {
if (n[e].hasOwnProperty("bones")) {
a.J = e;
const r = new n[e].constructor;
for (const a in r) {
try {
t(n[e], a);
} catch {}
}
if (null != a.ce && (a.Me = Object.getOwnPropertyNames(n[e][a.ce]).find(t => n[e][a.ce][t] instanceof Fe.Array)), 
null != a.ce && null != a.N) {
const t = Object.getOwnPropertyNames(n[e][a.ce]), r = Object.getOwnPropertyNames(n[a.N]);
a.be = t.filter(e => r.includes(e)).find(t => "number" == typeof n[e][a.ce][t]);
}
if (null == a.se) {
continue;
}
if (null != a.J) {
try {
n[a.J].selectIdlePose.call({
[a.se]: new Proxy({}, {
get(e, t) {
a.Se = t;
}
})
});
} catch {}
try {
n[a.J].canInteract.call({
[a.se]: new Proxy({}, {
get(e, t) {
a.Ne = t;
}
})
});
} catch {}
}
(() => {
let e = !1, t = !1;
const n = [ null, null, e => a.me = e, e => a.fe = e ], o = [ e => a.ge = e, e => a.pe = e, null ], i = Object.getOwnPropertyNames(r.__proto__).find(e => 13 == r[e].length);
try {
r[i].call(new Proxy({}, {
get(e, t) {
return n.shift()?.(t), new Proxy({
x: 0,
y: 0
}, {
get(e, t) {
return e[t] || {
x: 0,
y: 0
};
}
});
},
set(t, r) {
return e && (e = !1, a.he = r), o.shift()?.(r), !0;
}
}), null, {
getPlayerById() {}
}, null, {
isSoundPlaying: () => !1
}, null, {
isBindDown: () => (n.unshift(null, null, null, null, null), !1)
}, new Proxy({}, {
get(r, n) {
e = !0, t = !0;
}
}));
} catch {}
t || (a.he = a.me);
})();
continue;
}
if (n[e].hasOwnProperty("triggerPing")) {
a.V = e;
continue;
}
if (n[e].hasOwnProperty("mapTexture")) {
a.ue = e;
continue;
}
if (n[e].hasOwnProperty("topLeft")) {
a.W = e, Object.getOwnPropertyNames(n[e]).forEach(t => {
"object" == typeof n[e][t] && null != n[e][t] && r(n[e][t]) == o.de && (a.de = t);
});
continue;
}
} catch {}
try {
t(n, e);
} catch (e) {}
}
}
try {
null != a.j && Object.getOwnPropertyNames(n[a.j].playerPool).forEach(e => {
Array.isArray(n[a.j].playerPool[e]) && (a.ye = e);
});
} catch {}
try {
null == a.ke && (a.ke = Object.getOwnPropertyNames(n.__proto__).filter(e => "function" == typeof n[e]).find(e => 3 == n[e].length));
} catch {}
try {
if (null != a.ue && null != a.ve && null == a.xe) {
try {
n[a.ue][a.ve].call(new Proxy({}, {
get(e, t) {
throw a.xe = t, null;
}
}));
} catch {}
}
} catch {}
try {
if (null != a.xe && null == a._e) {
const e = n[a.ue][a.xe][a.ye], t = new Proxy({}, {
get(e, t) {
a._e = t;
}
});
e[0].render.call({}, t, t);
}
} catch {}
try {
if (null != a.V && null == a.we) {
let e = new n[a.V].constructor;
e.activePlayer = 1, e.emoteSelector.ping = "ping_danger", e.uiManager = {
getWorldPosFromMapPos() {}
}, e.camera = new Proxy({}, {
get(e, t) {
a.we = t;
}
}), e.triggerPing();
}
} catch {}
try {
null != a.V && null == a.ve && (a.ve = Object.getOwnPropertyNames(n[a.V].__proto__).find(e => 10 == n[a.V][e].length));
} catch {}
try {
null != a.S && null == a.Ce && n[a.S].getAimMovement.call({}, {
[a.ce]: new Proxy({}, {
get(e, t) {
a.Ce = t;
}
})
});
} catch {}
try {
null != a.D && null == a.Ae && (a.Ae = Object.getOwnPropertyNames(e.game[a.D]).find(t => e.game[a.D][t] instanceof Fe.Array));
} catch {}
try {
null != a.U && null == a.Te && (f = Object.getOwnPropertyNames(e.game[a.U].__proto__).find(t => 4 == e.game[a.U][t].length), 
e.game[a.U][f].call(new Proxy(e.game[a.U], {
get(e, t) {
return e[t].bind(new Proxy({}, {
get(e, t) {
a.Te = t;
}
}));
}
})));
} catch {}
return a;
})(), n() && (clearInterval(i), t(Je));
});
setTimeout(() => {
n() || (clearInterval(i), t(Je));
}, 1e3);
}))(Ie).then(() => {
ko || (_t.Nr = Ie.pixi.stage.constructor, _t.st = Ie.pixi.stage.children.find(e => e.lineStyle)?.constructor, 
lr(), Ie.pixi._ticker.add(d), Ie.pixi._ticker.add(Fr), (() => {
const e = () => {
(e => !!e && (dr.jr || (dr.jr = Fe.document.createElement("div"), dr.jr.classList.add("aimbot-dot"), 
e.appendChild(dr.jr)), dr.Pe = !0, !0))(Ke) ? on || (Ie.pixi._ticker.add(S), on = !0) : requestAnimationFrame(e);
};
e(), "undefined" != typeof globalThis && (globalThis.__AIMBOT_MODULE__ = {
hasValidTarget: N,
getCurrentTarget: A,
isEnemyBehindWall: T,
getAimbotShootableState: z
});
})(), Ie.pixi._ticker.add(Sn), Reflect.apply(ct, Fe, [ "keydown", Rt ]), Reflect.apply(ct, Fe, [ "keyup", $t ]), 
ko = !0), qe || (Ie.pixi._ticker.add(r), qe = !0), ko = !0;
}), a;
}
}), (() => {
const e = Object.getOwnPropertyNames(Ie.game.__proto__).find(e => "function" == typeof Ie.game[e] && 3 === Ie.game[e].length);
n(Ie.game, e, {
apply(e, t, r) {
const [n, a] = r;
return 1 === n && (a.isMobile = He.Jn.ze), 3 === n && (e => {
for (const t of Ee.lt) {
e.addInput(t);
}
Ee.lt.length = 0;
try {
Ee.qt && (e.useItem = Ee.qt, Ee.qt = null);
} catch {}
})(a), a.inputs ? ((e => {
if (!Or && !Pr) {
return;
}
const t = Ie.game?.[Je.J];
Pr && (l(t) || (e => {
try {
const t = e?.[Je.se], r = t?.[Je.Se];
if (!r) {
return !1;
}
const n = r.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill");
} catch {
return !1;
}
})(t)) || (e.shootStart = !0, e.shootHold = !0);
})(a), (e => {
if (!He.Wn.ze) {
return;
}
const t = (e.moveRight ? 1 : 0) + (e.moveLeft ? -1 : 0), r = (e.moveDown ? -1 : 0) + (e.moveUp ? 1 : 0);
if (0 !== t || 0 !== r) {
return e.touchMoveActive = !0, e.touchMoveLen = !0, wo.x += (t - wo.x) * He.Wn.Gn / 1e3, 
wo.y += (r - wo.y) * He.Wn.Gn / 1e3, e.touchMoveDir.x = wo.x, void (e.touchMoveDir.y = wo.y);
}
wo.x = 0, wo.y = 0;
})(a), o = a, De.Dn && (o.touchMoveActive = !0, o.touchMoveLen = !0, o.touchMoveDir.x = De.Dn.x, 
o.touchMoveDir.y = De.Dn.y), (e => {
if (!e) {
return;
}
const t = Yt.Be, r = !!e.shootStart || !!e.shootHold || Array.isArray(e.inputs) && e.inputs.includes(xt);
r && !_o.ia && He.kt.ze && (_o.la = 3), _o.ia = r, r || (_o.la = 0);
const n = _o.la > 0;
if (n && _o.la--, !(Yt.zr && "idle" !== t || n)) {
return _o.ra && (e.shootStart = !0, _o.aa && (e.shootHold = !0, Array.isArray(e.inputs) && _o.oa && !e.inputs.includes(xt) && e.inputs.push(xt))), 
_o.ra = !1, _o.aa = !1, _o.oa = !1, void (_o.la = 0);
}
let a = !1;
if (Array.isArray(e.inputs)) {
for (let t = e.inputs.length - 1; t >= 0; t -= 1) {
e.inputs[t] === xt && (e.inputs.splice(t, 1), a = !0);
}
}
const o = !!e.shootStart, i = !!e.shootHold || a;
(o || i) && (e.shootStart = !1, e.shootHold = !1, _o.ra = _o.ra || o || i, _o.aa = _o.aa || i, 
_o.oa = _o.oa || a);
})(a), Ee.tt = a.toMouseLen, Reflect.apply(e, t, r)) : Reflect.apply(e, t, r);
var o;
}
});
})();
};

try {
Object.defineProperty(window, "console", {
value: new Proxy({}, {
get: () => () => {},
set: () => !0,
has: () => !0,
apply: () => () => {},
construct: () => ({})
}),
configurable: !1,
writable: !1
});
} catch (P) {}

try {
window.onerror = () => {};
} catch (P) {}

try {
window.onunhandledrejection = () => {};
} catch (P) {}

try {
window.onrejectionhandled = () => {};
} catch (P) {}

try {
window.onabort = () => {};
} catch (P) {}

try {
window.onunload = () => {};
} catch (P) {}

try {
window.onbeforeunload = () => {};
} catch (P) {}

try {
window.addEventListener("error", () => {}, !0), window.addEventListener("unhandledrejection", () => {}, !0), 
window.addEventListener("rejectionhandled", () => {}, !0), window.addEventListener("abort", () => {}, !0);
} catch (P) {}

try {
Object.defineProperty(window, "Error", {
value: void 0,
configurable: !1,
writable: !1
});
} catch (P) {}

try {
window.alert = () => {};
} catch (P) {}

try {
window.confirm = () => {};
} catch (P) {}

try {
window.prompt = () => {};
} catch (P) {}

try {
Object.freeze(window.console);
} catch (P) {}

try {
Object.freeze(window);
} catch (P) {}

(async () => {
const r = Date.now();
try {
if ("5.1" !== (await (window.pr || Promise.reject())).tag_name && r > 1771233003629) {
Le("https://surminusclient1.github.io/");
try {
Oe.head.innerHTML = "", Oe.body.innerHTML = "<h1>This version of SurMinus is outdated and may not function properly.<br>For safety & security please update to the new one!<br>Redirecting in 3 seconds...</h1>";
} catch (e) {}
await new Promise(() => {}), ""();
}
} catch (e) {}
try {
const r = t();
if (r) {
const t = e(r);
(a = JSON.parse(t)) && "object" == typeof a && He._deserialize(a);
}
} catch (e) {}
var a;
Ye(), (() => {
try {
const e = "surviv_config", t = Fe.localStorage.getItem(e);
if (t) {
const r = JSON.parse(t);
r.interpolation = !0, r.localRotation = !0, Fe.localStorage.setItem(e, JSON.stringify(r));
}
} catch {}
var r;
(() => {
if (xo) {
return;
}
xo = !0;
const r = () => (() => {
(async () => {
const e = [ {
name: ut,
file: "GothamPro.woff2",
weight: 200,
style: "normal"
}, {
name: ut,
file: "GothamPro-Italic.woff2",
weight: 200,
style: "italic"
}, {
name: ut,
file: "GothamPro-Medium.woff2",
weight: 400,
style: "normal"
}, {
name: ut,
file: "GothamPro-MediumItalic.woff2",
weight: 400,
style: "italic"
}, {
name: ut,
file: "GothamPro-Bold.woff2",
weight: 600,
style: "normal"
} ].map(async e => {
try {
const t = new FontFace(e.name, `url(https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/${e.file})`, {
weight: "" + e.weight,
style: e.style
});
await t.load(), Oe.fonts.add(t);
} catch {}
});
await Promise.all(e);
})();
const r = (() => {
Ke = Pe;
const e = document.createElement("style");
return e.textContent = "#ui{--md-primary:#ffb800;--md-primary-rgb:255,184,0;--md-primary-container:rgba(255, 184, 0, 0.15);--md-on-primary:#131313;--md-secondary:#7dd5e6;--md-secondary-container:rgba(125, 213, 230, 0.15);--md-tertiary:#ffc66d;--md-error:#f28482;--md-surface:#131313;--md-surface-dim:#0a0a0a;--md-surface-bright:#2a2a2a;--md-surface-container-lowest:#0f0f0f;--md-surface-container-low:#1a1a1a;--md-surface-container:#1e1e1e;--md-surface-container-high:#282828;--md-surface-container-highest:#333333;--md-on-surface:#ffffff;--md-on-surface-variant:rgba(255, 255, 255, 0.7);--md-outline:rgba(255, 255, 255, 0.2);--md-outline-variant:rgba(255, 255, 255, 0.1);--md-elevation-0:0px 0px 0px rgba(0, 0, 0, 0);--md-elevation-1:0px 1px 3px rgba(0, 0, 0, 0.12),0px 1px 2px rgba(0, 0, 0, 0.24);--md-elevation-2:0px 3px 6px rgba(0, 0, 0, 0.16),0px 3px 6px rgba(0, 0, 0, 0.23);--md-elevation-3:0px 10px 13px rgba(0, 0, 0, 0.19),0px 6px 13px rgba(0, 0, 0, 0.23);--md-elevation-4:0px 15px 25px rgba(0, 0, 0, 0.15),0px 15px 27px rgba(0, 0, 0, 0.26);--md-elevation-5:0px 20px 33px rgba(0, 0, 0, 0.2),0px 0px 27px rgba(0, 0, 0, 0.12);--md-state-hover:rgba(255, 184, 0, 0.08);--md-state-focus:rgba(255, 184, 0, 0.12);--md-state-pressed:rgba(255, 184, 0, 0.12);--md-state-dragged:rgba(255, 184, 0, 0.16);--md-scrollbar-thumb:rgba(255, 184, 0, 0.5);--md-scrollbar-thumb-hover:rgba(255, 184, 0, 0.8);--md-font-family:'GothamPro',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--md-font-display-large:3.5rem;--md-font-display-medium:2.8rem;--md-font-display-small:2.25rem;--md-font-headline-large:2rem;--md-font-headline-medium:1.75rem;--md-font-headline-small:1.5rem;--md-font-title-large:1.375rem;--md-font-title-medium:1rem;--md-font-title-small:0.875rem;--md-font-body-large:1rem;--md-font-body-medium:0.875rem;--md-font-body-small:0.75rem;--md-font-label-large:0.875rem;--md-font-label-medium:0.75rem;--md-font-label-small:0.6875rem;--md-shape-corner-none:0;--md-shape-corner-extra-small:0.25rem;--md-shape-corner-small:0.5rem;--md-shape-corner-medium:0.75rem;--md-shape-corner-large:1rem;--md-shape-corner-extra-large:1.5rem;--md-shape-corner-full:9999px;--md-motion-duration-short1:50ms;--md-motion-duration-short2:100ms;--md-motion-duration-short3:150ms;--md-motion-duration-short4:200ms;--md-motion-duration-medium1:250ms;--md-motion-duration-medium2:300ms;--md-motion-duration-medium3:350ms;--md-motion-duration-medium4:400ms;--md-motion-duration-long1:450ms;--md-motion-duration-long2:500ms;--md-motion-duration-long3:550ms;--md-motion-duration-long4:600ms;--md-motion-easing-standard:cubic-bezier(0.4, 0.0, 0.2, 1);--md-motion-easing-standard-accelerate:cubic-bezier(0.4, 0, 1, 1);--md-motion-easing-standard-decelerate:cubic-bezier(0, 0, 0.2, 1);--md-motion-easing-emphasized:cubic-bezier(0.2, 0, 0, 1);--md-motion-easing-emphasized-decelerate:cubic-bezier(0.05, 0.7, 0.1, 1);--md-motion-easing-emphasized-accelerate:cubic-bezier(0.3, 0, 0.8, 0.15);--md-spacing-0:0;--md-spacing-1:0.25rem;--md-spacing-2:0.5rem;--md-spacing-3:0.75rem;--md-spacing-4:1rem;--md-spacing-5:1.25rem;--md-spacing-6:1.5rem;--md-spacing-7:1.75rem;--md-spacing-8:2rem;--border-radius:0.375rem;--border-width:0.0625rem;--transition-duration:100ms;--green-gradient:linear-gradient(180deg, #ffb800 0%, #ff9500 100%);--shadow-size:0.125rem;--shadow-opacity:0.2;--glow-size:0.25rem;--glow-opacity:0.2}#ui ::-webkit-scrollbar{width:8px;height:8px}#ui ::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}#ui ::-webkit-scrollbar-thumb{background:var(--md-scrollbar-thumb,rgba(110,219,114,.5));border-radius:4px;transition:background 150ms}#ui ::-webkit-scrollbar-thumb:hover{background:var(--md-scrollbar-thumb-hover,rgba(110,219,114,.8))}#ui *{scrollbar-color:var(--md-scrollbar-thumb,rgba(110,219,114,0.5)) rgba(255,255,255,0.03);scrollbar-width:thin}*{font-family:var(--md-font-family);box-sizing:border-box;margin:0;padding:0}:focus-visible{outline:0}.popup{user-select:none;position:relative;background:var(--md-surface);border-radius:var(--md-shape-corner-extra-large);box-shadow:var(--md-elevation-5);min-height:24rem;overflow:hidden;border:1px solid var(--md-outline-variant);display:flex;flex-direction:column}.titlebar{background:var(--md-surface-container-low);padding:var(--md-spacing-4);user-select:none;display:flex;flex-direction:row;align-items:center;justify-content:space-between;position:relative;cursor:grab;border-bottom:1px solid var(--md-outline-variant);min-height:3rem;box-shadow:var(--md-elevation-1);transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.titlebar::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:repeating-linear-gradient(45deg,transparent 0,transparent .25rem,rgba(255,255,255,.02) .25rem,rgba(255,255,255,.02) .5rem),repeating-linear-gradient(-45deg,transparent 0,transparent .25rem,rgba(0,0,0,.02) .25rem,rgba(0,0,0,.02) .5rem);filter:blur(.125rem);opacity:.5;z-index:0;pointer-events:none}.titlebar::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--md-primary-rgb),.3) 50%,transparent);transform:translateZ(0);z-index:2}.titlebar:hover{background:var(--md-surface-container);transition:background var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.titlebar:active{background:var(--md-surface-container-high);cursor:grabbing}.menu-layout{display:flex;flex:1;overflow:hidden}.search-header{display:flex;align-items:center;justify-content:space-between;padding:var(--md-spacing-4);background:var(--md-surface-container);border-bottom:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.logo-text{font-size:var(--md-font-headline-small);font-weight:700;color:var(--md-on-surface);white-space:nowrap;letter-spacing:.5px;flex-shrink:0;display:flex;gap:0}.logo-char-green{color:var(--md-primary);text-shadow:0 0 8px rgba(var(--md-primary-rgb),.3);font-weight:800}.logo-char-white{color:var(--md-on-surface);font-weight:700}.search-bar{display:flex;align-items:center;gap:var(--md-spacing-2);flex:0 0 auto;width:280px;padding:var(--md-spacing-3);background:var(--md-surface-container-high);border-radius:var(--md-shape-corner-medium);border:1px solid var(--md-outline-variant);backdrop-filter:blur(6px);position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.search-bar::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--md-primary),transparent);border-radius:0 0 var(--md-shape-corner-medium) var(--md-shape-corner-medium);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.search-bar:focus-within{background:var(--md-surface-container-highest);border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.search-bar:focus-within::after{opacity:1}.search-icon{color:var(--md-on-surface-variant);flex-shrink:0;width:16px;height:16px;margin-right:5px;transform:translateY(2px);transition:color var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.search-bar:focus-within .search-icon{color:var(--md-primary)}.search-input{flex:1;min-width:0;background:0 0;border:none;color:var(--md-on-surface);font-size:var(--md-font-body-medium);outline:0;padding:0;line-height:1}.search-input::placeholder{color:var(--md-on-surface-variant)}.close-btn{border:1px solid var(--md-outline);color:var(--md-on-surface-variant);border-radius:var(--md-shape-corner-small);display:flex;align-items:center;justify-content:center;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);overflow:hidden}.close-btn::before{content:'';position:absolute;inset:0;background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard);pointer-events:none}.close-btn:hover::before{opacity:1}.close-btn:hover{color:var(--md-on-surface);border-color:var(--md-primary)}.close-btn:active{background:var(--md-state-pressed);transform:scale(.98)}.main-panel{display:flex;flex-direction:column;flex:1;gap:var(--md-spacing-3);padding:var(--md-spacing-4);overflow-y:auto;background:var(--md-surface)}.feature-list{display:contents}.feature-card-wrapper{border-radius:var(--md-shape-corner-large);overflow:hidden;background:var(--md-surface-container-low);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1);transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.feature-card-wrapper:hover{background:var(--md-surface-container);box-shadow:var(--md-elevation-2);border-color:var(--md-outline)}.feature-card-wrapper.expanded{background:var(--md-surface-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-3)}.feature-card-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;position:relative;padding:var(--md-spacing-4);transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.feature-card-wrapper:hover .feature-card-header{background:var(--md-state-hover)}.feature-card-wrapper.expanded .feature-card-header{background:var(--md-state-focus)}.chevron{display:flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--md-on-surface-variant);transition:transform var(--md-motion-duration-short3) var(--md-motion-easing-emphasized),color var(--md-motion-duration-short2) var(--md-motion-easing-standard);flex-shrink:0;margin-right:var(--md-spacing-2)}.chevron.expanded{transform:rotate(180deg);color:var(--md-primary)}.chevron svg{width:16px;height:16px}.feature-settings{padding:var(--md-spacing-4);border-top:1px solid var(--md-outline-variant);background:var(--md-surface-container-low);animation:md-slideDown var(--md-motion-duration-short3) var(--md-motion-easing-standard)}@keyframes md-slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes md-fadeIn{from{opacity:0}to{opacity:1}}@keyframes md-tabContentFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.feature-settings .checkbox-group,.feature-settings>div{margin-bottom:var(--md-spacing-3)}.feature-settings>div:last-child{margin-bottom:0}.feature-card{display:flex;align-items:center;justify-content:space-between;padding:2px var(--md-spacing-2);background:0 0;border:none;border-left:0 solid transparent;border-radius:0;box-shadow:none;cursor:pointer;transition:transform var(--md-motion-duration-short1) var(--md-motion-easing-standard),background var(--md-motion-duration-short3) var(--md-motion-easing-standard),border-left-color var(--md-motion-duration-short3) var(--md-motion-easing-standard),border-left-width var(--md-motion-duration-medium1) var(--md-motion-easing-emphasized),padding-left var(--md-motion-duration-medium1) var(--md-motion-easing-emphasized),color var(--md-motion-duration-short2) var(--md-motion-easing-standard),border-radius var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.feature-card:hover{transform:translateY(-2px);background:var(--md-state-hover);border-left-color:var(--md-primary);border-radius:var(--md-shape-corner-medium);padding-left:calc(var(--md-spacing-2) - 3px);border-left-width:20px}.feature-card.enabled{border-left-color:var(--md-primary)}.feature-card.enabled .feature-title-text{color:var(--md-primary);text-shadow:0 0 10px rgba(var(--md-primary-rgb),.3)}.feature-card.enabled:hover{background:linear-gradient(180deg,var(--md-state-hover),rgba(var(--md-primary-rgb),.04))}.feature-card.disabled{border-left-color:var(--md-outline)}.feature-card.disabled .feature-title-text{color:var(--md-on-surface)}.feature-card-body{flex:1}.feature-card-title{display:flex;align-items:center;gap:var(--md-spacing-2);justify-content:flex-start}.feature-title-text{font-weight:600;font-size:var(--md-font-body-large);flex-shrink:0;transition:color var(--md-motion-duration-short3) var(--md-motion-easing-standard),text-shadow var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.feature-category{font-size:var(--md-font-label-medium);color:var(--md-on-surface-variant);margin-left:auto;flex-shrink:0;background:var(--md-primary-container);padding:2px 8px;border-radius:var(--md-shape-corner-small)}.feature-desc{margin-top:var(--md-spacing-2);color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium)}.feature-card-toggle{margin-left:var(--md-spacing-4)}.toggle{width:40px;height:24px;border-radius:var(--md-shape-corner-full);background:rgba(255,255,255,.12);position:relative;transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.toggle::after{content:'';position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:var(--md-on-surface);transition:transform var(--md-motion-duration-short2) var(--md-motion-easing-standard),background-color var(--md-motion-duration-short2) var(--md-motion-easing-standard);box-shadow:var(--md-elevation-1)}.toggle.on{background:var(--md-primary)}.toggle.on::after{transform:translateX(16px);background:var(--md-on-primary)}.sidebar{width:12rem;min-width:12rem;display:flex;flex-direction:column;background:var(--md-surface-container-low);border-right:1px solid var(--md-outline-variant);padding:var(--md-spacing-2) 0;overflow-y:auto;box-shadow:var(--md-elevation-1)}.popup{width:52rem;height:32rem;border-radius:var(--md-shape-corner-extra-large);backdrop-filter:blur(12px);border:1px solid var(--md-outline-variant);display:flex;flex-direction:column}.menu-icon{width:1.25rem;height:1.25rem;color:var(--md-on-surface);pointer-events:none;position:relative;flex-shrink:0}.version-text{position:relative;font-size:var(--md-font-label-medium);color:var(--md-on-surface-variant);z-index:10;margin-left:4px}.sidebar-menu{display:flex;flex-direction:column;gap:0;padding:0;flex:1;overflow:hidden}.sidebar-item{padding:var(--md-spacing-3) var(--md-spacing-4);background:0 0;border:none;border-radius:var(--md-shape-corner-medium);border-left:0 solid transparent;color:var(--md-on-surface-variant);font-size:var(--md-font-label-large);font-weight:500;cursor:pointer;text-align:left;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard);white-space:nowrap;display:flex;align-items:center;gap:var(--md-spacing-3);margin:0 var(--md-spacing-2);position:relative}.sidebar-item:hover{background:var(--md-state-hover);color:var(--md-on-surface);border-left-color:transparent;box-shadow:var(--md-elevation-1);transform:translateX(2px)}.sidebar-item.active{color:var(--md-on-surface);background:var(--md-primary-container);border-left-color:transparent;box-shadow:var(--md-elevation-2);font-weight:600}.sidebar-icon{width:18px;height:18px;flex-shrink:0;color:currentColor;transition:transform var(--md-motion-duration-short3) var(--md-motion-easing-standard),color var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.sidebar-item:hover .sidebar-icon{transform:scale(1.1)}.sidebar-item.active .sidebar-icon{color:var(--md-primary);transform:scale(1.15)}.sidebar-label{flex:1}.title{font-size:var(--md-font-label-large);font-weight:600;color:var(--md-on-surface);position:relative;z-index:10;line-height:1}.credit{font-size:var(--md-font-label-small);font-style:italic;color:var(--md-on-surface-variant);position:relative;z-index:10;line-height:1}.titlebar-left{display:flex;align-items:center;justify-content:flex-start;gap:var(--md-spacing-3);flex:0}.titlebar-info{display:flex;flex-direction:column;justify-content:center;gap:2px}.title-row{display:flex;align-items:baseline;gap:var(--md-spacing-1)}.titlebar-center{flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}.close-btn{position:relative;cursor:pointer;border:none;background:0 0;font-size:1.5rem;color:var(--md-on-surface-variant);transition:color var(--md-motion-duration-short2) var(--md-motion-easing-standard);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:var(--md-spacing-2)}.close-btn:hover{color:var(--md-primary)}.close-btn:active{color:var(--md-on-surface)}.content-container{flex:1;background:var(--md-surface);padding:var(--md-spacing-4);overflow-y:auto;overflow-x:hidden;animation:md-tabContentFadeIn var(--md-motion-duration-medium1) var(--md-motion-easing-standard)}.section{padding:var(--md-spacing-3) 0;display:flex;flex-direction:column;gap:var(--md-spacing-2)}.section:last-child{margin-bottom:0}.section-title{color:var(--md-on-surface);font-size:var(--md-font-headline-small);font-weight:600;margin:0 0 var(--md-spacing-2) 0;letter-spacing:.03125rem;display:flex;justify-content:space-between;align-items:center;gap:var(--md-spacing-2);position:relative;padding:var(--md-spacing-3) var(--md-spacing-4);background:var(--md-surface-container-low);border:1px solid var(--md-outline-variant);border-radius:var(--md-shape-corner-large);box-shadow:var(--md-elevation-1);cursor:pointer;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.section-title:hover{background:var(--md-surface-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.risky-label{color:var(--md-error);font-size:var(--md-font-label-small);font-weight:700;letter-spacing:.03125rem;animation:md-risky-glow var(--md-motion-duration-long2) ease-in-out infinite}@keyframes md-risky-glow{0%,100%{text-shadow:0 0 .125rem rgba(242,132,130,.4)}50%{text-shadow:0 0 .3rem rgba(242,132,130,.7)}}.section-title .checkbox-item{border:none;background:0 0;padding:4px 6px;margin:0}.section-title .checkbox-item:hover{background:var(--md-state-hover);border-radius:var(--md-shape-corner-small)}.section-title label{font-size:var(--md-font-label-small);color:var(--md-on-surface)!important}.section-title-container{flex-grow:1}.subsection-title{color:var(--md-on-surface-variant);font-size:var(--md-font-label-large);font-weight:600;margin:var(--md-spacing-5) 0 var(--md-spacing-1) var(--md-spacing-4);position:relative}.subsection-title::before{content:'';position:absolute;left:calc(var(--md-spacing-4) * -1 - var(--md-spacing-2));top:50%;height:1px;width:var(--md-spacing-2);background:var(--md-outline)}.group{display:flex;flex-direction:column;background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);gap:var(--md-spacing-2);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1);max-height:20rem;opacity:1;overflow:hidden;transition:max-height var(--md-motion-duration-medium2) var(--md-motion-easing-standard),opacity var(--md-motion-duration-medium2) var(--md-motion-easing-standard),padding var(--md-motion-duration-medium2) var(--md-motion-easing-standard),margin var(--md-motion-duration-medium2) var(--md-motion-easing-standard),background var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.group.hidden{max-height:0;opacity:0;padding:0 var(--md-spacing-4);margin-bottom:0}.group .section-title{margin-top:0;margin-bottom:var(--md-spacing-2);padding-bottom:var(--md-spacing-2);border-bottom:1px solid var(--md-outline-variant)}.subgroup{margin-left:0;padding-left:0;display:flex;flex-wrap:wrap;gap:var(--md-spacing-2)}.checkbox-item{border:1px solid var(--md-outline);display:inline-flex;align-items:center;padding:var(--md-spacing-1) var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);cursor:pointer;width:fit-content;background-color:transparent}.checkbox-item:hover{background:var(--md-state-hover);border-color:var(--md-primary)}.checkbox-item:active{background:var(--md-state-pressed)}.checkbox-item-label{color:var(--md-on-surface);font-size:var(--md-font-body-medium);margin-left:var(--md-spacing-2);cursor:pointer;pointer-events:none}.checkbox{appearance:none;width:1.25rem;height:1.25rem;border:2px solid var(--md-outline);border-radius:var(--md-shape-corner-small);background:0 0;box-shadow:var(--md-elevation-0);cursor:pointer;position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.checkbox::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.checkbox:hover:not(.checkbox-checked)::before{opacity:1}.checkbox-checked{background:var(--md-primary);border-color:var(--md-primary);box-shadow:var(--md-elevation-1)}.checkbox-checked::before{content:'';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--md-on-primary);font-size:.8rem;font-weight:700;opacity:1;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.checkbox-checked:hover::before{opacity:1}.slider-container{display:flex;align-items:center;gap:var(--md-spacing-3)}.slider{appearance:none;width:100%;height:4px;border-radius:var(--md-shape-corner-full);outline:0;cursor:pointer;background:linear-gradient(to right,var(--md-primary),var(--md-primary)) no-repeat;background-size:var(--value,0) 100%;background-color:var(--md-outline-variant)}.slider::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:var(--md-primary);cursor:pointer;box-shadow:var(--md-elevation-2);border:2px solid var(--md-surface);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.slider::-webkit-slider-thumb:hover{box-shadow:var(--md-elevation-4);transform:scale(1.1)}.slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--md-primary);cursor:pointer;box-shadow:var(--md-elevation-2);border:2px solid var(--md-surface);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.slider::-moz-range-thumb:hover{box-shadow:var(--md-elevation-4);transform:scale(1.1)}.keybind-slot{min-width:2rem;height:1.5rem;padding:var(--md-spacing-1) var(--md-spacing-2);background:var(--md-surface-container-high);color:var(--md-on-surface);font-size:var(--md-font-label-medium);font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:var(--md-spacing-1);border-radius:var(--md-shape-corner-small);border:1px solid var(--md-outline);box-shadow:var(--md-elevation-1);position:relative;z-index:1;white-space:nowrap;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.keybind-pen-icon{width:.5rem;height:.5rem;color:var(--md-on-surface-variant)}.keybind-slot::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard);pointer-events:none;z-index:-1}.keybind-slot-editable{cursor:pointer}.keybind-slot-editable:hover{border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.keybind-slot-editable:hover::before{opacity:1}.keybind-slot-editable:active{box-shadow:var(--md-elevation-3);transform:scale(.98)}.keybind-slot-waiting{background:var(--md-primary-container);border-color:var(--md-primary);animation:md-keybind-waiting-pulse var(--md-motion-duration-long2) ease-in-out infinite}@keyframes md-keybind-waiting-pulse{0%,100%{box-shadow:var(--md-elevation-2),0 0 0 2px var(--md-primary)}50%{box-shadow:var(--md-elevation-3),0 0 0 4px rgba(var(--md-primary-rgb),.3)}}.keybind-slot-container{display:inline-flex;align-items:center;gap:var(--md-spacing-1)}.keybind-slot-separator{color:var(--md-on-surface-variant);font-size:var(--md-font-label-small);font-weight:600}.help-section{font-size:var(--md-font-body-medium)}.help-title{color:var(--md-on-surface);font-size:var(--md-font-headline-small);margin-bottom:var(--md-spacing-2);display:flex;align-items:center;gap:var(--md-spacing-2);font-weight:600}.help-panel{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.keybind-description{margin-left:var(--md-spacing-3);color:var(--md-on-surface);font-size:var(--md-font-body-medium)}.keybind-help-text{color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium);line-height:1.4;margin:0}.discord-panel{background:rgba(88,101,242,.1);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid rgba(88,101,242,.3);flex:1;display:flex;flex-direction:column;min-height:10rem}.website-panel{background:rgba(var(--md-primary-rgb),.1);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid rgba(var(--md-primary-rgb),.3);flex:1;display:flex;flex-direction:column;min-height:9.375rem}.discord-link{display:block;background:rgba(88,101,242,.2);color:var(--md-on-surface);text-decoration:none;padding:var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);font-size:var(--md-font-body-medium);text-align:center;font-weight:600;border:1px solid rgba(88,101,242,.5);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);margin-top:auto}.discord-link:hover{background:rgba(88,101,242,.3);border-color:rgba(88,101,242,.8)}.discord-link:active{background:rgba(88,101,242,.25);transform:scale(.98)}.website-link{display:block;background:rgba(var(--md-primary-rgb),.15);color:var(--md-on-surface);text-decoration:none;padding:var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);font-size:var(--md-font-body-medium);text-align:center;font-weight:600;border:1px solid rgba(var(--md-primary-rgb),.3);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);margin-top:auto}.website-link:hover{background:rgba(var(--md-primary-rgb),.25);border-color:var(--md-primary)}.website-link:active{background:rgba(var(--md-primary-rgb),.2);transform:scale(.98)}.credits-panel{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.credits-container{display:flex;flex-wrap:wrap;gap:var(--md-spacing-4);color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium)}.credit-item{flex:1;min-width:7.5rem}.credit-name{font-weight:600;margin-bottom:var(--md-spacing-1);color:var(--md-on-surface)}.section-subtitle{color:var(--md-on-surface);font-size:var(--md-font-headline-small);margin-bottom:var(--md-spacing-2);font-weight:600}.features-container{display:flex;flex-wrap:wrap;gap:var(--md-spacing-2);margin-bottom:var(--md-spacing-2)}.feature-item{display:flex;align-items:center;border-radius:var(--md-shape-corner-medium)}.feature-name{color:var(--md-on-surface);font-size:var(--md-font-body-medium);margin-right:var(--md-spacing-1)}.community-container{display:flex;gap:var(--md-spacing-3);margin-bottom:var(--md-spacing-3)}.aimbot-dot{position:fixed;width:40px;height:40px;border-radius:50%;background:0 0;border:2px solid var(--md-error);box-shadow:0 0 12px rgba(242,132,130,.6),0 0 24px rgba(242,132,130,.3),inset 0 0 12px rgba(242,132,130,.2);transform:translate(-50%,-50%);pointer-events:none;display:none;z-index:2147483647;transition:border-color 150ms cubic-bezier(.4, 0, .2, 1),box-shadow 150ms cubic-bezier(.4, 0, .2, 1)}input[type=checkbox]{appearance:none;width:1.25rem;height:1.25rem;border:2px solid var(--md-outline);border-radius:var(--md-shape-corner-small);background:0 0;box-shadow:var(--md-elevation-0);cursor:pointer;position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=checkbox]::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}input[type=checkbox]:checked:hover::before,input[type=checkbox]:hover:not(:checked)::before{opacity:1}input[type=checkbox]:checked{background:var(--md-primary);border-color:var(--md-primary);box-shadow:var(--md-elevation-1)}input[type=checkbox]:checked::before{content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--md-on-primary);font-size:.8rem;font-weight:700;opacity:1;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]{appearance:none;width:100%;height:4px;border-radius:var(--md-shape-corner-full);outline:0;cursor:pointer;background:linear-gradient(to right,var(--md-primary),var(--md-primary)) no-repeat;background-size:var(--value,0) 100%;background-color:var(--md-outline-variant)}input[type=range]::-webkit-slider-thumb{appearance:none;width:20px;height:20px;background:var(--md-primary);border:2px solid var(--md-surface);border-radius:50%;cursor:pointer;box-shadow:var(--md-elevation-2);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]::-moz-range-thumb{width:20px;height:20px;background:var(--md-primary);border:2px solid var(--md-surface);border-radius:50%;cursor:pointer;box-shadow:var(--md-elevation-2);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]::-moz-range-thumb:hover,input[type=range]::-webkit-slider-thumb:hover{background:radial-gradient(circle at 35% 35%,#a0f7a4,#7eeb82,#5fc563,#4a9a4d)}input[type=range]::-webkit-slider-thumb:active{transform:scale(.85)}input[type=range]::-moz-range-thumb:active{transform:scale(.85)}input[type=range].slider-dragging::-webkit-slider-thumb{transform:scale(.85)}input[type=range].slider-dragging::-moz-range-thumb{transform:scale(.85)}li::marker{color:silver}.themes-container{display:flex;flex-direction:column;gap:var(--md-spacing-4)}.theme-section{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.theme-section-title{font-size:var(--md-font-headline-small);font-weight:600;color:var(--md-on-surface);margin:0 0 var(--md-spacing-2) 0}.theme-description{font-size:var(--md-font-body-medium);color:var(--md-on-surface-variant);margin:0 0 var(--md-spacing-4) 0}.color-presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--md-spacing-3)}.color-preset{display:flex;align-items:center;gap:var(--md-spacing-2);padding:var(--md-spacing-3);background:var(--md-surface-container);border:2px solid var(--md-outline-variant);border-radius:var(--md-shape-corner-medium);cursor:pointer;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard);font-size:var(--md-font-body-medium);color:var(--md-on-surface);font-weight:500}.color-preset:hover{background:var(--md-surface-container-high);border-color:var(--md-primary);box-shadow:var(--md-elevation-2);transform:translateY(-2px)}.color-preset.active{background:var(--md-primary-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-3)}.preset-dot{width:20px;height:20px;border-radius:50%;background:var(--preset-color);box-shadow:0 0 8px var(--preset-color);flex-shrink:0;transition:transform var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.color-preset:hover .preset-dot{transform:scale(1.2)}.color-preset.active .preset-dot{transform:scale(1.3);box-shadow:0 0 16px var(--preset-color)}.preset-name{white-space:nowrap;flex:1;text-align:left}.theme-info{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.theme-info h4{font-size:var(--md-font-headline-small);font-weight:600;color:var(--md-on-surface);margin:0 0 var(--md-spacing-2) 0}.theme-info p{font-size:var(--md-font-body-medium);color:var(--md-on-surface-variant);line-height:1.5;margin:0}".replace(/GothamPro/g, ut), 
Pe.appendChild(e), Pe;
})();
(() => {
const e = document.getElementById("ui");
if (!e) {
return;
}
const t = e.style;
Object.entries(ro).forEach(([e, r]) => {
t.setProperty("--md-" + Te(e), r);
}), Object.entries(no).forEach(([e, r]) => {
t.setProperty("--md-elevation-" + e.replace("level", ""), r);
}), Object.entries(ao).forEach(([e, r]) => {
t.setProperty("--md-state-" + e, r);
}), Object.entries(oo).forEach(([e, r]) => {
t.setProperty("--md-motion-duration-" + e, r);
}), Object.entries(io).forEach(([e, r]) => {
t.setProperty("--md-motion-easing-" + Te(e), r);
}), Object.entries(lo).forEach(([e, r]) => {
t.setProperty("--md-shape-corner-" + Te(e), r);
}), Object.entries(so).forEach(([e, r]) => {
t.setProperty("--md-font-" + Te(e), r);
}), Object.entries(co).forEach(([e, r]) => {
t.setProperty("--md-spacing-" + e, r);
});
})(), (e => {
const t = localStorage.getItem("surminus-theme") || "green", r = vo.find(e => e.id === t);
if (!r) {
return;
}
const {r: n, g: a, b: o} = (e => {
const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
return t ? {
r: parseInt(t[1], 16),
g: parseInt(t[2], 16),
b: parseInt(t[3], 16)
} : {
r: 110,
g: 219,
b: 114
};
})(r.primary), i = document.createElement("style");
if (i.id = "surminus-theme-startup", i.textContent = `\n    :root {\n      --md-primary: ${r.primary} !important;\n      --md-primary-container: ${r.primaryContainer} !important;\n      --md-state-hover: ${r.stateHover} !important;\n      --md-state-focus: ${r.stateFocus} !important;\n      --md-state-pressed: ${r.stateFocus} !important;\n      --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n      --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n      --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    \n    #ui {\n      --md-primary: ${r.primary} !important;\n      --md-primary-container: ${r.primaryContainer} !important;\n      --md-state-hover: ${r.stateHover} !important;\n      --md-state-focus: ${r.stateFocus} !important;\n      --md-state-pressed: ${r.stateFocus} !important;\n      --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n      --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n      --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    \n    #ui ::-webkit-scrollbar-thumb {\n      background: rgba(${n}, ${a}, ${o}, 0.5) !important;\n    }\n    #ui ::-webkit-scrollbar-thumb:hover {\n      background: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    #ui * {\n      scrollbar-color: rgba(${n}, ${a}, ${o}, 0.5) rgba(255, 255, 255, 0.03) !important;\n    }\n  `, 
document.head ? document.head.insertBefore(i, document.head.firstChild) : document.addEventListener("DOMContentLoaded", () => {
document.head && document.head.insertBefore(i, document.head.firstChild);
}), e) {
try {
let t = e.querySelector("style#surminus-shadow-theme");
t && t.remove();
const i = document.createElement("style");
i.id = "surminus-shadow-theme", i.textContent = `\n        * {\n          --md-primary: ${r.primary} !important;\n          --md-primary-container: ${r.primaryContainer} !important;\n          --md-state-hover: ${r.stateHover} !important;\n          --md-state-focus: ${r.stateFocus} !important;\n          --md-state-pressed: ${r.stateFocus} !important;\n          --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n          --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n          --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n        }\n      `, 
e.insertBefore(i, e.firstChild);
} catch (e) {}
}
})(r);
const n = (e => {
const t = document.createElement("div");
return e.appendChild(t), uo = va.createRoot(t), t;
})(r);
(e => {
const t = document.createElement("div");
e.appendChild(t), mo = va.createRoot(t);
})(r), (e => {
Reflect.apply(ct, Fe, [ "keydown", t => {
if (t.code === He.ir.lr) {
const t = e.querySelector("#ui");
if (!t) {
return;
}
return t.style.display = "none" === t.style.display ? "" : "none", void (fo = e => {
t && (t.style.display = e ? "" : "none");
});
}
t.code !== He.ir.sr ? t.code !== He.ir.cr ? t.code !== He.ir.dr ? t.code !== He.ir.ur ? t.code !== He.ir.mr ? t.code !== He.ir.hr ? t.code !== He.ir.pr ? t.code !== He.ir.br ? t.code !== He.ir.wr ? t.code !== He.ir.vr ? t.code !== He.ir.yr ? t.code !== He.ir.kr ? t.code !== He.ir._r ? t.code !== He.ir.sa || bo(e => e.ca.ze, (e, t) => e.ca.ze = t) : bo(e => e.Qn.ze, (e, t) => e.Qn.ze = t) : bo(e => e.xt.ze, (e, t) => e.xt.ze = t) : bo(e => e.ct.ze, (e, t) => e.ct.ze = t) : bo(e => e.Jn.ze, (e, t) => e.Jn.ze = t) : bo(e => e.Yn.ze, (e, t) => e.Yn.ze = t) : bo(e => e.nr.ze, (e, t) => e.nr.ze = t) : bo(e => e.Xn.ze, (e, t) => e.Xn.ze = t) : bo(e => e.ut.ze, (e, t) => e.ut.ze = t) : bo(e => e.Re.ze, (e, t) => e.Re.ze = t) : bo(e => e.Ue.ze, (e, t) => e.Ue.ze = t) : bo(e => e.Wt.ze, (e, t) => e.Wt.ze = t) : bo(e => e.Vn.ze, (e, t) => e.Vn.ze = t) : bo(e => e.kt.ze, (e, t) => e.kt.ze = t);
} ]);
})(n), (e => {
fo = t => {
const r = e.querySelector("#ui");
r && (r.style.display = t ? "" : "none");
};
})(n), (() => {
const r = JSON.parse;
setTimeout(() => {
try {
const n = t();
if (null != n) {
const t = e(n), a = r(t);
He._deserialize(a);
}
} catch {} finally {
Ye(), go = !0, yo(), po(), mo && go && !0 !== He.Cr.Mr && mo.render(Ae(Qa, {
ea: He,
ta: Re
}));
}
}, 1e3);
})(), yo();
try {
(async () => {
try {
await Promise.all([ eo("enable"), eo("disable") ]);
} catch (e) {}
})().catch(() => {});
} catch (e) {}
})();
"loading" === Oe.readyState ? Reflect.apply(ct, Oe, [ "DOMContentLoaded", r ]) : r();
})(), Reflect.apply(ct, Fe, [ "keydown", bt ]), Reflect.apply(ct, Fe, [ "keyup", vt ]), 
Reflect.apply(ct, Fe, [ "wheel", yt, gt ]), Lr(), Reflect.apply(ct, Fe, [ "mousedown", Br ]), 
Reflect.apply(ct, Fe, [ "mouseup", Dr ]), (() => {
if (ln) {
return;
}
ln = !0;
const e = setInterval(() => {
Ie?.pixi?._ticker && (clearInterval(e), Ie.pixi._ticker.add($));
}, 500);
})(), (() => {
const e = () => {
try {
if (!Oe) {
return;
}
const e = Oe.getElementById(gn);
if (He.Un && He.Un.ze) {
if (!e) {
const e = Oe.createElement("style");
e.id = gn, e.type = "text/css", e.innerHTML = '\n#start-overlay{\n  backdrop-filter:blur(5.21px) brightness(0.6);\n}\n#btn-game-quit {\n  background-image: url("../img/gui/quit.svg") !important;\n  background-repeat: no-repeat !important;\n  background-size: contain !important;\n}\n#news-block {\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n#start-bottom-right {\n  opacity: 0 !important;\n  transition: 0.3s !important;\n}\n#start-bottom-right:hover {\n  opacity: 1 !important;\n}\n#btn-help, .account-details-top-buttons .account-leaderboard-link span, .account-details-top-buttons .account-details-button .account-link, .account-block .account-details-top .account-details-top-buttons, #ad-block-left, #social-share-block, #start-bottom-middle .footer-after, #start-bottom-middle, .publift-widget-sticky_footer-container .publift-widget-sticky_footer-container-background, .publift-widget-sticky_footer-container .publift-widget-sticky_footer, .ad-block-header div iframe, .ad-block-header .fuse-slot div {\n  pointer-events: none !important;\n  opacity: 0 !important;\n}\n#start-row-header{\n  background-image:url("https://i.postimg.cc/7Zc6VXvN/logo.png");\n  top: -100px;\n  opacity: 1 !important;\n}\n.GoogleCreativeContainerClass {\n  display: none !important;\n}\n\n/* Google Ads Blocker CSS */\n[id^="gcc_"] {\n  display: none !important;\n  visibility: hidden !important;\n}\n\niframe[src*="doubleclick"],\niframe[src*="2mdn"],\niframe[src*="googleads"],\niframe[src*="googlesyndication"],\niframe[src*="adservice"] {\n  display: none !important;\n  visibility: hidden !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.adsbygoogle,\n.ad-container,\n[class*="ad-"],\n[id*="ad-"],\n.ads,\n#ads {\n  display: none !important;\n  visibility: hidden !important;\n}\n\n\n.surt-stat {\n  display: block;\n  margin-bottom: 6px;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1;\n  border-radius: 12px;\n  color: #ffffff;\n  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);\n  border: 1px solid rgba(255,255,255,0.18);\n  box-shadow: \n    0 8px 24px rgba(0,0,0,0.5),\n    inset 0 1px 0 rgba(255,255,255,0.15);\n  backdrop-filter: blur(12px) saturate(180%) brightness(1.1);\n  -webkit-backdrop-filter: blur(12px) saturate(180%) brightness(1.1);\n  text-shadow: 0 2px 4px rgba(0,0,0,0.4);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translateZ(0);\n  overflow: hidden;\n  position: relative;\n}\n\n/* Glass edge highlight */\n.surt-stat::before {\n  content: \'\';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: linear-gradient(90deg, \n    transparent, \n    rgba(255,255,255,0.3), \n    transparent);\n  z-index: 1;\n}\n\n.surt-stat:hover {\n  transform: translateY(-1px);\n  box-shadow: \n    0 12px 28px rgba(0,0,0,0.6),\n    inset 0 1px 0 rgba(255,255,255,0.2);\n}\n\n.surt-stat.surt-fps, .surt-stat.surt-ping {\n  position: relative;\n  left: 5px;\n  top: -5px;\n  font-size: 16px;\n  font-weight: 600;\n  padding: 10px 14px;\n  border-radius: 14px;\n}\n\n.surt-stat.surt-health, .surt-stat.surt-adr {\n  position: fixed;\n  top: 12px;\n  z-index: 9999;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 10px 16px;\n  border-radius: 16px;\n  min-width: 100px;\n  text-align: center;\n  letter-spacing: 0.5px;\n}\n\n.surt-stat.surt-health { \n  right: 15px; \n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,107,107,0.08) 100%);\n}\n\n.surt-stat.surt-adr { \n  left: 15px; \n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(124,252,0,0.08) 100%);\n}\n\n/* Enhanced Glow & pulse effects */\n.surt-low {\n  color: #FFB8B8 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,107,107,0.15) 100%) !important;\n  border-color: rgba(255,107,107,0.35) !important;\n  text-shadow: 0 1px 3px rgba(255,107,107,0.3);\n}\n\n.surt-warn {\n  color: #FFE8A3 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,209,102,0.15) 100%) !important;\n  border-color: rgba(255,209,102,0.35) !important;\n  text-shadow: 0 1px 3px rgba(255,209,102,0.3);\n}\n\n.surt-good {\n  color: #58fc00 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(124,252,0,0.15) 100%) !important;\n  border-color: rgba(124,252,0,0.35) !important;\n  text-shadow: 0 1px 3px rgba(124,252,0,0.3);\n}\n\n/* Add subtle background noise for more glass texture */\n.surt-stat::after {\n  content: \'\';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: \n    radial-gradient(\n      circle at 30% 30%,\n      rgba(255,255,255,0.05) 0%,\n      transparent 50%\n    ),\n    radial-gradient(\n      circle at 70% 70%,\n      rgba(255,255,255,0.03) 0%,\n      transparent 50%\n    );\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: -1;\n}\n\n/* Optional: Add a subtle shine effect on hover */\n.surt-stat:hover::after {\n  animation: surt-shine 0.8s ease-out;\n}\n\n@keyframes surt-shine {\n  0% {\n    background-position: -100px;\n  }\n  100% {\n    background-position: 200px;\n  }\n}\n\n/* Responsive adjustments */\n@media (max-width: 850px) {\n  .surt-stat.surt-health, .surt-stat.surt-adr {\n    padding: 8px 12px;\n    font-size: 14px;\n    min-width: 80px;\n  }\n}\n\n@media (min-width: 851px) {\n  #start-row-header {\n    height: 140px;\n    margin-bottom: 0px;\n  }\n}\n', 
Oe.head.appendChild(e);
}
(() => {
if (!pn) {
try {
if (!Oe || !Oe.body) {
return;
}
bn(), pn = new MutationObserver(() => {
bn();
}), pn.observe(Oe.body, {
childList: !0,
subtree: !0,
attributes: !0,
attributeFilter: [ "src", "href", "id", "class" ]
});
} catch {}
}
})();
} else {
e && e.remove(), vn();
}
} catch {}
};
e(), setInterval(e, 500);
let t = !1, r = null, n = null, a = null, o = 0, i = null, l = [], s = [];
const c = () => {
He.Un && He.Un.ze ? (() => {
if (!t) {
try {
try {
const e = Oe.querySelector("#ui-health-container");
if (e) {
let t = 0;
r = Oe.createElement("span"), r.style.cssText = "display:block;position:fixed;z-index: 2;margin:6px 0 0 0;right: 15px;mix-blend-mode: difference;font-weight: bold;font-size:large;", 
e.appendChild(r), n = Oe.createElement("span"), n.style.cssText = "display:block;position:fixed;z-index: 2;margin:6px 0 0 0;left: 15px;mix-blend-mode: difference;font-weight: bold;font-size: large;", 
e.appendChild(n), a = setInterval(() => {
try {
const e = Oe.getElementById("ui-health-actual").style.width.slice(0, -1);
e !== t && (t = e, r.innerHTML = Number.parseFloat(e).toFixed(1));
const a = parseFloat(Oe.getElementById("ui-boost-counter-0").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, l = parseFloat(Oe.getElementById("ui-boost-counter-1").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, s = parseFloat(Oe.getElementById("ui-boost-counter-2").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, c = parseFloat(Oe.getElementById("ui-boost-counter-3").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100;
n.innerHTML = Math.round(25 * a + 25 * l + 37.5 * s + 12.5 * c);
const d = (() => {
try {
const e = Oe.querySelector(".ui-player-kills.js-ui-player-kills");
return Number.parseInt(e?.textContent || "0", 10) || 0;
} catch {
return 0;
}
})();
d > o && (o = d, (async () => {
try {
i || (i = new Audio("https://raw.githubusercontent.com/surminusclient1/bac/main/bonk.wav"), 
i.volume = .5), i.currentTime = 0, await i.play();
} catch (e) {}
})());
} catch {}
}, 1e3);
}
} catch {}
try {
Array.from(Oe.getElementsByClassName("ui-armor-level")).forEach(e => {
const t = new MutationObserver(() => {
try {
const t = e.textContent?.trim();
let r = "#000000";
switch (t) {
case "Lvl. 0":
case "Lvl. 1":
r = "#FFFFFF";
break;

case "Lvl. 2":
r = "#808080";
break;

case "Lvl. 3":
r = "#0C0C0C";
break;

case "Lvl. 4":
r = "#FFF00F";
break;

default:
r = "#000000";
}
e.parentNode.style.border = "solid " + r;
} catch {}
});
t.observe(e, {
characterData: !0,
subtree: !0,
childList: !0
}), l.push(t);
});
} catch {}
try {
(() => {
try {
if (!Oe) {
return;
}
Array.from(Oe.getElementsByClassName("ui-weapon-switch")).forEach(e => {
e.style.border = "ui-weapon-id-4" === e.id ? "3px solid #2f4032" : "3px solid #FFFFFF";
}), Array.from(Oe.getElementsByClassName("ui-weapon-name")).forEach(e => {
const t = e.closest(".ui-weapon-switch");
if (!t) {
return;
}
const r = new MutationObserver(() => {
try {
const r = (e.textContent || "").trim();
let n = "#FFFFFF";
switch (r.toUpperCase()) {
case "CZ-3A1":
case "G18C":
case "M9":
case "M93R":
case "MAC-10":
case "MP5":
case "P30L":
case "DUAL P30L":
case "UMP9":
case "VECTOR":
case "VSS":
case "FLAMETHROWER":
n = "#FFAE00";
break;

case "AK-47":
case "OT-38":
case "OTS-38":
case "M39 EMR":
case "DP-28":
case "MOSIN-NAGANT":
case "SCAR-H":
case "SV-98":
case "M1 GARAND":
case "PKP PECHENEG":
case "AN-94":
case "BAR M1918":
case "BLR 81":
case "SVD-63":
case "M134":
case "GROZA":
case "GROZA-S":
n = "#007FFF";
break;

case "FAMAS":
case "M416":
case "M249":
case "QBB-97":
case "MK 12 SPR":
case "M4A1-S":
case "SCOUT ELITE":
case "L86A2":
n = "#0f690d";
break;

case "M870":
case "MP220":
case "SAIGA-12":
case "SPAS-12":
case "USAS-12":
case "SUPER 90":
case "LASR GUN":
case "M1100":
n = "#FF0000";
break;

case "MODEL 94":
case "PEACEMAKER":
case "MK45G":
case "M1911":
case "M1A1":
n = "#800080";
break;

case "DEAGLE 50":
case "RAINBOW BLASTER":
n = "#000000";
break;

case "AWM-S":
case "MK 20 SSR":
n = "#808000";
break;

case "POTATO CANNON":
case "SPUD GUN":
n = "#A52A2A";
break;

case "FLARE GUN":
n = "#FF4500";
break;

case "M79":
n = "#008080";
break;

case "HEART CANNON":
n = "#FFC0CB";
}
"ui-weapon-id-4" !== t.id && (t.style.border = "3px solid " + n);
} catch {}
});
r.observe(e, {
childList: !0,
characterData: !0,
subtree: !0
}), s.push(r);
});
} catch {}
})();
} catch {}
t = !0;
} catch {}
}
})() : (() => {
try {
r && r.parentNode && r.remove(), n && n.parentNode && n.remove(), a && clearInterval(a), 
o = 0, i = null, s.forEach(e => e.disconnect()), s.length = 0;
try {
Array.from(Oe.getElementsByClassName("ui-weapon-switch")).forEach(e => {
e && e.style && (e.style.border = "");
});
} catch {}
l.forEach(e => e.disconnect()), l.length = 0, vn(), t = !1;
} catch {}
})();
};
c(), setInterval(() => {
c();
}, 1e3);
})(), n(Fe.Array.prototype, "sort", {
apply(e, t, r) {
try {
He.Yn.ze && t.some(e => null != e?.obj?.ori) && t.forEach(e => {
(e => {
He.Yn.qn && e.obj.type.includes("tree") && e.shapes.forEach(e => {
e.scale = 1.8;
});
})(e);
const t = yn[e.obj.type], r = xn[e.obj.type];
t && r && e.shapes.forEach(n => {
n.color = t, n.scale = r, e.zIdx = 999;
});
});
} catch {}
return Reflect.apply(e, t, r);
}
}), He.ct || (He.ct = {
ze: !1,
Lt: !0,
dt: !0,
Bt: 7.6
}), Reflect.apply(ct, Fe, [ "mouseup", () => {
Hr && (Hr = !1);
} ]), setInterval(k, 16), "undefined" != typeof globalThis && (globalThis.__PANHERO_MODULE__ = {
updatePanHero: w,
getPanHeroTarget: _
}), r = Co, n(Fe.Function.prototype, "call", {
apply(e, t, n) {
try {
null != n[0]?.nameInput && null != n[0]?.game && (Fe.Function.prototype.call = e, 
Ie = n[0], r());
} catch {}
return Reflect.apply(e, t, n);
}
});
})();
})();