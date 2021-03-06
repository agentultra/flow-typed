import { describe, it } from 'flow-typed-test';
import mozlog from 'mozlog';

describe('mozlog function returns a proper logger', () => {
  it('checks arguments of the mozlog factory', () => {
    mozlog({
      app: 'app-name',
      level: 'verbose', //default is INFO
      fmt: 'pretty', //default is 'heka'
      uncaught: 'exit', // default is 'log', also available as 'ignore'
      debug: true, //default is false
      stream: process.stderr //default is process.stdout
    });
    mozlog('app-name');
    mozlog({
      app: 'app-name',
    });
    mozlog({
      app: 'app-name',
      stream: process.stdout,
    });

    // $ExpectError
    mozlog();
    // $ExpectError
    mozlog('app-name', 'stream');
    // $ExpectError
    mozlog(5);
    // $ExpectError
    mozlog({})
    // $ExpectError
    mozlog({
      app: 'app-name',
      foo: 'bar'
    });
    // $ExpectError
    mozlog({
      app: 'app-name',
      fmt: 'foo',
    });
    // $ExpectError
    mozlog({
      app: 'app-name',
      level: 'foo',
    });
    // $ExpectError
    mozlog({
      app: 'app-name',
      uncaught: 'foo',
    });
    // $ExpectError
    mozlog({
      app: 'app-name',
      stream: 'foo',
    });
    // $ExpectError
    mozlog({
      app: 'app-name',
      stream: process.stdin,
    });
  });

  it('exposes log methods', () => {
    const logCreator = mozlog('app-name');
    const logger = logCreator('module-name');

    logger.trace('message');
    logger.trace('message', { foo: 'bar' });

    logger.verbose('message');
    logger.verbose('message', { foo: 'bar' });

    logger.debug('message');
    logger.debug('message', { foo: 'bar' });

    logger.info('message');
    logger.info('message', { foo: 'bar' });

    logger.warn('message');
    logger.warn('message', { foo: 'bar' });

    logger.error('message');
    logger.error('message', { foo: 'bar' });

    logger.critical('message');
    logger.critical('message', { foo: 'bar' });

    logger.warning('message');
    logger.warning('message', { foo: 'bar' });

    logger.o_O('message');
    logger.o_O('message', { foo: 'bar' });

    logger.O_O('message');
    logger.O_O('message', { foo: 'bar' });

    // loggers also accept other types
    logger.warn('message', 42);
    logger.warn('message', 'foo');

    // $ExpectError
    logger.warn();

    // $ExpectError
    logger.warn(42);

    // $ExpectError: This is accepted by intel, but mozlog forbids this explicitely.
    logger.warn('message', 'foo', 'bar');
  });

  it('does not expose global types', () => {
    const logCreator = mozlog('app-name');

    // $ExpectError
    (logCreator: LoggerCreator);
  });
});
