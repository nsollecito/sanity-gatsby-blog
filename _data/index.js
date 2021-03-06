/* eslint-disable indent */
const fs = require('fs-extra');
const toMarkdown = require('@sanity/block-content-to-markdown');
const imageUrl = require('./utils/imageUrl');
const serializers = require('./utils/serializers');
const contentPath = '../web/content';
const toYaml = require('json2yaml')

// set up client
const client = require('./utils/sanityClient')

listenForChanges()

// listen for updates
function listenForChanges() {
    const query = '*[]{}'
    const params = {}
    const options = {
        includeResult: false,
        includePreviousRevision: true
    }

    const subscription = client.listen(query, params, options)
        .subscribe(item => {
            // console.log(JSON.stringify(item))
            if (item.previous && item.previous.slug !== undefined) {
                let previousSlug = item.previous.slug
                setTimeout(() => {
                    if (item.mutations[0].delete) {
                        deleteItem(previousSlug)
                    } else {
                        // console.log(JSON.stringify(item.result));
                        importItem(item.documentId, previousSlug)
                    }
                }, 1000)
            }
        })
}


// import item
function importItem(id = 'fb5f90f7-7980-4b2a-b9da-35cd0a23829a', previousSlug = '') {
    const query = '*[_id==$id]{"authors": authors[].author->{_type,name,slug}, categories[]->{title},...}'
    const params = { id: id }

    client.fetch(query, params).then(results => {
        if (results.length == 0) {
            console.log('_id not found. nothing imported');
        }
        results.forEach(item => {
            previousSlug.length ? deleteItem(previousSlug) : deleteItem(item.slug.current)
            createFile(item.slug.current, parseItem(item))
        })
    }).catch(err => {
        console.error('Import failed: ', err.message)
    })
};

// perform full import
function importAllContent(type = 'post') {
    const query = '*[_type==$type]{"authors": authors[].author->{_type,name,slug}, categories[]->{title},...}'
    const params = { type: type }

    // delete all existing files
    fs.readdir(contentPath, (err, files) => {
        if (err) console.log(err);
        else {
            files.forEach((file) => {
                console.log(`Deleting: ${file}`);
                fs.unlink(`${contentPath}/${file}`, (err) => {
                    if (err) console.log(err)
                });
            });
        }
    });

    client.fetch(query, params).then(results => {
        results.forEach(item => {
            let thisContent = parseItem(item);
            if (item.slug) {
                createFile(item.slug.current, thisContent);
            }
        })
    }).catch(err => {
        console.error('Import all content failed: ', err)
    })
}

// write markdown to path
function createFile(slug, content, path = contentPath) {
    const filePath = `${path}/${slug}.md`

    console.log(`Writing: ${slug}`)
    fs.outputFileSync(filePath, content, function (err, data) {
        if (err) { throw err }
    })
}

// delete a file
function deleteItem(filename) {
    let file = `${contentPath}/${filename}.md`;

    console.log(`Deleting ${file}`)
    if (fs.existsSync(file)) {
        fs.unlinkSync(file, (err) => {
            if (err) console.log(err.message)
        })
    }
}

// convert JSON to Markdown for a returned item
function parseItem(item) {
    // output YAML frontmatter here
    let frontmatter = '---';
    Object.keys(item).forEach((field) => {
        if (field === 'slug') {
            return (frontmatter += `\n${field}: '${item.slug.current}'`);
        } else if (field === '_updatedAt') {
            return (frontmatter += `\nlastmod: ${item[field]}`)
        } else if (field === '_createdAt') {
            return (frontmatter += `\ndate: ${item[field]}`)
        } else if (field === 'publishedAt') {
            return (frontmatter += `\npublishDate: ${item[field]}`)
        } else if (field === 'categories') {
            return (frontmatter += `\n${field}: [${item.categories.map(
                (cat) => `'${cat.title}'`
            )}]`);
        } else if (field === 'authors') {
            // console.log(item[field])
            if (item.authors.length > 0) {
                return (frontmatter += `\n${field}: ${item.authors.map(
                    (author) => `\n- ${toMarkdown(item[field], {serializers})}`
                )}`)
            }
        } else if (field === 'excerpt') {
            // console.log(item[field])
            return (frontmatter += `\n${field}: ${toMarkdown(item[field], { serializers })}`)
        } else if (field === 'mainImage') {
            return (frontmatter += `\nimage: '${imageUrl(item[field]).width(600).url()}'`);
        } else if (field === 'body') {
            return;
        } else {
            frontmatter += `\n${field}: '${item[field]}'`;
        }
    });

    frontmatter += '\n---\n\n';

    const wholePost = `${frontmatter}${toMarkdown(item.body, {
        serializers
    })}`

    return wholePost
}


// testPayload = {
//     'transactionId': '28711ce3-07c4-4c8f-8577-fc8f3c4cbde0',
//     'projectId': '3do82whm',
//     'dataset': 'production',
//     'ids': {
//         'created': ['e18d8868-fc9d-47f7-8e11-89eb10e70d46'],
//         'deleted': ['1a558cde-16fb-4362-8082-634468a1cc20'],
//         'updated': ['fb5f90f7-7980-4b2a-b9da-35cd0a23829a'],
//         'all': ['fb5f90f7-7980-4b2a-b9da-35cd0a23829a']
//     }
// }

// // webhook payload
// function webhook(payload) {
//     payload.ids.created.map(id => { importItem(id) })
//     payload.ids.updated.map(id => { importItem(id) })
//     payload.ids.deleted.map(id => { deleteItem(id) });
// }

// exports
exports.importItem = importItem
exports.importAllContent = importAllContent
exports.listenForChanges = listenForChanges
// exports.webhook = webhook
