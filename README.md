# Frontend of deploymy.codes

## Install the project

```bash
git clone git@github.com:deploymy-codes/frontend
cd frontend
bundle
bower install
rbenv rehash
cp aws.yml{.sample,}
cp data/mailchimp.yml{.sample,}
```

## Start the project in development

```bash
middleman server
```

## Deploy to S3

```bash
middleman build
middleman sync
```
