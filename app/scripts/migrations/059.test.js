import { strict as assert } from 'assert';
import migration59 from './059';

describe('migration #59', function () {
  it('should update the version metadata', function (done) {
    const oldStorage = {
      meta: {
        version: 58,
      },
      data: {},
    };

    migration59
      .migrate(oldStorage)
      .then((newStorage) => {
        assert.deepEqual(newStorage.meta, {
          version: 59,
        });
        done();
      })
      .catch(done);
  });

  it('should set recoveryPhraseReminderHasBeenShown to false, recoveryPhraseReminderLastShown to 0, and shouldShowRecoveryPhraseReminder to false', function (done) {
    const oldStorage = {
      meta: {},
      data: {
        AppStateController: {
          existingProperty: 'foo',
        },
      },
    };

    migration59
      .migrate(oldStorage)
      .then((newStorage) => {
        assert.deepEqual(newStorage.data, {
          AppStateController: {
            recoveryPhraseReminderHasBeenShown: false,
            recoveryPhraseReminderLastShown: 0,
            shouldShowRecoveryPhraseReminder: false,
            existingProperty: 'foo',
          },
        });
        done();
      })
      .catch(done);
  });

  it('should initialize AppStateController if it does not exist', function (done) {
    const oldStorage = {
      meta: {},
      data: {
        existingProperty: 'foo',
      },
    };

    migration59
      .migrate(oldStorage)
      .then((newStorage) => {
        assert.deepEqual(newStorage.data, {
          existingProperty: 'foo',
          AppStateController: {
            recoveryPhraseReminderHasBeenShown: false,
            recoveryPhraseReminderLastShown: 0,
            shouldShowRecoveryPhraseReminder: false,
          },
        });
        done();
      })
      .catch(done);
  });
});
