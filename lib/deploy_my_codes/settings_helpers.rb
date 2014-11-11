require 'lib/deploy_my_codes/settings_loader'

module DeployMyCodes
  module SettingsHelpers
    def settings
      @settings ||= SettingsLoader.load(environment)
    end
  end
end
