# Deploys

This repo uses [Heroku automatic deploys] to deploy the latest code in the
`main` branch directly to https://prototype-kit.service.gov.uk.

The custom domain is managed by GOV.UK, see [ticket #71] for more details. We
redirect users from the Heroku domain to the custom domain when the
`HEROKU_APP_NAME` and `HEROKU_CUSTOM_DOMAIN` environment variables are set,
which we set by hand as config vars in the Heroku app dashboard.

Deployments are configured manually using the dashboard for the
[govuk-prototype-kit-docs pipeline]. To check the configuration or any
deployment issues, log into Heroku using the team credentials in Bitwarden.

[Heroku automatic deploys]: https://devcenter.heroku.com/articles/github-integration#automatic-deploys
[ticket #71]: https://github.com/alphagov/govuk-prototype-kit-docs/issues/71
[govuk-prototype-kit-docs pipeline]: https://dashboard.heroku.com/pipelines/f0879aaf-21f5-4430-a1d5-7adc4740a066
