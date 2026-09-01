# Deployment

## Production

The `main` branch of this repo is continuously [deployed to Netlify using their GitHub integration](https://docs.netlify.com/build/git-workflows/overview/).

The site is owned by the "GOV.UK Design System team" in Netlify.

The custom domain is managed by GOV.UK, see [ticket #71] for more details.

[ticket #71]: https://github.com/alphagov/govuk-prototype-kit-docs/issues/71

## Pull Request previews

Previews of Pull Requests are automatically published to a URL which has the
prefix `deploy-preview` followed by the identifier number of the pull request.

For example, pull request #137 would be deployed to
`deploy-preview-137--prototype-kit-docs.netlify.app`.

The Netlify bot should comment on each PR shortly after building with a link to
the preview.
