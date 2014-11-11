require 'lib/deploy_my_codes/settings'

module DeployMyCodes
  class SettingsLoader < Struct.new(:file)
    def self.load(environment)
      new(File.join(Middleman::Application.root, 'settings.yml')).load(environment.to_s)
    end

    def load(environment)
      build_environment_settings(environment)
    end

    private

    def build_environment_settings(environment)
      Settings.new(yaml_data_for(environment))
    end

    def yaml_data
      YAML.load(File.read(file))
    end

    def yaml_data_for(environment)
      yaml_data[environment]
    end
  end
end
