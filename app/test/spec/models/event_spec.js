define(['models/event'], function(Event) {
  describe('Model::Event', function () {

    describe('model', function () {
      it('check the default values', function () {
        var event = new Event();

        expect(event.get('summary')).toEqual('no name');
      });
    });

  });
});