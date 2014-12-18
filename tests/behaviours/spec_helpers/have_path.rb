RSpec::Matchers.define :have_path do |expected|
  match do |actual|
    expected == path(actual)
  end

  failure_message do |actual|
    "expected page use the path #{expected}, but use #{path(actual)}"
  end

  def path(actual)
    actual.current_url.gsub(/http\:\/\/[^\/]+/, '')
  end
end
