/* eslint-disable indent */
console.log('Starting plugin');
// imports
const fs = require('fs-extra');
const toMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('../utils/imageUrl');
const serializers = require('../utils/serializers');
const contentPath = './web/content';

const client = require('@sanity/client')({
    projectId: 'amu3cvo8',
    dataset: 'production',
    useCdn: false
});

fs.readdir(contentPath, (err, files) => {
    if (err) console.log(err);
    else {
        files.forEach((file) => {
        console.log(`Deleting: ${file}`);
        fs.unlink(`${contentPath}/${file}`, (err) => {
            if (err) throw err;
        });
        });
    }
});

try {
    client
        .fetch(`*[_type == 'post']{categories[]->{title}, date, slug, body,...}`)
        .then((res) =>
        res.map(async (post) => {
            // output YAML frontmatter here
            let frontmatter = '---';
            Object.keys(post).forEach((field) => {
            if (field === 'slug') {
                return (frontmatter += `\n${field}: '${post.slug.current}'`);
            } else if (field === 'categories') {
                return (frontmatter += `\n${field}: [${post.categories.map(
                (cat) => `'${cat.title}'`
                )}]`);
            } else if (field === 'excerpt') {
                return (frontmatter += `\n${field}: '${post[field].text}'`);
            } else if (field === 'mainImage') {
                return (frontmatter += `\nimage: '${imageUrl(post[field]).width(600).url()}'`);
            } else if (field === 'body') {
                return;
            } else {
                frontmatter += `\n${field}: '${post[field]}'`;
            }
            });
            frontmatter += '\n---\n\n';

            const wholePost = `${frontmatter}${toMarkdown(post.body, {
                serializers,
            })}`;

            const filePath = `${contentPath}/${post.slug.current}.md`;
            fs.outputFile(filePath, wholePost, function (err, data) {
            if (err) {
                return console.log(err);
            }
            });
        })
    );
} catch (error) {
    console.log('Failure message', { error });
}