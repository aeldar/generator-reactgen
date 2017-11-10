This directory is for application configuration. 
It is resolved as 'config/<the_rest_of_the_file_path>' inside the code 
with the help of webpack's resolve rules.

These files are not going into _/build_ !

Currently config should be requested like that:

    import config from 'config';

It first loads the config/default.js, and then creates a new object copying all
fileds from default, and then replaces fields with same fields, located in environment
config (so it will be config/development.js for development env, production.js
for production, test.js for test). ATTENTION! Only direct children of the specified
config files replace the same fields in default config. No deep merging.
