# Frontend of deploymy.codes

## Install the project

```bash
git clone git@github.com:deploymy-codes/frontend
cd frontend
bundle
npm install -g bower gulp
bower install
npm install
cp gulp/aws.yml{.sample,}
```

## Start the project in development

```bash
gulp
```

## Run the tests

```bash
# One run
gulp tests

# Rerun after each save
gulp tdd
```

## Deploy to S3

```bash
# not yet implemented
```
