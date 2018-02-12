fis.require('jello')(fis);

fis.set('mockId', '38');

fis.media('dev')
    .set('project.ignore', [
        'node_modules/**',
        '.gitignore',
        'output/**',
        'webapp/**',
        '.git/**',
        'fis-conf.js',
        'package.json',
        'npm-debug.log',
        'assertPackDir.js'
    ]);

fis.media('bd')
    .set('project.ignore', [
        'node_modules/**',
        '.gitignore',
        'output/**',
        'webapp/**',
        '.git/**',
        'fis-conf.js',
        'package.json',
        'npm-debug.log',
        'assertPackDir.js',
        'test/**',
        'server.conf'
    ]);

fis.media('bd')
    .set('staticSrcPrefix', 'idsp');
fis.media('bd')
    .set('project.fileType.text', 'css, tpl, js, txt, json, xml, htm, text, xhtml, html, md, conf, po, config, tmpl, coffee, less, sass, jsp, scss, manifest, bak, asp, tmp');
fis.media('bd')
    .set('project.fileType.image', 'svg, tif, tiff, wbmp, png, bmp, fax, gif, ico, jfif, jpe, jpeg, jpg, woff, cur');

fis.media('bd')
    .match('*.{${project.fileType.text},${project.fileType.image}}', {
        url: '/${staticSrcPrefix}$0'
    });

/*
 **妈的资源能整合，但是整合之后 碎片还是会插入到页面上 虽然不影响功能 但是浏览器中找不到零碎的资源会报404。设置useMap:false也不行。后面在看下有办法没
 */
// fis.match('::package', {
//     // release: '${statics}/${namespace}/$0',
//     postpackager: fis.plugin('loader', {
//         allInOne: //true,
//         {
//             js: function(file) {
//                 // console.log(file);
//                 return file.subpathNoExt + '.js';
//             },
//             css: function(file) {
//                 // console.log(file.subpathNoExt)
//                 return file.subpathNoExt + '.css';
//             },
//             // sourceMap: true,
//             // includeAsyncs: true,
//             // useTrack: false
//             // ignore: '/public/widget/template/**/*.js'
//         },
//         // resourceType: 'mod',
//         useInlineMap: true,
//         // resoucemap: 'static/pkg/${filepath}_map.js',
//         // include: [
//         //     'widgets/**.js'
//         // ]

//         // include: '/public/widget/template/**.js'
//         useSourceMap: false,
//         // obtainScript: false,
//         // obtainStyle: false,
//         // useInlineMap: false,
//         // resoucemap: false
//     }),
//     // moduleId: '$0'
//     // spriter: fis.plugin('csssprites')
// });

//自动引入mixins、variables
fis.config.merge({
    modules: {
        parser: {
            less: ['less-import', 'less']
        }
    },
    settings: {
        parser: {
            'less-import': {
                file: ['public/static/common/mixins.less', 'public/static/common/variables.less']
            }
        }
    }
});

fis.hook('commonjs', {
    extList: ['.js', '.less', '.css'],
    baseUrl: '/',
    packages: [{ //别名
        name: '@components',
        location: '/public/components',
    }, {
        name: '@lib',
        location: '/public/lib',
    }, {
        name: '@static',
        location: '/public/static',
    }]
});

fis.unhook('components');
fis.hook('node_modules', {
    shimProcess: true,
    mergeLevel: 3
});

//全局公共
fis.match('::package', {
    packager: fis.plugin('deps-pack', {
        '/static/layout/common_aio.js': [
            '/public/lib/modjs/mod.js',
            '/public/lib/jquery/jquery1111.js',
            '/public/lib/polyfill/polyfill.min.js',
            '/public/static/common/**.js'
        ],
        '/static/layout/common_aio.css': [
            '/public/static/common/normalize.less',
            '/public/static/common/variables.less',
            '/public/static/common/**.less'
        ]
    })
});

fis.media('dev')
    .match('*', {
        deploy: [
            fis.plugin('skip-packed', {
                ignore: ['./webapp/**']
            }), fis.plugin('local-deliver', {
                to: 'output'
            })
        ]
    });

fis.media('bd')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['define'], //不想被压的
            },
            compress: {
                drop_console: true,
            },
            sourceMap: true
        })
    })
    .match('*.{${project.fileType.text},${project.fileType.image}}', {
        useHash: true
    })
    .match('*.{scss,sass,less,css}', {
        optimizer: fis.plugin('clean-css', {
            //option
        })
    })
    .match('*', { //本地发布包
        deploy: [
            fis.plugin('skip-packed', {
                ignore: ['./output/**']
            }), fis.plugin('local-deliver', {
                to: '../webapp'
            })
        ]
    });