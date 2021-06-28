// prettier-ignore
const withCatch =	(fn) => (...args) => fn(...args).catch(args[2]);

export default withCatch;
