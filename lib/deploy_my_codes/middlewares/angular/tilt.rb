require 'tilt'
require 'lib/deploy_my_codes/middlewares/angular/slim'

module DeployMyCodes
  module Middlewares
    module Angular
      class Tilt < ::Tilt::Template
        self.default_mime_type = 'application/javascript'

        def prepare; end
        def evaluate(scope, locals, &block)
          html      = Slim.new(scope, data).compile
          file_name = scope.logical_path.inspect.gsub('templates', '')

          <<-TEMPLATE
            angular.module('templates').run(['$templateCache', function($templateCache) {
              $templateCache.put(#{file_name}, '#{html}')
            }]);
          TEMPLATE
        end
      end
    end
  end
end

Sprockets.register_engine 'slim', DeployMyCodes::Middlewares::Angular::Tilt
