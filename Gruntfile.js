module.exports = function(grunt) {

  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');

  // Static Webserver
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //  Grunt plugin to compress png images with pngquant. You will need to install pngquant with 
  //  $ brew install pngqunt
  grunt.loadNpmTasks('grunt-pngmin');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),
    copy: {      
      release:{
        files: [
          {
            expand: true, 
            cwd: 'src/', 
            src:['**'], 
            dest: 'dist/'
          }
        ]
      }
    }, 

    pngmin: {
      compile: {
        options: {
          ext: '.png'
        },
        files: [
          {
            expand: true, // required option 
            src: ['**/*.png'],
            cwd: 'dist/images', // required option 
          }
        ]
      }
    },   

   // Run `$ grunt s3` to upload to AWS S3. You need to have creds.
   s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "<%= aws.bucket %>",
        enableWeb: true
      },
      build: {
        cwd: "dist",
        src: "**"
      }
    },


    cloudfront: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        distributionId: "E1SICFVFWG9BM",
        invalidations: [
          "/index.html"
        ]
      },
      invalidate: {}
    },
   // End of S3 Task


    // This is the default Grunt Task, It creates a serve based on dist.
    connect: {
      server: {
        options: {
          port: 8000,
          base: "dist",
          keepalive: true
        }
      }
    }
    // End of Connect Task

  });

  // Default task(s), default runs the conect task
  grunt.registerTask("default", ["connect"]);
  grunt.registerTask(    
    'deploy', 
    [
      'copy:release', 
      's3',
      'cloudfront'
    ]
  );
};
