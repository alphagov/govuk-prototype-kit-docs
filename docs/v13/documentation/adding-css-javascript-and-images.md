---
heading: Add CSS, JavaScript, images and other files
---

The Prototype Kit comes with standard GOV.UK Frontend styles and components for you to use in your prototypes.

If you need to add your own CSS (Cascading Style Sheets), JavaScript, images or other files (for example, documents or spreadsheets), use the `/app/assets` folder.

The Prototype Kit processes all the files in the `/app/assets` folder and makes them available at the path `/public`.

## Add CSS

CSS lets you change how web pages look, for example, text sizes, colours or spacing. This is also called style.

To add your own styles, open the file:

`/app/assets/sass/application.scss`

The [Prototype Kit uses Sass](https://sass-lang.com/guide), which adds extra features to CSS.

### Using import

If you have a very long application.scss file, you can split it up into multiple files and import those into `application.scss`. Use an underscore (_) at the start of the import file filenames, for example:

`/app/assets/sass/_admin.scss`

Import this file into your `application.scss` file without the underscore:

```
@import "admin";
```

### Add CSS files

To add an existing CSS file, put it in `app/assets/css`. You can create the folder if it’s not there.

Then add a stylesheets block in `app/views/layout/main.html`:

```
{% block stylesheets %}
  {{ super() }}
  <link href="/public/css/filename-here.css" rel="stylesheet" type="text/css" />
{% endblock %}
```

Replace `file-name-here.css` with your file name.

## Add JavaScript

You can use JavaScript to make changes that will appear on the page immediately. For example, a user could enter some numbers, then JavaScript displays the results of a calculation without loading a new page.

### Add your own JavaScript

To add your own JavaScript, open the file:

`/app/assets/javascripts/application.js`

### Add JavaScript files

To add a JavaScript file to your prototype, put it in `app/assets/javascripts`.

If you need the JavaScript file on one page, add a `pageScripts` block at the end of the page. For example:

```
{% block pageScripts %}
  <script src="/public/javascripts/filename-here.js"></script>
{% endblock %}
```

If you need the JavaScript file on all pages, add it to the scripts block in `app/views/layouts/main.html`. For example:

```
{% block scripts %}
  {{ super() }}
  <script src="/public/javascripts/filename-here.js"></script>
{% endblock %}
```

Replace `file-name-here.js` with your file name.


## Add images

If you add images to `/app/assets/images` the Prototype Kit will make them available at the path `/public/images`.

For example, if you add an image:

`/app/assets/images/user.png`

Use it in your page like this:

`<img src="/public/images/user.png" alt="User icon">`

Use alt text to describe the image for screen readers.

## Add other files

If you need to use other files in your prototype, you can add them to `/app/assets` and the Prototype Kit will make them available at the path `/public`. You can use sub-folders in the assets folder.

For example, if you add a document:

`/app/assets/downloads/report.odf`

Link to it like this:

```
<a href="/public/downloads/report.odf">Download the report</a>
```
