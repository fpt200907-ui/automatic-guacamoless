export const v2 = {
  create_: (x, y) => ({ x, y }),
  copy_: (v) => ({ x: v.x, y: v.y }),
  add_: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),
  sub_: (a, b) => ({ x: a.x - b.x, y: a.y - b.y }),
  mul_: (v, s) => ({ x: v.x * s, y: v.y * s }),
  dot_: (a, b) => a.x * b.x + a.y * b.y,
  length_: (v) => Math.hypot(v.x, v.y),
  lengthSqr_: (v) => v.x * v.x + v.y * v.y,
  dist_: (a, b) => Math.hypot(a.x - b.x, a.y - b.y),
  distSqr_: (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2,
  normalize_: (v, eps = 1e-6) => {
    const len = Math.hypot(v.x, v.y);
    return len > eps ? { x: v.x / len, y: v.y / len } : { x: 0, y: 0 };
  },
  perp_: (v) => ({ x: -v.y, y: v.x }),
  rotate_: (v, angle) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
  },
  lerp_: (a, b, t) => ({ x: a.x * (1 - t) + b.x * t, y: a.y * (1 - t) + b.y * t }),
  clamp01_: (value) => Math.max(0, Math.min(1, value)),
  easeOutCubic_: (t) => 1 - (1 - t) ** 3,
};

export const collisionHelpers = {
  intersectSegmentAABB_: (a, b, min, max) => {
    // Robust slab method that handles parallel segments safely
    const dir = v2.sub_(b, a);
    let tmin = 0;
    let tmax = 1;

    // X slab
    if (Math.abs(dir.x) < 1e-9) {
      // Parallel to X; if outside slab -> no intersection
      if (a.x < min.x || a.x > max.x) return null;
    } else {
      const inv = 1 / dir.x;
      let t1 = (min.x - a.x) * inv;
      let t2 = (max.x - a.x) * inv;
      if (t1 > t2) {
        const tmp = t1; t1 = t2; t2 = tmp;
      }
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }

    // Y slab
    if (Math.abs(dir.y) < 1e-9) {
      if (a.y < min.y || a.y > max.y) return null;
    } else {
      const inv = 1 / dir.y;
      let t1 = (min.y - a.y) * inv;
      let t2 = (max.y - a.y) * inv;
      if (t1 > t2) {
        const tmp = t1; t1 = t2; t2 = tmp;
      }
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }

    // Choose intersection t in [0,1]
    const t = tmin >= 0 && tmin <= 1 ? tmin : (tmax >= 0 && tmax <= 1 ? tmax : null);
    if (t === null) return null;

    const point = v2.add_(a, v2.mul_(dir, t));

    // Determine normal by checking which face is closest (with epsilon)
    const eps = 1e-6;
    if (Math.abs(point.x - min.x) < eps) return { point, normal: { x: -1, y: 0 } };
    if (Math.abs(point.x - max.x) < eps) return { point, normal: { x: 1, y: 0 } };
    if (Math.abs(point.y - min.y) < eps) return { point, normal: { x: 0, y: -1 } };
    if (Math.abs(point.y - max.y) < eps) return { point, normal: { x: 0, y: 1 } };

    // Fallback normal by comparing distances
    const center = v2.mul_(v2.add_(min, max), 0.5);
    const localPt = v2.sub_(point, center);
    const extent = v2.mul_(v2.sub_(max, min), 0.5);
    const dx = Math.abs(Math.abs(localPt.x) - extent.x);
    const dy = Math.abs(Math.abs(localPt.y) - extent.y);
    if (dx < dy) return { point, normal: { x: localPt.x > 0 ? 1 : -1, y: 0 } };
    return { point, normal: { x: 0, y: localPt.y > 0 ? 1 : -1 } };
  },

  intersectSegmentCircle_: (a, b, pos, rad) => {
    const d = v2.sub_(b, a);
    const f = v2.sub_(a, pos);

    const aa = v2.dot_(d, d);
    // Degenerate segment (a ~= b)
    if (aa < 1e-12) {
      const distSq = v2.lengthSqr_(v2.sub_(a, pos));
      if (distSq <= rad * rad) {
        const normal = v2.normalize_(v2.sub_(a, pos));
        return { point: a, normal };
      }
      return null;
    }

    const bb = 2 * v2.dot_(f, d);
    const c = v2.dot_(f, f) - rad * rad;

    let discriminant = bb * bb - 4 * aa * c;
    if (discriminant < 0) return null;

    discriminant = Math.sqrt(discriminant);
    const t1 = (-bb - discriminant) / (2 * aa);
    const t2 = (-bb + discriminant) / (2 * aa);

    // Pick the smallest non-negative t in [0,1]
    let t = null;
    if (t1 >= 0 && t1 <= 1) t = t1;
    else if (t2 >= 0 && t2 <= 1) t = t2;

    if (t === null) return null;

    const point = v2.add_(a, v2.mul_(d, t));
    const normal = v2.normalize_(v2.sub_(point, pos));

    return { point, normal };
  },

  intersectSegment_: (collider, a, b) => {
    if (!collider) return null;

    if (collider.type === 1) {
      return collisionHelpers.intersectSegmentAABB_(a, b, collider.min, collider.max);
    } else if (collider.type === 0) {
      return collisionHelpers.intersectSegmentCircle_(a, b, collider.pos, collider.rad);
    }

    return null;
  },
};

export const sameLayer = (a, b) => {
  return (a & 0x1) === (b & 0x1) || (a & 0x2 && b & 0x2);
};

// Utility clamp helper
export const clamp = (val, a, b) => Math.max(a, Math.min(b, val));
