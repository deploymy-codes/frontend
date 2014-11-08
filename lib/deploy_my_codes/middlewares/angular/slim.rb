require 'slim'

module DeployMyCodes
  module Middlewares
    module Angular
      class Slim < Struct.new(:scope, :data)
        JS_ESCAPE_MAP = { '\\' => '\\\\', '</' => '<\/', "\r\n" => '\n', "\n" => '\n', "\r" => '\n', '"' => '\\"', "'" => "\\'" }

        def compile
          escape(::Slim::Template.new(generator: generator) { |t| data }.render(context))
        end

        def context_class
          @context_class ||= Class.new(scope.environment.context_class)
        end

        def context
          @context ||= context_class.new(scope.environment, scope.logical_path.to_s, scope.pathname)
        end

        def escape(content)
          content.gsub(/(\|<\/|\r\n|\342\200\250|\342\200\251|[\n\r"'])/u) {|match| JS_ESCAPE_MAP[match] }
        end

        def generator
          @generator ||= Temple::Generators::RailsOutputBuffer
        end
      end
    end
  end
end
