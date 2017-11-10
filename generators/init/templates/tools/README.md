This directory for additional tools and tool configurations (like webpack env configs)

Git hooks
---------

All of the scripts inside _git-hooks_ directory are being linked into
_.git/hooks_ during initial npm install.

Currently _pre-push_ is just apply css reformatting through _csscomb_
and then lints all scss files.
