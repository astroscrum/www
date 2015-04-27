module.exports = function(grunt) {

  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');

  // Static Webserver
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),

   // Run `$ grunt s3` to upload to AWS S3. You need to have creds.
   s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "<%= aws.bucket %>"
      },
      build: {
        cwd: "dist",
        src: "**"
      }
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

};
