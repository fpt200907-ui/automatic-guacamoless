function e(e, r = "" + Ae) {
const t = r.length;
let n = "";
for (let a = 0; e.length > a; a++) {
const o = Reflect.apply(Ae, e, [ a ]) ^ Reflect.apply(Ae, r, [ a % t ]);
n += Re(o);
}
return n;
}

function r() {
const e = (() => {
const e = je.cookie;
if (!e) {
return null;
}
const r = Pe + "=", t = e.split(";");
for (const e of t) {
const t = e.trim();
if (t.startsWith(r)) {
return t.slice(r.length);
}
}
return null;
})();
return e ? (e => {
if ("string" != typeof e || e.length % 4 != 0) {
return null;
}
let r = "";
for (let t = 0; e.length > t; t += 4) {
const n = e.slice(t, t + 4), a = Number.parseInt(n, 16);
if (Number.isNaN(a)) {
return null;
}
r += String.fromCharCode(a);
}
return r;
})(e) : null;
}

function t() {
if (!Ee.game?.initialized) {
return;
}
const e = De.Re.Te;
try {
(e => {
e && De.Re.je && Ee.game[Ve.A].layers[3].children.forEach(e => {
e._texture?.textureCacheIds && e._texture.textureCacheIds.some(e => e.includes("ceiling") && !e.includes("map-building-container-ceiling-05") || e.includes("map-snow-")) && (e.visible = !1);
});
})(e), e && Ee.game[Ve.D][Ve.ze].forEach(e => {
De.Re.$e && (e.sprite._tintRGB = 1), e.sprite.alpha = De.Re.Fe / 1e3;
}), (e => {
e && Ee.game[Ve.ue][Ve.xe][Ve.ye].forEach(e => {
[ "tree", "table", "stairs", "bush" ].some(r => e.type.includes(r)) && (e.sprite.alpha = De.Re.Oe / 100);
});
})(e);
} catch {}
}

function n(e, r, t) {
try {
const n = e[r];
if (!n || tr.has(n)) {
return;
}
let a = new Proxy(n, t);
Xe.set(a, n), er.set(a, n), rr.set(a, n), tr.add(a), nr.set(a, {
target: e,
name: r,
handler: t,
timestamp: Date.now(),
layer: 1
});
try {
Object.defineProperty(a, Je, {
value: !0,
enumerable: !1
}), Object.defineProperty(a, qe, {
value: n,
enumerable: !1
}), Object.defineProperty(a, Qe, {
value: 0,
writable: !0,
enumerable: !1
});
} catch (e) {}
Object.defineProperty(e, r, {
value: a,
writable: !0,
enumerable: !1,
configurable: !0
});
} catch (e) {}
}

function a(e) {
return Object.keys(Ee.game[Ve.j].teamInfo).find(r => Ee.game[Ve.j].teamInfo[r].playerIds.includes(e.__id));
}

function o(e) {
const r = e[Ve.se][Ve.Se];
return r && xr[r] ? xr[r] : null;
}

function i(e) {
return e ? xr[e.bulletType] : null;
}

function l(e) {
if (!Ur.Pe) {
return;
}
const {Be: r, Le: t, De: n, Ee: a} = e, o = r ?? "idle", i = performance.now();
if (at(i), "idle" === o) {
tt();
const e = Vr(Ur.He), r = Ur.Ie ?? Vr(e);
if (!a && Yr(r, e)) {
const t = et(r, e);
Ur.Ke = {
startPos: Vr(r),
targetPos: Vr(e),
startTime: i,
duration: t
}, nt(t);
} else {
Ur.Ke = null, rt(null);
}
Ur.Be = "idle", Ur.We = null;
} else {
tt();
const e = t ? {
x: t.x,
y: t.y
} : Vr(Ur.He), r = Ur.Ie ?? Vr(Ur.He), n = Yr(e, Ur.We);
o !== Ur.Be || n ? (Ur.Ke = {
startPos: Vr(r),
targetPos: Vr(e),
startTime: i,
duration: a ? 0 : et(r, e)
}, Ur.We = Vr(e)) : Ur.Ke && (Ur.Ke.targetPos = Vr(e)), Ur.Be = o;
}
const l = Jr(n);
((e, r) => !((e || r) && (!e || !r || e.touchMoveActive !== r.touchMoveActive || Math.abs(e.touchMoveLen - r.touchMoveLen) > Gr || Math.abs(e.x - r.x) > Gr || Math.abs(e.y - r.y) > Gr)))(l, Ur.Ge) || (Ur.Ve = {
startDir: Jr(Ur.Ze),
targetDir: l,
startTime: i,
duration: Ur.Ke?.duration ?? 195
}, Ur.Ge = l), at(i);
}

function s(e) {
const r = Ee.game[Ve.J], t = a(e) === a(r), n = De.Ue.Te && De.Ue.Ye;
Reflect.defineProperty(e.nameText, "visible", {
get: () => n || t && e != r,
set() {}
}), e.nameText.tint = n ? t ? 13360629 : 5263440 : 16777215, e.nameText.style.fill = n ? t ? "#39d4f3" : "#505050" : "#00ffff", 
e.nameText.style.fontSize = 20, e.nameText.style.dropShadowBlur = .1;
}

function c() {
try {
const e = Ee.game[Ve.J], r = Ee.game[Ve.j].playerPool[Ve.ye];
if (!(Ee.pixi && e && e.container && Ee.game?.initialized)) {
return;
}
const t = _t(e.container, "playerLines");
t.clear(), De.Ue.Te && De.Ue.qe && ((e, r, t) => {
const n = e[Ve.me].x, o = e[Ve.me].y, i = a(e), l = xt(e.layer), s = kt(e);
r.forEach(r => {
if (!r.active || r[Ve.se][Ve.Ne] || e.__id === r.__id) {
return;
}
const c = a(r), d = wt(r.layer, s, l);
t.lineStyle(4, c === i ? ut : d && !r.downed ? mt : ft, .45), t.moveTo(0, 0), t.lineTo(16 * (r[Ve.me].x - n), 16 * (o - r[Ve.me].y));
});
})(e, r, t);
const n = _t(e.container, "grenadeDangerZones");
n.clear(), De.Ue.Te && De.Ue.Xe.Je && ((e, r) => {
const t = e[Ve.me].x, n = e[Ve.me].y, a = xt(e.layer), o = kt(e), i = Ee.game?.[Ve.U]?.[Ve.Ae];
i && Object.values(i).filter(e => 9 === e.__type && "smoke" !== e.type || e.smokeEmitter && e.explodeParticle).forEach(e => {
const i = wt(e.layer, o, a);
r.beginFill(i ? mt : ft, i ? .1 : .2), r.drawCircle(16 * (e.pos.x - t), 16 * (n - e.pos.y), 208), 
r.endFill(), r.lineStyle(2, 0, .2), r.drawCircle(16 * (e.pos.x - t), 16 * (n - e.pos.y), 208);
});
})(e, n);
const l = _t(e.container, "grenadeTrajectory");
l.clear(), De.Ue.Te && De.Ue.Xe.Qe && ((e, r) => {
if (3 !== e[Ve.ce][Ve.Ce]) {
return;
}
const t = e[Ve.se][Ve.Se];
if (!t) {
return;
}
const n = Ee.game, a = e[Ve.me].x, o = e[Ve.me].y;
let i, l;
const s = n[Ve.W].spectating, c = n[Ve.S].shotDetected || n[Ve.ae].isBindDown(vr), d = s ? null : it();
if (d) {
const e = n[Ve.N][Ve._e]({
x: a,
y: o
}), r = d.x - e.x, t = d.y - e.y, s = Math.sqrt(r * r + t * t);
i = r / s, l = t / s;
} else if (s || Be.et && c) {
if (!s && Be.et) {
const e = n[Ve.N][Ve._e]({
x: a,
y: o
}), r = Be.et.clientX - e.x, t = Be.et.clientY - e.y, s = Math.sqrt(r * r + t * t);
i = r / s, l = t / s;
} else {
i = e[Ve.fe].x, l = e[Ve.fe].y;
}
} else {
const e = n[Ve.ne].mousePos._x - $e.innerWidth / 2, r = n[Ve.ne].mousePos._y - $e.innerHeight / 2, t = Math.sqrt(e * e + r * r);
i = e / t, l = r / t;
}
const u = .03489949670250097 * i + .9993908270190958 * l;
i = .9993908270190958 * i - .03489949670250097 * l, l = u;
const m = Math.min(Math.max(Le.tt, 0), 32.4) / 15 * (t.includes("smoke") ? 11 : 15), f = a + i * m, h = o - l * m;
let g = ht;
t.includes("smoke") ? g = gt : t.includes("frag") ? g = pt : t.includes("mirv") ? g = bt : t.includes("martyr") && (g = vt), 
r.lineStyle(3, g, .7), r.moveTo(0, 0), r.lineTo(16 * (f - a), 16 * (o - h));
const p = t.replace("_cook", ""), b = xr[p]?.explosionType;
if (b && xr[b]) {
const e = 16 * (xr[b].rad.max + 1);
r.beginFill(g, .2), r.drawCircle(16 * (f - a), 16 * (o - h), e), r.endFill(), r.lineStyle(2, g, .4), 
r.drawCircle(16 * (f - a), 16 * (o - h), e);
}
})(e, l);
const c = _t(e.container, "flashlights");
c.clear(), De.Ue.Te && (De.Ue.rt.m || De.Ue.rt.nt) && ((e, r, t) => {
const n = o(e), l = i(n), s = xt(e.layer), c = kt(e);
De.Ue.rt.nt && Mt(e, e, l, n, t), De.Ue.rt.m && r.filter(r => !(!r.active || r[Ve.se][Ve.Ne] || e.__id === r.__id || !wt(r.layer, c, s) || !r.container.worldVisible || a(r) === a(e))).forEach(r => {
const n = o(r), a = i(n);
Mt(e, r, a, n, t, 0, .05);
});
})(e, r, c);
const d = _t(e.container, "bulletTrajectory");
d.clear(), De.Ue.Te && De.Ue.rt.Qe && ((e, r) => {
const t = o(e), n = i(t);
if (!n || !t) {
return;
}
const a = Ee.game, l = e[Ve.me], s = a[Ve.W].spectating, c = a[Ve.S].shotDetected || a[Ve.ae].isBindDown(vr);
let d;
const u = s ? null : it();
if (u) {
const e = a[Ve.N][Ve._e]({
x: l.x,
y: l.y
});
d = Math.atan2(e.y - u.y, e.x - u.x) - Math.PI;
} else if (s || Be.et && c) {
if (!s && Be.et) {
const e = a[Ve.N][Ve._e]({
x: l.x,
y: l.y
});
d = Math.atan2(e.y - Be.et.clientY, e.x - Be.et.clientX) - Math.PI;
} else {
d = Math.atan2(e[Ve.fe].x, e[Ve.fe].y) - Math.PI / 2;
}
} else {
d = Math.atan2(a[Ve.ne].mousePos._y - $e.innerHeight / 2, a[Ve.ne].mousePos._x - $e.innerWidth / 2);
}
const m = Rr(Math.cos(d), -Math.sin(d)), f = dt(l, m, t), h = a?.[Ve.U]?.[Ve.Ae], g = wr && void 0 !== _r ? _r : e.layer;
let p = null;
if (h) {
const e = Object.values(h).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Kr(e.layer, g) || e?.type.includes("decal")));
let r = 1 / 0;
for (const t of e) {
if (!1 === t.collidable) {
continue;
}
const e = Hr.ot(t.collider, l, f);
if (e) {
const t = Lr(Fr(e.point, l));
r > t && (r = t, p = jr(e.point, Or(e.normal, .01)));
}
}
}
const b = ((e, r, t, n, a, o = 3) => {
const i = [];
let l = $r(e), s = Er(r), c = t, d = 0;
const u = Ee.game, m = u?.[Ve.U]?.[Ve.Ae];
if (!m) {
return i;
}
const f = wr && void 0 !== _r ? _r : n, h = Object.values(m).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Kr(e.layer, f) || e?.type.includes("decal") || e?.type.includes("decal"))), g = u?.[Ve.j], p = g?.playerPool?.[Ve.ye], b = Ve.re, v = b ? u?.[b] : null, y = v?.player?.radius ?? 1, x = [];
if (Array.isArray(p)) {
for (const e of p) {
if (!e || !e.active) {
continue;
}
if (e.__id === a.__id) {
continue;
}
const r = e[Ve.se];
if (!r) {
continue;
}
if (r[Ve.Ne]) {
continue;
}
const t = e.layer ?? r.m_layer ?? 0;
if (!(Kr(t, f) || 2 & t)) {
continue;
}
const n = e[Ve.me] ?? e.m_pos;
if (!n) {
continue;
}
const o = "number" == typeof e.m_rad ? e.m_rad : "number" == typeof e.rad ? e.rad : y * ("number" == typeof r.m_scale ? r.m_scale : "number" == typeof r.scale ? r.scale : 1);
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
const e = jr(l, Or(s, c));
let r = null, t = 1 / 0, n = null, a = null;
for (const o of h) {
if (!1 === o.collidable) {
continue;
}
const i = Hr.ot(o.collider, l, e);
if (i) {
const e = Lr(Fr(i.point, l));
t > e && e > 1e-4 && (t = e, r = i, n = o, a = "obstacle");
}
}
for (const o of x) {
const i = Hr.it(l, e, o.pos, o.rad);
if (i) {
const e = Lr(Fr(i.point, l));
t > e && e > 1e-4 && (t = e, r = i, n = null, a = "player");
}
}
if (!r) {
i.push({
start: $r(l),
end: e,
hitPlayer: !1
});
break;
}
{
if (i.push({
start: $r(l),
end: $r(r.point),
hitPlayer: "player" === a
}), "player" === a) {
break;
}
const e = n?.type;
let u = !1;
if (u = n && void 0 !== n.reflectBullets ? !0 === n.reflectBullets : [ "metal_wall", "stone_wall", "container_wall", "hedgehog", "bollard", "airdop", "silo", "collider", "warehouse_wall", "oven_", "control_panel_" ].some(r => e?.includes(r)), 
!u || d >= o) {
break;
}
{
const e = Pr(s, r.normal);
s = jr(Or(r.normal, -2 * e), s), s = Er(s), l = jr(r.point, Or(s, .01)), c = Math.max(1, c - Math.sqrt(t)) / 1.5, 
d++;
}
}
}
return i;
})(p || f, m, n.distance, e.layer, e), v = b.some(e => e.hitPlayer);
r.lineStyle(v ? 2 : 1, v ? mt : 16711935, .5);
for (const e of b) {
const t = {
x: 16 * (e.start.x - l.x),
y: 16 * (l.y - e.start.y)
}, n = {
x: 16 * (e.end.x - l.x),
y: 16 * (l.y - e.end.y)
};
r.moveTo(t.x, t.y), r.lineTo(n.x, n.y);
}
})(e, d), r.forEach(s);
} catch {}
}

function d(e) {
jt = e;
}

function u(e) {
if (!e || e.dead) {
return !1;
}
const r = e.type || "";
return Bt.some(e => r.includes(e));
}

function m(e, r) {
return 2 === e || 3 === e || 2 === r || 3 === r || e === r;
}

function h(e) {
if (!1 === e.collidable) {
return !1;
}
if (e.dead) {
return !1;
}
const r = e.type || "";
return !0 === e.isWall || !1 === e.destructible || It.some(e => r.includes(e));
}

function g(e, r, t) {
const n = Ee.game, a = n?.[Ve.U]?.[Ve.Ae];
if (!a) {
return !0;
}
const o = Math.hypot(r.x - e.x, r.y - e.y);
if (1 > o) {
return !0;
}
for (const n of Object.values(a)) {
if (!n.collider || n.dead) {
continue;
}
if (void 0 !== n.layer && !m(n.layer, t)) {
continue;
}
if (!h(n)) {
continue;
}
const a = Hr.ot(n.collider, e, r);
if (a && o - .5 > Math.hypot(a.point.x - e.x, a.point.y - e.y)) {
return !1;
}
}
return !0;
}

function p(e, r) {
const t = Math.atan2(r.y - e.y, r.x - e.x);
return {
touchMoveActive: !0,
touchMoveLen: 255,
x: Math.cos(t),
y: Math.sin(t)
};
}

function b() {
Le.lt.includes(yr) || (Le.lt.push(yr), Dt = performance.now());
}

function v() {
$e.dispatchEvent(new MouseEvent("mouseup", {
bubbles: !0,
cancelable: !0,
view: $e,
button: 0
}));
}

function y(e, r, t) {
if (!r || !r.container) {
return;
}
const n = r.container, a = "autoCrateESP";
if (!n[a]) {
if (!kr.st) {
return;
}
n[a] = new kr.st, n.addChild(n[a]);
}
const o = n[a];
if (!o) {
return;
}
if (o.clear(), !t || !De.ct?.Te) {
return;
}
const i = t[Ve.he] || t.pos, l = r[Ve.he];
if (!i || !l) {
return;
}
const s = 16 * (i.x - l.x), c = 16 * (l.y - i.y);
o.lineStyle(2.5, 16776960, .8), o.moveTo(0, 0), o.lineTo(s, c);
}

function x() {
if (!De.ct?.Te) {
return void (Et && (v(), Et = !1));
}
if (!Lt) {
return void (Et && (v(), Et = !1));
}
const e = Ee.game;
if (!e) {
return;
}
const r = e[Ve.J];
if (!r) {
return;
}
const t = Lt[Ve.he] || Lt.pos, n = r[Ve.he];
if (!t || !n) {
return;
}
const a = Math.hypot(n.x - t.x, n.y - t.y), o = r[Ve.ce]?.[Ve.Ce], i = 2 === o, l = m(Lt.layer, r.layer);
7.5 >= a && i && l && De.ct?.dt ? performance.now() - Dt > 50 && (Et || ($e.dispatchEvent(new MouseEvent("mousedown", {
bubbles: !0,
cancelable: !0,
view: $e,
button: 0
})), Et = !0)) : Et && (v(), Et = !1);
}

function k(e) {
try {
const t = Ee.game;
if (!t || !t.initialized || !De.ut?.Te) {
return Ht.gt = null, null;
}
if (e[Ve.se][Ve.Ne]) {
return Ht.gt = null, null;
}
const n = t[Ve.j].playerPool[Ve.ye];
if (!n) {
return null;
}
const o = Kt(e.layer), i = ((e, r, t, n) => {
const o = a(r);
let i = null, l = 1 / 0;
for (const s of e) {
if (!s.active) {
continue;
}
if (s[Ve.se][Ve.Ne]) {
continue;
}
if (!De.ut.ht && s.downed) {
continue;
}
if (r.__id === s.__id) {
continue;
}
if (!Wt(s.layer, t, n)) {
continue;
}
if (a(s) === o) {
continue;
}
const e = r[Ve.he], c = s[Ve.he], d = Math.hypot(e.x - c.x, e.y - c.y);
l > d && (l = d, i = s);
}
return i;
})(n, e, Kt((r = e).layer) ? r.layer : wr && void 0 !== _r ? _r : r.layer, o);
if (!i) {
return Ht.gt = null, null;
}
Ht.gt = i;
const l = i;
if (!l) {
return Ht.gt = null, null;
}
const s = ((e, r) => {
if (!e || !r) {
return null;
}
const t = Ee.game;
if (!t) {
return null;
}
const n = e[Ve.he], a = r[Ve.he], o = Math.atan2(a.y - n.y, a.x - n.x) + 2.356194490192345;
return t[Ve.N][Ve._e]({
x: n.x + 100 * Math.cos(o),
y: n.y + 100 * Math.sin(o)
});
})(e, l);
return s ? (Ht.ft = {
x: s.x,
y: s.y
}, new Wr("panHero", {
x: s.x,
y: s.y
}, null, !1)) : null;
} catch (e) {
return Ht.gt = null, null;
}
var r;
}

function w() {
return Ht.gt;
}

function _(e, r, t, n) {
return (e - t) ** 2 + (r - n) ** 2;
}

function C() {
try {
Zt.lastUpdateTime && performance.now() - Zt.lastUpdateTime > 1e3 && ((() => {
const e = performance.now();
for (const r in Zt.bt) {
const t = Zt.bt[r];
t.length > 0 && e - t[t.length - 1].t > 5e3 && (delete Zt.bt[r], delete Zt.vt[r], 
delete Zt.yt[r]);
}
})(), Zt.lastUpdateTime = performance.now());
const e = Ee.game;
if (!e.initialized || !De.kt.Te && !De.xt.Te || e[Ve.W].spectating) {
return l(new Wr("idle")), ct(), void (Zt._t = null);
}
0 === Zt.lastAim.x && 0 === Zt.lastAim.y && (Zt.lastAim.x = Ee.game[Ve.ne].mousePos._x, 
Zt.lastAim.y = Ee.game[Ve.ne].mousePos._y);
const r = e[Ve.j].playerPool[Ve.ye], t = e[Ve.J], n = Gt(t.layer);
let s = !1, c = null, f = null, h = !1;
try {
const x = e[Ve.J][Ve.ce][Ve.Ce], w = 2 === x, C = 3 === x, M = e[Ve.ae].isBindDown(vr), S = De.xt.Te && (M || De.kt.dt);
let T = Zt.wt;
S ? T && T.active && !T[Ve.se][Ve.Ne] || (T = ((e, r) => {
const t = a(r), n = Gt(r.layer), o = Vt(r);
let i = null, l = 1 / 0;
for (const s of e) {
if (!s.active) {
continue;
}
if (s[Ve.se][Ve.Ne]) {
continue;
}
if (!De.kt.ht && s.downed) {
continue;
}
if (r.__id === s.__id) {
continue;
}
if (!Yt(s.layer, o, n)) {
continue;
}
if (a(s) === t) {
continue;
}
const e = r[Ve.he], c = s[Ve.he], d = _(e.x, e.y, c.x, c.y);
l > d && (l = d, i = s);
}
return i;
})(r, t), Zt.wt = T, Zt.Ct = 0) : (T = null, Zt.wt = null, Zt.Ct = 0);
let N = 1 / 0;
if (T) {
const e = t[Ve.he], r = T[Ve.he];
N = Math.hypot(e.x - r.x, e.y - r.y);
}
const z = 5.5 >= N, A = Date.now();
if (!z && T && 0 === Zt.Ct ? Zt.Ct = A : z && 0 !== Zt.Ct && (Zt.Ct = 0), !z && A - Zt.Ct > 1e3 && Zt.Ct > 0 && (T = null, 
Zt.wt = null, Zt.Ct = 0), S && De.xt.Mt && !w && z && Le.lt.push(yr), S && w && z && T) {
const r = t[Ve.he], n = T[Ve.he], a = o(t), c = i(a);
if (!De.kt.St || Xt(t, T, a, c)) {
const t = (e => {
if (!e) {
return null;
}
const r = e[Ve.he];
if (!r) {
return null;
}
if (e.collider) {
try {
if (void 0 !== e.collider.radius) {
return {
x: r.x,
y: r.y
};
}
if (e.collider.min && e.collider.max) {
return {
x: (e.collider.min.x + e.collider.max.x) / 2 + r.x,
y: (e.collider.min.y + e.collider.max.y) / 2 + r.y
};
}
if (e.collider.getCenter && "function" == typeof e.collider.getCenter) {
const r = e.collider.getCenter();
return {
x: r.x,
y: r.y
};
}
} catch (e) {}
}
return e.body && e.body.position ? {
x: e.body.position.x,
y: e.body.position.y
} : {
x: r.x,
y: r.y
};
})(T) || n;
let a = t;
{
const e = T.__id, r = Zt.bt[e] ?? (Zt.bt[e] = []), o = performance.now();
if (r.push([ o, {
...n
} ]), r.length > 4 && r.shift(), r.length >= 3) {
let e = 0, n = 0, o = 0, i = 0, l = 0;
for (let e = 1; r.length > e; e++) {
const t = (r[e][0] - r[e - 1][0]) / 1e3;
t > 0 && (o += t, i += r[e][1].x - r[e - 1][1].x, l += r[e][1].y - r[e - 1][1].y);
}
o > 0 && (e = i / o, n = l / o);
const s = .08;
a = {
x: t.x + e * s,
y: t.y + n * s
};
}
}
a = ((e, r, t, n = 1) => Math.abs((r.x - e.x) * (t.y - e.y) - (r.y - e.y) * (t.x - e.x)) > n ? ((e, r, t) => {
const n = r.x - e.x, a = r.y - e.y, o = n * n + a * a;
if (.001 > o) {
return r;
}
const i = Math.max(0, Math.min(1, ((t.x - e.x) * n + (t.y - e.y) * a) / o));
return {
x: e.x + i * n,
y: e.y + i * a
};
})(e, r, t) : t)(r, n, a, 2);
const o = ((e, r) => Math.atan2(r.y - e.y, r.x - e.x))(a, r) + Math.PI;
let i = o;
if (De.xt.Nt && De.xt.zt > N) {
const e = Math.atan2(T[Ve.fe].x, T[Ve.fe].y) - Math.PI / 2 + Math.PI, r = o + Math.PI / 2, t = o - Math.PI / 2, n = Math.abs(r - e), a = Math.abs(t - e) > n ? r : t, l = De.xt.At / 100 * Math.max(0, (De.xt.zt - N) / De.xt.zt);
let s = a - o;
for (;s > Math.PI; ) {
s -= 2 * Math.PI;
}
for (;-Math.PI > s; ) {
s += 2 * Math.PI;
}
i = o + s * l;
}
const c = Math.cos(i), u = Math.sin(i);
let m;
if (De.xt.Tt) {
const e = De.xt.Rt / 100, r = Math.random();
let t = 0, n = 0;
if (.5 * e > r) {
const e = De.xt.jt / 100;
t = Math.sin(o) * e, n = -Math.cos(o) * e;
} else if (e > r) {
const e = De.xt.jt / 100;
t = -Math.sin(o) * e, n = Math.cos(o) * e;
}
const a = c + t, i = u + n, l = Math.hypot(a, i);
m = {
touchMoveActive: !0,
touchMoveLen: 255,
x: l > 0 ? a / l : c,
y: l > 0 ? i / l : u
};
} else {
m = {
touchMoveActive: !0,
touchMoveLen: 255,
x: c,
y: u
};
}
const f = e[Ve.N][Ve._e]({
x: a.x,
y: a.y
});
return l(new Wr("meleeLock", {
x: f.x,
y: f.y
}, m, !0)), De.kt.dt && d(!0), s = !0, ct(), void (Zt._t = null);
}
} else {
d(!1);
}
S && !z && (Zt.wt = null);
const R = (e => {
if (!De.ct?.Te) {
return Lt = null, Et && (v(), Et = !1), y(0, e, null), null;
}
if ((e => {
if (!e) {
return !1;
}
const r = e[Ve.se], t = r?.[Ve.Se];
if (!t) {
return !1;
}
const n = t.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill") || n.includes("painkiller");
})(e)) {
return Lt = null, Et && (v(), Et = !1), y(0, e, null), null;
}
if ((e => {
if (!e) {
return !1;
}
const r = e[Ve.ce]?.[Ve.Ce];
return 2 !== r && null != r;
})(e)) {
return Lt = null, Et && (v(), Et = !1), y(0, e, null), null;
}
const r = (() => {
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
if (r.hasValidTarget?.()) {
const t = r.getCurrentTarget?.();
if (t) {
const n = Ee.game?.[Ve.J], a = !r.isEnemyBehindWall?.(n, t), o = r.getAimbotShootableState?.();
if (a || o) {
return Lt = null, Et && (v(), Et = !1), y(0, e, null), null;
}
}
}
const t = (e => {
const r = De.ct?.$t ?? 7.6, t = Ee.game, n = t?.[Ve.U]?.[Ve.Ae];
if (!n) {
return null;
}
const a = e[Ve.he];
if (!a) {
return null;
}
const o = e.layer;
let i = null, l = 1 / 0;
for (const e of Object.values(n)) {
if (!u(e)) {
continue;
}
if (!m(e.layer, o)) {
continue;
}
const t = e[Ve.he] || e.pos;
if (!t) {
continue;
}
const n = Math.hypot(a.x - t.x, a.y - t.y);
n > r || g(a, t, o) && l > n && (l = n, i = e);
}
return i ? {
obj: i,
distance: l
} : null;
})(e);
if (!t) {
return Lt = null, Et && (v(), Et = !1), y(0, e, null), null;
}
Lt = t.obj, y(0, e, Lt);
const n = Lt[Ve.he] || Lt.pos, a = Ee.game, o = e[Ve.ce]?.[Ve.Ce], i = 2 === o, l = a[Ve.N][Ve._e]({
x: n.x,
y: n.y
});
if (7.5 >= t.distance) {
!i && De.ct?.Ft && b();
const r = p(e[Ve.he], n);
return new Wr("crateBreak", {
x: l.x,
y: l.y
}, r, !0);
}
t.distance > 8 || !i && De.ct?.Ft && b();
const s = p(e[Ve.he], n);
return new Wr("crateBreak", {
x: l.x,
y: l.y
}, s, !0);
})(t);
if (R && De.ct?.Te) {
return l(R), ct(), Zt._t = null, void (Be.Ot = null);
}
if (!M && De.ut?.Te) {
const e = k(t);
if (e) {
return l(e), ct(), void (Zt._t = null);
}
}
if (!De.kt.Te || C) {
return l(new Wr("idle")), ct(), void (Zt._t = null);
}
const $ = M || De.kt.dt;
let j = Zt.Pt?.active && !Zt.Pt[Ve.se][Ve.Ne] ? Zt.Pt : null;
if (j) {
const e = Vt(t);
Yt(j.layer, e, n) || (j = null, Zt.Pt = null, l(new Wr("idle", null, null, !0)));
}
if (j || (Zt.Pt && (Zt.Pt = null, l(new Wr("idle", null, null, !0))), j = ((e, r) => {
const t = a(r), n = Gt(r.layer), o = Vt(r);
let i = [];
for (const l of e) {
l.active && (l[Ve.se][Ve.Ne] || !De.kt.ht && l.downed || r.__id !== l.__id && Yt(l.layer, o, n) && a(l) !== t && i.push(l));
}
if (0 === i.length) {
return null;
}
const l = Ee.game[Ve.ne].mousePos;
return i.sort((e, r) => {
const t = Ee.game[Ve.N][Ve._e]({
x: e[Ve.he].x,
y: e[Ve.he].y
}), n = Ee.game[Ve.N][Ve._e]({
x: r[Ve.he].x,
y: r[Ve.he].y
});
return _(t.x, t.y, l._x, l._y) - _(n.x, n.y, l._x, l._y);
}), i[0];
})(r, t), Zt.Bt = j), j) {
const e = t[Ve.he], r = j[Ve.he], n = Math.hypot(e.x - r.x, e.y - r.y);
j === Zt.Bt || Zt.Pt || (Zt.Bt = j, Zt.bt[j.__id] = []);
const a = ((e, r) => {
if (!e || !r) {
return null;
}
const t = e[Ve.he], n = r[Ve.he], a = e.__id, l = Zt.bt[a] ?? (Zt.bt[a] = []), s = performance.now();
if (l.push({
t: s,
x: t.x,
y: t.y
}), l.length > 15 && l.shift(), Zt.vt[a] || (Zt.vt[a] = {
vx: 0,
vy: 0
}), Zt.yt[a] || (Zt.yt[a] = {
ax: 0,
ay: 0
}), 2 > l.length) {
return Ee.game[Ve.N][Ve._e]({
x: t.x,
y: t.y
});
}
let c = 0, d = 0, u = 0, m = 0;
for (let e = 1; l.length > e; e++) {
const r = (l[e].t - l[e - 1].t) / 1e3;
if (r > 1e-4 && .1 > r) {
const t = l[e].x - l[e - 1].x, n = l[e].y - l[e - 1].y;
if (Math.hypot(t, n) > 200) {
continue;
}
const a = Math.exp(e / l.length * 2.5) - 1;
c += t / r * a, d += n / r * a, u += a, m++;
}
}
u > 0 && m > 0 && (c /= u, d /= u);
const f = Zt.vt[a], h = Math.hypot(c - f.vx, d - f.vy) > 50 ? .85 : .78;
let g = f.vx + h * (c - f.vx), p = f.vy + h * (d - f.vy);
Zt.vt[a] = {
vx: g,
vy: p
}, (0 === m || 0 === c && 0 === d) && (g *= .95, p *= .95);
const b = Zt.yt[a];
let v = 60 * (g - f.vx), y = 60 * (p - f.vy);
v = .5 * b.ax + .5 * v, y = .5 * b.ay + .5 * y, Zt.yt[a] = {
ax: v,
ay: y
}, g += v * Ut, p += y * Ut;
const x = i(o(r));
let k = x?.speed || 1e3;
const w = l.length > 1 ? l[l.length - 1].t - l[l.length - 2].t : 16;
Zt.Lt.push(w > 0 ? 1e3 / w : 60), Zt.Lt.length > 12 && Zt.Lt.shift();
const _ = Zt.Lt.reduce((e, r) => e + r, 0) / Zt.Lt.length;
k *= Math.max(.6, Math.min(2.5, 60 / _));
const C = t.x - n.x, M = t.y - n.y;
if (0 >= k) {
return Ee.game[Ve.N][Ve._e]({
x: t.x,
y: t.y
});
}
const S = g + .08 * v, T = p + .08 * y, N = S * S + T * T - k * k, z = 2 * (C * S + M * T), A = C * C + M * M;
let R = 0;
if (Math.abs(N) > 1e-4) {
const e = z * z - 4 * N * A;
if (0 > e) {
return Ee.game[Ve.N][Ve._e]({
x: t.x,
y: t.y
});
}
{
const r = Math.sqrt(e), n = [ (-z - r) / (2 * N), (-z + r) / (2 * N) ].filter(e => e > .001);
if (0 >= n.length) {
return Ee.game[Ve.N][Ve._e]({
x: t.x,
y: t.y
});
}
R = Math.min(...n);
}
} else if (Math.abs(z) > 1e-4 && (R = -A / z, .001 > R)) {
return Ee.game[Ve.N][Ve._e]({
x: t.x,
y: t.y
});
}
return Ee.game[Ve.N][Ve._e]({
x: t.x + g * R + v * R * R * .5 * Ut,
y: t.y + p * R + y * R * R * .5 * Ut
});
})(j, t);
if (!a) {
return l(new Wr("idle")), ct(), void (Zt._t = null);
}
f = {
x: a.x,
y: a.y
};
const u = o(t), m = i(u), g = !De.kt.St || Xt(t, j, u, m);
Zt.Dt = g;
const p = (m?.distance || 1 / 0) >= n;
De.kt.dt && n.toFixed(1);
let b = !1;
if ($ && (De.kt.Te || De.xt.Te && 8 >= n)) {
if (De.kt.dt || !De.kt.St || g || De.kt.dt && !w) {
l(new Wr("aimbot", {
x: a.x,
y: a.y
}, null, !1)), Zt._t = {
x: a.x,
y: a.y
}, Zt.lastUpdateTime = Date.now(), s = !0;
const e = Be.et;
c = e ? {
x: e.clientX,
y: e.clientY
} : {
x: a.x,
y: a.y
}, h = g, De.kt.dt && !w && g && p && !(e => {
if (!e) {
return !1;
}
const r = e[Ve.se], t = r?.[Ve.Se];
if (!t) {
return !1;
}
const n = t.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill") || n.includes("painkiller");
})(t) && (b = !0);
} else {
c = {
x: a.x,
y: a.y
}, h = !1;
}
} else {
c = {
x: a.x,
y: a.y
}, h = g;
}
d(!!b);
} else {
f = null, c = null, Zt._t = null, d(!1);
}
s || (l(new Wr("idle")), Zt._t = f ? {
x: f.x,
y: f.y
} : null);
let F = c;
!F && f && (F = {
x: f.x,
y: f.y
}), st(F, h, !!Zt.Pt);
} catch (e) {
ct(), l(new Wr("idle", null, null, !0)), Zt.wt = null, Zt.Pt = null, Zt.Bt = null, 
Zt._t = null;
}
} catch (e) {
l(new Wr({
mode: "idle",
immediate: !0
})), Zt._t = null;
}
}

function M() {
return !!Zt.Bt && Zt.Dt;
}

function S() {
return Zt.Bt && Zt.Bt.active && !Zt.Bt[Ve.se][Ve.Ne];
}

function T() {
return Zt.Bt;
}

function N(e, r) {
return !Xt(e, r, null, null);
}

function z(e, r) {
const t = e[Ve.ce];
if (!t || !cn) {
return 0;
}
const n = t[cn];
return n && "object" == typeof n && n[r] || 0;
}

function A() {
const e = De.Et;
if (!e?.Te) {
return;
}
if (!Ee.game) {
return;
}
const r = Ee.game, t = r[Ve.J];
if (!t || !t.active) {
return;
}
const n = t[Ve.se];
if (n?.[Ve.Ne] || t.downed) {
return;
}
if ((e => {
if (e) {
if (!ln) {
const r = [];
for (const t in e) {
const n = e[t];
"number" == typeof n && n > 5 && 100 >= n && r.push({
k: t,
v: n
});
}
if (1 === r.length) {
ln = r[0].k;
} else if (r.length > 1) {
const e = r.find(e => .1 > Math.abs(e.v - 100));
e ? ln = e.k : (r.sort((e, r) => r.v - e.v), ln = r[0].k);
}
}
if (!sn && ln) {
const r = [], t = [ ln, Ve.Ce, Ve.be ];
for (const n in e) {
if (t.includes(n)) {
continue;
}
const a = e[n];
"number" != typeof a || 0 > a || a > 100 || r.push(n);
}
r.length > 0 && (sn = r[0]);
}
if (!cn) {
for (const r in e) {
const t = e[r];
if ("object" == typeof t && null !== t && !Array.isArray(t) && ("bandage" in t || "healthkit" in t || "soda" in t)) {
cn = r;
break;
}
}
}
}
})(t[Ve.ce]), !ln) {
return;
}
if ((e => {
const r = e[Ve.se], t = r?.[Ve.Se];
if (!t) {
return !1;
}
const n = t.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill");
})(t)) {
return;
}
if ((e => {
const r = e[Ve.se];
if (!r) {
return !1;
}
for (const e in r) {
const t = r[e];
if ("number" == typeof t && e.toLowerCase().includes("reload")) {
return t > 0;
}
}
const t = r?.[Ve.Se];
return !(!t || "string" != typeof t) && t.toLowerCase().includes("reload");
})(t)) {
return;
}
if ((e => {
if ($t) {
return !0;
}
const r = e[Ve.ae];
return !(!r || !r.isBindDown(vr)) || !!Le.lt.includes(vr);
})(r)) {
return;
}
if (e.Ht && ((e, r, t) => {
const n = e[Ve.j]?.playerPool?.[Ve.ye];
if (!n) {
return !1;
}
const o = a(r), i = r[Ve.he], l = r.layer;
for (const e of n) {
if (!e.active || e.__id === r.__id) {
continue;
}
if (e[Ve.se]?.[Ve.Ne] || e.downed) {
continue;
}
if (a(e) === o) {
continue;
}
const n = e[Ve.he];
if (t > Math.hypot(n.x - i.x, n.y - i.y) && (void 0 === e.layer || e.layer === l)) {
return !0;
}
}
return !1;
})(r, t, e.It || 15)) {
return;
}
const o = (e => {
const r = e[Ve.ce];
return r && ln && void 0 !== r[ln] ? r[ln] : 100;
})(t), i = (e => {
const r = e[Ve.ce];
return r && sn && void 0 !== r[sn] ? r[sn] : 0;
})(t), l = Date.now(), s = z(t, "bandage"), c = z(t, "healthkit"), d = z(t, "soda"), u = z(t, "painkiller"), m = e.Kt || 75, f = e.Wt || 50, h = e.Gt || 75;
return f > o && c > 0 && l - tn > 3100 ? (Le.Vt = "healthkit", void (tn = l)) : s > 0 && l - nn > 2100 && (f > o && 0 === c || m > o && o >= f) ? (Le.Vt = "bandage", 
void (nn = l)) : 50 > i && u > 0 && l - an > 3100 ? (Le.Vt = "painkiller", void (an = l)) : d > 0 && l - on > 2100 && h > i && (0 === u || i >= 50) ? (Le.Vt = "soda", 
void (on = l)) : void 0;
}

function R() {
let e = !1;
const r = e => {
"string" == typeof e && (localStorage.setItem("lastBackgroundType", "url"), localStorage.setItem("lastBackgroundValue", e));
};
return {
init() {
if (De.Zt && De.Zt.Te && !e) {
try {
const r = je.getElementById("background");
r && $e.getComputedStyle(r), (() => {
const e = localStorage.getItem("lastBackgroundType"), r = localStorage.getItem("lastBackgroundValue"), t = je.getElementById("background");
t && e && r && (t.style.backgroundImage = `url("${r}")`, t.style.backgroundSize = "cover", 
t.style.backgroundPosition = "center", t.style.backgroundRepeat = "no-repeat");
})(), e = !0;
} catch (e) {}
}
},
cleanup() {
e = !1;
},
setBackgroundFromUrl(e) {
const t = je.getElementById("background");
if (!t) {
return !1;
}
if (!e || "string" != typeof e || "" === e.trim()) {
return !1;
}
const n = e.trim();
return t.style.backgroundImage = `url("${n}")`, t.style.backgroundSize = "cover", 
t.style.backgroundPosition = "center", t.style.backgroundRepeat = "no-repeat", r(n), 
!0;
},
setBackgroundFromFile(e) {
const t = je.getElementById("background");
if (!t) {
return !1;
}
if (!(e && e instanceof Blob)) {
return !1;
}
const n = new FileReader;
return n.onload = () => {
"string" == typeof n.result && (t.style.backgroundImage = `url("${n.result}")`, 
t.style.backgroundSize = "cover", t.style.backgroundPosition = "center", t.style.backgroundRepeat = "no-repeat", 
r(n.result));
}, n.onerror = () => {}, n.readAsDataURL(e), !0;
},
resetBackground() {
const e = je.getElementById("background");
return !!e && (e.style.backgroundImage = 'url("https://survev.io/img/main_splash_0_6_10.png")', 
e.style.backgroundSize = "cover", e.style.backgroundPosition = "center", e.style.backgroundRepeat = "no-repeat", 
localStorage.removeItem("lastBackgroundType"), localStorage.removeItem("lastBackgroundValue"), 
!0);
}
};
}

function $(e, r) {
for (var t in r) {
e[t] = r[t];
}
return e;
}

function j(e) {
e && e.parentNode && e.parentNode.removeChild(e);
}

function F(e, r, t) {
var n, a, o, i = {};
for (o in r) {
"key" == o ? n = r[o] : "ref" == o ? a = r[o] : i[o] = r[o];
}
if (arguments.length > 2 && (i.children = arguments.length > 3 ? wn.call(arguments, 2) : t), 
"function" == typeof e && null != e.Ut) {
for (o in e.Ut) {
void 0 === i[o] && (i[o] = e.Ut[o]);
}
}
return O(e, i, n, a, null);
}

function O(e, r, t, n, a) {
var o = {
type: e,
Yt: r,
key: t,
ref: n,
qt: null,
Jt: null,
Xt: 0,
Qt: null,
er: null,
constructor: void 0,
tr: a ?? ++Cn,
rr: -1,
nr: 0
};
return null == a && null != _n.ar && _n.ar(o), o;
}

function P(e) {
return e.children;
}

function B(e, r) {
this.Yt = e, this.context = r;
}

function L(e, r) {
if (null == r) {
return e.Jt ? L(e.Jt, e.rr + 1) : null;
}
for (var t; e.qt.length > r; r++) {
if (null != (t = e.qt[r]) && null != t.Qt) {
return t.Qt;
}
}
return "function" == typeof e.type ? L(e) : null;
}

function E(e) {
var r, t;
if (null != (e = e.Jt) && null != e.er) {
for (e.Qt = e.er.base = null, r = 0; e.qt.length > r; r++) {
if (null != (t = e.qt[r]) && null != t.Qt) {
e.Qt = e.er.base = t.Qt;
break;
}
}
return E(e);
}
}

function D(e) {
(!e.ir && (e.ir = !0) && Mn.push(e) && !I.lr++ || Sn != _n.sr) && ((Sn = _n.sr) || Tn)(I);
}

function I() {
for (var e, r, t, n, a, o, i, l = 1; Mn.length; ) {
Mn.length > l && Mn.sort(Nn), e = Mn.shift(), l = Mn.length, e.ir && (t = void 0, 
n = void 0, a = (n = (r = e).tr).Qt, o = [], i = [], r.cr && ((t = $({}, n)).tr = n.tr + 1, 
_n.ar && _n.ar(t), Y(r.cr, t, n, r.dr, r.cr.namespaceURI, 32 & n.nr ? [ a ] : null, o, a ?? L(n), !!(32 & n.nr), i), 
t.tr = n.tr, t.Jt.qt[t.rr] = t, q(o, t, i), n.Qt = n.Jt = null, t.Qt != a && E(t)));
}
I.lr = 0;
}

function H(e, r, t, n, a, o, i, l, s, c, d) {
var u, m, f, h, g, p, b, v = n && n.qt || Fn, y = r.length;
for (s = ((e, r, t, n, a) => {
var o, i, l, s, c, d = t.length, u = d, m = 0;
for (e.qt = Array(a), o = 0; a > o; o++) {
null != (i = r[o]) && "boolean" != typeof i && "function" != typeof i ? ("string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? i = e.qt[o] = O(null, i, null, null, null) : Pn(i) ? i = e.qt[o] = O(P, {
children: i
}, null, null, null) : void 0 === i.constructor && i.Xt > 0 ? i = e.qt[o] = O(i.type, i.Yt, i.key, i.ref ? i.ref : null, i.tr) : e.qt[o] = i, 
s = o + m, i.Jt = e, i.Xt = e.Xt + 1, l = null, -1 != (c = i.rr = G(i, t, s, u)) && (u--, 
(l = t[c]) && (l.nr |= 2)), null == l || null == l.tr ? (-1 == c && (a > d ? m-- : d > a && m++), 
"function" != typeof i.type && (i.nr |= 4)) : c != s && (c == s - 1 ? m-- : c == s + 1 ? m++ : (c > s ? m-- : m++, 
i.nr |= 4))) : e.qt[o] = null;
}
if (u) {
for (o = 0; d > o; o++) {
null != (l = t[o]) && !(2 & l.nr) && (l.Qt == n && (n = L(l)), ee(l, l));
}
}
return n;
})(t, r, v, s, y), u = 0; y > u; u++) {
null != (f = t.qt[u]) && (m = -1 == f.rr ? jn : v[f.rr] || jn, f.rr = u, p = Y(e, f, m, a, o, i, l, s, c, d), 
h = f.Qt, f.ref && m.ref != f.ref && (m.ref && X(m.ref, null, f), d.push(f.ref, f.er || h, f)), 
null == g && null != h && (g = h), (b = !!(4 & f.nr)) || m.qt === f.qt ? s = K(f, s, e, b) : "function" == typeof f.type && void 0 !== p ? s = p : h && (s = h.nextSibling), 
f.nr &= -7);
}
return t.Qt = g, s;
}

function K(e, r, t, n) {
var a, o;
if ("function" == typeof e.type) {
for (a = e.qt, o = 0; a && a.length > o; o++) {
a[o] && (a[o].Jt = e, r = K(a[o], r, t, n));
}
return r;
}
e.Qt != r && (n && (r && e.type && !r.parentNode && (r = L(e)), t.insertBefore(e.Qt, r || null)), 
r = e.Qt);
do {
r = r && r.nextSibling;
} while (null != r && 8 == r.nodeType);
return r;
}

function W(e, r) {
return r = r || [], null == e || "boolean" == typeof e || (Pn(e) ? e.some(e => {
W(e, r);
}) : r.push(e)), r;
}

function G(e, r, t, n) {
var a, o, i, l = e.key, s = e.type, c = r[t], d = null != c && !(2 & c.nr);
if (null === c && null == l || d && l == c.key && s == c.type) {
return t;
}
if (n > (d ? 1 : 0)) {
for (a = t - 1, o = t + 1; a >= 0 || r.length > o; ) {
if (null != (c = r[i = 0 > a ? o++ : a--]) && !(2 & c.nr) && l == c.key && s == c.type) {
return i;
}
}
}
return -1;
}

function Z(e, r, t) {
"-" == r[0] ? e.setProperty(r, t ?? "") : e[r] = null == t ? "" : "number" != typeof t || On.test(r) ? t : t + "px";
}

function U(e, r, t, n, a) {
var o, i;
e: if ("style" == r) {
if ("string" == typeof t) {
e.style.cssText = t;
} else {
if ("string" == typeof n && (e.style.cssText = n = ""), n) {
for (r in n) {
t && r in t || Z(e.style, r, "");
}
}
if (t) {
for (r in t) {
n && t[r] == n[r] || Z(e.style, r, t[r]);
}
}
}
} else if ("o" == r[0] && "n" == r[1]) {
o = r != (r = r.replace(zn, "$1")), i = r.toLowerCase(), r = i in e || "onFocusOut" == r || "onFocusIn" == r ? i.slice(2) : r.slice(2), 
e.l || (e.l = {}), e.l[r + o] = t, t ? n ? t.u = n.u : (t.u = An, e.addEventListener(r, o ? $n : Rn, o)) : e.removeEventListener(r, o ? $n : Rn, o);
} else {
if ("http://www.w3.org/2000/svg" == a) {
r = r.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
} else if ("width" != r && "height" != r && "href" != r && "list" != r && "form" != r && "tabIndex" != r && "download" != r && "rowSpan" != r && "colSpan" != r && "role" != r && "popover" != r && r in e) {
try {
e[r] = t ?? "";
break e;
} catch (e) {}
}
"function" == typeof t || (null == t || !1 === t && "-" != r[4] ? e.removeAttribute(r) : e.setAttribute(r, "popover" == r && 1 == t ? "" : t));
}
}

function V(e) {
return function(r) {
if (this.l) {
var t = this.l[r.type + e];
if (null == r.t) {
r.t = An++;
} else if (t.u > r.t) {
return;
}
return t(_n.event ? _n.event(r) : r);
}
};
}

function Y(e, r, t, n, a, o, i, l, s, c) {
var d, u, m, f, h, g, p, b, v, y, x, k, w, _, C, M, S, T = r.type;
if (void 0 !== r.constructor) {
return null;
}
128 & t.nr && (s = !!(32 & t.nr), o = [ l = r.Qt = t.Qt ]), (d = _n.Xt) && d(r);
e: if ("function" == typeof T) {
try {
if (b = r.Yt, v = "prototype" in T && T.prototype.render, y = (d = T.contextType) && n[d.er], 
x = d ? y ? y.Yt.value : d.Jt : n, t.er ? p = (u = r.er = t.er).Jt = u.ur : (v ? r.er = u = new T(b, x) : (r.er = u = new B(b, x), 
u.constructor = T, u.render = re), y && y.sub(u), u.state || (u.state = {}), u.dr = n, 
m = u.ir = !0, u.mr = [], u._sb = []), v && null == u.gr && (u.gr = u.state), v && null != T.hr && (u.gr == u.state && (u.gr = $({}, u.gr)), 
$(u.gr, T.hr(b, u.gr))), f = u.Yt, h = u.state, u.tr = r, m) {
v && null == T.hr && null != u.pr && u.pr(), v && null != u.br && u.mr.push(u.br);
} else {
if (v && null == T.hr && b !== f && null != u.vr && u.vr(b, x), r.tr == t.tr || !u.Qt && null != u.yr && !1 === u.yr(b, u.gr, x)) {
for (r.tr != t.tr && (u.Yt = b, u.state = u.gr, u.ir = !1), r.Qt = t.Qt, r.qt = t.qt, 
r.qt.some(e => {
e && (e.Jt = r);
}), k = 0; u._sb.length > k; k++) {
u.mr.push(u._sb[k]);
}
u._sb = [], u.mr.length && i.push(u);
break e;
}
null != u.kr && u.kr(b, u.gr, x), v && null != u._r && u.mr.push(() => {
u._r(f, h, g);
});
}
if (u.context = x, u.Yt = b, u.cr = e, u.Qt = !1, w = _n.lr, _ = 0, v) {
for (u.state = u.gr, u.ir = !1, w && w(r), d = u.render(u.Yt, u.state, u.context), 
C = 0; u._sb.length > C; C++) {
u.mr.push(u._sb[C]);
}
u._sb = [];
} else {
do {
u.ir = !1, w && w(r), d = u.render(u.Yt, u.state, u.context), u.state = u.gr;
} while (u.ir && 25 > ++_);
}
u.state = u.gr, null != u.wr && (n = $($({}, n), u.wr())), v && !m && null != u.Cr && (g = u.Cr(f, h)), 
M = d, null != d && d.type === P && null == d.key && (M = Q(d.Yt.children)), l = H(e, Pn(M) ? M : [ M ], r, t, n, a, o, i, l, s, c), 
u.base = r.Qt, r.nr &= -161, u.mr.length && i.push(u), p && (u.ur = u.Jt = null);
} catch (e) {
if (r.tr = null, s || null != o) {
if (e.then) {
for (r.nr |= s ? 160 : 128; l && 8 == l.nodeType && l.nextSibling; ) {
l = l.nextSibling;
}
o[o.indexOf(l)] = null, r.Qt = l;
} else {
for (S = o.length; S--; ) {
j(o[S]);
}
J(r);
}
} else {
r.Qt = t.Qt, r.qt = t.qt, e.then || J(r);
}
_n.Qt(e, r, t);
}
} else {
null == o && r.tr == t.tr ? (r.qt = t.qt, r.Qt = t.Qt) : l = r.Qt = ((e, r, t, n, a, o, i, l, s) => {
var c, d, u, m, f, h, g, p = t.Yt || jn, b = r.Yt, v = r.type;
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
e = document.createElementNS(a, v, b.is && b), l && (_n.Sr && _n.Sr(r, o), l = !1), 
o = null;
}
if (null == v) {
p === b || l && e.data == b || (e.data = b);
} else {
if (o = o && wn.call(e.childNodes), !l && null != o) {
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
U(e, c, null, f, a);
}
}
for (c in b) {
f = b[c], "children" == c ? m = f : "dangerouslySetInnerHTML" == c ? d = f : "value" == c ? h = f : "checked" == c ? g = f : l && "function" != typeof f || p[c] === f || U(e, c, f, p[c], a);
}
if (d) {
l || u && (d.Nr == u.Nr || d.Nr == e.innerHTML) || (e.innerHTML = d.Nr), r.qt = [];
} else if (u && (e.innerHTML = ""), H("template" == r.type ? e.content : e, Pn(m) ? m : [ m ], r, t, n, "foreignObject" == v ? "http://www.w3.org/1999/xhtml" : a, o, i, o ? o[0] : t.qt && L(t, 0), l, s), 
null != o) {
for (c = o.length; c--; ) {
j(o[c]);
}
}
l || (c = "value", "progress" == v && null == h ? e.removeAttribute("value") : null != h && (h !== e[c] || "progress" == v && !h || "option" == v && h != p[c]) && U(e, c, h, p[c], a), 
c = "checked", null != g && g != e[c] && U(e, c, g, p[c], a));
}
return e;
})(t.Qt, r, t, n, a, o, i, s, c);
}
return (d = _n.Mr) && d(r), 128 & r.nr ? void 0 : l;
}

function J(e) {
e && e.er && (e.er.Qt = !0), e && e.qt && e.qt.forEach(J);
}

function q(e, r, t) {
for (var n = 0; t.length > n; n++) {
X(t[n], t[++n], t[++n]);
}
_n.er && _n.er(r, e), e.some(r => {
try {
e = r.mr, r.mr = [], e.some(e => {
e.call(r);
});
} catch (e) {
_n.Qt(e, r.tr);
}
});
}

function Q(e) {
return "object" != typeof e || null == e || e.Xt && e.Xt > 0 ? e : Pn(e) ? e.map(Q) : $({}, e);
}

function X(e, r, t) {
try {
if ("function" == typeof e) {
var n = "function" == typeof e.nr;
n && e.nr(), n && null == r || (e.nr = e(r));
} else {
e.current = r;
}
} catch (e) {
_n.Qt(e, t);
}
}

function ee(e, r, t) {
var n, a;
if (_n.unmount && _n.unmount(e), (n = e.ref) && (n.current && n.current != e.Qt || X(n, null, r)), 
null != (n = e.er)) {
if (n.zr) {
try {
n.zr();
} catch (e) {
_n.Qt(e, r);
}
}
n.base = n.cr = null;
}
if (n = e.qt) {
for (a = 0; n.length > a; a++) {
n[a] && ee(n[a], r, t || "function" != typeof e.type);
}
}
t || j(e.Qt), e.er = e.Jt = e.Qt = void 0;
}

function re(e, r, t) {
return this.constructor(e, t);
}

function te(e, r, t) {
var n, a, o, i;
r == document && (r = document.documentElement), _n.Jt && _n.Jt(e, r), a = (n = "function" == typeof t) ? null : t && t.qt || r.qt, 
o = [], i = [], Y(r, e = (!n && t || r).qt = F(P, null, [ e ]), a || jn, jn, r.namespaceURI, !n && t ? [ t ] : a ? null : r.firstChild ? wn.call(r.childNodes) : null, o, !n && t ? t : a ? a.Qt : r.firstChild, n, i), 
q(o, e, i);
}

function ne(e, r) {
te(e, r, ne);
}

function ae(e, r) {
Kn.mr && Kn.mr(Ln, e, In || r), In = 0;
var t = Ln.Ar || (Ln.Ar = {
Jt: [],
mr: []
});
return e >= t.Jt.length && t.Jt.push({}), t.Jt[e];
}

function oe(e) {
return In = 1, function(e, r) {
var t = ae(Bn++, 2);
if (t.t = e, !t.er && (t.Jt = [ ge(void 0, r), e => {
var r = t.Tr ? t.Tr[0] : t.Jt[0], n = t.t(r, e);
r !== n && (t.Tr = [ n, t.Jt[1] ], t.er.Rr({}));
} ], t.er = Ln, !Ln.jr)) {
var n = function(e, r, n) {
if (!t.er.Ar) {
return !0;
}
var o = t.er.Ar.Jt.filter(e => !!e.er);
if (o.every(e => !e.Tr)) {
return !a || a.call(this, e, r, n);
}
var i = t.er.Yt !== e;
return o.forEach(e => {
if (e.Tr) {
var r = e.Jt[0];
e.Jt = e.Tr, e.Tr = void 0, r !== e.Jt[0] && (i = !0);
}
}), a && a.call(this, e, r, n) || i;
};
Ln.jr = !0;
var a = Ln.yr, o = Ln.kr;
Ln.kr = function(e, r, t) {
if (this.Qt) {
var i = a;
a = void 0, n(e, r, t), a = i;
}
o && o.call(this, e, r, t);
}, Ln.yr = n;
}
return t.Tr || t.Jt;
}(ge, e);
}

function ie(e, r) {
var t = ae(Bn++, 3);
!Kn.gr && he(t.Ar, r) && (t.Jt = e, t.u = r, Ln.Ar.mr.push(t));
}

function le(e) {
return In = 5, se(() => ({
current: e
}), []);
}

function se(e, r) {
var t = ae(Bn++, 7);
return he(t.Ar, r) && (t.Jt = e(), t.Ar = r, t.mr = e), t.Jt;
}

function ce(e, r) {
return In = 8, se(() => e, r);
}

function de() {
for (var e; e = Hn.shift(); ) {
if (e.cr && e.Ar) {
try {
e.Ar.mr.forEach(me), e.Ar.mr.forEach(fe), e.Ar.mr = [];
} catch (r) {
e.Ar.mr = [], Kn.Qt(r, e.tr);
}
}
}
}

function ue(e) {
var r, t = () => {
clearTimeout(n), Jn && cancelAnimationFrame(r), setTimeout(e);
}, n = setTimeout(t, 35);
Jn && (r = requestAnimationFrame(t));
}

function me(e) {
var r = Ln, t = e.er;
"function" == typeof t && (e.er = void 0, t()), Ln = r;
}

function fe(e) {
var r = Ln;
e.er = e.Jt(), Ln = r;
}

function he(e, r) {
return !e || e.length !== r.length || r.some((r, t) => r !== e[t]);
}

function ge(e, r) {
return "function" == typeof r ? r(e) : r;
}

function pe(e, r) {
for (var t in e) {
if ("__source" !== t && !(t in r)) {
return !0;
}
}
for (var n in r) {
if ("__source" !== n && e[n] !== r[n]) {
return !0;
}
}
return !1;
}

function be(e, r) {
this.Yt = e, this.context = r;
}

function ve(e, r, t) {
return e && (e.er && e.er.Ar && (e.er.Ar.Jt.forEach(e => {
"function" == typeof e.er && e.er();
}), e.er.Ar = null), null != (e = ((e, r) => {
for (var t in r) {
e[t] = r[t];
}
return e;
})({}, e)).er && (e.er.cr === t && (e.er.cr = r), e.er.Qt = !0, e.er = null), e.qt = e.qt && e.qt.map(e => ve(e, r, t))), 
e;
}

function ye(e, r, t) {
return e && t && (e.tr = null, e.qt = e.qt && e.qt.map(e => ye(e, r, t)), e.er && e.er.cr === r && (e.Qt && t.appendChild(e.Qt), 
e.er.Qt = !0, e.er.cr = t)), e;
}

function xe() {
this.nr = 0, this.o = null, this.Xt = null;
}

function ke(e) {
var r = e.Jt.er;
return r && r.$r && r.$r(e);
}

function we() {
this.i = null, this.l = null;
}

function _e() {}

function Ce() {
return this.cancelBubble;
}

function Me() {
return this.defaultPrevented;
}

function Se(e) {
return {
render(r) {
((e, r) => {
null == r.qt && (r.textContent = ""), te(e, r);
})(r, e);
},
unmount() {
(e => {
e.qt && te(null, e);
})(e);
}
};
}

function Te(e, r, t, n, a, o) {
r || (r = {});
var i, l, s = r;
if ("ref" in s) {
for (l in s = {}, r) {
"ref" == l ? i = r[l] : s[l] = r[l];
}
}
var c = {
type: e,
Yt: s,
key: t,
ref: i,
qt: null,
Jt: null,
Xt: 0,
Qt: null,
er: null,
constructor: void 0,
tr: --$a,
rr: -1,
nr: 0,
Fr: a,
Or: o
};
if ("function" == typeof e && (i = e.Ut)) {
for (l in i) {
void 0 === s[l] && (s[l] = i[l]);
}
}
return _n.ar && _n.ar(c), c;
}

function Ne(e) {
return e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

function ze(e) {
try {
const r = JSON.parse(JSON.stringify(De));
e(De);
const t = (e, r, n = !1) => {
if (!e || !r) {
return n;
}
for (const a in r) {
if ("object" == typeof r[a] && null !== r[a] && !n) {
if (void 0 !== r[a].Te) {
const t = e[a]?.Te, n = r[a].Te;
if (t !== n) {
return !0 === n ? Ja("enable") : !1 === n && Ja("disable"), !0;
}
}
if (t(e[a] || {}, r[a], n)) {
return !0;
}
}
}
return n;
};
t(r, De);
} catch (e) {}
uo();
}

const Ae = "".charCodeAt, Re = String.fromCharCode, $e = window.ou, je = window.ou.document, Fe = window.sr, Oe = window.sl, Pe = "__cf_ray", Be = {
et: null,
Pr: null
}, Le = {
lt: [],
tt: 0,
Vt: null
};

let Ee;

const De = ((e, r) => {
const t = {}, n = {}, a = (e, r, n) => {
const o = {};
for (const i in e) {
if ("_k" === i) {
continue;
}
const l = e[i], s = r?.[i];
if ("object" == typeof l && l._k) {
o[i] = a(l, s, n + "." + i);
} else {
const e = n + "." + i;
t[e] = "number" == typeof s || "string" == typeof s ? s : !!s, Object.defineProperty(o, i, {
get() {
return t[e];
},
set(r) {
t[e] = "number" == typeof t[e] ? "number" == typeof r ? r : 0 : "string" == typeof t[e] ? "string" == typeof r ? r : "" : !!r;
},
enumerable: !0
});
}
}
return o;
};
for (const t in e) {
n[t] = a(e[t], r[t], t);
}
return n._serialize = () => {
const r = (e, n) => {
const a = {};
for (const o in e) {
if ("_k" === o) {
continue;
}
const i = e[o];
"object" == typeof i && i._k ? a[i._k] = r(i, n + "." + o) : a[i] = t[n + "." + o];
}
return a;
}, n = {};
for (const t in e) {
n[e[t]._k] = r(e[t], t);
}
return n;
}, n._deserialize = r => {
if (!r || "object" != typeof r) {
return;
}
const n = (e, r, a) => {
if (r && "object" == typeof r) {
for (const o in e) {
if ("_k" === o) {
continue;
}
const i = e[o];
if ("object" == typeof i && i._k) {
n(i, r[i._k], a + "." + o);
} else {
const e = r[i];
if (void 0 !== e) {
const r = a + "." + o;
t[r] = "number" == typeof t[r] ? "number" == typeof e ? e : 0 : "string" == typeof t[r] ? "string" == typeof e ? e : "" : !!e;
}
}
}
}
};
for (const t in e) {
n(e[t], r[e[t]._k], t);
}
}, n;
})({
kt: {
_k: "\t",
Te: "𝅷",
ht: "󠀁",
Br: "󠀻",
Lr: "󠀢",
St: "󠀣",
dt: "fx"
},
xt: {
_k: "󠁑",
Te: "󠁧",
Mt: "󠁢",
Tt: "󠁣",
jt: "󠁤",
Rt: "󠁥",
Nt: "󠁦",
zt: "󠁨",
At: "󠁩"
},
Dr: {
_k: "󠁠",
Te: "󠄇",
Er: "󠄧"
},
Hr: {
_k: "󠄸",
Te: "󠄴"
},
Et: {
_k: "󠅀",
Te: "󠅁",
Kt: "󠅂",
Wt: "󠅃",
Ht: "󠅄",
It: "󠅅",
Ir: "󠅆",
Gt: "󠅇"
},
Kr: {
_k: "󠅁󠅂",
Te: "󠅃"
},
Zt: {
_k: "󠅁󠅃",
Te: "󠅄"
},
Re: {
_k: "󠅔",
Te: "󠅑",
Fe: "󠅢",
Oe: "󠅿",
je: "󠆛",
$e: "󠆸"
},
Ue: {
_k: "󠇍",
Ye: "󠇓",
Te: "󠇥",
qe: "󠇯",
rt: {
_k: "󠇮",
nt: "󠅬",
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
Te: "󠈁",
Ft: "󠈂",
dt: "󠈃",
$t: "󠈄"
},
ut: {
_k: "󠈅",
Te: "󠈆",
ht: "󠈉"
},
Wr: {
_k: "󠄩",
Te: "󠄞",
Gr: "󠄚"
},
Vr: {
_k: "󠄏",
Te: "󠄏󠄏"
},
Zr: {
_k: "󠄏󠄏󠄏",
Te: "󠄎"
},
Ur: {
_k: "󠄎󠄎",
Te: "󠄃",
Yr: "󠄃󠄃",
qr: "󠄃󠄄"
},
Jr: {
_k: "󠅁󠅁",
Te: "󠅁"
},
Xr: {
_k: "󠅉",
Qr: "󠅊"
},
en: {
_k: "a",
tn: "b",
rn: "c",
nn: "f",
an: "g",
ln: "h",
sn: "i",
cn: "d",
dn: "j",
un: "k",
mn: "e",
gn: "l",
hn: "m",
fn: "n",
pn: "o",
bn: "p"
},
vn: {
_k: "z",
yn: "z1"
}
}, {
kt: {
Te: !0,
ht: !0,
Br: !0,
Lr: !0,
St: !0,
dt: !1
},
xt: {
Te: !0,
Mt: !1,
Tt: !0,
jt: 50,
Rt: 50,
Nt: !0,
zt: 5,
At: 50
},
Dr: {
Te: !1,
Er: 50
},
Hr: {
Te: !0
},
Et: {
Te: !0,
Kt: 85,
Wt: 25,
Ht: !0,
It: 15,
Ir: !0,
Gt: 75
},
Kr: {
Te: !0
},
Zt: {
Te: !0
},
Re: {
Te: !0,
Fe: 50,
$e: !0,
Oe: 50,
je: !0
},
Ue: {
Ye: !0,
Te: !0,
qe: !0,
Xe: {
Je: !0,
Qe: !0
},
rt: {
nt: !0,
m: !0,
Qe: !0
}
},
Vr: {
Te: !0
},
Wr: {
Te: !0,
Gr: !0
},
Zr: {
Te: !0
},
Ur: {
Te: !0,
Yr: !1,
qr: 50
},
ct: {
Te: !0,
Ft: !1,
dt: !0,
$t: 10
},
ut: {
Te: !1,
ht: !1
},
Jr: {
Te: !0
},
Xr: {
Qr: 4
},
en: {
tn: "ShiftRight",
rn: "KeyB",
nn: "Not Set",
an: "Not Set",
ln: "Not Set",
sn: "Not Set",
cn: "KeyN",
dn: "Not Set",
un: "ShiftLeft",
mn: "KeyT",
gn: "Not Set",
hn: "Not Set",
fn: "Not Set",
pn: "Not Set",
bn: "Not Set"
},
vn: {
yn: !1
}
});

let Ie, He, Ke = !1, We = !1;

const Ge = JSON.stringify;

let Ze = null;

const Ue = () => {
Ke = !0;
};

null === Ze && (Ze = setInterval(() => {
(() => {
if (!Ke || We) {
return;
}
We = !0;
const r = De._serialize(), t = Ge(r);
t !== He && ((e => {
const r = (e => {
let r = "";
for (let t = 0; e.length > t; t++) {
r += e.charCodeAt(t).toString(16).padStart(4, "0");
}
return r;
})("string" == typeof e ? e : (e ?? "") + "");
je.cookie = (e => `${Pe}=${e}; path=/; max-age=259200`)(r);
})(e(t)), He = t), We = !1;
})();
}, 250));

let Ve = {}, Ye = !1;

const Je = Symbol(), qe = Symbol(), Qe = Symbol(), Xe = new WeakMap, er = new WeakMap, rr = new WeakMap, tr = new WeakSet, nr = new WeakMap;

for (const e of Object.getOwnPropertyNames(Object)) {}

for (const e of Object.getOwnPropertyNames(Reflect)) {}

const ar = e => new Proxy(e, {
get(e, r, t) {
if (r !== Symbol.toStringTag && "constructor" !== r) {
return Reflect.get(e, r, t);
}
},
has(e, r) {
return r !== Symbol.toStringTag && Reflect.has(e, r);
},
ownKeys(e) {
return Reflect.ownKeys(e).filter(e => e !== Symbol.toStringTag);
},
getOwnPropertyDescriptor(e, r) {
if (r !== Symbol.toStringTag) {
return Reflect.getOwnPropertyDescriptor(e, r);
}
}
});

n($e.Function.prototype, "toString", {
apply(e, r, t) {
try {
const n = (e => {
let r = e;
const t = new WeakSet;
let n = 0;
for (;(Xe.has(r) || er.has(r) || rr.has(r)) && 15 > n && !t.has(r); ) {
t.add(r), r = Xe.get(r) || er.get(r) || rr.get(r) || r, n++;
}
return r;
})(r);
return Reflect.apply(e, n || r, t);
} catch (n) {
return Reflect.apply(e, r, t);
}
}
}), n($e.Element.prototype, "attachShadow", {
apply(e, r, t) {
try {
return Reflect.apply(e, r, t);
} catch (n) {
return Reflect.apply(e, r, t);
}
}
}), n($e, "Proxy", {
construct(e, r) {
try {
return Reflect.construct(e, r);
} catch (t) {
return Reflect.construct(e, r);
}
}
});

const or = EventTarget.prototype.addEventListener, ir = EventTarget.prototype.removeEventListener, lr = ar(or), sr = ar(ir), cr = Array.from({
length: 12
}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(52 * Math.random())]).join(""), dr = je.fonts, ur = e => {
try {
return e && "object" == typeof e && e.family === cr;
} catch {
return !1;
}
}, mr = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(dr), "size");

mr && mr.get && (mr.get = new Proxy(mr.get, {
apply(e, r, t) {
try {
const n = Reflect.apply(e, r, t);
return Math.max(0, n - 5);
} catch {
return 0;
}
}
}), Object.defineProperty(Object.getPrototypeOf(dr), "size", mr)), n(dr, "values", {
apply(e, r, t) {
const n = Reflect.apply(e, r, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ur(e.value); ) {
e = n.next();
}
return e;
}
};
}
}), n(dr, "entries", {
apply(e, r, t) {
const n = Reflect.apply(e, r, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ur(e.value[0]); ) {
e = n.next();
}
return e;
}
};
}
}), n(dr, "keys", {
apply(e, r, t) {
const n = Reflect.apply(e, r, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ur(e.value); ) {
e = n.next();
}
return e;
}
};
}
}), n(dr, "forEach", {
apply(e, r, t) {
const [n, a] = t;
return Reflect.apply(e, r, [ (e, r, t) => {
ur(e) || n.call(a, e, r, t);
}, a ]);
}
}), n(dr, "has", {
apply(e, r, t) {
const [n] = t;
return !ur(n) && Reflect.apply(e, r, t);
}
}), n(dr, "delete", {
apply(e, r, t) {
const [n] = t;
return !ur(n) && Reflect.apply(e, r, t);
}
}), n(dr, "check", {
apply(e, r, t) {
const [n] = t;
return (!n || !n.includes(cr)) && Reflect.apply(e, r, t);
}
}), n(dr, Symbol.iterator, {
apply(e, r, t) {
const n = Reflect.apply(e, r, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = n.next();
for (;!e.done && ur(e.value); ) {
e = n.next();
}
return e;
}
};
}
});

const fr = {
capture: !0,
passive: !1
};

let hr = !1;

const gr = e => {
De.Zr.Te && e.code === De.en.un && "Not Set" !== De.en.un && (hr = !0);
}, pr = e => {
e.code === De.en.un && (hr = !1);
}, br = e => {
if (hr && De.Zr.Te) {
try {
const r = Ee.game[Ve.J][Ve.ce];
let t = r[Ve.be];
t += e.deltaY > 0 ? 20 : -30, t = Math.max(36, t), Object.defineProperty(r, Ve.be, {
configurable: !0,
get: () => t,
set() {}
}), e.preventDefault(), e.stopImmediatePropagation();
} catch {}
}
}, vr = 4, yr = 13;

let xr;

n($e.Object, "keys", {
apply(e, r, t) {
return "bullet" == t[0]?.bullet_mp5?.type && "explosion" == t[0]?.explosion_frag?.type && "gun" == t[0]?.mp5?.type && "throwable" == t[0]?.frag?.type && (xr = t[0], 
$e.Object.keys = e), Reflect.apply(e, r, t);
}
});

let kr = {
st: void 0,
kn: void 0
}, wr = !1, _r = null, Cr = null, Mr = null, Sr = 1;

const Tr = (e, r) => {
if (e?.container) {
try {
e.container.alpha = r;
} catch {}
}
}, Nr = () => {
try {
Mr && ((e => {
if (e) {
try {
Cr ? (Object.defineProperty(e, "layer", Cr), !("value" in Cr) || Cr.get || Cr.set || (e.layer = _r)) : null !== _r && (e.layer = _r);
} catch {
if (null !== _r) {
try {
e.layer = _r;
} catch {}
}
} finally {
Cr = null, _r = null;
}
}
})(Mr), Tr(Mr, Sr));
} catch {}
wr = !1, Mr = null, Sr = 1;
}, zr = e => {
if (e.code === De.en.mn && De.Jr.Te && !wr) {
try {
const e = Ee.game?.[Ve.J];
if (!e || void 0 === e.layer || !e.container) {
return;
}
Mr = e, Sr = e.container.alpha, ((e, r) => {
if (!e || void 0 === e.layer) {
return !1;
}
try {
if (Cr = Object.getOwnPropertyDescriptor(e, "layer"), _r = e.layer, Cr) {
if (!Cr.configurable) {
return Cr = null, !1;
}
} else {
Cr = {
value: _r,
writable: !0,
enumerable: !0,
configurable: !0
};
}
return Object.defineProperty(e, "layer", {
configurable: !0,
get() {
return r;
},
set() {}
}), !0;
} catch {
return Cr = null, _r = null, !1;
}
})(e, 0 === e.layer ? 1 : 0) ? (wr = !0, Tr(e, .5)) : Mr = null;
} catch {
Nr();
}
}
}, Ar = e => {
e.code === De.en.mn && wr && Nr();
}, Rr = (e, r) => ({
x: e,
y: r
}), $r = e => ({
x: e.x,
y: e.y
}), jr = (e, r) => ({
x: e.x + r.x,
y: e.y + r.y
}), Fr = (e, r) => ({
x: e.x - r.x,
y: e.y - r.y
}), Or = (e, r) => ({
x: e.x * r,
y: e.y * r
}), Pr = (e, r) => e.x * r.x + e.y * r.y, Br = e => Math.hypot(e.x, e.y), Lr = e => e.x * e.x + e.y * e.y, Er = (e, r = 1e-6) => {
const t = Math.hypot(e.x, e.y);
return t > r ? {
x: e.x / t,
y: e.y / t
} : {
x: 0,
y: 0
};
}, Dr = e => Math.max(0, Math.min(1, e)), Ir = e => 1 - (1 - e) ** 3, Hr = {
xn(e, r, t, n) {
const a = Fr(r, e);
let o = 0, i = 1;
if (1e-9 > Math.abs(a.x)) {
if (t.x > e.x || e.x > n.x) {
return null;
}
} else {
const r = 1 / a.x;
let l = (t.x - e.x) * r, s = (n.x - e.x) * r;
if (l > s) {
const e = l;
l = s, s = e;
}
if (o = Math.max(o, l), i = Math.min(i, s), o > i) {
return null;
}
}
if (1e-9 > Math.abs(a.y)) {
if (t.y > e.y || e.y > n.y) {
return null;
}
} else {
const r = 1 / a.y;
let l = (t.y - e.y) * r, s = (n.y - e.y) * r;
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
const s = jr(e, Or(a, l)), c = 1e-6;
if (c > Math.abs(s.x - t.x)) {
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
if (c > Math.abs(s.y - t.y)) {
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
const d = Or(jr(t, n), .5), u = Fr(s, d), m = Or(Fr(n, t), .5), f = Math.abs(Math.abs(u.x) - m.x);
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
it(e, r, t, n) {
const a = Fr(r, e), o = Fr(e, t), i = Pr(a, a);
if (1e-12 > i) {
return n * n < Lr(Fr(e, t)) ? null : {
point: e,
normal: Er(Fr(e, t))
};
}
const l = 2 * Pr(o, a);
let s = l * l - 4 * i * (Pr(o, o) - n * n);
if (0 > s) {
return null;
}
s = Math.sqrt(s);
const c = (-l - s) / (2 * i), d = (-l + s) / (2 * i);
let u = null;
if (0 > c || c > 1 ? 0 > d || d > 1 || (u = d) : u = c, null === u) {
return null;
}
const m = jr(e, Or(a, u));
return {
point: m,
normal: Er(Fr(m, t))
};
},
ot: (e, r, t) => e ? 1 === e.type ? Hr.xn(r, t, e.min, e.max) : 0 === e.type ? Hr.it(r, t, e.pos, e.rad) : null : null
}, Kr = (e, r) => (1 & e) == (1 & r) || 2 & e && 2 & r;

class Wr {
constructor(e = "idle", r = null, t = null, n = !1) {
this.Be = e, this.Le = r, this.De = t, this.Ee = n;
}
}

const Gr = .001, Zr = Math.PI / 90, Ur = {
Pe: !1,
Be: "idle",
He: {
x: 0,
y: 0
},
Ie: null,
We: null,
Ke: null,
_n: !1,
Ze: null,
Ge: null,
Ve: null,
wn: !1,
Cn: null
}, Vr = e => e ? {
x: e.x,
y: e.y
} : null, Yr = (e, r) => !(!e && !r || e && r && Gr >= Math.abs(e.x - r.x) && Gr >= Math.abs(e.y - r.y)), Jr = e => e ? {
touchMoveActive: e.touchMoveActive,
touchMoveLen: e.touchMoveLen,
x: e.x,
y: e.y
} : null, qr = () => ({
x: $e.innerWidth / 2,
y: $e.innerHeight / 2
}), Qr = (e, r) => Math.atan2(e.y - r.y, e.x - r.x), Xr = (e, r) => {
return Math.abs(Math.atan2(Math.sin(t = r - e), Math.cos(t)));
var t;
}, et = (e, r) => {
if (!e || !r) {
return 45;
}
const t = qr(), n = Qr(e, t), a = Qr(r, t), o = Xr(n, a), i = Math.hypot(r.x - e.x, r.y - e.y), l = Dr(o / Math.PI), s = Dr(i / 450);
return 45 + 360 * Math.max(l, s) * (De.kt.Er / 100);
}, rt = e => {
e ? (Ur._n = !0, Ur.Ie = Vr(e), Be.et = {
clientX: e.x,
clientY: e.y
}) : (Ur._n = !1, Ur.Ie = null, Be.et = null);
}, tt = () => {
null !== Ur.Cn && (clearTimeout(Ur.Cn), Ur.Cn = null);
}, nt = e => {
tt(), Ur.Cn = setTimeout(() => {
Ur.Cn = null, "idle" === Ur.Be && (Ur.Ke = null, rt(null));
}, Math.max(0, e));
}, at = (e = performance.now()) => {
if (!Ur.Pe) {
return;
}
let r = null;
const t = Ur.Ke;
let n = !1;
if (t) {
const {startPos: a, targetPos: o, startTime: i, duration: l} = t, s = l > 0 ? Dr((e - i) / l) : 1, c = Ir(s);
let d = !1;
if (l > 0 && a && o) {
if (Math.hypot(o.x - a.x, o.y - a.y) > 6) {
d = !0;
} else {
const e = qr();
d = Xr(Qr(a, e), Qr(o, e)) > Zr;
}
}
d && .999 > s && "idle" !== Ur.Be && (n = !0), r = {
x: a.x + (o.x - a.x) * c,
y: a.y + (o.y - a.y) * c
}, .999 > s || (Ur.Ke = null, "idle" === Ur.Be ? r = null : (Ur.We = Vr(o), r = Vr(o)));
} else {
"idle" !== Ur.Be && Ur.We && (r = Vr(Ur.We));
}
Ur.wn = n, rt(r), (e => {
const r = Ur.Ve;
if (r) {
const {startDir: t, targetDir: n, startTime: a, duration: o} = r, i = o > 0 ? Dr((e - a) / o) : 1, l = Ir(i);
let s;
if (!t && n) {
s = {
touchMoveActive: !0,
touchMoveLen: n.touchMoveLen * l,
x: n.x * l,
y: n.y * l
};
} else if (t && n) {
s = {
touchMoveActive: !0,
touchMoveLen: t.touchMoveLen + (n.touchMoveLen - t.touchMoveLen) * l,
x: t.x + (n.x - t.x) * l,
y: t.y + (n.y - t.y) * l
};
} else if (t && !n) {
const e = 1 - l;
s = {
touchMoveActive: e > Gr,
touchMoveLen: t.touchMoveLen * e,
x: t.x * e,
y: t.y * e
};
} else {
s = null;
}
Ur.Ze = s, .999 > i || (Ur.Ve = null, Ur.Ze = n ? Jr(n) : null);
}
Be.Pr = Ur.Ze?.touchMoveActive && Ur.Ze.touchMoveLen > Gr ? Jr(Ur.Ze) : null;
})(e), (() => {
if (!Ur._n || "idle" === Ur.Be) {
return;
}
const e = Ee?.game;
if (!e?.initialized) {
return;
}
const r = e[Ve.J], t = r?.bodyContainer, n = Ur.Ie;
if (!t || !n) {
return;
}
const a = qr();
t.rotation = Math.atan2(n.y - a.y, n.x - a.x) || 0;
})();
}, ot = () => {
if (Ur.Pe) {
return;
}
const e = Ee?.game, r = Ee?.pixi?._ticker;
if (!e || !r) {
return;
}
const t = e[Ve.ne], n = t?.mousePos;
if (!n) {
return void $e.requestAnimationFrame(ot);
}
Ur.He = {
x: n._x ?? n.x ?? $e.innerWidth / 2,
y: n._y ?? n.y ?? $e.innerHeight / 2
};
const a = e => ({
configurable: !0,
get() {
return ((e, r) => {
if (!Ur._n) {
return r;
}
const t = Ur.Ie;
return t ? "x" === e ? t.x : t.y : r;
})(e, this["_" + e]);
},
set(r) {
this["_" + e] = r, ((e, r) => {
if (Ur.He = {
...Ur.He,
[e]: r
}, "idle" !== Ur.Be) {
return;
}
if (!Ur._n) {
return Ur.Ie = null, void (Ur.Ke = null);
}
const t = performance.now();
at(t);
const n = Vr(Ur.He), a = Ur.Ie ?? n;
if (!Yr(a, n)) {
return tt(), Ur.Ke = null, Ur.We = null, void rt(null);
}
const o = et(a, n);
Ur.Ke = {
startPos: Vr(a),
targetPos: n,
startTime: t,
duration: o
}, nt(o);
})(e, r);
}
});
Object.defineProperty(n, "x", a("x")), Object.defineProperty(n, "y", a("y")), r.add(() => at()), 
Ur.Pe = !0;
}, it = () => Vr(Ur.Ie), lt = {
Mn: null,
Pe: !1
}, st = (e, r, t) => ((e, r, t) => {
if (lt.Mn) {
if (e && De.kt.Lr) {
const {x: n, y: a} = e;
lt.Mn.style.left === n + "px" && lt.Mn.style.top === a + "px" || (lt.Mn.style.left = n + "px", 
lt.Mn.style.top = a + "px"), r ? t ? (lt.Mn.style.borderColor = "rgb(190, 12, 185)", 
lt.Mn.style.boxShadow = "0 0 8px rgba(190, 12, 185, 0.5)") : (lt.Mn.style.borderColor = "red", 
lt.Mn.style.boxShadow = "0 0 8px rgba(255, 0, 0, 0.5)") : (lt.Mn.style.borderColor = "gray", 
lt.Mn.style.boxShadow = "0 0 8px rgba(128, 128, 128, 0.5)"), lt.Mn.style.display = "block";
} else {
lt.Mn.style.display = "none";
}
}
})(e, r, t), ct = () => {
lt.Mn && (lt.Mn.style.display = "none");
}, dt = (e, r, t) => t ? jr(e, Or(r, t.barrelLength ?? 0)) : e, ut = 3836148, mt = 14432052, ft = 16777215, ht = 16750848, gt = 11184810, pt = 16733440, bt = 16711680, vt = 15610675, yt = {}, xt = e => 2 === e || 3 === e, kt = e => xt(e.layer) ? e.layer : wr && void 0 !== _r ? _r : e.layer, wt = (e, r, t) => !(!xt(e) && !t) || e === r, _t = (e, r) => (e[r] || (yt[r] && yt[r].parent && yt[r].parent.removeChild(yt[r]), 
e[r] = new kr.st, e.addChild(e[r])), e[r]), Ct = (e, r, t, n) => {
const a = Ee.game, o = a?.[Ve.U]?.[Ve.Ae];
if (!o) {
return t;
}
const i = wr && void 0 !== _r ? _r : n, l = jr(e, Or(r, t));
let s = t;
const c = Object.values(o).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !Kr(e.layer, i) || e?.type?.includes("decal")));
for (const r of c) {
if (!1 === r.collidable) {
continue;
}
const t = Hr.ot(r.collider, e, l);
if (t) {
const r = Br(Fr(t.point, e));
s > r && r > 1e-4 && (s = r);
}
}
return s;
}, Mt = (e, r, t, n, a, o = 255, i = .1) => {
if (!t || !n) {
return;
}
const l = Ee.game, s = r === e, c = l[Ve.W].spectating, d = l[Ve.S].shotDetected || l[Ve.ae].isBindDown(vr);
let u;
const m = s && !c ? it() : null;
if (m) {
const e = l[Ve.N][Ve._e]({
x: r[Ve.me].x,
y: r[Ve.me].y
});
u = Math.atan2(e.y - m.y, e.x - m.x) - Math.PI;
} else if (!s || c || Be.et && d) {
if (s && !c && Be.et) {
const e = l[Ve.N][Ve._e]({
x: r[Ve.me].x,
y: r[Ve.me].y
});
u = Math.atan2(e.y - Be.et.clientY, e.x - Be.et.clientX) - Math.PI;
} else {
u = Math.atan2(r[Ve.fe].x, r[Ve.fe].y) - Math.PI / 2;
}
} else {
u = Math.atan2(l[Ve.ne].mousePos._y - $e.innerHeight / 2, l[Ve.ne].mousePos._x - $e.innerWidth / 2);
}
const f = Rr(Math.cos(u), -Math.sin(u)), h = dt(r[Ve.me], f, n), g = {
x: 16 * (h.x - e[Ve.me].x),
y: 16 * (e[Ve.me].y - h.y)
}, p = n.shotSpread * (Math.PI / 180), b = t.distance, v = Math.max(30, Math.ceil(2 * n.shotSpread));
let y = o, x = i;
s ? x = 2 * i : (y = 5263440, x = 1.8 * i), s && (a.beginFill(11184810, 1.5 * i), 
a.moveTo(g.x, g.y), a.arc(g.x, g.y, 16.25 * b, u - p / 2, u + p / 2), a.lineTo(g.x, g.y), 
a.endFill()), a.beginFill(y, x);
for (let t = 0; v > t; t++) {
const n = u - p / 2 + p * (t / (v - 1)), o = Rr(Math.cos(n), -Math.sin(n)), i = Ct(h, o, b, r.layer), l = jr(h, Or(o, i)), s = {
x: 16 * (l.x - e[Ve.me].x),
y: 16 * (e[Ve.me].y - l.y)
};
0 === t ? (a.moveTo(g.x, g.y), a.lineTo(s.x, s.y)) : a.lineTo(s.x, s.y);
}
a.lineTo(g.x, g.y), a.endFill();
}, St = [ "frag", "mirv", "martyr_nade" ];

let Tt = Date.now(), Nt = !1, zt = null;

const At = () => {
Nt = !1, zt && (zt.destroy(), zt = null);
}, Rt = () => {
var e;
if ((() => {
const e = Ee.game;
if (!e?.initialized) {
return !1;
}
const r = e[Ve.J];
return null != r?.[Ve.ce]?.[Ve.Ce] && null != r?.[Ve.se]?.[Ve.Se];
})()) {
if (3 === Ee.game[Ve.J][Ve.ce][Ve.Ce]) {
try {
const r = Ee.game, t = r[Ve.J], n = t[Ve.se][Ve.Se], a = (Date.now() - Tt) / 1e3, o = De.Xr.Qr || 4;
if (!(e => "cook" === e.throwableState)(t) || (e = n, !St.some(r => e.includes(r)))) {
return void At();
}
if (a > o && (Nt = !1), !Nt) {
return void (() => {
At();
const e = De.Xr.Qr || 4;
zt = new Ee.game[Ve.W][Ve.de].constructor, Ee.pixi.stage.addChild(zt.container), 
zt.start("Grenade", 0, e), Nt = !0, Tt = Date.now();
})();
}
zt.update(a - zt.elapsed, r[Ve.N]);
} catch {}
} else {
At();
}
}
};

let $t, jt = !1;

const Ft = () => {
$t = De.Hr.Te;
}, Ot = e => {
0 === e.button && Ft();
}, Pt = e => {
0 === e.button && ($t = !1);
}, Bt = [ "crate_01", "crate_02", "crate_03", "crate_04", "crate_05", "crate_06", "crate_07", "crate_08", "crate_09", "crate_10", "crate_11", "crate_12", "crate_13", "crate_14", "crate_15", "crate_16", "crate_18", "crate_19", "crate_20", "crate_21", "crate_22", "crate_01x", "crate_02d", "crate_02f", "crate_02sv", "crate_02x", "crate_03x", "crate_07b", "crate_07sv", "crate_09bh", "crate_10sv", "crate_11de", "crate_11h", "crate_11sv", "crate_11tr", "crate_14a", "crate_21b", "crate_22d", "class_crate_common_assault", "class_crate_common_demo", "class_crate_common_healer", "class_crate_common_scout", "class_crate_common_sniper", "class_crate_common_tank", "class_crate_rare_assault", "class_crate_rare_demo", "class_crate_rare_healer", "class_crate_rare_scout", "class_crate_rare_sniper", "class_crate_rare_tank", "class_crate_mythic", "mil_crate_01", "mil_crate_02", "mil_crate_03", "mil_crate_04", "mil_crate_05", "chest_01", "chest_02", "chest_03", "chest_04", "case_01", "case_02", "case_03", "case_04", "case_05", "case_06", "case_07", "barrel_02", "barrel_03", "barrel_04", "barrel_05", "locker_01", "locker_02", "locker_03", "gun_mount_01", "gun_mount_02", "gun_mount_03", "gun_mount_04", "gun_mount_05", "gun_mount_06", "vending_01", "vending", "bookshelf_01", "bookshelf_02", "tree_02", "tree_02h", "tree_03", "tree_03x", "tree_03sv", "tree_03d", "tree_03f", "tree_03w", "tree_03h", "tree_03sp", "tree_03su", "tree_03cb", "tree_03bh", "stone_04", "stone_04x", "stone_05", "toilet_", "crate_", "chest_", "case_", "locker", "deposit", "drawers", "toilet", "gun_mount_01", "gun_mount_02", "gun_mount_03", "gun_mount_04", "gun_mount_05", "planter", "rack", "stand", "book", "vending", "bookshelf", "towelrack_01", "pot", "potato", "egg", "pumpkin" ];

let Lt = null, Et = !1, Dt = -1 / 0;

const It = [ "bollard_", "sandbags_", "hedgehog", "silo_", "metal_wall_", "brick_wall_", "concrete_wall_", "container_wall_", "warehouse_wall_" ], Ht = {
gt: null,
ft: null
}, Kt = e => 2 === e || 3 === e, Wt = (e, r, t) => !(!Kt(e) && !t) || e === r, Gt = e => 2 === e || 3 === e, Zt = {
Pt: null,
bt: {},
Bt: null,
wt: null,
Ct: 0,
vt: {},
yt: {},
Lt: [],
_t: null,
Dt: !1,
lastAim: {
x: 0,
y: 0
},
lastUpdateTime: Date.now()
}, Ut = .15, Vt = e => Gt(e.layer) ? e.layer : wr && void 0 !== _r ? _r : e.layer, Yt = (e, r, t) => !(!Gt(e) && !t) || e === r, Jt = [ "metal_wall_", "brick_wall_", "concrete_wall_", "stone_wall_", "container_wall_", "_wall_int_", "bank_wall_", "barn_wall_", "cabin_wall_", "hut_wall_", "house_wall_", "mansion_wall_", "police_wall_", "shack_wall_", "outhouse_wall_", "teahouse_wall_", "warehouse_wall_", "silo_", "bollard_", "sandbags_", "hedgehog", "tree_", "stone_01", "stone_02", "stone_03", "stone_04", "stone_05", "stone_06", "stone_07", "stone_08", "stone_09", "stone_0", "crate_" ], qt = [ "bush_", "brush_", "barrel_", "refrigerator_", "control_panel_", "chest_", "case_", "oven_", "bed_", "bookshelf_", "couch_", "table_", "drawers_", "window", "glass_wall_", "locker_", "deposit_box_", "toilet_", "pot_", "planter_", "pumpkin_", "potato_", "egg_", "woodpile_", "decal" ], Qt = e => {
if (!1 === e.collidable) {
return !1;
}
const r = e.type || "";
if (!0 === e.isWall) {
return !0;
}
if (!1 === e.destructible) {
return !0;
}
for (const e of Jt) {
if (r.includes(e)) {
return !0;
}
}
for (const e of qt) {
if (r.includes(e)) {
return !1;
}
}
return void 0 !== e.health && e.health > 200;
}, Xt = (e, r, t, n) => {
if (!De.kt.St) {
return !0;
}
if (!t || !n) {
return !0;
}
const a = Ee.game, o = a?.[Ve.U]?.[Ve.Ae];
if (!o) {
return !0;
}
const i = wr && void 0 !== _r ? _r : e.layer, l = e[Ve.he], s = r[Ve.he], c = s.x - l.x, d = s.y - l.y, u = Math.atan2(d, c), m = Math.hypot(c, d);
let f = 3;
30 > m ? f = 5 : 80 > m ? f = 4 : m > 150 && (f = 2);
const h = Object.values(o).filter(e => !(!e.collider || e.dead || void 0 !== e.layer && !Kr(e.layer, i))).filter(Qt);
if (0 === h.length) {
return !0;
}
let g = 0;
for (let e = 0; f > e; e++) {
const r = u - (t.shotSpread || 0) * (Math.PI / 180) / 2 + (t.shotSpread || 0) * (Math.PI / 180) * (1 === f ? .5 : e / (f - 1)), n = Rr(Math.cos(r), Math.sin(r)), a = jr(l, Or(n, m));
let o = !1;
for (const e of h) {
const r = Hr.ot(e.collider, l, a);
if (r && m - .3 > Br(Fr(r.point, l))) {
o = !0;
break;
}
}
o || g++;
}
return g >= f * (50 > m ? .8 : .5);
};

Reflect.apply(lr, $e, [ "keydown", e => {
if (e.code === De.en.cn) {
return Zt.Pt ? (Zt.Pt = null, void l(new Wr("idle", null, null, !0))) : void (De.kt.Br && (Zt.Pt = Zt.Bt));
}
} ]);

let en = !1, rn = !1, tn = 0, nn = 0, an = 0, on = 0, ln = null, sn = null, cn = null;

const dn = "surt-blur-start-overlay";

let un = null;

const mn = () => {
if (je) {
try {
je.querySelectorAll('.GoogleCreativeContainerClass,[id^="gcc_"],iframe[src*="doubleclick"],iframe[src*="2mdn"],iframe[src*="googleads"],iframe[src*="googlesyndication"],iframe[src*="adservice"],.adsbygoogle,.ad-container,[class*="ad-container"],[id*="ad-container"]').forEach(e => {
try {
e.remove();
} catch {}
});
} catch {}
}
}, fn = () => {
if (un) {
try {
un.disconnect(), un = null;
} catch {}
}
}, hn = {
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
}, gn = {
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
}, pn = [ 11, 12 ], bn = [ {
Sn: "",
Nn: null,
zn: -1 / 0,
An: ""
}, {
Sn: "",
Nn: null,
zn: -1 / 0,
An: ""
}, {
Sn: "",
Nn: null,
An: "",
zn: -1 / 0
}, {
Sn: "",
Nn: null,
An: "",
zn: -1 / 0
} ], vn = e => Le.lt.push(e), yn = e => {
try {
const r = xr[e];
return ("single" === r.fireMode || "burst" === r.fireMode) && r.fireDelay >= .35;
} catch {
return !1;
}
}, xn = e => {
vn(pn[e]);
}, kn = () => {
var e, r;
if (Ee.game?.[Ve.M] && null != Ee.game?.[Ve.J]?.[Ve.ce]?.[Ve.Ce] && Ee.game?.initialized && De.Ur.Te) {
try {
const t = Ee.game[Ve.J][Ve.ce], n = t[Ve.Ce], a = t[Ve.Me], o = a[n], i = bn[n], l = Date.now() - i.zn;
if (De.Ur.qr > l) {
return;
}
if (o.ammo === i.Nn) {
return;
}
const s = 0 === n ? 1 : 0, c = a[s];
yn(o.type) && o.type === i.An && (i.Nn > o.ammo || 0 === i.Nn && o.ammo > i.Nn && (Ee.game[Ve.S].shotDetected || Ee.game[Ve.ae].isBindDown(vr))) && (i.zn = Date.now(), 
yn(c.type) && c.ammo && !De.Ur.Yr ? xn(s) : "" !== c.type ? (r = n, xn(s), xn(r)) : (e = n, 
vn(yr), xn(e))), i.Nn = o.ammo, i.An = o.type;
} catch {}
}
};

var wn, _n, Cn, Mn, Sn, Tn, Nn, zn, An, Rn, $n, jn = {}, Fn = [], On = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Pn = Array.isArray;

wn = Fn.slice, _n = {
Qt(e, r, t, n) {
for (var a, o, i; r = r.Jt; ) {
if ((a = r.er) && !a.Jt) {
try {
if ((o = a.constructor) && null != o.Tn && (a.Rr(o.Tn(e)), i = a.ir), null != a.Rn && (a.Rn(e, n || {}), 
i = a.ir), i) {
return a.ur = a;
}
} catch (r) {
e = r;
}
}
}
throw e;
}
}, Cn = 0, B.prototype.Rr = function(e, r) {
var t;
t = null != this.gr && this.gr != this.state ? this.gr : this.gr = $({}, this.state), 
"function" == typeof e && (e = e($({}, t), this.Yt)), e && $(t, e), null != e && this.tr && (r && this._sb.push(r), 
D(this));
}, B.prototype.jn = function(e) {
this.tr && (this.Qt = !0, e && this.mr.push(e), D(this));
}, B.prototype.render = P, Mn = [], Tn = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
Nn = (e, r) => e.tr.Xt - r.tr.Xt, I.lr = 0, zn = /(PointerCapture)$|Capture$/i, 
An = 0, Rn = V(!1), $n = V(!0);

var Bn, Ln, En, Dn, In = 0, Hn = [], Kn = _n, Wn = Kn.Xt, Gn = Kn.lr, Zn = Kn.Mr, Un = Kn.er, Vn = Kn.unmount, Yn = Kn.Jt;

Kn.Xt = e => {
Ln = null, Wn && Wn(e);
}, Kn.Jt = (e, r) => {
e && r.qt && r.qt.Sr && (e.Sr = r.qt.Sr), Yn && Yn(e, r);
}, Kn.lr = e => {
Gn && Gn(e), Bn = 0;
var r = (Ln = e.er).Ar;
r && (En === Ln ? (r.mr = [], Ln.mr = [], r.Jt.forEach(e => {
e.Tr && (e.Jt = e.Tr), e.u = e.Tr = void 0;
})) : (r.mr.forEach(me), r.mr.forEach(fe), r.mr = [], Bn = 0)), En = Ln;
}, Kn.Mr = e => {
Zn && Zn(e);
var r = e.er;
r && r.Ar && (r.Ar.mr.length && (1 !== Hn.push(r) && Dn === Kn.requestAnimationFrame || ((Dn = Kn.requestAnimationFrame) || ue)(de)), 
r.Ar.Jt.forEach(e => {
e.u && (e.Ar = e.u), e.u = void 0;
})), En = Ln = null;
}, Kn.er = (e, r) => {
r.some(e => {
try {
e.mr.forEach(me), e.mr = e.mr.filter(e => !e.Jt || fe(e));
} catch (t) {
r.some(e => {
e.mr && (e.mr = []);
}), r = [], Kn.Qt(t, e.tr);
}
}), Un && Un(e, r);
}, Kn.unmount = e => {
Vn && Vn(e);
var r, t = e.er;
t && t.Ar && (t.Ar.Jt.forEach(e => {
try {
me(e);
} catch (e) {
r = e;
}
}), t.Ar = void 0, r && Kn.Qt(r, t.tr));
};

var Jn = "function" == typeof requestAnimationFrame;

(be.prototype = new B).$n = !0, be.prototype.yr = function(e, r) {
return pe(this.Yt, e) || pe(this.state, r);
};

var qn = _n.Xt;

_n.Xt = e => {
e.type && e.type.jr && e.ref && (e.Yt.ref = e.ref, e.ref = null), qn && qn(e);
};

var Qn = _n.Qt;

_n.Qt = (e, r, t, n) => {
if (e.then) {
for (var a, o = r; o = o.Jt; ) {
if ((a = o.er) && a.er) {
return null == r.Qt && (r.Qt = t.Qt, r.qt = t.qt), a.er(e, r);
}
}
}
Qn(e, r, t, n);
};

var Xn = _n.unmount;

_n.unmount = e => {
var r = e.er;
r && r.Fn && r.Fn(), r && 32 & e.nr && (e.type = null), Xn && Xn(e);
}, (xe.prototype = new B).er = function(e, r) {
var t = r.er, n = this;
null == n.o && (n.o = []), n.o.push(t);
var a = ke(n.tr), o = !1, i = () => {
o || (o = !0, t.Fn = null, a ? a(l) : l());
};
t.Fn = i;
var l = () => {
if (! --n.nr) {
if (n.state.$r) {
var e = n.state.$r;
n.tr.qt[0] = ye(e, e.er.cr, e.er.On);
}
var r;
for (n.Rr({
$r: n.Xt = null
}); r = n.o.pop(); ) {
r.jn();
}
}
};
n.nr++ || 32 & r.nr || n.Rr({
$r: n.Xt = n.tr.qt[0]
}), e.then(i, i);
}, xe.prototype.zr = function() {
this.o = [];
}, xe.prototype.render = function(e, r) {
if (this.Xt) {
if (this.tr.qt) {
var t = document.createElement("div"), n = this.tr.qt[0].er;
this.tr.qt[0] = ve(this.Xt, t, n.On = n.cr);
}
this.Xt = null;
}
var a = r.$r && F(P, null, e.fallback);
return a && (a.nr &= -33), [ F(P, null, r.$r ? null : e.children), a ];
};

var ea = (e, r, t) => {
if (++t[1] === t[0] && e.l.delete(r), e.Yt.Pn && ("t" !== e.Yt.Pn[0] || !e.l.size)) {
for (t = e.i; t; ) {
for (;t.length > 3; ) {
t.pop()();
}
if (t[0] > t[1]) {
break;
}
e.i = t = t[2];
}
}
};

(we.prototype = new B).$r = function(e) {
var r = this, t = ke(r.tr), n = r.l.get(e);
return n[0]++, a => {
var o = () => {
r.Yt.Pn ? (n.push(a), ea(r, e, n)) : a();
};
t ? t(o) : o();
};
}, we.prototype.render = function(e) {
this.i = null, this.l = new Map;
var r = W(e.children);
e.Pn && "b" === e.Pn[0] && r.reverse();
for (var t = r.length; t--; ) {
this.l.set(r[t], this.i = [ 1, 0, this.i ]);
}
return e.children;
}, we.prototype._r = we.prototype.br = function() {
var e = this;
this.l.forEach((r, t) => {
ea(e, t, r);
});
};

var ra = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, ta = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, na = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, aa = /[A-Z0-9]/g, oa = "undefined" != typeof document, ia = e => ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);

B.prototype.Bn = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach(function(e) {
Object.defineProperty(B.prototype, e, {
configurable: !0,
get() {
return this["UNSAFE_" + e];
},
set(r) {
Object.defineProperty(this, e, {
configurable: !0,
writable: !0,
value: r
});
}
});
});

var la = _n.event;

_n.event = e => (la && (e = la(e)), e.persist = _e, e.Ln = Ce, e.Dn = Me, e.En = e);

var sa = {
enumerable: !1,
configurable: !0,
get() {
return this.class;
}
}, ca = _n.ar;

_n.ar = e => {
"string" == typeof e.type && (e => {
var r = e.Yt, t = e.type, n = {}, a = -1 === t.indexOf("-");
for (var o in r) {
var i = r[o];
if (!("value" === o && "defaultValue" in r && null == i || oa && "children" === o && "noscript" === t || "class" === o || "className" === o)) {
var l = o.toLowerCase();
"defaultValue" === o && "value" in r && null == r.value ? o = "value" : "download" === o && !0 === i ? i = "" : "translate" === l && "no" === i ? i = !1 : "o" === l[0] && "n" === l[1] ? "ondoubleclick" === l ? o = "ondblclick" : "onchange" !== l || "input" !== t && "textarea" !== t || ia(r.type) ? "onfocus" === l ? o = "onfocusin" : "onblur" === l ? o = "onfocusout" : na.test(o) && (o = l) : l = o = "oninput" : a && ta.test(o) ? o = o.replace(aa, "-$&").toLowerCase() : null === i && (i = void 0), 
"oninput" === l && n[o = l] && (o = "oninputCapture"), n[o] = i;
}
}
"select" == t && n.multiple && Array.isArray(n.value) && (n.value = W(r.children).forEach(e => {
e.Yt.selected = -1 != n.value.indexOf(e.Yt.value);
})), "select" == t && null != n.defaultValue && (n.value = W(r.children).forEach(e => {
e.Yt.selected = n.multiple ? -1 != n.defaultValue.indexOf(e.Yt.value) : n.defaultValue == e.Yt.value;
})), r.class && !r.className ? (n.class = r.class, Object.defineProperty(n, "className", sa)) : (r.className && !r.class || r.class && r.className) && (n.class = n.className = r.className), 
e.Yt = n;
})(e), e.$$typeof = ra, ca && ca(e);
};

var da = _n.lr;

_n.lr = e => {
da && da(e);
};

var ua = _n.Mr;

_n.Mr = e => {
ua && ua(e);
var r = e.Yt, t = e.Qt;
null != t && "textarea" === e.type && "value" in r && r.value !== t.value && (t.value = r.value ?? "");
};

var ma = P, fa = {
createRoot: Se,
hydrateRoot: (e, r) => (((e, r) => {
ne(e, r);
})(r, e), Se(e)
/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */)
};

const ha = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ga = e => {
const r = (e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, r, t) => t ? t.toUpperCase() : r.toLowerCase()))(e);
return r.charAt(0).toUpperCase() + r.slice(1);
}, pa = (...e) => e.filter((e, r, t) => !!e && "" !== e.trim() && t.indexOf(e) === r).join(" ").trim();

/**
 * @license lucide-preact v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var ba = {
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
 */ const va = ({color: e = "currentColor", size: r = 24, strokeWidth: t = 2, absoluteStrokeWidth: n, children: a, iconNode: o, class: i = "", ...l}) => F("svg", {
...ba,
width: r + "",
height: r,
stroke: e,
"stroke-width": n ? 24 * +t / +r : t,
class: [ "lucide", i ].join(" "),
...l
}, [ ...o.map(([e, r]) => F(e, r)), ...W(a) ]), ya = (e, r) => {
const t = ({class: t = "", children: n, ...a}) => F(va, {
...a,
iconNode: r,
class: pa("lucide-" + ha(ga(e)), "lucide-" + ha(e), t)
}, n);
return t.displayName = ga(e), t;
}, xa = ya("circle-question-mark", [ [ "circle", {
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
} ] ]), ka = ya("crosshair", [ [ "circle", {
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
} ] ]), wa = ya("database", [ [ "ellipse", {
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
} ] ]), _a = ya("eye", [ [ "path", {
d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
key: "1nclc0"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), Ca = ya("globe", [ [ "circle", {
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
} ] ]), Ma = ya("palette", [ [ "path", {
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
} ] ]), Sa = ya("pen-line", [ [ "path", {
d: "M13 21h8",
key: "1jsn5i"
} ], [ "path", {
d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
key: "1a8usu"
} ] ]), Ta = ya("rotate-ccw", [ [ "path", {
d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
key: "1357e3"
} ], [ "path", {
d: "M3 3v5h5",
key: "1xhq8a"
} ] ]), Na = ya("settings", [ [ "path", {
d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
key: "1i5ecw"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), za = ya("target", [ [ "circle", {
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
} ] ]), Aa = ya("upload", [ [ "path", {
d: "M12 3v12",
key: "1x0j5s"
} ], [ "path", {
d: "m17 8-5-5-5 5",
key: "7q97r8"
} ], [ "path", {
d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
key: "ih7n3h"
} ] ]), Ra = ya("users", [ [ "path", {
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
 */ var $a = 0;

const ja = ({activeTab: e, onTabChange: r}) => Te("div", {
className: "sidebar",
children: Te("div", {
className: "sidebar-menu",
children: [ {
id: "main",
label: "Search",
icon: ka
}, {
id: "combat",
label: "Combat",
icon: za
}, {
id: "visuals",
label: "Visuals",
icon: _a
}, {
id: "misc",
label: "Misc",
icon: Na
}, {
id: "themes",
label: "Themes",
icon: Ma
}, {
id: "help",
label: "Help",
icon: xa
} ].map(t => Te("button", {
className: "sidebar-item " + (e === t.id ? "active" : ""),
"data-category": t.id,
onClick: () => r(t.id),
children: [ Te(t.icon, {
className: "sidebar-icon"
}), Te("span", {
className: "sidebar-label",
children: t.label
}) ]
}, t.id))
})
}), Fa = ({id: e, label: r, checked: t, onChange: n, style: a = {}, warning: o = !1}) => Te("div", {
className: "checkbox-item",
style: a,
onClick(e) {
"checkbox" !== e.target.type && n(!t);
},
children: [ Te("input", {
type: "checkbox",
id: e,
checked: t,
onChange(e) {
e.stopPropagation(), n(e.target.checked);
},
className: "checkbox " + (t ? "checkbox-checked" : "")
}), Te("label", {
htmlFor: e,
className: "checkbox-item-label",
onClick: e => e.stopPropagation(),
children: r
}), o && Te("span", {
className: "risky-label",
style: {
marginLeft: "0.5rem"
},
children: "RISKY!!!"
}) ]
}), Oa = e => {
const r = e.checked;
return Te(Fa, {
...e,
warning: e.shouldWarning?.(r) ?? !1
});
}, Pa = ({id: e, label: r, value: t, min: n = 0, max: a = 100, warning: o = !1, onChange: i}) => {
const [l, s] = oe(!1), c = le(null), d = (t - n) / (a - n) * 100, u = {
background: `linear-gradient(to right, var(--md-primary) 0%, var(--md-primary) ${d}%, #333 ${d}%, #333 100%)`
}, m = e => {
e.stopPropagation(), i(parseInt(e.target.value));
}, f = e => {
e.stopPropagation();
}, h = ce(() => s(!0), []), g = ce(() => s(!1), []), p = ce(e => {
e.stopPropagation(), h();
}, [ h ]), b = ce(e => {
e.stopPropagation(), h();
}, [ h ]), v = ce(e => {
e && e.stopPropagation(), g();
}, [ g ]), y = ce(e => {
e && e.stopPropagation(), g();
}, [ g ]);
return Te("div", {
className: "checkbox-item slider-container",
onClick: f,
children: [ Te("label", {
htmlFor: e,
style: {
color: "#ddd",
fontSize: "0.8125rem",
cursor: "default",
pointerEvents: "none"
},
children: [ r, ": ", Te("span", {
style: {
color: "var(--md-primary)",
fontWeight: "bold"
},
children: t
}) ]
}), Te("input", {
ref: c,
type: "range",
className: "slider " + (l ? "slider-dragging" : ""),
id: e,
min: n,
max: a,
value: t,
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
}), o && Te("span", {
className: "risky-label",
style: {
marginLeft: "0.5rem"
},
children: "RISKY!!!"
}) ]
});
}, Ba = {
Hn: xa,
In: Ra,
Kn: Ca,
Wn: wa,
Gn: e => Te("svg", {
xmlns: "http://www.w3.org/2000/svg",
viewBox: "0 0 24 24",
fill: "currentColor",
...e,
children: Te("path", {
d: "M20.317 4.4917C18.7873 3.8008 17.147 3.2918 15.4319 3C15.4007 2.9952 15.3695 3.0096 15.3534 3.0384C15.1424 3.4077 14.9087 3.8948 14.7451 4.2875C12.9004 4.0141 11.0652 4.0141 9.25832 4.2875C9.09465 3.8862 8.85248 3.4077 8.64057 3.0384C8.62449 3.0105 8.59328 2.9961 8.56205 3C6.84791 3.2909 5.20756 3.7999 3.67693 4.4917C3.66368 4.4973 3.65233 4.5065 3.64479 4.5185C0.533392 9.2227 -0.31895 13.8151 0.0991801 18.3525C0.101072 18.3736 0.11337 18.3938 0.130398 18.4075C2.18321 19.9061 4.17171 20.8159 6.12328 21.4179C6.15451 21.4275 6.18761 21.4161 6.20748 21.3899C6.66913 20.7693 7.08064 20.1152 7.43348 19.4271C7.4543 19.3873 7.43442 19.3402 7.39186 19.3245C6.73913 19.0763 6.1176 18.7745 5.51973 18.4321C5.47244 18.4046 5.46865 18.3366 5.51216 18.3043C5.63797 18.2104 5.76382 18.1128 5.88396 18.0142C5.90569 17.9961 5.93598 17.9923 5.96153 18.0038C9.88928 19.789 14.1415 19.789 18.023 18.0038C18.0485 17.9914 18.0788 17.9952 18.1015 18.0133C18.2216 18.1118 18.3475 18.2104 18.4742 18.3043C18.5177 18.3366 18.5149 18.4046 18.4676 18.4321C17.8697 18.7812 17.2482 19.0763 16.5945 19.3236C16.552 19.3393 16.533 19.3873 16.5538 19.4271C16.9143 20.1143 17.3258 20.7684 17.7789 21.3889C17.7978 21.4161 17.8319 21.4275 17.8631 21.4179C19.8241 20.8159 21.8126 19.9061 23.8654 18.4075C23.8834 18.3938 23.8948 18.3745 23.8967 18.3534C24.3971 13.1418 23.0585 8.5868 20.3482 4.5194C20.3416 4.5065 20.3303 4.4973 20.317 4.4917ZM8.02002 15.5869C6.8375 15.5869 5.86313 14.515 5.86313 13.1932C5.86313 11.8714 6.8186 10.7995 8.02002 10.7995C9.23087 10.7995 10.1958 11.8809 10.1769 13.1932C10.1769 14.515 9.22141 15.5869 8.02002 15.5869ZM15.9947 15.5869C14.8123 15.5869 13.8379 14.515 13.8379 13.1932C13.8379 11.8714 14.7933 10.7995 15.9947 10.7995C17.2056 10.7995 18.1705 11.8809 18.1516 13.1932C18.1516 14.515 17.2056 15.5869 15.9947 15.5869Z"
})
}),
Vn: e => Te(Sa, {
...e,
strokeWidth: "2.5"
})
}, La = ({keybind: e, mode: r = "single", style: t = {}, onClick: n, editable: a = !1}) => {
const [o, i] = oe(!1);
if ("multiple" === r && Array.isArray(e)) {
return Te("div", {
className: "keybind-slot-container",
style: t,
children: e.map((r, t) => Te(ma, {
children: [ Te("div", {
className: "keybind-slot",
children: r
}), e.length - 1 > t && Te("span", {
className: "keybind-slot-separator",
children: "+"
}) ]
}, t))
});
}
const l = o ? "..." : (e => {
const r = {
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
return r[e] ? r[e] : e.startsWith("Key") ? e.slice(3) : e.startsWith("Digit") ? e.slice(5) : e;
})(e);
return Te("div", {
className: `keybind-slot ${a ? "keybind-slot-editable" : ""} ${o ? "keybind-slot-waiting" : ""}`,
style: t,
onClick(e) {
if (!a || !n) {
return;
}
e.stopPropagation(), i(!0);
const r = e => {
e.preventDefault(), e.stopPropagation();
let t = e.code;
"Delete" !== e.code && "Escape" !== e.code || (t = "Not Set"), n(t), i(!1), Reflect.apply(sr, $e, [ "keydown", r, !0 ]);
};
Reflect.apply(lr, $e, [ "keydown", r, !0 ]);
},
children: [ l, a && !o && Te(Ba.Vn, {
className: "keybind-pen-icon"
}) ]
});
}, Ea = ({title: e, category: r, description: t, enabled: n, onToggle: a, keybind: o, onKeybindChange: i, className: l = ""}) => Te("div", {
className: `feature-card ${n ? "enabled" : "disabled"} ${l}`,
onClick: () => a && a(),
children: [ Te("div", {
className: "feature-card-body",
children: [ Te("div", {
className: "feature-card-title",
children: [ Te("div", {
className: "feature-title-text",
children: e
}), o && Te(La, {
keybind: o,
editable: !0,
onClick: e => i && i(e)
}), Te("div", {
className: "feature-category",
children: r
}) ]
}), Te("div", {
className: "feature-desc",
children: t
}) ]
}), Te("div", {
className: "feature-card-toggle",
onClick(e) {
e.stopPropagation(), a && a();
},
children: Te("div", {
className: "toggle " + (n ? "on" : "off")
})
}) ]
}), Da = ({Zn: e, Un: r, searchQuery: t = ""}) => {
const [n, a] = oe(null), o = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock" ], i = [ {
id: "aimbot",
title: "Aimbot",
category: "Combat",
description: "Auto-aim at enemies",
enabled: e.kt.Te,
onToggle: () => r(e => e.kt.Te = !e.kt.Te),
keybind: e.en.rn,
onKeybindChange: e => r(r => r.en.rn = e)
}, {
id: "meleelock",
title: "Melee Lock",
category: "Combat",
description: "Lock melee aim on nearest enemy",
enabled: e.xt.Te,
onToggle: () => r(e => e.xt.Te = !e.xt.Te),
keybind: e.en.fn,
onKeybindChange: e => r(r => r.en.fn = e)
}, {
id: "autofire",
title: "BumpFire",
category: "Combat",
description: "Automatic shooting when holding fire button",
enabled: e.Hr.Te,
onToggle: () => r(e => e.Hr.Te = !e.Hr.Te),
keybind: e.en.nn,
onKeybindChange: e => r(r => r.en.nn = e)
}, {
id: "panhero",
title: "Pan Hero",
category: "Combat",
description: "Reflect bullets with a pan",
enabled: e.ut.Te,
onToggle: () => r(e => e.ut.Te = !e.ut.Te),
keybind: e.en.dn,
onKeybindChange: e => r(r => r.en.dn = e)
}, {
id: "autoswitch",
title: "Auto Switch",
category: "Combat",
description: "Automatically switch weapons",
enabled: e.Ur.Te,
onToggle: () => r(e => e.Ur.Te = !e.Ur.Te),
keybind: e.en.pn,
onKeybindChange: e => r(r => r.en.pn = e)
} ], l = (t || "").trim().toLowerCase();
return Te("div", {
className: "section",
children: Te("div", {
className: "feature-list",
children: (l ? i.filter(e => e.title.toLowerCase().includes(l) || e.description.toLowerCase().includes(l) || e.category.toLowerCase().includes(l)) : i).map(t => Te("div", {
className: "feature-card-wrapper",
children: [ Te("div", {
className: "feature-card-header",
onClick: () => o.includes(t.id) && a(n === t.id ? null : t.id),
children: [ Te(Ea, {
title: t.title,
category: t.category,
description: t.description,
enabled: t.enabled,
onToggle: t.onToggle,
keybind: t.keybind,
onKeybindChange: t.onKeybindChange
}), o.includes(t.id) && Te("div", {
className: "chevron " + (n === t.id ? "expanded" : ""),
children: Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Te("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === t.id && o.includes(t.id) && Te("div", {
className: "feature-settings",
children: [ "aimbot" === t.id && Te(P, {
children: [ Te(Fa, {
id: "aimbot-target-knocked",
label: "Target Knocked",
checked: e.kt.ht,
onChange: e => r(r => r.kt.ht = e)
}), Te(Fa, {
id: "aimbot-sticky-target",
label: "Sticky Target",
checked: e.kt.Br,
onChange: e => r(r => r.kt.Br = e)
}), Te(Fa, {
id: "aimbot-show-dot",
label: "Show Dot",
checked: e.kt.Lr,
onChange: e => r(r => r.kt.Lr = e)
}), Te(Oa, {
id: "aimbot-wallcheck",
label: "Wallcheck",
checked: e.kt.St,
onChange: e => r(r => r.kt.St = e)
}), Te(Fa, {
id: "aimbot-auto-attack",
label: "Auto Attack",
checked: e.kt.dt,
onChange: e => r(r => r.kt.dt = e)
}) ]
}), "panhero" === t.id && Te(Fa, {
id: "panhero-target-knocked",
label: "Target Knocked",
checked: e.ut.ht,
onChange: e => r(r => r.ut.ht = e)
}), "meleelock" === t.id && Te(P, {
children: [ Te(Fa, {
id: "auto-melee",
label: "Auto Melee",
checked: e.xt.Mt,
onChange: e => r(r => r.xt.Mt = e)
}), Te(Fa, {
id: "enable-strafe",
label: "Random Strafe",
checked: e.xt.Tt,
onChange: e => r(r => r.xt.Tt = e)
}), e.xt.Tt && Te(P, {
children: [ Te(Pa, {
id: "strafe-intensity",
label: "Strafe Intensity",
value: e.xt.jt,
onChange: e => r(r => r.xt.jt = e)
}), Te(Pa, {
id: "strafe-chance",
label: "Strafe Chance",
value: e.xt.Rt,
onChange: e => r(r => r.xt.Rt = e)
}) ]
}), Te(Fa, {
id: "enable-evasion",
label: "Melee Range Evasion",
checked: e.xt.Nt,
onChange: e => r(r => r.xt.Nt = e)
}), e.xt.Nt && Te(P, {
children: [ Te(Pa, {
id: "evasion-range",
label: "Evasion Range",
value: e.xt.zt,
onChange: e => r(r => r.xt.zt = e),
min: "2",
max: "8"
}), Te(Pa, {
id: "evasion-strength",
label: "Evasion Strength",
value: e.xt.At,
onChange: e => r(r => r.xt.At = e)
}) ]
}) ]
}) ]
}) ]
}, t.id))
})
});
}, Ia = ({Zn: e, Un: r, searchQuery: t = ""}) => {
const [n, a] = oe(null), o = se(() => {
const e = R();
return e.init(), e;
}, []), i = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock", "backgroundchange" ], l = [ {
id: "aimbot",
title: "Aimbot",
category: "Combat",
description: "Auto-aim at enemies",
keywords: [ "aimbot", "aim", "lock", "autoaim" ],
enabled: e.kt.Te,
onToggle: () => r(e => e.kt.Te = !e.kt.Te),
keybind: e.en.rn,
onKeybindChange: e => r(r => r.en.rn = e)
}, {
id: "autofire",
title: "Bumpfire",
category: "Combat",
description: "Automatic shooting when holding fire button",
keywords: [ "autofire", "auto-fire", "fire", "shoot", "shooting" ],
enabled: e.Hr.Te,
onToggle: () => r(e => e.Hr.Te = !e.Hr.Te),
keybind: e.en.nn,
onKeybindChange: e => r(r => r.en.nn = e)
}, {
id: "autoheal",
title: "Auto Heal",
category: "Misc",
description: "Automatically uses healing items",
keywords: [ "autoheal", "heal", "healing", "bandage", "med" ],
enabled: e.Et.Te,
onToggle: () => r(e => e.Et.Te = !e.Et.Te),
keybind: e.en.an,
onKeybindChange: e => r(r => r.en.an = e)
}, {
id: "esp",
title: "ESP",
category: "Visualss",
description: "Show players and grenades through walls",
keywords: [ "esp", "wallhack", "wall", "see-through" ],
enabled: e.Ue.Te,
onToggle: () => r(e => e.Ue.Te = !e.Ue.Te),
keybind: e.en.ln,
onKeybindChange: e => r(r => r.en.ln = e)
}, {
id: "xray",
title: "X-Ray",
category: "Render",
description: "Make smokes/ceilings transparent",
keywords: [ "xray", "x-ray", "smoke", "transparent", "ceiling" ],
enabled: e.Re.Te,
onToggle: () => r(e => e.Re.Te = !e.Re.Te),
keybind: e.en.sn,
onKeybindChange: e => r(r => r.en.sn = e)
}, {
id: "panhero",
title: "Pan Hero",
category: "Combat",
description: "Reflect bullets with a pan",
keywords: [ "panhero", "pan", "hero", "turn", "away" ],
enabled: e.ut.Te,
onToggle: () => r(e => e.ut.Te = !e.ut.Te),
keybind: e.en.dn,
onKeybindChange: e => r(r => r.en.dn = e)
}, {
id: "infinitezoom",
title: "Infinite Zoom",
category: "Visuals",
description: "Unlimited camera zoom",
keywords: [ "infinitezoom", "infinite", "zoom", "camera", "view" ],
enabled: e.Zr.Te,
onToggle: () => r(e => e.Zr.Te = !e.Zr.Te),
keybind: e.en.un,
onKeybindChange: e => r(r => r.en.un = e)
}, {
id: "maphighlights",
title: "Map Highlights",
category: "Visuals",
description: "Highlight map details",
keywords: [ "maphighlights", "map", "highlight", "details", "Visuals" ],
enabled: e.Wr.Te,
onToggle: () => r(e => e.Wr.Te = !e.Wr.Te),
keybind: e.en.bn,
onKeybindChange: e => r(r => r.en.bn = e)
}, {
id: "layerspoof",
title: "Layer Spoofer",
category: "Visuals",
description: "Change your visible layer",
keywords: [ "layerspoof", "layer", "spoof", "dimension" ],
enabled: e.Jr.Te,
onToggle: () => r(e => e.Jr.Te = !e.Jr.Te),
keybind: e.en.mn,
onKeybindChange: e => r(r => r.en.mn = e)
}, {
id: "autoloot",
title: "Auto Loot",
category: "Misc",
description: "Automatically pick up items",
keywords: [ "autoloot", "auto-loot", "loot", "pickup", "items" ],
enabled: e.Vr.Te,
onToggle: () => r(e => e.Vr.Te = !e.Vr.Te),
keybind: e.en.gn,
onKeybindChange: e => r(r => r.en.gn = e)
}, {
id: "autocrate",
title: "Auto Crate Break",
category: "Combat",
description: "Automatically break supply crates",
keywords: [ "autocrate", "auto-crate", "crate", "break", "supply" ],
enabled: e.ct.Te,
onToggle: () => r(e => e.ct.Te = !e.ct.Te),
keybind: e.en.hn,
onKeybindChange: e => r(r => r.en.hn = e)
}, {
id: "meleelock",
title: "Melee Lock",
category: "Combat",
description: "Lock melee aim on nearest enemy",
keywords: [ "meleelock", "melee", "lock", "aim", "close-combat" ],
enabled: e.xt.Te,
onToggle: () => r(e => e.xt.Te = !e.xt.Te),
keybind: e.en.fn,
onKeybindChange: e => r(r => r.en.fn = e)
}, {
id: "autoswitch",
title: "Auto Switch",
category: "Combat",
description: "Automatically switch weapons",
keywords: [ "autoswitch", "auto-switch", "switch", "weapon", "gun" ],
enabled: e.Ur.Te,
onToggle: () => r(e => e.Ur.Te = !e.Ur.Te),
keybind: e.en.pn,
onKeybindChange: e => r(r => r.en.pn = e)
}, {
id: "backgroundchange",
title: "Background Change",
category: "Visual",
description: "Customize game background",
keywords: [ "background", "change", "customize", "background", "image" ],
enabled: e.Zt.Te,
onToggle: () => r(e => e.Zt.Te = !e.Zt.Te)
} ], s = (t || "").trim().toLowerCase();
return Te("div", {
className: "section",
children: Te("div", {
className: "feature-list",
children: (s ? l.filter(e => [ e.title, e.description, e.category, e.keywords ? e.keywords.join(" ") : "" ].join(" ").toLowerCase().includes(s)) : l).map(t => Te("div", {
className: "feature-card-wrapper",
children: [ Te("div", {
className: "feature-card-header",
onClick: () => i.includes(t.id) && a(n === t.id ? null : t.id),
children: [ Te(Ea, {
title: t.title,
category: t.category,
description: t.description,
enabled: t.enabled,
onToggle: t.onToggle,
keybind: t.keybind,
onKeybindChange: t.onKeybindChange
}), i.includes(t.id) && Te("div", {
className: "chevron " + (n === t.id ? "expanded" : ""),
children: Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Te("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === t.id && i.includes(t.id) && Te("div", {
className: "feature-settings",
children: [ "aimbot" === t.id && Te(P, {
children: [ Te(Fa, {
id: "aimbot-target-knocked",
label: "Target Knocked",
checked: e.kt.ht,
onChange: e => r(r => r.kt.ht = e)
}), Te(Fa, {
id: "aimbot-sticky-target",
label: "Sticky Target",
checked: e.kt.Br,
onChange: e => r(r => r.kt.Br = e)
}), Te(Fa, {
id: "aimbot-show-dot",
label: "Show Dot",
checked: e.kt.Lr,
onChange: e => r(r => r.kt.Lr = e)
}), Te(Oa, {
id: "aimbot-wallcheck",
label: "Wallcheck",
checked: e.kt.St,
onChange: e => r(r => r.kt.St = e)
}), Te(Fa, {
id: "aimbot-auto-attack",
label: "Auto Attack",
checked: e.kt.dt,
onChange: e => r(r => r.kt.dt = e)
}) ]
}), "autoheal" === t.id && Te(P, {
children: [ Te(Pa, {
id: "bandage-threshold",
label: "Bandage Threshold",
value: e.Et.Kt,
onChange: e => r(r => r.Et.Kt = e)
}), Te(Pa, {
id: "kit-threshold",
label: "Kit Threshold",
value: e.Et.Wt,
onChange: e => r(r => r.Et.Wt = e)
}), Te(Pa, {
id: "boost-threshold",
label: "Boost Threshold",
value: e.Et.Gt,
onChange: e => r(r => r.Et.Gt = e)
}), Te(Fa, {
id: "auto-heal-enemy-check",
label: "Enemy Check",
checked: e.Et.Ht,
onChange: e => r(r => r.Et.Ht = e)
}), Te(Pa, {
id: "enemy-distance",
label: "Enemy Distance",
value: e.Et.It,
onChange: e => r(r => r.Et.It = e)
}) ]
}), "esp" === t.id && Te(P, {
children: [ Te(Fa, {
id: "esp-nametags",
label: "Visible Nametags",
checked: e.Ue.Ye,
onChange: e => r(r => r.Ue.Ye = e)
}), Te(Fa, {
id: "esp-players",
label: "Players",
checked: e.Ue.qe,
onChange: e => r(r => r.Ue.qe = e)
}), Te(Fa, {
id: "esp-grenade-explosions",
label: "Grenade Explosions",
checked: e.Ue.Xe.Je,
onChange: e => r(r => r.Ue.Xe.Je = e)
}), Te(Fa, {
id: "esp-grenade-trajectory",
label: "Grenade Trajectory",
checked: e.Ue.Xe.Qe,
onChange: e => r(r => r.Ue.Xe.Qe = e)
}), Te(Fa, {
id: "esp-flashlight-own",
label: "Own Flashlights",
checked: e.Ue.rt.nt,
onChange: e => r(r => r.Ue.rt.nt = e)
}), Te(Fa, {
id: "esp-flashlight-others",
label: "Others Flashlights",
checked: e.Ue.rt.m,
onChange: e => r(r => r.Ue.rt.m = e)
}), Te(Fa, {
id: "esp-flashlight-trajectory",
label: "Flashlight Trajectory",
checked: e.Ue.rt.Qe,
onChange: e => r(r => r.Ue.rt.Qe = e)
}) ]
}), "xray" === t.id && Te(P, {
children: [ Te(Pa, {
id: "smoke-opacity",
label: "Smoke Opacity",
value: e.Re.Fe,
onChange: e => r(r => r.Re.Fe = e)
}), Te(Fa, {
id: "darker-smokes",
label: "Darker Smokes",
checked: e.Re.$e,
onChange: e => r(r => r.Re.$e = e)
}), Te(Pa, {
id: "tree-opacity",
label: "Tree Opacity",
value: e.Re.Oe,
onChange: e => r(r => r.Re.Oe = e)
}), Te(Fa, {
id: "remove-ceilings",
label: "Remove Ceilings",
checked: e.Re.je,
onChange: e => r(r => r.Re.je = e)
}) ]
}), "panhero" === t.id && Te(Fa, {
id: "panhero-target-knocked",
label: "Target Knocked",
checked: e.ut.ht,
onChange: e => r(r => r.ut.ht = e)
}), "maphighlights" === t.id && Te(Fa, {
id: "smaller-trees",
label: "Smaller Trees",
checked: e.Wr.Gr,
onChange: e => r(r => r.Wr.Gr = e)
}), "meleelock" === t.id && Te(P, {
children: [ Te(Fa, {
id: "auto-melee",
label: "Auto Melee",
checked: e.xt.Mt,
onChange: e => r(r => r.xt.Mt = e)
}), Te(Fa, {
id: "enable-strafe",
label: "Random Strafe",
checked: e.xt.Tt,
onChange: e => r(r => r.xt.Tt = e)
}), e.xt.Tt && Te(P, {
children: [ Te(Pa, {
id: "strafe-intensity",
label: "Strafe Intensity",
value: e.xt.jt,
onChange: e => r(r => r.xt.jt = e)
}), Te(Pa, {
id: "strafe-chance",
label: "Strafe Chance",
value: e.xt.Rt,
onChange: e => r(r => r.xt.Rt = e)
}) ]
}), Te(Fa, {
id: "enable-evasion",
label: "Melee Range Evasion",
checked: e.xt.Nt,
onChange: e => r(r => r.xt.Nt = e)
}), e.xt.Nt && Te(P, {
children: [ Te(Pa, {
id: "evasion-range",
label: "Evasion Range",
value: e.xt.zt,
onChange: e => r(r => r.xt.zt = e),
min: "2",
max: "8"
}), Te(Pa, {
id: "evasion-strength",
label: "Evasion Strength",
value: e.xt.At,
onChange: e => r(r => r.xt.At = e)
}) ]
}) ]
}), "backgroundchange" === t.id && Te("div", {
style: {
display: "flex",
flexDirection: "column",
gap: "8px"
},
children: [ Te("button", {
onClick() {
const e = document.createElement("input");
e.type = "file", e.accept = "image/*", e.onchange = e => {
const r = e.target.files?.[0];
r && o.setBackgroundFromFile(r);
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
children: [ Te(Aa, {
size: 18
}), "Set from File" ]
}), Te("button", {
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
children: [ Te(Ta, {
size: 18
}), "Reset" ]
}) ]
}) ]
}) ]
}, t.id))
})
});
}, Ha = ({Zn: e, Un: r, searchQuery: t = ""}) => {
const [n, a] = oe(null), o = se(() => {
const e = R();
return e.init(), e;
}, []), i = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock", "backgroundchange" ], l = [ {
id: "esp",
title: "ESP",
category: "Render",
description: "Show players and grenades through walls",
enabled: e.Ue.Te,
onToggle: () => r(e => e.Ue.Te = !e.Ue.Te),
keybind: e.en.ln,
onKeybindChange: e => r(r => r.en.ln = e)
}, {
id: "xray",
title: "X-Ray",
category: "Render",
description: "Make smokes/ceilings transparent",
enabled: e.Re.Te,
onToggle: () => r(e => e.Re.Te = !e.Re.Te),
keybind: e.en.sn,
onKeybindChange: e => r(r => r.en.sn = e)
}, {
id: "infinitezoom",
title: "Infinite Zoom",
category: "Visual",
description: "Unlimited camera zoom",
enabled: e.Zr.Te,
onToggle: () => r(e => e.Zr.Te = !e.Zr.Te),
keybind: e.en.un,
onKeybindChange: e => r(r => r.en.un = e)
}, {
id: "layerspoof",
title: "Layer Spoofer",
category: "Visual",
description: "Change your visible layer",
enabled: e.Jr.Te,
onToggle: () => r(e => e.Jr.Te = !e.Jr.Te),
keybind: e.en.mn,
onKeybindChange: e => r(r => r.en.mn = e)
}, {
id: "backgroundchange",
title: "Background Change",
category: "Visual",
description: "Customize game background",
enabled: e.Zt.Te,
onToggle: () => r(e => e.Zt.Te = !e.Zt.Te)
} ], s = (t || "").trim().toLowerCase();
return Te("div", {
className: "section",
children: Te("div", {
className: "feature-list",
children: (s ? l.filter(e => e.title.toLowerCase().includes(s) || e.description.toLowerCase().includes(s) || e.category.toLowerCase().includes(s)) : l).map(t => Te("div", {
className: "feature-card-wrapper",
children: [ Te("div", {
className: "feature-card-header",
onClick: () => i.includes(t.id) && a(n === t.id ? null : t.id),
children: [ Te(Ea, {
title: t.title,
category: t.category,
description: t.description,
enabled: t.enabled,
onToggle: t.onToggle,
keybind: t.keybind,
onKeybindChange: t.onKeybindChange
}), i.includes(t.id) && Te("div", {
className: "chevron " + (n === t.id ? "expanded" : ""),
children: Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Te("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === t.id && i.includes(t.id) && Te("div", {
className: "feature-settings",
children: [ "esp" === t.id && Te(P, {
children: [ Te(Fa, {
id: "esp-nametags",
label: "Visible Nametags",
checked: e.Ue.Ye,
onChange: e => r(r => r.Ue.Ye = e)
}), Te(Fa, {
id: "esp-players",
label: "Players",
checked: e.Ue.qe,
onChange: e => r(r => r.Ue.qe = e)
}), Te(Fa, {
id: "esp-grenade-explosions",
label: "Grenade Explosions",
checked: e.Ue.Xe.Je,
onChange: e => r(r => r.Ue.Xe.Je = e)
}), Te(Fa, {
id: "esp-grenade-trajectory",
label: "Grenade Trajectory",
checked: e.Ue.Xe.Qe,
onChange: e => r(r => r.Ue.Xe.Qe = e)
}), Te(Fa, {
id: "esp-flashlight-own",
label: "Own Flashlights",
checked: e.Ue.rt.nt,
onChange: e => r(r => r.Ue.rt.nt = e)
}), Te(Fa, {
id: "esp-flashlight-others",
label: "Others Flashlights",
checked: e.Ue.rt.m,
onChange: e => r(r => r.Ue.rt.m = e)
}), Te(Fa, {
id: "esp-flashlight-trajectory",
label: "Flashlight Trajectory",
checked: e.Ue.rt.Qe,
onChange: e => r(r => r.Ue.rt.Qe = e)
}) ]
}), "xray" === t.id && Te(P, {
children: [ Te(Pa, {
id: "smoke-opacity",
label: "Smoke Opacity",
value: e.Re.Fe,
onChange: e => r(r => r.Re.Fe = e)
}), Te(Fa, {
id: "darker-smokes",
label: "Darker Smokes",
checked: e.Re.$e,
onChange: e => r(r => r.Re.$e = e)
}), Te(Pa, {
id: "tree-opacity",
label: "Tree Opacity",
value: e.Re.Oe,
onChange: e => r(r => r.Re.Oe = e)
}), Te(Fa, {
id: "remove-ceilings",
label: "Remove Ceilings",
checked: e.Re.je,
onChange: e => r(r => r.Re.je = e)
}) ]
}), "backgroundchange" === t.id && Te("div", {
style: {
display: "flex",
flexDirection: "column",
gap: "8px"
},
children: [ Te("button", {
onClick() {
const e = document.createElement("input");
e.type = "file", e.accept = "image/*", e.onchange = e => {
const r = e.target.files?.[0];
r && o.setBackgroundFromFile(r);
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
children: [ Te(Aa, {
size: 18
}), "Set from File" ]
}), Te("button", {
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
children: [ Te(Ta, {
size: 18
}), "Reset" ]
}) ]
}) ]
}) ]
}, t.id))
})
});
}, Ka = ({Zn: e, Un: r, searchQuery: t = ""}) => {
const [n, a] = oe(null), o = [ "aimbot", "autoheal", "esp", "xray", "panhero", "maphighlights", "meleelock" ], i = [ {
id: "autoheal",
title: "Auto Heal",
category: "Player",
description: "Automatically uses healing items",
enabled: e.Et.Te,
onToggle: () => r(e => e.Et.Te = !e.Et.Te),
keybind: e.en.an,
onKeybindChange: e => r(r => r.en.an = e)
}, {
id: "maphighlights",
title: "Map Highlights",
category: "Visual",
description: "Highlight map details",
enabled: e.Wr.Te,
onToggle: () => r(e => e.Wr.Te = !e.Wr.Te),
keybind: e.en.bn,
onKeybindChange: e => r(r => r.en.bn = e)
}, {
id: "autoloot",
title: "Auto Loot",
category: "Player",
description: "Automatically pick up items",
enabled: e.Vr.Te,
onToggle: () => r(e => e.Vr.Te = !e.Vr.Te),
keybind: e.en.gn,
onKeybindChange: e => r(r => r.en.gn = e)
}, {
id: "autocrate",
title: "Auto Crate Break",
category: "Combat",
description: "Automatically break supply crates",
enabled: e.ct.Te,
onToggle: () => r(e => e.ct.Te = !e.ct.Te),
keybind: e.en.hn,
onKeybindChange: e => r(r => r.en.hn = e)
} ], l = (t || "").trim().toLowerCase();
return Te("div", {
className: "section",
children: Te("div", {
className: "feature-list",
children: (l ? i.filter(e => e.title.toLowerCase().includes(l) || e.description.toLowerCase().includes(l) || e.category.toLowerCase().includes(l)) : i).map(t => Te("div", {
className: "feature-card-wrapper",
children: [ Te("div", {
className: "feature-card-header",
onClick: () => o.includes(t.id) && a(n === t.id ? null : t.id),
children: [ Te(Ea, {
title: t.title,
category: t.category,
description: t.description,
enabled: t.enabled,
onToggle: t.onToggle,
keybind: t.keybind,
onKeybindChange: t.onKeybindChange
}), o.includes(t.id) && Te("div", {
className: "chevron " + (n === t.id ? "expanded" : ""),
children: Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
children: Te("polyline", {
points: "6 9 12 15 18 9"
})
})
}) ]
}), n === t.id && o.includes(t.id) && Te("div", {
className: "feature-settings",
children: [ "autoheal" === t.id && Te(P, {
children: [ Te(Pa, {
id: "bandage-threshold",
label: "Bandage Threshold",
value: e.Et.Kt,
onChange: e => r(r => r.Et.Kt = e)
}), Te(Pa, {
id: "kit-threshold",
label: "Kit Threshold",
value: e.Et.Wt,
onChange: e => r(r => r.Et.Wt = e)
}), Te(Pa, {
id: "boost-threshold",
label: "Boost Threshold",
value: e.Et.Gt,
onChange: e => r(r => r.Et.Gt = e)
}), Te(Fa, {
id: "auto-heal-enemy-check",
label: "Enemy Check",
checked: e.Et.Ht,
onChange: e => r(r => r.Et.Ht = e)
}), Te(Pa, {
id: "enemy-distance",
label: "Enemy Distance",
value: e.Et.It,
onChange: e => r(r => r.Et.It = e)
}) ]
}), "maphighlights" === t.id && Te(Fa, {
id: "smaller-trees",
label: "Smaller Trees",
checked: e.Wr.Gr,
onChange: e => r(r => r.Wr.Gr = e)
}) ]
}) ]
}, t.id))
})
});
}, Wa = ({Zn: e}) => Te("div", {
className: "section help-section",
children: [ Te("div", {
className: "help-title",
children: [ Te(Ba.Hn, {
size: 16
}), Te("span", {
children: "Controls & Information"
}) ]
}), Te("div", {
className: "help-panel",
style: {
marginBottom: "0.75rem"
},
children: [ Te("div", {
style: {
display: "flex",
alignItems: "center",
marginBottom: "0.375rem"
},
children: [ Te(La, {
keybind: e?.en?.tn || "ShiftRight"
}), Te("span", {
className: "keybind-description",
children: "Show/Hide Menu"
}) ]
}), Te("p", {
className: "keybind-help-text",
children: "Toggle the menu visibility at any time using this keybind."
}) ]
}), Te("div", {
className: "section-subtitle",
children: "Feature Keybinds"
}), Te("div", {
className: "help-panel",
children: [ Te("p", {
className: "keybind-help-text",
style: {
marginBottom: "0.5rem"
},
children: "Keybinds can be customized next to each feature in their respective tabs:"
}), Te("div", {
className: "features-container",
children: [ Te("div", {
className: "feature-item",
children: [ Te("span", {
className: "feature-name",
children: "Aimbot"
}), Te(La, {
keybind: e?.en?.rn || "KeyB"
}) ]
}), Te("div", {
className: "feature-item",
children: [ Te("span", {
className: "feature-name",
children: "Sticky Target"
}), Te(La, {
keybind: e?.en?.cn || "KeyN"
}) ]
}), Te("div", {
className: "feature-item",
children: [ Te("span", {
className: "feature-name",
children: "Layer Spoofer"
}), Te(La, {
keybind: e?.en?.mn || "KeyT"
}) ]
}) ]
}) ]
}), Te("div", {
className: "help-title",
style: {
marginTop: "1rem"
},
children: [ Te(Ba.In, {
size: 16
}), Te("span", {
children: "Community & Support"
}) ]
}), Te("div", {
className: "community-container",
children: [ Te("div", {
className: "discord-panel",
children: [ Te("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Te(Ba.Gn, {
style: {
width: "1rem",
height: "1rem",
color: "#5865F2"
}
}), Te("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "Discord Server"
}) ]
}), Te("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Join for support, bug reports, suggestions, and announcements:"
}), Te("a", {
href: "https://discord.gg/STcYcBZa",
target: "_blank",
rel: "noopener noreferrer",
className: "discord-link",
children: "discord.gg"
}) ]
}), Te("div", {
className: "website-panel",
children: [ Te("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Te(Ba.Kn, {
style: {
color: "#69f74c"
}
}), Te("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "Official Website"
}) ]
}), Te("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Visit our website for the latest updates and a backup Discord invite link:"
}), Te("a", {
href: "https://surminusclient1.github.io/",
target: "_blank",
rel: "noopener noreferrer",
className: "website-link",
children: "surminusclient.github.io"
}) ]
}) ]
}), Te("div", {
className: "help-title",
children: [ Te(Ba.Wn, {
size: 16
}), Te("span", {
children: "Credits"
}) ]
}), Te("div", {
className: "credits-panel",
children: Te("div", {
className: "credits-container",
children: [ Te("div", {
className: "credit-item",
children: [ Te("div", {
className: "credit-name",
children: "shiroko"
}), Te("div", {
children: "Developer, Designer"
}) ]
}), Te("div", {
className: "credit-item",
children: [ Te("div", {
className: "credit-name",
children: "winzy"
}), Te("div", {
children: "Developer"
}) ]
}) ]
})
}) ]
}), Ga = ({}) => {
const [e, r] = oe(() => localStorage.getItem("surminus-theme") || "green"), [t, n] = oe(null), a = [ {
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
const t = a.find(r => r.id === e);
if (!t) {
return;
}
const o = localStorage.getItem("surminus-theme"), l = a.find(e => e.id === o);
r(e);
const {r: s, g: c, b: d} = i(t.colors.primary), u = e => {
e && (e.style.setProperty("--md-primary", t.colors.primary, "important"), e.style.setProperty("--md-primary-container", t.colors.primaryContainer, "important"), 
e.style.setProperty("--md-state-hover", t.colors.stateHover, "important"), e.style.setProperty("--md-state-focus", t.colors.stateFocus, "important"), 
e.style.setProperty("--md-state-pressed", t.colors.stateFocus, "important"), e.style.setProperty("--md-state-dragged", `rgba(${s}, ${c}, ${d}, 0.16)`, "important"), 
e.style.setProperty("--md-scrollbar-thumb", `rgba(${s}, ${c}, ${d}, 0.5)`, "important"), 
e.style.setProperty("--md-scrollbar-thumb-hover", `rgba(${s}, ${c}, ${d}, 0.8)`, "important"), 
e.style.setProperty("--md-primary-rgb", `${s}, ${c}, ${d}`, "important"));
};
let m = null;
Fe && (m = Fe.getElementById("ui")), m || (m = document.getElementById("ui")), m && (u(m), 
m.querySelectorAll("*").forEach(e => {
e.style && u(e);
})), u(document.documentElement), Fe && Fe.host && u(Fe.host);
try {
if (l && l.colors && l.colors.primary) {
const e = l.colors.primary.toLowerCase(), r = t.colors.primary, n = t => {
t && t.querySelectorAll("[style]").forEach(t => {
try {
const n = t.getAttribute("style");
if (n && n.toLowerCase().includes(e)) {
const a = n.replace(RegExp(e, "ig"), r);
t.setAttribute("style", a);
}
} catch (e) {}
});
};
Fe && n(Fe), n(document);
}
} catch (e) {}
try {
let e = "surminus-scrollbar-override", r = document.head.querySelector("style#" + e);
r && r.remove();
const t = document.createElement("style");
t.id = e, t.textContent = `\n        #ui ::-webkit-scrollbar-thumb {\n          background: rgba(${s}, ${c}, ${d}, 0.5) !important;\n        }\n        #ui ::-webkit-scrollbar-thumb:hover {\n          background: rgba(${s}, ${c}, ${d}, 0.8) !important;\n        }\n        #ui * {\n          scrollbar-color: rgba(${s}, ${c}, ${d}, 0.5) rgba(255, 255, 255, 0.03) !important;\n        }\n      `, 
document.head.appendChild(t);
} catch (e) {}
try {
if (Fe) {
let e = "surminus-theme-override", r = Fe.querySelector("style#" + e);
r && r.remove();
const n = document.createElement("style");
n.id = e, n.textContent = `\n          * {\n            --md-primary: ${t.colors.primary} !important;\n            --md-primary-container: ${t.colors.primaryContainer} !important;\n            --md-state-hover: ${t.colors.stateHover} !important;\n            --md-state-focus: ${t.colors.stateFocus} !important;\n            --md-state-pressed: ${t.colors.stateFocus} !important;\n            --md-state-dragged: rgba(${s}, ${c}, ${d}, 0.16) !important;\n            --md-scrollbar-thumb: rgba(${s}, ${c}, ${d}, 0.5) !important;\n            --md-scrollbar-thumb-hover: rgba(${s}, ${c}, ${d}, 0.8) !important;\n          }\n        `, 
Fe.insertBefore(n, Fe.firstChild);
}
} catch (e) {}
try {
const {r: e, g: r, b: n} = i(t.colors.primary);
document.documentElement.style.setProperty("--md-primary-rgb", `${e}, ${r}, ${n}`, "important");
} catch (e) {}
localStorage.setItem("surminus-theme", e), n(t), setTimeout(() => {
n(null);
}, 5e3);
}, i = e => {
const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
return r ? {
r: parseInt(r[1], 16),
g: parseInt(r[2], 16),
b: parseInt(r[3], 16)
} : {
r: 255,
g: 184,
b: 0
};
};
return ie(() => {
let e = 0;
const r = () => {
let t = null;
if (Fe && (t = Fe.getElementById("ui")), t || (t = document.getElementById("ui")), 
t) {
const e = localStorage.getItem("surminus-theme");
o(e || "green");
} else {
10 > e && (e++, setTimeout(r, 100));
}
};
r();
}, []), Te("div", {
className: "section",
children: [ t && Te("div", {
style: {
padding: "1rem",
marginBottom: "1rem",
background: t.gradient,
border: "2px solid " + t.primary,
borderRadius: "var(--md-shape-corner-large)",
boxShadow: "var(--md-elevation-2)",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "1rem",
animation: "fadeIn 0.3s ease-in-out"
},
children: [ Te("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.75rem"
},
children: [ Te("span", {
style: {
fontSize: "1.25rem",
color: "#ffffff",
fontWeight: "bold"
},
children: "✓"
}), Te("div", {
children: [ Te("p", {
style: {
margin: "0 0 0.25rem 0",
fontSize: "var(--md-font-body-medium)",
fontWeight: 600,
color: "#ffffff"
},
children: "Theme Applied"
}), Te("p", {
style: {
margin: 0,
fontSize: "var(--md-font-body-small)",
color: "rgba(255, 255, 255, 0.9)"
},
children: [ "Refresh the page to fully apply ", Te("strong", {
children: t.name
}), " theme" ]
}) ]
}) ]
}), Te("button", {
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
}), Te("style", {
children: "\n        @keyframes fadeIn {\n          from {\n            opacity: 0;\n            transform: translateY(-10px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n      "
}), Te("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.5rem",
marginBottom: "1rem"
},
children: [ Te(Ma, {
size: 18,
style: {
color: "var(--md-primary)"
}
}), Te("h2", {
style: {
fontSize: "var(--md-font-headline-small)",
fontWeight: 600,
margin: 0,
color: "var(--md-on-surface)"
},
children: "Color Themes"
}) ]
}), Te("p", {
style: {
fontSize: "var(--md-font-body-medium)",
color: "var(--md-on-surface-variant)",
marginBottom: "1.5rem"
},
children: "Select a color preset below to change the theme"
}), Te("div", {
style: {
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gap: "1rem"
},
children: a.map(r => Te("button", {
disabled: !1,
onClick: () => o(r.id),
style: {
padding: "1rem",
background: r.id === e ? `linear-gradient(135deg, ${r.colors.primaryContainer}, ${r.colors.primaryContainer})` : "var(--md-surface-container-low)",
border: r.id === e ? "2px solid " + r.primary : "1px solid var(--md-outline-variant)",
borderRadius: "var(--md-shape-corner-large)",
cursor: "pointer",
opacity: 1,
transition: "all var(--md-motion-duration-short3) var(--md-motion-easing-standard)",
boxShadow: r.id === e ? "var(--md-elevation-3)" : "var(--md-elevation-1)",
display: "flex",
flexDirection: "column",
alignItems: "flex-start",
gap: "0.5rem"
},
children: [ Te("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.75rem",
width: "100%"
},
children: [ Te("div", {
style: {
width: "24px",
height: "24px",
borderRadius: "50%",
background: r.gradient,
border: "2px solid var(--md-surface)",
boxShadow: `0 0 12px ${r.primary}60`,
opacity: r.id === e ? 1 : .6
}
}), Te("span", {
style: {
fontSize: "var(--md-font-label-large)",
fontWeight: 600,
color: "var(--md-on-surface)"
},
children: r.name
}) ]
}), Te("span", {
style: {
fontSize: "var(--md-font-label-small)",
color: "var(--md-on-surface-variant)",
textAlign: "left"
},
children: r.description
}), r.id === e && Te("div", {
style: {
marginTop: "0.5rem",
padding: "0.25rem 0.75rem",
background: r.gradient,
borderRadius: "var(--md-shape-corner-full)",
fontSize: "var(--md-font-label-small)",
fontWeight: 600,
color: "#ffffff"
},
children: "✓ Active"
}) ]
}, r.id))
}), Te("div", {
style: {
marginTop: "1.5rem",
padding: "1rem",
background: "var(--md-surface-container-low)",
borderRadius: "var(--md-shape-corner-large)",
border: "1px solid var(--md-outline-variant)"
},
children: Te("p", {
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
}, Za = ({Zn: e, Un: r, Yn: t, version: n}) => {
const [a, o] = oe("main"), [i, l] = oe({
x: 175,
y: 125
}), [s, c] = oe(!1), [d, u] = oe({
x: 0,
y: 0
}), [m, f] = oe(""), h = le(null);
ie(() => {
const e = e => {
if (s) {
const r = h.current;
if (!r) {
return;
}
const t = 100;
let n = e.clientX - d.x, a = e.clientY - d.y;
const o = 0, i = $e.innerHeight - 50;
n = Math.max(-(r.offsetWidth - t), Math.min($e.innerWidth - t, n)), a = Math.max(o, Math.min(i, a)), 
l({
x: n,
y: a
});
}
}, r = () => {
c(!1);
};
return s && (Reflect.apply(lr, je, [ "mousemove", e ]), Reflect.apply(lr, je, [ "mouseup", r ])), 
() => {
Reflect.apply(sr, je, [ "mousemove", e ]), Reflect.apply(sr, je, [ "mouseup", r ]);
};
}, [ s, d ]), ie(() => {
const e = () => {
const e = h.current;
if (!e) {
return;
}
const r = e.querySelector(".titlebar");
if (!r) {
return;
}
const t = r.getBoundingClientRect(), n = -(e.offsetWidth - 100), a = $e.innerWidth - 100, o = $e.innerHeight - t.height;
l(e => ({
x: Math.max(n, Math.min(a, e.x)),
y: Math.max(0, Math.min(o, e.y))
}));
};
return Reflect.apply(lr, $e, [ "resize", e ]), () => {
Reflect.apply(sr, $e, [ "resize", e ]);
};
}, []);
const g = e => {
e.stopPropagation();
};
return Te(P, {
children: Te("div", {
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
children: Te("div", {
className: "popup",
children: [ Te("div", {
className: "search-header",
onMouseDown(e) {
c(!0), u({
x: e.clientX - i.x,
y: e.clientY - i.y
});
},
children: [ Te("div", {
className: "logo-text",
children: [ Te("span", {
className: "logo-char-green",
children: "S"
}), Te("span", {
className: "logo-char-white",
children: "ur"
}), Te("span", {
className: "logo-char-white",
children: "M"
}), Te("span", {
className: "logo-char-white",
children: "i"
}), Te("span", {
className: "logo-char-white",
children: "n"
}), Te("span", {
className: "logo-char-white",
children: "u"
}), Te("span", {
className: "logo-char-white",
children: "s"
}), n && Te("span", {
className: "version-text",
children: (e => {
const r = {
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
return e.split("").map(e => r[e] || e).join("");
})(n)
}) ]
}), Te("div", {
className: "search-bar",
children: [ Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: "2",
className: "search-icon",
children: [ Te("circle", {
cx: "11",
cy: "11",
r: "8"
}), Te("path", {
d: "m21 21-4.35-4.35"
}) ]
}), Te("input", {
className: "search-input",
placeholder: "Start typing to search...",
value: m,
onChange(e) {
const r = e.target.value;
f(r), "" !== r.trim() && o("main");
},
onKeyDown(e) {
"Escape" === e.key && f("");
}
}) ]
}), Te("button", {
className: "close-btn",
onClick: t,
children: "×"
}) ]
}), Te("div", {
className: "menu-layout",
children: [ Te(ja, {
activeTab: a,
onTabChange: o
}), Te("div", {
className: "main-panel",
children: Te("div", {
className: "content-container " + (a ? "active" : ""),
children: (() => {
switch (a) {
case "combat":
return Te(Da, {
Zn: e,
Un: r
});

case "main":
case "search":
default:
return Te(Ia, {
Zn: e,
Un: r,
searchQuery: m
});

case "visuals":
return Te(Ha, {
Zn: e,
Un: r
});

case "misc":
return Te(Ka, {
Zn: e,
Un: r
});

case "themes":
return Te(Ga, {
Zn: e,
Un: r
});

case "help":
return Te(Wa, {
Zn: e,
Un: r
});
}
})()
}, a)
}) ]
}) ]
})
})
});
}, Ua = ({Un: e}) => {
const [r, t] = oe(!0), [n, a] = oe({
x: 0,
y: 0
}), [o, i] = oe(!1), [l, s] = oe({
x: 0,
y: 0
}), c = le(null);
ie(() => {
a({
x: $e.innerWidth / 2 - 200,
y: $e.innerHeight / 2 - 150
});
}, []);
const d = () => {
e(e => {
e.vn.yn = !0;
});
};
return ie(() => {
const e = e => {
if (o) {
const r = c.current;
if (!r) {
return;
}
const t = r.querySelector(".titlebar");
if (!t) {
return;
}
const n = t.getBoundingClientRect(), o = 100;
let i = e.clientX - l.x, s = e.clientY - l.y;
const d = 0, u = $e.innerHeight - n.height;
i = Math.max(-(r.offsetWidth - o), Math.min($e.innerWidth - o, i)), s = Math.max(d, Math.min(u, s)), 
a({
x: i,
y: s
});
}
}, r = () => {
i(!1);
};
return o && (Reflect.apply(lr, je, [ "mousemove", e ]), Reflect.apply(lr, je, [ "mouseup", r ])), 
() => {
Reflect.apply(sr, je, [ "mousemove", e ]), Reflect.apply(sr, je, [ "mouseup", r ]);
};
}, [ o, l, n ]), r ? Te("div", {
id: "ui-notification",
ref: c,
style: {
position: "fixed",
left: n.x + "px",
top: n.y + "px",
zIndex: "999999"
},
children: Te("div", {
className: "popup",
style: {
width: "25rem"
},
children: [ Te("div", {
className: "titlebar",
onMouseDown(e) {
i(!0), s({
x: e.clientX - n.x,
y: e.clientY - n.y
});
},
children: [ Te("div", {
className: "title",
children: "New Discord Server!"
}), Te("span", {
className: "credit",
children: "Join our community"
}), Te("button", {
className: "close-btn",
onClick() {
d(), t(!1);
},
children: "×"
}) ]
}), Te("div", {
style: {
padding: "1rem"
},
children: Te("div", {
className: "discord-panel",
style: {
marginBottom: "0"
},
children: [ Te("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ Te("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "currentColor",
style: {
width: "1rem",
height: "1rem",
color: "#5865F2"
},
children: Te("path", {
d: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"
})
}), Te("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "We have a new Discord server!"
}) ]
}), Te("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Join our new official Discord server to stay updated, get support, and connect with the community. Don't miss out on announcements, updates, and exclusive features!"
}), Te("a", {
href: "https://discord.gg/STcYcBZa",
target: "_blank",
rel: "noopener noreferrer",
className: "discord-link",
onClick() {
d(), t(!1), window.open("https://discord.gg/STcYcBZa", "_blank");
},
children: "Join Discord Server"
}) ]
})
}) ]
})
}) : null;
}, Va = {
enable: null,
disable: null
}, Ya = async e => {
if (!Va[e]) {
try {
const r = "enable" === e ? "https://raw.githubusercontent.com/surminusclient1/bac/main/enable.wav" : "https://raw.githubusercontent.com/surminusclient1/bac/main/disable.wav", t = await fetch(r), n = await t.arrayBuffer(), a = new (window.AudioContext || window.webkitAudioContext), o = await a.decodeAudioData(n);
Va[e] = {
audioBuffer: o,
audioContext: a
};
} catch (e) {}
}
}, Ja = async (e = "enable") => {
try {
Va[e] || await Ya(e);
const {audioBuffer: r, audioContext: t} = Va[e];
if (!r || !t) {
return;
}
const n = t.createBufferSource();
n.buffer = r, n.connect(t.destination), n.start(0);
} catch (e) {}
}, qa = {
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
}, Qa = {
level0: "0px 0px 0px rgba(0, 0, 0, 0)",
level1: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
level2: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
level3: "0px 10px 13px rgba(0, 0, 0, 0.19), 0px 6px 13px rgba(0, 0, 0, 0.23)",
level4: "0px 15px 25px rgba(0, 0, 0, 0.15), 0px 15px 27px rgba(0, 0, 0, 0.26)",
level5: "0px 20px 33px rgba(0, 0, 0, 0.2), 0px 0px 27px rgba(0, 0, 0, 0.12)"
}, Xa = {
hover: "rgba(255, 184, 0, 0.08)",
focus: "rgba(255, 184, 0, 0.12)",
pressed: "rgba(255, 184, 0, 0.12)",
dragged: "rgba(255, 184, 0, 0.16)"
}, eo = {
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
}, ro = {
standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
standardAccelerate: "cubic-bezier(0.4, 0, 1, 1)",
standardDecelerate: "cubic-bezier(0, 0, 0.2, 1)",
emphasized: "cubic-bezier(0.2, 0, 0, 1)",
emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)"
}, to = {
none: "0",
extraSmall: "0.25rem",
small: "0.5rem",
medium: "0.75rem",
large: "1rem",
extraLarge: "1.5rem",
full: "9999px"
}, no = {
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
}, ao = {
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

let oo = null, io = null, lo = () => {}, so = "", co = !1;

const uo = () => {
oo && co && oo.render(Te(Za, {
Zn: De,
Un: ze,
Yn: () => lo(!1),
version: so
}));
}, mo = (e, r) => {
ze(t => {
const n = !e(t);
r(t, n);
});
}, fo = [ {
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
} ], ho = async () => {
try {
so = "5.0", co && uo();
} catch (e) {
so = "5.0", co && uo();
}
};

let go = !1, po = !1, bo = {
x: 0,
y: 0
};

const vo = {
qn: !1,
Jn: !1,
Xn: !1,
Qn: !1,
ea: 0
}, yo = () => {
n(Ee.game, "init", {
apply(e, r, n) {
const a = Reflect.apply(e, r, n);
return (e => new Promise(r => {
function t(e) {
if (!e || "object" != typeof e || e instanceof Array) {
return null;
}
let r = {
m: 0,
h: 0,
p: 0,
_: 0,
C: 0
};
return new Set([ ...Object.keys(e), ...Object.getOwnPropertyNames(Object.getPrototypeOf(e) || {}) ]).forEach(t => {
let n = e[t];
Array.isArray(n) ? r._++ : "object" == typeof n && null !== n ? r.p++ : "function" == typeof n ? r.h++ : r.m++, 
r.C++;
}), Object.values(r).map(e => String.fromCharCode(97 + e)).join("");
}
function n() {
const e = Object.keys(a), r = Object.keys(Ve);
return e.every(e => r.includes(e));
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
re: "2-8-1-1-12",
ne: "4-28-6-1-39",
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
ze: "",
Ae: ""
}, o = {};
for (const [e, r] of Object.entries(a)) {
if ("" != r) {
if (r instanceof Array) {
r.forEach((e, t) => {
const n = e.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
r[t] = n;
}), o[e] = r;
} else {
const t = r.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
o[e] = t;
}
} else {
o[e] = "";
}
}
const i = setInterval(() => {
Ve = (() => {
function r(e, r) {
const n = t(e[r]);
if (n) {
for (const [e, t] of Object.entries(o)) {
a[e] || (t instanceof Array && t.some(e => e == n) && (a[e] = r), t == n && (a[e] = r));
}
}
}
if (!e || !e.game) {
return {};
}
const n = e.game, a = {
...Ve
};
for (const e in n) {
if (n.hasOwnProperty(e)) {
try {
n[e].hasOwnProperty("deadBodyPool") ? a.H = e : n[e].hasOwnProperty("airdropPool") && (a.L = e);
} catch {}
try {
if (n[e].hasOwnProperty("bones")) {
a.J = e;
const t = new n[e].constructor;
for (const a in t) {
try {
r(n[e], a);
} catch {}
}
if (null != a.ce && (a.Me = Object.getOwnPropertyNames(n[e][a.ce]).find(r => n[e][a.ce][r] instanceof $e.Array)), 
null != a.ce && null != a.N) {
const r = Object.getOwnPropertyNames(n[e][a.ce]), t = Object.getOwnPropertyNames(n[a.N]);
a.be = r.filter(e => t.includes(e)).find(r => "number" == typeof n[e][a.ce][r]);
}
if (null == a.se) {
continue;
}
if (null != a.J) {
try {
n[a.J].selectIdlePose.call({
[a.se]: new Proxy({}, {
get(e, r) {
a.Se = r;
}
})
});
} catch {}
try {
n[a.J].canInteract.call({
[a.se]: new Proxy({}, {
get(e, r) {
a.Ne = r;
}
})
});
} catch {}
}
(() => {
let e = !1, r = !1;
const n = [ null, null, e => a.me = e, e => a.fe = e ], o = [ e => a.ge = e, e => a.pe = e, null ], i = Object.getOwnPropertyNames(t.__proto__).find(e => 13 == t[e].length);
try {
t[i].call(new Proxy({}, {
get(e, r) {
return n.shift()?.(r), new Proxy({
x: 0,
y: 0
}, {
get(e, r) {
return e[r] || {
x: 0,
y: 0
};
}
});
},
set(r, t) {
return e && (e = !1, a.he = t), o.shift()?.(t), !0;
}
}), null, {
getPlayerById() {}
}, null, {
isSoundPlaying: () => !1
}, null, {
isBindDown: () => (n.unshift(null, null, null, null, null), !1)
}, new Proxy({}, {
get(t, n) {
e = !0, r = !0;
}
}));
} catch {}
r || (a.he = a.me);
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
a.W = e, Object.getOwnPropertyNames(n[e]).forEach(r => {
"object" == typeof n[e][r] && null != n[e][r] && t(n[e][r]) == o.de && (a.de = r);
});
continue;
}
} catch {}
try {
r(n, e);
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
get(e, r) {
throw a.xe = r, null;
}
}));
} catch {}
}
} catch {}
try {
if (null != a.xe && null == a._e) {
const e = n[a.ue][a.xe][a.ye], r = new Proxy({}, {
get(e, r) {
a._e = r;
}
});
e[0].render.call({}, r, r);
}
} catch {}
try {
if (null != a.V && null == a.we) {
let e = new n[a.V].constructor;
e.activePlayer = 1, e.emoteSelector.ping = "ping_danger", e.uiManager = {
getWorldPosFromMapPos() {}
}, e.camera = new Proxy({}, {
get(e, r) {
a.we = r;
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
get(e, r) {
a.Ce = r;
}
})
});
} catch {}
try {
null != a.D && null == a.ze && (a.ze = Object.getOwnPropertyNames(e.game[a.D]).find(r => e.game[a.D][r] instanceof $e.Array));
} catch {}
try {
null != a.U && null == a.Ae && (f = Object.getOwnPropertyNames(e.game[a.U].__proto__).find(r => 4 == e.game[a.U][r].length), 
e.game[a.U][f].call(new Proxy(e.game[a.U], {
get(e, r) {
return e[r].bind(new Proxy({}, {
get(e, r) {
a.Ae = r;
}
}));
}
})));
} catch {}
return a;
})(), n() && (clearInterval(i), r(Ve));
});
setTimeout(() => {
n() || (clearInterval(i), r(Ve));
}, 1e3);
}))(Ee).then(() => {
po || (kr.kn = Ee.pixi.stage.constructor, kr.st = Ee.pixi.stage.children.find(e => e.lineStyle)?.constructor, 
ot(), Ee.pixi._ticker.add(c), Ee.pixi._ticker.add(Rt), (() => {
const e = () => {
(e => !!e && (lt.Mn || (lt.Mn = $e.document.createElement("div"), lt.Mn.classList.add("aimbot-dot"), 
e.appendChild(lt.Mn)), lt.Pe = !0, !0))(Ie) ? en || (Ee.pixi._ticker.add(C), en = !0) : requestAnimationFrame(e);
};
e(), "undefined" != typeof globalThis && (globalThis.__AIMBOT_MODULE__ = {
hasValidTarget: S,
getCurrentTarget: T,
isEnemyBehindWall: N,
getAimbotShootableState: M
});
})(), Ee.pixi._ticker.add(kn), Reflect.apply(lr, $e, [ "keydown", zr ]), Reflect.apply(lr, $e, [ "keyup", Ar ]), 
po = !0), Ye || (Ee.pixi._ticker.add(t), Ye = !0), po = !0;
}), a;
}
}), (() => {
const e = Object.getOwnPropertyNames(Ee.game.__proto__).find(e => "function" == typeof Ee.game[e] && 3 === Ee.game[e].length);
n(Ee.game, e, {
apply(e, r, t) {
const [n, a] = t;
return 1 === n && (a.isMobile = De.Vr.Te), 3 === n && (e => {
for (const r of Le.lt) {
e.addInput(r);
}
Le.lt.length = 0;
try {
Le.Vt && (e.useItem = Le.Vt, Le.Vt = null);
} catch {}
})(a), a.inputs ? ((e => {
if (!$t && !jt) {
return;
}
const r = Ee.game?.[Ve.J];
jt && ((e => {
try {
if (!e || !e[Ve.se]) {
return !1;
}
const r = e[Ve.se];
for (const e in r) {
const t = r[e];
if (t && "object" == typeof t && "type" in t) {
const e = t.type;
if (1 === e || 2 === e) {
return !0;
}
}
if (e.toLowerCase().includes("action") && "number" == typeof t && (1 === t || 2 === t)) {
return !0;
}
}
return !1;
} catch {
return !1;
}
})(r) || (e => {
try {
const r = e?.[Ve.se], t = r?.[Ve.Se];
if (!t) {
return !1;
}
const n = t.toLowerCase();
return n.includes("bandage") || n.includes("health") || n.includes("medkit") || n.includes("soda") || n.includes("pill");
} catch {
return !1;
}
})(r)) || (e.shootStart = !0, e.shootHold = !0);
})(a), (e => {
if (!De.Dr.Te) {
return;
}
const r = (e.moveRight ? 1 : 0) + (e.moveLeft ? -1 : 0), t = (e.moveDown ? -1 : 0) + (e.moveUp ? 1 : 0);
if (0 !== r || 0 !== t) {
return e.touchMoveActive = !0, e.touchMoveLen = !0, bo.x += (r - bo.x) * De.Dr.Er / 1e3, 
bo.y += (t - bo.y) * De.Dr.Er / 1e3, e.touchMoveDir.x = bo.x, void (e.touchMoveDir.y = bo.y);
}
bo.x = 0, bo.y = 0;
})(a), o = a, Be.Pr && (o.touchMoveActive = !0, o.touchMoveLen = !0, o.touchMoveDir.x = Be.Pr.x, 
o.touchMoveDir.y = Be.Pr.y), (e => {
if (!e) {
return;
}
const r = Ur.Be, t = !!e.shootStart || !!e.shootHold || Array.isArray(e.inputs) && e.inputs.includes(vr);
t && !vo.Qn && De.kt.Te && (vo.ea = 3), vo.Qn = t, t || (vo.ea = 0);
const n = vo.ea > 0;
if (n && vo.ea--, !(Ur.wn && "idle" !== r || n)) {
return vo.qn && (e.shootStart = !0, vo.Jn && (e.shootHold = !0, Array.isArray(e.inputs) && vo.Xn && !e.inputs.includes(vr) && e.inputs.push(vr))), 
vo.qn = !1, vo.Jn = !1, vo.Xn = !1, void (vo.ea = 0);
}
let a = !1;
if (Array.isArray(e.inputs)) {
for (let r = e.inputs.length - 1; r >= 0; r -= 1) {
e.inputs[r] === vr && (e.inputs.splice(r, 1), a = !0);
}
}
const o = !!e.shootStart, i = !!e.shootHold || a;
(o || i) && (e.shootStart = !1, e.shootHold = !1, vo.qn = vo.qn || o || i, vo.Jn = vo.Jn || i, 
vo.Xn = vo.Xn || a);
})(a), Le.tt = a.toMouseLen, Reflect.apply(e, r, t)) : Reflect.apply(e, r, t);
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
} catch (F) {}

try {
window.onerror = () => {};
} catch (F) {}

try {
window.onunhandledrejection = () => {};
} catch (F) {}

try {
window.onrejectionhandled = () => {};
} catch (F) {}

try {
window.onabort = () => {};
} catch (F) {}

try {
window.onunload = () => {};
} catch (F) {}

try {
window.onbeforeunload = () => {};
} catch (F) {}

try {
window.addEventListener("error", () => {}, !0), window.addEventListener("unhandledrejection", () => {}, !0), 
window.addEventListener("rejectionhandled", () => {}, !0), window.addEventListener("abort", () => {}, !0);
} catch (F) {}

try {
Object.defineProperty(window, "Error", {
value: void 0,
configurable: !1,
writable: !1
});
} catch (F) {}

try {
window.alert = () => {};
} catch (F) {}

try {
window.confirm = () => {};
} catch (F) {}

try {
window.prompt = () => {};
} catch (F) {}

try {
Object.freeze(window.console);
} catch (F) {}

try {
Object.freeze(window);
} catch (F) {}

(async () => {
const t = Date.now();
try {
if ("5.0" !== (await (window.pr || Promise.reject())).tag_name && t > 1771044478282) {
Oe("https://surminusclient1.github.io/");
try {
je.head.innerHTML = "", je.body.innerHTML = "<h1>This version of SurMinus is outdated and may not function properly.<br>For safety & security please update to the new one!<br>Redirecting in 3 seconds...</h1>";
} catch (e) {}
await new Promise(() => {}), ""();
}
} catch (e) {}
try {
const t = r();
if (t) {
const r = e(t);
(a = JSON.parse(r)) && "object" == typeof a && De._deserialize(a);
}
} catch (e) {}
var a;
Ue(), (() => {
try {
const e = "surviv_config", r = $e.localStorage.getItem(e);
if (r) {
const t = JSON.parse(r);
t.interpolation = !0, t.localRotation = !0, $e.localStorage.setItem(e, JSON.stringify(t));
}
} catch {}
var t;
(() => {
if (go) {
return;
}
go = !0;
const t = () => (() => {
(async () => {
const e = [ {
name: cr,
file: "GothamPro.woff2",
weight: 200,
style: "normal"
}, {
name: cr,
file: "GothamPro-Italic.woff2",
weight: 200,
style: "italic"
}, {
name: cr,
file: "GothamPro-Medium.woff2",
weight: 400,
style: "normal"
}, {
name: cr,
file: "GothamPro-MediumItalic.woff2",
weight: 400,
style: "italic"
}, {
name: cr,
file: "GothamPro-Bold.woff2",
weight: 600,
style: "normal"
} ].map(async e => {
try {
const r = new FontFace(e.name, `url(https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/${e.file})`, {
weight: "" + e.weight,
style: e.style
});
await r.load(), je.fonts.add(r);
} catch {}
});
await Promise.all(e);
})();
const t = (() => {
Ie = Fe;
const e = document.createElement("style");
return e.textContent = "#ui{--md-primary:#ffb800;--md-primary-rgb:255,184,0;--md-primary-container:rgba(255, 184, 0, 0.15);--md-on-primary:#131313;--md-secondary:#7dd5e6;--md-secondary-container:rgba(125, 213, 230, 0.15);--md-tertiary:#ffc66d;--md-error:#f28482;--md-surface:#131313;--md-surface-dim:#0a0a0a;--md-surface-bright:#2a2a2a;--md-surface-container-lowest:#0f0f0f;--md-surface-container-low:#1a1a1a;--md-surface-container:#1e1e1e;--md-surface-container-high:#282828;--md-surface-container-highest:#333333;--md-on-surface:#ffffff;--md-on-surface-variant:rgba(255, 255, 255, 0.7);--md-outline:rgba(255, 255, 255, 0.2);--md-outline-variant:rgba(255, 255, 255, 0.1);--md-elevation-0:0px 0px 0px rgba(0, 0, 0, 0);--md-elevation-1:0px 1px 3px rgba(0, 0, 0, 0.12),0px 1px 2px rgba(0, 0, 0, 0.24);--md-elevation-2:0px 3px 6px rgba(0, 0, 0, 0.16),0px 3px 6px rgba(0, 0, 0, 0.23);--md-elevation-3:0px 10px 13px rgba(0, 0, 0, 0.19),0px 6px 13px rgba(0, 0, 0, 0.23);--md-elevation-4:0px 15px 25px rgba(0, 0, 0, 0.15),0px 15px 27px rgba(0, 0, 0, 0.26);--md-elevation-5:0px 20px 33px rgba(0, 0, 0, 0.2),0px 0px 27px rgba(0, 0, 0, 0.12);--md-state-hover:rgba(255, 184, 0, 0.08);--md-state-focus:rgba(255, 184, 0, 0.12);--md-state-pressed:rgba(255, 184, 0, 0.12);--md-state-dragged:rgba(255, 184, 0, 0.16);--md-scrollbar-thumb:rgba(255, 184, 0, 0.5);--md-scrollbar-thumb-hover:rgba(255, 184, 0, 0.8);--md-font-family:'GothamPro',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--md-font-display-large:3.5rem;--md-font-display-medium:2.8rem;--md-font-display-small:2.25rem;--md-font-headline-large:2rem;--md-font-headline-medium:1.75rem;--md-font-headline-small:1.5rem;--md-font-title-large:1.375rem;--md-font-title-medium:1rem;--md-font-title-small:0.875rem;--md-font-body-large:1rem;--md-font-body-medium:0.875rem;--md-font-body-small:0.75rem;--md-font-label-large:0.875rem;--md-font-label-medium:0.75rem;--md-font-label-small:0.6875rem;--md-shape-corner-none:0;--md-shape-corner-extra-small:0.25rem;--md-shape-corner-small:0.5rem;--md-shape-corner-medium:0.75rem;--md-shape-corner-large:1rem;--md-shape-corner-extra-large:1.5rem;--md-shape-corner-full:9999px;--md-motion-duration-short1:50ms;--md-motion-duration-short2:100ms;--md-motion-duration-short3:150ms;--md-motion-duration-short4:200ms;--md-motion-duration-medium1:250ms;--md-motion-duration-medium2:300ms;--md-motion-duration-medium3:350ms;--md-motion-duration-medium4:400ms;--md-motion-duration-long1:450ms;--md-motion-duration-long2:500ms;--md-motion-duration-long3:550ms;--md-motion-duration-long4:600ms;--md-motion-easing-standard:cubic-bezier(0.4, 0.0, 0.2, 1);--md-motion-easing-standard-accelerate:cubic-bezier(0.4, 0, 1, 1);--md-motion-easing-standard-decelerate:cubic-bezier(0, 0, 0.2, 1);--md-motion-easing-emphasized:cubic-bezier(0.2, 0, 0, 1);--md-motion-easing-emphasized-decelerate:cubic-bezier(0.05, 0.7, 0.1, 1);--md-motion-easing-emphasized-accelerate:cubic-bezier(0.3, 0, 0.8, 0.15);--md-spacing-0:0;--md-spacing-1:0.25rem;--md-spacing-2:0.5rem;--md-spacing-3:0.75rem;--md-spacing-4:1rem;--md-spacing-5:1.25rem;--md-spacing-6:1.5rem;--md-spacing-7:1.75rem;--md-spacing-8:2rem;--border-radius:0.375rem;--border-width:0.0625rem;--transition-duration:100ms;--green-gradient:linear-gradient(180deg, #ffb800 0%, #ff9500 100%);--shadow-size:0.125rem;--shadow-opacity:0.2;--glow-size:0.25rem;--glow-opacity:0.2}#ui ::-webkit-scrollbar{width:8px;height:8px}#ui ::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}#ui ::-webkit-scrollbar-thumb{background:var(--md-scrollbar-thumb,rgba(110,219,114,.5));border-radius:4px;transition:background 150ms}#ui ::-webkit-scrollbar-thumb:hover{background:var(--md-scrollbar-thumb-hover,rgba(110,219,114,.8))}#ui *{scrollbar-color:var(--md-scrollbar-thumb,rgba(110,219,114,0.5)) rgba(255,255,255,0.03);scrollbar-width:thin}*{font-family:var(--md-font-family);box-sizing:border-box;margin:0;padding:0}:focus-visible{outline:0}.popup{user-select:none;position:relative;background:var(--md-surface);border-radius:var(--md-shape-corner-extra-large);box-shadow:var(--md-elevation-5);min-height:24rem;overflow:hidden;border:1px solid var(--md-outline-variant);display:flex;flex-direction:column}.titlebar{background:var(--md-surface-container-low);padding:var(--md-spacing-4);user-select:none;display:flex;flex-direction:row;align-items:center;justify-content:space-between;position:relative;cursor:grab;border-bottom:1px solid var(--md-outline-variant);min-height:3rem;box-shadow:var(--md-elevation-1);transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.titlebar::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:repeating-linear-gradient(45deg,transparent 0,transparent .25rem,rgba(255,255,255,.02) .25rem,rgba(255,255,255,.02) .5rem),repeating-linear-gradient(-45deg,transparent 0,transparent .25rem,rgba(0,0,0,.02) .25rem,rgba(0,0,0,.02) .5rem);filter:blur(.125rem);opacity:.5;z-index:0;pointer-events:none}.titlebar::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--md-primary-rgb),.3) 50%,transparent);transform:translateZ(0);z-index:2}.titlebar:hover{background:var(--md-surface-container);transition:background var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.titlebar:active{background:var(--md-surface-container-high);cursor:grabbing}.menu-layout{display:flex;flex:1;overflow:hidden}.search-header{display:flex;align-items:center;justify-content:space-between;padding:var(--md-spacing-4);background:var(--md-surface-container);border-bottom:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.logo-text{font-size:var(--md-font-headline-small);font-weight:700;color:var(--md-on-surface);white-space:nowrap;letter-spacing:.5px;flex-shrink:0;display:flex;gap:0}.logo-char-green{color:var(--md-primary);text-shadow:0 0 8px rgba(var(--md-primary-rgb),.3);font-weight:800}.logo-char-white{color:var(--md-on-surface);font-weight:700}.search-bar{display:flex;align-items:center;gap:var(--md-spacing-2);flex:0 0 auto;width:280px;padding:var(--md-spacing-3);background:var(--md-surface-container-high);border-radius:var(--md-shape-corner-medium);border:1px solid var(--md-outline-variant);backdrop-filter:blur(6px);position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.search-bar::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--md-primary),transparent);border-radius:0 0 var(--md-shape-corner-medium) var(--md-shape-corner-medium);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.search-bar:focus-within{background:var(--md-surface-container-highest);border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.search-bar:focus-within::after{opacity:1}.search-icon{color:var(--md-on-surface-variant);flex-shrink:0;width:16px;height:16px;margin-right:5px;transform:translateY(2px);transition:color var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.search-bar:focus-within .search-icon{color:var(--md-primary)}.search-input{flex:1;min-width:0;background:0 0;border:none;color:var(--md-on-surface);font-size:var(--md-font-body-medium);outline:0;padding:0;line-height:1}.search-input::placeholder{color:var(--md-on-surface-variant)}.close-btn{border:1px solid var(--md-outline);color:var(--md-on-surface-variant);border-radius:var(--md-shape-corner-small);display:flex;align-items:center;justify-content:center;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);overflow:hidden}.close-btn::before{content:'';position:absolute;inset:0;background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard);pointer-events:none}.close-btn:hover::before{opacity:1}.close-btn:hover{color:var(--md-on-surface);border-color:var(--md-primary)}.close-btn:active{background:var(--md-state-pressed);transform:scale(.98)}.main-panel{display:flex;flex-direction:column;flex:1;gap:var(--md-spacing-3);padding:var(--md-spacing-4);overflow-y:auto;background:var(--md-surface)}.feature-list{display:contents}.feature-card-wrapper{border-radius:var(--md-shape-corner-large);overflow:hidden;background:var(--md-surface-container-low);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1);transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.feature-card-wrapper:hover{background:var(--md-surface-container);box-shadow:var(--md-elevation-2);border-color:var(--md-outline)}.feature-card-wrapper.expanded{background:var(--md-surface-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-3)}.feature-card-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;position:relative;padding:var(--md-spacing-4);transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.feature-card-wrapper:hover .feature-card-header{background:var(--md-state-hover)}.feature-card-wrapper.expanded .feature-card-header{background:var(--md-state-focus)}.chevron{display:flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--md-on-surface-variant);transition:transform var(--md-motion-duration-short3) var(--md-motion-easing-emphasized),color var(--md-motion-duration-short2) var(--md-motion-easing-standard);flex-shrink:0;margin-right:var(--md-spacing-2)}.chevron.expanded{transform:rotate(180deg);color:var(--md-primary)}.chevron svg{width:16px;height:16px}.feature-settings{padding:var(--md-spacing-4);border-top:1px solid var(--md-outline-variant);background:var(--md-surface-container-low);animation:md-slideDown var(--md-motion-duration-short3) var(--md-motion-easing-standard)}@keyframes md-slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes md-fadeIn{from{opacity:0}to{opacity:1}}@keyframes md-tabContentFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.feature-settings .checkbox-group,.feature-settings>div{margin-bottom:var(--md-spacing-3)}.feature-settings>div:last-child{margin-bottom:0}.feature-card{display:flex;align-items:center;justify-content:space-between;padding:2px var(--md-spacing-2);background:0 0;border:none;border-left:0 solid transparent;border-radius:0;box-shadow:none;cursor:pointer;transition:transform var(--md-motion-duration-short1) var(--md-motion-easing-standard),background var(--md-motion-duration-short3) var(--md-motion-easing-standard),border-left-color var(--md-motion-duration-short3) var(--md-motion-easing-standard),border-left-width var(--md-motion-duration-medium1) var(--md-motion-easing-emphasized),padding-left var(--md-motion-duration-medium1) var(--md-motion-easing-emphasized),color var(--md-motion-duration-short2) var(--md-motion-easing-standard),border-radius var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.feature-card:hover{transform:translateY(-2px);background:var(--md-state-hover);border-left-color:var(--md-primary);border-radius:var(--md-shape-corner-medium);padding-left:calc(var(--md-spacing-2) - 3px);border-left-width:20px}.feature-card.enabled{border-left-color:var(--md-primary)}.feature-card.enabled .feature-title-text{color:var(--md-primary);text-shadow:0 0 10px rgba(var(--md-primary-rgb),.3)}.feature-card.enabled:hover{background:linear-gradient(180deg,var(--md-state-hover),rgba(var(--md-primary-rgb),.04))}.feature-card.disabled{border-left-color:var(--md-outline)}.feature-card.disabled .feature-title-text{color:var(--md-on-surface)}.feature-card-body{flex:1}.feature-card-title{display:flex;align-items:center;gap:var(--md-spacing-2);justify-content:flex-start}.feature-title-text{font-weight:600;font-size:var(--md-font-body-large);flex-shrink:0;transition:color var(--md-motion-duration-short3) var(--md-motion-easing-standard),text-shadow var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.feature-category{font-size:var(--md-font-label-medium);color:var(--md-on-surface-variant);margin-left:auto;flex-shrink:0;background:var(--md-primary-container);padding:2px 8px;border-radius:var(--md-shape-corner-small)}.feature-desc{margin-top:var(--md-spacing-2);color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium)}.feature-card-toggle{margin-left:var(--md-spacing-4)}.toggle{width:40px;height:24px;border-radius:var(--md-shape-corner-full);background:rgba(255,255,255,.12);position:relative;transition:background var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.toggle::after{content:'';position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:var(--md-on-surface);transition:transform var(--md-motion-duration-short2) var(--md-motion-easing-standard),background-color var(--md-motion-duration-short2) var(--md-motion-easing-standard);box-shadow:var(--md-elevation-1)}.toggle.on{background:var(--md-primary)}.toggle.on::after{transform:translateX(16px);background:var(--md-on-primary)}.sidebar{width:12rem;min-width:12rem;display:flex;flex-direction:column;background:var(--md-surface-container-low);border-right:1px solid var(--md-outline-variant);padding:var(--md-spacing-2) 0;overflow-y:auto;box-shadow:var(--md-elevation-1)}.popup{width:52rem;height:32rem;border-radius:var(--md-shape-corner-extra-large);backdrop-filter:blur(12px);border:1px solid var(--md-outline-variant);display:flex;flex-direction:column}.menu-icon{width:1.25rem;height:1.25rem;color:var(--md-on-surface);pointer-events:none;position:relative;flex-shrink:0}.version-text{position:relative;font-size:var(--md-font-label-medium);color:var(--md-on-surface-variant);z-index:10;margin-left:4px}.sidebar-menu{display:flex;flex-direction:column;gap:0;padding:0;flex:1;overflow:hidden}.sidebar-item{padding:var(--md-spacing-3) var(--md-spacing-4);background:0 0;border:none;border-radius:var(--md-shape-corner-medium);border-left:0 solid transparent;color:var(--md-on-surface-variant);font-size:var(--md-font-label-large);font-weight:500;cursor:pointer;text-align:left;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard);white-space:nowrap;display:flex;align-items:center;gap:var(--md-spacing-3);margin:0 var(--md-spacing-2);position:relative}.sidebar-item:hover{background:var(--md-state-hover);color:var(--md-on-surface);border-left-color:transparent;box-shadow:var(--md-elevation-1);transform:translateX(2px)}.sidebar-item.active{color:var(--md-on-surface);background:var(--md-primary-container);border-left-color:transparent;box-shadow:var(--md-elevation-2);font-weight:600}.sidebar-icon{width:18px;height:18px;flex-shrink:0;color:currentColor;transition:transform var(--md-motion-duration-short3) var(--md-motion-easing-standard),color var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.sidebar-item:hover .sidebar-icon{transform:scale(1.1)}.sidebar-item.active .sidebar-icon{color:var(--md-primary);transform:scale(1.15)}.sidebar-label{flex:1}.title{font-size:var(--md-font-label-large);font-weight:600;color:var(--md-on-surface);position:relative;z-index:10;line-height:1}.credit{font-size:var(--md-font-label-small);font-style:italic;color:var(--md-on-surface-variant);position:relative;z-index:10;line-height:1}.titlebar-left{display:flex;align-items:center;justify-content:flex-start;gap:var(--md-spacing-3);flex:0}.titlebar-info{display:flex;flex-direction:column;justify-content:center;gap:2px}.title-row{display:flex;align-items:baseline;gap:var(--md-spacing-1)}.titlebar-center{flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}.close-btn{position:relative;cursor:pointer;border:none;background:0 0;font-size:1.5rem;color:var(--md-on-surface-variant);transition:color var(--md-motion-duration-short2) var(--md-motion-easing-standard);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:var(--md-spacing-2)}.close-btn:hover{color:var(--md-primary)}.close-btn:active{color:var(--md-on-surface)}.content-container{flex:1;background:var(--md-surface);padding:var(--md-spacing-4);overflow-y:auto;overflow-x:hidden;animation:md-tabContentFadeIn var(--md-motion-duration-medium1) var(--md-motion-easing-standard)}.section{padding:var(--md-spacing-3) 0;display:flex;flex-direction:column;gap:var(--md-spacing-2)}.section:last-child{margin-bottom:0}.section-title{color:var(--md-on-surface);font-size:var(--md-font-headline-small);font-weight:600;margin:0 0 var(--md-spacing-2) 0;letter-spacing:.03125rem;display:flex;justify-content:space-between;align-items:center;gap:var(--md-spacing-2);position:relative;padding:var(--md-spacing-3) var(--md-spacing-4);background:var(--md-surface-container-low);border:1px solid var(--md-outline-variant);border-radius:var(--md-shape-corner-large);box-shadow:var(--md-elevation-1);cursor:pointer;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.section-title:hover{background:var(--md-surface-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.risky-label{color:var(--md-error);font-size:var(--md-font-label-small);font-weight:700;letter-spacing:.03125rem;animation:md-risky-glow var(--md-motion-duration-long2) ease-in-out infinite}@keyframes md-risky-glow{0%,100%{text-shadow:0 0 .125rem rgba(242,132,130,.4)}50%{text-shadow:0 0 .3rem rgba(242,132,130,.7)}}.section-title .checkbox-item{border:none;background:0 0;padding:4px 6px;margin:0}.section-title .checkbox-item:hover{background:var(--md-state-hover);border-radius:var(--md-shape-corner-small)}.section-title label{font-size:var(--md-font-label-small);color:var(--md-on-surface)!important}.section-title-container{flex-grow:1}.subsection-title{color:var(--md-on-surface-variant);font-size:var(--md-font-label-large);font-weight:600;margin:var(--md-spacing-5) 0 var(--md-spacing-1) var(--md-spacing-4);position:relative}.subsection-title::before{content:'';position:absolute;left:calc(var(--md-spacing-4) * -1 - var(--md-spacing-2));top:50%;height:1px;width:var(--md-spacing-2);background:var(--md-outline)}.group{display:flex;flex-direction:column;background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);gap:var(--md-spacing-2);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1);max-height:20rem;opacity:1;overflow:hidden;transition:max-height var(--md-motion-duration-medium2) var(--md-motion-easing-standard),opacity var(--md-motion-duration-medium2) var(--md-motion-easing-standard),padding var(--md-motion-duration-medium2) var(--md-motion-easing-standard),margin var(--md-motion-duration-medium2) var(--md-motion-easing-standard),background var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.group.hidden{max-height:0;opacity:0;padding:0 var(--md-spacing-4);margin-bottom:0}.group .section-title{margin-top:0;margin-bottom:var(--md-spacing-2);padding-bottom:var(--md-spacing-2);border-bottom:1px solid var(--md-outline-variant)}.subgroup{margin-left:0;padding-left:0;display:flex;flex-wrap:wrap;gap:var(--md-spacing-2)}.checkbox-item{border:1px solid var(--md-outline);display:inline-flex;align-items:center;padding:var(--md-spacing-1) var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);cursor:pointer;width:fit-content;background-color:transparent}.checkbox-item:hover{background:var(--md-state-hover);border-color:var(--md-primary)}.checkbox-item:active{background:var(--md-state-pressed)}.checkbox-item-label{color:var(--md-on-surface);font-size:var(--md-font-body-medium);margin-left:var(--md-spacing-2);cursor:pointer;pointer-events:none}.checkbox{appearance:none;width:1.25rem;height:1.25rem;border:2px solid var(--md-outline);border-radius:var(--md-shape-corner-small);background:0 0;box-shadow:var(--md-elevation-0);cursor:pointer;position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.checkbox::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}.checkbox:hover:not(.checkbox-checked)::before{opacity:1}.checkbox-checked{background:var(--md-primary);border-color:var(--md-primary);box-shadow:var(--md-elevation-1)}.checkbox-checked::before{content:'';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--md-on-primary);font-size:.8rem;font-weight:700;opacity:1;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.checkbox-checked:hover::before{opacity:1}.slider-container{display:flex;align-items:center;gap:var(--md-spacing-3)}.slider{appearance:none;width:100%;height:4px;border-radius:var(--md-shape-corner-full);outline:0;cursor:pointer;background:linear-gradient(to right,var(--md-primary),var(--md-primary)) no-repeat;background-size:var(--value,0) 100%;background-color:var(--md-outline-variant)}.slider::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:var(--md-primary);cursor:pointer;box-shadow:var(--md-elevation-2);border:2px solid var(--md-surface);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.slider::-webkit-slider-thumb:hover{box-shadow:var(--md-elevation-4);transform:scale(1.1)}.slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--md-primary);cursor:pointer;box-shadow:var(--md-elevation-2);border:2px solid var(--md-surface);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.slider::-moz-range-thumb:hover{box-shadow:var(--md-elevation-4);transform:scale(1.1)}.keybind-slot{min-width:2rem;height:1.5rem;padding:var(--md-spacing-1) var(--md-spacing-2);background:var(--md-surface-container-high);color:var(--md-on-surface);font-size:var(--md-font-label-medium);font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:var(--md-spacing-1);border-radius:var(--md-shape-corner-small);border:1px solid var(--md-outline);box-shadow:var(--md-elevation-1);position:relative;z-index:1;white-space:nowrap;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.keybind-pen-icon{width:.5rem;height:.5rem;color:var(--md-on-surface-variant)}.keybind-slot::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard);pointer-events:none;z-index:-1}.keybind-slot-editable{cursor:pointer}.keybind-slot-editable:hover{border-color:var(--md-primary);box-shadow:var(--md-elevation-2)}.keybind-slot-editable:hover::before{opacity:1}.keybind-slot-editable:active{box-shadow:var(--md-elevation-3);transform:scale(.98)}.keybind-slot-waiting{background:var(--md-primary-container);border-color:var(--md-primary);animation:md-keybind-waiting-pulse var(--md-motion-duration-long2) ease-in-out infinite}@keyframes md-keybind-waiting-pulse{0%,100%{box-shadow:var(--md-elevation-2),0 0 0 2px var(--md-primary)}50%{box-shadow:var(--md-elevation-3),0 0 0 4px rgba(var(--md-primary-rgb),.3)}}.keybind-slot-container{display:inline-flex;align-items:center;gap:var(--md-spacing-1)}.keybind-slot-separator{color:var(--md-on-surface-variant);font-size:var(--md-font-label-small);font-weight:600}.help-section{font-size:var(--md-font-body-medium)}.help-title{color:var(--md-on-surface);font-size:var(--md-font-headline-small);margin-bottom:var(--md-spacing-2);display:flex;align-items:center;gap:var(--md-spacing-2);font-weight:600}.help-panel{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.keybind-description{margin-left:var(--md-spacing-3);color:var(--md-on-surface);font-size:var(--md-font-body-medium)}.keybind-help-text{color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium);line-height:1.4;margin:0}.discord-panel{background:rgba(88,101,242,.1);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid rgba(88,101,242,.3);flex:1;display:flex;flex-direction:column;min-height:10rem}.website-panel{background:rgba(var(--md-primary-rgb),.1);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid rgba(var(--md-primary-rgb),.3);flex:1;display:flex;flex-direction:column;min-height:9.375rem}.discord-link{display:block;background:rgba(88,101,242,.2);color:var(--md-on-surface);text-decoration:none;padding:var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);font-size:var(--md-font-body-medium);text-align:center;font-weight:600;border:1px solid rgba(88,101,242,.5);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);margin-top:auto}.discord-link:hover{background:rgba(88,101,242,.3);border-color:rgba(88,101,242,.8)}.discord-link:active{background:rgba(88,101,242,.25);transform:scale(.98)}.website-link{display:block;background:rgba(var(--md-primary-rgb),.15);color:var(--md-on-surface);text-decoration:none;padding:var(--md-spacing-2);border-radius:var(--md-shape-corner-medium);font-size:var(--md-font-body-medium);text-align:center;font-weight:600;border:1px solid rgba(var(--md-primary-rgb),.3);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard);margin-top:auto}.website-link:hover{background:rgba(var(--md-primary-rgb),.25);border-color:var(--md-primary)}.website-link:active{background:rgba(var(--md-primary-rgb),.2);transform:scale(.98)}.credits-panel{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-3);margin-bottom:var(--md-spacing-3);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.credits-container{display:flex;flex-wrap:wrap;gap:var(--md-spacing-4);color:var(--md-on-surface-variant);font-size:var(--md-font-body-medium)}.credit-item{flex:1;min-width:7.5rem}.credit-name{font-weight:600;margin-bottom:var(--md-spacing-1);color:var(--md-on-surface)}.section-subtitle{color:var(--md-on-surface);font-size:var(--md-font-headline-small);margin-bottom:var(--md-spacing-2);font-weight:600}.features-container{display:flex;flex-wrap:wrap;gap:var(--md-spacing-2);margin-bottom:var(--md-spacing-2)}.feature-item{display:flex;align-items:center;border-radius:var(--md-shape-corner-medium)}.feature-name{color:var(--md-on-surface);font-size:var(--md-font-body-medium);margin-right:var(--md-spacing-1)}.community-container{display:flex;gap:var(--md-spacing-3);margin-bottom:var(--md-spacing-3)}.aimbot-dot{position:fixed;width:40px;height:40px;border-radius:0;background:0 0;border:2px solid var(--md-error);box-shadow:0 0 8px rgba(242,132,130,.5);transform:translate(-50%,-50%);pointer-events:none;display:none;z-index:2147483647}input[type=checkbox]{appearance:none;width:1.25rem;height:1.25rem;border:2px solid var(--md-outline);border-radius:var(--md-shape-corner-small);background:0 0;box-shadow:var(--md-elevation-0);cursor:pointer;position:relative;transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=checkbox]::before{content:'';position:absolute;inset:0;border-radius:var(--md-shape-corner-small);background:var(--md-state-hover);opacity:0;transition:opacity var(--md-motion-duration-short3) var(--md-motion-easing-standard)}input[type=checkbox]:checked:hover::before,input[type=checkbox]:hover:not(:checked)::before{opacity:1}input[type=checkbox]:checked{background:var(--md-primary);border-color:var(--md-primary);box-shadow:var(--md-elevation-1)}input[type=checkbox]:checked::before{content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--md-on-primary);font-size:.8rem;font-weight:700;opacity:1;transition:opacity var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]{appearance:none;width:100%;height:4px;border-radius:var(--md-shape-corner-full);outline:0;cursor:pointer;background:linear-gradient(to right,var(--md-primary),var(--md-primary)) no-repeat;background-size:var(--value,0) 100%;background-color:var(--md-outline-variant)}input[type=range]::-webkit-slider-thumb{appearance:none;width:20px;height:20px;background:var(--md-primary);border:2px solid var(--md-surface);border-radius:50%;cursor:pointer;box-shadow:var(--md-elevation-2);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]::-moz-range-thumb{width:20px;height:20px;background:var(--md-primary);border:2px solid var(--md-surface);border-radius:50%;cursor:pointer;box-shadow:var(--md-elevation-2);transition:all var(--md-motion-duration-short2) var(--md-motion-easing-standard)}input[type=range]::-moz-range-thumb:hover,input[type=range]::-webkit-slider-thumb:hover{background:radial-gradient(circle at 35% 35%,#a0f7a4,#7eeb82,#5fc563,#4a9a4d)}input[type=range]::-webkit-slider-thumb:active{transform:scale(.85)}input[type=range]::-moz-range-thumb:active{transform:scale(.85)}input[type=range].slider-dragging::-webkit-slider-thumb{transform:scale(.85)}input[type=range].slider-dragging::-moz-range-thumb{transform:scale(.85)}li::marker{color:silver}.themes-container{display:flex;flex-direction:column;gap:var(--md-spacing-4)}.theme-section{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.theme-section-title{font-size:var(--md-font-headline-small);font-weight:600;color:var(--md-on-surface);margin:0 0 var(--md-spacing-2) 0}.theme-description{font-size:var(--md-font-body-medium);color:var(--md-on-surface-variant);margin:0 0 var(--md-spacing-4) 0}.color-presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--md-spacing-3)}.color-preset{display:flex;align-items:center;gap:var(--md-spacing-2);padding:var(--md-spacing-3);background:var(--md-surface-container);border:2px solid var(--md-outline-variant);border-radius:var(--md-shape-corner-medium);cursor:pointer;transition:all var(--md-motion-duration-short3) var(--md-motion-easing-standard);font-size:var(--md-font-body-medium);color:var(--md-on-surface);font-weight:500}.color-preset:hover{background:var(--md-surface-container-high);border-color:var(--md-primary);box-shadow:var(--md-elevation-2);transform:translateY(-2px)}.color-preset.active{background:var(--md-primary-container);border-color:var(--md-primary);box-shadow:var(--md-elevation-3)}.preset-dot{width:20px;height:20px;border-radius:50%;background:var(--preset-color);box-shadow:0 0 8px var(--preset-color);flex-shrink:0;transition:transform var(--md-motion-duration-short2) var(--md-motion-easing-standard)}.color-preset:hover .preset-dot{transform:scale(1.2)}.color-preset.active .preset-dot{transform:scale(1.3);box-shadow:0 0 16px var(--preset-color)}.preset-name{white-space:nowrap;flex:1;text-align:left}.theme-info{background:var(--md-surface-container-low);border-radius:var(--md-shape-corner-large);padding:var(--md-spacing-4);border:1px solid var(--md-outline-variant);box-shadow:var(--md-elevation-1)}.theme-info h4{font-size:var(--md-font-headline-small);font-weight:600;color:var(--md-on-surface);margin:0 0 var(--md-spacing-2) 0}.theme-info p{font-size:var(--md-font-body-medium);color:var(--md-on-surface-variant);line-height:1.5;margin:0}".replace(/GothamPro/g, cr), 
Fe.appendChild(e), Fe;
})();
(() => {
const e = document.getElementById("ui");
if (!e) {
return;
}
const r = e.style;
Object.entries(qa).forEach(([e, t]) => {
r.setProperty("--md-" + Ne(e), t);
}), Object.entries(Qa).forEach(([e, t]) => {
r.setProperty("--md-elevation-" + e.replace("level", ""), t);
}), Object.entries(Xa).forEach(([e, t]) => {
r.setProperty("--md-state-" + e, t);
}), Object.entries(eo).forEach(([e, t]) => {
r.setProperty("--md-motion-duration-" + e, t);
}), Object.entries(ro).forEach(([e, t]) => {
r.setProperty("--md-motion-easing-" + Ne(e), t);
}), Object.entries(to).forEach(([e, t]) => {
r.setProperty("--md-shape-corner-" + Ne(e), t);
}), Object.entries(no).forEach(([e, t]) => {
r.setProperty("--md-font-" + Ne(e), t);
}), Object.entries(ao).forEach(([e, t]) => {
r.setProperty("--md-spacing-" + e, t);
});
})(), (e => {
const r = localStorage.getItem("surminus-theme") || "green", t = fo.find(e => e.id === r);
if (!t) {
return;
}
const {r: n, g: a, b: o} = (e => {
const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
return r ? {
r: parseInt(r[1], 16),
g: parseInt(r[2], 16),
b: parseInt(r[3], 16)
} : {
r: 110,
g: 219,
b: 114
};
})(t.primary), i = document.createElement("style");
if (i.id = "surminus-theme-startup", i.textContent = `\n    :root {\n      --md-primary: ${t.primary} !important;\n      --md-primary-container: ${t.primaryContainer} !important;\n      --md-state-hover: ${t.stateHover} !important;\n      --md-state-focus: ${t.stateFocus} !important;\n      --md-state-pressed: ${t.stateFocus} !important;\n      --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n      --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n      --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    \n    #ui {\n      --md-primary: ${t.primary} !important;\n      --md-primary-container: ${t.primaryContainer} !important;\n      --md-state-hover: ${t.stateHover} !important;\n      --md-state-focus: ${t.stateFocus} !important;\n      --md-state-pressed: ${t.stateFocus} !important;\n      --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n      --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n      --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    \n    #ui ::-webkit-scrollbar-thumb {\n      background: rgba(${n}, ${a}, ${o}, 0.5) !important;\n    }\n    #ui ::-webkit-scrollbar-thumb:hover {\n      background: rgba(${n}, ${a}, ${o}, 0.8) !important;\n    }\n    #ui * {\n      scrollbar-color: rgba(${n}, ${a}, ${o}, 0.5) rgba(255, 255, 255, 0.03) !important;\n    }\n  `, 
document.head ? document.head.insertBefore(i, document.head.firstChild) : document.addEventListener("DOMContentLoaded", () => {
document.head && document.head.insertBefore(i, document.head.firstChild);
}), e) {
try {
let r = e.querySelector("style#surminus-shadow-theme");
r && r.remove();
const i = document.createElement("style");
i.id = "surminus-shadow-theme", i.textContent = `\n        * {\n          --md-primary: ${t.primary} !important;\n          --md-primary-container: ${t.primaryContainer} !important;\n          --md-state-hover: ${t.stateHover} !important;\n          --md-state-focus: ${t.stateFocus} !important;\n          --md-state-pressed: ${t.stateFocus} !important;\n          --md-state-dragged: rgba(${n}, ${a}, ${o}, 0.16) !important;\n          --md-scrollbar-thumb: rgba(${n}, ${a}, ${o}, 0.5) !important;\n          --md-scrollbar-thumb-hover: rgba(${n}, ${a}, ${o}, 0.8) !important;\n        }\n      `, 
e.insertBefore(i, e.firstChild);
} catch (e) {}
}
})(t);
const n = (e => {
const r = document.createElement("div");
return e.appendChild(r), oo = fa.createRoot(r), r;
})(t);
(e => {
const r = document.createElement("div");
e.appendChild(r), io = fa.createRoot(r);
})(t), (e => {
Reflect.apply(lr, $e, [ "keydown", r => {
if (r.code === De.en.tn) {
const r = e.querySelector("#ui");
if (!r) {
return;
}
return r.style.display = "none" === r.style.display ? "" : "none", void (lo = e => {
r && (r.style.display = e ? "" : "none");
});
}
r.code !== De.en.rn ? r.code !== De.en.nn ? r.code !== De.en.an ? r.code !== De.en.ln ? r.code !== De.en.sn ? r.code !== De.en.dn ? r.code !== De.en.un ? r.code !== De.en.mn ? r.code !== De.en.bn ? r.code !== De.en.gn ? r.code !== De.en.hn ? r.code !== De.en.fn ? r.code !== De.en.pn ? r.code !== De.en.ta || mo(e => e.ra.Te, (e, r) => e.ra.Te = r) : mo(e => e.Ur.Te, (e, r) => e.Ur.Te = r) : mo(e => e.xt.Te, (e, r) => e.xt.Te = r) : mo(e => e.ct.Te, (e, r) => e.ct.Te = r) : mo(e => e.Vr.Te, (e, r) => e.Vr.Te = r) : mo(e => e.Wr.Te, (e, r) => e.Wr.Te = r) : mo(e => e.Jr.Te, (e, r) => e.Jr.Te = r) : mo(e => e.Zr.Te, (e, r) => e.Zr.Te = r) : mo(e => e.ut.Te, (e, r) => e.ut.Te = r) : mo(e => e.Re.Te, (e, r) => e.Re.Te = r) : mo(e => e.Ue.Te, (e, r) => e.Ue.Te = r) : mo(e => e.Et.Te, (e, r) => e.Et.Te = r) : mo(e => e.Hr.Te, (e, r) => e.Hr.Te = r) : mo(e => e.kt.Te, (e, r) => e.kt.Te = r);
} ]);
})(n), (e => {
lo = r => {
const t = e.querySelector("#ui");
t && (t.style.display = r ? "" : "none");
};
})(n), (() => {
const t = JSON.parse;
setTimeout(() => {
try {
const n = r();
if (null != n) {
const r = e(n), a = t(r);
De._deserialize(a);
}
} catch {} finally {
Ue(), co = !0, ho(), uo(), io && co && !0 !== De.vn.yn && io.render(Te(Ua, {
Zn: De,
Un: ze
}));
}
}, 1e3);
})(), ho();
try {
(async () => {
try {
await Promise.all([ Ya("enable"), Ya("disable") ]);
} catch (e) {}
})().catch(() => {});
} catch (e) {}
})();
"loading" === je.readyState ? Reflect.apply(lr, je, [ "DOMContentLoaded", t ]) : t();
})(), Reflect.apply(lr, $e, [ "keydown", gr ]), Reflect.apply(lr, $e, [ "keyup", pr ]), 
Reflect.apply(lr, $e, [ "wheel", br, fr ]), Ft(), Reflect.apply(lr, $e, [ "mousedown", Ot ]), 
Reflect.apply(lr, $e, [ "mouseup", Pt ]), (() => {
if (rn) {
return;
}
rn = !0;
const e = setInterval(() => {
Ee?.pixi?._ticker && (clearInterval(e), Ee.pixi._ticker.add(A));
}, 500);
})(), (() => {
const e = () => {
try {
if (!je) {
return;
}
const e = je.getElementById(dn);
if (De.Kr && De.Kr.Te) {
if (!e) {
const e = je.createElement("style");
e.id = dn, e.type = "text/css", e.innerHTML = '\n#start-overlay{\n  backdrop-filter:blur(5.21px) brightness(0.6);\n}\n#btn-game-quit {\n  background-image: url("../img/gui/quit.svg") !important;\n  background-repeat: no-repeat !important;\n  background-size: contain !important;\n}\n#news-block {\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n#start-bottom-right {\n  opacity: 0 !important;\n  transition: 0.3s !important;\n}\n#start-bottom-right:hover {\n  opacity: 1 !important;\n}\n#btn-help, .account-details-top-buttons .account-leaderboard-link span, .account-details-top-buttons .account-details-button .account-link, .account-block .account-details-top .account-details-top-buttons, #ad-block-left, #social-share-block, #start-bottom-middle .footer-after, #start-bottom-middle, .publift-widget-sticky_footer-container .publift-widget-sticky_footer-container-background, .publift-widget-sticky_footer-container .publift-widget-sticky_footer, .ad-block-header div iframe, .ad-block-header .fuse-slot div {\n  pointer-events: none !important;\n  opacity: 0 !important;\n}\n#start-row-header{\n  background-image:url("https://i.postimg.cc/7Zc6VXvN/logo.png");\n  top: -100px;\n  opacity: 1 !important;\n}\n.GoogleCreativeContainerClass {\n  display: none !important;\n}\n\n/* Google Ads Blocker CSS */\n[id^="gcc_"] {\n  display: none !important;\n  visibility: hidden !important;\n}\n\niframe[src*="doubleclick"],\niframe[src*="2mdn"],\niframe[src*="googleads"],\niframe[src*="googlesyndication"],\niframe[src*="adservice"] {\n  display: none !important;\n  visibility: hidden !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.adsbygoogle,\n.ad-container,\n[class*="ad-"],\n[id*="ad-"],\n.ads,\n#ads {\n  display: none !important;\n  visibility: hidden !important;\n}\n\n\n.surt-stat {\n  display: block;\n  margin-bottom: 6px;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1;\n  border-radius: 12px;\n  color: #ffffff;\n  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);\n  border: 1px solid rgba(255,255,255,0.18);\n  box-shadow: \n    0 8px 24px rgba(0,0,0,0.5),\n    inset 0 1px 0 rgba(255,255,255,0.15);\n  backdrop-filter: blur(12px) saturate(180%) brightness(1.1);\n  -webkit-backdrop-filter: blur(12px) saturate(180%) brightness(1.1);\n  text-shadow: 0 2px 4px rgba(0,0,0,0.4);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translateZ(0);\n  overflow: hidden;\n  position: relative;\n}\n\n/* Glass edge highlight */\n.surt-stat::before {\n  content: \'\';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: linear-gradient(90deg, \n    transparent, \n    rgba(255,255,255,0.3), \n    transparent);\n  z-index: 1;\n}\n\n.surt-stat:hover {\n  transform: translateY(-1px);\n  box-shadow: \n    0 12px 28px rgba(0,0,0,0.6),\n    inset 0 1px 0 rgba(255,255,255,0.2);\n}\n\n.surt-stat.surt-fps, .surt-stat.surt-ping {\n  position: relative;\n  left: 5px;\n  top: -5px;\n  font-size: 16px;\n  font-weight: 600;\n  padding: 10px 14px;\n  border-radius: 14px;\n}\n\n.surt-stat.surt-health, .surt-stat.surt-adr {\n  position: fixed;\n  top: 12px;\n  z-index: 9999;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 10px 16px;\n  border-radius: 16px;\n  min-width: 100px;\n  text-align: center;\n  letter-spacing: 0.5px;\n}\n\n.surt-stat.surt-health { \n  right: 15px; \n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,107,107,0.08) 100%);\n}\n\n.surt-stat.surt-adr { \n  left: 15px; \n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(124,252,0,0.08) 100%);\n}\n\n/* Enhanced Glow & pulse effects */\n.surt-low {\n  color: #FFB8B8 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,107,107,0.15) 100%) !important;\n  border-color: rgba(255,107,107,0.35) !important;\n  text-shadow: 0 1px 3px rgba(255,107,107,0.3);\n}\n\n.surt-warn {\n  color: #FFE8A3 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(255,209,102,0.15) 100%) !important;\n  border-color: rgba(255,209,102,0.35) !important;\n  text-shadow: 0 1px 3px rgba(255,209,102,0.3);\n}\n\n.surt-good {\n  color: #58fc00 !important;\n  background: linear-gradient(135deg, \n    rgba(255,255,255,0.1) 0%, \n    rgba(124,252,0,0.15) 100%) !important;\n  border-color: rgba(124,252,0,0.35) !important;\n  text-shadow: 0 1px 3px rgba(124,252,0,0.3);\n}\n\n/* Add subtle background noise for more glass texture */\n.surt-stat::after {\n  content: \'\';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: \n    radial-gradient(\n      circle at 30% 30%,\n      rgba(255,255,255,0.05) 0%,\n      transparent 50%\n    ),\n    radial-gradient(\n      circle at 70% 70%,\n      rgba(255,255,255,0.03) 0%,\n      transparent 50%\n    );\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: -1;\n}\n\n/* Optional: Add a subtle shine effect on hover */\n.surt-stat:hover::after {\n  animation: surt-shine 0.8s ease-out;\n}\n\n@keyframes surt-shine {\n  0% {\n    background-position: -100px;\n  }\n  100% {\n    background-position: 200px;\n  }\n}\n\n/* Responsive adjustments */\n@media (max-width: 850px) {\n  .surt-stat.surt-health, .surt-stat.surt-adr {\n    padding: 8px 12px;\n    font-size: 14px;\n    min-width: 80px;\n  }\n}\n\n@media (min-width: 851px) {\n  #start-row-header {\n    height: 140px;\n    margin-bottom: 0px;\n  }\n}\n', 
je.head.appendChild(e);
}
(() => {
if (!un) {
try {
if (!je || !je.body) {
return;
}
mn(), un = new MutationObserver(() => {
mn();
}), un.observe(je.body, {
childList: !0,
subtree: !0,
attributes: !0,
attributeFilter: [ "src", "href", "id", "class" ]
});
} catch {}
}
})();
} else {
e && e.remove(), fn();
}
} catch {}
};
e(), setInterval(e, 500);
let r = !1, t = null, n = null, a = null, o = null, i = 0, l = null, s = [], c = [];
const d = () => {
De.Kr && De.Kr.Te ? (() => {
if (!r) {
try {
try {
const e = je.querySelector("#ui-health-container");
if (e) {
let r = 0;
t = je.createElement("span"), t.style.cssText = "display:block;position:fixed;z-index: 2;margin:6px 0 0 0;right: 15px;mix-blend-mode: difference;font-weight: bold;font-size:large;", 
e.appendChild(t), n = je.createElement("span"), n.style.cssText = "display:block;position:fixed;z-index: 2;margin:6px 0 0 0;left: 15px;mix-blend-mode: difference;font-weight: bold;font-size: large;", 
e.appendChild(n), a = je.createElement("span"), a.style.cssText = "display:block;position:fixed;z-index:2;left:0px;top:-20px;color:white;background-color:rgba(0, 0, 0, 0.2);padding:5px 10px;border-radius:5px;font-family:Arial, sans-serif;font-size:18px;pointer-events:none;", 
e.appendChild(a), o = setInterval(() => {
try {
const e = je.getElementById("ui-health-actual").style.width.slice(0, -1);
e !== r && (r = e, t.innerHTML = Number.parseFloat(e).toFixed(1));
const o = parseFloat(je.getElementById("ui-boost-counter-0").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, s = parseFloat(je.getElementById("ui-boost-counter-1").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, c = parseFloat(je.getElementById("ui-boost-counter-2").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100, d = parseFloat(je.getElementById("ui-boost-counter-3").querySelector(".ui-bar-inner").style.width.slice(0, -1)) / 100;
n.innerHTML = Math.round(25 * o + 25 * s + 37.5 * c + 12.5 * d);
const u = (() => {
try {
const e = je.querySelector(".ui-player-kills.js-ui-player-kills");
return Number.parseInt(e?.textContent || "0", 10) || 0;
} catch {
return 0;
}
})();
a.innerHTML = "kills: " + u, u > i && (i = u, (async () => {
try {
l || (l = new Audio("https://raw.githubusercontent.com/surminusclient1/bac/main/bonk.wav"), 
l.volume = .5), l.currentTime = 0, await l.play();
} catch (e) {}
})());
} catch {}
}, 1e3);
}
} catch {}
try {
Array.from(je.getElementsByClassName("ui-armor-level")).forEach(e => {
const r = new MutationObserver(() => {
try {
const r = e.textContent?.trim();
let t = "#000000";
switch (r) {
case "Lvl. 0":
case "Lvl. 1":
t = "#FFFFFF";
break;

case "Lvl. 2":
t = "#808080";
break;

case "Lvl. 3":
t = "#0C0C0C";
break;

case "Lvl. 4":
t = "#FFF00F";
break;

default:
t = "#000000";
}
e.parentNode.style.border = "solid " + t;
} catch {}
});
r.observe(e, {
characterData: !0,
subtree: !0,
childList: !0
}), s.push(r);
});
} catch {}
try {
(() => {
try {
if (!je) {
return;
}
Array.from(je.getElementsByClassName("ui-weapon-switch")).forEach(e => {
e.style.border = "ui-weapon-id-4" === e.id ? "3px solid #2f4032" : "3px solid #FFFFFF";
}), Array.from(je.getElementsByClassName("ui-weapon-name")).forEach(e => {
const r = e.closest(".ui-weapon-switch");
if (!r) {
return;
}
const t = new MutationObserver(() => {
try {
const t = (e.textContent || "").trim();
let n = "#FFFFFF";
switch (t.toUpperCase()) {
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
"ui-weapon-id-4" !== r.id && (r.style.border = "3px solid " + n);
} catch {}
});
t.observe(e, {
childList: !0,
characterData: !0,
subtree: !0
}), c.push(t);
});
} catch {}
})();
} catch {}
r = !0;
} catch {}
}
})() : (() => {
try {
t && t.parentNode && t.remove(), n && n.parentNode && n.remove(), a && a.parentNode && a.remove(), 
o && clearInterval(o), i = 0, l = null, c.forEach(e => e.disconnect()), c.length = 0;
try {
Array.from(je.getElementsByClassName("ui-weapon-switch")).forEach(e => {
e && e.style && (e.style.border = "");
});
} catch {}
s.forEach(e => e.disconnect()), s.length = 0, fn(), r = !1;
} catch {}
})();
};
d(), setInterval(() => {
d();
}, 1e3);
})(), n($e.Array.prototype, "sort", {
apply(e, r, t) {
try {
De.Wr.Te && r.some(e => null != e?.obj?.ori) && r.forEach(e => {
(e => {
De.Wr.Gr && e.obj.type.includes("tree") && e.shapes.forEach(e => {
e.scale = 1.8;
});
})(e);
const r = hn[e.obj.type], t = gn[e.obj.type];
r && t && e.shapes.forEach(n => {
n.color = r, n.scale = t, e.zIdx = 999;
});
});
} catch {}
return Reflect.apply(e, r, t);
}
}), De.ct || (De.ct = {
Te: !1,
Ft: !0,
dt: !0,
$t: 7.6
}), Reflect.apply(lr, $e, [ "mouseup", () => {
Et && (Et = !1);
} ]), setInterval(x, 16), "undefined" != typeof globalThis && (globalThis.__PANHERO_MODULE__ = {
updatePanHero: k,
getPanHeroTarget: w
}), t = yo, n($e.Function.prototype, "call", {
apply(e, r, n) {
try {
null != n[0]?.nameInput && null != n[0]?.game && ($e.Function.prototype.call = e, 
Ee = n[0], t());
} catch {}
return Reflect.apply(e, r, n);
}
});
})();
})();