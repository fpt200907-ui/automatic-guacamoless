import { outer, outerDocument } from '@/core/outer.js';

// Symbols for hidden tracking
const Symbol_spoofed = Symbol('__spoofed__');
const Symbol_original = Symbol('__original__');
const Symbol_depth = Symbol('__depth__');

// Multiple layers of spoof tracking
const spoof1 = new WeakMap();
const spoof2 = new WeakMap();
const spoof3 = new WeakMap();
const hookedSet = new WeakSet();
const hookMetadata = new WeakMap();

// Object wrapper for compatibility
export const object = {};
for (const prop of Object.getOwnPropertyNames(Object)) {
  object[prop] = Object[prop];
}

// Reflect wrapper for compatibility
export const reflect = {};
for (const prop of Object.getOwnPropertyNames(Reflect)) {
  reflect[prop] = Reflect[prop];
}

export const spoof = spoof1;

export function hook(object, name, handler) {
  try {
    const original = object[name];
    if (!original || hookedSet.has(original)) return;
    
    // Create layered proxy
    let hooked = new Proxy(original, handler);
    
    // Add multiple layers of spoofing
    spoof1.set(hooked, original);
    spoof2.set(hooked, original);
    spoof3.set(hooked, original);
    hookedSet.add(hooked);
    
    // Store metadata
    hookMetadata.set(hooked, {
      target: object,
      name: name,
      handler: handler,
      timestamp: Date.now(),
      layer: 1,
    });
    
    // Add hidden properties
    try {
      Object.defineProperty(hooked, Symbol_spoofed, { value: true, enumerable: false });
      Object.defineProperty(hooked, Symbol_original, { value: original, enumerable: false });
      Object.defineProperty(hooked, Symbol_depth, { value: 0, writable: true, enumerable: false });
    } catch (e) {}
    
    Object.defineProperty(object, name, {
      value: hooked,
      writable: true,
      enumerable: false,
      configurable: true,
    });
  } catch (e) {
    try { console.error(`Failed to hook ${name}:`, e); } catch {}
  }
}

export function getnative(func) {
  let current = func;
  const seen = new WeakSet();
  let depth = 0;
  const maxDepth = 15;
  
  while ((spoof1.has(current) || spoof2.has(current) || spoof3.has(current)) && depth < maxDepth) {
    if (seen.has(current)) break;
    seen.add(current);
    current = spoof1.get(current) || spoof2.get(current) || spoof3.get(current) || current;
    depth++;
  }
  return current;
}

export function ishooked(func) {
  return hookedSet.has(func) || spoof1.has(func) || spoof2.has(func) || spoof3.has(func);
}

export function restore(object, name) {
  try {
    const native = getnative(object[name]);
    Object.defineProperty(object, name, {
      value: native,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    hookedSet.delete(object[name]);
  } catch (e) {
    try { console.error(`Failed to restore ${name}:`, e); } catch {}
  }
}

// Anti-detection: Dynamic proxy wrapper
const createAntiDetectionProxy = (func) => {
  return new Proxy(func, {
    get(target, prop, receiver) {
      if (prop === Symbol.toStringTag) return undefined;
      if (prop === 'constructor') return undefined;
      return Reflect.get(target, prop, receiver);
    },
    has(target, prop) {
      if (prop === Symbol.toStringTag) return false;
      return Reflect.has(target, prop);
    },
    ownKeys(target) {
      const keys = Reflect.ownKeys(target);
      return keys.filter(k => k !== Symbol.toStringTag);
    },
    getOwnPropertyDescriptor(target, prop) {
      if (prop === Symbol.toStringTag) return undefined;
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
  });
};

hook(outer.Function.prototype, 'toString', {
  apply(f, th, args) {
    try {
      const native = getnative(th);
      return Reflect.apply(f, native || th, args);
    } catch (e) {
      return Reflect.apply(f, th, args);
    }
  },
});

hook(outer.Element.prototype, 'attachShadow', {
  apply(f, th, args) {
    try {
      return Reflect.apply(f, th, args);
    } catch (e) {
      return Reflect.apply(f, th, args);
    }
  },
});

hook(outer, 'Proxy', {
  construct(f, args) {
    try {
      return Reflect.construct(f, args);
    } catch (e) {
      return Reflect.construct(f, args);
    }
  },
});

// Anti-detection: Protect addEventListener/removeEventListener with anti-detection
const originalAddEventListener = EventTarget.prototype.addEventListener;
const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

export const ref_addEventListener = createAntiDetectionProxy(originalAddEventListener);
export const ref_removeEventListener = createAntiDetectionProxy(originalRemoveEventListener);

export const proxy = Proxy;

export let mahdiFunctionConstructor = (...args) => {
  try {
    const gen = function* () { }.prototype.constructor.constructor(...args)();
    return gen.next.bind(gen);
  } catch (e) {
    try { console.error('Error in mahdiFunctionConstructor:', e); } catch {}
    return null;
  }
};

export const FONT_NAME = Array.from(
  { length: 12 },
  () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 52)]
).join('');

const fonts = outerDocument.fonts;

const isOurFont = (font) => {
  try {
    return font && typeof font === 'object' && font.family === FONT_NAME;
  } catch {
    return false;
  }
};

const sizeDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(fonts), 'size');
if (sizeDescriptor && sizeDescriptor.get) {
  const originalSizeGetter = sizeDescriptor.get;
  sizeDescriptor.get = new Proxy(originalSizeGetter, {
    apply(f, th, args) {
      try {
        const actualSize = Reflect.apply(f, th, args);
        return Math.max(0, actualSize - 5);
      } catch {
        return 0;
      }
    },
  });
  Object.defineProperty(Object.getPrototypeOf(fonts), 'size', sizeDescriptor);
}

hook(fonts, 'values', {
  apply(f, th, args) {
    const originalIterator = Reflect.apply(f, th, args);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let result = originalIterator.next();
        while (!result.done && isOurFont(result.value)) {
          result = originalIterator.next();
        }
        return result;
      },
    };
  },
});

hook(fonts, 'entries', {
  apply(f, th, args) {
    const originalIterator = Reflect.apply(f, th, args);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let result = originalIterator.next();
        while (!result.done && isOurFont(result.value[0])) {
          result = originalIterator.next();
        }
        return result;
      },
    };
  },
});

hook(fonts, 'keys', {
  apply(f, th, args) {
    const originalIterator = Reflect.apply(f, th, args);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let result = originalIterator.next();
        while (!result.done && isOurFont(result.value)) {
          result = originalIterator.next();
        }
        return result;
      },
    };
  },
});

hook(fonts, 'forEach', {
  apply(f, th, args) {
    const [callback, context] = args;
    const wrappedCallback = function (value, key, set) {
      if (!isOurFont(value)) {
        callback.call(context, value, key, set);
      }
    };
    return Reflect.apply(f, th, [wrappedCallback, context]);
  },
});

hook(fonts, 'has', {
  apply(f, th, args) {
    const [font] = args;
    if (isOurFont(font)) return false;
    return Reflect.apply(f, th, args);
  },
});

hook(fonts, 'delete', {
  apply(f, th, args) {
    const [font] = args;
    if (isOurFont(font)) return false;
    return Reflect.apply(f, th, args);
  },
});

hook(fonts, 'check', {
  apply(f, th, args) {
    const [font, text] = args;
    if (font && font.includes(FONT_NAME)) return false;
    return Reflect.apply(f, th, args);
  },
});

hook(fonts, Symbol.iterator, {
  apply(f, th, args) {
    const originalIterator = Reflect.apply(f, th, args);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let result = originalIterator.next();
        while (!result.done && isOurFont(result.value)) {
          result = originalIterator.next();
        }
        return result;
      },
    };
  },
});
