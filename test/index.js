import model from '../src/model';
import test from 'tape';

// var chrome = {
//   tabs: {
//     getCurrent: function() {}
//   },
//   runtime: {
//     connect: function() {}
//   }
// }


test('timing test', function (t) {
    t.plan(2);

    t.deepEqual(typeof model.subscriptions.change, 'function');

});
