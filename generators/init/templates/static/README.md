This directory is for static resources. For example:

    import baseStyles from '../../../static/styles/base.css';
    
Some of the files are to be placed into the 'build/' directory on building
(without 'static/' subdirectory, and just right into 'build/' as is).

Styles
------
Important! and they ARE NOT the correct css because
all .css files are actually being compiled by postcss/precss into a
proper css.

To set up syntax check for css in JetBrains' IDE you can assign _*.css_
file types to SCSS (Settings -> Editor -> File Types).

Important! CSS Modules are not applied by postcss-loader to the files
from this directory. If you wan't to use CSS Modules, put your css into
_<root>/src/styles_.

Paths
-----
N.B. Please don't use webpack aliases, because it make refactoring very hard.
Webstorm doesn't support automatic renaming of file names and directories when
webpack aliases are used.

Importing css from another css is resolved by sass (and appropriate
configuration options of sassLoader inside webpack conf).

Currently sassLoader conf for path resolves _/src/resources_ as <root>.

Examples:

1) Inside css you can use 


    @import 'styles/settings';
    
... to import styles from _<root>/src/resources/styles/settings.css.
CSS Modules are active.
It is a good place for variables, mixins et c.

    @import 'resources/images/im.jpg';
    
... to get an image from _<root>/resources/images/im.jpg_

2) Inside js/jsx you can use


    import styles from '../../resources/styles/clearfix.css';
    
... to import styles from _<root>/src/resources/styles/clearfix.css'.
CSS Modules are applied.
Rare used, because CSS Modules will be applied to every class found.

    import image from 'resources/images/im.jpg';
  
... to import images.

3) Inside js/jsx you can use

    
    import styles from '../../../../static/styles/base.css';
    
... to use styles from _<root>/static/styles/base.css_
CSS Modules are not in use.
Good place for global site styles.


5) In addition, _node_modules_ and _bower_component_ are also in search paths
and without CSS Modules applied to them:


    import 'normalize.css';
    
... to import styles from node_modules.
