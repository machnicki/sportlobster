require.config({
  baseUrl: "/app/scripts",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    filtered: '../bower_components/backbone-filtered-collection/backbone-filtered-collection',
    text: '../bower_components/requirejs-text/text',
    spec: '../../test/spec/'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['jquery', 'spec/index'], function($, index) {
    var jasmineEnv = jasmine.getEnv(),
        htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function() {
    require(index.specs, function() {
      jasmineEnv.execute();
    });
  });
});