module DeployMyCodes
  module TemplatePathHelpers
    def template_path(path)
      path.start_with?('/') ? path : File.join(templates_dir, path)
    end
  end
end
