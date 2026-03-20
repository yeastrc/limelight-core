# limelight-gh-pages

This repository contains the GitHub Pages and Jekyll source for the Limelight project website.

The site includes:

- the landing page content and layout
- shared Jekyll includes and layouts
- static assets such as CSS, JavaScript, fonts, and images
- blog-style feature posts under `_posts`

## Local test build with Docker

The repository includes a Dockerfile for running a local Jekyll test build without installing Ruby or Jekyll directly on the host.

### Build the image

Run this from the repository root:

```bash
docker build -t limelight-jekyll-test:latest .
```

### Run the test build

Run this from the repository root:

```bash
docker run --rm \
  --name limelight-jekyll-test \
  --user "$(id -u):$(id -g)" \
  -p 4000:4000 \
  -v "$PWD":/site \
  limelight-jekyll-test:latest
```

What this does:

- builds the Jekyll site into the `docs` directory
- serves the generated site on `http://127.0.0.1:4000`
- writes generated files to the host workspace because the repository is bind-mounted into the container

### View the generated site

Open this URL in a browser after the container starts:

```text
http://127.0.0.1:4000
```

### Generated output

The local test build writes the rendered site into the `docs` directory.

This is intended for local verification of the generated output. Source files such as the repository Dockerfile and this README are excluded from the Jekyll output.

### Stop the test build

If you started the container without `--rm`, stop and remove it with:

```bash
docker rm -f limelight-jekyll-test
```