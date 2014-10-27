aws_config = YAML.load(File.read(File.join(root, 'aws.yml')))

activate :livereload
activate :gzip

activate :s3_sync do |s3_sync|
  s3_sync.bucket                = aws_config['bucket_id']
  s3_sync.region                = aws_config['region']
  s3_sync.aws_access_key_id     = aws_config['access_key_id']
  s3_sync.aws_secret_access_key = aws_config['secret_access_key']
end

set :js_dir,     'assets/javascripts'
set :css_dir,    'assets/stylesheets'
set :images_dir, 'assets/images'

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash

  activate :relative_assets
  set :relative_links, true
end

after_configuration do
  sprockets.append_path File.join root, 'bower_components'
end
