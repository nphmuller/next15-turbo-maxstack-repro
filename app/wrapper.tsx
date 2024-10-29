"use client";

const Component = () => <div>Stub component</div>;

// This line runs fine without turbopack and causes an infinite loop with turbopack
const _cloned = deepClone(<Component />);

// If we don't render anything and just import for the side effect, the error doesn't happen
// For the error to happen we need to import this wrapper and render it somewhere
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// ----- the code below is taken from the MUI source and it's how they implemented deepClone -----
// see: https://github.com/mui/material-ui/blob/2359c0badfb5a8d746ccc83c1d082c4ad70a542b/packages/mui-utils/src/deepmerge/deepmerge.ts

function deepClone<T>(source: T): T {
  if (!isPlainObject(source)) {
    return source;
  }

  const output: Record<any, any> = {};

  Object.keys(source).forEach((key) => {
    if (key === "_owner") {
      // !!!!! Here's the difference between webpack and turbopack !!!!!
      // !!!!! In webpack the value of _owner is null !!!!!
      // !!!!! In turbopack the value of _owner is not null !!!!
      console.log("key " + key + " is null " + (source[key] === null));
      console.log(source[key]);
    }
    output[key] = deepClone(source[key]);
  });

  return output;
}

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
function isPlainObject(item: unknown): item is Record<keyof any, unknown> {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(item);

  const res =
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in item) &&
    !(Symbol.iterator in item);

  return res;
}
