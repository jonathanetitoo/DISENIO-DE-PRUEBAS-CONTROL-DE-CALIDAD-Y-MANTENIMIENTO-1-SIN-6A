function createSpy(obj, methodName, fakeImpl) {
  if (!obj) throw new Error("El objeto es obligatorio");
  if (typeof obj[methodName] !== "function") {
    throw new Error(`El método ${methodName} debe existir y ser una función`);
  }

  const original = obj[methodName];
  const calls = [];

  obj[methodName] = function (...args) {
    calls.push({ args });
    if (fakeImpl) return fakeImpl.apply(this, args);
    return original.apply(this, args);
  };

  return {
    calls,
    count: () => calls.length,
    lastCall: () => (calls.length ? calls[calls.length - 1] : null),
    restore: () => {
      obj[methodName] = original;
    },
  };
}

module.exports = { createSpy };
